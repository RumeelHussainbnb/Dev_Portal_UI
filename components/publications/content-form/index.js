import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import ContentTags from './tags';
import { memo, useState } from 'react';
import Radios from './radios';
import Inputs from './inputs';
import Status from './status';
import Position from './position';
import { useRouter } from 'next/router';
import useUser from '../../../hooks/useUser';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ContentForm({ type, setOpen, data, setData, setNotifySuccess, positions }) {
  const [contentExist, setContentExist] = useState(false);
  const { isAdmin = false } = useUser();
  const router = useRouter();
  //console.log('data ==> ', data);
  const createContent = async event => {
    event.preventDefault();

    // If the user is an admin, content will be active by default
    const content = data;
    if (isAdmin) {
      content.ContentStatus = 'active';
    }

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        ...content
      })
    });

    // After submitting we need to restart the
    // component state
    setData({
      Title: '',
      Author: '',
      Description: '',
      Url: '',
      ImageUrl: '',
      Vertical: 'bnb',
      Tags: [],
      ContentType: '',
      SpecialTag: 'New',
      Position: 0,
      Lists: '',
      ContentStatus: 'submitted'
    });

    // Send success notification
    setNotifySuccess(true);
  };

  const updateContent = async event => {
    event.preventDefault();

    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/content`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify([{ ...data, Img: data.ImageUrl }])
    });

    // call preview mode
    await fetch(`/api/preview?type=${data.ContentType}`);

    // Edit happens inside a modal, we need to close it after
    setOpen(false);
    router.reload();
  };

  return (
    <div className="relative h-full overflow-hidden bg-white py-16 px-4 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
      <div className=" mx-auto max-w-3xl">
        <div className="absolute top-0 right-1">
          {type === 'edit' && <Position data={data} setData={setData} list={positions} />}
        </div>
        <div className="prose prose mx-auto max-w-max text-center prose-h1:mb-2 prose-p:text-lg dark:prose-invert">
          <h1>{type === 'submit' ? 'Submit new content' : 'Edit Content'}</h1>

          <p>
            {type === 'submit' &&
              `Propose new content to the platform. Submissions will be manually
                            reviewed before deciding to publish them to the site.`}
          </p>
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
            className="grid grid-cols-8 gap-y-6 gap-x-8"
            onSubmit={type === 'edit' ? updateContent : createContent}
          >
            {/*Inputs*/}
            <Inputs
              data={data}
              setData={setData}
              type={type}
              contentExist={contentExist}
              setContentExist={setContentExist}
            />
            {/* Hiding Edit Tags on video edit */}
            {data.ContentType !== 'playlist' ? (
              <>
                {/*Radios components*/}
                <Radios data={data} setData={setData} type={type} />
                {/* Tags */}
                <ContentTags data={data} setData={setData} type={type} />
              </>
            ) : null}
            {/* Buttons */}
            <div className="mx-auto flex max-w-3xl justify-end">
              {type === 'edit' && (
                <button
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
                disabled={contentExist}
                className={classNames(
                  'ml-3 inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-3 px-16 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200',
                  contentExist && 'disabled:opacity-50'
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

ContentForm.propTypes = {
  type: PropTypes.oneOf(['submit', 'edit']),
  setOpen: PropTypes.func,
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  positions: PropTypes.array
};

export default memo(ContentForm);
