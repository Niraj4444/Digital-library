// src/pages/BookReaderPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function BookReaderPage() {
  const { bookId } = useParams();
  const location = useLocation();
  const bookFromState = location.state?.book;

  const [book, setBook] = useState(bookFromState || null);
  const [loading, setLoading] = useState(!bookFromState);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const ref = doc(db, "books", bookId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setBook({ id: snap.id, ...snap.data() });
        } else {
          console.error("No such book in Firestore!");
        }
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!bookFromState && bookId) {
      fetchBook();
    }
  }, [bookId, bookFromState]);

  if (loading) return <div>Loading book...</div>;
  if (!book) return <div>Book not found.</div>;

  // Fix Google Drive "view" link → turn into "preview"
  let previewUrl = book.bookFileURL;
  if (book.bookFileURL?.includes("drive.google.com")) {
    const match = book.bookFileURL.match(/\/d\/(.*?)(\/|$|\?)/);
    if (match && match[1]) {
      previewUrl = `https://drive.google.com/file/d/${match[1]}/preview`;
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Reading: {book.title}</h2>

      {/* PDF Preview */}
      <div style={{ flex: 1, marginTop: "20px" }}>
        <iframe
          src={previewUrl}
          title={book.title}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allow="autoplay"
        />
      </div>

      {/* Download button */}
      <div className="flex flex-col items-center mt-6">
        <h3 className="text-xl font-semibold mb-3">Download Book</h3>
        <a
          href={book.bookFileURL}
          download={book.title || "book.pdf"}
          className="px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-blue-700 transition"
        >
          ⬇️ Download Book
        </a>
      </div>
    </div>
  );
}

export default BookReaderPage;