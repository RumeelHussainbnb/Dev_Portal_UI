import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Container } from '../../../../components/layout';
import { loadMartians } from '../../../../lib/load-martians-list';
import {
  EyeIcon,
  ThumbUpIcon,
  ClockIcon,
  UserCircleIcon,
  LocationMarkerIcon,
  AcademicCapIcon
} from '@heroicons/react/solid';
import moment from 'moment';
import Image from 'next/image';
import fetch from '../../../../utils/fetcher';
import Pagination from '../../../../components/pagination/Pagination';
import { http } from '../../../../utils/http';
import { useRouter } from 'next/router';
import Loader from '../../../../components/Loader/Loader';

export default function Profile() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activities, setActivities] = useState([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getUserData = async () => {
    setIsLoading(true);
    const user = await http.get(`/user/getUserProfileWithData/${router.query?.id}`);
    const martianActivity = await http.get(
      `/activity/?pageNumber=1&limit=10&id=${router.query?.id}`
    );
    setIsLoading(false);
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
      <div className="flex w-full gap-6 sm:px-6">
        <main className="w-full">
          {isLoading && <Loader />}
          <div className="px-4 sm:px-6">
            <div className="relative z-0 flex flex-col divide-gray-200 rounded-md bg-white p-2 shadow dark:divide-gray-700 dark:bg-gray-800">
              {/* Profile Detail */}
              <div className="user-detail flex flex-row">
                <div className="rounded-image">
                  {user?.ProfilePicture ? (
                    <Image alt="" src={user.ProfilePicture} width={'250px'} height={'250px'} />
                  ) : (
                    <Image alt="" src={'/martianImage.png'} width={'250px'} height={'250px'} />
                  )}
                </div>
                <div className="user-discription ml-3">
                  <div className="mt-1 flex flex-row">
                    <p className="ml-2 mb-2 text-lg font-medium uppercase text-gray-500 dark:text-gray-500">
                      {user?.Username}
                    </p>
                  </div>
                  <div className="mt-1 flex flex-row">
                    <div className="h-5 w-5">
                      <LocationMarkerIcon className="fill-yellow-500" aria-hidden="true" />
                    </div>
                    <p className="ml-2 text-sm text-gray-500 dark:text-gray-500">{user?.Country}</p>
                  </div>
                  <div className="mt-1 flex flex-row">
                    <div className="h-5 w-5">
                      <ClockIcon className="fill-yellow-500" aria-hidden="true" />
                    </div>
                    <p className="ml-2 text-sm text-gray-500 dark:text-gray-500">
                      Member since: {moment(user?.CreatedAt).format('YYYY-MM-DD')}
                    </p>
                  </div>
                  {user?.Skills?.length > 0 ? (
                    <div className="mt-1 flex flex-row">
                      <div className="h-5 w-5">
                        <AcademicCapIcon className="fill-yellow-500" aria-hidden="true" />
                      </div>

                      <p className="ml-2 text-sm text-gray-500 dark:text-gray-500">
                        {user?.Skills?.join(', ')}
                      </p>
                    </div>
                  ) : null}
                  <div className="mt-1 flex flex-row">
                    <div className="h-5 w-5">
                      <UserCircleIcon className="fill-yellow-500" aria-hidden="true" />
                    </div>
                    <p className="ml-2 text-sm text-gray-500 dark:text-gray-500">
                      Roles {user?.Roles?.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-2 flex flex-row justify-between ">
              <div className="relative z-0 flex w-[49%] flex-col items-center justify-center divide-x divide-gray-200 rounded-md bg-white p-2 shadow dark:divide-gray-700 dark:bg-gray-800">
                <p className="text-lg font-medium text-gray-500 dark:text-gray-500">Social</p>
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
              <div className="relative z-0 flex w-[49%] flex-col items-center justify-center rounded-md bg-white p-2 shadow dark:divide-gray-700 dark:bg-gray-800">
                <p className="text-lg font-medium text-gray-500 dark:text-gray-500">Languages</p>
                <div className="flex flex-row">
                  <div className="mr-1 h-6 w-6 text-sm text-gray-500 hover:cursor-pointer dark:text-gray-500">
                    {user?.Languages}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative z-0 mt-2 flex flex-col divide-gray-200 rounded-md bg-white p-4 p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
              <p className="text-lg font-medium text-gray-500 dark:text-gray-500">Biography</p>
              {user?.Bio}
            </div>
            <div className="relative z-0 mt-2 flex flex-col divide-gray-200 rounded-md bg-white p-6 p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500">
              <div className="flex justify-between ">
                <p className="text-lg font-medium text-gray-500 dark:text-gray-500">Activities</p>
                <button
                  type="button"
                  onClick={() => router.push('/library/admin/martian/activity')}
                  className="inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-2 px-4 text-sm text-lg font-medium font-medium text-white text-gray-500 shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200 dark:text-gray-500"
                >
                  Add Activities
                </button>
              </div>

              {activities?.length > 0 ? (
                <div className="table-wrapper mb-1 w-full py-8">
                  <div className="relative shadow-md  sm:rounded-lg ">
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
