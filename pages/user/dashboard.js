import { useState } from 'react';
import moment from 'moment';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';

import axios from '../../utils/http';
import { Container } from '../../components/layout';
import Pagination from '../../components/pagination/Pagination';

export async function getServerSideProps() {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/status?&page=${1}`
  );
  return { props: data };
}

export default function Contents({ data }) {
  const [activeContent, setActiveContent] = useState(data.statusActiveContent);
  const [inactiveContent, setInactiveContent] = useState(data.statusInactiveContent);
  const [submittedContent, setSubmittedContent] = useState(data.statusinactive);

  const handlePageChange = async (page, tableType) => {
    try {
      if (tableType === 'Active') {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/status?&page=${
            page.selected + 1
          }&tableType=${tableType}`
        );

        if (data?.success === true) {
          setActiveContent(data.data?.statusActiveContent);
        }
      }
      if (tableType === 'Rejected') {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/status?&page=${
            page.selected + 1
          }&tableType=${tableType}`
        );

        if (data?.success === true) {
          setInactiveContent(data.data?.statusInactiveContent);
        }
      }
    } catch (error) {}
  };

  //No need to for this function because we removd page size
  const handlePageSizeChange = async newSize => {};
  const metaTags = {
    title: 'BNBChainDev - Profile',
    description:
      'Stay up-to-date with the BNBChain ecosystem. BNBChain Projects and Developers in one place.',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/mvp/content`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      {/* Table 1 */}

      <div className="relative z-0 mt-2  flex w-11/12 flex-col divide-gray-200 rounded-md bg-white p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
        <p className="p-4 text-lg font-medium text-gray-500 dark:text-gray-500">Active Content:</p>
        {activeContent.length > 0 ? (
          <div className="scrollbar-hide max-h-100 relative  mb-2 overflow-y-auto shadow-md  sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Created Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Content Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Author
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Published On
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeContent.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-1 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {moment(data.CreatedAt).format('YYYY-MM-DD')}
                    </th>
                    <td className="px-4 py-4">
                      <a
                        href={data.Url}
                        rel="noreferrer"
                        target="_blank"
                        className=" hover:underline "
                      >
                        {data.Title}
                      </a>
                    </td>
                    <td className="flex flex-row px-4 py-4">
                      <CheckCircleIcon className="mr-2 h-6 w-6 fill-green-500" aria-hidden="true" />
                      {data.ContentStatus}
                    </td>
                    <td className="px-4 py-4">{data.Author}</td>

                    <td className="px-4 py-4">{moment(data.PublishedAt).format('YYYY-MM-DD')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        <Pagination
          showPerPage={false}
          pageCount={Math.ceil(data.statusActiveCount / 10)}
          // pageSize={10}
          onPageChange={page => handlePageChange(page, 'Active')}
          onPageSizeChange={page => handlePageSizeChange(page, 'Active')}
        />
      </div>

      {/* Table 2 */}

      <div className="relative z-0 mt-8  flex w-11/12 flex-col divide-gray-200 rounded-md bg-white p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
        <p className="p-4 text-lg font-medium text-gray-500 dark:text-gray-500">
          Rejected Content:
        </p>
        {inactiveContent.length > 0 ? (
          <>
            <div className="scrollbar-hide max-h-100 relative  mb-2 overflow-y-auto shadow-md  sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Created Date
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Title
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Content Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Author
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Published On
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inactiveContent.map((data, index) => (
                    <tr
                      key={index}
                      className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="whitespace-nowrap px-1 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {moment(data.CreatedAt).format('YYYY-MM-DD')}
                      </th>
                      <td className="px-4 py-4">
                        <a
                          href={data.Url}
                          rel="noreferrer"
                          target="_blank"
                          className=" hover:underline "
                        >
                          {data.Title}
                        </a>
                      </td>
                      <td className="flex flex-row px-4 py-4">
                        <XCircleIcon className="mr-2 h-6 w-6 fill-red-500" aria-hidden="true" />
                        {data.ContentStatus}
                      </td>
                      <td className="px-4 py-4">{data.Author}</td>

                      <td className="px-4 py-4">{moment(data.PublishedAt).format('YYYY-MM-DD')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              showPerPage={false}
              pageCount={Math.ceil(data.statusInactiveCount / 10)}
              //pageSize={perPage}
              onPageChange={page => handlePageChange(page, 'Rejected')}
              onPageSizeChange={page => handlePageSizeChange(page, 'Rejected')}
            />{' '}
          </>
        ) : null}
      </div>

      {/* Table 3*/}

      <div className="relative z-0 mt-8  flex w-11/12 flex-col divide-gray-200 rounded-md bg-white p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
        <p className="p-4 text-lg font-medium text-gray-500 dark:text-gray-500">
          Submitted Content:
        </p>
        {/* {inactiveContent.length > 0 ? (
          <div className="scrollbar-hide max-h-100 relative  mb-2 overflow-y-auto shadow-md  sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Created Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Content Status
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Author
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Published On
                  </th>
                </tr>
              </thead>
              <tbody>
                {inactiveContent.map((data, index) => (
                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-1 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {moment(data.CreatedAt).format('YYYY-MM-DD')}
                    </th>
                    <td className="px-4 py-4">
                      <a
                        href={data.Url}
                        rel="noreferrer"
                        target="_blank"
                        className=" hover:underline "
                      >
                        {data.Title}
                      </a>
                    </td>
                    <td className="flex flex-row px-4 py-4">
                      <XCircleIcon className="mr-2 h-6 w-6 fill-red-500" aria-hidden="true" />
                      {data.ContentStatus}
                    </td>
                    <td className="px-4 py-4">{data.Author}</td>

                    <td className="px-4 py-4">{moment(data.PublishedAt).format('YYYY-MM-DD')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null} */}
        {/* {inactiveContent.length > 0 && (
          <Pagination
            showPerPage={false}
            pageCount={Math.ceil(data.statusInactiveCount / 10)}
            //pageSize={perPage}
            onPageChange={page => handlePageChange(page, 'Rejected')}
            onPageSizeChange={page => handlePageSizeChange(page, 'Rejected')}
          />
        )} */}
      </div>
    </Container>
  );
}
