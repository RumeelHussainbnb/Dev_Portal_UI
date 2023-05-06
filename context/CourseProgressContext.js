import { createContext, useContext, useState } from "react";

const CourseProgressContext = createContext();

export function useCourseProgress() {
  return useContext(CourseProgressContext);
}

export function CourseProgressProvider({ children }) {
    const [courseProgress, setCourseProgress] = useState([]);
    const [courseTotal, setCourseTotal] = useState(0);
    const [course, setCourse] = useState([]);

    const value = {
        courseProgress,
        setCourseProgress,
        courseTotal,
        setCourseTotal,
        course,
        setCourse
    };

    return (
        <CourseProgressContext.Provider value={value}>
            {children}
        </CourseProgressContext.Provider>
    );
}


