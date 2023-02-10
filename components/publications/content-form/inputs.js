import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import fetcher from '../../../utils/fetcher';
import EditorComponent from '../../Editor/Editor';
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  createFromBlockArray,
  createWithContent
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const MAX_LENGTH = 250;

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Inputs({
  data,
  setData,
  type,
  contentExist,
  setContentExist,
  editorLimitError,
  setEditorLimitError
}) {
  //handle editor state change
  const handleEditorChange = state => {
    isContentLimitExceed(state);

    setData({ ...data, Description: state });
  };

  //content charachter limit
  const isContentLimitExceed = state => {
    const currentContent = state.getCurrentContent();
    const currentContentLength = currentContent.getPlainText('').length;

    if (currentContentLength > MAX_LENGTH - 1) {
      setEditorLimitError(true);
      return true;
    } else {
      setEditorLimitError(false);
      return false;
    }
  };

  // Check for duplicated content if valid URL is provided
  async function checkForDuplicateContent(url) {
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    if (url.match(regex)) {
      const data = await fetcher(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/content/check?url=${url}`,
        {
          method: 'GET'
        }
      );

      data ? setContentExist(true) : setContentExist(false);
    }
  }

  return (
    <>
      {/* Title */}
      <div className="col-span-10">
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

      {/* Author*/}
      {/* <div className="col-span-4">
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
                        autoComplete="given-name"
                        readOnly={true}
                        value={data.Author}
                        className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
                    />
                </div>
                <p className="mt-1 text-sm text-gray-500 text-gray-500">
                    Name, Username or Social Platform link
                </p>
            </div> */}

      {/* Content Link */}
      <div className="col-span-10">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Content URL
        </label>
        <div className="mt-1">
          <input
            type="url"
            name="url"
            id="url"
            value={data.Url}
            placeholder="https://www.example.com"
            onChange={async e => {
              setData({ ...data, Url: e.target.value });
              await checkForDuplicateContent(e.target.value);
            }}
            className={classNames(
              'block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800',
              contentExist && 'border-red-300 text-red-900 focus:border-red-600 focus:ring-red-600'
            )}
          />
        </div>
        {contentExist && (
          <p className="mt-2 text-sm text-red-600" id="url">
            Content already included in the Library.
          </p>
        )}
      </div>

      {/* Preview Image Url */}
      <div className="col-span-10">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Preview Image URL
        </label>
        <div className="mt-1">
          <input
            type="url"
            name="url"
            id="url"
            //required
            value={data.ImageUrl}
            placeholder="https://www.example.com"
            onChange={async e => {
              setData({ ...data, ImageUrl: e.target.value });
            }}
            className={classNames(
              'block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800'
            )}
          />
        </div>
      </div>

      {/* Description */}
      <div className="col-span-10">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Description
        </label>
        <div className="mt-1">
          {/* <textarea
            id="description"
            required={type === 'submit'}
            name="description"
            rows={4}
            maxLength={100}
            value={data.Description}
            onChange={e => setData({ ...data, Description: e.target.value })}
            className="block w-full rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
          /> */}

          <EditorComponent editorState={data.Description} EditorChange={handleEditorChange} />
          <p
            className={classNames(
              'mt-2 text-sm text-gray-500 dark:text-gray-500',
              editorLimitError && 'text-red-500 dark:text-red-500'
            )}
          >
            Brief description about the content. ~250 characters
          </p>
        </div>
      </div>
    </>
  );
}

Inputs.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['submit', 'edit']),
  contentExist: PropTypes.bool.isRequired,
  setContentExist: PropTypes.func.isRequired
};

export default memo(Inputs);
