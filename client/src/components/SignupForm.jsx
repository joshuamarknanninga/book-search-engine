// client/src/components/SignupForm.jsx

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupForm = () => {
  // State to manage form input values
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });

  // useMutation hook to execute the ADD_USER mutation
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // Handle changes in input fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const mutationResponse = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });

      // Extract token from the mutation response
      const token = mutationResponse.data.addUser.token;

      // Use Auth utility to handle login (e.g., save token)
      Auth.login(token);
    } catch (err) {
      console.error('Error during signup:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      {data ? (
        <p>Signup successful! Redirecting...</p>
      ) : (
        <form onSubmit={handleFormSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              Username:
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter your username"
              value={formState.username}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formState.email}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formState.password}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.button}>
            Sign Up
          </button>

          {/* Display error message if mutation fails */}
          {error && (
            <div style={styles.error}>
              <p>Signup failed. Please check your information and try again.</p>
              <p>{error.message}</p>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

// Basic inline styles for the component
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '24px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '4px',
  },
};

export default SignupForm;
