// src/components/Header.jsx

import React, { useState } from 'react';

// This is a React Function Component, so it's okay to call useState here.
function Header() {
  // CORRECT: useState is called at the top level of the function component.
  const [activeTab, setActiveTab] = useState('Books');

  return (
    <header className="header-content position-relative">
      <img className="hero-image" src="/images/Clash.jpg" alt="A library or a reading scene" />

      <div className="position-absolute-middle">
        <div className="tab-bar">
          <button 
            className={`tab-link ${activeTab === 'Books' ? 'active' : ''}`} 
            onClick={() => setActiveTab('Books')}>
              <i className="fas fa-book"></i> Books
          </button>
        </div>

        {activeTab === 'Books' && (
          <div id="Books" className="tab-content" style={{display: 'block'}}>
            <h3>Search Books</h3>
            <p>Find your next great read.</p>
            <input className="form-input" type="text" placeholder="e.g., The Lord of the Rings" />
            <p><button className="btn btn-primary">Search Books</button></p>
          </div>
        )}

      </div>
    </header>
  );
}

export default Header;