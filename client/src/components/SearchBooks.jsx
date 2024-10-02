// client/src/components/SearchBooks.jsx

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';
import { SEARCH_BOOKS } from '../utils/queries'; // Assume you have a query to search books
import { getToken } from '../utils/auth';

const SearchBooks = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [saveBook] = useMutation(SAVE_BOOK);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) return;

    try {
      // Implement your search logic here, possibly using Google Books API
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`);
      const data = await response.json();
      const books = data.items.map((item) => ({
        bookId: item.id,
        authors: item.volumeInfo.authors || ['No author'],
        description: item.volumeInfo.description || 'No description available.',
        title: item.volumeInfo.title,
        image: item.volumeInfo.imageLinks?.thumbnail || '',
        link: item.volumeInfo.infoLink,
      }));
      setSearchedBooks(books);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveBook = async (book) => {
    const token = getToken();
    if (!token) {
      alert('You need to be logged in to save books!');
      return;
    }

    try {
      const { data } = await saveBook({
        variables: { input: book },
      });
      alert('Book saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving book.');
    }
  };

  return (
    <div>
      <h2>Search for Books</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Search for books"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        {searchedBooks.map((book) => (
          <div key={book.bookId}>
            <h3>{book.title}</h3>
            <p>Authors: {book.authors.join(', ')}</p>
            <img src={book.image} alt={book.title} />
            <p>{book.description}</p>
            <a href={book.link} target="_blank" rel="noopener noreferrer">
              View on Google Books
            </a>
            <button onClick={() => handleSaveBook(book)}>Save This Book!</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBooks;
