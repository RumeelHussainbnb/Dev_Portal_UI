import React, { createContext, useContext, useState, useMemo } from 'react';

const CourseProgressContext = createContext();

export function useCourseProgress() {
  return useContext(CourseProgressContext);
}

export function CourseProgressProvider({ children }) {
  const [courseProgress, setCourseProgress] = useState([]);
  const [courseTotal, setCourseTotal] = useState(0);
  const [course, setCourse] = useState(null);

  const value = useMemo(
    () => ({
      courseProgress,
      setCourseProgress,
      courseTotal,
      setCourseTotal,
      course,
      setCourse
    }),
    [courseProgress, courseTotal, course]
  );

  return <CourseProgressContext.Provider value={value}>{children}</CourseProgressContext.Provider>;
}
