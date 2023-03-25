# Issue BEP20 Tokens on BSC Using BlackIDE

## Lesson Objectives
*By the end of this lesson, you will be able to:*

- Using BlackIDE for smart contract development.
- Managing Keypairs and Funding BNB Tokens to your account on BlackIDE.
- MetaMask Wallet connectivity to BSC Testnet.
- Smart-contract development.
- Issuing, minting, and transferring NFTs.

## Overview
In this tutorial, we provide a step-by-step guide to readers on how to issue Non-fungible tokens (NFTs) (ERC721/1155) on the BNB Smart Chain (BSC) Testnet using the Black IDE. This is a detailed guide to learning how to issue, mint and transfer NFTs on the BSC Testnet. The technology stack used in this tutorial includes Solidity, Truffle, MetaMask, and BlackIDE.

## What is Solidity
Solidity is one of the most popular object-oriented high-level smart contract programming languages. For more details on Solidity, refer here.

## What is Metamask 
Metamask is one of the most popular self-custodial Web3 wallet that can be used for performing different transaction over the Web3. It is a web wallet that allows connecting the chrome browser to any valid blockchain network.

## What is BlackIDE
[Black IDE](https://ide.black/welcome) is an integrated development environment (IDE), making developing EVM-compatible smart contracts faster and easier. Black IDE offers both desktop and web (Black IDE Web) applications.

## Demo
This is a hands-on guide and we recommend our readers to perform the tutorial for a better undrstanding. Before starting the tutorial, make sure you have the following softwares installed. 

### Pre-requisites
We aim to keep this tutorial as simple as possible and hence tend to use as minimal resources as possible. We have used the following tools in this tutorial:

* BlackIDE v0.15.4
* Truffle v5.5.19 (core: 5.5.19)
* MetaMask Wallet v10.16.1
* Docker v20.10.14

### Setting up the Environment
Make sure to setup the following tools for uninterrupted development of your NFTs.

#### Setting up Metamask Wallet
* Ensure that you have the Metamask Wallet extension installed and running on our browser.
* Configure the Metamask wallet for use with the BSC Testnet. Use the following details to add the BSC Testnet. For further details, refer [here](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain?ref=bnb-chain-blog).


**Network Name:** BSC Testnet
**RPC URL:** https://data-seed-prebsc-1-s1.binance.org:8545/
**Chain ID:** 97
**Currency Symbol:** BNB
**Block Explorer URL:** https://testnet.bscscan.com


### Set up Black IDE
Black IDE is available in both desktop and web apps and it is up to your convenience to choose from. For this tutorial, we used the desktop app as the web app lacks support for importing [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/2.x/?ref=bnb-chain-blog). Download/install any dependencies required by BlackIDE.

![install-blackide](https://lh5.googleusercontent.com/dlvLdPRdZuHW1HRLhqpQJ2XE6yULSBBis5jEbwIu1NNROPislJeKNazUx81FCpBHPuplE216u_53UV-g_4IndV2xxdkFDIVEAZjfRsVV9Q-J-MIQ4_8lajsdKbbuCP4vb4OpPB8TullPQddt7iITRq2X7h3Y)

#### Login into Black IDE

* Open the Black IDE desktop application. We will be using it for compiling and deploying our smart contract for NFTs on the BSC Testnet.
* Click on the Login button and authorize using your GitHub account.

![login-blackide](https://lh4.googleusercontent.com/ljy35_X4X4-sBfay6rToOdbySZw3K1JQ8_VXoQ_Bdhptf-EpCMokxRSJZB06ub0egWz3EBYTIaQ1K-m5uKQBpRklD5o3PpMVGyYGIskqZrUt3v2Sc3wxprjioSJHAXOI4rYvOUxFM8L2wnskYPEzbqqZgUqf)

### Creating New Project
* Click on the New button next to the projects to create a new project.

![new-project-blackide](https://lh5.googleusercontent.com/pW2ZDO3R-AoUS4o_koEH40rwAj9rV_p-u5MtrM0cgN6LzF3m0009EvejWyG6drE78xNHy2yrKwHAxjLIrfiK-3MbI-Uwd8zYnPwTTmgfvJaYrEQg5VF518Gha3uv9DSo-ewrDzgLWHjeXCkmxAY6VOU9okml)

* Specify the location where you want to save your project on your device, the project name, e.g. “BSC-NFT”, and select the project type from the dropdown list as “Basics- ERC20, ERC721, & ERC1155 (v31+)”. Then click the Create button to create the project.

![project-directory](https://lh5.googleusercontent.com/O6_cpaZ8xE0eQjjXc6d6DU7n-1QztMnTy13mJSioU6Eid20gRG0EfU8iYzZLOqiO1g2HSLy1DvXv0RDt470fkYZXty9BI_JaqyBl987RmnDJoliGa_-LaRzVe36zZo0v2RsVcvQ533WT6wJoICrkcwCibZ_o)

> Remember the smart contract in this tutorial is just a sample, you can always modify and be innovative.

### Smart Contract Creation

* Expand the contracts menu and delete the default files.

![img](https://lh3.googleusercontent.com/T79z59dbfTeI6sEpbOB8FGV1VGNSPrTSH6vwXVU7i8yqTz7cZcciuWiE-xubk3SGlFb4stRFjivTDsCwBG9i8ECacQA3fu-dStZCOaRyPo5dv4YHAQvPSyRWK0LWcehpLnItt-HnrdqyAS2wWDxSS_uF_ntQ)

* Right-click on the contracts menu and select New File. Specify a name for your file, e.g., BSC-NFT.sol, and then click Create button.

![img](https://lh3.googleusercontent.com/-_AoMZC1e3DgF_eyEzmEH6bLqQ62Xj3gB_5aasMcEEpsIi7ok0BxGtrDxFBfTi0gykXHIR_s_Fda4u-iR92h8EU2DtEdHp61s2ZTzMgmKH57OI73ZyjalNOMBOaVStdZVNff0qN-RTupvEEo15ytU4ILYGzq)

### Write your smart contract code

* Copy the following code into your smart contract file. We have used the contract code from [this repo](https://github.com/RumeelHussainbnb/ERC721_NFT/blob/main/BSC-NFT.sol?ref=bnb-chain-blog).
* Remember to change the `MINT_PRICE`, `MAX_SUPPLY`, `name`, and `symbol` of the token as per your need. Also, remember to change the `_baseURI` as per your token.

![img](https://lh4.googleusercontent.com/8l5OLBqEi9zslA6tknuNeH05w8jB822yrk_JVb8pN8gAymc0_djIo0vf6xzoeBVWDyZrTXq6sxXM_3QcHt6WcUopvD12XA7t_OVtkduq6XgAx60eYcAXpAjygO9h8q0uncIM5SDaAstSiMCtWtuWa_MSIsxC)

![img](https://lh6.googleusercontent.com/HuhzQoMP0QQBde6zHX9qmY-p0fXveVvv3jNnG506X_2HCX6wVPIugO5NDp0baSmurxJ8ZcTw27AZ0BbD_zNxiKMr8PQJTTiT63LPvPnL-9ShTSX8sP7Nv-sIRuQzg5ai4Lsknxm1HpVHUL3WJ_RS_FBn9PTG)

### Edit default project settings

* Click on the `config.json` file to change the default setting. 
* Change the `main` file name to the name of your contract, `BSC-NFT.sol` in our case. 
* Similarly, change the name of the smart contract to deploy, `BSCNFT.json` in our case.

![img](https://lh4.googleusercontent.com/d01MjBMm9qZqRF1GfMVp36WxM19czl2sgE10iH07plXVkP2BCbkg1Yh2785C16lxtRhxpaMAVcnuXU97DDsHEUIdU55EQZAScG4Ffp1icIx6rcmHr-JKi8sYW1ldSgj99NPsV7D0yYHXFUOvoMhWCZf5r_m_)

### Connect the Black IDE to the BSC Testnet

In order to connect the Black IDE to the BSC Testnet, click on the dropdown icon on the network menu in the top right corner and then select `Testnet` under the `BNB Chain` label.

![img](https://lh6.googleusercontent.com/Ujx0CHDLSegHBxA9BWJpPynZMgBjH5bWM6vVxbJGDsKAsa9rcov10v4_-RaNNLMrxT9Thy4UU0of2VYZKyAlZvKLcL6MT_QvOaS0XInI9BJnH1lbNO_Lu_M0f0waqHvy9jD8O8skkF2QCra3e-JQBpO4g2Lj)

* Click on the key icon in the bottom left corner of the IDE to generate new keypair to perform transactions. You can skip this step if you already have generated a keypair. On the Keypair Manager, click on the `CREATE` button to generate new keypair.

![img](https://lh4.googleusercontent.com/JYp5sV6e7PotV6ysn9lOG6NU2ZMVLpiuwHkzm6q3chpooeey-d28lK9JQocOTygGBdvv4VMHoS2iHsR2JB91e10D6xXltujKvh_SU8phqHytmfuVJ4RRC88aT0xI-bCHLFIMJDkGkupjAyeCzxEMI1-bPYEn)

* Specify your desired name for the keypair, in our case `BSC-Testnet-Key`. Then click on the `CREATE` button. _Remember to keep your private keys securely and not share them with anyone_.

![img](https://lh3.googleusercontent.com/jgmndi5F1r4R7eZblyzSMlKEszLxCMLo0hQ8JbMqIr145-fXHvjxL8b8SR-3U3Gf0Ajg7nMUva3guNXZLgFOmYSOTjWKDqnbUtY4KmQpV8YFbZCaC7a2GHPPE3imnRz02ZSfwOFOoePxQ9cRtRUPBgYf_7UQ)

### Acquire BNB Test Tokens

* Initially, the balance of a newly created key pair is `0.0 ETH`. To get BNB test tokens, you can use the [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart/?ref=bnb-chain-blog).
* Copy your public address from the keypair manager.

![img](https://lh5.googleusercontent.com/07moF8f8_CCjaBp9hjW0Uwz61yhwb7ILB48VF9PRE6tBhL1JEdv_0PUeIoGkl3kPr1eB_YSXVG0FqNCH0PBFTcQyZgYnjlyCBXBKOLeZIkEWj-jNn_CKc2LTub951Cwj62AgjzPs6RtGyzHkYkW2SYLfeVGP)

* Paste this on the facet and acquire test tokens as required, as shown below. A green pop-up is displayed on the successful transfer of test tokens.

![img](https://lh3.googleusercontent.com/y1Bp3pjFnWVEUbmERaq5iw_KG_NTljEeecqWpu8CQf8BqXyvQKXmRHdu--fXlIIBm5l6HwWfKQIhx1AcKnSuvB8_eDnK8p8KtwK8ZNErH3IArGJhhzvD30panEKkoavVxZry1ju28aA0aR_dk-_2l0uETR21)

* Close and re-open keypair manager to verify that the balance has been updated. Wait for approx. 1-2 mins for balance to get updated.

![img](https://lh5.googleusercontent.com/BX0Nyx_C6AVZ3sXpao5zew6gnKYfwiTW-1yUpm37M88RKSkKZuyYA76F8RLsmw-As-uH8vTX32pRfnqQqeiozpen48VtDNp971D2MQNC5LTNOg4IcsqGGTYHeKv7ku80NytFJKRWV0bpbA2aSVYDM6xFUWJg)

### Deploy Smart Contract on BSC Testnet

* Select the appropriate Solidity compiler version from the bottom right corner of the IDE,![img](https://lh5.googleusercontent.com/Qn-EGE4oG1Vy8__HuYPC0ra2asOQOtoAFtbMRAad3-ASW0fOcpx4qa5AJnGuaYqRLptwNvDrcahIivMLE-ecGkzngudEfmmUHIeoVKrjleSpJHfF8L5wUrPvSoe1O7-Qdr_IgtxidYniyyOgldIO7dg9Wj_T), Solc (0.8.4) in our case. 


* Click on the Build icon ![img](https://lh4.googleusercontent.com/h3qpOGTy31JA_NvpQsqq-M_pz8HpCjMfhCxxpJhekrvH84ao1npdS0a2GD5xyOUwHk3CjBqTCz6StKlVWnkItJDcIdl_6lBzYkOv1FTNBN-tKkGAoRmEBgL921Aycgu0ypmW8bfhaB1W1AqDBzm4GC71413a) to build your smart contract. 
* Upon successful build, the project navigation pane reflects a new folder named build. This folder contains contracts folder that has `json` files of the contracts built. All of the contracts imported in our `BSCNFT` contract are also built and imported as `json` files.

![img](https://lh6.googleusercontent.com/vc3r8tPTnFpsQPe1NCFJ0UwnNSdSHkd7wWv8CTW71QJq7iRusJmGyphMSAdqhVMySbhZU33iO7p-6-mqdWuqIC6gm4FyXlUHK3fgd9K2KDz_Mdl_BtdMfJXy20u7XljjXQX_nZgFsEM7iWIWoNJiULDN9R8A)

* After successfully building your contract, it’s time to deploy the contract. Click on the Deploy icon ![img](https://lh4.googleusercontent.com/qwC8bd9QiK8ifEQawSvqI3NqvqKLdD_XF_iuqKw1Qw__WC76STId-liGLTmfe85BwEFwvBUo7DUwrcOFd31Gb05FEzWd7jFEBNSkoMo3xkZX_WbjABkX07DScd2hUOO7HRUQyDFDtkjVDx1LY34K7-mvkauD) for deploying your smart contract. Specify the details for your contract, as shown below, then click on the Estimate & Deploy button. The wizard will auto-estimate and fill the gas limit for your contract. Then click the Deploy button.

![img](https://lh6.googleusercontent.com/bSHMODyxWp9pMzE7n3N-Yvyh4fZMNObilH0KtUgDAGJnMTEOsO_6NMYstsqqLVmp1I2_L1gaPgVuubynjUdbKxzmDuqeEc66RvQPyPEc6Fr1qquY9o4r2dQhqovDC0wc5E4AmD6Cf5Y63j1KbF-qCYpTxBlA)

![img](https://lh3.googleusercontent.com/da7R_pp2xamNrqvsNok4E4Y9a1E1iEYTvsTBq5rzeoQpEmradS8FNdQYxedltAkoON9J9m6mpTj1rzYf3__qX_pf1u1dvn8IPBNLLl0OWZU_jVkm2dG5fbssVxkwH-EcIzPTnKQjqieNbmHDnOwc3ABKp8ce)


* Deployment details will pop-up, as shown in the figure below.

![img](https://lh3.googleusercontent.com/Py4-4KkxvmrsVstrJoi9FsSLYXVU-l5l_-ZxbovDMewTPOMCIQc1dczPtpyXMRjAtMxpbbcOniqkQitcEhlh0ofG5H3q1OZy117ANZe8VONGSUsDMXFvkexskI8Zejtl_iQN6FQI3d6cJz6aP6z78JJ0t4jJ)

* The status of the transaction will be updated to confirmed after the transaction is confirmed as shown in the figure below

![img](https://lh3.googleusercontent.com/66_t4BaKS4oM5UDuxeME0Ji4yBocqX84xGYsQmcS9kWwBaDiBQLmS4-oqMhIhudUI2KHnTLFIuehTaFdlT29nUqzqkASKuWbOSrWEayFbS5jl382C1zfY-hdM1AoAxcRCsnRsuCh8Kel3FniV8tiv_YInwdN)

* You can also view this transaction by clicking on the transaction icon in the bottom left on the IDE.

![img](https://lh3.googleusercontent.com/DtTis6cJRLVzE80a4dtzV_AvUbm7RtmMaKdDZGoplqSBySCpF1pO8_yE6FysOWJdeeUlfKFbfMXe773Lpw-dJE93hh1CNbPx6H8i4rYgRemPYMfhQUMInS6a6mQGpMSonp5NZPXp3U-A0VX_wxgaOjD8JReM)


## Interact with deployed smart contract and Mint NFTs

You can also interact with the contract using the different functions. 
* Click on the `Transactions` icon on the bottom-left corner of the IDE and then transaction of deployment of your smart contract. 
* On the transaction details, click on the `contract address` to access the functions to interact with the smart contract. 
* The left most column has all the `Write Functions`. The middle column has the `View Functions` and the right most column has the `Events` details.

![img](https://lh5.googleusercontent.com/YX6iaTcoBAkT2PyIohOU9BuiSP3D8-AJJGY_WyfiYRr90UBb9Yr8D0FaOAlFYK0kNwDEE0EKv82ZqdIvETxEFEn88o5YXGKXww7MRjT8s0HrzxH91cyXTbxVnuWfXVB1He1dxqFwQ0EaIalgQ2DphoBkQ7hM)

![img](https://lh5.googleusercontent.com/gpLyKEJrMrcR83r7XfdFjW974LlMIHvu57541kv4Gl5FkfWGXY7-_DBOM8-kPFSLgYQeNt9gcBDPqNiq4ngWo797ah1c-Z9GJHHGAZN7D8oFVp3a9S69O1OZMieKktoBwwAWRYY8u5rYug19M8C2o2lV-73b)

### Mint NFTs

* As per our smart contract, when the contract is deployed, unless the NFTs are minted they won’t be visible in the wallet.
* Create another keypair as defined previously. We will be issuing i.e. minting NFTs to the public address of this new keypair.
* To mint i.e. issue an NFT to a specific user we use the `safeMint` function of the deployed smart contract. 
* As shown in Steps 1 and 2 in the figure below, navigate to the deployed contracts, then in the left-most column click the drop-down menu to view the list of write functions available for use with the deployed contract. Select the `safeMint` function.
* Use the `safeMint` function to mint new NFTs to a specific user address. As shown in figure above, steps 3 to 6, enter the `ETH to send` as the minting price of NFT, as per our smart contract the minting price is `50000000000000000 Wei`, i.e., `0.05 ETH`. We entered `0.06 ETH` to cover the transaction charges as well. 
* Then select the address to whom you want to issue (mint) an NFT to. Here, for the `To` address use the newly generated keypair in the section above. 
* After this, click the transact button ![img](https://lh5.googleusercontent.com/GT7D9CJpK9ccdEFz6wmvmA7gp2hwOZ8YZcWp5X18qB-roYKNXxzS5rFY2qki07uXqR_BT7jYKpO-gPsnmXjO-Kyjy5CPPslBF_IdqVZ3MeN9mvCQj0X4vnA-zPoZKicQ3x68v_8pUaSQZtZ8W1DD3abAPiQ2) to execute the safeMint function. 
* For the `Signer`, ensure that you are using the account that was used to deploy the smart contract.

![img](https://lh4.googleusercontent.com/0cM-MOcYXjyuxb5BIBZGrwYG33Q5Dp9-jIKO12iewFFqs474v73bd2nrlnF7UfMUVGxVgDqoI3kwIRvDzVPLljebN7fAwKC_ub2z97uKU5PB3-_99ssmxAZzcj5_liHgMvqx5vKD4zEddRw-kjUJEhCyUIXf)

* To confirm what transfers have occurred, execute the `Transfer` event from the right most column. This will display the list of `NFT transfers` along with `NFT token id`, as shown in the figure below.

![img](https://lh4.googleusercontent.com/luqEKvJoui8AOeijgdJBfLbpNj4xtfX5JZgVLhSGINwLhEqsUoGWA2gfRlXJczuyvI3gXdjjDz2xmuvEyZnAi91hTh3Bh-jxh_i09SvuSPcijWRBU2xPiBc3WT9eEPdmG6IfDSqatteZ1oAhJJkKEHjpnLyY)

* To confirm owner of an NFT, use the `ownerOf` function. Pass the `token id` as input to the function, as illustrated in the figure below.

![img](https://lh6.googleusercontent.com/O5pHGRIIYEKBMSAgiKEJVBbCChA1LJqfSlsk9Op5aGD_8zKCJ6ZKKawARluvFJ6H25H7dLnBLmda0gzxeJPqk0URrZdIRdqKfXsFduxHOkbTYr6VzhbY5yOWfOX1YB32ib70qCbC-JARcevUmo0)

### View Your NFTs in Metamask Wallet

* On the receiving end, the user can import the NFT token details into their Metamask wallet to view the assets.
* Please note that currently, Metamask Web Extension does not support the use of NFTs however, the mobile app version does support it. For the next steps to view the owned NFTs in your Metamask wallet, we will be using the Metamask Mobile Application.
* Open Keypair manager on the Black IDE and copy the private key of the keypair that you minted i.e., transfer NFT.

![img](https://lh6.googleusercontent.com/fT_5jsKZCIiIWCfqoH-x24uwtdYi3ucsJAnbaYdcIgq7flEUkDGR8iL4VHQlBwaVvYeeEm7u7NiEay2g6Rb1bzK3T2_jrtBqpR0vPu_JHCkrJdz0SgrdSEccGHkstQHng8YhslSSJUWu3ZNAXKSQfnzFu8ZK)

* On the Metamask wallet mobile app, import an account using this key pair. Enter the private key copied in the previous step and click import.

![img](https://lh5.googleusercontent.com/G-bxlCUJIlCiL4v7yjDq5VcS45gKPk8qu1ZhHIG6YVIGYICjFncM7h2Ft37CP-J7YTpQY8GvFvkLLhxx_D4QhES4NCNHDke_5NRyUTee_yt1j1lr83VbkBEUg-OV_vIgCUOiUJS0rHdUnksX-Jyyjxs9ivtV)

* After importing account, the next step is to add the BSC Testnet configuration to the wallet. Ensure that you are using the same account whose pubic address was issued the NFT.

![img](https://lh6.googleusercontent.com/wgq_nLXiVuYJ_cON0ChHb9RfyTJEqhPRWUakGcmlx0DFo5lMorlfQqY4N1ba1EEjYIiq5IMEcYi7ZsShdtzaFpwdugZn8rLNvUjdlyD7SAPJ0Oz96tBM-aCgF3erRZ716Emeo36mmv5QnvTJqcJFuW97NkW9)

* Ensure that your account is connected to the BSC Testnet. Also, ensure that you have enough BNB test tokens in your account. If not, you can use the BSC Testnet Faucet to acquire some, as mentioned earlier.

![img](https://lh4.googleusercontent.com/ErxLlKRDtjIgHZ4hCeDWnGVbXbtdFj0sTxOB5Ga-8zqTJxODI5d6MJyooOKbSJWgHVVpxVC6PegZzjwuBgySkadFcujkhU_KF9GxlJ773-OckqghaeNjljs87nXfSr8AVIXHTwvA8-a-d0OIIVoF5KVk48EO)

* To view the owned NFT assets your Metamask Mobile Wallet, click on the NFTs tab and then on the Import Tokens. Fill in the NFT details. In the address field, pass the address of the deployed contract and in the Id field pass the tokenID. Then click the Import button.

![img](https://lh5.googleusercontent.com/hRZa-yYFrRQ9LLE3KTRW8C29SaaCun4cBHRUX5qbN91dZzpvWIqEHO_LXHAzzMlnsta8Jc2Ejl9yoRxdEIWyNeci2K1tDLeWRF-rH38QDKoIXst6NTeb8HGm1eXYNQPNY582HLzcWX71X0z5qZc9EjkVWZz2)

## Conclusion
In this tutorial, we provided a step-to-step guide on how to issue, mint and transfer NFTs on the BSC Testnet using the BlackIDE from Obsidian Labs.. The technology stack used in this tutorial includes Solidity, Truffle, MetaMask, and BlackIDE. Check out our [GitHub](https://github.com/bnb-chain/bnb-chain-tutorial?ref=bnb-chain-blog) for more tutorials on how to develop on BSC. If you have any questions or are stuck, reach out to us on our [Discord](https://discord.com/channels/789402563035660308/912296662834241597?ref=bnb-chain-blog).