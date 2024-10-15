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
  const [filterMessage, setFilterMessage] = useState('Showing All Reviews');

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

      let five = 0;
      let four = 0;
      let three = 0;
      let two = 0;
      let one = 0;
      if (metaData.ratings['5']) {
        five = (
          Math.round((Number(metaData.ratings['5']) / total) * 100 * 4) / 4
        ).toFixed(2);
      }
      if (metaData.ratings['4']) {
        four = (
          Math.round((Number(metaData.ratings['4']) / total) * 100 * 4) / 4
        ).toFixed(2);
      }
      if (metaData.ratings['3']) {
        three = (
          Math.round((Number(metaData.ratings['3']) / total) * 100 * 4) / 4
        ).toFixed(2);
      }
      if (metaData.ratings['2']) {
        two = (
          Math.round((Number(metaData.ratings['2']) / total) * 100 * 4) / 4
        ).toFixed(2);
      }
      if (metaData.ratings['1']) {
        one = (
          Math.round((Number(metaData.ratings['1']) / total) * 100 * 4) / 4
        ).toFixed(2);
      }

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

  const createFilterMessage = (arr) => {
    if (arr.length === 0) {
      setFilterMessage('Showing All Reviews');
    }
    arr.sort();
    if (arr.length === 1) {
      setFilterMessage(`Showing ${arr[0]} Star Reviews`);
    }
    if (arr.length === 2) {
      setFilterMessage(`Showing ${arr[0]} and ${arr[1]} Star Reviews`);
    }
    if (arr.length >= 3) {
      let msg = 'Showing ';
      let count = arr.length - 1;
      let i = 0;
      while (count > 0) {
        msg = msg.concat(`${arr[i]}, `);
        i += 1;
        count -= 1;
      }
      msg = msg.concat(`and ${arr[arr.length - 1]} Star Reviews`);
      setFilterMessage(msg);
    }
    if (arr.length === 5) {
      setFilterMessage('Showing All Reviews');
    }
  };

  const clickStarRating = (rating) => {
    const starIndex = reviewFilters.starFilter.indexOf(rating);
    const newFilter = { ...reviewFilters };
    if (starIndex !== -1) {
      newFilter.starFilter.splice(starIndex, 1);
      setReviewFilters(newFilter);
      createFilterMessage(newFilter.starFilter);
    } else {
      newFilter.starFilter.unshift(rating);
      setReviewFilters(newFilter);
      createFilterMessage(newFilter.starFilter);
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
      <small>{ filterMessage }</small>
      <div className='ratingBreakdownList'>
        {starRatings.map((star, index, array) => (
          <div
            key={Math.random()}
            className='ratingRow'
          >
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
