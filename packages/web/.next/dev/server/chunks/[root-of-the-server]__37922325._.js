module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/packages/web/lib/encrypt.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "encryptJson",
    ()=>encryptJson
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
function encryptJson(plainJson) {
    const key = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(32);
    const iv = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].randomBytes(12);
    const cipher = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createCipheriv("aes-256-gcm", key, iv);
    const ciphertext = Buffer.concat([
        cipher.update(plainJson, "utf8"),
        cipher.final()
    ]);
    const authTag = cipher.getAuthTag();
    const sealedKey = Buffer.from(`${process.env.DEMO_SEALING_SECRET ?? "demo-secret"}:${key.toString("base64")}`).toString("base64");
    return {
        algorithm: "aes-256-gcm",
        iv: iv.toString("base64"),
        authTag: authTag.toString("base64"),
        ciphertext: ciphertext.toString("base64"),
        sealedKey
    };
}
}),
"[project]/packages/web/lib/inftAbi.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FAUCET_ABI",
    ()=>FAUCET_ABI,
    "HUMAN_AGENT_INFT_ABI",
    ()=>HUMAN_AGENT_INFT_ABI
]);
const HUMAN_AGENT_INFT_ABI = [
    "event Minted(uint256 indexed tokenId, address indexed owner, string encryptedURI, bytes32 metadataHash)",
    "function mint(address to, string encryptedURI, bytes32 metadataHash) returns (uint256)",
    "function ownerToTokenId(address owner) view returns (uint256)",
    "function getEncryptedURI(uint256 tokenId) view returns (string)",
    "function getMetadataHash(uint256 tokenId) view returns (bytes32)",
    "function authorizeUsage(uint256 tokenId, address executor, bool allowed)",
    "function isVerified(address wallet) view returns (bool)"
];
const FAUCET_ABI = [
    "function claim(address caller, address recipient)",
    "function cooldownRemaining(address wallet) view returns (uint256)"
];
}),
"[project]/packages/web/lib/ogStorage.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "retrieveEncryptedMetadata",
    ()=>retrieveEncryptedMetadata,
    "storeEncryptedMetadata",
    ()=>storeEncryptedMetadata
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
async function storeEncryptedMetadata(data) {
    try {
        const sdk = await __turbopack_context__.A("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/index.js [app-route] (ecmascript, async loader)");
        const createStorageClient = sdk.createStorageClient;
        if (!createStorageClient || !process.env.OG_STORAGE_URL) {
            throw new Error("0G storage client unavailable");
        }
        const client = await createStorageClient({
            url: process.env.OG_STORAGE_URL,
            apiKey: process.env.OG_STORAGE_API_KEY
        });
        const result = await client.store(data);
        return result.uri ?? `0g://${result.rootHash ?? "unknown"}`;
    } catch  {
        const digest = __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["default"].createHash("sha256").update(data).digest("hex");
        return `demo://encrypted/${digest}`;
    }
}
async function retrieveEncryptedMetadata(uri) {
    return `Retrieve stub for ${uri}`;
}
}),
"[project]/packages/web/app/api/mint/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/contract/contract.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$wallet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/wallet/wallet.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/ethers.js [app-route] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$encrypt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/lib/encrypt.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$inftAbi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/lib/inftAbi.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$ogStorage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/lib/ogStorage.ts [app-route] (ecmascript)");
;
;
;
;
;
const runtime = "nodejs";
const lastByIp = new Map();
const MIN_MS = 15_000;
function isAddress(value) {
    return /^0x[a-fA-F0-9]{40}$/.test(value);
}
async function POST(req) {
    try {
        const ip = req.headers.get("x-forwarded-for") ?? "local";
        const now = Date.now();
        const last = lastByIp.get(ip) ?? 0;
        if (now - last < MIN_MS) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "Rate limit: wait a few seconds."
            }, {
                status: 429
            });
        }
        lastByIp.set(ip, now);
        const { to_address, verificationPassed } = await req.json();
        if (verificationPassed !== true) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "Verification required."
            }, {
                status: 403
            });
        }
        if (!isAddress(to_address)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "Invalid wallet address."
            }, {
                status: 400
            });
        }
        const rpcUrl = process.env.OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";
        const pk = process.env.PRIVATE_KEY ?? "";
        const inftAddress = ("TURBOPACK compile-time value", "0xEbf8088636FF56497130784320286a05165481e3") ?? "";
        if (!pk.startsWith("0x") || !isAddress(inftAddress)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "Missing deployment env vars."
            }, {
                status: 500
            });
        }
        const metadata = {
            type: "human-agent",
            issuer: "0G Trust Studio",
            verified: true,
            verifiedAt: now,
            expiresAt: now + 30 * 24 * 60 * 60 * 1000,
            policy: {
                cooldownSec: 86400
            },
            model: {
                name: "demo-classifier"
            }
        };
        const plaintext = JSON.stringify(metadata);
        const encryptedPayload = JSON.stringify((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$encrypt$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encryptJson"])(plaintext));
        const encryptedURI = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$ogStorage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["storeEncryptedMetadata"])(encryptedPayload);
        const metadataHash = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].keccak256(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].toUtf8Bytes(plaintext));
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JsonRpcProvider"](rpcUrl);
        const signer = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$wallet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Wallet"](pk, provider);
        const inft = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Contract"](inftAddress, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$inftAbi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HUMAN_AGENT_INFT_ABI"], signer);
        const tx = await inft.mint(to_address, encryptedURI, metadataHash, {
            gasLimit: 500_000
        });
        const receipt = await tx.wait();
        const parsed = receipt?.logs.map((log)=>{
            try {
                return inft.interface.parseLog(log);
            } catch  {
                return null;
            }
        }).find((v)=>v?.name === "Minted");
        const tokenId = parsed?.args?.tokenId?.toString() ?? null;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            tokenId,
            txHash: receipt?.hash,
            encryptedURI,
            metadataHash
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: message
        }, {
            status: 400
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__37922325._.js.map