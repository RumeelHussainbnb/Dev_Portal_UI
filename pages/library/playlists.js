import fetcher from "../../utils/fetcher";
import dynamic from "next/dynamic";
import { Container } from "../../components/layout";
import { loadPlaylist } from "../../lib/load-playlist";

const Playlists = dynamic(() => import("../../components/videos/playlists"));

export async function getStaticProps() {
  const playlists = await loadPlaylist();

  return {
    props: { playlists },
    revalidate: 300,
  };
}

export default function Video({ playlists }) {
  const metaTags = {
    title: "BNB Chain - Video Playlists",
    description:
      "Watch BNB Chain conferences, live streams and stay up to date with the latest Podcasts.",
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/library/playlists`,
    shouldIndex: true,
  };

  return (
    <Container metaTags={metaTags}>
      <main className="flex-1 relative z-0 overflow-hidden focus:outline-none">
        <div className="flex justify-center mb-8">
          <h2 className="text-2xl md:text-3xl 2xl:text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 capitalize w-max">
            Video Playlists
          </h2>
        </div>

        {/* Playlists */}
        <Playlists data={playlists} />
      </main>
    </Container>
  );
}
