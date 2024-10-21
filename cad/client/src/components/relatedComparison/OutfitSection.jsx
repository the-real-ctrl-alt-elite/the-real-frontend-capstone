import React, { useState, useEffect, useContext } from 'react';
import ProductContext from '../../ProductContext';
import OutfitCard from './OutfitCard';
import HorizontalScroller from './HorizontalScroller';
import { getDefaultStyle } from './helpers/styleHelpers';

const OutfitSection = () => {
  const [outfitItems, setOutfitItems] = useState([]);
  const { productData, productStyles, starCount } = useContext(ProductContext);

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
    if (!newItem.id) {
      console.log('Error occurred adding product item to outfit -- No product Id');
      return;
    }
    const hasItem = outfitItems.some((item) => item.id === newItem.id);
    if (!hasItem) {
      setOutfitItems((prevItems) => [newItem, ...prevItems]);
    }
  };

  const removeFromOutfit = (id) => {
    setOutfitItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <section className='outfit-container'>
      <h3>YOUR OUTFIT</h3>
      <HorizontalScroller>
        <button
          className='add-outfit-btn'
          type='button'
          label='add-outfit-item'
          onClick={() => addToOutfit(
            {
              ...productData,
              photos: getDefaultStyle(productStyles)?.photos[0],
              sale_price: getDefaultStyle(productStyles)?.sale_price,
              rating: starCount,
            },
          )}
        >
          <div className='product-card-container'>
            +
          </div>
        </button>
        {outfitItems.map(({
          // eslint-disable-next-line camelcase
          id, name, category, default_price, sale_price, photos, rating,
        }) => (
          <OutfitCard
            handleRemoveClick={removeFromOutfit}
            key={id}
            id={id}
            salePrice={sale_price}
            photos={photos}
            name={name}
            category={category}
            rating={rating}
          // eslint-disable-next-line camelcase
            defaultPrice={default_price}
          />
        ))}
      </HorizontalScroller>

    </section>
  );
};

export default OutfitSection;
