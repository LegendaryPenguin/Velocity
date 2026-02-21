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
    ()=>HUMAN_AGENT_INFT_ABI,
    "TOKEN_FAUCET_ABI",
    ()=>TOKEN_FAUCET_ABI
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
const TOKEN_FAUCET_ABI = [
    "function mintTestTokens(address to)",
    "function lastMintAt(address) view returns (uint256)",
    "function cooldown() view returns (uint256)"
];
}),
"[project]/packages/web/app/api/claim/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/contract/contract.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$wallet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/wallet/wallet.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$inftAbi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/lib/inftAbi.ts [app-route] (ecmascript)");
;
;
;
function isAddress(value) {
    return /^0x[a-fA-F0-9]{40}$/.test(value);
}
async function POST(req) {
    const body = await req.json().catch(()=>({}));
    const to = body?.wallet ?? body?.to;
    const rpc = process.env.OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";
    const pk = process.env.PRIVATE_KEY ?? "";
    const tokenAddress = process.env.TOKEN_ADDRESS ?? "";
    try {
        if (!isAddress(to)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "Invalid wallet input."
            }, {
                status: 400
            });
        }
        if (!pk.startsWith("0x") || !isAddress(tokenAddress)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: "Token env missing."
            }, {
                status: 500
            });
        }
        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JsonRpcProvider"](rpc);
        const signer = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$wallet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Wallet"](pk, provider);
        const token = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Contract"](tokenAddress, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$inftAbi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_FAUCET_ABI"], signer);
        const tx = await token.mintTestTokens(to);
        const receipt = await tx.wait();
        let cooldownRemainingSec;
        try {
            const [lastMintAt, cooldownSec] = await Promise.all([
                token.lastMintAt(to),
                token.cooldown()
            ]);
            const unlockAt = Number(lastMintAt) + Number(cooldownSec);
            const now = Math.floor(Date.now() / 1000);
            cooldownRemainingSec = Math.max(0, unlockAt - now);
        } catch  {
        /* ignore */ }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            txHash: receipt?.hash,
            cooldownRemainingSec
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const isCooldown = /cooldown active/i.test(message);
        let cooldownRemainingSec;
        if (isCooldown && isAddress(to) && pk.startsWith("0x") && isAddress(tokenAddress)) {
            try {
                const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["JsonRpcProvider"](rpc);
                const token = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Contract"](tokenAddress, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$inftAbi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TOKEN_FAUCET_ABI"], new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$wallet$2f$wallet$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Wallet"](pk, provider));
                const [lastMintAt, cooldownSec] = await Promise.all([
                    token.lastMintAt(to),
                    token.cooldown()
                ]);
                const unlockAt = Number(lastMintAt) + Number(cooldownSec);
                const now = Math.floor(Date.now() / 1000);
                cooldownRemainingSec = Math.max(0, unlockAt - now);
            } catch  {
            /* ignore */ }
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: message,
            ...cooldownRemainingSec != null && {
                cooldownRemainingSec
            }
        }, {
            status: 400
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__89998207._.js.map