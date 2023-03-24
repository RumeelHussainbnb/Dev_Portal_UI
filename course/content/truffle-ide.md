# Compile Smart Contracts

## Lesson Objectives 
*By the end of this lesson, you will be able to:*

- Compile and deploy smart contracts onto the BNB Smart Chain network.
- Use Truffle IDE for compiling smart contracts.

## Overview
In the [previous lesson](first-smart-contract), we outlined how to write a smart contract using the Solidity programming language for use on the BNB Smart Chain network. Remember that, BNB Smart Chain is the component of the BNB Chain ecosystem that is equipped with the smart contract programmability and hence any smart contract or dapps are in essence deployed on the BNB Smart Chain. In this lesson, we will outline the steps to compile and deploy the written smart contract using the [Truffle IDE](https://trufflesuite.com/) on the BNB Smart Chain Testnet.

## What is Truffle IDE
[Truffle](https://trufflesuite.com/) is one of the most popular development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM).

## Demo 
This is a hands-on guide and readers are encourged to perform these tasks along for a better understanding. Before starting off with the practical demo, it is necessary to make sure you have the following software requisites installed. 

## Sofware Prerequisites
- Node v16.13.0
- npm -v8.1.0
- Truffle v5.5.19 (core: 5.5.19)
- Solidity v^0.8.0 (solc-js)
- Web3.js v1.5.3
- MetaMask Wallet (Latest Version)

### Set up
- Run the command `npm install` to install node dependencies specified in the `package.json` file.
- In the root directory of your project, create a new file `.env` and paste the following into it. To get the Secret Pharse from MetaMask wallet you can go to Metamask Settings, then from the menu choose Security and Privacy where you will see a button that says _Reveal Secret Recovery Phrase_, refer [here](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-reveal-your-Secret-Recovery-Phrase) for more details.

```jsx  
MNEMONIC = SECRET PHRASE OF YOUR METAMASK ACCOUNT   
```

### Writing Smart Contract
Make sure to follow the lesson [Write Your First Smart Contract](first-smart-contract.md), for writing the `HelloWorld` smart contract using the Truffle IDE.

### Compiling Smart Contracts using Truffle IDE
After we have written a smart contract, its time to compile it to make sure that its error free. In order to compile your smart contract using Truffle, navigate to the root directory of your project, and run the command `truffle compile --config=truffle-config-bsc.js`. 

![compile-smart-contracts](/01-compile-smart-contracts.PNG)

the `--all` tag is used to compile all of the smart contracts present in the contracts directory. This is an optional parameter and can be omitted.

## Conclusion
This tutorial guided you through the basics of compiling a smart contract using the Truffle IDE. This tutorial uses testnet, however, the exact same instructions and sequence will work on the mainnet as well.