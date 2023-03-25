import { useState, useEffect } from 'react';
import { Container } from '../../components/layout';
import Image from 'next/image';
import { BookOpenIcon } from '@heroicons/react/solid';
import {
  EyeIcon,
  ThumbUpIcon,
  ClockIcon,
  UserCircleIcon,
  LocationMarkerIcon,
  AcademicCapIcon
} from '@heroicons/react/solid';
import 'react-circular-progressbar/dist/styles.css';

import Loader from '../../components/Loader/Loader';
import { http } from '../../utils/http';
import EndPoint from '../../constant/endPoints';
import Link from 'next/link';
import moment from 'moment';
import { useRouter } from 'next/router';

const tabs = ['Contributions', 'Most Popular', 'Most Recent'];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState({
    Username: '',
    Country: '',
    CreatedAt: '',
    Skills: [],
    Author: {
      Rank: '',
      Read: '',
      Reputation: '',
      Member: '',
      Like: '',
      Bio: '',
      RecognizationsAndAwards: [''],
      Certification: [],
      SocialLinks: []
    }
  });
  const [selectedTab, setSelectedTab] = useState('Contributions');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      let userData = JSON.parse(localStorage.getItem('userData') || '{}');
      try {
        setIsLoading(true);
        const user = await http.get(`/user/getUserProfileWithData/${userData.data?._id}`);
        setIsLoading(false);
        setData(user?.data?.data);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const metaTags = {
    title: 'BNBChainDev - Profile',
    description:
      'Stay up-to-date with the BNBChain ecosystem. BNBChain Projects and Developers in one place.',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/profile`,
    shouldIndex: true
  };
  return (
    <>
      {isLoading && <Loader />}
      <Container metaTags={metaTags}>
        <div className="profile-page flex w-full justify-center self-center overflow-hidden md:pl-0">
          <main className="profile">
            <div className="profile-wrapper px-4 sm:px-6">
              <div className="porfile-section relative z-0 flex flex-col divide-gray-200 rounded-md bg-white p-2 px-4 py-4 shadow dark:divide-gray-700 dark:bg-gray-800">
                <div className="profile-detail flex flex-row">
                  <div className="profile-img-discription">
                    <div className="profile-img m-h-[150px] flex h-fit w-[30%] max-w-[150px] items-center justify-center overflow-hidden rounded-full">
                      <Image
                        src={data?.ProfilePicture ? data?.ProfilePicture : '/profilepicture.png'}
                        width="300px"
                        height="300px"
                        className="rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="profile-discription w-[70%]">
                      {data?.Username != '' ? (
                        <p className="mb-2 text-lg font-medium uppercase">{data?.Username}</p>
                      ) : null}
                      {data?.Country != '' ? (
                        <div className="mt-1 flex flex-row">
                          <div className="h-5 w-5">
                            <LocationMarkerIcon className="fill-yellow-500" aria-hidden="true" />
                          </div>
                          <p className="ml-1 text-[12px]">{data?.Country}</p>
                        </div>
                      ) : null}
                      <div className="mt-1 flex flex-row">
                        <div className="h-5 w-5">
                          <ClockIcon className="fill-yellow-500" aria-hidden="true" />
                        </div>
                        <p className="ml-1 text-[12px]">
                          Member since {moment(data?.CreatedAt).format('YYYY-MM-DD')}
                        </p>
                      </div>
                      {data?.Skills?.length > 0 ? (
                        <div className="mt-1 flex flex-row">
                          <div className="h-5 w-5">
                            <AcademicCapIcon className="fill-yellow-500" aria-hidden="true" />
                          </div>
                          {data?.Skills?.map((item, index) => (
                            <p key={index} className="ml-1 text-[12px]">
                              {item}
                            </p>
                          ))}
                        </div>
                      ) : null}
                      <div className="mt-1 flex flex-row">
                        {/* <div className="h-4 w-4">
                        <Image src={'/time.png'} height={'100px'} width={'100px'} alt="" />
                      </div> */}
                        <div className="h-5 w-5">
                          <UserCircleIcon className="fill-yellow-500" aria-hidden="true" />
                        </div>
                        <p className="ml-1 text-[12px]"> {data?.Roles?.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    className="ml-2 mb-28 flex w-36 items-center justify-center self-end rounded bg-gradient-to-r from-gray-800 to-gray-600 py-2 px-2 font-bold text-white hover:to-yellow-600"
                    id="connectButton"
                    onClick={() => router.push('/user/edit-profile')}
                  >
                    <p>Edit Profile</p>
                  </button>
                </div>
                <div className="awards">
                  <div className="justify-evently flex h-fit w-full flex-row flex-wrap px-4">
                    {/* <div className="awards-wrap">
                    <Image src={'/rank.png'} width="100" height="100" alt="" />
                    <div className="">
                      <p className="text-base font-medium text-black">{data?.Author?.Rank}</p>
                      <p className="font-normal text-slate-400">Rank</p>
                    </div>
                  </div> */}
                    <div className="awards-wrap">
                      <div className="mr-2 w-11">
                        <BookOpenIcon className="w-full fill-blue-500" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-base font-medium text-black">{data?.TotalViews}</p>
                        <p className="font-normal text-slate-400">Read</p>
                      </div>
                    </div>
                    <div className="awards-wrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-2 h-9 w-9 fill-yellow-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743 1.346A6.707 6.707 0 019.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 00-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 00.75-.75 2.25 2.25 0 00-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 01-1.112-3.173 6.73 6.73 0 002.743-1.347 6.753 6.753 0 006.139-5.6.75.75 0 00-.585-.858 47.077 47.077 0 00-3.07-.543V2.62a.75.75 0 00-.658-.744 49.22 49.22 0 00-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 00-.657.744zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 013.16 5.337a45.6 45.6 0 012.006-.343v.256zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 01-2.863 3.207 6.72 6.72 0 00.857-3.294z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <p className="text-base font-medium text-black">{data?.Author?.Member}</p>
                        <p className="font-normal text-slate-400">Member</p>
                      </div>
                    </div>
                    <div className="awards-wrap">
                      <span className="mr-2 h-8 w-8">
                        <ThumbUpIcon className="w-full fill-blue-500" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-base font-medium text-black">{data?.TotalLikes}</p>
                        <p className="font-normal text-slate-400">Likes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="porfile-section relative z-0 mt-2 flex flex-col divide-gray-200 rounded-md bg-white p-2 px-8 py-8 shadow  dark:divide-gray-700 dark:bg-gray-800">
                <p className="text-lg font-medium uppercase">Bio </p>
                <p className="text-[12px]">{data?.Bio}</p>
              </div>
              <div className="horizontal-tabs rounded-md bg-white px-4 dark:bg-gray-800 sm:px-0">
                <nav
                  className="relative z-0 mt-2 flex divide-gray-200 rounded-lg shadow dark:divide-gray-700"
                  aria-label="Tabs"
                >
                  {tabs.map((tab, tabIdx) => (
                    <button
                      key={tabIdx}
                      onClick={() => {
                        setSelectedTab(tab);
                      }}
                      className={classNames(
                        tabIdx === 0 ? 'rounded-l-lg' : '',
                        tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                        'group relative min-w-0 flex-1 overflow-hidden bg-white py-3 px-6 text-center text-sm font-medium focus:z-10 dark:bg-gray-800  dark:text-gray-200',
                        tab !== 'Releases' && 'hover:bg-gray-50 dark:hover:bg-gray-700',
                        tab === 'Releases' && 'cursor-not-allowed opacity-40'
                      )}
                    >
                      <span
                        className={classNames(
                          tab === selectedTab ? 'text-[#FBCC14]' : 'text-slate-400'
                        )}
                      >
                        {tab}
                      </span>

                      <span
                        aria-hidden="true"
                        className={classNames(
                          tab === selectedTab ? 'bg-[#FBCC14]' : 'bg-transparent',
                          'absolute inset-x-0 bottom-0 h-0.5'
                        )}
                      />
                    </button>
                  ))}
                </nav>
                <div className="ml-5 py-5">
                  <div className="flex">
                    {selectedTab === 'Contributions' && (
                      <div className="justify-evently flex flex-wrap">
                        <ul id="ulArticles">
                          {data?.UserAllContents?.length > 0 ? (
                            data?.UserAllContents?.map((content, i) => (
                              <li key={i}>
                                <div className="image rounded-full border-2 fill-gray-700 p-2">
                                  <a title="Cloud">
                                    <BookOpenIcon
                                      className="w-10  fill-blue-500"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </div>
                                <div className="right">
                                  <h3>
                                    <Link href={`/library/content/${content._id}`}>
                                      <a target="_blank" rel="noopener noreferrer">
                                        <span>{content?.Title}</span>
                                      </a>
                                    </Link>
                                  </h3>
                                  <span className="article_date">
                                    <span>
                                      <ClockIcon
                                        className="icon fill-yellow-500"
                                        aria-hidden="true"
                                      />
                                    </span>
                                    {moment(content?.CreatedAt).format('YYYY-MM-DD')}
                                  </span>
                                  <span className="article_view">
                                    <span>
                                      <EyeIcon
                                        className="icon fill-yellow-500"
                                        aria-hidden="true"
                                      />
                                    </span>
                                    {content?.ViewedBy.length}
                                  </span>
                                  <span className="article_comment">
                                    <span>
                                      <ThumbUpIcon className="fill-yellow-500" aria-hidden="true" />
                                    </span>
                                    {content?.LikedBy.length}
                                  </span>
                                </div>
                              </li>
                            ))
                          ) : (
                            <p className="ml-6 mt-4 text-xl font-bold text-black">
                              No Record Found
                            </p>
                          )}
                        </ul>
                        {data?.UserAllContents?.length < data.TotalArticles &&
                          data?.UserAllContents?.length > 0 && (
                            <div className="link block w-full text-center">
                              <Link href={`/user/dashboard`}>
                                <a rel="noopener noreferrer">See all</a>
                              </Link>
                            </div>
                          )}
                      </div>
                    )}
                    {selectedTab === 'Most Recent' && (
                      <ul id="ulArticles">
                        {data?.MostRecentContent?.length > 0 ? (
                          data?.MostRecentContent?.map((content, i) => (
                            <li key={i}>
                              <div className="image rounded-full border-2 fill-gray-700 p-2">
                                <a title="Cloud">
                                  <BookOpenIcon className="w-10 fill-blue-500" aria-hidden="true" />
                                </a>
                              </div>
                              <div className="right">
                                <h3>
                                  <Link href={`/library/content/${content?._id}`}>
                                    <a target="_blank" rel="noopener noreferrer">
                                      <span>{content?.Title}</span>
                                    </a>
                                  </Link>
                                </h3>
                                <span className="article_date">
                                  <span>
                                    <ClockIcon
                                      className="icon fill-yellow-500"
                                      aria-hidden="true"
                                    />
                                  </span>
                                  {moment(content?.CreatedAt).format('YYYY-MM-DD')}
                                </span>
                                <span className="article_view">
                                  <span>
                                    <EyeIcon className="icon fill-yellow-500" aria-hidden="true" />
                                  </span>
                                  {content?.ViewedBy.length}
                                </span>
                                <span className="article_comment">
                                  <span>
                                    <ThumbUpIcon className="fill-yellow-500" aria-hidden="true" />
                                  </span>
                                  {content?.LikedBy.length}
                                </span>
                              </div>
                            </li>
                          ))
                        ) : (
                          <p className="ml-6 mt-4 text-xl font-bold text-black">No Record Found</p>
                        )}
                      </ul>
                    )}

                    {selectedTab === 'Most Popular' && (
                      <div className="justify-evently flex flex-wrap">
                        {data.hasOwnProperty('MostPopularContent') ? (
                          <div className="justify-evently flex flex-wrap">
                            <ul id="ulArticles">
                              <li>
                                <div className="image rounded-full border-2 fill-gray-700 p-2">
                                  <a title="Cloud">
                                    <BookOpenIcon
                                      className="w-10  fill-blue-500"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </div>
                                <div className="right">
                                  <h3>
                                    <Link
                                      href={`/library/content/${data?.MostPopularContent?._id}`}
                                    >
                                      <a target="_blank" rel="noopener noreferrer">
                                        <span>{data?.MostPopularContent?.Title}</span>
                                      </a>
                                    </Link>
                                  </h3>
                                  <span className="article_date">
                                    <span>
                                      <ClockIcon
                                        className="icon fill-yellow-500"
                                        aria-hidden="true"
                                      />
                                    </span>
                                    {moment(data?.MostPopularContent?.CreatedAt).format(
                                      'YYYY-MM-DD'
                                    )}
                                  </span>
                                  <span className="article_view">
                                    <span>
                                      <EyeIcon
                                        className="icon fill-yellow-500"
                                        aria-hidden="true"
                                      />
                                    </span>
                                    {data?.MostPopularContent?.ViewedBy.length}
                                  </span>
                                  <span className="article_comment">
                                    <span>
                                      <ThumbUpIcon className="fill-yellow-500" aria-hidden="true" />
                                    </span>
                                    {data?.MostPopularContent?.LikedBy.length}
                                  </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <p className="ml-6 mt-4 text-xl font-bold text-black">No Record Found</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
          <aside className="profile-aside w-fit">
            <div className="block w-full overflow-x-auto">
              <div className="mt-sm-2 relative z-0 flex flex-col divide-gray-200 rounded-md bg-white p-2 px-4 py-4 shadow dark:divide-gray-700 dark:bg-gray-800">
                <p className="mb-3 text-lg font-medium uppercase">Awards & Recognitions </p>
                <div className="flex flex-row items-start justify-start self-start">
                  {data?.Author?.RecognizationsAndAwards?.includes('MOM_medal') && (
                    <div className="m-h-[80px] mr-3 flex h-fit w-[30%] max-w-[80px] items-center justify-center overflow-hidden">
                      <Image
                        src={'/employee-of-the-month-selected.png'}
                        width="300px"
                        height="300px"
                        alt=""
                      />
                    </div>
                  )}
                  {data?.Author?.RecognizationsAndAwards?.includes('Martian_medal') && (
                    <div className="m-h-[80px] mr-3 flex h-fit w-[30%] max-w-[80px] items-center justify-center overflow-hidden ">
                      <Image src={'/mvp-selected.png'} width="300px" height="300px" alt="" />
                    </div>
                  )}
                  {data?.Author?.RecognizationsAndAwards?.includes('VIP_medal') && (
                    <div className="m-h-[80px] mr-3 flex h-fit w-[30%] max-w-[80px] items-center justify-center overflow-hidden">
                      <Image src={'/vip-selected.png'} width="300px" height="300px" alt="" />
                    </div>
                  )}
                  {data?.Author?.RecognizationsAndAwards?.includes('Speaker_medal') && (
                    <div className="m-h-[80px] mr-3 flex h-fit w-[30%] max-w-[80px] items-center justify-center overflow-hidden">
                      <Image src={'/speaker-selected.png'} width="300px" height="300px" alt="" />
                    </div>
                  )}
                </div>
              </div>
              <div className="relative z-0 mt-2 flex flex-col divide-gray-200 rounded-md bg-white px-4 py-4 shadow dark:divide-gray-700 dark:bg-gray-800">
                <p className="mb-1 text-lg font-medium uppercase">Certification </p>

                {/* Projects table */}
                {data?.Author?.Certification.length > 0 ? (
                  <table className="table-responsive w-full border-collapse items-center bg-transparent">
                    <thead>
                      <tr>
                        {['', 'Organization', 'Name'].map((item, index) => (
                          <th
                            key={index}
                            className={
                              'whitespace-nowrap border-solid border-slate-100 bg-[#FACC15] px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-slate-700'
                            }
                          >
                            {item}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    {data.Author.Certification.map(item => (
                      <tbody key={item._id}>
                        <tr>
                          <td className="tr-image whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs text-black">
                            <Image src={'/certificate.png'} width={'30px'} height={'30px'} alt="" />
                          </td>

                          <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs text-black">
                            {item.Organization}
                          </td>
                          <td className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 text-xs text-black">
                            {item.Name}
                          </td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                ) : (
                  <div className="flex h-full w-full items-center justify-center py-4 px-6">
                    <p className="text-sm font-bold text-black">No Record Available</p>
                  </div>
                )}
              </div>
              <div className="social-links mt-2 flex w-full flex-row justify-between">
                <div className="links relative z-0 flex w-[100%] flex-col items-center justify-center divide-x divide-gray-200 rounded-md bg-white p-2 shadow dark:divide-gray-700 dark:bg-gray-800">
                  <p className="text-lg font-medium">Social Links</p>
                  <div className="b-0 flex flex-row">
                    {data?.Author?.SocialLinks[0]?.Link != undefined && (
                      <Link
                        href={
                          data?.Author?.SocialLinks.length != 0 &&
                          data?.Author?.SocialLinks[0]?.Link != undefined
                            ? data?.Author?.SocialLinks[0]?.Link
                            : '#'
                        }
                      >
                        <a target="_blank" rel="noopener noreferrer">
                          <div className="mr-2 h-8 w-8 hover:cursor-pointer">
                            <Image src={'/facebook.png'} width="250px" height="250px" alt="" />
                          </div>
                        </a>
                      </Link>
                    )}
                    {data?.Author?.SocialLinks[1]?.Link != undefined && (
                      <Link
                        href={
                          data?.Author?.SocialLinks.length != 0 &&
                          data?.Author?.SocialLinks[1]?.Link != undefined
                            ? data?.Author?.SocialLinks[1]?.Link
                            : '#'
                        }
                      >
                        <a target="_blank" rel="noopener noreferrer">
                          <div className="mr-2 h-8 w-8 hover:cursor-pointer">
                            <Image src={'/linkedin.png'} width="250px" height="250px" alt="" />
                          </div>
                        </a>
                      </Link>
                    )}
                    {data?.Author?.SocialLinks[2]?.Link != undefined && (
                      <Link
                        href={
                          data?.Author?.SocialLinks.length != 0 &&
                          data?.Author?.SocialLinks[2]?.Link != undefined
                            ? data?.Author?.SocialLinks[2]?.Link
                            : '#'
                        }
                      >
                        <a target="_blank" rel="noopener noreferrer">
                          <div className="mr-2 h-8 w-8 hover:cursor-pointer">
                            <Image src={'/twitter.png'} width="250px" height="250px" alt="" />
                          </div>
                        </a>
                      </Link>
                    )}
                  </div>
                </div>
                {/* <div className="links relative z-0 flex w-[49%] flex-col items-center justify-center divide-x divide-gray-200 rounded-md bg-white dark:bg-gray-800 p-2 shadow  dark:divide-gray-700">
                  <p className="text-lg font-medium">Author</p>
                  <div className="b-0 flex flex-row">
                    <div className="mr-2 h-8 w-8 ">
                      <Image
                        src={'/icons8-add-friend-58.png'}
                        width="250px"
                        height="250px"
                        alt=""
                      />
                    </div>
                    <div className="mr-2 h-8 w-8 ">
                      <Image
                        src={'/icons8-certification-64.png'}
                        width="250px"
                        height="250px"
                        alt=""
                      />
                    </div>
                    <div className="mr-2 h-8 w-8 ">
                      <Image src={'/icons8-graph-64.png'} width="250px" height="250px" alt="" />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
