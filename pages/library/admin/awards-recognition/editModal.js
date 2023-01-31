import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import { RecognizationsAndAwards } from '../../../../constant/enums';
import axios from '../../../../utils/axios';

const NotificationSuccess = dynamic(() => import('../../../../components/notifications/success'));
const NotificationError = dynamic(() => import('../../../../components/notifications/error'));

export default function Modal({ open, setOpen, content }) {
  const [data, setData] = useState({ ...content });
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [notifyError, setNotifyError] = useState(false);

  // setData({ ...content });

  const setAwards = award => {
    let copyUserData = { ...data };
    let copyUserAwards = [...copyUserData.Author.RecognizationsAndAwards];
    //copyUserAwards.push(award);
    if (copyUserAwards.includes(award)) {
      copyUserAwards = copyUserAwards.filter(d => d !== award);
    } else {
      copyUserAwards.push(award);
    }

    copyUserData.Author.RecognizationsAndAwards = copyUserAwards;
    setData(copyUserData);
    //console.log('data ==> ', data);
  };

  const updateUserRewards = async e => {
    e.preventDefault();
    //console.log('updateUserRewards data ==> ', data);
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/updateUserProfile/${data._id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + userData?.token
        }
      }
    );
    if (response.data.success) {
      setNotifySuccess(true);
    } else {
      setNotifyError(true);
    }
    setTimeout(() => {
      setOpen(false);
    }, 2500);

    // console.log('response ==> ', response);
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setOpen(false)}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block max-w-4xl transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:p-6 sm:align-middle">
              <div className="relative h-full overflow-hidden bg-white py-16 px-4 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
                <div className=" mx-auto max-w-3xl">
                  <div className="prose prose mx-auto max-w-max text-center prose-h1:mb-2 prose-p:text-lg dark:prose-invert">
                    <h1>Awards & Recognition</h1>
                  </div>

                  <div className="mt-12">
                    <div className="flex items-center justify-center space-x-8 py-24 ">
                      {RecognizationsAndAwards.map((award, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setAwards(award);
                          }}
                          className={
                            data?.Author?.RecognizationsAndAwards?.includes(award)
                              ? 'h relative flex h-24 w-24 flex-row flex-row items-center justify-center rounded-full border-4 border-transparent border-yellow-600  p-5 text-center shadow-xl dark:bg-gray-600'
                              : 'h relative flex h-24 w-24 flex-row flex-row items-center justify-center rounded-full border-4 border-transparent p-5  text-center shadow-xl hover:border-yellow-600  dark:bg-gray-600'
                          }
                        >
                          {/* <span className="absolute left-0 top-0 text-7xl text-yellow-500">"</span> */}
                          {award.split('_')[0]}
                        </div>
                      ))}
                    </div>

                    <div className="mx-auto mt-4 flex max-w-3xl justify-center">
                      <button
                        type="submit"
                        onClick={e => {
                          updateUserRewards(e);
                        }}
                        className="mr-3 inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-3 px-6 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="rounded-md border border-gray-300 bg-white py-3 px-6 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        onClick={() => {
                          setOpen(false);
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
        <NotificationError
          show={notifyError}
          setShow={setNotifyError}
          text="Posting Failed"
          subText="Please try again"
        />

        <NotificationSuccess
          show={notifySuccess}
          setShow={setNotifySuccess}
          text="Successfully posted!"
          subText="Thank you"
        />
      </Dialog>
    </Transition.Root>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired,
  positions: PropTypes.array
};
