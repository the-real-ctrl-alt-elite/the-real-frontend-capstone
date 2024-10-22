import React from 'react';

const Quantity = (props) => {

  const handleQuantityChange = (e) => {
    const selectedSize = e.target.value;
    props.setQuantities(selectedSize);
  };

  return (
    <div className='quantity-container'>
      <span className='quantity-span'>Quantity:</span>
      <select className='size-select' onChange={handleQuantityChange}>
        <option value="">SELECT</option>

      </select>
    </div>
  );
};

export default Quantity;
