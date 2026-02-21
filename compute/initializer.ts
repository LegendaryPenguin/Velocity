import "dotenv/config";
import { Wallet, JsonRpcProvider } from "ethers";
import { createZGComputeNetworkBroker } from "@0glabs/0g-serving-broker";

// 0G testnet
const RPC_URL = "https://evmrpc-testnet.0g.ai";
const CHAIN_ID = 16602;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;

// ====== Your LR inputs ======
const weights = [0.12, -0.07, 0.31, 0.02]; // w
const bias = -0.15;                        // b
const features = [3, 1, 0, 5];             // x (your telemetry features)
const label = 1;                           // y in {0,1} for training update example
const learningRate = 0.05;

// Choose a provider address (you can hardcode after you pick one)
// If undefined, we’ll just take the first Chatbot service from listService()
const PREFERRED_PROVIDER: string | undefined = undefined;

// Helper: detect LedgerNotExists (your version)
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
    await broker.ledger.getLedger(userAddr);
    return;
  } catch (err: any) {
    if (!isLedgerNotExists(err)) throw err;
    // Create ledger with minimum balance (docs/examples often use 3)
    await broker.ledger.addLedger(3);
    await broker.ledger.getLedger(userAddr);
  }
}

function buildPrompt() {
  // Ask for JSON only, deterministic settings, and a single update step.
  // This is NOT “real fine-tuning”—it’s the LLM doing the math you request.
  return `
You are a strict calculator. Return ONLY valid JSON.

We are doing logistic regression training for one sample.
Given:
weights w = ${JSON.stringify(weights)}
bias b = ${bias}
features x = ${JSON.stringify(features)}
label y = ${label}
learning_rate lr = ${learningRate}

Tasks:
1) Compute linear score s = dot(w, x) + b.
2) Compute probability p = sigmoid(s).
3) Compute prediction pred = (p >= 0.5).
4) Compute ONE SGD step for logistic regression:
   w_new = w - lr * (p - y) * x
   b_new = b - lr * (p - y)
5) Return:
{
  "s": number,
  "p": number,
  "pred": 0 or 1,
  "w_new": number[],
  "b_new": number
}
Use reasonable floating precision (e.g., 1e-6).
`.trim();
}

async function main() {
  if (!PRIVATE_KEY) throw new Error("Missing PRIVATE_KEY in env");

  const provider = new JsonRpcProvider(RPC_URL, CHAIN_ID);
  const wallet = new Wallet(PRIVATE_KEY, provider);
  const broker = await createZGComputeNetworkBroker(wallet); // per docs  [oai_citation:2‡GitHub](https://github.com/0gfoundation/0g-serving-user-broker)

  // 1) Ensure ledger exists
  await ensureLedger(broker, wallet.address);

  // 2) Discover services and pick a chatbot provider
  const services = await broker.inference.listService(); // shown in SDK quickstart  [oai_citation:3‡GitHub](https://github.com/0gfoundation/0g-serving-user-broker)
  const chatbotServices = services.filter((s: any) =>
    String(s.serviceType).toLowerCase().includes("chat")
  );

  if (chatbotServices.length === 0) {
    throw new Error("No chatbot services found on this network.");
  }

  const chosen = PREFERRED_PROVIDER
    ? chatbotServices.find((s: any) => s.provider.toLowerCase() === PREFERRED_PROVIDER.toLowerCase())
    : chatbotServices[0];

  if (!chosen) throw new Error("Preferred provider not found in listService().");

  const providerAddress = chosen.provider as string;
  console.log("Using provider:", providerAddress, "model:", chosen.model);

  // 3) Deposit funds (main account). Unit is A0GI per broker docs.  [oai_citation:4‡npm](https://www.npmjs.com/package/%400glabs/0g-serving-broker?activeTab=readme)
  // NOTE: Some flows also require transferring funds to a provider sub-account (CLI shows that),
  // depending on SDK version / network config. If your requests are denied for insufficient balance,
  // implement broker.ledger.transferFund(providerAddress, "inference", amount) if available.
  await broker.ledger.depositFund(10);

  // 4) Acknowledge provider signer (required before using service)  [oai_citation:5‡GitHub](https://github.com/0gfoundation/0g-serving-user-broker)
  await broker.inference.acknowledgeProviderSigner(providerAddress);

  // 5) Get endpoint + model metadata  [oai_citation:6‡GitHub](https://github.com/0gfoundation/0g-serving-user-broker)
  const { endpoint, model } = await broker.inference.getServiceMetadata(providerAddress);
  console.log("Endpoint:", endpoint);
  console.log("Model:", model);

  // 6) Generate one-time billing/auth headers for this request.
  // Headers are single-use. The SDK docs show passing `content` for billing.  [oai_citation:7‡npm](https://www.npmjs.com/package/%400glabs/0g-serving-broker?activeTab=readme)
  const content = buildPrompt();
  const headers = await broker.inference.getRequestHeaders(providerAddress, content);

  // 7) Call OpenAI-compatible endpoint (chat completions)
  // The docs show `${endpoint}/chat/completions` with messages[].  [oai_citation:8‡GitHub](https://github.com/0gfoundation/0g-serving-user-broker)
  const resp = await fetch(`${endpoint}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: "You output ONLY JSON. No prose." },
        { role: "user", content }
      ],
      temperature: 0
    })
  });

  if (!resp.ok) {
    const text = await resp.text().catch(() => "");
    throw new Error(`Inference HTTP ${resp.status}: ${text}`);
  }

  const data = await resp.json();

  // Extract assistant text
  const assistantText =
    data?.choices?.[0]?.message?.content ??
    data?.choices?.[0]?.text ??
    "";

  console.log("\nRaw model output:\n", assistantText);

  // 8) (Optional) Verify response if provider is verifiable (TeeML)
  // Docs: processResponse(providerAddress, content, chatID) validates signatures.  [oai_citation:9‡npm](https://www.npmjs.com/package/%400glabs/0g-serving-broker?activeTab=readme)
  // chatID location may vary by provider; some include it in response metadata.
  const chatID = data?.id; // might not be correct for all providers
  if (chatID) {
    try {
      const valid = await broker.inference.processResponse(providerAddress, assistantText, chatID);
      console.log("Response signature valid?", valid);
    } catch {
      // Ignore verification errors in hackathon MVP
    }
  }

  // 9) Parse JSON safely
  const parsed = JSON.parse(assistantText);
  console.log("\nParsed JSON:\n", parsed);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});