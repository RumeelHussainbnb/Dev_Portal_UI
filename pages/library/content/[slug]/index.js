import moment from 'moment';
import { useRouter } from 'next/router';
import ReactHtmlParser from 'react-html-parser';
import { ArrowCircleLeftIcon } from '@heroicons/react/solid';
import { EyeIcon, ThumbUpIcon } from '@heroicons/react/solid';

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
        <div className="prose mx-auto max-w-6xl rounded-lg py-8 px-10 dark:prose-invert dark:border-none lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32">
          <div onClick={() => router.back()}>
            <ArrowCircleLeftIcon
              className="mb-4 h-8 w-8 cursor-pointer fill-gray-500"
              aria-hidden="true"
            />
          </div>

          <div className="align-center flex flex-col content-center items-center">
            <h1 className="mb-4">{content.Title}</h1>
            <h3 className="mt-0 tracking-wide text-gray-500 dark:text-gray-400">
              by {content.Author}
              {' · '}
              <span>{moment(content.PublishedAt).format('YYYY-MM-DD')}</span>
            </h3>
          </div>
          <div className="align-center flex flex-col content-center items-center">
            <h5 className="mt-0 text-gray-500 dark:text-gray-400">
              <ThumbUpIcon className="h-7 w-7 fill-yellow-500" aria-hidden="true" />
              {content?.LikedBy?.length}
              <EyeIcon className="h-7 w-7 fill-yellow-500" aria-hidden="true" />
              {content?.ViewedBy?.length}
            </h5>
          </div>
          <div>{ReactHtmlParser(content.ContentMarkdown)}</div>
        </div>
      </div>
    </Container>
  );
}
