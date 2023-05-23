import PropTypes from 'prop-types';
import { memo, useEffect } from 'react';
import ProgressSVG from './progressSVG';
import { useCourseProgress } from '../../context/CourseProgressContext';
import { useRouter } from 'next/router';

function TableHeader({ title, index, total, progressCount, ready, isAdmin, moduleId }) {
  const router = useRouter();

  const handleEditModule = () => {
    const { slug } = router.query;
    router.push({
      pathname: `/course/admin/${slug}/edit-module`,
      query: { moduleId: moduleId }
    });
  };

  const handleCreateNew = () => {
    const { slug } = router.query;
    router.push({
      pathname: `/course/admin/${slug}/create-lesson`,
      query: { slug: slug, moduleId: moduleId }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between border border-gray-300 bg-gray-200 px-4 py-3 align-middle text-lg font-medium tracking-wide text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
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
            <button
              onClick={handleEditModule}
              className="mx-1 rounded bg-yellow-500 px-3 py-1 text-white"
            >
              Edit
            </button>
            <button
              onClick={() => {
                console.log('delete module', moduleId);
              }}
              className="mx-1 rounded bg-red-500 px-3 py-1 text-white"
            >
              Delete
            </button>
            <button
              onClick={handleCreateNew}
              className="mx-1 rounded bg-green-500 px-3 py-1 text-white"
            >
              Create
            </button>
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
