import React from 'react';
const Loader = ({ loader }) => {
  return loader ? (
    <>
      <div
        id="loader"
        className="absolute flex h-full min-h-full w-full items-center justify-center rounded "
      >
        <div className="fixed z-50 mb-4 block">
          <LoaderIcon size={40} />
        </div>
      </div>
      {/* <div className="opacity-25 h-full w-full fixed inset-0 z-40 bg-black"></div> */}
    </>
  ) : (
    <></>
  );
};

export default Loader;

const LoaderIcon = ({ size }) => (
  <svg
    className="animate-spin"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    height={size}
    width={size}
    fill="black"
  >
    <path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z" />
  </svg>
);
