import React, { useEffect, useState } from 'react';
import DragAndDrop from './DragAndDrop';
import ReviewSectionFooter from './ReviewSectionFooter';

const UserReview = ({
  reviewStep,
  userSummary,
  setUserSummary,
  bodyContent,
  setBodyContent,
  setUserImages,
  backStep,
  nextStep,
}) => {
  const [bodyCharsLeft, setBodyCharsLeft] = useState(100);
  //
  useEffect(() => {
    setBodyCharsLeft(1000 - bodyContent.length);
  }, [bodyContent]);

  return (
    <div className={reviewStep === 3 ? 'add-review-section active' : 'add-review-section'}>
      <div className='neat-line' />
      <div className='add-review-section-row'>
        <div className='add-review-section-header'>
          <h4 className='add-review-section-bubble'>
            4
          </h4>
          <h4 className='add-review-section-title'>
            Tell Us Why
          </h4>
          <div className='add-review-section-status'>
            <i className={bodyContent.length >= 50 && userSummary.length ? 'fa-regular fa-check reviewIcon' : 'fa-regular fa-x reviewIcon'} />
          </div>
        </div>
      </div>
      {reviewStep === 3
      && (
      <div className='add-review-section-content'>
        <div style={{ position: 'relative' }}>
          <label htmlFor='reviewSummary'>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}
            >
              <span>
                <i
                  className={
                      userSummary.length
                        ? 'fa-solid fa-check inputChecks'
                        : 'fa-solid fa-x inputChecks'
                    }
                />
              </span>
              <h4>Review Summary</h4>
            </div>
            <input
              placeholder='Example: Best purchase ever!'
              name='reviewSummary'
              type='text'
              id='reviewSummary'
              style={{ width: '60%', margin: '0 .5rem', padding: '.125rem' }}
              maxLength='60'
              value={userSummary}
              onChange={(e) => {
                setUserSummary(e.target.value);
              }}
            />
          </label>
          <div
            style={{ margin: '0 .5rem' }}
          >
            <div>
              <small>
                For privacy reasons, do not use your full name or email address
              </small>
            </div>
          </div>
          <label htmlFor='reviewBody'>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}
            >
              <span>
                <i
                  className={
                      bodyContent.length >= 50
                        ? 'fa-solid fa-check inputChecks'
                        : 'fa-solid fa-x inputChecks'
                    }
                />
              </span>
              <h4>Review Body</h4>
            </div>
            <div
              style={{ display: 'flex' }}
            >
              <textarea
                placeholder='Why did you like the product or not?'
                name='reviewBody'
                id='reviewBody'
                maxLength='1000'
                value={bodyContent}
                onChange={(e) => { setBodyContent(e.target.value); }}
                rows={10}
                cols={50}
                overflow='scroll'
                style={{
                  width: '60%', resize: 'none', margin: '0 .5rem', padding: '.25rem',
                }}
              />
              <DragAndDrop onFilesSelected={setUserImages} height='100%' width='40%' />
            </div>
            <small
              style={{ margin: '0 .5rem' }}
            >
              {bodyCharsLeft !== 1 ? `${bodyCharsLeft} characters remaining` : '1 character remaining'}
            </small>
          </label>
          <div style={{
            width: '60%', margin: '.5rem', display: 'flex', justifyContent: 'center',
          }}
          >
            {bodyContent.length < 50
              ? `${50 - bodyContent.length} more character(s) required to submit review`
              : null}
          </div>
        </div>
        <ReviewSectionFooter
          backFlag
          backText='Previous Step'
          backFn={backStep}
          nextFlag={bodyContent.length >= 50 && userSummary.length}
          nextText='Next Step'
          nextFn={nextStep}
        />
      </div>
      )}
    </div>
  );
};

export default UserReview;
