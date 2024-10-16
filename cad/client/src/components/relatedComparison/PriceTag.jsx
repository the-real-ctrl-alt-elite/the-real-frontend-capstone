import React from 'react';

const PriceTag = ({ defaultPrice, salePrice }) => {
  return (
    <span className='price-tag-container'>
      <p style={{ textDecoration: salePrice ? 'line-through' : 'none' }}>
        $
        {defaultPrice}
      </p>
      {salePrice && (
      <p>
        $
        {salePrice}
      </p>
      )}
    </span>
  );
};

export default PriceTag;
