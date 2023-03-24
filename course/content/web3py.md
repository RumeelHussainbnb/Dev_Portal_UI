# Using Web3py for Connecting Python-based Applications to BNB Chain

## Lesson Objectives
*By the end of this lesson, you will be able to:*
 - Use the Web3py library for creating dapps on the BNB Smart Chain with Python programming language.
 - Use Python-based programs to write, compile, and deploy smart contracts.

## Overview
This module is targeted at helping Web2 developers transition into Web3 along with their established skill set to build Web3 applications with complete ease. In this lesson, we provide developers with a detailed guide on how to deploy and interact with smart contracts on the BNB Smart Chain using one of the most popular Web2 programming languages, Python by leveraging the Web3py framework. 

## What is Web3py 
[Web3.py](https://web3py.readthedocs.io/) is a set of libraries that enable Python developers to interact with Ethereum nodes using HTTP, IPC, or WebSocket protocols. BSC has an Ethereum-like API available which is completely compatible with Ethereum-style JSON RPC invocations. Therefore, developers can leverage this compatibility and use the Web3.py library to interact with a BSC Network and leverage their python programming skills to develop blockchain-based applications.

## Demo
For this lesson, following are the software pre-requisites. As this is a hands-on guide, we encourage our readers to perform each step for better understanding.

### Pre-requisites
- [Python 3.11.1](https://www.python.org/downloads/)
- pip version 22.0.4
- IDE of your choice (we used [PyCharm 2021.2.3 Community Edition](https://www.jetbrains.com/pycharm/))
- A Metamask account with test BNB Tokens, refer [here](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain) for details.

### Setting up the project environment
Before jumping into the development part, let's first make sure we have the necessary environment setup. We will be installing web3 within a virtual environment. Make sure you are running the command prompt as administrator.

1. **Install virtual environment package**
```shell
$ pip install --upgrade virtualenv 
```

2. **Create Virtual Environment**
```shell
$ virtualenv -p python3 ~/.venv-py3
$ virtualenv -p python3 venv-py3 (On Windows)
```

3. **Activate your new virtual environment**
```shell
$ source ~/.venv-py3/bin/activate
$ venv-py3\Scripts\activate (On Windows)
```

4. **Install Latest Packaging Tools**:  With virtualenv active, make sure you have the latest packaging tools
```shell
$ pip install --upgrade pip setuptools
```

5. **Install web3.py**
```shell
$ pip install --upgrade web3
```

6. **Install Supported Solidity Compiler**
py-solc-x is the supported compiler for compiling solidity-based smart contracts to be compatible for use with python.
```shell
$ pip install py-solc-x
```

### Creating a python program to compile, deploy and interact with smart contracts

1. Create a new folder for your project 

```shell
$ mkdir bsc-python-tutorial 
$ cd bsc-python-tutorial
```

2. Make sure you have installed the Web3.py library and the Solidity compiler. To install both packages, you can run the following command

```shell
$ pip3 install web3 py-solc-x
```

Make a new file with `.py` extension, say `python-tutorial.py` start adding the following code sequence-wise into it. 

#### Setup Web3.py with BSC
Web3.py can be configured to work with BSC Testnet/Mainnet. To configure your project for use with BSC, all you need is one [the officially provided RPC endpoints for the network](https://docs.bnbchain.org/docs/rpc). 

```python
from web3 import Web3

web3 = Web3(Web3.HTTPProvider('RPC-ENDPOINT-HERE')) # Insert your RPC URL here
```

#### Middleware
Since BSC is not the default provider and uses a different mining mechanism than Ethereum, middleware is used. 

```python
w3.middleware_onion.inject(geth_poa_middleware, layer=0)
```

#### Enable HDWallet Features
There are certain new features that are still to be confirmed, however, you can easily enable them for use in your program

```python
w3.eth.account.enable_unaudited_hdwallet_features()
```

### Create an account using private key of your Metamask account
We can use our Metamask account with web3py by using its private key to generate a compatible account. The private key is required to sign the transaction. We will also be adding our newly created account into the middleware onion, also `construct_sign_and_send_raw_middleware(account)` will make sure that middleware automatically captures transactions, signs them, and sends them as raw transactions. Furthermore, the `gas_price_strategy` is also set to confirm the time it takes to mine a transaction.

> **Note:** This is for example purposes only. Never store your private keys in a Python file.

```python
pvkey = "Your_Metamask_Account_Private_Key"
account = w3.eth.account.from_key(pvkey)
w3.middleware_onion.add(construct_sign_and_send_raw_middleware(account))
w3.eth.default_account = account.address
w3.eth.set_gas_price_strategy(fast_gas_price_strategy)
```

### Smart Contract
Now that we have our necessary account details setup, the next step is to compile our smart contract. In this example, we directly provide smart contract within the python program, you can also read it from a `.sol` file.

We create a simple `Greeter` program, that has one string variable greeting to store name to greet; a `setName` function to set value of greeting; and a `greet` function to return the greeting message.

The `py-solc-x` is the solidity compielr version that is design to work with python. Remember that the smart contract below is written in the Solidity programming language.

```python
compiled_sol = compile_source(
    '''
     pragma solidity >0.8.0;

     contract Greeter {
        string public greeting;

        constructor() public {
           greeting = 'Hello, World';
        }

         function setGreeting(string memory _greeting) public {
                   greeting = _greeting;
        }

        function greet() view public returns (string memory) {
             return greeting;
        }
    }
     ''',
    output_values=['abi', 'bin']
)
```

### Retrieve the contract interface
To retrieve the contract interface so that we can interact with it, we can use the `popitem()` function that will return the contract interface.

```python
contract_id, contract_interface = compiled_sol.popitem()
```

### Get bytecode 
Smart contracts are compiled and stored in the form of bytecodes on the blockchain. In the above command, when we compiled our contract the `bin` variable was used to store the bytecode. Therefore, to retrieve its bytecode, the statement `contract_interface['bin']` will return the bytecode.

```python
bytecode = contract_interface['bin']
```

### Get ABI of the smart contract
A smart contract’s Application Binary Interface (ABI) is the standard way to interact with it in the blockchain ecosystem, both from outside the blockchain and for contract-to-contract interaction. Therefore, we need to retrieve the ABI of our contract. The ABI is stored in the `abi` variable as an output of compilation.

```python
abi = contract_interface['abi']
```

### Create Contract Instance
Create a contract instance using the `web3.eth.contract` function and passing in the ABI and bytecode of the contract. This instance will then be used for accessing functions of the smart contract. 

```python
Greeter = w3.eth.contract(abi=abi, bytecode=bytecode)
```

### Submit the transaction for deploying the contract
- Build a constructor transaction using the contract instance.
- You'll then use the `buildTransaction` function to pass in the transaction information including the from address and the nonce for the sender. To get the nonce you can use the `web3.eth.get_transaction_count` function. The from address is the account you wish to use for making transactions.
- Sign the transaction using the `web3.eth.account.sign_transaction` function and pass in the constructor transaction and the `private_key` of the sender.
- Using the signed transaction, you can then send it using the `web3.eth.send_raw_transaction` function and wait for the transaction receipt by using the `web3.eth.wait_for_transaction_receipt` function.

```python
nonce = w3.eth.getTransactionCount(account.address)

deploy_tx = Greeter.constructor().buildTransaction({'gasPrice': w3.eth.gas_price, 'gas': 10000000,'from': account.address, "chainId": 97,'nonce': w3.eth.getTransactionCount(account.address) })

signed_tx = w3.eth.account.sign_transaction(deploy_tx, private_key=account.key)

tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print("Contract Deployed at: ", tx_receipt.contractAddress)
```

#### Output of running this script
The ouput of running the script at this point, should produce a similar output. Remember that, each time a smart contract is deployed onto a blockchain network, it is assigned a new address. Therefore, dont panic if your's is not the same as the one in the following output. 

![script-output](/web3py-01.PNG)

### Interacting with deployed smart contract 
There will be essentially two types of methods, call and send methods. 
- Methods that read contract data are call methods. 
- Whereas, methods that modify contract storage are called send methods.

#### Read Contract Data (Call Methods)
Call methods are the type of interaction that don't modify the contract's storage (change variables), meaning no transaction needs to be sent. They simply read various storage variables of the deployed contract.

Create a contract instance using the `web3.eth.contract` function and passing in the ABI and address of the deployed contract. Using the contract instance, you can then call the `greeting` function

```python
contract_instance = w3.eth.contract(
    address=tx_receipt.contractAddress,
    abi=abi
)

# Call contract function to print greet message
print(contract_instance.functions.greet().call())
```

#### Interact with Contract (Send Methods)
- Send methods are the type of interaction that modify the contract's storage (change variables), meaning a transaction needs to be signed and sent. 
- Create a contract instance using the `web3.eth.contract` function and passing in the ABI and address of the deployed contract
- Build the `update_name_tx` transaction using the contract instance and passing in the value to increment by. You'll then use the `buildTransaction` function to pass in the transaction information including the from address and the nonce for the sender. To get the nonce you can use the `web3.eth.get_transaction_count` function
- Sign the transaction using the `web3.eth.account.sign_transaction` function and pass in the increment transaction and the `private_key` of the sender
- Using the signed transaction, you can then send it using the `web3.eth.send_raw_transaction` function and wait for the transaction receipt by using the `web3.eth.wait_for_transaction_receipt` function.
- Here `transaction_index` is used to make sure nonce is increased.

```python
transaction_index = 1

update_name_tx = 
contract_instance.functions.setGreeting("Hello, BNBChain").buildTransaction({ 'gasPrice': w3.eth.gas_price, 
'gas': 200000,'from': account.address, 
"chainId": 97, 'nonce': nonce + transaction_index})

transaction_index +=1

signed_tx = w3.eth.account.sign_transaction(update_name_tx,private_key=account.key)

tx_hash = w3.eth.send_raw_transaction(signed_tx.rawTransaction)

tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)

# Call contract function to print greet message
print(contract_instance.functions.greet().call())
```

### Final Output 
Upon running the complete script the output produced should look like as follows. Remember that, each time a smart contract is deployed onto a blockchain network, it is assigned a new address. Therefore, don't panic if yours is not the same as the one in the following output. 

![img](/web3py-02.PNG)

## Conclusion
In this module, we provide a detailed guide on how web2 developers can use their development skills and transition to building web3 blockchain apps without much hustle. In this lesson, we provided our readers with a step-by-step guide on how Python developers can use the Web3py library to interface their python programs with the BNB Smart Chain network, empowering them to compile, deploy and interact with smart contracts on the BNB Smart Chain network. 


