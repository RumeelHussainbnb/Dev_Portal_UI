import { memo, useState } from 'react';
import { ShareIcon } from '@heroicons/react/outline';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const NotificationSuccess = dynamic(() => import('../notifications/success'));

function CopyLink({ content }) {
  const [showNotification, setShowNotification] = useState(false);

  let url = '';
  if (content.ContentType === 'playlist') {
    url = `${process.env.HOME_URL}/library/${content?.PlaylistID}/video/${content?.SK}`;
  } else if (content?.ContentType === 'newsletters') {
    url = `${process.env.HOME_URL}/newsletters/${content?.SK}`;
  } else {
    url = `${process.env.HOME_URL}/library/${content?.ContentType}/${content?.SK}`;
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-400 dark:text-gray-300 dark:hover:text-gray-500"
        onClick={() => {
          navigator.clipboard.writeText(url ? url : '');
          setShowNotification(true);
        }}
      >
        <ShareIcon
          className="h-5 w-5 stroke-gray-500 hover:fill-yellow-500 hover:stroke-yellow-500"
          aria-hidden="true"
        />
      </button>

      <NotificationSuccess
        type="link"
        show={showNotification}
        setShow={setShowNotification}
        text="Link copied successfully"
        subText={`The link to: ${content.Title} was copied to the clipboard.`}
      />
    </>
  );
}

CopyLink.propTypes = {
  content: PropTypes.object.isRequired
};

export default memo(CopyLink);
