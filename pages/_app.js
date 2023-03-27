import Router from 'next/router';
import { useState, useEffect } from 'react';
import NextNProgress from 'nextjs-progressbar';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import '../style.css';
import '../styles.scss';
import Script from 'next/script';
import { AppWrapper } from '../context/AppContext';
import Loader from '../components/Loader/Loader';

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  return library;
}

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    Router.events.on('routeChangeStart', url => {
      setIsLoading(true);
    });

    Router.events.on('routeChangeComplete', url => {
      setIsLoading(false);
    });

    Router.events.on('routeChangeError', url => {
      setIsLoading(false);
    });
  }, [Router]);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Script id="google-taag-manager" strategy="afterInteractive">
        {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5PHXRNS');
          `}
      </Script>
      <Web3ReactProvider getLibrary={getLibrary}>
        <AppWrapper>
          {isLoading && <Loader />}
          {/* <NextNProgress /> */}
          <Component {...pageProps} />
          <ToastContainer
            position={'top-right'}
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            newestOnTop={true}
          />
        </AppWrapper>
      </Web3ReactProvider>
    </div>
  );
}
