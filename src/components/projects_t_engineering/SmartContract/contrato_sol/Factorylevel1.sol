// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { contrato_projeto_level1 } from "./contrato_projeto_level1.sol";
import { SignatureRecovery } from "./SignatureRecovery.sol"; // Importar o contrato de recuperação de assinatura

contract Factorylevel1 is Ownable {

    struct ContratoInfo {
        address enderecoContrato;
        string nomePropriedade;
        string nomeProprietario;
        string cnpjcpf;
        string car;
        string file_manager_contract_id;
    }

    address[] public ProjectID;
    mapping(address => ContratoInfo) public contratoInfo;

    event NovoContrato (address contratoAddress, address criador, string nomePropriedade, string nomeProprietario, string cnpjcpf, string car, string file_manager_contract_id, address signer1, address owner1);

    SignatureRecovery private signatureRecovery; // Declaração da instância do contrato de recuperação de assinatura

    constructor() Ownable(msg.sender) {
        signatureRecovery = new SignatureRecovery(); // Inicialização do contrato de recuperação de assinatura
    }

    // Función que permite crear un contrato inteligente de un proyecto
    function Factory(
        string memory nomePropriedade, 
        string memory nomeProprietario, 
        string memory cnpjcpf, 
        string memory car,
        string memory file_manager_contract_id,
        bytes memory signature
    ) external onlyOwner {

        //validacao da assinatura
        bytes32 messageHash = keccak256(abi.encodePacked(nomePropriedade, nomeProprietario, cnpjcpf, car, file_manager_contract_id));
        address signer = signatureRecovery.recoverSigner(messageHash, signature);
        require(signatureRecovery.validaAssinatura(messageHash, signature, owner()), "Assinatura invalida");
        
        //gera instancia do contrato do cliente
        contrato_projeto_level1 newContract = new contrato_projeto_level1(msg.sender);
        address contrato_projeto_level1_address = address(newContract);

        ProjectID.push(contrato_projeto_level1_address);

        contratoInfo[contrato_projeto_level1_address] = ContratoInfo({
            enderecoContrato: contrato_projeto_level1_address,
            nomePropriedade: nomePropriedade,
            nomeProprietario: nomeProprietario,
            cnpjcpf: cnpjcpf,
            car: car,
            file_manager_contract_id: file_manager_contract_id
        });

        emit NovoContrato(contrato_projeto_level1_address, msg.sender, nomePropriedade, nomeProprietario, cnpjcpf, car, file_manager_contract_id, signer, owner());
    }

    // Función para obtener datos del contrato por su dirección
    function obtenerDatosContrato(address contratoAddress) public view returns (string memory, string memory, string memory, string memory) {
        ContratoInfo memory info = contratoInfo[contratoAddress];
        require(bytes(info.nomePropriedade).length > 0, "Contrato no encontrado");
        return (info.nomePropriedade, info.nomeProprietario, info.cnpjcpf, info.car);
    }
}

