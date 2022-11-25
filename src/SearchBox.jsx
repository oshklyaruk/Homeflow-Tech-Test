import React from 'react';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

function SearchBox({ search, handleSearchChange }) {
  return (
    <div className="mt-5 relative">
      <input onChange={handleSearchChange} value={search} placeholder="Enter a search term" className="px-5 py-3 border-gray-400 border rounded w-full" />

      <FaSearch className="absolute top-3.5 right-3.5 text-gray-400" size={20} />
    </div>
  );
}

SearchBox.propTypes = {
  search: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired
}

export default SearchBox;
