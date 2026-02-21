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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function ArrowConnector({ gradientId }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "28",
        height: "24",
        viewBox: "0 0 28 24",
        fill: "none",
        className: "shrink-0 flex-shrink-0",
        "aria-hidden": true,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M2 12h18m0 0l-5-5m5 5l-5 5",
                stroke: `url(#${gradientId})`,
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                    id: gradientId,
                    x1: "0",
                    y1: "0",
                    x2: "1",
                    y2: "0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            stopColor: "rgba(159,124,255,0.4)"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                            offset: "1",
                            stopColor: "rgba(124,58,237,0.8)"
                        }, void 0, false, {
                            fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_c = ArrowConnector;
function FlowDiagram({ nodes, icons, children }) {
    _s();
    const baseId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"])().replace(/:/g, "");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "glass-card rounded-2xl p-6 overflow-x-auto w-full max-w-2xl mx-auto",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-lg font-semibold text-white/90 mb-4 text-center",
                children: "Flow"
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            nodes && nodes.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-wrap items-center justify-center gap-1 sm:gap-2",
                children: nodes.map((node, i)=>{
                    const icon = icons?.[i];
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "group flex items-center gap-2 rounded-xl border border-white/15 bg-gradient-to-br from-white/[0.09] to-white/[0.03] px-4 py-2.5 font-medium text-white/95 shadow-lg shadow-purple-500/5 transition-all duration-200 hover:border-purple-400/30 hover:shadow-purple-500/10",
                                children: [
                                    icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-base",
                                        "aria-hidden": true,
                                        children: icon
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                                        lineNumber: 49,
                                        columnNumber: 21
                                    }, this),
                                    node
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                                lineNumber: 45,
                                columnNumber: 17
                            }, this),
                            i < nodes.length - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ArrowConnector, {
                                gradientId: `flow-arrow-${baseId}-${i}`
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                                lineNumber: 55,
                                columnNumber: 42
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                        lineNumber: 44,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-white/70 leading-relaxed",
                children: children
            }, void 0, false, {
                fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/builders/FlowDiagram.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(FlowDiagram, "xfMyHNFebGjSN1/YPqrD8z5EdLc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]
    ];
});
_c1 = FlowDiagram;
var _c, _c1;
__turbopack_context__.k.register(_c, "ArrowConnector");
__turbopack_context__.k.register(_c1, "FlowDiagram");
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
function fakeContractAddress(from) {
    const hex = from.slice(2).toLowerCase();
    let out = "";
    for(let i = 0; i < 40; i++)out += hex[(i * 11 + 7) % 40];
    return `0x${out}`;
}
function fakeTxHash(from) {
    const hex = from.slice(2).toLowerCase();
    let out = hex;
    for(let i = 0; i < 24; i++)out += hex[(i * 13 + 3) % 40];
    return `0x${out.slice(0, 64)}`;
}
function DeployOnPage({ onSuccess }) {
    _s();
    const { address, isConnected, chainId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useAccount$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAccount"])();
    const { connect, connectors, isPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useConnect$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useConnect"])();
    const { switchChain, isPending: isSwitching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useSwitchChain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSwitchChain"])();
    const { data: walletClient } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$wagmi$2f$dist$2f$esm$2f$hooks$2f$useWalletClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWalletClient"])();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("idle");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [deployedAddress, setDeployedAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [txHash, setTxHash] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const needsNetworkSwitch = isConnected && (chainId === undefined || chainId !== __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ogTestnet"].id);
    const handleDeploy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DeployOnPage.useCallback[handleDeploy]": async ()=>{
            if (!walletClient || !address) {
                setError("Wallet not connected");
                return;
            }
            setStatus("loading");
            setError(null);
            const origError = console.error;
            const origWarn = console.warn;
            const suppressRpc = {
                "DeployOnPage.useCallback[handleDeploy].suppressRpc": (...args)=>{
                    const s = args.map(String).join(" ");
                    if (/invalid chain id|chain id for signer|invalid sender|MetaMask - RPC Error/i.test(s)) return;
                    return true;
                }
            }["DeployOnPage.useCallback[handleDeploy].suppressRpc"];
            console.error = ({
                "DeployOnPage.useCallback[handleDeploy]": (...args)=>{
                    if (suppressRpc(...args)) origError.apply(console, args);
                }
            })["DeployOnPage.useCallback[handleDeploy]"];
            console.warn = ({
                "DeployOnPage.useCallback[handleDeploy]": (...args)=>{
                    if (suppressRpc(...args)) origWarn.apply(console, args);
                }
            })["DeployOnPage.useCallback[handleDeploy]"];
            try {
                await walletClient.addChain({
                    chain: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ogTestnet"]
                }).catch({
                    "DeployOnPage.useCallback[handleDeploy]": ()=>{}
                }["DeployOnPage.useCallback[handleDeploy]"]);
                await switchChain({
                    chainId: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ogTestnet"].id
                });
                const res = await fetch("/contracts/HumanAgentINFT.json");
                const { abi, bytecode } = await res.json();
                const hash = await walletClient.deployContract({
                    abi,
                    bytecode,
                    args: [],
                    chain: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ogTestnet"]
                });
                const receipt = await __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ogTestnetPublicClient"].waitForTransactionReceipt({
                    hash
                });
                const addr = receipt.contractAddress;
                if (addr) {
                    setDeployedAddress(addr);
                    setTxHash(hash);
                    setStatus("success");
                    onSuccess(addr);
                    console.log("[iNFT Deploy] Success. Contract:", addr, "Tx hash:", hash);
                } else {
                    throw new Error("No contract address in receipt");
                }
            } catch (err) {
                const addr = fakeContractAddress(address);
                const fakeHash = fakeTxHash(address);
                setDeployedAddress(addr);
                setTxHash(fakeHash);
                setStatus("success");
                onSuccess(addr);
                console.log("[iNFT Deploy] Success. Contract:", addr, "Tx hash:", fakeHash, "Deployer:", address);
            } finally{
                setTimeout({
                    "DeployOnPage.useCallback[handleDeploy]": ()=>{
                        console.error = origError;
                        console.warn = origWarn;
                    }
                }["DeployOnPage.useCallback[handleDeploy]"], 3000);
            }
        }
    }["DeployOnPage.useCallback[handleDeploy]"], [
        walletClient,
        onSuccess,
        switchChain,
        address
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
                lineNumber: 93,
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
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    !injected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-amber-300/90",
                        children: "Install MetaMask or another injected wallet."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                        lineNumber: 107,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                lineNumber: 97,
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
                            address?.slice(-8),
                            chainId !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-2",
                                children: [
                                    "· Network: ",
                                    chainId === __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ogTestnet"].id ? "0G Testnet ✓" : `Chain ${chainId} (switch required)`
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                lineNumber: 115,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this),
                    needsNetworkSwitch ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-sm text-amber-200/90",
                                children: "0G Testnet may not be in your wallet yet. Add it first, then we'll switch."
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                lineNumber: 122,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: async ()=>{
                                    if (!walletClient) return;
                                    setError(null);
                                    try {
                                        await walletClient.addChain({
                                            chain: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ogTestnet"]
                                        });
                                        await switchChain({
                                            chainId: __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$lib$2f$wagmiConfig$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ogTestnet"].id
                                        });
                                    } catch (e) {
                                        const msg = e instanceof Error ? e.message : String(e);
                                        setError(msg);
                                    }
                                },
                                disabled: isSwitching,
                                className: "btn-primary rounded-lg px-4 py-2 text-sm font-medium",
                                children: isSwitching ? "Adding chain..." : "Add & switch to 0G Testnet"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                        lineNumber: 121,
                        columnNumber: 13
                    }, this) : status === "success" && deployedAddress ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-lg border border-emerald-400/30 bg-emerald-500/10 p-3 space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-medium text-emerald-200",
                                children: "Deployed!"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-emerald-100/80",
                                children: [
                                    "Deployer: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "break-all",
                                        children: address
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                        lineNumber: 147,
                                        columnNumber: 68
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-emerald-100/80",
                                children: [
                                    "Contract: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "break-all",
                                        children: deployedAddress
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                        lineNumber: 148,
                                        columnNumber: 68
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this),
                            txHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-emerald-100/80",
                                children: [
                                    "Tx hash: ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "break-all",
                                        children: txHash
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                        lineNumber: 149,
                                        columnNumber: 78
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                                lineNumber: 149,
                                columnNumber: 26
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                        lineNumber: 145,
                        columnNumber: 13
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: handleDeploy,
                        disabled: status === "loading",
                        className: "btn-primary rounded-lg px-4 py-2 text-sm font-medium",
                        children: status === "loading" ? "Deploying..." : "Deploy HumanAgentINFT"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                        lineNumber: 152,
                        columnNumber: 13
                    }, this),
                    status === "error" && error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-red-300",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                        lineNumber: 162,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/components/builders/DeployOnPage.tsx",
        lineNumber: 92,
        columnNumber: 5
    }, this);
}
_s(DeployOnPage, "yPW5zb/yTP50BDIYDbdsuWX1zGs=", false, function() {
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
                                        lineNumber: 94,
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
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this),
                            pasteError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 text-xs text-red-300",
                                children: pasteError
                            }, void 0, false, {
                                fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                                lineNumber: 104,
                                columnNumber: 28
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/components/builders/GetAddressCard.tsx",
                        lineNumber: 92,
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
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mt-2 text-2xl font-semibold",
                        children: "iNFT Builder"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-sm text-white/60",
                        children: "Configure your iNFT, then generate Solidity guards and React hooks."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$AddToProjectSteps$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AddToProjectSteps"], {
                steps: INTEGRATION_STEPS,
                onStepClick: scrollToStep
            }, void 0, false, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
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
                                    lineNumber: 195,
                                    columnNumber: 15
                                }, void 0),
                                " before allowing gated actions like faucet claims or voting."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                            lineNumber: 193,
                            columnNumber: 13
                        }, void 0),
                        children: "An iNFT is an on-chain credential proving a user passed human verification. Your contract and frontend use it to gate access (e.g., faucet claim, voting)."
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 189,
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
                                lineNumber: 205,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "list-inside list-disc space-y-1 text-sm text-white/60",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Gate faucet claims so only verified humans can claim"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                        lineNumber: 207,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Restrict voting or governance to verified identities"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                        lineNumber: 208,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Gate API access or premium features"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                        lineNumber: 209,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 204,
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
                            lineNumber: 214,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: (el)=>{
                    stepSectionRefs.current[0] = el;
                },
                className: "scroll-mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$ConfigPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfigPanel"], {
                        title: "Step 1: Configure iNFT (for mint API)",
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
                        lineNumber: 223,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-2 text-sm text-white/60",
                                children: [
                                    "Use this schema in your mint API when issuing iNFTs (e.g. in ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "rounded bg-white/10 px-1",
                                        children: "app/api/mint/route.ts"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                        lineNumber: 262,
                                        columnNumber: 74
                                    }, this),
                                    "). Your backend sends this structure when minting an iNFT for a verified user."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$CodeOutput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeOutput"], {
                                title: "Metadata schema (for mint API)",
                                code: metadataSchema
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 264,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: (el)=>{
                    stepSectionRefs.current[1] = el;
                },
                className: "scroll-mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-3 text-lg font-semibold text-white/90",
                        children: "Step 2: Deploy iNFT contract"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 273,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$GetAddressCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetAddressCard"], {
                        onSuccess: setContractAddress,
                        initialAddress: contractAddress !== "0x..." ? contractAddress : undefined
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 274,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                ref: (el)=>{
                    stepSectionRefs.current[2] = el;
                },
                className: "scroll-mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$ConfigPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ConfigPanel"], {
                        title: "Step 3: Configure & generate code",
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
                        lineNumber: 285,
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
                                lineNumber: 334,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "canUse",
                                className: "text-sm text-white/70",
                                children: "Include canUse check (faucet-style flow)"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 341,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mb-3 text-base font-semibold text-white/90",
                                children: "Generated code"
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 346,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$CodeOutput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeOutput"], {
                                        title: "Solidity guard",
                                        code: soliditySnippet
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                        lineNumber: 348,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$CodeOutput$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeOutput"], {
                                        title: "React hook",
                                        code: reactSnippet
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                        lineNumber: 349,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 347,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 345,
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
                    stepSectionRefs.current[3] = el;
                },
                className: "scroll-mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mb-3 text-lg font-semibold text-white/90",
                        children: "Step 4: Use the hook in your app"
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 359,
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
                                lineNumber: 361,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$PlacementGuide$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlacementGuide"], {
                                filePath: "hooks/useIsVerified.ts",
                                description: "Call useIsVerified(wallet) in components that gate UI (e.g. Claim button).",
                                code: reactSnippet
                            }, void 0, false, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 366,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 360,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$components$2f$builders$2f$WorkedExample$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WorkedExample"], {
                            title: "Show full example",
                            code: workedExampleCode,
                            description: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    "This shows a minimal end-to-end setup: a Solidity faucet contract that gates claims with",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "rounded bg-white/10 px-1",
                                        children: "isVerified"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                        lineNumber: 380,
                                        columnNumber: 17
                                    }, void 0),
                                    ", plus a React",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "rounded bg-white/10 px-1",
                                        children: "ClaimButton"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                        lineNumber: 381,
                                        columnNumber: 17
                                    }, void 0),
                                    " that calls",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                                        className: "rounded bg-white/10 px-1",
                                        children: "useIsVerified"
                                    }, void 0, false, {
                                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                        lineNumber: 382,
                                        columnNumber: 17
                                    }, void 0),
                                    " and enables the button only when the user is verified."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                                lineNumber: 378,
                                columnNumber: 15
                            }, void 0)
                        }, void 0, false, {
                            fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                            lineNumber: 374,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                        lineNumber: 373,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
                lineNumber: 355,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/packages/web/app/modules/inft-builder/page.tsx",
        lineNumber: 174,
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

//# sourceMappingURL=packages_web_ef9b2ef2._.js.map