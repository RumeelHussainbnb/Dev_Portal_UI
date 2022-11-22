import { Grid, Text, Spacer, Button, Image } from '@nextui-org/react';
import { Container } from '../components/layout';
import { useState } from 'react';

export default function BNBDevTools() {
  const list = [
    {
      category: 'Analytics & Dashboards',
      name: 'Dune',
      desc: 'Blockchain ecosystem analytics by and for the community',
      website: 'http://dune.com/',
      groupTitle: '',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Dune.png?v=3'
    },
    {
      category: 'Analytics & Dashboards',
      groupTitle: '',
      name: 'YieldWatch',
      desc: 'Track your Yield Farming and Liquidity Pool performance on BNB Chain',
      website: 'https://www.yieldwatch.net/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/YieldWatch.png?v=3'
    },
    {
      category: 'Analytics & Dashboards',
      groupTitle: '',
      name: 'Defistation',
      desc: 'Defi dashboard',
      website: 'https://www.defistation.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Defistation.png?v=3'
    },
    {
      category: 'Analytics & Dashboards',
      groupTitle: '',
      name: 'Bitquery',
      desc: 'GraphQL explorer of Binance Chain data',
      website: 'https://bitquery.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Bitquery.png?v=3'
    },
    {
      category: 'Analytics & Dashboards',
      groupTitle: '',
      name: 'DeBank',
      desc: 'A multi-chain portfolio tracker that supports the largest number of DeFi protocols',
      website: 'http://debank.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/DeBank.png?v=3'
    },
    {
      category: 'Analytics & Dashboards',
      groupTitle: '',
      name: 'Bloxy',
      desc: 'One stand data source for understanding Binance DEX',
      website: 'http://bloxy.info/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Bloxy.png?v=3'
    },
    {
      category: 'Analytics & Dashboards',
      groupTitle: '',
      name: 'Footprint Analytics',
      desc: 'Blockchain analytics',
      website: 'https://www.footprint.network/about',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Footprint%20Analytics.png?v=3'
    },
    {
      category: 'Analytics & Dashboards',
      groupTitle: '',
      name: 'Web3Go',
      desc: 'Web3Go is an all-in-one open data analytics and service platform where everyone can grasp the value behind blockchain data',
      website: 'https://web3go.xyz/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Web3Go.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Block Explorers',
      name: 'BscScan',
      desc: 'Blockchain explorer of BNB Chain',
      website: 'https://bscscan.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/BscScan.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Block Explorers',
      name: 'BSCTrace',
      desc: 'Blockchain explorer of BNB Chain from NodeReal',
      website: 'https://bsctrace.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/BSCTrace.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Block Explorers',
      name: 'MINTSCAN',
      desc: 'A fast explorer for the Beacon Chain',
      website: 'https://binance.mintscan.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/MINTSCAN.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Node and Archive Services',
      name: 'NodeReal',
      desc: 'The ultimate and fastest Web3 infrastructure solution on BNB Chain, ETH, Polygon and Aptos',
      website: 'https://nodereal.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/NodeReal.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Node and Archive Services',
      name: 'Ankr',
      desc: 'Ankr provides builders with streamlined access to a global network of nodes running on 18 different blockchains',
      website: 'https://ankr.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Ankr.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Node and Archive Services',
      name: 'Chainstack',
      desc: 'From startups to large enterprises, thousands of businesses of all sizes use Chainstack’s software and APIs to build, run, and scale blockchain applications',
      website: 'https://chainstack.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Chainstack.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Node and Archive Services',
      name: 'NowNodes',
      desc: 'Get your crypto API for instant access to 40+ blockchain networks including BTC, ETH, and BSC which is over 1000 coins and tokens',
      website: 'https://nownodes.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/NowNodes.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Node and Archive Services',
      name: 'QuickNode',
      desc: 'They make it simple to build blockchain applications and scale up as you grow. From elastic APIs to powerful tools and analytics, all at your command through a simple control panel',
      website: 'http://quicknode.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/QuickNode.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Node and Archive Services',
      name: 'BlockVision',
      desc: 'BlockVision is a one-stop development platform and on-chain data retrieval portal for developers that boasts impressively low-latencies and high availability',
      website: 'https://blockvision.org/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/BlockVision.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Node and Archive Services',
      name: 'Covalent',
      desc: 'Covalent provides a unified API bringing visibility to billions of Web3 data points',
      website: 'https://www.covalenthq.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Covalent.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Node and Archive Services',
      name: 'InfStones',
      desc: "InfStones' easy-to-use blockchain infrastructure.",
      website: 'https://infstones.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/InfStones.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Node and Archive Services',
      name: 'Moralis',
      desc: 'Moralis provides APIs, SDKs and Data for building high performance dapps. Integrate Web3 into any tech stack',
      website: 'http://moralis.io',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Moralis.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Node and Archive Services',
      name: 'Gomu',
      desc: 'NFT API',
      website: 'https://www.gomu.co/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Gomu.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Node and Archive Services',
      name: 'Bounce Finance',
      desc: 'NFT API and Web3 marketplace',
      website: 'https://bounce.finance/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Bounce%20Finance.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'NFT Tools',
      name: 'NFTScan',
      desc: 'The NFTScan API helps developers build new experiences retrieving NFTs and data analysis. We provide a set of endpoints that enable you to fetch ERC721 and ERC1155 NFT assets as well as transactions, collections, marketplace statistics and more',
      website: 'https://nftscan.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/NFTScan.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'NFT Tools',
      name: 'BlockVision',
      desc: 'BlockVision synchronizes and integrates core NFT marketplace data such as OpenSea and LooksRare, just to let you save everything while developing NFT applications',
      website: 'https://blockvision.org/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/BlockVision.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'NFT Tools',
      name: 'Venly',
      desc: 'Unity plugin, NFT to email, Shopify-app, NFT API, NFT analytics, NFT minter',
      website: 'https://www.venly.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Venly.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'NFT Tools',
      name: 'NFTrade',
      desc: "Aggreagator & shared orderbook SDK, ability to buy NFTs with other chain's native token",
      website: 'https://nftrade.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/NFTrade.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Data Indexing',
      name: 'PARSIQ',
      desc: 'Raw onchain data indexing, monitoring and intelligence platform',
      website: 'https://www.parsiq.net/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/PARSIQ.png?v=3'
    },
    {
      category: 'Blockchain Access',
      groupTitle: 'Data Indexing',
      name: 'Nakji',
      desc: 'Data indexing protocol for BNB Chain, mainly for DeFi, NFTs soon',
      website: 'https://nakji.network/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Nakji.png?v=3'
    },
    {
      category: 'Cross-chain Bridges',
      groupTitle: '',
      name: 'Celer cBridge',
      desc: 'cBridge introduces the best-in-class cross-chain token bridging experience with deep liquidity for users, highly efficient and easy-to-use liquidity management for both cBridge node operators and Liquidity Providers who do not want to operate cBridge nodes, and new exciting developer-oriented features such as general message bridging for cases like cross-chain DEX and NFTs',
      website: 'https://cbridge.celer.network/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Celer%20cBridge.png?v=3'
    },
    {
      category: 'Cross-chain Bridges',
      groupTitle: '',
      name: 'Multichain',
      desc: 'Multichain is the ultimate Router for Web3. It is an infrastructure developed for arbitrary cross-chain interactions',
      website: 'https://multichain.org/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Multichain.png?v=3'
    },
    {
      category: 'Cross-chain Bridges',
      groupTitle: '',
      name: 'LayerZero',
      desc: 'LayerZero is an omnichain interoperability protocol designed for lightweight message passing across chains',
      website: 'https://layerzero.network/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/LayerZero.png?v=3'
    },
    {
      category: 'Cross-chain Bridges',
      groupTitle: '',
      name: 'ChainHop',
      desc: 'ChainHop is a composable multi-chain liquidity network that facilitates multi-chain-native dApps, such as cross-chain DEX, cross-chain lending, etc. Built with the advanced multi-chain interoperability protocols, ChainHop unifies segmented liquidity across different chain and provides users & developer with a truly streamlined multi-chain experience',
      website: 'https://chainhop.exchange/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/ChainHop.png?v=3'
    },
    {
      category: 'Cross-chain Bridges',
      groupTitle: '',
      name: 'Ren Project',
      desc: 'Ren is an open and community-driven protocol that enables the movement of value between blockchains',
      website: 'https://github.com/renproject/ren/wiki/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Ren%20Project.png?v=3'
    },
    {
      category: 'Cross-chain Bridges',
      groupTitle: '',
      name: 'HashFlow',
      desc: 'Bridgeless cross-chain swaps',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tool/icons/HashFlow.png?v=3',
      website: 'https://www.hashflow.com/'
    },
    {
      category: 'Browser',
      groupTitle: '',
      name: 'Opera',
      desc: 'Web3 dedicated browser for desktop and mobile',
      website: 'https://www.opera.com/crypto/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Opera.png?v=3'
    },
    {
      category: 'DAO Tools',
      groupTitle: '',
      name: 'Tally',
      desc: 'Tally is a DAO operations platform',
      website: 'https://www.tally.xyz/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Tally.png?v=3'
    },
    {
      category: 'DAO Tools',
      groupTitle: '',
      name: 'Collab.Land',
      desc: 'Collab.Land leverages the power of identity through crypto currency to create a social space unique to a specific network of humans. Once you add the bot to your Telegram group or Discord guild, they will manage your people for you. Depending on their token holdings they will be allowed to join the community. If they sell, the bot boots them',
      website: 'https://collab.land/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Collab.Land.png?v=3'
    },
    {
      category: 'DAO Tools',
      groupTitle: '',
      name: 'Coinshift',
      desc: 'Coinshift simplifies treasury management by providing efficient multisig tooling to save time & money for crypto organisations',
      website: 'https://coinshift.xyz/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Coinshift.png?v=3'
    },
    {
      category: 'DAO Tools',
      groupTitle: '',
      name: 'Snapshot',
      desc: 'Snapshot is a decentralized voting system',
      website: 'https://snapshot.org/#/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Snapshot.png?v=3'
    },
    {
      category: 'DAO Tools',
      groupTitle: '',
      name: 'HQ.xyz',
      desc: 'Wallet aggregation and Zapier-like automation tools for DAOs',
      website: 'https://www.hq.xyz/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/HQ.xyz.png?v=3'
    },
    {
      category: 'Dapp Store',
      groupTitle: '',
      name: 'Dapp Bay',
      desc: '',
      website: 'https://dappbay.bnbchain.org/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Dapp%20Bay.png?v=3'
    },
    {
      category: 'Dapp Store',
      groupTitle: '',
      name: 'Magic Square',
      desc: '',
      website: 'https://magicsquare.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Magic%20Square.png?v=3'
    },
    {
      category: 'Data Oracles',
      groupTitle: '',
      name: 'Band Protocol',
      desc: 'Band Protocol is a cross-chain data oracle platform that aggregates and connects real-world data and APIs to smart contracts',
      website: 'https://bandprotocol.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Band%20Protocol.png?v=3'
    },
    {
      category: 'Data Oracles',
      groupTitle: '',
      name: 'Chainlink',
      desc: 'Securely connect smart contracts with off-chain data and services Chainlink decentralized oracle networks provide tamper-proof inputs, outputs, and computations to support advanced smart contracts on any blockchain',
      website: 'https://chain.link/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Chainlink.png?v=3'
    },
    {
      category: 'Data Oracles',
      groupTitle: '',
      name: 'Pyth',
      desc: 'Pyth delivers real-time on-chain market data',
      website: 'https://pyth.network/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Pyth.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Solidity Code Quality',
      name: 'Solhint',
      desc: 'This is an open source project for linting Solidity code. This project provides both Security and Style Guide validations',
      website: 'https://github.com/protofire/solhint',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Solhint.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Solidity Code Quality',
      name: 'Ethlint',
      desc: 'Ethlint (Formerly Solium) analyzes your Solidity code for style & security issues and fixes them',
      website: 'https://github.com/duaraghav8/Ethlint',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Ethlint.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Solidity Code Quality',
      name: 'Manticore',
      desc: 'Manticore is a symbolic execution tool for analysis of smart contracts and binaries',
      website: 'https://github.com/trailofbits/manticore',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Manticore.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Solidity Code Quality',
      name: 'Slither',
      desc: 'Slither is a Solidity static analysis framework',
      website: 'https://github.com/crytic/slither',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Slither.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Solidity Code Quality',
      name: 'Echidna',
      desc: 'Echidna is a program designed for fuzzing/property-based testing of Ethereum smart contracts',
      website: 'https://github.com/crytic/echidna',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Echidna.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Front-End Programming',
      name: 'Web3.js',
      desc: 'Access full node capabilities without running your own',
      website: 'https://github.com/ethereum/web3.js/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Web3.js.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Front-End Programming',
      name: 'Ethers.js',
      desc: 'Designed to make it easier to write client-side JavaScript based wallets, keeping the private key on the owner’s machine at all times',
      website: 'https://docs.ethers.io/ethers.js/v3.0/html/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Ethers.js.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Back-End Programming',
      name: 'Web3.py',
      desc: 'A python interface for interacting with the Ethereum blockchain and ecosystem',
      website: 'https://github.com/ethereum/web3.py',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Web3.py.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Back-End Programming',
      name: 'Web3.php',
      desc: 'A php interface for interacting with the Ethereum blockchain and ecosystem. Native ABI parsing and smart contract interactions',
      website: 'https://github.com/web3p/web3.php',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Web3.php.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Back-End Programming',
      name: 'Java Web3',
      desc: 'Lightweight Java and Android library for integration with Ethereum clients',
      website: 'https://github.com/web3j/web3j',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Java%20Web3.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Back-End Programming',
      name: 'Net Web3',
      desc: 'Bringing the love of .NET to Ethereum An open source .NET integration library for blockchain',
      website: 'https://nethereum.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Net%20Web3.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Back-End Programming',
      name: 'Ruby Web3',
      desc: 'Ethereum library for the Ruby language',
      website: 'https://github.com/EthWorks/ethereum.rb',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Ruby%20Web3.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'IDE',
      name: 'BSC Studio',
      desc: 'Blockchain Labs building graphic IDE to expedite dApp development',
      website: 'https://github.com/ObsidianLabs/BNB-Studio/blob/master/README.md',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/BSC%20Studio.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'IDE',
      name: 'Remix',
      desc: 'Remix IDE allows developing, deploying and administering smart contracts for Ethereum like blockchains',
      website: 'https://remix.ethereum.org/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Remix.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'IDE',
      name: 'Intellij Solidity Plugin',
      desc: 'Every aspect of IntelliJ IDEA has been designed to maximize developer productivity. Together, intelligent coding assistance and ergonomic design make development not only productive but also enjoyable',
      website: 'https://jetbrains.com/idea/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Intellij%20Solidity%20Plugin.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'IDE',
      name: 'ChainIDE',
      desc: 'A Cloud-Based Multi-Chain IDE',
      website: 'https://chainide.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/ChainIDE.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Development Framework',
      name: 'Truffle',
      desc: 'A world class development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine',
      website: 'https://trufflesuite.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Truffle.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Development Framework',
      name: 'Embark',
      desc: 'Embark is a platform that enables easy development and deployment of decentralized applications',
      website: 'https://github.com/embark-framework/embark',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Embark.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Development Framework',
      name: 'Waffle',
      desc: 'The most advanced framework for testing smart contracts',
      website: 'https://getwaffle.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Waffle.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Development Framework',
      name: 'OpenZeppelin',
      desc: 'OpenZeppelin provides security products to build, automate, and operate decentralized applications. We also protect leading organizations by performing security audits on their systems and products',
      website: 'https://www.openzeppelin.com/defender',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/OpenZeppelin.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Development Framework',
      name: 'HardHat',
      desc: 'Hardhat is a development environment for Ethereum software',
      website: 'https://hardhat.org/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/HardHat.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Wallet SDK',
      name: 'Venly',
      desc: 'Wallet creation by social accounts',
      website: 'https://www.venly.io/product-wallet',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Venly.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Wallet SDK',
      name: 'Sequence.app',
      desc: 'Wallet creation by social accounts',
      website: 'https://sequence.app/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Sequence.app.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Wallet SDK',
      name: 'Web3Auth',
      desc: 'Wallet creation by social accounts',
      website: 'https://web3auth.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Web3Auth.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Wallet SDK',
      name: 'BSC Connector',
      desc: 'This example demonstrates how to support the Binance Chain Wallet through a custom connector',
      website: 'https://github.com/aragon/use-wallet/tree/master/examples',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/BSC%20Connector.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'MPC Wallets/Multisig',
      name: 'Qredo',
      desc: 'MPC Wallets increase overall security for key management and such solutions are critical for protocol/project treasury management',
      website: 'https://www.qredo.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Qredo.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'MPC Wallets/Multisig',
      name: 'Gnosis',
      desc: 'The purpose of multisig wallets is to increase security by requiring multiple parties to agree on transactions before execution',
      website: 'https://gnosis-safe.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Gnosis.png?v=3'
    },
    {
      category: 'Development',
      groupTitle: 'Development Framework',
      name: 'Starton',
      desc: 'Starton is the most powerful development suite to build and scale web3 applications. We are the bridge to enable web2 companies to embrace web3',
      website: 'https://www.starton.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Starton.png?v=3'
    },
    {
      category: 'Gaming Tools',
      groupTitle: '',
      name: 'GameSpace',
      desc: 'GameFi as a service',
      website: 'https://game.space/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/GameSpace.png?v=3'
    },
    {
      category: 'Gasless Solutions',
      groupTitle: '',
      name: 'Biconomy',
      desc: 'Gasless solution',
      website: 'http://biconomy.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Biconomy.png?v=3'
    },
    {
      category: 'NFT Marketplace',
      groupTitle: '',
      name: 'Rareboard',
      desc: 'NFT Marketplace Aggregator Mint & Trade NFTs from multiple marketplaces, at no extra cost',
      website: 'http://rareboard.com',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Rareboard.png?v=3'
    },
    {
      category: 'NFT Marketplace',
      groupTitle: '',
      name: 'Venly',
      desc: 'Wallet with marketplace and APIs',
      website: 'https://www.venly.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Venly.png?v=3'
    },
    {
      category: 'NFT Marketplace',
      groupTitle: '',
      name: 'NFTrade',
      desc: 'Create, buy, sell, swap and farm NFTs',
      website: 'https://nftrade.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/NFTrade.png?v=3'
    },
    {
      category: 'NFT Marketplace',
      groupTitle: '',
      name: 'Element',
      desc: 'The First Community-Driven Aggregated Marketplace',
      website: 'https://www.element.market/bsc',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Element.png?v=3'
    },
    {
      category: 'Payment Gateway',
      groupTitle: '',
      name: 'Binance Connect',
      desc: 'Fiat onramp: crypto purchase with credit card + NFT checkout',
      website: 'https://www.binancecnt.com/en',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Binance%20Connect.png?v=3'
    },
    {
      category: 'Payment Gateway',
      groupTitle: '',
      name: 'MoonPay',
      desc: 'A fast and simple way to buy and sell crypto',
      website: 'https://www.moonpay.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/MoonPay.png?v=3'
    },
    {
      category: 'Payment Gateway',
      groupTitle: '',
      name: 'Transak',
      desc: 'Enable users to buy crypto from your app. Available across 100+ cryptocurrencies on 75+ blockchains via cards, bank transfers and other payment methods in 125+ countries',
      website: 'https://transak.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Transak.png?v=3'
    },
    {
      category: 'Payment Gateway',
      groupTitle: '',
      name: 'Okse',
      desc: 'Wallet and virtual card to pay with cryptocurrencies',
      website: 'https://okse.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Okse.png?v=3'
    },
    {
      category: 'Payment Gateway',
      groupTitle: '',
      name: 'Kado',
      desc: 'Multichain on-ramp',
      website: 'https://www.kado.money/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Kado.png?v=3'
    },
    {
      category: 'Payment Gateway',
      groupTitle: '',
      name: 'SuperFluid',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tool/icons/SuperFluid.png?v=3',
      desc: 'Handle subscriptions, laries, rewards and any composable stream of value',
      website: 'https://www.superfluid.finance/home'
    },
    {
      category: 'Payment Gateway',
      groupTitle: '',
      name: 'Pip',
      desc: 'Micro-transaction enabler and check-out button for e-commerce',
      website: 'https://www.getpip.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Pip.png?v=3'
    },
    {
      category: 'Security Audit',
      groupTitle: '',
      name: 'CertiK',
      desc: 'Leading security-focused ranking platform to analyze and monitor blockchain protocols and DeFi projects',
      website: 'https://www.certik.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/CertiK.png?v=3'
    },
    {
      category: 'Security Audit',
      groupTitle: '',
      name: 'PeckShield',
      desc: 'Security Audit, Threat Monitoring and Prevention, Pen Test and Emergency Response, Total Solutions',
      website: 'https://peckshield.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/PeckShield.png?v=3'
    },
    {
      category: 'Security Audit',
      groupTitle: '',
      name: 'SlowMist',
      desc: 'SlowMist is a Blockchain security firm, providing security audits, security consultants, red teaming, and more',
      website: 'https://www.slowmist.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/SlowMist.png?v=3'
    },
    {
      category: 'Security Audit',
      groupTitle: '',
      name: 'Staging Labs',
      desc: 'An infrastructure layer protecting Web3 users and businesses from mistakes, hacks, and scams',
      website: 'https://www.staginglabs.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Staging%20Labs.png?v=3'
    },
    {
      category: 'Security Audit',
      groupTitle: '',
      name: 'Go+ / Go Plus',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Go and Go Plus.png',
      desc: 'Provide security service, open & permissionless, accessible to everyone. We want to optimize the revenue model for white hats, developers, and security auditors to provide security services and expand user coverage by allowing users to have easier access to the high efficient security resources. Two main product are developed for this purpose, Go+ API and Go Pocket',
      website: 'https://gopluslabs.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Go%20and%20Go%20Plus.png'
    },
    {
      category: 'Security Audit',
      groupTitle: '',
      name: 'Verichains',
      desc: 'Provides security audit services and formally verified audits for your blockchain implementation, consensus protocol, smart contracts and DApps using industry-standard security patterns and best practices',
      website: 'https://audit.verichains.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Verichains.png'
    },
    {
      category: 'Security Audit',
      groupTitle: '',
      name: 'HashDit',
      desc: 'HashDit is dedicated to helping build a safe ecosystem for both users and smart contract developers on BNB Chain by providing in-time threat intelligence, comprehensive code auditing and instant analysis on BNB projects',
      website: 'https://www.hashdit.io',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/HashDit.png'
    },
    {
      category: 'Security Audit',
      groupTitle: '',
      name: 'Halborn',
      desc: 'Blockchain security firm focused on security advisory, advanced penetration testing, smart contract audits and devOps & automation',
      website: 'https://halborn.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Halborn.png'
    },
    {
      category: 'Security Audit',
      groupTitle: '',
      name: 'Trail of Bits',
      desc: 'Software assurance, security engineering and research & development security services with a wide range of products',
      website: 'https://www.trailofbits.com/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Trail%20of%20Bits.png'
    },
    {
      category: 'Security Audit',
      groupTitle: '',
      name: 'Consensys Diligence',
      desc: 'Smart contract audit',
      website: 'https://consensys.net/diligence/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Consensys%20Diligence.png'
    },
    {
      category: 'Security Audit',
      groupTitle: '',
      name: 'Zokyo',
      desc: 'Security audits (protocol, base code, wallet, smart contract), Penetration Testing and other security assessments',
      website: 'https://www.zokyo.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Zokyo.png'
    },
    {
      category: 'Decentralized Identity/Social Graph',
      groupTitle: '',
      name: 'SPACE ID',
      desc: 'Building on BNB Chain, SPACE ID is a universal name service network that seamlessly connects people, information, assets, and applications in the digital world. It is chain-agnostic, decentralized, censorship-resistant, and open-sourced',
      website: 'http://space.id/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/SPACE%20ID.png'
    },
    {
      category: 'Decentralized Identity/Social Graph',
      groupTitle: '',
      name: 'Galaxy',
      desc: 'A collaborative credential infrastructure that empowers brands to build better communities and products in Web3',
      website: 'https://galaxy.eco/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Galaxy.png'
    },
    {
      category: 'Decentralized Identity/Social Graph',
      groupTitle: '',
      name: 'CyberConnect',
      desc: 'A decentralized social graph protocol returning data ownership back to users and helping devs build powerful Web3 social apps',
      website: 'https://cyberconnect.me/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/CyberConnect.png'
    },
    {
      category: 'Decentralized Storage',
      groupTitle: '',
      name: 'IPFS',
      desc: "A peer-to-peer hypermedia protocol designed to preserve and grow humanity's knowledge by making the web upgradeable, resilient, and more open",
      website: 'https://ipfs.io/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/IPFS.png'
    },
    {
      category: 'Decentralized Storage',
      groupTitle: '',
      name: 'Arweave',
      desc: 'Decentralized on-chain data storage',
      website: 'https://www.arweave.org/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Arweave.png'
    },
    {
      category: 'Decentralized Storage',
      groupTitle: '',
      name: 'pinata.cloud',
      desc: 'Pinata is an NFT media management service that allows users to host, manage and share files of any kind on the blockchain of their choice. As an IPFS pinning service, we focus on giving both technical and non-technical creators a fast, easy, and reliable way to share content without limits',
      website: 'https://www.pinata.cloud/',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/pinata.cloud.png'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'Binance Wallet',
      desc: '',
      website: 'https://binance-wallet.gitbook.io/binance-chain-wallet/',
      isSupportStaking: true,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Binance%20Wallet.png'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'Trust Wallet',
      desc: '',
      website: 'https://trustwallet.com/',
      isSupportStaking: true,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Trust%20Wallet.png'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'Math Wallet',
      desc: '',
      website: 'https://mathwallet.org/en-us/',
      isSupportStaking: true,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Math%20Wallet.png'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'SafePal',
      desc: '',
      website: 'https://safepal.io/',
      isSupportStaking: false,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/SafePal.png'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'TokenPocket',
      desc: '',
      website: 'https://www.tokenpocket.pro/',
      isSupportStaking: false,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/TokenPocket.png'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'MetaMask',
      desc: '',
      website: 'https://metamask.zendesk.com/hc/en-us',
      isSupportStaking: false,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/MetaMask.png'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'Ledger',
      desc: '',
      website: 'https://www.ledger.com/',
      isSupportStaking: true,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Ledger.png'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'Trezor',
      desc: '',
      website: 'https://wallet.trezor.io',
      isSupportStaking: false,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Trezor.png'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'MEW',
      desc: '',
      website: 'https://www.myetherwallet.com/',
      isSupportStaking: false,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/MEW.png'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'ezDeFi',
      desc: '',
      website: 'https://apps.apple.com/app/lz-wallet/id1581578160',
      isSupportStaking: false,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/ezDeFi.png'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: '1inch Wallet',
      desc: '',
      website: 'https://1inch.io/wallet/',
      isSupportStaking: false,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/1inch%20Wallet.png'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'Infinity Wallet',
      desc: '',
      website: 'https://infinitywallet.io/download/',
      isSupportStaking: false,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Infinity%20Wallet%20(Desktop).png'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'BitKeep',
      desc: '',
      website: 'https://bitkeep.com',
      isSupportStaking: false,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/BitKeep%20(App&Chrome).png?v=3'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'Coin98 Wallet',
      desc: '',
      website: 'https://coin98.com/wallet',
      isSupportStaking: false,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Coin98%20Wallet%20(App%20Web%20Extension).png?v=3'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'Guarda Wallet',
      desc: '',
      website: 'https://guarda.com/coins/binance-coin-wallet/',
      isSupportStaking: false,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Guarda%20Wallet.png?v=3'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'Rabby Wallet',
      desc: '',
      website: 'https://rabby.io/',
      isSupportStaking: false,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Rabby%20Wallet.png?v=3'
    },
    {
      category: 'Wallets',
      groupTitle: '',
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Onto.png?v=3',
      name: 'Onto',
      desc: '',
      website: 'https://onto.app/',
      isSupportStaking: true
    },
    {
      category: 'Wallets',
      groupTitle: '',
      name: 'Slope',
      desc: '',
      website: 'https://slope.finance/',
      isSupportStaking: true,
      logo: 'https://www.nodereal.io/static/nodereal/images/bnb-dev-tools/icons/Slope.png?v=3'
    }
  ];

  const metaTags = {
    title: 'BNBChainDev - DevTools',
    description: 'BNB Chain Dev Tools',
    //url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/submit`,
    shouldIndex: true
  };

  const [selectedItem, setSelectedItem] = useState(undefined);

  const handleShowModal = item => {
    console.log(item);
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(false);
  };

  return (
    <Container metaTags={metaTags}>
      <Grid>
        <div className="px-4 sm:px-6">
          <h2 className="text-center text-4xl font-bold capitalize tracking-wide text-gray-800 dark:text-gray-300">
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

        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.groupTitle === 'Solidity Code Quality' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={0.5} />
        <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
          Front-End Programming
        </h3>
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.groupTitle === 'Front-End Programming' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
        <Spacer y={0.5} />
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={0.5} />
        <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
          Back-End Programming
        </h3>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.groupTitle === 'Back-End Programming' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={0.5} />
        <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
          IDE
        </h3>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.groupTitle === 'IDE' && (
                <Grid xs={6} sm={2} key={index}>
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fit"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={0.5} />
        <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
          Development Frameworks
        </h3>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.groupTitle === 'Development Framework' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor backdrop-blur-md backdrop-filter">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={0.5} />
        <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
          Wallet SDK
        </h3>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.groupTitle === 'Wallet SDK' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={0.5} />
        <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
          MPC Wallet/Multisig
        </h3>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.groupTitle === 'MPC Wallets/Multisig' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className=" flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y="1" />
        <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
          Decentralized Storage
        </h2>
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'Decentralized Storage' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y="1" />
        <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
          Data Oracles
        </h2>
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'Data Oracles' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
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
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.groupTitle === 'Block Explorers' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={0.5} />
        <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
          Node and Archive Services
        </h3>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.groupTitle === 'Node and Archive Services' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={0.5} />
        <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
          NFT Tools
        </h3>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.groupTitle === 'NFT Tools' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={0.5} />
        <h3 className="text-left text-xl capitalize tracking-wide text-gray-500 dark:text-gray-300">
          Data Indexing
        </h3>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.groupTitle === 'Data Indexing' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={1} />
        <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
          Browser
        </h2>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'Browser' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={1} />
        <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
          Gasless Solutions
        </h2>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'Gasless Solutions' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={1} />
        <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
          Security Audit
        </h2>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'Security Audit' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={1} />
        <h2 className="text-left text-2xl font-bold tracking-wide text-gray-700 dark:text-gray-300">
          Analytics and Dashboards
        </h2>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'Analytics & Dashboards' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={1} />
        <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
          Payment Gateways
        </h2>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'Payment Gateway' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={1} />
        <h2 className="text-left text-2xl font-bold tracking-wide text-gray-700 dark:text-gray-300">
          DAO Tools
        </h2>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'DAO Tools' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={1} />
        <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
          Gaming Tools
        </h2>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'Gaming Tools' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={0.5} />
        <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
          Decentralized Identity/Social Graph
        </h2>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'Decentralized Identity/Social Graph' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={1} />
        <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
          NFT Marketplace
        </h2>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'NFT Marketplace' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={1} />
        <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
          Cross-Chain Bridges
        </h2>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'Cross-chain Bridges' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={1} />
        <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
          Wallets
        </h2>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'Wallets' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className="flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fill"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="fill"
                      width="50%"
                      height={200}
                      alt={selectedItem.name}
                    />
                  </div>
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  {/*<div className="text-center"><Text b size={18}>Supports Staking</Text></div>*/}
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>

      <div className="px-4 sm:px-6">
        <Spacer y={1} />
        <h2 className="text-left text-2xl font-bold capitalize tracking-wide text-gray-700 dark:text-gray-300">
          Dapp Store
        </h2>
        <Spacer y={0.5} />
        <Grid.Container gap={2} justify="flex-start">
          {list.map(
            (item, index) =>
              item.category === 'Dapp Store' && (
                <Grid
                  className="pl-100 "
                  xs={6}
                  sm={2}
                  key={index}
                  css={{ justifyItems: 'center', maxwidth: '500' }}
                >
                  <div
                    onClick={() => {
                      handleShowModal(item);
                    }}
                    className="toolIcon h-700 max-w-300 max-h-700 rounded-md bg-white hover:shadow-gray-700"
                    color="warning"
                  >
                    <div className=" flex grow-0 flex-col align-middle">
                      <div className="text-center">
                        <Image
                          src={item.logo}
                          objectFit="fit"
                          width="40%"
                          height="20%"
                          alt={item.name}
                        />
                      </div>
                      <div className="text-center">
                        {' '}
                        <Text b size={12}>
                          {item.name}
                        </Text>{' '}
                      </div>
                    </div>
                  </div>
                  <Spacer y={0.5} x={1} />
                </Grid>
              )
          )}
          {selectedItem && (
            <div className="modalbackcolor">
              <div className="custom-Modal max-w-500 h-500 flex shrink-0 grow-0 flex-col overflow-y-auto overflow-x-clip">
                <Spacer y={0.5} />
                <div className="closeModal" onClick={handleCloseModal}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="1.41421"
                      y1="1"
                      x2="19"
                      y2="18.5858"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="1"
                      y1="-1"
                      x2="25.8701"
                      y2="-1"
                      transform="matrix(-0.707107 0.707107 0.707107 0.707107 20 1)"
                      stroke="#8F8F8F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="modalWrapper">
                  <div className="content-center justify-center">
                    <Image
                      src={selectedItem.logo}
                      objectFit="scale-down"
                      width="25%"
                      height={90}
                      alt={selectedItem.name}
                    />
                  </div>
                  <Spacer y={0.5} />
                  <div className="text-center">
                    <Text b size={18}>
                      {selectedItem.name}
                    </Text>
                  </div>
                  <Spacer y={0.5} />
                  <div className="overflow-y-auto text-center">{selectedItem.desc}</div>
                  <Spacer y={0.5} />
                  <div>
                    <a className="webLink" href={selectedItem.website}>
                      <Button>Visit Website</Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid.Container>
      </div>
    </Container>
  );
}
