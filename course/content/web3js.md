# Using Web3js Library with UI to Interact with Smart Contracts

## Lesson Objectives 
*By the end of this lesson, you will be able to:*

- Build a meaningful UI to interact with a deloyed smart contract.
- Use the React Boilerplate for creating UI.
- Use Metamask API for connecting your dapp to Metamask Wallet.
- Use the Web3js Library to connect UI for interaction with a deployed smart contract.

## Overview
In the previous [lesson](build-ui), we demonstrated how to construct a boilerplate structure for interaction with the HelloWorld smart contract that we deployed on the BNB Smart Chain Testnet by following the previous [lesson](truffle-ide) on deploying smart contracts. In this lesson, we illustrate how to connect our UI to Web3js library for interaction with the smart contract.

## Demo 
This demo illustrates integration of Web3js library with a simple user interface based on Reactjs for interaction with smart contract via the UI. This is a hands-on guide and readers are encourged to perform these tasks along for a better understanding. 

### Pre-requisites 
Before starting off with this demo, it is necessary to make sure you have completed the previous [lesson](build-ui) based on constructing a user interface.

**Install the Web3js Library** 
Run the following command to install the `Web3js` library. Make sure you are in the **root** folder of your application's project, in our case the `frontend` folder.

```shell
npm install web3 --save
```

### Initializing Smart Contract using Web3js
After installing Web3js library, the next step is to import it into your `App.js` file and use it to access the smart contract. Add the following line in the `App.js` to import the Web3 library.

```jsx
import Web3 from 'web3';
```
#### Initialziing dapp with wallet and smart contract details

Create three global variables in the `App.js` file `selectedAccount`, `helloWorldContract`, and `isInitialized` which will store the current account of Metamask, the HelloWorld Contract ABI and a boolean value to indicate whether the dapp as been initialized which the wallet and smart contract details. Add the following lines after the import statements and outside the `App` component.

```jsx
let selectedAccount = null;
let helloWorldContract = null;
let isInitialized = false;
```

Create an `init()` function which will be performing the following tasks:
- Check if Metamask wallet is installed using `let provider = window.ethereum;`. 
- The user is then prompted to connect their wallet to the website by sending a `.request` to the `provider` to gain access to the user's account.
- Listens to Metamask for any account changes through the event listener.
- If connection is successfull with the wallet, it extracts the network id of the blokchain network your wallet is currently connected to. Based on this id, the address of the deployed smart contract is fetched from the ABI of the smart contract.
- If all goes well, the `isInitialized` variable is set to `true`.

```jsx
const init = async () => {
  let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
      provider.request({method: 'eth_requestAccounts' }).then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
      });
      window.ethereum.on('accountsChanged', function (accounts){
        selectedAccount = accounts[0];
        console.log(`Selected account changed to ${selectedAccount}`);
      });
    }
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  helloWorldContract = new web3.eth.Contract(HelloWorldContract.abi,HelloWorldContract.networks[networkId].address);
  isInitialized = true;
};
```

Also add the call to `init()` in the `useEffect` function. 

```jsx
  useEffect(() => {
    checkWalletIsConnected();
    init();
  }, [])

```
### Calling Smart Contracts Functions 

Update the appContent with the following to include `onClick` functions for buttons and `ref` for the input field.

```jsx
const appContent = () => {
    return (
      <div>
        <div>
            <label htmlFor="name" className="col-lg-2 control-label">
              Enter a Name
            </label>
            <br/>
            <input ref={inputRef} id="name" type="text" placeholder="Enter Name to Greet"/>
            <br/>
            <button id="buttonSave" onClick={()=>setGreetName()}>Save Name</button>
            <br/>
            <button id="buttonMessage" onClick={()=>printMessage()}>Greetings</button>
        </div>
      </div>
    )
  }
```
To get the value of an uncontrolled input field on button click in React the general steps are:
- Create a `ref` for the input field.
- Set an `onClick` event handler on the button.
- Use the `ref` object to access the current input value in the event handler.

Initialize a state variable that utilizes useRef for maintaining state of the input field on our UI. Define this in the `App` component outside of other defined functions.

```jsx
const inputRef = useRef(null);
```

We have already added a `ref` as `inputRef` to the input field. Let's define the `onClick` handler `setGreetName` to fetch the current value in the input field and send it to our smart contract. Define the `setGreetName` in the `App` component.

```jsx
const setGreetName = async () => {
    if(inputRef.current.value === ""){
        alert("Name cannot be empty!");
    }else{ 
        if (!isInitialized) {
        await init();
        }
        await helloWorldContract.methods.setName(inputRef.current.value).send({from: selectedAccount})
        .then( async ()=>{
            alert(await helloWorldContract.methods.getMessage().call());
        })
        .catch((err) => {
            alert(err.message);
        }); 
    }
}
```

