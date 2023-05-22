import React from 'react';

const ViewCourseDetailAdmin = ({ longTitle, shortTitle, description }) => {
  return (
    <div className="mx-2">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
          {longTitle}
        </h1>
      </div>

      <div className="flex justify-center">
        <h2 className="text-md capitalize text-gray-900 dark:text-gray-200">{shortTitle}</h2>
      </div>

      <div className="mx-auto mt-5 max-w-4xl">
        <p className="prose mx-auto mt-3 text-center text-lg dark:prose-invert">{description}</p>
      </div>
    </div>
  );
};

export default ViewCourseDetailAdmin;
