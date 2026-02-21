import crypto from "crypto";

export function encryptJson(plainJson: string) {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(plainJson, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  const sealedKey = Buffer.from(
    `${process.env.DEMO_SEALING_SECRET ?? "demo-secret"}:${key.toString("base64")}`
  ).toString("base64");

  return {
    algorithm: "aes-256-gcm",
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
    ciphertext: ciphertext.toString("base64"),
    sealedKey
  };
}
