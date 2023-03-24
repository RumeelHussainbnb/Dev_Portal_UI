# Architecture Overview

## Lesson Objectives 
*By the end of this lesson, you will be able to:*

- Understand the cross-communication architecture between the Beacon Chain and the BNB Smart Chain.

## Architecture Oveview 
BNB Smart Chain (BSC) is a blockchain that runs parallel to the BNB Beacon Chain (BBC), which is the governance and staking layer of the BNB ecosystem. BSC is designed to support smart contract functionality and interoperability with other blockchains, especially Ethereum. BSC has a two-layer architecture, comprising:

* The consensus layer, which uses a Proof-of-Authority (PoA) algorithm called Parli. This layer consists of 50 validators that are elected by BNB stakers on the BBC. The validators are responsible for producing and validating blocks on BSC24.

* The execution layer, which is compatible with the Ethereum Virtual Machine (EVM). This layer enables developers to deploy and run smart contracts written in Solidity and use tools like MetaMask and Truffle. The execution layer also supports cross-chain communication with other EVM-compatible blockchains through relayers and oracles.

![Cross Chain Architecture](https://docs.bnbchain.org/assets/images/bnb-cross-chain-a7b783e024746b0ec2d14a4e3d098b93.jpg)

Cross communication of BNB Beacon Chain and BNB Smart Chain is a protocol that allows the transfer of assets and data between the two parallel chains. It involves the following components:

* **Build-in System Contract:** A smart contract on BNB Smart Chain that verifies and executes cross-chain packages from BNB Beacon Chain.
* **Oracle on Beacon Chain:** A module on BNB Beacon Chain that verifies and executes cross-chain packages from BNB Smart Chain.
* **BSC Relayer:** A service that submits cross-chain packages from BNB Beacon Chain to BNB Smart Chain.
BSC Relayer Incentive Mechanism: A mechanism that rewards BSC Relayers for their service.
* **Oracle Relayer:** A service that submits cross-chain packages from BNB Smart Chain to BNB Beacon Chain.

The cross communication process works as follows:

* When a transaction or state change happens on one chain, it triggers a cross-chain package that contains the relevant information and actions.
* The cross-chain package is passed to the relayer service, which submits it to the other chain as data into the build-in system contract or oracle module.
* The build-in system contract or oracle module verifies the package using light client protocol, which involves checking the block header, pre-commits, validator set, and Merkle proof of the source chain.
* If the verification passes, the build-in system contract or oracle module executes the actions corresponding to the cross-chain package, such as transferring tokens or calling smart contracts.

Some examples of cross-chain packages are:

* Transfer BEP2 tokens from BNB Beacon Chain to BNB Smart Chain as BEP-20 tokens.
* Transfer BEP-20 tokens from BNB Smart Chain to BNB Beacon Chain as BEP2 tokens.
* Call a smart contract on BNB Smart Chain from BNB Beacon Chain.
* Call a smart contract on BNB Beacon Chain from BNB Smart Chain.

## Conclusion
BSC aims to provide a fast, scalable, and low-cost platform for decentralized applications (dApps), especially in the DeFi sector13. BSC also has a rich and growing ecosystem of dApps, tokens, and projects that leverage its features and advantages.

