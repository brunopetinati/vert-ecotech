// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { SignatureRecovery } from "./SignatureRecovery.sol";

contract MintableERC20WithCollateral is ERC20, Ownable {
    struct Collateral {
        string serialNumber;  // Mudamos para string
        uint256 value;
    }

    mapping(address => Collateral[]) public collaterals;
    SignatureRecovery private signatureRecovery;

    constructor() 
        ERC20("MintableERC20WithCollateral", "VCC") 
        Ownable(msg.sender) 
    {
        signatureRecovery = new SignatureRecovery();
    }

    function mint(
        address to, 
        uint256 amount, 
        string memory serialNumber, 
        uint256 value, 
        bytes memory signature
    ) public onlyOwner {
       
        //validacao da assinatura
        bytes32 messageHash = keccak256(abi.encodePacked(serialNumber));
        require(signatureRecovery.validaAssinatura(messageHash, signature, owner()), "Assinatura invalida");

       //mintar moeda
        require(bytes(serialNumber).length <= 100, "Serial number too long");
        _mint(to, amount);
        collaterals[to].push(Collateral(serialNumber, value));
    }

    function transferWithCollateral(address recipient, uint256 amount) public returns (bool) {
        // Transfer tokens
        require(transfer(recipient, amount), "Transfer failed");

        // Move collaterals
        uint256 remainingAmount = amount;
        Collateral[] storage senderCollaterals = collaterals[msg.sender];
        Collateral[] storage recipientCollaterals = collaterals[recipient];

        for (uint256 i = 0; i < senderCollaterals.length; i++) {
            Collateral storage collateral = senderCollaterals[i];
            if (collateral.value <= remainingAmount) {
                recipientCollaterals.push(collateral);
                remainingAmount -= collateral.value;
                delete senderCollaterals[i]; // Efficiently remove the element
            } else {
                collateral.value -= remainingAmount;
                recipientCollaterals.push(Collateral(collateral.serialNumber, remainingAmount));
                break;
            }
        }

        // Clean up empty entries in the sender's collateral list
        _cleanUpSenderCollaterals();

        return true;
    }

    function _cleanUpSenderCollaterals() private {
        Collateral[] storage senderCollaterals = collaterals[msg.sender];
        uint256 newSize = 0;
        for (uint256 i = 0; i < senderCollaterals.length; i++) {
            if (senderCollaterals[i].value > 0) {
                senderCollaterals[newSize] = senderCollaterals[i];
                newSize++;
            }
        }
        while (senderCollaterals.length > newSize) {
            senderCollaterals.pop();
        }
    }

    function getCollaterals(address account) public view returns (Collateral[] memory) {
        return collaterals[account];
    }

    // Function to calculate the total VCC value in the collaterals of a specific address
    function getTotalVCCInCollaterals(address account) public view returns (uint256 totalValue) {
        Collateral[] memory userCollaterals = collaterals[account];
        uint256 total = 0;

        for (uint256 i = 0; i < userCollaterals.length; i++) {
            total += userCollaterals[i].value;
        }

        return total;
    }    

    // Function to get the total value of VCC associated with each serial number in a specific address
    function getCollateralVccValues(address account) public view returns (string[] memory, uint256[] memory) {
        Collateral[] memory userCollaterals = collaterals[account];
        uint256 length = userCollaterals.length;

        // Create arrays to store the serial numbers and their total values
        string[] memory serialNumbers = new string[](length);
        uint256[] memory values = new uint256[](length);
        uint256 count = 0;

        for (uint256 i = 0; i < length; i++) {
            bool found = false;
            for (uint256 j = 0; j < count; j++) {
                if (keccak256(abi.encodePacked(serialNumbers[j])) == keccak256(abi.encodePacked(userCollaterals[i].serialNumber))) {
                    values[j] += userCollaterals[i].value;
                    found = true;
                    break;
                }
            }
            if (!found) {
                serialNumbers[count] = userCollaterals[i].serialNumber;
                values[count] = userCollaterals[i].value;
                count++;
            }
        }

        // Resize arrays to the actual count
        string[] memory finalSerialNumbers = new string[](count);
        uint256[] memory finalValues = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            finalSerialNumbers[i] = serialNumbers[i];
            finalValues[i] = values[i];
        }

        return (finalSerialNumbers, finalValues);
    }
}
