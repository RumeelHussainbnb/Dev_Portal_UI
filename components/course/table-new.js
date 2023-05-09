import { memo, useEffect } from 'react';
import TableHeader from './table-header-new';
import TableRow from './table-row-new';
import { useAppState } from '../../context/AppContext';
import { loadCourse } from '../../lib/load-course';
import { header } from '../../utils/course-title';
import { useCourseProgress } from '../../context/CourseProgressContext';

function Table({ showQuiz, quizId }) {
  const { course, setCourse } = useCourseProgress();
  const appState = useAppState();

  useEffect(() => {
    loadCourse().then(data => {
      const matchedItems = [];

      header.forEach(headerItem => {
        const matchedDataItems = data.filter(dataItem => dataItem.section === headerItem.title);
        matchedItems.push({
          title: headerItem.title,
          items: matchedDataItems
        });
      });

      setCourse(matchedItems);
    });
  }, [setCourse]);

  return (
    <div className="mx-auto my-20 flex max-w-4xl flex-col gap-10">
      {course.map((section, sectionIndex) => {
        return (
          <div key={sectionIndex}>
            <TableHeader ready title={section.title} index={sectionIndex} />
            {section.items.map((item, rowIndex) => {
              return <TableRow ready item={item} index={rowIndex} key={rowIndex} />;
            })}
          </div>
        );
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
