import React, { useState } from 'react';

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        className="px-4 py-2 border rounded-l-lg"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-lg">
        Search
      </button>
    </form>
  );
};

export default SearchInput;
