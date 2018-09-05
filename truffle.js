/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
require('dotenv').config();
const Web3 = require("web3");
const web3 = new Web3();
const HDWalletProvider = require("truffle-hdwallet-provider");
// var WalletProvider = require("truffle-wallet-provider");

// var pkey_str = require('fs').readFileSync('../keystore/pkey_eth_acc').toString();
// var prkey_buff = new Buffer("F76E1F80EB4E5CE8602AC10834C7794DC47C32E7F4DDEFD51950F946A3B954F8", 'hex');

// var wallet = require('ethereumjs-wallet').fromPrivateKey(prkey_buff)

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(process.env.MNENOMIC, "https://ropsten.infura.io/v3/"+ process.env.ROPSTEN_API_KEY,1,4),
      // provider : new WalletProvider(wallet, "https://ropsten.infura.io/v3/" + process.env.ROPSTEN_API_KEY,1,4),
      network_id: 3,
      gas: 5000000,
      gasPrice:90
    
  },
    
    rinkeby: {
      provider: new HDWalletProvider(process.env.MNENOMIC, "https://rinkeby.infura.io/v3/" + process.env.RINKEBY_API_KEY,1,3),
      network_id: 3,
      gas: 6700000,
      gasPrice: web3.toWei("20", "gwei")
    }
  }
  ,
    solc: {
        optimizer: {
            enabled: true,
            runs: 2000
        }
    }
};