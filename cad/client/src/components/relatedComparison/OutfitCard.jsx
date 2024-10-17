import React, { useState, useEffect } from 'react';
import { ReviewStars } from '../reviewRating/components/ReviewTile';

const OutfitCard = ({
  name, id, category, defaultPrice, rating, handleRemoveClick, photo,
}) => {
  return (
    <section className='product-card-container'>
      <button onClick={() => handleRemoveClick(id)} type='button' label='remove-item' className='remove-item-btn'>
        <i className='fa-solid fa-xmark' style={{ color: '#ffffff', margin: 'auto' }} />
      </button>
      <img className='product-card-img' src={photo?.url} alt='fake_img' />
      <div className='product-card-details'>
        <h6>{category?.toUpperCase()}</h6>
        <h4>{name}</h4>
        <p>
          $
          {defaultPrice}
        </p>
        <span>
          <ReviewStars rating={rating} />
        </span>
      </div>
    </section>
  );
};

export default OutfitCard;
