// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface IOracle {
    function verifyProof(bytes calldata proof) external view returns (bool);
}

contract HumanAgentINFT is ERC721, Ownable, ReentrancyGuard {
    mapping(uint256 => bytes32) private _metadataHashes;
    mapping(uint256 => string) private _encryptedURIs;

    address public oracle;
    uint256 private _nextTokenId = 1;

    event Minted(
        uint256 indexed tokenId,
        address indexed to,
        string encryptedURI,
        bytes32 metadataHash
    );
    event MetadataUpdated(uint256 indexed tokenId, bytes32 newHash, string newURI);

    constructor(
        string memory name_,
        string memory symbol_,
        address oracle_
    ) ERC721(name_, symbol_) Ownable(msg.sender) {
        oracle = oracle_;
    }

    function mint(
        address to,
        string calldata encryptedURI,
        bytes32 metadataHash
    ) external onlyOwner returns (uint256) {
        require(to != address(0), "Invalid recipient");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _encryptedURIs[tokenId] = encryptedURI;
        _metadataHashes[tokenId] = metadataHash;
        emit Minted(tokenId, to, encryptedURI, metadataHash);
        return tokenId;
    }

    function transferWithProof(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata sealedKey,
        bytes calldata proof
    ) external nonReentrant {
        require(ownerOf(tokenId) == from, "Not owner");
        require(msg.sender == from || msg.sender == owner(), "Unauthorized caller");
        require(IOracle(oracle).verifyProof(proof), "Invalid proof");
        bytes32 newHash = keccak256(sealedKey);
        _metadataHashes[tokenId] = newHash;
        emit MetadataUpdated(tokenId, newHash, _encryptedURIs[tokenId]);
        _transfer(from, to, tokenId);
    }

    function getMetadataHash(uint256 tokenId) external view returns (bytes32) {
        _requireOwned(tokenId);
        return _metadataHashes[tokenId];
    }

    function getEncryptedURI(uint256 tokenId) external view returns (string memory) {
        _requireOwned(tokenId);
        return _encryptedURIs[tokenId];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        return _encryptedURIs[tokenId];
    }
}
