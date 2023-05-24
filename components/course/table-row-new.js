import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo, useState, useEffect, useCallback } from 'react';
import StatusButton from './statusButton';
import { useCourseProgress } from '../../context/CourseProgressContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function TableRow({ item, index, ready, isAdmin, slug }) {
  return (
    <div
      className={classNames(
        'flex justify-between border-x border-b border-gray-300 py-3 pl-8  dark:border-gray-600 dark:bg-gray-900',
        ready && !item.isLocked
          ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700'
          : 'cursor-not-allowed blur-sm'
      )}
    >
      {item.isLocked ? (
        <div className="w-full">
          <span className="mr-3 text-xl text-gray-500 dark:text-gray-500">{++index}.</span>
          <span className=" text-base tracking-wide text-gray-700 dark:text-gray-300">
            {item.name}
          </span>
        </div>
      ) : (
        <Link href={`/course/${item._id}`} passHref>
          <div className="w-full">
            <span className="mr-3 text-xl text-gray-500 dark:text-gray-500">{++index}.</span>
            <span className=" text-base tracking-wide text-gray-700 dark:text-gray-300">
              {item.name}
            </span>
          </div>
        </Link>
      )}

      {isAdmin ? (
        <div>
          <Link href={`/course/admin/${slug}/${item._id}`} passHref>
            <div className="mx-2 my-auto flex h-[32px] w-[100px] items-center justify-center rounded-md bg-yellow-500 px-2 align-middle text-white">
              Edit
            </div>
          </Link>
        </div>
      ) : (
        <StatusButton item={item} />
      )}
    </div>
  );
}

TableRow.propType = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  ready: PropTypes.bool
};

export default memo(TableRow);
