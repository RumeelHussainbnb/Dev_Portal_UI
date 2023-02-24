import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Container } from '../../../../components/layout';
import { loadMartians } from '../../../../lib/load-martians-list';
import { TagIcon, TrendingUpIcon } from '@heroicons/react/solid';
import moment from 'moment';
import Image from 'next/image';
import fetch from '../../../../utils/fetcher';
import Pagination from '../../../../components/pagination/Pagination';
import { http } from '../../../../utils/http';
import { useRouter } from 'next/router';

export default function Profile() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activities, setActivities] = useState([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [user, setUser] = useState();
  const router = useRouter();

  const getUserData = async () => {
    const user = await http.get(`/user/onGetUserProfileWithData/${router.query?.id}`);
    const martianActivity = await http.get(
      `/activity/?pageNumber=1&limit=10&id=${router.query?.id}`
    );
    setUser(user.data?.data);
    setActivities(martianActivity?.data?.data?.totalActivity);
    setTotalActivities(martianActivity?.data?.data?.totalActivityCount);
  };
  useEffect(() => {
    if (router.isReady) {
      getUserData();
    }
  }, [router.isReady]);

  const handlePageChange = async newPage => {
    setPage(newPage.selected + 1);
    try {
      const martianActivity = await http.get(
        `/activity/?pageNumber=${newPage.selected + 1}&limit=${perPage}&id=${router.query?.id}`
      );

      if (martianActivity?.data?.success === true) {
        setActivities(martianActivity?.data?.data?.totalActivity);
      }
    } catch (error) {}
  };

  const handlePageSizeChange = async newSize => {
    setPerPage(newSize);
    try {
      const martianActivity = await http.get(
        `/activity/?pageNumber=${page}&limit=${newSize}&id=${router.query?.id}`
      );
      if (martianActivity?.data?.success === true) {
        setActivities(martianActivity?.data?.data?.totalActivity);
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
              <div className="flex flex-row">
                <div className="h-44 w-44 overflow-hidden rounded-full">
                  {user?.ProfilePicture ? (
                    <Image alt="" src={user.ProfilePicture} width={'250px'} height={'250px'} />
                  ) : (
                    <Image alt="" src={'/martianImage.png'} width={'250px'} height={'250px'} />
                  )}
                </div>
                <div className="ml-3 mt-6 w-[70%]">
                  <p className="mb-2 text-lg font-medium uppercase text-gray-500 dark:text-gray-500">
                    {user?.Username}
                  </p>
                  <div className="flex flex-row">
                    <p className="text-sm text-gray-500 dark:text-gray-500">{user?.Country}</p>
                  </div>
                  <div className="flex flex-row">
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Members since ,{moment(user?.CreatedAt).format('MMMM,YYYY')}
                    </p>
                  </div>

                  <div className="flex flex-row">
                    <p className="text-sm text-gray-500 dark:text-gray-500">{user?.MartianType}</p>
                  </div>
                  <p className="mt-2 mb-2 text-xs text-gray-500 dark:text-gray-500">
                    {user?.Skills}
                  </p>
                </div>
              </div>
            </div>

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
                    {user?.Languages}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-0 mt-2 flex flex-col divide-gray-200 rounded-md bg-white p-4 p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
              <p className="text-lg font-medium text-gray-500 dark:text-gray-500">Biography:</p>
              {user?.Bio}
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
              <Pagination
                pageCount={Math.ceil(totalActivities / perPage)}
                pageSize={perPage}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </div>
          </div>
        </main>
      </div>
    </Container>
  );
}
