// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Digitalbook.css';
import './App.css';

// --- Component Imports ---
import Navbar from './components/Navbar';
import Header from './components/Header';
import Books from './components/Books';
import Popularbooks from './components/Popularbooks';

// --- Page Imports ---
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import SignupPage from './pages/SignupPage';

// REMOVED: The import for BookmarksPage is gone because the file doesn't exist.
// REMOVED: The import for ProtectedRoute is also gone.

// Component for the Home Page content
function HomePage() {
  return (
    <>
      <Header />
      <div className="main-content">
        <Books />
        <Popularbooks />
      </div>
    </>
  );
}

// This is the main App component
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* REMOVED: The entire route for "/bookmarks" is deleted. */}
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;