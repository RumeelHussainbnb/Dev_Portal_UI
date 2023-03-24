# Deploy Smart Contracts

## Lesson Objectives 
*By the end of this lesson, you will be able to:*

- Compile and deploy smart contracts onto the BNB Smart Chain network.
- Use Truffle IDE for deploying smart contracts.
- Use BSCScan Explorer to verify the deloyment of your smart contract.

## Overview
In the previous lessons, we outlined how to write, compile and unit test a smart contract based on Solidity programming language for use on the BNB Smart Chain network. Remember that, BNB Smart Chain is the component of the BNB Chain ecosystem that is equipped with the smart contract programmability and hence any smart contract or dapps are in essence deployed on the BNB Smart Chain. In this lesson, we will outline the steps to deploy the written smart contract using the [Truffle IDE](https://trufflesuite.com/) on the BNB Smart Chain Testnet.

## What is Truffle IDE
[Truffle](https://trufflesuite.com/) is one of the most popular development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM).

## Demo 
This is a hands-on guide and readers are encourged to perform these tasks along for a better understanding. Before starting off with the practical demo, it is necessary to make sure you have the following software requisites installed. 

### Sofware Prerequisites
- Node v16.13.0
- npm -v8.1.0
- Truffle v5.5.19 (core: 5.5.19)
- Solidity v^0.8.0 (solc-js)
- MetaMask Wallet (Latest Version)

### Set up
- Run the command `npm install` to install node dependencies specified in the `package.json` file.
- In the root directory of your project, create a new file `.env` and paste the following into it. To get the Secret Pharse from MetaMask wallet you can go to Metamask Settings, then from the menu choose Security and Privacy where you will see a button that says _Reveal Secret Recovery Phrase_, refer [here](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-reveal-your-Secret-Recovery-Phrase) for more details.

```jsx  
MNEMONIC = SECRET PHRASE OF YOUR METAMASK ACCOUNT   
```

### Writing and Compiling Smart Contract
Make sure to follow the lesson [Write Your First Smart Contract](first-smart-contract), for writing the `HelloWorld` smart contract using the Truffle IDE.

After we have written a smart contract, its time to compile it to make sure that its error free. Make sure to follow the lesson [Compiling Smart Contract](truffle-ide) to compile the smart contract using Truffle IDE.

### Deploy Smart Contract to BSC Testnet
- In order to deploy your smart contract onto the BSC testnet, we will using the `truffle-config-bsc.js` as the truffle configuration file. 
- Make sure that you have created `.env` file containing the secret phrase of your MetaMask account. 
- In order to deploy your smart contract onto the BSC Testnet, run the command `truffle migrate --network bscTestnet --config=truffle-config-bsc.js`

![deploy-smart-contracts](/02-deploy-smart-contracts.PNG)

### Verify Smart Contract 
In order to make sure your smart contract is deployed, [BscScan Testnet Explorer](https://testnet.bscscan.com/) can be used. Copy the contract address obtained when the contract was deployed as shown in the figure below.

![copy-contract-address](/03-contract-address.PNG)

On the BscScan homepage, paste it in the search bar and press enter.

![search-bscscan](/04-bscscan-explorer.PNG)

Upon pressing enter, you can view all of the deployment details of your smart contract.

![contract-details-on-bscscan](/05-contract-on-bscscan-explorer.PNG)

## Conclusion
This tutorial guided you through the basics of creating and deploying a smart contract using the Truffle IDE. We also provided steps on how to verify your smart contract using the [BscScan](https://bscscan.com/). This tutorial uses testnet, however, the exact same instructions and sequence will work on the mainnet as well.