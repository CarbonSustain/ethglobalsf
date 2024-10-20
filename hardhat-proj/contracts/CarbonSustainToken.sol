// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;
import "./ERC20.sol";
import "./Ownable.sol";
/**
 * @title CarbonSustainToken
 * @dev ERC20 token with ownership control and compatibility with a voting system
 */
contract CarbonSustainToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("CarbonSustain Token", "CST") Ownable() {
        _mint(msg.sender, initialSupply * (10 ** decimals()));
    }
    /**
     * @dev Allows the owner to burn tokens, reducing the total supply.
     * @param amount The number of tokens to burn
     */
    function burn(uint256 amount) public onlyOwner {
        _burn(msg.sender, amount);
    }
    
    /**
     * @dev Allows the owner to mint new tokens to a specific address.
     * @param account The address that will receive the newly minted tokens
     * @param amount The number of tokens to mint
     */
    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }
}