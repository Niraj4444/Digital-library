// src/components/Books.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

// Local demo data
const localBooksData = [
  {
    image: "/images/Ice&f.jpg",
    alt: "House of the Dragon",
    title: "House of the Dragon Bundle",
    meta: "Free right now",
    description: "Enjoy the books from the popular series.",
  },
  {
    image: "/images/Py3.jpg",
    alt: "Python Programming",
    title: "Serious Python",
    meta: "Free for beginners",
    description: "Learn from the best-of-the-best books.",
  },
  {
    image: "/images/Lotr.jpg",
    alt: "Lord of the Rings",
    title: "The Lord of the Rings",
    meta: "Classic Fantasy",
    description: "Epic fantasy adventure by J.R.R. Tolkien.",
  },
];

function Books({ searchQuery }) {
  const [firestoreBooks, setFirestoreBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Firestore books (newly added)
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const booksCollectionRef = collection(db, "books");
        const querySnapshot = await getDocs(booksCollectionRef);
        const booksList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFirestoreBooks(booksList);
      } catch (error) {
        console.error("Error fetching Firestore books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Merge local + Firestore books
  const combinedBooks = [
    ...localBooksData,
    ...firestoreBooks.map((book) => ({
      image: book.coverImageURL,
      alt: book.title,
      title: book.title,
      meta: "New Arrival",
      description: book.description || "Explore this new book.",
    })),
  ];

  // Filter based on search
  const filteredBooks = searchQuery
    ? combinedBooks.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : combinedBooks;

  return (
    <>
      <div className="section">
        <h3>Books</h3>
        <h6>From enjoyable stories to serious learning materials.</h6>
      </div>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div className="grid-half grid-column" key={index}>
                <div className="card">
                  <img src={book.image} alt={book.alt} />
                  <div className="card-content">
                    <h3>{book.title}</h3>
                    <p className="card-meta">{book.meta}</p>
                    <p>{book.description}</p>
                    <button className="btn btn-primary">View Book Details</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>
      )}
    </>
  );
}

export default Books;