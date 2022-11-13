import fetch from '../utils/fetcher';

export async function loadVideo(params) {
    const data = await fetch(
        // `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/bnb/${params.type}/${params.videoID}`
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/bnb/playlist/${params.videoID}`
      );

    return data
}