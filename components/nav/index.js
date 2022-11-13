import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
import TopBar from './topbar';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Nav({ children }) {
  const [search, setSearch] = useState(false);

  return (
    <div className={classNames(search && 'min-h-[5050px] xl:min-h-[3500px]', 'min-h-screen')}>
      <TopBar setSearch={setSearch} search={search} childrens={children} />
    </div>
  );
}

export default memo(Nav);
