import { useState } from 'react';
import { toast } from 'react-toastify';
import { EditorState } from 'draft-js';

import ContentForm from '../components/publications/content-form';
import { Container } from '../components/layout';

export default function Submit() {
  const [data, setData] = useState({
    Title: '',
    Author: '',
    Description: '',
    ContentMarkdown: EditorState.createEmpty(),
    Url: '',
    Level: {},
    ImageUrl: '',
    Vertical: 'BNBChain',
    Tags: [],
    ContentType: '',
    SpecialTag: 'New',
    ContentStatus: 'submitted'
  });

  const metaTags = {
    title: 'BNBChainDev - Submit',
    description:
      'Propose new content to the platform. Submissions will be manually reviewed before deciding to publish them to the site.',
    url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/submit`,
    shouldIndex: true
  };

  return (
    <Container metaTags={metaTags}>
      <div className="w-full">
        <main className="submit-wrapper mx-auto mb-5 max-w-6xl shadow">
          <ContentForm
            type="submit"
            data={data}
            setData={setData}
            setNotifySuccess={() => toast.success('Successfully posted!, Thank you')}
          />
        </main>
      </div>
    </Container>
  );
}
