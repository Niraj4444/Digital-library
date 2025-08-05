// src/pages/UserProfilePage.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function UserProfilePage() {
  return (
    // Use the .page-container class we made for consistent styling
    <div className="page-container">
      <h1>User Profile</h1>
      <p>This is where your user account details, like your name and reading history, will be displayed.</p>

      {/* Add a styled link to the contact page */}
      <Link to="/contact" className="btn btn-primary">
        Contact Support
      </Link>
    </div>
  );
}

export default UserProfilePage;