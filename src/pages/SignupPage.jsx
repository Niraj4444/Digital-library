import React, { useState } from 'react';
import './SignUpPage.css'; // We will create this CSS file next

const SignUpPage = () => {
  // State to hold the values of the input fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the page from reloading

    // Basic validation
    if (!username || !password || !confirmPassword) {
      alert('Please fill out all fields.');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // If validation passes, you can "submit" the data.
    // Since we are not using an API, we'll just log it to the console.
    console.log('Account Created!');
    console.log('Username:', username);
    console.log('Password:', password);

    alert(`Account for ${username} created successfully!`);

    // Optionally, clear the form
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="signup-page-container">
      <div className="signup-form-card">
        <form onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <p className="subtitle">Join our community today!</p>

          <div className="input-group">
            {/* Using a simple unicode character for the icon */}
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
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;