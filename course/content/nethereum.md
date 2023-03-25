# Using Nethereum for Connecting .Net Applications to BNB Chain

## Lesson Objectives
*By the end of this lesson, you will be able to:*

- Write .Net languages based programs to write, compile, deploy and interact with smart contracts on BNB Chain.
- Use Nethereum library effectively for connecting .Net applications with BNB Chain.

## Overview
This module is targeted at helping Web2 developers transition into Web3 along with their established skill set to build Web3 applications with complete ease. In this lesson, we provide our readers with a detailed guide on how to interact with smart contracts on the BNB Chain by leveraging the Nethereum library for use with .Net programming languages. 

## What is Nethereum?
Nethereum is the .Net integration library for Ethereum, simplifying smart contract management and interaction with Ethereum nodes whether they are public, like Geth, Parity, or private, like Quorum and Besu. BSC has an Ethereum-like API available which is completely compatible with Ethereum-style JSON RPC invocations. Therefore, developers can leverage this compatibility and use the Nethereum library to interact with a BSC Network and leverage their .Net programming skills to develop blockchain-based applications.

## Demo 
This is a hands-on guide and readers are encourged to perform these tasks along for a better understanding. Before starting off with the practical demo, it is necessary to make sure you fulfill the following pre-requisites.

### Pre-requisites
- IDE of your choice (we used VS Code).
- A Metamask account with test BNB Tokens, details [here](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain).
- Have a smart contract already deployed on the BNB Chain Testnet, following [Module 2B](truffle-ide.md) of this course.

### Setup 
In order to use the Nethereum library, the first important step is to have a smart contract successfully deployed on the BNB Smart Chain network. For development purposes, a testnet can be used. Complete [Module 2A](first-smart-contract.md) and [Module 2B](truffle-ide.md) of this course of writing, compiling, and deploying a HelloWorld smart contract onto the BNB Smart Chain and save the contract address.

