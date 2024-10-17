import React, {
  useState, useEffect, useCallback, useMemo, useContext,
} from 'react';

const OutfitContext = React.createContext(null);

function OutfitProvider({ children }) {
  const [outfitItems, setOutfitItems] = useState([]);

  useEffect(() => {
    const outfitItemsData = JSON.parse(localStorage.getItem('outfitItems'));
    if (outfitItemsData) {
      setOutfitItems(outfitItemsData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('outfitItems', JSON.stringify(outfitItems));
  }, [outfitItems]);

  const addToOutfit = useCallback((newItem) => {
    const hasItem = outfitItems.some((item) => item.id === newItem.id);
    if (!hasItem) {
      setOutfitItems((prevItems) => [...prevItems, newItem]);
    }
  }, [outfitItems]);

  const removeFromOutfit = useCallback((id) => {
    setOutfitItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const value = useMemo(() => ({
    outfitItems, addToOutfit, removeFromOutfit,
  }), [outfitItems, addToOutfit, removeFromOutfit]);

  return (
    <OutfitContext.Provider value={value}>
      {children}
    </OutfitContext.Provider>
  );
}

const useOutfit = () => {
  const context = useContext(OutfitContext);
  if (context === undefined) {
    throw new Error('useOutfit must be used within a OutfitProvider');
  }
  return context;
};

export { OutfitProvider, useOutfit };
