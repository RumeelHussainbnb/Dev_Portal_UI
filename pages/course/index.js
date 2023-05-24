import { Container } from '../../components/layout';
import Table from '../../components/course/table-new';
import { http } from '../../utils/http';
import { useEffect, useState } from 'react';
import { useCourseProgress } from '../../context/CourseProgressContext';
import Loader from '../../components/Loader/Loader';
import { useRouter } from 'next/router';

export default function Course() {
  const router = useRouter();
  const { setCourseProgress, setCourse, course, courseProgress } = useCourseProgress();
  const [isLoading, setIsLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(true);
  const [quizId, setQuizId] = useState('64496fc215b3f42368a5b431');
  const [updateCourse, setUpdateCourse] = useState(null);

  const metaTags = {
    title: 'BNB Chain 101 Dev Course',
    description:
      'Know more about the Best Blockchain Development Course only at the BNB dev community website. Learn and develop your career path with Web3 Development.',
    url: `${process.env.HOME_URL}/course`,
    shouldIndex: true
  };

  const getCompletedQuizByUser = async () => {
    let userState = JSON.parse(localStorage.getItem('userData' || '{}'));
    setIsLoading(true);
    const { data } = await http.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/quiz/getCompletedQuizByUserId?userId=${userState.data?._id}`
    );
    setIsLoading(false);
    if (data?.success) {
      let userCompletedQuizzes = data?.data?.filter(f => f.QuizId === quizId);
      let isQuizCompletedOver80 = userCompletedQuizzes.some(el => el?.Percentage >= 80);
      if (isQuizCompletedOver80) setShowQuiz(false);
    }
  };

  const getUserCourseProgress = async courseId => {
    let userState = JSON.parse(localStorage.getItem('userData' || '{}'));
    if (!isLoading) {
      setIsLoading(true);
      const { data } = await http.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/userProgress/all-progress/${userState.data?._id}/${courseId}`
      );
      setIsLoading(false);
      setCourseProgress(data.data);
    }
  };

  const getFullCourseContent = async courseId => {
    if (!isLoading) {
      setIsLoading(true);
      const { data } = await http.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/course/full-course/${courseId}`
      );
      setIsLoading(false);
      if (data?.success) {
        setCourse(data.data[0]);
      }
    }
  };

  useEffect(() => {
    const courseId = router.query.id;
    if (courseId) {
      getFullCourseContent(courseId);
      getUserCourseProgress(courseId);
    }
  }, [router.query.id]);

  useEffect(() => {
    getCompletedQuizByUser();
  }, []);

  useEffect(() => {
    const visualizeCourseLock = (courseContent, courseProgressData) => {
      const updatedCourseData = JSON.parse(JSON.stringify(courseContent));
      for (let moduleid of updatedCourseData.modules) {
        const moduleProgress = courseProgressData.moduleId.find(
          progressModule => progressModule._id === moduleid._id
        );
        if (moduleProgress) {
          moduleid.totalLessons = moduleProgress.totalLesson;
          moduleid.totalComplete = moduleProgress.totalCompletedLesson;
          for (let lesson of moduleid.lessons) {
            const lessonProgress = moduleProgress.lessonId.find(
              progressLesson => progressLesson._id === lesson._id
            );
            if (lessonProgress) {
              lesson.isLocked = lessonProgress.locked;
              lesson.completed = lessonProgress.completed;
              lesson.isNotRead = lessonProgress.isNotRead;
            }
          }
        }
      }
      setUpdateCourse(updatedCourseData);
    };
    if (course && courseProgress) {
      visualizeCourseLock(course, courseProgress);
    }
  }, [course, courseProgress, setUpdateCourse]);

  return (
    <Container metaTags={metaTags}>
      {isLoading && <Loader />}
      <div className="w-full bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-800">
        <div className="mx-2">
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
              {course?.title}
            </h1>
          </div>

          <div className="mx-auto mt-5 max-w-4xl">
            <p className="prose mx-auto mt-3 text-center text-lg dark:prose-invert">
              {course?.description}
            </p>
          </div>

          {/*<Banner />*/}

          <Table
            showQuiz={showQuiz}
            quizId={quizId}
            courses={updateCourse?.modules}
            courseId={updateCourse?._id}
          />
        </div>
      </div>
    </Container>
  );
}
