import fetcher from "../../../utils/fetcher";
import findTags from "../../../utils/find-tags";
import defineTitle from "../../../utils/define-title";
import dynamic from "next/dynamic";
import { Container } from "../../../components/layout";
import { loadContentTypes } from "../../../lib/load-content-types";
import { loadPlaylist } from "../../../lib/load-playlist";
import { loadContent } from "../../../lib/load-content";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

export async function getStaticPaths() {

  const contentTypes = await loadContentTypes();

  const playlists = await loadPlaylist();

  const paths = [];

  contentTypes.forEach((type) => {
    paths.push({
      params: {
        type,
      },
    });
  });


  playlists.forEach((playlist) => {
    paths.push({
      params: {
        type: playlist._id,
      },
    });
  });

  // All missing paths are going to be server-side rendered and cached
  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {

  const data = await loadContent(context);
  const contentTypes = await loadContentTypes();

  let contentType = "";

  // Content Type definition
  for (let i = 0; i < contentTypes.length; i++) {
    if (contentTypes[i] === context.params.type) {
      contentType = contentTypes[i];
      break;
    }

    contentType = "playlist";
  }

  const title = defineTitle(contentType, data);
  const tags = findTags(data);

  return {
    props: { data, title, contentType, tags },
    revalidate: 60,
  };
}

export default function Publications({ data, title, contentType, tags }) {
  // Page description definition
  let pageDescription =
    "Learn to Develop using BNBChain. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations";
  if (contentType === "playlist") pageDescription = title;

  const metaTags = {
    title: `BNBChainDev - ${title}`,
    description: pageDescription,
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/library/${contentType}`,
    shouldIndex: true,
  };

  return (
    <Container metaTags={metaTags}>
      <PublicationsComponent
        data={data}
        title={title}
        contentType={contentType}
        isLoading={false}
        tagsList={tags}
      />
    </Container>
  );
}
