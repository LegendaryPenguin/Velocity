import "dotenv/config";
import { Wallet, JsonRpcProvider, parseEther } from "ethers";
import { createZGComputeNetworkBroker } from "@0glabs/0g-serving-broker";

const RPC_URL = "https://evmrpc-testnet.0g.ai";
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const CHAIN_ID = 16602; // your testnet

function isLedgerNotExists(err: any) {
  const msg = String(err?.shortMessage ?? err?.message ?? "");
  const reason = String(err?.reason ?? "");
  const revertName = String(err?.revert?.name ?? "");
  return (
    msg.includes("LedgerNotExists") ||
    reason.includes("LedgerNotExists") ||
    revertName === "LedgerNotExists"
  );
}

async function ensureLedger(broker: any, userAddr: string) {
  try {
    // getLedger(address) is what your earlier stack trace showed the SDK calling
    await broker.ledger.getLedger(userAddr);
    return;
  } catch (err: any) {
    if (!isLedgerNotExists(err)) throw err;

    // Create ledger (minimum 3 OG required per starter kit / contract requirement)
    // Many examples pass `3` directly.  [oai_citation:1‡GitHub](https://github.com/0glabs/0g-compute-ts-starter-kit)
    await broker.ledger.addLedger(3);

    // Verify it exists now
    await broker.ledger.getLedger(userAddr);
  }
}

async function main() {
  const provider = new JsonRpcProvider(RPC_URL, CHAIN_ID);
  const wallet = new Wallet(PRIVATE_KEY, provider);

  // ✅ IMPORTANT: initialize using the factory (not `new LedgerBroker(...)`)
  const broker = await createZGComputeNetworkBroker(wallet);  

  await ensureLedger(broker, wallet.address);

  console.log("Ledger OK for:", wallet.address);

  // Example next steps:
  // await broker.ledger.depositFund( ... )
  // await broker.inference.acknowledgeProviderSigner(providerAddress)
  // await broker.ledger.transferFund(providerAddress, "inference", parseEther("1.0"))
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});