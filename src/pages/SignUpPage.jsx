// src/pages/SignUpPage.jsx

import React, { useState } from 'react';
import './SignUpPage.css';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase function
import { auth } from '../firebase'; // Your firebase config

const SignUpPage = () => {
  // We use email for Firebase Auth, not username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Hook to redirect the user

  // Function to handle form submission
  const handleSignUp = async (event) => {
    event.preventDefault(); // Prevents page reload

    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      // Use the Firebase function to create a new user
      await createUserWithEmailAndPassword(auth, email, password);
      // If sign-up is successful, redirect to the home page
      navigate('/');
    } catch (error) {
      // If there's an error (e.g., email already in use), show an alert
      console.error("Failed to create an account:", error);
      alert(error.message);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-form-card">
        <form onSubmit={handleSignUp}>
          <h2>Create Account</h2>
          <p className="subtitle">Join our community today!</p>

          <div className="input-group">
            <span>✉️</span> {/* Changed icon to an envelope */}
            <input
              type="email" // Use type="email"
              placeholder="Email" // Changed from Username
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span>🔒</span>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Log In</Link> {/* Use Link component */}
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;