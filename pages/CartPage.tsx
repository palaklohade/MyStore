import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';
import QuantitySelector from '../components/QuantitySelector';
import type { CartItem } from '../types';

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const dispatch = useAppDispatch();

    const handleQuantityChange = (newQuantity: number) => {
        dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    };

    const handleRemove = () => {
        dispatch(removeFromCart(item.id));
    };

    return (
        <div className="flex items-center py-4 border-b border-brand-border">
            <div className="w-1/4 md:w-1/6">
                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain mx-auto" />
            </div>
            <div className="w-1/2 md:w-2/6 px-4">
                <h3 className="font-semibold text-sm md:text-base text-brand-text">{item.title}</h3>
                <p className="text-brand-text-light text-xs md:text-sm">${item.price.toFixed(2)}</p>
            </div>
            <div className="w-1/4 md:w-1/6 px-2">
                <QuantitySelector quantity={item.quantity} onQuantityChange={handleQuantityChange} />
            </div>
            <div className="hidden md:block md:w-1/6 text-center font-semibold text-brand-dark">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
            <div className="w-1/8 md:w-1/6 text-right">
                <button onClick={handleRemove} className="text-red-500 hover:text-red-700 font-bold p-2 text-2xl">&times;</button>
            </div>
        </div>
    );
};


const CartPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const grandTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-brand-text mb-4">Your Cart is Empty</h1>
        <p className="text-brand-text-light mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/"
          className="bg-brand-dark text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 border-b border-brand-border pb-4 text-brand-text">Shopping Cart</h1>
      <div>
        <div className="hidden md:flex items-center py-2 border-b border-brand-border font-semibold text-brand-text-light uppercase text-xs">
            <div className="w-1/6 text-center">Product</div>
            <div className="w-2/6 px-4">Details</div>
            <div className="w-1/6 px-2 text-center">Quantity</div>
            <div className="w-1/6 text-center">Subtotal</div>
            <div className="w-1/6 text-right">Remove</div>
        </div>
        {cartItems.map(item => (
            <CartItemRow key={item.id} item={item} />
        ))}
      </div>
      <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-left mb-4 md:mb-0">
          <Link to="/" className="text-brand-primary hover:underline">&larr; Continue Shopping</Link>
        </div>
        <div className="w-full md:w-1/3">
          <div className="flex justify-between text-lg font-semibold text-brand-dark">
            <span>Grand Total:</span>
            <span>${grandTotal.toFixed(2)}</span>
          </div>
          <p className="text-brand-text-light text-sm mt-1">Taxes and shipping calculated at checkout.</p>
          <Link
            to="/checkout"
            className="block text-center w-full mt-4 bg-brand-dark text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
