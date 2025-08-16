// src/pages/BookReaderPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { ReactReader } from 'react-reader';

function BookReaderPage() {
  const { bookId } = useParams(); 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
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

  if (loading) return <div>Loading book...</div>;
  if (!book) return <div>Book not found.</div>;

  const isPdf = book.bookFileURL.toLowerCase().includes('.pdf') || book.bookFileURL.includes("drive.google.com");
  const isEpub = book.bookFileURL.toLowerCase().endsWith('.epub');

  // Always use GitHub raw link for downloads
  const githubDownloadUrl =
    "https://raw.githubusercontent.com/Niraj4444/Digital-library/main/public/books/Serious_Python_-_Julien_Danjou.pdf";

  // Preview URL stays same (Google Drive preview / direct PDF)
  let previewUrl = book.bookFileURL;
  if (book.bookFileURL.includes("drive.google.com")) {
    const match = book.bookFileURL.match(/\/d\/(.*?)(\/|$|\?)/);
    if (match && match[1]) {
      const fileId = match[1];
      previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }

  return (
    <div style={{ height: '100vh', padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <h2>Reading: {book.title}</h2>

      {/* PDF or Google Drive preview */}
      {isPdf && (
        <div style={{ flex: 1, marginTop: '20px' }}>
          <iframe 
            src={previewUrl} 
            title={book.title}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            allow="autoplay"
          />
        </div>
      )}

      {/* EPUB Viewer */}
      {isEpub && (
        <div style={{ flex: 1 }}>
          <ReactReader
            url={book.bookFileURL}
            title={book.title}
            location={"epubcfi(/6/2[cover]!/4/1/10/1:0)"}
            locationChanged={(epubcifi) => console.log(epubcifi)}
          />
        </div>
      )}

      {/* Big centered Download button */}
      <div className="flex flex-col items-center mt-6">
        <h3 className="text-xl font-semibold mb-3">Download Book</h3>
        <a
          href={githubDownloadUrl}
          download="Serious_Python_-_Julien_Danjou.pdf"
          className="px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-blue-700 transition"
        >
          ⬇️ Download Book
        </a>
      </div>
    </div>
  );
}

export default BookReaderPage;