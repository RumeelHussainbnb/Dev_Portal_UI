import React from 'react';

function ProgressSVG({ progress, courseTotal, radius, stroke }) {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / courseTotal) * circumference;

  const getPercentage = () => {
    return Math.round((progress / courseTotal) * 100);
  };

  return (
    <div className="inline-flex items-center justify-center">
      <svg width={30} height={30}>
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={2}
          cx={15}
          cy={15}
          r={normalizedRadius}
        />
        <circle
          cx={15}
          cy={15}
          r={normalizedRadius}
          fill="transparent"
          strokeWidth={2.5}
          stroke={'#00BFA6'}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset ? strokeDashoffset : 0}
        />
      </svg>
      <span className="absolute text-[8px]">{`${getPercentage()}%`}</span>
    </div>
  );
}

export default ProgressSVG;
