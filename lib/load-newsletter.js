import fetch from '../utils/fetcher';

export async function loadNewsletter() {
  const data = await fetch(
    // `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/bnb/newsletters`
    `http://localhost:3001/content/bnb/newsletters`
  );

  return data;
}
