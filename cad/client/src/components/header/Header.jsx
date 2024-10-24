import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ThemeToggle from './ThemeToggle';
import logo from '../../../assets/creepstore_logo.png';
import ProductContext from '../../ProductContext';

const Header = ({ pumpkins, setPumpkins }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setProductId } = useContext(ProductContext);

  const handleSearch = () => {
    if (searchQuery.toLowerCase() === 'out of stock') {
      setProductId(41126);
    }
    if (searchQuery.toLowerCase() === 'infinity') {
      setProductId(40353);
    }
    if (searchQuery.toLowerCase() === 'default') {
      setProductId(40344);
    }
    setSearchQuery('');
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className='header'>
      <img className='logo' src={logo} alt='creepstore_logo' />
      <div className='siteTitle'>CreepStore</div>
      <div className='actions-container'>
        <ThemeToggle pumpkins={pumpkins} setPumpkins={setPumpkins} />
        <div className='input-container'>
          <input
            className='search-input'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className='search-btn' onClick={handleSearch}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
