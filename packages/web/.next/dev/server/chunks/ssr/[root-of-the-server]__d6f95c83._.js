module.exports = [
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/packages/web/components/faucet/BackgroundScene.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BackgroundScene",
    ()=>BackgroundScene
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/script.js [app-ssr] (ecmascript)");
"use client";
;
;
function BackgroundScene() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$script$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                src: "https://unpkg.com/@splinetool/viewer@1.12.58/build/spline-viewer.js",
                strategy: "beforeInteractive",
                type: "module"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/faucet/BackgroundScene.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("spline-viewer", {
                url: "https://prod.spline.design/mMEB6FJWdEa9lcn0/scene.splinecode",
                className: "absolute inset-0 h-full w-full border-0",
                style: {
                    filter: "blur(4px) brightness(0.82) saturate(1.05)",
                    transform: "scale(1.03)"
                }
            }, void 0, false, {
                fileName: "[project]/packages/web/components/faucet/BackgroundScene.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                style: {
                    background: "radial-gradient(80% 60% at 50% 40%, rgba(168,85,247,0.12), transparent 60%), radial-gradient(60% 50% at 20% 20%, rgba(59,130,246,0.12), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.35), rgba(0,0,0,0.72))"
                }
            }, void 0, false, {
                fileName: "[project]/packages/web/components/faucet/BackgroundScene.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/faucet/BackgroundScene.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/web/components/faucet/PatternIcon.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PatternIcon",
    ()=>PatternIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function PatternIcon({ type }) {
    const s = 48;
    const h = s / 2;
    switch(type){
        case "circle":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: `0 0 ${s} ${s}`,
                className: "h-full w-full drop-shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                            id: "cg",
                            cx: "40%",
                            cy: "35%",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "0%",
                                    stopColor: "#c4b5fd"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                                    lineNumber: 12,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "100%",
                                    stopColor: "#7c3aed"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                                    lineNumber: 13,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                            lineNumber: 11,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 10,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: h,
                        cy: h,
                        r: 16,
                        fill: "url(#cg)"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: h - 4,
                        cy: h - 5,
                        r: 4,
                        fill: "white",
                        opacity: 0.3
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 17,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                lineNumber: 9,
                columnNumber: 9
            }, this);
        case "triangle":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: `0 0 ${s} ${s}`,
                className: "h-full w-full drop-shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                            id: "tg",
                            x1: "0",
                            y1: "0",
                            x2: "0",
                            y2: "1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "0%",
                                    stopColor: "#f0abfc"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                                    lineNumber: 25,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "100%",
                                    stopColor: "#a855f7"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                                    lineNumber: 26,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                            lineNumber: 24,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: "24,6 42,42 6,42",
                        fill: "url(#tg)"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                lineNumber: 22,
                columnNumber: 9
            }, this);
        case "plus":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: `0 0 ${s} ${s}`,
                className: "h-full w-full drop-shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                            id: "pg",
                            x1: "0",
                            y1: "0",
                            x2: "1",
                            y2: "1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "0%",
                                    stopColor: "#67e8f9"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "100%",
                                    stopColor: "#06b6d4"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                                    lineNumber: 38,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                            lineNumber: 36,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 35,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: 18,
                        y: 6,
                        width: 12,
                        height: 36,
                        rx: 3,
                        fill: "url(#pg)"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: 6,
                        y: 18,
                        width: 36,
                        height: 12,
                        rx: 3,
                        fill: "url(#pg)"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this);
        case "waves":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: `0 0 ${s} ${s}`,
                className: "h-full w-full drop-shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M6 16 Q14 8 24 16 Q34 24 42 16",
                        fill: "none",
                        stroke: "#c084fc",
                        strokeWidth: 3.5,
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 48,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M6 26 Q14 18 24 26 Q34 34 42 26",
                        fill: "none",
                        stroke: "#a855f7",
                        strokeWidth: 3.5,
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M6 36 Q14 28 24 36 Q34 44 42 36",
                        fill: "none",
                        stroke: "#7c3aed",
                        strokeWidth: 3.5,
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, this);
        case "stripes":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: `0 0 ${s} ${s}`,
                className: "h-full w-full drop-shadow-sm",
                children: [
                    10,
                    18,
                    26,
                    34
                ].map((y, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: 6,
                        y: y,
                        width: 36,
                        height: 4,
                        rx: 2,
                        fill: i % 2 === 0 ? "#e879f9" : "#c026d3"
                    }, y, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 57,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                lineNumber: 55,
                columnNumber: 9
            }, this);
        case "star":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: `0 0 ${s} ${s}`,
                className: "h-full w-full drop-shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                            id: "sg",
                            x1: "0",
                            y1: "0",
                            x2: "0",
                            y2: "1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "0%",
                                    stopColor: "#fbbf24"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                    offset: "100%",
                                    stopColor: "#f59e0b"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                            lineNumber: 65,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("polygon", {
                        points: "24,4 29,18 44,18 32,27 36,42 24,33 12,42 16,27 4,18 19,18",
                        fill: "url(#sg)"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/faucet/PatternIcon.tsx",
                lineNumber: 63,
                columnNumber: 9
            }, this);
    }
}
}),
"[project]/packages/web/hooks/useReducedMotionPref.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useReducedMotionPref",
    ()=>useReducedMotionPref
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
function useReducedMotionPref() {
    const [reduced, setReduced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = ()=>setReduced(media.matches);
        update();
        media.addEventListener("change", update);
        return ()=>media.removeEventListener("change", update);
    }, []);
    return reduced;
}
}),
"[project]/packages/web/lib/captchaModel.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BIAS",
    ()=>BIAS,
    "BOT_STEP_INTERVAL_MS",
    ()=>BOT_STEP_INTERVAL_MS,
    "FEATURE_ORDER",
    ()=>FEATURE_ORDER,
    "GRID_SIZE",
    ()=>GRID_SIZE,
    "HESITATION_THRESHOLD_MS",
    ()=>HESITATION_THRESHOLD_MS,
    "INITIAL_SEED",
    ()=>INITIAL_SEED,
    "MAX_TARGETS",
    ()=>MAX_TARGETS,
    "MIN_TARGETS",
    ()=>MIN_TARGETS,
    "MOUSE_SAMPLE_INTERVAL_MS",
    ()=>MOUSE_SAMPLE_INTERVAL_MS,
    "PATTERN_TYPES",
    ()=>PATTERN_TYPES,
    "THRESHOLD",
    ()=>THRESHOLD,
    "TILE_COUNT",
    ()=>TILE_COUNT,
    "WEIGHTS",
    ()=>WEIGHTS,
    "ZERO_FEATURES",
    ()=>ZERO_FEATURES,
    "computeFeatures",
    ()=>computeFeatures,
    "generateBotPath",
    ()=>generateBotPath,
    "generatePuzzle",
    ()=>generatePuzzle,
    "runModel",
    ()=>runModel,
    "toExportJson",
    ()=>toExportJson
]);
const PATTERN_TYPES = [
    "circle",
    "triangle",
    "plus",
    "waves",
    "stripes",
    "star"
];
const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const MIN_TARGETS = 4;
const MAX_TARGETS = 7;
const HESITATION_THRESHOLD_MS = 1200;
const BOT_STEP_INTERVAL_MS = 180;
const MOUSE_SAMPLE_INTERVAL_MS = 8;
const INITIAL_SEED = 42;
const FEATURE_ORDER = [
    "time_ms",
    "click_count",
    "unique_tiles_clicked",
    "verify_attempts",
    "mistakes",
    "avg_click_delta_ms",
    "std_click_delta_ms",
    "hesitations",
    "blur_count",
    "reset_count",
    "path_len_px",
    "avg_speed",
    "speed_std",
    "avg_acceleration",
    "acc_std",
    "curvature",
    "direction_changes",
    "click_precision_px",
    "path_straightness",
    "movement_efficiency",
    "micro_corrections",
    "velocity_consistency",
    "pause_before_click_ms",
    "angular_velocity_std"
];
const WEIGHTS = [
    0.3,
    -15,
    60,
    -400,
    -80,
    0.8,
    2,
    200,
    -500,
    -250,
    0.05,
    0,
    0.5,
    0,
    0,
    0,
    12,
    -40,
    -5,
    4,
    40,
    -5,
    1.5,
    0
];
const BIAS = -1500;
const THRESHOLD = 0;
const ZERO_FEATURES = Object.fromEntries(FEATURE_ORDER.map((k)=>[
        k,
        0
    ]));
