import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";

import AddCourse from "./component/course/AddCourse";
import ViewMessages from "./component/ViewMessage";
import ViewCourses from "./component/course/ViewCourses";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<ViewCourses/>} />
          <Route path="/course" element={<AddCourse/>} />
          <Route path="/message" element={<ViewMessages/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
