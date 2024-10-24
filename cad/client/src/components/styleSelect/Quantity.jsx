import React from 'react';

const Quantity = ({ availableQuantities, selectedSku, selectedQuantity, onQuantityChange }) => {

  const quantityOptions = availableQuantities > 0
    ? Array.from({ length: availableQuantities }, (_, i) => i + 1)
    : [];

  const handleQuantityChange = (e) => {
    const quantity = Number(e.target.value);
    onQuantityChange(quantity);
  };

  return (
    <div className='quantity-container'>
      <span className='quantity-span'>Quantity:</span>
      <select
        className='custom-select'
        disabled={!selectedSku || availableQuantities === 0}
        value={selectedQuantity || ""}
        onChange={handleQuantityChange}
      >
        {!selectedSku ? (
          <option value="">SELECT</option>
        ) : availableQuantities === 0 ? (
          <option value="">OUT OF STOCK</option>
        ) : (
          <>
            <option value="">SELECT</option>
            {quantityOptions.map((quantity, index) => (
              <option key={index + 8} value={quantity}>
                {quantity}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default Quantity;
