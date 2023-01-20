import { Menu, Popover, Transition } from '@headlessui/react';
import {
    CogIcon,
    ColorSwatchIcon,
    DesktopComputerIcon,
    MenuIcon,
    MoonIcon,
    SunIcon,
    XIcon
} from '@heroicons/react/outline';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React, { Fragment, memo, useState } from 'react';
import { useAppDispatch, useAppState } from '../../context/AppContext';
import useTheme from '../../hooks/useTheme';
import useUser from '../../hooks/useUser';
import { useRouter } from 'next/router';
import { ethers } from "ethers";
import axios from '../../utils/axios';
import endpoints from '../../constant/endPoints';
import Cookies from 'js-cookie';


const Search = dynamic(() => import('./search'));
const NavSidebar = dynamic(() => import('./nav-sidebar'));

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

// ETHEREUM ERROR start
const NotificationError = dynamic(() =>
    import("../notifications/error")
);
// ETHEREUM ERROR end

function TopBar({ setSearch, search, childrens }) {

    const [publicKey, setPublickey] = useState();
    //const [isAdmin, setisAdmin] = useState();
    const [connected, setConnected] = useState(false);
    const [network, setNetwork] = useState();
    const [chainId, setChainId] = useState();
    const [showButton, setShowButtons] = useState(false);
    // ETHEREUM ERROR start
    const [ethereumError, setEthereumError] = useState(false);
    // ETHEREUM ERROR end

    const { user, isAdmin = false, connected_, error } = useUser(publicKey, connected);

    const [editModeNotificationOn, setEditModeNotificationOn] = useState(false);
    const [editModeNotificationOff, setEditModeNotificationOff] = useState(false);
    let { mode, setSetting } = useTheme();
    const appDispatch = useAppDispatch();
    const appState = useAppState();
    const router = useRouter();

    const connectButton = async () => {
        const { ethereum } = window;
        if (ethereum) {
            if (ethereum.isMetaMask) {
                const provider = new ethers.providers.Web3Provider(ethereum, "any");
                const accounts = await provider.send("eth_requestAccounts", []);
                const { name, chainId } = await provider.getNetwork();
                await appDispatch({ type: 'handleWalletConnection', payload: true });
                await appDispatch({ type: 'savePublicKey', payload: accounts[0] });
                setNetwork(name);
                setChainId(chainId);
                setPublickey(accounts[0]);
                setConnected(true);
                localStorage.setItem("PublicKey", accounts[0]);
                //setisAdmin(true);
                setShowButtons(prev => prev + 1);
                if (user == undefined) {
                    let payload = {
                        PublicKey: localStorage.getItem("PublicKey")
                    }
                    axios.post(`${endpoints.BASE_URL}/auth/register`, payload)
                        .then(res => {
                            if (res?.data?.success == true) {
                                localStorage.setItem('usrData', JSON.stringify(res.data));
                                Cookies.set('userToken', JSON.stringify(res.data));
                                router.push('/user/edit-profile');
                            }
                        })
                        .catch(err => {
                            console.log('ERROR ========>', err);
                        });
                }
                else
                    Cookies.set('userToken', JSON.stringify(user));
            }
        }
        else {
            // ETHEREUM ERROR start
            setEthereumError(true);
            // ETHEREUM ERROR end
        }

    };

    // Change edit mode state send notification
    const onEditMode = () => {
        appDispatch({ type: 'editMode', payload: appState.editMode == "true" ? "false" : "true" });

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
                                    <div className="hidden sm:inline-flex">
                                        <Link href="/" passHref>
                                            <a className="flex content-center">
                                                {mode === 'light' && (
                                                    <Image src="/devlogolight.png" alt="BNBChainDev Logo" height="60px" width="200px" />
                                                )}
                                                {mode === 'dark' && (
                                                    <Image src="/devlogodark.png" alt="BNBChainDev Logo" height="60px" width="200px" />
                                                )}
                                            </a>
                                        </Link>
                                    </div>

                                    {/* Search Bar */}
                                    {/*<Search setSearch={setSearch} />*/}

                                    {/*  Mobile Menu, only visible in small screens*/}
                                    <div className="flex items-center pl-2 lg:absolute lg:inset-y-0 lg:right-0 lg:hidden">
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
                                        <div className="hidden md:flex">
                                            <Menu as="div" className="relative ml-5 flex-shrink-0">
                                                <div>
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

                                        <div className="hidden lg:flex">
                                            {(appState.isConnectedToWallet === true || appState.isConnectedToWallet === "true") ? (
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
                                                                                {(appState.editMode == true || appState.editMode == "true")
                                                                                    ? 'Disable Admin Mode'
                                                                                    : 'Activate Admin Mode'}
                                                                            </span>
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            )}
                                                            <Menu.Item>
                                                                <button className='text-md block flex w-full px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 hover:opacity-80 dark:bg-gray-700' onClick={() => router.push('/user/dashboard')}>
                                                                    <span>Dashboard</span>
                                                                </button>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                <button className='text-md block flex w-full px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 hover:opacity-80 dark:bg-gray-700' onClick={() => router.push('/user/profile')}>
                                                                    <span>My Profile</span>
                                                                </button>
                                                            </Menu.Item>
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <button className={classNames(
                                                                        active && 'bg-gray-100 hover:opacity-80 dark:bg-gray-700',
                                                                        'text-md block flex w-full px-4 py-2 text-gray-700 dark:text-gray-300'
                                                                    )} onClick={
                                                                        async () => {
                                                                            setChainId(null);
                                                                            setPublickey(null);
                                                                            setConnected(false);
                                                                            setShowButtons(false);
                                                                            await appDispatch({ type: 'handleWalletConnection', payload: false });
                                                                            await appDispatch({ type: 'savePublicKey', payload: "" });
                                                                            await appDispatch({ type: 'handleAdminMode', payload: false });
                                                                            await appDispatch({ type: 'editMode', payload: "false" });                                                                            localStorage.removeItem("handleWalletConnection")
                                     localStorage.removeItem("handleAdminMode")
                                     localStorage.removeItem("PublicKey")
                                                                            localStorage.removeItem("editMode")
                                                                            router.push('/')

                                                                        }
                                                                    }>
                                                                        <span>Disconnect Wallet</span>
                                                                    </button>
                                                                )}
                                                            </Menu.Item>
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            ) : (
                                                <div className="items-center">
                                                    <button className="bg-gradient-to-r from-gray-800 to-gray-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded" id="connectButton" onClick={
                                                        connectButton
                                                    }>Connect</button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile Menu*/}
                            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                                {({ close }) => (
                                    <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
                                        <NavSidebar showButton={showButton} publicKey={publicKey} />
                                    </div>
                                )}
                            </Popover.Panel>
                        </>
                    )}
                </Popover>


                <div className="min-h-full">
                    <div className="flex py-7 sm:pl-6 lg:gap-8 lg:pl-8">
                        <div className="hidden min-w-[190px] content-between lg:block">
                            <NavSidebar showButton={showButton} publicKey={publicKey} />
                        </div>

                        <div className="min-h-screen w-full overflow-x-hidden overflow-y-visible">
                            {!search && childrens}
                        </div>
                    </div>
                </div>
            </div>
            {/* ETHEREUM ERROR start */}
            <NotificationError
                show={ethereumError}
                setShow={setEthereumError}
                text="Please Install Metamask Extension"
            />
            {/* ETHEREUM ERROR end */}
        </>
    );
}

TopBar.propTypes = {
    setSearch: PropTypes.func.isRequired
};

export default memo(TopBar);
