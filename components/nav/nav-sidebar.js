import {
  BriefcaseIcon,
  ClipboardCheckIcon,
  ExternalLinkIcon,
  FolderAddIcon,
  LibraryIcon,
  PaperClipIcon,
  SparklesIcon,
  AcademicCapIcon,
  NewspaperIcon,
  UserCircleIcon
} from '@heroicons/react/outline';
import { onOnlyGetName } from '../../lib/load-course';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppState } from '../../context/AppContext';

let navigation = [
  {
    name: 'Home',
    href: '/library',
    icon: LibraryIcon,
    disabled: false
  },
  {
    name: 'Profile',
    href: '/user/profile/',
    icon: UserCircleIcon,
    disabled: false
  },
  {
    name: 'Newsletters',
    href: '/newsletters',
    icon: NewspaperIcon,
    disabled: false
  },
  {
    name: 'Bounty Board',
    href: 'https://app.dework.xyz/bnbchain',
    icon: ClipboardCheckIcon,
    disabled: false,
    rel: 'noreferrer',
    target: '_blank'
  },
  {
    name: 'Jobs',
    href: 'https://www.bnbchain.org/en/careers',
    icon: BriefcaseIcon,
    disabled: false,
    rel: 'noreferrer',
    target: '_blank'
  }
];

const special = [
  {
    name: 'BNB Chain Docs',
    href: 'https://docs.bnbchain.org/',
    disabled: false
  },
  {
    name: 'Developer Portal',
    href: 'https://www.bnbchain.org/en/developers',
    disabled: false
  },
  {
    name: 'BNB Chain Forum',
    href: 'https://forum.bnbchain.org/',
    disabled: false
  },
  {
    name: 'Explore Dapps',
    href: 'https://dappbay.bnbchain.org/',
    disabled: false
  }
];

const specialLists = [
  {
    name: 'Getting Started',
    href: 'https://docs.bnbchain.org/docs/getting-started/'
    /*'/library/list/started'*/
  },
  {
    name: 'SDKs & Frameworks',
    href: '/library/sdk',
    /*href: 'https://github.com/orgs/bnb-chain/repositories?q=sdk&type=all&language=&sort=',*/
    disabled: false
  }
];

const adminFeatures = [
  {
    name: 'Inactive Content',
    href: '/library/admin/inactive'
  },
  {
    name: 'Submitted Content',
    href: '/library/admin/submitted'
  },
  {
    name: 'Add Martian',
    href: '/martian/create'
  },
  {
    name: 'Add Playlist',
    href: '/library/admin/playlist/post'
  },
  {
    name: 'Post NewsLetter',
    href: '/library/admin/newsletter/post'
  },
  // {
  //   name: 'Post tweet',
  //   href: '/library/admin/tweet/post'
  // },
  {
    name: 'Awards & Recognition',
    href: '/library/admin/awards-recognition'
  },
  {
    name: 'Add Course',
    href: '/course/admin/'
  }
];

const categories = [
  {
    name: 'Tutorials',
    href: '/library/tutorials'
  },
  {
    name: 'Articles',
    href: '/library/articles'
  },
  {
    name: 'Podcasts',
    href: '/library/podcasts'
  },
  {
    name: 'AMAs',
    href: '/library/ama' /*'https://www.bsc.news/category/ama'*/
  },
  {
    name: 'Dapp Development',
    href: '/library/projects'
  },
  {
    name: 'Scaffolds',
    href: '/library/scaffolds'
  },
  {
    name: 'Tools',
    href: '/tools'
  },
  {
    name: 'Security',
    href: '/library/security'
  },
  {
    name: 'Video Playlists',
    href: '/library/playlists'
  }
];

const martian = [
  {
    name: 'Martian Tracker',
    href: '/martian'
  },
  {
    name: 'Add Martian Activities',
    href: '/martian/activity'
  }
];

