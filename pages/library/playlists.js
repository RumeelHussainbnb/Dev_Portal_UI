import fetcher from '../../utils/fetcher';
import dynamic from 'next/dynamic';
import { Container } from '../../components/layout';
import { loadPlaylist } from '../../lib/load-playlist';
import { useAppState } from '../../context/AppContext';

const Playlists = dynamic(() => import('../../components/videos/playlists'));

export async function getStaticProps() {
  const playlists = await loadPlaylist();

  return {
    props: { playlists },
    revalidate: 300
  };
}

export default function Video({ playlists }) {
  const appState = useAppState();
  const metaTags = {
    title: 'Checkout Our Curated Playlists on Web3 Dev, Solidity & Blockchain - BNB Chain Dev',
    description:
      'Learn Blockchain Development through Online Blockchain Courses, Seminars, Live Streams, Video Tutorials, and Discussions where you become the master and mold your career in the best way possible.',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/library/playlists`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <main className="relative z-0 flex-1 overflow-hidden focus:outline-none">
        <div className="mb-8 flex justify-center">
          <h2 className="w-max text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
            Video Playlists
          </h2>
        </div>

        {/* Playlists */}
        <Playlists data={playlists} mode={appState} />
      </main>
    </Container>
  );
}
