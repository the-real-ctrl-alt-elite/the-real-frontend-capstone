import React, { useState, useEffect } from 'react';
import RelatedCard from './RelatedCard';
import HorizontalScroller from './HorizontalScroller';

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
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  defaultPrice: '140',
  rating: 3,
  features: [
    {
      feature: 'Fabric',
      value: 'Canvas',
    },
    {
      feature: 'Lenses',
      value: 'Ultrasheen',
    },
    {
      feature: 'Buttons',
      value: 'Brass',
    },
  ],
},
{
  id: 2,
  name: 'Camo Onesie',
  category: 'Jackets',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  defaultPrice: '140',
  rating: 3,
  features: [
    {
      feature: 'Fabric',
      value: 'Canvas',
    },
    {
      feature: 'Lenses',
      value: 'Ultrasheen',
    },
    {
      feature: 'Buttons',
      value: 'Brass',
    },
  ],
},
{
  id: 3,
  name: 'Camo Onesie',
  category: 'Jackets',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  defaultPrice: '140',
  rating: 3,
  features: [
    {
      feature: 'Fabric',
      value: 'Canvas',
    },
    {
      feature: 'Lenses',
      value: 'Ultrasheen',
    },
    {
      feature: 'Buttons',
      value: 'Brass',
    },
  ],
},
{
  id: 4,
  name: 'Camo Onesie',
  category: 'Jackets',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  defaultPrice: '140',
  rating: 3,
  features: [
    {
      feature: 'Fabric',
      value: 'Canvas',
    },
    {
      feature: 'Lenses',
      value: 'Ultrasheen',
    },
    {
      feature: 'Buttons',
      value: 'Brass',
    },
  ],
},
{
  id: 5,
  name: 'Camo Onesie',
  category: 'Jackets',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  defaultPrice: '140',
  rating: 3,
  features: [
    {
      feature: 'Fabric',
      value: 'Canvas',
    },
    {
      feature: 'Lenses',
      value: 'Ultrasheen',
    },
    {
      feature: 'Buttons',
      value: 'Brass',
    },
  ],
},
{
  id: 6,
  name: 'Camo Onesie',
  category: 'Jackets',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  defaultPrice: '140',
  rating: 3,
  features: [
    {
      feature: 'Fabric',
      value: 'Canvas',
    },
    {
      feature: 'Lenses',
      value: 'Ultrasheen',
    },
    {
      feature: 'Buttons',
      value: 'Brass',
    },
  ],
},
{
  id: 7,
  name: 'Camo Onesie',
  category: 'Jackets',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  defaultPrice: '140',
  rating: 3,
  features: [
    {
      feature: 'Fabric',
      value: 'Canvas',
    },
    {
      feature: 'Lenses',
      value: 'Ultrasheen',
    },
    {
      feature: 'Buttons',
      value: 'Brass',
    },
  ],
},
{
  id: 7,
  name: 'Camo Onesie',
  category: 'Jackets',
  description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
  defaultPrice: '140',
  rating: 3,
  features: [
    {
      feature: 'Fabric',
      value: 'Canvas',
    },
    {
      feature: 'Lenses',
      value: 'Ultrasheen',
    },
    {
      feature: 'Buttons',
      value: 'Brass',
    },
  ],
}];

const RelatedSection = ({ handleProductClick }) => {
  return (
    <section className='related-container'>
      <h3>RELATED PRODUCTS</h3>
      <HorizontalScroller>
        <>
          {DEFAULT_PRODUCTS.map(({
            id, name, category, defaultPrice, rating, description, features,
          }) => (
            <RelatedCard
              handleClick={handleProductClick}
              key={id}
              id={id}
              name={name}
              category={category}
              defaultPrice={defaultPrice}
              rating={rating}
              description={description}
              features={features}
            />
          ))}
        </>
      </HorizontalScroller>

    </section>
  );
};

export default RelatedSection;
