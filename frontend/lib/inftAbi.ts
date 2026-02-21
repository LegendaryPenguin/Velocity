export const HUMAN_AGENT_INFT_ABI = [
  "event Minted(uint256 indexed tokenId, address indexed to, string encryptedURI, bytes32 metadataHash)",
  "function mint(address to, string encryptedURI, bytes32 metadataHash) external returns (uint256)",
  "function getEncryptedURI(uint256 tokenId) external view returns (string)",
  "function getMetadataHash(uint256 tokenId) external view returns (bytes32)",
  "function tokenURI(uint256 tokenId) external view returns (string)",
] as const;
