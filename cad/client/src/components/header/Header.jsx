import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  return (
    <header className='header'>
      <div className='logo'>LOGO</div>
      <div className='actions-container'>
        <ThemeToggle />
        <div className='input-container'>
          <input className='search-input' placeholder='Search...' />
          <button className='search-btn'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
