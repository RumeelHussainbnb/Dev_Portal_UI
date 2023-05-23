import { memo, useEffect } from 'react';
import { useRouter } from 'next/router';
import TableHeader from './table-header-new';
import TableRow from './table-row-new';
import { useAppState } from '../../context/AppContext';
import { useCourseProgress } from '../../context/CourseProgressContext';

function Table({ showQuiz, quizId, courseContent, isAdmin, slug }) {
  const router = useRouter();
  const { course, setCourse, courseProgress } = useCourseProgress();
  const appState = useAppState();

  const handleCreateNew = () => {
    const { slug } = router.query;
    router.push({
      pathname: `/course/admin/${slug}/create-module`,
      query: { slug: slug }
    });
  };

  return (
    <div className="mx-auto my-20 flex max-w-4xl flex-col gap-10">
      {courseContent?.map((section, sectionIndex) => {
        return (
          (Object.keys(section.lessons).length > 0 || isAdmin) && (
            <div key={sectionIndex}>
              <TableHeader
                ready
                title={section.name}
                index={sectionIndex}
                total={section.length}
                progressCount={section.completedCount}
                moduleId={section._id}
                isAdmin={isAdmin}
              />
              {section.lessons.map((item, rowIndex) => {
                console.log(isAdmin);
                return (
                  <TableRow
                    ready
                    item={item}
                    index={rowIndex}
                    key={rowIndex}
                    section={section}
                    isAdmin={isAdmin}
                    slug={slug}
                  />
                );
              })}
            </div>
          )
        );
      })}
      {appState.isAdminMode === true && isAdmin === true && (
        <div className="mx-auto">
          <button
            className="rounded bg-yellow-500 px-6 py-3 text-white hover:bg-yellow-700"
            onClick={handleCreateNew}
          >
            + Add New modules
          </button>
        </div>
      )}

      {/*       {appState.publicKey && (
    <div>
      <AttemptQuizHeader showQuiz={showQuiz} link={`/course/quiz/attempt/${quizId}`} />
    </div>
  )}
  */}
    </div>
  );
}

export default memo(Table);
