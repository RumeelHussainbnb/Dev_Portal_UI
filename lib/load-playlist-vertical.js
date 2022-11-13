import fetch from '../utils/fetcher';

export async function loadPlaylistVertical(playlist) {

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/${playlist.Vertical}/${playlist._id}`
  );

  return data

}