// SavedBooks.jsx (Client)
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

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
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData?.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData?.savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors.join(', ')}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      {removeError && <p>Error removing book. Please try again.</p>}
    </>
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


// index.js (Server)
import express from 'express';
import userRoutes from './api/user-routes';

const router = express.Router();
router.use('/users', userRoutes);

export default router;


// user-routes.js (Server)
import express from 'express';
import {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} from '../../controllers/user-controller';

// import middleware
import { authMiddleware } from '../../utils/auth';

const router = express.Router();
// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveBook);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/books/:bookId').delete(authMiddleware, deleteBook);

export default router;


// auth.js (Server)
import jwt from 'jsonwebtoken';

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

export const authMiddleware = (req, res, next) => {
  // allows token to be sent via req.query or headers
  let token = req.query.token || req.headers.authorization;

  // ["Bearer", "<tokenvalue>"]
  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }

  if (!token) {
    return res.status(400).json({ message: 'You have no token!' });
  }

  // verify token and get user data out of it
  try {
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;
  } catch {
    console.log('Invalid token');
    return res.status(400).json({ message: 'invalid token!' });
  }

  // send to next endpoint
  next();
};

export const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
