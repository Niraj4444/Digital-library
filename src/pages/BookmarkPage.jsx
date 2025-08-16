// src/pages/BookmarkPage.jsx
import React, { useEffect, useState } from "react";
import "../Digitalbook.css"; 
import { useAuth } from "../context/AuthContext";
import { getBookmarks, removeBookmark } from "../services/bookmarkService";

export default function BookmarkPage() {
  const { currentUser } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const fetchData = async () => {
      const saved = await getBookmarks(currentUser.uid);
      setBookmarks(saved);
    };
    fetchData();
  }, [currentUser]);

  const handleRemove = async (bookId) => {
    await removeBookmark(currentUser.uid, bookId);
    setBookmarks(bookmarks.filter(b => b.id !== bookId));
  };

  if (!currentUser) {
    return (
      <div className="content-card">
        <h2>Please login</h2>
        <p>You need to login to view your bookmarks.</p>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>My Bookmarks</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="grid">
          {bookmarks.map((book) => (
            <div className="grid-half grid-column" key={book.id}>
              <div className="card">
                {book.image && <img src={book.image} alt={book.title} />}
                <div className="card-content">
                  <h3>{book.title}</h3>
                  <p className="card-meta">{book.meta}</p>
                  <p>{book.description}</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleRemove(book.id)}
                  >
                    Remove Bookmark
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}