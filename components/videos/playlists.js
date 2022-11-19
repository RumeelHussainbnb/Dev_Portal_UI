import { ChevronRightIcon, FolderIcon, VideoCameraIcon, PlusIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function Playlists({ data, mode }) {
  return (
    <>
      {/* Mobile */}
      <div className="mt-10 sm:hidden">
        <div className="px-4 sm:px-6">
          <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-300">
            Playlists
          </h2>
        </div>
        <ul
          role="list"
          className="mt-3 divide-y divide-gray-100 border-t border-gray-200 dark:divide-gray-600 dark:border-gray-700"
        >
          <>
            {data.map(playlist => (
              <li key={playlist._id}>
                <Link href={`/library/${playlist._id}`} passHref>
                  <div className="flex h-12 items-center space-x-2 pl-2">
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="cursor-pointer truncate text-sm  hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-500">
                      {playlist.Title}{' '}
                      <span className="font-normal text-gray-500 dark:text-gray-500">
                        by {playlist.Author}
                      </span>
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </>
        </ul>
      </div>

      {/* Tablet & Desktop */}
      <div className="mt-1 hidden overflow-hidden pr-5 sm:block">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full">
            <thead className="px-14">
              <tr className="border-t border-gray-200 dark:border-gray-400">
                <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300">
                  <span className="lg:pl-2">Name</span>
                </th>
                {mode.editMode == 'true' && (
                  <th className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    <span className="lg:pl-2">Add Video</span>
                  </th>
                )}

                <th className="hidden border-b border-gray-200 bg-gray-50 px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300 md:table-cell">
                  Platform
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-600 dark:bg-gray-800">
              {data.map(playlist => (
                <tr key={playlist._id}>
                  <td className="whitespace-nowrap px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-200">
                    <div className="flex cursor-pointer items-center space-x-3 lg:pl-2">
                      <FolderIcon
                        className="h-8 w-8 text-gray-700 dark:text-gray-500"
                        aria-hidden="true"
                      />
                      <Link
                        href={{
                          pathname: `/library/${playlist._id}`,
                          query: { playlistTitle: playlist.Title }
                        }}
                        passHref
                      >
                        <span className="truncate font-medium tracking-wide hover:text-gray-600 dark:text-gray-200">
                          {playlist.Title}{' '}
                          <span className="font-normal text-gray-500 dark:text-gray-400">
                            by {playlist.Author}
                          </span>
                        </span>
                      </Link>
                    </div>
                  </td>
                  {mode.editMode == 'true' && (
                    <td className="hidden whitespace-nowrap px-12 py-3 text-sm text-gray-500 dark:text-gray-300 md:table-cell">
                      <Link href={`/library/admin/playlist/video/${playlist._id}`} passHref>
                        <span className="flex  cursor-pointer items-center">
                          <PlusIcon className="h-6 w-6 text-gray-500 " aria-hidden="true" />
                        </span>
                      </Link>
                    </td>
                  )}

                  <td className="hidden whitespace-nowrap px-3 py-3 text-sm text-gray-500 dark:text-gray-300 md:table-cell">
                    <div className="flex items-center space-x-2">
                      {playlist.Provider === 'Youtube' && (
                        <VideoCameraIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                      )}
                      {playlist.Provider === 'Twitch' && (
                        <VideoCameraIcon className="h-6 w-6 text-purple-500" aria-hidden="true" />
                      )}
                      <span className="font-medium tracking-wide text-gray-500 dark:text-gray-400">
                        {playlist.Provider}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

Playlists.propTypes = {
  data: PropTypes.array.isRequired
};
