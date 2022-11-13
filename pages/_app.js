import '../style.css';

import { AppWrapper } from '../context/AppContext';

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  return library
}

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Web3ReactProvider getLibrary={getLibrary}>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </Web3ReactProvider>
    </div>
  );
}
