import dynamic from "next/dynamic";
import contentLists from "../../../utils/content-lists";
import fetcher from "../../../utils/fetcher";
import defineTitle from "../../../utils/define-title";
import { Container } from "../../../components/layout";
import { loadContentList } from "../../../lib/load-content-list";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

export async function getStaticPaths() {
  const paths = contentLists.map((list) => {
    return {
      params: {
        listName: list,
      },
    };
  });

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  
  const data = await loadContentList(params);

  const title = defineTitle(params.listName);

  return {
    props: { data, title, listName: params.listName },
    revalidate: 60,
  };
}

export default function LibraryLists({ data, title, listName }) {
  const metaTags = {
    title: `BNBChain - ${title}`,
    description:
      "Learn to Develop using BNBChain. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations.",
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/library/list/${listName}`,
    shouldIndex: true,
  };

  return (
    <Container metaTags={metaTags}>
      <PublicationsComponent
        data={data}
        title={title}
        type="list"
        isLoading={false}
      />
    </Container>
  );
}
