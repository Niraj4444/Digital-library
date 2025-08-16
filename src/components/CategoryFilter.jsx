// src/components/CategoryFilter.jsx
import React from "react";

export default function CategoryFilter({ selected, categories, onChange }) {
  return (
    <div className="category-filter" style={{ margin: "1rem 0" }}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`btn ${selected === cat ? "btn-primary" : "btn-secondary"}`}
          style={{ marginRight: "0.5rem", marginBottom: "0.5rem" }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}