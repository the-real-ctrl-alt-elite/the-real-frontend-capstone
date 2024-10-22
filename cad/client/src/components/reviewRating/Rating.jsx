/* eslint-disable prefer-destructuring */
// necessary becasue of dotenv-webpack's compiler
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReviewList from './components/ReviewList';
import ProductBreakdown from './components/ProductBreakdown';
import RatingBreakdown from './components/RatingBreakdown';
import ReviewPictureModel from './components/ReviewPictureModel';
import ModalBackground from './components/ModalBackground';
import SortOptions from './components/SortOptions';
import AddReview from './components/AddReview';
import ProductContext from '../../ProductContext';

const Rating = () => {
  const { productId } = useContext(ProductContext);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState(reviews.slice());
  const [activeReviews, setActiveReviews] = useState(filteredReviews.slice(0, 2));
  const [metaData, setMetaData] = useState([]);
  // reviewFilters[0] = starClick, reviewFilters[1] = selectValue
  // eslint-disable-next-line no-unused-vars
  const [reviewFilters, setReviewFilters] = useState({
    starFilter: [],
    selectFilter: [],
  });
  // pass URL to pictureModelStatus
  const [pictureModelStatus, setPictureModelStatus] = useState(['', 0]);
  const [modalStatus, setModalStatus] = useState(false);
  const [reviewStatus, setReviewStatus] = useState(false);

  const TOKEN = process.env.GIT_TOKEN;
  const BASE_URL = process.env.API_BASE_URL;
  const CAMPUS = process.env.CAMPUS_CODE;

  const sortByHelpfulness = (arr) => {
    return arr.sort((a, b) => {
      if (a.helpfulness > b.helpfulness) {
        return -1;
      }
      if (a.helpfulness < b.helpfulness) {
        return 1;
      }
      return 0;
    });
  };

  const sortByRelevance = (arr) => {
    return arr.sort((a, b) => {
      const helpDif = a.helpfulness - b.helpfulness;

      if ((helpDif > 10 && (a.date > b.date)) || helpDif > 20) {
        return -1;
      }
      if ((helpDif < -10 && (a.date < b.date)) || helpDif < -20) {
        return 1;
      }
      return 0;
    });
  };

  const sortByNewest = (arr) => {
    return arr.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    });
  };

  useEffect(() => {
    if (productId) {
      const productID = productId;
      const page = 1;
      const count = 5000;
      const sort = 'relevant';

      const PRODUCT_URL = `${BASE_URL}${CAMPUS}/reviews?page=${page}&count=${count}&sort=${sort}&product_id=${productID}`;
      axios
        .get(PRODUCT_URL, {
          headers: {
            Authorization: TOKEN,
          },
        })
        .then((response) => {
          setReviews(response.data.results);
          setActiveReviews(response.data.results.slice(0, 2));
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    }
  }, [BASE_URL, CAMPUS, TOKEN, productId]);

  useEffect(() => {
    if (productId) {
      const META_URL = `${BASE_URL}${CAMPUS}/reviews/meta/?product_id=${productId}`;
      axios
        .get(META_URL, {
          headers: {
            Authorization: TOKEN,
          },
        })
        .then((response) => {
          setMetaData(response.data);
          // console.log(response.data);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    }
  }, [BASE_URL, CAMPUS, TOKEN, productId]);

  useEffect(() => {
    let temp = reviews;
    if (reviewFilters.starFilter.length > 0) {
      temp = reviews.filter((review) => reviewFilters.starFilter.includes(review.rating));
    }
    switch (reviewFilters.selectFilter[0]) {
      case 'most helpful':
        temp = sortByHelpfulness(temp);
        break;
      case 'newest':
        temp = sortByNewest(temp);
        break;
      default:
        temp = sortByRelevance(temp);
        break;
    }
    setFilteredReviews(temp);
    setActiveReviews(temp.slice(0, 2));
  }, [reviews, reviewFilters]);

  const fn = {
    activeReviews,
    setActiveReviews,
    filteredReviews,
    setFilteredReviews,
    modalStatus,
    setModalStatus,
    setPictureModelStatus,
    productId,
    reviews,
    setReviewStatus,
    reviewFilters,
    setReviewFilters,
  };

  const closePictureModal = () => {
    setModalStatus(false);
    setPictureModelStatus(['', 0]);
  };

  const closeReviewModal = () => {
    setReviewStatus(false);
  };

  return (
    <div style={{
      padding: '1rem',
      // width: '66%',
      margin: 'auto',
    }}
    >
      {modalStatus === true
        && (
        <ModalBackground
          innerBackground='none'
          component={ReviewPictureModel}
          componentProps={{ pictureModelStatus }}
          top={pictureModelStatus[1]}
          closeModal={closePictureModal}
        />
        )}
      {reviewStatus === true
        && (
          <ModalBackground
            component={AddReview}
            componentProps={{ metaData, setReviewStatus }}
            backgroundClose={false}
            closeModal={closeReviewModal}
          />
        )}
      <h3
        style={{ color: 'rgba(82,82,82)' }}
      >
        RATINGS & REVIEWS
      </h3>
      <div>
        <div className='rating-container'>
          <div className='reviewsLeft'>
            {reviews.length && <RatingBreakdown reviewFilters={reviewFilters} setReviewFilters={setReviewFilters} metaData={metaData} />}
            {reviews.length && <ProductBreakdown fn={fn} metaData={metaData} />}
          </div>
          <div className='reviewsRight'>
            <SortOptions fn={fn} />
            <ReviewList fn={fn} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Rating;

// if less than 2 reviews, the 'more reviews' button should be hidden => {reviews.length > 2 {button} : ''};
// if activeReviews.length < reviews.length, then <button> needs to be appended;
// max height = 100vh; overflow-y: scroll;
// the order of reviews should change;
// date (oldest, newest);
// ratings (highest, lowest);
// if no reviews, collapse reviewsList section and just show submit a new review near top of module;
