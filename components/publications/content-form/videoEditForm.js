import { memo, useState } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import Status from './status';
import { http } from '../../../utils/http';
import Loader from '../../Loader/Loader';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ContentForm({ type, setOpen, data, setData, setNotifySuccess, positions }) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  //convert editor raw data to html
  const convertContentToHTML = () => {
    return draftToHtml(convertToRaw(data.ContentMarkdown.getCurrentContent()));
  };
  const updateContent = async event => {
    event.preventDefault();
    setIsLoading(true);

    let copyState = { ...data };

    await http.put(`/content`, {
      ...copyState,
      ContentType: data.ContentType.value,
      Img: data.ImageUrl,
      ContentMarkdown: convertContentToHTML()
    });

    // call preview mode
    await fetch(`/api/preview?type=${data.ContentType}`);

    // Edit happens inside a modal, we need to close it after
    setOpen(false);
    setIsLoading(false);
    router.reload();
  };

  return (
    <div className="content-page-wrapper relative h-full overflow-hidden bg-white py-16 px-4 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
      <div className=" mx-auto max-w-5xl">
        {isLoading && <Loader />}
        {/* <div className="absolute top-0 right-1">
          {type === 'edit' && <Position data={data} setData={setData} list={positions} />}
        </div> */}
        <div className="prose prose mx-auto max-w-max text-center prose-h1:mb-2 prose-p:text-lg dark:prose-invert">
          <h1>{'Edit Content'}</h1>
        </div>
        {type === 'edit' && (
          <div className="mx-auto max-w-max">
            <Status data={data} setData={setData} />
          </div>
        )}

        <div className="mt-12">
          <form
            action="#"
            method="POST"
            className="grid grid-cols-10 gap-y-6 "
            onSubmit={updateContent}
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
                htmlFor="content_markdown"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Image Preview Url
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="author-name"
                  id="author-name"
                  value={data.ImageUrl}
                  autoComplete="given-name"
                  onChange={e => setData({ ...data, ImageUrl: e.target.value })}
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
            {/* Buttons */}
            <div className="button-wrapper col-span-10 mx-auto flex max-w-5xl">
              {type === 'edit' && (
                <button
                  disabled={isLoading}
                  type="button"
                  className="rounded-md border border-gray-300 bg-white py-3 px-6 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  onClick={() => {
                    if (type === 'edit') setOpen(false);
                  }}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                className={classNames(
                  'ml-3 inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-3 px-16 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200'
                )}
              >
                {type === 'submit' ? 'Submit' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default memo(ContentForm);
