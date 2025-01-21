// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SignatureRecovery {
    using ECDSA for bytes32;

     function validaAssinatura(bytes32 _hashedMessage, bytes memory _signature, address __owner) public pure returns (bool) {
        address signer = recoverSigner(_hashedMessage, _signature);

        // if the signature is signed by the owner
        if (signer == __owner) {
            // give player (msg.sender) a prize
            return true;
        }

        return false;
    }   

    function recoverSigner(bytes32 message, bytes memory signature) public pure returns (address) {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(signature);
        //return ecrecover(message, v, r, s);
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHashMessage = keccak256(abi.encodePacked(prefix, message));
        return ecrecover(prefixedHashMessage, v, r, s);
    }

    function splitSignature(bytes memory sig) internal pure returns (bytes32 r, bytes32 s, uint8 v) {
        require(sig.length == 65, "Invalid signature length");

        assembly {
            // Primeiros 32 bytes (0-31) são 'r' (incluindo o prefixo 0x)
            r := mload(add(sig, 32))
            // Próximos 32 bytes (32-63) são 's' (incluindo o prefixo 0x)
            s := mload(add(sig, 64))
            // Último byte (64) é 'v'
            v := byte(0, mload(add(sig, 96)))
        }

        // Retorna 'v' como uint8
        return (r, s, v);
    }
}
