// client/src/App.jsx

import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import SearchBooks from './components/SearchBooks';
import SavedBooks from './components/SavedBooks';
import Navbar from './components/Navbar';
import Auth from './utils/auth';

// Create an HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql', // Ensure this matches your server's GraphQL endpoint
});

// Middleware to attach the token to each request
const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken(); // Retrieve the token from localStorage or another storage mechanism
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine authLink and httpLink
  cache: new InMemoryCache(),
});

const App = () => {
  // Function to determine if a user is logged in
  const isLoggedIn = Auth.loggedIn();

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {/* Navbar component to display navigation links */}
          <Navbar />

          {/* Define application routes */}
          <Routes>
            <Route
              path="/"
              element={<Navigate to={isLoggedIn ? '/search' : '/login'} replace />}
            />
            <Route
              path="/signup"
              element={isLoggedIn ? <Navigate to="/search" replace /> : <SignupForm />}
            />
            <Route
              path="/login"
              element={isLoggedIn ? <Navigate to="/search" replace /> : <LoginForm />}
            />
            <Route
              path="/search"
              element={isLoggedIn ? <SearchBooks /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/saved"
              element={isLoggedIn ? <SavedBooks /> : <Navigate to="/login" replace />}
            />
            {/* Add a catch-all route for undefined paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
};

export default App;
