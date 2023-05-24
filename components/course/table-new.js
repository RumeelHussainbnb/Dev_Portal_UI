import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TableHeader from './table-header-new';
import TableRow from './table-row-new';
import { useAppState } from '../../context/AppContext';
import { useCourseProgress } from '../../context/CourseProgressContext';

function Table({ showQuiz, quizId, isAdmin, slug, courses, courseId }) {
  console.log('courses', courseId);
  const router = useRouter();

  const appState = useAppState();

  const handleCreateNew = () => {
    router.push({
      pathname: `/course/admin/${slug}/create-module`,
      query: { slug: slug }
    });
  };

  return (
    <div className="mx-auto my-20 flex max-w-4xl flex-col gap-10">
      {courses &&
        courses.map(
          (section, sectionIndex) =>
            (Object.keys(section.lessons).length > 0 || isAdmin) && (
              <div key={sectionIndex}>
                <TableHeader
                  ready
                  title={section.name}
                  index={sectionIndex}
                  total={section.totalLessons}
                  progressCount={section.totalComplete}
                  moduleId={section._id}
                  isAdmin={isAdmin}
                />
                {section.lessons.map((item, rowIndex) => (
                  <TableRow
                    ready
                    item={{ ...item, moduleId: section._id, courseId: courseId }}
                    index={rowIndex}
                    key={rowIndex}
                    section={section}
                    isAdmin={isAdmin}
                    slug={slug}
                  />
                ))}
              </div>
            )
        )}
      {appState.isAdminMode && isAdmin && (
        <div className="mx-auto">
          <button
            className="rounded bg-yellow-500 px-6 py-3 text-white hover:bg-yellow-700"
            onClick={handleCreateNew}
          >
            + Add New modules
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
