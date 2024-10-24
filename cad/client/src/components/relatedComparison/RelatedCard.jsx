// eslint-disable-next-line no-unused-vars
import React, { useState, useContext, useEffect } from 'react';
import { createPortal } from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import { ReviewStars } from '../reviewRating/components/ReviewTile';
import PriceTag from './PriceTag';
import ProductContext from '../../ProductContext';
import { getDefaultStyle } from './helpers/styleHelpers';
import ModalBackground from '../reviewRating/components/ModalBackground';

const RelatedCard = ({
  name, id, category, defaultPrice, salePrice, description, features, photos, rating,
}) => {
  const [showModal, setShowModal] = useState(false);
  const {
    productData, productStyles, setProductId, starCount,
  } = useContext(ProductContext);

  const handleItemClick = () => {
    setProductId(id);
  };

  const handleCompareClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className='product-card-container related-product-card' id={id}>
        <button onClick={() => handleCompareClick()} aria-label='compare-item-btn' type='button' label='compare-item' className='action-item-btn'>
          <i className='fa-solid fa-star-sharp fa-xs' style={{ color: '#ffffff', padding: '3px' }} />
        </button>
        <div className='product-card-content' role='button' aria-label='product-card-btn' tabIndex={0} onKeyDown={handleItemClick} onClick={handleItemClick}>
          <img className='product-card-img' src={photos?.url} alt='product-item-img' />
          <div className='product-card-details'>
            <h6>{category.toUpperCase()}</h6>
            <h5>{name}</h5>
            <PriceTag defaultPrice={defaultPrice} salePrice={salePrice} />
            <span>
              <div
                style={{ position: 'absolute', bottom: '0.75rem' }}
              >
                <ReviewStars rating={rating} />
              </div>
            </span>
          </div>
        </div>
      </div>
      {showModal && createPortal(
        <ModalBackground
          component={ComparsionModalContent}
          componentProps={{
            currentProduct: {
              ...productData, rating: starCount, defaultPrice: productData.default_price, salePrice: getDefaultStyle(productStyles)?.sale_price,
            },
            selectedProduct: {
              name, category, defaultPrice, salePrice, rating, description, features,
            },
            onClose: () => setShowModal(false),
          }}
          closeModal={() => setShowModal(false)}
        />,
        document.body,
      )}
    </>
  );
};

const ComparsionModalContent = ({ onClose, currentProduct, selectedProduct }) => {
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
      <div className='table-modal-content'>
        <table className='comparsion-table'>
          <caption
            className='compareCaption'
          >
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
              <td><PriceTag defaultPrice={currentProduct?.default_price} salePrice={currentProduct?.salePrice} /></td>
              <td>Price</td>
              <td><PriceTag defaultPrice={selectedProduct?.defaultPrice} salePrice={selectedProduct?.salePrice} /></td>
            </tr>
            <tr>
              <td>{currentProduct?.description}</td>
              <td>Product Description</td>
              <td>{selectedProduct?.description}</td>
            </tr>
            {formatComparedFeatures(currentProduct?.features, selectedProduct?.features).map((item) => (
              <tr key={uuidv4()}>
                <td>{item.values?.curValue === null ? '✅' : item.values?.curValue || '-'}</td>
                <td>{item.feature}</td>
                <td>{item.values?.selectedValue === null ? '✅' : item.values?.selectedValue || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <button onClick={onClose} aria-label='modal-close-btn' type='button' label='modal-close-btn' className='modal-close-btn'>
          <i className='fa-solid fa-xmark' style={{ color: '#ffffff', margin: 'auto' }} />
        </button> */}
      </div>
    </div>
  );
};

export default RelatedCard;
