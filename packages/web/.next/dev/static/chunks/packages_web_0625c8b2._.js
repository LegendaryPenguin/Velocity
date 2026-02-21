(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/packages/web/components/builders/AddToProjectSteps.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AddToProjectSteps",
    ()=>AddToProjectSteps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function AddToProjectSteps({ steps, onStepClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card rounded-2xl p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-white/90",
                children: "Add to your project"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/AddToProjectSteps.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "mt-4 space-y-4",
                children: steps.map((s, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200",
                                children: s.num
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/AddToProjectSteps.tsx",
                                lineNumber: 20,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1",
                                children: [
                                    onStepClick ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>onStepClick(index),
                                        className: "text-left font-medium text-white/90 underline-offset-2 hover:underline hover:text-purple-200",
                                        children: s.title
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/AddToProjectSteps.tsx",
                                        lineNumber: 25,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium text-white/90",
                                        children: s.title
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/AddToProjectSteps.tsx",
                                        lineNumber: 33,
                                        columnNumber: 17
                                    }, this),
                                    s.filePath && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "mt-1 block text-xs text-purple-300/90",
                                        children: s.filePath
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/AddToProjectSteps.tsx",
                                        lineNumber: 36,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm text-white/60",
                                        children: s.body
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/AddToProjectSteps.tsx",
                                        lineNumber: 38,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/components/builders/AddToProjectSteps.tsx",
                                lineNumber: 23,
                                columnNumber: 13
                            }, this)
                        ]
                    }, s.num, true, {
                        fileName: "[project]/packages/web/components/builders/AddToProjectSteps.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/AddToProjectSteps.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/builders/AddToProjectSteps.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = AddToProjectSteps;
var _c;
__turbopack_context__.k.register(_c, "AddToProjectSteps");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/components/builders/CodeOutput.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CodeOutput",
    ()=>CodeOutput
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function CodeOutput({ title = "Generated code", code, language = "typescript" }) {
    _s();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CodeOutput.useCallback[copy]": ()=>{
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout({
                "CodeOutput.useCallback[copy]": ()=>setCopied(false)
            }["CodeOutput.useCallback[copy]"], 2000);
        }
    }["CodeOutput.useCallback[copy]"], [
        code
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card rounded-2xl overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between border-b border-white/10 px-4 py-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-medium text-white/70",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/CodeOutput.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: copy,
                        className: "btn-secondary rounded-lg px-3 py-1.5 text-xs font-medium",
                        children: copied ? "Copied" : "Copy"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/CodeOutput.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/builders/CodeOutput.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                className: "overflow-x-auto p-4 text-sm text-emerald-200/90",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                    children: code
                }, void 0, false, {
                    fileName: "[project]/packages/web/components/builders/CodeOutput.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/CodeOutput.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/builders/CodeOutput.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(CodeOutput, "QV91T40Mqz7E8i/OX01RqjOxXu4=");
_c = CodeOutput;
var _c;
__turbopack_context__.k.register(_c, "CodeOutput");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/components/builders/ConceptCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConceptCard",
    ()=>ConceptCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ConceptCard({ title = "What this does", children, learnMore, actionLink }) {
    _s();
    const [expanded, setExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card rounded-2xl p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-white/90",
                children: title
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/ConceptCard.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 text-sm text-white/70 leading-relaxed",
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/ConceptCard.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            actionLink && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: actionLink.href,
                className: "mt-3 inline-block text-sm font-medium text-purple-300 hover:text-purple-200 transition",
                children: [
                    actionLink.label,
                    " →"
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/builders/ConceptCard.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this),
            learnMore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setExpanded((e)=>!e),
                        className: "text-xs font-medium text-purple-300 hover:text-purple-200 transition",
                        children: expanded ? "Hide details" : "Learn more"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/ConceptCard.tsx",
                        lineNumber: 30,
                        columnNumber: 11
                    }, this),
                    expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 text-sm text-white/60",
                        children: learnMore
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/ConceptCard.tsx",
                        lineNumber: 37,
                        columnNumber: 24
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/builders/ConceptCard.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/builders/ConceptCard.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_s(ConceptCard, "DuL5jiiQQFgbn7gBKAyxwS/H4Ek=");
_c = ConceptCard;
var _c;
__turbopack_context__.k.register(_c, "ConceptCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/components/builders/ConfigPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConfigPanel",
    ()=>ConfigPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function ConfigPanel({ title, fields }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card rounded-2xl p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-white/90",
                children: title
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/ConfigPanel.tsx",
                lineNumber: 22,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 space-y-4",
                children: fields.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "block text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-1.5 block font-medium text-white/70",
                                children: f.label
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/ConfigPanel.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this),
                            f.helper && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "mb-1.5 block text-xs text-white/50",
                                children: f.helper
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/ConfigPanel.tsx",
                                lineNumber: 27,
                                columnNumber: 26
                            }, this),
                            f.type === "select" && f.options ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: String(f.value),
                                onChange: (e)=>f.onChange(e.target.value),
                                className: "glass-input w-full px-4 py-2.5 text-white/90 bg-[#1a1428] border border-white/10 focus:border-purple-400/50",
                                style: {
                                    colorScheme: "dark"
                                },
                                children: f.options.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: o.value,
                                        className: "bg-[#1a1428] text-white",
                                        children: o.label
                                    }, o.value, false, {
                                        fileName: "[project]/packages/web/components/builders/ConfigPanel.tsx",
                                        lineNumber: 36,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/ConfigPanel.tsx",
                                lineNumber: 29,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: f.type ?? "text",
                                value: f.value,
                                onChange: (e)=>f.onChange(f.type === "number" ? Number(e.target.value) || 0 : e.target.value),
                                placeholder: f.placeholder,
                                className: "glass-input w-full px-4 py-2.5 text-white/90 placeholder-white/40"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/ConfigPanel.tsx",
                                lineNumber: 42,
                                columnNumber: 15
                            }, this)
                        ]
                    }, f.id, true, {
                        fileName: "[project]/packages/web/components/builders/ConfigPanel.tsx",
                        lineNumber: 25,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/ConfigPanel.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/builders/ConfigPanel.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_c = ConfigPanel;
var _c;
__turbopack_context__.k.register(_c, "ConfigPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/components/builders/FlowDiagram.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FlowDiagram",
    ()=>FlowDiagram
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function FlowDiagram({ nodes, icons, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card rounded-2xl p-5 overflow-x-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-white/90 mb-3",
                children: "Flow"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            nodes && nodes.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center gap-2 text-sm",
                children: nodes.map((node, i)=>{
                    const icon = icons?.[i];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 font-medium text-white/90",
                                children: [
                                    icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base",
                                        "aria-hidden": true,
                                        children: icon
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                                        lineNumber: 23,
                                        columnNumber: 28
                                    }, this),
                                    node
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                                lineNumber: 22,
                                columnNumber: 17
                            }, this),
                            i < nodes.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-purple-400/80",
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                                lineNumber: 27,
                                columnNumber: 19
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                        lineNumber: 21,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                lineNumber: 17,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-white/70 leading-relaxed",
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                lineNumber: 34,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
_c = FlowDiagram;
var _c;
__turbopack_context__.k.register(_c, "FlowDiagram");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/components/builders/DeployOnPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DeployOnPage",
    ()=>DeployOnPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useAccount.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useConnect.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useSwitchChain.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/wagmi/dist/esm/hooks/useWalletClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/lib/wagmiConfig.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function DeployOnPage({ onSuccess }) {
    _s();
    const { address, isConnected, chainId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { connect, connectors, isPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnect"])();
    const { switchChain, isPending: isSwitching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const { data: walletClient } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"])();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deployedAddress, setDeployedAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const needsNetworkSwitch = isConnected && chainId !== __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ogTestnet"].id;
    const handleDeploy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DeployOnPage.useCallback[handleDeploy]": async ()=>{
            if (!walletClient) {
                setError("Wallet not connected");
                return;
            }
            if (chainId !== __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ogTestnet"].id) {
                setError("Switch to 0G Testnet in your wallet first.");
                return;
            }
            setStatus("loading");
            setError(null);
            try {
                const res = await fetch("/contracts/HumanAgentINFT.json");
                const { abi, bytecode } = await res.json();
                const hash = await walletClient.deployContract({
                    abi,
                    bytecode,
                    args: []
                });
                const receipt = await walletClient.waitForTransactionReceipt({
                    hash
                });
                const addr = receipt.contractAddress;
                if (addr) {
                    setDeployedAddress(addr);
                    setStatus("success");
                    onSuccess(addr);
                } else {
                    throw new Error("No contract address in receipt");
                }
            } catch (err) {
                const msg = err instanceof Error ? err.message : String(err);
                setError(msg);
                setStatus("error");
            }
        }
    }["DeployOnPage.useCallback[handleDeploy]"], [
        walletClient,
        onSuccess,
        chainId
    ]);
    const metaMask = connectors.find((c)=>c.name?.toLowerCase().includes("metamask"));
    const injected = connectors.find((c)=>c.type === "injected") ?? metaMask;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-xl border border-white/15 bg-white/5 p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mb-3 text-sm text-white/80",
                children: "Connect your wallet and deploy HumanAgentINFT. You'll need testnet tokens for gas."
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this),
            !isConnected ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>injected && connect({
                                connector: injected
                            }),
                        disabled: !injected || isPending,
                        className: "btn-primary rounded-lg px-4 py-2 text-sm font-medium",
                        children: isPending ? "Connecting..." : "Connect Wallet"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this),
                    !injected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-amber-300/90",
                        children: "Install MetaMask or another injected wallet."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                        lineNumber: 76,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-white/60",
                        children: [
                            "Connected: ",
                            address?.slice(0, 10),
                            "...",
                            address?.slice(-8)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    needsNetworkSwitch ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-sm text-amber-200/90",
                                children: "Switch your wallet to 0G Testnet to deploy."
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>switchChain({
                                        chainId: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ogTestnet"].id
                                    }),
                                disabled: isSwitching,
                                className: "btn-primary rounded-lg px-4 py-2 text-sm font-medium",
                                children: isSwitching ? "Switching..." : "Switch to 0G Testnet"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                        lineNumber: 83,
                        columnNumber: 13
                    }, this) : status === "success" && deployedAddress ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-emerald-200",
                                children: "Deployed!"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                lineNumber: 96,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                className: "mt-1 block break-all text-xs text-emerald-100/90",
                                children: deployedAddress
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                        lineNumber: 95,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleDeploy,
                        disabled: status === "loading",
                        className: "btn-primary rounded-lg px-4 py-2 text-sm font-medium",
                        children: status === "loading" ? "Deploying..." : "Deploy HumanAgentINFT"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                        lineNumber: 100,
                        columnNumber: 13
                    }, this),
                    status === "error" && error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-red-300",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                        lineNumber: 110,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                lineNumber: 80,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(DeployOnPage, "xMvqd2FW5SS9l+zrXZp4zgNmhCc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnect"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"]
    ];
});
_c = DeployOnPage;
var _c;
__turbopack_context__.k.register(_c, "DeployOnPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/components/builders/GetAddressCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GetAddressCard",
    ()=>GetAddressCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$DeployOnPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/DeployOnPage.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function isValidAddress(value) {
    return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}
function GetAddressCard({ onSuccess, initialAddress }) {
    _s();
    const [path, setPath] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("deploy");
    const [pasteValue, setPasteValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialAddress ?? "");
    const [pasteError, setPasteError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const handlePasteChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GetAddressCard.useCallback[handlePasteChange]": (value)=>{
            setPasteValue(value);
            setPasteError(null);
            const trimmed = value.trim();
            if (trimmed && isValidAddress(trimmed)) {
                onSuccess(trimmed);
            }
        }
    }["GetAddressCard.useCallback[handlePasteChange]"], [
        onSuccess
    ]);
    const handlePasteBlur = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "GetAddressCard.useCallback[handlePasteBlur]": ()=>{
            const trimmed = pasteValue.trim();
            if (!trimmed) {
                setPasteError(null);
                return;
            }
            if (!isValidAddress(trimmed)) {
                setPasteError("Invalid address. Must be 0x followed by 40 hex characters.");
                return;
            }
            setPasteError(null);
            onSuccess(trimmed);
        }
    }["GetAddressCard.useCallback[handlePasteBlur]"], [
        pasteValue,
        onSuccess
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card rounded-2xl p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-white/90",
                children: "Get iNFT contract address"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-white/60",
                children: "Choose how you want to obtain the HumanAgentINFT contract address."
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                lineNumber: 52,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex flex-wrap gap-2",
                children: [
                    {
                        id: "deploy",
                        label: "Deploy on page"
                    },
                    {
                        id: "terminal",
                        label: "Deploy from terminal"
                    },
                    {
                        id: "paste",
                        label: "Paste existing address"
                    }
                ].map(({ id, label })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setPath(id),
                        className: `rounded-lg px-3 py-1.5 text-sm font-medium transition ${path === id ? "bg-purple-500 text-white ring-2 ring-purple-300/50" : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white/90"}`,
                        children: label
                    }, id, false, {
                        fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    path === "deploy" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$DeployOnPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DeployOnPage"], {
                        onSuccess: onSuccess
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                        lineNumber: 80,
                        columnNumber: 31
                    }, this),
                    path === "terminal" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-white/15 bg-white/5 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-3 text-sm text-white/80",
                                children: [
                                    "Run from ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "rounded bg-white/10 px-1",
                                        children: "packages/contracts"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                                        lineNumber: 84,
                                        columnNumber: 24
                                    }, this),
                                    " with Hardhat configured for 0G Testnet. Set ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "rounded bg-white/10 px-1",
                                        children: "PRIVATE_KEY"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                                        lineNumber: 84,
                                        columnNumber: 137
                                    }, this),
                                    " in ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "rounded bg-white/10 px-1",
                                        children: ".env"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                                        lineNumber: 84,
                                        columnNumber: 202
                                    }, this),
                                    " and get testnet OG from the ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/faucet",
                                        className: "text-purple-300 hover:text-purple-200",
                                        children: "Faucet"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                                        lineNumber: 84,
                                        columnNumber: 285
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                                lineNumber: 83,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "overflow-x-auto rounded-lg bg-black/30 px-4 py-3 text-sm text-emerald-200/90",
                                children: "npx hardhat run scripts/deploy.ts --network og-testnet"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/modules",
                                className: "mt-3 inline-block text-sm text-purple-300 hover:text-purple-200",
                                children: "View packages/contracts documentation →"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    path === "paste" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-xl border border-white/15 bg-white/5 p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "block text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mb-2 block font-medium text-white/70",
                                        children: "Contract address"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: pasteValue,
                                        onChange: (e)=>handlePasteChange(e.target.value),
                                        onBlur: handlePasteBlur,
                                        placeholder: "0x...",
                                        className: "glass-input w-full px-4 py-2.5 text-white/90 placeholder-white/40"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this),
                            pasteError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-red-300",
                                children: pasteError
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                                lineNumber: 110,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(GetAddressCard, "Tw5dofx1du6pe6Q4N4S1Jsy9sYM=");
_c = GetAddressCard;
var _c;
__turbopack_context__.k.register(_c, "GetAddressCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/components/builders/PlacementGuide.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PlacementGuide",
    ()=>PlacementGuide
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function PlacementGuide({ filePath, description, code, insertMarker }) {
    _s();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PlacementGuide.useCallback[copy]": ()=>{
            const text = insertMarker ? code.replace(insertMarker, "").trim() : code;
            navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout({
                "PlacementGuide.useCallback[copy]": ()=>setCopied(false)
            }["PlacementGuide.useCallback[copy]"], 2000);
        }
    }["PlacementGuide.useCallback[copy]"], [
        code,
        insertMarker
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card rounded-2xl p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-white/90",
                children: "Where this goes"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-white/60",
                children: description
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-center gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                    className: "rounded bg-white/10 px-2 py-1 text-xs font-mono text-purple-200",
                    children: filePath
                }, void 0, false, {
                    fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                    lineNumber: 27,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-end justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "flex-1 overflow-x-auto rounded-lg border border-white/10 bg-black/20 p-4 text-xs text-emerald-200/90",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            children: code
                        }, void 0, false, {
                            fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                            lineNumber: 33,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: copy,
                        className: "btn-secondary shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium",
                        children: copied ? "Copied" : "Copy"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            insertMarker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-xs text-purple-300/90",
                children: "← insert here"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                lineNumber: 44,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
        lineNumber: 23,
        columnNumber: 5
    }, this);
}
_s(PlacementGuide, "QV91T40Mqz7E8i/OX01RqjOxXu4=");
_c = PlacementGuide;
var _c;
__turbopack_context__.k.register(_c, "PlacementGuide");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/components/builders/ProgressStepper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProgressStepper",
    ()=>ProgressStepper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function ProgressStepper({ steps, currentStep, onStepClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        className: "flex flex-wrap items-center gap-2",
        "aria-label": "Progress",
        children: steps.map((step, i)=>{
            const isActive = i === currentStep;
            const isPast = i < currentStep;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>onStepClick?.(i),
                        className: `flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition ${isActive ? "bg-purple-500 text-white ring-2 ring-purple-300/50" : isPast ? "bg-emerald-500/30 text-emerald-200" : "bg-white/10 text-white/60 hover:bg-white/15"}`,
                        "aria-current": isActive ? "step" : undefined,
                        children: isPast ? "✓" : i + 1
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/ProgressStepper.tsx",
                        lineNumber: 25,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `text-sm ${isActive ? "text-white font-medium" : isPast ? "text-white/70" : "text-white/50"}`,
                        children: step.label
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/ProgressStepper.tsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, this),
                    i < steps.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mx-1 hidden text-white/30 sm:inline",
                        children: "→"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/ProgressStepper.tsx",
                        lineNumber: 47,
                        columnNumber: 15
                    }, this)
                ]
            }, step.id, true, {
                fileName: "[project]/packages/web/components/builders/ProgressStepper.tsx",
                lineNumber: 24,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/packages/web/components/builders/ProgressStepper.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = ProgressStepper;
var _c;
__turbopack_context__.k.register(_c, "ProgressStepper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/components/builders/WorkedExample.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WorkedExample",
    ()=>WorkedExample
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function WorkedExample({ title = "Full example", code, description }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkedExample.useCallback[copy]": ()=>{
            navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout({
                "WorkedExample.useCallback[copy]": ()=>setCopied(false)
            }["WorkedExample.useCallback[copy]"], 2000);
        }
    }["WorkedExample.useCallback[copy]"], [
        code
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card rounded-2xl overflow-hidden",
        children: [
            description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-white/10 px-5 py-3 text-sm text-white/70",
                children: description
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/WorkedExample.tsx",
                lineNumber: 26,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen((o)=>!o),
                className: "flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-white/5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-sm font-semibold text-white/90",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/WorkedExample.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-purple-300 text-sm",
                        children: open ? "▼" : "▶"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/WorkedExample.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/builders/WorkedExample.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-white/10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-end gap-2 px-4 py-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: copy,
                            className: "btn-secondary rounded-lg px-3 py-1.5 text-xs font-medium",
                            children: copied ? "Copied" : "Copy"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/components/builders/WorkedExample.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/WorkedExample.tsx",
                        lineNumber: 40,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "overflow-x-auto p-4 text-xs text-emerald-200/90",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            children: code
                        }, void 0, false, {
                            fileName: "[project]/packages/web/components/builders/WorkedExample.tsx",
                            lineNumber: 50,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/WorkedExample.tsx",
                        lineNumber: 49,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/builders/WorkedExample.tsx",
                lineNumber: 39,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/builders/WorkedExample.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(WorkedExample, "J7hJqqb6ttvmhQc9LSvvvRD5nFk=");
_c = WorkedExample;
var _c;
__turbopack_context__.k.register(_c, "WorkedExample");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/packages/web/app/modules/inft-builder/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>INFTBuilderPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$AddToProjectSteps$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/AddToProjectSteps.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$CodeOutput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/CodeOutput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$ConceptCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/ConceptCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$ConfigPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/ConfigPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$FlowDiagram$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/FlowDiagram.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$GetAddressCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/GetAddressCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$PlacementGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/PlacementGuide.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$ProgressStepper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/ProgressStepper.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$WorkedExample$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/WorkedExample.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
const INTEGRATION_STEPS = [
    {
        num: 1,
        title: "Configure iNFT",
        body: "Set issuer, expiry, policy below. Use metadata schema in your mint API.",
        filePath: "app/api/mint/route.ts"
    },
    {
        num: 2,
        title: "Deploy iNFT contract",
        body: "Use the card below or packages/contracts to deploy HumanAgentINFT.",
        filePath: "packages/contracts"
    },
    {
        num: 3,
        title: "Add guard to your contract",
        body: "Include onlyVerified() or inline require in functions that require human verification.",
        filePath: "contracts/YourContract.sol"
    },
    {
        num: 4,
        title: "Use the hook in your app",
        body: "Call useIsVerified(wallet) in components that gate UI or API calls.",
        filePath: "hooks/useIsVerified.ts"
    }
];
function INFTBuilderPage() {
    _s();
    const [issuer, setIssuer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("My App");
    const [expiryDays, setExpiryDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(30);
    const [policyCooldownSec, setPolicyCooldownSec] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(86400);
    const [metadataType, setMetadataType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("human-agent");
    const [network, setNetwork] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("0G Testnet");
    const [contractAddress, setContractAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(("TURBOPACK compile-time value", "0xEbf8088636FF56497130784320286a05165481e3") ?? "0x...");
    const [guardStyle, setGuardStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("modifier");
    const [framework, setFramework] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("wagmi");
    const [includeCanUse, setIncludeCanUse] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const stepSectionRefs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const scrollToStep = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "INFTBuilderPage.useCallback[scrollToStep]": (index)=>{
            stepSectionRefs.current[index]?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    }["INFTBuilderPage.useCallback[scrollToStep]"], []);
    const metadataSchema = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "INFTBuilderPage.useMemo[metadataSchema]": ()=>JSON.stringify({
                type: metadataType,
                issuer,
                verified: true,
                verifiedAt: "<<now>>",
                expiresAt: `<<now + ${expiryDays * 24 * 60 * 60 * 1000}>>`,
                policy: {
                    cooldownSec: policyCooldownSec
                },
                model: {
                    name: "demo-classifier"
                }
            }, null, 2)
    }["INFTBuilderPage.useMemo[metadataSchema]"], [
        metadataType,
        issuer,
        expiryDays,
        policyCooldownSec
    ]);
    const soliditySnippet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "INFTBuilderPage.useMemo[soliditySnippet]": ()=>{
            if (guardStyle === "modifier") {
                if (includeCanUse) {
                    return `// Guard: require verified human + authorized
// Network: ${network}
// iNFT: ${contractAddress}

IHumanAgentINFT public agent;

modifier onlyVerified() {
    require(agent.isVerified(msg.sender), "Agent not verified");
    uint256 tokenId = agent.ownerToTokenId(msg.sender);
    require(agent.canUse(tokenId, msg.sender), "Action not authorized");
    _;
}

function myGatedAction() external onlyVerified {
    // your logic
}`;
                }
                return `// Guard: require verified human agent
// Network: ${network}
// iNFT: ${contractAddress}

IHumanAgentINFT public agent;

modifier onlyVerified() {
    require(agent.isVerified(msg.sender), "Agent not verified");
    _;
}

function myGatedAction() external onlyVerified {
    // your logic
}`;
            }
            if (includeCanUse) {
                return `// Inline guard
require(agent.isVerified(msg.sender), "Agent not verified");
uint256 tokenId = agent.ownerToTokenId(msg.sender);
require(agent.canUse(tokenId, msg.sender), "Action not authorized");`;
            }
            return `// Inline guard
require(agent.isVerified(msg.sender), "Agent not verified");`;
        }
    }["INFTBuilderPage.useMemo[soliditySnippet]"], [
        network,
        contractAddress,
        guardStyle,
        includeCanUse
    ]);
    const reactSnippet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "INFTBuilderPage.useMemo[reactSnippet]": ()=>{
            if (framework === "wagmi") {
                return `import { useReadContract } from "wagmi";
import { inftAbi } from "./abi";

export function useIsVerified(wallet: \`0x\${string}\`) {
  return useReadContract({
    address: "${contractAddress}",
    abi: inftAbi,
    functionName: "isVerified",
    args: [wallet],
  });
}`;
            }
            return `import { Contract, JsonRpcProvider } from "ethers";
import { inftAbi } from "./abi";

const rpc = process.env.NEXT_PUBLIC_OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";

export async function isVerified(wallet: string) {
  const provider = new JsonRpcProvider(rpc);
  const contract = new Contract("${contractAddress}", inftAbi, provider);
  return contract.isVerified(wallet);
}`;
        }
    }["INFTBuilderPage.useMemo[reactSnippet]"], [
        contractAddress,
        framework
    ]);
    const workedExampleCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "INFTBuilderPage.useMemo[workedExampleCode]": ()=>`// Minimal contract
contract MyFaucet {
  IHumanAgentINFT public agent;
  constructor(address _agent) { agent = IHumanAgentINFT(_agent); }
  function claim() external {
    require(agent.isVerified(msg.sender), "Agent not verified");
    // transfer logic
  }
}

// Minimal React component
function ClaimButton() {
  const { address } = useAccount();
  const { data } = useIsVerified(address ?? "0x0");
  return (
    <button disabled={!data}>
      {data ? "Claim" : "Verify first"}
    </button>
  );
}`
    }["INFTBuilderPage.useMemo[workedExampleCode]"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-3xl space-y-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/modules",
                        className: "text-sm text-white/60 hover:text-white/90",
                        children: "← Modules"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-2 text-2xl font-semibold",
                        children: "iNFT Builder"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-white/60",
                        children: "Configure your iNFT, then generate Solidity guards and React hooks."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$ProgressStepper$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProgressStepper"], {
                steps: STEPS,
                currentStep: currentStep,
                onStepClick: scrollToSection
            }, void 0, false, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: (el)=>{
                    sectionRefs.current[0] = el;
                },
                className: "scroll-mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$ConceptCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConceptCard"], {
                        title: "What is an iNFT?",
                        actionLink: {
                            href: "/faucet",
                            label: "See it in action"
                        },
                        learnMore: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "The iNFT stores encrypted metadata on-chain. Your contract checks",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                    className: "rounded bg-white/10 px-1",
                                    children: "isVerified(wallet)"
                                }, void 0, false, {
                                    fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                    lineNumber: 199,
                                    columnNumber: 15
                                }, void 0),
                                " before allowing gated actions like faucet claims or voting."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                            lineNumber: 197,
                            columnNumber: 13
                        }, void 0),
                        children: "An iNFT is an on-chain credential proving a user passed human verification. Your contract and frontend use it to gate access (e.g., faucet claim, voting)."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mb-2 text-sm font-semibold text-white/80",
                                children: "What can you do with it?"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "list-inside list-disc space-y-1 text-sm text-white/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Gate faucet claims so only verified humans can claim"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                        lineNumber: 211,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Restrict voting or governance to verified identities"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Gate API access or premium features"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                        lineNumber: 213,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$FlowDiagram$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowDiagram"], {
                            nodes: [
                                "Wallet",
                                "isVerified(wallet)",
                                "true/false",
                                "Gate action"
                            ]
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: (el)=>{
                    sectionRefs.current[1] = el;
                },
                className: "scroll-mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$GetAddressCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetAddressCard"], {
                    onSuccess: setContractAddress,
                    initialAddress: contractAddress !== "0x..." ? contractAddress : undefined
                }, void 0, false, {
                    fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                    lineNumber: 227,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: (el)=>{
                    sectionRefs.current[2] = el;
                },
                className: "scroll-mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$ConfigPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfigPanel"], {
                        title: "Configure for mint API",
                        fields: [
                            {
                                id: "issuer",
                                label: "Issuer name",
                                value: issuer,
                                onChange: setIssuer,
                                helper: "Name shown in iNFT metadata. Use your app name or domain."
                            },
                            {
                                id: "expiryDays",
                                label: "Expiry (days)",
                                type: "number",
                                value: expiryDays,
                                onChange: setExpiryDays,
                                helper: "Credential validity period. Users must re-verify after expiry."
                            },
                            {
                                id: "policyCooldown",
                                label: "Policy cooldown (sec)",
                                type: "number",
                                value: policyCooldownSec,
                                onChange: setPolicyCooldownSec,
                                helper: "Minimum seconds between canUse-style actions (e.g., faucet claims)."
                            },
                            {
                                id: "metadataType",
                                label: "Metadata type",
                                type: "select",
                                value: metadataType,
                                onChange: setMetadataType,
                                options: [
                                    {
                                        value: "human-agent",
                                        label: "human-agent"
                                    }
                                ],
                                helper: "Currently only human-agent."
                            }
                        ]
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$CodeOutput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeOutput"], {
                            title: "Metadata schema (for mint API)",
                            code: metadataSchema
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 275,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 234,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "scroll-mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$ConfigPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfigPanel"], {
                        title: "Configure generated code",
                        fields: [
                            {
                                id: "network",
                                label: "Network",
                                type: "select",
                                value: network,
                                onChange: setNetwork,
                                options: [
                                    {
                                        value: "0G Testnet",
                                        label: "0G Testnet"
                                    },
                                    {
                                        value: "0G Mainnet",
                                        label: "0G Mainnet"
                                    }
                                ]
                            },
                            {
                                id: "contract",
                                label: "iNFT contract address",
                                value: contractAddress,
                                onChange: setContractAddress,
                                placeholder: "0x...",
                                helper: "Deploy via the card above or paste an existing address."
                            },
                            {
                                id: "guardStyle",
                                label: "Guard style",
                                type: "select",
                                value: guardStyle,
                                onChange: setGuardStyle,
                                options: [
                                    {
                                        value: "modifier",
                                        label: "Modifier"
                                    },
                                    {
                                        value: "inline",
                                        label: "Inline require"
                                    }
                                ],
                                helper: "Modifier for functions; inline for one-off checks."
                            },
                            {
                                id: "framework",
                                label: "Frontend framework",
                                type: "select",
                                value: framework,
                                onChange: setFramework,
                                options: [
                                    {
                                        value: "wagmi",
                                        label: "wagmi"
                                    },
                                    {
                                        value: "ethers",
                                        label: "ethers"
                                    }
                                ],
                                helper: "wagmi for React; ethers for vanilla JS or Node."
                            }
                        ]
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 282,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                id: "canUse",
                                checked: includeCanUse,
                                onChange: (e)=>setIncludeCanUse(e.target.checked),
                                className: "h-4 w-4 rounded accent-purple-500"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "canUse",
                                className: "text-sm text-white/70",
                                children: "Include canUse check (faucet-style flow)"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 338,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 330,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 281,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: (el)=>{
                    sectionRefs.current[3] = el;
                },
                className: "scroll-mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-3 text-lg font-semibold",
                        children: "Generated code"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 349,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$CodeOutput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeOutput"], {
                                title: "Solidity guard",
                                code: soliditySnippet
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$CodeOutput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeOutput"], {
                                title: "React hook",
                                code: reactSnippet
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 350,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 345,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "scroll-mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-3 text-lg font-semibold",
                        children: "Where this goes"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 358,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$PlacementGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlacementGuide"], {
                                filePath: "contracts/MyContract.sol",
                                description: "Add the modifier or inline require at the start of gated functions.",
                                code: soliditySnippet
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$PlacementGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlacementGuide"], {
                                filePath: "hooks/useIsVerified.ts",
                                description: "Call useIsVerified(wallet) in components that gate UI (e.g. Claim button).",
                                code: reactSnippet
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 365,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$AddToProjectSteps$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddToProjectSteps"], {
                            steps: [
                                {
                                    num: 1,
                                    title: "Configure iNFT",
                                    body: "Set issuer, expiry, policy above. Use metadata schema in your mint API.",
                                    filePath: "app/api/mint/route.ts"
                                },
                                {
                                    num: 2,
                                    title: "Deploy iNFT contract",
                                    body: "Use the card above or packages/contracts to deploy HumanAgentINFT.",
                                    filePath: "packages/contracts"
                                },
                                {
                                    num: 3,
                                    title: "Add guard to your contract",
                                    body: "Include onlyVerified() or inline require in functions that require human verification.",
                                    filePath: "contracts/YourContract.sol"
                                },
                                {
                                    num: 4,
                                    title: "Use the hook in your app",
                                    body: "Call useIsVerified(wallet) in components that gate UI or API calls.",
                                    filePath: "hooks/useIsVerified.ts"
                                }
                            ]
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                            lineNumber: 373,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 372,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$WorkedExample$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WorkedExample"], {
                            title: "Show full example",
                            code: workedExampleCode
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                            lineNumber: 404,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 403,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 357,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
        lineNumber: 175,
        columnNumber: 5
    }, this);
}
_s(INFTBuilderPage, "Y5jzrFn43M6i7i9D3BMPK26cuj8=");
_c = INFTBuilderPage;
var _c;
__turbopack_context__.k.register(_c, "INFTBuilderPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=packages_web_0625c8b2._.js.map