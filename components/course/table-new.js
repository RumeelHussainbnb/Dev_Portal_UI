import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import TableHeader from './table-header-new';
import TableRow from './table-row-new';
import { useAppState } from '../../context/AppContext';
import { useCourseProgress } from '../../context/CourseProgressContext';

function Table({ showQuiz, quizId, isAdmin, slug, courseId }) {
  const router = useRouter();
  const { courseProgress, course } = useCourseProgress();
  const [courseData, setCourseData] = useState(null);
  console.log(course);
  console.log(courseProgress);

  const appState = useAppState();

  // useEffect(() => {
  //   const visualizeCourseLock = (courseContnt, courseProgressData) => {
  //     const updatedCourseData = JSON.parse(JSON.stringify(courseContnt));
  //     for (let modules in courseProgressData.moduleId) {
  //       const moduleId = courseProgressData.moduleId[modules];
  //       for (let lesson in moduleId.lessonId) {
  //         const lessonId = moduleId.lessonId[lesson];
  //         if (lessonId._id === updatedCourseData[modules].lessons[lesson]._id) {
  //           Object.assign(updatedCourseData[modules].lessons[lesson], {
  //             isLocked: lessonId.locked,
  //             completed: lessonId.completed,
  //             isNotRead: lessonId.isNotRead
  //           });
  //         }
  //       }
  //     }
  //     setCourseData(updatedCourseData);
  //   };
  //   visualizeCourseLock(courseContent, courseProgress);
  // }, [courseProgress, courseContent]);

  const handleCreateNew = () => {
    router.push({
      pathname: `/course/admin/${slug}/create-module`,
      query: { slug: slug }
    });
  };

  return (
    <div className="mx-auto my-20 flex max-w-4xl flex-col gap-10">
      {course?.map(
        (section, sectionIndex) =>
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
