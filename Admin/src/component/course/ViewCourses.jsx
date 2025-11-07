import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../AdminNavbar";

function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editCourse, setEditCourse] = useState({});

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/course");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🗑️ Delete course
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`http://localhost:4000/course/${id}`);
      alert("Course deleted successfully!");
      fetchCourses();
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Failed to delete course.");
    }
  };

  // ✏️ Handle Edit button
  const handleEditClick = (course) => {
    setEditMode(true);
    setEditCourse(course);
  };

  // 👁️ Handle View PDF
  const handleViewClick = (course) => {
    const pdfUrl = `http://localhost:4000/storage/${course.coursePdf}`;
    window.open(pdfUrl, "_blank");
  };

  // 💾 Submit course update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("courseName", editCourse.courseName);
    formData.append("courseDescription", editCourse.courseDescription);
    if (editCourse.courseThumbnail instanceof File)
      formData.append("courseThumbnail", editCourse.courseThumbnail);
    if (editCourse.coursePdf instanceof File)
      formData.append("coursePdf", editCourse.coursePdf);

    try {
      await axios.put(
        `http://localhost:4000/course/${editCourse.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Course updated successfully!");
      setEditMode(false);
      fetchCourses();
    } catch (err) {
      console.error("Error updating course:", err);
      alert("Failed to update course.");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="homepage px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-6">Courses</h2>

        {/* ✏️ Edit Form */}
        {editMode && (
          <div className="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4">Edit Course</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={editCourse.courseName}
                onChange={(e) =>
                  setEditCourse({ ...editCourse, courseName: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Course Name"
                required
              />
              <textarea
                value={editCourse.courseDescription}
                onChange={(e) =>
                  setEditCourse({
                    ...editCourse,
                    courseDescription: e.target.value,
                  })
                }
                className="w-full border rounded px-3 py-2"
                rows="3"
                placeholder="Description"
              ></textarea>
              <div>
                <label>Change Thumbnail:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditCourse({
                      ...editCourse,
                      courseThumbnail: e.target.files[0],
                    })
                  }
                  className="block mt-1"
                />
              </div>
              <div>
                <label>Change PDF:</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) =>
                    setEditCourse({
                      ...editCourse,
                      coursePdf: e.target.files[0],
                    })
                  }
                  className="block mt-1"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="ml-3 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* 📚 Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-teal-200 rounded-xl shadow-md overflow-hidden flex flex-col hover:translate-y-[-4px] transition"
            >
              <img
                src={`http://localhost:4000/storage/${course.courseThumbnail}`}
                alt={course.courseName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  {course.courseName}
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  {course.courseDescription}
                </p>

                <div className="flex justify-between items-center">
                  <button
                    className="bg-indigo-600 text-white py-1 px-3 rounded hover:bg-indigo-700"
                    onClick={() => handleViewClick(course)}
                  >
                    View PDF
                  </button>
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                    onClick={() => handleEditClick(course)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 text-lg"
                    onClick={() => handleDelete(course.id)}
                    title="Delete Course"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewCourses;
