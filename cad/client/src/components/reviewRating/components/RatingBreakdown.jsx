import React, { useEffect, useState, useContext } from 'react';
import { ReviewStars } from './ReviewTile';
import ProductContext from '../../../ProductContext';

const RatingBreakdown = ({ metaData, reviewFilters, setReviewFilters }) => {
  const { productId } = useContext(ProductContext);
  const [ratingAverage, setRatingAverage] = useState(0);
  const [fiveStar, setFiveStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [oneStar, setOneStar] = useState(0);
  const [recommendRate, setRecommendRate] = useState(0);
  const [starRatings, setStarRatings] = useState([fiveStar, fourStar, threeStar, twoStar, oneStar]);

  useEffect(() => {
    if (metaData && metaData.recommended) {
      let falseVote = 0;
      let trueVote = 0;
      if (metaData.recommended.true) {
        trueVote = Number(metaData.recommended.true);
      }
      if (metaData.recommended.false) {
        falseVote = Number(metaData.recommended.false);
      }
      const total = falseVote + trueVote;
      let percentage = Number(trueVote / total);
      percentage = (percentage * 100).toFixed(0);
      setRecommendRate(percentage);

      const five = (
        Math.round((Number(metaData.ratings['5']) / total) * 100 * 4) / 4
      ).toFixed(2);
      const four = (
        Math.round((Number(metaData.ratings['4']) / total) * 100 * 4) / 4
      ).toFixed(2);
      const three = (
        Math.round((Number(metaData.ratings['3']) / total) * 100 * 4) / 4
      ).toFixed(2);
      const two = (
        Math.round((Number(metaData.ratings['2']) / total) * 100 * 4) / 4
      ).toFixed(2);
      const one = (
        Math.round((Number(metaData.ratings['1']) / total) * 100 * 4) / 4
      ).toFixed(2);
      const starCounts = [
        metaData.ratings['1'],
        metaData.ratings['2'],
        metaData.ratings['3'],
        metaData.ratings['4'],
        metaData.ratings['5'],
      ];

      let totalStars = 0;
      starCounts.forEach((val, index) => {
        if (val) {
          const workingTotal = val * (index + 1);
          totalStars += Number(workingTotal);
        }
      });
      const average = (totalStars / total).toFixed(1);
      setRatingAverage(average);
      setFiveStar(Number(five));
      setFourStar(Number(four));
      setThreeStar(Number(three));
      setTwoStar(Number(two));
      setOneStar(Number(one));
    }
  }, [metaData, metaData?.ratings, metaData?.recommended?.false, metaData?.recommended?.true, productId]);

  useEffect(() => {
    setStarRatings([fiveStar, fourStar, threeStar, twoStar, oneStar]);
  }, [fiveStar, fourStar, threeStar, twoStar, oneStar]);

  const clickStarRating = (rating) => {
    const starIndex = reviewFilters.starFilter.indexOf(rating);
    const newFilter = { ...reviewFilters };
    if (starIndex !== -1) {
      newFilter.starFilter.splice(starIndex, 1);
      setReviewFilters(newFilter);
    } else {
      newFilter.starFilter.push(rating);
    }
  };

  return (
    <div className='ratingBreakdown'>
      <div className='ratingBreakdownSummary'>
        <h1>{ratingAverage}</h1>
        <ReviewStars rating={ratingAverage} />
      </div>
      <small
        style={{
          fontSize: '.8675rem',
          marginBottom: '.5rem',
          marginLeft: '.25rem',
        }}
      >
        {`${recommendRate}% of reviews recommend this product`}
      </small>
      <div className='ratingBreakdownList'>
        {starRatings.map((star, index, array) => (
          <div className='ratingRow'>
            <button
              onClick={() => { clickStarRating(array.length - index); }}
              className='button-link'
              type='button'
            >
              {index !== 4 ? `${array.length - index} Stars` : '1 Star'}
            </button>
            <div
              className='ratingsBar'
              style={{
                background: `linear-gradient(to right, darkgreen, darkgreen ${star}%, grey ${
                  star + 0.1
                }%, grey 100%)`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingBreakdown;
