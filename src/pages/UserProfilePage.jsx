// src/pages/UserProfilePage.jsx
import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../Digitalbook.css"; // make sure CSS is included

export default function UserProfilePage() {
  const { currentUser } = useAuth();

  return (
    <div className="page-container">
      <h1>User Profile</h1>
      <p>
        This is where your user account details, like your name and reading
        history, will be displayed.
      </p>

      {/* Show logged-in user email */}
      {currentUser && <p>Logged in as: {currentUser.email}</p>}

      {/* Styled contact button */}
      <Link to="/contact" className="btn btn-primary">
        Contact Support
      </Link>
    </div>
  );
}