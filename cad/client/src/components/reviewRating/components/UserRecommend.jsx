import React, { useEffect, useState } from 'react';
import ReviewSectionFooter from './ReviewSectionFooter';

const UserRecommend = ({
  reviewStep,
  recommend,
  setRecommend,
  backStep,
  nextStep,
}) => {
  //
  return (
    <div className={reviewStep === 1 ? 'add-review-section active' : 'add-review-section'}>
      <div className='neat-line' />
      <div className='add-review-section-row'>
        <div className='add-review-section-header'>
          <h4 className='add-review-section-bubble'>
            2
          </h4>
          <h4 className='add-review-section-title'>
            Recommendation
          </h4>
          <div className='add-review-section-status'>
            <i className={recommend !== null ? 'fa-regular fa-check reviewIcon' : 'fa-regular fa-x reviewIcon'} />
          </div>
        </div>
      </div>
      {reviewStep === 1
          && (
          <div className='add-review-section-content'>
            <h4>Would You Recommend This Product?</h4>
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-around', maxWidth: '25vw', width: '30%',
              }}
            >
              <label htmlFor='yes' style={{ margin: '0 .25rem' }}>
                <input
                  type='radio'
                  id='yes'
                  name='recommend'
                  value
                  style={{
                    margin: '0 .25rem',
                  }}
                  onChange={() => {
                    setRecommend(true);
                  }}
                  defaultChecked={recommend === true}
                />
                Yes!
              </label>
              <label htmlFor='no' style={{ margin: '0 .25rem' }}>
                <input
                  type='radio'
                  id='no'
                  name='recommend'
                  value={false}
                  style={{
                    margin: '0 .25rem',
                  }}
                  onChange={() => {
                    setRecommend(false);
                  }}
                  defaultChecked={recommend === false}
                />
                No
              </label>
            </div>
            <ReviewSectionFooter
              backFlag
              backText='Previous Step'
              backFn={backStep}
              nextFlag={recommend !== null}
              nextText='Next Step'
              nextFn={nextStep}
            />
          </div>
          )}
    </div>
  );
};

export default UserRecommend;
