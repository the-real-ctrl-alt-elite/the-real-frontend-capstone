import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../../ProductContext';
import OutfitCard from './OutfitCard';
import HorizontalScroller from './HorizontalScroller';
import { useOutfit } from '../../OutfitContext';

const OutfitItems = () => {
  const { outfitItems, addToOutfit, removeFromOutfit } = useOutfit();
  const { productData } = useContext(ProductContext);

  const handleAddClick = () => {
    addToOutfit(productData);
  };

  const handleRemoveClick = (itemId) => {
    removeFromOutfit(itemId);
  };

  return (
    <HorizontalScroller>
      <button className='add-outfit-btn' type='button' label='add-outfit-item' onClick={handleAddClick}>
        <div className='product-card-container'>
          +
        </div>
      </button>
      {outfitItems && outfitItems.map(({
        // eslint-disable-next-line camelcase
        id, name, category, default_price, rating,
      }) => (
        <OutfitCard
          handleRemoveClick={handleRemoveClick}
          key={id}
          id={id}
          name={name}
          category={category}
          // eslint-disable-next-line camelcase
          defaultPrice={default_price}
          rating={rating}
        />
      ))}
    </HorizontalScroller>
  );
};

export default OutfitItems;
