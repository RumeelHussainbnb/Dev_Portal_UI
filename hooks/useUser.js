import useSWR from "swr";
import fetcher from "../utils/fetcher";


export default function useUser(publicKey, connected) {

  const publicKey_ = publicKey?.toLowerCase();
  let { data, error } = useSWR(
    connected && `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${publicKey_}`,
    fetcher
  );

  return {
    user: data,
    isAdmin: data && data.Role === "admin",
    connected,
    error,
  };
}

