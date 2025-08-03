import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.description}</p>
                    <p className="text-muted mb-1"><strong>Duration:</strong> {course.duration}</p>
                    <p className="text-muted"><strong>Level:</strong> {course.level}</p>
                    <a onClick={()=>navigate(`/enquiry/${course.title}`)} className="btn btn-warning mt-auto">Enquire Now</a>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
