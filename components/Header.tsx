import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>;
const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>;

const Header: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const grandTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <header className="bg-brand-bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-24 border-b border-brand-border">
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-brand-text hover:text-black tracking-wider px-3 py-2 rounded-md text-sm font-medium transition-colors">
              HOME
            </Link>
            <Link to="#" className="text-brand-text hover:text-black tracking-wider px-3 py-2 rounded-md text-sm font-medium transition-colors">
              ABOUT
            </Link>
            <Link to="/" className="text-brand-text hover:text-black tracking-wider px-3 py-2 rounded-md text-sm font-medium transition-colors">
              SHOP
            </Link>
          </nav>

          <div className="flex-shrink-0">
            <Link to="/" className="text-4xl font-semibold text-brand-text tracking-widest">
              MyStore
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-brand-text hover:text-black p-2 rounded-full transition-colors"><UserIcon /></button>
            <button className="text-brand-text hover:text-black p-2 rounded-full transition-colors"><HeartIcon /></button>
            <Link to="/cart" className="flex items-center bg-brand-dark text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              <span>{grandTotal.toFixed(2)} €</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
