import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpenIcon } from '@heroicons/react/solid';


const TopContents = ({ topContent }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h2 id="trending-heading" className="text-base font-bold text-gray-900 dark:text-gray-200">
          Top Contents
        </h2>
      </div>
      <hr className="mt-2" />
      <ul className="news-box">
        {topContent?.map((content, index) => {
          return (
            <li key={index} className="mt-5">
              <div className="flex flex-row">
                <div className="w-1/6">
                  <div className="overflow-hidden rounded-full">
                  <BookOpenIcon
                        className="fill-yellow-500"
                        aria-hidden="true"
                      />
                  </div>
                </div>
                <div className="items-left flex w-full flex-col px-2">
                  <Link href={`/library/content/${content._id}`}>
                    {/* <a href={content.Url} className="text-sm font-medium"> */}
                    {content.Title}
                    {/* </a> */}
                  </Link>
                  <p className="text-sm text-gray-600">Date: Jan 20, 2023</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TopContents;
