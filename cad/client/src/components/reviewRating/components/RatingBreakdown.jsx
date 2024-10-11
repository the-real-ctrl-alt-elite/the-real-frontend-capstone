import React, { useEffect, useState, useContext } from 'react';
import { ReviewStars } from './ReviewTile';
import ProductContext from '../../../ProductContext';

const RatingBreakdown = ({ fn, metaData }) => {
  const { productId } = useContext(ProductContext);
  const [ratingAverage, setRatingAverage] = useState(0);
  const [fiveStar, setFiveStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [oneStar, setOneStar] = useState(0);
  const [recommendRate, setRecommendRate] = useState(0);

  useEffect(() => {
    if (metaData && metaData.recommended) {
      const total = Number(metaData.recommended.false) + Number(metaData.recommended.true);
      let percentage = Number(metaData.recommended.true / total);
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
      const starCounts = Object.values(metaData.ratings);
      let totalStars = 0;
      starCounts.forEach((val, index) => {
        const workingTotal = val * (index + 1);
        totalStars += Number(workingTotal);
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
        <div className='ratingRow'>
          <button className='button-link' type='button'>
            5 stars
          </button>
          <div
            className='ratingsBar'
            style={{
              background: `linear-gradient(to right, darkgreen, darkgreen ${fiveStar}%, grey ${
                fiveStar + 0.1
              }%, grey 100%)`,
            }}
          />
        </div>
        <div className='ratingRow'>
          <button className='button-link' type='button'>
            4 stars
          </button>
          <div
            className='ratingsBar'
            style={{
              background: `linear-gradient(to right, darkgreen, darkgreen ${fourStar}%, grey ${
                fourStar + 0.1
              }%, grey 100%)`,
            }}
          />
        </div>
        <div className='ratingRow'>
          <button className='button-link' type='button'>
            3 stars
          </button>
          <div
            className='ratingsBar'
            style={{
              background: `linear-gradient(to right, darkgreen, darkgreen ${threeStar}%, grey ${
                threeStar + 0.1
              }%, grey 100%)`,
            }}
          />
        </div>
        <div className='ratingRow'>
          <button className='button-link' type='button'>
            2 stars
          </button>
          <div
            className='ratingsBar'
            style={{
              background: `linear-gradient(to right, darkgreen, darkgreen ${twoStar}%, grey ${
                twoStar + 0.1
              }%, grey 100%)`,
            }}
          />
        </div>
        <div className='ratingRow'>
          <button className='button-link' type='button'>
            1 stars
          </button>
          <div
            className='ratingsBar'
            style={{
              background: `linear-gradient(to right, darkgreen, darkgreen ${oneStar}%, grey ${
                oneStar + 0.1
              }%, grey 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingBreakdown;
