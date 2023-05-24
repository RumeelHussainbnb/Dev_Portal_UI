function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const StatusButton = ({ item }) => {
  return item?.completed ? (
    <div className="mx-2 my-auto flex h-[32px] w-[100px] items-center justify-center rounded-md bg-green-500 px-2 align-middle text-white">
      Complete
    </div>
  ) : (
    <div
      className={classNames(
        'mx-2 my-auto flex h-[32px] w-[100px] items-center justify-center rounded-md',
        item.isLocked ? 'bg-red-500' : 'bg-gray-500',
        'px-2 align-middle text-white'
      )}
    >
      {item.isLocked ? 'Locked' : 'Not Read'}
    </div>
  );
};

export default StatusButton;
