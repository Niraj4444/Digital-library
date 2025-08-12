// src/App.jsx

import React from 'react';
// Make sure to import BrowserRouter here!
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import './Digitalbook.css';
import './App.css';

// ... (Your other component and page imports stay the same) ...
import Navbar from './components/Navbar';
import Header from './components/Header';
import Books from './components/Books';
import Popularbooks from './components/Popularbooks';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import SignupPage from './pages/SignupPage';
import BookmarkPage from './pages/BookmarkPage';
import UserProfilePage from './pages/UserProfilePage';
import ProtectedRoute from './components/ProtectedRoute';


// Your HomePage and Layout components stay the same
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

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}


// Main App component
export default function App() {
  return (
    // Wrap your entire Routes component in BrowserRouter
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          <Route
            path="/bookmark"
            element={<ProtectedRoute><BookmarkPage /></ProtectedRoute>}
          />
          <Route
            path="/user"
            element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}