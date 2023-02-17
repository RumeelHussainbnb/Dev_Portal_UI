import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Player({ content }) {
  //Go Back Url
  const router = useRouter();

  return (
    <div className="xs:text-xs mx-auto flex max-w-screen-3xl flex-col px-5 text-base w-full">
      <div className="flex justify-between">
        {/* <Link href={`/library/${content?.PlaylistID}`} passHref> */}
        <div onClick={() => router.back()}>
          <p className="text-md cursor-pointer pb-4 text-yellow-600 hover:text-yellow-700 hover:underline lg:text-lg">
            {content?.PlaylistID && <>&larr; Back to Playlist</>}
          </p>
        </div>
        {/* </Link> */}

        <a href={content?.Url} target="_blank" rel="noreferrer">
          <p className="text-md pb-4 text-yellow-600 hover:text-yellow-700 hover:underline lg:text-lg">
            Watch in Youtube &rarr;{' '}
          </p>
        </a>
      </div>

      <div className="w-full shadow-lg videoplayer-wrapper">
        <ReactPlayer
          height="100%"
          width="100%"
          style={{ aspectRatio: '20/10' }}
          url={content.Url}
          controls
          pip
          stopOnUnmount={false}
        />
      </div>

      <div className="self-start">
        <h2 className="font-medium text-gray-800 dark:text-gray-200 sm:mt-4 text-lg-4xl">
          {content?.Title}
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300 sm:mt-4">{content?.Description}</p>
      </div>
    </div>
  );
}

Player.propTypes = {
  content: PropTypes.object.isRequired
};
