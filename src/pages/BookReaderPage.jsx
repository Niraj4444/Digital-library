// src/pages/BookReaderPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

// --- NEW IMPORTS for the PDF viewer ---
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css'; // Import default styling
import 'react-pdf/dist/Page/TextLayer.css';

// --- NEW CONFIGURATION for the PDF worker ---
// This line is required to make react-pdf work with modern bundlers like Vite
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


function BookReaderPage() {
  const { bookId } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- NEW STATE for PDF page navigation ---
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // This function is called when the PDF is successfully loaded
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // --- Functions to change pages ---
  function goToPrevPage() {
    setPageNumber(prevPageNumber => (prevPageNumber > 1 ? prevPageNumber - 1 : 1));
  }

  function goToNextPage() {
    setPageNumber(prevPageNumber => (prevPageNumber < numPages ? prevPageNumber + 1 : numPages));
  }

  // This useEffect to fetch book data remains the same
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const bookDocRef = doc(db, 'books', bookId);
        const docSnap = await getDoc(bookDocRef);
        if (docSnap.exists()) {
          setBook(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  if (loading) {
    return <div>Loading book...</div>;
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  const isPdf = book.bookFileURL.toLowerCase().endsWith('.pdf');

  return (
    <div className="book-reader-container">
      <h3>Reading: {book.title}</h3>

      {isPdf ? (
        // --- THIS IS THE NEW PDF VIEWER ---
        <div>
          <div className="pdf-controls">
            <button onClick={goToPrevPage} disabled={pageNumber <= 1}>
              Prev
            </button>
            <span>
              Page {pageNumber} of {numPages}
            </span>
            <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
              Next
            </button>
          </div>
          <div className="pdf-document-wrapper">
            <Document 
              file={book.bookFileURL} 
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
        </div>
      ) : (
        // Fallback for ePubs or other file types can go here
        <p>This file format is not supported for inline viewing.</p>
      )}
    </div>
  );
}

export default BookReaderPage;