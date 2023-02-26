import { useState, useEffect } from 'react';
import moment from 'moment';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon } from '@heroicons/react/solid';

import { http } from '../../utils/http';
import { Container } from '../../components/layout';
import Pagination from '../../components/pagination/Pagination';
import Image from 'next/image';

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
      <div className='dashboard-page'>

      <div className='cardHolder'>
        <div className="card shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
          <div className="card-image">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
          </svg>
            {/* <Image src={'/Username.png'} height={'100px'} width={'100px'} alt="" /> */}
          </div>
          <div>
            <h4>Overall total content</h4> 
            <p>123</p> 
          </div>
        </div>
        <div className="card shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
        <div className="card-image">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
            {/* <Image src={'/Username.png'} height={'100px'} width={'100px'} alt="" /> */}
          </div>
          <div>
            <h4>Total active</h4> 
            <p>123</p> 
          </div>
        </div>
        <div className="card shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
          <div className="card-image">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
              {/* <Image src={'/Username.png'} height={'100px'} width={'100px'} alt="" /> */}
            </div>
            <div>
              <h4>Total submitted</h4> 
              <p>123</p> 
            </div>
        </div>
        <div className="card shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
        <div className="card-image">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
          </svg>
            {/* <Image src={'/Username.png'} height={'100px'} width={'100px'} alt="" /> */}
          </div>
          <div>
            <h4>Total inactive</h4> 
            <p>123</p> 
          </div>
        </div>
        <div className="card shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
          <div className="card-image">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
            </svg>
          </div>
          <div>
            <h4>Total likes</h4> 
            <p>123</p> 
          </div>
        </div>
        <div className="card shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
        <div className="card-image">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        {/* <Image src={'/account.png'} width="250px" height="250px" /> */}
          </div>
          <div>
            <h4>Total views</h4> 
            <p>123</p> 
          </div>
        </div>
      </div>
      {/* Active Table */}
      <div className="block">
          <p className="p-4 text-lg font-medium text-gray-500 dark:text-gray-500">
            Active Content:
          </p>
        <div className=" h-100 relative z-0  mt-2  flex w-11/12 flex-col divide-gray-200 rounded-md bg-white p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">

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

        <p className="p-4 text-lg font-medium text-gray-500 dark:text-gray-500">
          In-active Content:
        </p>
        <div className="h-100 relative z-0  mt-8  flex w-11/12 flex-col divide-gray-200 rounded-md bg-white p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
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

        <p className="p-4 text-lg font-medium text-gray-500 dark:text-gray-500">
          Submitted Content:
        </p>
        <div className="h-100 relative z-0  mt-8  flex w-11/12 flex-col divide-gray-200 rounded-md bg-white p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">

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
      </div>
    </Container>
  );
}
