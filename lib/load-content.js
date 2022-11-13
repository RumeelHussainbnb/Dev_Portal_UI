import fetch from '../utils/fetcher';

export async function loadContent(context) {

    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/bnb/${context.params.type}`
    );

    return data
}