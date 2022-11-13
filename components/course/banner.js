import { memo } from 'react';

function CourseBanner() {
  return (
    <div className=" mx-auto mt-10 max-w-2xl rounded-xl bg-yellow-500 dark:bg-yellow-500">
      <div className="mx-auto py-3 px-3 sm:px-5 lg:px-6">
        <div className="pr-16 sm:px-16 sm:text-center">
          <p className="prose font-medium text-red-900 dark:text-red-50">
            <span className="">
              The course is being created by
              <a
                href="https:docs.bnbchain.org"
                target="_blank"
                rel="noreferrer"
                className="font-bold no-underline hover:underline"
              >
                {' '}
                BNB Chain
              </a>{}
              . If you&apos;d like to help out, have a look how you can
            </span>
            <span className="">
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="font-bold no-underline hover:underline"
              >
                {' '}
                contribute.
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default memo(CourseBanner);
