// src/components/Header.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header() {
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
    <header className="header">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search books..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default Header;