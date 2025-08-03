import React, { createContext, useContext, useEffect, useState } from "react";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [availableCourses, setAvailableCourses] = useState([
    ]);
    const [courseNameList, setCourseNameList] = useState(["Full-Stack Web Development", "Python Basics"])
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        try {
            // Replace with your actual API endpoint
            const response = await fetch("https://script.google.com/macros/s/AKfycbwEJWn3LWaeQQwLCW5eju3b9FGyA3wk9lWGzvq8tZpKYCqk1nHIdwmkYkfkun3SncOF/exec");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setAvailableCourses(data);
            setCourseNameList(data.map(course => course.title))
        } catch (error) {
            console.error("Failed to fetch courses", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const submitEnquiry = async (formData) => {
        const googleFormURL =
            "https://docs.google.com/forms/d/e/1FAIpQLScRsQPANWHO7E-7T9OevLPGEnAmDVDmjdILe5DmNkJhkmlg0w/formResponse";

        const formBody = new URLSearchParams();
        formBody.append("entry.1582867168", formData.name);              
        formBody.append("entry.1061325178", formData.email || "");       
        formBody.append("entry.1699821730", formData.phone);             
        formBody.append("entry.591937860", formData.courseInterest);    
        formBody.append("entry.1069477966", formData.message || "");   

        try {
            await fetch(googleFormURL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formBody.toString(),
            });

            return { success: true, message: "Enquiry submitted successfully!" };
        } catch (error) {
            console.error("Form submission failed:", error);
            return { success: false, message: "Failed to submit enquiry." };
        }
    };


    return (
        <CourseContext.Provider value={{ availableCourses, courseNameList, loading, submitEnquiry }}>
            {children}
        </CourseContext.Provider>
    );
};

export const useCourseContext = () => useContext(CourseContext);
