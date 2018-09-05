pragma solidity ^0.4.23;

import 'openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract HiteshCoin is MintableToken {
    string public name = "Crypto Indians";
    string public symbol = "IND";
    uint8 public decimals = 18;
}