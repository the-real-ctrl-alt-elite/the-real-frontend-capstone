import React, { useState, useEffect } from 'react';
// import OutfitCard from './OutfitCard';
// import HorizontalScroller from './HorizontalScroller';
import { OutfitProvider } from '../../OutfitContext';
import OutfitItems from './OutfitItems';

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
}, {
  id: 7,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
}, {
  id: 7,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
}, {
  id: 7,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
}, {
  id: 7,
  name: 'Camo Onesie',
  category: 'Jackets',
  defaultPrice: '140',
  rating: 3,
}];

const OutfitSection = () => {
  // const [items, setItems] = useState(DEFAULT_PRODUCTS);

  // const handleAddClick = () => {
  //   // update items in outfit here w/ cur item
  // };

  // const handleRemoveClick = (itemId) => {
  //   console.log(itemId);
  //   setItems(items.filter((item) => item.id !== itemId));
  // };

  return (
    <div className='outfit-container'>
      <h3>YOUR OUTFIT</h3>
      <OutfitProvider>
        <OutfitItems />
      </OutfitProvider>
    </div>
  );
};

export default OutfitSection;
