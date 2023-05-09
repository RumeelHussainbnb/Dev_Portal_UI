import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container } from '../../../components/layout';
import markdownToHtml from '../../../utils/markdown';
import { loadCourseBySlug } from '../../../lib/load-course';
import { useAppState } from '../../../context/AppContext';
import { onCourseStatusCheck } from '../../../lib/load-courseProgress';

export async function getServerSideProps({ params }) {
  const course = await loadCourseBySlug(params.slug);
  const markdown = await markdownToHtml(course.markDownContent);
  return {
    props: {
      content: {
        markdown,
        id: params.slug,
        title: course.name,
        description: course.name
      }
    }
  };
}

export default function CourseContent({ content }) {
  const router = useRouter();
  const appState = useAppState();
  const [isCompleted, setIsCompleted] = useState(false);

  const metaTags = {
    title: `BNBChain101 - ${content.title}`,
    description: content.description,
    url: `${process.env.HOME_URL}/newsletters/${content.id}`,
    shouldIndex: true
  };

  useEffect(() => {
    console.log(appState?.userId);
    if (appState?.userId) {
      onCourseStatusCheck(appState.userId, content.id).then(res => {
        console.log(res);
        setIsCompleted(res);
      });
    }
  }, [appState, content.id]);

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
