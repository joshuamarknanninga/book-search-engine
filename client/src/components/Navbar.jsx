// client/src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser, getToken } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const token = getToken();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Search for Books</Link>
        </li>
        {token ? (
          <>
            <li>
              <Link to="/saved">My Saved Books</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login/Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
