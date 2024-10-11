import React, { useEffect, useState } from 'react';
import { ReviewTile } from './ReviewTile';

const ReviewList = ({ fn }) => {
  // prop drill single object baby!

  return (
    <div className='reviewList'>
      {fn.activeReviews.map((review) => (
        <ReviewTile key={review.review_id} review={review} />
      ))}
      <div className='reviewsButtonContainer'>
        <div className='reviewButtonRow'>
          {fn.activeReviews.length < fn.reviews.length ? <MoreReviews fn={fn} /> : ''}
          <AddReview />
        </div>
      </div>
    </div>
  );
};

export default ReviewList;

const MoreReviews = ({ fn }) => {
  const handleClick = () => {
    let { length } = fn.activeReviews;
    length += 2;
    fn.setActiveReviews(fn.reviews.slice(0, length));
  };

  return (
    <div>
      <button
        type='button'
        className='reviewFunctionalityButton'
        onClick={() => {
          handleClick();
        }}
      >
        MORE REVIEWS
      </button>
    </div>
  );
};

const AddReview = () => {
  //
  return (
    <div>
      <button className='reviewFunctionalityButton' type='button'>ADD REVIEW +</button>
    </div>
  );
};
