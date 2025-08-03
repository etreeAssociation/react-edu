import React, { useState } from "react";
import CourseCard from "./CourseCard";
import { useCourseContext } from "../../store/CoursesContext";

const CoursesPage = () => {
  const [levelFilter, setLevelFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const {availableCourses, loading} = useCourseContext();

  const levels = ["All", ...new Set(availableCourses.map((c) => c.level))];
  const types = ["All", ...new Set(availableCourses.map((c) => c.type))];

  const filteredCourses = availableCourses.filter((course) => {
    const matchesLevel = levelFilter === "All" || course.level === levelFilter;
    const matchesType = typeFilter === "All" || course.type === typeFilter;
    return matchesLevel && matchesType;
  });

  return (
    <div className="container" style={{ paddingTop: "80px" }}>
      <h2 className="mb-4 text-center">Our Development Courses</h2>

      {/* Dropdown Filters */}
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-4">

        {/* Level Dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-outline-primary dropdown-toggle"
            type="button"
            id="levelDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Level: {levelFilter}
          </button>
          <ul className="dropdown-menu" aria-labelledby="levelDropdown">
            {levels.map((level) => (
              <li key={level}>
                <button
                  className={`dropdown-item ${
                    levelFilter === level ? "active" : ""
                  }`}
                  onClick={() => setLevelFilter(level)}
                >
                  {level}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Type Dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-outline-success dropdown-toggle"
            type="button"
            id="typeDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Type: {typeFilter}
          </button>
          <ul className="dropdown-menu" aria-labelledby="typeDropdown">
            {types.map((type) => (
              <li key={type}>
                <button
                  className={`dropdown-item ${
                    typeFilter === type ? "active" : ""
                  }`}
                  onClick={() => setTypeFilter(type)}
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Course Cards */}
      <div className="row">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))
        ) : loading ?  (
    <div className="container text-center" style={{ paddingTop: "100px" }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading courses...</span>
      </div>
      <p className="mt-3">Fetching available courses...</p>
    </div>
  ) :
  (
          
          <div className="col-12 text-center">
            <p>No courses found for selected filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
