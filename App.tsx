import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

const App: React.FC = () => {
  return (
    <div className="font-sans text-brand-text">
      <div className="container mx-auto max-w-7xl my-8 bg-brand-bg-light rounded-2xl shadow-xl overflow-hidden">
        <Header />
        <main className="p-4 md:p-6 lg:p-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
