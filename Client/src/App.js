import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Homepage from "./pages/homepage";
import Contact from "./pages/Contact";
import About from "./pages/Aboutus";
import Blog from "./pages/Blog";
import Courses from "./pages/Courses";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

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
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
     

        </Routes>
      </div>
    </Router>
  );
}

export default App;
