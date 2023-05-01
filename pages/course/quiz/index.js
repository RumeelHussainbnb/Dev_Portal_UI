import moment from 'moment';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { http } from '../../../utils/http';
import { Container } from '../../../components/layout';
const QuizFormModel = dynamic(() => import('./quizFormModel'));
const DeleteModal = dynamic(() => import('../../../components/deleteModal/index'));

export async function getServerSideProps(context) {
  const { data } = await http.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/quiz`);
  return { props: data };
}

const initialQuizState = {
  Title: '',
  Description: '',
  Questions: [
    {
      QuestionTitle: '',
      A: '',
      B: '',
      C: '',
      D: '',
      CorrectOption: {
        label: '',
        value: ''
      }
    }
  ]
};

const Quizes = ({ data }) => {
  // state
  const [open, setOpen] = useState(false);
  const [deleteModel, setDeleteModel] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [quiz, setQuiz] = useState(initialQuizState);
  const router = useRouter();

  const hadnleDeleteConfirmationModal = id => {
    setDeleteId(id);
    setDeleteModel(true);
  };
  const handleDeleteQuiz = async () => {
    try {
      const deletedQuiz = await http.delete(`quiz?_id=${deleteId}`);
      if (deletedQuiz?.data?.success === true) {
        toast.success('Successfully deleted!');
        setTimeout(() => {
          router.reload();
        }, 1000);
      }
    } catch (error) {
      //Empty editor state
      toast.error('Something went wrong! ' + error.message);
    }
  };

  return (
    <div className="w-full bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-gray-800">
      <div className="mx-2">
        <div className="flex justify-center">
          <h1 className="text-2xl font-bold capitalize text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
            Quizzes
          </h1>
        </div>

        {/* <div className="mx-auto mt-5 max-w-4xl">
    <p className="prose mx-auto mt-3 text-center text-lg dark:prose-invert">All quizes.</p>
  </div> */}
        <div className="flex justify-center">
          <button
            className={`mt-2 cursor-pointer rounded bg-[#FACC15] p-2 px-4 font-bold text-white`}
            type="button"
            onClick={() => {
              setQuiz(JSON.parse(JSON.stringify(initialQuizState)));
              setOpen(true);
            }}
          >
            Add Quiz
          </button>
        </div>
        <div className="mb-1 w-full py-8">
          <div className="relative max-h-96 overflow-y-auto shadow-md  sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Quiz Title
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Quiz Description
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((quiz, index) => (
                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-5 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {moment(quiz?.CreatedAt).format('YYYY-MM-DD')}
                    </th>
                    <td className="px-5 py-4">{quiz?.Title}</td>
                    <td className="px-5 py-4"> {quiz?.Description}</td>
                    <td className="px-5 py-4">
                      <a
                        href=""
                        onClick={event => {
                          event.preventDefault();
                          setQuiz(quiz);
                          setOpen(true);
                        }}
                        className="font-medium text-yellow-600 hover:underline dark:text-yellow-500"
                      >
                        Edit
                      </a>
                      /
                      <a
                        onClick={() => hadnleDeleteConfirmationModal(quiz?._id)}
                        className="font-medium text-red-600 hover:underline dark:text-red-500"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <QuizFormModel open={open} setOpen={setOpen} quiz={quiz} />
      {deleteModel && (
        <DeleteModal
          handleConfirmation={handleDeleteQuiz}
          setShowModal={setDeleteModel}
          showModel={deleteModel}
          nameOfTheDeleted="Quiz"
        />
      )}
    </div>
  );
};

export default function Quiz({ data }) {
  const metaTags = {
    title: 'BNB Chain Quiz',
    description: 'Quiz Page',
    url: `${process.env.HOME_URL}/quiz`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <Quizes data={data} />
    </Container>
  );
}
