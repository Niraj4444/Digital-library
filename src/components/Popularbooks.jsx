// src/components/Popularbooks.jsx

import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // <-- IMPORT LINK

function Popularbooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

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
            {/* THIS IS THE CHANGED LINE */}
            <Link to={`/read/${book.id}`} className="book-card-link">
              <div className="book-card">
                <img src={book.coverImageURL} alt={book.title} />
                <span className="position-absolute-bottom-left destination-name">{book.title}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Popularbooks;