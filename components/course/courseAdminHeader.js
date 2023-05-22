import Link from 'next/link';
import React from 'react';

const CourseAdminHeader = () => {
  return (
    <div className="flex justify-between  border-b px-4 py-3 text-lg font-medium tracking-wide text-gray-800">
      <h1>Course Admin</h1>
      <button className="border-collapse rounded-md bg-yellow-400 px-8 py-3 text-white hover:bg-yellow-600">
        <Link href="/course/admin/create">Create New Course</Link>
      </button>
    </div>
  );
};

export default CourseAdminHeader;
