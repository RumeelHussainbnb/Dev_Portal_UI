import { useEffect } from 'react';
import {
  HeartIcon as Liked,
  DocumentTextIcon,
  PlayIcon,
  ExternalLinkIcon,
  FilmIcon,
  EyeOffIcon,
  InboxInIcon
} from '@heroicons/react/solid';
import { HeartIcon as Unliked, ChatIcon, ShareIcon } from '@heroicons/react/outline';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { memo } from 'react';
import defineImage from '../../utils/content-imagen';
import Audio from '../audio';
import { useState } from 'react';
import { http } from '../../utils/http';
import ReactHtmlParser from 'react-html-parser';
const Notification = dynamic(() => import('../notifications/error'));
import { useAppDispatch, useAppState } from '../../context/AppContext';

const Badge = dynamic(() => import('../badges/badge.js'));
const CopyLink = dynamic(() => import('./copy-link.js'));

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
const myLoader = ({ src, width, quality }) => {
  return `${src}`;
};

function PostWide({ content, mode }) {
  const [isS3Audio, setIsS3Audio] = useState(false);
  const [contentState, setContentState] = useState(content);
  const [notification, setNotification] = useState({ message: '', show: false });
  const imageUrl = defineImage(content);
  const appState = useAppState();

  // Perform localStorage action & Like
  useEffect(() => {
    setContentState({
      ...contentState,
      isLiked: contentState?.LikedBy.includes(appState.publicKey)
    });
  }, [appState.publicKey]);

  const likeContent = async event => {
    event.preventDefault();

    if (!appState.publicKey) {
      setNotification({ message: 'Please Connect Wallet', show: true });
      setTimeout(() => {
        setNotification({ message: 'Please Connect Wallet', show: false });
      }, 1500);
    } else {
      content.PublicKey = localStorage.getItem('PublicKey');
      try {
        const response = await http.post(`/content/like`, content);
        if (response?.data?.success === true) {
          // This is th eblock where icon will be turned yellow
          setContentState({
            ...response.data?.data,
            isLiked: response.data?.data?.LikedBy.includes(localStorage.getItem('PublicKey'))
          });
        }
      } catch (error) {
        console.log('Error ', error);
      }
    }
  };

  const handleViewApi = async event => {
    let publicKey = localStorage.getItem('PublicKey' || '{}');
    let param = {
      _id: content._id,
      PublicKey: publicKey
    };
    try {
      const response = await http.post(`/content/view`, param);
      //    if (response?.data?.success === true) {

      // }
    } catch (error) {
      console.log('Error ', error);
    }
  };

  let audioPlayer = '';
  if (contentState.Url) audioPlayer = contentState.Url.includes('bnbchain-twitter-spaces');

  function actionButton() {
    if (contentState.Url && contentState.Url.includes('youtube')) {
      return (
        <div>
          <Link href={`/library/${contentState.ContentType}/video/${contentState.SK}`} passHref>
            <button className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500">
              <FilmIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Watch</span>
            </button>
          </Link>
        </div>
      );
    } else if (contentState.Url && contentState.Url.includes('bnbchain-twitter-spaces')) {
      return (
        <div>
          <button
            onClick={() => setIsS3Audio(!isS3Audio)}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
          >
            {isS3Audio ? (
              <>
                <EyeOffIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Hidde Player</span>
              </>
            ) : (
              <>
                <PlayIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Show Player</span>
              </>
            )}
          </button>
        </div>
      );
    } else {
      return (
        <>
          {contentState.ContentType === 'newsletters' ? (
            <Link href={`/newsletters/${contentState.SK}`} rel="noreferrer" passHref>
              <a className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500">
                <InboxInIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Read</span>
              </a>
            </Link>
          ) : (
            <a
              href={contentState.Url}
              rel="noreferrer"
              target="_blank"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
            >
              <ExternalLinkIcon className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">Open</span>
            </a>
          )}
        </>
      );
    }
  }

  return (
    <div
      onClick={handleViewApi}
      className={classNames(
        'flex min-h-full flex-col rounded-lg bg-white dark:bg-gray-800',
        mode === 'dashboard' &&
          'border border-gray-300 shadow-lg hover:opacity-95 hover:shadow-yellow-500/30 dark:border-gray-700/60 dark:hover:shadow-yellow-400/20'
      )}
    >
      {imageUrl && contentState.ContentType === 'newsletters' ? (
        <Link href={`/newsletters/${contentState.SK}`} rel="noreferrer" passHref>
          <a className="focus:outline-none">
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
        <Link href={`/library/content/${contentState._id}`}>
          {/* <a href={contentState.Url} className="focus:outline-none" target="_blank" rel="noreferrer"> */}
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
        </Link>
      )}

      <div className="px-5 pt-4 pb-5 ">
        <div className="border-b-2 border-dashed border-gray-700 dark:border-gray-500 ">
          {/*  Author */}
          <div className="mb-2">
            {contentState.Author && (
              <div className="flex flex-row items-center gap-x-1">
                <div className="col-span-12 sm:col-span-4 lg:col-span-10">
                  <div className=" h-10 w-10 rounded-full">
                    <Image src="/martianImage.png" alt="" height={'40px '} width={'40px '} />
                  </div>
                  {/* <img className="" src="/martianImage.png" alt="" /> */}
                </div>
                <a href={contentState.Url} className="" rel="noreferrer" target="_blank">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                    by {contentState.Author}
                  </p>
                </a>
              </div>
            )}
          </div>
          <div className="flex justify-between ">
            {/*  Title */}
            {contentState.ContentType === 'newsletters' ? (
              // <Link href={`/newsletters/${content.SK}`} rel="noreferrer" passHref>
              //   <a className="mr-2 focus:outline-none">
              <p className="text-lg font-semibold text-gray-900  dark:text-gray-200 ">
                {contentState.Title}
              </p>
            ) : (
              //   </a>
              // </Link>
              // <a
              //   href={content.Url}
              //   className="mr-2 focus:outline-none"
              //   target="_blank"
              //   rel="noreferrer"
              // >
              <p className="text-lg font-semibold text-gray-900  dark:text-gray-200 ">
                {contentState.Title}
              </p>
              // </a>
            )}

            {/*  Content Type */}
            {contentState.ContentType !== 'newsletters' && (
              <Link href={`/library/${contentState.ContentType}`} passHref>
                <div className="cursor-pointer hover:opacity-80">
                  <Badge text={contentState.ContentType} />
                </div>
              </Link>
            )}
          </div>
        </div>

        {/*Tags*/}
        {Array.isArray(contentState.Tags) && (
          <div className="mb-1 mt-2 cursor-pointer text-yellow-500 dark:text-yellow-600">
            {contentState.Tags.map((tag, index) => (
              <Link
                key={tag}
                href={`/library/${contentState.ContentType}/filter/?tag=${tag}`}
                passHref
              >
                <button className="lowercase decoration-yellow-500 hover:underline">
                  #{tag}
                  {index < contentState.Tags.length - 1}
                </button>
              </Link>
            ))}
          </div>
        )}

        {/*  Description */}
        <div
          className={classNames(
            'prose flex-none overflow-hidden text-ellipsis',
            audioPlayer ? 'min-h-[85px]' : 'min-h-[125px]'
          )}
        >
          <div className="text-gray-600 dark:text-gray-400">
            {ReactHtmlParser(content.Description)}
          </div>
        </div>

        {audioPlayer && (
          <div className="mb-5 h-[35px]">{isS3Audio && <Audio url={contentState.Url} />}</div>
        )}

        {/*  Actions */}
        <div className="flex h-[40px] flex-row  gap-x-2 pt-2">
          {/* <div class="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500">
              <Liked className="h-6 w-6 fill-yellow-500" aria-hidden="true" />
            </div> */}
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500"
            onClick={likeContent}
          >
            {contentState.isLiked ? (
              <Liked className="h-6 w-6 fill-yellow-500" aria-hidden="true" />
            ) : (
              <Unliked
                className="h-5 w-5 stroke-gray-500 hover:fill-yellow-500 hover:stroke-yellow-500"
                aria-hidden="true"
              />
            )}
          </div>

          {/* <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500">
            <ChatIcon
              className="h-5 w-5 stroke-gray-500 hover:fill-yellow-500 hover:stroke-yellow-500"
              aria-hidden="true"
            />
          </div> */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500">
            <CopyLink content={content} />
          </div>
          {/* Old JSX */}
          {/* <div>{actionButton()}</div> */}

          {/* Copy Link Btn */}
          {/* <div>
            <div className="flex flex-row items-end">
              <CopyLink content={content} />
            </div>
          </div> */}
        </div>
      </div>
      <Notification
        show={notification.show}
        setShow={isShow => setNotification({ message: '', show: isShow })}
        text={notification.message}
      />
    </div>
  );
}

PostWide.propTypes = {
  content: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};

export default memo(PostWide);
