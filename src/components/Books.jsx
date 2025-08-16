// src/components/Books.jsx
import React from "react";

// Local demo data only
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
    title: "Fluent Python", // ✅ corrected name
    meta: "Free for beginners",
    description: "Learn from the best-of-the-best books.",
  },
  {
    image: "/images/rings.jpg",
    alt: "Lord of the Rings",
    title: "The Lord of the Rings",
    meta: "Classic Fantasy",
    description: "Epic fantasy adventure by J.R.R. Tolkien.",
  },
];

function Books({ searchQuery }) {
  // Filter based on search
  const filteredBooks = searchQuery
    ? localBooksData.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : localBooksData;

  return (
    <>
      <div className="section">
        <h3>Books</h3>
        <h6>From enjoyable stories to serious learning materials.</h6>
      </div>

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
    </>
  );
}

export default Books;