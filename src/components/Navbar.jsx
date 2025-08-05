// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would clear user session/token here
    console.log("User logged out.");
    // Redirect to the homepage after logout
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand-logo">Digital Library</Link>

      <div className="navbar-actions">
        {/* New links */}
        <Link to="/bookmarks" className="nav-link">Bookmark</Link>
        <Link to="/user-profile" className="nav-link">User</Link>

        {/* Logout button that performs an action */}
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;