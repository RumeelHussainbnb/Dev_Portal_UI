import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

//* Local Imports
import { http } from '../../../../utils/http';
import { Container } from '../../../../components/layout';
import { useAppDispatch, useAppState } from '../../../../context/AppContext';
import { useEffect } from 'react';

const OPTIONS = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D'
};

export default function AttemptQuiz({ quiz, id }) {
  const router = useRouter();
  const appState = useAppState();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  });
  const [prevoiusResults, setPrevoiusResults] = useState([]);

  useEffect(() => {
    if (showResult) postResult();
  }, [showResult]);

  const postResult = async () => {
    console.log('result ==> ', result);
    //posting quiz result
    try {
      let params = {
        UserId: appState?.userId,
        QuizId: id,
        TotalQuestions: Questions.length,
        TotalScore: result.score,
        CorrectAnswers: result.correctAnswers,
        WrongAnswers: result.wrongAnswers,
        Percentage: percentage
      };
      const response = await http.post(`/quiz/result`, params);
      toast.success('Quiz Result Posted!');
    } catch (e) {
      console.log('e ==> ', e);
      toast.error('Error Occured! , ', e);
    }
  };

  let { Questions, Title, Description } = quiz;
  const { QuestionTitle, A, B, C, D, CorrectOption } = Questions[activeQuestion];
  const choices = [A, B, C, D];
  let percentage = ((result.correctAnswers / Questions.length) * 100).toFixed(2);

  const onClickNext = async () => {
    let copyPreviousResult = [...prevoiusResults];
    //* if user already selected answer on the question
    if (copyPreviousResult[activeQuestion + 1]) {
      setSelectedAnswerIndex(prevoiusResults[activeQuestion + 1].selectedIndex);
    }
    //* else new question for user
    else {
      //* Go To Next Question
      setSelectedAnswerIndex(null);
      setResult(prev =>
        selectedAnswer
          ? {
              ...prev,
              score: prev.score + 5,
              correctAnswers: prev.correctAnswers + 1
            }
          : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
      );
    }
    if (activeQuestion !== Questions.length - 1) {
      setActiveQuestion(prev => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
  };
  const onClickPrevious = () => {
    let previous = activeQuestion - 1;
    setActiveQuestion(previous);
    setSelectedAnswerIndex(prevoiusResults[previous].selectedIndex);
  };

  const claimNFT = () => {
    console.log('claimNFT');
  };

  const onAnswerSelected = (answer, index) => {
    //* Maintaining Previous Quiz Data
    let copyPreviousResult = [...prevoiusResults];
    copyPreviousResult[activeQuestion] = {
      question: QuestionTitle,
      correctOption: CorrectOption,
      options: choices,
      selectedIndex: index
    };
    setPrevoiusResults(copyPreviousResult);
    //* Selecting Answer
    setSelectedAnswerIndex(index);
    if (OPTIONS[index] === CorrectOption) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const addLeadingZero = number => (number > 9 ? number : `0${number}`);

  const metaTags = {
    title: 'BNBChainDev - Attempt Quiz',
    description:
      'Stay up-to-date with the BNBChain ecosystem. BNBChain Projects and Developers in one place.',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/quiz`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="mx-2 w-full">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
            {Title}
          </h1>
        </div>
        <div className="flex justify-center">
          <p className="text-gray-900 dark:text-gray-200 ">{Description}</p>
        </div>
        <div className="flex  justify-center">
          <div className="quiz-container ">
            {!showResult ? (
              <div>
                <div>
                  <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
                  <span className="total-question">/{addLeadingZero(Questions.length)}</span>
                </div>
                <h2 className="dark:text-yellow-400/100">{QuestionTitle}</h2>
                <ul>
                  {choices.map((answer, index) => (
                    <li
                      onClick={() => onAnswerSelected(answer, index)}
                      key={answer}
                      className={selectedAnswerIndex == index ? 'selected-answer' : null}
                    >
                      {answer}
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between">
                  <div>
                    {/* {activeQuestion !== 0 && (
                      <button onClick={onClickPrevious} disabled={selectedAnswerIndex === null}>
                        Previous
                      </button>
                    )} */}
                  </div>

                  <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
                    {activeQuestion === Questions.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="result">
                <h3>Result</h3>
                <p>
                  Total Question: <span>{Questions.length}</span>
                </p>
                <p>
                  Total Score:<span> {result.score}</span>
                </p>
                <p>
                  Correct Answers:<span> {result.correctAnswers}</span>
                </p>
                <p>
                  Wrong Answers:<span> {result.wrongAnswers}</span>
                </p>
                <p>
                  Percentage:<span> {percentage}%</span>
                </p>
                {percentage >= 80 && (
                  <a
                    href="https://s6qhfybgn4y.typeform.com/to/NM6iSxjq"
                    rel="noreferrer"
                    target="_blank"
                    className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
                  >
                    <button onClick={claimNFT}> Claim NFT</button>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  };
};

//Fetching posts in get Intial Props to make the app seo friendly
export async function getStaticProps({ params }) {
  let { id } = params;

  try {
    const quiz = await http.get(`/quiz/getOne?id=${id}`);
    let { Questions, Title, Description } = quiz?.data?.data[0];
    //Randomizer
    Questions = Questions.sort((a, b) => 0.5 - Math.random())?.slice(0, 20);
    return {
      props: {
        quiz: { Questions, Title, Description },
        id: id
      }
    };
  } catch (error) {
    if (error.response.status === 404) {
      return {
        notFound: true
      };
    }
  }
}
