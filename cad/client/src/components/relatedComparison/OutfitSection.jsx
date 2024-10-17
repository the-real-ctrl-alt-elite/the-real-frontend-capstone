import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../../ProductContext';
import OutfitCard from './OutfitCard';
import HorizontalScroller from './HorizontalScroller';

const OutfitSection = () => {
  const [outfitItems, setOutfitItems] = useState([]);
  const { productData } = useContext(ProductContext);

  useEffect(() => {
    const outfitItemsData = JSON.parse(localStorage.getItem('outfitItems'));
    if (outfitItemsData) {
      setOutfitItems(outfitItemsData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('outfitItems', JSON.stringify(outfitItems));
  }, [outfitItems]);

  const addToOutfit = (newItem) => {
    const hasItem = outfitItems.some((item) => item.id === newItem.id);
    if (!hasItem) {
      setOutfitItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const removeFromOutfit = (id) => {
    setOutfitItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className='outfit-container'>
      <h3>YOUR OUTFIT</h3>
      <HorizontalScroller>
        <button className='add-outfit-btn' type='button' label='add-outfit-item' onClick={() => addToOutfit(productData)}>
          <div className='product-card-container'>
            +
          </div>
        </button>
        {outfitItems.map(({
        // eslint-disable-next-line camelcase
          id, name, category, default_price, rating,
        }) => (
          <OutfitCard
            handleRemoveClick={removeFromOutfit}
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
    </div>
  );
};

export default OutfitSection;
