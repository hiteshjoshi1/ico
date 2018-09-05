#Coin and Crowdsale 

- uses Open Zeppelin contracts
- contracts are based on Openzeppelin tutorial here
https://blog.zeppelin.solutions/how-to-create-token-and-initial-coin-offering-contracts-using-truffle-openzeppelin-1b7a5dae99b6

Additional features
- Ganache deployment configuration
- INFURA integrationd for Ropsten, Rinkeby, Mainnet deployment
- unit test which test deployment of Coin, Crowdsale and purchase of coin.


## To deploy-

git clone 

In your project directory 
npm i

### Create a file in your project .env with
ROPSTEN_API_KEY=<UR_INFURA ROPSTEN KEY HERE>
RINKEBY_API_KEY=<UR INFURA RINKEBY KEY HERE >
MNENOMIC=< meta mask mnenmonic to unlock accounts and sign> 


## Compiling and running

truffle compile
Ganache
truffle migrate

Ropsten
truffle migrate --network ropsten

Trust with Ganache
truffle test

Truffle test with Ropsten

truffle test --netwrok ropsten

