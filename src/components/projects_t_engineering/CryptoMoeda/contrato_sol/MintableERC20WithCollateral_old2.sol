// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
//SafeMath.sol não existe para a versão "^0.8.0"
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import { SignatureRecovery } from "../../SmartContract/contrato_sol/SignatureRecovery.sol";

contract MintableERC20WithCollateral is ERC20, Ownable {
    using SafeMath for uint256;

    struct Collateral {
        string serialNumber;
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

    // Override the decimals function to return 0
    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    event MintAttempt(address to, uint256 amount, string serialNumber, uint256 value);
    event SignatureValidation(bytes32 messageHash, bool isValid);

    function mint(
        address to,
        uint256 amount,
        string memory serialNumber,
        uint256 value,
        bytes memory signature
    ) public onlyOwner {
        emit MintAttempt(to, amount, serialNumber, value);

        // Validação da assinatura
        bytes32 messageHash = keccak256(abi.encodePacked(serialNumber));
        bool isValid = signatureRecovery.validaAssinatura(messageHash, signature, owner());
        emit SignatureValidation(messageHash, isValid);
        require(isValid, "Assinatura invalida");

        // Mintar moeda
        require(bytes(serialNumber).length <= 100, "Serial number too long");
        _mint(to, amount);
        collaterals[to].push(Collateral(serialNumber, value));
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _moveCollaterals(msg.sender, recipient, amount);
        return super.transfer(recipient, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        _moveCollaterals(sender, recipient, amount);
        return super.transferFrom(sender, recipient, amount);
    }



    function _moveCollaterals(address from, address to, uint256 amount) private {
        Collateral[] storage senderCollaterals = collaterals[from];
        Collateral[] storage recipientCollaterals = collaterals[to];

        uint256 remainingAmount = amount;
        uint256 i = 0;

        // Transfere colaterais do remetente para o destinatário
        while (remainingAmount > 0 && i < senderCollaterals.length) {
            if (senderCollaterals[i].value <= remainingAmount) {
                recipientCollaterals.push(senderCollaterals[i]);
                remainingAmount -= senderCollaterals[i].value;
                senderCollaterals[i] = senderCollaterals[senderCollaterals.length - 1];
                senderCollaterals.pop();
            } else {
                senderCollaterals[i].value -= remainingAmount;
                recipientCollaterals.push(Collateral(senderCollaterals[i].serialNumber, remainingAmount));
                remainingAmount = 0;
            }
            i++;
        }

        // Remove colaterais vazios do remetente
        for (uint256 j = 0; j < senderCollaterals.length; ) {
            if (senderCollaterals[j].value == 0) {
                senderCollaterals[j] = senderCollaterals[senderCollaterals.length - 1];
                senderCollaterals.pop();
            } else {
                j++;
            }
        }
    }



    //get colaterals
    function getCollaterals(address account) public view returns (Collateral[] memory) {
        return collaterals[account];
    }

    function getCollateralValues(address account) public view returns (string[] memory, uint256[] memory) {
        Collateral[] memory userCollaterals = collaterals[account];
        string[] memory serialNumbers = new string[](userCollaterals.length);
        uint256[] memory values = new uint256[](userCollaterals.length);

        for (uint256 i = 0; i < userCollaterals.length; i++) {
            serialNumbers[i] = userCollaterals[i].serialNumber;
            values[i] = userCollaterals[i].value;
        }

        return (serialNumbers, values);
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