const courses = [
  {
    name: 'BNB Chain 101',
    href: '/course'
  }
  // {
  //   name: 'Add Quiz',
  //   href: '/course/quiz'
  // }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function NavSidebar() {
  const [current, setCurrent] = useState('');
  const [isMartian, setIsMartian] = useState(false);
  const [isCourse, setIsCourse] = useState([]);
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const router = useRouter();

  const fetchData = async () => {
    let key = localStorage.getItem('PublicKey' || '');
    let userState = JSON.parse(localStorage.getItem('userData' || '{}'));
    //* Update side nav links
    if (userState) {
      navigation = navigation.map(d =>
        d.name === 'Profile' ? { ...d, href: `/user/profile/${userState.data?._id}` } : d
      );
    }
    const admin = userState?.data?.Roles.includes('Admin');

    await appDispatch({ type: 'handleAdminMode', payload: admin });
    setIsMartian(userState?.data?.Roles.includes('Martian'));
  };

  useEffect(() => {
    //* if wallet connected fetch data
    if (appState.publicKey) {
      fetchData();
    }
    //* else clear state
    else {
      setIsMartian(false);
    }

    router.pathname === '/library'
      ? setCurrent('Home')
      : setCurrent(localStorage.getItem('main-navigation' || ''));

    onOnlyGetName().then(res => {
      console.log(res.data);
      setIsCourse(res.data);
    });
  }, [appState.publicKey]);

  return (
    <nav aria-label="Sidebar" className="top-4 w-full">
      <div className="w-full">
        {navigation.map(item => {
          if (item.name === 'Profile' && !appState.publicKey) {
            return;
          }
          return (
            <Link href={item.href} passHref key={item.name} target={item.target}>
              <a target={item.target} rel={item.rel}>
                <button
                  className={classNames(
                    item.name === current
                      ? 'bg-yellow-400 text-gray-900 dark:bg-gray-800 dark:text-gray-200'
                      : 'text-gray-800 dark:text-gray-300',
                    'group flex min-w-full max-w-[190px] items-center rounded-md px-3 py-2 text-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 lg:text-base'
                  )}
                  onClick={() => {
                    setCurrent(item.name);
                    window.localStorage.setItem('main-navigation', item.name);
                  }}
                  aria-current={item.current ? 'page' : undefined}
                  disabled={item.disabled}
                >
                  <item.icon
                    className={classNames(
                      item.name === current ? 'text-gray-500' : 'text-yellow-400 ',
                      '-ml-1 mr-3 h-6 w-6 flex-shrink-0',
                      !item.disabled && 'group-hover:text-gray-500'
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate" title={item.name}>
                    {item.name}
                  </span>
                </button>
              </a>
            </Link>
          );
        })}

        <button
          onClick={() => {
            if (!appState.publicKey) {
              toast.info('Please Connect Wallet');
            } else {
              setCurrent('Submit Content');
              window.localStorage.setItem('main-navigation', 'Submit Content');
              router.push('/submit');
            }
          }}
          className={classNames(
            'Submit Content' === current
              ? 'bg-yellow-400 text-gray-900 dark:bg-gray-800 dark:text-gray-200'
              : 'text-gray-800 dark:text-gray-300',
            'group flex min-w-full max-w-[190px] items-center rounded-md px-3 py-2 text-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 lg:text-base'
          )}
        >
          <FolderAddIcon
            className={classNames(
              'Submit Content' === current ? 'text-gray-500' : 'text-yellow-400 ',
              '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
            )}
            aria-hidden="true"
          />
          <span className="truncate">Submit Content</span>
        </button>
      </div>
      {/* Add new content*/}
      <div className="space-y-4 pt-4">
        {/* Courses */}
        <div className="mt-3 w-full">
          <p
            className="text-md rounded-md bg-[#FACC15] px-3 py-2 font-semibold uppercase tracking-wider text-black lg:text-sm"
            id="communities-headline bg-yellow-400"
          >
            Courses
          </p>
          <div className="mt-2 " aria-labelledby="communities-headline">
            {isCourse.map(item => {
              return (
                // <Link href={appState.publicKey ? item.href : ''} passHref key={item.name}>
                <button
                  key={item.shortTitle}
                  onClick={() => {
                    if (!appState.publicKey) {
                      toast.info('Please Connect Wallet');
                    } else {
                      //setCurrent('Submit Content');
                      //window.localStorage.setItem('main-navigation', 'Submit Content');
                      router.push({
                        pathname: '/course',
                        query: { courseId: item._id }
                      });
                    }
                  }}
                  className={classNames(
                    'text-gray-800 dark:text-gray-300',
                    'group flex min-w-full max-w-[190px] items-center rounded-md text-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 lg:text-base'
                  )}
                >
                  <div className="group flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-base">
                    <AcademicCapIcon
                      className="h-6 w-6 text-yellow-400 dark:text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6" title={item.title}>
                      {item.shortTitle}
                    </span>
                    {item.shortTitle === '"The" Course' && (
                      <span className="ml-1 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-500 dark:text-red-50">
                        New
                      </span>
                    )}
                  </div>
                </button>
                // </Link>
              );
            })}
          </div>
        </div>

        {/* Special */}
        <div className="mt-3 w-full">
          <p
            className="text-md rounded-md bg-[#FACC15] px-3 py-2 font-semibold uppercase tracking-wider text-black lg:text-sm"
            id="communities-headline"
          >
            Reference
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {special.map(item => {
              return (
                <a href={item.href} key={item.name} target="_blank" rel="noreferrer">
                  <div className="group flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-base">
                    <ExternalLinkIcon
                      className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6" title={item.name}>
                      {item.name}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Lists */}
        <div className="mt-3 w-full">
          <p
            className="text-md rounded-md bg-[#FACC15] px-3 py-2 font-semibold uppercase tracking-wider text-black lg:text-sm"
            id="communities-headline"
          >
            Lists
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {specialLists.map(item => {
              return (
                <Link href={item.href} passHref key={item.name}>
                  <button className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-base">
                    <SparklesIcon
                      className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6" title={item.name}>
                      {item.name}
                    </span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Categories */}
        <div className="mt-3 w-full">
          <p
            className="text-md rounded-md bg-[#FACC15] px-3 py-2 font-semibold uppercase tracking-wider text-black lg:text-sm"
            id="communities-headline"
          >
            Categories
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {categories.map(item => {
              if (item.name === 'Tools') {
                return (
                  <Link href={item.href} passHref key={item.name}>
                    <a href={item.href} key={item.name} rel="noreferrer">
                      <button className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-base">
                        <PaperClipIcon
                          className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                          aria-hidden="true"
                        />
                        <span className="truncate leading-6" title={item.name}>
                          {item.name}
                        </span>
                      </button>
                    </a>
                  </Link>
                );
              }
              return (
                <Link href={item.href} passHref key={item.name}>
                  <button className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-base">
                    <PaperClipIcon
                      className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6" title={item.name}>
                      {item.name}
                    </span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-3 w-full">
          <p
            className="text-md rounded-md bg-[#FACC15] px-3 py-2 font-semibold uppercase tracking-wider text-black lg:text-sm"
            id="communities-headline"
          >
            Martians
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {martian.map(item => {
              if (item.name === 'Add Martian' && appState.editMode == 'false') {
                return;
              }
              if (item.name === 'Add Martian Activities' && !isMartian) {
                return;
              }

              return (
                <Link href={item.href} passHref key={item.name}>
                  <button className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-base">
                    <PaperClipIcon
                      className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6">{item.name}</span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Admin */}
        {appState.isAdminMode === true && (
          <div className="mt-3 w-full">
            <p
              className="text-md rounded-md bg-[#FACC15] px-3 py-2 font-semibold uppercase tracking-wider text-black lg:text-sm"
              id="admin-area"
            >
              Admin
            </p>
            <div className="mt-2 space-y-1" aria-labelledby="admin-area">
              {adminFeatures.map(item => {
                return (
                  <Link href={item.href} passHref key={item.name}>
                    <button className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-base">
                      <PaperClipIcon
                        className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                        aria-hidden="true"
                      />
                      <span className="truncate leading-6">{item.name}</span>
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default memo(NavSidebar);
