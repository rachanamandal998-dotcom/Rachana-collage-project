import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseThumbnail, setCourseThumbnail] = useState(null);
  const [coursePdf, setCoursePdf] = useState(null);
  const [courseDescription, setCourseDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("courseName", courseName);
    formData.append("courseThumbnail", courseThumbnail);
    formData.append("coursePdf", coursePdf);
    formData.append("courseDescription", courseDescription);

    try {
      const res = await axios.post("http://localhost:4000/course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Course added successfully!");

      // Clear the form
      setCourseName("");
      setCourseThumbnail(null);
      setCoursePdf(null);
      setCourseDescription("");
      document.getElementById("thumbnailInput").value = "";
      document.getElementById("pdfInput").value = "";
    } catch (error) {
      console.error("Error uploading course:", error);
      alert("Failed to add course.");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-700">
          Add New Course
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Course Name */}
          <div>
            <label className="block text-gray-600 mb-1">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Course Thumbnail */}
          <div>
            <label className="block text-gray-600 mb-1">
              Course Thumbnail (Image)
            </label>
            <label className="custom-file-input">
              {courseThumbnail ? courseThumbnail.name : "Choose Image"}
              <input
                id="thumbnailInput"
                type="file"
                accept="image/*"
                onChange={(e) => setCourseThumbnail(e.target.files[0])}
              />
            </label>
          </div>

          {/* Course PDF */}
          <div>
            <label className="block text-gray-600 mb-1">Course PDF</label>
            <label className="custom-file-input">
              {coursePdf ? coursePdf.name : "Choose PDF"}
              <input
                id="pdfInput"
                type="file"
                accept="application/pdf"
                onChange={(e) => setCoursePdf(e.target.files[0])}
              />
            </label>
          </div>

          {/* Course Description */}
          <div>
            <label className="block text-gray-600 mb-1">
              Course Description
            </label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Add Course
          </button>
        </form>
      </div>

      {/* Custom CSS */}
      <style>{`
        .custom-file-input {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: #4f46e5;
          color: white;
          border-radius: 6px;
          cursor: pointer;
          width: 100%;
          text-align: center;
        }

        .custom-file-input:hover {
          background: #4338ca;
        }

        .custom-file-input input[type="file"] {
          display: none;
        }
      `}</style>
    </>
  );
};

export default AddCourse;
