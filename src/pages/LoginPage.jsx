// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase function
import { auth } from '../firebase'; // Your firebase config

const LoginPage = () => {
  // We use email for Firebase Auth, not username
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook to redirect the user

  // Function to handle form submission
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevents page reload

    try {
      // Use the Firebase function to sign in
      await signInWithEmailAndPassword(auth, email, password);
      // If login is successful, redirect to the home page
      navigate('/');
    } catch (error) {
      // If there's an error (e.g., wrong password), show an alert
      console.error("Failed to log in:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-card">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <p className="subtitle">Join our community today!</p>

          <div className="input-group">
            <span>👤</span>
            <input
              type="email" // Use type="email" for better validation
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

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        <p className="signup-link">
          Don't have an account yet?{' '}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;