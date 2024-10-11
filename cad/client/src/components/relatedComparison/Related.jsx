import React, { useState, useEffect } from 'react';
import RelatedCard from './RelatedCard';

// {
//   id: 1,
//   name: 'Camo Onesie',
//   slogan: 'Blend in to your crowd',
//   description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
//   category: 'Jackets',
//   default_price: '140',
// },

const DEFAULT_PRODUCTS = [{
  id: 1,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
},
{
  id: 2,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
},
{
  id: 3,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
},
{
  id: 4,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
},
{
  id: 5,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
},
{
  id: 6,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
},
{
  id: 7,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
}];

const Related = ({ handleProductClick }) => {
  return (
    <div className='related-container'>
      <h3>RELATED PRODUCTS</h3>
      <div className='cards-container'>
        {DEFAULT_PRODUCTS.map(({
          id, name, category, defaultPrice, rating,
        }) => (
          <RelatedCard
            handleClick={handleProductClick}
            key={id}
            id={id}
            name={name}
            category={category}
            defaultPrice={defaultPrice}
            rating={rating}
          />
        ))}
      </div>
    </div>
  );
};

export default Related;
