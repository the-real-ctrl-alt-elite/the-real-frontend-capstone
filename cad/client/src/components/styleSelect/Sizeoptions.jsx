import React, { useEffect } from 'react';

const Sizeoptions = (props) => {
  const uniqueSizes = [...new Set(props.sizeArray)];
  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    props.handleSizeChange(selectedSize);
  };
  return (
    <div className='custom-select-container'>
      <span className='custom-span'>Size:</span>
      <select
        className='custom-select'
        onChange={handleSizeChange}
        value={props.selectedSize || ""}
      >
        <option value="">SELECT</option>
        {
          uniqueSizes.map((size, index) => (
            <option key={index + 7} value={size}>
              {size}
            </option>
          ))
        }
      </select>
    </div>
  );
};

export default Sizeoptions;
