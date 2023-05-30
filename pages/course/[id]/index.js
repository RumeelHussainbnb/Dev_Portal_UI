import React, { useState, useEffect, useRef } from 'react';
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
  const [moduleId, setModuleId] = useState('');
  const markDownContentRef = useRef(null);
  const [course, setCourse] = useState({});
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
        const moduleId = await http.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/modules/lesson/${id}`
        );
        console.log(courseProgress.data.data);
        setCourse(courseProgress.data.data);
        setModuleId(moduleId.data.data);
        setIsCompleted(courseProgress.data.data.completed);
        setCourseContent(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFullLesson();
  }, [appState.userId, router.query.id]);

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
        <Progress
          setOnComplete={setOnComplete}
          isCompleted={isCompleted}
          progressRef={markDownContentRef}
        />
        <div
          className="prose mx-auto max-w-6xl rounded-lg px-10 py-8 dark:prose-invert dark:border-none lg:border lg:bg-white dark:lg:bg-gray-800 xl:px-32"
          ref={markDownContentRef}
        >
          <div className="grid-cols-6 gap-4">
            <div
              onClick={() =>
                router.push({
                  pathname: '/course',
                  query: { id: course.CourseId }
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
                    query: { id: course.CourseId }
                  });
                }
              }}
            >
              Back
            </button>
            <button
              className="mt-4 w-auto border-spacing-x-1 rounded-md bg-gray-200 p-2 hover:bg-gray-400"
              onClick={async () => {
                console.log(courseContent.nextLesson);
                if (courseContent.nextLesson !== 'null' && isCompleted) {
                  const res = await http.post('/userProgress/', {
                    CourseId: course.CourseId,
                    LessonId: courseContent.nextLesson,
                    ModuleId: moduleId._id,
                    UserId: appState.userId
                  });
                  if (res.data.success) {
                    router.push({
                      pathname: `/course/${courseContent.nextLesson}`
                    });
                  }
                } else {
                  router.push({
                    pathname: '/course',
                    query: { id: course.CourseId }
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
                query: { id: course.CourseId }
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
