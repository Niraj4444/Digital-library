// src/pages/UserProfilePage.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function UserProfilePage() {
  const { currentUser } = useAuth();

  return (
    <div>
      <h1>User Profile</h1>
      <p>This is where your user account details will be displayed.</p>
      {/* We can already show the user's email! */}
      {currentUser && <p>Logged in as: {currentUser.email}</p>}
      <button>Contact Support</button>
    </div>
  );
}