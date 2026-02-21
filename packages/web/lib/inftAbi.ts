export const HUMAN_AGENT_INFT_ABI = [
  "event Minted(uint256 indexed tokenId, address indexed owner, string encryptedURI, bytes32 metadataHash)",
  "function mint(address to, string encryptedURI, bytes32 metadataHash) returns (uint256)",
  "function ownerToTokenId(address owner) view returns (uint256)",
  "function getEncryptedURI(uint256 tokenId) view returns (string)",
  "function getMetadataHash(uint256 tokenId) view returns (bytes32)",
  "function authorizeUsage(uint256 tokenId, address executor, bool allowed)",
  "function isVerified(address wallet) view returns (bool)"
] as const;

export const FAUCET_ABI = [
  "function claim(address caller, address recipient)",
  "function cooldownRemaining(address wallet) view returns (uint256)"
] as const;

/** NothingLike0g ERC20 faucet - mints test tokens, no iNFT required */
export const TOKEN_FAUCET_ABI = [
  "function mintTestTokens(address to)",
  "function lastMintAt(address) view returns (uint256)",
  "function cooldown() view returns (uint256)"
] as const;
