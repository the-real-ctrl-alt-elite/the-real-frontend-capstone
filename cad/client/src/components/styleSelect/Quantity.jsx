import React from 'react';

const Quantity = ({ availableQuantities, selectedSku, selectedQuantity, onQuantityChange }) => {

  // Create an array of quantity options based on available quantities
  const quantityOptions = Array.from({ length: availableQuantities }, (_, i) => i + 1);

  // If no size is selected or there is no stock, disable the dropdown
  const isDisabled = !selectedSku || availableQuantities === 0;

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const quantity = Number(e.target.value);
    onQuantityChange(quantity);
  };

  return (
    <div className='quantity-container'>
      <span className='quantity-span'>Quantity:</span>
      <select
        className='quantity-select'
        disabled={isDisabled}
        value={selectedQuantity}
        onChange={handleQuantityChange}
      >
        <option value="">SELECT</option>
        {quantityOptions.map((quantity, index) => (
          <option key={index + 8} value={quantity}>
            {quantity}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Quantity;
