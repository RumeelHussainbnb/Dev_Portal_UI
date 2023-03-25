import fetch from '../utils/fetcher';

export async function loadMartians() {
  const data = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_ENDPOINT
    }/martian?pageNumber=${1}&limit=${10}&keyword=''&country=''&martian=''`
  );

  return data;
}
