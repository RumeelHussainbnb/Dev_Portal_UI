import {
  BriefcaseIcon,
  ChatAlt2Icon,
  ClipboardCheckIcon,
  ExternalLinkIcon,
  FolderAddIcon,
  LibraryIcon,
  PaperClipIcon,
  SparklesIcon,
  AcademicCapIcon,
  NewspaperIcon
} from '@heroicons/react/outline';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo, useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import axios from '../../utils/http';
import { useAppDispatch, useAppState } from '../../context/AppContext';

const navigation = [
  {
    name: 'Home',
    href: '/library',
    icon: LibraryIcon,
    disabled: false
  },
  {
    name: 'Profile',
    href: '/user/profile',
    icon: LibraryIcon,
    disabled: false
  },
  {
    name: 'Community',
    href: '/community',
    icon: ChatAlt2Icon,
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
    href: 'https://bugcrowd.com/binance',
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
  /*{
        name: 'BNB Chain Cookbook',
        href: 'https://docs.bnbchain.org',
        disabled: false
      },*/
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
  /*{
        name: 'SDKs & Frameworks',
        href: '/library/sdk'
      },*/
  {
    name: 'Scaffolds',
    href: '/library/scaffolds'
  },
  {
    name: 'Tools',
    href: '/tools' /*'https://nodereal.io/bnb-dev-tools' */,
    rel: 'noreferrer',
    target: '_blank'
  },
  // {
  //   name: 'Implementations',
  //   href: '/library/implementations'
  // },
  {
    name: 'Security',
    href: '/library/security'
  },
  /*{
        name: 'Program Library',
        href: '/library/spl'
      },*/
  {
    name: 'Twitter Threads',
    href: '/library/threads'
  },
  {
    name: 'Video Playlists',
    href: '/library/playlists'
  },
  {
    name: 'Submitted',
    href: '/library/admin/submitted'
  },
  {
    name: 'Inactive',
    href: '/library/admin/inactive'
  },
  {
    name: 'Post NewsLetter',
    href: '/library/admin/newsletter/post'
  },
  {
    name: 'Post tweet',
    href: '/library/admin/tweet/post'
  },
  {
    name: 'Add Playlist',
    href: '/library/admin/playlist/post'
  },
  {
    name: 'Awards & Recognition',
    href: '/library/admin/awards-recognition'
  }
];

const martian = [
  {
    name: 'Martian Tracker',
    href: '/library/admin/mvp'
  },
  {
    name: 'Add Martian',
    href: '/library/admin/mvp/create'
  },
  {
    name: 'Add Martian Activities',
    href: '/library/admin/mvp/activity'
  }
];

const courses = [
  /* {
        name: 'Intro to BNBChain',
        href: '/course'
      },*/
  {
    name: 'BNBChain 101',
    href: '/course'
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function NavSidebar({ closeMobileMenu, showButton = 0, publicKey }) {
  const [current, setCurrent] = useState('');
  const [isMartian, setIsMartian] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(showButton);
  const { user, isAdmin_ = true, connected, error } = useUser();
  const appState = useAppState();
  const appDispatch = useAppDispatch();
  const [isConnected, setPublicKey] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      // const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${window.sessionStorage.getItem('PublicKey')}`);
      let key = localStorage.getItem('PublicKey');

      setPublicKey(key);
      const response = await axios(`/user/${appState.publicKey ? appState.publicKey : key}`);
      const admin = response?.data?.Role === 'admin' ? true : false;
      await appDispatch({ type: 'handleAdminMode', payload: admin });
      localStorage.setItem('handleAdminMode', admin);
      let userState = JSON.parse(localStorage.getItem('userData') || '{}');

      localStorage.setItem('userData', JSON.stringify({ ...userState, data: response?.data }));

      setisAdmin(admin);
      setIsMartian(response?.data?.MartianId ? true : false);
    };

    fetchData().catch('Catch error ', console.error);
    if (window && window.sessionStorage.getItem('main-navigation')) {
      setCurrent(window.sessionStorage.getItem('main-navigation'));
    } else {
      setCurrent('Library');
    }
    setButtonsVisible(showButton);
  }, [showButton]);

  return (
    <nav aria-label="Sidebar" className="top-4 w-full">
      <div className="w-[270px]">
        {navigation.map(item => {
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
                    window.sessionStorage.setItem('main-navigation', item.name);
                    closeMobileMenu();
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
                  <span className="truncate">{item.name}</span>
                </button>
              </a>
            </Link>
          );
        })}
        {isConnected ? (
          <Link href="/submit" passHref>
            {/* <a href="/submit" rel="submit"> */}
            <button
              onClick={() => {
                setCurrent('Submit Content');
                window.sessionStorage.setItem('main-navigation', 'Submit Content');
                closeMobileMenu();
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
            {/* </a> */}
          </Link>
        ) : null}
      </div>
      {/* Add new content*/}
      <div className="space-y-4 pt-4">
        {/* Courses */}
        <div className="mt-3 w-[270px]">
          <p
            className="text-md rounded-md bg-[#FACC15] px-3 py-2 font-semibold uppercase tracking-wider text-black lg:text-sm"
            id="communities-headline bg-yellow-400"
          >
            Courses
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {courses.map(item => {
              return (
                <Link href={item.href} passHref key={item.name}>
                  <div
                    onClick={() => closeMobileMenu()}
                    className="group flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-base"
                  >
                    <AcademicCapIcon
                      className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6">{item.name}</span>
                    {item.name === '"The" Course' && (
                      <span className="ml-1 inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-500 dark:text-red-50">
                        New
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Special */}
        <div className="mt-3 w-[270px]">
          <p
            className="text-md rounded-md bg-[#FACC15] px-3 py-2 font-semibold uppercase tracking-wider text-black lg:text-sm"
            id="communities-headline"
          >
            Reference
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {special.map(item => {
              return (
                <a
                  href={item.href}
                  key={item.name}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => closeMobileMenu()}
                >
                  <div className="group flex cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-base">
                    <ExternalLinkIcon
                      className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                      aria-hidden="true"
                    />
                    <span className="truncate leading-6">{item.name}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Lists */}
        <div className="mt-3 w-[270px]">
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
                  <button
                    onClick={() => closeMobileMenu()}
                    className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-base"
                  >
                    <SparklesIcon
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

        {/* Categories */}
        <div className="mt-3 w-[270px]">
          <p
            className="text-md rounded-md bg-[#FACC15] px-3 py-2 font-semibold uppercase tracking-wider text-black lg:text-sm"
            id="communities-headline"
          >
            Categories
          </p>
          <div className="mt-2 space-y-1" aria-labelledby="communities-headline">
            {categories.map(item => {
              if (
                (item.name === 'Submitted' ||
                  item.name === 'Inactive' ||
                  item.name === 'Post NewsLetter' ||
                  item.name === 'Post tweet' ||
                  item.name === 'Add Playlist' ||
                  item.name === 'Awards & Recognition' ||
                  item.name === 'Add mvp') &&
                appState.isAdminMode == false
              ) {
                return;
              }

              if (item.name === 'Tools') {
                return (
                  <Link href={item.href} passHref key={item.name}>
                    <a
                      href={item.href}
                      key={item.name}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => closeMobileMenu()}
                    >
                      <button
                        onClick={() => closeMobileMenu()}
                        className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-base"
                      >
                        <PaperClipIcon
                          className="h-4 w-4 text-yellow-400 dark:text-yellow-500"
                          aria-hidden="true"
                        />
                        <span className="truncate leading-6">{item.name}</span>
                      </button>
                    </a>
                  </Link>
                );
              }
              return (
                <Link href={item.href} passHref key={item.name}>
                  <button
                    onClick={() => closeMobileMenu()}
                    className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-base"
                  >
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

        <div className="mt-3 w-[270px]">
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
                  <button
                    onClick={() => closeMobileMenu()}
                    className="group flex min-w-full cursor-pointer items-center gap-1 rounded-md px-3 py-2 text-lg font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-300 lg:text-base"
                  >
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
      </div>
    </nav>
  );
}

NavSidebar.defaultProps = {
  closeMobileMenu: () => {}
};

NavSidebar.prototype = {
  closeMobileMenu: PropTypes.func
};

export default memo(NavSidebar);
