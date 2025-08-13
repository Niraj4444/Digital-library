// src/pages/SignUpPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Firebase untouched
import './SignUpPage.css'; // Your provided styles

export default function SignUpPage() {
  // Firebase-required states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Extra UI state
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!email || !password || !confirmPassword) {
      setError('Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Create a document for the user in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        bookmarks: [],
      });
      navigate('/'); // Redirect on success
    } catch (err) {
      setError(err.message);
      console.error('Sign up failed:', err);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-form-card">
        <form onSubmit={handleSignUp}>
          <h2>Create Account</h2>
          <p className="subtitle">Join our community today!</p>

          <div className="input-group">
            <span>📧</span>
            <input
              type="email"
              placeholder="Email"
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

          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="login-link">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
}