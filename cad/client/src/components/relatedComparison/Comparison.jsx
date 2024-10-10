import React, { useState, useEffect } from 'react';
import OutfitCard from './OutfitCard';


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

const Comparison = (props) => {
  // TODO: UseEffect to load data related currently selected product

  return (
    <div className='comparison-container'>
      <h3>YOUR OUTFIT</h3>
      <div className='cards-container'>
        <button className='add-outfit-btn' type='button' label='add-outfit-item'>
          <div className='product-card-container'>
            +
          </div>
        </button>
        {DEFAULT_PRODUCTS.map(({
          id, name, category, defaultPrice, rating,
        }) => (
          <OutfitCard
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

export default Comparison;