const FEATURE_CLAMPS = {
    time_ms: [
        0,
        60000
    ],
    click_count: [
        0,
        500
    ],
    unique_tiles_clicked: [
        0,
        16
    ],
    verify_attempts: [
        0,
        50
    ],
    mistakes: [
        0,
        500
    ],
    avg_click_delta_ms: [
        0,
        10000
    ],
    std_click_delta_ms: [
        0,
        10000
    ],
    hesitations: [
        0,
        200
    ],
    blur_count: [
        0,
        100
    ],
    reset_count: [
        0,
        200
    ],
    path_len_px: [
        0,
        100000
    ],
    avg_speed: [
        0,
        50000
    ],
    speed_std: [
        0,
        50000
    ],
    avg_acceleration: [
        0,
        100000
    ],
    acc_std: [
        0,
        100000
    ],
    curvature: [
        0,
        100000
    ],
    direction_changes: [
        0,
        5000
    ],
    click_precision_px: [
        0,
        200
    ],
    path_straightness: [
        0,
        1000
    ],
    movement_efficiency: [
        0,
        1000
    ],
    micro_corrections: [
        0,
        2000
    ],
    velocity_consistency: [
        0,
        1000
    ],
    pause_before_click_ms: [
        0,
        10000
    ],
    angular_velocity_std: [
        0,
        50000
    ]
};
function clampVal(v, min, max) {
    return Math.max(min, Math.min(max, v));
}
function ptDist(a, b) {
    return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}
