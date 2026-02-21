import crypto from "crypto";

export type StoreEncryptedResult = {
  uri: string;
  provider: "0g-storage" | "stub";
};

type StoreLikeClient = {
  store: (payload: string | Uint8Array) => Promise<{ uri?: string; rootHash?: string }>;
};

async function tryStoreWith0g(payload: string): Promise<string | null> {
  try {
    const sdk = (await import("@0glabs/0g-ts-sdk")) as Record<string, unknown>;
    const maybeFactory = sdk.createStorageClient as
      | ((opts: { url: string; apiKey?: string }) => Promise<StoreLikeClient> | StoreLikeClient)
      | undefined;
    if (!maybeFactory || !process.env.OG_STORAGE_URL) return null;

    const client = await maybeFactory({
      url: process.env.OG_STORAGE_URL,
      apiKey: process.env.OG_STORAGE_API_KEY,
    });
    const result = await client.store(payload);
    return result.uri ?? (result.rootHash ? `0g://${result.rootHash}` : null);
  } catch {
    return null;
  }
}

export async function storeEncryptedPayload(payload: string): Promise<StoreEncryptedResult> {
  const ogUri = await tryStoreWith0g(payload);
  if (ogUri) return { uri: ogUri, provider: "0g-storage" };

  // Stable fallback URI for demo runs when 0G storage auth/client is unavailable.
  const digest = crypto.createHash("sha256").update(payload).digest("hex");
  return { uri: `demo://encrypted/${digest}`, provider: "stub" };
}
