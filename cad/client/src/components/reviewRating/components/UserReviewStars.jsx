import React from 'react';

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

const UserStar = ({ percentage, setUserRating, value }) => {
  const thisPercentage = percentage * 100;
  const theme = document.getElementById('theme-toggle-switch').checked;
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
        className={theme ? 'star-back fa-solid fa-jack-o-lantern userReviewStar' : 'star-back fa-solid fa-star-sharp userReviewStar'}
      />
      <i
        className={theme ? 'star-front fa-solid fa-jack-o-lantern' : 'star-front fa-solid fa-star-sharp'}
        style={{ clipPath: `inset(0 ${100 - (thisPercentage)}% 0 0)`, zIndex: '6' }}
      />
    </div>
  );
};

export default UserReviewStars;
