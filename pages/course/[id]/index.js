import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container } from '../../../components/layout';
import { useAppState } from '../../../context/AppContext';
import Progress from '../../../components/course/progressBar';
import { http } from '../../../utils/http';
import ReactHtmlParser from 'react-html-parser';

export default function CreateModule({}) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [onComplete, setOnComplete] = useState(false);
  const [courseContent, setCourseContent] = useState({});
  const [courseId, setCourseId] = useState('');
  const router = useRouter();
  const appState = useAppState();
  const { id } = router.query;

  const metaTags = {
    title: 'BNB Chain - Course',
    description: 'Course Content',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/course/${id}`,
    shouldIndex: false
  };

  useEffect(() => {
    const getFullLesson = async () => {
      try {
        const id = router.query.id;
        const res = await http.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/lesson/${id}`);

        const courseProgress = await http.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/userProgress/${appState.userId}/${id}`
        );
        setCourseId(courseProgress.data.data.CourseId);
        setIsCompleted(courseProgress.data.data.completed);
        setCourseContent(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFullLesson();
  }, [appState.userId, router.query]);

  useEffect(() => {
    if (onComplete) {
      http
        .put('/userProgress/', {
          userId: appState.userId,
          lessonId: courseContent.lesson._id,
          completed: true
        })
        .then(res => {
          setIsCompleted(res.data.complete);
          location.reload();
        });
    }
  }, [appState.userId, onComplete]);

  return (
    <Container metaTags={metaTags}>
      <div className="lg:mr-5">
        <Progress setOnComplete={setOnComplete} isCompleted={isCompleted} />
        <div className="prose mx-auto max-w-6xl rounded-lg px-10 py-8 dark:prose-invert dark:border-none lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32">
          <div className="grid-cols-6 gap-4">
            <div
              onClick={() =>
                router.push({
                  pathname: '/course',
                  query: { id: courseId }
                })
              }
              className="text-md flex cursor-pointer justify-center text-yellow-600 hover:text-yellow-700 hover:underline lg:text-lg"
            >
              Table of Content
            </div>
            {isCompleted && (
              <div className="mt-4 flex w-max border-spacing-x-1 justify-end rounded-md bg-green-500 p-2 text-white">
                Completed
              </div>
            )}
          </div>

          <div className="py-5">
            <div className="flex flex-row items-center justify-between">
              <div>{ReactHtmlParser(courseContent.lesson?.markDownContent)}</div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <button
              className="mt-4 w-auto border-spacing-x-1 rounded-md bg-gray-200 p-2 hover:bg-gray-400"
              onClick={() => {
                if (courseContent.lesson.previousLesson !== null) {
                  router.push(`/course/${courseContent.lesson.previousLesson}`);
                } else {
                  router.push({
                    pathname: '/course',
                    query: { id: courseId }
                  });
                }
              }}
            >
              Back
            </button>
            <button
              className="mt-4 w-auto border-spacing-x-1 rounded-md bg-gray-200 p-2 hover:bg-gray-400"
              onClick={() => {
                if (courseContent.nextLesson !== undefined && isCompleted) {
                  router.push(`/course/${courseContent.nextLesson}`);
                } else {
                  router.push({
                    pathname: '/course',
                    query: { id: courseId }
                  });
                }
              }}
            >
              Next
            </button>
          </div>

          <div
            onClick={() =>
              router.push({
                pathname: '/course',
                query: { id: courseId }
              })
            }
            className="text-md flex cursor-pointer justify-center text-yellow-600 hover:text-yellow-700 hover:underline lg:text-lg"
          >
            Table of Content
          </div>
        </div>
      </div>
    </Container>
  );
}
