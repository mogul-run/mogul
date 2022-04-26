# Ethers Docs Readthrough Notes

providers: read only

signers: read and write


## Providers 

ethers.getDefaultProvider( \[network\])
    - Network is established by provider or signer object 
    - allows you to receive a provider object backed by multiple services
    - allows for less of a reliance on a singular 3rd party provider
        - quorum on mainnet is set to 2, meaning 2 services must agree with each other
    - ex: if alchemy is down, you can use etherscan or infura

provider.call(tx, options)
    - allows for execution of a transaction
    - useful to call a getter in a contract

EventEmitter API allows for call back when certain events occur
    - it uses an observer pattern <== what is this?

    provider.on(): listener triggered after each emitted event
    provider.once(): listener only triggered after initial event

    these can be used to trigger events in frontend after transactions go through or error out


JSON RPC Provider
- Whats the differences between this and using a service like alchemy?
    - All 3 party provider functionality inherits from JSON RPC, but what does RPC stand for?

matic mumbai test net == 'maticmum'

Fallback Provider
- Advanced provider that places transactions through multiple services and requires at least 50% of services to agree

### Networks

network.name: network name in plaintest
network.chainId: chain id of network
network.ensAddress: address where ENS registry is deployed on network


## Signer

Signers are an ethers abstraction for an eth account

2 most common signers are Wallet and JsonRpcSigner
    - Use wallet when you want a user to initiate a transaction
    - jsonRpc if a transaction needs to be added but doesn't need to be tied to a user

### Methods

signer.getBalance(): returns balance of wallet in eth (?)
signer.getChainId(): returns chainId (network) wallet is connected to
signer.call(): calls a transaction
signer.signTransaction():  returns promise resolving to signature of transaction
signer.signMessage(): returns promise resolving to signature of message
    - what is the difference between call(), signTx(), and signMsg()?

### Wallet

Inherits Signer

Allows for signing and calling of transactions from an Externally Owned Account (EOA)

## Contracts
