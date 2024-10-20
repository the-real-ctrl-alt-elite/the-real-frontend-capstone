import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductContext from '../../../ProductContext';
import DragAndDrop from './DragAndDrop';

const AddReview = ({ metaData, setReviewStatus }) => {
  const { productId } = useContext(ProductContext);
  const [reviewStep, setReviewStep] = useState(0);
  const [productInfo, setProductInfo] = useState({});
  const characteristics = Object.keys(metaData.characteristics);
  const [characteristicStep, setCharacteristicStep] = useState(0);
  const [characteristicVotes, setCharacteristicVotes] = useState(Array(characteristics.length).fill(null));
  const [userRating, setUserRating] = useState(0);
  const [ratingDescription, setRatingDescription] = useState('');

  const [votingDone, setVotingDone] = useState(false);
  const [recommend, setRecommend] = useState(null);

  const [userSummary, setUserSummary] = useState('');

  const [bodyContent, setBodyContent] = useState('');
  const [bodyCharsLeft, setBodyCharsLeft] = useState(100);
  const [userImages, setUserImages] = useState([]);

  const [userEmail, setUserEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailWarning, setEmailWarning] = useState('Please enter a valid email address');
  const [username, setUsername] = useState('');

  const [sizeState, setSizeState] = useState(null);
  const [widthState, setWidthState] = useState(null);
  const [comfortState, setComfortState] = useState(null);
  const [qualityState, setQualityState] = useState(null);
  const [lengthState, setLengthState] = useState(null);
  const [fitState, setFitState] = useState(null);

  const categoryVotes = {
    Size: [
      'A size too small',
      '1/2 a size too small',
      'Perfect!',
      '1/2 size too big',
      'A size too big',
    ],
    Width: [
      'Too narrow',
      'Slightly narrow',
      'Perfect!',
      'Slightly wide',
      'Too wide',
    ],
    Comfort: [
      'Uncomfortable',
      'Slightly uncomfortable',
      'Okay',
      'Comfortable',
      'Perfect!',
    ],
    Quality: [
      'Poor',
      'Below Average',
      'What I Expected',
      'Pretty great',
      'Perfect!',
    ],
    Length: [
      'Runs short',
      'Runs slightly short',
      'Perfect!',
      'Runs slightly long',
      'Runs long',
    ],
    Fit: [
      'Runs tight',
      'Runs slightly tight',
      'Perfect!',
      'Runs slightly loose',
      'Runs loose',
    ],
  };

  const checkDefaultValue = (category, index) => {
    switch (category) {
      case 'Size':
        if (sizeState === index) {
          return true;
        }
        return false;
      case 'Width':
        if (widthState === index) {
          return true;
        }
        return false;
      case 'Comfort':
        if (comfortState === index) {
          return true;
        }
        return false;
      case 'Quality':
        if (qualityState === index) {
          return true;
        }
        return false;
      case 'Length':
        if (lengthState === index) {
          return true;
        }
        return false;
      case 'Fit':
        if (fitState === index) {
          return true;
        }
        return false;
      default:
        return false;
    }
  };

  const handleRadioChange = (category, index) => {
    switch (category) {
      case 'Size':
        setSizeState(index);
        break;
      case 'Width':
        setWidthState(index);
        break;
      case 'Comfort':
        setComfortState(index);
        break;
      case 'Quality':
        setQualityState(index);
        break;
      case 'Length':
        setLengthState(index);
        break;
      case 'Fit':
        setFitState(index);
        break;
      default:
        break;
    }
  };

  const checkCharStatus = (item) => {
    if (item === 'Size') {
      return sizeState;
    }
    if (item === 'Width') {
      return widthState;
    }
    if (item === 'Comfort') {
      return comfortState;
    }
    if (item === 'Quality') {
      return qualityState;
    }
    if (item === 'Length') {
      return lengthState;
    }
    if (item === 'Fit') {
      return fitState;
    }
    return null;
  };

  const cancelReview = () => {
    setReviewStatus(false);
  };

  const findNearestNull = (index) => {
    const temp = characteristicVotes.slice();
    temp[index] = true;
    setCharacteristicVotes(temp);
    const i = temp.indexOf(null);
    console.log('arr', temp, 'index', i);
    if (i === -1) {
      return;
    }
    setCharacteristicStep(i);
  };

  const nextStep = () => {
    setReviewStep(reviewStep + 1);
    if (reviewStep + 1 === 5) {
      setReviewStatus(false);
    }
  };

  const backStep = () => {
    setReviewStep(reviewStep - 1);
  };

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

  useEffect(() => {
    const TOKEN = process.env.GIT_TOKEN;
    const BASE_URL = process.env.API_BASE_URL;
    const CAMPUS = process.env.CAMPUS_CODE;
    const URL = `${BASE_URL}${CAMPUS}/products/${productId}`;
    axios.get(URL, {
      headers: {
        Authorization: TOKEN,
      },
    })
      .then((response) => {
        setProductInfo(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [productId]);

  useEffect(() => {
    const validateRadios = () => {
      const truthTest = [];
      characteristics.forEach((item) => {
        if (item === 'Size') {
          truthTest.push(sizeState);
        }
        if (item === 'Width') {
          truthTest.push(widthState);
        }
        if (item === 'Comfort') {
          truthTest.push(comfortState);
        }
        if (item === 'Quality') {
          truthTest.push(qualityState);
        }
        if (item === 'Length') {
          truthTest.push(lengthState);
        }
        if (item === 'Fit') {
          truthTest.push(fitState);
        }
      });
      if (truthTest.every((item) => item !== null)) {
        setVotingDone(true);
      } else {
        setVotingDone(false);
      }
    };
    validateRadios();
  }, [sizeState, widthState, comfortState, qualityState, lengthState, fitState, characteristics]);

  useEffect(() => {
    setBodyCharsLeft(1000 - bodyContent.length);
  }, [bodyContent]);

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

  return (
    <div className='add-review-modal'>
      <div className='add-review-header-box'>
        <h3 className='add-review-header'>
          {`Writing A Review For: ${productInfo.name}`}
        </h3>
      </div>
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
      <div className={reviewStep === 2 ? 'add-review-section active' : 'add-review-section'}>
        <div className='neat-line' />
        <div className='add-review-section-row'>
          <div className='add-review-section-header'>
            <h4 className='add-review-section-bubble'>
              3
            </h4>
            <h4 className='add-review-section-title'>
              Characteristics
            </h4>
            <div className='add-review-section-status'>
              <i className={votingDone ? 'fa-regular fa-check reviewIcon' : 'fa-regular fa-x reviewIcon'} />
            </div>
          </div>
        </div>
        {reviewStep === 2
          && (
          <div className='add-review-section-content'>
            <h4>How Would You Rate These Product Characteristics?</h4>
            {reviewStep === 2 && characteristics.map((category, i) => (
              <div
                key={category}
                className={characteristicStep === i && 'charStepActive'}
              >
                <div
                  className='characteristicHeader'
                  onMouseEnter={() => { setCharacteristicStep(i); }}
                >
                  <i className={checkCharStatus(category) !== null ? 'fa-regular fa-check inputChecks' : 'fa-regular fa-x inputChecks'} />
                  <h5>{category}</h5>
                </div>
                <div
                  style={{ display: 'flex', justifyContent: 'space-around' }}
                >
                  {characteristicStep === i
                  && categoryVotes[category].map((choice, index) => (
                    <div className='characteristicVoteBox'>
                      <label
                        htmlFor={choice}
                        style={{
                          display: 'flex', flexDirection: 'column', textAlign: 'center',
                        }}
                      >
                        <small>{choice}</small>
                        <input
                          type='radio'
                          id={choice}
                          name={category}
                          value={index}
                          checked={checkDefaultValue(category, index)}
                          onChange={() => {
                            handleRadioChange(category, index);
                            findNearestNull(characteristicStep);
                          }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <ReviewSectionFooter
              backFlag
              backText='Previous Step'
              backFn={backStep}
              nextFlag={votingDone}
              nextText='Next Step'
              nextFn={nextStep}
            />
          </div>
          )}
      </div>
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
              nextFn={nextStep}
            />
          </div>
          )}
      </div>
    </div>
  );
};

export default AddReview;

const UserStar = ({ percentage, setUserRating, value }) => {
  const thisPercentage = percentage * 100;
  const handleClick = () => {
    setUserRating(value);
  };
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className='star-wrapper'
      onClick={() => { handleClick(); }}
      style={{ cursor: 'pointer' }}
    >
      <i
        className='star-back fa-solid fa-star-sharp userReviewStar'
      />
      <i
        className='star-front fa-solid fa-star-sharp'
        style={{ clipPath: `inset(0 ${100 - (thisPercentage)}% 0 0)`, zIndex: '6' }}
      />
    </div>
  );
};

const UserReviewStars = ({ userRating, setUserRating }) => {
  const stars = [];

  (function fillStarArray(value) {
    let subValue = value;
    while (subValue > 1) {
      subValue -= 1;
      stars.push(1);
    }
    // function in push is for rounded to nearest quarter value
    stars.push((Math.round(subValue * 4) / 4).toFixed(2));
    while (stars.length < 5) {
      stars.push(0);
    }
  }(userRating));

  return (
    <div style={{ display: 'flex', margin: '.5rem' }} className='userStarWrapper'>
      {stars.map((star, index) => (
        <UserStar percentage={star} key={Math.random()} setUserRating={setUserRating} value={index + 1} />
      ))}
    </div>
  );
};

const ReviewSectionFooter = ({
  backText,
  backFlag,
  backFn,
  nextText,
  nextFlag,
  nextFn,
}) => {
  const handleNext = (e) => {
    if (nextFlag) {
      nextFn(e);
    }
  };

  return (
    <div className='add-review-section-footer'>
      {!!backFlag
      && (
        <button
          onClick={(e) => { backFn(e); }}
          type='button'
        >
          {backText}
        </button>
      )}
      {!!nextFlag
      && (
        <button
          onClick={(e) => { handleNext(e); }}
          type='button'
        >
          {nextText}
        </button>
      )}
    </div>
  );
};
