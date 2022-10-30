// SPDX-License-Identifier: MIT
pragma solidity =0.8.17;

contract PrivateKeyFromPassword {
    function getPk(string calldata pw1, string calldata pw2) public pure returns(bytes32) {
        return keccak256(abi.encode(pw1, pw2));
    }
}