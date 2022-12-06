import dynamic from 'next/dynamic';
import { useState } from 'react';
import { Container } from '../../../../components/layout';
import axios from '../../../../utils/http';

const NotificationSuccess = dynamic(() => import('../../../../components/notifications/success'));
const NotificationError = dynamic(() => import('../../../../components/notifications/error'));

const Submit = metaTags => {
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [notifyError, setNotifyError] = useState(false);

  const [data, setData] = useState({
    id: '',
    category: 'project'
  });

  const createTweet = async event => {
    event.preventDefault();
    try {
      const response = await axios.post(`/tweets/post`, data);
      if (response?.data?.success === true) {
        //Empty editor state
        setData({
          id: '',
          category: 'project'
        });
        setNotifySuccess(true);
      }
    } catch (error) {
      //Empty editor state
      setData({
        id: '',
        category: 'project'
      });

      setNotifyError(true);
    }
  };

  return (
    <div className="px-6">
      <main className="mx-auto mb-5 max-w-6xl shadow">
        <div className="relative overflow-hidden bg-white py-16 px-4 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
          <div className=" mx-auto max-w-3xl">
            <div className="prose prose mx-auto max-w-max text-center prose-h1:mb-2 prose-p:text-lg dark:prose-invert">
              <h1>Post a Tweet</h1>
            </div>

            <div className="mt-12">
              <form
                action="#"
                method="POST"
                className="grid grid-cols-8 gap-y-6 gap-x-8"
                onSubmit={createTweet}
              >
                <div className="col-span-12 sm:col-span-4 lg:col-span-4">
                  <label
                    htmlFor="tweet_id"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Tweet ID
                  </label>
                  <div className="mt-1">
                    <input
                      required
                      type="number"
                      name="tweet_id"
                      id="tweet_id"
                      value={data.id}
                      onChange={e => setData({ ...data, id: e.target.value })}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                  </div>
                </div>

                <div className="col-span-12 sm:col-span-4 lg:col-span-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Category
                  </label>
                  <div className="mt-1 lg:flex lg:items-center">
                    <select
                      onChange={e => setData({ ...data, category: e.target.value })}
                      name="category"
                      required
                      className="mr-4 w-full appearance-none rounded-md border border-gray-300 bg-white p-2.5 shadow-sm outline-none focus:border-yellow-500 focus:outline-none dark:text-gray-800"
                    >
                      <option value="">Please Select a Category</option>
                      <option selected value="project">
                        Project
                      </option>
                      <option value="developer">Developer</option>
                    </select>
                  </div>
                </div>

                <div className="mx-auto flex max-w-3xl justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-3 px-16 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200"
                  >
                    {' '}
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <NotificationError
        show={notifyError}
        setShow={setNotifyError}
        text="Posting Failed"
        subText="Please try again"
      />
      <NotificationSuccess
        show={notifySuccess}
        setShow={setNotifySuccess}
        text="Successfully posted!"
        subText="Thank you"
      />
    </div>
  );
};

export default function ContentAdmin({}) {
  const metaTags = {
    title: 'BNB Chain - Library Admin',
    description: 'Library Admin',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin`,
    shouldIndex: false
  };

  return (
    <Container metaTags={metaTags}>
      <Submit metaTags={metaTags} />
    </Container>
  );
}
