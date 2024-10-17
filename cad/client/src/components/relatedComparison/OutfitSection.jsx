import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../../ProductContext';
import OutfitCard from './OutfitCard';
import HorizontalScroller from './HorizontalScroller';

const OutfitSection = () => {
  const [outfitItems, setOutfitItems] = useState([]);
  const { productData, productStyles, productId } = useContext(ProductContext);

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
    console.log('newItem', newItem);
    if (!hasItem) {
      setOutfitItems((prevItems) => [...prevItems, newItem]);
    }
  };

  const removeFromOutfit = (id) => {
    setOutfitItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  console.log('styles/id', productStyles, productId);

  return (
    <section className='outfit-container'>
      <h3>YOUR OUTFIT</h3>
      <HorizontalScroller>
        <button className='add-outfit-btn' type='button' label='add-outfit-item' onClick={() => addToOutfit({ ...productData, photo: productStyles?.results[0]?.photos[0] })}>
          <div className='product-card-container'>
            +
          </div>
        </button>
        {outfitItems.map(({
        // eslint-disable-next-line camelcase
          id, name, category, default_price, rating, photo,
        }) => (
          <OutfitCard
            handleRemoveClick={removeFromOutfit}
            key={id}
            id={id}
            photo={photo}
            name={name}
            category={category}
          // eslint-disable-next-line camelcase
            defaultPrice={default_price}
            rating={rating}
          />
        ))}
      </HorizontalScroller>
    </section>
  );
};

export default OutfitSection;
