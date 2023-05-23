import { useRouter } from 'next/router';
import React, { useState, memo } from 'react';
import { toast } from 'react-toastify';
import { http } from '../../utils/http';

const AddModuleForm = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: '',
    courseId: router.query.courseId
  });

  const createModule = async event => {
    event.preventDefault();
    try {
      const response = await http.post(`/modules`, data);
      if (response?.data?.success === true) {
        toast.success('Module successfully created!');
        setTimeout(() => {
          router.back();
        }, 1500);
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
            <h1>Add a Module</h1>
          </div>

          <div className="mt-12">
            <form
              action="#"
              method="POST"
              className="grid grid-cols-8 gap-x-8 gap-y-6"
              onSubmit={createModule}
            >
              <div className="col-span-12">
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Module Name
                </label>
                <div className="mt-1">
                  <input
                    required
                    type="text"
                    name="title"
                    id="title"
                    value={data.name}
                    onChange={e => setData({ ...data, name: e.target.value })}
                    className="block w-full rounded-md border-gray-300 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                  />
                </div>
              </div>

              <div className="mx-auto flex max-w-3xl justify-end">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-yellow-600 px-16 py-3 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200"
                >
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

export default memo(AddModuleForm);
