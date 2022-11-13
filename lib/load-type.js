import fetch from '../utils/fetcher';

export async function loadType(params) {

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/bnb/${params.type}`
  );
      
  return data
}