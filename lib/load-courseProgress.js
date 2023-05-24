import fetch from '../utils/fetcher';

export async function loadCourseProgress(params) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/userProgress/all-progres?userId=${params.userId}&courseId=${params.courseId}`
  );

  return data.data;
}
