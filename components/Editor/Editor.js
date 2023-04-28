import React from 'react';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { http } from '../../utils/http';

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

const EditorComponent = ({ editorState, EditorChange, readOnly = false }) => {
  const uploadCallbackk = (file, callback) => {
    return new Promise((resolve, reject) => {
      const reader = new window.FileReader();
      reader.onloadend = async () => {
        //file Validation Extentions
        let allowedExtensions = ['jpg', 'jpeg', 'png'];
        const filename = file.name;
        let parts = filename.split('.');
        const fileType = parts[parts.length - 1];
        if (allowedExtensions.includes(fileType)) {
          const response = await http.get(`/martian/s3Url`);
          const imageResponse = await fetch(response.data.url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            body: file
          });
          const imageUrl = response.data.url.split('?')[0];
          // console.log('imageUrl ==> ', imageUrl);
          resolve({ data: { link: imageUrl } });
        }
        // console.log('file ==> ', file);
        // const form_data = new FormData();
        // form_data.append('file', file);
        //const res = await uploadFile(form_data);
        // setValue('thumbnail', res.data);
        // resolve({ data: { link: process.env.REACT_APP_API + res.data } });
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <Editor
      readOnly={readOnly}
      toolbar={{
        blockType: {
          inDropdown: true,
          options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
          className: undefined,
          component: undefined,
          dropdownClassName: undefined
        },

        image: {
          previewImage: true,
          uploadCallback: uploadCallbackk
        }
      }}
      handlePastedText={() => false}
      editorState={editorState}
      toolbarClassName="dark:bg-gray-800 "
      toolbarStyle={{ border: '1px solid #4b5563' }}
      wrapperClassName="demo-wrapper"
      editorClassName="video-container block w-full !h-80 rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800 overflow-visible overflow-y-auto"
      onEditorStateChange={EditorChange}
    />
  );
};

export default EditorComponent;
