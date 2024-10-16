import React from 'react';
import {render, screen} from '@testing-library/react'
import {ProductProvider} from './ProductContext';
import App from "./App";

test('loads items eventually', async () => {
  render(<ProductProvider><App /></ProductProvider>)
  expect(screen.getByText(/LOGO/i)).toBeTruthy();
});