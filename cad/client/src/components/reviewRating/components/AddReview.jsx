import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../../../ProductContext';
import UserRating from './UserRating';
import UserRecommend from './UserRecommend';
import UserCharacteristics from './UserCharacteristics';
import UserReview from './UserReview';
import UserReviewContactInfo from './UserReviewContactInfo';
import axios from '../../../AxiosInstance';

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

  const submitReview = () => {
    const convertedImages = [];
    userImages.forEach((img) => {
      convertedImages.push(img.url);
    });
    const userCharacteristicsVotes = {};
    characteristicVotes.forEach((vote, index) => {
      userCharacteristicsVotes[Number(metaData.characteristics[characteristics[index]].id)] = vote;
    });
    const data = {
      product_id: productId,
      rating: userRating,
      summary: userSummary,
      body: bodyContent,
      recommend,
      name: username,
      email: userEmail,
      photos: convertedImages,
      characteristics: userCharacteristicsVotes,
    };

    axios.post('/reviews', data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios.get(`/products/${productId}`)
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
        submitReview={submitReview}
      />
    </div>
  );
};

export default AddReview;
