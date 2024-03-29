import { SpeakerphoneIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { memo } from 'react';

function Hackathon() {
  return (
    <section className="rounded-lg p-6 shadow ">
      <div className="mb-5 flex flex-1 gap-2">
        <span className="flex rounded-lg p-2 text-gray-900 dark:text-gray-200">
          <SpeakerphoneIcon className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="prose flex flex-col font-medium text-gray-900 dark:text-gray-200">
          <span className="text-xl">Check out the new BNBChain Development Course</span>
        </p>
      </div>
      <Link href="/course">
        <a className="text-lg font-bold flex items-center justify-center rounded-md border border-none bg-gradient-to-r from-yellow-500 to-gray-200 px-4 py-2 font-medium shadow-sm text-gray-800 hover:from-gray-400">
          Learn more
        </a>
      </Link>
    </section>
  );
}

export default memo(Hackathon);
