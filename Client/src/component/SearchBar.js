import React, { useState } from "react";
import './searchbar.css'

export default function SearchBar({ coursesData, onResults }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) {
      onResults(null); // reset if query empty
      return;
    }

    // Flatten all courses into one array
    const allCourses = Object.values(coursesData).flat();
    const results = allCourses.filter((course) =>
      course.title.toLowerCase().includes(query.toLowerCase())
    );
    onResults(results);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search courses..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}
