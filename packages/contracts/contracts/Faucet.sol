// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IHumanAgentINFT {
    function isVerified(address wallet) external view returns (bool);
    function ownerToTokenId(address owner) external view returns (uint256);
    function canUse(uint256 tokenId, address executor) external view returns (bool);
}

contract Faucet {
    IHumanAgentINFT public immutable agent;
    uint256 public immutable cooldownSec;
    mapping(address => uint256) public lastClaimedAt;

    event Claimed(address indexed caller, address indexed recipient, uint256 claimedAt);

    constructor(address agentAddress, uint256 cooldownSeconds) {
        agent = IHumanAgentINFT(agentAddress);
        cooldownSec = cooldownSeconds;
    }

    function claim(address caller, address recipient) external {
        require(caller != address(0), "Invalid caller");
        require(recipient != address(0), "Invalid recipient");
        require(agent.isVerified(caller), "Agent not verified");

        uint256 tokenId = agent.ownerToTokenId(caller);
        require(tokenId != 0, "No agent token");
        require(agent.canUse(tokenId, caller), "Action not authorized");

        uint256 nowTs = block.timestamp;
        uint256 unlockAt = lastClaimedAt[caller] + cooldownSec;
        require(nowTs >= unlockAt, "Cooldown active");

        lastClaimedAt[caller] = nowTs;
        emit Claimed(caller, recipient, nowTs);
    }

    function cooldownRemaining(address wallet) external view returns (uint256) {
        uint256 unlockAt = lastClaimedAt[wallet] + cooldownSec;
        if (block.timestamp >= unlockAt) return 0;
        return unlockAt - block.timestamp;
    }
}
