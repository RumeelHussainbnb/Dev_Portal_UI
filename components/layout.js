import Head from 'next/head';
import PropTypes from 'prop-types';

import Nav from './nav';

export function Container({ children, metaTags }) {
  return (
    <div>
      <Head>
        <title>{metaTags.title}</title>
        <meta name="title" content={metaTags.title} />
        <meta name="description" content={metaTags.description} />

        {/* Google */}
        {metaTags.shouldIndex ? (
          <>
            {' '}
            <meta name="robots" content="index,follow,noodp" />
            <meta name="googlebot" content="index,follow" />
          </>
        ) : (
          <>
            <meta name="robots" content="noindex" />
            <meta name="googlebot" content="noindex" />
          </>
        )}

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={metaTags.url} />
        <meta property="og:title" content={metaTags.title} />
        <meta property="og:description" content={metaTags.description} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@BNBCHAIN" />
        <meta name="twitter:creator" content="@RumeelHussain" />
        <meta name="twitter:url" content={metaTags.url} />
        <meta name="twitter:title" content={metaTags.title} />
        <meta name="twitter:description" content={metaTags.description} />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav>{children}</Nav>
    </div>
  );
}

Container.propTypes = {
  metaTags: PropTypes.object.isRequired
};
