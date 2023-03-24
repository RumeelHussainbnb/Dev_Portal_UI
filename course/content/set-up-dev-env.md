# Setting Up Dev Environment for Developing Smart Contracts

## Lesson Objectives 
*By the end of this lesson, you will be able to:*

- Set up the dev environment required for dapp development on the BNB Chain.
- Unbox and get familiar with the structure of the BSC Starter Box.
- Use the Truffle IDE, in particular, the Truffle BSC Starter Box, for jumpstarting dapp development on BNB Chain.


## Overview
In this lesson, we provide our readers a detailed guide on how to use the Truffle IDE, particularly, the [Truffle BSC Starter Box](https://trufflesuite.com/boxes/BSC-Truffle-Starter-Box/) for jumpstarting dapp development on the BNB Chain.

## Demo 

This is a hands-on guide, we encourage our readers to perform these tasks along for a better understanding. Before starting off with the practical demo, it is necessary to make sure you have the following software requisites installed. 

### Software Pre-requisites

- Node v16.13.0
- npm -v8.1.0
- Truffle v5.5.19 (core: 5.5.19)
- Solidity v^0.8.0 (solc-js)
- Web3.js v1.5.3
- MetaMask Wallet (Latest Version)

### Setting up the workspace
Before writing our smart contract, we will firt set up the workspace for it. There are multiple IDEs available that can be used for writing, compiling, testing, and deploying smart contracts. However, [Truffle Suite](https://trufflesuite.com/) is amongst the most popular used IDE. For this tutorial, we will also be using the Truffle IDE for writing our smart contracts. 

## Truffle IDE
[Truffle](https://trufflesuite.com/) is one of the most popular development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM). BNB Chain offers its boilerplate in the form of a truffle box which can be used for jumpstarting development of dapps on BNB Chain. Make sure you have [Nodejs](https://nodejs.org/en/download/) installed on your system prior to installing truffle. To install truffle run the following command

```shell
npm install -g truffle
```

You may receive a list of warnings during installation. To confirm that Truffle was installed correctly, run:

```shell
truffle version 
```

For more details on installation, refer [here](https://trufflesuite.com/docs/truffle/how-to/install/).


## Metamask Wallet
In the Web3.0 ecosystem, Web3 wallets act as the user's key to the blockchain. They allow users to access and interact with decentralized applications, store digital assets (like NFTs) and cryptocurrencies, and much more. For this tutorial, we will be using one of the most widely used Web3 wallet, [Metamask](https://metamask.io/). We will be using Metamask for paying gas fees required for processing of transactions like deployment of smart contracts and interacting with it. 

You can download Metamask from their [official website](https://metamask.io/download/).

## Setting up Truffle Project
In order to setup the truffle project by following the below given steps:
* Make a new folder for your project by running the command `mkdir HelloWorld`.
* Navigate to the newly created folder `cd HelloWorld`.
* We will use [BSC's official Truffle Box](https://trufflesuite.com/boxes/BSC-Truffle-Starter-Box/) which is a boilerplate that comes with all the configurations pre-set that are required for jump starting dApp development on the BNB Smart Chain. Run the command `truffle unbox bnb-chain/BSC-Truffle-Starter-Box`  
* The box comes with built-in sample files that include a simple storage smart contract and related files. 
* Make sure to run the command `npm install` to install all of the dependencies.

## Conclusion
In this lesson, we provided a detailed guide on how to set up the dev environment for developing dapps using the Truffle BSC Starter Box. In the next lesson, we dive into how to write a smart contract. 