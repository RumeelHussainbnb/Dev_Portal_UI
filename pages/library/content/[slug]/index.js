import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import { Container } from '../../../../components/layout';
import axios from '../../../../utils/http';

export async function getServerSideProps({ query }) {
  try {
    const content = await axios(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/byId?id=${query.slug}`
    );

    return {
      props: {
        content: content?.data?.data
      }
    };
  } catch (error) {
    return {
      props: {
        content: {
          Title: 'No Data Found!',
          Author: '',
          PublishedAt: '',
          ContentMarkdown: ''
        }
      }
    };
  }
}

export default function Content({ content }) {
  const metaTags = {
    title: content.Title,
    description: content.Description,
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/byId?id=${content._id}`,
    shouldIndex: true,
    img: content.Img
  };

  return (
    <Container metaTags={metaTags}>
      <div className="lg:mr-5">
        <div className="prose mx-auto max-w-6xl rounded-lg px-10 py-20 dark:border-none dark:prose-invert lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32">
          <div className="align-center flex flex-col content-center items-center pb-10">
            <h1 className="mb-4">{content.Title}</h1>
            <h3 className="mt-0 tracking-wide text-gray-500 dark:text-gray-400">
              <a
                className="tracking-wide text-gray-500 no-underline hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-500"
                href="https://twitter.com/Cryptar2"
                target="_blank"
                rel="noreferrer"
              >
                by {content.Author}
              </a>
              {' · '}
              <span>{moment(content.PublishedAt).format('MMMM, DD, YYYY')}</span>
            </h3>
          </div>
          <div>{ReactHtmlParser(content.ContentMarkdown)}</div>
        </div>
      </div>
    </Container>
  );
}
