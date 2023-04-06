import {
  DocumentTextIcon,
  ExternalLinkIcon,
  EyeOffIcon,
  FilmIcon,
  InboxInIcon,
  PlayIcon
} from '@heroicons/react/solid';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo, useState } from 'react';
import defineImage from '../../utils/content-imagen';
import ReactHtmlParser from 'react-html-parser';
import tagList from '../../utils/tags';

const Badge = dynamic(() => import('../badges/badge.js'));
const CopyLink = dynamic(() => import('./copy-link.js'));

//Default Functions
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const myLoader = ({ src, width, quality }) => {
  return `${src}`;
};

const NewsLetterContent = ({ imageUrl, content, mode, editContent, closeSearch }) => {
  return (
    <>
      <Link href={`/newsletters/${content.SK}`} rel="noreferrer" passHref>
        <a>
          <Image
            className="cursor-pointer rounded-t-lg object-cover hover:opacity-90"
            src={imageUrl}
            alt=""
            height="200"
            width="400"
            quality="100"
            placeholder="blur"
            blurDataURL={imageUrl}
            loader={myLoader}
          />
        </a>
      </Link>
      <div className="px-5 pt-5">
        <div className="h-[210px] overflow-hidden">
          <div className="border-b-2 border-dashed border-gray-700 dark:border-gray-500">
            <div className="flex justify-between">
              {/*  Title */}
              {/* <Link href={`/newsletters/${content.SK}`} rel="noreferrer" passHref>
                 <a className="mr-2"> */}
              <p className=" mr-2 text-lg font-semibold text-gray-900 dark:text-gray-200 ">
                {content.Title}
              </p>
            </div>

            {/*  Author */}
            <div className="mb-2">
              {content.Author && (
                // <a href={content.Url} className="" rel="noreferrer" target="_blank">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                  by {content.Author}
                </p>
                // </a>
              )}
            </div>
          </div>

          {/*Tags*/}
          {Array.isArray(content.Tags) && (
            <div className="tags mb-1 mt-2 cursor-pointer text-yellow-500 dark:text-yellow-600">
              {content.Tags.map((tag, index) => (
                <Link
                  key={tag}
                  href={`/library/${content.ContentType}/filter/?tag=${tag}`}
                  passHref
                >
                  <button
                    className="lowercase decoration-yellow-500 hover:underline"
                    onClick={() => closeSearch()}
                  >
                    #{tag}
                    {index < content.Tags.length - 1 && <span>,&nbsp;</span>}
                  </button>
                </Link>
              ))}
            </div>
          )}

          {/*  Description */}
          <div className="text-gray-600 dark:text-gray-400">{content.Description}</div>
        </div>

        {/*  Actions */}
        <div className="flex  h-[60px] flex-row items-end justify-between pt-2 pb-5">
          <div>
            {mode === 'edit' ? (
              <button
                className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-400 dark:text-yellow-500 dark:hover:text-yellow-400"
                onClick={() => {
                  //closeSearch();
                  editContent(content);
                }}
              >
                <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Edit Data</span>
              </button>
            ) : (
              <Link href={`/newsletters/${content.SK}`} rel="noreferrer" passHref>
                <a className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500">
                  <InboxInIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">Read</span>
                </a>
              </Link>
            )}
          </div>

          {/* Copy Link Btn */}
          <div>
            <div className="flex flex-row items-end">
              <CopyLink content={content} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PlaylistContent = ({ imageUrl, content, mode, editContent, closeSearch }) => {
  return (
    <>
      <Link href={`/library/${content.ContentType}/video/${content.SK}`} passHref>
        <Image
          className="cursor-pointer rounded-t-lg object-cover hover:opacity-90"
          src={imageUrl}
          alt=""
          height="200"
          width="400"
          quality="100"
          placeholder="blur"
          blurDataURL={imageUrl}
          loader={myLoader}
        />
      </Link>
      <div className="px-5 pt-5">
        <div className="h-[275px] overflow-hidden">
          <div className="border-b-2 border-dashed border-gray-700 dark:border-gray-500">
            <div className="flex justify-between">
              {/*  Title */}

              {/* <Link href={`/library/${content.ContentType}/video/${content.SK}`} passHref> */}
              <p className="text-lg font-semibold text-gray-900  dark:text-gray-200 ">
                {content.Title}
              </p>
            </div>

            {/*  Author */}
            <div className="mb-2">
              {content.Author && (
                // <a href={content.Url} className="" rel="noreferrer" target="_blank">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                  by {content.Author}
                </p>
                // </a>
              )}
            </div>
          </div>

          {/*Tags*/}
          {Array.isArray(content.Tags) && (
            <div className="tags mb-1 mt-2 cursor-pointer text-yellow-500 dark:text-yellow-600">
              {content.Tags.map((tag, index) => (
                <Link
                  key={tag}
                  href={`/library/${content.ContentType}/filter/?tag=${tag}`}
                  passHref
                >
                  <button
                    className="lowercase decoration-yellow-500 hover:underline"
                    onClick={() => closeSearch()}
                  >
                    #{tag}
                    {index < content.Tags.length - 1 && <span>,&nbsp;</span>}
                  </button>
                </Link>
              ))}
            </div>
          )}

          {/*  Description */}
          <div className="text-gray-600 dark:text-gray-400">{content.Description}</div>
        </div>

        {/*  Actions */}
        <div
          className={classNames(
            'flex  flex-row items-end justify-between pt-2 pb-5',
            content.ContentType === 'newsletters' ? 'h-[60px]' : 'h-[40px]'
          )}
        >
          <div>
            {mode === 'edit' ? (
              <button
                className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-400 dark:text-yellow-500 dark:hover:text-yellow-400"
                onClick={() => {
                  //closeSearch();
                  editContent(content);
                }}
              >
                <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Edit Data</span>
              </button>
            ) : (
              <div>
                <Link href={`/library/${content.ContentType}/video/${content.SK}`} passHref>
                  <button
                    //onClick={() => closeSearch()}
                    className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
                  >
                    <FilmIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="font-medium">Watch</span>
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Copy Link Btn */}
          <div>
            <div className="flex flex-row items-end">
              <CopyLink content={content} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BaseContent = ({ imageUrl, content, mode, editContent, closeSearch }) => {
  let isExternalLink = tagList.externalContentTypes.includes(content.ContentType.toLowerCase());
  const badgeUrl =
    mode === 'search'
      ? `/library/${content.ContentType}`
      : `/library/${content.ContentType}/filter?badge=${content.SpecialTag}`;
  return (
    <>
      {isExternalLink ? (
        <Link className="focus:outline-none" href={content.Url}>
          <a className="focus:outline-none" target="_blank" rel="noreferrer">
            <div>
              <Image
                className="cursor-pointer rounded-t-lg object-cover hover:opacity-90"
                src={imageUrl}
                alt=""
                height="350"
                width="700"
                quality="100"
                placeholder="blur"
                blurDataURL={imageUrl}
                loader={myLoader}
              />
            </div>
          </a>
        </Link>
      ) : (
        <Link href={`/library/content/${content._id}`}>
          <Image
            className="cursor-pointer rounded-t-lg object-cover hover:opacity-90"
            src={imageUrl}
            alt=""
            height="200"
            width="400"
            quality="100"
            placeholder="blur"
            blurDataURL={imageUrl}
            loader={myLoader}
          />
        </Link>
      )}

      <div className="px-5 pt-5">
        <div className="h-[275px] overflow-hidden">
          <div className="border-b-2 border-dashed border-gray-700 dark:border-gray-500">
            <div className="flex justify-between">
              {/*  Title */}

              {/* <a href={content.Url} rel="noreferrer" target="_blank"> */}
              <p className="text-lg font-semibold text-gray-900  dark:text-gray-200 ">
                {content.Title}
              </p>
              {/* </a> */}

              {/*  Badge */}
              <Link href={badgeUrl} passHref>
                <div className="cursor-pointer hover:opacity-80" onClick={() => closeSearch()}>
                  {mode === 'search' ? (
                    <Badge text={content.ContentType} />
                  ) : (
                    <>{content.SpecialTag !== '0' && <Badge text={content.SpecialTag} />}</>
                  )}
                </div>
              </Link>
            </div>

            {/*  Author */}
            <div className="mb-2">
              {content.Author && (
                // <a href={content.Url} className="" rel="noreferrer" target="_blank">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                  by {content.Author}
                </p>
                // </a>
              )}
            </div>
          </div>

          {/*Tags*/}
          {Array.isArray(content.Tags) && (
            <div className="tags mb-1 mt-2 cursor-pointer text-yellow-500 dark:text-yellow-600">
              {content.Tags.map((tag, index) => (
                <Link
                  key={tag}
                  href={`/library/${content.ContentType}/filter/?tag=${tag}`}
                  passHref
                >
                  <button
                    className="lowercase decoration-yellow-500 hover:underline"
                    onClick={() => closeSearch()}
                  >
                    #{tag}
                    {index < content.Tags.length - 1 && <span>,&nbsp;</span>}
                  </button>
                </Link>
              ))}
            </div>
          )}

          {/*  Description */}
          <div className="text-gray-600 dark:text-gray-400">
            {ReactHtmlParser(content.Description)}
          </div>
        </div>

        {/*  Actions */}
        <div
          className={classNames(
            'flex  flex-row items-end justify-between pt-2 pb-5',
            content.ContentType === 'newsletters' ? 'h-[60px]' : 'h-[40px]'
          )}
        >
          <div>
            {mode === 'edit' ? (
              <button
                className="inline-flex items-center space-x-2 text-yellow-600 hover:text-yellow-400 dark:text-yellow-500 dark:hover:text-yellow-400"
                onClick={() => {
                  // closeSearch();
                  editContent(content);
                }}
              >
                <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Edit Data</span>
              </button>
            ) : (
              <Link href={`/library/content/${content._id}`}>
                {/* <a
                href={content.Url}
                rel="noreferrer"
                target="_blank"
                className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
              > */}
                <div className=" inline-flex cursor-pointer items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500">
                  <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">Open</span>
                </div>
                {/* </a> */}
              </Link>
            )}
          </div>

          {/* Copy Link Btn */}
          <div>
            <div className="flex flex-row items-end">
              <CopyLink content={content} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CardBase = ({ content, mode, editContent, closeSearch }) => {
  const imageUrl = defineImage(content);
  let CardTemplate;
  CardTemplate = (
    <BaseContent
      imageUrl={imageUrl}
      content={content}
      mode={mode}
      editContent={editContent}
      closeSearch={closeSearch}
    />
  );

  if (content.ContentType === 'newsletters') {
    CardTemplate = (
      <NewsLetterContent
        imageUrl={imageUrl}
        content={content}
        mode={mode}
        editContent={editContent}
        closeSearch={closeSearch}
      />
    );
  } else if (content.ContentType === 'playlist') {
    CardTemplate = (
      <PlaylistContent
        imageUrl={imageUrl}
        content={content}
        mode={mode}
        editContent={editContent}
        closeSearch={closeSearch}
      />
    );
  }

  return (
    <div className="flex max-h-[540px] min-w-[360px] max-w-[400px] flex-col rounded-lg border border-gray-300 bg-white shadow-lg hover:opacity-95 hover:shadow-yellow-500/30 dark:border-gray-700 dark:bg-gray-800 dark:hover:shadow-yellow-400/20">
      {CardTemplate}
    </div>
  );
};

export default memo(CardBase);
