import fetch from '../utils/fetcher';

export async function loadPlaylist() {

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/bnb`
  );

  return data

}