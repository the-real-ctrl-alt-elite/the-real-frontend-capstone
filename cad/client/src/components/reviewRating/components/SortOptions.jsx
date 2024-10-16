import React, { useEffect, useState } from 'react';

const SortOptions = ({ fn }) => {
  const options = ['relevance', 'most helpful', 'newest'];
  const [selectValue, setSelectValue] = useState(options[0]);

  const updateReviewFilters = (e) => {
    const newFilter = { ...fn.reviewFilters };
    newFilter.selectFilter[0] = e.target.value;
    setSelectValue(e.target.value);
    fn.setReviewFilters(newFilter);
  };

  return (
    <div style={{ marginLeft: '1.5rem' }} className='reviewSortOptionsHeader'>
      <span>{`${fn.reviews.length} reviews, `}</span>
      {' '}
      <label htmlFor='ratingSelect' style={{ fontSize: '1.125rem' }}>
      &nbsp; sorted by
        <select
          style={{
            color: 'rgba(82,82,82)',
            fontSize: '17px',
            fontWeight: '700',
            border: 'none',
            backgroundColor: 'transparent',
            textDecoration: 'underline',
          }}
          name='ratingsSelect'
          id='ratingsSelect'
          value={selectValue}
          onChange={(e) => {
            updateReviewFilters(e);
          }}
        >
          {options.map((option) => (
            <option key={option} name={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default SortOptions;
