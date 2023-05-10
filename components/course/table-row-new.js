import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo, useState, useEffect } from 'react';
import StatusButton from './statusButton';
import { useCourseProgress } from '../../context/CourseProgressContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function TableRow({ item, index, ready }) {
  const { courseProgress } = useCourseProgress();
  const [status, setStatus] = useState(false);

  const handleLock = () => {
    setStatus(true);
  };

  useEffect(() => {
    const previousCourse = courseProgress.find(course => {
      return course.CourseId === item.previousCourse;
    });

    if (!previousCourse?.completed && previousCourse !== undefined) {
      setStatus(true);
    }
  }, [courseProgress, item.previousCourse]);

  return (
    <div
      className={classNames(
        'flex justify-between border-x border-b border-gray-300 py-3 pl-8  dark:border-gray-600 dark:bg-gray-900',
        ready && !status
          ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'
          : 'cursor-not-allowed blur-sm'
      )}
    >
      <Link href={`/course/${item._id}`} passHref>
        <div className="w-full">
          <span className="mr-3 text-xl text-gray-500 dark:text-gray-500">{++index}.</span>
          <span className=" text-base tracking-wide text-gray-700 dark:text-gray-300">
            {item.name}
          </span>
        </div>
      </Link>

      <StatusButton
        item={item}
        courseProgress={courseProgress}
        setLock={handleLock}
        isLocked={status}
      />
    </div>
  );
}

TableRow.propType = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  ready: PropTypes.bool
};

export default memo(TableRow);
