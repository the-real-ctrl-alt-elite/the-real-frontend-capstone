import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ProductProvider } from './ProductContext';
import { ThemeProvider } from './ThemeContext';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
