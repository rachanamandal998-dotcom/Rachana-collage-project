import React, { useEffect, useState } from "react";
import MyFooter from "../component/MyFooter";
import axios from "axios";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/course")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="homepage">
    

      <main>
        {!selectedCourse ? (
          <section className="category" id="courses">
            <h2 className="category-title">Courses</h2>
            <div className="courses">
              {courses.map((course) => (
                <div key={course.id} className="card">
                  <img
                    src={`http://localhost:4000/storage/${course.courseThumbnail}`}
                    alt={course.courseName || "Course"}
                  />
                  <div className="card-body">
                    <h3>{course.courseName}</h3>
                    <p>{course.courseDescription}</p>
                    <button
                      className="btn"
                      onClick={() => setSelectedCourse(course)}
                    >
                      View More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          // Expanded course view
          <div className="expanded-course">
            <button
              className="btn back-btn"
              onClick={() => setSelectedCourse(null)}
            >
              ← Back
            </button>

            <h2 className="course-title">{selectedCourse.courseName}</h2>

            {selectedCourse.coursePdf ? (
              <iframe
                src={`http://localhost:4000/storage/${selectedCourse.coursePdf}`}
                title={selectedCourse.courseName}
                className="pdf-viewer"
              />
            ) : (
              <p>No PDF available for this course.</p>
            )}

         
          </div>
        )}
      </main>

      <MyFooter />

      {/* Custom CSS */}
      <style>{`
  .category { padding: 2rem 1rem; }
  .category-title { font-size: 1.5rem; font-weight: bold; margin-bottom: 1.25rem; text-transform: capitalize; color: #111827; text-align: center; }

  /* Courses grid */
  .courses { 
    display: grid; 
    grid-template-columns: 1fr; /* default 1 column for small screens */
    gap: 1.5rem; 
  }

  /* Large screens: 3 columns */
  @media (min-width: 768px) { 
    .courses { grid-template-columns: repeat(3, 1fr); }
  }

  .card { 
    background: #a6e4e4; 
    border-radius: 0.75rem; 
    box-shadow: 0 4px 10px rgba(0,0,0,0.05); 
    overflow: hidden; 
    display: flex; 
    flex-direction: column; 
    transition: transform 0.2s; 
  }

  .card:hover { 
    transform: translateY(-4px); 
    background: linear-gradient(135deg, #a6e4e4, #ffe082, #81c784); 
  }

  /* Full image */
  .card img { 
    width: 100%; 
    height: auto; 
    object-fit: cover; /* ensures image scales nicely */
  }

  .card-body { 
    padding: 1rem; 
    flex: 1; 
    display: flex; 
    flex-direction: column; 
    justify-content: space-between; 
  }

  .card-body h3 { font-size: 1.1rem; margin: 0 0 0.5rem; }
  .card-body p { font-size: 0.9rem; color: #6b7280; margin-bottom: 1rem; }

  .btn { 
    display: inline-block; 
    padding: 0.5rem 1rem; 
    background: #4f46e5; 
    color: #fff; 
    border-radius: 6px; 
    text-decoration: none; 
    font-weight: 500; 
    transition: background 0.2s; 
    cursor: pointer; 
  }
  .btn:hover { background: #4338ca; }

  .expanded-course { max-width: 800px; margin: 2rem auto; padding: 1rem; text-align: center; }
  .back-btn { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
  .course-title { font-size: 2rem; font-weight: bold; margin-bottom: 1rem; }
  .pdf-viewer { width: 100%; height: 600px; border: 1px solid #ccc; border-radius: 8px; margin-bottom: 1rem; }
  .download-btn { margin-top: 0.5rem; }
`}</style>
    </div>
  );
}

export default Courses;
