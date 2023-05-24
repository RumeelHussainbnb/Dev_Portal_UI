import { useState, useEffect } from 'react';

export default function Progress({ setOnComplete, isCompleted }) {
  const [progress, setProgress] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = Math.max(0, document.documentElement.scrollTop - 60); // Subtract 60px offset
      const height =
        document.documentElement.scrollHeight - document.documentElement.clientHeight - 60; // Subtract 60px offset
      const scrolled = (scrollTop / height) * 100;
      setScrollPosition(document.documentElement.scrollTop); // store actual scroll position
      setProgress(scrolled);
      if (scrolled >= 99.9 && !isCompleted) {
        setOnComplete(true);
      } else {
        setOnComplete(false);
      }
    };
    window.addEventListener('scroll', calculateProgress);
    return () => {
      window.removeEventListener('scroll', calculateProgress);
    };
  }, [isCompleted, setOnComplete]);

  return (
    scrollPosition > 60 && (
      <div className="fixed left-0 top-0 z-10 h-2 w-full bg-gray-200">
        {' '}
        {/* Adjusted top value to 60px */}
        <div className="h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
      </div>
    )
  );
}
