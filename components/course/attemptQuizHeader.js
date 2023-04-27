import React from 'react';
import Link from 'next/link';

const AttemptQuizHeader = ({ showQuiz, link }) => {
  let subTitle = showQuiz === true ? 'Attempt Quiz' : 'Quiz Completed';
  return (
    <div className="flex justify-between border border-gray-300 bg-gray-200 py-3 px-4 text-lg font-medium tracking-wide text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
      <span>Quiz</span>
      <Link href={link} className="pointer-events-none">
        <span
          className={` hover:text-yellow-400 dark:text-yellow-500 dark:hover:text-yellow-400 ${
            showQuiz ? 'cursor-pointer' : 'pointer-events-none'
          }`}
        >
          {subTitle}
        </span>
      </Link>
    </div>
  );
};

export default AttemptQuizHeader;
