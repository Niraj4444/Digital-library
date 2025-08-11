import React, { useState } from 'react';
import './LoginPage.css'; // We will create this CSS file next
import { Link } from 'react-router-dom'; // Use Link for internal navigation

const LoginPage = () => {
  // State to hold the values of the input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the page from reloading on submit

    // Basic validation
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }

    // Since we are not using a real backend, we'll just log the data
    console.log('Attempting to log in with:');
    console.log('Username:', username);
    console.log('Password:', password);

    alert(`Welcome back, ${username}! (Simulated Login)`);

    // Optionally, clear the form after submission
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login-page-container">
      <div className="login-form-card">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p className="subtitle">Join our community today!</p>

          <div className="input-group">
            {/* Simple unicode character for the user icon */}
            <span>👤</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            {/* Simple unicode character for the lock icon */}
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
          {/* Using <Link> is better for single-page-apps than <a> */}
          <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;