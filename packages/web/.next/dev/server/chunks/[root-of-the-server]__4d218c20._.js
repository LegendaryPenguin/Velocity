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
"[project]/packages/web/app/api/agent-status/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/contract/contract.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$inftAbi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/lib/inftAbi.ts [app-route] (ecmascript)");
;
;
;
function isAddress(value) {
    return /^0x[a-fA-F0-9]{40}$/.test(value);
}
async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const wallet = searchParams.get("wallet") ?? "";
        if (!isAddress(wallet)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "Invalid wallet"
            }, {
                status: 400
            });
        }
        const rpcUrl = process.env.OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";
        const inftAddress = ("TURBOPACK compile-time value", "0xEbf8088636FF56497130784320286a05165481e3") ?? "";
        if (!isAddress(inftAddress)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "INFT address missing"
            }, {
                status: 500
            });
        }
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JsonRpcProvider"](rpcUrl);
        const inft = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Contract"](inftAddress, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$inftAbi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HUMAN_AGENT_INFT_ABI"], provider);
        const tokenId = await inft.ownerToTokenId(wallet);
        if (tokenId === 0n) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "No agent minted for wallet."
            }, {
                status: 404
            });
        }
        const [encryptedURI, metadataHash, verified] = await Promise.all([
            inft.getEncryptedURI(tokenId),
            inft.getMetadataHash(tokenId),
            inft.isVerified(wallet)
        ]);
        let cooldownRemainingSec = 0;
        const faucetAddress = ("TURBOPACK compile-time value", "0xa237822F03A0D4c8C79219Bb65ad23A64c9B291a") ?? "";
        if (isAddress(faucetAddress)) {
            const faucet = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Contract"](faucetAddress, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$inftAbi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FAUCET_ABI"], provider);
            cooldownRemainingSec = Number(await faucet.cooldownRemaining(wallet));
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            tokenId: tokenId.toString(),
            verified: Boolean(verified),
            encryptedURI: String(encryptedURI),
            metadataHash: String(metadataHash),
            cooldownRemainingSec
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4d218c20._.js.map