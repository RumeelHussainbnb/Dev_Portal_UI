import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";

export default function Error({ show, setShow, text }) {
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="notify-popup p-4 flex w-full">
                {/* <div className="flex items-center w-full"> */}
                  <div className="left">
                    <ExternalLinkIcon
                      className="h-6 w-6 text-red-400"
                      aria-hidden="true"
                    />
                    <p className="text-sm font-medium text-gray-900">{text}</p>
                  </div>
                  <div className="right">
                  <button
                      className="bg-white w-5"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className="inline-block">
                      <XIcon className="w-5" aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                  {/* <div className="ml-3 w-0 flex-1 pt-0.5">
                  </div> */}
                  {/* <div className="ml-4 flex-shrink-0 flex">
                  </div> */}
                {/* </div> */}
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}

Error.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
