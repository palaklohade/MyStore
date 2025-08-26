import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { clearCart } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const grandTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({ name: '', email: '', address: '' });
  const [errors, setErrors] = useState({ name: '', email: '', address: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { name: '', email: '', address: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Order placed:', { ...formData, items: cartItems, total: grandTotal });
      dispatch(clearCart());
      setOrderPlaced(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (orderPlaced) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
        <p className="text-lg text-brand-text-light mb-6">Your order has been placed successfully.</p>
        <Link to="/" className="bg-brand-dark text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Back to Home
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0 && !orderPlaced) {
     setTimeout(() => navigate('/'), 100);
     return null;
  }
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold mb-6 border-b border-brand-border pb-4 text-brand-text">Shipping Information</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-brand-text-light mb-1">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full p-3 bg-white border rounded-lg ${errors.name ? 'border-red-500' : 'border-brand-border'}`} />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-brand-text-light mb-1">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full p-3 bg-white border rounded-lg ${errors.email ? 'border-red-500' : 'border-brand-border'}`} />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-medium text-brand-text-light mb-1">Shipping Address</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={3} className={`w-full p-3 bg-white border rounded-lg ${errors.address ? 'border-red-500' : 'border-brand-border'}`}></textarea>
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
          </div>
          <button type="submit" className="w-full bg-brand-dark text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Place Order
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 border-b border-brand-border pb-4 text-brand-text">Order Summary</h2>
        <div className="space-y-4 mb-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-white p-1 border border-brand-border rounded-md mr-4">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-brand-text">{item.title}</p>
                  <p className="text-xs text-brand-text-light">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold text-sm text-brand-dark">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-brand-border pt-4">
          <div className="flex justify-between text-lg font-bold text-brand-dark">
            <span>Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
