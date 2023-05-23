import { Container } from '../../../../components/layout';
import { useRouter } from 'next/router';
import AddModuleForm from '../../../../components/course/addModuleForm';

export default function CreateModule({}) {
  const router = useRouter();
  const { slug } = router.query;
  const metaTags = {
    title: 'BNB Chain - Course Admin | Create Module',
    description: 'Course Admin | Create Module',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/course/admin/${slug}/create-module`,
    shouldIndex: false
  };

  return (
    <Container metaTags={metaTags}>
      <div className=" mx-auto w-full rounded-lg px-10 py-8 dark:prose-invert dark:border-none lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32">
        <AddModuleForm />
      </div>
    </Container>
  );
}
