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

import contentType from '../../../utils/content-types';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ContentForm({ type, setOpen, data, setData, setNotifySuccess, positions }) {
  const [contentExist, setContentExist] = useState(false);
  const [editorLimitError, setEditorLimitError] = useState(false);
  const { isAdmin = false } = useUser();
  const router = useRouter();

  //convert editor raw data to html
  const convertContentToHTML = () => {
    return draftToHtml(convertToRaw(data.ContentMarkdown.getCurrentContent()));
  };

  const createContent = async event => {
    event.preventDefault();

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
    setNotifySuccess(true);
  };

  const updateContent = async event => {
    event.preventDefault();

    if (editorLimitError) {
      return;
    }
    //data['PublishedAt'] = new Date();
    let copyState = { ...data };
    let updatedTags = copyState?.Tags?.filter(e => e !== copyState.currentLevel);
    updatedTags.push(copyState?.Level?.value);
    copyState.Tags = updatedTags;
    await http.put(`/content`, {
      ...copyState,
      Img: data.ImageUrl,
      ContentType: data.ContentType.value,
      ContentMarkdown: convertContentToHTML()
    });

    // call preview mode
    await fetch(`/api/preview?type=${data.ContentType}`);

    // Edit happens inside a modal, we need to close it after
    setOpen(false);
    router.reload();
  };

  return (
    <div className="relative h-full overflow-hidden bg-white py-16 px-4 dark:bg-gray-800 sm:px-6 lg:px-8 lg:py-14">
      <div className=" mx-auto max-w-5xl">
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
            <div className="col-span-12 sm:col-span-4 lg:col-span-10">
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
                    state.isDisabled ? 'dark:text-gray-800 text-gray-800' : '',
                  control: state =>
                    'py-1.5 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 focus:border-yellow-500 focus:ring-yellow-500',

                  option: state =>
                    state.isSelected ? ' dark:bg-gray-400 bg-white dark:text-gray-800 ' : 'bg-white'
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
            <div className="col-span-12 sm:col-span-4 lg:col-span-10">
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
                    state.isSelected ? ' dark:bg-gray-400 bg-white dark:text-gray-800 ' : 'bg-white'
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
            <div className="col-span-10 mx-auto flex max-w-5xl">
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
              {type !== 'edit' && (
                <button
                  className={classNames(
                    'ml-3 inline-flex justify-center rounded-md border border-transparent bg-yellow-600 py-3 px-16 text-sm font-medium text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:text-gray-200'
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
