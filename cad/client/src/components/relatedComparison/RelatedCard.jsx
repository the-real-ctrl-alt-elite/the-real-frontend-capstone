// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ReviewStars } from '../reviewRating/components/ReviewTile';

const RelatedCard = ({
  name, category, defaultPrice, rating,
}) => {
  const handleItemClick = () => {
    console.log('itemClicked!');
  };

  const handleDetailsClick = () => {
    console.log('detailsClicked!');
  };

  return (
    <button type='button' label='product-item' onClick={handleItemClick} className='product-card-container'>
      <button onClick={handleDetailsClick} type='button' label='remove-item' className='remove-item-btn'>*</button>
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png?20220519031949' alt='fake_img' />
      <div className='product-card-details'>
        <h6>{category.toUpperCase()}</h6>
        <h4>{name}</h4>
        <p>
          $
          {defaultPrice}
        </p>
        <span>
          <ReviewStars rating={rating} />
        </span>
      </div>
    </button>
  );
};

export default RelatedCard;
