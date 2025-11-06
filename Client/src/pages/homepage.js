import React, { useState } from "react";
import "./homepage.css";
import coursesData from "./../freecourse.json";
import SearchBar from "../component/SearchBar";
import MyFooter from "../component/MyFooter";


function Homepage() {
  const categories = Object.keys(coursesData);

  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className="homepage">
      {/* Navigation Bar */}


      {/* Search Bar */}
      <SearchBar coursesData={coursesData} onResults={setSearchResults} />

      {/* Courses Sections */}
      <main>
        {searchResults ? (
          <section className="search-results">
            <h2 className="category-title">Search Results</h2>
            <div className="courses">
              {searchResults.length > 0 ? (
                searchResults.map((course) => (
                  <div key={course.id} className="card">
                    <img src={course.pic_link} alt={course.title} />
                    <div className="card-body">
                      <h3>{course.title}</h3>
                      <p>{course.desc}</p>
                      <a
                        href={course.courselink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                      >
                        View Course
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p>No courses found.</p>
              )}
            </div>
          </section>
        ) : (
          categories.map((category) => (
            <section key={category} id={category} className="category">
              <h2 className="category-title">
                {category.replace("_", " ").toUpperCase()}
              </h2>
              <div className="courses">
                {coursesData[category].map((course) => (
                  <div key={course.id} className="card">
                    <img src={course.pic_link} alt={course.title} />
                    <div className="card-body">
                      <h3>{course.title}</h3>
                      <p>{course.desc}</p>
                      <a
                        href={course.courselink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                      >
                        View Course
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Footer */}
<MyFooter/>
    </div>
  );
}

export default Homepage;
