import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw } from 'draft-js';

import ContentForm from '../components/publications/content-form';
import { Container } from '../components/layout';

const NotificationSuccess = dynamic(() => import('../components/notifications/success'));
export default function Submit() {
  const [data, setData] = useState({
    Title: '',
    Author: '',
    Description: EditorState.createEmpty(),
    Url: '',
    ImageUrl: '',
    Vertical: 'BNBChain',
    Tags: [],
    ContentType: '',
    SpecialTag: 'New',
    ContentStatus: 'submitted'
  });
  const [notifySuccess, setNotifySuccess] = useState(false);

  const metaTags = {
    title: 'BNBChainDev - Submit',
    description:
      'Propose new content to the platform. Submissions will be manually reviewed before deciding to publish them to the site.',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/submit`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="px-6">
        <main className="mx-auto mb-5 max-w-6xl shadow">
          <ContentForm
            type="submit"
            data={data}
            setData={setData}
            setNotifySuccess={setNotifySuccess}
          />
        </main>

        <NotificationSuccess
          show={notifySuccess}
          setShow={setNotifySuccess}
          text="Successfully submitted!"
          subText="Thank you"
        />
      </div>
    </Container>
  );
}
