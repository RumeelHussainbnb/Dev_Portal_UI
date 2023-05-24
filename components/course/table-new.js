import { memo, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TableHeader from './table-header-new';
import TableRow from './table-row-new';
import { useAppState } from '../../context/AppContext';
import { useCourseProgress } from '../../context/CourseProgressContext';

function Table({ showQuiz, quizId, courseContent, isAdmin, slug, courseId }) {
  const router = useRouter();
  const { courseProgress } = useCourseProgress();
  const [courseData, setCourseData] = useState(null);

  const appState = useAppState();

  useEffect(() => {
    const visualizeCourseLock = (courseData, courseProgressData) => {
      const updatedCourseData = courseData;
      for (let modules in courseProgressData['moduleId']) {
        for (let lesson in courseProgressData['moduleId'][modules].lessonId) {
          if (
            courseProgressData['moduleId'][modules]['lessonId'][lesson]?._id ===
            courseData[modules]['lessons'][lesson]?._id
          ) {
            updatedCourseData[modules]['lessons'][lesson].isLocked =
              courseProgressData['moduleId'][modules]['lessonId'][lesson].locked;
            updatedCourseData[modules]['lessons'][lesson].completed =
              courseProgressData['moduleId'][modules]['lessonId'][lesson].completed;
            updatedCourseData[modules]['lessons'][lesson].isNotRead =
              courseProgressData['moduleId'][modules]['lessonId'][lesson].isNotRead;
          }
        }
      }
      setCourseData(updatedCourseData);
    };
    visualizeCourseLock(courseContent, courseProgress);
  }, [courseProgress, courseContent]);

  const handleCreateNew = () => {
    const { slug } = router.query;
    router.push({
      pathname: `/course/admin/${slug}/create-module`,
      query: { slug: slug }
    });
  };

  return (
    <div className="mx-auto my-20 flex max-w-4xl flex-col gap-10">
      {courseData?.map((section, sectionIndex) => {
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
                return (
                  <TableRow
                    ready
                    item={{ ...item, moduleId: section._id, courseId: courseId }}
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

export default Table;
