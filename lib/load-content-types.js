import fetch from '../utils/fetcher';

export async function loadContentTypes() {

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/types`
  );

  return data

}