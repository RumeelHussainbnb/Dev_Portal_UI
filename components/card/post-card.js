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
  import axios from "../../utils/http";
  

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
    const imageUrl = defineImage(content);
  
    const likeContent = async (event) => {
        event.preventDefault();
        content.PublicKey = localStorage.getItem('PublicKey');
        try{
          const response = await axios.post(`/content/like`, content);
          if (response?.data?.success === true) {
            // This is th eblock where icon will be turned yellow
            console.log("Post liked");

          }
        }catch(error){
          console.log("Error ", error);
        }
        // If the user is an admin, content will be active by default
        // Send success notification
      };

    let audioPlayer = '';
    if (content.Url) audioPlayer = content.Url.includes('bnbchain-twitter-spaces');
  
    function actionButton() {
      if (content.Url && content.Url.includes('youtube')) {
        return (
          <div>
            <Link href={`/library/${content.ContentType}/video/${content.SK}`} passHref>
              <button className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500">
                <FilmIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium">Watch</span>
              </button>
            </Link>
          </div>
        );
      } else if (content.Url && content.Url.includes('bnbchain-twitter-spaces')) {
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
            {content.ContentType === 'newsletters' ? (
              <Link href={`/newsletters/${content.SK}`} rel="noreferrer" passHref>
                <a className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500">
                  <InboxInIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium">Read</span>
                </a>
              </Link>
            ) : (
              <a
                href={content.Url}
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
        className={classNames(
          'flex min-h-full flex-col rounded-lg bg-white dark:bg-gray-800',
          mode === 'dashboard' &&
            'border border-gray-300 shadow-lg hover:opacity-95 hover:shadow-yellow-500/30 dark:border-gray-700/60 dark:hover:shadow-yellow-400/20'
        )}
      >
        {imageUrl && content.ContentType === 'newsletters' ? (
          <Link href={`/newsletters/${content.SK}`} rel="noreferrer" passHref>
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
          <a href={content.Url} className="focus:outline-none" target="_blank" rel="noreferrer">
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
        )}
  
        <div className="px-5 pt-4 pb-5 ">
          <div className="border-b-2 border-dashed border-gray-700 dark:border-gray-500 ">
            {/*  Author */}
            <div className="mb-2">
              {content.Author && (
                <div className="flex flex-row items-center gap-x-1">
                  <div className="col-span-12 sm:col-span-4 lg:col-span-10">
                    <Image className=" h-10 w-10 rounded-full" src="/martianImage.png" alt="" />
                  </div>
                  <a href={content.Url} className="" rel="noreferrer" target="_blank">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-500">
                      by {content.Author}
                    </p>
                  </a>
                </div>
              )}
            </div>
            <div className="flex justify-between ">
              {/*  Title */}
              {content.ContentType === 'newsletters' ? (
                // <Link href={`/newsletters/${content.SK}`} rel="noreferrer" passHref>
                //   <a className="mr-2 focus:outline-none">
                <p className="text-lg font-semibold text-gray-900  dark:text-gray-200 ">
                  {content.Title}
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
                  {content.Title}
                </p>
                // </a>
              )}
  
              {/*  Content Type */}
              {content.ContentType !== 'newsletters' && (
                <Link href={`/library/${content.ContentType}`} passHref>
                  <div className="cursor-pointer hover:opacity-80">
                    <Badge text={content.ContentType} />
                  </div>
                </Link>
              )}
            </div>
          </div>
  
          {/*Tags*/}
          {Array.isArray(content.Tags) && (
            <div className="mb-1 mt-2 cursor-pointer text-yellow-500 dark:text-yellow-600">
              {content.Tags.map((tag, index) => (
                <Link key={tag} href={`/library/${content.ContentType}/filter/?tag=${tag}`} passHref>
                  <button className="lowercase decoration-yellow-500 hover:underline">
                    #{tag}
                    {index < content.Tags.length - 1 && <span>,&nbsp;</span>}
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
            <p className="text-gray-600 dark:text-gray-400">{content.Description}</p>
          </div>
  
          {audioPlayer && (
            <div className="mb-5 h-[35px]">{isS3Audio && <Audio url={content.Url} />}</div>
          )}
  
          {/*  Actions */}
          <div className="flex h-[40px] flex-row  gap-x-2 pt-2">
            {/* <div class="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500">
              <Liked className="h-6 w-6 fill-yellow-500" aria-hidden="true" />
            </div> */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500"
            onClick={ likeContent }
            >
              <Unliked
                className="h-5 w-5 stroke-gray-500 hover:fill-yellow-500 hover:stroke-yellow-500"
                aria-hidden="true"
              />
            </div>
  
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500">
              <ChatIcon
                className="h-5 w-5 stroke-gray-500 hover:fill-yellow-500 hover:stroke-yellow-500"
                aria-hidden="true"
              />
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-500">
              <ShareIcon
                className="h-5 w-5 stroke-gray-500 hover:fill-yellow-500 hover:stroke-yellow-500"
                aria-hidden="true"
              />
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
      </div>
    );
  }
  
  PostWide.propTypes = {
    content: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired
  };
  
  export default memo(PostWide);
  