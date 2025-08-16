// src/components/Header.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const [activeTab, setActiveTab] = useState("Books");
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?query=${encodeURIComponent(input)}`);
      setInput("");
    }
  };

  return (
    <header className="header-content position-relative">
      <img
        className="hero-image"
        src="/images/Clash.jpg"
        alt="A library or a reading scene"
      />

      <div className="position-absolute-middle">
        <div className="tab-bar">
          <button
            className={`tab-link ${activeTab === "Books" ? "active" : ""}`}
            onClick={() => setActiveTab("Books")}
          >
            <i className="fas fa-book"></i> Books
          </button>
        </div>

        {activeTab === "Books" && (
          <div id="Books" className="tab-content" style={{ display: "block" }}>
            <h3>Search Books</h3>
            <p>Find your next great read.</p>
            <form onSubmit={handleSearch}>
              <input
                className="form-input"
                type="text"
                placeholder="e.g., The Lord of the Rings"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <p>
                <button type="submit" className="btn btn-primary">
                  Search Books
                </button>
              </p>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;