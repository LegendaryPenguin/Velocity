// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract HumanAgentINFT is ERC721, Ownable, ReentrancyGuard {
    mapping(uint256 => bytes32) private _metadataHashes;
    mapping(uint256 => string) private _encryptedURIs;
    mapping(uint256 => mapping(address => bool)) private _authorizations;
    mapping(address => uint256) public ownerToTokenId;
    mapping(uint256 => bool) private _verified;

    uint256 private _nextTokenId = 1;

    event Minted(
        uint256 indexed tokenId,
        address indexed owner,
        string encryptedURI,
        bytes32 metadataHash
    );
    event UsageAuthorized(uint256 indexed tokenId, address indexed executor, bool allowed);

    constructor() ERC721("Human Agents", "HUMAN") Ownable(msg.sender) {}

    function mint(
        address to,
        string calldata encryptedURI,
        bytes32 metadataHash
    ) external onlyOwner returns (uint256) {
        require(to != address(0), "Invalid recipient");
        require(ownerToTokenId[to] == 0, "Owner already has agent");

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        _encryptedURIs[tokenId] = encryptedURI;
        _metadataHashes[tokenId] = metadataHash;
        ownerToTokenId[to] = tokenId;
        _verified[tokenId] = true;

        emit Minted(tokenId, to, encryptedURI, metadataHash);
        return tokenId;
    }

    function getEncryptedURI(uint256 tokenId) external view returns (string memory) {
        _requireOwned(tokenId);
        return _encryptedURIs[tokenId];
    }

    function getMetadataHash(uint256 tokenId) external view returns (bytes32) {
        _requireOwned(tokenId);
        return _metadataHashes[tokenId];
    }

    function authorizeUsage(
        uint256 tokenId,
        address executor,
        bool allowed
    ) external {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        _authorizations[tokenId][executor] = allowed;
        emit UsageAuthorized(tokenId, executor, allowed);
    }

    function canUse(uint256 tokenId, address executor) public view returns (bool) {
        if (!_verified[tokenId]) return false;
        if (ownerOf(tokenId) == executor) return true;
        return _authorizations[tokenId][executor];
    }

    function isVerified(address wallet) external view returns (bool) {
        uint256 tokenId = ownerToTokenId[wallet];
        if (tokenId == 0) return false;
        if (!_ownerExists(tokenId)) return false;
        return ownerOf(tokenId) == wallet && _verified[tokenId];
    }

    function _ownerExists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }
}
