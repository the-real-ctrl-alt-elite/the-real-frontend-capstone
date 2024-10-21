import React, { useState, useEffect } from 'react';

const Purchase = (props) => {

  useEffect(() => {

  }, [props]);

  return (
    <div className='purchase-div'>
      <div className='checkout-container'>
        <div className='price-div'>
          <sup>$</sup>
          <span className='price'>{props.money.dollar}</span>
          <sup style={{ textDecoration: 'underline' }}>{props.money.cent}</sup>
        </div>
        <select>Select
          <option></option>
        </select>
      </div>
    </div>
  );
};

export default Purchase;
