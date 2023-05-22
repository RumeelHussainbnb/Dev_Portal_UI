import Link from 'next/link';
import { memo, useState } from 'react';

//Default Functions

const CourseContent = ({ content }) => {
  return (
    <div className="mt-5 grid grid-cols-1 gap-8 px-4 py-3 md:grid-cols-2 lg:grid-cols-3">
      {content?.map(course => (
        <div key={course.id} className="rounded bg-gray-100 p-4">
          <h3 className="mb-2 text-lg font-bold">{course.shortTitle}</h3>
          <p>{course.longTitle}</p>
          <div className="mt-4 flex space-x-4">
            <Link className="text-blue-500" href={`/course/admin/${course.slug}`}>
              View
            </Link>
            <Link className="text-blue-500" href={`/course/admin/edit/${course.slug}`}>
              Edit
            </Link>
            {/* <button className="text-red-500">Delete</button> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(CourseContent);
