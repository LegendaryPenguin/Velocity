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
                children: "Checklist"
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
                className: "max-h-[220px] overflow-x-auto overflow-y-auto p-4 text-sm text-emerald-200/90",
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
        className: "glass-card rounded-2xl p-5 overflow-x-auto w-full max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-white/90 mb-3 text-center",
                children: "Flow"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this),
            nodes && nodes.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-center gap-2 text-sm",
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
function PlacementGuide({ filePath, description, code, insertMarker, title = "Where this goes" }) {
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
                children: title
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1 text-sm text-white/60",
                children: description
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-center gap-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                    className: "rounded bg-white/10 px-2 py-1 text-xs font-mono text-purple-200",
                    children: filePath
                }, void 0, false, {
                    fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                    lineNumber: 28,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-3 flex items-end justify-between gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                        className: "max-h-[220px] flex-1 overflow-x-auto overflow-y-auto rounded-lg border border-white/10 bg-black/20 p-4 text-xs text-emerald-200/90",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            children: code
                        }, void 0, false, {
                            fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: copy,
                        className: "btn-secondary shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium",
                        children: copied ? "Copied" : "Copy"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            insertMarker && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 text-xs text-purple-300/90",
                children: "← insert here"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/builders/PlacementGuide.tsx",
        lineNumber: 24,
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
"[project]/packages/web/app/modules/faucet-builder/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FaucetBuilderPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$AddToProjectSteps$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/AddToProjectSteps.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$CodeOutput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/CodeOutput.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$ConceptCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/ConceptCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$ConfigPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/ConfigPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$FlowDiagram$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/FlowDiagram.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$PlacementGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/components/builders/PlacementGuide.tsx [app-client] (ecmascript)");
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
function FaucetBuilderPage() {
    _s();
    const [faucetAddress, setFaucetAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(("TURBOPACK compile-time value", "0xa237822F03A0D4c8C79219Bb65ad23A64c9B291a") ?? "0x...");
    const [cooldownSec, setCooldownSec] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(86400);
    const [agentAddress, setAgentAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(("TURBOPACK compile-time value", "0xEbf8088636FF56497130784320286a05165481e3") ?? "0x...");
    const [contractStyle, setContractStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("full");
    const [apiFramework, setApiFramework] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("app");
    const [includeTransferLogic, setIncludeTransferLogic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const contractSnippet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FaucetBuilderPage.useMemo[contractSnippet]": ()=>{
            if (contractStyle === "full") {
                return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IHumanAgentINFT {
    function isVerified(address wallet) external view returns (bool);
    function ownerToTokenId(address owner) external view returns (uint256);
    function canUse(uint256 tokenId, address executor) external view returns (bool);
}

contract Faucet {
    IHumanAgentINFT public immutable agent;
    uint256 public immutable cooldownSec;
    mapping(address => uint256) public lastClaimedAt;

    event Claimed(address indexed caller, address indexed recipient, uint256 claimedAt);

    constructor(address agentAddress, uint256 cooldownSeconds) {
        agent = IHumanAgentINFT(agentAddress);
        cooldownSec = cooldownSeconds;
    }

    function claim(address caller, address recipient) external {
        require(caller != address(0), "Invalid caller");
        require(recipient != address(0), "Invalid recipient");
        require(agent.isVerified(caller), "Agent not verified");

        uint256 tokenId = agent.ownerToTokenId(caller);
        require(tokenId != 0, "No agent token");
        require(agent.canUse(tokenId, caller), "Action not authorized");

        uint256 nowTs = block.timestamp;
        uint256 unlockAt = lastClaimedAt[caller] + cooldownSec;
        require(nowTs >= unlockAt, "Cooldown active");

        lastClaimedAt[caller] = nowTs;
        emit Claimed(caller, recipient, nowTs);
        ${includeTransferLogic ? "// TODO: ERC20 transfer to recipient" : "// TODO: add transfer logic"}
    }

    function cooldownRemaining(address wallet) external view returns (uint256) {
        uint256 unlockAt = lastClaimedAt[wallet] + cooldownSec;
        if (block.timestamp >= unlockAt) return 0;
        return unlockAt - block.timestamp;
    }
}`;
            }
            return `// Minimal guard (use Faucet.sol for full pattern)
require(agent.isVerified(caller), "Agent not verified");
uint256 tokenId = agent.ownerToTokenId(caller);
require(agent.canUse(tokenId, caller), "Action not authorized");
require(block.timestamp >= lastClaimedAt[caller] + cooldownSec, "Cooldown active");`;
        }
    }["FaucetBuilderPage.useMemo[contractSnippet]"], [
        contractStyle,
        cooldownSec,
        agentAddress,
        includeTransferLogic
    ]);
    const apiSnippet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FaucetBuilderPage.useMemo[apiSnippet]": ()=>{
            const routePath = apiFramework === "app" ? "app/api/claim/route.ts" : "pages/api/claim.ts";
            return `// ${routePath}
// Env: NEXT_PUBLIC_FAUCET_ADDRESS, PRIVATE_KEY, OG_RPC_URL

import { NextResponse } from "next/server";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { FAUCET_ABI } from "@/lib/inftAbi";

function isAddress(v: string) { return /^0x[a-fA-F0-9]{40}$/.test(v); }

export async function POST(req: Request) {
  const { wallet, to } = await req.json();
  if (!isAddress(wallet) || !isAddress(to)) {
    return NextResponse.json({ ok: false, error: "Invalid wallet input." }, { status: 400 });
  }

  const rpc = process.env.OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";
  const pk = process.env.PRIVATE_KEY ?? "";
  const faucetAddress = process.env.NEXT_PUBLIC_FAUCET_ADDRESS ?? "";
  if (!pk.startsWith("0x") || !isAddress(faucetAddress)) {
    return NextResponse.json({ ok: false, error: "Faucet env missing." }, { status: 500 });
  }

  const provider = new JsonRpcProvider(rpc);
  const signer = new Wallet(pk, provider);
  const faucet = new Contract(faucetAddress, FAUCET_ABI, signer);

  const tx = await faucet.claim(wallet, to);
  const receipt = await tx.wait();
  const cooldownRemaining = Number(await faucet.cooldownRemaining(wallet));

  return NextResponse.json({
    ok: true,
    txHash: receipt?.hash,
    cooldownRemainingSec: cooldownRemaining,
  });
}`;
        }
    }["FaucetBuilderPage.useMemo[apiSnippet]"], [
        apiFramework,
        faucetAddress,
        cooldownSec
    ]);
    const envHint = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FaucetBuilderPage.useMemo[envHint]": ()=>`# Faucet integration
NEXT_PUBLIC_FAUCET_ADDRESS=${faucetAddress || "0x..."}
NEXT_PUBLIC_INFT_ADDRESS=${agentAddress || "0x..."}
OG_RPC_URL=https://evmrpc-testnet.0g.ai
PRIVATE_KEY=0x...`
    }["FaucetBuilderPage.useMemo[envHint]"], [
        faucetAddress,
        agentAddress
    ]);
    const workedExampleCode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FaucetBuilderPage.useMemo[workedExampleCode]": ()=>`// Frontend: call claim after mint + verification
const claimRes = await fetch("/api/claim", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ wallet: userWallet, to: userWallet }),
});
const { ok, txHash, cooldownRemainingSec } = await claimRes.json();`
    }["FaucetBuilderPage.useMemo[workedExampleCode]"], []);
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
                        fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-2 text-2xl font-semibold",
                        children: "Faucet Integration Builder"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-white/60",
                        children: "Generate contract and API code for faucet claims gated by Human Agent iNFT."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$ConceptCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConceptCard"], {
                title: "Faucet depends on iNFT",
                actionLink: {
                    href: "/faucet",
                    label: "See it in action"
                },
                learnMore: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: [
                        "The faucet contract uses ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            className: "rounded bg-white/10 px-1",
                            children: "agent.isVerified"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                            lineNumber: 158,
                            columnNumber: 38
                        }, void 0),
                        ", ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            className: "rounded bg-white/10 px-1",
                            children: "agent.ownerToTokenId"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                            lineNumber: 158,
                            columnNumber: 106
                        }, void 0),
                        ", and ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                            className: "rounded bg-white/10 px-1",
                            children: "agent.canUse"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                            lineNumber: 158,
                            columnNumber: 182
                        }, void 0),
                        " to ensure only verified humans can claim. Your API signs transactions and returns cooldown status."
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                    lineNumber: 157,
                    columnNumber: 11
                }, void 0),
                children: "The faucet gates claims to users who hold a verified Human Agent iNFT. Users must complete captcha → mint iNFT first. The contract enforces isVerified + canUse + cooldown; your API proxies the claim transaction."
            }, void 0, false, {
                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$FlowDiagram$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowDiagram"], {
                nodes: [
                    "User (verified)",
                    "API /api/claim",
                    "Faucet.claim(caller, to)",
                    "Cooldown check",
                    "Transfer"
                ]
            }, void 0, false, {
                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$ConfigPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfigPanel"], {
                title: "Configure",
                fields: [
                    {
                        id: "faucet",
                        label: "Faucet contract address",
                        value: faucetAddress,
                        onChange: setFaucetAddress,
                        placeholder: "0x..."
                    },
                    {
                        id: "agent",
                        label: "iNFT agent address",
                        value: agentAddress,
                        onChange: setAgentAddress,
                        placeholder: "0x..."
                    },
                    {
                        id: "cooldown",
                        label: "Cooldown (seconds)",
                        type: "number",
                        value: cooldownSec,
                        onChange: setCooldownSec
                    },
                    {
                        id: "contractStyle",
                        label: "Contract style",
                        type: "select",
                        value: contractStyle,
                        onChange: setContractStyle,
                        options: [
                            {
                                value: "full",
                                label: "Full Faucet.sol (isVerified + canUse + cooldown)"
                            },
                            {
                                value: "minimal",
                                label: "Minimal guard"
                            }
                        ]
                    },
                    {
                        id: "apiFramework",
                        label: "API framework",
                        type: "select",
                        value: apiFramework,
                        onChange: setApiFramework,
                        options: [
                            {
                                value: "app",
                                label: "Next.js App Router"
                            },
                            {
                                value: "pages",
                                label: "Next.js Pages"
                            }
                        ]
                    }
                ]
            }, void 0, false, {
                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "checkbox",
                        id: "transfer",
                        checked: includeTransferLogic,
                        onChange: (e)=>setIncludeTransferLogic(e.target.checked),
                        className: "h-4 w-4 rounded accent-purple-500"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "transfer",
                        className: "text-sm text-white/70",
                        children: "Include transfer logic skeleton (ERC20)"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                lineNumber: 218,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-3 text-lg font-semibold",
                        children: "Generated code"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$CodeOutput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeOutput"], {
                                title: "Contract",
                                code: contractSnippet
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$CodeOutput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeOutput"], {
                                title: "API route",
                                code: apiSnippet
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$CodeOutput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeOutput"], {
                                title: "Env hint",
                                code: envHint
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                lineNumber: 231,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-3 text-lg font-semibold",
                        children: "Where this goes"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                        lineNumber: 241,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$PlacementGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlacementGuide"], {
                                filePath: "contracts/Faucet.sol",
                                description: "Deploy with constructor(agentAddress, cooldownSeconds).",
                                code: contractSnippet
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$PlacementGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlacementGuide"], {
                                filePath: "app/api/claim/route.ts",
                                description: "Implement POST handler; call faucet.claim(wallet, to).",
                                code: apiSnippet
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                        lineNumber: 242,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$AddToProjectSteps$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddToProjectSteps"], {
                steps: [
                    {
                        num: 1,
                        title: "Deploy iNFT",
                        body: "Deploy HumanAgentINFT first. Deploy Faucet with agent address and cooldown.",
                        filePath: "packages/contracts"
                    },
                    {
                        num: 2,
                        title: "Create API route",
                        body: "Implement /api/claim using the generated template.",
                        filePath: "app/api/claim/route.ts"
                    },
                    {
                        num: 3,
                        title: "Set env vars",
                        body: "NEXT_PUBLIC_FAUCET_ADDRESS, NEXT_PUBLIC_INFT_ADDRESS, PRIVATE_KEY, OG_RPC_URL.",
                        filePath: ".env.local"
                    },
                    {
                        num: 4,
                        title: "Wire frontend",
                        body: "Call /api/claim after mint + verification flow.",
                        filePath: "app/faucet/page.tsx"
                    }
                ]
            }, void 0, false, {
                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$WorkedExample$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WorkedExample"], {
                title: "Show full example",
                code: workedExampleCode
            }, void 0, false, {
                fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/app/modules/faucet-builder/page.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
_s(FaucetBuilderPage, "Mf3TQuCrsPAYGFQEjVJJ1yzXLoI=");
_c = FaucetBuilderPage;
var _c;
__turbopack_context__.k.register(_c, "FaucetBuilderPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=packages_web_d35cd957._.js.map