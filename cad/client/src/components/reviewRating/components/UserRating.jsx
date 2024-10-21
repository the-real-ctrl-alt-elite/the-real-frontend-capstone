import React, { useEffect, useState } from 'react';
import ReviewSectionFooter from './ReviewSectionFooter';
import UserReviewStars from './UserReviewStars';

const UserRating = ({
  reviewStep,
  userRating,
  setUserRating,
  setReviewStatus,
  nextStep,
}) => {
  const [ratingDescription, setRatingDescription] = useState('');

  useEffect(() => {
    switch (userRating) {
      case 1:
        setRatingDescription(' (Poor)');
        break;
      case 2:
        setRatingDescription(' (Fair)');
        break;
      case 3:
        setRatingDescription(' (Average)');
        break;
      case 4:
        setRatingDescription(' (Good)');
        break;
      case 5:
        setRatingDescription(' (Great!)');
        break;
      default:
        setRatingDescription('');
        break;
    }
  }, [userRating]);

  const cancelReview = () => {
    setReviewStatus(false);
  };

  return (
    <div className={reviewStep === 0 ? 'add-review-section active' : 'add-review-section'}>
      <div className='neat-line first-line' />
      <div className='add-review-section-row'>
        <div className='add-review-section-header'>
          <h4 className='add-review-section-bubble'>
            1
          </h4>
          <h4 className='add-review-section-title'>
            Rating
          </h4>
          <div className='add-review-section-status'>
            <i className={userRating ? 'fa-regular fa-check reviewIcon' : 'fa-regular fa-x reviewIcon'} />
          </div>
        </div>
      </div>
      {reviewStep === 0
          && (
          <div className='add-review-section-content'>
            <h4>How Would You Rate This Product Overall?</h4>
            <div className='userRating'>
              <UserReviewStars userRating={userRating} setUserRating={setUserRating} />
              <span>{ratingDescription}</span>
            </div>
            <ReviewSectionFooter
              backFlag
              backFn={cancelReview}
              backText='Cancel'
              nextFlag={userRating}
              nextText='Next Step'
              nextFn={nextStep}
            />
          </div>
          )}
    </div>
  );
};

export default UserRating;
