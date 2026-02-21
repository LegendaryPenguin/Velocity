module.exports = [
"[project]/packages/web/node_modules/ethers/lib.esm/_version.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* Do NOT modify this file; see /src.ts/_admin/update-version.ts */ /**
 *  The current version of Ethers.
 */ __turbopack_context__.s([
    "version",
    ()=>version
]);
const version = "6.13.1"; //# sourceMappingURL=_version.js.map
}),
"[project]/packages/web/node_modules/ethers/lib.esm/utils/properties.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defineProperties",
    ()=>defineProperties,
    "resolveProperties",
    ()=>resolveProperties
]);
/**
 *  Property helper functions.
 *
 *  @_subsection api/utils:Properties  [about-properties]
 */ function checkType(value, type, name) {
    const types = type.split("|").map((t)=>t.trim());
    for(let i = 0; i < types.length; i++){
        switch(type){
            case "any":
                return;
            case "bigint":
            case "boolean":
            case "number":
            case "string":
                if (typeof value === type) {
                    return;
                }
        }
    }
    const error = new Error(`invalid value for type ${type}`);
    error.code = "INVALID_ARGUMENT";
    error.argument = `value.${name}`;
    error.value = value;
    throw error;
}
async function resolveProperties(value) {
    const keys = Object.keys(value);
    const results = await Promise.all(keys.map((k)=>Promise.resolve(value[k])));
    return results.reduce((accum, v, index)=>{
        accum[keys[index]] = v;
        return accum;
    }, {});
}
function defineProperties(target, values, types) {
    for(let key in values){
        let value = values[key];
        const type = types ? types[key] : null;
        if (type) {
            checkType(value, type, key);
        }
        Object.defineProperty(target, key, {
            enumerable: true,
            value,
            writable: false
        });
    }
} //# sourceMappingURL=properties.js.map
}),
"[project]/packages/web/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "assert",
    ()=>assert,
    "assertArgument",
    ()=>assertArgument,
    "assertArgumentCount",
    ()=>assertArgumentCount,
    "assertNormalize",
    ()=>assertNormalize,
    "assertPrivate",
    ()=>assertPrivate,
    "isCallException",
    ()=>isCallException,
    "isError",
    ()=>isError,
    "makeError",
    ()=>makeError
]);
/**
 *  All errors in ethers include properties to ensure they are both
 *  human-readable (i.e. ``.message``) and machine-readable (i.e. ``.code``).
 *
 *  The [[isError]] function can be used to check the error ``code`` and
 *  provide a type guard for the properties present on that error interface.
 *
 *  @_section: api/utils/errors:Errors  [about-errors]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$_version$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/_version.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/utils/properties.js [app-ssr] (ecmascript)");
;
;
function stringify(value) {
    if (value == null) {
        return "null";
    }
    if (Array.isArray(value)) {
        return "[ " + value.map(stringify).join(", ") + " ]";
    }
    if (value instanceof Uint8Array) {
        const HEX = "0123456789abcdef";
        let result = "0x";
        for(let i = 0; i < value.length; i++){
            result += HEX[value[i] >> 4];
            result += HEX[value[i] & 0xf];
        }
        return result;
    }
    if (typeof value === "object" && typeof value.toJSON === "function") {
        return stringify(value.toJSON());
    }
    switch(typeof value){
        case "boolean":
        case "symbol":
            return value.toString();
        case "bigint":
            return BigInt(value).toString();
        case "number":
            return value.toString();
        case "string":
            return JSON.stringify(value);
        case "object":
            {
                const keys = Object.keys(value);
                keys.sort();
                return "{ " + keys.map((k)=>`${stringify(k)}: ${stringify(value[k])}`).join(", ") + " }";
            }
    }
    return `[ COULD NOT SERIALIZE ]`;
}
function isError(error, code) {
    return error && error.code === code;
}
function isCallException(error) {
    return isError(error, "CALL_EXCEPTION");
}
function makeError(message, code, info) {
    let shortMessage = message;
    {
        const details = [];
        if (info) {
            if ("message" in info || "code" in info || "name" in info) {
                throw new Error(`value will overwrite populated values: ${stringify(info)}`);
            }
            for(const key in info){
                if (key === "shortMessage") {
                    continue;
                }
                const value = info[key];
                //                try {
                details.push(key + "=" + stringify(value));
            //                } catch (error: any) {
            //                console.log("MMM", error.message);
            //                    details.push(key + "=[could not serialize object]");
            //                }
            }
        }
        details.push(`code=${code}`);
        details.push(`version=${__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$_version$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["version"]}`);
        if (details.length) {
            message += " (" + details.join(", ") + ")";
        }
    }
    let error;
    switch(code){
        case "INVALID_ARGUMENT":
            error = new TypeError(message);
            break;
        case "NUMERIC_FAULT":
        case "BUFFER_OVERRUN":
            error = new RangeError(message);
            break;
        default:
            error = new Error(message);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(error, {
        code
    });
    if (info) {
        Object.assign(error, info);
    }
    if (error.shortMessage == null) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$properties$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["defineProperties"])(error, {
            shortMessage
        });
    }
    return error;
}
function assert(check, message, code, info) {
    if (!check) {
        throw makeError(message, code, info);
    }
}
function assertArgument(check, message, name, value) {
    assert(check, message, "INVALID_ARGUMENT", {
        argument: name,
        value: value
    });
}
function assertArgumentCount(count, expectedCount, message) {
    if (message == null) {
        message = "";
    }
    if (message) {
        message = ": " + message;
    }
    assert(count >= expectedCount, "missing arguemnt" + message, "MISSING_ARGUMENT", {
        count: count,
        expectedCount: expectedCount
    });
    assert(count <= expectedCount, "too many arguments" + message, "UNEXPECTED_ARGUMENT", {
        count: count,
        expectedCount: expectedCount
    });
}
const _normalizeForms = [
    "NFD",
    "NFC",
    "NFKD",
    "NFKC"
].reduce((accum, form)=>{
    try {
        // General test for normalize
        /* c8 ignore start */ if ("test".normalize(form) !== "test") {
            throw new Error("bad");
        }
        ;
        /* c8 ignore stop */ if (form === "NFD") {
            const check = String.fromCharCode(0xe9).normalize("NFD");
            const expected = String.fromCharCode(0x65, 0x0301);
            /* c8 ignore start */ if (check !== expected) {
                throw new Error("broken");
            }
        /* c8 ignore stop */ }
        accum.push(form);
    } catch (error) {}
    return accum;
}, []);
function assertNormalize(form) {
    assert(_normalizeForms.indexOf(form) >= 0, "platform missing String.prototype.normalize", "UNSUPPORTED_OPERATION", {
        operation: "String.prototype.normalize",
        info: {
            form
        }
    });
}
function assertPrivate(givenGuard, guard, className) {
    if (className == null) {
        className = "";
    }
    if (givenGuard !== guard) {
        let method = className, operation = "new";
        if (className) {
            method += ".";
            operation += " " + className;
        }
        assert(false, `private constructor; use ${method}from* methods`, "UNSUPPORTED_OPERATION", {
            operation
        });
    }
} //# sourceMappingURL=errors.js.map
}),
"[project]/node_modules/@noble/hashes/esm/_assert.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "bool",
    ()=>bool,
    "bytes",
    ()=>bytes,
    "default",
    ()=>__TURBOPACK__default__export__,
    "exists",
    ()=>exists,
    "hash",
    ()=>hash,
    "number",
    ()=>number,
    "output",
    ()=>output
]);
function number(n) {
    if (!Number.isSafeInteger(n) || n < 0) throw new Error(`Wrong positive integer: ${n}`);
}
function bool(b) {
    if (typeof b !== 'boolean') throw new Error(`Expected boolean, not ${b}`);
}
function bytes(b, ...lengths) {
    if (!(b instanceof Uint8Array)) throw new Error('Expected Uint8Array');
    if (lengths.length > 0 && !lengths.includes(b.length)) throw new Error(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
}
function hash(hash) {
    if (typeof hash !== 'function' || typeof hash.create !== 'function') throw new Error('Hash should be wrapped by utils.wrapConstructor');
    number(hash.outputLen);
    number(hash.blockLen);
}
function exists(instance, checkFinished = true) {
    if (instance.destroyed) throw new Error('Hash instance has been destroyed');
    if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
}
function output(out, instance) {
    bytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
        throw new Error(`digestInto() expects output buffer of length at least ${min}`);
    }
}
;
const assert = {
    number,
    bool,
    bytes,
    hash,
    exists,
    output
};
const __TURBOPACK__default__export__ = assert;
 //# sourceMappingURL=_assert.js.map
}),
"[project]/node_modules/@noble/hashes/esm/_u64.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "add",
    ()=>add,
    "add3H",
    ()=>add3H,
    "add3L",
    ()=>add3L,
    "add4H",
    ()=>add4H,
    "add4L",
    ()=>add4L,
    "add5H",
    ()=>add5H,
    "add5L",
    ()=>add5L,
    "default",
    ()=>__TURBOPACK__default__export__,
    "fromBig",
    ()=>fromBig,
    "rotlBH",
    ()=>rotlBH,
    "rotlBL",
    ()=>rotlBL,
    "rotlSH",
    ()=>rotlSH,
    "rotlSL",
    ()=>rotlSL,
    "rotr32H",
    ()=>rotr32H,
    "rotr32L",
    ()=>rotr32L,
    "rotrBH",
    ()=>rotrBH,
    "rotrBL",
    ()=>rotrBL,
    "rotrSH",
    ()=>rotrSH,
    "rotrSL",
    ()=>rotrSL,
    "shrSH",
    ()=>shrSH,
    "shrSL",
    ()=>shrSL,
    "split",
    ()=>split,
    "toBig",
    ()=>toBig
]);
const U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
const _32n = /* @__PURE__ */ BigInt(32);
// We are not using BigUint64Array, because they are extremely slow as per 2022
function fromBig(n, le = false) {
    if (le) return {
        h: Number(n & U32_MASK64),
        l: Number(n >> _32n & U32_MASK64)
    };
    return {
        h: Number(n >> _32n & U32_MASK64) | 0,
        l: Number(n & U32_MASK64) | 0
    };
}
function split(lst, le = false) {
    let Ah = new Uint32Array(lst.length);
    let Al = new Uint32Array(lst.length);
    for(let i = 0; i < lst.length; i++){
        const { h, l } = fromBig(lst[i], le);
        [Ah[i], Al[i]] = [
            h,
            l
        ];
    }
    return [
        Ah,
        Al
    ];
}
const toBig = (h, l)=>BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
// for Shift in [0, 32)
const shrSH = (h, _l, s)=>h >>> s;
const shrSL = (h, l, s)=>h << 32 - s | l >>> s;
// Right rotate for Shift in [1, 32)
const rotrSH = (h, l, s)=>h >>> s | l << 32 - s;
const rotrSL = (h, l, s)=>h << 32 - s | l >>> s;
// Right rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotrBH = (h, l, s)=>h << 64 - s | l >>> s - 32;
const rotrBL = (h, l, s)=>h >>> s - 32 | l << 64 - s;
// Right rotate for shift===32 (just swaps l&h)
const rotr32H = (_h, l)=>l;
const rotr32L = (h, _l)=>h;
// Left rotate for Shift in [1, 32)
const rotlSH = (h, l, s)=>h << s | l >>> 32 - s;
const rotlSL = (h, l, s)=>l << s | h >>> 32 - s;
// Left rotate for Shift in (32, 64), NOTE: 32 is special case.
const rotlBH = (h, l, s)=>l << s - 32 | h >>> 64 - s;
const rotlBL = (h, l, s)=>h << s - 32 | l >>> 64 - s;
// JS uses 32-bit signed integers for bitwise operations which means we cannot
// simple take carry out of low bit sum by shift, we need to use division.
function add(Ah, Al, Bh, Bl) {
    const l = (Al >>> 0) + (Bl >>> 0);
    return {
        h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
        l: l | 0
    };
}
// Addition with more than 2 elements
const add3L = (Al, Bl, Cl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
const add3H = (low, Ah, Bh, Ch)=>Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
const add4L = (Al, Bl, Cl, Dl)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
const add4H = (low, Ah, Bh, Ch, Dh)=>Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
const add5L = (Al, Bl, Cl, Dl, El)=>(Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
const add5H = (low, Ah, Bh, Ch, Dh, Eh)=>Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
;
// prettier-ignore
const u64 = {
    fromBig,
    split,
    toBig,
    shrSH,
    shrSL,
    rotrSH,
    rotrSL,
    rotrBH,
    rotrBL,
    rotr32H,
    rotr32L,
    rotlSH,
    rotlSL,
    rotlBH,
    rotlBL,
    add,
    add3L,
    add3H,
    add4L,
    add4H,
    add5H,
    add5L
};
const __TURBOPACK__default__export__ = u64;
 //# sourceMappingURL=_u64.js.map
}),
"[project]/node_modules/@noble/hashes/esm/cryptoNode.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "crypto",
    ()=>crypto
]);
// We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// See utils.ts for details.
// The file will throw on node.js 14 and earlier.
// @ts-ignore
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
;
const crypto = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ && typeof __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ === 'object' && 'webcrypto' in __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ ? __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__.webcrypto : undefined; //# sourceMappingURL=cryptoNode.js.map
}),
"[project]/node_modules/@noble/hashes/esm/utils.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hash",
    ()=>Hash,
    "asyncLoop",
    ()=>asyncLoop,
    "bytesToHex",
    ()=>bytesToHex,
    "checkOpts",
    ()=>checkOpts,
    "concatBytes",
    ()=>concatBytes,
    "createView",
    ()=>createView,
    "hexToBytes",
    ()=>hexToBytes,
    "isLE",
    ()=>isLE,
    "nextTick",
    ()=>nextTick,
    "randomBytes",
    ()=>randomBytes,
    "rotr",
    ()=>rotr,
    "toBytes",
    ()=>toBytes,
    "u32",
    ()=>u32,
    "u8",
    ()=>u8,
    "utf8ToBytes",
    ()=>utf8ToBytes,
    "wrapConstructor",
    ()=>wrapConstructor,
    "wrapConstructorWithOpts",
    ()=>wrapConstructorWithOpts,
    "wrapXOFConstructorWithOpts",
    ()=>wrapXOFConstructorWithOpts
]);
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ // We use WebCrypto aka globalThis.crypto, which exists in browsers and node.js 16+.
// node.js versions earlier than v19 don't declare it in global scope.
// For node.js, package.json#exports field mapping rewrites import
// from `crypto` to `cryptoNode`, which imports native module.
// Makes the utils un-importable in browsers without a bundler.
// Once node.js 18 is deprecated, we can just drop the import.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/cryptoNode.js [app-ssr] (ecmascript)");
;
const u8a = (a)=>a instanceof Uint8Array;
const u8 = (arr)=>new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
const u32 = (arr)=>new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
const createView = (arr)=>new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
const rotr = (word, shift)=>word << 32 - shift | word >>> shift;
const isLE = new Uint8Array(new Uint32Array([
    0x11223344
]).buffer)[0] === 0x44;
if (!isLE) throw new Error('Non little-endian hardware is not supported');
const hexes = /* @__PURE__ */ Array.from({
    length: 256
}, (_, i)=>i.toString(16).padStart(2, '0'));
function bytesToHex(bytes) {
    if (!u8a(bytes)) throw new Error('Uint8Array expected');
    // pre-caching improves the speed 6x
    let hex = '';
    for(let i = 0; i < bytes.length; i++){
        hex += hexes[bytes[i]];
    }
    return hex;
}
function hexToBytes(hex) {
    if (typeof hex !== 'string') throw new Error('hex string expected, got ' + typeof hex);
    const len = hex.length;
    if (len % 2) throw new Error('padded hex string expected, got unpadded hex of length ' + len);
    const array = new Uint8Array(len / 2);
    for(let i = 0; i < array.length; i++){
        const j = i * 2;
        const hexByte = hex.slice(j, j + 2);
        const byte = Number.parseInt(hexByte, 16);
        if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
        array[i] = byte;
    }
    return array;
}
const nextTick = async ()=>{};
async function asyncLoop(iters, tick, cb) {
    let ts = Date.now();
    for(let i = 0; i < iters; i++){
        cb(i);
        // Date.now() is not monotonic, so in case if clock goes backwards we return return control too
        const diff = Date.now() - ts;
        if (diff >= 0 && diff < tick) continue;
        await nextTick();
        ts += diff;
    }
}
function utf8ToBytes(str) {
    if (typeof str !== 'string') throw new Error(`utf8ToBytes expected string, got ${typeof str}`);
    return new Uint8Array(new TextEncoder().encode(str)); // https://bugzil.la/1681809
}
function toBytes(data) {
    if (typeof data === 'string') data = utf8ToBytes(data);
    if (!u8a(data)) throw new Error(`expected Uint8Array, got ${typeof data}`);
    return data;
}
function concatBytes(...arrays) {
    const r = new Uint8Array(arrays.reduce((sum, a)=>sum + a.length, 0));
    let pad = 0; // walk through each item, ensure they have proper type
    arrays.forEach((a)=>{
        if (!u8a(a)) throw new Error('Uint8Array expected');
        r.set(a, pad);
        pad += a.length;
    });
    return r;
}
class Hash {
    // Safe version that clones internal state
    clone() {
        return this._cloneInto();
    }
}
const toStr = {}.toString;
function checkOpts(defaults, opts) {
    if (opts !== undefined && toStr.call(opts) !== '[object Object]') throw new Error('Options should be object or undefined');
    const merged = Object.assign(defaults, opts);
    return merged;
}
function wrapConstructor(hashCons) {
    const hashC = (msg)=>hashCons().update(toBytes(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = ()=>hashCons();
    return hashC;
}
function wrapConstructorWithOpts(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
function wrapXOFConstructorWithOpts(hashCons) {
    const hashC = (msg, opts)=>hashCons(opts).update(toBytes(msg)).digest();
    const tmp = hashCons({});
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = (opts)=>hashCons(opts);
    return hashC;
}
function randomBytes(bytesLength = 32) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"] && typeof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"].getRandomValues === 'function') {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$cryptoNode$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["crypto"].getRandomValues(new Uint8Array(bytesLength));
    }
    throw new Error('crypto.getRandomValues must be defined');
} //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/@noble/hashes/esm/sha3.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Keccak",
    ()=>Keccak,
    "keccakP",
    ()=>keccakP,
    "keccak_224",
    ()=>keccak_224,
    "keccak_256",
    ()=>keccak_256,
    "keccak_384",
    ()=>keccak_384,
    "keccak_512",
    ()=>keccak_512,
    "sha3_224",
    ()=>sha3_224,
    "sha3_256",
    ()=>sha3_256,
    "sha3_384",
    ()=>sha3_384,
    "sha3_512",
    ()=>sha3_512,
    "shake128",
    ()=>shake128,
    "shake256",
    ()=>shake256
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/_assert.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/_u64.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/utils.js [app-ssr] (ecmascript)");
;
;
;
// SHA3 (keccak) is based on a new design: basically, the internal state is bigger than output size.
// It's called a sponge function.
// Various per round constants calculations
const [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [
    [],
    [],
    []
];
const _0n = /* @__PURE__ */ BigInt(0);
const _1n = /* @__PURE__ */ BigInt(1);
const _2n = /* @__PURE__ */ BigInt(2);
const _7n = /* @__PURE__ */ BigInt(7);
const _256n = /* @__PURE__ */ BigInt(256);
const _0x71n = /* @__PURE__ */ BigInt(0x71);
for(let round = 0, R = _1n, x = 1, y = 0; round < 24; round++){
    // Pi
    [x, y] = [
        y,
        (2 * x + 3 * y) % 5
    ];
    SHA3_PI.push(2 * (5 * y + x));
    // Rotational
    SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
    // Iota
    let t = _0n;
    for(let j = 0; j < 7; j++){
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n) t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
    }
    _SHA3_IOTA.push(t);
}
const [SHA3_IOTA_H, SHA3_IOTA_L] = /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["split"])(_SHA3_IOTA, true);
// Left rotation (without 0, 32, 64)
const rotlH = (h, l, s)=>s > 32 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotlBH"])(h, l, s) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotlSH"])(h, l, s);
const rotlL = (h, l, s)=>s > 32 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotlBL"])(h, l, s) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_u64$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rotlSL"])(h, l, s);
function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    // NOTE: all indices are x2 since we store state as u32 instead of u64 (bigints to slow in js)
    for(let round = 24 - rounds; round < 24; round++){
        // Theta θ
        for(let x = 0; x < 10; x++)B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
        for(let x = 0; x < 10; x += 2){
            const idx1 = (x + 8) % 10;
            const idx0 = (x + 2) % 10;
            const B0 = B[idx0];
            const B1 = B[idx0 + 1];
            const Th = rotlH(B0, B1, 1) ^ B[idx1];
            const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
            for(let y = 0; y < 50; y += 10){
                s[x + y] ^= Th;
                s[x + y + 1] ^= Tl;
            }
        }
        // Rho (ρ) and Pi (π)
        let curH = s[2];
        let curL = s[3];
        for(let t = 0; t < 24; t++){
            const shift = SHA3_ROTL[t];
            const Th = rotlH(curH, curL, shift);
            const Tl = rotlL(curH, curL, shift);
            const PI = SHA3_PI[t];
            curH = s[PI];
            curL = s[PI + 1];
            s[PI] = Th;
            s[PI + 1] = Tl;
        }
        // Chi (χ)
        for(let y = 0; y < 50; y += 10){
            for(let x = 0; x < 10; x++)B[x] = s[y + x];
            for(let x = 0; x < 10; x++)s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
        }
        // Iota (ι)
        s[0] ^= SHA3_IOTA_H[round];
        s[1] ^= SHA3_IOTA_L[round];
    }
    B.fill(0);
}
class Keccak extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Hash"] {
    // NOTE: we accept arguments in bytes instead of bits here.
    constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24){
        super();
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        // Can be passed from user as dkLen
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"])(outputLen);
        // 1600 = 5x5 matrix of 64bit.  1600 bits === 200 bytes
        if (0 >= this.blockLen || this.blockLen >= 200) throw new Error('Sha3 supports only keccak-f1600 function');
        this.state = new Uint8Array(200);
        this.state32 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["u32"])(this.state);
    }
    keccak() {
        keccakP(this.state32, this.rounds);
        this.posOut = 0;
        this.pos = 0;
    }
    update(data) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exists"])(this);
        const { blockLen, state } = this;
        data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toBytes"])(data);
        const len = data.length;
        for(let pos = 0; pos < len;){
            const take = Math.min(blockLen - this.pos, len - pos);
            for(let i = 0; i < take; i++)state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen) this.keccak();
        }
        return this;
    }
    finish() {
        if (this.finished) return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        // Do the padding
        state[pos] ^= suffix;
        if ((suffix & 0x80) !== 0 && pos === blockLen - 1) this.keccak();
        state[blockLen - 1] ^= 0x80;
        this.keccak();
    }
    writeInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["exists"])(this, false);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["bytes"])(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for(let pos = 0, len = out.length; pos < len;){
            if (this.posOut >= blockLen) this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
        }
        return out;
    }
    xofInto(out) {
        // Sha3/Keccak usage with XOF is probably mistake, only SHAKE instances can do XOF
        if (!this.enableXOF) throw new Error('XOF is not possible for this instance');
        return this.writeInto(out);
    }
    xof(bytes) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["number"])(bytes);
        return this.xofInto(new Uint8Array(bytes));
    }
    digestInto(out) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$_assert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["output"])(out, this);
        if (this.finished) throw new Error('digest() was already called');
        this.writeInto(out);
        this.destroy();
        return out;
    }
    digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
    }
    destroy() {
        this.destroyed = true;
        this.state.fill(0);
    }
    _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        // Suffix can change in cSHAKE
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
    }
}
const gen = (suffix, blockLen, outputLen)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wrapConstructor"])(()=>new Keccak(blockLen, suffix, outputLen));
const sha3_224 = /* @__PURE__ */ gen(0x06, 144, 224 / 8);
const sha3_256 = /* @__PURE__ */ gen(0x06, 136, 256 / 8);
const sha3_384 = /* @__PURE__ */ gen(0x06, 104, 384 / 8);
const sha3_512 = /* @__PURE__ */ gen(0x06, 72, 512 / 8);
const keccak_224 = /* @__PURE__ */ gen(0x01, 144, 224 / 8);
const keccak_256 = /* @__PURE__ */ gen(0x01, 136, 256 / 8);
const keccak_384 = /* @__PURE__ */ gen(0x01, 104, 384 / 8);
const keccak_512 = /* @__PURE__ */ gen(0x01, 72, 512 / 8);
const genShake = (suffix, blockLen, outputLen)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$utils$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["wrapXOFConstructorWithOpts"])((opts = {})=>new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));
const shake128 = /* @__PURE__ */ genShake(0x1f, 168, 128 / 8);
const shake256 = /* @__PURE__ */ genShake(0x1f, 136, 256 / 8); //# sourceMappingURL=sha3.js.map
}),
"[project]/packages/web/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "concat",
    ()=>concat,
    "dataLength",
    ()=>dataLength,
    "dataSlice",
    ()=>dataSlice,
    "getBytes",
    ()=>getBytes,
    "getBytesCopy",
    ()=>getBytesCopy,
    "hexlify",
    ()=>hexlify,
    "isBytesLike",
    ()=>isBytesLike,
    "isHexString",
    ()=>isHexString,
    "stripZerosLeft",
    ()=>stripZerosLeft,
    "zeroPadBytes",
    ()=>zeroPadBytes,
    "zeroPadValue",
    ()=>zeroPadValue
]);
/**
 *  Some data helpers.
 *
 *
 *  @_subsection api/utils:Data Helpers  [about-data]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
;
function _getBytes(value, name, copy) {
    if (value instanceof Uint8Array) {
        if (copy) {
            return new Uint8Array(value);
        }
        return value;
    }
    if (typeof value === "string" && value.match(/^0x(?:[0-9a-f][0-9a-f])*$/i)) {
        const result = new Uint8Array((value.length - 2) / 2);
        let offset = 2;
        for(let i = 0; i < result.length; i++){
            result[i] = parseInt(value.substring(offset, offset + 2), 16);
            offset += 2;
        }
        return result;
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "invalid BytesLike value", name || "value", value);
}
function getBytes(value, name) {
    return _getBytes(value, name, false);
}
function getBytesCopy(value, name) {
    return _getBytes(value, name, true);
}
function isHexString(value, length) {
    if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false;
    }
    if (typeof length === "number" && value.length !== 2 + 2 * length) {
        return false;
    }
    if (length === true && value.length % 2 !== 0) {
        return false;
    }
    return true;
}
function isBytesLike(value) {
    return isHexString(value, true) || value instanceof Uint8Array;
}
const HexCharacters = "0123456789abcdef";
function hexlify(data) {
    const bytes = getBytes(data);
    let result = "0x";
    for(let i = 0; i < bytes.length; i++){
        const v = bytes[i];
        result += HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f];
    }
    return result;
}
function concat(datas) {
    return "0x" + datas.map((d)=>hexlify(d).substring(2)).join("");
}
function dataLength(data) {
    if (isHexString(data, true)) {
        return (data.length - 2) / 2;
    }
    return getBytes(data).length;
}
function dataSlice(data, start, end) {
    const bytes = getBytes(data);
    if (end != null && end > bytes.length) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(false, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
            buffer: bytes,
            length: bytes.length,
            offset: end
        });
    }
    return hexlify(bytes.slice(start == null ? 0 : start, end == null ? bytes.length : end));
}
function stripZerosLeft(data) {
    let bytes = hexlify(data).substring(2);
    while(bytes.startsWith("00")){
        bytes = bytes.substring(2);
    }
    return "0x" + bytes;
}
function zeroPad(data, length, left) {
    const bytes = getBytes(data);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(length >= bytes.length, "padding exceeds data length", "BUFFER_OVERRUN", {
        buffer: new Uint8Array(bytes),
        length: length,
        offset: length + 1
    });
    const result = new Uint8Array(length);
    result.fill(0);
    if (left) {
        result.set(bytes, length - bytes.length);
    } else {
        result.set(bytes, 0);
    }
    return hexlify(result);
}
function zeroPadValue(data, length) {
    return zeroPad(data, length, true);
}
function zeroPadBytes(data, length) {
    return zeroPad(data, length, false);
} //# sourceMappingURL=data.js.map
}),
"[project]/packages/web/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "keccak256",
    ()=>keccak256
]);
/**
 *  Cryptographic hashing functions
 *
 *  @_subsection: api/crypto:Hash Functions [about-crypto-hashing]
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@noble/hashes/esm/sha3.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
;
;
let locked = false;
const _keccak256 = function(data) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$noble$2f$hashes$2f$esm$2f$sha3$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak_256"])(data);
};
let __keccak256 = _keccak256;
function keccak256(_data) {
    const data = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])(_data, "data");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["hexlify"])(__keccak256(data));
}
keccak256._ = _keccak256;
keccak256.lock = function() {
    locked = true;
};
keccak256.register = function(func) {
    if (locked) {
        throw new TypeError("keccak256 is locked");
    }
    __keccak256 = func;
};
Object.freeze(keccak256); //# sourceMappingURL=keccak.js.map
}),
"[project]/packages/web/node_modules/ethers/lib.esm/address/address.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAddress",
    ()=>getAddress,
    "getIcapAddress",
    ()=>getIcapAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/crypto/keccak.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/utils/data.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
;
;
const BN_0 = BigInt(0);
const BN_36 = BigInt(36);
function getChecksumAddress(address) {
    //    if (!isHexString(address, 20)) {
    //        logger.throwArgumentError("invalid address", "address", address);
    //    }
    address = address.toLowerCase();
    const chars = address.substring(2).split("");
    const expanded = new Uint8Array(40);
    for(let i = 0; i < 40; i++){
        expanded[i] = chars[i].charCodeAt(0);
    }
    const hashed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$data$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getBytes"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$crypto$2f$keccak$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keccak256"])(expanded));
    for(let i = 0; i < 40; i += 2){
        if (hashed[i >> 1] >> 4 >= 8) {
            chars[i] = chars[i].toUpperCase();
        }
        if ((hashed[i >> 1] & 0x0f) >= 8) {
            chars[i + 1] = chars[i + 1].toUpperCase();
        }
    }
    return "0x" + chars.join("");
}
// See: https://en.wikipedia.org/wiki/International_Bank_Account_Number
// Create lookup table
const ibanLookup = {};
for(let i = 0; i < 10; i++){
    ibanLookup[String(i)] = String(i);
}
for(let i = 0; i < 26; i++){
    ibanLookup[String.fromCharCode(65 + i)] = String(10 + i);
}
// How many decimal digits can we process? (for 64-bit float, this is 15)
// i.e. Math.floor(Math.log10(Number.MAX_SAFE_INTEGER));
const safeDigits = 15;
function ibanChecksum(address) {
    address = address.toUpperCase();
    address = address.substring(4) + address.substring(0, 2) + "00";
    let expanded = address.split("").map((c)=>{
        return ibanLookup[c];
    }).join("");
    // Javascript can handle integers safely up to 15 (decimal) digits
    while(expanded.length >= safeDigits){
        let block = expanded.substring(0, safeDigits);
        expanded = parseInt(block, 10) % 97 + expanded.substring(block.length);
    }
    let checksum = String(98 - parseInt(expanded, 10) % 97);
    while(checksum.length < 2){
        checksum = "0" + checksum;
    }
    return checksum;
}
;
const Base36 = function() {
    ;
    const result = {};
    for(let i = 0; i < 36; i++){
        const key = "0123456789abcdefghijklmnopqrstuvwxyz"[i];
        result[key] = BigInt(i);
    }
    return result;
}();
function fromBase36(value) {
    value = value.toLowerCase();
    let result = BN_0;
    for(let i = 0; i < value.length; i++){
        result = result * BN_36 + Base36[value[i]];
    }
    return result;
}
function getAddress(address) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(typeof address === "string", "invalid address", "address", address);
    if (address.match(/^(0x)?[0-9a-fA-F]{40}$/)) {
        // Missing the 0x prefix
        if (!address.startsWith("0x")) {
            address = "0x" + address;
        }
        const result = getChecksumAddress(address);
        // It is a checksummed address with a bad checksum
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(!address.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || result === address, "bad address checksum", "address", address);
        return result;
    }
    // Maybe ICAP? (we only support direct mode)
    if (address.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
        // It is an ICAP address with a bad checksum
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(address.substring(2, 4) === ibanChecksum(address), "bad icap checksum", "address", address);
        let result = fromBase36(address.substring(4)).toString(16);
        while(result.length < 40){
            result = "0" + result;
        }
        return getChecksumAddress("0x" + result);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "invalid address", "address", address);
}
function getIcapAddress(address) {
    //let base36 = _base16To36(getAddress(address).substring(2)).toUpperCase();
    let base36 = BigInt(getAddress(address)).toString(36).toUpperCase();
    while(base36.length < 30){
        base36 = "0" + base36;
    }
    return "XE" + ibanChecksum("XE00" + base36) + base36;
} //# sourceMappingURL=address.js.map
}),
"[project]/packages/web/node_modules/ethers/lib.esm/address/checks.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isAddress",
    ()=>isAddress,
    "isAddressable",
    ()=>isAddressable,
    "resolveAddress",
    ()=>resolveAddress
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/utils/errors.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/address/address.js [app-ssr] (ecmascript)");
;
;
function isAddressable(value) {
    return value && typeof value.getAddress === "function";
}
function isAddress(value) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(value);
        return true;
    } catch (error) {}
    return false;
}
async function checkAddress(target, promise) {
    const result = await promise;
    if (result == null || result === "0x0000000000000000000000000000000000000000") {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(typeof target !== "string", "unconfigured name", "UNCONFIGURED_NAME", {
            value: target
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "invalid AddressLike value; did not resolve to a value address", "target", target);
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(result);
}
function resolveAddress(target, resolver) {
    if (typeof target === "string") {
        if (target.match(/^0x[0-9a-f]{40}$/i)) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$address$2f$address$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAddress"])(target);
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assert"])(resolver != null, "ENS resolution requires a provider", "UNSUPPORTED_OPERATION", {
            operation: "resolveName"
        });
        return checkAddress(target, resolver.resolveName(target));
    } else if (isAddressable(target)) {
        return checkAddress(target, target.getAddress());
    } else if (target && typeof target.then === "function") {
        return checkAddress(target, target);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$errors$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["assertArgument"])(false, "unsupported addressable value", "target", target);
} //# sourceMappingURL=checks.js.map
}),
"[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactDOM; //# sourceMappingURL=react-dom.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/head-manager-context.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['contexts'].HeadManagerContext; //# sourceMappingURL=head-manager-context.js.map
}),
"[project]/node_modules/next/dist/client/set-attributes-from-props.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "setAttributesFromProps", {
    enumerable: true,
    get: function() {
        return setAttributesFromProps;
    }
});
const DOMAttributeNames = {
    acceptCharset: 'accept-charset',
    className: 'class',
    htmlFor: 'for',
    httpEquiv: 'http-equiv',
    noModule: 'noModule'
};
const ignoreProps = [
    'onLoad',
    'onReady',
    'dangerouslySetInnerHTML',
    'children',
    'onError',
    'strategy',
    'stylesheets'
];
function isBooleanScriptAttribute(attr) {
    return [
        'async',
        'defer',
        'noModule'
    ].includes(attr);
}
function setAttributesFromProps(el, props) {
    for (const [p, value] of Object.entries(props)){
        if (!props.hasOwnProperty(p)) continue;
        if (ignoreProps.includes(p)) continue;
        // we don't render undefined props to the DOM
        if (value === undefined) {
            continue;
        }
        const attr = DOMAttributeNames[p] || p.toLowerCase();
        if (el.tagName === 'SCRIPT' && isBooleanScriptAttribute(attr)) {
            // Correctly assign boolean script attributes
            // https://github.com/vercel/next.js/pull/20748
            ;
            el[attr] = !!value;
        } else {
            el.setAttribute(attr, String(value));
        }
        // Remove falsy non-zero boolean attributes so they are correctly interpreted
        // (e.g. if we set them to false, this coerces to the string "false", which the browser interprets as true)
        if (value === false || el.tagName === 'SCRIPT' && isBooleanScriptAttribute(attr) && (!value || value === 'false')) {
            // Call setAttribute before, as we need to set and unset the attribute to override force async:
            // https://html.spec.whatwg.org/multipage/scripting.html#script-force-async
            el.setAttribute(attr, '');
            el.removeAttribute(attr);
        }
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=set-attributes-from-props.js.map
}),
"[project]/node_modules/next/dist/client/request-idle-callback.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    cancelIdleCallback: null,
    requestIdleCallback: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    cancelIdleCallback: function() {
        return cancelIdleCallback;
    },
    requestIdleCallback: function() {
        return requestIdleCallback;
    }
});
const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
    let start = Date.now();
    return self.setTimeout(function() {
        cb({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};
const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
    return clearTimeout(id);
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=request-idle-callback.js.map
}),
"[project]/node_modules/next/dist/client/script.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    handleClientScriptLoad: null,
    initScriptLoader: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    handleClientScriptLoad: function() {
        return handleClientScriptLoad;
    },
    initScriptLoader: function() {
        return initScriptLoader;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-ssr] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
const _reactdom = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-dom.js [app-ssr] (ecmascript)"));
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)"));
const _headmanagercontextsharedruntime = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/head-manager-context.js [app-ssr] (ecmascript)");
const _setattributesfromprops = __turbopack_context__.r("[project]/node_modules/next/dist/client/set-attributes-from-props.js [app-ssr] (ecmascript)");
const _requestidlecallback = __turbopack_context__.r("[project]/node_modules/next/dist/client/request-idle-callback.js [app-ssr] (ecmascript)");
const ScriptCache = new Map();
const LoadCache = new Set();
const insertStylesheets = (stylesheets)=>{
    // Case 1: Styles for afterInteractive/lazyOnload with appDir injected via handleClientScriptLoad
    //
    // Using ReactDOM.preinit to feature detect appDir and inject styles
    // Stylesheets might have already been loaded if initialized with Script component
    // Re-inject styles here to handle scripts loaded via handleClientScriptLoad
    // ReactDOM.preinit handles dedup and ensures the styles are loaded only once
    if (_reactdom.default.preinit) {
        stylesheets.forEach((stylesheet)=>{
            _reactdom.default.preinit(stylesheet, {
                as: 'style'
            });
        });
        return;
    }
    // Case 2: Styles for afterInteractive/lazyOnload with pages injected via handleClientScriptLoad
    //
    // We use this function to load styles when appdir is not detected
    // TODO: Use React float APIs to load styles once available for pages dir
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
};
const loadScript = (props)=>{
    const { src, id, onLoad = ()=>{}, onReady = null, dangerouslySetInnerHTML, children = '', strategy = 'afterInteractive', onError, stylesheets } = props;
    const cacheKey = id || src;
    // Script has already loaded
    if (cacheKey && LoadCache.has(cacheKey)) {
        return;
    }
    // Contents of this script are already loading/loaded
    if (ScriptCache.has(src)) {
        LoadCache.add(cacheKey);
        // It is possible that multiple `next/script` components all have same "src", but has different "onLoad"
        // This is to make sure the same remote script will only load once, but "onLoad" are executed in order
        ScriptCache.get(src).then(onLoad, onError);
        return;
    }
    /** Execute after the script first loaded */ const afterLoad = ()=>{
        // Run onReady for the first time after load event
        if (onReady) {
            onReady();
        }
        // add cacheKey to LoadCache when load successfully
        LoadCache.add(cacheKey);
    };
    const el = document.createElement('script');
    const loadPromise = new Promise((resolve, reject)=>{
        el.addEventListener('load', function(e) {
            resolve();
            if (onLoad) {
                onLoad.call(this, e);
            }
            afterLoad();
        });
        el.addEventListener('error', function(e) {
            reject(e);
        });
    }).catch(function(e) {
        if (onError) {
            onError(e);
        }
    });
    if (dangerouslySetInnerHTML) {
        // Casting since lib.dom.d.ts doesn't have TrustedHTML yet.
        el.innerHTML = dangerouslySetInnerHTML.__html || '';
        afterLoad();
    } else if (children) {
        el.textContent = typeof children === 'string' ? children : Array.isArray(children) ? children.join('') : '';
        afterLoad();
    } else if (src) {
        el.src = src;
        // do not add cacheKey into LoadCache for remote script here
        // cacheKey will be added to LoadCache when it is actually loaded (see loadPromise above)
        ScriptCache.set(src, loadPromise);
    }
    (0, _setattributesfromprops.setAttributesFromProps)(el, props);
    if (strategy === 'worker') {
        el.setAttribute('type', 'text/partytown');
    }
    el.setAttribute('data-nscript', strategy);
    // Load styles associated with this script
    if (stylesheets) {
        insertStylesheets(stylesheets);
    }
    document.body.appendChild(el);
};
function handleClientScriptLoad(props) {
    const { strategy = 'afterInteractive' } = props;
    if (strategy === 'lazyOnload') {
        window.addEventListener('load', ()=>{
            (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
        });
    } else {
        loadScript(props);
    }
}
function loadLazyScript(props) {
    if (document.readyState === 'complete') {
        (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
    } else {
        window.addEventListener('load', ()=>{
            (0, _requestidlecallback.requestIdleCallback)(()=>loadScript(props));
        });
    }
}
function addBeforeInteractiveToCache() {
    const scripts = [
        ...document.querySelectorAll('[data-nscript="beforeInteractive"]'),
        ...document.querySelectorAll('[data-nscript="beforePageRender"]')
    ];
    scripts.forEach((script)=>{
        const cacheKey = script.id || script.getAttribute('src');
        LoadCache.add(cacheKey);
    });
}
function initScriptLoader(scriptLoaderItems) {
    scriptLoaderItems.forEach(handleClientScriptLoad);
    addBeforeInteractiveToCache();
}
/**
 * Load a third-party scripts in an optimized way.
 *
 * Read more: [Next.js Docs: `next/script`](https://nextjs.org/docs/app/api-reference/components/script)
 */ function Script(props) {
    const { id, src = '', onLoad = ()=>{}, onReady = null, strategy = 'afterInteractive', onError, stylesheets, ...restProps } = props;
    // Context is available only during SSR
    let { updateScripts, scripts, getIsSsr, appDir, nonce } = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
    // if a nonce is explicitly passed to the script tag, favor that over the automatic handling
    nonce = restProps.nonce || nonce;
    /**
   * - First mount:
   *   1. The useEffect for onReady executes
   *   2. hasOnReadyEffectCalled.current is false, but the script hasn't loaded yet (not in LoadCache)
   *      onReady is skipped, set hasOnReadyEffectCalled.current to true
   *   3. The useEffect for loadScript executes
   *   4. hasLoadScriptEffectCalled.current is false, loadScript executes
   *      Once the script is loaded, the onLoad and onReady will be called by then
   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
   *   5. The useEffect for onReady executes again
   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
   *   7. The useEffect for loadScript executes again
   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
   *
   * - Second mount:
   *   1. The useEffect for onReady executes
   *   2. hasOnReadyEffectCalled.current is false, but the script has already loaded (found in LoadCache)
   *      onReady is called, set hasOnReadyEffectCalled.current to true
   *   3. The useEffect for loadScript executes
   *   4. The script is already loaded, loadScript bails out
   *   [If strict mode is enabled / is wrapped in <OffScreen /> component]
   *   5. The useEffect for onReady executes again
   *   6. hasOnReadyEffectCalled.current is true, so entire effect is skipped
   *   7. The useEffect for loadScript executes again
   *   8. hasLoadScriptEffectCalled.current is true, so entire effect is skipped
   */ const hasOnReadyEffectCalled = (0, _react.useRef)(false);
    (0, _react.useEffect)(()=>{
        const cacheKey = id || src;
        if (!hasOnReadyEffectCalled.current) {
            // Run onReady if script has loaded before but component is re-mounted
            if (onReady && cacheKey && LoadCache.has(cacheKey)) {
                onReady();
            }
            hasOnReadyEffectCalled.current = true;
        }
    }, [
        onReady,
        id,
        src
    ]);
    const hasLoadScriptEffectCalled = (0, _react.useRef)(false);
    (0, _react.useEffect)(()=>{
        if (!hasLoadScriptEffectCalled.current) {
            if (strategy === 'afterInteractive') {
                loadScript(props);
            } else if (strategy === 'lazyOnload') {
                loadLazyScript(props);
            }
            hasLoadScriptEffectCalled.current = true;
        }
    }, [
        props,
        strategy
    ]);
    if (strategy === 'beforeInteractive' || strategy === 'worker') {
        if (updateScripts) {
            scripts[strategy] = (scripts[strategy] || []).concat([
                {
                    id,
                    src,
                    onLoad,
                    onReady,
                    onError,
                    ...restProps,
                    nonce
                }
            ]);
            updateScripts(scripts);
        } else if (getIsSsr && getIsSsr()) {
            // Script has already loaded during SSR
            LoadCache.add(id || src);
        } else if (getIsSsr && !getIsSsr()) {
            loadScript({
                ...props,
                nonce
            });
        }
    }
    // For the app directory, we need React Float to preload these scripts.
    if (appDir) {
        // Injecting stylesheets here handles beforeInteractive and worker scripts correctly
        // For other strategies injecting here ensures correct stylesheet order
        // ReactDOM.preinit handles loading the styles in the correct order,
        // also ensures the stylesheet is loaded only once and in a consistent manner
        //
        // Case 1: Styles for beforeInteractive/worker with appDir - handled here
        // Case 2: Styles for beforeInteractive/worker with pages dir - Not handled yet
        // Case 3: Styles for afterInteractive/lazyOnload with appDir - handled here
        // Case 4: Styles for afterInteractive/lazyOnload with pages dir - handled in insertStylesheets function
        if (stylesheets) {
            stylesheets.forEach((styleSrc)=>{
                _reactdom.default.preinit(styleSrc, {
                    as: 'style'
                });
            });
        }
        // Before interactive scripts need to be loaded by Next.js' runtime instead
        // of native <script> tags, because they no longer have `defer`.
        if (strategy === 'beforeInteractive') {
            if (!src) {
                // For inlined scripts, we put the content in `children`.
                if (restProps.dangerouslySetInnerHTML) {
                    // Casting since lib.dom.d.ts doesn't have TrustedHTML yet.
                    restProps.children = restProps.dangerouslySetInnerHTML.__html;
                    delete restProps.dangerouslySetInnerHTML;
                }
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
                    nonce: nonce,
                    dangerouslySetInnerHTML: {
                        __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([
                            0,
                            {
                                ...restProps,
                                id
                            }
                        ])})`
                    }
                });
            } else {
                // @ts-ignore
                _reactdom.default.preload(src, restProps.integrity ? {
                    as: 'script',
                    integrity: restProps.integrity,
                    nonce,
                    crossOrigin: restProps.crossOrigin
                } : {
                    as: 'script',
                    nonce,
                    crossOrigin: restProps.crossOrigin
                });
                return /*#__PURE__*/ (0, _jsxruntime.jsx)("script", {
                    nonce: nonce,
                    dangerouslySetInnerHTML: {
                        __html: `(self.__next_s=self.__next_s||[]).push(${JSON.stringify([
                            src,
                            {
                                ...restProps,
                                id
                            }
                        ])})`
                    }
                });
            }
        } else if (strategy === 'afterInteractive') {
            if (src) {
                // @ts-ignore
                _reactdom.default.preload(src, restProps.integrity ? {
                    as: 'script',
                    integrity: restProps.integrity,
                    nonce,
                    crossOrigin: restProps.crossOrigin
                } : {
                    as: 'script',
                    nonce,
                    crossOrigin: restProps.crossOrigin
                });
            }
        }
    }
    return null;
}
Object.defineProperty(Script, '__nextScript', {
    value: true
});
const _default = Script;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=script.js.map
}),
"[project]/node_modules/next/script.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/client/script.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_f8416ba4._.js.map