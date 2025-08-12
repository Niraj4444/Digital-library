// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// BrowserRouter is REMOVED from this file
import { AuthProvider } from './context/AuthContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);