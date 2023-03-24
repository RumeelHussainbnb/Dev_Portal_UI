# Types of Nodes in the BNB Chain

## Lesson Objectives 
*By the end of this lesson, you will be able to:*

- Have an understanding on what are the different types of nodes in the BNB Chain Ecosystem.
- Have an understanding of what is the role play of the different types of node.

## Overview
In the BNB Chain Ecosystem, there can exist nodes that play different roles based on how much information they are storing. In general, there are full nodes and accelerted nodes. Full nodes store the full blockchain history on their disk and can answer the data request from the network. They further receive and validate new blocks and transactions and are also responsible for verification of the states of every account. On the other hand, accelerated nodes are a special infrastructure built around Validator to facilitate accelerated transaction routing and provide richer, faster user interfaces. 

## Full Node Node Roles

There are two types of Full Nodes in Beacon Chain  network: validator nodes and witness nodes.

### What is a Validator Node?

Validators are a group/IT infrastructure that take the responsibility to maintain the BNB Chain's data and validate all the transactions. They join the consensus procedure and
vote to produce blocks. The fees are collected and distributed among all validators. 

### What is a Witness Node?

Witness nodes represent the majority of nodes in the BNB Beacon Chain deployment. Although they do not join the consensus process and produce blocks, they take care of:

- The witness consensus process.
- They serve as data replicas and help to propagate the chain state around the network.
- They receive transactions and broadcast them to all other nodes including Validator nodes.

You can see the witness node information from this endpoint: https://dex.binance.org/api/v1/peers

For mainnet, there are some witness nodes.

- `http://dataseed1.binance.org/`
- `http://dataseed2.binance.org/`
- `http://dataseed3.binance.org/`
- `https://dataseed4.binance.org/`

For testnet, there are some witness nodes.

- `https://data-seed-pre-0-s3.binance.org/`
- `https://data-seed-pre-1-s3.binance.org/`
- `https://data-seed-pre-2-s3.binance.org/`

To see the existing RPC endpoints provided by witness node, check the list  [here](https://docs.bnbchain.org/docs/beaconchain/develop/api-reference/node-rpc)!

### What is an Accelerated Node?

While users can submit transactions and most of the queries via normal, self-run full nodes. Accelerated Node provides more secure and faster lines to access BNB Chain.

Accelerated Node is a special infrastructure built around Validator to facilitate accelerated transaction
routing and provide richer, faster user interfaces. There are always several Accelerated Nodes running
at the same time around the world (owned by different organizations) and you are encouraged to choose
one of them to use, or allow your Wallet choose one randomly.


For rapid API access, you'd better stay with one Accelerated Node to get better performance.

For mainnet, there are more accelerated nodes.

- `dex-atlantic.binance.org`
- `dex-asiapacific.binance.org`
- `dex-european.binance.org`

For testnet, there are 2 accelerated nodes setup as below. API users should try to use them directly.

- `testnet-dex-atlantic.binance.org`
- `testnet-dex-asiapacific.binance.org`

To see the existing endpoints provided by Accelerated node, check the list [here](https://docs.bnbchain.org/docs/beaconchain/develop/api-reference/dex-api/paths)!

