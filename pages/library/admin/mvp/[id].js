import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Container } from '../../../../components/layout';
import { loadMartians } from '../../../../lib/load-martians-list';
import { TagIcon, TrendingUpIcon } from '@heroicons/react/solid';
import moment from 'moment';
import Image from 'next/image';
import fetch from '../../../../utils/fetcher';
import Pagination from '../../../../components/pagination/Pagination';
import axios from '../../../../utils/http';

export const getStaticPaths = async () => {
  const response = await loadMartians();
  const paths = response.data.data.map(content => {
    return {
      params: {
        slug: content.id
      }
    };
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: 'blocking' };
};

export async function getStaticProps({ params }) {
  try {
    const martian = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/martian/byId?id=${params.id}`
    );

    return {
      props: {
        martian: { ...martian.data, ActivitiesSize: martian.martianActivitySize.ActivitiesSize },
        id: params.id
      },
      revalidate: 60
    };
  } catch (error) {
    return {
      props: {
        martian: {}
      },
      revalidate: 60
    };
  }
}
export default function Profile({ martian, id }) {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activities, setActivities] = useState(martian.Activities);

  const handlePageChange = async newPage => {
    setPage(newPage.selected + 1);
    try {
      const response = await axios.get(
        `/martian/martianActivity?pageNumber=${newPage.selected + 1}&limit=${perPage}&id=${id}`
      );
      if (response?.data?.success === true) {
        setActivities(response?.data.data?.Activities);
      }
    } catch (error) {}
  };

  const handlePageSizeChange = async newSize => {
    setPerPage(newSize);
    try {
      const response = await axios.get(
        `/martian/martianActivity?pageNumber=${page}&limit=${newSize}&id=${id}`
      );
      if (response?.data?.success === true) {
        setActivities(response?.data?.data?.Activities);
      }
    } catch (error) {}
  };

  const metaTags = {
    title: 'BNBChainDev - Profile',
    description:
      'Stay up-to-date with the BNBChain ecosystem. BNBChain Projects and Developers in one place.',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/profile`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="flex gap-6 px-2 sm:px-6">
        <main className="w-full">
          <div className="px-4 sm:px-6">
            <div className="relative z-0 flex flex-col divide-gray-200 rounded-md bg-white p-2 shadow dark:divide-gray-700 dark:bg-gray-800">
              {/* Profile Detail */}
              <div className="flex flex-row">
                <div className="h-44 w-44 overflow-hidden rounded-full">
                  {martian.ImageUrl ? (
                    <Image alt="" src={martian.ImageUrl} width={'250px'} height={'250px'} />
                  ) : (
                    <Image alt="" src={'/martianImage.png'} width={'250px'} height={'250px'} />
                  )}
                </div>
                <div className="ml-3 mt-6 w-[70%]">
                  <p className="mb-2 text-lg font-medium uppercase text-gray-500 dark:text-gray-500">
                    {martian.FirstName + ' ' + martian.LastName}
                  </p>
                  <div className="flex flex-row">
                    {/* <div className="h-3 w-3">
                      <Image src={'/place.png'} width="250px" height="250px" />
                    </div> */}
                    <p className="text-sm text-gray-500 dark:text-gray-500">{martian.Country}</p>
                  </div>
                  <div className="flex flex-row">
                    {/* <div className="mr-1 h-3 w-3">
                      <Image src={'/time.png'} width="250px" height="250px" />
                    </div> */}
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Members since ,{moment(martian?.CreatedAt).format('MMMM,YYYY')}
                    </p>
                  </div>

                  <div className="flex flex-row">
                    {/* <div className="mr-1 h-3 w-3">
                      <Image src={'/account.png'} width="250px" height="250px" />
                    </div> */}
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {martian.MartianType}
                    </p>
                  </div>
                  <p className="mt-2 mb-2 text-xs text-gray-500 dark:text-gray-500">
                    {martian.Expertise}
                  </p>
                  {/* <a
                    className="text-sm text-gray-500 dark:text-gray-500"
                    href="https://www.c-sharpcorner.com/members/Williambeniamin"
                  >
                    Personal Blog: https://www.c-sharpcorner.com/members/Williambeniamin
                  </a> */}
                </div>
              </div>
              {/* Achievement */}
              {/* <div className="mt-2 flex flex-row justify-around">
                <div className="flex h-16 w-36 flex-row">
                  <div className="h-10 w-10">
                    <TagIcon className="h-6 w-6" aria-hidden="true" />
                   
                  </div>
                  <div className="ml-1">
                    <p className="text-base font-medium text-black">AI</p>
                    <p className="text-[12px] font-normal">Award Category</p>
                  </div>
                </div>
                <div className="flex h-16 w-36 flex-row">
                  <div className="h-10 w-10">
                    <Image src={'/martianImage.png'} width="250px" height="250px" />
                  </div>
                  <div className="ml-1">
                    <p className="text-base font-medium text-black">2019</p>
                    <p className="text-[12px] font-normal">First Year Awarded</p>
                  </div>
                </div>
                <div className="flex h-16 w-36 flex-row">
                  <div className="h-10 w-10">
                    <TrendingUpIcon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="ml-1">
                    <p className="text-base font-medium text-black">13k</p>
                    <p className="text-[12px] font-normal">Number of MVP Awards</p>
                  </div>
                </div>             
              </div> */}
            </div>
            {/* Share & Authar Part */}
            <div className="mt-2 flex flex-row justify-between ">
              <div className="relative z-0 flex w-[49%] flex-col items-center justify-center divide-x divide-gray-200 rounded-md bg-white p-2 shadow dark:divide-gray-700 dark:bg-gray-800">
                <p className="text-lg font-medium text-gray-500 dark:text-gray-500">Social:</p>
                <div className="flex flex-row">
                  <div className="mr-1 h-6 w-6 hover:cursor-pointer">
                    <Image alt="" src={'/facebook.png'} width="250px" height="250px" />
                  </div>
                  <div className="mr-1 h-6 w-6 hover:cursor-pointer">
                    <Image alt="" src={'/linkedin.png'} width="250px" height="250px" />
                  </div>
                  <div className="mr-1 h-6 w-6 hover:cursor-pointer">
                    <Image alt="" src={'/twitter.png'} width="250px" height="250px" />
                  </div>
                </div>
              </div>
              <div className="relative z-0 flex w-[49%] flex-col items-center justify-center divide-x divide-gray-200 rounded-md bg-white p-2 shadow dark:divide-gray-700 dark:bg-gray-800">
                <p className="text-lg font-medium text-gray-500 dark:text-gray-500">Languages:</p>
                <div className="flex flex-row">
                  <div className="mr-1 h-6 w-6 text-sm text-gray-500 hover:cursor-pointer dark:text-gray-500">
                    {martian.Languages}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-0 mt-2 flex flex-col divide-gray-200 rounded-md bg-white p-4 p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
              <p className="text-lg font-medium text-gray-500 dark:text-gray-500">Biography:</p>
              {martian.BioGraphy}
            </div>
            <div className="relative z-0 mt-2 flex flex-col divide-gray-200 rounded-md bg-white p-6 p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
              <p className="text-lg font-medium text-gray-500 dark:text-gray-500">Activities:</p>
              {activities?.length > 0 ? (
                <div className="mb-1 w-full py-8">
                  <div className="relative  p-10 shadow-md  sm:rounded-lg">
                    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-4 py-3">
                            Date
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Activity
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Type
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Primary Contribution Area
                          </th>
                          <th scope="col" className="px-4 py-3">
                            Additional Contribution Areas
                          </th>
                          {/* <th scope="col" className="px-4 py-3">
                            Action
                          </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {activities.map((data, index) => (
                          <tr
                            key={index}
                            className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                          >
                            <th
                              scope="row"
                              className="whitespace-nowrap px-1 py-4 font-medium text-gray-900 dark:text-white"
                            >
                              {data.date}
                            </th>
                            <td className="px-4 py-4">
                              <a
                                href={data.activityLink}
                                rel="noreferrer"
                                target="_blank"
                                className=" hover:underline "
                              >
                                {data.activity}
                              </a>
                            </td>
                            <td className="px-4 py-4">{data.type}</td>
                            <td className="px-4 py-4">{data.primaryContributionArea}</td>

                            <td className="px-4 py-4">{data.additionalContributionArea}</td>

                            {/* <td className="px-4 py-4 text-right">
                              <a
                                href="#"
                                onClick={event => handleEditActivity(data, event)}
                                className="font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                              >
                                Edit
                              </a>
                              /
                              <a
                                href="#"
                                onClick={() => handleDeleteActivity(data._id)}
                                className="font-medium text-red-600 hover:underline dark:text-red-500"
                              >
                                Delete
                              </a>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
              <Pagination
                pageCount={Math.ceil(martian.ActivitiesSize / perPage)}
                pageSize={perPage}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          </div>
        </main>

        {/* <aside className="hidden max-w-sm xl:block">
          <Sidebar tweets={tweets} latestNewsletter={latestNewsletter} />
        </aside> */}
      </div>
    </Container>
  );
}
