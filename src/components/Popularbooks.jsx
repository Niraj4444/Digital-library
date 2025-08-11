// src/components/Destinations.jsx now rename Popularbooks

import React from 'react';

function Popularbooks() {
  return (
    <>
      <div className="section section-margin-top">
        <h3>New Books</h3>
        {/* We can use <p> here, and your h3 + p CSS will style it */}
        <p>Explore all the books you can think of.</p>
      </div>
      <div className="grid">
        {/* Left Column */}
        <div className="grid-half grid-column">
          <div className="book-card">
            <img src="/images/Rea.jpg" alt="React" />
            <span className="position-absolute-bottom-left destination-name">React</span>
          </div>
        </div>

        {/* Right Column - ADDED flex-column-fill */}
        <div className="grid-half grid-column flex-column-fill">
          <div className="grid">
            <div className="grid-half grid-column">
              <div className="book-card">
                <img src="/images/Py2.jpg" alt="Python" />
                <span className="position-absolute-bottom-left destination-name">Python</span>
              </div>
            </div>
            <div className="grid-half grid-column">
              <div className="book-card">
                <img src="/images/Game.jpg" alt="Game of throne" />
                <span className="position-absolute-bottom-left destination-name">Game of throne</span>
              </div>
            </div>
          </div>
          <div className="grid">
            <div className="grid-half grid-column">
              <div className="book-card">
                <img src="/images/Clash1.jpg" alt="Clash of king" />
                <span className="position-absolute-bottom-left destination-name">Clash of king</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Popularbooks;