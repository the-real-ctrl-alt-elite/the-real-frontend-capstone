import React from 'react';
import { render, screen } from '@testing-library/react';
import Qa from './Qa';

describe('Qa', () => {
  beforeEach(() => {
    render(<Qa />);
  });
  it('should display the section title QUESTIONS & ANSWERS', () => {
    const sectionTitle = screen.findByText(/QUESTIONS & ANSWERS/i);
    expect(sectionTitle).toBeTruthy();
  });
});
