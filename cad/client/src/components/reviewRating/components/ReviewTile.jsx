import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const ReviewTile = ({ review, setPictureStatus, setModalStatus }) => {
  const [expanded, setExpanded] = useState(false);

  // single object to pass multiple props with as needed
  const fn = {
    review,
    expanded,
    setExpanded,
  };

  return (
    <div
      className='reviewTile'
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '0 .25rem',
          height: '15%',
        }}
        className='reviewTileHeader'
      >
        <ReviewStars rating={review.rating} />
        <div>
          <small>
            {' '}
            {review.reviewer_name}
            ,
            {'  '}
            {' '}
            {format(review.date, 'MMMM dd, y')}
          </small>
        </div>
      </div>
      <div className='reviewSummary'>
        {review.summary.substring(0, 60)}
      </div>
      <div style={{ height: '55%' }} className='reviewBody'>
        {expanded === true ? (
          <ExpandedBody fn={fn} />
        ) : (
          <CollapsedBody fn={fn} />
        )}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            margin: '.25rem 0',
            padding: '.25rem',
          }}
          className='picturesContainer'
        >
          {review.photos.map((img) => (
            <ReviewImageThumbnail img={img} key={img.url} setPictureStatus={setPictureStatus} setModalStatus={setModalStatus} />
          ))}
        </div>
      </div>
      {review.recommend === true && <Recommend /> }
      {review.response !== null && <Response response={review.response} /> }
      <FeedbackFooter review={review} />
      <hr className='reviewTileHR' />
    </div>
  );
};

const ReviewStars = ({ rating }) => {
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
  }(rating));

  return (
    <div style={{ display: 'flex' }}>
      {stars.map((star) => (
        <Star percentage={star} key={Math.random()} />
      ))}
    </div>
  );
};

const Star = ({ percentage }) => {
  // this is used to double stars to the same absolute posiition, so that you can have these
  // partial fills with the clipPath css property
  const thisPercentage = percentage * 100;
  const theme = document.getElementById('theme-toggle-switch').checked;
  return (
    <div className='star-wrapper'>
      <i className={theme ? 'star-back fa-solid fa-jack-o-lantern' : 'star-back fa-solid fa-star-sharp'}> </i>
      <i
        className={theme ? 'star-front fa-solid fa-jack-o-lantern' : 'star-front fa-solid fa-star-sharp'}
        style={{ clipPath: `inset(0 ${100 - (thisPercentage)}% 0 0)` }}
      />
      <i />
    </div>
  );
};

const CollapsedBody = ({ fn }) => {
  //
  return (
    <div className='reviewBody'>
      <div
        style={{ fontWeight: 'bold', color: 'rgba(82,82,82)' }}
      >
        {fn.review.summary.length > 60
          ? `...${fn.review.summary.substring(60)}`
          : ''}
      </div>
      {fn.review.body.slice(0, 250)}
      {fn.review.body.length > 250 ? (
        <small>
          ...
          <button
            type='button'
            className='button-link small'
            onClick={() => {
              fn.setExpanded(!fn.expanded);
            }}
          >
            Show More
          </button>
        </small>
      ) : (
        ''
      )}
    </div>
  );
};

const ExpandedBody = ({ fn }) => {
  //
  return (
    <div
      className='reviewBody'
    >
      <div
        style={{ fontWeight: 'bold', color: 'rgba(82,82,82)' }}
      >
        {fn.review.summary.length > 60
          ? `...${fn.review.summary.substring(60)}`
          : ''}
      </div>
      {fn.review.body}
      {fn.review.body.length > 250 ? (
        <small>
          {' '}
          <button
            type='button'
            className='button-link small'
            onClick={() => {
              fn.setExpanded(!fn.expanded);
            }}
          >
            Show Less
          </button>
        </small>
      ) : (
        ''
      )}
    </div>
  );
};

const ReviewImageThumbnail = ({ img, setPictureStatus, setModalStatus }) => {
  const handleClick = () => {
    const top = document.body.scrollTop;
    setPictureStatus([img.url, top]);
    setModalStatus(true);
  };

  return (

    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      onClick={() => { handleClick(); }}
      style={{
        maxHeight: '5rem', maxWidth: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
      }}
    >
      <img
        alt=''
        src={img.url}
        style={{
          maxHeight: '4rem', maxWidth: '4rem', objectFit: 'contain', boxShadow: '4px 2px 5px 2px black',
        }}
      />
    </div>
  );
};

const Response = ({ response }) => {
  //
  return (
    <div
      className='sellerResponse'
      style={{
        margin: '.25rem 0',
        padding: '.5rem',
        backgroundColor: 'rgba(125,155,155,.33',
        borderRadius: '1em',
        fontSize: '14px',
        color: 'rgba(82,82,82)',
      }}
    >
      <div style={{ fontWeight: '1000', fontSize: '12px', color: 'rgba(82,82,82)' }}>RESPONSE FROM SELLER </div>
      {response}
    </div>
  );
};

const Recommend = () => {
  //
  return (
    <div className='reviewRecommend'>
      <i className='fa-solid fa-check' />
      {' '}
      I recommend this product
    </div>
  );
};

const FeedbackFooter = ({ review }) => {
  const [helpfulness, setHelpfulness] = useState(review.helpfulness);
  const [clicked, setClicked] = useState(false);
  const [reported, setReported] = useState('Report');

  const handleClick = () => {
    if (clicked === false) {
      setHelpfulness(helpfulness + 1);
      setClicked(true);
    }
  };

  const handleNoClick = () => {
    setReported('Reported');
  };

  return (
    <div style={{ position: 'relative', bottom: '0', padding: '0.5rem 0' }} className='reviewFooter'>
      <small> Helpful? </small>
      <small>
        {' '}
        <button
          className='button-link small'
          onClick={() => handleClick()}
          type='button'
        >
          Yes
        </button>
        <span className='button-link small' style={{ border: 'none' }}>
          {`(${helpfulness})`}
        </span>
        {' '}
      </small>
      <small>|</small>
      <small>
        {' '}
        <button
          className='button-link small'
          onClick={() => handleNoClick()}
          type='button'
        >
          {reported}
        </button>
      </small>
    </div>
  );
};

export {
  FeedbackFooter, ReviewImageThumbnail, ReviewTile, ReviewStars, Star,
};
