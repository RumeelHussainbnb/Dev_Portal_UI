# How to Integrate The Graph and Create and Deploy a Subgraph Using MegaNode Archive Node

## Lesson Objectives
*By the end of this lesson, you will be able to:*
 - Integrate the Graph with use NodeReal's MegaNode Archive Node RPC endpoints
 - Index historical blockchain data and fetch it as per your requirements. 
 - Deploy Subgraphs.

## Overview 
In this lesson, we will be using NodeReal’s MegaNode Archive Node RPC endpoints to integrate The Graph with our archive node and index the data to fetch data as per our requirements. 

[Here](https://edgeandnode.notion.site/The-Graph-EVM-Chain-integration-c553178d9f2b4e28adc0483c3d359140) is a quick guide on The Graph EVM Chain integration.

## What is The Graph
[The Graph](https://thegraph.com/) is an indexing protocol for organizing blockchain data and making it easily accessible with GraphQL.

## What is Nodereal's Meganode 
The archive node has all the historical data of the blockchain. In some cases, if you need to access the data from earlier blocks, you will need to access the archive node. It requires huge storage to run an archive node, and typically due to this huge amount of data, it takes a longer time to process.

MegaNode provides industry-leading capabilities for archive node on BSC. It is the fastest and always consistent. MegaNode provides archive data and debugs API on archive node. 

## Demo
For this lesson, it is necessary that you have an application up and running on the [MegaNode Archive Node](https://meganode.nodereal.io/app/dashboard). For more information on how to get an application running on MegaNode Archive Node, please refer [here](https://docs.nodereal.io/nodereal/meganode/getting-started). Currently, NodeReal provides a [3-month FREE trial version for accessing MegNode PRC/Archive Node](https://blog.nodereal.io/en/enjoy-your-first-3-months-of-meganode-growth-plan-for-free/). Other than this, following are the software requirements.

### Software Pre-requisites
- Docker
- Git
- Node.js
- NPM
- Yarn

Before we start, you will need to log in [MegaNode Service](https://meganode.nodereal.io/app/dashboard) first and find your API keys.  Here is a quick [guide](https://docs.nodereal.io/nodereal/meganode/getting-started).

![Meganode-app-API-key](https://lh5.googleusercontent.com/Ok59rXHVIEBKv7sc07YEcwiwnegiuFSmG9ZfOX0w3m6jFMoxRngwjYITKIRIjCtoRe6D15b9zto2R55tyX9HgKxBoXb6AqUKeBu5f0UTdBNWw0jJTH_KtcBJbMTv3ZiDTX_chbbI9LZO2IF0)


### Steps to Run The Graph Node Locally
**Step1:** Clone the following repo using the command `gh repo clone pranavdaa/Graph-Node-Local`

Graph Node Local Repo: <https://github.com/pranavdaa/Graph-Node-Local>

![clone-repo](https://lh5.googleusercontent.com/zKNE7y1aXfiwrX-mbnOQ0MSTQHbnVOQzTt5LHChvvIy_4lCHv4emXdHVH-KzKrWAQiGYLNQbPJc_f5LObhgyCatMbWh2K2RrB1cYLC1fCEB1IlsnSoOzlJ8y7awz03DRFYO1X4hraNhvvNbf)

<Image 
    src="https://lh5.googleusercontent.com/zKNE7y1aXfiwrX-mbnOQ0MSTQHbnVOQzTt5LHChvvIy_4lCHv4emXdHVH-KzKrWAQiGYLNQbPJc_f5LObhgyCatMbWh2K2RrB1cYLC1fCEB1IlsnSoOzlJ8y7awz03DRFYO1X4hraNhvvNbf"
    alt="clone-repo"
    width="30%"
    height="30%"
/>


**Step 2:** Go into The Graph-Node-Local directory to access the files.

![img](https://lh4.googleusercontent.com/SmGU5x50u603huJtwGnxEM8-vjiiUDSA2U0KYfyqUqoFhuFicy93GhdFSrLqFvwdSurSK6Vw44Lf6J0G3AKV_DZl0-29QB8N42p5D3ha5a1GWK71eXnFgR1B_eViujv5Fv5zQy0gBZEWjvSA)

**Step 3:** Edit the docker-compose.yml file to incorporate your network details. Mention your network name in the docker-compose.yml file as well as add the RPC, the API key just mentioned, as shown in the figure below.

![docker-configuration](https://lh6.googleusercontent.com/_IuO0cnkA9mSzWN3TUq1nIt_FVwHiHZL5ui__P7AnAZTysFtWcVlizCILL-T1wCDh-DAAu7-g991j1I80xxnvk2Ep6h6Eu4xKhP39k84y7hbjgo1V6IhF8s72yj7L94tJHl6hw1gucSgWo9c)

**Step 4:** Issue the command docker-compose up to get The Graph node running within a docker container.

![img](https://lh3.googleusercontent.com/gHFBPIspgv_Rsl00_DOHNYdumY9iieX1LKwZyGrnkS6PwHsjrlMXbbPbYUC9gO4lv-NuboIbBN-zwzkI7E1AvXiOc4yArwambb74vwe_iSjrGRfCrExsXG7FYqbWAg_zz2lh4dGG8vfzFs2B)

**Step5:** You can also view the running container in Docker Desktop application.

![img](https://lh5.googleusercontent.com/PBwt2I2WtSKzjG44CXTRaHPCv19WX3YFHaPGx8NBd0uuypusqI15WEW31w4CkzbhflP3tLMDZVVTXE2kdueG-QblMDPhvO1CTA3A1YfJjF2jexhhISkzJ4yeP3ej8iATG1KOxrx5DiffD2wF)

### Creating and Deploying Subgraph
For this tutorial, we will be using the WrappedBNB contract for indexing. You can get the address and contact name of the **WBNB** contract from [BSCScan](https://bscscan.com/token/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c). Issue The Graph `init` command to initialize a scaffold project. This command runs you through a wizard that asks the user to specify different details for the project as shown in the figure below.

Remember, in this example, we have used the contract address and name of **WBNB** as mentioned above.

![img](https://lh5.googleusercontent.com/SzecpJHDGbXjzmE2PfFDXUc6TqMOabdzUQn6MzKaIQyzK-Wn8rg_GgezE93i2VDofBmWn0cunXre5p8OsuHbQWerXZo0dIpqZRNXd02tjfRCPfQUfT7lhlMRHpSgsqOcekH2farHBZORqcaG)

This will create a sub-directory within your current directory where the command was issued with the name specified by the user, **WBNB** in our case. Move into this directory.

![img](https://lh6.googleusercontent.com/HRdMG7rUVoA-thTElVMMsJez8bbQCMyFEFf9dyT1butyz2lyfh2-jO6IJ66-QLjevhE_IKcp5UTk0YslI53b7_WXQAjF-4mjlYM-KsNLOpveFlEa6P1fD6Gj8CieMhBgHZd6oLWh73edExjG)

Within this directory, edit the `subgraph.yaml` file to specify the network name and the starting block number from where you want to start indexing the data, as shown in the figure below.

![img](https://lh4.googleusercontent.com/xokfE5vTdKH35tqWRiPofLbf7xkPI6Ep0WmB2t8a1_dQe09JF-1iIDUJ-FKDTr0mTmTQ_pNYNSrGn4z5VPSLZAlNgnLJFVQXzP0VwmDcxc_6gzGBYFHKKW0yb2Cfs-jSiTPfd-LvRE_Ccu-o)

We also edit the `schema.graphql` file to define our schema i.e. data model. The GraphQL schema defines what data you wish to retrieve from the subgraph.

![img](https://lh3.googleusercontent.com/1DLoihJQd91j9L7NXHqAfigODWOMjzUzQVN0qRD42xJYp5sQWTI0OpTwdB2njlZYDLXYjJR2M2wUoUfmYhWgmt2y9DvjxDQalWAoUJH01kedSinlSRMCe-HREp0yyUhfOJoh4IFmu0aSJt78)

Issue the `npn run codegen` command that will generate all mappings, types, migrations, etc for you.

![img](https://lh5.googleusercontent.com/p6_iGXctAQSTY4M_5CHlVndlxb3-Xsi7worh8ilIjEJB_0iSsEkf7-r_zctWC5Hpa9ABv5eMUI-zvFJGhS_2Un47hXGWCI3bbP2vuh8HDueCrdKaGk8_ZNzepwMxgFzbLUSrQb9clhZmtc7l)

The `schema.ts` is one of the files generated by running the `codegen` command. This contains the entities and the functions for fetching and setting data values.

![img](https://lh5.googleusercontent.com/8RfP08ICA2yjT8YLuWnXVsACFBWhezjIxIEfGqBqObqc72iISoerEwVAQM7M7C9_10hjuHWGHbm8zsn15HDFlflA0bxc0zt5xSvgfFveNO4hO8Z0CrFB0HJvoGxq4fDMB189haJS-NW9ldx9)

Similarly, the `mapping.ts` file provides handlers for the different entities defined, as shown below. Here we defined the functionality for the `handleDeposit` function. You can define it as per your need.

![img](https://lh6.googleusercontent.com/cPNTeK-6r4N4fbJgPdoFOng_jOKjXOeGfzc81o3ah5_aJWtvNZQyYeYSy4_qH6e0KXoI4vMEhVk-snv0CjeV58VD39RQbu7moMzrdWBm6QKdexx5yLVoqQ_1tjnJGgw4HaVLf5mMXKWUX2P2)

To create a subgraph on the local graph node issue the command `npm run create-local`

![img](https://lh3.googleusercontent.com/ldd_lxzI7YH8HTyFO7bmFjtrvfWOp41IqnEXJAVC08BjO6WvtUSmTqNDFN1hbr27Joga0yzunZ_INAHSOsSY6pI_EL_1LGs0RIq8wJiK5oqG6wyrhzElkYJXdP9Zv8J8lfQuY5C8trfqpuQs)

Deploy your subgraph on the local graph node using the command `npm run deploy-local`

![img](https://lh5.googleusercontent.com/jmVSSj0wC-ieYqfUfNtF1sfxiEElHI2Q0WsYgF0yLbiqYzFos42gWxAIIzqEjmztG8C6WZVWj8FJ7qPRhGr8pVM5o3ep0-HVqpHDUD4mzGzf7lBR7TrAv3_4mmSH_iLa7oqT5ESM5gy2tscJ)

To query the subgraph, refer to the query endpoints generated after successfully deploying the subgraph, as shown in the figure above.

To query your subgraph follow the link given after successful deployment of subgraph, <http://localhost:8000/subgraphs/name/bas/wbnb/graphql> in our case.

![img](https://lh4.googleusercontent.com/O7rvoGxGLnKIo-qO_AuSexpvslEvUOJZuvw3FN-36TPTizKZfS7btgfTzWm8n9GSHkxlij8m_mEdkuTnTKcgk_y_BLUl4WhRTCZsHQ7RsOo8RdRX8shFZA7iWidZJ8eaZuyHs7qAILwPoeKW)

### Source Code Github URL: 
You can find the complete source code for this project [here](https://github.com/RumeelHussainbnb/BAS-Nodereal-Demo-TheGraph).

### MegaNode Archive Node Performance
The reason why you should consider choosing to use Nodereal’s MegaNode archive node service is the pre-eminent response time it offers. After indexing our data using The Graph’s subgraph service, the average response for querying the data is currently the **FASTEST** time available in the market with a 100% success rate.

![img](https://lh6.googleusercontent.com/MRbI4iFi4Du2GNy7YLFcni7RYqFF_PRmconeuRwzb9KqZxna7p755fWTf6R_5eflSsNGKb5eA-jLIKVuWOuUsQ-yCpVj3ddr8WX6fE0vh_v4F08HQkNdwFWIOV4dB99lalTy32kChBJxYpJp)

Again, if you are looking for archive node services, getting started with MegaNode will be your wisest decision. Sign up [here](https://meganode.nodereal.io/) for a 3-month FREE trial of Growth Plan.

## Conclusion
In this lesson, we provided our readers a demonstration on how to use NodeReal's MegaNode Archive Node RPC endpoints by integrating The Graph with our archive node and index the data to fetch data as per our requirements. 