function angleBetween(a, b, c) {
    const v1x = b.x - a.x;
    const v1y = b.y - a.y;
    const v2x = c.x - b.x;
    const v2y = c.y - b.y;
    return Math.abs(Math.atan2(v1x * v2y - v1y * v2x, v1x * v2x + v1y * v2y));
}
function mean(a) {
    return a.length === 0 ? 0 : a.reduce((s, v)=>s + v, 0) / a.length;
}
function stddev(a) {
    if (a.length < 2) return 0;
    const m = mean(a);
    return Math.sqrt(a.reduce((s, v)=>s + (v - m) ** 2, 0) / a.length);
}
function mulberry32(seed) {
    let s = seed | 0;
    return ()=>{
        s = s + 0x6d2b79f5 | 0;
        let t = Math.imul(s ^ s >>> 15, 1 | s);
        t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
}
function generatePuzzle(seed) {
    const rng = mulberry32(seed);
    const target = PATTERN_TYPES[Math.floor(rng() * PATTERN_TYPES.length)];
    const targetCount = MIN_TARGETS + Math.floor(rng() * (MAX_TARGETS - MIN_TARGETS + 1));
    const indices = Array.from({
        length: TILE_COUNT
    }, (_, i)=>i);
    for(let i = indices.length - 1; i > 0; i--){
        const j = Math.floor(rng() * (i + 1));
        [indices[i], indices[j]] = [
            indices[j],
            indices[i]
        ];
    }
    const targetIndices = new Set(indices.slice(0, targetCount));
    const distractors = PATTERN_TYPES.filter((p)=>p !== target);
    const tiles = [];
    for(let i = 0; i < TILE_COUNT; i++){
        tiles.push(targetIndices.has(i) ? target : distractors[Math.floor(rng() * distractors.length)]);
    }
    return {
        seed,
        id: `pzl_${seed.toString(16).padStart(8, "0")}`,
        target,
        tiles,
        targetIndices
    };
}
function computeFeatures(clickTs, uniqueTiles, verifyAttempts, mistakes, blurCount, resetCount, startTime, endTime, mousePath, clickPos, pausesBefore) {
    const t0 = startTime ?? 0;
    const timeMs = Math.round(Math.max(0, (endTime ?? t0) - t0));
    const deltas = [];
    for(let i = 1; i < clickTs.length; i++)deltas.push(Math.max(0, clickTs[i] - clickTs[i - 1]));
    const avgDelta = mean(deltas);
    const stdDelta = stddev(deltas);
    const hesitations = deltas.filter((d)=>d > HESITATION_THRESHOLD_MS).length;
    let pathLen = 0;
    const speeds = [];
    const accelerations = [];
    const angles = [];
    let dirChanges = 0;
    let microCorr = 0;
    for(let i = 1; i < mousePath.length; i++){
        const d = ptDist(mousePath[i - 1], mousePath[i]);
        pathLen += d;
        speeds.push(d / Math.max(1, mousePath[i].t - mousePath[i - 1].t) * 1000);
    }
    for(let i = 1; i < speeds.length; i++){
        const dt = Math.max(1, (mousePath[i + 1]?.t ?? mousePath[i].t) - mousePath[i].t || 1);
        accelerations.push(Math.abs(speeds[i] - speeds[i - 1]) / dt * 1000);
    }
    for(let i = 1; i < mousePath.length - 1; i++){
        const ang = angleBetween(mousePath[i - 1], mousePath[i], mousePath[i + 1]);
        angles.push(ang);
        if (ang > Math.PI / 6) dirChanges++;
        if (ang > Math.PI / 4 && ptDist(mousePath[i - 1], mousePath[i]) < 15) microCorr++;
    }
    const angVels = [];
    for(let i = 0; i < angles.length; i++){
        angVels.push(angles[i] / Math.max(1, mousePath[i + 1].t - mousePath[i].t) * 1000);
    }
    let clickPrec = 0;
    if (clickPos.length > 0) {
        clickPrec = mean(clickPos.map((c)=>Math.sqrt((c.x - c.tileCenterX) ** 2 + (c.y - c.tileCenterY) ** 2)));
    }
    let pathStr = 0;
    let moveEff = 500;
    if (clickTs.length >= 2 && mousePath.length >= 2) {
        const ratios = [];
        for(let c = 1; c < clickTs.length; c++){
            const seg = mousePath.filter((s)=>s.t >= clickTs[c - 1] - 50 && s.t <= clickTs[c] + 50);
            if (seg.length >= 2) {
                let segLen = 0;
                for(let j = 1; j < seg.length; j++)segLen += ptDist(seg[j - 1], seg[j]);
                const direct = ptDist(seg[0], seg[seg.length - 1]);
                if (segLen > 0) ratios.push(direct / segLen);
            }
        }
        if (ratios.length > 0) {
            pathStr = Math.round(mean(ratios) * 1000);
            moveEff = Math.round((1 - mean(ratios)) * 1000);
        }
    } else if (mousePath.length >= 2) {
        const dd = ptDist(mousePath[0], mousePath[mousePath.length - 1]);
        if (pathLen > 0) {
            pathStr = Math.round(dd / pathLen * 1000);
            moveEff = Math.round((1 - dd / pathLen) * 1000);
        }
    }
    const velCon = speeds.length > 1 ? Math.round((1 - Math.min(1, stddev(speeds) / (mean(speeds) || 1))) * 1000) : 500;
    const cl = (n, v)=>Math.round(clampVal(v, ...FEATURE_CLAMPS[n]));
    return {
        time_ms: cl("time_ms", timeMs),
        click_count: cl("click_count", clickTs.length),
        unique_tiles_clicked: cl("unique_tiles_clicked", uniqueTiles.size),
        verify_attempts: cl("verify_attempts", verifyAttempts),
        mistakes: cl("mistakes", mistakes),
        avg_click_delta_ms: cl("avg_click_delta_ms", avgDelta),
        std_click_delta_ms: cl("std_click_delta_ms", stdDelta),
        hesitations: cl("hesitations", hesitations),
        blur_count: cl("blur_count", blurCount),
        reset_count: cl("reset_count", resetCount),
        path_len_px: cl("path_len_px", pathLen),
        avg_speed: cl("avg_speed", mean(speeds)),
        speed_std: cl("speed_std", stddev(speeds)),
        avg_acceleration: cl("avg_acceleration", mean(accelerations)),
        acc_std: cl("acc_std", stddev(accelerations)),
        curvature: cl("curvature", angles.reduce((a, b)=>a + b, 0) * 100),
        direction_changes: cl("direction_changes", dirChanges),
        click_precision_px: cl("click_precision_px", clickPrec),
        path_straightness: cl("path_straightness", pathStr),
        movement_efficiency: cl("movement_efficiency", moveEff),
        micro_corrections: cl("micro_corrections", microCorr),
        velocity_consistency: cl("velocity_consistency", velCon),
        pause_before_click_ms: cl("pause_before_click_ms", mean(pausesBefore)),
        angular_velocity_std: cl("angular_velocity_std", stddev(angVels) * 100)
    };
}
function runModel(features) {
    const score = FEATURE_ORDER.reduce((acc, name, i)=>acc + WEIGHTS[i] * features[name], BIAS);
    return {
        score: Math.round(score),
        label: score >= THRESHOLD ? "HUMAN" : "BOT"
    };
}
function generateBotPath(sx, sy, ex, ey, dur) {
    const steps = Math.max(12, Math.round(dur / MOUSE_SAMPLE_INTERVAL_MS));
    const path = [];
    for(let i = 0; i <= steps; i++){
        const t = i / steps;
        path.push({
            x: sx + (ex - sx) * t + (Math.random() - 0.5) * 0.15,
            y: sy + (ey - sy) * t + (Math.random() - 0.5) * 0.15,
            t: i * MOUSE_SAMPLE_INTERVAL_MS
        });
    }
    return path;
}
function toExportJson(score) {
    return {
        score
    };
}
}),
"[project]/packages/web/components/faucet/CaptchaModal.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CaptchaModal",
    ()=>CaptchaModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$PatternIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/faucet/PatternIcon.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$hooks$2f$useReducedMotionPref$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/hooks/useReducedMotionPref.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$captchaModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/lib/captchaModel.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function CaptchaModal({ isOpen, onClose, onVerifiedHuman }) {
    const reducedMotion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$hooks$2f$useReducedMotionPref$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useReducedMotionPref"])();
    const [puzzle, setPuzzle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$captchaModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generatePuzzle"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$captchaModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_SEED"]));
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [simulateBot, setSimulateBot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [features, setFeatures] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$captchaModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ZERO_FEATURES"]);
    const [modelScore, setModelScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [modelLabel, setModelLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("BOT");
    const [solved, setSolved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [verified, setVerified] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [incorrectTiles, setIncorrectTiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [missedTiles, setMissedTiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Set());
    const [verifyLoading, setVerifyLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [botCursorPos, setBotCursorPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [botCursorVisible, setBotCursorVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const clickTsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const uniqueTilesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    const verifyAttRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const mistakesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const blurCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const resetCountRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(0);
    const startTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const activeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const botTimersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const botRafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const mousePathRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const clickPosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const pausesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    const lastMoveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const gridRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dialogRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const tileClickRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(()=>{});
    const verifyRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(()=>{});
    const clearBotTimers = ()=>{
        botTimersRef.current.forEach(clearTimeout);
        botTimersRef.current = [];
        botRafRef.current.forEach(cancelAnimationFrame);
        botRafRef.current = [];
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>()=>clearBotTimers(), []);
    const resetTelemetry = ()=>{
        clickTsRef.current = [];
        uniqueTilesRef.current = new Set();
        verifyAttRef.current = 0;
        mistakesRef.current = 0;
        startTimeRef.current = null;
        activeRef.current = false;
        mousePathRef.current = [];
        clickPosRef.current = [];
        pausesRef.current = [];
        lastMoveRef.current = null;
    };
    const refreshFeatures = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((endTime)=>{
        const f = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$captchaModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["computeFeatures"])(clickTsRef.current, uniqueTilesRef.current, verifyAttRef.current, mistakesRef.current, blurCountRef.current, resetCountRef.current, startTimeRef.current, endTime, mousePathRef.current, clickPosRef.current, pausesRef.current);
        const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$captchaModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["runModel"])(f);
        setFeatures(f);
        setModelScore(m.score);
        setModelLabel(m.label);
        return {
            features: f,
            model: m
        };
    }, []);
    const newPuzzle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        clearBotTimers();
        setBotCursorVisible(false);
        setBotCursorPos(null);
        const seed = Date.now();
        setPuzzle((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$captchaModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generatePuzzle"])(seed));
        setSelected(new Set());
        setSolved(false);
        setVerified(false);
        setVerifyLoading(false);
        setIncorrectTiles(new Set());
        setMissedTiles(new Set());
        resetCountRef.current += 1;
        resetTelemetry();
        refreshFeatures(null);
    }, [
        refreshFeatures
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onBlur = ()=>{
            if (activeRef.current) blurCountRef.current += 1;
        };
        window.addEventListener("blur", onBlur);
        window.addEventListener("focus", onBlur);
        return ()=>{
            window.removeEventListener("blur", onBlur);
            window.removeEventListener("focus", onBlur);
        };
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) return;
        newPuzzle();
        const t = setTimeout(()=>dialogRef.current?.focus(), 40);
        return ()=>clearTimeout(t);
    }, [
        isOpen,
        newPuzzle
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) return;
        const onKey = (e)=>{
            if (e.key === "Escape" && !simulateBot) onClose();
            if (e.key !== "Tab") return;
            const root = dialogRef.current;
            if (!root) return;
            const focusables = Array.from(root.querySelectorAll("button,input,[tabindex]:not([tabindex='-1'])")).filter((el)=>!el.hasAttribute("disabled"));
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            } else if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        };
        window.addEventListener("keydown", onKey);
        return ()=>window.removeEventListener("keydown", onKey);
    }, [
        isOpen,
        onClose,
        simulateBot
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isOpen) return;
        const grid = gridRef.current;
        if (!grid || simulateBot) return;
        const onMove = (e)=>{
            if (!activeRef.current && startTimeRef.current === null) return;
            const now = performance.now();
            const r = grid.getBoundingClientRect();
            mousePathRef.current.push({
                x: e.clientX - r.left,
                y: e.clientY - r.top,
                t: now
            });
            lastMoveRef.current = now;
        };
        grid.addEventListener("mousemove", onMove);
        return ()=>grid.removeEventListener("mousemove", onMove);
    }, [
        simulateBot,
        isOpen
    ]);
    const getTileCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((idx)=>{
        const grid = gridRef.current;
        if (!grid) return null;
        const tile = grid.children[idx];
        if (!tile) return null;
        const gr = grid.getBoundingClientRect();
        const tr = tile.getBoundingClientRect();
        return {
            x: tr.left - gr.left + tr.width / 2,
            y: tr.top - gr.top + tr.height / 2
        };
    }, []);
    const handleTileClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((index, cx, cy)=>{
        if (solved && verified) return;
        if (incorrectTiles.size > 0 || missedTiles.size > 0) {
            setIncorrectTiles(new Set());
            setMissedTiles(new Set());
        }
        const now = performance.now();
        if (startTimeRef.current === null) {
            startTimeRef.current = now;
            activeRef.current = true;
        }
        clickTsRef.current.push(now);
        uniqueTilesRef.current.add(index);
        if (lastMoveRef.current !== null) pausesRef.current.push(now - lastMoveRef.current);
        const center = getTileCenter(index);
        if (center && cx !== undefined && cy !== undefined) {
            clickPosRef.current.push({
                x: cx,
                y: cy,
                tileCenterX: center.x,
                tileCenterY: center.y
            });
        } else if (center) {
            const off = 5 + Math.random() * 15;
            const ang = Math.random() * Math.PI * 2;
            clickPosRef.current.push({
                x: center.x + Math.cos(ang) * off,
                y: center.y + Math.sin(ang) * off,
                tileCenterX: center.x,
                tileCenterY: center.y
            });
        }
        setSelected((prev)=>{
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
        });
        refreshFeatures(now);
    }, [
        solved,
        verified,
        incorrectTiles,
        missedTiles,
        getTileCenter,
        refreshFeatures
    ]);
    const handleHumanTileClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((idx, e)=>{
        const grid = gridRef.current;
        if (!grid) return handleTileClick(idx);
        const r = grid.getBoundingClientRect();
        handleTileClick(idx, e.clientX - r.left, e.clientY - r.top);
    }, [
        handleTileClick
    ]);
    const handleVerify = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (solved && verified) return;
        setVerifyLoading(true);
        const timer = setTimeout(()=>{
            const now = performance.now();
            verifyAttRef.current += 1;
            const fp = new Set([
                ...selected
            ].filter((i)=>!puzzle.targetIndices.has(i)));
            const fn = new Set([
                ...puzzle.targetIndices
            ].filter((i)=>!selected.has(i)));
            mistakesRef.current += fp.size + fn.size;
            const correct = fp.size === 0 && fn.size === 0;
            if (!correct && !simulateBot) {
                setIncorrectTiles(fp);
                setMissedTiles(fn);
                refreshFeatures(now);
                setVerifyLoading(false);
                return;
            }
            setIncorrectTiles(new Set());
            setMissedTiles(new Set());
            setSolved(true);
            setVerified(true);
            const { features: f, model } = refreshFeatures(now);
            if (simulateBot) {
                setModelLabel("BOT");
            } else {
                setModelLabel("HUMAN");
                onVerifiedHuman((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$captchaModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toExportJson"])(model.score), model.score);
            }
            setFeatures(f);
            setModelScore(model.score);
            setVerifyLoading(false);
        }, 450);
        botTimersRef.current.push(timer);
    }, [
        solved,
        verified,
        selected,
        puzzle,
        simulateBot,
        onVerifiedHuman,
        refreshFeatures
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        tileClickRef.current = handleTileClick;
        verifyRef.current = handleVerify;
    }, [
        handleTileClick,
        handleVerify
    ]);
    const startBotSim = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        clearBotTimers();
        const seed = Date.now();
        const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$captchaModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generatePuzzle"])(seed);
        setPuzzle(p);
        setSelected(new Set());
        setSolved(false);
        setVerified(false);
        resetTelemetry();
        resetCountRef.current = 0;
        refreshFeatures(null);
        const targets = [
            ...p.targetIndices
        ];
        const schedule = setTimeout(()=>{
            setBotCursorVisible(true);
            const g = gridRef.current;
            if (!g) return;
            const gr = g.getBoundingClientRect();
            const center = (idx)=>{
                const el = g.children[idx];
                if (!el) return {
                    x: gr.width / 2,
                    y: gr.height / 2
                };
                const r = el.getBoundingClientRect();
                return {
                    x: r.left - gr.left + r.width / 2,
                    y: r.top - gr.top + r.height / 2
                };
            };
            let cx = gr.width / 2;
            let cy = -20;
            let totalDelay = 0;
            startTimeRef.current = performance.now();
            activeRef.current = true;
            targets.forEach((tileIdx)=>{
                const moveDuration = 220 + Math.random() * 60;
                const pauseBefore = 30 + Math.random() * 30;
                const stepStart = totalDelay;
                const fromX = cx;
                const fromY = cy;
                const tm = setTimeout(()=>{
                    const tgt = center(tileIdx);
                    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$captchaModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateBotPath"])(fromX, fromY, tgt.x, tgt.y, moveDuration);
                    const animStart = performance.now();
                    path.forEach((s)=>mousePathRef.current.push({
                            x: s.x,
                            y: s.y,
                            t: animStart + s.t
                        }));
                    const totalPathTime = path[path.length - 1].t;
                    const animate = ()=>{
                        const elapsed = performance.now() - animStart;
                        if (elapsed >= totalPathTime) {
                            setBotCursorPos({
                                x: path[path.length - 1].x,
                                y: path[path.length - 1].y
                            });
                            return;
                        }
                        const frac = elapsed / totalPathTime;
                        const idx = Math.min(Math.floor(frac * path.length), path.length - 1);
                        setBotCursorPos({
                            x: path[idx].x,
                            y: path[idx].y
                        });
                        botRafRef.current.push(requestAnimationFrame(animate));
                    };
                    botRafRef.current.push(requestAnimationFrame(animate));
                    const clickTm = setTimeout(()=>{
                        const c = center(tileIdx);
                        const clx = c.x + (Math.random() - 0.5) * 1.5;
                        const cly = c.y + (Math.random() - 0.5) * 1.5;
                        setBotCursorPos({
                            x: clx,
                            y: cly
                        });
                        lastMoveRef.current = performance.now() - pauseBefore;
                        tileClickRef.current(tileIdx, clx, cly);
                    }, moveDuration + pauseBefore);
                    botTimersRef.current.push(clickTm);
                }, 300 + stepStart);
                botTimersRef.current.push(tm);
                const tgt = center(tileIdx);
                cx = tgt.x;
                cy = tgt.y;
                totalDelay += moveDuration + pauseBefore + __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$captchaModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BOT_STEP_INTERVAL_MS"];
            });
            const verifyTm = setTimeout(()=>{
                setBotCursorVisible(false);
                verifyRef.current();
            }, 300 + totalDelay + 220);
            botTimersRef.current.push(verifyTm);
        }, 120);
        botTimersRef.current.push(schedule);
    }, [
        refreshFeatures
    ]);
    const handleBotToggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((next)=>{
        setSimulateBot(next);
        if (next) startBotSim();
        else {
            clearBotTimers();
            setBotCursorVisible(false);
            setBotCursorPos(null);
            newPuzzle();
        }
    }, [
        newPuzzle,
        startBotSim
    ]);
    const modalTone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (incorrectTiles.size > 0 || missedTiles.size > 0) return "bg-red-500/80";
        if (verified && solved) return modelLabel === "HUMAN" ? "bg-emerald-500/80" : "bg-red-500/80";
        return "bg-purple-600/65";
    }, [
        incorrectTiles,
        missedTiles,
        verified,
        solved,
        modelLabel
    ]);
    if (!isOpen) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `fixed inset-0 z-50 flex items-center justify-center bg-black/62 ${reducedMotion ? "" : "animate-[fadeIn_0.3s_ease-out]"}`,
        onClick: (e)=>{
            if (e.target === e.currentTarget && !simulateBot) onClose();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: dialogRef,
            role: "dialog",
            "aria-modal": "true",
            tabIndex: -1,
            className: `relative mx-4 w-[92vw] max-w-[420px] overflow-hidden rounded-2xl border border-white/12 bg-[#1e1033] shadow-2xl outline-none ${reducedMotion ? "" : "animate-[zoomIn_0.3s_ease-out]"}`,
            children: [
                !simulateBot && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onClose,
                    className: "absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "h-4 w-4",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        strokeWidth: 2.5,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M6 18L18 6M6 6l12 12"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                            lineNumber: 414,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                        lineNumber: 413,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                    lineNumber: 408,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `px-5 pb-4 pt-5 transition-colors duration-300 ${modalTone}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70",
                            children: "Step 1: Prove humanity"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                            lineNumber: 420,
                            columnNumber: 11
                        }, this),
                        incorrectTiles.size > 0 || missedTiles.size > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-white",
                                    children: "Try Again"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                    lineNumber: 425,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-[13px] text-white/80",
                                    children: "Adjust your selection and verify again."
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                    lineNumber: 426,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : verified && solved ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-xl font-bold text-white",
                                    children: modelLabel === "HUMAN" ? "Access Granted" : "Classified as Bot"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                    lineNumber: 430,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-[13px] text-white/80",
                                    children: modelLabel === "HUMAN" ? `Behavioral score ${modelScore} accepted.` : "Behavior did not meet the human threshold."
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                    lineNumber: 433,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[13px] text-white/65",
                                    children: "Select all squares with"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                    lineNumber: 441,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mt-0.5 text-2xl font-bold capitalize text-white",
                                    children: [
                                        puzzle.target,
                                        "s"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                    lineNumber: 442,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-[13px] text-white/55",
                                    children: "If there are none, click skip"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                    lineNumber: 443,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                    lineNumber: 419,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative max-h-[54vh] overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: gridRef,
                            className: "grid grid-cols-4 gap-[2px] bg-white/6 p-[2px]",
                            children: puzzle.tiles.map((pattern, i)=>{
                                const isSel = selected.has(i);
                                const isWrong = incorrectTiles.has(i);
                                const isMissed = missedTiles.has(i);
                                const hasErr = isWrong || isMissed;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: simulateBot,
                                    onClick: (e)=>handleHumanTileClick(i, e),
                                    className: `relative flex aspect-square min-h-11 items-center justify-center transition-all duration-150 ${hasErr ? "bg-red-500/20 ring-2 ring-inset ring-red-400" : isSel ? "scale-[0.92] bg-purple-500/20 ring-[3px] ring-inset ring-purple-400" : "bg-white/6 hover:bg-white/14"} ${simulateBot ? "cursor-not-allowed" : "cursor-pointer active:scale-95"}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-full w-full items-center justify-center p-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$PatternIcon$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PatternIcon"], {
                                                type: pattern
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                                lineNumber: 470,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                            lineNumber: 469,
                                            columnNumber: 19
                                        }, this),
                                        isSel && !hasErr && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 shadow",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "h-3 w-3 text-white",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                strokeWidth: 3.5,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    d: "M5 13l4 4L19 7"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                                lineNumber: 474,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                            lineNumber: 473,
                                            columnNumber: 21
                                        }, this),
                                        isWrong && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 shadow",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "h-3 w-3 text-white",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                strokeWidth: 3.5,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    d: "M6 18L18 6M6 6l12 12"
                                                }, void 0, false, {
                                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                                    lineNumber: 482,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                                lineNumber: 481,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                            lineNumber: 480,
                                            columnNumber: 21
                                        }, this),
                                        isMissed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500/80 shadow",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[9px] font-bold text-white",
                                                children: "!"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                                lineNumber: 488,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                            lineNumber: 487,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, i, true, {
                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                    lineNumber: 456,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                            lineNumber: 449,
                            columnNumber: 11
                        }, this),
                        botCursorVisible && botCursorPos && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pointer-events-none absolute z-50",
                            style: {
                                left: botCursorPos.x - 4,
                                top: botCursorPos.y - 4,
                                transition: "left 0.016s linear, top 0.016s linear"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    width: "24",
                                    height: "24",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        d: "M3 3L10.5 21L13 13L21 10.5L3 3Z",
                                        fill: "#ef4444",
                                        stroke: "#991b1b",
                                        strokeWidth: "1.5",
                                        strokeLinejoin: "round"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                        lineNumber: 506,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                    lineNumber: 505,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "absolute -right-8 -top-1 rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow",
                                    children: "BOT"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                    lineNumber: 508,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                            lineNumber: 497,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                    lineNumber: 448,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-t border-white/12 bg-white/5 px-3 py-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: newPuzzle,
                                    className: "flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white/80",
                                    title: "New challenge",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "h-4 w-4",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        strokeWidth: 2,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                            lineNumber: 524,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                        lineNumber: 523,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                    lineNumber: 517,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "flex cursor-pointer items-center gap-1.5 text-[11px] font-medium text-white/65",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "checkbox",
                                            className: "h-3.5 w-3.5 rounded accent-purple-500",
                                            checked: simulateBot,
                                            onChange: (e)=>handleBotToggle(e.target.checked)
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                            lineNumber: 528,
                                            columnNumber: 15
                                        }, this),
                                        "Bot"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                                    lineNumber: 527,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                            lineNumber: 516,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleVerify,
                            disabled: simulateBot || verifyLoading,
                            className: "btn-primary min-h-10 rounded-lg px-5 py-1.5 text-sm font-semibold",
                            children: verifyLoading ? "Verifying..." : "Verify Access"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                            lineNumber: 537,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
                    lineNumber: 515,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
            lineNumber: 398,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/packages/web/components/faucet/CaptchaModal.tsx",
        lineNumber: 390,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/web/components/faucet/Logo.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Logo",
    ()=>Logo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
