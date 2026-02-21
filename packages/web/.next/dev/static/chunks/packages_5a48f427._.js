(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/sdk/src/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authorizeAction",
    ()=>authorizeAction,
    "checkAgentStatus",
    ()=>checkAgentStatus,
    "mintAgent",
    ()=>mintAgent,
    "verifyHuman",
    ()=>verifyHuman
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/contract/contract.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/providers/provider-jsonrpc.js [app-client] (ecmascript)");
;
const INFT_ABI = [
    "function ownerToTokenId(address owner) view returns (uint256)",
    "function getEncryptedURI(uint256 tokenId) view returns (string)",
    "function getMetadataHash(uint256 tokenId) view returns (bytes32)",
    "function authorizeUsage(uint256 tokenId, address executor, bool allowed)"
];
function verifyHuman(passed) {
    return {
        verified: passed,
        verificationToken: passed ? `verified-${Date.now()}` : "unverified"
    };
}
async function mintAgent(baseUrl, wallet) {
    const res = await fetch(`${baseUrl}/api/mint`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            to_address: wallet,
            verificationPassed: true
        })
    });
    return await res.json();
}
async function checkAgentStatus(rpcUrl, inftAddress, wallet) {
    const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$providers$2f$provider$2d$jsonrpc$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["JsonRpcProvider"](rpcUrl);
    const contract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Contract"](inftAddress, INFT_ABI, provider);
    const tokenId = await contract.ownerToTokenId(wallet);
    if (tokenId === 0n) {
        throw new Error("No agent for wallet");
    }
    const [encryptedURI, metadataHash] = await Promise.all([
        contract.getEncryptedURI(tokenId),
        contract.getMetadataHash(tokenId)
    ]);
    return {
        tokenId: tokenId.toString(),
        encryptedURI: String(encryptedURI),
        metadataHash: String(metadataHash)
    };
}
async function authorizeAction(contract, tokenId, executor) {
    const tx = await contract.authorizeUsage(tokenId, executor, true);
    const receipt = await tx.wait();
    return receipt?.hash ?? "";
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/components/VerificationWidget.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VerificationWidget",
    ()=>VerificationWidget
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$sdk$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/sdk/src/index.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function VerificationWidget({ wallet, onWalletChange, onVerified }) {
    _s();
    const [demoPass, setDemoPass] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const runVerification = ()=>{
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$sdk$2f$src$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verifyHuman"])(demoPass);
        if (!result.verified) {
            setStatus("failed");
            return;
        }
        const token = result.verificationToken;
        setStatus("verified");
        onVerified(token);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass rounded-2xl p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold",
                children: "Human Verification"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/VerificationWidget.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-white/60",
                children: "Interaction data never leaves your device."
            }, void 0, false, {
                fileName: "[project]/packages/web/components/VerificationWidget.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mt-4 block text-sm text-white/80",
                children: [
                    "Wallet address",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        value: wallet,
                        onChange: (e)=>onWalletChange(e.target.value),
                        className: "mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm outline-none",
                        placeholder: "0x..."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/VerificationWidget.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/VerificationWidget.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "mt-3 flex items-center gap-2 text-sm text-white/80",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "checkbox",
                        checked: demoPass,
                        onChange: (e)=>setDemoPass(e.target.checked)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/VerificationWidget.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    "Demo verification pass"
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/VerificationWidget.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: runVerification,
                className: "mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold",
                children: "Verify Access"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/VerificationWidget.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-sm",
                children: [
                    "Status:",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: status === "verified" ? "text-emerald-300" : status === "failed" ? "text-rose-300" : "text-white/70",
                        children: status === "idle" ? "Not Verified" : status === "verified" ? "Verified" : "Not Verified"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/VerificationWidget.tsx",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/VerificationWidget.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/VerificationWidget.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
_s(VerificationWidget, "43f4yEAaSjOXNKwBvacSdugC8Sk=");
_c = VerificationWidget;
var _c;
__turbopack_context__.k.register(_c, "VerificationWidget");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/app/faucet/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FaucetPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$VerificationWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/VerificationWidget.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function FaucetPage() {
    _s();
    const [wallet, setWallet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [verificationToken, setVerificationToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [mint, setMint] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [claim, setClaim] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const canMint = Boolean(verificationToken && wallet);
    const canClaim = Boolean(status?.ok && status?.verified);
    const refreshStatus = async ()=>{
        if (!wallet) return;
        const res = await fetch(`/api/agent-status?wallet=${encodeURIComponent(wallet)}`);
        setStatus(await res.json());
    };
    const doMint = async ()=>{
        const res = await fetch("/api/mint", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                to_address: wallet,
                verificationPassed: Boolean(verificationToken)
            })
        });
        const data = await res.json();
        setMint(data);
        await refreshStatus();
    };
    const doClaim = async ()=>{
        const res = await fetch("/api/claim", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                wallet,
                to: wallet
            })
        });
        const data = await res.json();
        setClaim(data);
        await refreshStatus();
    };
    const cooldownLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FaucetPage.useMemo[cooldownLabel]": ()=>`${status?.cooldownRemainingSec ?? 0}s`
    }["FaucetPage.useMemo[cooldownLabel]"], [
        status?.cooldownRemainingSec
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "glass rounded-3xl p-7",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-semibold",
                        children: "Faucet Demo"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-white/70",
                        children: "Verify access, mint a Human Agent iNFT, and claim via policy-controlled onchain action."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/faucet/page.tsx",
                lineNumber: 77,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "grid gap-6 xl:grid-cols-[1.15fr_0.85fr]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$VerificationWidget$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["VerificationWidget"], {
                                wallet: wallet,
                                onWalletChange: setWallet,
                                onVerified: setVerificationToken
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                lineNumber: 86,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-2xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold",
                                        children: "Mint Human Agent iNFT"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        disabled: !canMint,
                                        onClick: doMint,
                                        className: "mt-4 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold disabled:opacity-50",
                                        children: "Mint Human Agent iNFT"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    mint?.ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-4 space-y-1 text-sm text-emerald-200",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "Token ID: ",
                                                    mint.tokenId
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                                lineNumber: 100,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "Transaction: ",
                                                    mint.txHash
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                                lineNumber: 101,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Status: Agent Active"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                                lineNumber: 102,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                                        lineNumber: 99,
                                        columnNumber: 15
                                    }, this),
                                    mint && !mint.ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm text-rose-300",
                                        children: [
                                            "Error: ",
                                            mint.error
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                                        lineNumber: 105,
                                        columnNumber: 34
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-2xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold",
                                        children: "Faucet Claim"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        disabled: !canClaim,
                                        onClick: doClaim,
                                        className: "mt-4 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold disabled:opacity-50",
                                        children: "Claim Faucet"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, this),
                                    claim?.ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm text-emerald-200",
                                        children: [
                                            "Claim submitted: ",
                                            claim.txHash
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                                        lineNumber: 118,
                                        columnNumber: 27
                                    }, this),
                                    claim && !claim.ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm text-rose-300",
                                        children: [
                                            "Error: ",
                                            claim.error
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                                        lineNumber: 119,
                                        columnNumber: 36
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                        lineNumber: 85,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-2xl p-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-lg font-semibold",
                                                children: "Agent Status Panel"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                                lineNumber: 126,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "text-xs text-indigo-300 underline",
                                                onClick: refreshStatus,
                                                children: "Refresh"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                                lineNumber: 127,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 13
                                    }, this),
                                    !status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm text-white/60",
                                        children: "No status loaded."
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                                        lineNumber: 131,
                                        columnNumber: 25
                                    }, this),
                                    status?.ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-3 space-y-2 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "Agent Token ID: ",
                                                    status.tokenId
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                                lineNumber: 134,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "Verified: ",
                                                    status.verified ? "Yes" : "No"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                                lineNumber: 135,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Expires: metadata policy"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                                lineNumber: 136,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    "Cooldown remaining: ",
                                                    cooldownLabel
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                                lineNumber: 137,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "break-all",
                                                children: [
                                                    "Encrypted Metadata URI: ",
                                                    status.encryptedURI
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                                lineNumber: 138,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this),
                                    status && !status.ok && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-3 text-sm text-rose-300",
                                        children: status.error
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                                        lineNumber: 141,
                                        columnNumber: 38
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                lineNumber: 124,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "glass rounded-2xl p-5 text-sm text-white/75",
                                children: "This faucet uses a privacy-preserving verification agent stored as an encrypted iNFT on 0G."
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/faucet/page.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/faucet/page.tsx",
                        lineNumber: 123,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/faucet/page.tsx",
                lineNumber: 84,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/app/faucet/page.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
_s(FaucetPage, "uEql+HKStx84/obauxVg0lwtX1Y=");
_c = FaucetPage;
var _c;
__turbopack_context__.k.register(_c, "FaucetPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=packages_5a48f427._.js.map