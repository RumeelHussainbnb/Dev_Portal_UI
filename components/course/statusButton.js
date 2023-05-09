function StatusButton({ item, courseProgress, setLock }) {
  const currentCourse = courseProgress.find(course => {
    return course.CourseId === item._id;
  });
  const previousCourse = courseProgress.find(course => {
    return course.CourseId === item.previousCourse;
  });

  if (previousCourse === undefined) {
    // Always show the first item as complete
    return currentCourse.completed ? (
      <div className="mx-2 my-auto flex h-[32px] w-[100px] items-center justify-center rounded-md bg-green-500 px-2 align-middle text-white">
        Complete
      </div>
    ) : (
      <div className="mx-2 my-auto flex h-[32px] w-[100px] items-center justify-center rounded-md bg-gray-500 px-2 align-middle text-white">
        Not Read
      </div>
    );
  } else {
    return currentCourse.completed ? (
      <div className="mx-2 my-auto flex h-[32px] w-[100px] items-center justify-center rounded-md bg-green-500 px-2 align-middle text-white">
        Complete
      </div>
    ) : previousCourse.completed ? (
      <div className="mx-2 my-auto flex h-[32px] w-[100px] items-center justify-center rounded-md bg-gray-500 px-2 align-middle text-white">
        Not Read
      </div>
    ) : (
      (setLock(true),
      (
        <div className="mx-2 my-auto flex h-[32px] w-[100px] items-center justify-center rounded-md bg-red-500 px-2 align-middle text-white">
          Locked
        </div>
      ))
    );
  }
}

export default StatusButton;
