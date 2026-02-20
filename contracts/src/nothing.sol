// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract NothingLike0g is ERC20 {
    uint256 public faucetAmount = 1_000 * 1e18;
    uint256 public cooldown = 10 minutes;
    mapping(address => uint256) public lastMintAt;

    constructor() ERC20("NothingLike0g", "NLO") {}

    function mintTestTokens(address to) external {
        require(to != address(0), "Invalid recipient");
        require(block.timestamp >= lastMintAt[to] + cooldown, "Cooldown active");
        lastMintAt[to] = block.timestamp;

        _mint(to, faucetAmount);
    }
}