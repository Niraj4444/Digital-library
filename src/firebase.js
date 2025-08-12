// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWriSNvJcTwaVdVtGiCMi273w0AJf4qBs",
  authDomain: "digital-library-b.firebaseapp.com",
  projectId: "digital-library-b",
  storageBucket: "digital-library-b.firebasestorage.app",
  messagingSenderId: "587099881192",
  appId: "1:587099881192:web:e317fc9927f8e2044e535d",
  measurementId: "G-LCHJ7SW6NZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);