import { Container } from '../../components/layout';
import Table from '../../components/course/table';
import { http } from '../../utils/http';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppState } from '../../context/AppContext';
import Loader from '../../components/Loader/Loader';

export default function Course() {
  const appState = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [showQuiz, setShowQuiz] = useState(true);
  const [quizId, setQuizId] = useState('64496fc215b3f42368a5b431');
  const metaTags = {
    title: 'BNB Chain 101 Dev Course',
    description:
      'This course is designed to be the absolute best starting point for Web Developers looking to learn Web3 Development. BNBChain is the ideal network for starting your Web3 journey because of its high speed, low cost, energy efficiency, and more.',
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
    console.log('data ==> ', data);
    if (data?.success) {
      let userCompletedQuizzes = data?.data?.filter(f => f.QuizId === quizId);
      console.log('userCompletedQuizzes ==> ', userCompletedQuizzes);
      let isQuizCompletedOver80 = userCompletedQuizzes.some(el => el?.Percentage >= 80); // return true or false if user scroed more then 80 true else false
      if (isQuizCompletedOver80) setShowQuiz(false);
    }
  };
  useEffect(() => {
    getCompletedQuizByUser();
  }, []);

  return (
    <Container metaTags={metaTags}>
      {isLoading && <Loader />}
      <div className="w-full bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-800">
        <div className="mx-2">
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
              BNB Chain 101 Dev Course
            </h1>
          </div>

          <div className="mx-auto mt-5 max-w-4xl">
            <p className="prose mx-auto mt-3 text-center text-lg dark:prose-invert">
              This course is designed to be the absolute best starting point for Web Developers
              looking to learn Web3 Development. BNB Chain is the ideal network for starting your
              Web3 journey because of its high speed, low cost, energy efficiency, and more.
            </p>
          </div>

          {/*<Banner />*/}

          <Table showQuiz={showQuiz} quizId={quizId} />
        </div>
      </div>
    </Container>
  );
}
