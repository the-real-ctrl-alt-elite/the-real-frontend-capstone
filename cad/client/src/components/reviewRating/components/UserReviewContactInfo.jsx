import React, { useEffect, useState } from 'react';
import ReviewSectionFooter from './ReviewSectionFooter';

const UserReviewContactInfo = ({
  userEmail,
  setUserEmail,
  username,
  setUsername,
  reviewStep,
  backStep,
  nextStep,
  submitReview,
}) => {
  const [validEmail, setValidEmail] = useState(false);
  const [emailWarning, setEmailWarning] = useState('Please enter a valid email address');

  useEffect(() => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (regex.test(userEmail)) {
      setValidEmail(true);
      setEmailWarning('');
      return;
    }
    setValidEmail(false);
    setEmailWarning('Please enter a valid email address');
  }, [userEmail]);
  //
  return (
    <div className={reviewStep === 4 ? 'add-review-section active' : 'add-review-section'}>
      <div className='neat-line last-line' />
      <div className='add-review-section-row'>
        <div className='add-review-section-header'>
          <h4 className='add-review-section-bubble'>
            5
          </h4>
          <h4 className='add-review-section-title'>
            Contact Information
          </h4>
          <div className='add-review-section-status'>
            <i className={validEmail ? 'fa-regular fa-check reviewIcon' : 'fa-regular fa-x reviewIcon'} />
          </div>
        </div>
      </div>
      {reviewStep === 4
  && (
  <div className='add-review-section-content'>
    <div style={{ position: 'relative' }}>
      <label htmlFor='username'>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}
        >
          <span>
            <i
              className={
                  username.length
                    ? 'fa-solid fa-check'
                    : 'fa-solid fa-x'
                }
            />
          </span>
          Nickname
        </div>
        <input
          placeholder='Example: jackson11!'
          name='nickname'
          type='text'
          id='nickname'
          style={{ width: '60%', margin: '0 .5rem', padding: '.125rem' }}
          maxLength='60'
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </label>
      <label htmlFor='reviewSummary'>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}
        >
          <span>
            <i
              className={
                  validEmail
                    ? 'fa-solid fa-check'
                    : 'fa-solid fa-x'
                }
            />
          </span>
          Email
        </div>
        <input
          placeholder='Example: jackson11@email.com'
          name='email'
          type='email'
          id='email'
          style={{ width: '60%', margin: '0 .5rem', padding: '.125rem' }}
          maxLength='60'
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <div
          style={{ margin: '0 .5rem' }}
        >
          <small>{emailWarning}</small>
        </div>
        <div
          style={{ margin: '0 .5rem' }}
        >
          <small>For authentication reasons, you will not be emailed</small>
        </div>
      </label>
    </div>
    <ReviewSectionFooter
      backFlag
      backText='Previous Step'
      backFn={backStep}
      nextFlag={username.length && validEmail}
      nextText='Submit'
      nextFn={() => {
        submitReview();
        nextStep();
      }}
    />
  </div>
  )}
    </div>
  );
};

export default UserReviewContactInfo;
