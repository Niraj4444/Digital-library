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
import BookmarkPage from './pages/BookmarkPage';
import UserProfilePage from './pages/UserProfilePage';
import ContactPage from './pages/ContactPage'; // This should be here now

// --- THIS IS THE MISSING PART ---
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
// --- END OF THE MISSING PART ---

// This is the main App component
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bookmarks" element={<BookmarkPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;