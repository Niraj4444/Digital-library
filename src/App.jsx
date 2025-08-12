// src/App.jsx

import React from 'react';
// BrowserRouter is removed from here because it's in main.jsx now
import { Routes, Route } from 'react-router-dom';
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
import SignupPage from './pages/SignupPage'; // Matched your filename

// --- NEW IMPORTS ---
import BookmarkPage from './pages/BookmarkPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

// Component for the Home Page content (This stays the same)
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
  // The <BrowserRouter> has been removed from here
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* --- Your existing public routes --- */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* --- NEW PROTECTED ROUTES --- */}
          {/* This route is for the user's bookmarks */}
          <Route
            path="/bookmark"
            element={
              <ProtectedRoute>
                <BookmarkPage />
              </ProtectedRoute>
            }
          />

          {/* This route is for the user's profile */}
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;