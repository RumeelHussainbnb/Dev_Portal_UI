import fetch from '../utils/fetcher';

export async function loadPinnedTweet() {

    const tweets = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/tweets/pinned`);

    return tweets
}