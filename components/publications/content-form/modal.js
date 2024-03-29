import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import tagList from '../../../utils/tags';
import ContentForm from './index';
import VideoEditForm from './videoEditForm';
export default function Modal({ open, setOpen, content, positions }) {
  const [data, setData] = useState({});

  useEffect(() => {
    let difference = content.Tags?.filter(x => tagList.levelsInTags.includes(x));
    difference = difference ? difference : '';
    setData({
      PK: content.PK,
      SK: content.SK,
      Title: content.Title,
      Author: content.Author,
      Description: content.Description,
      ContentMarkdown: content.ContentMarkdown,
      Url: content.Url,
      ImageUrl: content.Img,
      Vertical: content.Vertical,
      Tags: content.Tags,
      ContentType: { label: content.ContentType, value: content.ContentType },
      currentLevel: difference[0],
      Level: { label: difference[0], value: difference[0] },
      ContentStatus: content.ContentStatus,
      SpecialTag: content.SpecialTag,
      Position: content.Position,
      Lists: content.Lists
    });
  }, [content]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setOpen(false)}
      >
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block max-w-4xl transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:p-6 sm:align-middle">
              {content.ContentType == 'playlist' ? (
                <VideoEditForm
                  type="edit"
                  setOpen={setOpen}
                  data={data}
                  setData={setData}
                  positions={positions}
                />
              ) : (
                <ContentForm
                  type="edit"
                  setOpen={setOpen}
                  data={data}
                  setData={setData}
                  positions={positions}
                />
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  content: PropTypes.object.isRequired,
  positions: PropTypes.array
};
