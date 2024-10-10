import React, { useState, useEffect } from 'react';
import ReviewList from './components/ReviewList.jsx';
import ReviewTile from './components/ReviewTile.jsx';
import ProductBreakdown from './components/ProductBreakdown.jsx';
import RatingBreakdown from './components/RatingBreakdown.jsx';
import SortOptions from './components/SortOptions.jsx';

const Rating = (props) => {
//

  return (
    <div
    style={{width: '66%', display: 'grid', gridTemplateColumns: '3fr 7fr'}}
    className='rating-container'>
      <RatingBreakdown />
      <SortOptions />
      <ProductBreakdown />
      <ReviewList />
    </div>
  );
};

export default Rating;
<<<<<<< HEAD

// if less than 2 reviews, the 'more reviews' button should be hidden => {reviews.length > 2 {button} : ''};
// if activeReviews.length < reviews.length, then <button> needs to be appended;
// max height = 100vh; overflow-y: scroll;
// the order of reviews should change;
  // date (oldest, newest);
  // ratings (highest, lowest);
// if no reviews, collapse reviewsList section and just show submit a new review near top of module;
=======
>>>>>>> a3e45798c048a11fb36f2aafe4b3bb5fbe622277
