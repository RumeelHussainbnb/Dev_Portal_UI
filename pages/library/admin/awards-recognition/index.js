import React, { useEffect } from 'react';
import { useState, useId } from 'react';
import { PencilAltIcon } from '@heroicons/react/solid';
import dynamic from 'next/dynamic';

import Pagination from '../../../../components/pagination/Pagination';
import { Container } from '../../../../components/layout';
import { http } from '../../../../utils/http';
const AwardEditModal = dynamic(() => import('./editModal'));

export async function getServerSideProps(context) {
  const { data } = await http.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/getAllUsers?&page=${1}`
  );
  return { props: data };
}

export default function AwardsRecognition({ data, user }) {
  //console.log('data ==> ', data);

  const [users, setUsers] = useState(data.users);
  const [selectedUsers, setSelectedUsers] = useState();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    makeApiCall(search);
  }, [page]);

  const handlePageChange = page => {
    setPage(page + 1);
  };

  const makeApiCall = async searchKey => {
    try {
      const { data } = await http.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/getAllUsers?&page=${page}&name=${searchKey}`
      );
      if (data?.success === true) {
        setUsers(data.data?.users);
      }
    } catch (error) {}
  };

  const handleEditAward = (data, event) => {
    event.preventDefault();

    setSelectedUsers(data);
    setOpen(true);
  };

  //No need to for this function because we removd page size
  const handlePageSizeChange = async newSize => {};
  const metaTags = {
    title: 'BNBChainDev - Profile',
    description:
      'Stay up-to-date with the BNBChain ecosystem. BNBChain Projects and Developers in one place.',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/martian/content`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="awards-recognition relative z-0 mt-2 w-full divide-gray-200 rounded-md bg-white text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500 sm:p-3 lg:p-8">
        <h2 className="text-center text-black">Awards and recognition</h2>
        <form
          action="#"
          method="GET"
          className="my-4 flex items-center"
          onSubmit={e => {
            e.preventDefault();
            makeApiCall(search);
          }}
        >
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <input
              type="text"
              id="simple-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Search By Name"
              //required
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {search.length !== 0 && (
            <button
              onClick={() => {
                setSearch('');

                makeApiCall('');
              }}
              type="button"
              className="ml-2 rounded-lg border border-yellow-700 bg-yellow-700 p-2.5 text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <span className="sr-only">Search</span>
            </button>
          )}

          <button
            type="submit"
            className="ml-2 rounded-lg border border-yellow-700 bg-yellow-700 p-2.5 text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
        {users.length > 0 ? (
          <div className="scrollbar-hide max-h-100 relative  mb-2 overflow-y-auto shadow-md  sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    User
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Awards & Recognition
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Article Count
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Views
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Likes
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-4 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {data.Username}
                    </th>
                    <td className="px-4 py-4">
                      {String(
                        data?.Author?.RecognizationsAndAwards?.map(award => award.split('_')[0])
                      )}
                    </td>
                    <td className="px-4 py-4">{String(data?.TotalArticles)}</td>
                    {/* <td className="flex flex-row px-4 py-4">
                      <CheckCircleIcon className="mr-2 h-6 w-6 fill-green-500" aria-hidden="true" />
                      N/A
                    </td> */}
                    <td className="px-4 py-4">{String(data?.TotalViews)}</td>

                    <td className="px-4 py-4">{String(data?.TotalLikes)}</td>
                    <td className="px-4 py-4">
                      <a
                        href="#"
                        onClick={event => handleEditAward(data, event)}
                        className="font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                      >
                        <PencilAltIcon className=" h-6 w-6 fill-yellow-500" aria-hidden="true" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <Pagination
          showPerPage={false}
          pageCount={Math.ceil(data.usersCount / 10)}
          // pageSize={10}
          onPageChange={page => handlePageChange(page.selected)}
          onPageSizeChange={page => handlePageSizeChange(page)}
        />
      </div>
      {open && <AwardEditModal open={open} setOpen={setOpen} content={selectedUsers} />}
    </Container>
  );
}
