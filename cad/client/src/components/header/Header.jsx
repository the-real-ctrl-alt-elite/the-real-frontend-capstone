import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from './ThemeToggle';
import logo from '../../../assets/creepstore_logo.png';

const Header = ({ pumpkins, setPumpkins }) => {
  return (
    <header className='header'>
      <img className='logo' src={logo} alt='creepstore_logo' />
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
    </header>
  );
};

export default Header;
