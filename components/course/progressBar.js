import { useState, useEffect } from 'react';

export default function Progress({ setOnComplete, isCompleted }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / height) * 100;
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
    <div className="fixed left-0 top-0 z-50 h-2 w-full bg-gray-200">
      <div className="h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
    </div>
  );
}
