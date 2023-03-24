# Building UI to Interact with Smart Contracts

## Lesson Objectives 
*By the end of this lesson, you will be able to:*

- Build a meaningful UI for HelloWorld Smart Contract 
- Use the React Boilerplate for creating UI.

## Overview
In the previous modules, we outlined how to write, compile, deploy and unit test smart contract based on Solidity programming language for use on the BNB Smart Chain network. Remember that, BNB Smart Chain is the component of the BNB Chain ecosystem that is equipped with the smart contract programmability and hence any smart contract or dapps are in essence deployed on the BNB Smart Chain. In the previous lesson, we outlined how to interact with a smart contract deployed on the BNB Smart Chain using the [Truffle IDE](https://trufflesuite.com/). However, interacting via the CLI can be streneous and isn't user-friendly. In this lesson, we illustrate who to create an easy to use UI for interacting with the HelloWorld smart contract by using the [Reactjs Integrated Toolchain](https://reactjs.org/docs/create-a-new-react-app.html) for creating react based applications.

## Demo 
This demo illustrates how to create a simple user interface using Reactjs and connect it to the Metamask wallet. This is a hands-on guide and readers are encourged to perform these tasks along for a better understanding. Before starting off with the practical demo, it is necessary to make sure you have the following software requisites installed. 

### Software Pre-requisites
- Web browser (e.g. Chrome)
- MetaMask Wallet (Latest Version)

### Create Reactjs App
The first step is to create the react app that we will modify for interacting with the Hello World smart contract we have already deployed on the BNB Smart Chain by following the modules [2A](first-smart-contract) and [2B](truffle-ide).

Navigate to the root folder of your project that contains the Hello World smart contract. Run the following command to create a Reactjs application.

```shell
npx create-react-app frontend
``` 

The above command will create a folder named `frontend` containing the basic boilerplate structure for a Reactjs application.

![boilerplate-structure](/boilerplate-structure.PNG)

### Cleaning up the structure
The next step is clean up any unnecessary file and code from our project's frontend structure. 
- Go to `public/index.html` and change the `title` and `meta description` of your website. _This step is optional._
- Next, go to the `src` folder and delete the `App.test.js`, `logo.svg`, and `setupTests.js` files. We will not be needing these files for this tutorial.
- Remove all the contents of `App.css` as well. Do not, however, delete this file.

Go to the `App.js` file and replace its contents with the following.

```jsx
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World Dapp</h1> 
      </header>                
    </div>
  );
}

export default App;
```

- Delete the previous content and copy the follwoing CSS configurations into the `App.css` file.

```css
.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

```
- Navigate to the `frontend` folder, run your application using the command `npm start`. You should see a screen that says Hello World. We now have a basic react project set up and good to go.

![helloworld-dapp-01](/helloworld-dapp-01.PNG)

### Getting Contract ABI and Address
For our React frontend to be able to connect and communicate with our smart contract, it needs the contract's ABI and address.

ABI (or Application Binary Interface) is a JSON file that is automatically generated during contract compilation. The blockchain we deploy to stores our smart contract in the form of bytecode. In order to invoke functions on it, pass the correct parameters, and parse return values using a high-level language, we need to specify details about the functions and the contract (such as name, arguments, types, etc.) to our frontend. This is exactly what the ABI file does. 

To find your ABI file, go to the root of your HelloWorld project create using Truffle and navigate to `build/bsc-contracts/HelloWorld.json`

![contract-abi](/helloworld-dapp-abi-02.PNG)

The next step is to copy the JSON file to your React project. Copy and paste the `HelloWorld.json` file into the `src` folder.

You should already have the address of your deployed smart contract. (If you don’t just deploy it to the BNB Smart Chain Testnet, and get the latest address and ABI file). Follow [Module 2B](truffle-ide) for more details.

![contract-abi](/helloworld-dapp-03.PNG)

Let us now import the contract ABI and define the contract address in the App.js file.

```jsx
import './App.css';
import HelloWorldContract from './HelloWorld.json';

const contractAddr = "0x71f5A9663E13274EEcF58Ac7D1b4ad22b7b44373";
const contractABI = HelloWorldContract.abi;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World Dapp</h1> 
      </header>                
    </div>
  );
}

export default App;
```

### Setting up HTML, CSS, and JS 
For this demo, we will be constructing a fairly simple one-page application. The webpage will have a heading, a _Connect Wallet_ button, an _Enter Name to Greet_ input field, a _Save Name_ button, and a _Greeting_ button. Once the wallet is connected, the _Connect Wallet_ button will be replaced by the _Name_ input field, _Save Name_ button, and _Greeting_ button.

All of the HTML and logic will be palced in the `App.js`. Whereas, all the CSS will be placed in the `App.css`

Update the contents of the `App.js` file with the following to add the respective UI elements.

```jsx
import { useEffect, useState } from 'react';
import './App.css';
import HelloWorldContract from './HelloWorld.json';

const contractAddr = "0xAD95c42Ed5210C29aC2F744db92BCeD604510bE5";
const contractABI = HelloWorldContract.abi;

function App() {

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
            <input id="name" type="text" placeholder="Enter Name to Greet"/>
            <br/>
            <button id="buttonSave">Save Name</button>
            <br/>
            <button id="buttonMessage">Greetings</button>
        </div>
        <div id="output"></div>
        <div id="errorHolder"></div>
      </div>
    )
  }
  const checkWalletIsConnected = async() => { }

  const connectWalletHandler = async () => { }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World Dapp</h1> 
      </header>
      {connectWalletButton()}
      
      {appContent()}
    </div>
  );
}

export default App;
```

Update the `App.css` with the following css configurations

```css
.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

label {
  display:block;
  margin-bottom:5px;
  color: whitesmoke;  
  font-family: 'IBM Plex Sans','Raleway','Source Sans Pro', 'Arial';
 }

input {
  padding:10px;
  width: 30%;
  margin-bottom: 1em;
  color: whitesmoke;
  font-family: 'IBM Plex Sans','Raleway','Source Sans Pro', 'Arial';
}

 button{
  float: center;
  margin: 1em 0;
  padding: 10px 3em;
  font-weight: bold;
  max-width: fit-content;
  font-family: 'IBM Plex Sans','Raleway','Source Sans Pro', 'Arial';
 }

 #output{
     color: black;
     font-size: medium;
     padding: 10px;
     text-align:center;
     margin:1em 0;
     clear:both;
     width: 45%;
     float:center;
     margin:1em 0;
 }

 #errorHolder{
  background-color: coral;
  padding: 10px;
  margin:1em 0;
  clear:both;
  width: 45%;
}
```

Re-fresh your localhost, the frontnd would now look similar to the following 

![no-func-ui](/helloworld-dapp-04.PNG)

### Connecting Metamask to Application

Now that we have our HTML structure ready, the next step is to add the required functionality to our dapp. The first step is to add connectivity to Metamask. 

For a user to call a contract's functions, a Web3 wallet, like Binance Wallet, Metamask, etc., is required to be connected to the dapp's frontend. The wallet will enable the user to pay gas price that would be incurred for executing the contract's function calls. In this demo, we will be working exclusively with the Metamask wallet and its suite of APIs.

Make sure that you have the Metamask wallet extension installed in your browser. If you do, Metamask injects an `ethereum` object into your browser’s global `window` object. We will be accessing `window.ethereum` to perform the bulk of our functionality.

#### Function to check is wallet is connected
A user cannot save new names to greet on our website unless they have a Metamask wallet. Let's define the `checkWalletIsConnected` function within the `App` component that checks if the Metamask wallet exists. 

```jsx
  const checkWalletIsConnected = async() => { 
    const { ethereum } = window;

    if(!ethereum){
      console.log("Make sure you have Metamask installed!");
      return;
    } else{
      console.log("Metamask is Installed. We're ready to go !")
    }
  }
```

Note that we have also defined the `useEffect` hook that checks Metamask's existence when the `App` component loads.


```jsx
useEffect(() => {
    checkWalletIsConnected();
  }, [])
```

Open the console on your app's localhost page. If you have Metamask installed, you should see a message that says _Metamask is Installed. We're ready to go !_

![check-metamask](/helloworld-dapp-05.PNG)

### Configuring Wallet Programmatically

Metamask can not be used with any website, rather to be able to use Metamask the user has to authorize it to be able to connect to the desired website. The _Connect Wallet_ button will act like a login button here and allows the user to connect and send contract function call requests through the website frontend.

Metamask makes this process remarkably simple with the `window.ethereum.request` method.

Let’s first define a variable in `App()` with the `useState` hook that will keep track of the user's wallet address. Make sure to import `useState` using the statement `import useState from React;`

```jsx
const [currentAccount, setCurrentAccount] = useState(null);
```

Now, let’s define the `connectWalletHandler` function.

```jsx
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
```

The `connectWalletHandler` performs the following tasks

- Checks if Metamask installed. If not, the website displays a pop-up asking you to install Metamask.
- Requests Metamask for the user's wallet addresses.
- Once the user has approved Metamask to connect with the website, the function takes the first wallet address that is available and sets it as the value of the `currentAccount` variable.
- If things don't go as plan, e.g., user refuses to connection to wallet, the function execution fails and an error message is displayed.

At the moment, if you open the Metamask extension on your website, it will tell you that you’re not connected.

![not-connected-metamask](/helloworld-dapp-06.PNG)

To verify the logic, click on the _Connect Wallet_ button. Metamask will prompt you to connect with the website. Once you agree to do so, now the wallet will dispaly _connected_.

![connected-metamask](/helloworld-dapp-07.PNG)

🎉 **Congratulations!** 🎉 You have successfully connected your wallet to the frontend you have created for interacting with your smart contract.

Once the wallet is connected, it is desirable to replace the _Connect Wallet_ button with the the _Name_ input field, _Save Name_ button, and _Greeting_ button. To acheive this, in the return value of App , replace the render of the _Connect Wallet_ button and _appContent_ with a conditional render.

```jsx
{currentAccount ? appContent() : connectWalletButton()}
```
Our website should now look like as follows

![final-ui-connect-wallet](/helloworld-dapp-08.PNG)

If you refresh this webpage, you will notice that even though Metamask displays that it is still connected to the website, our website still displays a _Connect Wallet_ button. This is because we are setting the `currentAccount` state only within the `connectWallet` function. Ideally what should happen is that the website should check if the wallet is connected every time the App component is loaded (i.e every time the page is refreshed).

To acheive this, extend the `checkWalletIsConnected` function to check for accounts as soon as the website is loaded and set `currentAccount` if the wallet has already been connected.

```jsx
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
```

The function performs the following tasks: 

- Checks if Metamask is installed and outputs result to the console.
- Attempts to request Metamask for accounts that are connected.
- If Metamask is already connected, a list of accounts is provided to the function by Metamask. If not, an empty list is returned.
- If the list is not empty, the function selects the first account sent over by Metamask and sets it as the current account.

If you now refresh the page, you will see that the website indeed displays the app content as it should.

![final-ui-connect-wallet](/helloworld-dapp-08.PNG)

## Conclusion 
In this lesson, we provided our readers with a detailed demo on how to construct a simple one page Reactjs application that can be modified to be used for interacting with smart contract deloyed on the BNB Smart Chain Testnet. For this tutorial, we illustrated how to construct a HTML boilerplate for UI and connect the frontend to Metamask which is a Web3 wallet. In the next lesson, we add functionality to interact with the smart contract via the UI constructed in this lesson.