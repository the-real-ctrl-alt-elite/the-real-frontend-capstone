import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ProductProvider } from './ProductContext';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <ProductProvider>
    <App />
  </ProductProvider>
);
