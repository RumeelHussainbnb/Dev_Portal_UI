import '../style.css';
import { AppWrapper } from '../context/AppContext';
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import Script from 'next/script';

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  return library
}

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-YJHYYK44RJ`} />

      <Script strategy="lazyOnload"
       id='google-analytics'
       dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YJHYYK44RJ', {
          page_path: window.location.pathname,
        });
        `,
        }}
      />

        <Web3ReactProvider getLibrary={getLibrary}>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </Web3ReactProvider>
    </div>
  );
}
