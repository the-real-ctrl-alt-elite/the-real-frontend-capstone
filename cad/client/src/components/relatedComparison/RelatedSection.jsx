import React, { useState, useEffect, useContext } from 'react';
import RelatedCard from './RelatedCard';
import HorizontalScroller from './HorizontalScroller';
import ProductContext from '../../ProductContext';
import axiosInstance from '../../AxiosInstance';
import { getDefaultStyle } from './helpers/styleHelpers';

const RelatedSection = ({ handleProductClick }) => {
  const { productId } = useContext(ProductContext);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const getRelatedProducts = async () => {
      if (productId) {
        try {
          const relatedIds = await axiosInstance.get(`products/${productId}/related`);
          const allRelatedProducts = await Promise.all(relatedIds.data.map(async (relatedId) => {
            const product = await axiosInstance.get(`/products/${relatedId}/`);
            const productStyles = await axiosInstance.get(`/products/${relatedId}/styles`);
            if (product.data && productStyles.data?.results) {
              const defaultStyle = getDefaultStyle(productStyles.data.results);
              // eslint-disable-next-line camelcase
              // This only picks up the default styles sale price -- CONFIRMED: there are different sale prices for different styles
              // eslint-disable-next-line camelcase
              return { ...product.data, sale_price: defaultStyle?.sale_price, photos: defaultStyle?.photos };
            }
            throw new Error('Missing Data for related rroducts');
          }));
          setRelatedProducts(allRelatedProducts);
        } catch (err) {
          console.log('Error occurred getting related products:', err);
        }
      }
    };
    getRelatedProducts();
  }, [productId]);

  return (
    <section className='related-container'>
      <h3>RELATED PRODUCTS</h3>
      <HorizontalScroller>
        <>
          {relatedProducts.map(({
            // eslint-disable-next-line camelcase
            id, name, category, default_price, sale_price, photos, rating, description, features,
          }) => (
            <RelatedCard
              handleClick={handleProductClick}
              key={id}
              id={id}
              name={name}
              category={category}
              // eslint-disable-next-line camelcase
              defaultPrice={default_price}
              // eslint-disable-next-line camelcase
              salePrice={sale_price}
              rating={rating}
              description={description}
              features={features}
              photos={photos[0]}
            />
          ))}
        </>
      </HorizontalScroller>

    </section>
  );
};

export default RelatedSection;