function Logo({ size = "text-3xl" }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `${size} font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-fuchsia-200`,
        children: "ProofofHuman"
    }, void 0, false, {
        fileName: "[project]/packages/web/components/faucet/Logo.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/web/components/faucet/FaucetCard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FaucetCard",
    ()=>FaucetCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$Logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/faucet/Logo.tsx [app-ssr] (ecmascript)");
;
;
function FaucetCard({ verificationState, walletAddress, onWalletAddressChange, onOpenCaptcha, onCopyJson, onRequestTokens, exportedJson, copied, requestLoading, isWalletValid, latestScore }) {
    const humanVerified = verificationState === "verified" || verificationState === "requested";
    const canRequest = humanVerified && walletAddress.trim().length > 0 && isWalletValid && !requestLoading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card-strong relative z-10 mx-4 flex w-[92vw] max-w-[620px] flex-col items-center px-7 py-9 sm:px-10 sm:py-11",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$Logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Logo"], {
                size: "text-display"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-body text-[var(--text-muted)]",
                children: "Faucet"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 w-full space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "mb-2 block text-xs font-medium uppercase tracking-wide text-white/60",
                                children: "Wallet Address"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                lineNumber: 43,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: walletAddress,
                                onChange: (e)=>onWalletAddressChange(e.target.value),
                                placeholder: "Enter your wallet address",
                                disabled: !humanVerified,
                                className: `glass-input min-h-11 w-full px-4 py-3 text-[15px] text-[var(--text-primary)] placeholder-white/40 ${!humanVerified ? "cursor-not-allowed opacity-65" : ""} ${humanVerified && walletAddress.length > 0 && !isWalletValid ? "border-[var(--error)]/60" : ""}`
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                lineNumber: 46,
                                columnNumber: 11
                            }, this),
                            humanVerified && walletAddress.length > 0 && !isWalletValid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-[var(--error)]",
                                children: "Enter a valid EVM wallet address (`0x` + 40 hex characters)."
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            !humanVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-[var(--text-muted)]",
                                children: exportedJson ? "ZK proof failed. Try verifying again." : "One-time verification to unlock faucet access."
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                lineNumber: 66,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stack-at-xs flex items-center gap-3",
                        children: [
                            humanVerified ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex min-h-11 flex-1 items-center gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-500/12 px-4 py-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "h-5 w-5 text-[var(--success)]",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        strokeWidth: 2.5,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            d: "M5 13l4 4L19 7"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                            lineNumber: 76,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                        lineNumber: 75,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold text-emerald-200",
                                                children: "Access Granted"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                                lineNumber: 79,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-emerald-100/70",
                                                children: "Verification complete"
                                            }, void 0, false, {
                                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                                lineNumber: 80,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                        lineNumber: 78,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onOpenCaptcha,
                                className: `btn-secondary min-h-11 flex flex-1 items-center gap-3 px-4 py-3 text-sm ${verificationState === "verifying" ? "animate-pulse border-purple-300/50 bg-purple-300/10" : ""}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "relative flex h-5 w-5 items-center justify-center rounded border border-white/30",
                                        children: verificationState === "verifying" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "absolute inline-flex h-5 w-5 animate-ping rounded border border-purple-200/60"
                                        }, void 0, false, {
                                            fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                            lineNumber: 93,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    verificationState === "verifying" ? "Verifying..." : "Verify Access"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            exportedJson && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onCopyJson,
                                className: "btn-secondary min-h-11 rounded-xl px-3 text-xs font-medium text-white/80",
                                title: "Copy behavioral JSON",
                                children: copied ? "Copied" : "Copy JSON"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                lineNumber: 101,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    verificationState === "requested" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-emerald-400/25 bg-emerald-500/12 px-4 py-4 text-center shadow-[0_0_36px_rgba(50,209,149,0.22)] animate-pulse",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-emerald-200",
                                children: "✓ Tokens Sent"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1 text-xs text-emerald-100/75",
                                children: "Your request is queued and processing."
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                        lineNumber: 113,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onRequestTokens,
                        disabled: !canRequest,
                        className: "btn-primary min-h-11 w-full px-6 py-3 text-[15px] font-semibold hover:scale-[1.01]",
                        children: requestLoading ? "Requesting..." : "Request Testnet Tokens"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-medium uppercase tracking-wide text-white/55",
                                children: "Why this check?"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                lineNumber: 131,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-[var(--text-muted)]",
                                children: "Social tasks are easy to game. We use interaction behavior to estimate human intent instead."
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center text-xs text-[var(--text-muted)]",
                        children: "Privacy: interaction data never leaves your device."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                        lineNumber: 137,
                        columnNumber: 9
                    }, this),
                    exportedJson && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        className: "rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                className: "cursor-pointer font-medium text-white/80",
                                children: "Developer Details"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                lineNumber: 143,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 space-y-2",
                                children: [
                                    latestScore !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-white/70",
                                        children: [
                                            "Score: ",
                                            latestScore
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                        lineNumber: 145,
                                        columnNumber: 40
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                        className: "max-h-36 overflow-auto rounded-lg bg-black/20 p-2 text-[11px] text-white/75",
                                        children: JSON.stringify(exportedJson, null, 2)
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                        lineNumber: 146,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                        lineNumber: 142,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/faucet/FaucetCard.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
}),
"[project]/packages/web/components/faucet/LandingHero.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingHero",
    ()=>LandingHero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$Logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/faucet/Logo.tsx [app-ssr] (ecmascript)");
;
;
function LandingHero({ onContinue, animate }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `glass-card-strong relative z-10 mx-4 flex w-[92vw] max-w-[580px] flex-col items-center px-7 py-10 sm:px-10 sm:py-12 ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} transition-all duration-500`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$Logo$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Logo"], {
                size: "text-display"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/faucet/LandingHero.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-body text-[var(--text-muted)]",
                children: "Faucet"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/faucet/LandingHero.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-10 w-full",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: onContinue,
                    className: "btn-primary min-h-11 flex w-full items-center justify-center gap-3 px-6 py-3.5 text-[15px] font-semibold hover:scale-[1.01]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "h-5 w-5 text-purple-100",
                            fill: "none",
                            viewBox: "0 0 24 24",
                            stroke: "currentColor",
                            strokeWidth: 2,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/faucet/LandingHero.tsx",
                                lineNumber: 25,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/components/faucet/LandingHero.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this),
                        "Request Testnet Tokens"
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/components/faucet/LandingHero.tsx",
                    lineNumber: 19,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/components/faucet/LandingHero.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/faucet/LandingHero.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, this);
}
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/vm [external] (vm, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("vm", () => require("vm"));

module.exports = mod;
}),
"[externals]/worker_threads [external] (worker_threads, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("worker_threads", () => require("worker_threads"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/constants [external] (constants, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("constants", () => require("constants"));

module.exports = mod;
}),
"[externals]/readline [external] (readline, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("readline", () => require("readline"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/packages/web/lib/zk/prove.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateProof",
    ()=>generateProof,
    "submitProofForValidation",
    ()=>submitProofForValidation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$snarkjs$2f$main$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/snarkjs/main.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$snarkjs$2f$src$2f$groth16$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__groth16$3e$__ = __turbopack_context__.i("[project]/node_modules/snarkjs/src/groth16.js [app-ssr] (ecmascript) <export * as groth16>");
;
const WASM_URL = "/zk/captcha.wasm";
const ZKEY_URL = "/zk/captcha_final.zkey";
const SCORE_MIN = -6000;
const SCORE_MAX = 6000;
async function generateProof(inputScore) {
    if (typeof inputScore !== "number" || Number.isNaN(inputScore)) {
        return {
            success: false,
            message: "Invalid input: score must be a number."
        };
    }
    const raw = Math.round(inputScore);
    const score = Math.max(SCORE_MIN, Math.min(SCORE_MAX, raw));
    try {
        const { proof, publicSignals } = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$snarkjs$2f$src$2f$groth16$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__groth16$3e$__["groth16"].fullProve({
            score
        }, WASM_URL, ZKEY_URL);
        return {
            success: true,
            proof,
            publicSignals
        };
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return {
            success: false,
            message: `ZK proof generation failed: ${msg}`
        };
    }
}
async function submitProofForValidation(proof, publicSignals) {
    try {
        const res = await fetch("/api/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                proof,
                publicSignals
            })
        });
        const data = await res.json();
        if (!res.ok) {
            return {
                ok: false,
                verified: false,
                error: data.error ?? "Validation request failed"
            };
        }
        return {
            ok: true,
            verified: !!data.verified
        };
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return {
            ok: false,
            verified: false,
            error: msg
        };
    }
}
}),
"[project]/packages/web/app/faucet/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FaucetPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/address/checks.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$BackgroundScene$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/faucet/BackgroundScene.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$CaptchaModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/faucet/CaptchaModal.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$FaucetCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/faucet/FaucetCard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$LandingHero$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/faucet/LandingHero.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$zk$2f$prove$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/lib/zk/prove.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function FaucetPage() {
    const [showFaucet, setShowFaucet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [captchaOpen, setCaptchaOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [verificationState, setVerificationState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("unverified");
    const [walletAddress, setWalletAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [exportedJson, setExportedJson] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [latestScore, setLatestScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [requestLoading, setRequestLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const isWalletValid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(walletAddress.trim()), [
        walletAddress
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!toast) return;
        const timer = setTimeout(()=>setToast(null), 2600);
        return ()=>clearTimeout(timer);
    }, [
        toast
    ]);
    const handleVerifiedHuman = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (payload, score)=>{
        setExportedJson(payload);
        setLatestScore(score);
        setCaptchaOpen(false);
        setVerificationState("verifying");
        setToast({
            type: "info",
            message: "Human verification passed. Validating ZK proof..."
        });
        const rounded = Math.round(score);
        const pipelineLogs = [
            "Step 1: Received score payload from captcha.",
            `Step 2: Score normalized to integer (${rounded}).`,
            "Step 3: Generating ZK proof in browser (snarkjs + WASM)..."
        ];
        try {
            const proofResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$zk$2f$prove$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateProof"])(score);
            if (!proofResult.success) {
                pipelineLogs.push(`Step 4: Proof generation failed: ${proofResult.message}`);
                console.group("ZK Pipeline Logs");
                pipelineLogs.forEach((line)=>console.log(line));
                console.groupEnd();
                setVerificationState("unverified");
                setToast({
                    type: "info",
                    message: `ZK proof failed: ${proofResult.message}`
                });
                return;
            }
            pipelineLogs.push("Step 4: Proof generated successfully.");
            pipelineLogs.push("Step 5: Submitting proof for validation...");
            const { ok, verified } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$zk$2f$prove$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["submitProofForValidation"])(proofResult.proof, proofResult.publicSignals);
            if (!ok) {
                pipelineLogs.push("Step 6: Validation request failed.");
                console.group("ZK Pipeline Logs");
                pipelineLogs.forEach((line)=>console.log(line));
                console.groupEnd();
                setVerificationState("unverified");
                setToast({
                    type: "info",
                    message: "Validation request failed"
                });
                return;
            }
            pipelineLogs.push(`Step 6: Verification result: ${verified ? "true" : "false"}.`);
            console.group("ZK Pipeline Logs");
            pipelineLogs.forEach((line)=>console.log(line));
            console.log("Proof:", proofResult.proof);
            console.log("Public signals:", proofResult.publicSignals);
            console.log("Result:", {
                verified,
                proofPath: "client-side (browser)",
                publicSignalsPath: "client-side (browser)"
            });
            console.groupEnd();
            setVerificationState(verified ? "verified" : "unverified");
            setToast(verified ? {
                type: "success",
                message: "ZK proof generated and verified."
            } : {
                type: "info",
                message: "Verification did not pass."
            });
        } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            pipelineLogs.push(`Error: ${msg}`);
            console.group("ZK Pipeline Logs");
            pipelineLogs.forEach((line)=>console.log(line));
            console.error("Verification error:", err);
            console.groupEnd();
            setVerificationState("unverified");
            setToast({
                type: "info",
                message: `ZK pipeline error: ${msg}`
            });
        }
    }, []);
    const handleRequestTokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        const trimmed = walletAddress.trim();
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$checks$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isAddress"])(trimmed) || verificationState !== "verified") return;
        setRequestLoading(true);
        setVerificationState("requested");
        try {
            const mintRes = await fetch("/api/mint", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    to_address: trimmed,
                    verificationPassed: true
                })
            });
            const mintData = await mintRes.json();
            if (!mintRes.ok || !mintData.ok) {
                throw new Error(mintData.error ?? "Mint failed");
            }
            const claimRes = await fetch("/api/claim", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    wallet: trimmed,
                    to: trimmed
                })
            });
            const claimData = await claimRes.json();
            if (!claimRes.ok || !claimData.ok) {
                throw new Error(claimData.error ?? "Claim failed");
            }
        } catch (err) {
            setVerificationState("verified");
            console.error(err);
        } finally{
            setRequestLoading(false);
        }
    }, [
        walletAddress,
        verificationState
    ]);
    const handleCopyJson = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!exportedJson) return;
        navigator.clipboard.writeText(JSON.stringify(exportedJson, null, 2));
        setCopied(true);
        setTimeout(()=>setCopied(false), 2000);
    }, [
        exportedJson
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-faucet": true,
        className: "relative z-10 min-h-[calc(100vh-56px)] flex flex-col items-center justify-center overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$BackgroundScene$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BackgroundScene"], {}, void 0, false, {
                fileName: "[project]/packages/web/app/faucet/page.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 flex min-h-[60vh] flex-col items-center justify-center py-12",
                children: !showFaucet ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$LandingHero$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LandingHero"], {
                    onContinue: ()=>setShowFaucet(true),
                    animate: true
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/faucet/page.tsx",
                    lineNumber: 174,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$FaucetCard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FaucetCard"], {
                    verificationState: verificationState,
                    walletAddress: walletAddress,
                    onWalletAddressChange: setWalletAddress,
                    onOpenCaptcha: ()=>setCaptchaOpen(true),
                    onCopyJson: handleCopyJson,
                    onRequestTokens: handleRequestTokens,
                    exportedJson: exportedJson,
                    copied: copied,
                    requestLoading: requestLoading,
                    isWalletValid: isWalletValid,
                    latestScore: latestScore
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/faucet/page.tsx",
                    lineNumber: 179,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/app/faucet/page.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$faucet$2f$CaptchaModal$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CaptchaModal"], {
                isOpen: captchaOpen,
                onClose: ()=>setCaptchaOpen(false),
                onVerifiedHuman: handleVerifiedHuman
            }, void 0, false, {
                fileName: "[project]/packages/web/app/faucet/page.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/app/faucet/page.tsx",
        lineNumber: 170,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d6f95c83._.js.map