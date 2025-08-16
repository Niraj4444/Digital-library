import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Correct worker for Vite + react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function BookReaderPage() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToPrevPage() {
    setPageNumber(prev => (prev > 1 ? prev - 1 : 1));
  }

  function goToNextPage() {
    setPageNumber(prev => (prev < numPages ? prev + 1 : numPages));
  }

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

    if (bookId) fetchBook();
  }, [bookId]);

  if (loading) return <div>Loading book...</div>;
  if (!book) return <div>Book not found.</div>;

  const isPdf = book.bookFileURL.toLowerCase().endsWith('.pdf');

  return (
    <div className="book-reader-container">
      <h3>Reading: {book.title}</h3>

      {isPdf ? (
        <div>
          <div className="pdf-controls">
            <button onClick={goToPrevPage} disabled={pageNumber <= 1}>Prev</button>
            <span> Page {pageNumber} of {numPages} </span>
            <button onClick={goToNextPage} disabled={pageNumber >= numPages}>Next</button>
          </div>
          <div className="pdf-document-wrapper">
            <Document 
              file={book.bookFileURL}   // ✅ fixed path
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          </div>
        </div>
      ) : (
        <p>This file format is not supported for inline viewing.</p>
      )}
    </div>
  );
}

export default BookReaderPage;