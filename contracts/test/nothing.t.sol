// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/nothing.sol";

contract NothingLike0gTest is Test {
    NothingLike0g token;

    address alice = address(0xA11CE);
    address bob   = address(0xB0B);
    address caller = address(0xCA11EE);

    uint256 constant FAUCET_AMOUNT = 1_000 * 1e18;
    uint256 constant COOLDOWN = 10 minutes;

    function setUp() public {
        token = new NothingLike0g();

        // Foundry default timestamp is 1, which fails cooldown logic on first mint.
        // Warp to a realistic unix-ish timestamp so first mint succeeds like it would on testnet.
        vm.warp(1_700_000_000);
    }

    function testMetadata() public view {
        assertEq(token.name(), "NothingLike0g");
        assertEq(token.symbol(), "NLO");
        assertEq(token.decimals(), 18);
    }

    function testMintHappyPath_updatesBalanceSupplyAndLastMintAt() public {
        uint256 startTs = block.timestamp;

        vm.prank(caller);
        token.mintTestTokens(alice);

        assertEq(token.balanceOf(alice), FAUCET_AMOUNT);
        assertEq(token.totalSupply(), FAUCET_AMOUNT);
        assertEq(token.lastMintAt(alice), startTs);
    }

    function testMintRevertsOnZeroAddress() public {
        vm.prank(caller);
        vm.expectRevert(bytes("Invalid recipient"));
        token.mintTestTokens(address(0));
    }

    function testMintRevertsDuringCooldown_forSameRecipient() public {
        vm.prank(caller);
        token.mintTestTokens(alice);

        vm.prank(caller);
        vm.expectRevert(bytes("Cooldown active"));
        token.mintTestTokens(alice);
    }

    function testMintSucceedsAfterCooldownExpiry() public {
        vm.prank(caller);
        token.mintTestTokens(alice);

        vm.warp(block.timestamp + COOLDOWN);

        vm.prank(caller);
        token.mintTestTokens(alice);

        assertEq(token.balanceOf(alice), 2 * FAUCET_AMOUNT);
        assertEq(token.totalSupply(), 2 * FAUCET_AMOUNT);
        assertEq(token.lastMintAt(alice), block.timestamp);
    }

    function testCooldownIsPerRecipient_differentRecipientCanMintImmediately() public {
        vm.prank(caller);
        token.mintTestTokens(alice);

        vm.prank(caller);
        token.mintTestTokens(bob);

        assertEq(token.balanceOf(alice), FAUCET_AMOUNT);
        assertEq(token.balanceOf(bob), FAUCET_AMOUNT);
        assertEq(token.totalSupply(), 2 * FAUCET_AMOUNT);
    }

    function testLastMintAtChangesOnlyForRecipient() public {
        uint256 t0 = block.timestamp;

        vm.prank(caller);
        token.mintTestTokens(alice);

        assertEq(token.lastMintAt(alice), t0);
        assertEq(token.lastMintAt(bob), 0);

        vm.warp(block.timestamp + 123);

        vm.prank(caller);
        token.mintTestTokens(bob);

        assertEq(token.lastMintAt(alice), t0);
        assertEq(token.lastMintAt(bob), block.timestamp);
    }
}