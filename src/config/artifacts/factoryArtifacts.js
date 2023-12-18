const factoryArtifacts = {
  address:{
    80001: "0x082cfFC2B10f7c745e859b4E8D34F3acD502B080",
  },

  abi:[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "contratoAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "criador",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "nomePropriedade",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "nomeProprietario",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "cnpjcpf",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "car",
          "type": "string"
        }
      ],
      "name": "NovoContrato",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "nomePropriedade",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "nomeProprietario",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "cnpjcpf",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "car",
          "type": "string"
        }
      ],
      "name": "Factory",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "ProjectID",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "contratoInfo",
      "outputs": [
        {
          "internalType": "string",
          "name": "nomePropriedade",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "nomeProprietario",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "cnpjcpf",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "car",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "contratoAddress",
          "type": "address"
        }
      ],
      "name": "obtenerDatosContrato",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

}

export default factoryArtifacts