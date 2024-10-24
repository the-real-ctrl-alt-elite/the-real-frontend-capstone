import React, { useState, useEffect } from 'react';
import { ReviewStars } from '../reviewRating/components/ReviewTile';
import PriceTag from './PriceTag';

const OutfitCard = ({
  name, id, category, defaultPrice, salePrice, rating, handleRemoveClick, photos,
}) => {
  return (
    <div className='product-card-container'>
      <button onClick={() => handleRemoveClick(id)} aria-label='remove-item-btn' type='button' label='remove-item' className='action-item-btn'>
        <i className='fa-solid fa-xmark' style={{ color: '#ffffff', margin: 'auto' }} />
      </button>
      <img className='product-card-img' src={photos?.url} alt='product-item-img' />
      <div className='product-card-details'>
        <h6>{category?.toUpperCase()}</h6>
        <h5>{name}</h5>
        <PriceTag defaultPrice={defaultPrice} salePrice={salePrice} />
        <span>
          <div
            style={{ position: 'absolute', bottom: '0.75rem' }}
          >
            <ReviewStars rating={rating} />
          </div>
        </span>
      </div>
    </div>
  );
};

export default OutfitCard;
