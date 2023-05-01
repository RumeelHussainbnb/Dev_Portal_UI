import { useRouter } from 'next/router';

import fetcher from '../../../utils/fetcher';
import findTags from '../../../utils/find-tags';
import defineTitle from '../../../utils/define-title';
import dynamic from 'next/dynamic';
import { Container } from '../../../components/layout';
import { loadContentTypes } from '../../../lib/load-content-types';
import { loadPlaylist } from '../../../lib/load-playlist';
import { loadContent } from '../../../lib/load-content';

const PublicationsComponent = dynamic(() => import('../../../components/publications'));

export async function getStaticPaths() {
  const contentTypes = await loadContentTypes();

  const playlists = await loadPlaylist();

  const paths = [];

  contentTypes.forEach(type => {
    paths.push({
      params: {
        type
      }
    });
  });

  playlists.forEach(playlist => {
    paths.push({
      params: {
        type: playlist._id
      }
    });
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps(context) {
  const data = await loadContent(context);
  const contentTypes = await loadContentTypes();

  let contentType = '';

  // Content Type definition
  for (let i = 0; i < contentTypes.length; i++) {
    if (contentTypes[i] === context.params.type) {
      contentType = contentTypes[i];
      break;
    }

    contentType = 'playlist';
  }

  const title = defineTitle(contentType, data);
  const tags = findTags(data);

  return {
    props: { data, title, contentType, tags },
    revalidate: 60
  };
}

export default function Publications({ data, title, contentType, tags }) {
  const router = useRouter();
  const { playlistTitle } = router.query;

  //let pageTitle = title;

  // Page description definition
  let pageDescription =
    "Learn to Develop using BNBChain. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations";
  if (contentType === 'playlist') {
    pageDescription = title;
    title = data?.length > 0 ? data[0]?.PlaylistTitle : 'No Data Available For Current Playlist';
    title = title === '' ? playlistTitle : title;
  }
  /* else if (contentType === 'tutorials') {
    pageDescription = "BNB Chain Dev platform is one of the best websites where you will get tutorials to understand Web3 Development and Smart Contract Development. Visit the website today!";
    title = "Learn Smart Contract & Dapp Development - BNB Chain Dev";
    pageTitle = "Tutorials";
  } else if (contentType === 'articles') {
    pageDescription = "Read articles on Technical Content, Learn Web3 Development only at the BNB Chain Dev platform. Web3 Development is one concept that requires knowledge.";
    title = "Learn Web3, Solidity, Dapp Development Online | Articles - BNB Chain Dev";
    pageTitle = "Articles";
  } else if(contentType==="podcasts"){
    pageDescription = "BNB chain platform also offers Podcast on various topics that include Build on BNB Chain. Learn and understand the BNB Chain and innovations in the ecosystem. Keep Listening!";
    title = "Listen to Podcasts On BNB Chain - BNB Chain Dev";
    pageTitle = "Podcasts";
  } else if(contentType==="ama"){
    pageDescription = "BNB Chain hosts regular Ask Me Anything Sessions where users can ask any question to our experts.";
    title = "Listen To Our Experts Answering All Your Questions | AMAs - BNB Chain Dev";
    pageTitle = "AMA";
  } else if(contentType==="projects"){
    pageDescription="Get to know about full stack projects on BNB Chain and learn how to conquer Web3 development with BNB Chain. Visit the BNB Chain Dev platform today!";
    title = "BNB Chain Projects | Learn To Code - BNB Chain Dev";
    pageTitle = "Dapp Development";
  } else if(contentType==="scaffolds"){
    pageDescription="Blockchain Development Scaffolds helps you in jumpstarting your coding journey on the BNB Smart Chain with the boilerplate structure like Truffle BNB Smart Chain box.";
    title = "Blockchain Development Scaffolds - BNB Chain Dev";
    pageTitle = "Scaffolds";
  } else if(contentType==="threads"){
    pageDescription="Learn Blockchain Programming, Dev courses, and other exciting technical details about the BNB Chain blockchain platform by following the latest Twitter Threads.";
    title = "BNB Chain Dev Twitter Threads - BNB Chain Dev";
    pageTitle = "Twitter Threads";
  }
*/

  const metaTags = {
    title: `BNBChainDev - ${title}`,
    description: pageDescription,
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/library/${contentType}`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <PublicationsComponent
        data={data}
        // title={pageTitle}
        title={title}
        contentType={contentType}
        isLoading={false}
        tagsList={tags}
      />
    </Container>
  );
}
