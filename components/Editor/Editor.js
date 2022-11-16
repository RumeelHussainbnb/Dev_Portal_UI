import React from 'react';
import dynamic from 'next/dynamic';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(() => import('react-draft-wysiwyg').then(mod => mod.Editor), { ssr: false });

const EditorComponent = ({ editorState, EditorChange }) => {
  return (
    <Editor
      toolbar={{
        blockType: {
          inDropdown: true,
          options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
          className: undefined,
          component: undefined,
          dropdownClassName: undefined
        }
      }}
      stripPastedStyles={true}
      editorState={editorState}
      toolbarClassName="dark:bg-gray-800 "
      toolbarStyle={{ border: '1px solid #4b5563' }}
      wrapperClassName=""
      editorClassName="block w-full  rounded-md border border-gray-300 py-3 px-4 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-500 dark:bg-gray-400 dark:text-gray-800"
      onEditorStateChange={EditorChange}
    />
  );
};

export default EditorComponent;
