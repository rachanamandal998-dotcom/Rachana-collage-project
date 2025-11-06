import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Homepage from "./pages/homepage";
import Contact from "./pages/Contact";
import About from "./pages/Aboutus";
import Blog from "./pages/Blog";
import Courses from "./pages/Courses";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/course" element={<Courses />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
