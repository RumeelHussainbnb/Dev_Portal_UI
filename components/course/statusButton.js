function StatusButton({ item, sectionCourse }) {
  //   const previousCourse = sectionCourse.filter(course => course.id === item.previousCourse) || null;
  const previousCourse = undefined;
  if (previousCourse === undefined) {
    // Always show the first item as complete
    return item.completed ? (
      <button className="mx-2 my-auto h-[32px] w-[100px] rounded-md bg-green-500 px-2 text-white">
        Complete
      </button>
    ) : (
      <button className="mx-2 my-auto h-[32px] w-[100px] rounded-md bg-gray-500 px-2 text-white">
        Not Read
      </button>
    );
  } else {
    return item.completed ? (
      <button className="mx-2 my-auto h-[32px] w-[100px] rounded-md bg-green-500 px-2 text-white">
        Complete
      </button>
    ) : previousCourse.completed ? (
      <button className="mx-2 my-auto h-[32px] w-[100px] rounded-md bg-gray-500 px-2 text-white">
        Not Read
      </button>
    ) : (
      <button className="mx-2 my-auto h-[32px] w-[100px] rounded-md bg-red-500 px-2 text-white">
        Locked
      </button>
    );
  }
}

export default StatusButton;
