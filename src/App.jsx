// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './Digitalbook.css';
import './App.css';

// --- Component & Page Imports ---
import Navbar from './components/Navbar';
import Header from './components/Header';
import Books from './components/Books';
import Popularbooks from './components/Popularbooks';
import ProtectedRoute from './components/ProtectedRoute'; // <-- Import ProtectedRoute

// --- Page Imports ---
import BookmarkPage from './pages/BookmarkPage';
import UserProfilePage from './pages/UserProfilePage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';         // <-- Import LoginPage
import SignUpPage from './pages/SignUpPage';       // <-- Import SignUpPage

// Component for the Home Page content
// NOTE: It's good practice to move this to its own file like `src/pages/HomePage.jsx` later!
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

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          {/* === PUBLIC ROUTES === */}
          {/* These pages can be seen by anyone */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* === PROTECTED ROUTES === */}
          {/* These pages can ONLY be seen by logged-in users */}
          <Route
            path="/"
            element={<ProtectedRoute><HomePage /></ProtectedRoute>}
          />
          <Route
            path="/bookmarks"
            element={<ProtectedRoute><BookmarkPage /></ProtectedRoute>}
          />
          <Route
            path="/user-profile"
            element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;