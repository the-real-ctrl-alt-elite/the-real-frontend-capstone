import React, { useState, useEffect } from 'react';
import { ReviewStars } from '../reviewRating/components/ReviewTile';

// TODO: Update to use PriceTag instead of default price
// TODO: Star count is incorrect

const OutfitCard = ({
  name, id, category, defaultPrice, rating, handleRemoveClick, photos,
}) => {
  return (
    <div className='product-card-container'>
      <button onClick={() => handleRemoveClick(id)} type='button' label='remove-item' className='action-item-btn'>
        <i className='fa-solid fa-xmark' style={{ color: '#ffffff', margin: 'auto' }} />
      </button>
      <img className='product-card-img' src={photos?.url} alt='product-item-img' />
      <div className='product-card-details'>
        <h6>{category?.toUpperCase()}</h6>
        <h5>{name}</h5>
        <p>
          $
          {defaultPrice}
        </p>
        <span>
          <ReviewStars rating={rating} />
        </span>
      </div>
    </div>
  );
};

export default OutfitCard;
