// src/components/Books.jsx

import React from 'react';

// I've renamed the data to be more specific to this component
const booksData = [
  {
    image: '/images/Ice&f.jpg', // Make sure this image exists in your public/images folder
    alt: 'House of the Dragon',
    title: 'House of the Dragon Bundle',
    meta: 'Free right now',
    description: 'Enjoy the books from the popular series.'
  },
  {
    image: '/images/Py3.jpg', // Make sure this image exists too
    alt: 'Python Programming',
    title: 'Learn Python',
    meta: 'Free for beginners',
    description: 'Learn from the best-of-the-best books.'
  },
];

function Books() {
  return (
    <>
      <div className="section">
        <h3>Books</h3>
        <h6>From enjoyable stories to serious learning materials.</h6>
      </div>
      <div className="grid">
        {/*
          FIXED: Renamed the loop variable to 'book' to be more clear.
          Now we use book.image, book.title, etc. consistently.
        */}
        {booksData.map((book, index) => (
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
        ))}
      </div>
    </>
  );
}

export default Books;