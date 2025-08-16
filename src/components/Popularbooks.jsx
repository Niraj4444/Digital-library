// src/components/Popularbooks.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom'; 
import { useAuth } from "../context/AuthContext";
import { addBookmark } from "../services/bookmarkService";

const fallbackImage = "/images/default-book.jpg";

function Popularbooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollectionRef = collection(db, 'books');
        const querySnapshot = await getDocs(booksCollectionRef);
        const booksList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBooks(booksList);
      } catch (error) {
        console.error("Error fetching books: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleBookmark = async (book) => {
    if (!currentUser) {
      alert("Please login to bookmark books.");
      return;
    }

    // ✅ normalize fields so BookmarkPage can always render them
    const bookmarkData = {
      id: book.id,
      title: book.title,
      image: book.coverImageURL || fallbackImage,
      description: book.description || "No description available.",
      meta: book.meta || "Book",
    };

    await addBookmark(currentUser.uid, bookmarkData);
    alert(`${book.title} added to bookmarks!`);
  };

  if (loading) {
    return <div className="section">Loading books...</div>;
  }

  return (
    <>
      <div className="section section-margin-top">
        <h3>New Books</h3>
        <p>Explore all the books you can think of.</p>
      </div>
      <div className="grid">
        {books.map((book) => (
          <div className="grid-half grid-column" key={book.id}>
            <div className="card">
              <Link to={`/read/${book.id}`} className="book-card-link">
                <div className="book-card">
                  <img
                    src={book.coverImageURL || fallbackImage}
                    alt={book.title}
                    onError={(e) => (e.target.src = fallbackImage)}
                  />
                  <span className="position-absolute-bottom-left destination-name">
                    {book.title}
                  </span>
                </div>
              </Link>
              {currentUser && (
                <button
                  className="btn btn-primary"
                  onClick={() => handleBookmark(book)}
                >
                  Bookmark
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Popularbooks;