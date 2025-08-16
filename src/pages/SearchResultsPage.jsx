// src/pages/SearchResultsPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const staticBooks = [
  { title: "House of the Dragon", image: "/images/Ice&f.jpg" },
  { title: "Fluent Python", image: "/images/FluentPy.jpg" },
  { title: "Serious Python", image: "/images/Py3.jpg" },
];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
  const query = (useQuery().get("query") || "").toLowerCase();
  const [firestoreBooks, setFirestoreBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch books from Firestore
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollectionRef = collection(db, "books");
        const snapshot = await getDocs(booksCollectionRef);
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFirestoreBooks(list);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Filter static + firestore books
  const staticResults = staticBooks.filter((b) =>
    b.title.toLowerCase().includes(query)
  );
  const firestoreResults = firestoreBooks.filter((b) =>
    b.title.toLowerCase().includes(query)
  );

  const allResults = [...staticResults, ...firestoreResults];

  if (loading) {
    return <div className="section">Loading search results...</div>;
  }

  return (
    <div className="section">
      <h2>Search Results for "{query}"</h2>
      {allResults.length > 0 ? (
        <div className="grid">
          {allResults.map((book, i) =>
            book.id ? (
              // Firestore book → link to reader
              <div className="grid-half grid-column" key={`fs-${book.id}`}>
                <Link to={`/read/${book.id}`} className="book-card-link">
                  <div className="book-card">
                    <img src={book.coverImageURL} alt={book.title} />
                    <span className="position-absolute-bottom-left destination-name">
                      {book.title}
                    </span>
                  </div>
                </Link>
              </div>
            ) : (
              // Static book → just show card
              <div className="grid-half grid-column" key={`st-${i}`}>
                <div className="book-card">
                  <img src={book.image} alt={book.title} />
                  <span className="position-absolute-bottom-left destination-name">
                    {book.title}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
}

export default SearchResultsPage;