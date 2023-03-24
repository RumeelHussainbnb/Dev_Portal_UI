# Interacting with Smart Contracts - Using Truffle 

## Lesson Objectives 
*By the end of this lesson, you will be able to:*

- Interact with deployd smart contracts using the Truffle IDE.
- Retrieve and store information to smart contracts using the Truffle IDE.

## Overview 
In the previous modules, we outlined how to write, compile, deploy, and unit test smart contracts using Truffle IDE. In this module we provide a detailed guide on how to interact with deployed smart contracts by different ways. The first way to interact with a deployed smart contract is by using [Truffle IDE](https://trufflesuite.com/).

## What is Truffle IDE
[Truffle](https://trufflesuite.com/) is one of the most popular development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM).

## Demo 
This demo illustrates how to interact with a smart contract that is deployed on the BNB Smart Chain using the Truffle IDE. This is a hands-on guide and readers are encourged to perform these tasks along for a better understanding. Before starting off with the practical demo, it is necessary to make sure you have the following software requisites installed. Also, make sure you have completed Module [2A](first-smart-contract.md) and [2B](truffle-ide).

## Prerequisites
- Node v16.13.0
- npm v8.1.0
- Truffle v5.5.19 (core: 5.5.19)
- MetaMask Wallet (Latest Version)

## Set up 
Note that to complete this guide, make sure that you have successfully written, compiled, and deployed the Hello World smart contract provided in the previous modules.

## Using Truffle for Interaction with Deployed Smart Contract
- The first step is to initiate truffle develop environment by running the command `truffle develop --config=truffle-config-bsc.js`
- We will now be using the local development setting of truffle for deploying and interacting with our smart contract.
- In order to deploy your smart contract locally, run the command, `truffle migrate`
- To interact with the deployed contract, we will have to create an instance of it. Run the command `let instance = await HelloWorld.deployed()` to create an instance. If you type `instance` and press enter, it will now return the ABI of the HelloWorld smart contract, as shown in the figure below.

![instance-of-smart-contract](/01-instance-of-smart-contract.PNG)

- Now that we have an instance, we can use it to make function calls for getting message or setting name to greet.
- To call the `getMessage()` function which returns the greeting message there are two ways; wither store the result returned into a variable and then print the value of that variable or directly print the value returned by the function.
  - To store value returned by the function into a variable use the statement `let message = await instance.getMessage()`. To print the value of the variable `message` type `message` and press enter.
  
![Making-function-calls](/02-Making-Function-Call.PNG)

  - To print value returned by the function directly use the statement `await instance.getMessage()`

![Making-function-calls](/03-Making-Function-Call.PNG)

- To use the `setName` function, you can either 
  - Use a variable, say `setName` and issue the function call, this will store the transaction detail into the `setName` variable. You can also make a direct call to function, using `await instance.setName("Maryam")`

![Saving-Function-Transaction-Details](/04-Saving-Transction-details.PNG)

- To view the greeting message and confirm that the name is changed, issue the command `instance.getMessage()`

![Output-Greeting-Message](/05-Output-Greeting-Mesage.PNG)