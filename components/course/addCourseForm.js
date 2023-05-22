import { useRouter } from 'next/router';
import React, { useState, memo } from 'react';
import { toast } from 'react-toastify';
import { http } from '../../utils/http';

const CourseForm = () => {
  const router = useRouter();
  const [data, setData] = useState({
    shortTitle: '',
    longTitle: '',
    description: '',
    slug: ''
  });
  const createCourse = async event => {
    event.preventDefault();
    try {
      const response = await http.post(`/course`, data);
      if (response?.data?.success === true) {
        toast.success('Successfully posted!, Thank you');
        setTimeout(() => {
          router.back();
        }, '1500');
      }
    } catch (error) {
      toast.error('Create Failed!, Please try again');
    }
  };
  return (
    <main className="mx-auto mb-5 shadow">
      <div className="relative overflow-hidden bg-white px-4 py-16 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-4xl">
          <div onClick={() => router.back()}>back</div>
          <div className="mx-auto max-w-max text-center dark:prose-invert prose-h1:mb-2 prose-p:text-lg">
            <h1>Add a Course</h1>
          </div>

          <div className="mt-12">
            <form
              action="#"
              method="POST"
              className="grid grid-cols-8 gap-x-8 gap-y-6"
              onSubmit={createCourse}
            >
              <div className="col-span-4">
                <label
                  htmlFor="shortTitle"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Short Title
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="text"
                    name="shortTitle"
                    id="shortTitle"
                    value={data.shortTitle}
                    onChange={e => setData({ ...data, shortTitle: e.target.value })}
                    className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                  />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-8">
                <label
                  htmlFor="longTitle"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Long Title
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="text"
                    name="longTitle"
                    id="longTitle"
                    value={data.longTitle}
                    onChange={e => setData({ ...data, longTitle: e.target.value })}
                    className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                  />
                </div>
              </div>

              <div className="col-span-12">
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Slug
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="text"
                    name="title"
                    id="title"
                    value={data.slug}
                    onChange={e => setData({ ...data, slug: e.target.value })}
                    className="block w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
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
                    value={data.description}
                    onChange={e => setData({ ...data, description: e.target.value })}
                    className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                  />
                </div>
              </div>

              <div className="mx-auto flex max-w-3xl justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-yellow-600 px-16 py-3 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200"
                >
                  {' '}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default memo(CourseForm);
