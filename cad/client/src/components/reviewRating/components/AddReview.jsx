import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductContext from '../../../ProductContext';
import UserRating from './UserRating';
import UserRecommend from './UserRecommend';
import UserCharacteristics from './UserCharacteristics';
import UserReview from './UserReview';
import UserReviewContactInfo from './UserReviewContactInfo';

const AddReview = ({ metaData, setReviewStatus }) => {
  const { productId } = useContext(ProductContext);
  const [reviewStep, setReviewStep] = useState(0);
  const [productInfo, setProductInfo] = useState({});
  const characteristics = Object.keys(metaData.characteristics);
  const [characteristicVotes, setCharacteristicVotes] = useState(Array(characteristics.length).fill(null));
  const [userRating, setUserRating] = useState(0);

  const [recommend, setRecommend] = useState(null);

  const [userSummary, setUserSummary] = useState('');
  const [bodyContent, setBodyContent] = useState('');
  const [userImages, setUserImages] = useState([]);

  const [userEmail, setUserEmail] = useState('');
  const [username, setUsername] = useState('');

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
    <div className='add-review-modal'>
      <div className='add-review-header-box'>
        <h3 className='add-review-header'>
          {`Writing A Review For: ${productInfo.name}`}
        </h3>
      </div>
      <UserRating
        reviewStep={reviewStep}
        userRating={userRating}
        setUserRating={setUserRating}
        setReviewStatus={setReviewStatus}
        nextStep={nextStep}
      />
      <UserRecommend
        reviewStep={reviewStep}
        recommend={recommend}
        setRecommend={setRecommend}
        backStep={backStep}
        nextStep={nextStep}
      />
      <UserCharacteristics
        characteristics={characteristics}
        characteristicVotes={characteristicVotes}
        setCharacteristicVotes={setCharacteristicVotes}
        reviewStep={reviewStep}
        backStep={backStep}
        nextStep={nextStep}
      />
      <UserReview
        reviewStep={reviewStep}
        userSummary={userSummary}
        setUserSummary={setUserSummary}
        bodyContent={bodyContent}
        setBodyContent={setBodyContent}
        setUserImages={setUserImages}
        backStep={backStep}
        nextStep={nextStep}
      />
      <UserReviewContactInfo
        userEmail={userEmail}
        setUserEmail={setUserEmail}
        username={username}
        setUsername={setUsername}
        reviewStep={reviewStep}
        backStep={backStep}
        nextStep={nextStep}
      />
    </div>
  );
};

export default AddReview;
