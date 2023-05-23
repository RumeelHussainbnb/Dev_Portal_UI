import { Container } from '../../../../../components/layout';
import { useRouter } from 'next/router';
import EditLessonForm from '../../../../../components/course/editLessonForm';

export default function CreateModule({}) {
  const router = useRouter();
  const { slug } = router.query;
  const metaTags = {
    title: 'BNB Chain - Course Admin | Create Lesson',
    description: 'Course Admin | Create Lesson',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/course/admin/${slug}/create-lesson`,
    shouldIndex: false
  };

  return (
    <Container metaTags={metaTags}>
      <div className=" mx-auto w-full rounded-lg px-10 py-8 dark:prose-invert dark:border-none lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32">
        <EditLessonForm />
      </div>
    </Container>
  );
}
