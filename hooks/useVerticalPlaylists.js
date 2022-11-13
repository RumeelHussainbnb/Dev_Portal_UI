import useSWR from "swr";
import fetcher from "../utils/fetcher";

export default function useVerticalPlaylists() {
  let { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/playlists/bnb`,
    fetcher
  );

  return {
    data,
    isLoading: !data,
  };
}
