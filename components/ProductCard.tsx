import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white border border-brand-border rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="h-64 w-full flex items-center justify-center p-4 bg-white overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-base font-medium text-brand-text mb-2 truncate" title={product.title}>
          <Link to={`/product/${product.id}`} className="hover:text-brand-primary">{product.title}</Link>
        </h3>
        <p className="text-brand-text-light text-sm mb-4 capitalize">{product.category}</p>
        <div className="mt-auto flex justify-between items-center">
          <p className="text-xl font-semibold text-brand-dark">${product.price.toFixed(2)}</p>
          <Link to={`/product/${product.id}`} className="bg-brand-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
