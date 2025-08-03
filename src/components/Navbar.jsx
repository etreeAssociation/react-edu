import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 fixed-top" ref={navRef}>
        <span
          className="navbar-brand"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          E-Tree DevTrain
        </span>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate("/courses")}>
                Courses
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate("/about")}>
                About
              </button>
            </li>

            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate("/contact")}>
                Contact
              </button>
            </li>

            <li className="nav-item ms-lg-3">
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/enquiry")}
              >
                Enquire Now
              </button>
            </li>

          </ul>
        </div>
      </nav>
      <div style={{ paddingTop: `${navHeight}px` }}></div>
    </>
  );
};

export default Navbar;
