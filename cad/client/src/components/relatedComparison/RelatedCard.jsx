// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ReviewStars } from '../reviewRating/components/ReviewTile';

const RelatedCard = ({
  name, category, defaultPrice, rating, handleClick,
}) => {
  const handleItemClick = () => {
    console.log('itemClicked!');
  };

  const handleCompareClick = () => {
    handleClick();
    console.log('detailsClicked!');
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={handleItemClick} className='product-card-container'>
      <button onClick={handleCompareClick} type='button' label='remove-item' className='compare-item-btn'>*</button>
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
    </div>
  );
};

export default RelatedCard;
