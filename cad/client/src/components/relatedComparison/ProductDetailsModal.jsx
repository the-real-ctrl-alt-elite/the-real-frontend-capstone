import React, { useState } from 'react';

export default function ProductDetailsModal({ isVisible, handleClose }) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isVisible && <ProductDetails onClose={handleClose} />}
    </>
  );
}

function ProductDetails({ onClose }) {
  return (
    <div className='overlay'>
      <div>This will contain details of a product item</div>
      <button type='button' label='close-btn' onClick={onClose}>Close</button>
    </div>
  );
}
