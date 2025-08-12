// src/firebase.js

import { initializeApp } from "firebase/app";
// We need getAuth for login/signup and getFirestore to save user data
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWrisNVjcTwaVdVtG1CMl273w0AJF4qBs", // Keep your own keys
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