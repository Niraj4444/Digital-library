// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand-logo">Digital Library</Link>

      <div className="navbar-actions">
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/login" className="nav-link">Login</Link>

        {/* REMOVED: The link to the bookmarks page is now gone. */}

        <Link to="/signup">
          <button className="btn btn-primary-nav">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;