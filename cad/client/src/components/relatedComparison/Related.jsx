import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

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
  id: 1,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
},
{
  id: 1,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
},
{
  id: 1,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
},
{
  id: 1,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
},
{
  id: 1,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
},
{
  id: 1,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
}];

const Related = (props) => {
  return (
    <div className='related-container'>
      <h3>RELATED PRODUCTS</h3>
      <div className='card-container'>
        {DEFAULT_PRODUCTS.map(({
          id, name, category, defaultPrice, rating,
        }) => (
          <ProductCard
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
