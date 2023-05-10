import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container } from '../../../components/layout';
import markdownToHtml from '../../../utils/markdown';
import { loadCourseBySlug } from '../../../lib/load-course';
import { useAppState } from '../../../context/AppContext';
import { onCourseStatusCheck } from '../../../lib/load-courseProgress';
import Progress from '../../../components/course/progressBar';
import { http } from '../../../utils/http';

export async function getServerSideProps({ params }) {
  const { course, nextCourse } = await loadCourseBySlug(params.slug);
  const markdown = await markdownToHtml(course.markDownContent);

  return {
    props: {
      content: {
        markdown,
        id: params.slug,
        title: course.name,
        description: course.name,
        previousCourse: course.previousCourse,
        nextCourse: nextCourse
      }
    }
  };
}

export default function CourseContent({ content }) {
  const router = useRouter();
  const appState = useAppState();
  const [isCompleted, setIsCompleted] = useState(false);
  const [onComplete, setOnComplete] = useState(false);

  const metaTags = {
    title: `BNBChain101 - ${content.title}`,
    description: content.description,
    url: `${process.env.HOME_URL}/newsletters/${content.id}`,
    shouldIndex: true
  };

  useEffect(() => {
    if (appState?.userId) {
      onCourseStatusCheck(content.id, appState.userId).then(res => {
        setIsCompleted(res);
      });
    }
  }, [appState, content.id]);

  useEffect(() => {
    if (onComplete) {
      http
        .put('/userProgress/', {
          userId: appState.userId,
          courseId: content.id,
          complete: true
        })
        .then(res => {
          setIsCompleted(res.data.complete);
          location.reload();
        });
    }
  });

  return (
    <Container metaTags={metaTags}>
      <div className="lg:mr-5">
        <Progress setOnComplete={setOnComplete} isCompleted={isCompleted} />
        <div className="prose mx-auto max-w-6xl rounded-lg px-10 py-8 dark:prose-invert dark:border-none lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32">
          <div className="grid-cols-6 gap-4">
            <div
              onClick={() => router.back()}
              className="text-md flex cursor-pointer justify-center text-yellow-600 hover:text-yellow-700 hover:underline lg:text-lg"
            >
              Table of Content
            </div>
            {isCompleted && (
              <div
                className="mt-4 flex w-max border-spacing-x-1 justify-end rounded-md bg-green-500 p-2 text-white"
                onClick={() => {
                  console.log(onComplete);
                }}
              >
                Completed
              </div>
            )}
          </div>

          <div className="py-5">
            <span dangerouslySetInnerHTML={{ __html: content.markdown }} />
          </div>

          <div className="flex flex-row items-center justify-between">
            <button
              className="mt-4 w-auto border-spacing-x-1 rounded-md bg-gray-200 p-2 hover:bg-gray-400"
              onClick={() => {
                if (content.previousCourse !== null) {
                  router.push(`/course/${content.previousCourse}`);
                } else {
                  router.push(`/course/`);
                }
              }}
            >
              Back
            </button>
            <button
              className="mt-4 w-auto border-spacing-x-1 rounded-md bg-gray-200 p-2 hover:bg-gray-400"
              onClick={() => {
                if (content.nextCourse !== null) {
                  router.push(`/course/${content.nextCourse}`);
                } else {
                  router.push(`/course/`);
                }
              }}
            >
              Next
            </button>
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
