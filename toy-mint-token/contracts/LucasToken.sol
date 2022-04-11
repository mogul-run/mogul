// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";

contract LucasToken is ERC777 {
    constructor(address[] memory defaultOperators)
        ERC777("LucasToken", "LUCAS", defaultOperators)
    {
        _mint(msg.sender, 10000*10**18, "", "");
    }
}
