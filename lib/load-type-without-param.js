import fetch from '../utils/fetcher';

export async function loadTypeWithoutParam(type) {

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/bnb/${type}`
  );
      
  return data
}