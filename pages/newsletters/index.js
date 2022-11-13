import { Container } from '../../components/layout';
import fetcher from '../../utils/fetcher';
import dynamic from 'next/dynamic';
import { loadNewsletter } from "../../lib/load-newsletter";

const PublicationsComponent = dynamic(() => import('../../components/publications'));

export async function getStaticProps() {
  
  const  response = await loadNewsletter()
  
  const lastNewsletter = response.shift();

  return {
    props: { newsletters: response, lastNewsletter },
    revalidate: 60
  };
}

export default function Newsletter({ newsletters, lastNewsletter }) {
  const metaTags = {
    title: 'BNBChainDev - Newsletter',
    description: 'BNBChain community newsletter',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/bnb/newsletters`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <PublicationsComponent
        data={newsletters}
        title="Newsletters"
        contentType="newsletters"
        isLoading={false}
        lastNewsletter={lastNewsletter}
      />
    </Container>
  );
}
