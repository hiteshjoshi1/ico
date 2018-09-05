var HiteshCoinCrowdsale = artifacts.require("HiteshCoinCrowdsale");
var HiteshCoin = artifacts.require("HiteshCoin");
const BigNumber = web3.BigNumber;


contract('HiteshCoinCrowdsale', function (accounts) {
  beforeEach(async function () {
    this.block =  await web3AsynWrapper(web3.eth.getBlock,'latest');
    // for ganache test
    // this.openingTime = (this.block.timestamp)+duration.seconds(0.0001);
    // for ropsten or rinkeby
    this.openingTime = (this.block.timestamp)+duration.minutes(3);
    this.closingTime = this.openingTime + duration.days(7);
    
    this.rate = new BigNumber(1);
    
    this.wallet = accounts[1];

    this.coinInstance = await HiteshCoin.new();
 
    this.crowdSaleInstance = await HiteshCoinCrowdsale.new(this.openingTime,this.closingTime,this.rate, this.wallet,this.coinInstance.address);
   
    await this.coinInstance.transferOwnership(this.crowdSaleInstance.address);
  });
  
  it("Should check if balance of account is zero", async function () {

        let purchaser = accounts[2];
        
        let balance = await this.coinInstance.balanceOf(purchaser);

        console.log(balance.toString(10));

        assert.equal(balance.toString(10), 0, "Balance is zero");
        });


        it("The Balance is non zero", async function () {
            let purchaser = accounts[2];
            let balance = await this.coinInstance.balanceOf(purchaser);
            console.log("Initial Balance",balance.toString(10));
            let coinPurchase = await this.crowdSaleInstance.sendTransaction({from:purchaser, value: web3.toWei(5, "ether")});
            let coinBalance = await this.coinInstance.balanceOf(purchaser);
            console.log(coinBalance.toString(10));
            assert.equal(coinBalance,web3.toWei(5, "ether"), "Balance is above zero");
         });


});

    // Promisify function - ideally move to a lib.
    //TODO - move to helper.js
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