#### Install .Net
Nethereum works with .Net Core or .Net Framework (from 4.5.1 upwards). You’ll need to have the .Net SDK installed. For new starters, we recommend .Net core. Mac or Linux users will also need .Net Core. Download .Net SDK from [here](https://www.microsoft.com/net/download).

#### Create a .NET app to use the Smart Contract
In a new folder, use the dotnet command to create a new console app.

```shell
$ dotnet create new console
```

#### Install Nethereum packages
Install the Nethereum packages by running the following commands

```shell
$ dotnet add package Nethereum.Web3
$ dotnet add package Nethereum.Contracts
```
### Writing the code using Nethereum
- Edit the `Program.cs` file to include the following code snippets in the given order.
- First, we need to add our required namespaces for Nethereum, as well as, any other namespace of the functions and types that will be used.

```csharp
using System;
using Nethereum.Web3;  
using Nethereum.Web3.Accounts;
using Nethereum.Contracts;
using System.Numerics;
using System.Threading.Tasks;
using Nethereum.Hex.HexTypes;
```

- Next, we build the foundation for interacting with our deployed smart contract, which includes setting the RPC endpoint, generating an account, and fetching the contract.
- First, we store the RPC endpoint of BNB Smart Chain into a variable named `url`. You can get the complete list of RPC endpoints from [here](https://docs.bnbchain.org/docs/rpc/#testnet-chainid-0x61-97-in-decimal).	
- Next, we store the address of the contract we wish to interact with in the variable `address`. This is obtained when the contract is deployed.
- In the variable `ABI`, this is stored in a `JSON` file as an output of compiling your smart contract. If you have used Truffle for deploying your smart contract, then ABI can be found in the `build` folder of your project.
- To be able to send and sign transactions, an account is required. In this tutorial, we used the public address of our Metamask account and its associated private key. For more details on how to get the private key of the Metamask account, refer [here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key). Note that never reveal your private key or post it publicly. 
- Store the chainId of BNB Smart Chain Testnet in the `chainId` variable. 
- Generate an account that can be used with Nethereum using the statement` var account = new Account(privateKey, chainId); `
- The next step is to create an instance of Web3 by use the statement `new Web3(account, url);` Where you pass your account and the RPC URL you wish to connect to.
- After this, create an instant of the contract we want to interact with, by using the `web3.Eth.GetContract(ABI, address)` which takes the ABI and contract address as input.

```csharp
namespace console
{
    class Program
    {
        static void Main(string[] args)
        {
            //The URL endpoint for the blockchain network.
            string url = "https://data-seed-prebsc-1-s1.binance.org:8545";

            //The contract address.
            string address = "0x34823954bA4eb6600572239f39D05412373f9ac4";

            //The ABI for the contract.
            string ABI = @"[
              {
                ""inputs"": [],
                ""name"": ""greet"",
                ""outputs"": [
                    {
                    ""internalType"": ""string"",
                    ""name"": """",
                    ""type"": ""string""
                    }
                ],
                ""stateMutability"": ""view"",
                ""type"": ""function"",
                ""constant"": true
                },
                {
                ""inputs"": [],
                ""name"": ""getMessage"",
                ""outputs"": [
                    {
                    ""internalType"": ""string"",
                    ""name"": """",
                    ""type"": ""string""
                    }
                ],
                ""stateMutability"": ""view"",
                ""type"": ""function"",
                ""constant"": true
                },
                {
                ""inputs"": [
                    {
                    ""internalType"": ""string"",
                    ""name"": ""_name"",
                    ""type"": ""string""
                    }
                ],
                ""name"": ""setName"",
                ""outputs"": [
                    {
                    ""internalType"": ""bool"",
                    ""name"": ""success"",
                    ""type"": ""bool""
                    }
                ],
                ""stateMutability"": ""nonpayable"",
                ""type"": ""function""
                }
            ]";


            var privateKey = "Your_Private_Key";
            var senderAddress = "0x27cf2CEAcdedce834f1673005Ed1C60efA63c081";
            var chainId = 97; //chain id of BNB Smart Chain Testnet
            var account = new Account(privateKey, chainId);
           
            //Creates the connection to the network and gets an instance of the contract.
            var web3 = new Web3(account, url);
            Contract greeterContract = web3.Eth.GetContract(ABI, address);
        }
    }
}
```

### Calling the Read Functions of Smart Contract
The HelloWorld smart contract has a `getMessage()` function which returns the greeting message. To call this function add the following code the `Main()` function.

```csharp
//Call the getMessage function to read the value of greet
Task<String> greetMessageFunction = greeterContract.GetFunction("getMessage").CallAsync<String>();
greetMessageFunction.Wait();
string message = (string)greetMessageFunction.Result;
Console.WriteLine(message);
```
1. The first step is to create a `Task` type variable that will return a string variable. This will be used for fetching the `getMessage` function and then using it to call the function. 
2. Here, this is important, because since we are not using the `await async` operations, we use the `Task` type variable's `Wait()` function to ensure that the function call is completed and then the next task is completed.
3. The result obtained is then type-casted into the `string` and displayed on the screen.

### Executing Send methods 
Send methods are the type of interaction that modify the contract's storage (change variables), meaning a transaction needs to be signed and sent.
In the `HelloWorld` smart contract, there is one send method namely, `setName`, which takes a `string` as input and sets this as the value of the smart contract's variable `greet`. Add the following code to the `Main()` function to call a send method

```csharp
 //Execute set name function 
try{
     web3.TransactionManager.UseLegacyAsDefault = true;
     HexBigInteger gas = new HexBigInteger(new BigInteger(500000));
     HexBigInteger value = new HexBigInteger(new BigInteger(0));  
     Task setNameFunction =  greeterContract.GetFunction("setName").SendTransactionAsync(account.Address, gas, value, "BNBChain");
     setNameFunction.Wait(); 
     Console.WriteLine("Greeting Set Successfully");
     }catch(Exception e){
         Console.WriteLine("Error: {0}", e.Message);
     } 
```
1. To ensure that gas is estimated from the chain automatically, we set the `web3.TransactionManager.UseLegacyAsDefault` to `true`.
2. Then we set the gas and the value to pass to the contract manually. Remember, this value is any added amount required by the function. In our case, its zero. 
3. Then you create a `Task` variable to make sure that we can skip the use of `async wait` and use the `Wait` function of the `Task` type to successfully execute the function call. 
4. The `SendTransactionAsync` takes an account address to sign the transaction, the gas, value of any added amount required and the value to set the `greet` variable to.
5. We use the `try and catch` block to handle any exception that may occur in the execution of the function call.

### Build the App
Compile/Build your application to make sure there are no compile time errors. To do so, run the following command. 

```shell
$ dotnet build
```

### Run the App
To run your successfully build application, run the following command.

```shell
$ dotnet run
```

### Final Output
The output of running this program should be similar to as follows

![nethereum-output](/nethereum-01.png)

## Conclusion
This module is targeted at helping Web2 developers transition into Web3 along with their established skill set to build Web3 applications with complete ease. In this lesson, we provide our readers with a detailed guide on how to interact with smart contracts on the BNB Chain by leveraging the Nethereum library for use with .Net programming languages. 