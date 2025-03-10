// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { SignatureRecovery } from "./SignatureRecovery.sol";

contract contrato_projeto_level1 is ERC721, Ownable {
    uint256 private _maxSupply = 26; // Máximo suministro de tokens
    uint256 private _tokenIdCounter; // Contador de ID de tokens
    mapping(uint256 => string) private _tokenURIs; // Mapping para asociar token IDs con URIs
    
    struct NFTInfo {
        string title;
        string description;
        uint256 mintTimestamp;
        uint256 price;
        address autor;
        uint256 royaltyPercentage;
        string imageUrl;
        string file_manager_nft_id;
        address contract_address_client;
    }

    mapping(uint256 => NFTInfo) private _nftInfo;

    event NFTMinted(uint256 indexed tokenId, address indexed owner, string title, string description, uint256 price, uint256 royalty, string img, uint256 datahora, string file_manager_nft_id, address contract_address_client);    

    SignatureRecovery private signatureRecovery;

    constructor(address initialOwner)
        ERC721("level1", "lvl1")
        Ownable(initialOwner)
    {
        signatureRecovery = new SignatureRecovery();
    }

    function mintNFT(
        string memory title,
        string memory description,
        uint256 price,
        uint256 royaltyPercentage,
        string memory imageUrl,
        string memory file_manager_nft_id,
        address contract_address_client,
        bytes memory signature
    ) external onlyOwner {

        //validacao da assinatura
        bytes32 messageHash = keccak256(abi.encodePacked(file_manager_nft_id));
        require(signatureRecovery.validaAssinatura(messageHash, signature, owner()), "Assinatura invalida");
        
        //executa mint
        uint256 timestamp = block.timestamp;
        uint256 tokenId = _tokenIdCounter;
        //gera de fato a mintagem 
        _safeMint(msg.sender, tokenId);
        _tokenIdCounter++;

        _nftInfo[tokenId] = NFTInfo({
            title: title,
            description: description,
            mintTimestamp: timestamp,
            price: price,
            autor: msg.sender,
            royaltyPercentage: royaltyPercentage,
            imageUrl: imageUrl,
            file_manager_nft_id: file_manager_nft_id,
            contract_address_client: contract_address_client
        });

        emit NFTMinted(tokenId, msg.sender, title, description, price, royaltyPercentage, imageUrl, timestamp, file_manager_nft_id, contract_address_client);
    }    

    function getTokenURI(uint256 tokenId) external view returns (string memory) {
        require(tokenId > 0 && tokenId <= _tokenIdCounter, "Token ID does not exist");
        return _tokenURIs[tokenId];
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }

    function updateNFT(
        uint256 tokenId,
        string memory title,
        string memory description,
        uint256 price,
        uint256 royaltyPercentage,
        string memory imageUrl,
        string memory file_manager_nft_id,
        address contract_address_client,
        bytes memory signature
    ) external onlyOwner {

        //validacao da assinatura
        bytes32 messageHash = keccak256(abi.encodePacked(file_manager_nft_id));
        require(signatureRecovery.validaAssinatura(messageHash, signature, owner()), "Assinatura invalida");

        // Atualiza as informações do NFT
        NFTInfo storage nft = _nftInfo[tokenId];

        nft.title = title;
        nft.description = description;
        nft.price = price;
        nft.royaltyPercentage = royaltyPercentage;
        nft.imageUrl = imageUrl;
        nft.file_manager_nft_id = file_manager_nft_id;
        nft.contract_address_client = contract_address_client;

        emit NFTUpdated(tokenId, msg.sender, title, description, price, royaltyPercentage, imageUrl, block.timestamp, file_manager_nft_id, contract_address_client);
    }

    event NFTUpdated(
        uint256 indexed tokenId,
        address indexed owner,
        string title,
        string description,
        uint256 price,
        uint256 royaltyPercentage,
        string imageUrl,
        uint256 datahora,
        string file_manager_nft_id,
        address contract_address_client           
    );

    // Estrutura para armazenar informações sobre eventos de queima
    struct BurnEvent {
        uint256 tokenId;
        address owner;
        bool exists;
    }

    // Mapeamento para armazenar informações sobre eventos de queima por tokenId
    mapping(uint256 => BurnEvent) public burnedEvents;

    // Evento que será consultado
    event NFTBurned(uint256 indexed tokenId, address indexed owner, string file_manager_nft_id, address contract_address_client);

    // Função para queimar uma NFT e emitir o evento correspondente
    function burnNFT(
        uint256 tokenId, 
        string memory file_manager_nft_id, 
        address contract_address_client,
        bytes memory signature
    ) external {

        //validacao da assinatura
        bytes32 messageHash = keccak256(abi.encodePacked(file_manager_nft_id));
        require(signatureRecovery.validaAssinatura(messageHash, signature, owner()), "Assinatura invalida");

        //executa burn
        require(ownerOf(tokenId) == _msgSender(), "Caller is not owner of the token");
        _burn(tokenId);
        emit NFTBurned(tokenId, _msgSender(), file_manager_nft_id, contract_address_client);

        // Registra o evento de queima
        burnedEvents[tokenId] = BurnEvent(tokenId, _msgSender(), true);
    }

}