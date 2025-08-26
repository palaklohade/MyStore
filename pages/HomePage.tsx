import React, { useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts, fetchCategories } from '../redux/productsSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import type { Product } from '../types';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: products, categories, status, error } = useAppSelector((state) => state.products);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product: Product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product: Product) =>
        selectedCategory === 'all' ? true : product.category === selectedCategory
      );
  }, [products, searchTerm, selectedCategory]);

  return (
    <div>
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-3 bg-white border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-1/4 p-3 bg-white border border-brand-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category} className="capitalize">
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === 'loading' && <Loader />}
      {status === 'failed' && error && <ErrorMessage message={error} />}
      {status === 'succeeded' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      {status === 'succeeded' && filteredProducts.length === 0 && (
          <div className="text-center col-span-full py-10">
              <h2 className="text-2xl text-gray-500">No products found.</h2>
              <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
      )}
    </div>
  );
};

export default HomePage;
