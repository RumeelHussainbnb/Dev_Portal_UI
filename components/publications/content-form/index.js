import { memo, useState, useId } from 'react';
import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Select from 'react-select';

import Radios from './radios';
import Inputs from './inputs';
import Status from './status';
import ContentTags from './tags';
import Position from './position';
import tagList from '../../../utils/tags';
import { http } from '../../../utils/http';
import useUser from '../../../hooks/useUser';
import Loader from '../../Loader/Loader';

import contentType from '../../../utils/content-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ContentForm({ type, setOpen, data, setData, setNotifySuccess, positions }) {
  const [contentExist, setContentExist] = useState(false);
  const [editorLimitError, setEditorLimitError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin = false } = useUser();
  const router = useRouter();
  console.log('data', data);

  //convert editor raw data to html
  const convertContentToHTML = () => {
    return draftToHtml(convertToRaw(data.ContentMarkdown.getCurrentContent()));
  };

  const createContent = async event => {
    event.preventDefault();
    setIsLoading(true);

    if (editorLimitError) {
      return;
    }
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    let copyState = { ...data };
    copyState.Tags.push(data?.Level?.value);
    setData(copyState);
    // If the user is an admin, content will be active by default
    const content = data;
    if (isAdmin) {
      content.ContentStatus = 'active';
    }
    content.PublicKey = localStorage.getItem('PublicKey');
    content.UserID = userData?.data?._id;
    content.Author = userData?.data?.Username;
    content.ContentMarkdown = convertContentToHTML();

    //set image privew
    var elem = document.createElement('div');
    elem.style.display = 'none';
    document.body.appendChild(elem);
    elem.innerHTML = content.ContentMarkdown;
    //console.log('elem ==> ', elem);
    let isImageUrl = elem.querySelector('img')?.src;
    //console.log('isImageUrl ==> ', isImageUrl);
    content.ImageUrl = isImageUrl ? isImageUrl : '';
    content.ContentType = data.ContentType.value;

    const response = await http.post(`/content`, content);

    // After submitting we need to restart the
    // component state
    setData({
      Title: '',
      Author: '',
      Description: '',
      Url: '',
      Level: {},
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
    setNotifySuccess();
    setIsLoading(false);
  };

  const updateContent = async event => {
    event.preventDefault();
    setIsLoading(true);
    if (editorLimitError) {
      return;
    }

    let copyState = { ...data };
    copyState.ContentMarkdown = convertContentToHTML();
    //set image privew
    let elem = document.createElement('div');
    elem.style.display = 'none';
    document.body.appendChild(elem);
    elem.innerHTML = copyState.ContentMarkdown;
    let isImageUrl = elem.querySelector('img')?.src;
    copyState.ImageUrl = isImageUrl ? isImageUrl : '';
    let updatedTags = copyState?.Tags?.filter(e => e !== copyState.currentLevel);
    updatedTags.push(copyState?.Level?.value);
    copyState.Tags = updatedTags;
    await http.put(`/content`, {
      ...copyState,
      Img: copyState.ImageUrl,
      ContentType: data.ContentType.value,
      ContentMarkdown: copyState.ContentMarkdown
    });

    // call preview mode
    await fetch(`/api/preview?type=${data.ContentType}`);

    // Edit happens inside a modal, we need to close it after
    setOpen(false);
    setIsLoading(false);
    router.reload();
  };

  return (
    <div className="content-page-wrapper relative h-full overflow-hidden bg-white px-4 py-16 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
      <div className=" mx-auto max-w-5xl">
        {isLoading && <Loader />}
        <div className="absolute right-1 top-0">
          {type === 'edit' && <Position data={data} setData={setData} list={positions} />}
        </div>
        <div className="prose prose mx-auto max-w-max text-center dark:prose-invert prose-h1:mb-2 prose-p:text-lg">
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
            className="grid grid-cols-10 gap-y-6 "
            onSubmit={type === 'edit' ? updateContent : createContent}
          >
            <div className="col-span-12 sm:col-span-4 md:col-span-5 md:mr-2">
              <label
                htmlFor="country"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Content Type
              </label>
              <Select
                placeholder="Select content type"
                instanceId={useId()}
                required
                name="contentType"
                label="contentType"
                classNames={{
                  singleValue: state =>
                    state.isDisabled ? 'dark:text-gray-800 text-gray-800' : 'capitalize',
                  control: state =>
                    'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',

                  option: state =>
                    state.isSelected
                      ? 'capitalize dark:bg-gray-400 bg-white dark:text-gray-500'
                      : 'bg-white dark:text-black-500 select-value'
                }}
                options={contentType}
                value={data.ContentType.label ? data.ContentType : ''}
                onChange={contentTypeObject => {
                  setData({
                    ...data,
                    ContentType: contentTypeObject,
                    ContentMarkdown: EditorState.createEmpty()
                  });
                }}
              />
            </div>
            <div className="col-span-12 sm:col-span-4 md:col-span-5 md:ml-2">
              <label
                htmlFor="country"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Level
              </label>
              <Select
                placeholder="Select Level"
                instanceId={useId()}
                required
                name="Level"
                label="Level"
                classNames={{
                  singleValue: state =>
                    state.isDisabled ? 'dark:text-gray-800 text-gray-800' : '',
                  control: state =>
                    'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',

                  option: state =>
                    state.isSelected
                      ? ' dark:bg-gray-400 bg-white dark:text-gray-800 '
                      : 'bg-white dark:text-black-500 select-value'
                }}
                options={tagList.level}
                value={data.Level.label ? data.Level : ''}
                onChange={levelObject => {
                  setData({
                    ...data,
                    Level: levelObject
                  });
                }}
              />
            </div>
            {/*Inputs*/}
            <Inputs
              data={data}
              setData={setData}
              type={type}
              contentExist={contentExist}
              setContentExist={setContentExist}
              editorLimitError={editorLimitError}
              setEditorLimitError={setEditorLimitError}
            />
            {/* Hiding Edit Tags on video edit */}
            {data.ContentType !== 'playlist' && data.ContentType !== 'newsletters' ? (
              <>
                {/*Radios components*/}
                <Radios data={data} setData={setData} type={type} />
                {/* Tags */}
                <ContentTags data={data} setData={setData} type={type} />
              </>
            ) : null}
            {/* Buttons */}
            <div className="button-wrapper col-span-10 mx-auto flex max-w-5xl">
              {type === 'edit' && (
                <button
                  disabled={isLoading}
                  type="button"
                  className="rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  onClick={() => {
                    if (type === 'edit') setOpen(false);
                  }}
                >
                  Cancel
                </button>
              )}

              <button
                type="submit"
                disabled={contentExist || isLoading}
                className={classNames(
                  'ml-3 inline-flex justify-center rounded-md border border-transparent bg-yellow-600 px-16 py-3 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200',
                  contentExist && 'disabled:opacity-50'
                )}
              >
                {type === 'submit' ? 'Submit' : 'Save'}
              </button>
              {type !== 'edit' && (
                <button
                  className={classNames(
                    'ml-3 inline-flex justify-center rounded-md border border-transparent bg-yellow-600 px-16 py-3 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200'
                  )}
                  type="button"
                  onClick={() => router.back()}
                >
                  Cancel
                </button>
              )}
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
