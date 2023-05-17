import { memo, useEffect } from 'react';
import TableHeader from './table-header-new';
import TableRow from './table-row-new';
import { useAppState } from '../../context/AppContext';
import { loadCourse } from '../../lib/load-course';
import { header } from '../../utils/course-title';
import { useCourseProgress } from '../../context/CourseProgressContext';

function Table({ showQuiz, quizId }) {
  const { course, setCourse } = useCourseProgress();
  const { courseProgress } = useCourseProgress();

  useEffect(() => {
    loadCourse().then(data => {
      const matchedItems = [];

      header.forEach(headerItem => {
        const matchedDataItems = data.filter(dataItem => dataItem.section === headerItem.title);

        // Match the courseId from the userProgress to the _id from the courseData
        const matchedUserProgressItems = courseProgress.filter(progressItem => {
          const matchedCourseData = data.find(
            courseItem => courseItem._id === progressItem.CourseId
          );
          return matchedCourseData && matchedCourseData.section === headerItem.title;
        });

        const updatedMatchedDataItems = matchedDataItems.map(dataItem => {
          const matchedProgressItem = matchedUserProgressItems.find(
            progressItem => progressItem.CourseId === dataItem._id
          );
          return {
            ...dataItem,
            completed: matchedProgressItem?.completed || false
          };
        });

        const completedCount = matchedUserProgressItems.filter(
          progressItem => progressItem.completed
        ).length;

        matchedItems.push({
          title: headerItem.title,
          items: updatedMatchedDataItems,
          count: updatedMatchedDataItems.length || 0,
          completedCount: completedCount
        });
      });
      setCourse(matchedItems);
    });
  }, [setCourse, courseProgress]);

  return (
    <div className="mx-auto my-20 flex max-w-4xl flex-col gap-10">
      {course.map((section, sectionIndex) => {
        if (section.count > 0) {
          return (
            <div key={sectionIndex}>
              <TableHeader
                ready
                title={section.title}
                index={sectionIndex}
                total={section.count}
                progressCount={section.completedCount}
              />
              {section.items.map((item, rowIndex) => {
                return (
                  <TableRow ready item={item} index={rowIndex} key={rowIndex} section={section} />
                );
              })}
            </div>
          );
        } else {
          return null;
        }
      })}

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
