import dynamic from "next/dynamic";
import useContent from "../../../hooks/useContent";
import { Container } from "../../../components/layout";

const PublicationsComponent = dynamic(() =>
  import("../../../components/publications")
);

export default function PublicationsFilter({}) {
  const {
    data = [],
    isLoading,
    tags,
    badges,
    tagsList,
    contentType,
    title,
  } = useContent();

  const metaTags = {
    title: "BNB Chain - Filter",
    description:
      "Learn to Develop using BNBChain. Tutorials, SDK's, Frameworks, Developer Tools, Security, Scaffolds, and Projects implementations",
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/library`,
    shouldIndex: false,
  };

  return (
    <Container metaTags={metaTags}>
      <PublicationsComponent
        data={data}
        title={title}
        contentType={contentType}
        isLoading={isLoading}
        badges={badges}
        tags={tags}
        tagsList={tagsList}
      />
    </Container>
  );
}
