import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Container } from '../../../../../components/layout';

const NotificationSuccess = dynamic(() =>
  import('../../../../../components/notifications/success')
);
const NotificationError = dynamic(() => import('../../../../../components/notifications/error'));

const PlaylistForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({
    Title: '',
    Author: '',
    Description: '',
    Url: ''
  });
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [notifyError, setNotifyError] = useState(false);

  const createPlaylist = async event => {
    event.preventDefault();
    const key = localStorage.getItem('PublicKey');

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: key
      },
      body: JSON.stringify({
        Title: data.Title,
        Author: data.Author,
        Description: data.Description,
        Url: data.Url,
        PlaylistID: id,
        Tags: [],
        SpecialTag: '0',
        Vertical: 'bnb',
        List: '',
        ContentType: 'playlist',
        ContentStatus: 'active'
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success === true) {
          //Empty editor state

          setData({
            Title: '',
            Author: '',
            Description: '',
            Url: ''
          });
          setNotifySuccess(true);
          setTimeout(() => {
            router.back();
          }, '1500');
        } else {
          //Empty editor state

          setData({
            Title: '',
            Author: '',
            Description: '',
            Url: ''
          });

          setNotifyError(true);
        }
      });
  };

  return (
    <div className="px-6">
      <main className="mx-auto mb-5 max-w-6xl shadow">
        <div className="relative overflow-hidden bg-white py-16 px-4 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
          <div className=" mx-auto max-w-3xl">
            <div className="prose prose mx-auto max-w-max text-center prose-h1:mb-2 prose-p:text-lg dark:prose-invert">
              <h1>Add a video to playlist</h1>
            </div>

            <div className="mt-12">
              <form
                action="#"
                method="POST"
                className="grid grid-cols-8 gap-y-6 gap-x-8"
                onSubmit={createPlaylist}
              >
                <div className="col-span-12 sm:col-span-4 lg:col-span-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Title
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

                <div className="col-span-12 sm:col-span-4 lg:col-span-6">
                  <label
                    htmlFor="author-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Author
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="author-name"
                      id="author-name"
                      value={data.Author}
                      autoComplete="given-name"
                      onChange={e => setData({ ...data, Author: e.target.value })}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-4 lg:col-span-12">
                  <label
                    htmlFor="content_markdown"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Url
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="author-name"
                      id="author-name"
                      value={data.Url}
                      autoComplete="given-name"
                      onChange={e => setData({ ...data, Url: e.target.value })}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-4 lg:col-span-12">
                  <label
                    htmlFor="long_description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Description
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
      <PlaylistForm />
    </Container>
  );
}
