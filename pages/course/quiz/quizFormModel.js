import Select from 'react-select';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Fragment, useEffect, memo, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/outline';

import { http } from '../../../utils/http';
import Loader from '../../../components/Loader/Loader';

//Constants
const correctOptions = [
  {
    label: 'A',
    value: 'A'
  },
  {
    label: 'B',
    value: 'B'
  },
  {
    label: 'C',
    value: 'C'
  },
  {
    label: 'D',
    value: 'D'
  }
];

function Modal({ open, setOpen, quiz }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isEditMode = quiz?.Title !== '';

  useEffect(() => {
    let copyQuiz = { ...quiz };
    if (isEditMode) {
      let copyQuizQuestions = [...copyQuiz?.Questions];
      copyQuizQuestions = copyQuizQuestions.map(d => {
        return {
          ...d,
          CorrectOption: { label: d.CorrectOption, value: d.CorrectOption }
        };
      });
      copyQuiz.Questions = copyQuizQuestions;
    }

    setData({ ...copyQuiz });
  }, [quiz]);

  const createUpdateQuiz = async event => {
    //setIsLoading(true);

    event.preventDefault();
    let copyState = { ...data };
    let copyQuestions = [...copyState?.Questions];
    copyQuestions = copyQuestions.map(d => {
      return {
        ...d,
        CorrectOption: d.CorrectOption.value
      };
    });
    copyState.Questions = copyQuestions;

    try {
      if (isEditMode) {
        const response = await http.put(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/quiz`, copyState);
        if (response?.data?.success === true) {
          toast.success('Successfully Updated!');
          setTimeout(() => {
            setOpen(false);
          }, 1000);
        }
      } else {
        const response = await http.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/quiz`, copyState);
        if (response?.data?.success === true) {
          toast.success('Successfully Created!');
          setTimeout(() => {
            setOpen(false);
          }, 1000);
        }
      }
      router.reload();
    } catch (error) {
      toast.error('Something went wrong!');
      console.log('Error ', error);
    }
    //setIsLoading(false);
  };
  const setDataIntoState = (key, value, index) => {
    let copyState = { ...data };
    copyState.Questions[index][key] = value;
    setData({ ...copyState });
  };
  const handleAddMoreQuestion = () => {
    let copyState = { ...data };
    copyState.Questions.push({
      QuestionTitle: '',
      A: '',
      B: '',
      C: '',
      D: '',
      CorrectOption: ''
    });
    setData({ ...copyState });
  };

  const hadnleDeleteQuestion = id => {
    let deepCopyState = JSON.parse(JSON.stringify(data));
    deepCopyState.Questions = deepCopyState?.Questions.filter(question => question?._id !== id);
    setData(deepCopyState);
  };

  return (
    <Transition.Root show={open || false} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setOpen(false)}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-90 opacity-100 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-full max-w-4xl translate-y-0 transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom opacity-100 shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:scale-100 sm:p-6 sm:align-middle">
              <div className="content-page-wrapper relative h-full overflow-hidden bg-white py-16 px-4 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
                <div className=" mx-auto max-w-5xl">
                  {isLoading && <Loader />}

                  <div className="prose prose mx-auto max-w-max text-center prose-h1:mb-2 prose-p:text-lg dark:prose-invert">
                    <h1>{isEditMode ? 'Update Quiz' : 'Create Quiz'}</h1>
                  </div>
                  {/* {type === 'edit' && (
          <div className="mx-auto max-w-max">
            <Status data={data} setData={setData} />
          </div>
        )} */}

                  <div className="mt-12">
                    <form action="#" method="POST" onSubmit={createUpdateQuiz}>
                      <div className="grid grid-cols-10 gap-y-6 ">
                        <div className="col-span-12 sm:col-span-4 lg:col-span-12">
                          <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Quiz Title
                          </label>
                          <div className="mt-1">
                            <input
                              required
                              type="text"
                              name="title"
                              id="title"
                              value={data.Title}
                              onChange={e => setData({ ...data, Title: e.target.value })}
                              className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                            />
                          </div>
                        </div>
                        <div className="col-span-12 sm:col-span-4 lg:col-span-12">
                          <label
                            htmlFor="long_description"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Quiz Description
                          </label>
                          <div className="mt-1">
                            <textarea
                              id="long_description"
                              name="long_description"
                              required
                              rows={4}
                              value={data.Description}
                              onChange={e => setData({ ...data, Description: e.target.value })}
                              className="block w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                            />
                          </div>
                        </div>
                        <div className=" col-span-12 sm:col-span-4 lg:col-span-12">
                          <hr className="my-2 h-px border-0 bg-yellow-400 dark:bg-gray-700" />
                        </div>
                        <div className="col-span-12 sm:col-span-4 lg:col-span-12">
                          <label
                            htmlFor="long_description"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            Enter your question data:
                          </label>
                        </div>
                      </div>

                      {data?.Questions?.map((eachQuestion, index) => (
                        <div className=" mt-2 grid grid-cols-10 gap-y-6" key={index}>
                          <div className="col-span-12 sm:col-span-4 lg:col-span-12">
                            <div className="flex flex-row justify-between">
                              <div>
                                <label
                                  htmlFor="title"
                                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                  Question # {index + 1}
                                </label>
                                <label
                                  htmlFor="title"
                                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                                >
                                  Question Title
                                </label>
                              </div>

                              {/* Add Icon */}
                              <div
                                onClick={() => hadnleDeleteQuestion(eachQuestion?._id)}
                                className="  cursor-pointer "
                              >
                                <TrashIcon
                                  className="h-6 w-6 stroke-gray-500  hover:stroke-red-500 "
                                  aria-hidden="true"
                                />
                              </div>
                            </div>

                            <div className="mt-1">
                              <input
                                required
                                type="text"
                                name="title"
                                id="title"
                                value={eachQuestion?.QuestionTitle}
                                onChange={e =>
                                  setDataIntoState('QuestionTitle', e.target.value, index)
                                }
                                className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 mr-2 sm:col-span-4 lg:col-span-5">
                            <label
                              htmlFor="title"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Option A
                            </label>
                            <div className="mt-1">
                              <input
                                required
                                type="text"
                                name="title"
                                id="title"
                                value={eachQuestion?.A}
                                onChange={e => setDataIntoState('A', e.target.value, index)}
                                className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-4 lg:col-span-5">
                            <label
                              htmlFor="title"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Option B
                            </label>
                            <div className="mt-1">
                              <input
                                required
                                type="text"
                                name="title"
                                id="title"
                                value={eachQuestion?.B}
                                onChange={e => setDataIntoState('B', e.target.value, index)}
                                className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 mr-2 sm:col-span-4 lg:col-span-5">
                            <label
                              htmlFor="title"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Option C
                            </label>
                            <div className="mt-1">
                              <input
                                required
                                type="text"
                                name="title"
                                id="title"
                                value={eachQuestion?.C}
                                onChange={e => setDataIntoState('C', e.target.value, index)}
                                className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                              />
                            </div>
                          </div>
                          <div className="col-span-6 sm:col-span-4 lg:col-span-5">
                            <label
                              htmlFor="title"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Option D
                            </label>
                            <div className="mt-1">
                              <input
                                required
                                type="text"
                                name="title"
                                id="title"
                                value={eachQuestion?.D}
                                onChange={e => setDataIntoState('D', e.target.value, index)}
                                className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                              />
                            </div>
                          </div>
                          <div className=" col-span-12 sm:col-span-4 lg:col-span-12">
                            <label
                              htmlFor="correctAnswer"
                              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                              Correct Answer
                            </label>
                            <Select
                              placeholder="Select correct answer"
                              instanceId={index}
                              required
                              name="correctAnswer"
                              label="correctAnswer"
                              classNames={{
                                singleValue: state =>
                                  state.isDisabled
                                    ? 'dark:text-gray-800 text-gray-800'
                                    : 'capitalize',
                                control: state =>
                                  'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',

                                option: state =>
                                  state.isSelected
                                    ? 'capitalize dark:bg-gray-400 bg-white dark:text-gray-500'
                                    : 'bg-white dark:text-black-500 select-value'
                              }}
                              options={correctOptions}
                              value={
                                eachQuestion?.CorrectOption?.label
                                  ? eachQuestion?.CorrectOption
                                  : ''
                              }
                              onChange={correctOptionObject => {
                                setDataIntoState('CorrectOption', correctOptionObject, index);
                              }}
                            />
                          </div>
                          <div className=" col-span-12 sm:col-span-4 lg:col-span-12">
                            <hr className="my-4 h-px border-0 bg-yellow-400 dark:bg-gray-700" />
                          </div>
                        </div>
                      ))}

                      {/* Add Icon */}
                      <div
                        onClick={handleAddMoreQuestion}
                        className="col-span-12 mt-2 flex cursor-pointer flex-row-reverse sm:col-span-4 lg:col-span-12"
                      >
                        <PlusCircleIcon
                          className="h-8 w-8 stroke-gray-500  hover:stroke-yellow-500 "
                          aria-hidden="true"
                        />
                      </div>

                      {/* Buttons */}
                      <div className="button-wrapper col-span-10 mx-auto flex max-w-5xl">
                        <button
                          disabled={isLoading}
                          type="button"
                          onClick={() => {
                            setOpen(false);
                          }}
                        >
                          Cancel
                        </button>

                        <button type="submit">{isEditMode ? 'Update' : 'Create'}</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default memo(Modal);

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  quiz: PropTypes.object.isRequired
};
