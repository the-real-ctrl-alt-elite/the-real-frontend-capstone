import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();
const TOKEN = process.env.GIT_TOKEN;
const BASE_URL = process.env.API_BASE_URL;
const CAMPUS_CODE = process.env.CAMPUS_CODE;

export const ProductProvider = ({ children }) => {
  const [productId, setProductId] = useState(null);

  const generateRandomProductId = () => {
    return Math.floor(Math.random() * (41354 - 40344 + 1)) + 40344;
  };

  const fetchProductId = () => {
    const randomId = generateRandomProductId();
    const url = `${BASE_URL}${CAMPUS_CODE}/products/${randomId}`;
    axios
      .get(url, {
        headers: {
          Authorization: TOKEN,
        },
        params: {
          count: 1,
        },
      })
      .then((response) => {
        console.log('Context:', response.data.id)
        setProductId(response.data.id);
      })
      .catch((err) => console.error('error in context', err))
  };

  useEffect(() => {
    fetchProductId();
  }, []);

  return (
    <ProductContext.Provider value={{ productId, setProductId }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;