import React from 'react';

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onQuantityChange, min = 1, max = 10 }) => {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center border border-brand-border rounded-lg">
      <button
        onClick={handleDecrement}
        className="text-brand-text hover:bg-gray-100 p-3 transition-colors disabled:opacity-50"
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="px-5 py-2 bg-white ">{quantity}</span>
      <button
        onClick={handleIncrement}
        className="text-brand-text hover:bg-gray-100 p-3 transition-colors disabled:opacity-50"
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
