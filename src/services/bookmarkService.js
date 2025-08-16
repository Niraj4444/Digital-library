// src/services/bookmarkService.js
import { db } from "../firebase";
import { doc, setDoc, getDocs, collection, deleteDoc } from "firebase/firestore";

// Add bookmark
export const addBookmark = async (userId, book) => {
  if (!userId) return;
  await setDoc(doc(db, "users", userId, "bookmarks", book.id), book);
};

// Remove bookmark
export const removeBookmark = async (userId, bookId) => {
  if (!userId) return;
  await deleteDoc(doc(db, "users", userId, "bookmarks", bookId));
};

// Get bookmarks
export const getBookmarks = async (userId) => {
  if (!userId) return [];
  const snapshot = await getDocs(collection(db, "users", userId, "bookmarks"));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};