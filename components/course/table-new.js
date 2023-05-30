import { useRouter } from 'next/router';
import TableHeader from './table-header-new';
import AttemptQuizHeader from './attemptQuizHeader';
import TableRow from './table-row-new';
import { useAppState } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import { set } from 'mongoose';

function Table({ showQuiz, quizId, isAdmin, slug, courses, courseId }) {
  const router = useRouter();

  const appState = useAppState();
  const [setQuizShow, setQuizShowState] = useState(false);

  const handleCreateNew = () => {
    router.push({
      pathname: `/course/admin/${slug}/create-module`,
      query: { slug: slug }
    });
  };

  const handleCreateNewLesson = moduleId => {
    router.push({
      pathname: `/course/admin/${slug}/create-lesson`,
      query: { slug: slug, moduleId: moduleId }
    });
  };

  useEffect(() => {
    setQuizShowState(false);
    let total = 0;
    let complete = 0;
    courses &&
      courses.map((section, sectionIndex) => {
        total += section.totalLessons;
        complete += section.totalComplete;
      });
    console.log(total, complete);
    if (total === complete) {
      setQuizShowState(true);
    }
    console.log(setQuizShow);
  }, [courses, setQuizShow]);

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
                {isAdmin && (
                  <div className="flex cursor-pointer justify-between border-x border-b border-gray-300 py-3 pl-8  text-center hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-700">
                    <div
                      className="w-full"
                      onClick={() => {
                        handleCreateNewLesson(section._id);
                      }}
                    >
                      <span className=" text-base tracking-wide text-gray-700 dark:text-gray-300">
                        + Add New Lesson
                      </span>
                    </div>
                  </div>
                )}
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
      {setQuizShow && (
        <div>
          <AttemptQuizHeader showQuiz={showQuiz} link={`/course/quiz/attempt/${quizId}`} />
        </div>
      )}
    </div>
  );
}

export default Table;
