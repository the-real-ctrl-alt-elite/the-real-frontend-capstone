import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from './ThemeToggle';

const Header = ({ pumpkins, setPumpkins }) => {
  return (
    <header className='header'>
      <div className='logo'> </div>
      <div className='siteTitle'>CreepStore</div>
      <div className='actions-container'>
        <ThemeToggle pumpkins={pumpkins} setPumpkins={setPumpkins} />
        <div className='input-container'>
          <input className='search-input' placeholder='Search...' />
          <button className='search-btn'>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
      {/* <Advertisement newProduct={newProduct} saleName={saleName} sale={sale} /> */}
    </header>
  );
};

export default Header;
