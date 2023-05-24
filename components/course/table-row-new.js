import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo, useState, useEffect, useCallback } from 'react';
import StatusButton from './statusButton';
import { http } from '../../utils/http';
import { useAppState } from '../../context/AppContext';
import { useRouter } from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function TableRow({ item, index, ready, isAdmin, slug }) {
  const appState = useAppState();
  const router = useRouter();
  const handleCreateUserProgress = async () => {
    try {
      const res = await http.post('/userProgress/', {
        CourseId: item.courseId,
        LessonId: item._id,
        ModuleId: item.moduleId,
        UserId: appState.userId
      });
      if (res.data.success) {
        console.log('success');
        router.push({
          pathname: `/course/${item._id}`,
          query: { id: item._id }
        });
      }
    } catch (error) {
      console.log(error);
    }
    // router.push({
    //   pathname: `/course/${item._id}`,
    //   query: { slug: slug }
    // });
  };

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
        <div className="w-full" onClick={handleCreateUserProgress}>
          <span className="mr-3 text-xl text-gray-500 dark:text-gray-500">{++index}.</span>
          <span className=" text-base tracking-wide text-gray-700 dark:text-gray-300">
            {item.name}
          </span>
        </div>
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
