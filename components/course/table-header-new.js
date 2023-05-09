import PropTypes from 'prop-types';
import { memo } from 'react';
import ProgressSVG from './progressSVG';

function TableHeader({ title, index, ready }) {
  return (
    <div>
      <div className="flex justify-between border border-gray-300 bg-gray-200 px-4 py-3 text-lg font-medium tracking-wide text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
        <span>
          Module {index + 1} - {title}
          {!ready && (
            <span className="ml-2 inline-flex items-center rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800 dark:bg-red-500 dark:text-red-50">
              Coming soon
            </span>
          )}
        </span>

        <ProgressSVG progress={1} courseTotal={2} radius={16} stroke={2} />
      </div>
    </div>
  );
}

TableHeader.propType = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  ready: PropTypes.bool
};

export default memo(TableHeader);
