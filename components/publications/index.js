import { memo, useEffect, useState } from 'react';
import { useAppState } from '../../context/AppContext';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Loader from '../../components/Loader/Loader';

const CardWide = dynamic(() => import('../card/post-card'));
const CardVideo = dynamic(() => import('../card/card-video'));
const CardRegular = dynamic(() => import('../card/card-regular'));
const CardBase = dynamic(() => import('../card/card-base'));
const TagsSelector = dynamic(() => import('../badges/tags-selector'));
const ContentFormModal = dynamic(() => import('./content-form/modal'));
import htmlToDraft from 'html-to-draftjs';
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
  createWithContent
} from 'draft-js';

function Publications({
  data,
  title,
  contentType,
  isLoading,
  badges,
  tags,
  tagsList,
  closeSearch,
  cardMode,
  lastNewsletter
}) {
  const [open, setOpen] = useState(false);
  const appState = useAppState();
  const [content, setContent] = useState({});
  const [positions, setPositions] = useState([0]);

  useEffect(() => {
    // Definition list of positions for manual sort
    let positionsDraft = [0];
    let count = 1;
    for (let i = 0; i < data.length; i++) {
      if (data[i].Position === 0) continue;

      positionsDraft.push(count++);
    }
    positionsDraft.push(count);
    setPositions(positionsDraft);
  }, [data]);

  const editContent = data => {
    const contentBlock = htmlToDraft(data.ContentMarkdown);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    setContent({ ...data, ContentMarkdown: EditorState.createWithContent(contentState) });
    setOpen(true);
  };

  return (
    <div className="mx-auto flex flex-col">
      <div className="mb-8 flex justify-center">
        <h1 className="mb-10 w-max text-2xl font-bold capitalize tracking-tight text-gray-900 dark:text-gray-200 md:text-3xl 2xl:text-4xl">
          {title}
        </h1>
      </div>

      {/* Hiding Tags on video list */}
      {contentType !== 'playlist' && tags && (
        <div className="flex justify-center">
          <TagsSelector tagsList={tagsList} contentType={contentType} badges={badges} tags={tags} />
        </div>
      )}
      {contentType === 'newsletters' && (
        <div className="newsletter-main-card mx-auto mb-20 flex max-w-5xl">
          <CardWide mode="dashboard" content={lastNewsletter} />
        </div>
      )}
      {contentType === 'newsletters' && (
        <div className="prose mx-auto flex w-full justify-center text-xl dark:prose-invert">
          Previous Issues
        </div>
      )}
      <div className="newsletter-innerCard mt-1 flex flex-wrap place-content-start justify-center gap-5 py-4 px-2 md:px-6 xl:gap-10">
        {isLoading ? (
          <Loader />
        ) : (
          data.map(content => {
            //  Initial Tags for content type "Playlists" is null
            if (!content.Tags) content.Tags = [];

            if (content.ContentType !== 'Playlist') {
              return (
                <CardBase
                  key={content.SK}
                  content={content}
                  mode={appState.editMode == 'true' && cardMode !== 'search' ? 'edit' : cardMode}
                  editContent={editContent}
                  closeSearch={closeSearch}
                />
              );
            }

            // Playlist Content
            return (
              <div key={content.SK}>
                <CardVideo content={content} closeSearch={closeSearch} />
              </div>
            );
          })
        )}
      </div>
      <ContentFormModal open={open} setOpen={setOpen} content={content} positions={positions} />
    </div>
  );
}

Publications.defaultProps = {
  tags: [],
  badges: [],
  tagsList: [],
  title: '',
  contentType: '',
  cardMode: '',
  lastNewsletter: {}
};

Publications.propTypes = {
  data: PropTypes.array.isRequired,
  type: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  badges: PropTypes.array,
  tags: PropTypes.array,
  title: PropTypes.string,
  tagsList: PropTypes.array,
  contentType: PropTypes.string,
  closeSearch: PropTypes.func,
  cardMode: PropTypes.string,
  lastNewsletter: PropTypes.object
};

export default memo(Publications);
