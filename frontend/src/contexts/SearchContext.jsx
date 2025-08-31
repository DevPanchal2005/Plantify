import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  const updateGlobalSearch = (query) => {
    setGlobalSearchQuery(query);
  };

  const clearGlobalSearch = () => {
    setGlobalSearchQuery('');
  };

  const value = {
    globalSearchQuery,
    updateGlobalSearch,
    clearGlobalSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