Define a `printMessage` function in the `App` component which is the `onClick` handler for _Greeting_ button, and is reponsible for making a call to the `getMessage()` function of the smart contract to fetch the greeting message to print.

```jsx
const printMessage = async () => {
  if (!isInitialized) {
    await init();
  }
  alert(await helloWorldContract.methods.getMessage().call());
}
```

### Complete App.js File
At the end your App.js file should look like as follows

```jsx
import { useEffect, useState, useRef } from 'react';
import './App.css';
import HelloWorldContract from './HelloWorld.json';
import Web3 from 'web3';

let selectedAccount = null;
let helloWorldContract = null;
let isInitialized = false;

function App() {

  const [currentAccount, setCurrentAccount] = useState(null);

  const inputRef = useRef(null);

  const init = async () => {
    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
      provider.request({method: 'eth_requestAccounts' }).then((accounts) => {
        selectedAccount = accounts[0];
        console.log(`Selected account is ${selectedAccount}`);
      })
      .catch((err) => {
        console.log(err);
      });
      window.ethereum.on('accountsChanged', function (accounts){
        selectedAccount = accounts[0];
        console.log(`Selected account changed to ${selectedAccount}`);
      });
  }
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();
  helloWorldContract = new web3.eth.Contract(HelloWorldContract.abi,HelloWorldContract.networks[networkId].address);
  isInitialized = true;
};

  const printMessage = async () => {
    if (!isInitialized) {
      await init();
  }
    alert(await helloWorldContract.methods.getMessage().call());
  }

  const setGreetName = async () => {
      if(inputRef.current.value === ""){
        alert("Name cannot be empty!");
      }else{
      
      if (!isInitialized) {
      await init();
      }
      await helloWorldContract.methods.setName(inputRef.current.value).send({from: selectedAccount})
      .then( async ()=>{
          alert(await helloWorldContract.methods.getMessage().call());
      })
      .catch((err) => {
          alert(err.message);
      }); 
      }
  }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  const appContent = () => {
    return (
      <div>
          <div>
            <label htmlFor="name" className="col-lg-2 control-label">
              Enter a Name
            </label>
            <br/>
            <input ref={inputRef} id="name" type="text" placeholder="Enter Name to Greet"/>
            <br/>
            <button id="buttonSave" onClick={()=>setGreetName()}>Save Name</button>
            <br/>
            <button id="buttonMessage" onClick={()=>printMessage()}>Greetings</button>
            </div>
      </div>
    )
  }

  const checkWalletIsConnected = async() => {
    const { ethereum } = window;

    if(!ethereum){
      console.log("Make sure you have Metamask installed!");
      return;
    } else{
      console.log("Metamask is Installed. We're ready to go !")
    }

    const accounts = await ethereum.request({method: 'eth_accounts'});

    if(accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    }else {
      console.log("No authorized account found!");
      alert("No authorized account found!");
    }
   }

  const connectWalletHandler = async () => { 
    const {ethereum} = window;

    if(!ethereum){
      alert("Please install Metamask!!");
      return;
    }

    try{
      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      console.log("Found an account ! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch(err){
      alert(err.message);
      console.log(err);
    }
  }

 useEffect(() => {
    checkWalletIsConnected();
    init();
 }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World Dapp</h1> 
      </header>
      {currentAccount ? appContent() : connectWalletButton()}
    </div>
  );
}

export default App;
```

### The Final Result 

🎉 **Congratulations!** 🎉 You have successfully connected a simple Reactjs based frontend with the your smart contract deployed on the BNB Smart Chain.

To check the functionality of your dapp, restart the application using `npm start`
- As your wallet is already authorized, the UI will displayed as the input field with _Save Name_ and _Greeting_ button.
- If you press the _Save Name_ button without entering a name into the input field, this is display a prompt alerting the user that name cannot be empty.
- If you press the _Greeting_ button for the first time, it will display the last initialized name.
- Enter a name and press _Save Name_, this will display a Metamask prompt asking for transaction confirmation, ensure you have test BNB Tokens.

![call-contract-function](/helloworld-dapp-09.PNG)

- After confirmation, a prompt is displayed greeting the name entered.
 
![call-contract-function](/helloworld-dapp-10.PNG)


## Conclusion
In this last lesson of Module 3, we covered how to use Web3js library to connect the frontend of your dapp to a web3 wallet like Metamask and also to initialize dapp with the smart contract details. 
