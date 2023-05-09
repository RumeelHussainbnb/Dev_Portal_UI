import { useRouter } from 'next/router';
import { Container } from '../../../components/layout';
import markdownToHtml from '../../../utils/markdown';

export default function CourseContent({ content }) {
  const router = useRouter();
  console.log(content);
  const metaTags = {
    title: `BNBChain101 - ${content.title}`,
    description: content.description,
    url: `${process.env.HOME_URL}/newsletters/${content.id}`,
    shouldIndex: true
  };

  const getCourse = async () => {
    const courseId = router.query.id;
    console.log(courseId);
  };

  useEffect(() => {
    getCourse();
  }, [router.query.id]);

  return (
    <Container metaTags={metaTags}>
      <div className="lg:mr-5">
        <div className="prose mx-auto max-w-6xl rounded-lg px-10 py-8 dark:prose-invert dark:border-none lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32">
          <div
            onClick={() => router.back()}
            className="text-md flex cursor-pointer justify-center text-yellow-600 hover:text-yellow-700 hover:underline lg:text-lg"
          >
            Table of Content
          </div>

          <div className="py-5">
            {/* <span dangerouslySetInnerHTML={{ __html: content.markdown }} /> */}
            <div>
              Hi
            </div>
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
