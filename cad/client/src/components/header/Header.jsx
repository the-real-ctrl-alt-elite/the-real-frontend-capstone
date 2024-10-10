import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {
  return (
    <header className='header'>
      <div className='logo'>LOGO</div>
      <div className='input-container'>
        <input className='search-input' placeholder='Search...'/>
        <button className='search-btn'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </header>
  );
};

export default Header;
