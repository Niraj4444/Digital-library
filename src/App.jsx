// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./Digitalbook.css";
import "./App.css";

import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Popularbooks from "./components/Popularbooks";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import SignupPage from "./pages/SignupPage";
import BookmarkPage from "./pages/BookmarkPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import BookReaderPage from "./pages/BookReaderPage";
import SearchResultsPage from "./pages/SearchResultsPage"; // 🔎 NEW

// Homepage layout
function HomePage() {
  return (
    <>
      <Header /> {/* Global search bar */}
      <div className="main-content">
        <Popularbooks /> {/* Firestore-powered books */}
      </div>
    </>
  );
}

// Shared layout with navbar
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

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Book reader */}
            <Route path="/read/:bookId" element={<BookReaderPage />} />

            {/* Protected routes */}
            <Route
              path="/bookmark"
              element={
                <ProtectedRoute>
                  <BookmarkPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}