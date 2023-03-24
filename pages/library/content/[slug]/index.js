import moment from 'moment';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'react-html-parser';
import { ArrowCircleLeftIcon, EyeIcon, ThumbUpIcon } from '@heroicons/react/solid';

import { Container } from '../../../../components/layout';
import { http } from '../../../../utils/http';

export async function getServerSideProps({ query }) {
  try {
    const content = await http(
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
  console.log(content);
  const metaTags = {
    title: content.Title,
    description: content.Description,
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/byId?id=${content._id}`,
    shouldIndex: true,
    img: content.Img
  };
  const router = useRouter();

  return (
    <Container metaTags={metaTags}>
      <div className="lg:mr-5">
        <div className="prose mx-auto max-w-6xl rounded-lg px-10 py-20 dark:border-none dark:prose-invert lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32">
          <div onClick={() => router.back()}>
            <span className="text-md cursor-pointer pb-4 text-yellow-600 hover:text-yellow-700 hover:underline lg:text-lg">
              <>&larr; Back to "Clicked Category"</>
            </span>
          </div>

          <div className="align-center flex flex-col content-center items-center ">
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
            <h3 className="mt-0 tracking-wide text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-baseline">
                <span>
                  <ThumbUpIcon className="mr-2 h-5 w-5 fill-yellow-500" aria-hidden="true" />
                </span>
                {content?.LikedBy?.length}
              </span>
              {' , '}
              <span className="inline-flex items-baseline">
                <span>
                  <EyeIcon className="mr-2 h-5 w-5 fill-yellow-500" aria-hidden="true" />
                </span>
                {content?.ViewedBy?.length}
              </span>
            </h3>
          </div>
          <div>{ReactHtmlParser(content.ContentMarkdown)}</div>
        </div>
      </div>
    </Container>
  );
}
