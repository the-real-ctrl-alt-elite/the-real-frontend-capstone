// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import { ReviewStars } from '../reviewRating/components/ReviewTile';
import PriceTag from './PriceTag';

const PLACEHOLDER_CURRENT_PRODUCT = {
  id: 40345,
  campus: 'hr-rfp',
  name: 'Bright Future Sunglasses',
  slogan: "You've got to wear shades",
  description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
  category: 'Accessories',
  default_price: '69.00',
  sale_price: '25.25', // this was faked
  created_at: '2021-08-13T14:38:44.509Z',
  updated_at: '2021-08-13T14:38:44.509Z',
  features: [
    {
      feature: 'Lenses',
      value: 'Ultrasheen',
    },
    {
      feature: 'UV Protection',
      value: 'true',
    },
    {
      feature: 'Frames',
      value: 'LightCompose',
    },
  ],
};

const RelatedCard = ({
  name, category, defaultPrice, rating, description, features,
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = () => {
    console.log('replace this with page navigation!');
  };

  const handleCompareClick = () => {
    setShowModal(true);
    console.log('modal should open to compare details');
  };

  return (
    <>
      <div role='button' tabIndex={0} className='product-card-container' onKeyDown={handleItemClick} onClick={handleItemClick}>
        <button onClick={() => handleCompareClick()} type='button' label='remove-item' className='compare-item-btn'>*</button>
        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png?20220519031949' alt='fake_img' />
        <div className='product-card-details'>
          <h6>{category.toUpperCase()}</h6>
          <h4>{name}</h4>
          <p>
            $
            {defaultPrice}
          </p>
          <span>
            <ReviewStars rating={rating} />
          </span>
        </div>
      </div>
      {showModal && createPortal(
        <ComparsionModalContent
          currentProduct={PLACEHOLDER_CURRENT_PRODUCT}
          selectedProduct={{
            name, category, defaultPrice, rating, description, features,
          }}
          onClose={() => setShowModal(false)}
        />,
        document.body,
      )}
    </>
  );
};

// TODO: Consider moving this to a different component

function ComparsionModalContent({ onClose, currentProduct, selectedProduct }) {
  function formatComparedFeatures(currentProductFeatures = [], selectedProductFeatures = []) {
    const map = new Map();
    currentProductFeatures.forEach((item) => map.set(item.feature, { feature: item.feature, values: { curValue: item.value } }));
    selectedProductFeatures.forEach((item) => {
      const curItem = map.get(item.feature);
      const updatedValues = { feature: item.feature, values: { ...curItem?.values, selectedValue: item.value } };
      map.set(item.feature, updatedValues);
    });
    const mergedArr = Array.from(map.values());
    return mergedArr;
  }

  return (
    <div className='overlay'>
      <div className='modal-content'>
        <table className='comparsion-table'>
          <caption>
            <h1>Comparing</h1>
          </caption>
          <thead>
            <tr>
              <th scope='col'>{currentProduct?.name}</th>
              <th scope='col'>Characteristic</th>
              <th scope='col'>{selectedProduct?.name}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div className='rating-stars-row'><ReviewStars rating={currentProduct?.rating} /></div></td>
              <td>Star Rating</td>
              <td><div className='rating-stars-row'><ReviewStars rating={selectedProduct?.rating} /></div></td>
            </tr>
            <tr>
              <td>{currentProduct?.category}</td>
              <td>Product Category</td>
              <td>{selectedProduct?.category}</td>
            </tr>
            <tr>
              <td><PriceTag defaultPrice={currentProduct?.default_price} salePrice={currentProduct?.sale_price} /></td>
              <td>Price</td>
              <td><PriceTag defaultPrice={selectedProduct?.defaultPrice} salePrice={selectedProduct?.sale_price} /></td>
            </tr>
            <tr>
              <td>{currentProduct?.description}</td>
              <td>Product Description</td>
              <td>{selectedProduct?.description}</td>
            </tr>
            {formatComparedFeatures(currentProduct?.features, selectedProduct?.features).map((item) => (
              <tr key={uuidv4()}>
                <td>{item.values?.curValue === 'true' ? '✅' : item.values?.curValue}</td>
                <td>{item.feature}</td>
                <td>{item.values?.selectedValue === 'true' ? '✅' : item.values?.selectedValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='modal-close-btn' type='button' onClick={onClose}>x</button>
      </div>
    </div>
  );
}

export default RelatedCard;
