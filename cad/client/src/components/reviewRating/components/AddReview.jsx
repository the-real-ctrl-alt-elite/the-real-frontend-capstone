import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductContext from '../../../ProductContext';
import DragAndDrop from './DragAndDrop';

const AddReview = ({ metaData }) => {
  const { productId } = useContext(ProductContext);
  const [reviewFrame, setReviewFrame] = useState([true, true, true]);
  const [productInfo, setProductInfo] = useState({});
  const characteristics = Object.keys(metaData.characteristics);
  const [userRating, setUserRating] = useState(0);
  const [ratingDescription, setRatingDescription] = useState('');

  const [votingDone, setVotingDone] = useState(false);
  const [recommend, setRecommend] = useState(null);
  const [firstMsg, setFirstMsg] = useState([
    'Please rate the product',
    'Please select whether or not you would recommend this product to others',
    'Please rate each of the product characteristics',
  ]);

  const [userSummary, setUserSummary] = useState('');
  const [summaryCharsLeft, setSummaryCharsLeft] = useState(60);

  const [bodyContent, setBodyContent] = useState('');
  const [bodyCharsLeft, setBodyCharsLeft] = useState(100);
  const [userImages, setUserImages] = useState([]);

  const [showContactInfo, setShowContactInfo] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailWarning, setEmailWarning] = useState('Please enter a valid email address');
  const [username, setUsername] = useState('');

  const [showCharacteristics, setShowCharacteristics] = useState(true);
  const [showBody, setShowBody] = useState(false);
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

  const changeReviewFrame = (index) => {
    const temp = reviewFrame.slice();
    temp[index] = false;
    setReviewFrame(temp);
  };

  const firstTest = () => {
    return (votingDone && reviewFrame[0] && recommend !== null && userRating !== 0);
  };

  useEffect(() => {
    switch (userRating) {
      case 1:
        setRatingDescription(' - Poor');
        break;
      case 2:
        setRatingDescription(' - Fair');
        break;
      case 3:
        setRatingDescription(' - Average');
        break;
      case 4:
        setRatingDescription(' - Good');
        break;
      case 5:
        setRatingDescription(' - Great!');
        break;
      default:
        setRatingDescription('');
        break;
    }
  }, [userRating]);

  useEffect(() => {
    const msg = [];
    if (userRating === 0) {
      msg.push('Please rate the product');
    }
    if (recommend === null) {
      msg.push('Please select whether or not you would recommend this product to others');
    }
    if (!votingDone) {
      msg.push('Please rate each of the product characteristics');
    }
    if (msg.length === 0) {
      msg.push('Thank you!');
    }
    setFirstMsg(msg);
  }, [votingDone, recommend, userRating]);

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
    setSummaryCharsLeft(60 - userSummary.length);
  }, [userSummary]);

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
    <div
      className='addReviewBox'
    >
      <h2>Create A Review</h2>
      <h3>{productInfo.name}</h3>
      <form>
        <h4>Overall Rating</h4>
        <div className='userRating'>
          <UserReviewStars userRating={userRating} setUserRating={setUserRating} />
          <span>{ratingDescription}</span>
        </div>
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
              onChange={(e) => {
                setRecommend(e.target.value);
              }}
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
              onChange={(e) => {
                setRecommend(e.target.value);
              }}
            />
            No
          </label>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              width: '2rem',
            }}
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setShowCharacteristics(!showCharacteristics);
              setShowBody(false);
              setShowContactInfo(false);
            }}
          >
            {showCharacteristics ? '- ' : '+ '}
          </button>
          <h4>Product Characteristics</h4>
        </div>
        {characteristics && showCharacteristics && characteristics.map((category) => (
          <div key={category}>
            <h5>{category}</h5>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {categoryVotes[category].map((choice, index) => (
                <div className='characteristicVoteBox'>
                  <label htmlFor={choice} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    {index + 1}
                    <input
                      type='radio'
                      id={choice}
                      name={category}
                      value={index}
                      checked={checkDefaultValue(category, index)}
                      onChange={() => { handleRadioChange(category, index); }}
                    />
                    <small>{choice}</small>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        {showCharacteristics
            && (
            <div style={{
              display: 'flex', justifyContent: 'center', margin: '1rem', flexDirection: 'column', alignItems: 'center',
            }}
            >
              {reviewFrame[0]
                && (
                <div>
                  {firstMsg.map((msg) => (
                    <div><small>{msg}</small></div>
                  ))}
                </div>
                )}
              {firstTest()
                && (
                <button
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    setShowCharacteristics(!showCharacteristics);
                    setShowBody(!showBody);
                    changeReviewFrame(0);
                  }}
                >
                  Next
                </button>
                )}
            </div>
            )}
        {!reviewFrame[0]
              && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    width: '2rem',
                  }}
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    setShowCharacteristics(false);
                    setShowBody(!showBody);
                    setShowContactInfo(false);
                  }}
                >
                  {showBody ? '- ' : '+ '}
                </button>
                <h4>My Review</h4>
              </div>
              )}
        {!reviewFrame[0] && showBody
              && (
              <div style={{ position: 'relative' }}>
                <label htmlFor='reviewSummary'>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}
                  >
                    <span>
                      <i
                        className={
                          userSummary.length
                            ? 'fa-solid fa-check'
                            : 'fa-solid fa-x'
                        }
                      />
                    </span>
                    Review Summary
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
                  <small>
                    {summaryCharsLeft !== 1 ? `${summaryCharsLeft} characters remaining` : '1 character remaining'}
                    {' '}
                  </small>
                </div>
                <label htmlFor='reviewBody'>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}
                  >
                    <span>
                      <i
                        className={
                          bodyContent.length >= 50
                            ? 'fa-solid fa-check'
                            : 'fa-solid fa-x'
                        }
                      />
                    </span>
                    Review Body
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
                      rows={20}
                      cols={50}
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
                    : userSummary.length > 0 && reviewFrame[1]
                    && (
                    <button
                      type='button'
                      style={{ padding: '.25rem' }}
                      onClick={(e) => {
                        e.preventDefault();
                        changeReviewFrame(1);
                        setShowBody(!showBody);
                        setShowContactInfo(!showContactInfo);
                      }}
                    >
                      Next
                    </button>
                    )}
                </div>
              </div>
              )}
        {!reviewFrame[1]
              && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    width: '2rem',
                  }}
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    setShowCharacteristics(false);
                    setShowBody(false);
                    setShowContactInfo(!showContactInfo);
                  }}
                >
                  {showContactInfo ? '- ' : '+ '}
                </button>
                <h4>Contact Information</h4>
              </div>
              )}
        {!reviewFrame[1] && showContactInfo
              && (
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
              )}
        {showContactInfo && validEmail && username.length
              && (
              <div style={{ width: '60%', display: 'flex', justifyContent: 'center' }}>
                <button
                  type='button'
                >
                  Submit Review
                </button>
              </div>
              )}
      </form>
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
