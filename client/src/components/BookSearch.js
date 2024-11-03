import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

const BookSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleSearch = async () => {
    // Implement search logic here
    // Update searchResults state with fetched data
  };

  const handleSave = async (bookData) => {
    try {
      await saveBook({
        variables: { ...bookData },
      });
      // Update UI to reflect saved book
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for a book"
      />
      <button onClick={handleSearch}>Search</button>
      <div>
        {searchResults.map((book) => (
          <div key={book.bookId}>
            <h3>{book.title}</h3>
            <p>{book.authors.join(', ')}</p>
            <button onClick={() => handleSave(book)}>Save</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearch;
