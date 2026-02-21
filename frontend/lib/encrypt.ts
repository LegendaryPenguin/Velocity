import crypto from "crypto";

export type EncryptedPayload = {
  ciphertextB64: string;
  ivB64: string;
  authTagB64: string;
  sealedKeyB64: string;
  algorithm: "aes-256-gcm";
};

const DEMO_SEALING_SECRET =
  process.env.DEMO_SEALING_SECRET ?? "demo-only-sealing-secret-change-me";

export function encryptMetadata(plaintextJson: string): EncryptedPayload {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(plaintextJson, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  // DEMO ONLY: simulates key sealing. Replace with recipient public-key encryption in production.
  const hmac = crypto
    .createHmac("sha256", DEMO_SEALING_SECRET)
    .update(key)
    .digest();
  const sealedKey = Buffer.concat([hmac, key]).toString("base64");

  return {
    ciphertextB64: encrypted.toString("base64"),
    ivB64: iv.toString("base64"),
    authTagB64: authTag.toString("base64"),
    sealedKeyB64: sealedKey,
    algorithm: "aes-256-gcm",
  };
}
