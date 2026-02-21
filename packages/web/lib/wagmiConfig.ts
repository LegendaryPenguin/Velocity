import { createConfig, http } from "wagmi";
import { createPublicClient, defineChain } from "viem";

export const ogTestnet = defineChain({
  id: 80087,
  name: "0G Testnet",
  nativeCurrency: { name: "OG", symbol: "OG", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evmrpc-testnet.0g.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "0G Explorer",
      url: "https://chainscan-galileo.0g.ai",
    },
  },
});

const ogTestnetRpcUrl = "https://evmrpc-testnet.0g.ai";

export const wagmiConfig = createConfig({
  chains: [ogTestnet],
  transports: {
    [ogTestnet.id]: http(ogTestnetRpcUrl),
  },
  ssr: true,
});

/** Public client that always uses 0G Testnet RPC (bypasses wallet's RPC config). */
export const ogTestnetPublicClient = createPublicClient({
  chain: ogTestnet,
  transport: http(ogTestnetRpcUrl),
});
