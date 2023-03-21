import React from 'react';
import styles from './DeleteModal.module.css';

const DeleteModal = ({ setShowModal, showModel, handleConfirmation, nameOfTheDeleted }) => {
  return (
    <div className={styles.wrapper} onClick={() => setShowModal(false)}>
      <div class="relative h-full w-full max-w-md md:h-auto">
        <div class="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <button
            type="button"
            class="absolute top-3 right-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="popup-modal"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only" onClick={() => setShowModal(false)}>
              Close modal
            </span>
          </button>
          <div class="p-6 text-center">
            <svg
              aria-hidden="true"
              class="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {'Are you sure you want to delete this ' + nameOfTheDeleted + ' ?'}
            </h3>
            <button
              onClick={() => handleConfirmation()}
              data-modal-hide="popup-modal"
              type="button"
              class="mr-2 inline-flex items-center rounded-lg bg-red-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={() => setShowModal(false)}
              data-modal-hide="popup-modal"
              type="button"
              class="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
