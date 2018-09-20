const HiteshCoin = artifacts.require('./HiteshCoin.sol');

const HiteshCoinCrowdsale = artifacts.require('./HiteshCoinCrowdsale.sol');
const BigNumber = web3.BigNumber;

// The asycn version

//helper functions
function web3AsynWrapper(web3Function, arg) {
  return new Promise((resolve, reject) => {
  web3Function(arg, (e, data) =>  e ? reject(e) : resolve(data))
})
}

const duration = {
  seconds: function(val) { return val},
  minutes: function(val) { return val * this.seconds(60) },
  hours:   function(val) { return val * this.minutes(60) },
  days:    function(val) { return val * this.hours(24) },
  weeks:   function(val) { return val * this.days(7) },
  years:   function(val) { return val * this.days(365)}
};


//using async-await

module.exports = function (deployer, network, accounts) {
  deployer.then(async function () {

      const wallet = accounts[0];
      let block =  await web3AsynWrapper(web3.eth.getBlock,'latest');
      if(network=="development"){
        this.openingTime = block.timestamp + duration.minutes(1);
      }
      else if(network=="ropsten"){
        console.log("For ropsten , start the crowdsale lil late");
        this.openingTime = block.timestamp + duration.minutes(5);
      }
      console.log("Opening Time ",this.openingTime);
      
      this.closingTime = this.openingTime + duration.minutes(30);
      const rate = new web3.BigNumber(1);

      await deployer.deploy(HiteshCoin);
      const deployedToken = await HiteshCoin.deployed();
      // console.log("deployed token address: " + deployedToken.address);
      // console.log(openingTime);
      // console.log(closingTime);
      // console.log(rate);
      // console.log("walllet",wallet);
      // console.log("ac 0",accounts[0]);
      // console.log("ac1 ",accounts[1]); 
      // console.log("Acc2",accounts[2]);
      let transaction = await deployer.deploy(HiteshCoinCrowdsale,openingTime,closingTime,rate,wallet,deployedToken.address);
      const deployedCrowdsale = await HiteshCoinCrowdsale.deployed();
      console.log('deployed crowdsale address: ', deployedCrowdsale.address);

  })
};




// // the synchronous version - works only with Sycnhronous web3 providers
// module.exports = function(deployer, network, accounts) {
//     const openingTime = web3.eth.getBlock('latest').timestamp + 2; // two secs in the future
//     const closingTime = openingTime + 86400 * 20; // 20 days
//     const rate = new web3.BigNumber(1000);
//     const wallet = accounts[1];

//     return deployer
//         .then(() => {
//             return deployer.deploy(HiteshCoin);
//         })
//         .then(() => {
//             return deployer.deploy(
//                 HiteshCoinCrowdsale,
//                 openingTime,
//                 closingTime,
//                 rate,
//                 wallet,
//                 HiteshCoin.address
//             );
//         });
// };