import PropTypes from 'prop-types';
import { memo, useEffect } from 'react';
import ProgressSVG from './progressSVG';
import { useCourseProgress } from '../../context/CourseProgressContext';

function TableHeader({ title, index, total, progressCount, ready, isAdmin }) {
  return (
    <div>
      <div className="flex justify-between border border-gray-300 bg-gray-200 px-4 py-3 text-lg font-medium tracking-wide text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
        <span>
          Module {index + 1} - {title}
          {!ready && (
            <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800 dark:bg-red-500 dark:text-red-50">
              Coming soon
            </span>
          )}
        </span>

        {isAdmin ? (
          <div>
            <button>Edit</button>
            <button>Delete</button>
            <button>Create</button>
          </div>
        ) : (
          <ProgressSVG progress={progressCount} courseTotal={total} radius={16} stroke={2} />
        )}
      </div>
    </div>
  );
}

TableHeader.propType = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  ready: PropTypes.bool
};

export default memo(TableHeader);
