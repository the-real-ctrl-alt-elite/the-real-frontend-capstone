import React, { useState, useEffect } from 'react';

const Purchase = (props) => {

  useEffect(() => {

  }, [props]);

  return (
    <div className='purchase-div'>
      <div className='checkout-container'>
      <div className='price-div'>
              {
                props.currentStyle.sale_price ? (
                  <div className='price-sale-div'>
                    <div className="sale-price">
                      <sup>$</sup>
                      <span className="price">{props.currentStyle.sale_price}</span>
                    </div>
                    <div className="original-price">
                      Originally: <span className="strikethrough"><sup>$</sup>{props.currentStyle.original_price}</span>
                    </div>
                    <div className="percent-discount">
                      <strong>-{Math.abs(+props.currentStyle.percent_change)}%</strong>
                    </div>
                  </div>
                ) : (
                  <div>
                    <sup>$</sup>
                    <span className="price">{props.money.dollar}</span>
                    <sup style={{ textDecoration: 'underline' }}>{props.money.cent}</sup>
                  </div>
                )
              }
            </div>
        <select>Select
          <option></option>
        </select>
      </div>
    </div>
  );
};

export default Purchase;
