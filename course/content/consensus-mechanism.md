# Consensus Mechanism of BNB Chain

## Lesson Objectives 
*By the end of this lesson, you will be able to:*

- Understand different consensus memchanism 
- Understand the consensus mechanism used in the BNB Chain
- Understand the validator selection procedure of BNB Chain

## Overview
The consensus mechanism of BNB Smart Chain is called Proof of Staked Authority (PoSA), which combines elements from both Proof of Stake (PoS) and Proof of Authority (PoA) models12. PoSA relies on a system of 50 validators who stake their BNB tokens to secure the network and validate transactions. BNB Chain is working towards expanding the size of validator set to 100. Validators are elected by BNB holders who delegate their tokens to them. Validators receive rewards for producing blocks and processing transactions, while delegators receive a share of the rewards from their chosen validators. PoSA allows BNB Smart Chain to achieve high performance, low fees, and fast finality.

## What is Consensus Algorithm 
Consensus algorithms are protocols or processes that are used to achieve agreement on a single value among a group of distributed processes or systems. These algorithms can be evaluated based on several attributes, including fault tolerance, scalability, security, and decentralization. The nodes that participate in a consensus algorithm are known as validators.

## Proof-of-Authority Consensus Algorithm 
Proof of authority (PoA) is a consensus algorithm that uses identity as a form of stake to validate transactions and create blocks on a blockchain network. PoA was proposed by Gavin Wood, the co-founder and former CTO of Ethereum, in 2017. PoA is based on the idea that trusted entities, known as validators, can secure the network by verifying and signing blocks with their reputation at stake. PoA is faster and more scalable than Proof of Work or Proof of Stake algorithms, as it does not require mining or staking of coins. However, it also sacrifices some degree of decentralization and censorship resistance, as validators are pre-selected and have more power over the network. PoA is suitable for private or permissioned blockchains that prioritize efficiency and security over openness and anonymity. Some examples of platforms that use PoA are VeChain, Bitgert, Palm Network and Xodex3.

## Delegated-Proof-of-Stake (DPoS) Consensus Algorithm
Delegated Proof of Stake (DPoS) algorithm is a consensus mechanism that allows users to delegate their voting power to a set of validators who are responsible for creating and validating blocks on the network. DPoS was developed by Daniel Larimer, the founder of BitShares, Steem and EOS in 2014. DPoS aims to improve the efficiency and scalability of Proof of Stake systems by reducing the number of validators and introducing a democratic election process. Validators are rewarded for their service with transaction fees and staking rewards, and they can be replaced by other candidates if they fail to perform their duties or act maliciously.

## Proof-of-Staked-Authority (PoSA)
Proof of Staked Authority (PoSA) consensus algorithm is a hybrid mechanism that combines Delegated Proof of Stake and Proof of Authority. BNB Smart Chain utilizes the PoSA consensus algorithm. In PoSA, validators stake BNB tokens and take turns to produce and validate blocks. Validators receive rewards from transaction fees and BNB staking. Users can also delegate their BNB tokens to validators and earn a share of the rewards1. PoSA aims to achieve high performance and low costs while maintaining a certain degree of decentralization and security. BNB Smart Chain relies on a set of 50 validators, targetted to be expanded to 100, for the consensus mechanism.

## BSC's Consensus Engine
BSC uses the PoSA algorithm which is a combination of DPoS and PoA algorithms. The aim of this to acheive

1. Blocks are produced by a limited set of validators
2. Validators take turns to produce blocks in a PoA manner, similar to [Ethereum's Clique](https://eips.ethereum.org/EIPS/eip-225) consensus design
3. Validator set are elected in and out based on a staking based governance

The consensus protocol of BSC fulfills the following goals:

1. **Faster Block time:** an average of **3 seconds** on mainnet.
2. **Faster Fianlity:** it requires limited time to confirm the finality of transactions, around **45 seconds** for mainnet.
3. **No inflation of native token:** BNB is a non-inflationary token, the block reward is collected from transaction fees, and it is also paid in BNB.
4. **EVM compatibility:** BSC is 100% compatible with Ethereum system.
5. **Advance Governance:** PoSA allows modern proof-of-stake blockchain network governance.

## Validator Selection
The BNB Smart Chain (BSC) uses a Proof of Stake (PoS) consensus mechanism where validators are responsible for maintaining the network by validating transactions and blocks. Validators are chosen through a selection process that involves staking the native token of the ecosystem, i.e., BNB and participating in the consensus process. Here is a high-level overview of the validator selection procedure for the BNB Smart Chain:

* **Stake BNB:** Anyone who wishes to become a validator on the BNB Smart Chain must first stake a certain amount of BNB tokens. The minimum stake required to become a validator is **10,000 BNB**.

* **Apply to become a validator:** Once you have staked the required amount of BNB tokens, you can apply to become a validator on the BNB Smart Chain. The application process involves submitting your node information, such as your IP address, public key, and other details.

* **Wait for approval:** After submitting your application, you must wait for approval from the existing validators. Existing validators will review your application and vote on whether or not to accept you as a validator. The voting process is conducted using the BNB Smart Chain's governance system.

* **Start validating:** If your application is accepted, you can start validating transactions and blocks on the BNB Smart Chain. Validators are responsible for validating transactions, creating blocks, and maintaining the network. Validators earn rewards in the form of transaction fees and block rewards.

* **Maintain a high uptime:** Validators must maintain a high uptime to continue to earn rewards and retain their status as a validator. If a validator's node goes offline or fails to perform its duties, the validator may be penalized or removed from the network.

Overall, becoming a validator on the BNB Smart Chain requires a significant amount of BNB tokens, technical expertise, and a willingness to maintain high uptime and participate in the consensus process.


## Conclusion 
The BNB Smart Chain (BSC) uses a Proof of Stake (PoS) consensus mechanism where validators play a crucial role in maintaining the network. Validators are responsible for validating transactions and blocks, creating new blocks, and ensuring the security and stability of the network. Validators are chosen through a selection process that involves staking a certain amount of BNB tokens, applying to become a validator, and being approved by the existing validators.

In the BSC, validators are incentivized to act in the best interest of the network. They earn rewards in the form of transaction fees and block rewards for their work in validating transactions and blocks. Validators are also required to maintain a high uptime to continue to earn rewards and retain their status as a validator. If a validator fails to perform its duties or goes offline, it may be penalized or removed from the network.

