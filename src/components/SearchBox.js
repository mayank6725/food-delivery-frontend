import React, { useState } from 'react';
import './SearchBox.css';

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="search-box">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a restaurant..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBox;