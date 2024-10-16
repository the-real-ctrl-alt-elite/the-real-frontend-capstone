import React, { useEffect, useState } from 'react';
import { ReviewTile } from './ReviewTile';

const ReviewList = ({ fn }) => {
  // prop drill single object baby!

  return (
    <div className='reviewList'>
      {fn.activeReviews.map((review) => (
        <ReviewTile
          key={review.review_id}
          review={review}
          setPictureStatus={fn.setPictureModelStatus}
          setModalStatus={fn.setModalStatus}
        />
      ))}
      <div className='reviewsButtonContainer'>
        <div className='reviewButtonRow'>
          {fn.activeReviews.length < fn.filteredReviews.length ? <MoreReviews fn={fn} /> : ''}
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
    fn.setActiveReviews(fn.filteredReviews.slice(0, length));
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

const AddReview = ({ setReviewStatus }) => {
  //
  return (
    <div>
      <button
        className='reviewFunctionalityButton'
        type='button'
        onClick={() => { setReviewStatus(true); }}
      >
        ADD REVIEW +
      </button>
    </div>
  );
};
