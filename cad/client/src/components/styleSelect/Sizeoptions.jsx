import React, { useState, useEffect } from 'react';

const Sizeoptions = (props) => {
  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    props.setSelectedSize(selectedSize)
  };
  return (
    <div className='sizing-container'>
      <span className='size-span'>Size:</span>
      <select className='size-select' onChange={handleSizeChange}>
        <option value="">SELECT</option>
        {props.sizeArray && props.sizeArray.map((size, index) => (
          <option key={index} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sizeoptions;
