import { useState, useEffect } from 'react';

export default function Progress({ setOnComplete, isCompleted, progressRef }) {
  const [progress, setProgress] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      if (!progressRef.current) return;
      const scrollTop = Math.max(0, window.scrollY - progressRef.current.offsetTop);
      const height = progressRef.current.clientHeight - window.innerHeight;
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
  }, [isCompleted, setOnComplete, progressRef]);

  return (
    scrollPosition > progressRef?.current?.offsetTop && (
      <div className="fixed left-0 top-0 z-10 h-2 w-full bg-gray-200">
        {' '}
        {/* Adjusted top value to 60px */}
        <div className="h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
      </div>
    )
  );
}
