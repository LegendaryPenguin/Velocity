// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MockOracle {
    bool public alwaysTrue = true;

    function setAlwaysTrue(bool value) external {
        alwaysTrue = value;
    }

    function verifyProof(bytes calldata proof) external view returns (bool) {
        if (alwaysTrue) return true;
        if (proof.length == 1 && proof[0] == 0x01) return true;
        return proof.length > 0;
    }
}
