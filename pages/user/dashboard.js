import { useState, useEffect } from 'react';
import moment from 'moment';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/solid';

import { http } from '../../utils/http';
import { Container } from '../../components/layout';
import Pagination from '../../components/pagination/Pagination';

export default function Contents() {
  const [activeContent, setActiveContent] = useState([]);
  const [inactiveContent, setInactiveContent] = useState([]);
  const [submittedContent, setSubmittedContent] = useState([]);
  const [activeContentCount, setActiveContentCount] = useState(0);
  const [inactiveContentCount, setInactiveContentCount] = useState(0);
  const [submittedContentCount, setSubmittedContentCount] = useState(0);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const fetchData = async () => {
      try {
        const { data } = await http.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/status?&page=${1}&id=${
            userData.data._id
          }`
        );

        setActiveContent(data?.data?.statusActiveContent);
        setInactiveContent(data?.data?.statusInactiveContent);
        setSubmittedContent(data?.data?.statusSubmittedContent);
        setActiveContentCount(data?.data?.statusActiveContentCount);
        setInactiveContentCount(data?.data?.statusInactiveContentCount);
        setSubmittedContentCount(data?.data?.statusSubmittedContentCount);
        // console.log('martian ==> ', martian);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handlePageChange = async (page, tableType) => {
    try {
      if (tableType === 'Active') {
        const { data } = await http.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/status?&page=${
            page.selected + 1
          }&tableType=${tableType}`
        );

        if (data?.success === true) {
          setActiveContent(data.data?.statusActiveContent);
        }
      }
      if (tableType === 'Rejected') {
        const { data } = await http.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/status?&page=${
            page.selected + 1
          }&tableType=${tableType}`
        );

        if (data?.success === true) {
          setInactiveContent(data.data?.statusInactiveContent);
        }
      }
      if (tableType === 'Submitted') {
        const { data } = await http.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/status?&page=${
            page.selected + 1
          }&tableType=${tableType}`
        );

        if (data?.success === true) {
          setSubmittedContent(data?.data?.statusSubmittedContent);
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
      {/* Active Table */}
      <div className="block">
        <div className=" h-100 relative z-0  mt-2  flex w-11/12 flex-col divide-gray-200 rounded-md bg-white p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
          <p className="p-4 text-lg font-medium text-gray-500 dark:text-gray-500">
            Active Content:
          </p>

          <div className="scrollbar-hide max-h-100 relative  mb-2 overflow-y-auto shadow-md  sm:rounded-lg">
            {activeContent?.length > 0 ? (
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
                        <CheckCircleIcon
                          className="mr-2 h-6 w-6 fill-green-500"
                          aria-hidden="true"
                        />
                        {data.ContentStatus}
                      </td>
                      <td className="px-4 py-4">{data.Author}</td>

                      <td className="px-4 py-4">{moment(data.PublishedAt).format('YYYY-MM-DD')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full text-left text-center text-sm text-gray-500 dark:text-gray-400">
                No data available
              </div>
            )}
          </div>

          {activeContent?.length > 0 && (
            <Pagination
              showPerPage={false}
              pageCount={Math.ceil(activeContentCount / 10)}
              // pageSize={10}
              onPageChange={page => handlePageChange(page, 'Active')}
              onPageSizeChange={page => handlePageSizeChange(page, 'Active')}
            />
          )}
        </div>

        {/* Inactive Table 2 */}

        <div className="h-100 relative z-0  mt-8  flex w-11/12 flex-col divide-gray-200 rounded-md bg-white p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
          <p className="p-4 text-lg font-medium text-gray-500 dark:text-gray-500">
            In-active Content:
          </p>
          <div className="scrollbar-hide max-h-100 relative  mb-2 overflow-y-auto shadow-md  sm:rounded-lg">
            {inactiveContent?.length > 0 ? (
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
                      <td className="flex flex-row px-4 py-6">
                        <XCircleIcon className="mr-2 h-6 w-6 fill-red-500" aria-hidden="true" />
                        {data.ContentStatus}
                      </td>
                      <td className="px-4 py-4">{data.Author}</td>

                      <td className="px-4 py-4">{moment(data.PublishedAt).format('YYYY-MM-DD')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full text-left text-center text-sm text-gray-500 dark:text-gray-400">
                No data available
              </div>
            )}
          </div>
          {inactiveContent?.length > 0 && (
            <Pagination
              showPerPage={false}
              pageCount={Math.ceil(inactiveContentCount / 10)}
              //pageSize={perPage}
              onPageChange={page => handlePageChange(page, 'Rejected')}
              onPageSizeChange={page => handlePageSizeChange(page, 'Rejected')}
            />
          )}
        </div>

        {/* Submitted Table 2 */}

        <div className="h-100 relative z-0  mt-8  flex w-11/12 flex-col divide-gray-200 rounded-md bg-white p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
          <p className="p-4 text-lg font-medium text-gray-500 dark:text-gray-500">
            Submitted Content:
          </p>

          <div className="scrollbar-hide max-h-100 relative  mb-2 overflow-y-auto shadow-md  sm:rounded-lg">
            {submittedContent?.length > 0 ? (
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
                  {submittedContent.map((data, index) => (
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
                      <td className="flex flex-row px-4 py-6">
                        <InformationCircleIcon
                          className="mr-2 h-6 w-6 fill-yellow-500"
                          aria-hidden="true"
                        />
                        {data.ContentStatus}
                      </td>
                      <td className="px-4 py-4">{data.Author}</td>

                      <td className="px-4 py-4">{moment(data.PublishedAt).format('YYYY-MM-DD')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full text-left text-center text-sm text-gray-500 dark:text-gray-400">
                No data available
              </div>
            )}
          </div>
          {submittedContent?.length > 0 && (
            <Pagination
              showPerPage={false}
              pageCount={Math.ceil(submittedContentCount / 10)}
              //pageSize={perPage}
              onPageChange={page => handlePageChange(page, 'Submitted')}
              onPageSizeChange={page => handlePageSizeChange(page, 'Rejected')}
            />
          )}
        </div>
      </div>
    </Container>
  );
}
