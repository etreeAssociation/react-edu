import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCourseContext } from "../store/CoursesContext";

const Enquire = () => {
    const { courseName } = useParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { courseNameList, submitEnquiry } = useCourseContext();

    const decodedCourse = courseName
        ? decodeURIComponent(courseName).replace(/-/g, " ")
        : "";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        courseInterest: decodedCourse || "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const updateSuggestions = (value) => {
        const trimmed = value.trim().toLowerCase();
        const filtered = trimmed
            ? courseNameList.filter((course) =>
                course.toLowerCase().includes(trimmed)
            )
            : courseNameList;
        setSuggestions(filtered);
        setShowSuggestions(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "courseInterest" && !decodedCourse) {
            updateSuggestions(value);
        }
    };

    const handleFocus = () => {
        if (!decodedCourse) {
            updateSuggestions(formData.courseInterest);
        }
    };

    const handleSuggestionClick = (value) => {
        setFormData((prev) => ({ ...prev, courseInterest: value }));
        setShowSuggestions(false);
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
            newErrors.phone = "Enter a valid 10-digit phone number";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(decodedCourse)
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setShowPopup(false);
            return;
        }

        setErrors({});
        setIsSubmitting(true);

        const response = await submitEnquiry(formData);
        setIsSubmitting(false);

        if (response.success) {
            setShowPopup(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                courseInterest: decodedCourse || "",
                message: "",
            });

            setTimeout(() => setShowPopup(false), 2000);
        } else {
            alert(response.message);
        }
    };


    return (
        <div className="container" style={{ padding: "80px", maxWidth: "600px" }}>
            <h2 className="mb-4 text-center">Enquire Now</h2>

            {showPopup && (
                <div
                    className="alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 shadow"
                    style={{ zIndex: 1050, width: "fit-content" }}
                >
                    Thank you! We’ll contact you shortly.
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                {/* Name */}
                <div className="mb-3">
                    <label className="form-label">Name <span className="text-danger">*</span></label>
                    <input
                        type="text"
                        required
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                    />
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label className="form-label">Email (optional)</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                    />
                </div>

                {/* Phone */}
                <div className="mb-3">
                    <label className="form-label">
                        Phone Number <span className="text-danger">*</span>
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                    />
                    {errors.phone && (
                        <div className="invalid-feedback">{errors.phone}</div>
                    )}
                </div>

                {/* Course Interest */}
                <div className="mb-3 position-relative">
                    <label className="form-label">
                        Interested Course{" "}
                        {decodedCourse && <span className="text-muted">(from URL)</span>}
                        <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        name="courseInterest"
                        className="form-control"
                        required
                        value={formData.courseInterest}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                        placeholder="Search or select a course"
                        disabled={!!decodedCourse}
                        autoComplete="off"
                    />
                    {!decodedCourse && showSuggestions && (
                        <ul
                            className="list-group position-absolute w-100 shadow"
                            style={{ zIndex: 1000, maxHeight: "200px", overflowY: "auto" }}
                        >
                            {suggestions.length > 0 ? (
                                suggestions.map((s, i) => (
                                    <li
                                        key={i}
                                        className="list-group-item list-group-item-action"
                                        onMouseDown={() => handleSuggestionClick(s)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {s}
                                    </li>
                                ))
                            ) : (
                                <li className="list-group-item text-muted">No matches found</li>
                            )}
                        </ul>
                    )}
                </div>

                {/* Message */}
                <div className="mb-3">
                    <label className="form-label">Message (optional)</label>
                    <textarea
                        name="message"
                        className="form-control"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Any specific question or requirement?"
                    ></textarea>
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-warning w-100" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                            Submitting...
                        </>
                    ) : (
                        "Submit Enquiry"
                    )}
                </button>

            </form>
        </div>
    );
};

export default Enquire;
