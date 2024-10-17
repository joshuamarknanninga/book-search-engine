// client/src/components/SavedBooks.jsx

import { useEffect } from "react";
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [removeBook, { error: removeError }] = useMutation(REMOVE_BOOK, {
    // Update the cache after removing a book
    update(cache, { data: { removeBook } }) {
      try {
        cache.writeQuery({
          query: GET_ME,
          data: { me: removeBook },
        });
      } catch (e) {
        console.error('Error updating cache after removing book:', e);
      }
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading saved books.</div>;
  }

  const userData = data?.me;

  const handleDeleteBook = async (bookId) => {
    try {
      await removeBook({
        variables: { bookId },
      });
      alert('Book removed successfully!');
    } catch (err) {
      console.error(err);
      alert('Error removing book.');
    }
  };

  return (
    <div>
      <h2>My Saved Books</h2>
      {userData?.savedBooks.length ? (
        userData.savedBooks.map((book) => (
          <div key={book.bookId} style={styles.bookContainer}>
            <h3>{book.title}</h3>
            <p><strong>Authors:</strong> {book.authors.join(', ')}</p>
            {book.image && (
              <img
                src={book.image}
                alt={book.title}
                style={styles.bookImage}
              />
            )}
            <p>{book.description}</p>
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              View on Google Books
            </a>
            <button
              onClick={() => handleDeleteBook(book.bookId)}
              style={styles.removeButton}
            >
              Remove Book
            </button>
          </div>
        ))
      ) : (
        <p>You have no saved books.</p>
      )}
      {/* Display mutation error if any */}
      {removeError && <p>Error removing book. Please try again.</p>}
    </div>
  );
};

// Optional: Add some basic styling
const styles = {
  bookContainer: {
    border: '1px solid #ccc',
    padding: '16px',
    marginBottom: '16px',
    borderRadius: '8px',
  },
  bookImage: {
    maxWidth: '150px',
    height: 'auto',
  },
  link: {
    display: 'block',
    marginTop: '8px',
    marginBottom: '8px',
    color: '#007bff',
    textDecoration: 'none',
  },
  removeButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default SavedBooks;
