# Write Your First Smart Contract

## Lesson Objectives 
*By the end of this lesson, you will be able to:*

 - Write smart contracts using the Solidity Programming lanuage.
 - Understand the structure of smart contracts on the BNB Chain.

## Overview
In this lesson, we provide our readers a detailed guide on how to write a simple `Hello World` smart contract based on the [Solidity programming language](https://docs.soliditylang.org/en/v0.8.17/). The smart contract has a simple functionality of returning a single string value as output.

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
Make sure you have set up the dev environment, by following the [previous lesson](set-up-dev-env) and have Nodejs, Truffle, Metamask installed.

## Creating Smart Contract File
Within the `contracts/bsc` folder rename the `SimpleStorage.sol` to `HelloWorld.sol`. Remove the contents of the file, we will use this file for storing our smart contract. Here, `.sol` denotes that this is a Solidity file. We will be writign our smart contract in teh Solidity programming language which is one of the most widely used language for smart contract development. 

## Smart Contract Code
Copy and paste the following code into the `HelloWorld.sol` file.

```jsx
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract HelloWorld {
    string public greet = "Set a name please";  //variable for storing name

    /** @dev Retrieve Message to Print
      * @return The Message to Print, Hello, Concatenated with the User Name
      */ 
    function getMessage() public view returns(string memory){
        return concat("Hello, " , greet);
    }

        /** @dev Set the Name to Greet 
        * @param  _name  user name
        * @return success Returns bool value (True or False) to indicate if save was successful or not
        */
    function setName(string memory _name) public returns(bool success){
        require(bytes(_name).length > 0);
        greet= _name;
       // accounts[msg.sender] = _name;
        return true;
    }

    /** @dev Set the Name to Greet 
        * @param  _base  contains the base value " Hello, "
        * @param  _value contains the name to append to message to display
        * @return the concatenated string of _base+_value i.e. Hello, Name
        */ 
    function concat(string memory _base, string memory _value) internal pure returns (string memory) {
            bytes memory _baseBytes = bytes(_base);
            bytes memory _valueBytes = bytes(_value);
    
            string memory _tmpValue = new string(_baseBytes.length + _valueBytes.length);
            bytes memory _newValue = bytes(_tmpValue);
    
            uint i;
            uint j;
    
            for(i=0; i<_baseBytes.length; i++) {
                _newValue[j++] = _baseBytes[i];
            }
    
            for(i=0; i<_valueBytes.length; i++) {
                _newValue[j++] = _valueBytes[i];
            }
            
            return string(_newValue);
        }
}
```

### What does HelloWorld smart contract do?

* **SPDX-License-Identifier:** is used for specifying license for the use of smart contract, in our case, MIT, is used for indicating open-source code.
* **Pragma Statement:** the keyword `pragma` is used for specifying the Solidity compiler version to be used with our smart contract.
* **Contract Functionality:** The smart contract shown above is a simple program that has a variable `greet` that will used for storing names and the `getMessage` function is used for returning a greeting message with the name stored in the `greet` variable, e.g., "Hello, Maryam". The `setName` function is used for setting user desired name to `greet`. Whereas, the `concat` function is utitlity function used for concatenating the message `Hello,` with the name stored in the variable `greet`.

## Conclusion 
In this lesson, we provided a detailed guide on how to write a simple `Hello World` smart contract based in the Solidity programming language. In the upcoming lessons, we guide our readers on how to compile and deploy this smart contract onto the BNB Smart Chain test network. 