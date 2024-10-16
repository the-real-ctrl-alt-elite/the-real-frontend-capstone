import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import ProductContext from '../../../ProductContext';

const AddReview = ({ componentProps }) => {
  const { productId } = useContext(ProductContext);
  const [productInfo, setProductInfo] = useState({});
  const [userRating, setUserRating] = useState(0);
  const [characteristics, setCharacteristics] = useState(Object.keys(componentProps.metaData.characteristics));
  const [recommend, setRecommend] = useState(false);
  const [userSummary, setUserSummary] = useState('');
  const [bodyContent, setBodyContent] = useState('');

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
      'Perfect',
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
  console.log(componentProps.metaData)

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
        </div>
        <h4>Would You Recommend This Product?</h4>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-around', maxWidth: '25vw', width: '30%' }}
        >
          <label htmlFor='yes' style={{ margin: '0 .25rem' }}>
            <input type='radio' id='yes' name='recommend' value='yes' style={{ margin: '0 .25rem' }} />
            Yes!
          </label>
          <small>or</small>
          <label htmlFor='no' style={{ margin: '0 .25rem' }}>
            <input type='radio' id='no' name='recommend' value='no' style={{ margin: '0 .25rem' }} />
            No
          </label>
        </div>
        <h4>Product Characteristics</h4>
        {characteristics && characteristics.map((category) => (
          <div key={category}>
            <h5>{category}</h5>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              {categoryVotes[category].map((choice, index) => (
                <div className='characteristicVoteBox'>
                  <label htmlFor={choice} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    {index + 1}
                    <input type='radio' id={choice} name={category} value={index} />
                    <small>{choice}</small>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
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
