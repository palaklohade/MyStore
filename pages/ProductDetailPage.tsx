import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addToCart } from '../redux/cartSlice';
import { fetchProducts } from '../redux/productsSlice';
import QuantitySelector from '../components/QuantitySelector';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import type { Product } from '../types';

const AccordionItem = ({ title, content, isOpen, onToggle }) => (
  <div className="border-b border-brand-border py-4">
    <button onClick={onToggle} className="w-full flex justify-between items-center text-left">
      <h3 className="font-semibold text-brand-text">{title}</h3>
      <span className="text-2xl font-light">{isOpen ? '-' : '+'}</span>
    </button>
    {isOpen && <div className="mt-4 text-brand-text-light">{content}</div>}
  </div>
);

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { items: products, status } = useAppSelector((state) => state.products);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState('');
  const [openAccordion, setOpenAccordion] = useState<string | null>('description');

  const handleAccordionToggle = (title: string) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };
  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (products.length > 0 && id) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/'); 
      }
    }
  }, [id, products, navigate]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity }));
      setNotification(`Added to cart!`);
      setTimeout(() => setNotification(''), 3000);
    }
  };
  
  if (status === 'loading' || (status === 'succeeded' && !product)) {
    return <Loader />;
  }

  if (status === 'failed') {
    return <ErrorMessage message="Could not load product details." />;
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl text-gray-500">Product not found.</h2>
      </div>
    );
  }

  const accordionItems = [
      { title: 'Description', content: product.description },
      { title: 'Ingredients', content: 'Not available for this product.' },
      { title: 'Free In-Store Pickup', content: 'Available at all locations.' },
      { title: 'Premium Quality', content: 'Sourced from the best suppliers.' },
      { title: 'Organic & Fair Trade', content: 'Certified organic and fair trade.' }
  ];

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Product Info */}
        <div className="py-8">
          <h1 className="text-5xl font-light text-brand-text mb-4 leading-tight">{product.title}</h1>
          <p className="text-2xl font-medium text-brand-text mb-6">${product.price.toFixed(2)}</p>
          
          <div className="flex items-center gap-4 mb-6">
            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} max={5} />
            <button
              onClick={handleAddToCart}
              className="bg-brand-primary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex-grow"
            >
              Add To Cart
            </button>
          </div>
           {notification && (
              <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-center transition-opacity duration-300">
                  {notification}
              </div>
          )}
          <p className="text-sm text-brand-text-light">Home / {product.category} / {product.title}</p>
        </div>
        
        {/* Right Side: Image & Accordion */}
        <div>
            <div className="bg-white p-8 rounded-2xl mb-8 relative">
                <button className="absolute top-4 right-4 text-gray-400 hover:text-black"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></button>
                <img src={product.image} alt={product.title} className="max-h-96 w-auto object-contain mx-auto" />
            </div>
             <div>
                {accordionItems.map(item => (
                    <AccordionItem 
                        key={item.title}
                        title={item.title}
                        content={item.content}
                        isOpen={openAccordion === item.title.toLowerCase()}
                        onToggle={() => handleAccordionToggle(item.title.toLowerCase())}
                    />
                ))}
            </div>
        </div>
      </div>
      
      {/* Footer Banner */}
      <div className="bg-brand-dark text-white -mx-12 -mb-12 mt-16 p-8 rounded-b-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>CO2 Neutral Plastic Free Shipping</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Free Delivery On Domestic Orders Over $99</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>100% Premium Locally Sourced Organic Shop</span>
              </div>
               <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                <span>Support Small Local Business & Brands</span>
              </div>
          </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
