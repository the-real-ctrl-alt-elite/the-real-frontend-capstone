import React, { useState, useEffect } from 'react';


const Rating = (props) => {
//
const [reviews, setReviews] = useState([]);
//BRD display 2 tiles at a time
const [activeReviews, setActiveReviews] = useState(reviews.slice(0,2));

  return (
    <div className='rating-container'>
    </div>
  )
};

export default Rating;

// if less than 2 reviews, the 'more reviews' button should be hidden => {reviews.length > 2 {button} : ''};
// if activeReviews.length < reviews.length, then <button> needs to be appended;
// max height = 100vh; overflow-y: scroll;
// the order of reviews should change;
  // date (oldest, newest);
  // ratings (highest, lowest);
// if no reviews, collapse reviewsList section and just show submit a new review near top of module;