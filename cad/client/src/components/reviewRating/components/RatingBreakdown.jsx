import React, { useEffect, useState } from 'react';
import { ReviewStars } from './ReviewTile';

const ReviewBreakdown = ({ fn }) => {
  const [ratingAverage, setRatingAverage] = useState(0);
  const [fiveStar, setFiveStar] = useState(0);
  const [fourStar, setFourStar] = useState(0);
  const [threeStar, setThreeStar] = useState(0);
  const [twoStar, setTwoStar] = useState(0);
  const [oneStar, setOneStar] = useState(0);

  useEffect(() => {
    // first get the big number
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    const total = fn.reviews.reduce((acc, review) => {
      if (review.rating < 2) {
        one += 1;
      }
      if (review.rating >= 2 && review.rating < 3) {
        two += 1;
      }
      if (review.rating >= 3 && review.rating < 4) {
        three += 1;
      }
      if (review.rating >= 4 && review.rating < 5) {
        four += 1;
      }
      if (review.rating === 5) {
        five += 1;
      }
      // eslint-disable-next-line no-param-reassign
      acc += review.rating;

      return acc;
    }, 0);

    const average = (Math.round((total / fn.reviews.length) * 4) / 4).toFixed(1);
    setRatingAverage(average);

    // get them percentages for the bars, my guy
    setFiveStar((five / fn.reviews.length) * 100);
    setFourStar((four / fn.reviews.length) * 100);
    setThreeStar((three / fn.reviews.length) * 100);
    setTwoStar((two / fn.reviews.length) * 100);
    setOneStar((one / fn.reviews.length) * 100);
 review-list
  }, [fn.reviews]);


  return (
    <div className='ratingBreakdown'>
      <div className='ratingBreakdownSummary'>
        <h1>{ratingAverage}</h1>
        <ReviewStars rating={ratingAverage} />
      </div>
      <div className='ratingBreakdownList'>
        <div className='ratingRow'>
          <button className='button-link' type='button'>5 stars</button>
          <div
            className='ratingsBar'
            style={{ background: `linear-gradient(to right, darkgreen, darkgreen ${fiveStar}%, grey ${fiveStar + 0.1}%, grey 100%)` }}
          />
        </div>
        <div className='ratingRow'>
          <button className='button-link' type='button'>4 stars</button>
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
          <button className='button-link' type='button'>3 stars</button>
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
          <button className='button-link' type='button'>2 stars</button>
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
          <button className='button-link' type='button'>1 stars</button>
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

export default ReviewBreakdown;
