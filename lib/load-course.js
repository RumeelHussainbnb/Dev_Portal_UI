import fetch from '../utils/fetcher';

export async function loadCourse() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/course`);

  return data.data;
}
