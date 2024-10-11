import React, { useEffect, useState } from 'react';

const SortOptions = ({ fn }) => {
  const options = ['relevance', 'most useful', 'newest'];

  const ReviewSorter = () => {
    const [selectValue, setSelectValue] = useState(options[0]);

    return (
      <select
        style={{
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
          setSelectValue(e.target.value);
        }}
      >
        {options.map((option) => (
          <option key={option} name={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div style={{ marginLeft: '1.5rem' }} className='reviewSortOptionsHeader'>
      <span>{`${fn.reviews.length} reviews, ` + ' ' + ' sorted by '}</span>
      {' '}
      <ReviewSorter />
    </div>
  );
};

export default SortOptions;
