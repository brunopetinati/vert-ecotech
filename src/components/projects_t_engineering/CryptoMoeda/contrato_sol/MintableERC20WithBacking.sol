// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { SignatureRecovery } from "./SignatureRecovery.sol";

contract MintableERC20WithBacking is ERC20, Ownable {
    struct Backing {
        string details; // Detalhes sobre o lastro (ex: tipo, descrição)
        uint256 value;  // Valor associado ao lastro
    }

    // Mapeia endereços para uma lista de lastros
    mapping(address => Backing[]) public backings;
    SignatureRecovery private signatureRecovery;

    constructor() 
        ERC20("MintableERC20WithBacking", "VCC") 
        Ownable(msg.sender) 
    {
        signatureRecovery = new SignatureRecovery();
    }

    // Sobrescrever a função decimals para retornar 0
    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    event MintAttempt(address to, uint256 amount, string details, uint256 value);
    event SignatureValidation(bytes32 messageHash, bool isValid);

    function mint(
        address to,
        uint256 amount,
        string memory details,
        uint256 value//,
        //bytes memory signature
    ) public onlyOwner {
        emit MintAttempt(to, amount, details, value);

        // Validação da assinatura
        //bytes32 messageHash = keccak256(abi.encodePacked(details, value));
        //bool isValid = signatureRecovery.validaAssinatura(messageHash, signature, owner());
        //emit SignatureValidation(messageHash, isValid);
        //require(isValid, "Assinatura invalida");

        // Mintar moeda
        require(bytes(details).length <= 100, "Detalhes muito longos");
        _mint(to, amount);

        // Atualiza o lastro na conta
        _addOrUpdateBacking(to, details, value);
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        _transferBacking(msg.sender, recipient);
        return super.transfer(recipient, amount);
    }

    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        _transferBacking(sender, recipient);
        return super.transferFrom(sender, recipient, amount);
    }

    function _transferBacking(address from, address to) private {
        // Cria uma lista temporária para armazenar os lastros do remetente
        Backing[] memory fromBackings = backings[from];
        
        // Adiciona os lastros do remetente ao destinatário
        for (uint256 i = 0; i < fromBackings.length; i++) {
            _addOrUpdateBacking(to, fromBackings[i].details, fromBackings[i].value);
        }

        // Limpa os lastros do remetente
        delete backings[from];
    }

    function _addOrUpdateBacking(address account, string memory details, uint256 value) private {
        Backing[] storage accountBackings = backings[account];
        bool found = false;

        for (uint256 i = 0; i < accountBackings.length; i++) {
            if (keccak256(abi.encodePacked(accountBackings[i].details)) == keccak256(abi.encodePacked(details))) {
                accountBackings[i].value += value;
                found = true;
                break;
            }
        }

        if (!found) {
            accountBackings.push(Backing(details, value));
        }
    }

    // Função para obter detalhes do lastro
    function getBackingDetails(address account) public view returns (Backing[] memory) {
        return backings[account];
    }

    // Função para obter o saldo de tokens de um endereço
    function getTokenBalance(address account) public view returns (uint256) {
        return balanceOf(account);
    }
}
