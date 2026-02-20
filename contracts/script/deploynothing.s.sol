// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/nothing.sol";
import "forge-std/console2.sol";


contract deploynothing is Script {
    function run() external returns (NothingLike0g token) {
        vm.startBroadcast();
        token = new NothingLike0g();
        vm.stopBroadcast();

        console2.log("NothingLike0g deployed at:", address(token));
    }
}