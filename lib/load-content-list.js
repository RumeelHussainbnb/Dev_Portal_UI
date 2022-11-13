import fetch from '../utils/fetcher';

export async function loadContentList(params) {

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/lists/${params.listName}`
  );

  return data

}