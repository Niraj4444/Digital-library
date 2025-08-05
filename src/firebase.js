// src/firebase.js

// Import the function to initialize the app
import { initializeApp } from "firebase/app";

// IMPORTANT: Import the function to get the Authentication service
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration. This connects to your project.
const firebaseConfig = {
  apiKey: "",
  authDomain: "digital-library-6e5f2.firebaseapp.com",
  projectId: "digital-library-6e5f2",
  storageBucket: "digital-library-6e5f2.firebasestorage.app",
  messagingSenderId: "1032775421823",
  appId: "1:1032775421823:web:2530457cdeff09aedd944a",
  measurementId: "G-CQV32R2ZVC"
};

// Initialize the Firebase app with your configuration
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it so we can use it in other files
// This 'auth' object is what we will use for signing up and logging in.
export const auth = getAuth(app);