# Token Standards

## Lesson Objectives 
*By the end of this lesson, you will be able to:*

- Have an understanding of the native and supported tokens by BNB Chain.

## Overview

Over the few years, blockchain technology has evolved with respect to several different features like design, infrastructure, working mechanism, etc. However, with new platforms offering much more attractive features, it is common for blockchain-based projects, aka decentralized applications (dApps) and crypto tokens, to migrate from one blockchain to another. 
Launched in 2020, BNB Chain quickly gained a lot of popularity due to its distinguishing features of low cost and faster transaction rate. Several projects based on other blockchain platforms are already migrating to the BNB Chain platform. 
In this lesson, we provide an overview of what tokens are and supported tokens by BNB Smart Chain.

## Token Standards
Ethereum is the pioneer of blockchain platforms to provide smart contract functionalities and standards for developing crypto tokens. However, with time, several blockchain platforms have emerged, some being EVM-compatible and others non-EVM. With a multitude of blockchain projects issuing their own tokens on different blockchains, it is important to make sure that these tokens are compatible with the underlying blockchains and adhere to the platform’s token standards.
To ensure compatibility, interoperability, and security, token standards are issued. These are a set of rules for the issuance and implementation of new tokens. The most commonly included requirements in these token standards are the token’s total supply limit, minting,  burning, and the process for performing transactions using the token.
Furthermore, token standards are designed to help avoid fraud, technical incompatibilities between tokens, and issuance of tokens not aligned with the blockchain’s principles. For example, the rules for total supply and new token minting help contain potential token value depreciation.

### ERC Token Standard 
One of the most popular token standards is the ERC standard. ERC (Ethereum Request for Comments) is a set of rules defining the issuance and implementation of tokens on the Ethereum Blockchain. ERC20 is a technical standard that describes a common set of rules that should be followed for a token to function properly within the Ethereum ecosystem. It is one of the most commonly used standards and is usually used for fungible tokens in the form of cryptocurrencies. Other popular ERC standards are ERC-721 (NFTs) and ERC-1155 Multi-Token Standard.

### BEP Token Standard
Similar to ERC, BNB Chain defines its own set of standards for token issuance, management, and implementation known as BEP (BNB Evolution Proposals). BEPs are token management rules and pre-defined criteria for launching on-chain assets on BNB Chain. The most popular BEP standards are BEP2 and BEP20. BEP2 is the native coin of the Beacon Chain. Whereas BEP20 is popular for use on BSC. It is to note here that BEP20 is very similar to ERC20 and extends its functionality. Note that BNB, which is the native token of the BNB Chain ecosystem, is a BEP2 token.

### Difference between ERC and BEP tokens
Both ERC20 and BEP20 standards are very similar in mechanism. However, ERC-20 is dedicated to Ethereum, whereas BEP-20 is dedicated to BNB Smart Chain. In simpler terms, each of these is a token standard that belongs to a different blockchain.

#### ERC20 vs BEP20
In this section, we provide a brief difference between the ERC20 and BEP20 tokens.

| ERC20                                                                                                                                    | BEP20                                                                                                                                |
|------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|
| Gas fees are paid for performing any transaction on the Ethereum blockchain. Ethereum has higher gas costs as compared to the BNB Chain. | Gas fees collected to create BEP20 tokens are   comparatively lower than ERC20 tokens.                                               |
| ERC20 transactions are slower, as up to 15 seconds are required for them to take place.                                                  | Transaction speed is 5 times faster as BEP20 transactions   take up to 3 seconds to take place.                                      |
| Proof-of-Stake (PoS) algorithm is used for the verification and validation of ERC20 transactions, ensuring higher security.              | BEP20 token also offers high security and uses   Proof-of-Staked-Authority (PoSA) for verification and validation of   transactions. |
| ERC20 tokens are mostly used for crypto crowdfunding, trading, staking, etc.                                                             | BEP20 tokens are mostly used for crypto crowdfunding,   trading, staking, etc.                                                       |


## Token Standards Supported by BSC
BNB Chain is an ecosystem that runs on two blockchain giants, namely, Beacon Chain (BC) and BNB Smart Chain (BSC). The native token standard for Beacon Chain is BEP2, while the native token standard for BNB Smart Chain is BEP20. BNB ecosystem’s native currency, BNB, initially launched as an ERC20 token, is in fact a BEP2 token.

### BEP2 Tokens
Beacon Chain is essentially a digital asset creation and exchange platform. Beacon chain is responsible for the governance of the BNB Chain ecosystem, which includes staking and voting. BEP2 is the token standard for BNB Chain’s native currency, BNB, on Binance’s crypto exchanges. It is a unique token standard. BEP2 is not compatible with blockchains other than BNB Chain. Additionally, BNB in the BEP2 format can only be used as a transaction fee on both Binance cryptocurrency exchanges. One limitation of BEP2 is its lack of support for smart contract development. For more information, you can read the full BEP2 proposal [here](https://github.com/bnb-chain/BEPs/blob/master/BEP2.md).

### BEP20 Tokens
BSC is the blockchain component of the BNB Chain that provides its users with a smart contract facility and is a platform for dApp development. BEP20 is a token interface standard for creating token contracts on BSC. The BEP20 tokens are designed to be compatible with BEP2 and [ERC20](https://eips.ethereum.org/EIPS/eip-20). It extends ERC20 for compatibility with EVM chain and Ethereum smart contracts. Other than the ERC20 functionalities, the BEP20 standard contains additional interfaces, such as getOwner and decimals. For more information on BEP20, read the full proposal [here](https://github.com/binance-chain/BEPs/blob/master/BEP20.md). 

