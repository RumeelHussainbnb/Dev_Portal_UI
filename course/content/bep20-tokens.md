# Issue BEP20 Tokens on BSC using Remix IDE

## Lesson Objectives
*By the end of this lesson, you will be able to:*

- Use Remix IDE for writing, compiling, and deploying smart contracts.
- Modify the BEP20 token smart contract template to match requirements of your token.
- Use Metamask to view tokens issued on BNB Smart Chain.

## Overview
In this lesson, we provide a detailed guide on how to issue BEP20 fungible tokens on the BNB Smart Chain network. Even though there are several different IDEs that can be used for development purposes on the BNB Smart Chain, the most easiest to use is the [Remix IDE](https://remix.ethereum.org/). For this demo lesson, we will utilize the Remix IDE to write, compile, and deploy smart contract on the BNB Smart Chain for issuing BEP20 tokens.

## What is Remix IDE
[Remix IDE](https://remix.ethereum.org/) is used for the entire journey of smart contract development by users at every knowledge level. It requires no setup, fosters a fast development cycle and has a rich set of plugins with intuitive GUIs. The IDE comes in 2 flavors (web app or desktop app) and as a VSCode extension.

## What are BEP20 Tokens
BEP20 is the BNB Chain's equivalent to the popular [ERC20 specification](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) for tokens on the Ethereum network. The difference is the BEP20 Token isn't run on the Ethereum Network, but the BNB Smart Chain network. Despite this difference, because BNB Smart Chain implements the Ethereum Virtual Machine (EVM) for all of their smart contracts, they end up being practically identical in both specification and implementation.

## Demo
In this lesson, we provide guidelines on how to create, compile, and deploy a simple smart contract on BNB Smart Chain for issuing BEP20 tokens using the [Remix IDE](https://remix.ethereum.org/). For this hands-on guide, readers are encourged to perform the specified tasks along for a better understanding. Before diving into the practical guide, the following requirements are necessary to be fulfilled.

### Pre-requisites

There is no need for any local environment settings for deploying solidity smart contracts on BSC using the Remix IDE. All you require is a browser-based Web3 wallet (e.g. Binance Wallet, MetaMask, etc.) to interact with the BSC Testnet and deployed contracts. You must set up all of the following pre-requisites to be able to deploy your solidity smart contract on the BNB Smart Chain testnet.

* [Download Metamask wallet](https://metamask.io/)
* [Configure BNB Smart Chain Testnet on Metamask](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain)
* [Get BNB testnet tokens](https://testnet.binance.org/faucet-smart)

> **Note:** If you are already using Metamask, it is recommended to create a new account for testing with Remix IDE. You can do this from the account menu, which appears when you click on the account avatar in the top right corner of MetaMask interface.
 
### Setting Up Remix IDE

1. Remix is an online IDE to develop smart contracts. Other than a Metamask wallet it requires n configuration. Navigate to <https://remix.ethereum.org/>, select the Solidity plug-in, click on _New File_ and then enter the file name as `BEP20.sol`.

![setting-up-remix](/bep20-01.png)

2. To be able to use it for writing smart contracts in Solidity programming language, you need to choose Solidity Compiler, make sure to choose the appropriate compiler version. We used `0.8.15` for this tutorial.

<Image
    alt="solidity-compiler-version"
    src="/bep20-02.png"
    width="30%"
    height="30%"
/>

### Writing the BEP20 Smart Contract 
As BNB Smart Chain uses the EVM, the code for deploying an ERC-20 Token and the BEP20 token is the same. This enables us to utilize the ERC-20 specification from OpenZepplin and modify it as per our requirements. You can also alternatively so the BEP20 token template [here](https://docs.bnbchain.org/assets/files/BEP20Token-90279eb8ba08bbc0df679f37d7886d68.template). Make sure to update the pragma statement to match the solidity compiler version used on Remix, 0.8.15 in our case.

1. Copy and paste the following code into the `BEP20.sol` file. 

```jsx
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BEP20 is ERC20 {
    constructor(uint256 initialSupply) ERC20("BEP20Token", "BPT") {
        _mint(msg.sender, initialSupply);
    }
}
```

2. Modify "name" and "symbol" according to your requirements.

![token-name-and-symbol](/bep20-03.png)

3. The "initialSupply" will be supplied as an input to the constructor at the time of deploying the smart contract.

### Compile the BEP20 token contract

a. **Step1:** Click the compile button to switch to compile page
b. **Step 3:** Select the appropriate Solidity compiler version
c. **Step3:** Enable "Auto compile" and "optimization"
d. **Step2:** Select "BEP20" contract from the contract dropdown
e. **Step4:** Click on the "Compile" button

<Image
    alt="compile-smart-contract"
    src="/bep20-04.png"
    width="30%"
    height="30%"
/>

### Deploy the contract to BNB Smart Chain Testnet

a. **Step1:** Click on the Deploy button to switch to Deploy Options.
b. **Step2:** Select "Injected Web3"
c. **Step3:** Select "BEP20" from contract dropdown
d. **Step4:** Specify the initialSupply of your token next to the Deploy icon. In our case we specified 100000000000000000000 for 100 BPT tokens. This is because the token is as 18 decimal places.
e. **Step 5:** Click "Deploy" button and Metamask notification will pop up

<Image
    alt="deploy-smart-contract"
    src="/bep20-05.png"
    width="30%"
    height="30%"
/>

e. Click "confirm" button to sign and broadcast transaction to BNB Smart Chain.

<Image
    alt="confirm-metamask-transaction"
    src="/bep20-06.png"
    width="30%"
    height="30%"
/>

### View issued tokens in Metamask

a. To view the issued tokens, copy the address of the deployed smart contract

<Image
    alt="copy-smart-contract-details"
    src="/bep20-08.png"
    width="30%"
    height="30%"
/>

b. Open your Metamask wallet, make sure you are connected to the account you used for deploying the smart contract.
c. Click on the Assets tab, and then Import Token 

<Image
    alt="import-tokens"
    src="/bep20-09.png"
    width="30%"
    height="30%"
/>

d. Paste the address of your deployed contract in the _Token Contract_ field, the token and decimal values will be fetched automatically. Click on _Add Custom Token_ button.

<Image
    alt="add-custom-token-details"
    src="/bep20-08.png"
    width="30%"
    height="30%"
/>

e. Now you can view the issued BEP20 Tokens in your wallet.

<Image
    alt="tokens-in-wallet"
    src="/bep20-10.png"
    width="60%"
    height="60%"
/>

## Conclusion 
In this lesson, we covered how to issue BEP20 tokens on the BNB Smart Chain Testnet using the Remix IDE. Even though we issued the tokens on testnet, the steps are same for the mainnet. 