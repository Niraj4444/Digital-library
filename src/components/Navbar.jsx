// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the useAuth hook
import { signOut } from 'firebase/auth';           // Import the Firebase sign out function
import { auth } from '../firebase';                // Import your auth config

function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // Get the current user status

  const handleLogout = async () => {
    try {
      await signOut(auth); // Use the real Firebase logout function
      navigate('/login');  // Redirect to the login page after successful logout
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="navbar">
      {/* The brand logo always links to the main page */}
      <Link to="/" className="brand-logo">Digital Library</Link>

      <div className="navbar-actions">
        {currentUser ? (
          // === VIEWS FOR LOGGED-IN USERS ===
          <>
            <Link to="/bookmarks" className="nav-link">Bookmark</Link>
            <Link to="/user-profile" className="nav-link">User</Link>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        ) : (
          // === VIEWS FOR LOGGED-OUT USERS ===
          <>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="signup-button"> {/* Use a distinct class for the button */}
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;