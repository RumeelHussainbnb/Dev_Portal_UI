import { useState, useId } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';

import { http } from '../../../../utils/http';
import { Container } from '../../../../components/layout';

const PlaylistForm = () => {
  const [data, setData] = useState({
    Title: '',
    Author: '',
    Description: '',
    Provider: { label: '', name: '' }
  });

  const type = [
    {
      label: 'Youtube',
      value: 'Youtube'
    },

    {
      label: 'Twitch',
      value: 'Twitch'
    }
  ];

  const createPlaylist = async event => {
    event.preventDefault();
    let newVideo = {
      ...data,
      Provider: data.Provider.label
    };
    try {
      const response = await http.post(`/playlists/bnb`, newVideo);
      if (response?.data?.success === true) {
        //Empty editor state
        setData({
          Title: '',
          Author: '',
          Description: '',

          Provider: { label: '', name: '' }
        });
        toast.success('Successfully posted!, Thank you');
      }
    } catch (error) {
      //Empty editor state
      setData({
        Title: '',
        Author: '',
        Description: '',
        Provider: { label: '', name: '' }
      });

      toast.error('Posting Failed!, Please try again');
    }
  };

  return (
    <div className="px-6">
      <main className="mx-auto mb-5 max-w-6xl shadow">
        <div className="relative overflow-hidden bg-white py-16 px-4 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
          <div className=" mx-auto max-w-3xl">
            <div className="prose prose mx-auto max-w-max text-center prose-h1:mb-2 prose-p:text-lg dark:prose-invert">
              <h1>Add a Playlist</h1>
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

                <div className="col-span-12 sm:col-span-4 lg:col-span-12">
                  <label
                    htmlFor="content_markdown"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Provider
                  </label>
                  <div className="mt-1">
                    <Select
                      placeholder="Select a provider"
                      instanceId={useId()}
                      name="type"
                      label="type"
                      required
                      classNames={{
                        control: state =>
                          'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',
                        option: state =>
                          'dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500'
                      }}
                      options={type}
                      value={data.Provider.label ? data.Provider.type : ''}
                      onChange={typeObject => {
                        setData({
                          ...data,
                          Provider: typeObject
                        });
                      }}
                    />
                    {/* <input
                      type="text"
                      name="author-name"
                      id="author-name"
                      value={data.Provider}
                      autoComplete="given-name"
                      onChange={e => setData({ ...data, Provider: e.target.value })}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    /> */}
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
