// src/pages/SignUpPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Import auth and db

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Create a document for the user in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        bookmarks: [], // Start with an empty bookmarks array
      });
      navigate('/'); // Redirect to home page on success
    } catch (err) {
      setError(err.message);
      console.error('Sign up failed:', err);
    }
  };

  // Your existing JSX form goes here. Just make sure:
  // 1. The <form> has onSubmit={handleSignUp}
  // 2. The email input has value={email} and onChange={(e) => setEmail(e.target.value)}
  // 3. The password input has value={password} and onChange={(e) => setPassword(e.target.value)}
  // 4. You display the {error} message somewhere if it's not empty.

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}