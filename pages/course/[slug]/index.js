import fs from 'fs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import path from 'path';
import { Container } from '../../../components/layout';
import { modules } from '../../../utils/course-map';
import markdownToHtml from '../../../utils/markdown';

const list = modules.flat();

const directory = path.join(process.cwd(), 'course', 'content');
export async function getStaticPaths() {
  const fileNames = fs.readdirSync(directory);

  const paths = fileNames.map(fileName => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, '')
      }
    };
  });

  return {
    paths,
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const fullPath = path.join(directory, `${params.slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  let title = '';
  let description = '';

  for (let i = 0; i < list.length; i++) {
    const slug = list[i].link.split('/')[2];

    if (params.slug !== slug) continue;

    title = list[i].title;
    description = list[i].title;
  }

  const markdown = await markdownToHtml(fileContents);
  return {
    props: {
      content: {
        markdown,
        id: params.slug,
        title,
        description
      }
    }
  };
}

export default function CourseContent({ content }) {
  const router = useRouter();
  const metaTags = {
    title: `BNBChain101 - ${content.title}`,
    description: content.description,
    url: `${process.env.HOME_URL}/newsletters/${content.id}`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="lg:mr-5">
        <div className="prose mx-auto max-w-6xl rounded-lg px-10 py-8 dark:border-none dark:prose-invert lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32">
          <div
            onClick={() => router.back()}
            className="text-md flex cursor-pointer justify-center text-yellow-600 hover:text-yellow-700 hover:underline lg:text-lg"
          >
            Table of Content
          </div>

          <div className="py-5">
          <span dangerouslySetInnerHTML={{ __html: content.markdown }} />
          </div>

          <div
            onClick={() => router.back()}
            className="text-md flex cursor-pointer justify-center text-yellow-600 hover:text-yellow-700 hover:underline lg:text-lg"
          >
            Table of Content
          </div>
        </div>
      </div>
    </Container>
  );
}
