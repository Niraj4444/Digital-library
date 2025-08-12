// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext.jsx'; // Make sure this import path is correct
import { auth } from '../firebase';

export default function Navbar() {
  const { currentUser } = useAuth(); // The error happens on this line
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav>
      <Link to="/">Digital Library</Link>

      <div>
        {currentUser ? (
          <>
            <Link to="/bookmark">Bookmark</Link>
            <Link to="/user">User</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/contact">Contact</Link> {/* Added Contact back based on your App.jsx */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}