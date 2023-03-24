# Using Web3j to Connect Java-Based Applications to BNB Chain

## Lesson Objectives

## Overview
This module is targeted at helping Web2 developers transition into Web3 along with their established skill set to build Web3 applications with complete ease. This lesson provides readers with a detailed guide on connecting Java-based applications with smart contracts written in Solidity over the BNB Chain network using the [Web3j](https://github.com/web3j/web3j) library.  

## What is Web3j Library
[Web3j](https://github.com/web3j/web3j) is a highly modular, reactive, type-safe Java and Android library that is designed for working with Smart Contracts and integrating with clients (nodes) on the Ethereum network. BSC has an Ethereum-like API available which is fully compatible with Ethereum-style JSON RPC invocations. Due to this, Web3j can be used to develop Java-based applications that can interact with the BSC network as well. Web3j provides developers with the opportunity to work with the BNB Smart Chain blockchain, without the additional overhead of having to write their own integration code for the platform as this can be generated with the use of Web3j library.

## Demo
This is a detailed demonstration of using Web3j library for building dapps on BNB Chain using Java programming language. We encourage our readers to perform each step for a better understanding. Following are the pre-requisites for this demo lesson.

### Pre-requisites
- Basic knowledge of Java and Solidity.
- Basic knowledge of developing dapps using Truffle.
- [Java](https://www.java.com/download/ie_manual.jsp) is installed on your system.
- A Java IDE, we'll use Jet Brains [IntelliJ IDE](https://www.jetbrains.com/idea/download/other.html).

### Setup
The setup includes creating a _Maven Project_ and adding _Web3j_ dependency.

#### Creating a Maven Project
Maven is a build automation tool used primarily for Java projects. Maven can also be used to build and manage projects written in C#, Ruby, Scala, and other languages. For this tutorial, we have used Maven to manage our Java library dependency and install it. 

To set up a Maven project using the IntelliJ IDE. Click on _**File>New>Project>Maven**_ project, then click **Next**

<Image
      src="/web3j-01.png"
      alt="create-maven-project"
      width="70%"
      height="70%"
    />


#### Installing the Web3j java library
To install Web3j and run your code, the primary requirement is that Java is installed on your systems. 

**Verify if Java is installed:** To check if you have Java installed or not, type `java -version` in your Terminal/command prompt. If installed correctly, this must return the installed version of Java on your system. If not installed, download it from [here](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html), based on your OS type. 

![install-web3j](/web3j-02.png)

You can either install the `Web3j CLI` or use `Maven` or `Gradle` for the same. In this guide, we will use `Maven` to specify the dependency and install it. This is specified in the `pom.xml` file present in the root folder of your project and looks as follows

### Specifying Web3j dependency for Maven with Java 8 
- Update the `pom.xml` file to include the following contents specifying the properties, dependency, and build configurations. 
- The `<dependency>` tag is used for specifying the required libraries that should be downloaded like Web3j. 
- The `<properties>` tag is used for specifying the compiler version of Maven. 
- Whereas, the `<build>` tag is used for specifying the Web3j Maven plugin. 
- For more details, refer [here](https://docs.web3j.io/4.8.7/plugins/web3j_maven_plugin/).

```html
<dependencies>
        <dependency>
            <groupId>org.web3j</groupId>
            <artifactId>core</artifactId>
            <version>4.6.3</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-nop</artifactId>
            <version>1.7.5</version>
            <scope>compile</scope>
        </dependency>
</dependencies>

<properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
</properties>

    <build>
        <plugins>
            <plugin>
                <groupId>org.web3j</groupId>
                <artifactId>web3j-maven-plugin</artifactId>
                <version>4.9.4</version>
                <configuration>
                    <packageName>com.java.contracts</packageName>
                    <sourceDestination>src/main/java/generated</sourceDestination>
                    <nativeJavaType>true</nativeJavaType>
                    <outputFormat>java,bin</outputFormat>
                    <soliditySourceFiles>
                        <directory>src/main/resources</directory>
                        <includes>
                            <include>**/*.sol</include>
                        </includes>
                    </soliditySourceFiles>
                    <outputDirectory>
                        <java>src/java/generated</java>
                        <bin>src/bin/generated</bin>
                        <abi>src/abi/generated</abi>
                    </outputDirectory>
                    <contract>
                        <includes>
                            <include>greeter</include>
                        </includes>
                        <excludes>
                            <exclude>mortal</exclude>
                        </excludes>
                    </contract>
                    <pathPrefixes>
                        <pathPrefix>dep=../dependencies</pathPrefix>
                    </pathPrefixes>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

### Updating/Downloading the packages
To update/download the dependencies, on the left-hand side click on `Maven>Lifecycle>install`. Double-click on `install` for installing all of the dependencies.

<Image
      src="/web3j-03.png"
      alt="install-dependencies-using-maven"
      width="50%"
      height="50%"
    />

### Creating Smart Contract 
- First, create a directory called `HelloWorldWeb3j` in the root folder of your project.
- Initiate an empty [Truffle](https://trufflesuite.com/docs/truffle/quickstart/) project using the command `truffle init`

![truffle-project](/web3j-04.png)

- In the `contracts` folder, create a new file `HelloWorld.sol` and update it with the following code. 

```jsx
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld {
    string public greet = "World";  //variable for storing name

    /** @dev Retrieve Message to Print
      * @return The Message to Print, Hello, Concatenated with the User Name
      */ 
    function getMessage() public view returns(string memory){
        return concat("Hello, " , greet);
    }

    /** @dev Set the Name to Greet 
      * @param  _name  user name
      * @return success Returns bool value (True or False) to indicate if save was successful or not
      */
    function setName(string memory _name) public returns(bool success){
        require(bytes(_name).length > 0);
        greet= _name;
       // accounts[msg.sender] = _name;
        return true;
    }

    /** @dev Set the Name to Greet 
        * @param  _base  contains the base value " Hello, "
        * @param  _value contains the name to append to message to display
        * @return the concatenated string of _base+_value i.e. Hello, Name
        */ 
    function concat(string memory _base, string memory _value) internal pure returns (string memory) {
        bytes memory _baseBytes = bytes(_base);
        bytes memory _valueBytes = bytes(_value);
    
        string memory _tmpValue = new string(_baseBytes.length + _valueBytes.length);
        bytes memory _newValue = bytes(_tmpValue);
    
        uint i;
        uint j;
    
        for(i=0; i<_baseBytes.length; i++) {
           _newValue[j++] = _baseBytes[i];
        }
    
        for(i=0; i<_valueBytes.length; i++) {
            _newValue[j++] = _valueBytes[i];
           }          
           return string(_newValue);
        }
}
```

- The above smart contract is a simple greeting program, that has a variable `greet` for storing name to greet. It also has a function for setting the value of `greet` variable and a function for returning the `greet` variable's value. There is also a `concat` function to concatenate _"hello,"_ with the value stored in the greet variable.
- Compile and Deploy this smart contract onto the BSC Testnet. Follow the guide [here](https://docs.bnbchain.org/docs/truffle-new) for more details. 
- This is necessary to generate the ABI and Bytecode of your smart contract. Upon compilation/migration, truffle generates a `json` file containing the ABI, Bytecode, and other metadata of the smart contract. This is usually stored by default in the `build` folder. 

### Generating Java Wrapper Code 
This step is crucial as this will help you in generating the Java code for your Solidity-based smart contract. The generated Java code will then be used for interacting with your smart contract. 

- Before using web3j, we need to build the Java wrapper class for our smart contract.
- The web3j command-line tool supports the autogeneration of Java smart contract function wrappers directly from Truffle's contract schema. 
- The format of the command for generating wrapper code using truffle schema is as follows. 

```shell
$ web3j generate truffle [--javaTypes|--solidityTypes] /path/to/<truffle-smart-contract-output>.json -o /path/to/src/main/java -p com.your.organisation.name
```

![web3j-wrapper-class](/web3j-05.png)

- If executed successfully, this should generate a new java class file containing the wrapper code. 
- Remember that if you make any changes, you'll have to compile the smart contract and then generate the new ABI, bytecode, and web3j wrapper respectively.

Now that we have our smart contract class wrapper, let's move on and write our main class that deploys and interacts with the HelloWorld smart contract using the HelloWorld class wrapper.

![wrapper-class](/web3j-06.png)

### Using the Wrapper Code
- Create a new class file named `App` in the `org.java.contracts` folder. Update it with the following code

```java
package org.java.contracts;

import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.http.HttpService;
import java.math.BigInteger;

public class App {
    public static void main(String[] args) throws Exception {
        Web3j web3j = Web3j.build(new HttpService("https://data-seed-prebsc-2-s1.binance.org:8545/"));
        HelloWorld helloWorld = HelloWorld.deploy(web3j,
                                        Credentials.create("your_private_key"),
                                        BigInteger.valueOf(22_000_000_000L), 
                                        BigInteger.valueOf(4_300_000))
                                        .send();
        String greeting = helloWorld.getMessage().send();
        System.out.println("Greet Message: "+ greeting);
        helloWorld.setName("BNB Chain").send();
        greeting = helloWorld.getMessage().send();
        System.out.println("Greet Message: "+ greeting);
        web3j.shutdown();
    }
}
```

- In the above code, we first initialize a Web3j object to be able to the BSC Testnet RPC Endpoint. You can get RPC endpoints for BSC Network from [here](https://docs.bnbchain.org/docs/rpc/).
- Then we create an object of the HelloWorld wrapper class and use it for deploying the smart contract and then calling its functions. 
- Note that, in the `deploy` function, we specify the web3j object followed by the associated private key of the Metamask account that we want to use for signing transactions, follow [this guide](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) for more details on how to reveal the private key of your MetaMask account. The last two parameters specify the Gas Price and the Gas Limit.
- The `send()` function is used for initiating calls to smart contract functions. The command  `helloWorld.getMessage().send()` is used for calling the `getMessage()` function of the HelloWorld smart contract.

> Note: This is for example purposes only. Never store your private keys directly in your programs.

### Build and Run 
- Build and run the `App` class. The output will be as follows.

![output-running-web3j](/web3j-07.png)

## Conclusion 
In this lesspn, we provided our readers with a detailed guide on how to interface Solidity based smart contracts with Java by using the Web3j library. We provided insights into how to deploy and interact with a smart contract using Java on the BSC Testnet.
