import { Grid, Spacer } from '@nextui-org/react';
import { useState } from 'react';

//local imports
import { Container } from '../components/layout';
import GridContainer from '../components/tool/GridContainer';

export default function BNBDevTools() {
  const metaTags = {
    title: 'BNBChainDev - DevTools',
    description: 'BNB Chain Dev Tools',
    //url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/submit`,
    shouldIndex: true
  };

  const [selectedItem, setSelectedItem] = useState(undefined);

  const handleShowModal = item => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(false);
  };

  return (
    <Container metaTags={metaTags}>
      <div className='relative z-0 mt-2 w-11/12 divide-gray-200 rounded-md bg-white p-4 p-2 text-sm text-gray-500 shadow dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-500'>
        <div className='tools-page overflow-hidden'>

        <Grid>
          <div className="px-4 sm:px-6 tools-wrapper">
            <h2 className="text-center text-lg-4xl font-bold capitalize tracking-wide text-gray-800 dark:text-gray-300">
              BNB Chain Developer <br /> Tooling Landscape
            </h2>
          </div>
        </Grid>

        <div className="px-4 sm:px-6">
          <Spacer y="1" />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            Development
          </h2>
          <Spacer y="1" />
          <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
            Solidity Code Quality
          </h3>

          <GridContainer
            groupTitle="Solidity Code Quality"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={0.5} />
          <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
            Front-End Programming
          </h3>
          <GridContainer
            groupTitle="Front-End Programming"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />

          <Spacer y={0.5} />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={0.5} />
          <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
            Back-End Programming
          </h3>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Back-End Programming"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={0.5} />
          <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
            IDE
          </h3>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="IDE"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={0.5} />
          <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
            Development Frameworks
          </h3>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Development Framework"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={0.5} />
          <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
            Wallet SDK
          </h3>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Wallet SDK"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={0.5} />
          <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
            MPC Wallet/Multisig
          </h3>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="MPC Wallets/Multisig"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y="1" />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            Decentralized Storage
          </h2>
          <GridContainer
            groupTitle="Decentralized Storage"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y="1" />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            Data Oracles
          </h2>
          <GridContainer
            groupTitle="Data Oracles"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={1} />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            Blockchain Access
          </h2>
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={0.5} />
          <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
            Block Explorers
          </h3>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Block Explorers"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={0.5} />
          <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
            Node and Archive Services
          </h3>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Node and Archive Services"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={0.5} />
          <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
            NFT Tools
          </h3>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="NFT Tools"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={0.5} />
          <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
            Data Indexing
          </h3>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Data Indexing"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={1} />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            Browser
          </h2>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Browser"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={1} />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            Gasless Solutions
          </h2>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Gasless Solutions"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={1} />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            Security Audit
          </h2>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Security Audit"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={1} />
          <h2 className="text-left text-2xl font-bold tracking-wide text-gray-700 dark:text-gray-300">
            Analytics and Dashboards
          </h2>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Analytics & Dashboards"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={1} />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            Payment Gateways
          </h2>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Payment Gateway"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={1} />
          <h2 className="text-left text-2xl font-bold tracking-wide text-gray-700 dark:text-gray-300">
            DAO Tools
          </h2>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="DAO Tools"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={1} />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            Gaming Tools
          </h2>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Gaming Tools"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={0.5} />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            Decentralized Identity/Social Graph
          </h2>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Decentralized Identity/Social Graph"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={1} />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            NFT Marketplace
          </h2>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="NFT Marketplace"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={1} />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            Cross-Chain Bridges
          </h2>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Cross-chain Bridges"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={1} />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            Wallets
          </h2>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Wallets"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>

        <div className="px-4 sm:px-6">
          <Spacer y={1} />
          <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
            Dapp Store
          </h2>
          <Spacer y={0.5} />
          <GridContainer
            groupTitle="Dapp Store"
            selectedItem={selectedItem}
            handleCloseModal={handleCloseModal}
            handleShowModal={handleShowModal}
          />
        </div>
        </div>
      </div>
    </Container>
  );
}
