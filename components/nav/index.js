import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
import TopBar from './topbar';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Nav({ children }) {
  return (
    <div className={classNames('min-h-screen')}>
      <TopBar childrens={children} />
    </div>
  );
}

export default memo(Nav);
