// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // This line is now different. It reads the key from Replit Secrets.
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,

  // The rest of these values are NOT secret, so they can stay here.
  authDomain: "digital-library-b.firebaseapp.com",
  projectId: "digital-library-b",
  storageBucket: "digital-library-b.firebasestorage.app",
  messagingSenderId: "587099881192",
  appId: "1:587099881192:web:e317fc9927f8e2044e535d",
  measurementId: "G-LCHJ7SW6NZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);