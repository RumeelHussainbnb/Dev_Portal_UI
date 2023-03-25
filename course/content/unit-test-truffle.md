# Unit Testing Smart Contracts

## Lesson Objectives 
*By the end of this lesson, you will be able to:*

- Use Truffle IDE for unit testing your smart contracts.
- Write test cases for unit testing of your smart contracts to make sure your code works correctly before deploying it onto a blockchain network.

## Overview
In the previous lessons, we outlined how to write, compile and deploy smart contract written in Solidity programming language for use on the BNB Smart Chain network using the different IDEs. In this lesson, we perform unit testing of our smart contract to make sure that its works perfectly and as desired before deploying it onto blockchain network.

## Demo 
In this hands-on guide, readers are encourged to perform these tasks along for a better understanding. Before starting off with the practical demo, it is necessary to make sure you have the following software requisites installed. For this tutorial, we will be using Truffle IDE for unit testing our smart contracts.

### Pre-requsites
- node v16.13.0
- npm v8.1.0
- Truffle v5.5.19 (core: 5.5.19)
- Solidity - ^0.8.0 (solc-js)
- Web3.js v1.5.3
- MetaMask Wallet (Latest Version)
  
### Setup 
We will test out our Solidity smart contracts behaviour with unit testing with Truffle which uses Chai and Mocha frameworks. In web development lifecycle, unit testing is needed to do to ensure the code is working the way as it is expected.

In order to be able to complete this demo, make sure you have followed the tutorial [Hello World Smart Contract](first-smart-contract) for writing the `HelloWorld` smart contract using the Truffle IDE and the lesson on [Compiling Smart Contracts](truffle-ide) for successfully compiled the `HelloWorld` smart contract.

### Test Script 
The firt step is to create a file in the `test` folder that will contain the test script. In the `test` folder create a new file `hello_world.js` 

In the `hello_world.js` file residing in the `test` folder, copy and paste the code given below.

```jsx
var helloworld = artifacts.require('../contracts/bsc/HelloWorld');

contract('HelloWorld', function(accounts) {
  let instance;
  before(async () => {
    instance = await helloworld.deployed();
  });
  
  //Test to check if the default value is set to "hello, world"
  it('Default message should be hello, world',async () => {
    let message = await instance.getMessage.call({from: accounts[0]});           
    assert.equal(message, "Hello, World","Incorrect Default Value");
  });

  //Test to check if the setName is working or not
  it('Should save name',async () => {
    let result = await instance.setName.sendTransaction('BNB Chain',{from: accounts[0]}); 
    let message = await instance.getMessage.call({from: accounts[0]});           
    assert.equal(message, "Hello, BNB Chain","Value Could not be Set");        
  });

  //Test to check if error is thrown on empty name field
  it('Should throw error on empty name',async () => {
    try{
      let result = await instance.setName.sendTransaction('',{from: accounts[0]}); 
      assert.fail(true,false,"The function should throw error");  
    }
    catch(err){
        assert.include(String(err),'revert','throws different error');
    }
  });
});

```

### Explanation of the test script
- In the beginning of the code, we tell Truffle which contracts we'd like to interact with via the `artifacts.require()` method. In our case, the smart contract is stored in the `../contracts/bsc/HelloWorld`.
- Next, the smart contract is deployed on the local network, using Ganache. 
- The first test performed is to check that the default value stored in the `greet` variable is `World`. If not, an message `Incorrect Default Value` is displayed.
- The second test performed is to check that the setName function works properly or not. If not, an message `Value Could not be Set` is displayed.
- The third test ensures that the `greet` variable is not set to empty value.

## Running the Test Scripts 
- Open a terminal and move into the root directory of the project. Run the `ganache-cli` using the command `ganache-cli`.
- Make sure that the terminal is not closed, i.e., `ganache-cli` is running in the background. This is important because testing is done on the local network.

![running-ganache-cli](/05-ganache-cli.PNG)

- From the root directory of the project, in a new terminal, run the command `truffle test --config=truffle-config-bsc.js` to run the tests.

![unit-test-smart-contracts](/06-unit-test-smart-contracts.PNG)

## Conclusion
In this tutorial, we covered unit testing of smart contracts using the Truffle IDE that uses Chai and Mocha frameworks for the purpose of unit testing. In order to be able to successfully complete this demo, make sure you have a truffle project created with HelloWorld smart contract as specified in the [Using Truffle](truffle-ide.md) lesson.