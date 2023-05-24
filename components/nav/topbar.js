import Link from 'next/link';
import Image from 'next/image';
import { ethers } from 'ethers';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Menu, Popover, Transition } from '@headlessui/react';
import React, { Fragment, memo, useState, useEffect } from 'react';
import {
  CogIcon,
  ColorSwatchIcon,
  DesktopComputerIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  XIcon,
  ChartBarIcon,
  UserCircleIcon,
  ExclamationIcon
} from '@heroicons/react/outline';
import { useCourseProgress } from '../../context/CourseProgressContext';

//* Local Imports
import { http } from '../../utils/http';
import useTheme from '../../hooks/useTheme';
import { useAppDispatch, useAppState } from '../../context/AppContext';

const Search = dynamic(() => import('./search'));
const NavSidebar = dynamic(() => import('./nav-sidebar'));

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function TopBar({ childrens }) {
  const [editModeNotificationOn, setEditModeNotificationOn] = useState(false);
  const [editModeNotificationOff, setEditModeNotificationOff] = useState(false);

  let { mode, setSetting } = useTheme();
  const appDispatch = useAppDispatch();
  const appState = useAppState();
  const { setCourseProgress } = useCourseProgress();
  const router = useRouter();

  const accountChecker = async () => {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (
      accounts.length === 0 &&
      (appState.isConnectedToWallet === true || appState.isConnectedToWallet === 'true')
    ) {
      removeConnection();
    }
  };
  useEffect(() => {
    //event
    const { ethereum } = window;

    if (ethereum) {
      accountChecker();
      if (ethereum.isMetaMask) {
        window.ethereum.on('accountsChanged', function (accounts) {
          //console.log('accounts ==> ', accounts);
          //! TODO
          //if (appState.publicKey)
          removeConnection();

          // Time to reload your interface with accounts[0]!
        });
        // cleanup this component
        return () => {
          window.ethereum.removeListener('accountsChanged', function (accounts) {
            //console.log('removeListener accounts ==> ', accounts);
          });
        };
      }
    }
  }, []);

  const connectButton = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        if (ethereum.isMetaMask) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.send('eth_requestAccounts', []);
          //* Can be use if needed
          // const providerAccounts = await provider.listAccounts();
          // const signer = provider.getSigner();
          // const walletAddress = providerAccounts[0];
          // now call the api
          let payload = {
            PublicKey: accounts[0]
          };
          let userId;
          http
            .post(`/auth/register`, payload)
            .then(async res => {
              if (res?.data?.success == true) {
                let isAdmin = res?.data?.data?.Roles.includes('Admin');
                // update context
                await appDispatch({ type: 'handleWalletConnection', payload: true });
                await appDispatch({ type: 'savePublicKey', payload: accounts[0] });
                await appDispatch({
                  type: 'handleAdminMode',
                  payload: isAdmin
                });
                await appDispatch({
                  type: 'saveUserId',
                  payload: res.data?.data?._id
                });

                // update state
                localStorage.setItem('PublicKey', accounts[0]);
                localStorage.setItem('userData', JSON.stringify(res.data));
                Cookies.set('userToken', JSON.stringify(res.data));

                if (res?.data?.isNewUser) {
                  // navigate user
                  router.push('/user/edit-profile');
                }
              }
            })
            .catch(err => {
              toast.error('Failed to register user');
            });
        }
      } else {
        //if not meta mask on browser
        toast.error('Failed connecting to wallet, please install MetaMask.');
      }
    } catch (error) {
      toast.error(`Failed connecting to wallet, please install MetaMask. ${error.message}`);

      if (error.message === 'Already processing eth_requestAccounts. Please wait.') {
        toast.warn(`Please sign in to your MetaMask.`);

        window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }]
        });
      }
    }
  };

  const removeConnection = async () => {
    await appDispatch({ type: 'clearState' });

    localStorage.removeItem('handleWalletConnection');
    localStorage.removeItem('handleAdminMode');
    localStorage.removeItem('PublicKey');
    localStorage.removeItem('editMode');
    localStorage.removeItem('userData');

    router.push('/');
  };

  // Change edit mode state send notification
  const onEditMode = () => {
    appDispatch({ type: 'editMode', payload: appState.editMode == 'true' ? 'false' : 'true' });

    if (!appState.editMode) {
      setEditModeNotificationOn(true);
      setTimeout(() => {
        setEditModeNotificationOn(false);
      }, 3000);
    } else {
      setEditModeNotificationOff(true);
      setTimeout(() => {
        setEditModeNotificationOff(false);
      }, 3000);
    }
  };

  return (
    <>
      <div className="z-50 w-full">
        {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
        <Popover
          as="header"
          className={({ open }) =>
            classNames(
              open && 'fixed inset-0 z-40 overflow-y-auto',
              'bg-yellow-400 shadow-sm dark:bg-gray-800 lg:static lg:overflow-y-visible'
            )
          }
        >
          {({ open }) => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between">
                  {/* Logo */}
                  <div className="logo hidden sm:inline-flex">
                    <Link href="/" passHref>
                      <a className="flex content-center">
                        {mode === 'light' && (
                          <Image
                            src="/devlogolight.png"
                            alt="BNBChainDev Logo"
                            height="60px"
                            width="200px"
                          />
                        )}
                        {mode === 'dark' && (
                          <Image
                            src="/devlogodark.png"
                            alt="BNBChainDev Logo"
                            height="60px"
                            width="200px"
                          />
                        )}
                      </a>
                    </Link>
                  </div>

                  {/* Search Bar */}
                  {/*<Search setSearch={setSearch} />*/}

                  {/*  Mobile Menu, only visible in small screens*/}
                  <div className="menu-btn flex items-center pl-2 lg:absolute lg:inset-y-0 lg:right-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 dark:text-gray-300 dark:hover:bg-gray-600">
                      <span className="sr-only">Open menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Popover.Button>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Theme Settings*/}
                    <div className="mobile-view hidden md:flex">
                      <Menu as="div" className="relative ml-5 flex-shrink-0">
                        <div className="colorMode">
                          <Menu.Button className="flex rounded-full hover:outline-none hover:ring-2 hover:ring-gray-500 hover:ring-offset-2">
                            <span className="sr-only">Open Theme menu</span>
                            <ColorSwatchIcon className="h-7 w-7 text-gray-600 hover:opacity-80 dark:text-gray-300" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mx-auto mt-2 w-36 origin-top-right space-y-3 rounded-xl border border-gray-300 bg-white py-2 pl-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-gray-600 dark:bg-gray-800">
                            <Menu.Item onClick={() => setSetting('light')}>
                              <button className="flex gap-2 text-gray-700 hover:opacity-70 dark:text-gray-300">
                                <SunIcon className=" h-6 w-6" />
                                <span>Light</span>
                              </button>
                            </Menu.Item>
                            <Menu.Item onClick={() => setSetting('dark')}>
                              <button className="flex gap-2 text-gray-700 hover:opacity-70 dark:text-gray-300">
                                <MoonIcon className="h-6 w-6" />
                                <span className="">Dark</span>
                              </button>
                            </Menu.Item>
                            <Menu.Item onClick={() => setSetting('system')}>
                              <button className="flex gap-2 text-gray-700 hover:opacity-70 dark:text-gray-300">
                                <DesktopComputerIcon className="h-6 w-6" />
                                <span>System</span>
                              </button>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>

                    {/*  Profile Button */}

                    <div className="mobile-view hidden lg:flex">
                      {appState.isConnectedToWallet === true ||
                      appState.isConnectedToWallet === 'true' ? (
                        <Menu as="div" className="relative flex-shrink-0">
                          <div>
                            <Menu.Button className="flex rounded-full hover:outline-none hover:ring-2 hover:ring-gray-500 hover:ring-offset-2">
                              <span className="sr-only">Open user menu</span>
                              {mode === 'light' && (
                                <Image
                                  className="rounded-full"
                                  src="/avatar-light.png"
                                  height="28px"
                                  width="32px"
                                  alt="avatar"
                                />
                              )}
                              {mode === 'dark' && (
                                <Image
                                  className="rounded-full"
                                  src="/avatar-dark.png"
                                  height="28px"
                                  width="32px"
                                  alt="avatar"
                                />
                              )}
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            {/*  Desktop Profile Actions */}
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-xl border border-gray-300 bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-gray-600 dark:bg-gray-800">
                              {appState.isAdminMode && (
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() => onEditMode()}
                                      className={classNames(
                                        active && 'bg-gray-100 hover:opacity-80 dark:bg-gray-700',
                                        'text-md block flex w-full px-4 py-2 text-gray-700 dark:text-gray-300'
                                      )}
                                    >
                                      <CogIcon
                                        className="block h-7 w-7 text-gray-700 dark:text-gray-300"
                                        aria-hidden="true"
                                      />
                                      <span className="pl-2">
                                        {appState.editMode == true || appState.editMode == 'true'
                                          ? 'Disable Admin Mode'
                                          : 'Activate Admin Mode'}
                                      </span>
                                    </button>
                                  )}
                                </Menu.Item>
                              )}
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={classNames(
                                      active && 'bg-gray-100 hover:opacity-80 dark:bg-gray-700',
                                      'text-md block flex w-full px-4 py-2 text-gray-700 dark:text-gray-300'
                                    )}
                                    onClick={() => router.push('/user/dashboard')}
                                  >
                                    <ChartBarIcon
                                      className="block h-7 w-7 text-gray-700 dark:text-gray-300"
                                      aria-hidden="true"
                                    />
                                    <span className="pl-2">Dashboard</span>
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={classNames(
                                      active && 'bg-gray-100 hover:opacity-80 dark:bg-gray-700',
                                      'text-md block flex w-full px-4 py-2 text-gray-700 dark:text-gray-300'
                                    )}
                                    onClick={() => router.push(`/user/profile/${appState.userId}`)}
                                  >
                                    <UserCircleIcon
                                      className="block h-7 w-7 text-gray-700 dark:text-gray-300"
                                      aria-hidden="true"
                                    />
                                    <span className="pl-2">My Profile</span>
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    className={classNames(
                                      active && 'bg-gray-100 hover:opacity-80 dark:bg-gray-700',
                                      'text-md block flex w-full px-4 py-2 text-gray-700 dark:text-gray-300'
                                    )}
                                    onClick={removeConnection}
                                  >
                                    <ExclamationIcon
                                      className="block h-7 w-7 text-gray-700 dark:text-gray-300"
                                      aria-hidden="true"
                                    />
                                    <span className="pl-2">Disconnect Wallet</span>
                                  </button>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : (
                        <div className="items-center">
                          <button
                            className="rounded bg-gradient-to-r from-gray-800 to-gray-600 px-4 py-2 font-bold text-white hover:to-yellow-600"
                            id="connectButton"
                            onClick={connectButton}
                          >
                            Connect
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu*/}
              <Popover.Panel as="nav" className="mobile-nav lg:hidden" aria-label="Global">
                {({ close }) => (
                  <div className="mx-auto max-w-3xl space-y-1 px-2 pb-3 pt-2 sm:px-4">
                    <NavSidebar />
                  </div>
                )}
              </Popover.Panel>
            </>
          )}
        </Popover>

        <div className="martian-admin min-h-full">
          <div className="flex py-7 lg:gap-8 lg:pl-8">
            <div className="top-4 hidden min-w-[190px] content-between divide-y divide-gray-300 dark:divide-gray-500 lg:block">
              <NavSidebar />
            </div>

            <div className="min-h-screen w-full overflow-x-hidden overflow-y-visible">
              <div className="flex justify-center gap-6 divide-gray-200 rounded p-2 px-2 text-sm text-gray-500 dark:divide-gray-700 dark:text-gray-500 md:pl-0">
                {childrens}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(TopBar);
