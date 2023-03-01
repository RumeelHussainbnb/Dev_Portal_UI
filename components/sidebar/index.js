import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { memo, useState } from 'react';
import Hackathon from './hackathon';
import TopContents from './topContents';

const LatestNewsletter = dynamic(() => import('./latestNewsletter'));

function Sidebar({ tweets, latestNewsletter, topContent }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Top content */}
      <div className="rounded-lg bg-white shadow dark:bg-gray-800">
        <TopContents topContent={topContent} />
      </div>
      <div className="rounded-lg bg-white shadow dark:bg-gray-800">
        <Hackathon />
      </div>

      <LatestNewsletter data={latestNewsletter} />
    </div>
  );
}

Sidebar.propTypes = {
  latestNewsletter: PropTypes.object.isRequired
};

export default memo(Sidebar);
