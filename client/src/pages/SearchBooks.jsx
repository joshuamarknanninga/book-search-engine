import React, { useState } from 'react';
import { searchGoogleBooks } from '../utils/API';

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleBooks(searchInput);
      setSearchResults(response.data.items);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          type="text"
          placeholder="Search for a book"
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {searchResults.map((book) => (
          <div key={book.id}>
            <h3>{book.volumeInfo.title}</h3>
            <p>{book.volumeInfo.authors}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
