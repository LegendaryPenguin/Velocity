module.exports = [
"[project]/node_modules/js-sha3/src/sha3.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */ /*jslint bitwise: true */ (function() {
    'use strict';
    var INPUT_ERROR = 'input is invalid type';
    var FINALIZE_ERROR = 'finalize already called';
    var WINDOW = ("TURBOPACK compile-time value", "undefined") === 'object';
    var root = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : {};
    if (root.JS_SHA3_NO_WINDOW) {
        WINDOW = false;
    }
    var WEB_WORKER = !WINDOW && typeof self === 'object';
    var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === 'object' && process.versions && process.versions.node;
    if (NODE_JS) {
        root = /*TURBOPACK member replacement*/ __turbopack_context__.g;
    } else if (WEB_WORKER) {
        root = self;
    }
    var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && ("TURBOPACK compile-time value", "object") === 'object' && module.exports;
    var AMD = typeof define === 'function' && define.amd;
    var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== 'undefined';
    var HEX_CHARS = '0123456789abcdef'.split('');
    var SHAKE_PADDING = [
        31,
        7936,
        2031616,
        520093696
    ];
    var CSHAKE_PADDING = [
        4,
        1024,
        262144,
        67108864
    ];
    var KECCAK_PADDING = [
        1,
        256,
        65536,
        16777216
    ];
    var PADDING = [
        6,
        1536,
        393216,
        100663296
    ];
    var SHIFT = [
        0,
        8,
        16,
        24
    ];
    var RC = [
        1,
        0,
        32898,
        0,
        32906,
        2147483648,
        2147516416,
        2147483648,
        32907,
        0,
        2147483649,
        0,
        2147516545,
        2147483648,
        32777,
        2147483648,
        138,
        0,
        136,
        0,
        2147516425,
        0,
        2147483658,
        0,
        2147516555,
        0,
        139,
        2147483648,
        32905,
        2147483648,
        32771,
        2147483648,
        32770,
        2147483648,
        128,
        2147483648,
        32778,
        0,
        2147483658,
        2147483648,
        2147516545,
        2147483648,
        32896,
        2147483648,
        2147483649,
        0,
        2147516424,
        2147483648
    ];
    var BITS = [
        224,
        256,
        384,
        512
    ];
    var SHAKE_BITS = [
        128,
        256
    ];
    var OUTPUT_TYPES = [
        'hex',
        'buffer',
        'arrayBuffer',
        'array',
        'digest'
    ];
    var CSHAKE_BYTEPAD = {
        '128': 168,
        '256': 136
    };
    if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
        Array.isArray = function(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        };
    }
    if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
        ArrayBuffer.isView = function(obj) {
            return typeof obj === 'object' && obj.buffer && obj.buffer.constructor === ArrayBuffer;
        };
    }
    var createOutputMethod = function(bits, padding, outputType) {
        return function(message) {
            return new Keccak(bits, padding, bits).update(message)[outputType]();
        };
    };
    var createShakeOutputMethod = function(bits, padding, outputType) {
        return function(message, outputBits) {
            return new Keccak(bits, padding, outputBits).update(message)[outputType]();
        };
    };
    var createCshakeOutputMethod = function(bits, padding, outputType) {
        return function(message, outputBits, n, s) {
            return methods['cshake' + bits].update(message, outputBits, n, s)[outputType]();
        };
    };
    var createKmacOutputMethod = function(bits, padding, outputType) {
        return function(key, message, outputBits, s) {
            return methods['kmac' + bits].update(key, message, outputBits, s)[outputType]();
        };
    };
    var createOutputMethods = function(method, createMethod, bits, padding) {
        for(var i = 0; i < OUTPUT_TYPES.length; ++i){
            var type = OUTPUT_TYPES[i];
            method[type] = createMethod(bits, padding, type);
        }
        return method;
    };
    var createMethod = function(bits, padding) {
        var method = createOutputMethod(bits, padding, 'hex');
        method.create = function() {
            return new Keccak(bits, padding, bits);
        };
        method.update = function(message) {
            return method.create().update(message);
        };
        return createOutputMethods(method, createOutputMethod, bits, padding);
    };
    var createShakeMethod = function(bits, padding) {
        var method = createShakeOutputMethod(bits, padding, 'hex');
        method.create = function(outputBits) {
            return new Keccak(bits, padding, outputBits);
        };
        method.update = function(message, outputBits) {
            return method.create(outputBits).update(message);
        };
        return createOutputMethods(method, createShakeOutputMethod, bits, padding);
    };
    var createCshakeMethod = function(bits, padding) {
        var w = CSHAKE_BYTEPAD[bits];
        var method = createCshakeOutputMethod(bits, padding, 'hex');
        method.create = function(outputBits, n, s) {
            if (!n && !s) {
                return methods['shake' + bits].create(outputBits);
            } else {
                return new Keccak(bits, padding, outputBits).bytepad([
                    n,
                    s
                ], w);
            }
        };
        method.update = function(message, outputBits, n, s) {
            return method.create(outputBits, n, s).update(message);
        };
        return createOutputMethods(method, createCshakeOutputMethod, bits, padding);
    };
    var createKmacMethod = function(bits, padding) {
        var w = CSHAKE_BYTEPAD[bits];
        var method = createKmacOutputMethod(bits, padding, 'hex');
        method.create = function(key, outputBits, s) {
            return new Kmac(bits, padding, outputBits).bytepad([
                'KMAC',
                s
            ], w).bytepad([
                key
            ], w);
        };
        method.update = function(key, message, outputBits, s) {
            return method.create(key, outputBits, s).update(message);
        };
        return createOutputMethods(method, createKmacOutputMethod, bits, padding);
    };
    var algorithms = [
        {
            name: 'keccak',
            padding: KECCAK_PADDING,
            bits: BITS,
            createMethod: createMethod
        },
        {
            name: 'sha3',
            padding: PADDING,
            bits: BITS,
            createMethod: createMethod
        },
        {
            name: 'shake',
            padding: SHAKE_PADDING,
            bits: SHAKE_BITS,
            createMethod: createShakeMethod
        },
        {
            name: 'cshake',
            padding: CSHAKE_PADDING,
            bits: SHAKE_BITS,
            createMethod: createCshakeMethod
        },
        {
            name: 'kmac',
            padding: CSHAKE_PADDING,
            bits: SHAKE_BITS,
            createMethod: createKmacMethod
        }
    ];
    var methods = {}, methodNames = [];
    for(var i = 0; i < algorithms.length; ++i){
        var algorithm = algorithms[i];
        var bits = algorithm.bits;
        for(var j = 0; j < bits.length; ++j){
            var methodName = algorithm.name + '_' + bits[j];
            methodNames.push(methodName);
            methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
            if (algorithm.name !== 'sha3') {
                var newMethodName = algorithm.name + bits[j];
                methodNames.push(newMethodName);
                methods[newMethodName] = methods[methodName];
            }
        }
    }
    function Keccak(bits, padding, outputBits) {
        this.blocks = [];
        this.s = [];
        this.padding = padding;
        this.outputBits = outputBits;
        this.reset = true;
        this.finalized = false;
        this.block = 0;
        this.start = 0;
        this.blockCount = 1600 - (bits << 1) >> 5;
        this.byteCount = this.blockCount << 2;
        this.outputBlocks = outputBits >> 5;
        this.extraBytes = (outputBits & 31) >> 3;
        for(var i = 0; i < 50; ++i){
            this.s[i] = 0;
        }
    }
    Keccak.prototype.update = function(message) {
        if (this.finalized) {
            throw new Error(FINALIZE_ERROR);
        }
        var notString, type = typeof message;
        if (type !== 'string') {
            if (type === 'object') {
                if (message === null) {
                    throw new Error(INPUT_ERROR);
                } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
                    message = new Uint8Array(message);
                } else if (!Array.isArray(message)) {
                    if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
                        throw new Error(INPUT_ERROR);
                    }
                }
            } else {
                throw new Error(INPUT_ERROR);
            }
            notString = true;
        }
        var blocks = this.blocks, byteCount = this.byteCount, length = message.length, blockCount = this.blockCount, index = 0, s = this.s, i, code;
        while(index < length){
            if (this.reset) {
                this.reset = false;
                blocks[0] = this.block;
                for(i = 1; i < blockCount + 1; ++i){
                    blocks[i] = 0;
                }
            }
            if (notString) {
                for(i = this.start; index < length && i < byteCount; ++index){
                    blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
                }
            } else {
                for(i = this.start; index < length && i < byteCount; ++index){
                    code = message.charCodeAt(index);
                    if (code < 0x80) {
                        blocks[i >> 2] |= code << SHIFT[i++ & 3];
                    } else if (code < 0x800) {
                        blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                    } else if (code < 0xd800 || code >= 0xe000) {
                        blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                    } else {
                        code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
                        blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[i++ & 3];
                        blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[i++ & 3];
                    }
                }
            }
            this.lastByteIndex = i;
            if (i >= byteCount) {
                this.start = i - byteCount;
                this.block = blocks[blockCount];
                for(i = 0; i < blockCount; ++i){
                    s[i] ^= blocks[i];
                }
                f(s);
                this.reset = true;
            } else {
                this.start = i;
            }
        }
        return this;
    };
    Keccak.prototype.encode = function(x, right) {
        var o = x & 255, n = 1;
        var bytes = [
            o
        ];
        x = x >> 8;
        o = x & 255;
        while(o > 0){
            bytes.unshift(o);
            x = x >> 8;
            o = x & 255;
            ++n;
        }
        if (right) {
            bytes.push(n);
        } else {
            bytes.unshift(n);
        }
        this.update(bytes);
        return bytes.length;
    };
    Keccak.prototype.encodeString = function(str) {
        var notString, type = typeof str;
        if (type !== 'string') {
            if (type === 'object') {
                if (str === null) {
                    throw new Error(INPUT_ERROR);
                } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
                    str = new Uint8Array(str);
                } else if (!Array.isArray(str)) {
                    if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
                        throw new Error(INPUT_ERROR);
                    }
                }
            } else {
                throw new Error(INPUT_ERROR);
            }
            notString = true;
        }
        var bytes = 0, length = str.length;
        if (notString) {
            bytes = length;
        } else {
            for(var i = 0; i < str.length; ++i){
                var code = str.charCodeAt(i);
                if (code < 0x80) {
                    bytes += 1;
                } else if (code < 0x800) {
                    bytes += 2;
                } else if (code < 0xd800 || code >= 0xe000) {
                    bytes += 3;
                } else {
                    code = 0x10000 + ((code & 0x3ff) << 10 | str.charCodeAt(++i) & 0x3ff);
                    bytes += 4;
                }
            }
        }
        bytes += this.encode(bytes * 8);
        this.update(str);
        return bytes;
    };
    Keccak.prototype.bytepad = function(strs, w) {
        var bytes = this.encode(w);
        for(var i = 0; i < strs.length; ++i){
            bytes += this.encodeString(strs[i]);
        }
        var paddingBytes = w - bytes % w;
        var zeros = [];
        zeros.length = paddingBytes;
        this.update(zeros);
        return this;
    };
    Keccak.prototype.finalize = function() {
        if (this.finalized) {
            return;
        }
        this.finalized = true;
        var blocks = this.blocks, i = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
        blocks[i >> 2] |= this.padding[i & 3];
        if (this.lastByteIndex === this.byteCount) {
            blocks[0] = blocks[blockCount];
            for(i = 1; i < blockCount + 1; ++i){
                blocks[i] = 0;
            }
        }
        blocks[blockCount - 1] |= 0x80000000;
        for(i = 0; i < blockCount; ++i){
            s[i] ^= blocks[i];
        }
        f(s);
    };
    Keccak.prototype.toString = Keccak.prototype.hex = function() {
        this.finalize();
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i = 0, j = 0;
        var hex = '', block;
        while(j < outputBlocks){
            for(i = 0; i < blockCount && j < outputBlocks; ++i, ++j){
                block = s[i];
                hex += HEX_CHARS[block >> 4 & 0x0F] + HEX_CHARS[block & 0x0F] + HEX_CHARS[block >> 12 & 0x0F] + HEX_CHARS[block >> 8 & 0x0F] + HEX_CHARS[block >> 20 & 0x0F] + HEX_CHARS[block >> 16 & 0x0F] + HEX_CHARS[block >> 28 & 0x0F] + HEX_CHARS[block >> 24 & 0x0F];
            }
            if (j % blockCount === 0) {
                f(s);
                i = 0;
            }
        }
        if (extraBytes) {
            block = s[i];
            hex += HEX_CHARS[block >> 4 & 0x0F] + HEX_CHARS[block & 0x0F];
            if (extraBytes > 1) {
                hex += HEX_CHARS[block >> 12 & 0x0F] + HEX_CHARS[block >> 8 & 0x0F];
            }
            if (extraBytes > 2) {
                hex += HEX_CHARS[block >> 20 & 0x0F] + HEX_CHARS[block >> 16 & 0x0F];
            }
        }
        return hex;
    };
    Keccak.prototype.arrayBuffer = function() {
        this.finalize();
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i = 0, j = 0;
        var bytes = this.outputBits >> 3;
        var buffer;
        if (extraBytes) {
            buffer = new ArrayBuffer(outputBlocks + 1 << 2);
        } else {
            buffer = new ArrayBuffer(bytes);
        }
        var array = new Uint32Array(buffer);
        while(j < outputBlocks){
            for(i = 0; i < blockCount && j < outputBlocks; ++i, ++j){
                array[j] = s[i];
            }
            if (j % blockCount === 0) {
                f(s);
            }
        }
        if (extraBytes) {
            array[i] = s[i];
            buffer = buffer.slice(0, bytes);
        }
        return buffer;
    };
    Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;
    Keccak.prototype.digest = Keccak.prototype.array = function() {
        this.finalize();
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i = 0, j = 0;
        var array = [], offset, block;
        while(j < outputBlocks){
            for(i = 0; i < blockCount && j < outputBlocks; ++i, ++j){
                offset = j << 2;
                block = s[i];
                array[offset] = block & 0xFF;
                array[offset + 1] = block >> 8 & 0xFF;
                array[offset + 2] = block >> 16 & 0xFF;
                array[offset + 3] = block >> 24 & 0xFF;
            }
            if (j % blockCount === 0) {
                f(s);
            }
        }
        if (extraBytes) {
            offset = j << 2;
            block = s[i];
            array[offset] = block & 0xFF;
            if (extraBytes > 1) {
                array[offset + 1] = block >> 8 & 0xFF;
            }
            if (extraBytes > 2) {
                array[offset + 2] = block >> 16 & 0xFF;
            }
        }
        return array;
    };
    function Kmac(bits, padding, outputBits) {
        Keccak.call(this, bits, padding, outputBits);
    }
    Kmac.prototype = new Keccak();
    Kmac.prototype.finalize = function() {
        this.encode(this.outputBits, true);
        return Keccak.prototype.finalize.call(this);
    };
    var f = function(s) {
        var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
        for(n = 0; n < 48; n += 2){
            c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
            c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
            c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
            c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
            c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
            c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
            c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
            c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
            c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
            c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
            h = c8 ^ (c2 << 1 | c3 >>> 31);
            l = c9 ^ (c3 << 1 | c2 >>> 31);
            s[0] ^= h;
            s[1] ^= l;
            s[10] ^= h;
            s[11] ^= l;
            s[20] ^= h;
            s[21] ^= l;
            s[30] ^= h;
            s[31] ^= l;
            s[40] ^= h;
            s[41] ^= l;
            h = c0 ^ (c4 << 1 | c5 >>> 31);
            l = c1 ^ (c5 << 1 | c4 >>> 31);
            s[2] ^= h;
            s[3] ^= l;
            s[12] ^= h;
            s[13] ^= l;
            s[22] ^= h;
            s[23] ^= l;
            s[32] ^= h;
            s[33] ^= l;
            s[42] ^= h;
            s[43] ^= l;
            h = c2 ^ (c6 << 1 | c7 >>> 31);
            l = c3 ^ (c7 << 1 | c6 >>> 31);
            s[4] ^= h;
            s[5] ^= l;
            s[14] ^= h;
            s[15] ^= l;
            s[24] ^= h;
            s[25] ^= l;
            s[34] ^= h;
            s[35] ^= l;
            s[44] ^= h;
            s[45] ^= l;
            h = c4 ^ (c8 << 1 | c9 >>> 31);
            l = c5 ^ (c9 << 1 | c8 >>> 31);
            s[6] ^= h;
            s[7] ^= l;
            s[16] ^= h;
            s[17] ^= l;
            s[26] ^= h;
            s[27] ^= l;
            s[36] ^= h;
            s[37] ^= l;
            s[46] ^= h;
            s[47] ^= l;
            h = c6 ^ (c0 << 1 | c1 >>> 31);
            l = c7 ^ (c1 << 1 | c0 >>> 31);
            s[8] ^= h;
            s[9] ^= l;
            s[18] ^= h;
            s[19] ^= l;
            s[28] ^= h;
            s[29] ^= l;
            s[38] ^= h;
            s[39] ^= l;
            s[48] ^= h;
            s[49] ^= l;
            b0 = s[0];
            b1 = s[1];
            b32 = s[11] << 4 | s[10] >>> 28;
            b33 = s[10] << 4 | s[11] >>> 28;
            b14 = s[20] << 3 | s[21] >>> 29;
            b15 = s[21] << 3 | s[20] >>> 29;
            b46 = s[31] << 9 | s[30] >>> 23;
            b47 = s[30] << 9 | s[31] >>> 23;
            b28 = s[40] << 18 | s[41] >>> 14;
            b29 = s[41] << 18 | s[40] >>> 14;
            b20 = s[2] << 1 | s[3] >>> 31;
            b21 = s[3] << 1 | s[2] >>> 31;
            b2 = s[13] << 12 | s[12] >>> 20;
            b3 = s[12] << 12 | s[13] >>> 20;
            b34 = s[22] << 10 | s[23] >>> 22;
            b35 = s[23] << 10 | s[22] >>> 22;
            b16 = s[33] << 13 | s[32] >>> 19;
            b17 = s[32] << 13 | s[33] >>> 19;
            b48 = s[42] << 2 | s[43] >>> 30;
            b49 = s[43] << 2 | s[42] >>> 30;
            b40 = s[5] << 30 | s[4] >>> 2;
            b41 = s[4] << 30 | s[5] >>> 2;
            b22 = s[14] << 6 | s[15] >>> 26;
            b23 = s[15] << 6 | s[14] >>> 26;
            b4 = s[25] << 11 | s[24] >>> 21;
            b5 = s[24] << 11 | s[25] >>> 21;
            b36 = s[34] << 15 | s[35] >>> 17;
            b37 = s[35] << 15 | s[34] >>> 17;
            b18 = s[45] << 29 | s[44] >>> 3;
            b19 = s[44] << 29 | s[45] >>> 3;
            b10 = s[6] << 28 | s[7] >>> 4;
            b11 = s[7] << 28 | s[6] >>> 4;
            b42 = s[17] << 23 | s[16] >>> 9;
            b43 = s[16] << 23 | s[17] >>> 9;
            b24 = s[26] << 25 | s[27] >>> 7;
            b25 = s[27] << 25 | s[26] >>> 7;
            b6 = s[36] << 21 | s[37] >>> 11;
            b7 = s[37] << 21 | s[36] >>> 11;
            b38 = s[47] << 24 | s[46] >>> 8;
            b39 = s[46] << 24 | s[47] >>> 8;
            b30 = s[8] << 27 | s[9] >>> 5;
            b31 = s[9] << 27 | s[8] >>> 5;
            b12 = s[18] << 20 | s[19] >>> 12;
            b13 = s[19] << 20 | s[18] >>> 12;
            b44 = s[29] << 7 | s[28] >>> 25;
            b45 = s[28] << 7 | s[29] >>> 25;
            b26 = s[38] << 8 | s[39] >>> 24;
            b27 = s[39] << 8 | s[38] >>> 24;
            b8 = s[48] << 14 | s[49] >>> 18;
            b9 = s[49] << 14 | s[48] >>> 18;
            s[0] = b0 ^ ~b2 & b4;
            s[1] = b1 ^ ~b3 & b5;
            s[10] = b10 ^ ~b12 & b14;
            s[11] = b11 ^ ~b13 & b15;
            s[20] = b20 ^ ~b22 & b24;
            s[21] = b21 ^ ~b23 & b25;
            s[30] = b30 ^ ~b32 & b34;
            s[31] = b31 ^ ~b33 & b35;
            s[40] = b40 ^ ~b42 & b44;
            s[41] = b41 ^ ~b43 & b45;
            s[2] = b2 ^ ~b4 & b6;
            s[3] = b3 ^ ~b5 & b7;
            s[12] = b12 ^ ~b14 & b16;
            s[13] = b13 ^ ~b15 & b17;
            s[22] = b22 ^ ~b24 & b26;
            s[23] = b23 ^ ~b25 & b27;
            s[32] = b32 ^ ~b34 & b36;
            s[33] = b33 ^ ~b35 & b37;
            s[42] = b42 ^ ~b44 & b46;
            s[43] = b43 ^ ~b45 & b47;
            s[4] = b4 ^ ~b6 & b8;
            s[5] = b5 ^ ~b7 & b9;
            s[14] = b14 ^ ~b16 & b18;
            s[15] = b15 ^ ~b17 & b19;
            s[24] = b24 ^ ~b26 & b28;
            s[25] = b25 ^ ~b27 & b29;
            s[34] = b34 ^ ~b36 & b38;
            s[35] = b35 ^ ~b37 & b39;
            s[44] = b44 ^ ~b46 & b48;
            s[45] = b45 ^ ~b47 & b49;
            s[6] = b6 ^ ~b8 & b0;
            s[7] = b7 ^ ~b9 & b1;
            s[16] = b16 ^ ~b18 & b10;
            s[17] = b17 ^ ~b19 & b11;
            s[26] = b26 ^ ~b28 & b20;
            s[27] = b27 ^ ~b29 & b21;
            s[36] = b36 ^ ~b38 & b30;
            s[37] = b37 ^ ~b39 & b31;
            s[46] = b46 ^ ~b48 & b40;
            s[47] = b47 ^ ~b49 & b41;
            s[8] = b8 ^ ~b0 & b2;
            s[9] = b9 ^ ~b1 & b3;
            s[18] = b18 ^ ~b10 & b12;
            s[19] = b19 ^ ~b11 & b13;
            s[28] = b28 ^ ~b20 & b22;
            s[29] = b29 ^ ~b21 & b23;
            s[38] = b38 ^ ~b30 & b32;
            s[39] = b39 ^ ~b31 & b33;
            s[48] = b48 ^ ~b40 & b42;
            s[49] = b49 ^ ~b41 & b43;
            s[0] ^= RC[n];
            s[1] ^= RC[n + 1];
        }
    };
    if (COMMON_JS) {
        module.exports = methods;
    } else {
        for(i = 0; i < methodNames.length; ++i){
            root[methodNames[i]] = methods[methodNames[i]];
        }
        if (AMD) {
            ((r)=>r !== undefined && __turbopack_context__.v(r))(function() {
                return methods;
            }(__turbopack_context__.r, exports, module));
        }
    }
})();
}),
"[project]/node_modules/@ethersproject/logger/lib.esm/_version.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "version",
    ()=>version
]);
const version = "logger/5.8.0"; //# sourceMappingURL=_version.js.map
}),
"[project]/node_modules/@ethersproject/logger/lib.esm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ErrorCode",
    ()=>ErrorCode,
    "LogLevel",
    ()=>LogLevel,
    "Logger",
    ()=>Logger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$logger$2f$lib$2e$esm$2f$_version$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ethersproject/logger/lib.esm/_version.js [app-route] (ecmascript)");
"use strict";
let _permanentCensorErrors = false;
let _censorErrors = false;
const LogLevels = {
    debug: 1,
    "default": 2,
    info: 2,
    warning: 3,
    error: 4,
    off: 5
};
let _logLevel = LogLevels["default"];
;
let _globalLogger = null;
function _checkNormalize() {
    try {
        const missing = [];
        // Make sure all forms of normalization are supported
        [
            "NFD",
            "NFC",
            "NFKD",
            "NFKC"
        ].forEach((form)=>{
            try {
                if ("test".normalize(form) !== "test") {
                    throw new Error("bad normalize");
                }
                ;
            } catch (error) {
                missing.push(form);
            }
        });
        if (missing.length) {
            throw new Error("missing " + missing.join(", "));
        }
        if (String.fromCharCode(0xe9).normalize("NFD") !== String.fromCharCode(0x65, 0x0301)) {
            throw new Error("broken implementation");
        }
    } catch (error) {
        return error.message;
    }
    return null;
}
const _normalizeError = _checkNormalize();
var LogLevel;
(function(LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["OFF"] = "OFF";
})(LogLevel || (LogLevel = {}));
var ErrorCode;
(function(ErrorCode) {
    ///////////////////
    // Generic Errors
    // Unknown Error
    ErrorCode["UNKNOWN_ERROR"] = "UNKNOWN_ERROR";
    // Not Implemented
    ErrorCode["NOT_IMPLEMENTED"] = "NOT_IMPLEMENTED";
    // Unsupported Operation
    //   - operation
    ErrorCode["UNSUPPORTED_OPERATION"] = "UNSUPPORTED_OPERATION";
    // Network Error (i.e. Ethereum Network, such as an invalid chain ID)
    //   - event ("noNetwork" is not re-thrown in provider.ready; otherwise thrown)
    ErrorCode["NETWORK_ERROR"] = "NETWORK_ERROR";
    // Some sort of bad response from the server
    ErrorCode["SERVER_ERROR"] = "SERVER_ERROR";
    // Timeout
    ErrorCode["TIMEOUT"] = "TIMEOUT";
    ///////////////////
    // Operational  Errors
    // Buffer Overrun
    ErrorCode["BUFFER_OVERRUN"] = "BUFFER_OVERRUN";
    // Numeric Fault
    //   - operation: the operation being executed
    //   - fault: the reason this faulted
    ErrorCode["NUMERIC_FAULT"] = "NUMERIC_FAULT";
    ///////////////////
    // Argument Errors
    // Missing new operator to an object
    //  - name: The name of the class
    ErrorCode["MISSING_NEW"] = "MISSING_NEW";
    // Invalid argument (e.g. value is incompatible with type) to a function:
    //   - argument: The argument name that was invalid
    //   - value: The value of the argument
    ErrorCode["INVALID_ARGUMENT"] = "INVALID_ARGUMENT";
    // Missing argument to a function:
    //   - count: The number of arguments received
    //   - expectedCount: The number of arguments expected
    ErrorCode["MISSING_ARGUMENT"] = "MISSING_ARGUMENT";
    // Too many arguments
    //   - count: The number of arguments received
    //   - expectedCount: The number of arguments expected
    ErrorCode["UNEXPECTED_ARGUMENT"] = "UNEXPECTED_ARGUMENT";
    ///////////////////
    // Blockchain Errors
    // Call exception
    //  - transaction: the transaction
    //  - address?: the contract address
    //  - args?: The arguments passed into the function
    //  - method?: The Solidity method signature
    //  - errorSignature?: The EIP848 error signature
    //  - errorArgs?: The EIP848 error parameters
    //  - reason: The reason (only for EIP848 "Error(string)")
    ErrorCode["CALL_EXCEPTION"] = "CALL_EXCEPTION";
    // Insufficient funds (< value + gasLimit * gasPrice)
    //   - transaction: the transaction attempted
    ErrorCode["INSUFFICIENT_FUNDS"] = "INSUFFICIENT_FUNDS";
    // Nonce has already been used
    //   - transaction: the transaction attempted
    ErrorCode["NONCE_EXPIRED"] = "NONCE_EXPIRED";
    // The replacement fee for the transaction is too low
    //   - transaction: the transaction attempted
    ErrorCode["REPLACEMENT_UNDERPRICED"] = "REPLACEMENT_UNDERPRICED";
    // The gas limit could not be estimated
    //   - transaction: the transaction passed to estimateGas
    ErrorCode["UNPREDICTABLE_GAS_LIMIT"] = "UNPREDICTABLE_GAS_LIMIT";
    // The transaction was replaced by one with a higher gas price
    //   - reason: "cancelled", "replaced" or "repriced"
    //   - cancelled: true if reason == "cancelled" or reason == "replaced")
    //   - hash: original transaction hash
    //   - replacement: the full TransactionsResponse for the replacement
    //   - receipt: the receipt of the replacement
    ErrorCode["TRANSACTION_REPLACED"] = "TRANSACTION_REPLACED";
    ///////////////////
    // Interaction Errors
    // The user rejected the action, such as signing a message or sending
    // a transaction
    ErrorCode["ACTION_REJECTED"] = "ACTION_REJECTED";
})(ErrorCode || (ErrorCode = {}));
;
const HEX = "0123456789abcdef";
class Logger {
    constructor(version){
        Object.defineProperty(this, "version", {
            enumerable: true,
            value: version,
            writable: false
        });
    }
    _log(logLevel, args) {
        const level = logLevel.toLowerCase();
        if (LogLevels[level] == null) {
            this.throwArgumentError("invalid log level name", "logLevel", logLevel);
        }
        if (_logLevel > LogLevels[level]) {
            return;
        }
        console.log.apply(console, args);
    }
    debug(...args) {
        this._log(Logger.levels.DEBUG, args);
    }
    info(...args) {
        this._log(Logger.levels.INFO, args);
    }
    warn(...args) {
        this._log(Logger.levels.WARNING, args);
    }
    makeError(message, code, params) {
        // Errors are being censored
        if (_censorErrors) {
            return this.makeError("censored error", code, {});
        }
        if (!code) {
            code = Logger.errors.UNKNOWN_ERROR;
        }
        if (!params) {
            params = {};
        }
        const messageDetails = [];
        Object.keys(params).forEach((key)=>{
            const value = params[key];
            try {
                if (value instanceof Uint8Array) {
                    let hex = "";
                    for(let i = 0; i < value.length; i++){
                        hex += HEX[value[i] >> 4];
                        hex += HEX[value[i] & 0x0f];
                    }
                    messageDetails.push(key + "=Uint8Array(0x" + hex + ")");
                } else {
                    messageDetails.push(key + "=" + JSON.stringify(value));
                }
            } catch (error) {
                messageDetails.push(key + "=" + JSON.stringify(params[key].toString()));
            }
        });
        messageDetails.push(`code=${code}`);
        messageDetails.push(`version=${this.version}`);
        const reason = message;
        let url = "";
        switch(code){
            case ErrorCode.NUMERIC_FAULT:
                {
                    url = "NUMERIC_FAULT";
                    const fault = message;
                    switch(fault){
                        case "overflow":
                        case "underflow":
                        case "division-by-zero":
                            url += "-" + fault;
                            break;
                        case "negative-power":
                        case "negative-width":
                            url += "-unsupported";
                            break;
                        case "unbound-bitwise-result":
                            url += "-unbound-result";
                            break;
                    }
                    break;
                }
            case ErrorCode.CALL_EXCEPTION:
            case ErrorCode.INSUFFICIENT_FUNDS:
            case ErrorCode.MISSING_NEW:
            case ErrorCode.NONCE_EXPIRED:
            case ErrorCode.REPLACEMENT_UNDERPRICED:
            case ErrorCode.TRANSACTION_REPLACED:
            case ErrorCode.UNPREDICTABLE_GAS_LIMIT:
                url = code;
                break;
        }
        if (url) {
            message += " [ See: https:/\/links.ethers.org/v5-errors-" + url + " ]";
        }
        if (messageDetails.length) {
            message += " (" + messageDetails.join(", ") + ")";
        }
        // @TODO: Any??
        const error = new Error(message);
        error.reason = reason;
        error.code = code;
        Object.keys(params).forEach(function(key) {
            error[key] = params[key];
        });
        return error;
    }
    throwError(message, code, params) {
        throw this.makeError(message, code, params);
    }
    throwArgumentError(message, name, value) {
        return this.throwError(message, Logger.errors.INVALID_ARGUMENT, {
            argument: name,
            value: value
        });
    }
    assert(condition, message, code, params) {
        if (!!condition) {
            return;
        }
        this.throwError(message, code, params);
    }
    assertArgument(condition, message, name, value) {
        if (!!condition) {
            return;
        }
        this.throwArgumentError(message, name, value);
    }
    checkNormalize(message) {
        if (message == null) {
            message = "platform missing String.prototype.normalize";
        }
        if (_normalizeError) {
            this.throwError("platform missing String.prototype.normalize", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "String.prototype.normalize",
                form: _normalizeError
            });
        }
    }
    checkSafeUint53(value, message) {
        if (typeof value !== "number") {
            return;
        }
        if (message == null) {
            message = "value not safe";
        }
        if (value < 0 || value >= 0x1fffffffffffff) {
            this.throwError(message, Logger.errors.NUMERIC_FAULT, {
                operation: "checkSafeInteger",
                fault: "out-of-safe-range",
                value: value
            });
        }
        if (value % 1) {
            this.throwError(message, Logger.errors.NUMERIC_FAULT, {
                operation: "checkSafeInteger",
                fault: "non-integer",
                value: value
            });
        }
    }
    checkArgumentCount(count, expectedCount, message) {
        if (message) {
            message = ": " + message;
        } else {
            message = "";
        }
        if (count < expectedCount) {
            this.throwError("missing argument" + message, Logger.errors.MISSING_ARGUMENT, {
                count: count,
                expectedCount: expectedCount
            });
        }
        if (count > expectedCount) {
            this.throwError("too many arguments" + message, Logger.errors.UNEXPECTED_ARGUMENT, {
                count: count,
                expectedCount: expectedCount
            });
        }
    }
    checkNew(target, kind) {
        if (target === Object || target == null) {
            this.throwError("missing new", Logger.errors.MISSING_NEW, {
                name: kind.name
            });
        }
    }
    checkAbstract(target, kind) {
        if (target === kind) {
            this.throwError("cannot instantiate abstract class " + JSON.stringify(kind.name) + " directly; use a sub-class", Logger.errors.UNSUPPORTED_OPERATION, {
                name: target.name,
                operation: "new"
            });
        } else if (target === Object || target == null) {
            this.throwError("missing new", Logger.errors.MISSING_NEW, {
                name: kind.name
            });
        }
    }
    static globalLogger() {
        if (!_globalLogger) {
            _globalLogger = new Logger(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$logger$2f$lib$2e$esm$2f$_version$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["version"]);
        }
        return _globalLogger;
    }
    static setCensorship(censorship, permanent) {
        if (!censorship && permanent) {
            this.globalLogger().throwError("cannot permanently disable censorship", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "setCensorship"
            });
        }
        if (_permanentCensorErrors) {
            if (!censorship) {
                return;
            }
            this.globalLogger().throwError("error censorship permanent", Logger.errors.UNSUPPORTED_OPERATION, {
                operation: "setCensorship"
            });
        }
        _censorErrors = !!censorship;
        _permanentCensorErrors = !!permanent;
    }
    static setLogLevel(logLevel) {
        const level = LogLevels[logLevel.toLowerCase()];
        if (level == null) {
            Logger.globalLogger().warn("invalid log level - " + logLevel);
            return;
        }
        _logLevel = level;
    }
    static from(version) {
        return new Logger(version);
    }
}
Logger.errors = ErrorCode;
Logger.levels = LogLevel; //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@ethersproject/bytes/lib.esm/_version.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "version",
    ()=>version
]);
const version = "bytes/5.8.0"; //# sourceMappingURL=_version.js.map
}),
"[project]/node_modules/@ethersproject/bytes/lib.esm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "arrayify",
    ()=>arrayify,
    "concat",
    ()=>concat,
    "hexConcat",
    ()=>hexConcat,
    "hexDataLength",
    ()=>hexDataLength,
    "hexDataSlice",
    ()=>hexDataSlice,
    "hexStripZeros",
    ()=>hexStripZeros,
    "hexValue",
    ()=>hexValue,
    "hexZeroPad",
    ()=>hexZeroPad,
    "hexlify",
    ()=>hexlify,
    "isBytes",
    ()=>isBytes,
    "isBytesLike",
    ()=>isBytesLike,
    "isHexString",
    ()=>isHexString,
    "joinSignature",
    ()=>joinSignature,
    "splitSignature",
    ()=>splitSignature,
    "stripZeros",
    ()=>stripZeros,
    "zeroPad",
    ()=>zeroPad
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$logger$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ethersproject/logger/lib.esm/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$bytes$2f$lib$2e$esm$2f$_version$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ethersproject/bytes/lib.esm/_version.js [app-route] (ecmascript)");
"use strict";
;
;
const logger = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$logger$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Logger"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$bytes$2f$lib$2e$esm$2f$_version$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["version"]);
///////////////////////////////
function isHexable(value) {
    return !!value.toHexString;
}
function addSlice(array) {
    if (array.slice) {
        return array;
    }
    array.slice = function() {
        const args = Array.prototype.slice.call(arguments);
        return addSlice(new Uint8Array(Array.prototype.slice.apply(array, args)));
    };
    return array;
}
function isBytesLike(value) {
    return isHexString(value) && !(value.length % 2) || isBytes(value);
}
function isInteger(value) {
    return typeof value === "number" && value == value && value % 1 === 0;
}
function isBytes(value) {
    if (value == null) {
        return false;
    }
    if (value.constructor === Uint8Array) {
        return true;
    }
    if (typeof value === "string") {
        return false;
    }
    if (!isInteger(value.length) || value.length < 0) {
        return false;
    }
    for(let i = 0; i < value.length; i++){
        const v = value[i];
        if (!isInteger(v) || v < 0 || v >= 256) {
            return false;
        }
    }
    return true;
}
function arrayify(value, options) {
    if (!options) {
        options = {};
    }
    if (typeof value === "number") {
        logger.checkSafeUint53(value, "invalid arrayify value");
        const result = [];
        while(value){
            result.unshift(value & 0xff);
            value = parseInt(String(value / 256));
        }
        if (result.length === 0) {
            result.push(0);
        }
        return addSlice(new Uint8Array(result));
    }
    if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
        value = "0x" + value;
    }
    if (isHexable(value)) {
        value = value.toHexString();
    }
    if (isHexString(value)) {
        let hex = value.substring(2);
        if (hex.length % 2) {
            if (options.hexPad === "left") {
                hex = "0" + hex;
            } else if (options.hexPad === "right") {
                hex += "0";
            } else {
                logger.throwArgumentError("hex data is odd-length", "value", value);
            }
        }
        const result = [];
        for(let i = 0; i < hex.length; i += 2){
            result.push(parseInt(hex.substring(i, i + 2), 16));
        }
        return addSlice(new Uint8Array(result));
    }
    if (isBytes(value)) {
        return addSlice(new Uint8Array(value));
    }
    return logger.throwArgumentError("invalid arrayify value", "value", value);
}
function concat(items) {
    const objects = items.map((item)=>arrayify(item));
    const length = objects.reduce((accum, item)=>accum + item.length, 0);
    const result = new Uint8Array(length);
    objects.reduce((offset, object)=>{
        result.set(object, offset);
        return offset + object.length;
    }, 0);
    return addSlice(result);
}
function stripZeros(value) {
    let result = arrayify(value);
    if (result.length === 0) {
        return result;
    }
    // Find the first non-zero entry
    let start = 0;
    while(start < result.length && result[start] === 0){
        start++;
    }
    // If we started with zeros, strip them
    if (start) {
        result = result.slice(start);
    }
    return result;
}
function zeroPad(value, length) {
    value = arrayify(value);
    if (value.length > length) {
        logger.throwArgumentError("value out of range", "value", arguments[0]);
    }
    const result = new Uint8Array(length);
    result.set(value, length - value.length);
    return addSlice(result);
}
function isHexString(value, length) {
    if (typeof value !== "string" || !value.match(/^0x[0-9A-Fa-f]*$/)) {
        return false;
    }
    if (length && value.length !== 2 + 2 * length) {
        return false;
    }
    return true;
}
const HexCharacters = "0123456789abcdef";
function hexlify(value, options) {
    if (!options) {
        options = {};
    }
    if (typeof value === "number") {
        logger.checkSafeUint53(value, "invalid hexlify value");
        let hex = "";
        while(value){
            hex = HexCharacters[value & 0xf] + hex;
            value = Math.floor(value / 16);
        }
        if (hex.length) {
            if (hex.length % 2) {
                hex = "0" + hex;
            }
            return "0x" + hex;
        }
        return "0x00";
    }
    if (typeof value === "bigint") {
        value = value.toString(16);
        if (value.length % 2) {
            return "0x0" + value;
        }
        return "0x" + value;
    }
    if (options.allowMissingPrefix && typeof value === "string" && value.substring(0, 2) !== "0x") {
        value = "0x" + value;
    }
    if (isHexable(value)) {
        return value.toHexString();
    }
    if (isHexString(value)) {
        if (value.length % 2) {
            if (options.hexPad === "left") {
                value = "0x0" + value.substring(2);
            } else if (options.hexPad === "right") {
                value += "0";
            } else {
                logger.throwArgumentError("hex data is odd-length", "value", value);
            }
        }
        return value.toLowerCase();
    }
    if (isBytes(value)) {
        let result = "0x";
        for(let i = 0; i < value.length; i++){
            let v = value[i];
            result += HexCharacters[(v & 0xf0) >> 4] + HexCharacters[v & 0x0f];
        }
        return result;
    }
    return logger.throwArgumentError("invalid hexlify value", "value", value);
}
function hexDataLength(data) {
    if (typeof data !== "string") {
        data = hexlify(data);
    } else if (!isHexString(data) || data.length % 2) {
        return null;
    }
    return (data.length - 2) / 2;
}
function hexDataSlice(data, offset, endOffset) {
    if (typeof data !== "string") {
        data = hexlify(data);
    } else if (!isHexString(data) || data.length % 2) {
        logger.throwArgumentError("invalid hexData", "value", data);
    }
    offset = 2 + 2 * offset;
    if (endOffset != null) {
        return "0x" + data.substring(offset, 2 + 2 * endOffset);
    }
    return "0x" + data.substring(offset);
}
function hexConcat(items) {
    let result = "0x";
    items.forEach((item)=>{
        result += hexlify(item).substring(2);
    });
    return result;
}
function hexValue(value) {
    const trimmed = hexStripZeros(hexlify(value, {
        hexPad: "left"
    }));
    if (trimmed === "0x") {
        return "0x0";
    }
    return trimmed;
}
function hexStripZeros(value) {
    if (typeof value !== "string") {
        value = hexlify(value);
    }
    if (!isHexString(value)) {
        logger.throwArgumentError("invalid hex string", "value", value);
    }
    value = value.substring(2);
    let offset = 0;
    while(offset < value.length && value[offset] === "0"){
        offset++;
    }
    return "0x" + value.substring(offset);
}
function hexZeroPad(value, length) {
    if (typeof value !== "string") {
        value = hexlify(value);
    } else if (!isHexString(value)) {
        logger.throwArgumentError("invalid hex string", "value", value);
    }
    if (value.length > 2 * length + 2) {
        logger.throwArgumentError("value out of range", "value", arguments[1]);
    }
    while(value.length < 2 * length + 2){
        value = "0x0" + value.substring(2);
    }
    return value;
}
function splitSignature(signature) {
    const result = {
        r: "0x",
        s: "0x",
        _vs: "0x",
        recoveryParam: 0,
        v: 0,
        yParityAndS: "0x",
        compact: "0x"
    };
    if (isBytesLike(signature)) {
        let bytes = arrayify(signature);
        // Get the r, s and v
        if (bytes.length === 64) {
            // EIP-2098; pull the v from the top bit of s and clear it
            result.v = 27 + (bytes[32] >> 7);
            bytes[32] &= 0x7f;
            result.r = hexlify(bytes.slice(0, 32));
            result.s = hexlify(bytes.slice(32, 64));
        } else if (bytes.length === 65) {
            result.r = hexlify(bytes.slice(0, 32));
            result.s = hexlify(bytes.slice(32, 64));
            result.v = bytes[64];
        } else {
            logger.throwArgumentError("invalid signature string", "signature", signature);
        }
        // Allow a recid to be used as the v
        if (result.v < 27) {
            if (result.v === 0 || result.v === 1) {
                result.v += 27;
            } else {
                logger.throwArgumentError("signature invalid v byte", "signature", signature);
            }
        }
        // Compute recoveryParam from v
        result.recoveryParam = 1 - result.v % 2;
        // Compute _vs from recoveryParam and s
        if (result.recoveryParam) {
            bytes[32] |= 0x80;
        }
        result._vs = hexlify(bytes.slice(32, 64));
    } else {
        result.r = signature.r;
        result.s = signature.s;
        result.v = signature.v;
        result.recoveryParam = signature.recoveryParam;
        result._vs = signature._vs;
        // If the _vs is available, use it to populate missing s, v and recoveryParam
        // and verify non-missing s, v and recoveryParam
        if (result._vs != null) {
            const vs = zeroPad(arrayify(result._vs), 32);
            result._vs = hexlify(vs);
            // Set or check the recid
            const recoveryParam = vs[0] >= 128 ? 1 : 0;
            if (result.recoveryParam == null) {
                result.recoveryParam = recoveryParam;
            } else if (result.recoveryParam !== recoveryParam) {
                logger.throwArgumentError("signature recoveryParam mismatch _vs", "signature", signature);
            }
            // Set or check the s
            vs[0] &= 0x7f;
            const s = hexlify(vs);
            if (result.s == null) {
                result.s = s;
            } else if (result.s !== s) {
                logger.throwArgumentError("signature v mismatch _vs", "signature", signature);
            }
        }
        // Use recid and v to populate each other
        if (result.recoveryParam == null) {
            if (result.v == null) {
                logger.throwArgumentError("signature missing v and recoveryParam", "signature", signature);
            } else if (result.v === 0 || result.v === 1) {
                result.recoveryParam = result.v;
            } else {
                result.recoveryParam = 1 - result.v % 2;
            }
        } else {
            if (result.v == null) {
                result.v = 27 + result.recoveryParam;
            } else {
                const recId = result.v === 0 || result.v === 1 ? result.v : 1 - result.v % 2;
                if (result.recoveryParam !== recId) {
                    logger.throwArgumentError("signature recoveryParam mismatch v", "signature", signature);
                }
            }
        }
        if (result.r == null || !isHexString(result.r)) {
            logger.throwArgumentError("signature missing or invalid r", "signature", signature);
        } else {
            result.r = hexZeroPad(result.r, 32);
        }
        if (result.s == null || !isHexString(result.s)) {
            logger.throwArgumentError("signature missing or invalid s", "signature", signature);
        } else {
            result.s = hexZeroPad(result.s, 32);
        }
        const vs = arrayify(result.s);
        if (vs[0] >= 128) {
            logger.throwArgumentError("signature s out of range", "signature", signature);
        }
        if (result.recoveryParam) {
            vs[0] |= 0x80;
        }
        const _vs = hexlify(vs);
        if (result._vs) {
            if (!isHexString(result._vs)) {
                logger.throwArgumentError("signature invalid _vs", "signature", signature);
            }
            result._vs = hexZeroPad(result._vs, 32);
        }
        // Set or check the _vs
        if (result._vs == null) {
            result._vs = _vs;
        } else if (result._vs !== _vs) {
            logger.throwArgumentError("signature _vs mismatch v and s", "signature", signature);
        }
    }
    result.yParityAndS = result._vs;
    result.compact = result.r + result.yParityAndS.substring(2);
    return result;
}
function joinSignature(signature) {
    signature = splitSignature(signature);
    return hexlify(concat([
        signature.r,
        signature.s,
        signature.recoveryParam ? "0x1c" : "0x1b"
    ]));
} //# sourceMappingURL=index.js.map
}),
"[project]/node_modules/@ethersproject/keccak256/lib.esm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "keccak256",
    ()=>keccak256
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$sha3$2f$src$2f$sha3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-sha3/src/sha3.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$bytes$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ethersproject/bytes/lib.esm/index.js [app-route] (ecmascript)");
"use strict";
;
;
function keccak256(data) {
    return '0x' + __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$sha3$2f$src$2f$sha3$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].keccak_256((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$bytes$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["arrayify"])(data));
} //# sourceMappingURL=index.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/constant.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_CHUNK_SIZE",
    ()=>DEFAULT_CHUNK_SIZE,
    "DEFAULT_SEGMENT_MAX_CHUNKS",
    ()=>DEFAULT_SEGMENT_MAX_CHUNKS,
    "DEFAULT_SEGMENT_SIZE",
    ()=>DEFAULT_SEGMENT_SIZE,
    "EMPTY_CHUNK",
    ()=>EMPTY_CHUNK,
    "EMPTY_CHUNK_HASH",
    ()=>EMPTY_CHUNK_HASH,
    "SMALL_FILE_SIZE_THRESHOLD",
    ()=>SMALL_FILE_SIZE_THRESHOLD,
    "TIMEOUT_MS",
    ()=>TIMEOUT_MS,
    "ZERO_HASH",
    ()=>ZERO_HASH
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$keccak256$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ethersproject/keccak256/lib.esm/index.js [app-route] (ecmascript)");
;
const DEFAULT_CHUNK_SIZE = 256; // bytes
const DEFAULT_SEGMENT_MAX_CHUNKS = 1024;
const DEFAULT_SEGMENT_SIZE = DEFAULT_CHUNK_SIZE * DEFAULT_SEGMENT_MAX_CHUNKS;
const EMPTY_CHUNK = new Uint8Array(DEFAULT_CHUNK_SIZE);
const EMPTY_CHUNK_HASH = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$keccak256$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["keccak256"])(EMPTY_CHUNK);
const SMALL_FILE_SIZE_THRESHOLD = 256 * 1024;
const TIMEOUT_MS = 3000_000; // 60 seconds
const ZERO_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'; //# sourceMappingURL=constant.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/factories/FixedPriceFlow__factory.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FixedPriceFlow__factory",
    ()=>FixedPriceFlow__factory
]);
/* Autogenerated file. Do not edit manually. */ /* tslint:disable */ /* eslint-disable */ var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/contract/contract.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/contract/factory.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/abi/interface.js [app-route] (ecmascript) <locals>");
;
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "blocksPerEpoch_",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "deployDelay_",
                type: "uint256"
            }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
    },
    {
        inputs: [],
        name: "InvalidSubmission",
        type: "error"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "price",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "paid",
                type: "uint256"
            }
        ],
        name: "NotEnoughFee",
        type: "error"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "index",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "startMerkleRoot",
                type: "bytes32"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "submissionIndex",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "flowLength",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "context",
                type: "bytes32"
            }
        ],
        name: "NewEpoch",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "Paused",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32"
            }
        ],
        name: "RoleAdminChanged",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            }
        ],
        name: "RoleGranted",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            }
        ],
        name: "RoleRevoked",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "identity",
                type: "bytes32"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "submissionIndex",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "startPos",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "length",
                type: "uint256"
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "length",
                        type: "uint256"
                    },
                    {
                        internalType: "bytes",
                        name: "tags",
                        type: "bytes"
                    },
                    {
                        components: [
                            {
                                internalType: "bytes32",
                                name: "root",
                                type: "bytes32"
                            },
                            {
                                internalType: "uint256",
                                name: "height",
                                type: "uint256"
                            }
                        ],
                        internalType: "struct SubmissionNode[]",
                        name: "nodes",
                        type: "tuple[]"
                    }
                ],
                indexed: false,
                internalType: "struct Submission",
                name: "submission",
                type: "tuple"
            }
        ],
        name: "Submit",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "Unpaused",
        type: "event"
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "PAUSER_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "length",
                        type: "uint256"
                    },
                    {
                        internalType: "bytes",
                        name: "tags",
                        type: "bytes"
                    },
                    {
                        components: [
                            {
                                internalType: "bytes32",
                                name: "root",
                                type: "bytes32"
                            },
                            {
                                internalType: "uint256",
                                name: "height",
                                type: "uint256"
                            }
                        ],
                        internalType: "struct SubmissionNode[]",
                        name: "nodes",
                        type: "tuple[]"
                    }
                ],
                internalType: "struct Submission[]",
                name: "submissions",
                type: "tuple[]"
            }
        ],
        name: "batchSubmit",
        outputs: [
            {
                internalType: "uint256[]",
                name: "indexes",
                type: "uint256[]"
            },
            {
                internalType: "bytes32[]",
                name: "digests",
                type: "bytes32[]"
            },
            {
                internalType: "uint256[]",
                name: "startIndexes",
                type: "uint256[]"
            },
            {
                internalType: "uint256[]",
                name: "lengths",
                type: "uint256[]"
            }
        ],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [],
        name: "blocksPerEpoch",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "epoch",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "epochStartPosition",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "firstBlock",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "getContext",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "epoch",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "mineStart",
                        type: "uint256"
                    },
                    {
                        internalType: "bytes32",
                        name: "flowRoot",
                        type: "bytes32"
                    },
                    {
                        internalType: "uint256",
                        name: "flowLength",
                        type: "uint256"
                    },
                    {
                        internalType: "bytes32",
                        name: "blockDigest",
                        type: "bytes32"
                    },
                    {
                        internalType: "bytes32",
                        name: "digest",
                        type: "bytes32"
                    }
                ],
                internalType: "struct MineContext",
                name: "",
                type: "tuple"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "digest",
                type: "bytes32"
            }
        ],
        name: "getEpochRange",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint128",
                        name: "start",
                        type: "uint128"
                    },
                    {
                        internalType: "uint128",
                        name: "end",
                        type: "uint128"
                    }
                ],
                internalType: "struct EpochRange",
                name: "",
                type: "tuple"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            }
        ],
        name: "getRoleAdmin",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256"
            }
        ],
        name: "getRoleMember",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            }
        ],
        name: "getRoleMemberCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "hasRole",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "market_",
                type: "address"
            }
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "initialized",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "makeContext",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "cnt",
                type: "uint256"
            }
        ],
        name: "makeContextFixedTimes",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "makeContextWithResult",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "epoch",
                        type: "uint256"
                    },
                    {
                        internalType: "uint256",
                        name: "mineStart",
                        type: "uint256"
                    },
                    {
                        internalType: "bytes32",
                        name: "flowRoot",
                        type: "bytes32"
                    },
                    {
                        internalType: "uint256",
                        name: "flowLength",
                        type: "uint256"
                    },
                    {
                        internalType: "bytes32",
                        name: "blockDigest",
                        type: "bytes32"
                    },
                    {
                        internalType: "bytes32",
                        name: "digest",
                        type: "bytes32"
                    }
                ],
                internalType: "struct MineContext",
                name: "",
                type: "tuple"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "market",
        outputs: [
            {
                internalType: "address payable",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "numSubmissions",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "paused",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "targetPosition",
                type: "uint128"
            }
        ],
        name: "queryContextAtPosition",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint128",
                        name: "start",
                        type: "uint128"
                    },
                    {
                        internalType: "uint128",
                        name: "end",
                        type: "uint128"
                    },
                    {
                        internalType: "bytes32",
                        name: "digest",
                        type: "bytes32"
                    }
                ],
                internalType: "struct EpochRangeWithContextDigest",
                name: "range",
                type: "tuple"
            }
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "rootHistory",
        outputs: [
            {
                internalType: "contract IDigestHistory",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "submissionIndex",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "length",
                        type: "uint256"
                    },
                    {
                        internalType: "bytes",
                        name: "tags",
                        type: "bytes"
                    },
                    {
                        components: [
                            {
                                internalType: "bytes32",
                                name: "root",
                                type: "bytes32"
                            },
                            {
                                internalType: "uint256",
                                name: "height",
                                type: "uint256"
                            }
                        ],
                        internalType: "struct SubmissionNode[]",
                        name: "nodes",
                        type: "tuple[]"
                    }
                ],
                internalType: "struct Submission",
                name: "submission",
                type: "tuple"
            }
        ],
        name: "submit",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "payable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4"
            }
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "tree",
        outputs: [
            {
                internalType: "uint256",
                name: "currentLength",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "unstagedHeight",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    }
];
const _bytecode = "0x60e06040523480156200001157600080fd5b5060405162003fe838038062003fe88339810160408190526200003491620000b1565b6000805460ff1916905560a0829052604051829082906103e8906200005990620000a3565b908152602001604051809103906000f0801580156200007c573d6000803e3d6000fd5b506001600160a01b0316608052620000958143620000d6565b60c05250620000fe92505050565b610670806200397883390190565b60008060408385031215620000c557600080fd5b505080516020909101519092909150565b80820180821115620000f857634e487b7160e01b600052601160045260246000fd5b92915050565b60805160a05160c05161380b6200016d600039600081816102cc015281816107a401528181610a6401528181610b4b01528181610da801528181610ebd0152818161105101526114e30152600081816106ba01526110290152600081816105f101526110bc015261380b6000f3fe6080604052600436106101e35760003560e01c8063900cf0cf11610102578063c4d66de811610095578063e63ab1e911610064578063e63ab1e914610653578063ef3e12dc14610675578063f0682054146106a8578063fd54b228146106dc57600080fd5b8063c4d66de8146105bf578063c7dd5221146105df578063ca15c87314610613578063d547741f1461063357600080fd5b80639e62a38e116100d15780639e62a38e1461055c578063a217fddf1461057f578063b464b53e14610594578063b8a409ac146105a957600080fd5b8063900cf0cf146104f05780639010d07c1461050657806391d148541461052657806393e405a01461054657600080fd5b806336568abe1161017a57806377e198241161014957806377e19824146103ff5780637d5907081461041457806380f55605146104a35780638456cb59146104db57600080fd5b806336568abe1461039d57806338d45e10146103bd5780633f4ba83a146103d25780635c975abb146103e757600080fd5b8063231b0268116101b6578063231b0268146102ba578063248a9ca3146102fc5780632f2ff15d1461032d57806331bae1741461034d57600080fd5b806301ffc9a7146101e8578063127f0f071461021d578063158ef93e1461027e57806318a641ef14610298575b600080fd5b3480156101f457600080fd5b5061020861020336600461302c565b61070c565b60405190151581526020015b60405180910390f35b34801561022957600080fd5b50610232610737565b6040516102149190600060c082019050825182526020830151602083015260408301516040830152606083015160608301526080830151608083015260a083015160a083015292915050565b34801561028a57600080fd5b506003546102089060ff1681565b3480156102a457600080fd5b506102b86102b3366004613056565b6107a2565b005b3480156102c657600080fd5b506102ee7f000000000000000000000000000000000000000000000000000000000000000081565b604051908152602001610214565b34801561030857600080fd5b506102ee610317366004613056565b6000908152600160208190526040909120015490565b34801561033957600080fd5b506102b8610348366004613086565b61081a565b34801561035957600080fd5b5061036d6103683660046130b2565b610845565b6040805182516001600160801b039081168252602080850151909116908201529181015190820152606001610214565b3480156103a957600080fd5b506102b86103b8366004613086565b6109e8565b3480156103c957600080fd5b506102b8610a62565b3480156103de57600080fd5b506102b8610ab1565b3480156103f357600080fd5b5060005460ff16610208565b34801561040b57600080fd5b50603a546102ee565b34801561042057600080fd5b5061047c61042f366004613056565b6040805180820190915260008082526020820152506000908152604360209081526040918290208251808401909352546001600160801b038082168452600160801b909104169082015290565b6040805182516001600160801b039081168252602093840151169281019290925201610214565b3480156104af57600080fd5b506036546104c3906001600160a01b031681565b6040516001600160a01b039091168152602001610214565b3480156104e757600080fd5b506102b8610ad1565b3480156104fc57600080fd5b506102ee603b5481565b34801561051257600080fd5b506104c36105213660046130db565b610af1565b34801561053257600080fd5b50610208610541366004613086565b610b10565b34801561055257600080fd5b506102ee603c5481565b61056f61056a366004613310565b610b3b565b60405161021494939291906133fc565b34801561058b57600080fd5b506102ee600081565b3480156105a057600080fd5b50610232610d74565b3480156105b557600080fd5b506102ee603a5481565b3480156105cb57600080fd5b506102b86105da36600461347b565b610dfb565b3480156105eb57600080fd5b506104c37f000000000000000000000000000000000000000000000000000000000000000081565b34801561061f57600080fd5b506102ee61062e366004613056565b610e70565b34801561063f57600080fd5b506102b861064e366004613086565b610e87565b34801561065f57600080fd5b506102ee6000805160206137b683398151915281565b610688610683366004613496565b610ead565b604080519485526020850193909352918301526060820152608001610214565b3480156106b457600080fd5b506102ee7f000000000000000000000000000000000000000000000000000000000000000081565b3480156106e857600080fd5b506037546038546106f7919082565b60408051928352602083019190915201610214565b60006001600160e01b03198216635a05180f60e01b1480610731575061073182610fef565b92915050565b6040805160c081018252600080825260208201819052918101829052606081018290526080810182905260a0810191909152506040805160c081018252603d548152603e546020820152603f548183015290546060820152604154608082015260425460a082015290565b7f00000000000000000000000000000000000000000000000000000000000000004310156107eb5760405162461bcd60e51b81526004016107e2906134d3565b60405180910390fd5b60005b818111610815576107fd611024565b610805575050565b61080e81613520565b90506107ee565b505b50565b6000828152600160208190526040909120015461083681611348565b6108408383611352565b505050565b604080516060810182526000808252602082018190529181019190915261086a610a62565b6037546001600160801b038316106108d05760405162461bcd60e51b8152602060048201526024808201527f5175657269656420706f736974696f6e206578636565647320757070657220626044820152631bdd5b9960e21b60648201526084016107e2565b6044546000905b818111156109a057600060026108ed8484613539565b6108f79190613562565b90506044818154811061090c5761090c613576565b600091825260209182902060408051606081018252600290930290910180546001600160801b038082168552600160801b9091048116948401859052600190910154918301919091529095508616106109715761096a816001613539565b925061099a565b83600001516001600160801b0316856001600160801b03161061099657505050919050565b8091505b506108d7565b60405162461bcd60e51b815260206004820152601b60248201527f43616e206e6f742066696e642070726f70657220636f6e74657874000000000060448201526064016107e2565b6001600160a01b0381163314610a585760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084016107e2565b6108158282611374565b7f0000000000000000000000000000000000000000000000000000000000000000431015610aa25760405162461bcd60e51b81526004016107e2906134d3565b610aaa611024565b610aa2575b565b6000805160206137b6833981519152610ac981611348565b610817611396565b6000805160206137b6833981519152610ae981611348565b6108176113e8565b6000828152600260205260408120610b099083611425565b9392505050565b60009182526001602090815260408084206001600160a01b0393909316845291905290205460ff1690565b606080606080610b49611431565b7f0000000000000000000000000000000000000000000000000000000000000000431015610b895760405162461bcd60e51b81526004016107e2906134d3565b84518067ffffffffffffffff811115610ba457610ba46130fd565b604051908082528060200260200182016040528015610bcd578160200160208202803683370190505b5094508067ffffffffffffffff811115610be957610be96130fd565b604051908082528060200260200182016040528015610c12578160200160208202803683370190505b5093508067ffffffffffffffff811115610c2e57610c2e6130fd565b604051908082528060200260200182016040528015610c57578160200160208202803683370190505b5092508067ffffffffffffffff811115610c7357610c736130fd565b604051908082528060200260200182016040528015610c9c578160200160208202803683370190505b50915060005b81811015610d6b57600080600080610cd28b8681518110610cc557610cc5613576565b6020026020010151610ead565b9350935093509350838a8681518110610ced57610ced613576565b60200260200101818152505082898681518110610d0c57610d0c613576565b60200260200101818152505081888681518110610d2b57610d2b613576565b60200260200101818152505080878681518110610d4a57610d4a613576565b6020026020010181815250505050505080610d6490613520565b9050610ca2565b50509193509193565b6040805160c081018252600080825260208201819052918101829052606081018290526080810182905260a08101919091527f0000000000000000000000000000000000000000000000000000000000000000431015610de65760405162461bcd60e51b81526004016107e2906134d3565b610dee610a62565b610df6610737565b905090565b60035460ff1615610e5a5760405162461bcd60e51b8152602060048201526024808201527f5a67496e697469616c697a61626c653a20616c726561647920696e697469616c6044820152631a5e995960e21b60648201526084016107e2565b6003805460ff1916600117905561081781611477565b60008181526002602052604081206107319061159d565b60008281526001602081905260409091200154610ea381611348565b6108408383611374565b600080600080610ebb611431565b7f0000000000000000000000000000000000000000000000000000000000000000431015610efb5760405162461bcd60e51b81526004016107e2906134d3565b610f04856115a7565b610f455760405162461bcd60e51b815260206004820152601260248201527124b73b30b634b21039bab136b4b9b9b4b7b760711b60448201526064016107e2565b6000610f50866117be565b9050610f5b8161181c565b610f63610a62565b6000610f6e8761190e565b90506000610f7b88611a42565b603a80549192506001906000610f918385613539565b9250508190555081336001600160a01b03167f167ce04d2aa1981994d3a31695da0d785373335b1078cec239a1a3a2c76755558386888e604051610fd89493929190613617565b60405180910390a396509450925090509193509193565b60006001600160e01b03198216637965db0b60e01b148061073157506301ffc9a760e01b6001600160e01b0319831614610731565b6000807f0000000000000000000000000000000000000000000000000000000000000000603b54600101027f000000000000000000000000000000000000000000000000000000000000000001905043811061108257600091505090565b61108c6037611a76565b60006110986037611ba5565b604051632d287e4360e01b8152600481018290529091506000906001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001690632d287e43906024016020604051808303816000875af1158015611105573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111299190613678565b9050603b54811461113c5761113c613691565b6000804361114c86610100613539565b101561117c57507fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47090508061128b565b506037546040805186406020820181905291810186905260608101929092529060800160408051808303601f190181528282528051602091820120603c80546037805487870187526001600160801b039283168089529083168689018181526000878152604389528981209a519151918616600160801b928716830217909a558851606081018a529283529682019081529681018581526044805460018101825599529051965196831696909216909402949094177f9b22d3d61959b4d3528b1d8ba932c96fbe302b36a1aad1d95cab54f9e0a135ea60029096029586015592517f9b22d3d61959b4d3528b1d8ba932c96fbe302b36a1aad1d95cab54f9e0a135eb9094019390935554905591505b6001603b600082825461129e9190613539565b90915550506040805160c081018252603b5480825260208083018990528284018890526037546060808501829052608080860188905260a0909501889052603d849055603e8b9055603f8a905581865560418790556042889055603a5486518b815293840152948201529283018590529133917fbc8a3fd82465d43f1709e44ed882f7e1af0147274196ef1ec009f5d52ff4e993910160405180910390a360019550505050505090565b6108178133611bdd565b61135c8282611c36565b60008281526002602052604090206108409082611ca1565b61137e8282611cb6565b60008281526002602052604090206108409082611d1d565b61139e611d32565b6000805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6113f0611431565b6000805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586113cb3390565b6000610b098383611d7b565b60005460ff1615610aaf5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016107e2565b6001603781905560398054808301825560009182527fdc16fef70f8d5ddbc01ee3d903d1e69c18a3c7be080eb86a81e0578814ee58d30155603855603680546001600160a01b0319166001600160a01b0383161790556000603b8190556040805160c0810182529182527f0000000000000000000000000000000000000000000000000000000000000000602083015281016115136037611ba5565b815260016020808301919091527fc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47060408084018290526060938401919091528351603d5590830151603e5582810151603f55908201519055608081015160415560a00151604255611585600033611da5565b6108176000805160206137b683398151915233611da5565b6000610731825490565b60008160400151516000036115be57506000919050565b60408201518051600491906115d5906001906136a7565b815181106115e5576115e5613576565b602002602001015160200151836040015160008151811061160857611608613576565b60200260200101516020015161161e91906136a7565b1061162b57506000919050565b6040826040015160008151811061164457611644613576565b6020026020010151602001511061165d57506000919050565b60005b600183604001515161167291906136a7565b8110156116e9578260400151818151811061168f5761168f613576565b60200260200101516020015183604001518260016116ad9190613539565b815181106116bd576116bd613576565b602002602001015160200151106116d75750600092915050565b806116e181613520565b915050611660565b5060006116f5836117be565b9050611703610100826136ba565b835111156117145750600092915050565b600060108210156117315761172a6001836136a7565b9050611797565b83604001515160010361174c5761172a600483901c836136a7565b6004846040015160008151811061176557611765613576565b60200260200101516020015161177b91906136a7565b611786906001613539565b611794906001901b836136a7565b90505b6117a3610100826136ba565b8451116117b4575060009392505050565b5060019392505050565b600080805b83604001515181101561181557836040015181815181106117e6576117e6613576565b6020026020010151602001516001901b826118019190613539565b91508061180d81613520565b9150506117c3565b5092915050565b603654604080516330f6284160e11b815290516000926001600160a01b0316916361ec50829160048083019260209291908290030181865afa158015611866573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061188a9190613678565b9050600061189882846136ba565b905047478211156118cd57604051637c2e324160e11b81526004810184905260248101859052604481018290526064016107e2565b6036546040516001600160a01b039091169083156108fc029084906000818181858888f19350505050158015611907573d6000803e3d6000fd5b5050505050565b603754600090815b8360400151518110156119ab5760008460400151828151811061193b5761193b613576565b602002602001015160000151905060008560400151838151811061196157611961613576565b6020026020010151602001519050600061198783836037611daf9092919063ffffffff16565b905083600003611995578095505b50505080806119a390613520565b915050611916565b5060006119b882846136a7565b90506000836037600001546119cd91906136a7565b603654604051636d3759b560e11b81526004810186905260248101839052604481018590529192506001600160a01b03169063da6eb36a90606401600060405180830381600087803b158015611a2257600080fd5b505af1158015611a36573d6000803e3d6000fd5b50505050505050919050565b60008160400151604051602001611a5991906136d9565b604051602081830303815290604052805190602001209050919050565b6002810154600182015403611a885750565b60028101805460018084015491926000929091611aa4916136a7565b81548110611ab457611ab4613576565b906000526020600020015490506000611adc60018560010154611ad791906136a7565b611f38565b60018501549091505b83811015611b9a57604080516020808201869052818301859052825180830384018152606090920190925280519101208554611b2590600290841c6136ec565b600003611b6157809350611b3882611f38565b925080866002018381548110611b5057611b50613576565b600091825260209091200155611b87565b856002018281548110611b7657611b76613576565b906000526020600020015493508092505b5080611b9281613520565b915050611ae5565b505050600190910155565b60028101805460009190611bbb906001906136a7565b81548110611bcb57611bcb613576565b90600052602060002001549050919050565b611be78282610b10565b61081557611bf481612b3c565b611bff836020612b4e565b604051602001611c10929190613700565b60408051601f198184030181529082905262461bcd60e51b82526107e291600401613775565b611c408282610b10565b6108155760008281526001602081815260408084206001600160a01b0386168086529252808420805460ff19169093179092559051339285917f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d9190a45050565b6000610b09836001600160a01b038416612cea565b611cc08282610b10565b156108155760008281526001602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000610b09836001600160a01b038416612d39565b60005460ff16610aaf5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016107e2565b6000826000018281548110611d9257611d92613576565b9060005260206000200154905092915050565b6108158282611352565b600080611dc0856000015484612e2c565b90506000611dd16001851b83613539565b6002870154909150611de5906001906136a7565b6001901b811115611e3757611df986611a76565b611e0286612e64565b6002860154611e13906001906136a7565b6001901b811115611e2c57611e2786612e64565b611e02565b600286015460018701555b6002860154611e468786612ef7565b60008087875b84811015611f1a57611e61600288831c6136ec565b600003611eae57818b6002018281548110611e7e57611e7e613576565b600091825260209091200155611e95816001613539565b6001808d0191909155611ea890866136a7565b50611f1a565b8a6002018181548110611ec357611ec3613576565b906000526020600020015493508192508383604051602001611eef929190918252602082015260400190565b6040516020818303038152906040528051906020012091508080611f1290613520565b915050611e4c565b50611f286001891b87613539565b9099555092979650505050505050565b600081600003611f6957507fd397b3b043d87fcd6fad1291ff0bfd16401c274896d8c63a923727f077b8e0b5919050565b81600103611f9857507ff73e6947d7d1628b9976a6e40d7b278a8a16405e96324a68df45b12a51b7cfde919050565b81600203611fc757507fa1520264ae93cac619e22e8718fc4fa7ebdd23f493cad602434d2a58ff4868fb919050565b81600303611ff657507fde5747106ac1194a1fa9071dbd6cf19dc2bc7964497ef0afec7e4bdbcf08c47e919050565b8160040361202557507f09c7082879180d28c789c05fafe7030871c76cedbe82c948b165d6a1d66ac15b919050565b8160050361205457507faa7a02bcf29fba687f84123c808b5b48834ff5395abe98e622fadc14e4180c95919050565b8160060361208357507f7608fd46b710b589e0f2ee5a13cd9c41d432858a30d524f84c6d5db37f66273a919050565b816007036120b257507fa5d9a2f7f3573ac9a1366bc484688b4daf934b87ea9b3bf2e703da8fd9f09708919050565b816008036120e157507f6c1779477f4c3fca26b4607398859a43b90a286ce8062500744bd4949981757f919050565b8160090361211057507f45c22df3d952c33d5edce122eed85e5cda3fd61939e7ad7b3e03b6927bb598ea919050565b81600a0361213f57507fe68d02859bb6211cec64f52368b77d422de3b8eac34bf615942b814b643301b5919050565b81600b0361216e57507f62d78399b954d51cb9728601738ad13ddc43b2300064660716bb661d2f4d686f919050565b81600c0361219d57507f6e250d9abdbbb3993fce08de0395cdb56f0483e67d8762a798de011f6a50866a919050565b81600d036121cc57507f1d1a3a74062fd94078617e33eb901eaf16a830f67c387d8eed342db2ac5e2cc5919050565b81600e036121fb57507f19b3b3886526917eae8650223d0be20a0301be960eb339696e673ad8a804440f919050565b81600f0361222a57507fee9e05df53f10e62a897e5140a3f58732dd849e69cd1d62b21ed80ead711a014919050565b8160100361225957507f2cc7aa6e611a113a34505dc1c96b220f14909b70e2c2c7b1a74655da21013c5e919050565b8160110361228857507f949b52dfece7ca3bad3cb27f7750ecaee64cedb6243a275c35984e92956c530a919050565b816012036122b757507fb2680d060b763b932c150434c3812ba9fbc50937e0ebcf5758de884be81bab65919050565b816013036122e657507f523aebf4a085edbc9c8cdc99c83f46262e5f029b395ff7bf561a48a3f387e6b8919050565b8160140361231557507fc9ab73827ab33c0cedb7ecf0ed2e6e32583c0fe887133a7f381ea4ba84d95b76919050565b8160150361234457507f23eb397dec7e564ebe97f160a5e1081a77d9861f316807079b6be4731beb331e919050565b8160160361237357507fdfa44a274c60f090df034aaf75539fd40e94cfd6362dd53d26ed20c8ad529563919050565b816017036123a257507f15b13ee358e1044a53381243c094e54bf7aceb9b5325a0313d6b85fd44e8b3a5919050565b816018036123d157507f1a7a93871e2daa0f1860aa91d4ece4ccd012dac5fe581176a21b155cfeca6d40919050565b8160190361240057507fb12665fd0b884a7c7d1e0294d369170d7e672d9e125eb87784556305f98292df919050565b81601a0361242f57507f2a5543b0b2f8cf550524390291774f4d6c8c0a25ff5393b09c44d75c92a5bd8e919050565b81601b0361245e57507ff9df1841a6e7164b67a1242f1c74975137085ffd9721831f6c469d3a4d5ba42e919050565b81601c0361248d57507fba24736b1b48246c1f7803be967be43ca0dddc9c2c0687a2957952249bc89371919050565b81601d036124bc57507ff3f706b73790c73ca0a8f0460ac3a2a102e280415586b520e70cd5e8264388b4919050565b81601e036124eb57507fc1f5a9a9f357e1c37814688cf7290c87a264ed3d6174a12b978da1c586f53825919050565b81601f0361251a57507f766f7702e19ce23d426cdad03e4292a5a42c4669420101fed74400ec7cda3ac6919050565b8160200361254957507f070fec213e105b3e4d9b0434ac2fc7ca721d35093dc741fb9419797003e2394a919050565b8160210361257857507f9a7aade05b49e43f5fd3782571cc8c90eadacd5d660b53842b4e5b63d675ae0c919050565b816022036125a757507fb27b35a8236d0f9b6692820429c025ed58ed378dc98d316b762f0c865c68be6f919050565b816023036125d657507fdc567ad38d9b90cc9bea4e0f82ec05eca10b3aa94eddc7b63c4fd20c001bb53b919050565b8160240361260557507fb208dfc457c8b30661ae49544c8e57399818095aab8dd7a426fb8dd56bb8c559919050565b8160250361263457507fc4a72e1ff84f7a22631f3f95c61c392f98f52050360215a9d7e75d79b0bcd2ca919050565b8160260361266357507fbb093ec8c0d7defb1de668b5b5dd4f2619e5cd92d29cc144862364a83ab993a8919050565b8160270361269257507fe341796f2fe3975012c1e6badfa2e9c4523e43f911dc845082c3f4d7b4ff871d919050565b816028036126c157507f42d356a11a0b39243eca3c3263299cb6f8c3e9728af6d9d8b0ddb6d354f1890d919050565b816029036126f057507f0ce506e834e3a50a33f80074bc7fa16cf3c0712b36a41b69699177ea25de6c30919050565b81602a0361271f57507fd8fa5bf130aeb7756b1ed09090cc80ed78dae0617978540f0fabd06dfb978938919050565b81602b0361274e57507feed69a20fe36eb604f2153efa3b01c0e143cdf02229a1b8f741c9c2719059eb0919050565b81602c0361277d57507f303c9c566ebf5bfe252796e5c131a99801226152a514688b5ca6883e99031d88919050565b81602d036127ac57507fc7c3765ba96cfbccf3ae718393fa89791070cc8cd85f280b6ac46aea10d96042919050565b81602e036127db57507f1ca65b0a2b8034ee6bfb1fa4526832304e393af835c2c42b4dace58048746800919050565b81602f0361280a57507f957add5e02350fd47de3a8e1da38fd774ceb31214d5897ed6315740a83cd634a919050565b8160300361283957507f787892cb439d5d358870774e163557cf02ec3cb87be6fde11abf1acee14eeaa4919050565b8160310361286857507f047c0962d4f5c8f60692c587de07739528c4d2059240d61dd34d2a547a438ee6919050565b8160320361289757507fc18727efc9e4df63020dcd90edc17dfd2ad14f02328c912b13898e0b53735556919050565b816033036128c657507fe38b9218987e451effe1648c3c9851ad03b64b052a5a3f5ca30f4d7b1ecf7120919050565b816034036128f557507f0e48ecb1a5418e6218289acc8cf723e67ac6eae3ecb80f644336ab4365a2f2b2919050565b8160350361292457507fd60e66f5b8cd08d71a1a4d7798952a7afa5a6e93a886c587a46a5500ebef4a60919050565b8160360361295357507f5162aa9c31d9105f689cf6e71e19548bc9f0218b7d0f99ff7fa8bc2f19c68462919050565b8160370361298257507f6fa8519b4b0e8fb97a9b618e97627d97b9b9d29d04521fd96472e9c502700568919050565b816038036129b157507f41f5dcf0cdee270a2ad9a5f8130aaaab94b237463e09757c28b0321f09e24eb0919050565b816039036129e057507f87a119239fa90732197108adfd029938b4743874d959d3da79b3a30f4832899e919050565b81603a03612a0f57507f8e96dbaa5c72e84a5297b040ccc1a60750a3201166e3b7740d352837233608a1919050565b81603b03612a3e57507f01605058d167ce967af8c475d2f6c341c3e0b437babf899c9da73a520aa4ecb5919050565b81603c03612a6d57507f04529eb80532c5118949d700d8dfd2aa86850b1c6479b26276b9486784a145ff919050565b81603d03612a9c57507fd191814ad13f27361ae20a46cbac8f6e76c10ebe9af0806d6720492ee2f296f0919050565b81603e03612acb57507fa28df63f78821060570da371c0be1312188346b92a7965cc4b980b26c134a4d7919050565b81603f03612afa57507fb48a92d40b61dc995ceecee4cded6415050dcece448b1e0b5e5b6a0e6981f3ef919050565b60405162461bcd60e51b8152602060048201526012602482015271125b99195e081bdd5d081bd988189bdd5b9960721b60448201526064016107e2565b919050565b60606107316001600160a01b03831660145b60606000612b5d8360026136ba565b612b68906002613539565b67ffffffffffffffff811115612b8057612b806130fd565b6040519080825280601f01601f191660200182016040528015612baa576020820181803683370190505b509050600360fc1b81600081518110612bc557612bc5613576565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110612bf457612bf4613576565b60200101906001600160f81b031916908160001a9053506000612c188460026136ba565b612c23906001613539565b90505b6001811115612c9b576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110612c5757612c57613576565b1a60f81b828281518110612c6d57612c6d613576565b60200101906001600160f81b031916908160001a90535060049490941c93612c9481613788565b9050612c26565b508315610b095760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016107e2565b6000818152600183016020526040812054612d3157508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610731565b506000610731565b60008181526001830160205260408120548015612e22576000612d5d6001836136a7565b8554909150600090612d71906001906136a7565b9050818114612dd6576000866000018281548110612d9157612d91613576565b9060005260206000200154905080876000018481548110612db457612db4613576565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080612de757612de761379f565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610731565b6000915050610731565b600082808203612e40576000915050610731565b612e4b6001826136a7565b831c9050612e5a600182613539565b90921b9392505050565b60028101805490600090612e796001846136a7565b81548110612e8957612e89613576565b60009182526020822001549150612ea4611ad76001856136a7565b9050836002018282604051602001612ec6929190918252602082015260400190565b60408051601f1981840301815291905280516020918201208254600181018455600093845291909220015550505050565b8082600101541115612f07575050565b60028201805460018085015491926000929091612f23916136a7565b81548110612f3357612f33613576565b906000526020600020015490506000612f5660018660010154611ad791906136a7565b60018601549091505b8381101561302457604080516020808201869052818301859052825180830384018152606090920190925280519101208654612f9f90600290841c6136ec565b600003612feb57809350612fb282611f38565b9250858210612fe65780876002018381548110612fd157612fd1613576565b60009182526020909120015550505050505050565b613011565b86600201828154811061300057613000613576565b906000526020600020015493508092505b508061301c81613520565b915050612f5f565b505050505050565b60006020828403121561303e57600080fd5b81356001600160e01b031981168114610b0957600080fd5b60006020828403121561306857600080fd5b5035919050565b80356001600160a01b0381168114612b3757600080fd5b6000806040838503121561309957600080fd5b823591506130a96020840161306f565b90509250929050565b6000602082840312156130c457600080fd5b81356001600160801b0381168114610b0957600080fd5b600080604083850312156130ee57600080fd5b50508035926020909101359150565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715613136576131366130fd565b60405290565b6040516060810167ffffffffffffffff81118282101715613136576131366130fd565b604051601f8201601f1916810167ffffffffffffffff81118282101715613188576131886130fd565b604052919050565b600067ffffffffffffffff8211156131aa576131aa6130fd565b5060051b60200190565b600082601f8301126131c557600080fd5b813560206131da6131d583613190565b61315f565b82815260069290921b840181019181810190868411156131f957600080fd5b8286015b8481101561323857604081890312156132165760008081fd5b61321e613113565b8135815284820135858201528352918301916040016131fd565b509695505050505050565b60006060828403121561325557600080fd5b61325d61313c565b90508135815260208083013567ffffffffffffffff8082111561327f57600080fd5b818501915085601f83011261329357600080fd5b8135818111156132a5576132a56130fd565b6132b7601f8201601f1916850161315f565b81815287858386010111156132cb57600080fd5b818585018683013760008583830101528085870152505060408501359250808311156132f657600080fd5b5050613304848285016131b4565b60408301525092915050565b6000602080838503121561332357600080fd5b823567ffffffffffffffff8082111561333b57600080fd5b818501915085601f83011261334f57600080fd5b813561335d6131d582613190565b81815260059190911b8301840190848101908883111561337c57600080fd5b8585015b838110156133b4578035858111156133985760008081fd5b6133a68b89838a0101613243565b845250918601918601613380565b5098975050505050505050565b600081518084526020808501945080840160005b838110156133f1578151875295820195908201906001016133d5565b509495945050505050565b60808152600061340f60808301876133c1565b82810360208481019190915286518083528782019282019060005b818110156134465784518352938301939183019160010161342a565b5050848103604086015261345a81886133c1565b92505050828103606084015261347081856133c1565b979650505050505050565b60006020828403121561348d57600080fd5b610b098261306f565b6000602082840312156134a857600080fd5b813567ffffffffffffffff8111156134bf57600080fd5b6134cb84828501613243565b949350505050565b6020808252601a908201527f436f6e747261637420686173206e6f74206c61756e636865642e000000000000604082015260600190565b634e487b7160e01b600052601160045260246000fd5b6000600182016135325761353261350a565b5060010190565b808201808211156107315761073161350a565b634e487b7160e01b600052601260045260246000fd5b6000826135715761357161354c565b500490565b634e487b7160e01b600052603260045260246000fd5b60005b838110156135a757818101518382015260200161358f565b50506000910152565b600081518084526135c881602086016020860161358c565b601f01601f19169290920160200192915050565b600081518084526020808501945080840160005b838110156133f15781518051885283015183880152604090960195908201906001016135f0565b848152836020820152826040820152608060608201528151608082015260006020830151606060a084015261364f60e08401826135b0565b90506040840151607f198483030160c085015261366c82826135dc565b98975050505050505050565b60006020828403121561368a57600080fd5b5051919050565b634e487b7160e01b600052600160045260246000fd5b818103818111156107315761073161350a565b60008160001904831182151516156136d4576136d461350a565b500290565b602081526000610b0960208301846135dc565b6000826136fb576136fb61354c565b500690565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161373881601785016020880161358c565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161376981602884016020880161358c565b01602801949350505050565b602081526000610b0960208301846135b0565b6000816137975761379761350a565b506000190190565b634e487b7160e01b600052603160045260246000fdfe65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862aa2646970667358221220b817395a09c78411b81f0830a1380707dab6222545310a1c74577851f2d44a7a64736f6c63430008100033608060405234801561001057600080fd5b5060405161067038038061067083398101604081905261002f9161014a565b6100383361009a565b806001600160401b0381111561005057610050610163565b604051908082528060200260200182016040528015610079578160200160208202803683370190505b50805161008e916001916020909101906100ea565b50506000600255610179565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b828054828255906000526020600020908101928215610125579160200282015b8281111561012557825182559160200191906001019061010a565b50610131929150610135565b5090565b5b808211156101315760008155600101610136565b60006020828403121561015c57600080fd5b5051919050565b634e487b7160e01b600052604160045260246000fd5b6104e8806101886000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c80638da5cb5b1161005b5780638da5cb5b146100d557806396e494e8146100f0578063e0886f9014610103578063f2fde38b1461011657600080fd5b80631d1a696d146100825780632d287e43146100aa578063715018a6146100cb575b600080fd5b6100956100903660046103e3565b610129565b60405190151581526020015b60405180910390f35b6100bd6100b83660046103e3565b610194565b6040519081526020016100a1565b6100d36101ee565b005b6000546040516001600160a01b0390911681526020016100a1565b6100956100fe3660046103e3565b610202565b6100bd6101113660046103e3565b610237565b6100d36101243660046103fc565b610297565b60008061013d600254600180549050610310565b905060005b8181101561018a57836001828154811061015e5761015e610425565b906000526020600020015403610178575060019392505050565b8061018281610451565b915050610142565b5060009392505050565b6002546001546000919082906101aa908361046a565b905083600182815481106101c0576101c0610425565b90600052602060002001819055506001600260008282546101e1919061048c565b9091555091949350505050565b6101f661032a565b6102006000610384565b565b6001546002546000919083108015610230575080610222600254836103d4565b61022c919061049f565b8310155b9392505050565b600061024282610202565b6102675760405163b52d71f360e01b8152600481018390526024015b60405180910390fd5b60018054610275908461046a565b8154811061028557610285610425565b90600052602060002001549050919050565b61029f61032a565b6001600160a01b0381166103045760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161025e565b61030d81610384565b50565b600081831061031f5781610321565b825b90505b92915050565b6000546001600160a01b031633146102005760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161025e565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b600081831161031f5781610321565b6000602082840312156103f557600080fd5b5035919050565b60006020828403121561040e57600080fd5b81356001600160a01b038116811461023057600080fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600182016104635761046361043b565b5060010190565b60008261048757634e487b7160e01b600052601260045260246000fd5b500690565b808201808211156103245761032461043b565b818103818111156103245761032461043b56fea2646970667358221220e8ca9fd7cf1cda9c87af618488dd664329a5f2e0ac050a78694b39389150ab1e64736f6c63430008100033";
const isSuperArgs = (xs)=>xs.length > 1;
class FixedPriceFlow__factory extends __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContractFactory"] {
    constructor(...args){
        if (isSuperArgs(args)) {
            super(...args);
        } else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(blocksPerEpoch_, deployDelay_, overrides) {
        return super.getDeployTransaction(blocksPerEpoch_, deployDelay_, overrides || {});
    }
    deploy(blocksPerEpoch_, deployDelay_, overrides) {
        return super.deploy(blocksPerEpoch_, deployDelay_, overrides || {});
    }
    connect(runner) {
        return super.connect(runner);
    }
    static bytecode = _bytecode;
    static abi = _abi;
    static createInterface() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Interface"](_abi);
    }
    static connect(address, runner) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Contract"](address, _abi, runner);
    }
} //# sourceMappingURL=FixedPriceFlow__factory.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/factories/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
/* Autogenerated file. Do not edit manually. */ /* tslint:disable */ /* eslint-disable */ var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$factories$2f$FixedPriceFlow_$5f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/factories/FixedPriceFlow__factory.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$factories$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/factories/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$factories$2f$FixedPriceFlow_$5f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/factories/FixedPriceFlow__factory.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/market/factories/FixedPrice__factory.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FixedPrice__factory",
    ()=>FixedPrice__factory
]);
/* Autogenerated file. Do not edit manually. */ /* tslint:disable */ /* eslint-disable */ var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/contract/contract.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/contract/factory.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/abi/interface.js [app-route] (ecmascript) <locals>");
;
const _abi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32"
            }
        ],
        name: "RoleAdminChanged",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            }
        ],
        name: "RoleGranted",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            }
        ],
        name: "RoleRevoked",
        type: "event"
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "PARAMS_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "beforeLength",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "uploadSectors",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "paddingSectors",
                type: "uint256"
            }
        ],
        name: "chargeFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "flow",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            }
        ],
        name: "getRoleAdmin",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256"
            }
        ],
        name: "getRoleMember",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            }
        ],
        name: "getRoleMemberCount",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "hasRole",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "pricePerSector_",
                type: "uint256"
            },
            {
                internalType: "address",
                name: "flow_",
                type: "address"
            },
            {
                internalType: "address",
                name: "reward_",
                type: "address"
            }
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "initialized",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "pricePerSector",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32"
            },
            {
                internalType: "address",
                name: "account",
                type: "address"
            }
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "reward",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "pricePerSector_",
                type: "uint256"
            }
        ],
        name: "setPricePerSector",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4"
            }
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool"
            }
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        stateMutability: "payable",
        type: "receive"
    }
];
const _bytecode = "0x608060405234801561001057600080fd5b50610fca806100206000396000f3fe6080604052600436106101025760003560e01c806361ec508211610095578063b15d20da11610064578063b15d20da146102c1578063b4988fd0146102f5578063ca15c87314610315578063d547741f14610335578063da6eb36a1461035557600080fd5b806361ec5082146102565780639010d07c1461026c57806391d148541461028c578063a217fddf146102ac57600080fd5b8063248a9ca3116100d1578063248a9ca3146101b75780632f2ff15d146101f6578063343aad821461021657806336568abe1461023657600080fd5b806301ffc9a71461010e57806314aa90a114610143578063158ef93e14610165578063228cb7331461017f57600080fd5b3661010957005b600080fd5b34801561011a57600080fd5b5061012e610129366004610cdd565b610375565b60405190151581526020015b60405180910390f35b34801561014f57600080fd5b5061016361015e366004610d07565b6103a0565b005b34801561017157600080fd5b5060005461012e9060ff1681565b34801561018b57600080fd5b5060375461019f906001600160a01b031681565b6040516001600160a01b03909116815260200161013a565b3480156101c357600080fd5b506101e86101d2366004610d07565b6000908152600160208190526040909120015490565b60405190815260200161013a565b34801561020257600080fd5b50610163610211366004610d3c565b6103d0565b34801561022257600080fd5b5060365461019f906001600160a01b031681565b34801561024257600080fd5b50610163610251366004610d3c565b6103fb565b34801561026257600080fd5b506101e860355481565b34801561027857600080fd5b5061019f610287366004610d68565b61047e565b34801561029857600080fd5b5061012e6102a7366004610d3c565b61049d565b3480156102b857600080fd5b506101e8600081565b3480156102cd57600080fd5b506101e87fb9d69e0ca90be54a40811e436234a7f7908b87ff2bec27e64f878b166da8e8e581565b34801561030157600080fd5b50610163610310366004610d8a565b6104c8565b34801561032157600080fd5b506101e8610330366004610d07565b6105a2565b34801561034157600080fd5b50610163610350366004610d3c565b6105b9565b34801561036157600080fd5b50610163610370366004610dc6565b6105df565b60006001600160e01b03198216635a05180f60e01b148061039a575061039a826107d2565b92915050565b7fb9d69e0ca90be54a40811e436234a7f7908b87ff2bec27e64f878b166da8e8e56103ca81610807565b50603555565b600082815260016020819052604090912001546103ec81610807565b6103f68383610814565b505050565b6001600160a01b03811633146104705760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b61047a8282610836565b5050565b60008281526002602052604081206104969083610858565b9392505050565b60009182526001602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60005460ff16156105275760405162461bcd60e51b8152602060048201526024808201527f5a67496e697469616c697a61626c653a20616c726561647920696e697469616c6044820152631a5e995960e21b6064820152608401610467565b6000805460ff191660011781556105449061053f3390565b610814565b61056e7fb9d69e0ca90be54a40811e436234a7f7908b87ff2bec27e64f878b166da8e8e533610814565b603592909255603680546001600160a01b039283166001600160a01b03199182161790915560378054929093169116179055565b600081815260026020526040812061039a90610864565b600082815260016020819052604090912001546105d581610807565b6103f68383610836565b6036546001600160a01b0316336001600160a01b0316146106425760405162461bcd60e51b815260206004820152601f60248201527f53656e64657220646f6573206e6f742068617665207065726d697373696f6e006044820152606401610467565b600061064e8284610e08565b90506000836035546106609190610e1b565b9050478111156106a85760405162461bcd60e51b81526020600482015260136024820152724e6f7420656e6f75676820706169642066656560681b6044820152606401610467565b60006106b48247610e3a565b90506000836106c38685610e1b565b6106cd9190610e4d565b905060006106db8285610e3a565b9050851561074a576037546040516259e96760e81b8152600481018a9052602481018890526001600160a01b03909116906359e967009084906044016000604051808303818588803b15801561073057600080fd5b505af1158015610744573d6000803e3d6000fd5b50505050505b6037546001600160a01b03166359e967006107658386610e08565b61076f898c610e08565b8a6040518463ffffffff1660e01b8152600401610796929190918252602082015260400190565b6000604051808303818588803b1580156107af57600080fd5b505af11580156107c3573d6000803e3d6000fd5b50505050505050505050505050565b60006001600160e01b03198216637965db0b60e01b148061039a57506301ffc9a760e01b6001600160e01b031983161461039a565b610811813361086e565b50565b61081e82826108c7565b60008281526002602052604090206103f69082610932565b6108408282610947565b60008281526002602052604090206103f690826109ae565b600061049683836109c3565b600061039a825490565b610878828261049d565b61047a57610885816109ed565b6108908360206109ff565b6040516020016108a1929190610e93565b60408051601f198184030181529082905262461bcd60e51b825261046791600401610f08565b6108d1828261049d565b61047a5760008281526001602081815260408084206001600160a01b0386168086529252808420805460ff19169093179092559051339285917f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d9190a45050565b6000610496836001600160a01b038416610b9b565b610951828261049d565b1561047a5760008281526001602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000610496836001600160a01b038416610bea565b60008260000182815481106109da576109da610f3b565b9060005260206000200154905092915050565b606061039a6001600160a01b03831660145b60606000610a0e836002610e1b565b610a19906002610e08565b67ffffffffffffffff811115610a3157610a31610f51565b6040519080825280601f01601f191660200182016040528015610a5b576020820181803683370190505b509050600360fc1b81600081518110610a7657610a76610f3b565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610aa557610aa5610f3b565b60200101906001600160f81b031916908160001a9053506000610ac9846002610e1b565b610ad4906001610e08565b90505b6001811115610b4c576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110610b0857610b08610f3b565b1a60f81b828281518110610b1e57610b1e610f3b565b60200101906001600160f81b031916908160001a90535060049490941c93610b4581610f67565b9050610ad7565b5083156104965760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610467565b6000818152600183016020526040812054610be25750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915561039a565b50600061039a565b60008181526001830160205260408120548015610cd3576000610c0e600183610e3a565b8554909150600090610c2290600190610e3a565b9050818114610c87576000866000018281548110610c4257610c42610f3b565b9060005260206000200154905080876000018481548110610c6557610c65610f3b565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080610c9857610c98610f7e565b60019003818190600052602060002001600090559055856001016000868152602001908152602001600020600090556001935050505061039a565b600091505061039a565b600060208284031215610cef57600080fd5b81356001600160e01b03198116811461049657600080fd5b600060208284031215610d1957600080fd5b5035919050565b80356001600160a01b0381168114610d3757600080fd5b919050565b60008060408385031215610d4f57600080fd5b82359150610d5f60208401610d20565b90509250929050565b60008060408385031215610d7b57600080fd5b50508035926020909101359150565b600080600060608486031215610d9f57600080fd5b83359250610daf60208501610d20565b9150610dbd60408501610d20565b90509250925092565b600080600060608486031215610ddb57600080fd5b505081359360208301359350604090920135919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561039a5761039a610df2565b6000816000190483118215151615610e3557610e35610df2565b500290565b8181038181111561039a5761039a610df2565b600082610e6a57634e487b7160e01b600052601260045260246000fd5b500490565b60005b83811015610e8a578181015183820152602001610e72565b50506000910152565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351610ecb816017850160208801610e6f565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351610efc816028840160208801610e6f565b01602801949350505050565b6020815260008251806020840152610f27816040850160208701610e6f565b601f01601f19169190910160400192915050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b600081610f7657610f76610df2565b506000190190565b634e487b7160e01b600052603160045260246000fdfea26469706673582212206c18e30f17a0145ebc7fa4f6e736d2773235480154bb1e2086402acd2b9bf91b64736f6c63430008100033";
const isSuperArgs = (xs)=>xs.length > 1;
class FixedPrice__factory extends __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ContractFactory"] {
    constructor(...args){
        if (isSuperArgs(args)) {
            super(...args);
        } else {
            super(_abi, _bytecode, args[0]);
        }
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    connect(runner) {
        return super.connect(runner);
    }
    static bytecode = _bytecode;
    static abi = _abi;
    static createInterface() {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$abi$2f$interface$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Interface"](_abi);
    }
    static connect(address, runner) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$contract$2f$contract$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Contract"](address, _abi, runner);
    }
} //# sourceMappingURL=FixedPrice__factory.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/market/factories/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
/* Autogenerated file. Do not edit manually. */ /* tslint:disable */ /* eslint-disable */ var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$market$2f$factories$2f$FixedPrice_$5f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/market/factories/FixedPrice__factory.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/market/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$market$2f$factories$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/market/factories/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$market$2f$factories$2f$FixedPrice_$5f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/market/factories/FixedPrice__factory.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GetSplitNum",
    ()=>GetSplitNum,
    "SegmentRange",
    ()=>SegmentRange,
    "checkExist",
    ()=>checkExist,
    "delay",
    ()=>delay,
    "getFlowContract",
    ()=>getFlowContract,
    "getMarketContract",
    ()=>getMarketContract,
    "txWithGasAdjustment",
    ()=>txWithGasAdjustment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$factories$2f$FixedPriceFlow_$5f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/factories/FixedPriceFlow__factory.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$market$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/market/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$market$2f$factories$2f$FixedPrice_$5f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/market/factories/FixedPrice__factory.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/constant.js [app-route] (ecmascript)");
;
;
;
;
;
function getFlowContract(address, signer) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$factories$2f$FixedPriceFlow_$5f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FixedPriceFlow__factory"].connect(address, signer);
}
function getMarketContract(address, runner) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$market$2f$factories$2f$FixedPrice_$5f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FixedPrice__factory"].connect(address, runner);
}
const delay = (ms)=>new Promise((res)=>setTimeout(res, ms));
function checkExist(inputPath) {
    const dirName = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(inputPath);
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(dirName)) {
        return true;
    }
    if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(inputPath) && __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].lstatSync(inputPath).isDirectory()) {
        return true;
    }
    // Check if the directory exists and the file does not exist
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(inputPath)) {
        return false;
    }
    return true;
}
function GetSplitNum(total, unit) {
    return Math.floor((total - 1) / unit + 1);
}
function SegmentRange(startChunkIndex, fileSize) {
    // Calculate total number of chunks for the file
    const totalChunks = GetSplitNum(fileSize, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"]);
    // Calculate the starting segment index using integer division
    const startSegmentIndex = Math.floor(startChunkIndex / __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_MAX_CHUNKS"]);
    // Calculate the ending chunk index and then the segment index
    const endChunkIndex = startChunkIndex + totalChunks - 1;
    const endSegmentIndex = Math.floor(endChunkIndex / __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_MAX_CHUNKS"]);
    return [
        startSegmentIndex,
        endSegmentIndex
    ];
}
async function txWithGasAdjustment(contract, provider, method, params, txOpts, retryOpts) {
    let current_gas_price = txOpts.gasPrice; // gas price is required in txOpts
    let maxGasPrice = current_gas_price;
    if (retryOpts !== undefined && retryOpts.MaxGasPrice > 0) {
        maxGasPrice = BigInt(retryOpts.MaxGasPrice);
    }
    while(current_gas_price <= maxGasPrice){
        console.log(`Sending transaction with gas price ${current_gas_price}`);
        txOpts.gasPrice = current_gas_price;
        try {
            let resp = await contract.getFunction(method).send(...params, txOpts);
            const tx = await Promise.race([
                resp.wait(),
                new Promise((_, reject)=>setTimeout(()=>reject(new Error('Transaction timeout')), __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TIMEOUT_MS"]))
            ]);
            if (tx === null) {
                throw new Error('Send transaction timeout');
            }
            let receipt = await waitForReceipt(provider, tx.hash, retryOpts);
            if (receipt === null) {
                throw new Error('Get transaction receipt timeout');
            }
            return receipt;
        } catch (e) {
            console.log(`Failed to send transaction with gas price ${current_gas_price}, with error ${e}, retrying with higher gas price`);
            current_gas_price = BigInt(11) * BigInt(current_gas_price) / BigInt(10);
        }
    }
    return null;
}
async function waitForReceipt(provider, txHash, opts) {
    var receipt = null;
    if (opts === undefined) {
        opts = {
            Retries: 10,
            Interval: 5,
            MaxGasPrice: 0
        };
    }
    if (opts.Retries === undefined || opts.Retries === 0) {
        opts.Retries = 10;
    }
    if (opts.Interval === undefined || opts.Interval === 0) {
        opts.Interval = 5;
    }
    let nTries = 0;
    while(nTries < opts.Retries){
        receipt = await provider.getTransactionReceipt(txHash);
        if (receipt !== null && receipt.status == 1) {
            return receipt;
        }
        await delay(opts.Interval * 1000);
        nTries++;
    }
    return null;
} //# sourceMappingURL=utils.js.map
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/bind.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function bind(fn, thisArg) {
    return function wrap() {
        var args = new Array(arguments.length);
        for(var i = 0; i < args.length; i++){
            args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
    };
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var bind = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/bind.js [app-route] (ecmascript)");
// utils is a library of generic helper functions non-specific to axios
var toString = Object.prototype.toString;
// eslint-disable-next-line func-names
var kindOf = function(cache) {
    // eslint-disable-next-line func-names
    return function(thing) {
        var str = toString.call(thing);
        return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
    };
}(Object.create(null));
function kindOfTest(type) {
    type = type.toLowerCase();
    return function isKindOf(thing) {
        return kindOf(thing) === type;
    };
}
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */ function isArray(val) {
    return Array.isArray(val);
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */ function isUndefined(val) {
    return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */ function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */ var isArrayBuffer = kindOfTest('ArrayBuffer');
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */ function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
    } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
    }
    return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */ function isString(val) {
    return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */ function isNumber(val) {
    return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */ function isObject(val) {
    return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */ function isPlainObject(val) {
    if (kindOf(val) !== 'object') {
        return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}
/**
 * Determine if a value is a Date
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */ var isDate = kindOfTest('Date');
/**
 * Determine if a value is a File
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */ var isFile = kindOfTest('File');
/**
 * Determine if a value is a Blob
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */ var isBlob = kindOfTest('Blob');
/**
 * Determine if a value is a FileList
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */ var isFileList = kindOfTest('FileList');
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */ function isFunction(val) {
    return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */ function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} thing The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */ function isFormData(thing) {
    var pattern = '[object FormData]';
    return thing && (typeof FormData === 'function' && thing instanceof FormData || toString.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
}
/**
 * Determine if a value is a URLSearchParams object
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */ var isURLSearchParams = kindOfTest('URLSearchParams');
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */ function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */ function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
        return false;
    }
    return ("TURBOPACK compile-time value", "undefined") !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */ function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
        return;
    }
    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/ obj = [
            obj
        ];
    }
    if (isArray(obj)) {
        // Iterate over array values
        for(var i = 0, l = obj.length; i < l; i++){
            fn.call(null, obj[i], i, obj);
        }
    } else {
        // Iterate over object keys
        for(var key in obj){
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */ function merge() {
    var result = {};
    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
            result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
            result[key] = merge({}, val);
        } else if (isArray(val)) {
            result[key] = val.slice();
        } else {
            result[key] = val;
        }
    }
    for(var i = 0, l = arguments.length; i < l; i++){
        forEach(arguments[i], assignValue);
    }
    return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */ function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
            a[key] = bind(val, thisArg);
        } else {
            a[key] = val;
        }
    });
    return a;
}
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */ function stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }
    return content;
}
/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 */ function inherits(constructor, superConstructor, props, descriptors) {
    constructor.prototype = Object.create(superConstructor.prototype, descriptors);
    constructor.prototype.constructor = constructor;
    props && Object.assign(constructor.prototype, props);
}
/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function} [filter]
 * @returns {Object}
 */ function toFlatObject(sourceObj, destObj, filter) {
    var props;
    var i;
    var prop;
    var merged = {};
    destObj = destObj || {};
    do {
        props = Object.getOwnPropertyNames(sourceObj);
        i = props.length;
        while(i-- > 0){
            prop = props[i];
            if (!merged[prop]) {
                destObj[prop] = sourceObj[prop];
                merged[prop] = true;
            }
        }
        sourceObj = Object.getPrototypeOf(sourceObj);
    }while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype)
    return destObj;
}
/*
 * determines whether a string ends with the characters of a specified string
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 * @returns {boolean}
 */ function endsWith(str, searchString, position) {
    str = String(str);
    if (position === undefined || position > str.length) {
        position = str.length;
    }
    position -= searchString.length;
    var lastIndex = str.indexOf(searchString, position);
    return lastIndex !== -1 && lastIndex === position;
}
/**
 * Returns new array from array like object
 * @param {*} [thing]
 * @returns {Array}
 */ function toArray(thing) {
    if (!thing) return null;
    var i = thing.length;
    if (isUndefined(i)) return null;
    var arr = new Array(i);
    while(i-- > 0){
        arr[i] = thing[i];
    }
    return arr;
}
// eslint-disable-next-line func-names
var isTypedArray = function(TypedArray) {
    // eslint-disable-next-line func-names
    return function(thing) {
        return TypedArray && thing instanceof TypedArray;
    };
}(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));
module.exports = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM,
    inherits: inherits,
    toFlatObject: toFlatObject,
    kindOf: kindOf,
    kindOfTest: kindOfTest,
    endsWith: endsWith,
    toArray: toArray,
    isTypedArray: isTypedArray,
    isFileList: isFileList
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/AxiosError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */ function AxiosError(message, code, config, request, response) {
    Error.call(this);
    this.message = message;
    this.name = 'AxiosError';
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    response && (this.response = response);
}
utils.inherits(AxiosError, Error, {
    toJSON: function toJSON() {
        return {
            // Standard
            message: this.message,
            name: this.name,
            // Microsoft
            description: this.description,
            number: this.number,
            // Mozilla
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            // Axios
            config: this.config,
            code: this.code,
            status: this.response && this.response.status ? this.response.status : null
        };
    }
});
var prototype = AxiosError.prototype;
var descriptors = {};
[
    'ERR_BAD_OPTION_VALUE',
    'ERR_BAD_OPTION',
    'ECONNABORTED',
    'ETIMEDOUT',
    'ERR_NETWORK',
    'ERR_FR_TOO_MANY_REDIRECTS',
    'ERR_DEPRECATED',
    'ERR_BAD_RESPONSE',
    'ERR_BAD_REQUEST',
    'ERR_CANCELED'
].forEach(function(code) {
    descriptors[code] = {
        value: code
    };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {
    value: true
});
// eslint-disable-next-line func-names
AxiosError.from = function(error, code, config, request, response, customProps) {
    var axiosError = Object.create(prototype);
    utils.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
    });
    AxiosError.call(axiosError, error.message, code, config, request, response);
    axiosError.name = error.name;
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
};
module.exports = AxiosError;
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/cancel/CanceledError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var AxiosError = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/AxiosError.js [app-route] (ecmascript)");
var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */ function CanceledError(message) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED);
    this.name = 'CanceledError';
}
utils.inherits(CanceledError, AxiosError, {
    __CANCEL__: true
});
module.exports = CanceledError;
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/cancel/CancelToken.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var CanceledError = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/cancel/CanceledError.js [app-route] (ecmascript)");
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */ function CancelToken(executor) {
    if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
    });
    var token = this;
    // eslint-disable-next-line func-names
    this.promise.then(function(cancel) {
        if (!token._listeners) return;
        var i;
        var l = token._listeners.length;
        for(i = 0; i < l; i++){
            token._listeners[i](cancel);
        }
        token._listeners = null;
    });
    // eslint-disable-next-line func-names
    this.promise.then = function(onfulfilled) {
        var _resolve;
        // eslint-disable-next-line func-names
        var promise = new Promise(function(resolve) {
            token.subscribe(resolve);
            _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
            token.unsubscribe(_resolve);
        };
        return promise;
    };
    executor(function cancel(message) {
        if (token.reason) {
            // Cancellation has already been requested
            return;
        }
        token.reason = new CanceledError(message);
        resolvePromise(token.reason);
    });
}
/**
 * Throws a `CanceledError` if cancellation has been requested.
 */ CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
        throw this.reason;
    }
};
/**
 * Subscribe to the cancel signal
 */ CancelToken.prototype.subscribe = function subscribe(listener) {
    if (this.reason) {
        listener(this.reason);
        return;
    }
    if (this._listeners) {
        this._listeners.push(listener);
    } else {
        this._listeners = [
            listener
        ];
    }
};
/**
 * Unsubscribe from the cancel signal
 */ CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
    if (!this._listeners) {
        return;
    }
    var index = this._listeners.indexOf(listener);
    if (index !== -1) {
        this._listeners.splice(index, 1);
    }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */ CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
        cancel = c;
    });
    return {
        token: token,
        cancel: cancel
    };
};
module.exports = CancelToken;
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/cancel/isCancel.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function isCancel(value) {
    return !!(value && value.__CANCEL__);
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/env/data.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "version": "0.27.2"
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/toFormData.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
/**
 * Convert a data object to FormData
 * @param {Object} obj
 * @param {?Object} [formData]
 * @returns {Object}
 **/ function toFormData(obj, formData) {
    // eslint-disable-next-line no-param-reassign
    formData = formData || new FormData();
    var stack = [];
    function convertValue(value) {
        if (value === null) return '';
        if (utils.isDate(value)) {
            return value.toISOString();
        }
        if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
            return typeof Blob === 'function' ? new Blob([
                value
            ]) : Buffer.from(value);
        }
        return value;
    }
    function build(data, parentKey) {
        if (utils.isPlainObject(data) || utils.isArray(data)) {
            if (stack.indexOf(data) !== -1) {
                throw Error('Circular reference detected in ' + parentKey);
            }
            stack.push(data);
            utils.forEach(data, function each(value, key) {
                if (utils.isUndefined(value)) return;
                var fullKey = parentKey ? parentKey + '.' + key : key;
                var arr;
                if (value && !parentKey && typeof value === 'object') {
                    if (utils.endsWith(key, '{}')) {
                        // eslint-disable-next-line no-param-reassign
                        value = JSON.stringify(value);
                    } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
                        // eslint-disable-next-line func-names
                        arr.forEach(function(el) {
                            !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
                        });
                        return;
                    }
                }
                build(value, fullKey);
            });
            stack.pop();
        } else {
            formData.append(parentKey, convertValue(data));
        }
    }
    build(obj);
    return formData;
}
module.exports = toFormData;
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/spread.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */ module.exports = function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr);
    };
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/isAxiosError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */ module.exports = function isAxiosError(payload) {
    return utils.isObject(payload) && payload.isAxiosError === true;
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/buildURL.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */ module.exports = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/ if (!params) {
        return url;
    }
    var serializedParams;
    if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
    } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
            if (val === null || typeof val === 'undefined') {
                return;
            }
            if (utils.isArray(val)) {
                key = key + '[]';
            } else {
                val = [
                    val
                ];
            }
            utils.forEach(val, function parseValue(v) {
                if (utils.isDate(v)) {
                    v = v.toISOString();
                } else if (utils.isObject(v)) {
                    v = JSON.stringify(v);
                }
                parts.push(encode(key) + '=' + encode(v));
            });
        });
        serializedParams = parts.join('&');
    }
    if (serializedParams) {
        var hashmarkIndex = url.indexOf('#');
        if (hashmarkIndex !== -1) {
            url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/InterceptorManager.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
function InterceptorManager() {
    this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */ InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
    this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */ InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
        this.handlers[id] = null;
    }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */ InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
            fn(h);
        }
    });
};
module.exports = InterceptorManager;
}),
"[project]/node_modules/delayed-stream/lib/delayed_stream.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Stream;
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
module.exports = DelayedStream;
function DelayedStream() {
    this.source = null;
    this.dataSize = 0;
    this.maxDataSize = 1024 * 1024;
    this.pauseStream = true;
    this._maxDataSizeExceeded = false;
    this._released = false;
    this._bufferedEvents = [];
}
util.inherits(DelayedStream, Stream);
DelayedStream.create = function(source, options) {
    var delayedStream = new this();
    options = options || {};
    for(var option in options){
        delayedStream[option] = options[option];
    }
    delayedStream.source = source;
    var realEmit = source.emit;
    source.emit = function() {
        delayedStream._handleEmit(arguments);
        return realEmit.apply(source, arguments);
    };
    source.on('error', function() {});
    if (delayedStream.pauseStream) {
        source.pause();
    }
    return delayedStream;
};
Object.defineProperty(DelayedStream.prototype, 'readable', {
    configurable: true,
    enumerable: true,
    get: function() {
        return this.source.readable;
    }
});
DelayedStream.prototype.setEncoding = function() {
    return this.source.setEncoding.apply(this.source, arguments);
};
DelayedStream.prototype.resume = function() {
    if (!this._released) {
        this.release();
    }
    this.source.resume();
};
DelayedStream.prototype.pause = function() {
    this.source.pause();
};
DelayedStream.prototype.release = function() {
    this._released = true;
    this._bufferedEvents.forEach((function(args) {
        this.emit.apply(this, args);
    }).bind(this));
    this._bufferedEvents = [];
};
DelayedStream.prototype.pipe = function() {
    var r = Stream.prototype.pipe.apply(this, arguments);
    this.resume();
    return r;
};
DelayedStream.prototype._handleEmit = function(args) {
    if (this._released) {
        this.emit.apply(this, args);
        return;
    }
    if (args[0] === 'data') {
        this.dataSize += args[1].length;
        this._checkIfMaxDataSizeExceeded();
    }
    this._bufferedEvents.push(args);
};
DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
    if (this._maxDataSizeExceeded) {
        return;
    }
    if (this.dataSize <= this.maxDataSize) {
        return;
    }
    this._maxDataSizeExceeded = true;
    var message = 'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
    this.emit('error', new Error(message));
};
}),
"[project]/node_modules/combined-stream/lib/combined_stream.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Stream;
var DelayedStream = __turbopack_context__.r("[project]/node_modules/delayed-stream/lib/delayed_stream.js [app-route] (ecmascript)");
module.exports = CombinedStream;
function CombinedStream() {
    this.writable = false;
    this.readable = true;
    this.dataSize = 0;
    this.maxDataSize = 2 * 1024 * 1024;
    this.pauseStreams = true;
    this._released = false;
    this._streams = [];
    this._currentStream = null;
    this._insideLoop = false;
    this._pendingNext = false;
}
util.inherits(CombinedStream, Stream);
CombinedStream.create = function(options) {
    var combinedStream = new this();
    options = options || {};
    for(var option in options){
        combinedStream[option] = options[option];
    }
    return combinedStream;
};
CombinedStream.isStreamLike = function(stream) {
    return typeof stream !== 'function' && typeof stream !== 'string' && typeof stream !== 'boolean' && typeof stream !== 'number' && !Buffer.isBuffer(stream);
};
CombinedStream.prototype.append = function(stream) {
    var isStreamLike = CombinedStream.isStreamLike(stream);
    if (isStreamLike) {
        if (!(stream instanceof DelayedStream)) {
            var newStream = DelayedStream.create(stream, {
                maxDataSize: Infinity,
                pauseStream: this.pauseStreams
            });
            stream.on('data', this._checkDataSize.bind(this));
            stream = newStream;
        }
        this._handleErrors(stream);
        if (this.pauseStreams) {
            stream.pause();
        }
    }
    this._streams.push(stream);
    return this;
};
CombinedStream.prototype.pipe = function(dest, options) {
    Stream.prototype.pipe.call(this, dest, options);
    this.resume();
    return dest;
};
CombinedStream.prototype._getNext = function() {
    this._currentStream = null;
    if (this._insideLoop) {
        this._pendingNext = true;
        return; // defer call
    }
    this._insideLoop = true;
    try {
        do {
            this._pendingNext = false;
            this._realGetNext();
        }while (this._pendingNext)
    } finally{
        this._insideLoop = false;
    }
};
CombinedStream.prototype._realGetNext = function() {
    var stream = this._streams.shift();
    if (typeof stream == 'undefined') {
        this.end();
        return;
    }
    if (typeof stream !== 'function') {
        this._pipeNext(stream);
        return;
    }
    var getStream = stream;
    getStream((function(stream) {
        var isStreamLike = CombinedStream.isStreamLike(stream);
        if (isStreamLike) {
            stream.on('data', this._checkDataSize.bind(this));
            this._handleErrors(stream);
        }
        this._pipeNext(stream);
    }).bind(this));
};
CombinedStream.prototype._pipeNext = function(stream) {
    this._currentStream = stream;
    var isStreamLike = CombinedStream.isStreamLike(stream);
    if (isStreamLike) {
        stream.on('end', this._getNext.bind(this));
        stream.pipe(this, {
            end: false
        });
        return;
    }
    var value = stream;
    this.write(value);
    this._getNext();
};
CombinedStream.prototype._handleErrors = function(stream) {
    var self = this;
    stream.on('error', function(err) {
        self._emitError(err);
    });
};
CombinedStream.prototype.write = function(data) {
    this.emit('data', data);
};
CombinedStream.prototype.pause = function() {
    if (!this.pauseStreams) {
        return;
    }
    if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == 'function') this._currentStream.pause();
    this.emit('pause');
};
CombinedStream.prototype.resume = function() {
    if (!this._released) {
        this._released = true;
        this.writable = true;
        this._getNext();
    }
    if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == 'function') this._currentStream.resume();
    this.emit('resume');
};
CombinedStream.prototype.end = function() {
    this._reset();
    this.emit('end');
};
CombinedStream.prototype.destroy = function() {
    this._reset();
    this.emit('close');
};
CombinedStream.prototype._reset = function() {
    this.writable = false;
    this._streams = [];
    this._currentStream = null;
};
CombinedStream.prototype._checkDataSize = function() {
    this._updateDataSize();
    if (this.dataSize <= this.maxDataSize) {
        return;
    }
    var message = 'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
    this._emitError(new Error(message));
};
CombinedStream.prototype._updateDataSize = function() {
    this.dataSize = 0;
    var self = this;
    this._streams.forEach(function(stream) {
        if (!stream.dataSize) {
            return;
        }
        self.dataSize += stream.dataSize;
    });
    if (this._currentStream && this._currentStream.dataSize) {
        this.dataSize += this._currentStream.dataSize;
    }
};
CombinedStream.prototype._emitError = function(err) {
    this._reset();
    this.emit('error', err);
};
}),
"[project]/node_modules/mime-db/db.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"application/1d-interleaved-parityfec\":{\"source\":\"iana\"},\"application/3gpdash-qoe-report+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/3gpp-ims+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/3gpphal+json\":{\"source\":\"iana\",\"compressible\":true},\"application/3gpphalforms+json\":{\"source\":\"iana\",\"compressible\":true},\"application/a2l\":{\"source\":\"iana\"},\"application/ace+cbor\":{\"source\":\"iana\"},\"application/activemessage\":{\"source\":\"iana\"},\"application/activity+json\":{\"source\":\"iana\",\"compressible\":true},\"application/alto-costmap+json\":{\"source\":\"iana\",\"compressible\":true},\"application/alto-costmapfilter+json\":{\"source\":\"iana\",\"compressible\":true},\"application/alto-directory+json\":{\"source\":\"iana\",\"compressible\":true},\"application/alto-endpointcost+json\":{\"source\":\"iana\",\"compressible\":true},\"application/alto-endpointcostparams+json\":{\"source\":\"iana\",\"compressible\":true},\"application/alto-endpointprop+json\":{\"source\":\"iana\",\"compressible\":true},\"application/alto-endpointpropparams+json\":{\"source\":\"iana\",\"compressible\":true},\"application/alto-error+json\":{\"source\":\"iana\",\"compressible\":true},\"application/alto-networkmap+json\":{\"source\":\"iana\",\"compressible\":true},\"application/alto-networkmapfilter+json\":{\"source\":\"iana\",\"compressible\":true},\"application/alto-updatestreamcontrol+json\":{\"source\":\"iana\",\"compressible\":true},\"application/alto-updatestreamparams+json\":{\"source\":\"iana\",\"compressible\":true},\"application/aml\":{\"source\":\"iana\"},\"application/andrew-inset\":{\"source\":\"iana\",\"extensions\":[\"ez\"]},\"application/applefile\":{\"source\":\"iana\"},\"application/applixware\":{\"source\":\"apache\",\"extensions\":[\"aw\"]},\"application/at+jwt\":{\"source\":\"iana\"},\"application/atf\":{\"source\":\"iana\"},\"application/atfx\":{\"source\":\"iana\"},\"application/atom+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"atom\"]},\"application/atomcat+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"atomcat\"]},\"application/atomdeleted+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"atomdeleted\"]},\"application/atomicmail\":{\"source\":\"iana\"},\"application/atomsvc+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"atomsvc\"]},\"application/atsc-dwd+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"dwd\"]},\"application/atsc-dynamic-event-message\":{\"source\":\"iana\"},\"application/atsc-held+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"held\"]},\"application/atsc-rdt+json\":{\"source\":\"iana\",\"compressible\":true},\"application/atsc-rsat+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"rsat\"]},\"application/atxml\":{\"source\":\"iana\"},\"application/auth-policy+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/bacnet-xdd+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/batch-smtp\":{\"source\":\"iana\"},\"application/bdoc\":{\"compressible\":false,\"extensions\":[\"bdoc\"]},\"application/beep+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/calendar+json\":{\"source\":\"iana\",\"compressible\":true},\"application/calendar+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xcs\"]},\"application/call-completion\":{\"source\":\"iana\"},\"application/cals-1840\":{\"source\":\"iana\"},\"application/captive+json\":{\"source\":\"iana\",\"compressible\":true},\"application/cbor\":{\"source\":\"iana\"},\"application/cbor-seq\":{\"source\":\"iana\"},\"application/cccex\":{\"source\":\"iana\"},\"application/ccmp+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/ccxml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"ccxml\"]},\"application/cdfx+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"cdfx\"]},\"application/cdmi-capability\":{\"source\":\"iana\",\"extensions\":[\"cdmia\"]},\"application/cdmi-container\":{\"source\":\"iana\",\"extensions\":[\"cdmic\"]},\"application/cdmi-domain\":{\"source\":\"iana\",\"extensions\":[\"cdmid\"]},\"application/cdmi-object\":{\"source\":\"iana\",\"extensions\":[\"cdmio\"]},\"application/cdmi-queue\":{\"source\":\"iana\",\"extensions\":[\"cdmiq\"]},\"application/cdni\":{\"source\":\"iana\"},\"application/cea\":{\"source\":\"iana\"},\"application/cea-2018+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/cellml+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/cfw\":{\"source\":\"iana\"},\"application/city+json\":{\"source\":\"iana\",\"compressible\":true},\"application/clr\":{\"source\":\"iana\"},\"application/clue+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/clue_info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/cms\":{\"source\":\"iana\"},\"application/cnrp+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/coap-group+json\":{\"source\":\"iana\",\"compressible\":true},\"application/coap-payload\":{\"source\":\"iana\"},\"application/commonground\":{\"source\":\"iana\"},\"application/conference-info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/cose\":{\"source\":\"iana\"},\"application/cose-key\":{\"source\":\"iana\"},\"application/cose-key-set\":{\"source\":\"iana\"},\"application/cpl+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"cpl\"]},\"application/csrattrs\":{\"source\":\"iana\"},\"application/csta+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/cstadata+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/csvm+json\":{\"source\":\"iana\",\"compressible\":true},\"application/cu-seeme\":{\"source\":\"apache\",\"extensions\":[\"cu\"]},\"application/cwt\":{\"source\":\"iana\"},\"application/cybercash\":{\"source\":\"iana\"},\"application/dart\":{\"compressible\":true},\"application/dash+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"mpd\"]},\"application/dash-patch+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"mpp\"]},\"application/dashdelta\":{\"source\":\"iana\"},\"application/davmount+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"davmount\"]},\"application/dca-rft\":{\"source\":\"iana\"},\"application/dcd\":{\"source\":\"iana\"},\"application/dec-dx\":{\"source\":\"iana\"},\"application/dialog-info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/dicom\":{\"source\":\"iana\"},\"application/dicom+json\":{\"source\":\"iana\",\"compressible\":true},\"application/dicom+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/dii\":{\"source\":\"iana\"},\"application/dit\":{\"source\":\"iana\"},\"application/dns\":{\"source\":\"iana\"},\"application/dns+json\":{\"source\":\"iana\",\"compressible\":true},\"application/dns-message\":{\"source\":\"iana\"},\"application/docbook+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"dbk\"]},\"application/dots+cbor\":{\"source\":\"iana\"},\"application/dskpp+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/dssc+der\":{\"source\":\"iana\",\"extensions\":[\"dssc\"]},\"application/dssc+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xdssc\"]},\"application/dvcs\":{\"source\":\"iana\"},\"application/ecmascript\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"es\",\"ecma\"]},\"application/edi-consent\":{\"source\":\"iana\"},\"application/edi-x12\":{\"source\":\"iana\",\"compressible\":false},\"application/edifact\":{\"source\":\"iana\",\"compressible\":false},\"application/efi\":{\"source\":\"iana\"},\"application/elm+json\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/elm+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/emergencycalldata.cap+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/emergencycalldata.comment+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/emergencycalldata.control+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/emergencycalldata.deviceinfo+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/emergencycalldata.ecall.msd\":{\"source\":\"iana\"},\"application/emergencycalldata.providerinfo+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/emergencycalldata.serviceinfo+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/emergencycalldata.subscriberinfo+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/emergencycalldata.veds+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/emma+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"emma\"]},\"application/emotionml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"emotionml\"]},\"application/encaprtp\":{\"source\":\"iana\"},\"application/epp+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/epub+zip\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"epub\"]},\"application/eshop\":{\"source\":\"iana\"},\"application/exi\":{\"source\":\"iana\",\"extensions\":[\"exi\"]},\"application/expect-ct-report+json\":{\"source\":\"iana\",\"compressible\":true},\"application/express\":{\"source\":\"iana\",\"extensions\":[\"exp\"]},\"application/fastinfoset\":{\"source\":\"iana\"},\"application/fastsoap\":{\"source\":\"iana\"},\"application/fdt+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"fdt\"]},\"application/fhir+json\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/fhir+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/fido.trusted-apps+json\":{\"compressible\":true},\"application/fits\":{\"source\":\"iana\"},\"application/flexfec\":{\"source\":\"iana\"},\"application/font-sfnt\":{\"source\":\"iana\"},\"application/font-tdpfr\":{\"source\":\"iana\",\"extensions\":[\"pfr\"]},\"application/font-woff\":{\"source\":\"iana\",\"compressible\":false},\"application/framework-attributes+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/geo+json\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"geojson\"]},\"application/geo+json-seq\":{\"source\":\"iana\"},\"application/geopackage+sqlite3\":{\"source\":\"iana\"},\"application/geoxacml+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/gltf-buffer\":{\"source\":\"iana\"},\"application/gml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"gml\"]},\"application/gpx+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"gpx\"]},\"application/gxf\":{\"source\":\"apache\",\"extensions\":[\"gxf\"]},\"application/gzip\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"gz\"]},\"application/h224\":{\"source\":\"iana\"},\"application/held+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/hjson\":{\"extensions\":[\"hjson\"]},\"application/http\":{\"source\":\"iana\"},\"application/hyperstudio\":{\"source\":\"iana\",\"extensions\":[\"stk\"]},\"application/ibe-key-request+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/ibe-pkg-reply+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/ibe-pp-data\":{\"source\":\"iana\"},\"application/iges\":{\"source\":\"iana\"},\"application/im-iscomposing+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/index\":{\"source\":\"iana\"},\"application/index.cmd\":{\"source\":\"iana\"},\"application/index.obj\":{\"source\":\"iana\"},\"application/index.response\":{\"source\":\"iana\"},\"application/index.vnd\":{\"source\":\"iana\"},\"application/inkml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"ink\",\"inkml\"]},\"application/iotp\":{\"source\":\"iana\"},\"application/ipfix\":{\"source\":\"iana\",\"extensions\":[\"ipfix\"]},\"application/ipp\":{\"source\":\"iana\"},\"application/isup\":{\"source\":\"iana\"},\"application/its+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"its\"]},\"application/java-archive\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"jar\",\"war\",\"ear\"]},\"application/java-serialized-object\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"ser\"]},\"application/java-vm\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"class\"]},\"application/javascript\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true,\"extensions\":[\"js\",\"mjs\"]},\"application/jf2feed+json\":{\"source\":\"iana\",\"compressible\":true},\"application/jose\":{\"source\":\"iana\"},\"application/jose+json\":{\"source\":\"iana\",\"compressible\":true},\"application/jrd+json\":{\"source\":\"iana\",\"compressible\":true},\"application/jscalendar+json\":{\"source\":\"iana\",\"compressible\":true},\"application/json\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true,\"extensions\":[\"json\",\"map\"]},\"application/json-patch+json\":{\"source\":\"iana\",\"compressible\":true},\"application/json-seq\":{\"source\":\"iana\"},\"application/json5\":{\"extensions\":[\"json5\"]},\"application/jsonml+json\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"jsonml\"]},\"application/jwk+json\":{\"source\":\"iana\",\"compressible\":true},\"application/jwk-set+json\":{\"source\":\"iana\",\"compressible\":true},\"application/jwt\":{\"source\":\"iana\"},\"application/kpml-request+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/kpml-response+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/ld+json\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"jsonld\"]},\"application/lgr+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"lgr\"]},\"application/link-format\":{\"source\":\"iana\"},\"application/load-control+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/lost+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"lostxml\"]},\"application/lostsync+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/lpf+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/lxf\":{\"source\":\"iana\"},\"application/mac-binhex40\":{\"source\":\"iana\",\"extensions\":[\"hqx\"]},\"application/mac-compactpro\":{\"source\":\"apache\",\"extensions\":[\"cpt\"]},\"application/macwriteii\":{\"source\":\"iana\"},\"application/mads+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"mads\"]},\"application/manifest+json\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true,\"extensions\":[\"webmanifest\"]},\"application/marc\":{\"source\":\"iana\",\"extensions\":[\"mrc\"]},\"application/marcxml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"mrcx\"]},\"application/mathematica\":{\"source\":\"iana\",\"extensions\":[\"ma\",\"nb\",\"mb\"]},\"application/mathml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"mathml\"]},\"application/mathml-content+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mathml-presentation+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mbms-associated-procedure-description+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mbms-deregister+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mbms-envelope+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mbms-msk+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mbms-msk-response+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mbms-protection-description+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mbms-reception-report+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mbms-register+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mbms-register-response+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mbms-schedule+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mbms-user-service-description+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mbox\":{\"source\":\"iana\",\"extensions\":[\"mbox\"]},\"application/media-policy-dataset+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"mpf\"]},\"application/media_control+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mediaservercontrol+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"mscml\"]},\"application/merge-patch+json\":{\"source\":\"iana\",\"compressible\":true},\"application/metalink+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"metalink\"]},\"application/metalink4+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"meta4\"]},\"application/mets+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"mets\"]},\"application/mf4\":{\"source\":\"iana\"},\"application/mikey\":{\"source\":\"iana\"},\"application/mipc\":{\"source\":\"iana\"},\"application/missing-blocks+cbor-seq\":{\"source\":\"iana\"},\"application/mmt-aei+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"maei\"]},\"application/mmt-usd+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"musd\"]},\"application/mods+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"mods\"]},\"application/moss-keys\":{\"source\":\"iana\"},\"application/moss-signature\":{\"source\":\"iana\"},\"application/mosskey-data\":{\"source\":\"iana\"},\"application/mosskey-request\":{\"source\":\"iana\"},\"application/mp21\":{\"source\":\"iana\",\"extensions\":[\"m21\",\"mp21\"]},\"application/mp4\":{\"source\":\"iana\",\"extensions\":[\"mp4s\",\"m4p\"]},\"application/mpeg4-generic\":{\"source\":\"iana\"},\"application/mpeg4-iod\":{\"source\":\"iana\"},\"application/mpeg4-iod-xmt\":{\"source\":\"iana\"},\"application/mrb-consumer+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/mrb-publish+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/msc-ivr+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/msc-mixer+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/msword\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"doc\",\"dot\"]},\"application/mud+json\":{\"source\":\"iana\",\"compressible\":true},\"application/multipart-core\":{\"source\":\"iana\"},\"application/mxf\":{\"source\":\"iana\",\"extensions\":[\"mxf\"]},\"application/n-quads\":{\"source\":\"iana\",\"extensions\":[\"nq\"]},\"application/n-triples\":{\"source\":\"iana\",\"extensions\":[\"nt\"]},\"application/nasdata\":{\"source\":\"iana\"},\"application/news-checkgroups\":{\"source\":\"iana\",\"charset\":\"US-ASCII\"},\"application/news-groupinfo\":{\"source\":\"iana\",\"charset\":\"US-ASCII\"},\"application/news-transmission\":{\"source\":\"iana\"},\"application/nlsml+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/node\":{\"source\":\"iana\",\"extensions\":[\"cjs\"]},\"application/nss\":{\"source\":\"iana\"},\"application/oauth-authz-req+jwt\":{\"source\":\"iana\"},\"application/oblivious-dns-message\":{\"source\":\"iana\"},\"application/ocsp-request\":{\"source\":\"iana\"},\"application/ocsp-response\":{\"source\":\"iana\"},\"application/octet-stream\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"bin\",\"dms\",\"lrf\",\"mar\",\"so\",\"dist\",\"distz\",\"pkg\",\"bpk\",\"dump\",\"elc\",\"deploy\",\"exe\",\"dll\",\"deb\",\"dmg\",\"iso\",\"img\",\"msi\",\"msp\",\"msm\",\"buffer\"]},\"application/oda\":{\"source\":\"iana\",\"extensions\":[\"oda\"]},\"application/odm+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/odx\":{\"source\":\"iana\"},\"application/oebps-package+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"opf\"]},\"application/ogg\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"ogx\"]},\"application/omdoc+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"omdoc\"]},\"application/onenote\":{\"source\":\"apache\",\"extensions\":[\"onetoc\",\"onetoc2\",\"onetmp\",\"onepkg\"]},\"application/opc-nodeset+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/oscore\":{\"source\":\"iana\"},\"application/oxps\":{\"source\":\"iana\",\"extensions\":[\"oxps\"]},\"application/p21\":{\"source\":\"iana\"},\"application/p21+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/p2p-overlay+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"relo\"]},\"application/parityfec\":{\"source\":\"iana\"},\"application/passport\":{\"source\":\"iana\"},\"application/patch-ops-error+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xer\"]},\"application/pdf\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"pdf\"]},\"application/pdx\":{\"source\":\"iana\"},\"application/pem-certificate-chain\":{\"source\":\"iana\"},\"application/pgp-encrypted\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"pgp\"]},\"application/pgp-keys\":{\"source\":\"iana\",\"extensions\":[\"asc\"]},\"application/pgp-signature\":{\"source\":\"iana\",\"extensions\":[\"asc\",\"sig\"]},\"application/pics-rules\":{\"source\":\"apache\",\"extensions\":[\"prf\"]},\"application/pidf+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/pidf-diff+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/pkcs10\":{\"source\":\"iana\",\"extensions\":[\"p10\"]},\"application/pkcs12\":{\"source\":\"iana\"},\"application/pkcs7-mime\":{\"source\":\"iana\",\"extensions\":[\"p7m\",\"p7c\"]},\"application/pkcs7-signature\":{\"source\":\"iana\",\"extensions\":[\"p7s\"]},\"application/pkcs8\":{\"source\":\"iana\",\"extensions\":[\"p8\"]},\"application/pkcs8-encrypted\":{\"source\":\"iana\"},\"application/pkix-attr-cert\":{\"source\":\"iana\",\"extensions\":[\"ac\"]},\"application/pkix-cert\":{\"source\":\"iana\",\"extensions\":[\"cer\"]},\"application/pkix-crl\":{\"source\":\"iana\",\"extensions\":[\"crl\"]},\"application/pkix-pkipath\":{\"source\":\"iana\",\"extensions\":[\"pkipath\"]},\"application/pkixcmp\":{\"source\":\"iana\",\"extensions\":[\"pki\"]},\"application/pls+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"pls\"]},\"application/poc-settings+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/postscript\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"ai\",\"eps\",\"ps\"]},\"application/ppsp-tracker+json\":{\"source\":\"iana\",\"compressible\":true},\"application/problem+json\":{\"source\":\"iana\",\"compressible\":true},\"application/problem+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/provenance+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"provx\"]},\"application/prs.alvestrand.titrax-sheet\":{\"source\":\"iana\"},\"application/prs.cww\":{\"source\":\"iana\",\"extensions\":[\"cww\"]},\"application/prs.cyn\":{\"source\":\"iana\",\"charset\":\"7-BIT\"},\"application/prs.hpub+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/prs.nprend\":{\"source\":\"iana\"},\"application/prs.plucker\":{\"source\":\"iana\"},\"application/prs.rdf-xml-crypt\":{\"source\":\"iana\"},\"application/prs.xsf+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/pskc+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"pskcxml\"]},\"application/pvd+json\":{\"source\":\"iana\",\"compressible\":true},\"application/qsig\":{\"source\":\"iana\"},\"application/raml+yaml\":{\"compressible\":true,\"extensions\":[\"raml\"]},\"application/raptorfec\":{\"source\":\"iana\"},\"application/rdap+json\":{\"source\":\"iana\",\"compressible\":true},\"application/rdf+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"rdf\",\"owl\"]},\"application/reginfo+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"rif\"]},\"application/relax-ng-compact-syntax\":{\"source\":\"iana\",\"extensions\":[\"rnc\"]},\"application/remote-printing\":{\"source\":\"iana\"},\"application/reputon+json\":{\"source\":\"iana\",\"compressible\":true},\"application/resource-lists+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"rl\"]},\"application/resource-lists-diff+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"rld\"]},\"application/rfc+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/riscos\":{\"source\":\"iana\"},\"application/rlmi+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/rls-services+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"rs\"]},\"application/route-apd+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"rapd\"]},\"application/route-s-tsid+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"sls\"]},\"application/route-usd+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"rusd\"]},\"application/rpki-ghostbusters\":{\"source\":\"iana\",\"extensions\":[\"gbr\"]},\"application/rpki-manifest\":{\"source\":\"iana\",\"extensions\":[\"mft\"]},\"application/rpki-publication\":{\"source\":\"iana\"},\"application/rpki-roa\":{\"source\":\"iana\",\"extensions\":[\"roa\"]},\"application/rpki-updown\":{\"source\":\"iana\"},\"application/rsd+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"rsd\"]},\"application/rss+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"rss\"]},\"application/rtf\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"rtf\"]},\"application/rtploopback\":{\"source\":\"iana\"},\"application/rtx\":{\"source\":\"iana\"},\"application/samlassertion+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/samlmetadata+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/sarif+json\":{\"source\":\"iana\",\"compressible\":true},\"application/sarif-external-properties+json\":{\"source\":\"iana\",\"compressible\":true},\"application/sbe\":{\"source\":\"iana\"},\"application/sbml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"sbml\"]},\"application/scaip+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/scim+json\":{\"source\":\"iana\",\"compressible\":true},\"application/scvp-cv-request\":{\"source\":\"iana\",\"extensions\":[\"scq\"]},\"application/scvp-cv-response\":{\"source\":\"iana\",\"extensions\":[\"scs\"]},\"application/scvp-vp-request\":{\"source\":\"iana\",\"extensions\":[\"spq\"]},\"application/scvp-vp-response\":{\"source\":\"iana\",\"extensions\":[\"spp\"]},\"application/sdp\":{\"source\":\"iana\",\"extensions\":[\"sdp\"]},\"application/secevent+jwt\":{\"source\":\"iana\"},\"application/senml+cbor\":{\"source\":\"iana\"},\"application/senml+json\":{\"source\":\"iana\",\"compressible\":true},\"application/senml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"senmlx\"]},\"application/senml-etch+cbor\":{\"source\":\"iana\"},\"application/senml-etch+json\":{\"source\":\"iana\",\"compressible\":true},\"application/senml-exi\":{\"source\":\"iana\"},\"application/sensml+cbor\":{\"source\":\"iana\"},\"application/sensml+json\":{\"source\":\"iana\",\"compressible\":true},\"application/sensml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"sensmlx\"]},\"application/sensml-exi\":{\"source\":\"iana\"},\"application/sep+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/sep-exi\":{\"source\":\"iana\"},\"application/session-info\":{\"source\":\"iana\"},\"application/set-payment\":{\"source\":\"iana\"},\"application/set-payment-initiation\":{\"source\":\"iana\",\"extensions\":[\"setpay\"]},\"application/set-registration\":{\"source\":\"iana\"},\"application/set-registration-initiation\":{\"source\":\"iana\",\"extensions\":[\"setreg\"]},\"application/sgml\":{\"source\":\"iana\"},\"application/sgml-open-catalog\":{\"source\":\"iana\"},\"application/shf+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"shf\"]},\"application/sieve\":{\"source\":\"iana\",\"extensions\":[\"siv\",\"sieve\"]},\"application/simple-filter+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/simple-message-summary\":{\"source\":\"iana\"},\"application/simplesymbolcontainer\":{\"source\":\"iana\"},\"application/sipc\":{\"source\":\"iana\"},\"application/slate\":{\"source\":\"iana\"},\"application/smil\":{\"source\":\"iana\"},\"application/smil+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"smi\",\"smil\"]},\"application/smpte336m\":{\"source\":\"iana\"},\"application/soap+fastinfoset\":{\"source\":\"iana\"},\"application/soap+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/sparql-query\":{\"source\":\"iana\",\"extensions\":[\"rq\"]},\"application/sparql-results+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"srx\"]},\"application/spdx+json\":{\"source\":\"iana\",\"compressible\":true},\"application/spirits-event+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/sql\":{\"source\":\"iana\"},\"application/srgs\":{\"source\":\"iana\",\"extensions\":[\"gram\"]},\"application/srgs+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"grxml\"]},\"application/sru+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"sru\"]},\"application/ssdl+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"ssdl\"]},\"application/ssml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"ssml\"]},\"application/stix+json\":{\"source\":\"iana\",\"compressible\":true},\"application/swid+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"swidtag\"]},\"application/tamp-apex-update\":{\"source\":\"iana\"},\"application/tamp-apex-update-confirm\":{\"source\":\"iana\"},\"application/tamp-community-update\":{\"source\":\"iana\"},\"application/tamp-community-update-confirm\":{\"source\":\"iana\"},\"application/tamp-error\":{\"source\":\"iana\"},\"application/tamp-sequence-adjust\":{\"source\":\"iana\"},\"application/tamp-sequence-adjust-confirm\":{\"source\":\"iana\"},\"application/tamp-status-query\":{\"source\":\"iana\"},\"application/tamp-status-response\":{\"source\":\"iana\"},\"application/tamp-update\":{\"source\":\"iana\"},\"application/tamp-update-confirm\":{\"source\":\"iana\"},\"application/tar\":{\"compressible\":true},\"application/taxii+json\":{\"source\":\"iana\",\"compressible\":true},\"application/td+json\":{\"source\":\"iana\",\"compressible\":true},\"application/tei+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"tei\",\"teicorpus\"]},\"application/tetra_isi\":{\"source\":\"iana\"},\"application/thraud+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"tfi\"]},\"application/timestamp-query\":{\"source\":\"iana\"},\"application/timestamp-reply\":{\"source\":\"iana\"},\"application/timestamped-data\":{\"source\":\"iana\",\"extensions\":[\"tsd\"]},\"application/tlsrpt+gzip\":{\"source\":\"iana\"},\"application/tlsrpt+json\":{\"source\":\"iana\",\"compressible\":true},\"application/tnauthlist\":{\"source\":\"iana\"},\"application/token-introspection+jwt\":{\"source\":\"iana\"},\"application/toml\":{\"compressible\":true,\"extensions\":[\"toml\"]},\"application/trickle-ice-sdpfrag\":{\"source\":\"iana\"},\"application/trig\":{\"source\":\"iana\",\"extensions\":[\"trig\"]},\"application/ttml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"ttml\"]},\"application/tve-trigger\":{\"source\":\"iana\"},\"application/tzif\":{\"source\":\"iana\"},\"application/tzif-leap\":{\"source\":\"iana\"},\"application/ubjson\":{\"compressible\":false,\"extensions\":[\"ubj\"]},\"application/ulpfec\":{\"source\":\"iana\"},\"application/urc-grpsheet+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/urc-ressheet+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"rsheet\"]},\"application/urc-targetdesc+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"td\"]},\"application/urc-uisocketdesc+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vcard+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vcard+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vemmi\":{\"source\":\"iana\"},\"application/vividence.scriptfile\":{\"source\":\"apache\"},\"application/vnd.1000minds.decision-model+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"1km\"]},\"application/vnd.3gpp-prose+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp-prose-pc3ch+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp-v2x-local-service-information\":{\"source\":\"iana\"},\"application/vnd.3gpp.5gnas\":{\"source\":\"iana\"},\"application/vnd.3gpp.access-transfer-events+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.bsf+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.gmop+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.gtpc\":{\"source\":\"iana\"},\"application/vnd.3gpp.interworking-data\":{\"source\":\"iana\"},\"application/vnd.3gpp.lpp\":{\"source\":\"iana\"},\"application/vnd.3gpp.mc-signalling-ear\":{\"source\":\"iana\"},\"application/vnd.3gpp.mcdata-affiliation-command+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcdata-info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcdata-payload\":{\"source\":\"iana\"},\"application/vnd.3gpp.mcdata-service-config+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcdata-signalling\":{\"source\":\"iana\"},\"application/vnd.3gpp.mcdata-ue-config+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcdata-user-profile+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcptt-affiliation-command+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcptt-floor-request+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcptt-info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcptt-location-info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcptt-mbms-usage-info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcptt-service-config+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcptt-signed+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcptt-ue-config+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcptt-ue-init-config+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcptt-user-profile+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcvideo-affiliation-command+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcvideo-affiliation-info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcvideo-info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcvideo-location-info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcvideo-mbms-usage-info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcvideo-service-config+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcvideo-transmission-request+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcvideo-ue-config+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mcvideo-user-profile+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.mid-call+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.ngap\":{\"source\":\"iana\"},\"application/vnd.3gpp.pfcp\":{\"source\":\"iana\"},\"application/vnd.3gpp.pic-bw-large\":{\"source\":\"iana\",\"extensions\":[\"plb\"]},\"application/vnd.3gpp.pic-bw-small\":{\"source\":\"iana\",\"extensions\":[\"psb\"]},\"application/vnd.3gpp.pic-bw-var\":{\"source\":\"iana\",\"extensions\":[\"pvb\"]},\"application/vnd.3gpp.s1ap\":{\"source\":\"iana\"},\"application/vnd.3gpp.sms\":{\"source\":\"iana\"},\"application/vnd.3gpp.sms+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.srvcc-ext+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.srvcc-info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.state-and-event-info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp.ussd+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp2.bcmcsinfo+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.3gpp2.sms\":{\"source\":\"iana\"},\"application/vnd.3gpp2.tcap\":{\"source\":\"iana\",\"extensions\":[\"tcap\"]},\"application/vnd.3lightssoftware.imagescal\":{\"source\":\"iana\"},\"application/vnd.3m.post-it-notes\":{\"source\":\"iana\",\"extensions\":[\"pwn\"]},\"application/vnd.accpac.simply.aso\":{\"source\":\"iana\",\"extensions\":[\"aso\"]},\"application/vnd.accpac.simply.imp\":{\"source\":\"iana\",\"extensions\":[\"imp\"]},\"application/vnd.acucobol\":{\"source\":\"iana\",\"extensions\":[\"acu\"]},\"application/vnd.acucorp\":{\"source\":\"iana\",\"extensions\":[\"atc\",\"acutc\"]},\"application/vnd.adobe.air-application-installer-package+zip\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"air\"]},\"application/vnd.adobe.flash.movie\":{\"source\":\"iana\"},\"application/vnd.adobe.formscentral.fcdt\":{\"source\":\"iana\",\"extensions\":[\"fcdt\"]},\"application/vnd.adobe.fxp\":{\"source\":\"iana\",\"extensions\":[\"fxp\",\"fxpl\"]},\"application/vnd.adobe.partial-upload\":{\"source\":\"iana\"},\"application/vnd.adobe.xdp+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xdp\"]},\"application/vnd.adobe.xfdf\":{\"source\":\"iana\",\"extensions\":[\"xfdf\"]},\"application/vnd.aether.imp\":{\"source\":\"iana\"},\"application/vnd.afpc.afplinedata\":{\"source\":\"iana\"},\"application/vnd.afpc.afplinedata-pagedef\":{\"source\":\"iana\"},\"application/vnd.afpc.cmoca-cmresource\":{\"source\":\"iana\"},\"application/vnd.afpc.foca-charset\":{\"source\":\"iana\"},\"application/vnd.afpc.foca-codedfont\":{\"source\":\"iana\"},\"application/vnd.afpc.foca-codepage\":{\"source\":\"iana\"},\"application/vnd.afpc.modca\":{\"source\":\"iana\"},\"application/vnd.afpc.modca-cmtable\":{\"source\":\"iana\"},\"application/vnd.afpc.modca-formdef\":{\"source\":\"iana\"},\"application/vnd.afpc.modca-mediummap\":{\"source\":\"iana\"},\"application/vnd.afpc.modca-objectcontainer\":{\"source\":\"iana\"},\"application/vnd.afpc.modca-overlay\":{\"source\":\"iana\"},\"application/vnd.afpc.modca-pagesegment\":{\"source\":\"iana\"},\"application/vnd.age\":{\"source\":\"iana\",\"extensions\":[\"age\"]},\"application/vnd.ah-barcode\":{\"source\":\"iana\"},\"application/vnd.ahead.space\":{\"source\":\"iana\",\"extensions\":[\"ahead\"]},\"application/vnd.airzip.filesecure.azf\":{\"source\":\"iana\",\"extensions\":[\"azf\"]},\"application/vnd.airzip.filesecure.azs\":{\"source\":\"iana\",\"extensions\":[\"azs\"]},\"application/vnd.amadeus+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.amazon.ebook\":{\"source\":\"apache\",\"extensions\":[\"azw\"]},\"application/vnd.amazon.mobi8-ebook\":{\"source\":\"iana\"},\"application/vnd.americandynamics.acc\":{\"source\":\"iana\",\"extensions\":[\"acc\"]},\"application/vnd.amiga.ami\":{\"source\":\"iana\",\"extensions\":[\"ami\"]},\"application/vnd.amundsen.maze+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.android.ota\":{\"source\":\"iana\"},\"application/vnd.android.package-archive\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"apk\"]},\"application/vnd.anki\":{\"source\":\"iana\"},\"application/vnd.anser-web-certificate-issue-initiation\":{\"source\":\"iana\",\"extensions\":[\"cii\"]},\"application/vnd.anser-web-funds-transfer-initiation\":{\"source\":\"apache\",\"extensions\":[\"fti\"]},\"application/vnd.antix.game-component\":{\"source\":\"iana\",\"extensions\":[\"atx\"]},\"application/vnd.apache.arrow.file\":{\"source\":\"iana\"},\"application/vnd.apache.arrow.stream\":{\"source\":\"iana\"},\"application/vnd.apache.thrift.binary\":{\"source\":\"iana\"},\"application/vnd.apache.thrift.compact\":{\"source\":\"iana\"},\"application/vnd.apache.thrift.json\":{\"source\":\"iana\"},\"application/vnd.api+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.aplextor.warrp+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.apothekende.reservation+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.apple.installer+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"mpkg\"]},\"application/vnd.apple.keynote\":{\"source\":\"iana\",\"extensions\":[\"key\"]},\"application/vnd.apple.mpegurl\":{\"source\":\"iana\",\"extensions\":[\"m3u8\"]},\"application/vnd.apple.numbers\":{\"source\":\"iana\",\"extensions\":[\"numbers\"]},\"application/vnd.apple.pages\":{\"source\":\"iana\",\"extensions\":[\"pages\"]},\"application/vnd.apple.pkpass\":{\"compressible\":false,\"extensions\":[\"pkpass\"]},\"application/vnd.arastra.swi\":{\"source\":\"iana\"},\"application/vnd.aristanetworks.swi\":{\"source\":\"iana\",\"extensions\":[\"swi\"]},\"application/vnd.artisan+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.artsquare\":{\"source\":\"iana\"},\"application/vnd.astraea-software.iota\":{\"source\":\"iana\",\"extensions\":[\"iota\"]},\"application/vnd.audiograph\":{\"source\":\"iana\",\"extensions\":[\"aep\"]},\"application/vnd.autopackage\":{\"source\":\"iana\"},\"application/vnd.avalon+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.avistar+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.balsamiq.bmml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"bmml\"]},\"application/vnd.balsamiq.bmpr\":{\"source\":\"iana\"},\"application/vnd.banana-accounting\":{\"source\":\"iana\"},\"application/vnd.bbf.usp.error\":{\"source\":\"iana\"},\"application/vnd.bbf.usp.msg\":{\"source\":\"iana\"},\"application/vnd.bbf.usp.msg+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.bekitzur-stech+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.bint.med-content\":{\"source\":\"iana\"},\"application/vnd.biopax.rdf+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.blink-idb-value-wrapper\":{\"source\":\"iana\"},\"application/vnd.blueice.multipass\":{\"source\":\"iana\",\"extensions\":[\"mpm\"]},\"application/vnd.bluetooth.ep.oob\":{\"source\":\"iana\"},\"application/vnd.bluetooth.le.oob\":{\"source\":\"iana\"},\"application/vnd.bmi\":{\"source\":\"iana\",\"extensions\":[\"bmi\"]},\"application/vnd.bpf\":{\"source\":\"iana\"},\"application/vnd.bpf3\":{\"source\":\"iana\"},\"application/vnd.businessobjects\":{\"source\":\"iana\",\"extensions\":[\"rep\"]},\"application/vnd.byu.uapi+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.cab-jscript\":{\"source\":\"iana\"},\"application/vnd.canon-cpdl\":{\"source\":\"iana\"},\"application/vnd.canon-lips\":{\"source\":\"iana\"},\"application/vnd.capasystems-pg+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.cendio.thinlinc.clientconf\":{\"source\":\"iana\"},\"application/vnd.century-systems.tcp_stream\":{\"source\":\"iana\"},\"application/vnd.chemdraw+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"cdxml\"]},\"application/vnd.chess-pgn\":{\"source\":\"iana\"},\"application/vnd.chipnuts.karaoke-mmd\":{\"source\":\"iana\",\"extensions\":[\"mmd\"]},\"application/vnd.ciedi\":{\"source\":\"iana\"},\"application/vnd.cinderella\":{\"source\":\"iana\",\"extensions\":[\"cdy\"]},\"application/vnd.cirpack.isdn-ext\":{\"source\":\"iana\"},\"application/vnd.citationstyles.style+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"csl\"]},\"application/vnd.claymore\":{\"source\":\"iana\",\"extensions\":[\"cla\"]},\"application/vnd.cloanto.rp9\":{\"source\":\"iana\",\"extensions\":[\"rp9\"]},\"application/vnd.clonk.c4group\":{\"source\":\"iana\",\"extensions\":[\"c4g\",\"c4d\",\"c4f\",\"c4p\",\"c4u\"]},\"application/vnd.cluetrust.cartomobile-config\":{\"source\":\"iana\",\"extensions\":[\"c11amc\"]},\"application/vnd.cluetrust.cartomobile-config-pkg\":{\"source\":\"iana\",\"extensions\":[\"c11amz\"]},\"application/vnd.coffeescript\":{\"source\":\"iana\"},\"application/vnd.collabio.xodocuments.document\":{\"source\":\"iana\"},\"application/vnd.collabio.xodocuments.document-template\":{\"source\":\"iana\"},\"application/vnd.collabio.xodocuments.presentation\":{\"source\":\"iana\"},\"application/vnd.collabio.xodocuments.presentation-template\":{\"source\":\"iana\"},\"application/vnd.collabio.xodocuments.spreadsheet\":{\"source\":\"iana\"},\"application/vnd.collabio.xodocuments.spreadsheet-template\":{\"source\":\"iana\"},\"application/vnd.collection+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.collection.doc+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.collection.next+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.comicbook+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.comicbook-rar\":{\"source\":\"iana\"},\"application/vnd.commerce-battelle\":{\"source\":\"iana\"},\"application/vnd.commonspace\":{\"source\":\"iana\",\"extensions\":[\"csp\"]},\"application/vnd.contact.cmsg\":{\"source\":\"iana\",\"extensions\":[\"cdbcmsg\"]},\"application/vnd.coreos.ignition+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.cosmocaller\":{\"source\":\"iana\",\"extensions\":[\"cmc\"]},\"application/vnd.crick.clicker\":{\"source\":\"iana\",\"extensions\":[\"clkx\"]},\"application/vnd.crick.clicker.keyboard\":{\"source\":\"iana\",\"extensions\":[\"clkk\"]},\"application/vnd.crick.clicker.palette\":{\"source\":\"iana\",\"extensions\":[\"clkp\"]},\"application/vnd.crick.clicker.template\":{\"source\":\"iana\",\"extensions\":[\"clkt\"]},\"application/vnd.crick.clicker.wordbank\":{\"source\":\"iana\",\"extensions\":[\"clkw\"]},\"application/vnd.criticaltools.wbs+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"wbs\"]},\"application/vnd.cryptii.pipe+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.crypto-shade-file\":{\"source\":\"iana\"},\"application/vnd.cryptomator.encrypted\":{\"source\":\"iana\"},\"application/vnd.cryptomator.vault\":{\"source\":\"iana\"},\"application/vnd.ctc-posml\":{\"source\":\"iana\",\"extensions\":[\"pml\"]},\"application/vnd.ctct.ws+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.cups-pdf\":{\"source\":\"iana\"},\"application/vnd.cups-postscript\":{\"source\":\"iana\"},\"application/vnd.cups-ppd\":{\"source\":\"iana\",\"extensions\":[\"ppd\"]},\"application/vnd.cups-raster\":{\"source\":\"iana\"},\"application/vnd.cups-raw\":{\"source\":\"iana\"},\"application/vnd.curl\":{\"source\":\"iana\"},\"application/vnd.curl.car\":{\"source\":\"apache\",\"extensions\":[\"car\"]},\"application/vnd.curl.pcurl\":{\"source\":\"apache\",\"extensions\":[\"pcurl\"]},\"application/vnd.cyan.dean.root+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.cybank\":{\"source\":\"iana\"},\"application/vnd.cyclonedx+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.cyclonedx+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.d2l.coursepackage1p0+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.d3m-dataset\":{\"source\":\"iana\"},\"application/vnd.d3m-problem\":{\"source\":\"iana\"},\"application/vnd.dart\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"dart\"]},\"application/vnd.data-vision.rdz\":{\"source\":\"iana\",\"extensions\":[\"rdz\"]},\"application/vnd.datapackage+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.dataresource+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.dbf\":{\"source\":\"iana\",\"extensions\":[\"dbf\"]},\"application/vnd.debian.binary-package\":{\"source\":\"iana\"},\"application/vnd.dece.data\":{\"source\":\"iana\",\"extensions\":[\"uvf\",\"uvvf\",\"uvd\",\"uvvd\"]},\"application/vnd.dece.ttml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"uvt\",\"uvvt\"]},\"application/vnd.dece.unspecified\":{\"source\":\"iana\",\"extensions\":[\"uvx\",\"uvvx\"]},\"application/vnd.dece.zip\":{\"source\":\"iana\",\"extensions\":[\"uvz\",\"uvvz\"]},\"application/vnd.denovo.fcselayout-link\":{\"source\":\"iana\",\"extensions\":[\"fe_launch\"]},\"application/vnd.desmume.movie\":{\"source\":\"iana\"},\"application/vnd.dir-bi.plate-dl-nosuffix\":{\"source\":\"iana\"},\"application/vnd.dm.delegation+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.dna\":{\"source\":\"iana\",\"extensions\":[\"dna\"]},\"application/vnd.document+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.dolby.mlp\":{\"source\":\"apache\",\"extensions\":[\"mlp\"]},\"application/vnd.dolby.mobile.1\":{\"source\":\"iana\"},\"application/vnd.dolby.mobile.2\":{\"source\":\"iana\"},\"application/vnd.doremir.scorecloud-binary-document\":{\"source\":\"iana\"},\"application/vnd.dpgraph\":{\"source\":\"iana\",\"extensions\":[\"dpg\"]},\"application/vnd.dreamfactory\":{\"source\":\"iana\",\"extensions\":[\"dfac\"]},\"application/vnd.drive+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.ds-keypoint\":{\"source\":\"apache\",\"extensions\":[\"kpxx\"]},\"application/vnd.dtg.local\":{\"source\":\"iana\"},\"application/vnd.dtg.local.flash\":{\"source\":\"iana\"},\"application/vnd.dtg.local.html\":{\"source\":\"iana\"},\"application/vnd.dvb.ait\":{\"source\":\"iana\",\"extensions\":[\"ait\"]},\"application/vnd.dvb.dvbisl+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.dvb.dvbj\":{\"source\":\"iana\"},\"application/vnd.dvb.esgcontainer\":{\"source\":\"iana\"},\"application/vnd.dvb.ipdcdftnotifaccess\":{\"source\":\"iana\"},\"application/vnd.dvb.ipdcesgaccess\":{\"source\":\"iana\"},\"application/vnd.dvb.ipdcesgaccess2\":{\"source\":\"iana\"},\"application/vnd.dvb.ipdcesgpdd\":{\"source\":\"iana\"},\"application/vnd.dvb.ipdcroaming\":{\"source\":\"iana\"},\"application/vnd.dvb.iptv.alfec-base\":{\"source\":\"iana\"},\"application/vnd.dvb.iptv.alfec-enhancement\":{\"source\":\"iana\"},\"application/vnd.dvb.notif-aggregate-root+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.dvb.notif-container+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.dvb.notif-generic+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.dvb.notif-ia-msglist+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.dvb.notif-ia-registration-request+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.dvb.notif-ia-registration-response+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.dvb.notif-init+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.dvb.pfr\":{\"source\":\"iana\"},\"application/vnd.dvb.service\":{\"source\":\"iana\",\"extensions\":[\"svc\"]},\"application/vnd.dxr\":{\"source\":\"iana\"},\"application/vnd.dynageo\":{\"source\":\"iana\",\"extensions\":[\"geo\"]},\"application/vnd.dzr\":{\"source\":\"iana\"},\"application/vnd.easykaraoke.cdgdownload\":{\"source\":\"iana\"},\"application/vnd.ecdis-update\":{\"source\":\"iana\"},\"application/vnd.ecip.rlp\":{\"source\":\"iana\"},\"application/vnd.eclipse.ditto+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.ecowin.chart\":{\"source\":\"iana\",\"extensions\":[\"mag\"]},\"application/vnd.ecowin.filerequest\":{\"source\":\"iana\"},\"application/vnd.ecowin.fileupdate\":{\"source\":\"iana\"},\"application/vnd.ecowin.series\":{\"source\":\"iana\"},\"application/vnd.ecowin.seriesrequest\":{\"source\":\"iana\"},\"application/vnd.ecowin.seriesupdate\":{\"source\":\"iana\"},\"application/vnd.efi.img\":{\"source\":\"iana\"},\"application/vnd.efi.iso\":{\"source\":\"iana\"},\"application/vnd.emclient.accessrequest+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.enliven\":{\"source\":\"iana\",\"extensions\":[\"nml\"]},\"application/vnd.enphase.envoy\":{\"source\":\"iana\"},\"application/vnd.eprints.data+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.epson.esf\":{\"source\":\"iana\",\"extensions\":[\"esf\"]},\"application/vnd.epson.msf\":{\"source\":\"iana\",\"extensions\":[\"msf\"]},\"application/vnd.epson.quickanime\":{\"source\":\"iana\",\"extensions\":[\"qam\"]},\"application/vnd.epson.salt\":{\"source\":\"iana\",\"extensions\":[\"slt\"]},\"application/vnd.epson.ssf\":{\"source\":\"iana\",\"extensions\":[\"ssf\"]},\"application/vnd.ericsson.quickcall\":{\"source\":\"iana\"},\"application/vnd.espass-espass+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.eszigno3+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"es3\",\"et3\"]},\"application/vnd.etsi.aoc+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.asic-e+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.etsi.asic-s+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.etsi.cug+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.iptvcommand+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.iptvdiscovery+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.iptvprofile+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.iptvsad-bc+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.iptvsad-cod+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.iptvsad-npvr+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.iptvservice+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.iptvsync+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.iptvueprofile+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.mcid+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.mheg5\":{\"source\":\"iana\"},\"application/vnd.etsi.overload-control-policy-dataset+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.pstn+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.sci+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.simservs+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.timestamp-token\":{\"source\":\"iana\"},\"application/vnd.etsi.tsl+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.etsi.tsl.der\":{\"source\":\"iana\"},\"application/vnd.eu.kasparian.car+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.eudora.data\":{\"source\":\"iana\"},\"application/vnd.evolv.ecig.profile\":{\"source\":\"iana\"},\"application/vnd.evolv.ecig.settings\":{\"source\":\"iana\"},\"application/vnd.evolv.ecig.theme\":{\"source\":\"iana\"},\"application/vnd.exstream-empower+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.exstream-package\":{\"source\":\"iana\"},\"application/vnd.ezpix-album\":{\"source\":\"iana\",\"extensions\":[\"ez2\"]},\"application/vnd.ezpix-package\":{\"source\":\"iana\",\"extensions\":[\"ez3\"]},\"application/vnd.f-secure.mobile\":{\"source\":\"iana\"},\"application/vnd.familysearch.gedcom+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.fastcopy-disk-image\":{\"source\":\"iana\"},\"application/vnd.fdf\":{\"source\":\"iana\",\"extensions\":[\"fdf\"]},\"application/vnd.fdsn.mseed\":{\"source\":\"iana\",\"extensions\":[\"mseed\"]},\"application/vnd.fdsn.seed\":{\"source\":\"iana\",\"extensions\":[\"seed\",\"dataless\"]},\"application/vnd.ffsns\":{\"source\":\"iana\"},\"application/vnd.ficlab.flb+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.filmit.zfc\":{\"source\":\"iana\"},\"application/vnd.fints\":{\"source\":\"iana\"},\"application/vnd.firemonkeys.cloudcell\":{\"source\":\"iana\"},\"application/vnd.flographit\":{\"source\":\"iana\",\"extensions\":[\"gph\"]},\"application/vnd.fluxtime.clip\":{\"source\":\"iana\",\"extensions\":[\"ftc\"]},\"application/vnd.font-fontforge-sfd\":{\"source\":\"iana\"},\"application/vnd.framemaker\":{\"source\":\"iana\",\"extensions\":[\"fm\",\"frame\",\"maker\",\"book\"]},\"application/vnd.frogans.fnc\":{\"source\":\"iana\",\"extensions\":[\"fnc\"]},\"application/vnd.frogans.ltf\":{\"source\":\"iana\",\"extensions\":[\"ltf\"]},\"application/vnd.fsc.weblaunch\":{\"source\":\"iana\",\"extensions\":[\"fsc\"]},\"application/vnd.fujifilm.fb.docuworks\":{\"source\":\"iana\"},\"application/vnd.fujifilm.fb.docuworks.binder\":{\"source\":\"iana\"},\"application/vnd.fujifilm.fb.docuworks.container\":{\"source\":\"iana\"},\"application/vnd.fujifilm.fb.jfi+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.fujitsu.oasys\":{\"source\":\"iana\",\"extensions\":[\"oas\"]},\"application/vnd.fujitsu.oasys2\":{\"source\":\"iana\",\"extensions\":[\"oa2\"]},\"application/vnd.fujitsu.oasys3\":{\"source\":\"iana\",\"extensions\":[\"oa3\"]},\"application/vnd.fujitsu.oasysgp\":{\"source\":\"iana\",\"extensions\":[\"fg5\"]},\"application/vnd.fujitsu.oasysprs\":{\"source\":\"iana\",\"extensions\":[\"bh2\"]},\"application/vnd.fujixerox.art-ex\":{\"source\":\"iana\"},\"application/vnd.fujixerox.art4\":{\"source\":\"iana\"},\"application/vnd.fujixerox.ddd\":{\"source\":\"iana\",\"extensions\":[\"ddd\"]},\"application/vnd.fujixerox.docuworks\":{\"source\":\"iana\",\"extensions\":[\"xdw\"]},\"application/vnd.fujixerox.docuworks.binder\":{\"source\":\"iana\",\"extensions\":[\"xbd\"]},\"application/vnd.fujixerox.docuworks.container\":{\"source\":\"iana\"},\"application/vnd.fujixerox.hbpl\":{\"source\":\"iana\"},\"application/vnd.fut-misnet\":{\"source\":\"iana\"},\"application/vnd.futoin+cbor\":{\"source\":\"iana\"},\"application/vnd.futoin+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.fuzzysheet\":{\"source\":\"iana\",\"extensions\":[\"fzs\"]},\"application/vnd.genomatix.tuxedo\":{\"source\":\"iana\",\"extensions\":[\"txd\"]},\"application/vnd.gentics.grd+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.geo+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.geocube+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.geogebra.file\":{\"source\":\"iana\",\"extensions\":[\"ggb\"]},\"application/vnd.geogebra.slides\":{\"source\":\"iana\"},\"application/vnd.geogebra.tool\":{\"source\":\"iana\",\"extensions\":[\"ggt\"]},\"application/vnd.geometry-explorer\":{\"source\":\"iana\",\"extensions\":[\"gex\",\"gre\"]},\"application/vnd.geonext\":{\"source\":\"iana\",\"extensions\":[\"gxt\"]},\"application/vnd.geoplan\":{\"source\":\"iana\",\"extensions\":[\"g2w\"]},\"application/vnd.geospace\":{\"source\":\"iana\",\"extensions\":[\"g3w\"]},\"application/vnd.gerber\":{\"source\":\"iana\"},\"application/vnd.globalplatform.card-content-mgt\":{\"source\":\"iana\"},\"application/vnd.globalplatform.card-content-mgt-response\":{\"source\":\"iana\"},\"application/vnd.gmx\":{\"source\":\"iana\",\"extensions\":[\"gmx\"]},\"application/vnd.google-apps.document\":{\"compressible\":false,\"extensions\":[\"gdoc\"]},\"application/vnd.google-apps.presentation\":{\"compressible\":false,\"extensions\":[\"gslides\"]},\"application/vnd.google-apps.spreadsheet\":{\"compressible\":false,\"extensions\":[\"gsheet\"]},\"application/vnd.google-earth.kml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"kml\"]},\"application/vnd.google-earth.kmz\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"kmz\"]},\"application/vnd.gov.sk.e-form+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.gov.sk.e-form+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.gov.sk.xmldatacontainer+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.grafeq\":{\"source\":\"iana\",\"extensions\":[\"gqf\",\"gqs\"]},\"application/vnd.gridmp\":{\"source\":\"iana\"},\"application/vnd.groove-account\":{\"source\":\"iana\",\"extensions\":[\"gac\"]},\"application/vnd.groove-help\":{\"source\":\"iana\",\"extensions\":[\"ghf\"]},\"application/vnd.groove-identity-message\":{\"source\":\"iana\",\"extensions\":[\"gim\"]},\"application/vnd.groove-injector\":{\"source\":\"iana\",\"extensions\":[\"grv\"]},\"application/vnd.groove-tool-message\":{\"source\":\"iana\",\"extensions\":[\"gtm\"]},\"application/vnd.groove-tool-template\":{\"source\":\"iana\",\"extensions\":[\"tpl\"]},\"application/vnd.groove-vcard\":{\"source\":\"iana\",\"extensions\":[\"vcg\"]},\"application/vnd.hal+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.hal+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"hal\"]},\"application/vnd.handheld-entertainment+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"zmm\"]},\"application/vnd.hbci\":{\"source\":\"iana\",\"extensions\":[\"hbci\"]},\"application/vnd.hc+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.hcl-bireports\":{\"source\":\"iana\"},\"application/vnd.hdt\":{\"source\":\"iana\"},\"application/vnd.heroku+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.hhe.lesson-player\":{\"source\":\"iana\",\"extensions\":[\"les\"]},\"application/vnd.hl7cda+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/vnd.hl7v2+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/vnd.hp-hpgl\":{\"source\":\"iana\",\"extensions\":[\"hpgl\"]},\"application/vnd.hp-hpid\":{\"source\":\"iana\",\"extensions\":[\"hpid\"]},\"application/vnd.hp-hps\":{\"source\":\"iana\",\"extensions\":[\"hps\"]},\"application/vnd.hp-jlyt\":{\"source\":\"iana\",\"extensions\":[\"jlt\"]},\"application/vnd.hp-pcl\":{\"source\":\"iana\",\"extensions\":[\"pcl\"]},\"application/vnd.hp-pclxl\":{\"source\":\"iana\",\"extensions\":[\"pclxl\"]},\"application/vnd.httphone\":{\"source\":\"iana\"},\"application/vnd.hydrostatix.sof-data\":{\"source\":\"iana\",\"extensions\":[\"sfd-hdstx\"]},\"application/vnd.hyper+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.hyper-item+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.hyperdrive+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.hzn-3d-crossword\":{\"source\":\"iana\"},\"application/vnd.ibm.afplinedata\":{\"source\":\"iana\"},\"application/vnd.ibm.electronic-media\":{\"source\":\"iana\"},\"application/vnd.ibm.minipay\":{\"source\":\"iana\",\"extensions\":[\"mpy\"]},\"application/vnd.ibm.modcap\":{\"source\":\"iana\",\"extensions\":[\"afp\",\"listafp\",\"list3820\"]},\"application/vnd.ibm.rights-management\":{\"source\":\"iana\",\"extensions\":[\"irm\"]},\"application/vnd.ibm.secure-container\":{\"source\":\"iana\",\"extensions\":[\"sc\"]},\"application/vnd.iccprofile\":{\"source\":\"iana\",\"extensions\":[\"icc\",\"icm\"]},\"application/vnd.ieee.1905\":{\"source\":\"iana\"},\"application/vnd.igloader\":{\"source\":\"iana\",\"extensions\":[\"igl\"]},\"application/vnd.imagemeter.folder+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.imagemeter.image+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.immervision-ivp\":{\"source\":\"iana\",\"extensions\":[\"ivp\"]},\"application/vnd.immervision-ivu\":{\"source\":\"iana\",\"extensions\":[\"ivu\"]},\"application/vnd.ims.imsccv1p1\":{\"source\":\"iana\"},\"application/vnd.ims.imsccv1p2\":{\"source\":\"iana\"},\"application/vnd.ims.imsccv1p3\":{\"source\":\"iana\"},\"application/vnd.ims.lis.v2.result+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.ims.lti.v2.toolconsumerprofile+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.ims.lti.v2.toolproxy+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.ims.lti.v2.toolproxy.id+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.ims.lti.v2.toolsettings+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.ims.lti.v2.toolsettings.simple+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.informedcontrol.rms+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.informix-visionary\":{\"source\":\"iana\"},\"application/vnd.infotech.project\":{\"source\":\"iana\"},\"application/vnd.infotech.project+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.innopath.wamp.notification\":{\"source\":\"iana\"},\"application/vnd.insors.igm\":{\"source\":\"iana\",\"extensions\":[\"igm\"]},\"application/vnd.intercon.formnet\":{\"source\":\"iana\",\"extensions\":[\"xpw\",\"xpx\"]},\"application/vnd.intergeo\":{\"source\":\"iana\",\"extensions\":[\"i2g\"]},\"application/vnd.intertrust.digibox\":{\"source\":\"iana\"},\"application/vnd.intertrust.nncp\":{\"source\":\"iana\"},\"application/vnd.intu.qbo\":{\"source\":\"iana\",\"extensions\":[\"qbo\"]},\"application/vnd.intu.qfx\":{\"source\":\"iana\",\"extensions\":[\"qfx\"]},\"application/vnd.iptc.g2.catalogitem+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.iptc.g2.conceptitem+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.iptc.g2.knowledgeitem+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.iptc.g2.newsitem+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.iptc.g2.newsmessage+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.iptc.g2.packageitem+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.iptc.g2.planningitem+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.ipunplugged.rcprofile\":{\"source\":\"iana\",\"extensions\":[\"rcprofile\"]},\"application/vnd.irepository.package+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"irp\"]},\"application/vnd.is-xpr\":{\"source\":\"iana\",\"extensions\":[\"xpr\"]},\"application/vnd.isac.fcs\":{\"source\":\"iana\",\"extensions\":[\"fcs\"]},\"application/vnd.iso11783-10+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.jam\":{\"source\":\"iana\",\"extensions\":[\"jam\"]},\"application/vnd.japannet-directory-service\":{\"source\":\"iana\"},\"application/vnd.japannet-jpnstore-wakeup\":{\"source\":\"iana\"},\"application/vnd.japannet-payment-wakeup\":{\"source\":\"iana\"},\"application/vnd.japannet-registration\":{\"source\":\"iana\"},\"application/vnd.japannet-registration-wakeup\":{\"source\":\"iana\"},\"application/vnd.japannet-setstore-wakeup\":{\"source\":\"iana\"},\"application/vnd.japannet-verification\":{\"source\":\"iana\"},\"application/vnd.japannet-verification-wakeup\":{\"source\":\"iana\"},\"application/vnd.jcp.javame.midlet-rms\":{\"source\":\"iana\",\"extensions\":[\"rms\"]},\"application/vnd.jisp\":{\"source\":\"iana\",\"extensions\":[\"jisp\"]},\"application/vnd.joost.joda-archive\":{\"source\":\"iana\",\"extensions\":[\"joda\"]},\"application/vnd.jsk.isdn-ngn\":{\"source\":\"iana\"},\"application/vnd.kahootz\":{\"source\":\"iana\",\"extensions\":[\"ktz\",\"ktr\"]},\"application/vnd.kde.karbon\":{\"source\":\"iana\",\"extensions\":[\"karbon\"]},\"application/vnd.kde.kchart\":{\"source\":\"iana\",\"extensions\":[\"chrt\"]},\"application/vnd.kde.kformula\":{\"source\":\"iana\",\"extensions\":[\"kfo\"]},\"application/vnd.kde.kivio\":{\"source\":\"iana\",\"extensions\":[\"flw\"]},\"application/vnd.kde.kontour\":{\"source\":\"iana\",\"extensions\":[\"kon\"]},\"application/vnd.kde.kpresenter\":{\"source\":\"iana\",\"extensions\":[\"kpr\",\"kpt\"]},\"application/vnd.kde.kspread\":{\"source\":\"iana\",\"extensions\":[\"ksp\"]},\"application/vnd.kde.kword\":{\"source\":\"iana\",\"extensions\":[\"kwd\",\"kwt\"]},\"application/vnd.kenameaapp\":{\"source\":\"iana\",\"extensions\":[\"htke\"]},\"application/vnd.kidspiration\":{\"source\":\"iana\",\"extensions\":[\"kia\"]},\"application/vnd.kinar\":{\"source\":\"iana\",\"extensions\":[\"kne\",\"knp\"]},\"application/vnd.koan\":{\"source\":\"iana\",\"extensions\":[\"skp\",\"skd\",\"skt\",\"skm\"]},\"application/vnd.kodak-descriptor\":{\"source\":\"iana\",\"extensions\":[\"sse\"]},\"application/vnd.las\":{\"source\":\"iana\"},\"application/vnd.las.las+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.las.las+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"lasxml\"]},\"application/vnd.laszip\":{\"source\":\"iana\"},\"application/vnd.leap+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.liberty-request+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.llamagraphics.life-balance.desktop\":{\"source\":\"iana\",\"extensions\":[\"lbd\"]},\"application/vnd.llamagraphics.life-balance.exchange+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"lbe\"]},\"application/vnd.logipipe.circuit+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.loom\":{\"source\":\"iana\"},\"application/vnd.lotus-1-2-3\":{\"source\":\"iana\",\"extensions\":[\"123\"]},\"application/vnd.lotus-approach\":{\"source\":\"iana\",\"extensions\":[\"apr\"]},\"application/vnd.lotus-freelance\":{\"source\":\"iana\",\"extensions\":[\"pre\"]},\"application/vnd.lotus-notes\":{\"source\":\"iana\",\"extensions\":[\"nsf\"]},\"application/vnd.lotus-organizer\":{\"source\":\"iana\",\"extensions\":[\"org\"]},\"application/vnd.lotus-screencam\":{\"source\":\"iana\",\"extensions\":[\"scm\"]},\"application/vnd.lotus-wordpro\":{\"source\":\"iana\",\"extensions\":[\"lwp\"]},\"application/vnd.macports.portpkg\":{\"source\":\"iana\",\"extensions\":[\"portpkg\"]},\"application/vnd.mapbox-vector-tile\":{\"source\":\"iana\",\"extensions\":[\"mvt\"]},\"application/vnd.marlin.drm.actiontoken+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.marlin.drm.conftoken+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.marlin.drm.license+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.marlin.drm.mdcf\":{\"source\":\"iana\"},\"application/vnd.mason+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.maxar.archive.3tz+zip\":{\"source\":\"iana\",\"compressible\":false},\"application/vnd.maxmind.maxmind-db\":{\"source\":\"iana\"},\"application/vnd.mcd\":{\"source\":\"iana\",\"extensions\":[\"mcd\"]},\"application/vnd.medcalcdata\":{\"source\":\"iana\",\"extensions\":[\"mc1\"]},\"application/vnd.mediastation.cdkey\":{\"source\":\"iana\",\"extensions\":[\"cdkey\"]},\"application/vnd.meridian-slingshot\":{\"source\":\"iana\"},\"application/vnd.mfer\":{\"source\":\"iana\",\"extensions\":[\"mwf\"]},\"application/vnd.mfmp\":{\"source\":\"iana\",\"extensions\":[\"mfm\"]},\"application/vnd.micro+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.micrografx.flo\":{\"source\":\"iana\",\"extensions\":[\"flo\"]},\"application/vnd.micrografx.igx\":{\"source\":\"iana\",\"extensions\":[\"igx\"]},\"application/vnd.microsoft.portable-executable\":{\"source\":\"iana\"},\"application/vnd.microsoft.windows.thumbnail-cache\":{\"source\":\"iana\"},\"application/vnd.miele+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.mif\":{\"source\":\"iana\",\"extensions\":[\"mif\"]},\"application/vnd.minisoft-hp3000-save\":{\"source\":\"iana\"},\"application/vnd.mitsubishi.misty-guard.trustweb\":{\"source\":\"iana\"},\"application/vnd.mobius.daf\":{\"source\":\"iana\",\"extensions\":[\"daf\"]},\"application/vnd.mobius.dis\":{\"source\":\"iana\",\"extensions\":[\"dis\"]},\"application/vnd.mobius.mbk\":{\"source\":\"iana\",\"extensions\":[\"mbk\"]},\"application/vnd.mobius.mqy\":{\"source\":\"iana\",\"extensions\":[\"mqy\"]},\"application/vnd.mobius.msl\":{\"source\":\"iana\",\"extensions\":[\"msl\"]},\"application/vnd.mobius.plc\":{\"source\":\"iana\",\"extensions\":[\"plc\"]},\"application/vnd.mobius.txf\":{\"source\":\"iana\",\"extensions\":[\"txf\"]},\"application/vnd.mophun.application\":{\"source\":\"iana\",\"extensions\":[\"mpn\"]},\"application/vnd.mophun.certificate\":{\"source\":\"iana\",\"extensions\":[\"mpc\"]},\"application/vnd.motorola.flexsuite\":{\"source\":\"iana\"},\"application/vnd.motorola.flexsuite.adsi\":{\"source\":\"iana\"},\"application/vnd.motorola.flexsuite.fis\":{\"source\":\"iana\"},\"application/vnd.motorola.flexsuite.gotap\":{\"source\":\"iana\"},\"application/vnd.motorola.flexsuite.kmr\":{\"source\":\"iana\"},\"application/vnd.motorola.flexsuite.ttc\":{\"source\":\"iana\"},\"application/vnd.motorola.flexsuite.wem\":{\"source\":\"iana\"},\"application/vnd.motorola.iprm\":{\"source\":\"iana\"},\"application/vnd.mozilla.xul+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xul\"]},\"application/vnd.ms-3mfdocument\":{\"source\":\"iana\"},\"application/vnd.ms-artgalry\":{\"source\":\"iana\",\"extensions\":[\"cil\"]},\"application/vnd.ms-asf\":{\"source\":\"iana\"},\"application/vnd.ms-cab-compressed\":{\"source\":\"iana\",\"extensions\":[\"cab\"]},\"application/vnd.ms-color.iccprofile\":{\"source\":\"apache\"},\"application/vnd.ms-excel\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"xls\",\"xlm\",\"xla\",\"xlc\",\"xlt\",\"xlw\"]},\"application/vnd.ms-excel.addin.macroenabled.12\":{\"source\":\"iana\",\"extensions\":[\"xlam\"]},\"application/vnd.ms-excel.sheet.binary.macroenabled.12\":{\"source\":\"iana\",\"extensions\":[\"xlsb\"]},\"application/vnd.ms-excel.sheet.macroenabled.12\":{\"source\":\"iana\",\"extensions\":[\"xlsm\"]},\"application/vnd.ms-excel.template.macroenabled.12\":{\"source\":\"iana\",\"extensions\":[\"xltm\"]},\"application/vnd.ms-fontobject\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"eot\"]},\"application/vnd.ms-htmlhelp\":{\"source\":\"iana\",\"extensions\":[\"chm\"]},\"application/vnd.ms-ims\":{\"source\":\"iana\",\"extensions\":[\"ims\"]},\"application/vnd.ms-lrm\":{\"source\":\"iana\",\"extensions\":[\"lrm\"]},\"application/vnd.ms-office.activex+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.ms-officetheme\":{\"source\":\"iana\",\"extensions\":[\"thmx\"]},\"application/vnd.ms-opentype\":{\"source\":\"apache\",\"compressible\":true},\"application/vnd.ms-outlook\":{\"compressible\":false,\"extensions\":[\"msg\"]},\"application/vnd.ms-package.obfuscated-opentype\":{\"source\":\"apache\"},\"application/vnd.ms-pki.seccat\":{\"source\":\"apache\",\"extensions\":[\"cat\"]},\"application/vnd.ms-pki.stl\":{\"source\":\"apache\",\"extensions\":[\"stl\"]},\"application/vnd.ms-playready.initiator+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.ms-powerpoint\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"ppt\",\"pps\",\"pot\"]},\"application/vnd.ms-powerpoint.addin.macroenabled.12\":{\"source\":\"iana\",\"extensions\":[\"ppam\"]},\"application/vnd.ms-powerpoint.presentation.macroenabled.12\":{\"source\":\"iana\",\"extensions\":[\"pptm\"]},\"application/vnd.ms-powerpoint.slide.macroenabled.12\":{\"source\":\"iana\",\"extensions\":[\"sldm\"]},\"application/vnd.ms-powerpoint.slideshow.macroenabled.12\":{\"source\":\"iana\",\"extensions\":[\"ppsm\"]},\"application/vnd.ms-powerpoint.template.macroenabled.12\":{\"source\":\"iana\",\"extensions\":[\"potm\"]},\"application/vnd.ms-printdevicecapabilities+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.ms-printing.printticket+xml\":{\"source\":\"apache\",\"compressible\":true},\"application/vnd.ms-printschematicket+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.ms-project\":{\"source\":\"iana\",\"extensions\":[\"mpp\",\"mpt\"]},\"application/vnd.ms-tnef\":{\"source\":\"iana\"},\"application/vnd.ms-windows.devicepairing\":{\"source\":\"iana\"},\"application/vnd.ms-windows.nwprinting.oob\":{\"source\":\"iana\"},\"application/vnd.ms-windows.printerpairing\":{\"source\":\"iana\"},\"application/vnd.ms-windows.wsd.oob\":{\"source\":\"iana\"},\"application/vnd.ms-wmdrm.lic-chlg-req\":{\"source\":\"iana\"},\"application/vnd.ms-wmdrm.lic-resp\":{\"source\":\"iana\"},\"application/vnd.ms-wmdrm.meter-chlg-req\":{\"source\":\"iana\"},\"application/vnd.ms-wmdrm.meter-resp\":{\"source\":\"iana\"},\"application/vnd.ms-word.document.macroenabled.12\":{\"source\":\"iana\",\"extensions\":[\"docm\"]},\"application/vnd.ms-word.template.macroenabled.12\":{\"source\":\"iana\",\"extensions\":[\"dotm\"]},\"application/vnd.ms-works\":{\"source\":\"iana\",\"extensions\":[\"wps\",\"wks\",\"wcm\",\"wdb\"]},\"application/vnd.ms-wpl\":{\"source\":\"iana\",\"extensions\":[\"wpl\"]},\"application/vnd.ms-xpsdocument\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"xps\"]},\"application/vnd.msa-disk-image\":{\"source\":\"iana\"},\"application/vnd.mseq\":{\"source\":\"iana\",\"extensions\":[\"mseq\"]},\"application/vnd.msign\":{\"source\":\"iana\"},\"application/vnd.multiad.creator\":{\"source\":\"iana\"},\"application/vnd.multiad.creator.cif\":{\"source\":\"iana\"},\"application/vnd.music-niff\":{\"source\":\"iana\"},\"application/vnd.musician\":{\"source\":\"iana\",\"extensions\":[\"mus\"]},\"application/vnd.muvee.style\":{\"source\":\"iana\",\"extensions\":[\"msty\"]},\"application/vnd.mynfc\":{\"source\":\"iana\",\"extensions\":[\"taglet\"]},\"application/vnd.nacamar.ybrid+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.ncd.control\":{\"source\":\"iana\"},\"application/vnd.ncd.reference\":{\"source\":\"iana\"},\"application/vnd.nearst.inv+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.nebumind.line\":{\"source\":\"iana\"},\"application/vnd.nervana\":{\"source\":\"iana\"},\"application/vnd.netfpx\":{\"source\":\"iana\"},\"application/vnd.neurolanguage.nlu\":{\"source\":\"iana\",\"extensions\":[\"nlu\"]},\"application/vnd.nimn\":{\"source\":\"iana\"},\"application/vnd.nintendo.nitro.rom\":{\"source\":\"iana\"},\"application/vnd.nintendo.snes.rom\":{\"source\":\"iana\"},\"application/vnd.nitf\":{\"source\":\"iana\",\"extensions\":[\"ntf\",\"nitf\"]},\"application/vnd.noblenet-directory\":{\"source\":\"iana\",\"extensions\":[\"nnd\"]},\"application/vnd.noblenet-sealer\":{\"source\":\"iana\",\"extensions\":[\"nns\"]},\"application/vnd.noblenet-web\":{\"source\":\"iana\",\"extensions\":[\"nnw\"]},\"application/vnd.nokia.catalogs\":{\"source\":\"iana\"},\"application/vnd.nokia.conml+wbxml\":{\"source\":\"iana\"},\"application/vnd.nokia.conml+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.nokia.iptv.config+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.nokia.isds-radio-presets\":{\"source\":\"iana\"},\"application/vnd.nokia.landmark+wbxml\":{\"source\":\"iana\"},\"application/vnd.nokia.landmark+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.nokia.landmarkcollection+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.nokia.n-gage.ac+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"ac\"]},\"application/vnd.nokia.n-gage.data\":{\"source\":\"iana\",\"extensions\":[\"ngdat\"]},\"application/vnd.nokia.n-gage.symbian.install\":{\"source\":\"iana\",\"extensions\":[\"n-gage\"]},\"application/vnd.nokia.ncd\":{\"source\":\"iana\"},\"application/vnd.nokia.pcd+wbxml\":{\"source\":\"iana\"},\"application/vnd.nokia.pcd+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.nokia.radio-preset\":{\"source\":\"iana\",\"extensions\":[\"rpst\"]},\"application/vnd.nokia.radio-presets\":{\"source\":\"iana\",\"extensions\":[\"rpss\"]},\"application/vnd.novadigm.edm\":{\"source\":\"iana\",\"extensions\":[\"edm\"]},\"application/vnd.novadigm.edx\":{\"source\":\"iana\",\"extensions\":[\"edx\"]},\"application/vnd.novadigm.ext\":{\"source\":\"iana\",\"extensions\":[\"ext\"]},\"application/vnd.ntt-local.content-share\":{\"source\":\"iana\"},\"application/vnd.ntt-local.file-transfer\":{\"source\":\"iana\"},\"application/vnd.ntt-local.ogw_remote-access\":{\"source\":\"iana\"},\"application/vnd.ntt-local.sip-ta_remote\":{\"source\":\"iana\"},\"application/vnd.ntt-local.sip-ta_tcp_stream\":{\"source\":\"iana\"},\"application/vnd.oasis.opendocument.chart\":{\"source\":\"iana\",\"extensions\":[\"odc\"]},\"application/vnd.oasis.opendocument.chart-template\":{\"source\":\"iana\",\"extensions\":[\"otc\"]},\"application/vnd.oasis.opendocument.database\":{\"source\":\"iana\",\"extensions\":[\"odb\"]},\"application/vnd.oasis.opendocument.formula\":{\"source\":\"iana\",\"extensions\":[\"odf\"]},\"application/vnd.oasis.opendocument.formula-template\":{\"source\":\"iana\",\"extensions\":[\"odft\"]},\"application/vnd.oasis.opendocument.graphics\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"odg\"]},\"application/vnd.oasis.opendocument.graphics-template\":{\"source\":\"iana\",\"extensions\":[\"otg\"]},\"application/vnd.oasis.opendocument.image\":{\"source\":\"iana\",\"extensions\":[\"odi\"]},\"application/vnd.oasis.opendocument.image-template\":{\"source\":\"iana\",\"extensions\":[\"oti\"]},\"application/vnd.oasis.opendocument.presentation\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"odp\"]},\"application/vnd.oasis.opendocument.presentation-template\":{\"source\":\"iana\",\"extensions\":[\"otp\"]},\"application/vnd.oasis.opendocument.spreadsheet\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"ods\"]},\"application/vnd.oasis.opendocument.spreadsheet-template\":{\"source\":\"iana\",\"extensions\":[\"ots\"]},\"application/vnd.oasis.opendocument.text\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"odt\"]},\"application/vnd.oasis.opendocument.text-master\":{\"source\":\"iana\",\"extensions\":[\"odm\"]},\"application/vnd.oasis.opendocument.text-template\":{\"source\":\"iana\",\"extensions\":[\"ott\"]},\"application/vnd.oasis.opendocument.text-web\":{\"source\":\"iana\",\"extensions\":[\"oth\"]},\"application/vnd.obn\":{\"source\":\"iana\"},\"application/vnd.ocf+cbor\":{\"source\":\"iana\"},\"application/vnd.oci.image.manifest.v1+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oftn.l10n+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oipf.contentaccessdownload+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oipf.contentaccessstreaming+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oipf.cspg-hexbinary\":{\"source\":\"iana\"},\"application/vnd.oipf.dae.svg+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oipf.dae.xhtml+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oipf.mippvcontrolmessage+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oipf.pae.gem\":{\"source\":\"iana\"},\"application/vnd.oipf.spdiscovery+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oipf.spdlist+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oipf.ueprofile+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oipf.userprofile+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.olpc-sugar\":{\"source\":\"iana\",\"extensions\":[\"xo\"]},\"application/vnd.oma-scws-config\":{\"source\":\"iana\"},\"application/vnd.oma-scws-http-request\":{\"source\":\"iana\"},\"application/vnd.oma-scws-http-response\":{\"source\":\"iana\"},\"application/vnd.oma.bcast.associated-procedure-parameter+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.bcast.drm-trigger+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.bcast.imd+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.bcast.ltkm\":{\"source\":\"iana\"},\"application/vnd.oma.bcast.notification+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.bcast.provisioningtrigger\":{\"source\":\"iana\"},\"application/vnd.oma.bcast.sgboot\":{\"source\":\"iana\"},\"application/vnd.oma.bcast.sgdd+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.bcast.sgdu\":{\"source\":\"iana\"},\"application/vnd.oma.bcast.simple-symbol-container\":{\"source\":\"iana\"},\"application/vnd.oma.bcast.smartcard-trigger+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.bcast.sprov+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.bcast.stkm\":{\"source\":\"iana\"},\"application/vnd.oma.cab-address-book+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.cab-feature-handler+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.cab-pcc+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.cab-subs-invite+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.cab-user-prefs+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.dcd\":{\"source\":\"iana\"},\"application/vnd.oma.dcdc\":{\"source\":\"iana\"},\"application/vnd.oma.dd2+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"dd2\"]},\"application/vnd.oma.drm.risd+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.group-usage-list+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.lwm2m+cbor\":{\"source\":\"iana\"},\"application/vnd.oma.lwm2m+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.lwm2m+tlv\":{\"source\":\"iana\"},\"application/vnd.oma.pal+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.poc.detailed-progress-report+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.poc.final-report+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.poc.groups+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.poc.invocation-descriptor+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.poc.optimized-progress-report+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.push\":{\"source\":\"iana\"},\"application/vnd.oma.scidm.messages+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oma.xcap-directory+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.omads-email+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/vnd.omads-file+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/vnd.omads-folder+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/vnd.omaloc-supl-init\":{\"source\":\"iana\"},\"application/vnd.onepager\":{\"source\":\"iana\"},\"application/vnd.onepagertamp\":{\"source\":\"iana\"},\"application/vnd.onepagertamx\":{\"source\":\"iana\"},\"application/vnd.onepagertat\":{\"source\":\"iana\"},\"application/vnd.onepagertatp\":{\"source\":\"iana\"},\"application/vnd.onepagertatx\":{\"source\":\"iana\"},\"application/vnd.openblox.game+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"obgx\"]},\"application/vnd.openblox.game-binary\":{\"source\":\"iana\"},\"application/vnd.openeye.oeb\":{\"source\":\"iana\"},\"application/vnd.openofficeorg.extension\":{\"source\":\"apache\",\"extensions\":[\"oxt\"]},\"application/vnd.openstreetmap.data+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"osm\"]},\"application/vnd.opentimestamps.ots\":{\"source\":\"iana\"},\"application/vnd.openxmlformats-officedocument.custom-properties+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.customxmlproperties+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.drawing+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.drawingml.chart+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.extended-properties+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.comments+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.presentation\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"pptx\"]},\"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.slide\":{\"source\":\"iana\",\"extensions\":[\"sldx\"]},\"application/vnd.openxmlformats-officedocument.presentationml.slide+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.slideshow\":{\"source\":\"iana\",\"extensions\":[\"ppsx\"]},\"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.tags+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.template\":{\"source\":\"iana\",\"extensions\":[\"potx\"]},\"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"xlsx\"]},\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.template\":{\"source\":\"iana\",\"extensions\":[\"xltx\"]},\"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.theme+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.themeoverride+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.vmldrawing\":{\"source\":\"iana\"},\"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.wordprocessingml.document\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"docx\"]},\"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.wordprocessingml.template\":{\"source\":\"iana\",\"extensions\":[\"dotx\"]},\"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-package.core-properties+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.openxmlformats-package.relationships+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oracle.resource+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.orange.indata\":{\"source\":\"iana\"},\"application/vnd.osa.netdeploy\":{\"source\":\"iana\"},\"application/vnd.osgeo.mapguide.package\":{\"source\":\"iana\",\"extensions\":[\"mgp\"]},\"application/vnd.osgi.bundle\":{\"source\":\"iana\"},\"application/vnd.osgi.dp\":{\"source\":\"iana\",\"extensions\":[\"dp\"]},\"application/vnd.osgi.subsystem\":{\"source\":\"iana\",\"extensions\":[\"esa\"]},\"application/vnd.otps.ct-kip+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.oxli.countgraph\":{\"source\":\"iana\"},\"application/vnd.pagerduty+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.palm\":{\"source\":\"iana\",\"extensions\":[\"pdb\",\"pqa\",\"oprc\"]},\"application/vnd.panoply\":{\"source\":\"iana\"},\"application/vnd.paos.xml\":{\"source\":\"iana\"},\"application/vnd.patentdive\":{\"source\":\"iana\"},\"application/vnd.patientecommsdoc\":{\"source\":\"iana\"},\"application/vnd.pawaafile\":{\"source\":\"iana\",\"extensions\":[\"paw\"]},\"application/vnd.pcos\":{\"source\":\"iana\"},\"application/vnd.pg.format\":{\"source\":\"iana\",\"extensions\":[\"str\"]},\"application/vnd.pg.osasli\":{\"source\":\"iana\",\"extensions\":[\"ei6\"]},\"application/vnd.piaccess.application-licence\":{\"source\":\"iana\"},\"application/vnd.picsel\":{\"source\":\"iana\",\"extensions\":[\"efif\"]},\"application/vnd.pmi.widget\":{\"source\":\"iana\",\"extensions\":[\"wg\"]},\"application/vnd.poc.group-advertisement+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.pocketlearn\":{\"source\":\"iana\",\"extensions\":[\"plf\"]},\"application/vnd.powerbuilder6\":{\"source\":\"iana\",\"extensions\":[\"pbd\"]},\"application/vnd.powerbuilder6-s\":{\"source\":\"iana\"},\"application/vnd.powerbuilder7\":{\"source\":\"iana\"},\"application/vnd.powerbuilder7-s\":{\"source\":\"iana\"},\"application/vnd.powerbuilder75\":{\"source\":\"iana\"},\"application/vnd.powerbuilder75-s\":{\"source\":\"iana\"},\"application/vnd.preminet\":{\"source\":\"iana\"},\"application/vnd.previewsystems.box\":{\"source\":\"iana\",\"extensions\":[\"box\"]},\"application/vnd.proteus.magazine\":{\"source\":\"iana\",\"extensions\":[\"mgz\"]},\"application/vnd.psfs\":{\"source\":\"iana\"},\"application/vnd.publishare-delta-tree\":{\"source\":\"iana\",\"extensions\":[\"qps\"]},\"application/vnd.pvi.ptid1\":{\"source\":\"iana\",\"extensions\":[\"ptid\"]},\"application/vnd.pwg-multiplexed\":{\"source\":\"iana\"},\"application/vnd.pwg-xhtml-print+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.qualcomm.brew-app-res\":{\"source\":\"iana\"},\"application/vnd.quarantainenet\":{\"source\":\"iana\"},\"application/vnd.quark.quarkxpress\":{\"source\":\"iana\",\"extensions\":[\"qxd\",\"qxt\",\"qwd\",\"qwt\",\"qxl\",\"qxb\"]},\"application/vnd.quobject-quoxdocument\":{\"source\":\"iana\"},\"application/vnd.radisys.moml+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml-audit+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml-audit-conf+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml-audit-conn+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml-audit-dialog+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml-audit-stream+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml-conf+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml-dialog+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml-dialog-base+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml-dialog-fax-detect+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml-dialog-fax-sendrecv+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml-dialog-group+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml-dialog-speech+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.radisys.msml-dialog-transform+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.rainstor.data\":{\"source\":\"iana\"},\"application/vnd.rapid\":{\"source\":\"iana\"},\"application/vnd.rar\":{\"source\":\"iana\",\"extensions\":[\"rar\"]},\"application/vnd.realvnc.bed\":{\"source\":\"iana\",\"extensions\":[\"bed\"]},\"application/vnd.recordare.musicxml\":{\"source\":\"iana\",\"extensions\":[\"mxl\"]},\"application/vnd.recordare.musicxml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"musicxml\"]},\"application/vnd.renlearn.rlprint\":{\"source\":\"iana\"},\"application/vnd.resilient.logic\":{\"source\":\"iana\"},\"application/vnd.restful+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.rig.cryptonote\":{\"source\":\"iana\",\"extensions\":[\"cryptonote\"]},\"application/vnd.rim.cod\":{\"source\":\"apache\",\"extensions\":[\"cod\"]},\"application/vnd.rn-realmedia\":{\"source\":\"apache\",\"extensions\":[\"rm\"]},\"application/vnd.rn-realmedia-vbr\":{\"source\":\"apache\",\"extensions\":[\"rmvb\"]},\"application/vnd.route66.link66+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"link66\"]},\"application/vnd.rs-274x\":{\"source\":\"iana\"},\"application/vnd.ruckus.download\":{\"source\":\"iana\"},\"application/vnd.s3sms\":{\"source\":\"iana\"},\"application/vnd.sailingtracker.track\":{\"source\":\"iana\",\"extensions\":[\"st\"]},\"application/vnd.sar\":{\"source\":\"iana\"},\"application/vnd.sbm.cid\":{\"source\":\"iana\"},\"application/vnd.sbm.mid2\":{\"source\":\"iana\"},\"application/vnd.scribus\":{\"source\":\"iana\"},\"application/vnd.sealed.3df\":{\"source\":\"iana\"},\"application/vnd.sealed.csf\":{\"source\":\"iana\"},\"application/vnd.sealed.doc\":{\"source\":\"iana\"},\"application/vnd.sealed.eml\":{\"source\":\"iana\"},\"application/vnd.sealed.mht\":{\"source\":\"iana\"},\"application/vnd.sealed.net\":{\"source\":\"iana\"},\"application/vnd.sealed.ppt\":{\"source\":\"iana\"},\"application/vnd.sealed.tiff\":{\"source\":\"iana\"},\"application/vnd.sealed.xls\":{\"source\":\"iana\"},\"application/vnd.sealedmedia.softseal.html\":{\"source\":\"iana\"},\"application/vnd.sealedmedia.softseal.pdf\":{\"source\":\"iana\"},\"application/vnd.seemail\":{\"source\":\"iana\",\"extensions\":[\"see\"]},\"application/vnd.seis+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.sema\":{\"source\":\"iana\",\"extensions\":[\"sema\"]},\"application/vnd.semd\":{\"source\":\"iana\",\"extensions\":[\"semd\"]},\"application/vnd.semf\":{\"source\":\"iana\",\"extensions\":[\"semf\"]},\"application/vnd.shade-save-file\":{\"source\":\"iana\"},\"application/vnd.shana.informed.formdata\":{\"source\":\"iana\",\"extensions\":[\"ifm\"]},\"application/vnd.shana.informed.formtemplate\":{\"source\":\"iana\",\"extensions\":[\"itp\"]},\"application/vnd.shana.informed.interchange\":{\"source\":\"iana\",\"extensions\":[\"iif\"]},\"application/vnd.shana.informed.package\":{\"source\":\"iana\",\"extensions\":[\"ipk\"]},\"application/vnd.shootproof+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.shopkick+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.shp\":{\"source\":\"iana\"},\"application/vnd.shx\":{\"source\":\"iana\"},\"application/vnd.sigrok.session\":{\"source\":\"iana\"},\"application/vnd.simtech-mindmapper\":{\"source\":\"iana\",\"extensions\":[\"twd\",\"twds\"]},\"application/vnd.siren+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.smaf\":{\"source\":\"iana\",\"extensions\":[\"mmf\"]},\"application/vnd.smart.notebook\":{\"source\":\"iana\"},\"application/vnd.smart.teacher\":{\"source\":\"iana\",\"extensions\":[\"teacher\"]},\"application/vnd.snesdev-page-table\":{\"source\":\"iana\"},\"application/vnd.software602.filler.form+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"fo\"]},\"application/vnd.software602.filler.form-xml-zip\":{\"source\":\"iana\"},\"application/vnd.solent.sdkm+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"sdkm\",\"sdkd\"]},\"application/vnd.spotfire.dxp\":{\"source\":\"iana\",\"extensions\":[\"dxp\"]},\"application/vnd.spotfire.sfs\":{\"source\":\"iana\",\"extensions\":[\"sfs\"]},\"application/vnd.sqlite3\":{\"source\":\"iana\"},\"application/vnd.sss-cod\":{\"source\":\"iana\"},\"application/vnd.sss-dtf\":{\"source\":\"iana\"},\"application/vnd.sss-ntf\":{\"source\":\"iana\"},\"application/vnd.stardivision.calc\":{\"source\":\"apache\",\"extensions\":[\"sdc\"]},\"application/vnd.stardivision.draw\":{\"source\":\"apache\",\"extensions\":[\"sda\"]},\"application/vnd.stardivision.impress\":{\"source\":\"apache\",\"extensions\":[\"sdd\"]},\"application/vnd.stardivision.math\":{\"source\":\"apache\",\"extensions\":[\"smf\"]},\"application/vnd.stardivision.writer\":{\"source\":\"apache\",\"extensions\":[\"sdw\",\"vor\"]},\"application/vnd.stardivision.writer-global\":{\"source\":\"apache\",\"extensions\":[\"sgl\"]},\"application/vnd.stepmania.package\":{\"source\":\"iana\",\"extensions\":[\"smzip\"]},\"application/vnd.stepmania.stepchart\":{\"source\":\"iana\",\"extensions\":[\"sm\"]},\"application/vnd.street-stream\":{\"source\":\"iana\"},\"application/vnd.sun.wadl+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"wadl\"]},\"application/vnd.sun.xml.calc\":{\"source\":\"apache\",\"extensions\":[\"sxc\"]},\"application/vnd.sun.xml.calc.template\":{\"source\":\"apache\",\"extensions\":[\"stc\"]},\"application/vnd.sun.xml.draw\":{\"source\":\"apache\",\"extensions\":[\"sxd\"]},\"application/vnd.sun.xml.draw.template\":{\"source\":\"apache\",\"extensions\":[\"std\"]},\"application/vnd.sun.xml.impress\":{\"source\":\"apache\",\"extensions\":[\"sxi\"]},\"application/vnd.sun.xml.impress.template\":{\"source\":\"apache\",\"extensions\":[\"sti\"]},\"application/vnd.sun.xml.math\":{\"source\":\"apache\",\"extensions\":[\"sxm\"]},\"application/vnd.sun.xml.writer\":{\"source\":\"apache\",\"extensions\":[\"sxw\"]},\"application/vnd.sun.xml.writer.global\":{\"source\":\"apache\",\"extensions\":[\"sxg\"]},\"application/vnd.sun.xml.writer.template\":{\"source\":\"apache\",\"extensions\":[\"stw\"]},\"application/vnd.sus-calendar\":{\"source\":\"iana\",\"extensions\":[\"sus\",\"susp\"]},\"application/vnd.svd\":{\"source\":\"iana\",\"extensions\":[\"svd\"]},\"application/vnd.swiftview-ics\":{\"source\":\"iana\"},\"application/vnd.sycle+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.syft+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.symbian.install\":{\"source\":\"apache\",\"extensions\":[\"sis\",\"sisx\"]},\"application/vnd.syncml+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true,\"extensions\":[\"xsm\"]},\"application/vnd.syncml.dm+wbxml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"extensions\":[\"bdm\"]},\"application/vnd.syncml.dm+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true,\"extensions\":[\"xdm\"]},\"application/vnd.syncml.dm.notification\":{\"source\":\"iana\"},\"application/vnd.syncml.dmddf+wbxml\":{\"source\":\"iana\"},\"application/vnd.syncml.dmddf+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true,\"extensions\":[\"ddf\"]},\"application/vnd.syncml.dmtnds+wbxml\":{\"source\":\"iana\"},\"application/vnd.syncml.dmtnds+xml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true},\"application/vnd.syncml.ds.notification\":{\"source\":\"iana\"},\"application/vnd.tableschema+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.tao.intent-module-archive\":{\"source\":\"iana\",\"extensions\":[\"tao\"]},\"application/vnd.tcpdump.pcap\":{\"source\":\"iana\",\"extensions\":[\"pcap\",\"cap\",\"dmp\"]},\"application/vnd.think-cell.ppttc+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.tmd.mediaflex.api+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.tml\":{\"source\":\"iana\"},\"application/vnd.tmobile-livetv\":{\"source\":\"iana\",\"extensions\":[\"tmo\"]},\"application/vnd.tri.onesource\":{\"source\":\"iana\"},\"application/vnd.trid.tpt\":{\"source\":\"iana\",\"extensions\":[\"tpt\"]},\"application/vnd.triscape.mxs\":{\"source\":\"iana\",\"extensions\":[\"mxs\"]},\"application/vnd.trueapp\":{\"source\":\"iana\",\"extensions\":[\"tra\"]},\"application/vnd.truedoc\":{\"source\":\"iana\"},\"application/vnd.ubisoft.webplayer\":{\"source\":\"iana\"},\"application/vnd.ufdl\":{\"source\":\"iana\",\"extensions\":[\"ufd\",\"ufdl\"]},\"application/vnd.uiq.theme\":{\"source\":\"iana\",\"extensions\":[\"utz\"]},\"application/vnd.umajin\":{\"source\":\"iana\",\"extensions\":[\"umj\"]},\"application/vnd.unity\":{\"source\":\"iana\",\"extensions\":[\"unityweb\"]},\"application/vnd.uoml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"uoml\"]},\"application/vnd.uplanet.alert\":{\"source\":\"iana\"},\"application/vnd.uplanet.alert-wbxml\":{\"source\":\"iana\"},\"application/vnd.uplanet.bearer-choice\":{\"source\":\"iana\"},\"application/vnd.uplanet.bearer-choice-wbxml\":{\"source\":\"iana\"},\"application/vnd.uplanet.cacheop\":{\"source\":\"iana\"},\"application/vnd.uplanet.cacheop-wbxml\":{\"source\":\"iana\"},\"application/vnd.uplanet.channel\":{\"source\":\"iana\"},\"application/vnd.uplanet.channel-wbxml\":{\"source\":\"iana\"},\"application/vnd.uplanet.list\":{\"source\":\"iana\"},\"application/vnd.uplanet.list-wbxml\":{\"source\":\"iana\"},\"application/vnd.uplanet.listcmd\":{\"source\":\"iana\"},\"application/vnd.uplanet.listcmd-wbxml\":{\"source\":\"iana\"},\"application/vnd.uplanet.signal\":{\"source\":\"iana\"},\"application/vnd.uri-map\":{\"source\":\"iana\"},\"application/vnd.valve.source.material\":{\"source\":\"iana\"},\"application/vnd.vcx\":{\"source\":\"iana\",\"extensions\":[\"vcx\"]},\"application/vnd.vd-study\":{\"source\":\"iana\"},\"application/vnd.vectorworks\":{\"source\":\"iana\"},\"application/vnd.vel+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.verimatrix.vcas\":{\"source\":\"iana\"},\"application/vnd.veritone.aion+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.veryant.thin\":{\"source\":\"iana\"},\"application/vnd.ves.encrypted\":{\"source\":\"iana\"},\"application/vnd.vidsoft.vidconference\":{\"source\":\"iana\"},\"application/vnd.visio\":{\"source\":\"iana\",\"extensions\":[\"vsd\",\"vst\",\"vss\",\"vsw\"]},\"application/vnd.visionary\":{\"source\":\"iana\",\"extensions\":[\"vis\"]},\"application/vnd.vividence.scriptfile\":{\"source\":\"iana\"},\"application/vnd.vsf\":{\"source\":\"iana\",\"extensions\":[\"vsf\"]},\"application/vnd.wap.sic\":{\"source\":\"iana\"},\"application/vnd.wap.slc\":{\"source\":\"iana\"},\"application/vnd.wap.wbxml\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"extensions\":[\"wbxml\"]},\"application/vnd.wap.wmlc\":{\"source\":\"iana\",\"extensions\":[\"wmlc\"]},\"application/vnd.wap.wmlscriptc\":{\"source\":\"iana\",\"extensions\":[\"wmlsc\"]},\"application/vnd.webturbo\":{\"source\":\"iana\",\"extensions\":[\"wtb\"]},\"application/vnd.wfa.dpp\":{\"source\":\"iana\"},\"application/vnd.wfa.p2p\":{\"source\":\"iana\"},\"application/vnd.wfa.wsc\":{\"source\":\"iana\"},\"application/vnd.windows.devicepairing\":{\"source\":\"iana\"},\"application/vnd.wmc\":{\"source\":\"iana\"},\"application/vnd.wmf.bootstrap\":{\"source\":\"iana\"},\"application/vnd.wolfram.mathematica\":{\"source\":\"iana\"},\"application/vnd.wolfram.mathematica.package\":{\"source\":\"iana\"},\"application/vnd.wolfram.player\":{\"source\":\"iana\",\"extensions\":[\"nbp\"]},\"application/vnd.wordperfect\":{\"source\":\"iana\",\"extensions\":[\"wpd\"]},\"application/vnd.wqd\":{\"source\":\"iana\",\"extensions\":[\"wqd\"]},\"application/vnd.wrq-hp3000-labelled\":{\"source\":\"iana\"},\"application/vnd.wt.stf\":{\"source\":\"iana\",\"extensions\":[\"stf\"]},\"application/vnd.wv.csp+wbxml\":{\"source\":\"iana\"},\"application/vnd.wv.csp+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.wv.ssp+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.xacml+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.xara\":{\"source\":\"iana\",\"extensions\":[\"xar\"]},\"application/vnd.xfdl\":{\"source\":\"iana\",\"extensions\":[\"xfdl\"]},\"application/vnd.xfdl.webform\":{\"source\":\"iana\"},\"application/vnd.xmi+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/vnd.xmpie.cpkg\":{\"source\":\"iana\"},\"application/vnd.xmpie.dpkg\":{\"source\":\"iana\"},\"application/vnd.xmpie.plan\":{\"source\":\"iana\"},\"application/vnd.xmpie.ppkg\":{\"source\":\"iana\"},\"application/vnd.xmpie.xlim\":{\"source\":\"iana\"},\"application/vnd.yamaha.hv-dic\":{\"source\":\"iana\",\"extensions\":[\"hvd\"]},\"application/vnd.yamaha.hv-script\":{\"source\":\"iana\",\"extensions\":[\"hvs\"]},\"application/vnd.yamaha.hv-voice\":{\"source\":\"iana\",\"extensions\":[\"hvp\"]},\"application/vnd.yamaha.openscoreformat\":{\"source\":\"iana\",\"extensions\":[\"osf\"]},\"application/vnd.yamaha.openscoreformat.osfpvg+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"osfpvg\"]},\"application/vnd.yamaha.remote-setup\":{\"source\":\"iana\"},\"application/vnd.yamaha.smaf-audio\":{\"source\":\"iana\",\"extensions\":[\"saf\"]},\"application/vnd.yamaha.smaf-phrase\":{\"source\":\"iana\",\"extensions\":[\"spf\"]},\"application/vnd.yamaha.through-ngn\":{\"source\":\"iana\"},\"application/vnd.yamaha.tunnel-udpencap\":{\"source\":\"iana\"},\"application/vnd.yaoweme\":{\"source\":\"iana\"},\"application/vnd.yellowriver-custom-menu\":{\"source\":\"iana\",\"extensions\":[\"cmp\"]},\"application/vnd.youtube.yt\":{\"source\":\"iana\"},\"application/vnd.zul\":{\"source\":\"iana\",\"extensions\":[\"zir\",\"zirz\"]},\"application/vnd.zzazz.deck+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"zaz\"]},\"application/voicexml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"vxml\"]},\"application/voucher-cms+json\":{\"source\":\"iana\",\"compressible\":true},\"application/vq-rtcpxr\":{\"source\":\"iana\"},\"application/wasm\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"wasm\"]},\"application/watcherinfo+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"wif\"]},\"application/webpush-options+json\":{\"source\":\"iana\",\"compressible\":true},\"application/whoispp-query\":{\"source\":\"iana\"},\"application/whoispp-response\":{\"source\":\"iana\"},\"application/widget\":{\"source\":\"iana\",\"extensions\":[\"wgt\"]},\"application/winhlp\":{\"source\":\"apache\",\"extensions\":[\"hlp\"]},\"application/wita\":{\"source\":\"iana\"},\"application/wordperfect5.1\":{\"source\":\"iana\"},\"application/wsdl+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"wsdl\"]},\"application/wspolicy+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"wspolicy\"]},\"application/x-7z-compressed\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"7z\"]},\"application/x-abiword\":{\"source\":\"apache\",\"extensions\":[\"abw\"]},\"application/x-ace-compressed\":{\"source\":\"apache\",\"extensions\":[\"ace\"]},\"application/x-amf\":{\"source\":\"apache\"},\"application/x-apple-diskimage\":{\"source\":\"apache\",\"extensions\":[\"dmg\"]},\"application/x-arj\":{\"compressible\":false,\"extensions\":[\"arj\"]},\"application/x-authorware-bin\":{\"source\":\"apache\",\"extensions\":[\"aab\",\"x32\",\"u32\",\"vox\"]},\"application/x-authorware-map\":{\"source\":\"apache\",\"extensions\":[\"aam\"]},\"application/x-authorware-seg\":{\"source\":\"apache\",\"extensions\":[\"aas\"]},\"application/x-bcpio\":{\"source\":\"apache\",\"extensions\":[\"bcpio\"]},\"application/x-bdoc\":{\"compressible\":false,\"extensions\":[\"bdoc\"]},\"application/x-bittorrent\":{\"source\":\"apache\",\"extensions\":[\"torrent\"]},\"application/x-blorb\":{\"source\":\"apache\",\"extensions\":[\"blb\",\"blorb\"]},\"application/x-bzip\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"bz\"]},\"application/x-bzip2\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"bz2\",\"boz\"]},\"application/x-cbr\":{\"source\":\"apache\",\"extensions\":[\"cbr\",\"cba\",\"cbt\",\"cbz\",\"cb7\"]},\"application/x-cdlink\":{\"source\":\"apache\",\"extensions\":[\"vcd\"]},\"application/x-cfs-compressed\":{\"source\":\"apache\",\"extensions\":[\"cfs\"]},\"application/x-chat\":{\"source\":\"apache\",\"extensions\":[\"chat\"]},\"application/x-chess-pgn\":{\"source\":\"apache\",\"extensions\":[\"pgn\"]},\"application/x-chrome-extension\":{\"extensions\":[\"crx\"]},\"application/x-cocoa\":{\"source\":\"nginx\",\"extensions\":[\"cco\"]},\"application/x-compress\":{\"source\":\"apache\"},\"application/x-conference\":{\"source\":\"apache\",\"extensions\":[\"nsc\"]},\"application/x-cpio\":{\"source\":\"apache\",\"extensions\":[\"cpio\"]},\"application/x-csh\":{\"source\":\"apache\",\"extensions\":[\"csh\"]},\"application/x-deb\":{\"compressible\":false},\"application/x-debian-package\":{\"source\":\"apache\",\"extensions\":[\"deb\",\"udeb\"]},\"application/x-dgc-compressed\":{\"source\":\"apache\",\"extensions\":[\"dgc\"]},\"application/x-director\":{\"source\":\"apache\",\"extensions\":[\"dir\",\"dcr\",\"dxr\",\"cst\",\"cct\",\"cxt\",\"w3d\",\"fgd\",\"swa\"]},\"application/x-doom\":{\"source\":\"apache\",\"extensions\":[\"wad\"]},\"application/x-dtbncx+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"ncx\"]},\"application/x-dtbook+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"dtb\"]},\"application/x-dtbresource+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"res\"]},\"application/x-dvi\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"dvi\"]},\"application/x-envoy\":{\"source\":\"apache\",\"extensions\":[\"evy\"]},\"application/x-eva\":{\"source\":\"apache\",\"extensions\":[\"eva\"]},\"application/x-font-bdf\":{\"source\":\"apache\",\"extensions\":[\"bdf\"]},\"application/x-font-dos\":{\"source\":\"apache\"},\"application/x-font-framemaker\":{\"source\":\"apache\"},\"application/x-font-ghostscript\":{\"source\":\"apache\",\"extensions\":[\"gsf\"]},\"application/x-font-libgrx\":{\"source\":\"apache\"},\"application/x-font-linux-psf\":{\"source\":\"apache\",\"extensions\":[\"psf\"]},\"application/x-font-pcf\":{\"source\":\"apache\",\"extensions\":[\"pcf\"]},\"application/x-font-snf\":{\"source\":\"apache\",\"extensions\":[\"snf\"]},\"application/x-font-speedo\":{\"source\":\"apache\"},\"application/x-font-sunos-news\":{\"source\":\"apache\"},\"application/x-font-type1\":{\"source\":\"apache\",\"extensions\":[\"pfa\",\"pfb\",\"pfm\",\"afm\"]},\"application/x-font-vfont\":{\"source\":\"apache\"},\"application/x-freearc\":{\"source\":\"apache\",\"extensions\":[\"arc\"]},\"application/x-futuresplash\":{\"source\":\"apache\",\"extensions\":[\"spl\"]},\"application/x-gca-compressed\":{\"source\":\"apache\",\"extensions\":[\"gca\"]},\"application/x-glulx\":{\"source\":\"apache\",\"extensions\":[\"ulx\"]},\"application/x-gnumeric\":{\"source\":\"apache\",\"extensions\":[\"gnumeric\"]},\"application/x-gramps-xml\":{\"source\":\"apache\",\"extensions\":[\"gramps\"]},\"application/x-gtar\":{\"source\":\"apache\",\"extensions\":[\"gtar\"]},\"application/x-gzip\":{\"source\":\"apache\"},\"application/x-hdf\":{\"source\":\"apache\",\"extensions\":[\"hdf\"]},\"application/x-httpd-php\":{\"compressible\":true,\"extensions\":[\"php\"]},\"application/x-install-instructions\":{\"source\":\"apache\",\"extensions\":[\"install\"]},\"application/x-iso9660-image\":{\"source\":\"apache\",\"extensions\":[\"iso\"]},\"application/x-iwork-keynote-sffkey\":{\"extensions\":[\"key\"]},\"application/x-iwork-numbers-sffnumbers\":{\"extensions\":[\"numbers\"]},\"application/x-iwork-pages-sffpages\":{\"extensions\":[\"pages\"]},\"application/x-java-archive-diff\":{\"source\":\"nginx\",\"extensions\":[\"jardiff\"]},\"application/x-java-jnlp-file\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"jnlp\"]},\"application/x-javascript\":{\"compressible\":true},\"application/x-keepass2\":{\"extensions\":[\"kdbx\"]},\"application/x-latex\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"latex\"]},\"application/x-lua-bytecode\":{\"extensions\":[\"luac\"]},\"application/x-lzh-compressed\":{\"source\":\"apache\",\"extensions\":[\"lzh\",\"lha\"]},\"application/x-makeself\":{\"source\":\"nginx\",\"extensions\":[\"run\"]},\"application/x-mie\":{\"source\":\"apache\",\"extensions\":[\"mie\"]},\"application/x-mobipocket-ebook\":{\"source\":\"apache\",\"extensions\":[\"prc\",\"mobi\"]},\"application/x-mpegurl\":{\"compressible\":false},\"application/x-ms-application\":{\"source\":\"apache\",\"extensions\":[\"application\"]},\"application/x-ms-shortcut\":{\"source\":\"apache\",\"extensions\":[\"lnk\"]},\"application/x-ms-wmd\":{\"source\":\"apache\",\"extensions\":[\"wmd\"]},\"application/x-ms-wmz\":{\"source\":\"apache\",\"extensions\":[\"wmz\"]},\"application/x-ms-xbap\":{\"source\":\"apache\",\"extensions\":[\"xbap\"]},\"application/x-msaccess\":{\"source\":\"apache\",\"extensions\":[\"mdb\"]},\"application/x-msbinder\":{\"source\":\"apache\",\"extensions\":[\"obd\"]},\"application/x-mscardfile\":{\"source\":\"apache\",\"extensions\":[\"crd\"]},\"application/x-msclip\":{\"source\":\"apache\",\"extensions\":[\"clp\"]},\"application/x-msdos-program\":{\"extensions\":[\"exe\"]},\"application/x-msdownload\":{\"source\":\"apache\",\"extensions\":[\"exe\",\"dll\",\"com\",\"bat\",\"msi\"]},\"application/x-msmediaview\":{\"source\":\"apache\",\"extensions\":[\"mvb\",\"m13\",\"m14\"]},\"application/x-msmetafile\":{\"source\":\"apache\",\"extensions\":[\"wmf\",\"wmz\",\"emf\",\"emz\"]},\"application/x-msmoney\":{\"source\":\"apache\",\"extensions\":[\"mny\"]},\"application/x-mspublisher\":{\"source\":\"apache\",\"extensions\":[\"pub\"]},\"application/x-msschedule\":{\"source\":\"apache\",\"extensions\":[\"scd\"]},\"application/x-msterminal\":{\"source\":\"apache\",\"extensions\":[\"trm\"]},\"application/x-mswrite\":{\"source\":\"apache\",\"extensions\":[\"wri\"]},\"application/x-netcdf\":{\"source\":\"apache\",\"extensions\":[\"nc\",\"cdf\"]},\"application/x-ns-proxy-autoconfig\":{\"compressible\":true,\"extensions\":[\"pac\"]},\"application/x-nzb\":{\"source\":\"apache\",\"extensions\":[\"nzb\"]},\"application/x-perl\":{\"source\":\"nginx\",\"extensions\":[\"pl\",\"pm\"]},\"application/x-pilot\":{\"source\":\"nginx\",\"extensions\":[\"prc\",\"pdb\"]},\"application/x-pkcs12\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"p12\",\"pfx\"]},\"application/x-pkcs7-certificates\":{\"source\":\"apache\",\"extensions\":[\"p7b\",\"spc\"]},\"application/x-pkcs7-certreqresp\":{\"source\":\"apache\",\"extensions\":[\"p7r\"]},\"application/x-pki-message\":{\"source\":\"iana\"},\"application/x-rar-compressed\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"rar\"]},\"application/x-redhat-package-manager\":{\"source\":\"nginx\",\"extensions\":[\"rpm\"]},\"application/x-research-info-systems\":{\"source\":\"apache\",\"extensions\":[\"ris\"]},\"application/x-sea\":{\"source\":\"nginx\",\"extensions\":[\"sea\"]},\"application/x-sh\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"sh\"]},\"application/x-shar\":{\"source\":\"apache\",\"extensions\":[\"shar\"]},\"application/x-shockwave-flash\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"swf\"]},\"application/x-silverlight-app\":{\"source\":\"apache\",\"extensions\":[\"xap\"]},\"application/x-sql\":{\"source\":\"apache\",\"extensions\":[\"sql\"]},\"application/x-stuffit\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"sit\"]},\"application/x-stuffitx\":{\"source\":\"apache\",\"extensions\":[\"sitx\"]},\"application/x-subrip\":{\"source\":\"apache\",\"extensions\":[\"srt\"]},\"application/x-sv4cpio\":{\"source\":\"apache\",\"extensions\":[\"sv4cpio\"]},\"application/x-sv4crc\":{\"source\":\"apache\",\"extensions\":[\"sv4crc\"]},\"application/x-t3vm-image\":{\"source\":\"apache\",\"extensions\":[\"t3\"]},\"application/x-tads\":{\"source\":\"apache\",\"extensions\":[\"gam\"]},\"application/x-tar\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"tar\"]},\"application/x-tcl\":{\"source\":\"apache\",\"extensions\":[\"tcl\",\"tk\"]},\"application/x-tex\":{\"source\":\"apache\",\"extensions\":[\"tex\"]},\"application/x-tex-tfm\":{\"source\":\"apache\",\"extensions\":[\"tfm\"]},\"application/x-texinfo\":{\"source\":\"apache\",\"extensions\":[\"texinfo\",\"texi\"]},\"application/x-tgif\":{\"source\":\"apache\",\"extensions\":[\"obj\"]},\"application/x-ustar\":{\"source\":\"apache\",\"extensions\":[\"ustar\"]},\"application/x-virtualbox-hdd\":{\"compressible\":true,\"extensions\":[\"hdd\"]},\"application/x-virtualbox-ova\":{\"compressible\":true,\"extensions\":[\"ova\"]},\"application/x-virtualbox-ovf\":{\"compressible\":true,\"extensions\":[\"ovf\"]},\"application/x-virtualbox-vbox\":{\"compressible\":true,\"extensions\":[\"vbox\"]},\"application/x-virtualbox-vbox-extpack\":{\"compressible\":false,\"extensions\":[\"vbox-extpack\"]},\"application/x-virtualbox-vdi\":{\"compressible\":true,\"extensions\":[\"vdi\"]},\"application/x-virtualbox-vhd\":{\"compressible\":true,\"extensions\":[\"vhd\"]},\"application/x-virtualbox-vmdk\":{\"compressible\":true,\"extensions\":[\"vmdk\"]},\"application/x-wais-source\":{\"source\":\"apache\",\"extensions\":[\"src\"]},\"application/x-web-app-manifest+json\":{\"compressible\":true,\"extensions\":[\"webapp\"]},\"application/x-www-form-urlencoded\":{\"source\":\"iana\",\"compressible\":true},\"application/x-x509-ca-cert\":{\"source\":\"iana\",\"extensions\":[\"der\",\"crt\",\"pem\"]},\"application/x-x509-ca-ra-cert\":{\"source\":\"iana\"},\"application/x-x509-next-ca-cert\":{\"source\":\"iana\"},\"application/x-xfig\":{\"source\":\"apache\",\"extensions\":[\"fig\"]},\"application/x-xliff+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"xlf\"]},\"application/x-xpinstall\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"xpi\"]},\"application/x-xz\":{\"source\":\"apache\",\"extensions\":[\"xz\"]},\"application/x-zmachine\":{\"source\":\"apache\",\"extensions\":[\"z1\",\"z2\",\"z3\",\"z4\",\"z5\",\"z6\",\"z7\",\"z8\"]},\"application/x400-bp\":{\"source\":\"iana\"},\"application/xacml+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/xaml+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"xaml\"]},\"application/xcap-att+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xav\"]},\"application/xcap-caps+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xca\"]},\"application/xcap-diff+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xdf\"]},\"application/xcap-el+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xel\"]},\"application/xcap-error+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/xcap-ns+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xns\"]},\"application/xcon-conference-info+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/xcon-conference-info-diff+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/xenc+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xenc\"]},\"application/xhtml+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xhtml\",\"xht\"]},\"application/xhtml-voice+xml\":{\"source\":\"apache\",\"compressible\":true},\"application/xliff+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xlf\"]},\"application/xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xml\",\"xsl\",\"xsd\",\"rng\"]},\"application/xml-dtd\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"dtd\"]},\"application/xml-external-parsed-entity\":{\"source\":\"iana\"},\"application/xml-patch+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/xmpp+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/xop+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xop\"]},\"application/xproc+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"xpl\"]},\"application/xslt+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xsl\",\"xslt\"]},\"application/xspf+xml\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"xspf\"]},\"application/xv+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"mxml\",\"xhvml\",\"xvml\",\"xvm\"]},\"application/yang\":{\"source\":\"iana\",\"extensions\":[\"yang\"]},\"application/yang-data+json\":{\"source\":\"iana\",\"compressible\":true},\"application/yang-data+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/yang-patch+json\":{\"source\":\"iana\",\"compressible\":true},\"application/yang-patch+xml\":{\"source\":\"iana\",\"compressible\":true},\"application/yin+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"yin\"]},\"application/zip\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"zip\"]},\"application/zlib\":{\"source\":\"iana\"},\"application/zstd\":{\"source\":\"iana\"},\"audio/1d-interleaved-parityfec\":{\"source\":\"iana\"},\"audio/32kadpcm\":{\"source\":\"iana\"},\"audio/3gpp\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"3gpp\"]},\"audio/3gpp2\":{\"source\":\"iana\"},\"audio/aac\":{\"source\":\"iana\"},\"audio/ac3\":{\"source\":\"iana\"},\"audio/adpcm\":{\"source\":\"apache\",\"extensions\":[\"adp\"]},\"audio/amr\":{\"source\":\"iana\",\"extensions\":[\"amr\"]},\"audio/amr-wb\":{\"source\":\"iana\"},\"audio/amr-wb+\":{\"source\":\"iana\"},\"audio/aptx\":{\"source\":\"iana\"},\"audio/asc\":{\"source\":\"iana\"},\"audio/atrac-advanced-lossless\":{\"source\":\"iana\"},\"audio/atrac-x\":{\"source\":\"iana\"},\"audio/atrac3\":{\"source\":\"iana\"},\"audio/basic\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"au\",\"snd\"]},\"audio/bv16\":{\"source\":\"iana\"},\"audio/bv32\":{\"source\":\"iana\"},\"audio/clearmode\":{\"source\":\"iana\"},\"audio/cn\":{\"source\":\"iana\"},\"audio/dat12\":{\"source\":\"iana\"},\"audio/dls\":{\"source\":\"iana\"},\"audio/dsr-es201108\":{\"source\":\"iana\"},\"audio/dsr-es202050\":{\"source\":\"iana\"},\"audio/dsr-es202211\":{\"source\":\"iana\"},\"audio/dsr-es202212\":{\"source\":\"iana\"},\"audio/dv\":{\"source\":\"iana\"},\"audio/dvi4\":{\"source\":\"iana\"},\"audio/eac3\":{\"source\":\"iana\"},\"audio/encaprtp\":{\"source\":\"iana\"},\"audio/evrc\":{\"source\":\"iana\"},\"audio/evrc-qcp\":{\"source\":\"iana\"},\"audio/evrc0\":{\"source\":\"iana\"},\"audio/evrc1\":{\"source\":\"iana\"},\"audio/evrcb\":{\"source\":\"iana\"},\"audio/evrcb0\":{\"source\":\"iana\"},\"audio/evrcb1\":{\"source\":\"iana\"},\"audio/evrcnw\":{\"source\":\"iana\"},\"audio/evrcnw0\":{\"source\":\"iana\"},\"audio/evrcnw1\":{\"source\":\"iana\"},\"audio/evrcwb\":{\"source\":\"iana\"},\"audio/evrcwb0\":{\"source\":\"iana\"},\"audio/evrcwb1\":{\"source\":\"iana\"},\"audio/evs\":{\"source\":\"iana\"},\"audio/flexfec\":{\"source\":\"iana\"},\"audio/fwdred\":{\"source\":\"iana\"},\"audio/g711-0\":{\"source\":\"iana\"},\"audio/g719\":{\"source\":\"iana\"},\"audio/g722\":{\"source\":\"iana\"},\"audio/g7221\":{\"source\":\"iana\"},\"audio/g723\":{\"source\":\"iana\"},\"audio/g726-16\":{\"source\":\"iana\"},\"audio/g726-24\":{\"source\":\"iana\"},\"audio/g726-32\":{\"source\":\"iana\"},\"audio/g726-40\":{\"source\":\"iana\"},\"audio/g728\":{\"source\":\"iana\"},\"audio/g729\":{\"source\":\"iana\"},\"audio/g7291\":{\"source\":\"iana\"},\"audio/g729d\":{\"source\":\"iana\"},\"audio/g729e\":{\"source\":\"iana\"},\"audio/gsm\":{\"source\":\"iana\"},\"audio/gsm-efr\":{\"source\":\"iana\"},\"audio/gsm-hr-08\":{\"source\":\"iana\"},\"audio/ilbc\":{\"source\":\"iana\"},\"audio/ip-mr_v2.5\":{\"source\":\"iana\"},\"audio/isac\":{\"source\":\"apache\"},\"audio/l16\":{\"source\":\"iana\"},\"audio/l20\":{\"source\":\"iana\"},\"audio/l24\":{\"source\":\"iana\",\"compressible\":false},\"audio/l8\":{\"source\":\"iana\"},\"audio/lpc\":{\"source\":\"iana\"},\"audio/melp\":{\"source\":\"iana\"},\"audio/melp1200\":{\"source\":\"iana\"},\"audio/melp2400\":{\"source\":\"iana\"},\"audio/melp600\":{\"source\":\"iana\"},\"audio/mhas\":{\"source\":\"iana\"},\"audio/midi\":{\"source\":\"apache\",\"extensions\":[\"mid\",\"midi\",\"kar\",\"rmi\"]},\"audio/mobile-xmf\":{\"source\":\"iana\",\"extensions\":[\"mxmf\"]},\"audio/mp3\":{\"compressible\":false,\"extensions\":[\"mp3\"]},\"audio/mp4\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"m4a\",\"mp4a\"]},\"audio/mp4a-latm\":{\"source\":\"iana\"},\"audio/mpa\":{\"source\":\"iana\"},\"audio/mpa-robust\":{\"source\":\"iana\"},\"audio/mpeg\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"mpga\",\"mp2\",\"mp2a\",\"mp3\",\"m2a\",\"m3a\"]},\"audio/mpeg4-generic\":{\"source\":\"iana\"},\"audio/musepack\":{\"source\":\"apache\"},\"audio/ogg\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"oga\",\"ogg\",\"spx\",\"opus\"]},\"audio/opus\":{\"source\":\"iana\"},\"audio/parityfec\":{\"source\":\"iana\"},\"audio/pcma\":{\"source\":\"iana\"},\"audio/pcma-wb\":{\"source\":\"iana\"},\"audio/pcmu\":{\"source\":\"iana\"},\"audio/pcmu-wb\":{\"source\":\"iana\"},\"audio/prs.sid\":{\"source\":\"iana\"},\"audio/qcelp\":{\"source\":\"iana\"},\"audio/raptorfec\":{\"source\":\"iana\"},\"audio/red\":{\"source\":\"iana\"},\"audio/rtp-enc-aescm128\":{\"source\":\"iana\"},\"audio/rtp-midi\":{\"source\":\"iana\"},\"audio/rtploopback\":{\"source\":\"iana\"},\"audio/rtx\":{\"source\":\"iana\"},\"audio/s3m\":{\"source\":\"apache\",\"extensions\":[\"s3m\"]},\"audio/scip\":{\"source\":\"iana\"},\"audio/silk\":{\"source\":\"apache\",\"extensions\":[\"sil\"]},\"audio/smv\":{\"source\":\"iana\"},\"audio/smv-qcp\":{\"source\":\"iana\"},\"audio/smv0\":{\"source\":\"iana\"},\"audio/sofa\":{\"source\":\"iana\"},\"audio/sp-midi\":{\"source\":\"iana\"},\"audio/speex\":{\"source\":\"iana\"},\"audio/t140c\":{\"source\":\"iana\"},\"audio/t38\":{\"source\":\"iana\"},\"audio/telephone-event\":{\"source\":\"iana\"},\"audio/tetra_acelp\":{\"source\":\"iana\"},\"audio/tetra_acelp_bb\":{\"source\":\"iana\"},\"audio/tone\":{\"source\":\"iana\"},\"audio/tsvcis\":{\"source\":\"iana\"},\"audio/uemclip\":{\"source\":\"iana\"},\"audio/ulpfec\":{\"source\":\"iana\"},\"audio/usac\":{\"source\":\"iana\"},\"audio/vdvi\":{\"source\":\"iana\"},\"audio/vmr-wb\":{\"source\":\"iana\"},\"audio/vnd.3gpp.iufp\":{\"source\":\"iana\"},\"audio/vnd.4sb\":{\"source\":\"iana\"},\"audio/vnd.audiokoz\":{\"source\":\"iana\"},\"audio/vnd.celp\":{\"source\":\"iana\"},\"audio/vnd.cisco.nse\":{\"source\":\"iana\"},\"audio/vnd.cmles.radio-events\":{\"source\":\"iana\"},\"audio/vnd.cns.anp1\":{\"source\":\"iana\"},\"audio/vnd.cns.inf1\":{\"source\":\"iana\"},\"audio/vnd.dece.audio\":{\"source\":\"iana\",\"extensions\":[\"uva\",\"uvva\"]},\"audio/vnd.digital-winds\":{\"source\":\"iana\",\"extensions\":[\"eol\"]},\"audio/vnd.dlna.adts\":{\"source\":\"iana\"},\"audio/vnd.dolby.heaac.1\":{\"source\":\"iana\"},\"audio/vnd.dolby.heaac.2\":{\"source\":\"iana\"},\"audio/vnd.dolby.mlp\":{\"source\":\"iana\"},\"audio/vnd.dolby.mps\":{\"source\":\"iana\"},\"audio/vnd.dolby.pl2\":{\"source\":\"iana\"},\"audio/vnd.dolby.pl2x\":{\"source\":\"iana\"},\"audio/vnd.dolby.pl2z\":{\"source\":\"iana\"},\"audio/vnd.dolby.pulse.1\":{\"source\":\"iana\"},\"audio/vnd.dra\":{\"source\":\"iana\",\"extensions\":[\"dra\"]},\"audio/vnd.dts\":{\"source\":\"iana\",\"extensions\":[\"dts\"]},\"audio/vnd.dts.hd\":{\"source\":\"iana\",\"extensions\":[\"dtshd\"]},\"audio/vnd.dts.uhd\":{\"source\":\"iana\"},\"audio/vnd.dvb.file\":{\"source\":\"iana\"},\"audio/vnd.everad.plj\":{\"source\":\"iana\"},\"audio/vnd.hns.audio\":{\"source\":\"iana\"},\"audio/vnd.lucent.voice\":{\"source\":\"iana\",\"extensions\":[\"lvp\"]},\"audio/vnd.ms-playready.media.pya\":{\"source\":\"iana\",\"extensions\":[\"pya\"]},\"audio/vnd.nokia.mobile-xmf\":{\"source\":\"iana\"},\"audio/vnd.nortel.vbk\":{\"source\":\"iana\"},\"audio/vnd.nuera.ecelp4800\":{\"source\":\"iana\",\"extensions\":[\"ecelp4800\"]},\"audio/vnd.nuera.ecelp7470\":{\"source\":\"iana\",\"extensions\":[\"ecelp7470\"]},\"audio/vnd.nuera.ecelp9600\":{\"source\":\"iana\",\"extensions\":[\"ecelp9600\"]},\"audio/vnd.octel.sbc\":{\"source\":\"iana\"},\"audio/vnd.presonus.multitrack\":{\"source\":\"iana\"},\"audio/vnd.qcelp\":{\"source\":\"iana\"},\"audio/vnd.rhetorex.32kadpcm\":{\"source\":\"iana\"},\"audio/vnd.rip\":{\"source\":\"iana\",\"extensions\":[\"rip\"]},\"audio/vnd.rn-realaudio\":{\"compressible\":false},\"audio/vnd.sealedmedia.softseal.mpeg\":{\"source\":\"iana\"},\"audio/vnd.vmx.cvsd\":{\"source\":\"iana\"},\"audio/vnd.wave\":{\"compressible\":false},\"audio/vorbis\":{\"source\":\"iana\",\"compressible\":false},\"audio/vorbis-config\":{\"source\":\"iana\"},\"audio/wav\":{\"compressible\":false,\"extensions\":[\"wav\"]},\"audio/wave\":{\"compressible\":false,\"extensions\":[\"wav\"]},\"audio/webm\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"weba\"]},\"audio/x-aac\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"aac\"]},\"audio/x-aiff\":{\"source\":\"apache\",\"extensions\":[\"aif\",\"aiff\",\"aifc\"]},\"audio/x-caf\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"caf\"]},\"audio/x-flac\":{\"source\":\"apache\",\"extensions\":[\"flac\"]},\"audio/x-m4a\":{\"source\":\"nginx\",\"extensions\":[\"m4a\"]},\"audio/x-matroska\":{\"source\":\"apache\",\"extensions\":[\"mka\"]},\"audio/x-mpegurl\":{\"source\":\"apache\",\"extensions\":[\"m3u\"]},\"audio/x-ms-wax\":{\"source\":\"apache\",\"extensions\":[\"wax\"]},\"audio/x-ms-wma\":{\"source\":\"apache\",\"extensions\":[\"wma\"]},\"audio/x-pn-realaudio\":{\"source\":\"apache\",\"extensions\":[\"ram\",\"ra\"]},\"audio/x-pn-realaudio-plugin\":{\"source\":\"apache\",\"extensions\":[\"rmp\"]},\"audio/x-realaudio\":{\"source\":\"nginx\",\"extensions\":[\"ra\"]},\"audio/x-tta\":{\"source\":\"apache\"},\"audio/x-wav\":{\"source\":\"apache\",\"extensions\":[\"wav\"]},\"audio/xm\":{\"source\":\"apache\",\"extensions\":[\"xm\"]},\"chemical/x-cdx\":{\"source\":\"apache\",\"extensions\":[\"cdx\"]},\"chemical/x-cif\":{\"source\":\"apache\",\"extensions\":[\"cif\"]},\"chemical/x-cmdf\":{\"source\":\"apache\",\"extensions\":[\"cmdf\"]},\"chemical/x-cml\":{\"source\":\"apache\",\"extensions\":[\"cml\"]},\"chemical/x-csml\":{\"source\":\"apache\",\"extensions\":[\"csml\"]},\"chemical/x-pdb\":{\"source\":\"apache\"},\"chemical/x-xyz\":{\"source\":\"apache\",\"extensions\":[\"xyz\"]},\"font/collection\":{\"source\":\"iana\",\"extensions\":[\"ttc\"]},\"font/otf\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"otf\"]},\"font/sfnt\":{\"source\":\"iana\"},\"font/ttf\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"ttf\"]},\"font/woff\":{\"source\":\"iana\",\"extensions\":[\"woff\"]},\"font/woff2\":{\"source\":\"iana\",\"extensions\":[\"woff2\"]},\"image/aces\":{\"source\":\"iana\",\"extensions\":[\"exr\"]},\"image/apng\":{\"compressible\":false,\"extensions\":[\"apng\"]},\"image/avci\":{\"source\":\"iana\",\"extensions\":[\"avci\"]},\"image/avcs\":{\"source\":\"iana\",\"extensions\":[\"avcs\"]},\"image/avif\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"avif\"]},\"image/bmp\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"bmp\"]},\"image/cgm\":{\"source\":\"iana\",\"extensions\":[\"cgm\"]},\"image/dicom-rle\":{\"source\":\"iana\",\"extensions\":[\"drle\"]},\"image/emf\":{\"source\":\"iana\",\"extensions\":[\"emf\"]},\"image/fits\":{\"source\":\"iana\",\"extensions\":[\"fits\"]},\"image/g3fax\":{\"source\":\"iana\",\"extensions\":[\"g3\"]},\"image/gif\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"gif\"]},\"image/heic\":{\"source\":\"iana\",\"extensions\":[\"heic\"]},\"image/heic-sequence\":{\"source\":\"iana\",\"extensions\":[\"heics\"]},\"image/heif\":{\"source\":\"iana\",\"extensions\":[\"heif\"]},\"image/heif-sequence\":{\"source\":\"iana\",\"extensions\":[\"heifs\"]},\"image/hej2k\":{\"source\":\"iana\",\"extensions\":[\"hej2\"]},\"image/hsj2\":{\"source\":\"iana\",\"extensions\":[\"hsj2\"]},\"image/ief\":{\"source\":\"iana\",\"extensions\":[\"ief\"]},\"image/jls\":{\"source\":\"iana\",\"extensions\":[\"jls\"]},\"image/jp2\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"jp2\",\"jpg2\"]},\"image/jpeg\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"jpeg\",\"jpg\",\"jpe\"]},\"image/jph\":{\"source\":\"iana\",\"extensions\":[\"jph\"]},\"image/jphc\":{\"source\":\"iana\",\"extensions\":[\"jhc\"]},\"image/jpm\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"jpm\"]},\"image/jpx\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"jpx\",\"jpf\"]},\"image/jxr\":{\"source\":\"iana\",\"extensions\":[\"jxr\"]},\"image/jxra\":{\"source\":\"iana\",\"extensions\":[\"jxra\"]},\"image/jxrs\":{\"source\":\"iana\",\"extensions\":[\"jxrs\"]},\"image/jxs\":{\"source\":\"iana\",\"extensions\":[\"jxs\"]},\"image/jxsc\":{\"source\":\"iana\",\"extensions\":[\"jxsc\"]},\"image/jxsi\":{\"source\":\"iana\",\"extensions\":[\"jxsi\"]},\"image/jxss\":{\"source\":\"iana\",\"extensions\":[\"jxss\"]},\"image/ktx\":{\"source\":\"iana\",\"extensions\":[\"ktx\"]},\"image/ktx2\":{\"source\":\"iana\",\"extensions\":[\"ktx2\"]},\"image/naplps\":{\"source\":\"iana\"},\"image/pjpeg\":{\"compressible\":false},\"image/png\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"png\"]},\"image/prs.btif\":{\"source\":\"iana\",\"extensions\":[\"btif\"]},\"image/prs.pti\":{\"source\":\"iana\",\"extensions\":[\"pti\"]},\"image/pwg-raster\":{\"source\":\"iana\"},\"image/sgi\":{\"source\":\"apache\",\"extensions\":[\"sgi\"]},\"image/svg+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"svg\",\"svgz\"]},\"image/t38\":{\"source\":\"iana\",\"extensions\":[\"t38\"]},\"image/tiff\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"tif\",\"tiff\"]},\"image/tiff-fx\":{\"source\":\"iana\",\"extensions\":[\"tfx\"]},\"image/vnd.adobe.photoshop\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"psd\"]},\"image/vnd.airzip.accelerator.azv\":{\"source\":\"iana\",\"extensions\":[\"azv\"]},\"image/vnd.cns.inf2\":{\"source\":\"iana\"},\"image/vnd.dece.graphic\":{\"source\":\"iana\",\"extensions\":[\"uvi\",\"uvvi\",\"uvg\",\"uvvg\"]},\"image/vnd.djvu\":{\"source\":\"iana\",\"extensions\":[\"djvu\",\"djv\"]},\"image/vnd.dvb.subtitle\":{\"source\":\"iana\",\"extensions\":[\"sub\"]},\"image/vnd.dwg\":{\"source\":\"iana\",\"extensions\":[\"dwg\"]},\"image/vnd.dxf\":{\"source\":\"iana\",\"extensions\":[\"dxf\"]},\"image/vnd.fastbidsheet\":{\"source\":\"iana\",\"extensions\":[\"fbs\"]},\"image/vnd.fpx\":{\"source\":\"iana\",\"extensions\":[\"fpx\"]},\"image/vnd.fst\":{\"source\":\"iana\",\"extensions\":[\"fst\"]},\"image/vnd.fujixerox.edmics-mmr\":{\"source\":\"iana\",\"extensions\":[\"mmr\"]},\"image/vnd.fujixerox.edmics-rlc\":{\"source\":\"iana\",\"extensions\":[\"rlc\"]},\"image/vnd.globalgraphics.pgb\":{\"source\":\"iana\"},\"image/vnd.microsoft.icon\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"ico\"]},\"image/vnd.mix\":{\"source\":\"iana\"},\"image/vnd.mozilla.apng\":{\"source\":\"iana\"},\"image/vnd.ms-dds\":{\"compressible\":true,\"extensions\":[\"dds\"]},\"image/vnd.ms-modi\":{\"source\":\"iana\",\"extensions\":[\"mdi\"]},\"image/vnd.ms-photo\":{\"source\":\"apache\",\"extensions\":[\"wdp\"]},\"image/vnd.net-fpx\":{\"source\":\"iana\",\"extensions\":[\"npx\"]},\"image/vnd.pco.b16\":{\"source\":\"iana\",\"extensions\":[\"b16\"]},\"image/vnd.radiance\":{\"source\":\"iana\"},\"image/vnd.sealed.png\":{\"source\":\"iana\"},\"image/vnd.sealedmedia.softseal.gif\":{\"source\":\"iana\"},\"image/vnd.sealedmedia.softseal.jpg\":{\"source\":\"iana\"},\"image/vnd.svf\":{\"source\":\"iana\"},\"image/vnd.tencent.tap\":{\"source\":\"iana\",\"extensions\":[\"tap\"]},\"image/vnd.valve.source.texture\":{\"source\":\"iana\",\"extensions\":[\"vtf\"]},\"image/vnd.wap.wbmp\":{\"source\":\"iana\",\"extensions\":[\"wbmp\"]},\"image/vnd.xiff\":{\"source\":\"iana\",\"extensions\":[\"xif\"]},\"image/vnd.zbrush.pcx\":{\"source\":\"iana\",\"extensions\":[\"pcx\"]},\"image/webp\":{\"source\":\"apache\",\"extensions\":[\"webp\"]},\"image/wmf\":{\"source\":\"iana\",\"extensions\":[\"wmf\"]},\"image/x-3ds\":{\"source\":\"apache\",\"extensions\":[\"3ds\"]},\"image/x-cmu-raster\":{\"source\":\"apache\",\"extensions\":[\"ras\"]},\"image/x-cmx\":{\"source\":\"apache\",\"extensions\":[\"cmx\"]},\"image/x-freehand\":{\"source\":\"apache\",\"extensions\":[\"fh\",\"fhc\",\"fh4\",\"fh5\",\"fh7\"]},\"image/x-icon\":{\"source\":\"apache\",\"compressible\":true,\"extensions\":[\"ico\"]},\"image/x-jng\":{\"source\":\"nginx\",\"extensions\":[\"jng\"]},\"image/x-mrsid-image\":{\"source\":\"apache\",\"extensions\":[\"sid\"]},\"image/x-ms-bmp\":{\"source\":\"nginx\",\"compressible\":true,\"extensions\":[\"bmp\"]},\"image/x-pcx\":{\"source\":\"apache\",\"extensions\":[\"pcx\"]},\"image/x-pict\":{\"source\":\"apache\",\"extensions\":[\"pic\",\"pct\"]},\"image/x-portable-anymap\":{\"source\":\"apache\",\"extensions\":[\"pnm\"]},\"image/x-portable-bitmap\":{\"source\":\"apache\",\"extensions\":[\"pbm\"]},\"image/x-portable-graymap\":{\"source\":\"apache\",\"extensions\":[\"pgm\"]},\"image/x-portable-pixmap\":{\"source\":\"apache\",\"extensions\":[\"ppm\"]},\"image/x-rgb\":{\"source\":\"apache\",\"extensions\":[\"rgb\"]},\"image/x-tga\":{\"source\":\"apache\",\"extensions\":[\"tga\"]},\"image/x-xbitmap\":{\"source\":\"apache\",\"extensions\":[\"xbm\"]},\"image/x-xcf\":{\"compressible\":false},\"image/x-xpixmap\":{\"source\":\"apache\",\"extensions\":[\"xpm\"]},\"image/x-xwindowdump\":{\"source\":\"apache\",\"extensions\":[\"xwd\"]},\"message/cpim\":{\"source\":\"iana\"},\"message/delivery-status\":{\"source\":\"iana\"},\"message/disposition-notification\":{\"source\":\"iana\",\"extensions\":[\"disposition-notification\"]},\"message/external-body\":{\"source\":\"iana\"},\"message/feedback-report\":{\"source\":\"iana\"},\"message/global\":{\"source\":\"iana\",\"extensions\":[\"u8msg\"]},\"message/global-delivery-status\":{\"source\":\"iana\",\"extensions\":[\"u8dsn\"]},\"message/global-disposition-notification\":{\"source\":\"iana\",\"extensions\":[\"u8mdn\"]},\"message/global-headers\":{\"source\":\"iana\",\"extensions\":[\"u8hdr\"]},\"message/http\":{\"source\":\"iana\",\"compressible\":false},\"message/imdn+xml\":{\"source\":\"iana\",\"compressible\":true},\"message/news\":{\"source\":\"iana\"},\"message/partial\":{\"source\":\"iana\",\"compressible\":false},\"message/rfc822\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"eml\",\"mime\"]},\"message/s-http\":{\"source\":\"iana\"},\"message/sip\":{\"source\":\"iana\"},\"message/sipfrag\":{\"source\":\"iana\"},\"message/tracking-status\":{\"source\":\"iana\"},\"message/vnd.si.simp\":{\"source\":\"iana\"},\"message/vnd.wfa.wsc\":{\"source\":\"iana\",\"extensions\":[\"wsc\"]},\"model/3mf\":{\"source\":\"iana\",\"extensions\":[\"3mf\"]},\"model/e57\":{\"source\":\"iana\"},\"model/gltf+json\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"gltf\"]},\"model/gltf-binary\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"glb\"]},\"model/iges\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"igs\",\"iges\"]},\"model/mesh\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"msh\",\"mesh\",\"silo\"]},\"model/mtl\":{\"source\":\"iana\",\"extensions\":[\"mtl\"]},\"model/obj\":{\"source\":\"iana\",\"extensions\":[\"obj\"]},\"model/step\":{\"source\":\"iana\"},\"model/step+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"stpx\"]},\"model/step+zip\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"stpz\"]},\"model/step-xml+zip\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"stpxz\"]},\"model/stl\":{\"source\":\"iana\",\"extensions\":[\"stl\"]},\"model/vnd.collada+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"dae\"]},\"model/vnd.dwf\":{\"source\":\"iana\",\"extensions\":[\"dwf\"]},\"model/vnd.flatland.3dml\":{\"source\":\"iana\"},\"model/vnd.gdl\":{\"source\":\"iana\",\"extensions\":[\"gdl\"]},\"model/vnd.gs-gdl\":{\"source\":\"apache\"},\"model/vnd.gs.gdl\":{\"source\":\"iana\"},\"model/vnd.gtw\":{\"source\":\"iana\",\"extensions\":[\"gtw\"]},\"model/vnd.moml+xml\":{\"source\":\"iana\",\"compressible\":true},\"model/vnd.mts\":{\"source\":\"iana\",\"extensions\":[\"mts\"]},\"model/vnd.opengex\":{\"source\":\"iana\",\"extensions\":[\"ogex\"]},\"model/vnd.parasolid.transmit.binary\":{\"source\":\"iana\",\"extensions\":[\"x_b\"]},\"model/vnd.parasolid.transmit.text\":{\"source\":\"iana\",\"extensions\":[\"x_t\"]},\"model/vnd.pytha.pyox\":{\"source\":\"iana\"},\"model/vnd.rosette.annotated-data-model\":{\"source\":\"iana\"},\"model/vnd.sap.vds\":{\"source\":\"iana\",\"extensions\":[\"vds\"]},\"model/vnd.usdz+zip\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"usdz\"]},\"model/vnd.valve.source.compiled-map\":{\"source\":\"iana\",\"extensions\":[\"bsp\"]},\"model/vnd.vtu\":{\"source\":\"iana\",\"extensions\":[\"vtu\"]},\"model/vrml\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"wrl\",\"vrml\"]},\"model/x3d+binary\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"x3db\",\"x3dbz\"]},\"model/x3d+fastinfoset\":{\"source\":\"iana\",\"extensions\":[\"x3db\"]},\"model/x3d+vrml\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"x3dv\",\"x3dvz\"]},\"model/x3d+xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"x3d\",\"x3dz\"]},\"model/x3d-vrml\":{\"source\":\"iana\",\"extensions\":[\"x3dv\"]},\"multipart/alternative\":{\"source\":\"iana\",\"compressible\":false},\"multipart/appledouble\":{\"source\":\"iana\"},\"multipart/byteranges\":{\"source\":\"iana\"},\"multipart/digest\":{\"source\":\"iana\"},\"multipart/encrypted\":{\"source\":\"iana\",\"compressible\":false},\"multipart/form-data\":{\"source\":\"iana\",\"compressible\":false},\"multipart/header-set\":{\"source\":\"iana\"},\"multipart/mixed\":{\"source\":\"iana\"},\"multipart/multilingual\":{\"source\":\"iana\"},\"multipart/parallel\":{\"source\":\"iana\"},\"multipart/related\":{\"source\":\"iana\",\"compressible\":false},\"multipart/report\":{\"source\":\"iana\"},\"multipart/signed\":{\"source\":\"iana\",\"compressible\":false},\"multipart/vnd.bint.med-plus\":{\"source\":\"iana\"},\"multipart/voice-message\":{\"source\":\"iana\"},\"multipart/x-mixed-replace\":{\"source\":\"iana\"},\"text/1d-interleaved-parityfec\":{\"source\":\"iana\"},\"text/cache-manifest\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"appcache\",\"manifest\"]},\"text/calendar\":{\"source\":\"iana\",\"extensions\":[\"ics\",\"ifb\"]},\"text/calender\":{\"compressible\":true},\"text/cmd\":{\"compressible\":true},\"text/coffeescript\":{\"extensions\":[\"coffee\",\"litcoffee\"]},\"text/cql\":{\"source\":\"iana\"},\"text/cql-expression\":{\"source\":\"iana\"},\"text/cql-identifier\":{\"source\":\"iana\"},\"text/css\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true,\"extensions\":[\"css\"]},\"text/csv\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"csv\"]},\"text/csv-schema\":{\"source\":\"iana\"},\"text/directory\":{\"source\":\"iana\"},\"text/dns\":{\"source\":\"iana\"},\"text/ecmascript\":{\"source\":\"iana\"},\"text/encaprtp\":{\"source\":\"iana\"},\"text/enriched\":{\"source\":\"iana\"},\"text/fhirpath\":{\"source\":\"iana\"},\"text/flexfec\":{\"source\":\"iana\"},\"text/fwdred\":{\"source\":\"iana\"},\"text/gff3\":{\"source\":\"iana\"},\"text/grammar-ref-list\":{\"source\":\"iana\"},\"text/html\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"html\",\"htm\",\"shtml\"]},\"text/jade\":{\"extensions\":[\"jade\"]},\"text/javascript\":{\"source\":\"iana\",\"compressible\":true},\"text/jcr-cnd\":{\"source\":\"iana\"},\"text/jsx\":{\"compressible\":true,\"extensions\":[\"jsx\"]},\"text/less\":{\"compressible\":true,\"extensions\":[\"less\"]},\"text/markdown\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"markdown\",\"md\"]},\"text/mathml\":{\"source\":\"nginx\",\"extensions\":[\"mml\"]},\"text/mdx\":{\"compressible\":true,\"extensions\":[\"mdx\"]},\"text/mizar\":{\"source\":\"iana\"},\"text/n3\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true,\"extensions\":[\"n3\"]},\"text/parameters\":{\"source\":\"iana\",\"charset\":\"UTF-8\"},\"text/parityfec\":{\"source\":\"iana\"},\"text/plain\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"txt\",\"text\",\"conf\",\"def\",\"list\",\"log\",\"in\",\"ini\"]},\"text/provenance-notation\":{\"source\":\"iana\",\"charset\":\"UTF-8\"},\"text/prs.fallenstein.rst\":{\"source\":\"iana\"},\"text/prs.lines.tag\":{\"source\":\"iana\",\"extensions\":[\"dsc\"]},\"text/prs.prop.logic\":{\"source\":\"iana\"},\"text/raptorfec\":{\"source\":\"iana\"},\"text/red\":{\"source\":\"iana\"},\"text/rfc822-headers\":{\"source\":\"iana\"},\"text/richtext\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"rtx\"]},\"text/rtf\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"rtf\"]},\"text/rtp-enc-aescm128\":{\"source\":\"iana\"},\"text/rtploopback\":{\"source\":\"iana\"},\"text/rtx\":{\"source\":\"iana\"},\"text/sgml\":{\"source\":\"iana\",\"extensions\":[\"sgml\",\"sgm\"]},\"text/shaclc\":{\"source\":\"iana\"},\"text/shex\":{\"source\":\"iana\",\"extensions\":[\"shex\"]},\"text/slim\":{\"extensions\":[\"slim\",\"slm\"]},\"text/spdx\":{\"source\":\"iana\",\"extensions\":[\"spdx\"]},\"text/strings\":{\"source\":\"iana\"},\"text/stylus\":{\"extensions\":[\"stylus\",\"styl\"]},\"text/t140\":{\"source\":\"iana\"},\"text/tab-separated-values\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"tsv\"]},\"text/troff\":{\"source\":\"iana\",\"extensions\":[\"t\",\"tr\",\"roff\",\"man\",\"me\",\"ms\"]},\"text/turtle\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"extensions\":[\"ttl\"]},\"text/ulpfec\":{\"source\":\"iana\"},\"text/uri-list\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"uri\",\"uris\",\"urls\"]},\"text/vcard\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"vcard\"]},\"text/vnd.a\":{\"source\":\"iana\"},\"text/vnd.abc\":{\"source\":\"iana\"},\"text/vnd.ascii-art\":{\"source\":\"iana\"},\"text/vnd.curl\":{\"source\":\"iana\",\"extensions\":[\"curl\"]},\"text/vnd.curl.dcurl\":{\"source\":\"apache\",\"extensions\":[\"dcurl\"]},\"text/vnd.curl.mcurl\":{\"source\":\"apache\",\"extensions\":[\"mcurl\"]},\"text/vnd.curl.scurl\":{\"source\":\"apache\",\"extensions\":[\"scurl\"]},\"text/vnd.debian.copyright\":{\"source\":\"iana\",\"charset\":\"UTF-8\"},\"text/vnd.dmclientscript\":{\"source\":\"iana\"},\"text/vnd.dvb.subtitle\":{\"source\":\"iana\",\"extensions\":[\"sub\"]},\"text/vnd.esmertec.theme-descriptor\":{\"source\":\"iana\",\"charset\":\"UTF-8\"},\"text/vnd.familysearch.gedcom\":{\"source\":\"iana\",\"extensions\":[\"ged\"]},\"text/vnd.ficlab.flt\":{\"source\":\"iana\"},\"text/vnd.fly\":{\"source\":\"iana\",\"extensions\":[\"fly\"]},\"text/vnd.fmi.flexstor\":{\"source\":\"iana\",\"extensions\":[\"flx\"]},\"text/vnd.gml\":{\"source\":\"iana\"},\"text/vnd.graphviz\":{\"source\":\"iana\",\"extensions\":[\"gv\"]},\"text/vnd.hans\":{\"source\":\"iana\"},\"text/vnd.hgl\":{\"source\":\"iana\"},\"text/vnd.in3d.3dml\":{\"source\":\"iana\",\"extensions\":[\"3dml\"]},\"text/vnd.in3d.spot\":{\"source\":\"iana\",\"extensions\":[\"spot\"]},\"text/vnd.iptc.newsml\":{\"source\":\"iana\"},\"text/vnd.iptc.nitf\":{\"source\":\"iana\"},\"text/vnd.latex-z\":{\"source\":\"iana\"},\"text/vnd.motorola.reflex\":{\"source\":\"iana\"},\"text/vnd.ms-mediapackage\":{\"source\":\"iana\"},\"text/vnd.net2phone.commcenter.command\":{\"source\":\"iana\"},\"text/vnd.radisys.msml-basic-layout\":{\"source\":\"iana\"},\"text/vnd.senx.warpscript\":{\"source\":\"iana\"},\"text/vnd.si.uricatalogue\":{\"source\":\"iana\"},\"text/vnd.sosi\":{\"source\":\"iana\"},\"text/vnd.sun.j2me.app-descriptor\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"extensions\":[\"jad\"]},\"text/vnd.trolltech.linguist\":{\"source\":\"iana\",\"charset\":\"UTF-8\"},\"text/vnd.wap.si\":{\"source\":\"iana\"},\"text/vnd.wap.sl\":{\"source\":\"iana\"},\"text/vnd.wap.wml\":{\"source\":\"iana\",\"extensions\":[\"wml\"]},\"text/vnd.wap.wmlscript\":{\"source\":\"iana\",\"extensions\":[\"wmls\"]},\"text/vtt\":{\"source\":\"iana\",\"charset\":\"UTF-8\",\"compressible\":true,\"extensions\":[\"vtt\"]},\"text/x-asm\":{\"source\":\"apache\",\"extensions\":[\"s\",\"asm\"]},\"text/x-c\":{\"source\":\"apache\",\"extensions\":[\"c\",\"cc\",\"cxx\",\"cpp\",\"h\",\"hh\",\"dic\"]},\"text/x-component\":{\"source\":\"nginx\",\"extensions\":[\"htc\"]},\"text/x-fortran\":{\"source\":\"apache\",\"extensions\":[\"f\",\"for\",\"f77\",\"f90\"]},\"text/x-gwt-rpc\":{\"compressible\":true},\"text/x-handlebars-template\":{\"extensions\":[\"hbs\"]},\"text/x-java-source\":{\"source\":\"apache\",\"extensions\":[\"java\"]},\"text/x-jquery-tmpl\":{\"compressible\":true},\"text/x-lua\":{\"extensions\":[\"lua\"]},\"text/x-markdown\":{\"compressible\":true,\"extensions\":[\"mkd\"]},\"text/x-nfo\":{\"source\":\"apache\",\"extensions\":[\"nfo\"]},\"text/x-opml\":{\"source\":\"apache\",\"extensions\":[\"opml\"]},\"text/x-org\":{\"compressible\":true,\"extensions\":[\"org\"]},\"text/x-pascal\":{\"source\":\"apache\",\"extensions\":[\"p\",\"pas\"]},\"text/x-processing\":{\"compressible\":true,\"extensions\":[\"pde\"]},\"text/x-sass\":{\"extensions\":[\"sass\"]},\"text/x-scss\":{\"extensions\":[\"scss\"]},\"text/x-setext\":{\"source\":\"apache\",\"extensions\":[\"etx\"]},\"text/x-sfv\":{\"source\":\"apache\",\"extensions\":[\"sfv\"]},\"text/x-suse-ymp\":{\"compressible\":true,\"extensions\":[\"ymp\"]},\"text/x-uuencode\":{\"source\":\"apache\",\"extensions\":[\"uu\"]},\"text/x-vcalendar\":{\"source\":\"apache\",\"extensions\":[\"vcs\"]},\"text/x-vcard\":{\"source\":\"apache\",\"extensions\":[\"vcf\"]},\"text/xml\":{\"source\":\"iana\",\"compressible\":true,\"extensions\":[\"xml\"]},\"text/xml-external-parsed-entity\":{\"source\":\"iana\"},\"text/yaml\":{\"compressible\":true,\"extensions\":[\"yaml\",\"yml\"]},\"video/1d-interleaved-parityfec\":{\"source\":\"iana\"},\"video/3gpp\":{\"source\":\"iana\",\"extensions\":[\"3gp\",\"3gpp\"]},\"video/3gpp-tt\":{\"source\":\"iana\"},\"video/3gpp2\":{\"source\":\"iana\",\"extensions\":[\"3g2\"]},\"video/av1\":{\"source\":\"iana\"},\"video/bmpeg\":{\"source\":\"iana\"},\"video/bt656\":{\"source\":\"iana\"},\"video/celb\":{\"source\":\"iana\"},\"video/dv\":{\"source\":\"iana\"},\"video/encaprtp\":{\"source\":\"iana\"},\"video/ffv1\":{\"source\":\"iana\"},\"video/flexfec\":{\"source\":\"iana\"},\"video/h261\":{\"source\":\"iana\",\"extensions\":[\"h261\"]},\"video/h263\":{\"source\":\"iana\",\"extensions\":[\"h263\"]},\"video/h263-1998\":{\"source\":\"iana\"},\"video/h263-2000\":{\"source\":\"iana\"},\"video/h264\":{\"source\":\"iana\",\"extensions\":[\"h264\"]},\"video/h264-rcdo\":{\"source\":\"iana\"},\"video/h264-svc\":{\"source\":\"iana\"},\"video/h265\":{\"source\":\"iana\"},\"video/iso.segment\":{\"source\":\"iana\",\"extensions\":[\"m4s\"]},\"video/jpeg\":{\"source\":\"iana\",\"extensions\":[\"jpgv\"]},\"video/jpeg2000\":{\"source\":\"iana\"},\"video/jpm\":{\"source\":\"apache\",\"extensions\":[\"jpm\",\"jpgm\"]},\"video/jxsv\":{\"source\":\"iana\"},\"video/mj2\":{\"source\":\"iana\",\"extensions\":[\"mj2\",\"mjp2\"]},\"video/mp1s\":{\"source\":\"iana\"},\"video/mp2p\":{\"source\":\"iana\"},\"video/mp2t\":{\"source\":\"iana\",\"extensions\":[\"ts\"]},\"video/mp4\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"mp4\",\"mp4v\",\"mpg4\"]},\"video/mp4v-es\":{\"source\":\"iana\"},\"video/mpeg\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"mpeg\",\"mpg\",\"mpe\",\"m1v\",\"m2v\"]},\"video/mpeg4-generic\":{\"source\":\"iana\"},\"video/mpv\":{\"source\":\"iana\"},\"video/nv\":{\"source\":\"iana\"},\"video/ogg\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"ogv\"]},\"video/parityfec\":{\"source\":\"iana\"},\"video/pointer\":{\"source\":\"iana\"},\"video/quicktime\":{\"source\":\"iana\",\"compressible\":false,\"extensions\":[\"qt\",\"mov\"]},\"video/raptorfec\":{\"source\":\"iana\"},\"video/raw\":{\"source\":\"iana\"},\"video/rtp-enc-aescm128\":{\"source\":\"iana\"},\"video/rtploopback\":{\"source\":\"iana\"},\"video/rtx\":{\"source\":\"iana\"},\"video/scip\":{\"source\":\"iana\"},\"video/smpte291\":{\"source\":\"iana\"},\"video/smpte292m\":{\"source\":\"iana\"},\"video/ulpfec\":{\"source\":\"iana\"},\"video/vc1\":{\"source\":\"iana\"},\"video/vc2\":{\"source\":\"iana\"},\"video/vnd.cctv\":{\"source\":\"iana\"},\"video/vnd.dece.hd\":{\"source\":\"iana\",\"extensions\":[\"uvh\",\"uvvh\"]},\"video/vnd.dece.mobile\":{\"source\":\"iana\",\"extensions\":[\"uvm\",\"uvvm\"]},\"video/vnd.dece.mp4\":{\"source\":\"iana\"},\"video/vnd.dece.pd\":{\"source\":\"iana\",\"extensions\":[\"uvp\",\"uvvp\"]},\"video/vnd.dece.sd\":{\"source\":\"iana\",\"extensions\":[\"uvs\",\"uvvs\"]},\"video/vnd.dece.video\":{\"source\":\"iana\",\"extensions\":[\"uvv\",\"uvvv\"]},\"video/vnd.directv.mpeg\":{\"source\":\"iana\"},\"video/vnd.directv.mpeg-tts\":{\"source\":\"iana\"},\"video/vnd.dlna.mpeg-tts\":{\"source\":\"iana\"},\"video/vnd.dvb.file\":{\"source\":\"iana\",\"extensions\":[\"dvb\"]},\"video/vnd.fvt\":{\"source\":\"iana\",\"extensions\":[\"fvt\"]},\"video/vnd.hns.video\":{\"source\":\"iana\"},\"video/vnd.iptvforum.1dparityfec-1010\":{\"source\":\"iana\"},\"video/vnd.iptvforum.1dparityfec-2005\":{\"source\":\"iana\"},\"video/vnd.iptvforum.2dparityfec-1010\":{\"source\":\"iana\"},\"video/vnd.iptvforum.2dparityfec-2005\":{\"source\":\"iana\"},\"video/vnd.iptvforum.ttsavc\":{\"source\":\"iana\"},\"video/vnd.iptvforum.ttsmpeg2\":{\"source\":\"iana\"},\"video/vnd.motorola.video\":{\"source\":\"iana\"},\"video/vnd.motorola.videop\":{\"source\":\"iana\"},\"video/vnd.mpegurl\":{\"source\":\"iana\",\"extensions\":[\"mxu\",\"m4u\"]},\"video/vnd.ms-playready.media.pyv\":{\"source\":\"iana\",\"extensions\":[\"pyv\"]},\"video/vnd.nokia.interleaved-multimedia\":{\"source\":\"iana\"},\"video/vnd.nokia.mp4vr\":{\"source\":\"iana\"},\"video/vnd.nokia.videovoip\":{\"source\":\"iana\"},\"video/vnd.objectvideo\":{\"source\":\"iana\"},\"video/vnd.radgamettools.bink\":{\"source\":\"iana\"},\"video/vnd.radgamettools.smacker\":{\"source\":\"iana\"},\"video/vnd.sealed.mpeg1\":{\"source\":\"iana\"},\"video/vnd.sealed.mpeg4\":{\"source\":\"iana\"},\"video/vnd.sealed.swf\":{\"source\":\"iana\"},\"video/vnd.sealedmedia.softseal.mov\":{\"source\":\"iana\"},\"video/vnd.uvvu.mp4\":{\"source\":\"iana\",\"extensions\":[\"uvu\",\"uvvu\"]},\"video/vnd.vivo\":{\"source\":\"iana\",\"extensions\":[\"viv\"]},\"video/vnd.youtube.yt\":{\"source\":\"iana\"},\"video/vp8\":{\"source\":\"iana\"},\"video/vp9\":{\"source\":\"iana\"},\"video/webm\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"webm\"]},\"video/x-f4v\":{\"source\":\"apache\",\"extensions\":[\"f4v\"]},\"video/x-fli\":{\"source\":\"apache\",\"extensions\":[\"fli\"]},\"video/x-flv\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"flv\"]},\"video/x-m4v\":{\"source\":\"apache\",\"extensions\":[\"m4v\"]},\"video/x-matroska\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"mkv\",\"mk3d\",\"mks\"]},\"video/x-mng\":{\"source\":\"apache\",\"extensions\":[\"mng\"]},\"video/x-ms-asf\":{\"source\":\"apache\",\"extensions\":[\"asf\",\"asx\"]},\"video/x-ms-vob\":{\"source\":\"apache\",\"extensions\":[\"vob\"]},\"video/x-ms-wm\":{\"source\":\"apache\",\"extensions\":[\"wm\"]},\"video/x-ms-wmv\":{\"source\":\"apache\",\"compressible\":false,\"extensions\":[\"wmv\"]},\"video/x-ms-wmx\":{\"source\":\"apache\",\"extensions\":[\"wmx\"]},\"video/x-ms-wvx\":{\"source\":\"apache\",\"extensions\":[\"wvx\"]},\"video/x-msvideo\":{\"source\":\"apache\",\"extensions\":[\"avi\"]},\"video/x-sgi-movie\":{\"source\":\"apache\",\"extensions\":[\"movie\"]},\"video/x-smv\":{\"source\":\"apache\",\"extensions\":[\"smv\"]},\"x-conference/x-cooltalk\":{\"source\":\"apache\",\"extensions\":[\"ice\"]},\"x-shader/x-fragment\":{\"compressible\":true},\"x-shader/x-vertex\":{\"compressible\":true}}"));}),
"[project]/node_modules/mime-db/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */ /**
 * Module exports.
 */ module.exports = __turbopack_context__.r("[project]/node_modules/mime-db/db.json (json)");
}),
"[project]/node_modules/mime-types/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */ /**
 * Module dependencies.
 * @private
 */ var db = __turbopack_context__.r("[project]/node_modules/mime-db/index.js [app-route] (ecmascript)");
var extname = __turbopack_context__.r("[externals]/path [external] (path, cjs)").extname;
/**
 * Module variables.
 * @private
 */ var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/;
var TEXT_TYPE_REGEXP = /^text\//i;
/**
 * Module exports.
 * @public
 */ exports.charset = charset;
exports.charsets = {
    lookup: charset
};
exports.contentType = contentType;
exports.extension = extension;
exports.extensions = Object.create(null);
exports.lookup = lookup;
exports.types = Object.create(null);
// Populate the extensions/types maps
populateMaps(exports.extensions, exports.types);
/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */ function charset(type) {
    if (!type || typeof type !== 'string') {
        return false;
    }
    // TODO: use media-typer
    var match = EXTRACT_TYPE_REGEXP.exec(type);
    var mime = match && db[match[1].toLowerCase()];
    if (mime && mime.charset) {
        return mime.charset;
    }
    // default text/* to utf-8
    if (match && TEXT_TYPE_REGEXP.test(match[1])) {
        return 'UTF-8';
    }
    return false;
}
/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {boolean|string}
 */ function contentType(str) {
    // TODO: should this even be in this module?
    if (!str || typeof str !== 'string') {
        return false;
    }
    var mime = str.indexOf('/') === -1 ? exports.lookup(str) : str;
    if (!mime) {
        return false;
    }
    // TODO: use content-type or other module
    if (mime.indexOf('charset') === -1) {
        var charset = exports.charset(mime);
        if (charset) mime += '; charset=' + charset.toLowerCase();
    }
    return mime;
}
/**
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */ function extension(type) {
    if (!type || typeof type !== 'string') {
        return false;
    }
    // TODO: use media-typer
    var match = EXTRACT_TYPE_REGEXP.exec(type);
    // get extensions
    var exts = match && exports.extensions[match[1].toLowerCase()];
    if (!exts || !exts.length) {
        return false;
    }
    return exts[0];
}
/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {boolean|string}
 */ function lookup(path) {
    if (!path || typeof path !== 'string') {
        return false;
    }
    // get the extension ("ext" or ".ext" or full path)
    var extension = extname('x.' + path).toLowerCase().substr(1);
    if (!extension) {
        return false;
    }
    return exports.types[extension] || false;
}
/**
 * Populate the extensions and types maps.
 * @private
 */ function populateMaps(extensions, types) {
    // source preference (least -> most)
    var preference = [
        'nginx',
        'apache',
        undefined,
        'iana'
    ];
    Object.keys(db).forEach(function forEachMimeType(type) {
        var mime = db[type];
        var exts = mime.extensions;
        if (!exts || !exts.length) {
            return;
        }
        // mime -> extensions
        extensions[type] = exts;
        // extension -> mime
        for(var i = 0; i < exts.length; i++){
            var extension = exts[i];
            if (types[extension]) {
                var from = preference.indexOf(db[types[extension]].source);
                var to = preference.indexOf(mime.source);
                if (types[extension] !== 'application/octet-stream' && (from > to || from === to && types[extension].substr(0, 12) === 'application/')) {
                    continue;
                }
            }
            // set the extension -> mime
            types[extension] = type;
        }
    });
}
}),
"[project]/node_modules/asynckit/lib/defer.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = defer;
/**
 * Runs provided function on next iteration of the event loop
 *
 * @param {function} fn - function to run
 */ function defer(fn) {
    var nextTick = typeof setImmediate == 'function' ? setImmediate : typeof process == 'object' && typeof process.nextTick == 'function' ? process.nextTick : null;
    if (nextTick) {
        nextTick(fn);
    } else {
        setTimeout(fn, 0);
    }
}
}),
"[project]/node_modules/asynckit/lib/async.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var defer = __turbopack_context__.r("[project]/node_modules/asynckit/lib/defer.js [app-route] (ecmascript)");
// API
module.exports = async;
/**
 * Runs provided callback asynchronously
 * even if callback itself is not
 *
 * @param   {function} callback - callback to invoke
 * @returns {function} - augmented callback
 */ function async(callback) {
    var isAsync = false;
    // check if async happened
    defer(function() {
        isAsync = true;
    });
    return function async_callback(err, result) {
        if (isAsync) {
            callback(err, result);
        } else {
            defer(function nextTick_callback() {
                callback(err, result);
            });
        }
    };
}
}),
"[project]/node_modules/asynckit/lib/abort.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// API
module.exports = abort;
/**
 * Aborts leftover active jobs
 *
 * @param {object} state - current state object
 */ function abort(state) {
    Object.keys(state.jobs).forEach(clean.bind(state));
    // reset leftover jobs
    state.jobs = {};
}
/**
 * Cleans up leftover job by invoking abort function for the provided job id
 *
 * @this  state
 * @param {string|number} key - job id to abort
 */ function clean(key) {
    if (typeof this.jobs[key] == 'function') {
        this.jobs[key]();
    }
}
}),
"[project]/node_modules/asynckit/lib/iterate.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var async = __turbopack_context__.r("[project]/node_modules/asynckit/lib/async.js [app-route] (ecmascript)"), abort = __turbopack_context__.r("[project]/node_modules/asynckit/lib/abort.js [app-route] (ecmascript)");
// API
module.exports = iterate;
/**
 * Iterates over each job object
 *
 * @param {array|object} list - array or object (named list) to iterate over
 * @param {function} iterator - iterator to run
 * @param {object} state - current job status
 * @param {function} callback - invoked when all elements processed
 */ function iterate(list, iterator, state, callback) {
    // store current index
    var key = state['keyedList'] ? state['keyedList'][state.index] : state.index;
    state.jobs[key] = runJob(iterator, key, list[key], function(error, output) {
        // don't repeat yourself
        // skip secondary callbacks
        if (!(key in state.jobs)) {
            return;
        }
        // clean up jobs
        delete state.jobs[key];
        if (error) {
            // don't process rest of the results
            // stop still active jobs
            // and reset the list
            abort(state);
        } else {
            state.results[key] = output;
        }
        // return salvaged results
        callback(error, state.results);
    });
}
/**
 * Runs iterator over provided job element
 *
 * @param   {function} iterator - iterator to invoke
 * @param   {string|number} key - key/index of the element in the list of jobs
 * @param   {mixed} item - job description
 * @param   {function} callback - invoked after iterator is done with the job
 * @returns {function|mixed} - job abort function or something else
 */ function runJob(iterator, key, item, callback) {
    var aborter;
    // allow shortcut if iterator expects only two arguments
    if (iterator.length == 2) {
        aborter = iterator(item, async(callback));
    } else {
        aborter = iterator(item, key, async(callback));
    }
    return aborter;
}
}),
"[project]/node_modules/asynckit/lib/state.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// API
module.exports = state;
/**
 * Creates initial state object
 * for iteration over list
 *
 * @param   {array|object} list - list to iterate over
 * @param   {function|null} sortMethod - function to use for keys sort,
 *                                     or `null` to keep them as is
 * @returns {object} - initial state object
 */ function state(list, sortMethod) {
    var isNamedList = !Array.isArray(list), initState = {
        index: 0,
        keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
        jobs: {},
        results: isNamedList ? {} : [],
        size: isNamedList ? Object.keys(list).length : list.length
    };
    if (sortMethod) {
        // sort array keys based on it's values
        // sort object's keys just on own merit
        initState.keyedList.sort(isNamedList ? sortMethod : function(a, b) {
            return sortMethod(list[a], list[b]);
        });
    }
    return initState;
}
}),
"[project]/node_modules/asynckit/lib/terminator.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var abort = __turbopack_context__.r("[project]/node_modules/asynckit/lib/abort.js [app-route] (ecmascript)"), async = __turbopack_context__.r("[project]/node_modules/asynckit/lib/async.js [app-route] (ecmascript)");
// API
module.exports = terminator;
/**
 * Terminates jobs in the attached state context
 *
 * @this  AsyncKitState#
 * @param {function} callback - final callback to invoke after termination
 */ function terminator(callback) {
    if (!Object.keys(this.jobs).length) {
        return;
    }
    // fast forward iteration index
    this.index = this.size;
    // abort jobs
    abort(this);
    // send back results we have so far
    async(callback)(null, this.results);
}
}),
"[project]/node_modules/asynckit/parallel.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var iterate = __turbopack_context__.r("[project]/node_modules/asynckit/lib/iterate.js [app-route] (ecmascript)"), initState = __turbopack_context__.r("[project]/node_modules/asynckit/lib/state.js [app-route] (ecmascript)"), terminator = __turbopack_context__.r("[project]/node_modules/asynckit/lib/terminator.js [app-route] (ecmascript)");
// Public API
module.exports = parallel;
/**
 * Runs iterator over provided array elements in parallel
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */ function parallel(list, iterator, callback) {
    var state = initState(list);
    while(state.index < (state['keyedList'] || list).length){
        iterate(list, iterator, state, function(error, result) {
            if (error) {
                callback(error, result);
                return;
            }
            // looks like it's the last one
            if (Object.keys(state.jobs).length === 0) {
                callback(null, state.results);
                return;
            }
        });
        state.index++;
    }
    return terminator.bind(state, callback);
}
}),
"[project]/node_modules/asynckit/serialOrdered.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var iterate = __turbopack_context__.r("[project]/node_modules/asynckit/lib/iterate.js [app-route] (ecmascript)"), initState = __turbopack_context__.r("[project]/node_modules/asynckit/lib/state.js [app-route] (ecmascript)"), terminator = __turbopack_context__.r("[project]/node_modules/asynckit/lib/terminator.js [app-route] (ecmascript)");
// Public API
module.exports = serialOrdered;
// sorting helpers
module.exports.ascending = ascending;
module.exports.descending = descending;
/**
 * Runs iterator over provided sorted array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} sortMethod - custom sort function
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */ function serialOrdered(list, iterator, sortMethod, callback) {
    var state = initState(list, sortMethod);
    iterate(list, iterator, state, function iteratorHandler(error, result) {
        if (error) {
            callback(error, result);
            return;
        }
        state.index++;
        // are we there yet?
        if (state.index < (state['keyedList'] || list).length) {
            iterate(list, iterator, state, iteratorHandler);
            return;
        }
        // done here
        callback(null, state.results);
    });
    return terminator.bind(state, callback);
}
/*
 * -- Sort methods
 */ /**
 * sort helper to sort array elements in ascending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */ function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}
/**
 * sort helper to sort array elements in descending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */ function descending(a, b) {
    return -1 * ascending(a, b);
}
}),
"[project]/node_modules/asynckit/serial.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var serialOrdered = __turbopack_context__.r("[project]/node_modules/asynckit/serialOrdered.js [app-route] (ecmascript)");
// Public API
module.exports = serial;
/**
 * Runs iterator over provided array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */ function serial(list, iterator, callback) {
    return serialOrdered(list, iterator, null, callback);
}
}),
"[project]/node_modules/asynckit/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    parallel: __turbopack_context__.r("[project]/node_modules/asynckit/parallel.js [app-route] (ecmascript)"),
    serial: __turbopack_context__.r("[project]/node_modules/asynckit/serial.js [app-route] (ecmascript)"),
    serialOrdered: __turbopack_context__.r("[project]/node_modules/asynckit/serialOrdered.js [app-route] (ecmascript)")
};
}),
"[project]/node_modules/es-object-atoms/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('.')} */ module.exports = Object;
}),
"[project]/node_modules/es-errors/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('.')} */ module.exports = Error;
}),
"[project]/node_modules/es-errors/eval.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./eval')} */ module.exports = EvalError;
}),
"[project]/node_modules/es-errors/range.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./range')} */ module.exports = RangeError;
}),
"[project]/node_modules/es-errors/ref.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./ref')} */ module.exports = ReferenceError;
}),
"[project]/node_modules/es-errors/syntax.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./syntax')} */ module.exports = SyntaxError;
}),
"[project]/node_modules/es-errors/type.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./type')} */ module.exports = TypeError;
}),
"[project]/node_modules/es-errors/uri.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./uri')} */ module.exports = URIError;
}),
"[project]/node_modules/math-intrinsics/abs.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./abs')} */ module.exports = Math.abs;
}),
"[project]/node_modules/math-intrinsics/floor.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./floor')} */ module.exports = Math.floor;
}),
"[project]/node_modules/math-intrinsics/max.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./max')} */ module.exports = Math.max;
}),
"[project]/node_modules/math-intrinsics/min.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./min')} */ module.exports = Math.min;
}),
"[project]/node_modules/math-intrinsics/pow.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./pow')} */ module.exports = Math.pow;
}),
"[project]/node_modules/math-intrinsics/round.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./round')} */ module.exports = Math.round;
}),
"[project]/node_modules/math-intrinsics/isNaN.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./isNaN')} */ module.exports = Number.isNaN || function isNaN(a) {
    return a !== a;
};
}),
"[project]/node_modules/math-intrinsics/sign.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $isNaN = __turbopack_context__.r("[project]/node_modules/math-intrinsics/isNaN.js [app-route] (ecmascript)");
/** @type {import('./sign')} */ module.exports = function sign(number) {
    if ($isNaN(number) || number === 0) {
        return number;
    }
    return number < 0 ? -1 : +1;
};
}),
"[project]/node_modules/gopd/gOPD.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./gOPD')} */ module.exports = Object.getOwnPropertyDescriptor;
}),
"[project]/node_modules/gopd/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('.')} */ var $gOPD = __turbopack_context__.r("[project]/node_modules/gopd/gOPD.js [app-route] (ecmascript)");
if ($gOPD) {
    try {
        $gOPD([], 'length');
    } catch (e) {
        // IE 8 has a broken gOPD
        $gOPD = null;
    }
}
module.exports = $gOPD;
}),
"[project]/node_modules/es-define-property/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('.')} */ var $defineProperty = Object.defineProperty || false;
if ($defineProperty) {
    try {
        $defineProperty({}, 'a', {
            value: 1
        });
    } catch (e) {
        // IE 8 has a broken defineProperty
        $defineProperty = false;
    }
}
module.exports = $defineProperty;
}),
"[project]/node_modules/has-symbols/shams.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./shams')} */ /* eslint complexity: [2, 18], max-statements: [2, 33] */ module.exports = function hasSymbols() {
    if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') {
        return false;
    }
    if (typeof Symbol.iterator === 'symbol') {
        return true;
    }
    /** @type {{ [k in symbol]?: unknown }} */ var obj = {};
    var sym = Symbol('test');
    var symObj = Object(sym);
    if (typeof sym === 'string') {
        return false;
    }
    if (Object.prototype.toString.call(sym) !== '[object Symbol]') {
        return false;
    }
    if (Object.prototype.toString.call(symObj) !== '[object Symbol]') {
        return false;
    }
    // temp disabled per https://github.com/ljharb/object.assign/issues/17
    // if (sym instanceof Symbol) { return false; }
    // temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
    // if (!(symObj instanceof Symbol)) { return false; }
    // if (typeof Symbol.prototype.toString !== 'function') { return false; }
    // if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }
    var symVal = 42;
    obj[sym] = symVal;
    for(var _ in obj){
        return false;
    } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
    if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) {
        return false;
    }
    if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
    }
    var syms = Object.getOwnPropertySymbols(obj);
    if (syms.length !== 1 || syms[0] !== sym) {
        return false;
    }
    if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
    }
    if (typeof Object.getOwnPropertyDescriptor === 'function') {
        // eslint-disable-next-line no-extra-parens
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
        }
    }
    return true;
};
}),
"[project]/node_modules/has-symbols/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var origSymbol = typeof Symbol !== 'undefined' && Symbol;
var hasSymbolSham = __turbopack_context__.r("[project]/node_modules/has-symbols/shams.js [app-route] (ecmascript)");
/** @type {import('.')} */ module.exports = function hasNativeSymbols() {
    if (typeof origSymbol !== 'function') {
        return false;
    }
    if (typeof Symbol !== 'function') {
        return false;
    }
    if (typeof origSymbol('foo') !== 'symbol') {
        return false;
    }
    if (typeof Symbol('bar') !== 'symbol') {
        return false;
    }
    return hasSymbolSham();
};
}),
"[project]/node_modules/get-proto/Reflect.getPrototypeOf.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./Reflect.getPrototypeOf')} */ module.exports = typeof Reflect !== 'undefined' && Reflect.getPrototypeOf || null;
}),
"[project]/node_modules/get-proto/Object.getPrototypeOf.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var $Object = __turbopack_context__.r("[project]/node_modules/es-object-atoms/index.js [app-route] (ecmascript)");
/** @type {import('./Object.getPrototypeOf')} */ module.exports = $Object.getPrototypeOf || null;
}),
"[project]/node_modules/function-bind/implementation.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint no-invalid-this: 1 */ var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var toStr = Object.prototype.toString;
var max = Math.max;
var funcType = '[object Function]';
var concatty = function concatty(a, b) {
    var arr = [];
    for(var i = 0; i < a.length; i += 1){
        arr[i] = a[i];
    }
    for(var j = 0; j < b.length; j += 1){
        arr[j + a.length] = b[j];
    }
    return arr;
};
var slicy = function slicy(arrLike, offset) {
    var arr = [];
    for(var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1){
        arr[j] = arrLike[i];
    }
    return arr;
};
var joiny = function(arr, joiner) {
    var str = '';
    for(var i = 0; i < arr.length; i += 1){
        str += arr[i];
        if (i + 1 < arr.length) {
            str += joiner;
        }
    }
    return str;
};
module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slicy(arguments, 1);
    var bound;
    var binder = function() {
        if (this instanceof bound) {
            var result = target.apply(this, concatty(args, arguments));
            if (Object(result) === result) {
                return result;
            }
            return this;
        }
        return target.apply(that, concatty(args, arguments));
    };
    var boundLength = max(0, target.length - args.length);
    var boundArgs = [];
    for(var i = 0; i < boundLength; i++){
        boundArgs[i] = '$' + i;
    }
    bound = Function('binder', 'return function (' + joiny(boundArgs, ',') + '){ return binder.apply(this,arguments); }')(binder);
    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }
    return bound;
};
}),
"[project]/node_modules/function-bind/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var implementation = __turbopack_context__.r("[project]/node_modules/function-bind/implementation.js [app-route] (ecmascript)");
module.exports = Function.prototype.bind || implementation;
}),
"[project]/node_modules/call-bind-apply-helpers/functionCall.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./functionCall')} */ module.exports = Function.prototype.call;
}),
"[project]/node_modules/call-bind-apply-helpers/functionApply.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./functionApply')} */ module.exports = Function.prototype.apply;
}),
"[project]/node_modules/call-bind-apply-helpers/reflectApply.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/** @type {import('./reflectApply')} */ module.exports = typeof Reflect !== 'undefined' && Reflect && Reflect.apply;
}),
"[project]/node_modules/call-bind-apply-helpers/actualApply.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-route] (ecmascript)");
var $apply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionApply.js [app-route] (ecmascript)");
var $call = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionCall.js [app-route] (ecmascript)");
var $reflectApply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/reflectApply.js [app-route] (ecmascript)");
/** @type {import('./actualApply')} */ module.exports = $reflectApply || bind.call($call, $apply);
}),
"[project]/node_modules/call-bind-apply-helpers/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-route] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/node_modules/es-errors/type.js [app-route] (ecmascript)");
var $call = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionCall.js [app-route] (ecmascript)");
var $actualApply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/actualApply.js [app-route] (ecmascript)");
/** @type {(args: [Function, thisArg?: unknown, ...args: unknown[]]) => Function} TODO FIXME, find a way to use import('.') */ module.exports = function callBindBasic(args) {
    if (args.length < 1 || typeof args[0] !== 'function') {
        throw new $TypeError('a function is required');
    }
    return $actualApply(bind, $call, args);
};
}),
"[project]/node_modules/dunder-proto/get.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var callBind = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/index.js [app-route] (ecmascript)");
var gOPD = __turbopack_context__.r("[project]/node_modules/gopd/index.js [app-route] (ecmascript)");
var hasProtoAccessor;
try {
    // eslint-disable-next-line no-extra-parens, no-proto
    hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */ [].__proto__ === Array.prototype;
} catch (e) {
    if (!e || typeof e !== 'object' || !('code' in e) || e.code !== 'ERR_PROTO_ACCESS') {
        throw e;
    }
}
// eslint-disable-next-line no-extra-parens
var desc = !!hasProtoAccessor && gOPD && gOPD(Object.prototype, '__proto__');
var $Object = Object;
var $getPrototypeOf = $Object.getPrototypeOf;
/** @type {import('./get')} */ module.exports = desc && typeof desc.get === 'function' ? callBind([
    desc.get
]) : typeof $getPrototypeOf === 'function' ? /** @type {import('./get')} */ function getDunder(value) {
    // eslint-disable-next-line eqeqeq
    return $getPrototypeOf(value == null ? value : $Object(value));
} : false;
}),
"[project]/node_modules/get-proto/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var reflectGetProto = __turbopack_context__.r("[project]/node_modules/get-proto/Reflect.getPrototypeOf.js [app-route] (ecmascript)");
var originalGetProto = __turbopack_context__.r("[project]/node_modules/get-proto/Object.getPrototypeOf.js [app-route] (ecmascript)");
var getDunderProto = __turbopack_context__.r("[project]/node_modules/dunder-proto/get.js [app-route] (ecmascript)");
/** @type {import('.')} */ module.exports = reflectGetProto ? function getProto(O) {
    // @ts-expect-error TS can't narrow inside a closure, for some reason
    return reflectGetProto(O);
} : originalGetProto ? function getProto(O) {
    if (!O || typeof O !== 'object' && typeof O !== 'function') {
        throw new TypeError('getProto: not an object');
    }
    // @ts-expect-error TS can't narrow inside a closure, for some reason
    return originalGetProto(O);
} : getDunderProto ? function getProto(O) {
    // @ts-expect-error TS can't narrow inside a closure, for some reason
    return getDunderProto(O);
} : null;
}),
"[project]/node_modules/hasown/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var call = Function.prototype.call;
var $hasOwn = Object.prototype.hasOwnProperty;
var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-route] (ecmascript)");
/** @type {import('.')} */ module.exports = bind.call(call, $hasOwn);
}),
"[project]/node_modules/get-intrinsic/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var undefined1;
var $Object = __turbopack_context__.r("[project]/node_modules/es-object-atoms/index.js [app-route] (ecmascript)");
var $Error = __turbopack_context__.r("[project]/node_modules/es-errors/index.js [app-route] (ecmascript)");
var $EvalError = __turbopack_context__.r("[project]/node_modules/es-errors/eval.js [app-route] (ecmascript)");
var $RangeError = __turbopack_context__.r("[project]/node_modules/es-errors/range.js [app-route] (ecmascript)");
var $ReferenceError = __turbopack_context__.r("[project]/node_modules/es-errors/ref.js [app-route] (ecmascript)");
var $SyntaxError = __turbopack_context__.r("[project]/node_modules/es-errors/syntax.js [app-route] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/node_modules/es-errors/type.js [app-route] (ecmascript)");
var $URIError = __turbopack_context__.r("[project]/node_modules/es-errors/uri.js [app-route] (ecmascript)");
var abs = __turbopack_context__.r("[project]/node_modules/math-intrinsics/abs.js [app-route] (ecmascript)");
var floor = __turbopack_context__.r("[project]/node_modules/math-intrinsics/floor.js [app-route] (ecmascript)");
var max = __turbopack_context__.r("[project]/node_modules/math-intrinsics/max.js [app-route] (ecmascript)");
var min = __turbopack_context__.r("[project]/node_modules/math-intrinsics/min.js [app-route] (ecmascript)");
var pow = __turbopack_context__.r("[project]/node_modules/math-intrinsics/pow.js [app-route] (ecmascript)");
var round = __turbopack_context__.r("[project]/node_modules/math-intrinsics/round.js [app-route] (ecmascript)");
var sign = __turbopack_context__.r("[project]/node_modules/math-intrinsics/sign.js [app-route] (ecmascript)");
var $Function = Function;
// eslint-disable-next-line consistent-return
var getEvalledConstructor = function(expressionSyntax) {
    try {
        return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
    } catch (e) {}
};
var $gOPD = __turbopack_context__.r("[project]/node_modules/gopd/index.js [app-route] (ecmascript)");
var $defineProperty = __turbopack_context__.r("[project]/node_modules/es-define-property/index.js [app-route] (ecmascript)");
var throwTypeError = function() {
    throw new $TypeError();
};
var ThrowTypeError = $gOPD ? function() {
    try {
        // eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
        arguments.callee; // IE 8 does not throw here
        return throwTypeError;
    } catch (calleeThrows) {
        try {
            // IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
            return $gOPD(arguments, 'callee').get;
        } catch (gOPDthrows) {
            return throwTypeError;
        }
    }
}() : throwTypeError;
var hasSymbols = __turbopack_context__.r("[project]/node_modules/has-symbols/index.js [app-route] (ecmascript)")();
var getProto = __turbopack_context__.r("[project]/node_modules/get-proto/index.js [app-route] (ecmascript)");
var $ObjectGPO = __turbopack_context__.r("[project]/node_modules/get-proto/Object.getPrototypeOf.js [app-route] (ecmascript)");
var $ReflectGPO = __turbopack_context__.r("[project]/node_modules/get-proto/Reflect.getPrototypeOf.js [app-route] (ecmascript)");
var $apply = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionApply.js [app-route] (ecmascript)");
var $call = __turbopack_context__.r("[project]/node_modules/call-bind-apply-helpers/functionCall.js [app-route] (ecmascript)");
var needsEval = {};
var TypedArray = typeof Uint8Array === 'undefined' || !getProto ? undefined : getProto(Uint8Array);
var INTRINSICS = {
    __proto__: null,
    '%AggregateError%': typeof AggregateError === 'undefined' ? undefined : AggregateError,
    '%Array%': Array,
    '%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
    '%ArrayIteratorPrototype%': hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined,
    '%AsyncFromSyncIteratorPrototype%': undefined,
    '%AsyncFunction%': needsEval,
    '%AsyncGenerator%': needsEval,
    '%AsyncGeneratorFunction%': needsEval,
    '%AsyncIteratorPrototype%': needsEval,
    '%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
    '%BigInt%': typeof BigInt === 'undefined' ? undefined : BigInt,
    '%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined : BigInt64Array,
    '%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined : BigUint64Array,
    '%Boolean%': Boolean,
    '%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
    '%Date%': Date,
    '%decodeURI%': decodeURI,
    '%decodeURIComponent%': decodeURIComponent,
    '%encodeURI%': encodeURI,
    '%encodeURIComponent%': encodeURIComponent,
    '%Error%': $Error,
    '%eval%': eval,
    '%EvalError%': $EvalError,
    '%Float16Array%': typeof Float16Array === 'undefined' ? undefined : Float16Array,
    '%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
    '%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
    '%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined : FinalizationRegistry,
    '%Function%': $Function,
    '%GeneratorFunction%': needsEval,
    '%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
    '%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
    '%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
    '%isFinite%': isFinite,
    '%isNaN%': isNaN,
    '%IteratorPrototype%': hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined,
    '%JSON%': typeof JSON === 'object' ? JSON : undefined,
    '%Map%': typeof Map === 'undefined' ? undefined : Map,
    '%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Map()[Symbol.iterator]()),
    '%Math%': Math,
    '%Number%': Number,
    '%Object%': $Object,
    '%Object.getOwnPropertyDescriptor%': $gOPD,
    '%parseFloat%': parseFloat,
    '%parseInt%': parseInt,
    '%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
    '%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
    '%RangeError%': $RangeError,
    '%ReferenceError%': $ReferenceError,
    '%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
    '%RegExp%': RegExp,
    '%Set%': typeof Set === 'undefined' ? undefined : Set,
    '%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols || !getProto ? undefined : getProto(new Set()[Symbol.iterator]()),
    '%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
    '%String%': String,
    '%StringIteratorPrototype%': hasSymbols && getProto ? getProto(''[Symbol.iterator]()) : undefined,
    '%Symbol%': hasSymbols ? Symbol : undefined,
    '%SyntaxError%': $SyntaxError,
    '%ThrowTypeError%': ThrowTypeError,
    '%TypedArray%': TypedArray,
    '%TypeError%': $TypeError,
    '%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
    '%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
    '%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
    '%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
    '%URIError%': $URIError,
    '%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
    '%WeakRef%': typeof WeakRef === 'undefined' ? undefined : WeakRef,
    '%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
    '%Function.prototype.call%': $call,
    '%Function.prototype.apply%': $apply,
    '%Object.defineProperty%': $defineProperty,
    '%Object.getPrototypeOf%': $ObjectGPO,
    '%Math.abs%': abs,
    '%Math.floor%': floor,
    '%Math.max%': max,
    '%Math.min%': min,
    '%Math.pow%': pow,
    '%Math.round%': round,
    '%Math.sign%': sign,
    '%Reflect.getPrototypeOf%': $ReflectGPO
};
if (getProto) {
    try {
        null.error; // eslint-disable-line no-unused-expressions
    } catch (e) {
        // https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
        var errorProto = getProto(getProto(e));
        INTRINSICS['%Error.prototype%'] = errorProto;
    }
}
var doEval = function doEval(name) {
    var value;
    if (name === '%AsyncFunction%') {
        value = getEvalledConstructor('async function () {}');
    } else if (name === '%GeneratorFunction%') {
        value = getEvalledConstructor('function* () {}');
    } else if (name === '%AsyncGeneratorFunction%') {
        value = getEvalledConstructor('async function* () {}');
    } else if (name === '%AsyncGenerator%') {
        var fn = doEval('%AsyncGeneratorFunction%');
        if (fn) {
            value = fn.prototype;
        }
    } else if (name === '%AsyncIteratorPrototype%') {
        var gen = doEval('%AsyncGenerator%');
        if (gen && getProto) {
            value = getProto(gen.prototype);
        }
    }
    INTRINSICS[name] = value;
    return value;
};
var LEGACY_ALIASES = {
    __proto__: null,
    '%ArrayBufferPrototype%': [
        'ArrayBuffer',
        'prototype'
    ],
    '%ArrayPrototype%': [
        'Array',
        'prototype'
    ],
    '%ArrayProto_entries%': [
        'Array',
        'prototype',
        'entries'
    ],
    '%ArrayProto_forEach%': [
        'Array',
        'prototype',
        'forEach'
    ],
    '%ArrayProto_keys%': [
        'Array',
        'prototype',
        'keys'
    ],
    '%ArrayProto_values%': [
        'Array',
        'prototype',
        'values'
    ],
    '%AsyncFunctionPrototype%': [
        'AsyncFunction',
        'prototype'
    ],
    '%AsyncGenerator%': [
        'AsyncGeneratorFunction',
        'prototype'
    ],
    '%AsyncGeneratorPrototype%': [
        'AsyncGeneratorFunction',
        'prototype',
        'prototype'
    ],
    '%BooleanPrototype%': [
        'Boolean',
        'prototype'
    ],
    '%DataViewPrototype%': [
        'DataView',
        'prototype'
    ],
    '%DatePrototype%': [
        'Date',
        'prototype'
    ],
    '%ErrorPrototype%': [
        'Error',
        'prototype'
    ],
    '%EvalErrorPrototype%': [
        'EvalError',
        'prototype'
    ],
    '%Float32ArrayPrototype%': [
        'Float32Array',
        'prototype'
    ],
    '%Float64ArrayPrototype%': [
        'Float64Array',
        'prototype'
    ],
    '%FunctionPrototype%': [
        'Function',
        'prototype'
    ],
    '%Generator%': [
        'GeneratorFunction',
        'prototype'
    ],
    '%GeneratorPrototype%': [
        'GeneratorFunction',
        'prototype',
        'prototype'
    ],
    '%Int8ArrayPrototype%': [
        'Int8Array',
        'prototype'
    ],
    '%Int16ArrayPrototype%': [
        'Int16Array',
        'prototype'
    ],
    '%Int32ArrayPrototype%': [
        'Int32Array',
        'prototype'
    ],
    '%JSONParse%': [
        'JSON',
        'parse'
    ],
    '%JSONStringify%': [
        'JSON',
        'stringify'
    ],
    '%MapPrototype%': [
        'Map',
        'prototype'
    ],
    '%NumberPrototype%': [
        'Number',
        'prototype'
    ],
    '%ObjectPrototype%': [
        'Object',
        'prototype'
    ],
    '%ObjProto_toString%': [
        'Object',
        'prototype',
        'toString'
    ],
    '%ObjProto_valueOf%': [
        'Object',
        'prototype',
        'valueOf'
    ],
    '%PromisePrototype%': [
        'Promise',
        'prototype'
    ],
    '%PromiseProto_then%': [
        'Promise',
        'prototype',
        'then'
    ],
    '%Promise_all%': [
        'Promise',
        'all'
    ],
    '%Promise_reject%': [
        'Promise',
        'reject'
    ],
    '%Promise_resolve%': [
        'Promise',
        'resolve'
    ],
    '%RangeErrorPrototype%': [
        'RangeError',
        'prototype'
    ],
    '%ReferenceErrorPrototype%': [
        'ReferenceError',
        'prototype'
    ],
    '%RegExpPrototype%': [
        'RegExp',
        'prototype'
    ],
    '%SetPrototype%': [
        'Set',
        'prototype'
    ],
    '%SharedArrayBufferPrototype%': [
        'SharedArrayBuffer',
        'prototype'
    ],
    '%StringPrototype%': [
        'String',
        'prototype'
    ],
    '%SymbolPrototype%': [
        'Symbol',
        'prototype'
    ],
    '%SyntaxErrorPrototype%': [
        'SyntaxError',
        'prototype'
    ],
    '%TypedArrayPrototype%': [
        'TypedArray',
        'prototype'
    ],
    '%TypeErrorPrototype%': [
        'TypeError',
        'prototype'
    ],
    '%Uint8ArrayPrototype%': [
        'Uint8Array',
        'prototype'
    ],
    '%Uint8ClampedArrayPrototype%': [
        'Uint8ClampedArray',
        'prototype'
    ],
    '%Uint16ArrayPrototype%': [
        'Uint16Array',
        'prototype'
    ],
    '%Uint32ArrayPrototype%': [
        'Uint32Array',
        'prototype'
    ],
    '%URIErrorPrototype%': [
        'URIError',
        'prototype'
    ],
    '%WeakMapPrototype%': [
        'WeakMap',
        'prototype'
    ],
    '%WeakSetPrototype%': [
        'WeakSet',
        'prototype'
    ]
};
var bind = __turbopack_context__.r("[project]/node_modules/function-bind/index.js [app-route] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/node_modules/hasown/index.js [app-route] (ecmascript)");
var $concat = bind.call($call, Array.prototype.concat);
var $spliceApply = bind.call($apply, Array.prototype.splice);
var $replace = bind.call($call, String.prototype.replace);
var $strSlice = bind.call($call, String.prototype.slice);
var $exec = bind.call($call, RegExp.prototype.exec);
/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */ var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */ 
var stringToPath = function stringToPath(string) {
    var first = $strSlice(string, 0, 1);
    var last = $strSlice(string, -1);
    if (first === '%' && last !== '%') {
        throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
    } else if (last === '%' && first !== '%') {
        throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
    }
    var result = [];
    $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
    });
    return result;
};
/* end adaptation */ var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
    var intrinsicName = name;
    var alias;
    if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = '%' + alias[0] + '%';
    }
    if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
            value = doEval(intrinsicName);
        }
        if (typeof value === 'undefined' && !allowMissing) {
            throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
        }
        return {
            alias: alias,
            name: intrinsicName,
            value: value
        };
    }
    throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
};
module.exports = function GetIntrinsic(name, allowMissing) {
    if (typeof name !== 'string' || name.length === 0) {
        throw new $TypeError('intrinsic name must be a non-empty string');
    }
    if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
        throw new $TypeError('"allowMissing" argument must be a boolean');
    }
    if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
    }
    var parts = stringToPath(name);
    var intrinsicBaseName = parts.length > 0 ? parts[0] : '';
    var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
    var intrinsicRealName = intrinsic.name;
    var value = intrinsic.value;
    var skipFurtherCaching = false;
    var alias = intrinsic.alias;
    if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([
            0,
            1
        ], alias));
    }
    for(var i = 1, isOwn = true; i < parts.length; i += 1){
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === '`' || last === '"' || last === "'" || last === '`') && first !== last) {
            throw new $SyntaxError('property names with quotes must have matching quotes');
        }
        if (part === 'constructor' || !isOwn) {
            skipFurtherCaching = true;
        }
        intrinsicBaseName += '.' + part;
        intrinsicRealName = '%' + intrinsicBaseName + '%';
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
            if (!(part in value)) {
                if (!allowMissing) {
                    throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
                }
                return void undefined;
            }
            if ($gOPD && i + 1 >= parts.length) {
                var desc = $gOPD(value, part);
                isOwn = !!desc;
                // By convention, when a data property is converted to an accessor
                // property to emulate a data property that does not suffer from
                // the override mistake, that accessor's getter is marked with
                // an `originalValue` property. Here, when we detect this, we
                // uphold the illusion by pretending to see that original data
                // property, i.e., returning the value rather than the getter
                // itself.
                if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
                    value = desc.get;
                } else {
                    value = value[part];
                }
            } else {
                isOwn = hasOwn(value, part);
                value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
                INTRINSICS[intrinsicRealName] = value;
            }
        }
    }
    return value;
};
}),
"[project]/node_modules/has-tostringtag/shams.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var hasSymbols = __turbopack_context__.r("[project]/node_modules/has-symbols/shams.js [app-route] (ecmascript)");
/** @type {import('.')} */ module.exports = function hasToStringTagShams() {
    return hasSymbols() && !!Symbol.toStringTag;
};
}),
"[project]/node_modules/es-set-tostringtag/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var GetIntrinsic = __turbopack_context__.r("[project]/node_modules/get-intrinsic/index.js [app-route] (ecmascript)");
var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
var hasToStringTag = __turbopack_context__.r("[project]/node_modules/has-tostringtag/shams.js [app-route] (ecmascript)")();
var hasOwn = __turbopack_context__.r("[project]/node_modules/hasown/index.js [app-route] (ecmascript)");
var $TypeError = __turbopack_context__.r("[project]/node_modules/es-errors/type.js [app-route] (ecmascript)");
var toStringTag = hasToStringTag ? Symbol.toStringTag : null;
/** @type {import('.')} */ module.exports = function setToStringTag(object, value) {
    var overrideIfSet = arguments.length > 2 && !!arguments[2] && arguments[2].force;
    var nonConfigurable = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
    if (typeof overrideIfSet !== 'undefined' && typeof overrideIfSet !== 'boolean' || typeof nonConfigurable !== 'undefined' && typeof nonConfigurable !== 'boolean') {
        throw new $TypeError('if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans');
    }
    if (toStringTag && (overrideIfSet || !hasOwn(object, toStringTag))) {
        if ($defineProperty) {
            $defineProperty(object, toStringTag, {
                configurable: !nonConfigurable,
                enumerable: false,
                value: value,
                writable: false
            });
        } else {
            object[toStringTag] = value; // eslint-disable-line no-param-reassign
        }
    }
};
}),
"[project]/node_modules/form-data/lib/populate.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// populates missing values
module.exports = function(dst, src) {
    Object.keys(src).forEach(function(prop) {
        dst[prop] = dst[prop] || src[prop]; // eslint-disable-line no-param-reassign
    });
    return dst;
};
}),
"[project]/node_modules/form-data/lib/form_data.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var CombinedStream = __turbopack_context__.r("[project]/node_modules/combined-stream/lib/combined_stream.js [app-route] (ecmascript)");
var util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
var path = __turbopack_context__.r("[externals]/path [external] (path, cjs)");
var http = __turbopack_context__.r("[externals]/http [external] (http, cjs)");
var https = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
var parseUrl = __turbopack_context__.r("[externals]/url [external] (url, cjs)").parse;
var fs = __turbopack_context__.r("[externals]/fs [external] (fs, cjs)");
var Stream = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Stream;
var crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
var mime = __turbopack_context__.r("[project]/node_modules/mime-types/index.js [app-route] (ecmascript)");
var asynckit = __turbopack_context__.r("[project]/node_modules/asynckit/index.js [app-route] (ecmascript)");
var setToStringTag = __turbopack_context__.r("[project]/node_modules/es-set-tostringtag/index.js [app-route] (ecmascript)");
var hasOwn = __turbopack_context__.r("[project]/node_modules/hasown/index.js [app-route] (ecmascript)");
var populate = __turbopack_context__.r("[project]/node_modules/form-data/lib/populate.js [app-route] (ecmascript)");
/**
 * Create readable "multipart/form-data" streams.
 * Can be used to submit forms
 * and file uploads to other web applications.
 *
 * @constructor
 * @param {object} options - Properties to be added/overriden for FormData and CombinedStream
 */ function FormData(options) {
    if (!(this instanceof FormData)) {
        return new FormData(options);
    }
    this._overheadLength = 0;
    this._valueLength = 0;
    this._valuesToMeasure = [];
    CombinedStream.call(this);
    options = options || {}; // eslint-disable-line no-param-reassign
    for(var option in options){
        this[option] = options[option];
    }
}
// make it a Stream
util.inherits(FormData, CombinedStream);
FormData.LINE_BREAK = '\r\n';
FormData.DEFAULT_CONTENT_TYPE = 'application/octet-stream';
FormData.prototype.append = function(field, value, options) {
    options = options || {}; // eslint-disable-line no-param-reassign
    // allow filename as single option
    if (typeof options === 'string') {
        options = {
            filename: options
        }; // eslint-disable-line no-param-reassign
    }
    var append = CombinedStream.prototype.append.bind(this);
    // all that streamy business can't handle numbers
    if (typeof value === 'number' || value == null) {
        value = String(value); // eslint-disable-line no-param-reassign
    }
    // https://github.com/felixge/node-form-data/issues/38
    if (Array.isArray(value)) {
        /*
     * Please convert your array into string
     * the way web server expects it
     */ this._error(new Error('Arrays are not supported.'));
        return;
    }
    var header = this._multiPartHeader(field, value, options);
    var footer = this._multiPartFooter();
    append(header);
    append(value);
    append(footer);
    // pass along options.knownLength
    this._trackLength(header, value, options);
};
FormData.prototype._trackLength = function(header, value, options) {
    var valueLength = 0;
    /*
   * used w/ getLengthSync(), when length is known.
   * e.g. for streaming directly from a remote server,
   * w/ a known file a size, and not wanting to wait for
   * incoming file to finish to get its size.
   */ if (options.knownLength != null) {
        valueLength += Number(options.knownLength);
    } else if (Buffer.isBuffer(value)) {
        valueLength = value.length;
    } else if (typeof value === 'string') {
        valueLength = Buffer.byteLength(value);
    }
    this._valueLength += valueLength;
    // @check why add CRLF? does this account for custom/multiple CRLFs?
    this._overheadLength += Buffer.byteLength(header) + FormData.LINE_BREAK.length;
    // empty or either doesn't have path or not an http response or not a stream
    if (!value || !value.path && !(value.readable && hasOwn(value, 'httpVersion')) && !(value instanceof Stream)) {
        return;
    }
    // no need to bother with the length
    if (!options.knownLength) {
        this._valuesToMeasure.push(value);
    }
};
FormData.prototype._lengthRetriever = function(value, callback) {
    if (hasOwn(value, 'fd')) {
        // take read range into a account
        // `end` = Infinity –> read file till the end
        //
        // TODO: Looks like there is bug in Node fs.createReadStream
        // it doesn't respect `end` options without `start` options
        // Fix it when node fixes it.
        // https://github.com/joyent/node/issues/7819
        if (value.end != undefined && value.end != Infinity && value.start != undefined) {
            // when end specified
            // no need to calculate range
            // inclusive, starts with 0
            callback(null, value.end + 1 - (value.start ? value.start : 0)); // eslint-disable-line callback-return
        // not that fast snoopy
        } else {
            // still need to fetch file size from fs
            fs.stat(value.path, function(err, stat) {
                if (err) {
                    callback(err);
                    return;
                }
                // update final size based on the range options
                var fileSize = stat.size - (value.start ? value.start : 0);
                callback(null, fileSize);
            });
        }
    // or http response
    } else if (hasOwn(value, 'httpVersion')) {
        callback(null, Number(value.headers['content-length'])); // eslint-disable-line callback-return
    // or request stream http://github.com/mikeal/request
    } else if (hasOwn(value, 'httpModule')) {
        // wait till response come back
        value.on('response', function(response) {
            value.pause();
            callback(null, Number(response.headers['content-length']));
        });
        value.resume();
    // something else
    } else {
        callback('Unknown stream'); // eslint-disable-line callback-return
    }
};
FormData.prototype._multiPartHeader = function(field, value, options) {
    /*
   * custom header specified (as string)?
   * it becomes responsible for boundary
   * (e.g. to handle extra CRLFs on .NET servers)
   */ if (typeof options.header === 'string') {
        return options.header;
    }
    var contentDisposition = this._getContentDisposition(value, options);
    var contentType = this._getContentType(value, options);
    var contents = '';
    var headers = {
        // add custom disposition as third element or keep it two elements if not
        'Content-Disposition': [
            'form-data',
            'name="' + field + '"'
        ].concat(contentDisposition || []),
        // if no content type. allow it to be empty array
        'Content-Type': [].concat(contentType || [])
    };
    // allow custom headers.
    if (typeof options.header === 'object') {
        populate(headers, options.header);
    }
    var header;
    for(var prop in headers){
        if (hasOwn(headers, prop)) {
            header = headers[prop];
            // skip nullish headers.
            if (header == null) {
                continue; // eslint-disable-line no-restricted-syntax, no-continue
            }
            // convert all headers to arrays.
            if (!Array.isArray(header)) {
                header = [
                    header
                ];
            }
            // add non-empty headers.
            if (header.length) {
                contents += prop + ': ' + header.join('; ') + FormData.LINE_BREAK;
            }
        }
    }
    return '--' + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;
};
FormData.prototype._getContentDisposition = function(value, options) {
    var filename;
    if (typeof options.filepath === 'string') {
        // custom filepath for relative paths
        filename = path.normalize(options.filepath).replace(/\\/g, '/');
    } else if (options.filename || value && (value.name || value.path)) {
        /*
     * custom filename take precedence
     * formidable and the browser add a name property
     * fs- and request- streams have path property
     */ filename = path.basename(options.filename || value && (value.name || value.path));
    } else if (value && value.readable && hasOwn(value, 'httpVersion')) {
        // or try http response
        filename = path.basename(value.client._httpMessage.path || '');
    }
    if (filename) {
        return 'filename="' + filename + '"';
    }
};
FormData.prototype._getContentType = function(value, options) {
    // use custom content-type above all
    var contentType = options.contentType;
    // or try `name` from formidable, browser
    if (!contentType && value && value.name) {
        contentType = mime.lookup(value.name);
    }
    // or try `path` from fs-, request- streams
    if (!contentType && value && value.path) {
        contentType = mime.lookup(value.path);
    }
    // or if it's http-reponse
    if (!contentType && value && value.readable && hasOwn(value, 'httpVersion')) {
        contentType = value.headers['content-type'];
    }
    // or guess it from the filepath or filename
    if (!contentType && (options.filepath || options.filename)) {
        contentType = mime.lookup(options.filepath || options.filename);
    }
    // fallback to the default content type if `value` is not simple value
    if (!contentType && value && typeof value === 'object') {
        contentType = FormData.DEFAULT_CONTENT_TYPE;
    }
    return contentType;
};
FormData.prototype._multiPartFooter = function() {
    return (function(next) {
        var footer = FormData.LINE_BREAK;
        var lastPart = this._streams.length === 0;
        if (lastPart) {
            footer += this._lastBoundary();
        }
        next(footer);
    }).bind(this);
};
FormData.prototype._lastBoundary = function() {
    return '--' + this.getBoundary() + '--' + FormData.LINE_BREAK;
};
FormData.prototype.getHeaders = function(userHeaders) {
    var header;
    var formHeaders = {
        'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
    };
    for(header in userHeaders){
        if (hasOwn(userHeaders, header)) {
            formHeaders[header.toLowerCase()] = userHeaders[header];
        }
    }
    return formHeaders;
};
FormData.prototype.setBoundary = function(boundary) {
    if (typeof boundary !== 'string') {
        throw new TypeError('FormData boundary must be a string');
    }
    this._boundary = boundary;
};
FormData.prototype.getBoundary = function() {
    if (!this._boundary) {
        this._generateBoundary();
    }
    return this._boundary;
};
FormData.prototype.getBuffer = function() {
    var dataBuffer = new Buffer.alloc(0); // eslint-disable-line new-cap
    var boundary = this.getBoundary();
    // Create the form content. Add Line breaks to the end of data.
    for(var i = 0, len = this._streams.length; i < len; i++){
        if (typeof this._streams[i] !== 'function') {
            // Add content to the buffer.
            if (Buffer.isBuffer(this._streams[i])) {
                dataBuffer = Buffer.concat([
                    dataBuffer,
                    this._streams[i]
                ]);
            } else {
                dataBuffer = Buffer.concat([
                    dataBuffer,
                    Buffer.from(this._streams[i])
                ]);
            }
            // Add break after content.
            if (typeof this._streams[i] !== 'string' || this._streams[i].substring(2, boundary.length + 2) !== boundary) {
                dataBuffer = Buffer.concat([
                    dataBuffer,
                    Buffer.from(FormData.LINE_BREAK)
                ]);
            }
        }
    }
    // Add the footer and return the Buffer object.
    return Buffer.concat([
        dataBuffer,
        Buffer.from(this._lastBoundary())
    ]);
};
FormData.prototype._generateBoundary = function() {
    // This generates a 50 character boundary similar to those used by Firefox.
    // They are optimized for boyer-moore parsing.
    this._boundary = '--------------------------' + crypto.randomBytes(12).toString('hex');
};
// Note: getLengthSync DOESN'T calculate streams length
// As workaround one can calculate file size manually and add it as knownLength option
FormData.prototype.getLengthSync = function() {
    var knownLength = this._overheadLength + this._valueLength;
    // Don't get confused, there are 3 "internal" streams for each keyval pair so it basically checks if there is any value added to the form
    if (this._streams.length) {
        knownLength += this._lastBoundary().length;
    }
    // https://github.com/form-data/form-data/issues/40
    if (!this.hasKnownLength()) {
        /*
     * Some async length retrievers are present
     * therefore synchronous length calculation is false.
     * Please use getLength(callback) to get proper length
     */ this._error(new Error('Cannot calculate proper length in synchronous way.'));
    }
    return knownLength;
};
// Public API to check if length of added values is known
// https://github.com/form-data/form-data/issues/196
// https://github.com/form-data/form-data/issues/262
FormData.prototype.hasKnownLength = function() {
    var hasKnownLength = true;
    if (this._valuesToMeasure.length) {
        hasKnownLength = false;
    }
    return hasKnownLength;
};
FormData.prototype.getLength = function(cb) {
    var knownLength = this._overheadLength + this._valueLength;
    if (this._streams.length) {
        knownLength += this._lastBoundary().length;
    }
    if (!this._valuesToMeasure.length) {
        process.nextTick(cb.bind(this, null, knownLength));
        return;
    }
    asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
        if (err) {
            cb(err);
            return;
        }
        values.forEach(function(length) {
            knownLength += length;
        });
        cb(null, knownLength);
    });
};
FormData.prototype.submit = function(params, cb) {
    var request;
    var options;
    var defaults = {
        method: 'post'
    };
    // parse provided url if it's string or treat it as options object
    if (typeof params === 'string') {
        params = parseUrl(params); // eslint-disable-line no-param-reassign
        /* eslint sort-keys: 0 */ options = populate({
            port: params.port,
            path: params.pathname,
            host: params.hostname,
            protocol: params.protocol
        }, defaults);
    } else {
        options = populate(params, defaults);
        // if no port provided use default one
        if (!options.port) {
            options.port = options.protocol === 'https:' ? 443 : 80;
        }
    }
    // put that good code in getHeaders to some use
    options.headers = this.getHeaders(params.headers);
    // https if specified, fallback to http in any other case
    if (options.protocol === 'https:') {
        request = https.request(options);
    } else {
        request = http.request(options);
    }
    // get content length and fire away
    this.getLength((function(err, length) {
        if (err && err !== 'Unknown stream') {
            this._error(err);
            return;
        }
        // add content length
        if (length) {
            request.setHeader('Content-Length', length);
        }
        this.pipe(request);
        if (cb) {
            var onResponse;
            var callback = function(error, responce) {
                request.removeListener('error', callback);
                request.removeListener('response', onResponse);
                return cb.call(this, error, responce);
            };
            onResponse = callback.bind(this, null);
            request.on('error', callback);
            request.on('response', onResponse);
        }
    }).bind(this));
    return request;
};
FormData.prototype._error = function(err) {
    if (!this.error) {
        this.error = err;
        this.pause();
        this.emit('error', err);
    }
};
FormData.prototype.toString = function() {
    return '[object FormData]';
};
setToStringTag(FormData.prototype, 'FormData');
// Public API
module.exports = FormData;
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/defaults/env/FormData.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

// eslint-disable-next-line strict
module.exports = __turbopack_context__.r("[project]/node_modules/form-data/lib/form_data.js [app-route] (ecmascript)");
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/normalizeHeaderName.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
module.exports = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = value;
            delete headers[name];
        }
    });
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/defaults/transitional.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/settle.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var AxiosError = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/AxiosError.js [app-route] (ecmascript)");
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */ module.exports = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
    } else {
        reject(new AxiosError('Request failed with status code ' + response.status, [
            AxiosError.ERR_BAD_REQUEST,
            AxiosError.ERR_BAD_RESPONSE
        ][Math.floor(response.status / 100) - 4], response.config, response.request, response));
    }
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/isAbsoluteURL.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */ module.exports = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/combineURLs.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */ module.exports = function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/buildFullPath.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isAbsoluteURL = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/isAbsoluteURL.js [app-route] (ecmascript)");
var combineURLs = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/combineURLs.js [app-route] (ecmascript)");
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */ module.exports = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
};
}),
"[project]/node_modules/ms/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Helpers.
 */ var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;
/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */ module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
        return parse(val);
    } else if (type === 'number' && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};
/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */ function parse(str) {
    str = String(str);
    if (str.length > 100) {
        return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
        return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch(type){
        case 'years':
        case 'year':
        case 'yrs':
        case 'yr':
        case 'y':
            return n * y;
        case 'weeks':
        case 'week':
        case 'w':
            return n * w;
        case 'days':
        case 'day':
        case 'd':
            return n * d;
        case 'hours':
        case 'hour':
        case 'hrs':
        case 'hr':
        case 'h':
            return n * h;
        case 'minutes':
        case 'minute':
        case 'mins':
        case 'min':
        case 'm':
            return n * m;
        case 'seconds':
        case 'second':
        case 'secs':
        case 'sec':
        case 's':
            return n * s;
        case 'milliseconds':
        case 'millisecond':
        case 'msecs':
        case 'msec':
        case 'ms':
            return n;
        default:
            return undefined;
    }
}
/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtShort(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return Math.round(ms / d) + 'd';
    }
    if (msAbs >= h) {
        return Math.round(ms / h) + 'h';
    }
    if (msAbs >= m) {
        return Math.round(ms / m) + 'm';
    }
    if (msAbs >= s) {
        return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
}
/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */ function fmtLong(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
        return plural(ms, msAbs, d, 'day');
    }
    if (msAbs >= h) {
        return plural(ms, msAbs, h, 'hour');
    }
    if (msAbs >= m) {
        return plural(ms, msAbs, m, 'minute');
    }
    if (msAbs >= s) {
        return plural(ms, msAbs, s, 'second');
    }
    return ms + ' ms';
}
/**
 * Pluralization helper.
 */ function plural(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}
}),
"[project]/node_modules/debug/src/common.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */ function setup(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = __turbopack_context__.r("[project]/node_modules/ms/index.js [app-route] (ecmascript)");
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key)=>{
        createDebug[key] = env[key];
    });
    /**
	* The currently active debug mode names, and names to skip.
	*/ createDebug.names = [];
    createDebug.skips = [];
    /**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/ createDebug.formatters = {};
    /**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/ function selectColor(namespace) {
        let hash = 0;
        for(let i = 0; i < namespace.length; i++){
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0; // Convert to 32bit integer
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    /**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/ function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
            // Disabled?
            if (!debug.enabled) {
                return;
            }
            const self = debug;
            // Set `diff` timestamp
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== 'string') {
                // Anything else let's inspect with %O
                args.unshift('%O');
            }
            // Apply any `formatters` transformations
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format)=>{
                // If we encounter an escaped % then don't increase the array index
                if (match === '%%') {
                    return '%';
                }
                index++;
                const formatter = createDebug.formatters[format];
                if (typeof formatter === 'function') {
                    const val = args[index];
                    match = formatter.call(self, val);
                    // Now we need to remove `args[index]` since it's inlined in the `format`
                    args.splice(index, 1);
                    index--;
                }
                return match;
            });
            // Apply env-specific formatting (colors, etc.)
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.
        Object.defineProperty(debug, 'enabled', {
            enumerable: true,
            configurable: false,
            get: ()=>{
                if (enableOverride !== null) {
                    return enableOverride;
                }
                if (namespacesCache !== createDebug.namespaces) {
                    namespacesCache = createDebug.namespaces;
                    enabledCache = createDebug.enabled(namespace);
                }
                return enabledCache;
            },
            set: (v)=>{
                enableOverride = v;
            }
        });
        // Env-specific initialization logic for debug instances
        if (typeof createDebug.init === 'function') {
            createDebug.init(debug);
        }
        return debug;
    }
    function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
    }
    /**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/ function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === 'string' ? namespaces : '').trim().replace(/\s+/g, ',').split(',').filter(Boolean);
        for (const ns of split){
            if (ns[0] === '-') {
                createDebug.skips.push(ns.slice(1));
            } else {
                createDebug.names.push(ns);
            }
        }
    }
    /**
	 * Checks if the given string matches a namespace template, honoring
	 * asterisks as wildcards.
	 *
	 * @param {String} search
	 * @param {String} template
	 * @return {Boolean}
	 */ function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while(searchIndex < search.length){
            if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === '*')) {
                // Match character or proceed with wildcard
                if (template[templateIndex] === '*') {
                    starIndex = templateIndex;
                    matchIndex = searchIndex;
                    templateIndex++; // Skip the '*'
                } else {
                    searchIndex++;
                    templateIndex++;
                }
            } else if (starIndex !== -1) {
                // Backtrack to the last '*' and try to match more characters
                templateIndex = starIndex + 1;
                matchIndex++;
                searchIndex = matchIndex;
            } else {
                return false; // No match
            }
        }
        // Handle trailing '*' in template
        while(templateIndex < template.length && template[templateIndex] === '*'){
            templateIndex++;
        }
        return templateIndex === template.length;
    }
    /**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/ function disable() {
        const namespaces = [
            ...createDebug.names,
            ...createDebug.skips.map((namespace)=>'-' + namespace)
        ].join(',');
        createDebug.enable('');
        return namespaces;
    }
    /**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/ function enabled(name) {
        for (const skip of createDebug.skips){
            if (matchesTemplate(name, skip)) {
                return false;
            }
        }
        for (const ns of createDebug.names){
            if (matchesTemplate(name, ns)) {
                return true;
            }
        }
        return false;
    }
    /**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/ function coerce(val) {
        if (val instanceof Error) {
            return val.stack || val.message;
        }
        return val;
    }
    /**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/ function destroy() {
        console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
    }
    createDebug.enable(createDebug.load());
    return createDebug;
}
module.exports = setup;
}),
"[project]/node_modules/has-flag/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = (flag, argv = process.argv)=>{
    const prefix = flag.startsWith('-') ? '' : flag.length === 1 ? '-' : '--';
    const position = argv.indexOf(prefix + flag);
    const terminatorPosition = argv.indexOf('--');
    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};
}),
"[project]/node_modules/supports-color/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

const os = __turbopack_context__.r("[externals]/os [external] (os, cjs)");
const tty = __turbopack_context__.r("[externals]/tty [external] (tty, cjs)");
const hasFlag = __turbopack_context__.r("[project]/node_modules/has-flag/index.js [app-route] (ecmascript)");
const { env } = process;
let forceColor;
if (hasFlag('no-color') || hasFlag('no-colors') || hasFlag('color=false') || hasFlag('color=never')) {
    forceColor = 0;
} else if (hasFlag('color') || hasFlag('colors') || hasFlag('color=true') || hasFlag('color=always')) {
    forceColor = 1;
}
if ('FORCE_COLOR' in env) {
    if (env.FORCE_COLOR === 'true') {
        forceColor = 1;
    } else if (env.FORCE_COLOR === 'false') {
        forceColor = 0;
    } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
    }
}
function translateLevel(level) {
    if (level === 0) {
        return false;
    }
    return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
    };
}
function supportsColor(haveStream, streamIsTTY) {
    if (forceColor === 0) {
        return 0;
    }
    if (hasFlag('color=16m') || hasFlag('color=full') || hasFlag('color=truecolor')) {
        return 3;
    }
    if (hasFlag('color=256')) {
        return 2;
    }
    if (haveStream && !streamIsTTY && forceColor === undefined) {
        return 0;
    }
    const min = forceColor || 0;
    if (env.TERM === 'dumb') {
        return min;
    }
    if ("TURBOPACK compile-time truthy", 1) {
        // Windows 10 build 10586 is the first Windows release that supports 256 colors.
        // Windows 10 build 14931 is the first release that supports 16m/TrueColor.
        const osRelease = os.release().split('.');
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
            return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
    }
    //TURBOPACK unreachable
    ;
}
function getSupportLevel(stream) {
    const level = supportsColor(stream, stream && stream.isTTY);
    return translateLevel(level);
}
module.exports = {
    supportsColor: getSupportLevel,
    stdout: translateLevel(supportsColor(true, tty.isatty(1))),
    stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};
}),
"[project]/node_modules/debug/src/node.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Module dependencies.
 */ const tty = __turbopack_context__.r("[externals]/tty [external] (tty, cjs)");
const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
/**
 * This is the Node.js implementation of `debug()`.
 */ exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(()=>{}, 'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
/**
 * Colors.
 */ exports.colors = [
    6,
    2,
    3,
    4,
    5,
    1
];
try {
    // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
    // eslint-disable-next-line import/no-extraneous-dependencies
    const supportsColor = __turbopack_context__.r("[project]/node_modules/supports-color/index.js [app-route] (ecmascript)");
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
            20,
            21,
            26,
            27,
            32,
            33,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            56,
            57,
            62,
            63,
            68,
            69,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            92,
            93,
            98,
            99,
            112,
            113,
            128,
            129,
            134,
            135,
            148,
            149,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            178,
            179,
            184,
            185,
            196,
            197,
            198,
            199,
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            214,
            215,
            220,
            221
        ];
    }
} catch (error) {
// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}
/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */ exports.inspectOpts = Object.keys(process.env).filter((key)=>{
    return /^debug_/i.test(key);
}).reduce((obj, key)=>{
    // Camel-case
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k)=>{
        return k.toUpperCase();
    });
    // Coerce string value into JS value
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
    } else if (val === 'null') {
        val = null;
    } else {
        val = Number(val);
    }
    obj[prop] = val;
    return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */ function useColors() {
    return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    const { namespace: name, useColors } = this;
    if (useColors) {
        const c = this.color;
        const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
        const prefix = `  ${colorCode};1m${name} \u001B[0m`;
        args[0] = prefix + args[0].split('\n').join('\n' + prefix);
        args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
    } else {
        args[0] = getDate() + name + ' ' + args[0];
    }
}
function getDate() {
    if (exports.inspectOpts.hideDate) {
        return '';
    }
    return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
 */ function log(...args) {
    return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    if (namespaces) {
        process.env.DEBUG = namespaces;
    } else {
        // If you set a process.env field to null or undefined, it gets cast to the
        // string 'null' or 'undefined'. Just delete instead.
        delete process.env.DEBUG;
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */ function init(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(exports.inspectOpts);
    for(let i = 0; i < keys.length; i++){
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
}
module.exports = __turbopack_context__.r("[project]/node_modules/debug/src/common.js [app-route] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */ formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split('\n').map((str)=>str.trim()).join(' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */ formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
};
}),
"[project]/node_modules/debug/src/browser.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/* eslint-env browser */ /**
 * This is the web browser implementation of `debug()`.
 */ exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (()=>{
    let warned = false;
    return ()=>{
        if (!warned) {
            warned = true;
            console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
        }
    };
})();
/**
 * Colors.
 */ exports.colors = [
    '#0000CC',
    '#0000FF',
    '#0033CC',
    '#0033FF',
    '#0066CC',
    '#0066FF',
    '#0099CC',
    '#0099FF',
    '#00CC00',
    '#00CC33',
    '#00CC66',
    '#00CC99',
    '#00CCCC',
    '#00CCFF',
    '#3300CC',
    '#3300FF',
    '#3333CC',
    '#3333FF',
    '#3366CC',
    '#3366FF',
    '#3399CC',
    '#3399FF',
    '#33CC00',
    '#33CC33',
    '#33CC66',
    '#33CC99',
    '#33CCCC',
    '#33CCFF',
    '#6600CC',
    '#6600FF',
    '#6633CC',
    '#6633FF',
    '#66CC00',
    '#66CC33',
    '#9900CC',
    '#9900FF',
    '#9933CC',
    '#9933FF',
    '#99CC00',
    '#99CC33',
    '#CC0000',
    '#CC0033',
    '#CC0066',
    '#CC0099',
    '#CC00CC',
    '#CC00FF',
    '#CC3300',
    '#CC3333',
    '#CC3366',
    '#CC3399',
    '#CC33CC',
    '#CC33FF',
    '#CC6600',
    '#CC6633',
    '#CC9900',
    '#CC9933',
    '#CCCC00',
    '#CCCC33',
    '#FF0000',
    '#FF0033',
    '#FF0066',
    '#FF0099',
    '#FF00CC',
    '#FF00FF',
    '#FF3300',
    '#FF3333',
    '#FF3366',
    '#FF3399',
    '#FF33CC',
    '#FF33FF',
    '#FF6600',
    '#FF6633',
    '#FF9900',
    '#FF9933',
    '#FFCC00',
    '#FFCC33'
];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */ // eslint-disable-next-line complexity
function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
    }
    let m;
    // Is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    // eslint-disable-next-line no-return-assign
    return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || ("TURBOPACK compile-time value", "undefined") !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */ function formatArgs(args) {
    args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
    if (!this.useColors) {
        return;
    }
    const c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');
    // The final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match)=>{
        if (match === '%%') {
            return;
        }
        index++;
        if (match === '%c') {
            // We only are interested in the *last* %c
            // (the user may have provided their own)
            lastC = index;
        }
    });
    args.splice(lastC, 0, c);
}
/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */ exports.log = console.debug || console.log || (()=>{});
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */ function save(namespaces) {
    try {
        if (namespaces) {
            exports.storage.setItem('debug', namespaces);
        } else {
            exports.storage.removeItem('debug');
        }
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */ function load() {
    let r;
    try {
        r = exports.storage.getItem('debug') || exports.storage.getItem('DEBUG');
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
    }
    return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */ function localstorage() {
    try {
        // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
        // The Browser also has localStorage in the global context.
        return localStorage;
    } catch (error) {
    // Swallow
    // XXX (@Qix-) should we be logging these?
    }
}
module.exports = __turbopack_context__.r("[project]/node_modules/debug/src/common.js [app-route] (ecmascript)")(exports);
const { formatters } = module.exports;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */ formatters.j = function(v) {
    try {
        return JSON.stringify(v);
    } catch (error) {
        return '[UnexpectedJSONParseError]: ' + error.message;
    }
};
}),
"[project]/node_modules/debug/src/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */ if (typeof process === 'undefined' || process.type === 'renderer' || ("TURBOPACK compile-time value", false) === true || process.__nwjs) {
    module.exports = __turbopack_context__.r("[project]/node_modules/debug/src/browser.js [app-route] (ecmascript)");
} else {
    module.exports = __turbopack_context__.r("[project]/node_modules/debug/src/node.js [app-route] (ecmascript)");
}
}),
"[project]/node_modules/follow-redirects/debug.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var debug;
module.exports = function() {
    if (!debug) {
        try {
            /* eslint global-require: off */ debug = __turbopack_context__.r("[project]/node_modules/debug/src/index.js [app-route] (ecmascript)")("follow-redirects");
        } catch (error) {}
        if (typeof debug !== "function") {
            debug = function() {};
        }
    }
    debug.apply(null, arguments);
};
}),
"[project]/node_modules/follow-redirects/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var url = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
var URL = url.URL;
var http = __turbopack_context__.r("[externals]/http [external] (http, cjs)");
var https = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
var Writable = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Writable;
var assert = __turbopack_context__.r("[externals]/assert [external] (assert, cjs)");
var debug = __turbopack_context__.r("[project]/node_modules/follow-redirects/debug.js [app-route] (ecmascript)");
// Preventive platform detection
// istanbul ignore next
(function detectUnsupportedEnvironment() {
    var looksLikeNode = typeof process !== "undefined";
    var looksLikeBrowser = ("TURBOPACK compile-time value", "undefined") !== "undefined" && typeof document !== "undefined";
    var looksLikeV8 = isFunction(Error.captureStackTrace);
    if (!looksLikeNode && (looksLikeBrowser || !looksLikeV8)) {
        console.warn("The follow-redirects package should be excluded from browser builds.");
    }
})();
// Whether to use the native URL object or the legacy url module
var useNativeURL = false;
try {
    assert(new URL(""));
} catch (error) {
    useNativeURL = error.code === "ERR_INVALID_URL";
}
// URL fields to preserve in copy operations
var preservedUrlFields = [
    "auth",
    "host",
    "hostname",
    "href",
    "path",
    "pathname",
    "port",
    "protocol",
    "query",
    "search",
    "hash"
];
// Create handlers that pass events from native requests
var events = [
    "abort",
    "aborted",
    "connect",
    "error",
    "socket",
    "timeout"
];
var eventHandlers = Object.create(null);
events.forEach(function(event) {
    eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
    };
});
// Error types with codes
var InvalidUrlError = createErrorType("ERR_INVALID_URL", "Invalid URL", TypeError);
var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed");
var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded", RedirectionError);
var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
// istanbul ignore next
var destroy = Writable.prototype.destroy || noop;
// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
    // Initialize the request
    Writable.call(this);
    this._sanitizeOptions(options);
    this._options = options;
    this._ended = false;
    this._ending = false;
    this._redirectCount = 0;
    this._redirects = [];
    this._requestBodyLength = 0;
    this._requestBodyBuffers = [];
    // Attach a callback if passed
    if (responseCallback) {
        this.on("response", responseCallback);
    }
    // React to responses of native requests
    var self = this;
    this._onNativeResponse = function(response) {
        try {
            self._processResponse(response);
        } catch (cause) {
            self.emit("error", cause instanceof RedirectionError ? cause : new RedirectionError({
                cause: cause
            }));
        }
    };
    // Perform the first request
    this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);
RedirectableRequest.prototype.abort = function() {
    destroyRequest(this._currentRequest);
    this._currentRequest.abort();
    this.emit("abort");
};
RedirectableRequest.prototype.destroy = function(error) {
    destroyRequest(this._currentRequest, error);
    destroy.call(this, error);
    return this;
};
// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function(data, encoding, callback) {
    // Writing is not allowed if end has been called
    if (this._ending) {
        throw new WriteAfterEndError();
    }
    // Validate input and shift parameters if necessary
    if (!isString(data) && !isBuffer(data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
    }
    if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
    }
    // Ignore empty buffers, since writing them doesn't invoke the callback
    // https://github.com/nodejs/node/issues/22066
    if (data.length === 0) {
        if (callback) {
            callback();
        }
        return;
    }
    // Only write when we don't exceed the maximum body length
    if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({
            data: data,
            encoding: encoding
        });
        this._currentRequest.write(data, encoding, callback);
    } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
    }
};
// Ends the current native request
RedirectableRequest.prototype.end = function(data, encoding, callback) {
    // Shift parameters if necessary
    if (isFunction(data)) {
        callback = data;
        data = encoding = null;
    } else if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
    }
    // Write data if needed and end
    if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
    } else {
        var self = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
            self._ended = true;
            currentRequest.end(null, null, callback);
        });
        this._ending = true;
    }
};
// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function(name, value) {
    this._options.headers[name] = value;
    this._currentRequest.setHeader(name, value);
};
// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function(name) {
    delete this._options.headers[name];
    this._currentRequest.removeHeader(name);
};
// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
    var self = this;
    // Destroys the socket on timeout
    function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
    }
    // Sets up a timer to trigger a timeout event
    function startTimer(socket) {
        if (self._timeout) {
            clearTimeout(self._timeout);
        }
        self._timeout = setTimeout(function() {
            self.emit("timeout");
            clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
    }
    // Stops a timeout from triggering
    function clearTimer() {
        // Clear the timeout
        if (self._timeout) {
            clearTimeout(self._timeout);
            self._timeout = null;
        }
        // Clean up all attached listeners
        self.removeListener("abort", clearTimer);
        self.removeListener("error", clearTimer);
        self.removeListener("response", clearTimer);
        self.removeListener("close", clearTimer);
        if (callback) {
            self.removeListener("timeout", callback);
        }
        if (!self.socket) {
            self._currentRequest.removeListener("socket", startTimer);
        }
    }
    // Attach callback if passed
    if (callback) {
        this.on("timeout", callback);
    }
    // Start the timer if or when the socket is opened
    if (this.socket) {
        startTimer(this.socket);
    } else {
        this._currentRequest.once("socket", startTimer);
    }
    // Clean up on events
    this.on("socket", destroyOnTimeout);
    this.on("abort", clearTimer);
    this.on("error", clearTimer);
    this.on("response", clearTimer);
    this.on("close", clearTimer);
    return this;
};
// Proxy all other public ClientRequest methods
[
    "flushHeaders",
    "getHeader",
    "setNoDelay",
    "setSocketKeepAlive"
].forEach(function(method) {
    RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
    };
});
// Proxy all public ClientRequest properties
[
    "aborted",
    "connection",
    "socket"
].forEach(function(property) {
    Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
            return this._currentRequest[property];
        }
    });
});
RedirectableRequest.prototype._sanitizeOptions = function(options) {
    // Ensure headers are always present
    if (!options.headers) {
        options.headers = {};
    }
    // Since http.request treats host as an alias of hostname,
    // but the url module interprets host as hostname plus port,
    // eliminate the host property to avoid confusion.
    if (options.host) {
        // Use hostname if set, because it has precedence
        if (!options.hostname) {
            options.hostname = options.host;
        }
        delete options.host;
    }
    // Complete the URL object when necessary
    if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
            options.pathname = options.path;
        } else {
            options.pathname = options.path.substring(0, searchPos);
            options.search = options.path.substring(searchPos);
        }
    }
};
// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function() {
    // Load the native protocol
    var protocol = this._options.protocol;
    var nativeProtocol = this._options.nativeProtocols[protocol];
    if (!nativeProtocol) {
        throw new TypeError("Unsupported protocol " + protocol);
    }
    // If specified, use the agent corresponding to the protocol
    // (HTTP and HTTPS use different types of agents)
    if (this._options.agents) {
        var scheme = protocol.slice(0, -1);
        this._options.agent = this._options.agents[scheme];
    }
    // Create the native request and set up its event handlers
    var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
    request._redirectable = this;
    for (var event of events){
        request.on(event, eventHandlers[event]);
    }
    // RFC7230§5.3.1: When making a request directly to an origin server, […]
    // a client MUST send only the absolute path […] as the request-target.
    this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) : // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path;
    // End a redirected request
    // (The first request must be ended explicitly with RedirectableRequest#end)
    if (this._isRedirect) {
        // Write the request entity and end
        var i = 0;
        var self = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
            // Only write if this request has not been redirected yet
            // istanbul ignore else
            if (request === self._currentRequest) {
                // Report any write errors
                // istanbul ignore if
                if (error) {
                    self.emit("error", error);
                } else if (i < buffers.length) {
                    var buffer = buffers[i++];
                    // istanbul ignore else
                    if (!request.finished) {
                        request.write(buffer.data, buffer.encoding, writeNext);
                    }
                } else if (self._ended) {
                    request.end();
                }
            }
        })();
    }
};
// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function(response) {
    // Store the redirected response
    var statusCode = response.statusCode;
    if (this._options.trackRedirects) {
        this._redirects.push({
            url: this._currentUrl,
            headers: response.headers,
            statusCode: statusCode
        });
    }
    // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
    // that further action needs to be taken by the user agent in order to
    // fulfill the request. If a Location header field is provided,
    // the user agent MAY automatically redirect its request to the URI
    // referenced by the Location field value,
    // even if the specific status code is not understood.
    // If the response is not a redirect; return it as-is
    var location = response.headers.location;
    if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        // Clean up
        this._requestBodyBuffers = [];
        return;
    }
    // The response is a redirect, so abort the current request
    destroyRequest(this._currentRequest);
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();
    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
        throw new TooManyRedirectsError();
    }
    // Store the request headers if applicable
    var requestHeaders;
    var beforeRedirect = this._options.beforeRedirect;
    if (beforeRedirect) {
        requestHeaders = Object.assign({
            // The Host header was set by nativeProtocol.request
            Host: response.req.getHeader("host")
        }, this._options.headers);
    }
    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    var method = this._options.method;
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
    // the server is redirecting the user agent to a different resource […]
    // A user agent can perform a retrieval request targeting that URI
    // (a GET or HEAD request if using HTTP) […]
    statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        // Drop a possible entity and headers related to it
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
    }
    // Drop the Host header, as the redirect might lead to a different host
    var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
    // If the redirect is relative, carry over the host of the last request
    var currentUrlParts = parseUrl(this._currentUrl);
    var currentHost = currentHostHeader || currentUrlParts.host;
    var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, {
        host: currentHost
    }));
    // Create the redirected request
    var redirectUrl = resolveUrl(location, currentUrl);
    debug("redirecting to", redirectUrl.href);
    this._isRedirect = true;
    spreadUrlObject(redirectUrl, this._options);
    // Drop confidential headers when redirecting to a less secure protocol
    // or to a different domain that is not a superdomain
    if (redirectUrl.protocol !== currentUrlParts.protocol && redirectUrl.protocol !== "https:" || redirectUrl.host !== currentHost && !isSubdomain(redirectUrl.host, currentHost)) {
        removeMatchingHeaders(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers);
    }
    // Evaluate the beforeRedirect callback
    if (isFunction(beforeRedirect)) {
        var responseDetails = {
            headers: response.headers,
            statusCode: statusCode
        };
        var requestDetails = {
            url: currentUrl,
            method: method,
            headers: requestHeaders
        };
        beforeRedirect(this._options, responseDetails, requestDetails);
        this._sanitizeOptions(this._options);
    }
    // Perform the redirected request
    this._performRequest();
};
// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
    // Default settings
    var exports = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
    };
    // Wrap each protocol
    var nativeProtocols = {};
    Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);
        // Executes a request, following redirects
        function request(input, options, callback) {
            // Parse parameters, ensuring that input is an object
            if (isURL(input)) {
                input = spreadUrlObject(input);
            } else if (isString(input)) {
                input = spreadUrlObject(parseUrl(input));
            } else {
                callback = options;
                options = validateUrl(input);
                input = {
                    protocol: protocol
                };
            }
            if (isFunction(options)) {
                callback = options;
                options = null;
            }
            // Set defaults
            options = Object.assign({
                maxRedirects: exports.maxRedirects,
                maxBodyLength: exports.maxBodyLength
            }, input, options);
            options.nativeProtocols = nativeProtocols;
            if (!isString(options.host) && !isString(options.hostname)) {
                options.hostname = "::1";
            }
            assert.equal(options.protocol, protocol, "protocol mismatch");
            debug("options", options);
            return new RedirectableRequest(options, callback);
        }
        // Executes a GET request, following redirects
        function get(input, options, callback) {
            var wrappedRequest = wrappedProtocol.request(input, options, callback);
            wrappedRequest.end();
            return wrappedRequest;
        }
        // Expose the properties on the wrapped protocol
        Object.defineProperties(wrappedProtocol, {
            request: {
                value: request,
                configurable: true,
                enumerable: true,
                writable: true
            },
            get: {
                value: get,
                configurable: true,
                enumerable: true,
                writable: true
            }
        });
    });
    return exports;
}
function noop() {}
function parseUrl(input) {
    var parsed;
    // istanbul ignore else
    if (useNativeURL) {
        parsed = new URL(input);
    } else {
        // Ensure the URL is valid and absolute
        parsed = validateUrl(url.parse(input));
        if (!isString(parsed.protocol)) {
            throw new InvalidUrlError({
                input
            });
        }
    }
    return parsed;
}
function resolveUrl(relative, base) {
    // istanbul ignore next
    return useNativeURL ? new URL(relative, base) : parseUrl(url.resolve(base, relative));
}
function validateUrl(input) {
    if (/^\[/.test(input.hostname) && !/^\[[:0-9a-f]+\]$/i.test(input.hostname)) {
        throw new InvalidUrlError({
            input: input.href || input
        });
    }
    if (/^\[/.test(input.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(input.host)) {
        throw new InvalidUrlError({
            input: input.href || input
        });
    }
    return input;
}
function spreadUrlObject(urlObject, target) {
    var spread = target || {};
    for (var key of preservedUrlFields){
        spread[key] = urlObject[key];
    }
    // Fix IPv6 hostname
    if (spread.hostname.startsWith("[")) {
        spread.hostname = spread.hostname.slice(1, -1);
    }
    // Ensure port is a number
    if (spread.port !== "") {
        spread.port = Number(spread.port);
    }
    // Concatenate path
    spread.path = spread.search ? spread.pathname + spread.search : spread.pathname;
    return spread;
}
function removeMatchingHeaders(regex, headers) {
    var lastValue;
    for(var header in headers){
        if (regex.test(header)) {
            lastValue = headers[header];
            delete headers[header];
        }
    }
    return lastValue === null || typeof lastValue === "undefined" ? undefined : String(lastValue).trim();
}
function createErrorType(code, message, baseClass) {
    // Create constructor
    function CustomError(properties) {
        // istanbul ignore else
        if (isFunction(Error.captureStackTrace)) {
            Error.captureStackTrace(this, this.constructor);
        }
        Object.assign(this, properties || {});
        this.code = code;
        this.message = this.cause ? message + ": " + this.cause.message : message;
    }
    // Attach constructor and set default properties
    CustomError.prototype = new (baseClass || Error)();
    Object.defineProperties(CustomError.prototype, {
        constructor: {
            value: CustomError,
            enumerable: false
        },
        name: {
            value: "Error [" + code + "]",
            enumerable: false
        }
    });
    return CustomError;
}
function destroyRequest(request, error) {
    for (var event of events){
        request.removeListener(event, eventHandlers[event]);
    }
    request.on("error", noop);
    request.destroy(error);
}
function isSubdomain(subdomain, domain) {
    assert(isString(subdomain) && isString(domain));
    var dot = subdomain.length - domain.length - 1;
    return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
}
function isString(value) {
    return typeof value === "string" || value instanceof String;
}
function isFunction(value) {
    return typeof value === "function";
}
function isBuffer(value) {
    return typeof value === "object" && "length" in value;
}
function isURL(value) {
    return URL && value instanceof URL;
}
// Exports
module.exports = wrap({
    http: http,
    https: https
});
module.exports.wrap = wrap;
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/adapters/http.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var settle = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/settle.js [app-route] (ecmascript)");
var buildFullPath = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/buildFullPath.js [app-route] (ecmascript)");
var buildURL = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/buildURL.js [app-route] (ecmascript)");
var http = __turbopack_context__.r("[externals]/http [external] (http, cjs)");
var https = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
var httpFollow = __turbopack_context__.r("[project]/node_modules/follow-redirects/index.js [app-route] (ecmascript)").http;
var httpsFollow = __turbopack_context__.r("[project]/node_modules/follow-redirects/index.js [app-route] (ecmascript)").https;
var url = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
var zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
var VERSION = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/env/data.js [app-route] (ecmascript)").version;
var transitionalDefaults = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/defaults/transitional.js [app-route] (ecmascript)");
var AxiosError = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/AxiosError.js [app-route] (ecmascript)");
var CanceledError = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/cancel/CanceledError.js [app-route] (ecmascript)");
var isHttps = /https:?/;
var supportedProtocols = [
    'http:',
    'https:',
    'file:'
];
/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */ function setProxy(options, proxy, location) {
    options.hostname = proxy.host;
    options.host = proxy.host;
    options.port = proxy.port;
    options.path = location;
    // Basic proxy authorization
    if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
    }
    // If a proxy is used, any redirects must also pass through the proxy
    options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
    };
}
/*eslint consistent-return:0*/ module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var onCanceled;
        function done() {
            if (config.cancelToken) {
                config.cancelToken.unsubscribe(onCanceled);
            }
            if (config.signal) {
                config.signal.removeEventListener('abort', onCanceled);
            }
        }
        var resolve = function resolve(value) {
            done();
            resolvePromise(value);
        };
        var rejected = false;
        var reject = function reject(value) {
            done();
            rejected = true;
            rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        var headerNames = {};
        Object.keys(headers).forEach(function storeLowerName(name) {
            headerNames[name.toLowerCase()] = name;
        });
        // Set User-Agent (required by some servers)
        // See https://github.com/axios/axios/issues/69
        if ('user-agent' in headerNames) {
            // User-Agent is specified; handle case where no UA header is desired
            if (!headers[headerNames['user-agent']]) {
                delete headers[headerNames['user-agent']];
            }
        // Otherwise, use specified value
        } else {
            // Only set header if it hasn't been set in config
            headers['User-Agent'] = 'axios/' + VERSION;
        }
        // support for https://www.npmjs.com/package/form-data api
        if (utils.isFormData(data) && utils.isFunction(data.getHeaders)) {
            Object.assign(headers, data.getHeaders());
        } else if (data && !utils.isStream(data)) {
            if (Buffer.isBuffer(data)) {
            // Nothing to do...
            } else if (utils.isArrayBuffer(data)) {
                data = Buffer.from(new Uint8Array(data));
            } else if (utils.isString(data)) {
                data = Buffer.from(data, 'utf-8');
            } else {
                return reject(new AxiosError('Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream', AxiosError.ERR_BAD_REQUEST, config));
            }
            if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
                return reject(new AxiosError('Request body larger than maxBodyLength limit', AxiosError.ERR_BAD_REQUEST, config));
            }
            // Add Content-Length header if data exists
            if (!headerNames['content-length']) {
                headers['Content-Length'] = data.length;
            }
        }
        // HTTP basic authentication
        var auth = undefined;
        if (config.auth) {
            var username = config.auth.username || '';
            var password = config.auth.password || '';
            auth = username + ':' + password;
        }
        // Parse url
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || supportedProtocols[0];
        if (supportedProtocols.indexOf(protocol) === -1) {
            return reject(new AxiosError('Unsupported protocol ' + protocol, AxiosError.ERR_BAD_REQUEST, config));
        }
        if (!auth && parsed.auth) {
            var urlAuth = parsed.auth.split(':');
            var urlUsername = urlAuth[0] || '';
            var urlPassword = urlAuth[1] || '';
            auth = urlUsername + ':' + urlPassword;
        }
        if (auth && headerNames.authorization) {
            delete headers[headerNames.authorization];
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        try {
            buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, '');
        } catch (err) {
            var customErr = new Error(err.message);
            customErr.config = config;
            customErr.url = config.url;
            customErr.exists = true;
            reject(customErr);
        }
        var options = {
            path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
            method: config.method.toUpperCase(),
            headers: headers,
            agent: agent,
            agents: {
                http: config.httpAgent,
                https: config.httpsAgent
            },
            auth: auth
        };
        if (config.socketPath) {
            options.socketPath = config.socketPath;
        } else {
            options.hostname = parsed.hostname;
            options.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
            var proxyEnv = protocol.slice(0, -1) + '_proxy';
            var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
            if (proxyUrl) {
                var parsedProxyUrl = url.parse(proxyUrl);
                var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
                var shouldProxy = true;
                if (noProxyEnv) {
                    var noProxy = noProxyEnv.split(',').map(function trim(s) {
                        return s.trim();
                    });
                    shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                        if (!proxyElement) {
                            return false;
                        }
                        if (proxyElement === '*') {
                            return true;
                        }
                        if (proxyElement[0] === '.' && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                            return true;
                        }
                        return parsed.hostname === proxyElement;
                    });
                }
                if (shouldProxy) {
                    proxy = {
                        host: parsedProxyUrl.hostname,
                        port: parsedProxyUrl.port,
                        protocol: parsedProxyUrl.protocol
                    };
                    if (parsedProxyUrl.auth) {
                        var proxyUrlAuth = parsedProxyUrl.auth.split(':');
                        proxy.auth = {
                            username: proxyUrlAuth[0],
                            password: proxyUrlAuth[1]
                        };
                    }
                }
            }
        }
        if (proxy) {
            options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
            setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
            transport = config.transport;
        } else if (config.maxRedirects === 0) {
            transport = isHttpsProxy ? https : http;
        } else {
            if (config.maxRedirects) {
                options.maxRedirects = config.maxRedirects;
            }
            if (config.beforeRedirect) {
                options.beforeRedirect = config.beforeRedirect;
            }
            transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
            options.maxBodyLength = config.maxBodyLength;
        }
        if (config.insecureHTTPParser) {
            options.insecureHTTPParser = config.insecureHTTPParser;
        }
        // Create the request
        var req = transport.request(options, function handleResponse(res) {
            if (req.aborted) return;
            // uncompress the response body transparently if required
            var stream = res;
            // return the last request in case of redirects
            var lastRequest = res.req || req;
            // if no content, is HEAD request or decompress disabled we should not decompress
            if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
                switch(res.headers['content-encoding']){
                    /*eslint default-case:0*/ case 'gzip':
                    case 'compress':
                    case 'deflate':
                        // add the unzipper to the body stream processing pipeline
                        stream = stream.pipe(zlib.createUnzip());
                        // remove the content-encoding in order to not confuse downstream operations
                        delete res.headers['content-encoding'];
                        break;
                }
            }
            var response = {
                status: res.statusCode,
                statusText: res.statusMessage,
                headers: res.headers,
                config: config,
                request: lastRequest
            };
            if (config.responseType === 'stream') {
                response.data = stream;
                settle(resolve, reject, response);
            } else {
                var responseBuffer = [];
                var totalResponseBytes = 0;
                stream.on('data', function handleStreamData(chunk) {
                    responseBuffer.push(chunk);
                    totalResponseBytes += chunk.length;
                    // make sure the content length is not over the maxContentLength if specified
                    if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                        // stream.destoy() emit aborted event before calling reject() on Node.js v16
                        rejected = true;
                        stream.destroy();
                        reject(new AxiosError('maxContentLength size of ' + config.maxContentLength + ' exceeded', AxiosError.ERR_BAD_RESPONSE, config, lastRequest));
                    }
                });
                stream.on('aborted', function handlerStreamAborted() {
                    if (rejected) {
                        return;
                    }
                    stream.destroy();
                    reject(new AxiosError('maxContentLength size of ' + config.maxContentLength + ' exceeded', AxiosError.ERR_BAD_RESPONSE, config, lastRequest));
                });
                stream.on('error', function handleStreamError(err) {
                    if (req.aborted) return;
                    reject(AxiosError.from(err, null, config, lastRequest));
                });
                stream.on('end', function handleStreamEnd() {
                    try {
                        var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
                        if (config.responseType !== 'arraybuffer') {
                            responseData = responseData.toString(config.responseEncoding);
                            if (!config.responseEncoding || config.responseEncoding === 'utf8') {
                                responseData = utils.stripBOM(responseData);
                            }
                        }
                        response.data = responseData;
                    } catch (err) {
                        reject(AxiosError.from(err, null, config, response.request, response));
                    }
                    settle(resolve, reject, response);
                });
            }
        });
        // Handle errors
        req.on('error', function handleRequestError(err) {
            // @todo remove
            // if (req.aborted && err.code !== AxiosError.ERR_FR_TOO_MANY_REDIRECTS) return;
            reject(AxiosError.from(err, null, config, req));
        });
        // set tcp keep alive to prevent drop connection by peer
        req.on('socket', function handleRequestSocket(socket) {
            // default interval of sending ack packet is 1 minute
            socket.setKeepAlive(true, 1000 * 60);
        });
        // Handle request timeout
        if (config.timeout) {
            // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
            var timeout = parseInt(config.timeout, 10);
            if (isNaN(timeout)) {
                reject(new AxiosError('error trying to parse `config.timeout` to int', AxiosError.ERR_BAD_OPTION_VALUE, config, req));
                return;
            }
            // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
            // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
            // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
            // And then these socket which be hang up will devoring CPU little by little.
            // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
            req.setTimeout(timeout, function handleRequestTimeout() {
                req.abort();
                var transitional = config.transitional || transitionalDefaults;
                reject(new AxiosError('timeout of ' + timeout + 'ms exceeded', transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, req));
            });
        }
        if (config.cancelToken || config.signal) {
            // Handle cancellation
            // eslint-disable-next-line func-names
            onCanceled = function(cancel) {
                if (req.aborted) return;
                req.abort();
                reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
            };
            config.cancelToken && config.cancelToken.subscribe(onCanceled);
            if (config.signal) {
                config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
            }
        }
        // Send the request
        if (utils.isStream(data)) {
            data.on('error', function handleStreamError(err) {
                reject(AxiosError.from(err, config, null, req));
            }).pipe(req);
        } else {
            req.end(data);
        }
    });
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/cookies.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
    return {
        write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));
            if (utils.isNumber(expires)) {
                cookie.push('expires=' + new Date(expires).toGMTString());
            }
            if (utils.isString(path)) {
                cookie.push('path=' + path);
            }
            if (utils.isString(domain)) {
                cookie.push('domain=' + domain);
            }
            if (secure === true) {
                cookie.push('secure');
            }
            document.cookie = cookie.join('; ');
        },
        read: function read(name) {
            var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
        }
    };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
    return {
        write: function write() {},
        read: function read() {
            return null;
        },
        remove: function remove() {}
    };
}();
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/parseHeaders.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent'
];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */ module.exports = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
        return parsed;
    }
    utils.forEach(headers.split('\n'), function parser(line) {
        i = line.indexOf(':');
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
            if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                return;
            }
            if (key === 'set-cookie') {
                parsed[key] = (parsed[key] ? parsed[key] : []).concat([
                    val
                ]);
            } else {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        }
    });
    return parsed;
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/isURLSameOrigin.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;
    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */ function resolveURL(url) {
        var href = url;
        if (msie) {
            // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute('href', href);
        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
        };
    }
    originURL = resolveURL(window.location.href);
    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */ return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
        return true;
    };
}();
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/parseProtocol.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function parseProtocol(url) {
    var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || '';
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/adapters/xhr.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var settle = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/settle.js [app-route] (ecmascript)");
var cookies = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/cookies.js [app-route] (ecmascript)");
var buildURL = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/buildURL.js [app-route] (ecmascript)");
var buildFullPath = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/buildFullPath.js [app-route] (ecmascript)");
var parseHeaders = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/parseHeaders.js [app-route] (ecmascript)");
var isURLSameOrigin = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/isURLSameOrigin.js [app-route] (ecmascript)");
var transitionalDefaults = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/defaults/transitional.js [app-route] (ecmascript)");
var AxiosError = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/AxiosError.js [app-route] (ecmascript)");
var CanceledError = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/cancel/CanceledError.js [app-route] (ecmascript)");
var parseProtocol = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/parseProtocol.js [app-route] (ecmascript)");
module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
            if (config.cancelToken) {
                config.cancelToken.unsubscribe(onCanceled);
            }
            if (config.signal) {
                config.signal.removeEventListener('abort', onCanceled);
            }
        }
        if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
            delete requestHeaders['Content-Type']; // Let the browser set it
        }
        var request = new XMLHttpRequest();
        // HTTP basic authentication
        if (config.auth) {
            var username = config.auth.username || '';
            var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
            requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        // Set the request timeout in MS
        request.timeout = config.timeout;
        function onloadend() {
            if (!request) {
                return;
            }
            // Prepare the response
            var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
            var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };
            settle(function _resolve(value) {
                resolve(value);
                done();
            }, function _reject(err) {
                reject(err);
                done();
            }, response);
            // Clean up request
            request = null;
        }
        if ('onloadend' in request) {
            // Use onloadend if available
            request.onloadend = onloadend;
        } else {
            // Listen for ready state to emulate onloadend
            request.onreadystatechange = function handleLoad() {
                if (!request || request.readyState !== 4) {
                    return;
                }
                // The request errored out and we didn't get a response, this will be
                // handled by onerror instead
                // With one exception: request that using file: protocol, most browsers
                // will return status as 0 even though it's a successful request
                if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
                    return;
                }
                // readystate handler is calling before onerror or ontimeout handlers,
                // so we should call onloadend on the next 'tick'
                setTimeout(onloadend);
            };
        }
        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
            if (!request) {
                return;
            }
            reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));
            // Clean up request
            request = null;
        };
        // Handle low level network errors
        request.onerror = function handleError() {
            // Real errors are hidden from us by the browser
            // onerror should only fire if it's a network error
            reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request, request));
            // Clean up request
            request = null;
        };
        // Handle timeout
        request.ontimeout = function handleTimeout() {
            var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
            var transitional = config.transitional || transitionalDefaults;
            if (config.timeoutErrorMessage) {
                timeoutErrorMessage = config.timeoutErrorMessage;
            }
            reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, request));
            // Clean up request
            request = null;
        };
        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (utils.isStandardBrowserEnv()) {
            // Add xsrf header
            var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;
            if (xsrfValue) {
                requestHeaders[config.xsrfHeaderName] = xsrfValue;
            }
        }
        // Add headers to the request
        if ('setRequestHeader' in request) {
            utils.forEach(requestHeaders, function setRequestHeader(val, key) {
                if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
                    // Remove Content-Type if data is undefined
                    delete requestHeaders[key];
                } else {
                    // Otherwise add header to the request
                    request.setRequestHeader(key, val);
                }
            });
        }
        // Add withCredentials to request if needed
        if (!utils.isUndefined(config.withCredentials)) {
            request.withCredentials = !!config.withCredentials;
        }
        // Add responseType to request if needed
        if (responseType && responseType !== 'json') {
            request.responseType = config.responseType;
        }
        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') {
            request.addEventListener('progress', config.onDownloadProgress);
        }
        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) {
            request.upload.addEventListener('progress', config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
            // Handle cancellation
            // eslint-disable-next-line func-names
            onCanceled = function(cancel) {
                if (!request) {
                    return;
                }
                reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
                request.abort();
                request = null;
            };
            config.cancelToken && config.cancelToken.subscribe(onCanceled);
            if (config.signal) {
                config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
            }
        }
        if (!requestData) {
            requestData = null;
        }
        var protocol = parseProtocol(fullPath);
        if (protocol && [
            'http',
            'https',
            'file'
        ].indexOf(protocol) === -1) {
            reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
            return;
        }
        // Send the request
        request.send(requestData);
    });
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/defaults/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var normalizeHeaderName = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/normalizeHeaderName.js [app-route] (ecmascript)");
var AxiosError = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/AxiosError.js [app-route] (ecmascript)");
var transitionalDefaults = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/defaults/transitional.js [app-route] (ecmascript)");
var toFormData = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/toFormData.js [app-route] (ecmascript)");
var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
};
function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
    }
}
function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
        // For browsers use XHR adapter
        adapter = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/adapters/xhr.js [app-route] (ecmascript)");
    } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
        // For node use HTTP adapter
        adapter = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/adapters/http.js [app-route] (ecmascript)");
    }
    return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
    if (utils.isString(rawValue)) {
        try {
            (parser || JSON.parse)(rawValue);
            return utils.trim(rawValue);
        } catch (e) {
            if (e.name !== 'SyntaxError') {
                throw e;
            }
        }
    }
    return (encoder || JSON.stringify)(rawValue);
}
var defaults = {
    transitional: transitionalDefaults,
    adapter: getDefaultAdapter(),
    transformRequest: [
        function transformRequest(data, headers) {
            normalizeHeaderName(headers, 'Accept');
            normalizeHeaderName(headers, 'Content-Type');
            if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
                return data;
            }
            if (utils.isArrayBufferView(data)) {
                return data.buffer;
            }
            if (utils.isURLSearchParams(data)) {
                setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
                return data.toString();
            }
            var isObjectPayload = utils.isObject(data);
            var contentType = headers && headers['Content-Type'];
            var isFileList;
            if ((isFileList = utils.isFileList(data)) || isObjectPayload && contentType === 'multipart/form-data') {
                var _FormData = this.env && this.env.FormData;
                return toFormData(isFileList ? {
                    'files[]': data
                } : data, _FormData && new _FormData());
            } else if (isObjectPayload || contentType === 'application/json') {
                setContentTypeIfUnset(headers, 'application/json');
                return stringifySafely(data);
            }
            return data;
        }
    ],
    transformResponse: [
        function transformResponse(data) {
            var transitional = this.transitional || defaults.transitional;
            var silentJSONParsing = transitional && transitional.silentJSONParsing;
            var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
            var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';
            if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    if (strictJSONParsing) {
                        if (e.name === 'SyntaxError') {
                            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
                        }
                        throw e;
                    }
                }
            }
            return data;
        }
    ],
    /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */ timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    env: {
        FormData: __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/defaults/env/FormData.js [app-route] (ecmascript)")
    },
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
    },
    headers: {
        common: {
            'Accept': 'application/json, text/plain, */*'
        }
    }
};
utils.forEach([
    'delete',
    'get',
    'head'
], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
});
utils.forEach([
    'post',
    'put',
    'patch'
], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/transformData.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var defaults = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/defaults/index.js [app-route] (ecmascript)");
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */ module.exports = function transformData(data, headers, fns) {
    var context = this || defaults;
    /*eslint no-param-reassign:0*/ utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
    });
    return data;
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/dispatchRequest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var transformData = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/transformData.js [app-route] (ecmascript)");
var isCancel = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/cancel/isCancel.js [app-route] (ecmascript)");
var defaults = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/defaults/index.js [app-route] (ecmascript)");
var CanceledError = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/cancel/CanceledError.js [app-route] (ecmascript)");
/**
 * Throws a `CanceledError` if cancellation has been requested.
 */ function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
    }
    if (config.signal && config.signal.aborted) {
        throw new CanceledError();
    }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */ module.exports = function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    // Ensure headers exist
    config.headers = config.headers || {};
    // Transform request data
    config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
    // Flatten headers
    config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    utils.forEach([
        'delete',
        'get',
        'head',
        'post',
        'put',
        'patch',
        'common'
    ], function cleanHeaderConfig(method) {
        delete config.headers[method];
    });
    var adapter = config.adapter || defaults.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        // Transform response data
        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
        return response;
    }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
            throwIfCancellationRequested(config);
            // Transform response data
            if (reason && reason.response) {
                reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
            }
        }
        return Promise.reject(reason);
    });
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/mergeConfig.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */ module.exports = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};
    function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
            return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
            return utils.merge({}, source);
        } else if (utils.isArray(source)) {
            return source.slice();
        }
        return source;
    }
    // eslint-disable-next-line consistent-return
    function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
            return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
            return getMergedValue(undefined, config1[prop]);
        }
    }
    // eslint-disable-next-line consistent-return
    function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
            return getMergedValue(undefined, config2[prop]);
        }
    }
    // eslint-disable-next-line consistent-return
    function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
            return getMergedValue(undefined, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
            return getMergedValue(undefined, config1[prop]);
        }
    }
    // eslint-disable-next-line consistent-return
    function mergeDirectKeys(prop) {
        if (prop in config2) {
            return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
            return getMergedValue(undefined, config1[prop]);
        }
    }
    var mergeMap = {
        'url': valueFromConfig2,
        'method': valueFromConfig2,
        'data': valueFromConfig2,
        'baseURL': defaultToConfig2,
        'transformRequest': defaultToConfig2,
        'transformResponse': defaultToConfig2,
        'paramsSerializer': defaultToConfig2,
        'timeout': defaultToConfig2,
        'timeoutMessage': defaultToConfig2,
        'withCredentials': defaultToConfig2,
        'adapter': defaultToConfig2,
        'responseType': defaultToConfig2,
        'xsrfCookieName': defaultToConfig2,
        'xsrfHeaderName': defaultToConfig2,
        'onUploadProgress': defaultToConfig2,
        'onDownloadProgress': defaultToConfig2,
        'decompress': defaultToConfig2,
        'maxContentLength': defaultToConfig2,
        'maxBodyLength': defaultToConfig2,
        'beforeRedirect': defaultToConfig2,
        'transport': defaultToConfig2,
        'httpAgent': defaultToConfig2,
        'httpsAgent': defaultToConfig2,
        'cancelToken': defaultToConfig2,
        'socketPath': defaultToConfig2,
        'responseEncoding': defaultToConfig2,
        'validateStatus': mergeDirectKeys
    };
    utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
    });
    return config;
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/validator.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var VERSION = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/env/data.js [app-route] (ecmascript)").version;
var AxiosError = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/AxiosError.js [app-route] (ecmascript)");
var validators = {};
// eslint-disable-next-line func-names
[
    'object',
    'boolean',
    'number',
    'function',
    'string',
    'symbol'
].forEach(function(type, i) {
    validators[type] = function validator(thing) {
        return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
});
var deprecatedWarnings = {};
/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */ validators.transitional = function transitional(validator, version, message) {
    function formatMessage(opt, desc) {
        return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
    }
    // eslint-disable-next-line func-names
    return function(value, opt, opts) {
        if (validator === false) {
            throw new AxiosError(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), AxiosError.ERR_DEPRECATED);
        }
        if (version && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true;
            // eslint-disable-next-line no-console
            console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
        }
        return validator ? validator(value, opt, opts) : true;
    };
};
/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */ function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
        throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
    }
    var keys = Object.keys(options);
    var i = keys.length;
    while(i-- > 0){
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
            var value = options[opt];
            var result = value === undefined || validator(value, opt, options);
            if (result !== true) {
                throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
            }
            continue;
        }
        if (allowUnknown !== true) {
            throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
        }
    }
}
module.exports = {
    assertOptions: assertOptions,
    validators: validators
};
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/Axios.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var buildURL = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/buildURL.js [app-route] (ecmascript)");
var InterceptorManager = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/InterceptorManager.js [app-route] (ecmascript)");
var dispatchRequest = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/dispatchRequest.js [app-route] (ecmascript)");
var mergeConfig = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/mergeConfig.js [app-route] (ecmascript)");
var buildFullPath = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/buildFullPath.js [app-route] (ecmascript)");
var validator = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/validator.js [app-route] (ecmascript)");
var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */ function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */ Axios.prototype.request = function request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/ // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
        config = config || {};
        config.url = configOrUrl;
    } else {
        config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    // Set config.method
    if (config.method) {
        config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
    } else {
        config.method = 'get';
    }
    var transitional = config.transitional;
    if (transitional !== undefined) {
        validator.assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean),
            forcedJSONParsing: validators.transitional(validators.boolean),
            clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
    }
    // filter out skipped interceptors
    var requestInterceptorChain = [];
    var synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
            return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    var responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    var promise;
    if (!synchronousRequestInterceptors) {
        var chain = [
            dispatchRequest,
            undefined
        ];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while(chain.length){
            promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
    }
    var newConfig = config;
    while(requestInterceptorChain.length){
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
            newConfig = onFulfilled(newConfig);
        } catch (error) {
            onRejected(error);
            break;
        }
    }
    try {
        promise = dispatchRequest(newConfig);
    } catch (error) {
        return Promise.reject(error);
    }
    while(responseInterceptorChain.length){
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
    }
    return promise;
};
Axios.prototype.getUri = function getUri(config) {
    config = mergeConfig(this.defaults, config);
    var fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
};
// Provide aliases for supported request methods
utils.forEach([
    'delete',
    'get',
    'head',
    'options'
], function forEachMethodNoData(method) {
    /*eslint func-names:0*/ Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
            method: method,
            url: url,
            data: (config || {}).data
        }));
    };
});
utils.forEach([
    'post',
    'put',
    'patch'
], function forEachMethodWithData(method) {
    /*eslint func-names:0*/ function generateHTTPMethod(isForm) {
        return function httpMethod(url, data, config) {
            return this.request(mergeConfig(config || {}, {
                method: method,
                headers: isForm ? {
                    'Content-Type': 'multipart/form-data'
                } : {},
                url: url,
                data: data
            }));
        };
    }
    Axios.prototype[method] = generateHTTPMethod();
    Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});
module.exports = Axios;
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/axios.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var bind = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/bind.js [app-route] (ecmascript)");
var Axios = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/Axios.js [app-route] (ecmascript)");
var mergeConfig = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/mergeConfig.js [app-route] (ecmascript)");
var defaults = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/defaults/index.js [app-route] (ecmascript)");
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */ function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);
    // Copy axios.prototype to instance
    utils.extend(instance, Axios.prototype, context);
    // Copy context to instance
    utils.extend(instance, context);
    // Factory for creating new instances
    instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };
    return instance;
}
// Create the default instance to be exported
var axios = createInstance(defaults);
// Expose Axios class to allow class inheritance
axios.Axios = Axios;
// Expose Cancel & CancelToken
axios.CanceledError = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/cancel/CanceledError.js [app-route] (ecmascript)");
axios.CancelToken = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/cancel/CancelToken.js [app-route] (ecmascript)");
axios.isCancel = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/cancel/isCancel.js [app-route] (ecmascript)");
axios.VERSION = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/env/data.js [app-route] (ecmascript)").version;
axios.toFormData = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/toFormData.js [app-route] (ecmascript)");
// Expose AxiosError class
axios.AxiosError = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/core/AxiosError.js [app-route] (ecmascript)");
// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;
// Expose all/spread
axios.all = function all(promises) {
    return Promise.all(promises);
};
axios.spread = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/spread.js [app-route] (ecmascript)");
// Expose isAxiosError
axios.isAxiosError = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/helpers/isAxiosError.js [app-route] (ecmascript)");
module.exports = axios;
// Allow use of default import syntax in TypeScript
module.exports.default = axios;
}),
"[project]/node_modules/open-jsonrpc-provider/node_modules/axios/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/lib/axios.js [app-route] (ecmascript)");
}),
"[project]/node_modules/open-jsonrpc-provider/lib.esm/BaseProvider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BaseProvider",
    ()=>BaseProvider,
    "JsonRpcError",
    ()=>JsonRpcError
]);
class JsonRpcError extends Error {
    constructor(message, code, data){
        super(message);
        this.code = code;
        this.data = data;
    }
}
class BaseProvider {
    constructor(options){
        // super();
        this.url = options.url;
        this.timeout = options.timeout || 30000; // 30 seconds
        this.retry = options.retry || 3;
    }
    _transport(data) {
        throw new Error('_transport not implemented');
    }
    _transportBatch(data) {
        throw new Error('_transportBatch not implemented');
    }
    id() {
        const id = (Date.now() + Math.random()) * 10000;
        return Number(id);
    }
    buildRpcPayload(req) {
        return {
            jsonrpc: '2.0',
            method: req.method,
            params: req.params,
            id: this.id()
        };
    }
    async request(req) {
        const data = await this._transport(this.buildRpcPayload(req));
        const { result, error } = data;
        if (error) throw new JsonRpcError(error.message, error.code, error.data);
        return result;
    }
    async requestBatch(batch) {
        const data = await this._transportBatch(batch.map(this.buildRpcPayload));
        return data.map(({ result, error })=>{
            return error ? new JsonRpcError(error.message, error.code, error.data) : result;
        });
    }
    // legacy methods
    send(method, params) {
        return this.request({
            method,
            params
        });
    }
    sendAsync(payload, callback) {
        this._transport(payload).then((data)=>callback(null, data)).catch((err)=>callback(err));
    }
    call(method, ...args) {
        return this.request({
            method,
            params: args
        });
    }
    close() {}
}
}),
"[project]/node_modules/open-jsonrpc-provider/lib.esm/helper.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "awaitTimeout",
    ()=>awaitTimeout,
    "sleep",
    ()=>sleep
]);
function sleep(time = 1000) {
    return new Promise((resolve, reject)=>setTimeout(resolve, time));
}
function awaitTimeout(promise, timeout) {
    return new Promise((resolve, reject)=>{
        const error = new Error(`Timeout after ${timeout} ms`);
        const timer = setTimeout(()=>reject(error), timeout);
        promise.then(resolve).catch(reject).finally(()=>clearTimeout(timer));
    });
}
}),
"[project]/node_modules/open-jsonrpc-provider/lib.esm/HttpProvider.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HttpProvider",
    ()=>HttpProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$open$2d$jsonrpc$2d$provider$2f$node_modules$2f$axios$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/open-jsonrpc-provider/node_modules/axios/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$open$2d$jsonrpc$2d$provider$2f$lib$2e$esm$2f$BaseProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/open-jsonrpc-provider/lib.esm/BaseProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$open$2d$jsonrpc$2d$provider$2f$lib$2e$esm$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/open-jsonrpc-provider/lib.esm/helper.js [app-route] (ecmascript)");
;
;
;
class HttpProvider extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$open$2d$jsonrpc$2d$provider$2f$lib$2e$esm$2f$BaseProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BaseProvider"] {
    constructor(options){
        super(options);
    }
    /**
     * @param data
     * @returns
     */ async _transport(data) {
        let leftTries = this.retry;
        let error = null;
        while(leftTries > 0){
            try {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$open$2d$jsonrpc$2d$provider$2f$node_modules$2f$axios$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
                    url: this.url,
                    method: 'post',
                    data,
                    timeout: this.timeout
                });
                return response.data;
            } catch (_error) {
                error = _error;
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$open$2d$jsonrpc$2d$provider$2f$lib$2e$esm$2f$helper$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sleep"])(1000); // sleep 1 second
            leftTries--;
        }
        throw error;
    }
    _transportBatch(data) {
        // @ts-ignore
        return this._transport(data);
    }
}
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/StorageNode.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StorageNode",
    ()=>StorageNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$open$2d$jsonrpc$2d$provider$2f$lib$2e$esm$2f$HttpProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/open-jsonrpc-provider/lib.esm/HttpProvider.js [app-route] (ecmascript)");
;
class StorageNode extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$open$2d$jsonrpc$2d$provider$2f$lib$2e$esm$2f$HttpProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpProvider"] {
    constructor(url){
        super({
            url
        });
    }
    async getStatus() {
        const res = await super.request({
            method: 'zgs_getStatus'
        });
        return res;
    }
    async uploadSegment(seg) {
        const res = await super.request({
            method: 'zgs_uploadSegment',
            params: [
                seg
            ]
        });
        return res;
    }
    async uploadSegments(segs) {
        const res = await super.request({
            method: 'zgs_uploadSegments',
            params: [
                segs
            ]
        });
        return res;
    }
    // UploadSegmentByTxSeq Call zgs_uploadSegmentByTxSeq RPC to upload a segment to the node.
    async uploadSegmentByTxSeq(seg, txSeq) {
        const res = await super.request({
            method: 'zgs_uploadSegmentByTxSeq',
            params: [
                seg,
                txSeq
            ]
        });
        return res;
    }
    // UploadSegmentsByTxSeq Call zgs_uploadSegmentsByTxSeq RPC to upload a slice of segments to the node.
    async uploadSegmentsByTxSeq(segs, txSeq) {
        const res = await super.request({
            method: 'zgs_uploadSegmentsByTxSeq',
            params: [
                segs,
                txSeq
            ]
        });
        return res;
    }
    async downloadSegment(root, startIndex, endIndx) {
        var seg = await super.request({
            method: 'zgs_downloadSegment',
            params: [
                root,
                startIndex,
                endIndx
            ]
        });
        return seg;
    }
    async downloadSegmentWithProof(root, index) {
        const seg = await super.request({
            method: 'zgs_downloadSegmentWithProof',
            params: [
                root,
                index
            ]
        });
        return seg;
    }
    // DownloadSegmentByTxSeq Call zgs_downloadSegmentByTxSeq RPC to download a segment from the node.
    async downloadSegmentByTxSeq(txSeq, startIndex, endIndex) {
        const seg = await super.request({
            method: 'zgs_downloadSegmentByTxSeq',
            params: [
                txSeq,
                startIndex,
                endIndex
            ]
        });
        return seg;
    }
    // DownloadSegmentWithProofByTxSeq Call zgs_downloadSegmentWithProofByTxSeq RPC to download a segment along with its merkle proof from the node.
    async downloadSegmentWithProofByTxSeq(txSeq, index) {
        const seg = await super.request({
            method: 'zgs_downloadSegmentWithProofByTxSeq',
            params: [
                txSeq,
                index
            ]
        });
        return seg;
    }
    // GetSectorProof Call zgs_getSectorProof RPC to get the proof of a sector.
    async getSectorProof(sectorIndex, root) {
        const seg = await super.request({
            method: 'zgs_getSectorProof',
            params: [
                sectorIndex,
                root
            ]
        });
        return seg;
    }
    async getFileInfo(root, needAvailable) {
        const info = await super.request({
            method: 'zgs_getFileInfo',
            params: [
                root,
                needAvailable
            ]
        });
        return info;
    }
    async getFileInfoByTxSeq(txSeq) {
        const info = await super.request({
            method: 'zgs_getFileInfoByTxSeq',
            params: [
                txSeq
            ]
        });
        return info;
    }
    async getShardConfig() {
        const config = await super.request({
            method: 'zgs_getShardConfig'
        });
        return config;
    }
} //# sourceMappingURL=StorageNode.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/StorageKv.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StorageKv",
    ()=>StorageKv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$open$2d$jsonrpc$2d$provider$2f$lib$2e$esm$2f$HttpProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/open-jsonrpc-provider/lib.esm/HttpProvider.js [app-route] (ecmascript)");
;
class StorageKv extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$open$2d$jsonrpc$2d$provider$2f$lib$2e$esm$2f$HttpProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpProvider"] {
    constructor(url){
        super({
            url
        });
    }
    async getValue(streamId, key, startIndex, length, version) {
        let params = [
            streamId,
            key,
            startIndex,
            length
        ];
        if (version !== undefined) {
            params.push(version);
        }
        const res = await super.request({
            method: 'kv_getValue',
            params: params
        });
        return res;
    }
    async getNext(streamId, key, startIndex, length, inclusive, version) {
        let params = [
            streamId,
            key,
            startIndex,
            length,
            inclusive
        ];
        if (version !== undefined) {
            params.push(version);
        }
        const res = await super.request({
            method: 'kv_getNext',
            params: params
        });
        return res;
    }
    async getPrev(streamId, key, startIndex, length, inclusive, version) {
        let params = [
            streamId,
            key,
            startIndex,
            length,
            inclusive
        ];
        if (version !== undefined) {
            params.push(version);
        }
        const res = await super.request({
            method: 'kv_getPrev',
            params: params
        });
        return res;
    }
    async getFirst(streamId, startIndex, length, version) {
        let params = [
            streamId,
            startIndex,
            length
        ];
        if (version !== undefined) {
            params.push(version);
        }
        const res = await super.request({
            method: 'kv_getFirst',
            params: params
        });
        return res;
    }
    async getLast(streamId, startIndex, length, version) {
        let params = [
            streamId,
            startIndex,
            length
        ];
        if (version !== undefined) {
            params.push(version);
        }
        const res = await super.request({
            method: 'kv_getLast',
            params: params
        });
        return res;
    }
    async getTransactionResult(txSeq) {
        const res = await super.request({
            method: 'kv_getTransactionResult',
            params: [
                txSeq.toString()
            ]
        });
        return res;
    }
    async getHoldingStreamIds() {
        const res = await super.request({
            method: 'kv_getHoldingStreamIds'
        });
        return res;
    }
    async hasWritePermission(account, streamId, key, version) {
        let params = [
            account,
            streamId,
            key
        ];
        if (version !== undefined) {
            params.push(version);
        }
        const res = await super.request({
            method: 'kv_hasWritePermission',
            params: params
        });
        return res;
    }
    async isAdmin(account, streamId, version) {
        let params = [
            account,
            streamId
        ];
        if (version !== undefined) {
            params.push(version);
        }
        const res = await super.request({
            method: 'kv_IsAdmin',
            params: params
        });
        return res;
    }
    async isSpecialKey(stremId, key, version) {
        let params = [
            stremId,
            key
        ];
        if (version !== undefined) {
            params.push(version);
        }
        const res = await super.request({
            method: 'kv_isSpecialKey',
            params: params
        });
        return res;
    }
    async isWriterOfKey(account, streamId, key, version) {
        let params = [
            account,
            streamId,
            key
        ];
        if (version !== undefined) {
            params.push(version);
        }
        const res = await super.request({
            method: 'kv_isWriterOfKey',
            params: params
        });
        return res;
    }
    async isWriterOfStream(account, streamId, version) {
        let params = [
            account,
            streamId
        ];
        if (version !== undefined) {
            params.push(version);
        }
        const res = await super.request({
            method: 'kv_isWriterOfStream',
            params: params
        });
        return res;
    }
} //# sourceMappingURL=StorageKv.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/types.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
 //# sourceMappingURL=types.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "isValidConfig",
    ()=>isValidConfig
]);
function isValidConfig(config) {
    // NumShard should be larger than zero and be power of 2
    return config.numShard > 0 && (config.numShard & config.numShard - 1) === 0 && config.shardId < config.numShard;
} //# sourceMappingURL=utils.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$StorageNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/StorageNode.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$StorageKv$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/StorageKv.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/utils.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculatePrice",
    ()=>calculatePrice,
    "getShardConfigs",
    ()=>getShardConfigs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/utils.js [app-route] (ecmascript)");
;
async function getShardConfigs(nodes) {
    var configs = [];
    for (const cNode of nodes){
        const cConfig = await cNode.getShardConfig();
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValidConfig"])(cConfig)) {
            return null;
        }
        configs.push(cConfig);
    }
    return configs;
}
function calculatePrice(submission, pricePerSector) {
    let sectors = 0;
    for (const node of submission.nodes){
        sectors += 1 << Number(node.height.toString());
    }
    return BigInt(sectors) * pricePerSector;
} //# sourceMappingURL=utils.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/Downloader.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Downloader",
    ()=>Downloader
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/constant.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/utils/base64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/utils.js [app-route] (ecmascript)");
;
;
;
;
;
class Downloader {
    nodes;
    shardConfigs;
    startSegmentIndex;
    endSegmentIndex;
    constructor(nodes){
        this.nodes = nodes;
        this.shardConfigs = [];
        this.startSegmentIndex = 0;
        this.endSegmentIndex = 0;
    }
    async downloadFile(root, filePath, proof) {
        var [info, err] = await this.queryFile(root);
        if (err != null || info === null) {
            return new Error(err?.message);
        }
        if (!info.finalized) {
            return new Error('File not finalized');
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkExist"])(filePath)) {
            return new Error('Wrong path, provide a file path which does not exist.');
        }
        let shardConfigs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getShardConfigs"])(this.nodes);
        if (shardConfigs === null) {
            return new Error('Failed to get shard configs');
        }
        this.shardConfigs = shardConfigs;
        err = await this.downloadFileHelper(filePath, info, proof);
        return err;
    }
    async queryFile(root) {
        let fileInfo = null;
        for (let node of this.nodes){
            const currInfo = await node.getFileInfo(root, true);
            if (currInfo === null) {
                return [
                    null,
                    new Error('File not found on node ' + node.url)
                ];
            } else if (fileInfo === null) {
                fileInfo = currInfo;
            }
        }
        return [
            fileInfo,
            null
        ];
    }
    // TODO: add proof check
    async downloadTask(info, segmentOffset, taskInd, numChunks, proof) {
        const segmentIndex = segmentOffset + taskInd;
        const startIndex = segmentIndex * __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_MAX_CHUNKS"];
        var endIndex = startIndex + __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_MAX_CHUNKS"];
        if (endIndex > numChunks) {
            endIndex = numChunks;
        }
        let segment = null;
        for(let i = 0; i < this.shardConfigs.length; i++){
            let nodeIndex = (taskInd + i) % this.shardConfigs.length;
            if ((this.startSegmentIndex + segmentIndex) % this.shardConfigs[nodeIndex].numShard != this.shardConfigs[nodeIndex].shardId) {
                continue;
            }
            // try download from current node
            segment = await this.nodes[nodeIndex].downloadSegmentByTxSeq(info.tx.seq, startIndex, endIndex);
            if (segment === null) {
                continue;
            }
            var segArray = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["decodeBase64"])(segment);
            if (this.startSegmentIndex + segmentIndex == this.endSegmentIndex) {
                const lastChunkSize = info.tx.size % __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"];
                if (lastChunkSize > 0) {
                    const paddings = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"] - lastChunkSize;
                    segArray = segArray.slice(0, segArray.length - paddings);
                }
            }
            return [
                segArray,
                null
            ];
        }
        return [
            new Uint8Array(),
            new Error('No storage node holds segment with index ' + segmentIndex)
        ];
    }
    async downloadFileHelper(filePath, info, proof) {
        const shardConfigs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getShardConfigs"])(this.nodes);
        if (shardConfigs == null) {
            return new Error('Failed to get shard configs');
        }
        const segmentOffset = 0;
        const numChunks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetSplitNum"])(info.tx.size, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"]);
        this.startSegmentIndex = Math.floor(info.tx.startEntryIndex / __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_MAX_CHUNKS"]);
        this.endSegmentIndex = Math.floor((info.tx.startEntryIndex + (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetSplitNum"])(info.tx.size, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"]) - 1) / __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_MAX_CHUNKS"]);
        const numTasks = this.endSegmentIndex - this.startSegmentIndex + 1;
        for(let taskInd = 0; taskInd < numTasks; taskInd++){
            let [segArray, err] = await this.downloadTask(info, segmentOffset, taskInd, numChunks, proof);
            if (err != null) {
                return err;
            }
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].appendFileSync(filePath, segArray);
        }
        return null;
    }
} //# sourceMappingURL=Downloader.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/common/segment_tree.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "insert",
    ()=>insert,
    "pushdown",
    ()=>pushdown
]);
function pushdown(node) {
    if (node.childs === null) {
        node.childs = [];
        for(let i = 0; i < 2; i += 1){
            node.childs.push({
                childs: null,
                numShard: node.numShard << 1,
                replica: 0,
                lazyTags: 0
            });
        }
    }
    for(let i = 0; i < 2; i += 1){
        node.childs[i].replica += node.lazyTags;
        node.childs[i].lazyTags += node.lazyTags;
    }
    node.lazyTags = 0;
}
function insert(node, numShard, shardId, expectedReplica) {
    if (node.replica >= expectedReplica) {
        return false;
    }
    if (node.numShard === numShard) {
        node.replica += 1;
        node.lazyTags += 1;
        return true;
    }
    pushdown(node);
    if (node.childs === null) {
        throw new Error('node.childs is null');
    }
    let inserted = insert(node.childs[shardId % 2], numShard, shardId >> 1, expectedReplica);
    node.replica = Math.min(node.childs[0].replica, node.childs[1].replica);
    return inserted;
} //# sourceMappingURL=segment_tree.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/common/types.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
;
 //# sourceMappingURL=types.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/common/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkReplica",
    ()=>checkReplica,
    "selectNodes",
    ()=>selectNodes
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$common$2f$segment_tree$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/common/segment_tree.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$common$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/common/types.js [app-route] (ecmascript)");
;
;
;
function selectNodes(nodes, expectedReplica) {
    if (expectedReplica === 0) {
        return [
            [],
            false
        ];
    }
    nodes.sort((a, b)=>{
        if (a.config.numShard === b.config.numShard) {
            return a.config.shardId - b.config.shardId;
        }
        return a.config.numShard - b.config.numShard;
    });
    let root = {
        childs: null,
        numShard: 1,
        replica: 0,
        lazyTags: 0
    };
    let selectedNodes = [];
    for(let i = 0; i < nodes.length; i += 1){
        let node = nodes[i];
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$common$2f$segment_tree$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["insert"])(root, node.config.numShard, node.config.shardId, expectedReplica)) {
            selectedNodes.push(node);
        }
        if (root.replica >= expectedReplica) {
            return [
                selectedNodes,
                true
            ];
        }
    }
    return [
        [],
        false
    ];
}
function checkReplica(shardConfigs, expectedReplica) {
    let shardedNodes = [];
    for(let i = 0; i < shardConfigs.length; i += 1){
        shardedNodes.push({
            url: '',
            config: {
                numShard: shardConfigs[i].numShard,
                shardId: shardConfigs[i].shardId
            },
            latency: 0,
            since: 0
        });
    }
    let [_, ok] = selectNodes(shardedNodes, expectedReplica);
    return ok;
} //# sourceMappingURL=index.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/Uploader.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Uploader",
    ()=>Uploader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/constant.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/utils/base64.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/ethers.js [app-route] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$common$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/common/index.js [app-route] (ecmascript) <locals>");
;
;
;
;
;
class Uploader {
    nodes;
    provider;
    flow;
    gasPrice;
    gasLimit;
    constructor(nodes, providerRpc, flow, gasPrice = BigInt('0'), gasLimit = BigInt('0')){
        this.nodes = nodes;
        this.provider = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].JsonRpcProvider(providerRpc);
        this.flow = flow;
        this.gasPrice = gasPrice;
        this.gasLimit = gasLimit;
    }
    async checkExistence(root) {
        for (let client of this.nodes){
            let info = await client.getFileInfo(root, true);
            if (info !== null && info.finalized) {
                return true;
            }
        }
        return false;
    }
    async uploadFile(file, opts, retryOpts) {
        var [tree, err] = await file.merkleTree();
        if (err != null || tree == null || tree.rootHash() == null) {
            return [
                '',
                new Error('Failed to create Merkle tree')
            ];
        }
        console.log('Data prepared to upload', 'root=' + tree.rootHash(), 'size=' + file.size(), 'numSegments=' + file.numSegments(), 'numChunks=' + file.numChunks());
        const exist = await this.checkExistence(tree.rootHash());
        if (exist) {
            return [
                '',
                new Error('Data already exists')
            ];
        }
        var [submission, err] = await file.createSubmission(opts.tags);
        if (err !== null || submission === null) {
            return [
                '',
                new Error('Failed to create submission')
            ];
        }
        let marketAddr = await this.flow.market();
        let marketContract = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMarketContract"])(marketAddr, this.provider);
        let pricePerSector = await marketContract.pricePerSector();
        let fee = BigInt('0');
        if (opts.fee > 0) {
            fee = opts.fee;
        } else {
            fee = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculatePrice"])(submission, pricePerSector);
        }
        var txOpts = {
            value: fee,
            nonce: opts.nonce
        };
        if (this.gasPrice > 0) {
            txOpts.gasPrice = this.gasPrice;
        } else {
            let suggestedGasPrice = (await this.provider.getFeeData()).gasPrice;
            if (suggestedGasPrice === null) {
                return [
                    '',
                    new Error('Failed to get suggested gas price, set your own gas price')
                ];
            }
            txOpts.gasPrice = suggestedGasPrice;
        }
        if (this.gasLimit > 0) {
            txOpts.gasLimit = this.gasLimit;
        }
        console.log('Submitting transaction with storage fee:', fee);
        let receipt = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["txWithGasAdjustment"])(this.flow, this.provider, 'submit', [
            submission
        ], txOpts, retryOpts);
        if (receipt === null) {
            return [
                '',
                new Error('Failed to submit transaction')
            ];
        }
        console.log('Transaction hash:', receipt.hash);
        const txSeqs = await this.processLogs(receipt);
        if (txSeqs.length === 0) {
            return [
                '',
                new Error('Failed to get txSeqs')
            ];
        }
        console.log('Transaction sequence number:', txSeqs[0]);
        let info = await this.waitForLogEntry(txSeqs[0], false);
        if (info === null) {
            return [
                '',
                new Error('Failed to get log entry')
            ];
        }
        const tasks = await this.segmentUpload(info, file, tree, opts);
        if (tasks === null) {
            return [
                '',
                new Error('Failed to get upload tasks')
            ];
        }
        console.log('Processing tasks in parallel with ', tasks.length, ' tasks...');
        err = await this.processTasksInParallel(file, tree, tasks).then(()=>console.log('All tasks processed')).catch((error)=>{
            return error;
        });
        if (err !== undefined) {
            return [
                '',
                err
            ];
        }
        await this.waitForLogEntry(info.tx.seq, true);
        return [
            receipt.hash,
            null
        ];
    }
    async processLogs(receipt) {
        const contractAddress = (await this.flow.getAddress()).toLowerCase();
        const signature = this.flow.interface.getEvent('Submit');
        var txSeqs = [];
        for (const log of receipt.logs){
            // Only process logs that are emitted by this contract.
            if (log.address.toLowerCase() !== contractAddress) {
                continue;
            }
            if (log.topics[0] !== signature.topicHash) {
                continue;
            }
            try {
                // Use the contract's interface to parse the log.
                const parsedLog = this.flow.interface.parseLog(log);
                if (!parsedLog) {
                    continue;
                }
                // Check if the event name is "Submit"
                if (parsedLog.name === 'Submit') {
                    const event = parsedLog.args;
                    txSeqs.push(Number(event.submissionIndex));
                }
            } catch (error) {
                continue;
            }
        }
        return txSeqs;
    }
    async waitForReceipt(txHash, opts) {
        var receipt = null;
        if (opts === undefined) {
            opts = {
                Retries: 10,
                Interval: 5,
                MaxGasPrice: 0
            };
        }
        let nTries = 0;
        while(nTries < opts.Retries){
            receipt = await this.provider.getTransactionReceipt(txHash);
            if (receipt !== null && receipt.status == 1) {
                return receipt;
            }
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["delay"])(opts.Interval * 1000);
            nTries++;
        }
        return null;
    }
    async waitForLogEntry(txSeq, finalityRequired) {
        console.log('Wait for log entry on storage node');
        let info = null;
        while(true){
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["delay"])(1000);
            let ok = true;
            for (let client of this.nodes){
                info = await client.getFileInfoByTxSeq(txSeq);
                if (info === null) {
                    let logMsg = 'Log entry is unavailable yet';
                    let status = await client.getStatus();
                    if (status !== null) {
                        const logSyncHeight = status.logSyncHeight;
                        logMsg = `Log entry is unavailable yet, zgsNodeSyncHeight=${logSyncHeight}`;
                    }
                    console.log(logMsg);
                    ok = false;
                    break;
                }
                if (finalityRequired && !info.finalized) {
                    console.log('Log entry is available, but not finalized yet, ', client, info);
                    ok = false;
                    break;
                }
            }
            if (ok) {
                break;
            }
        }
        return info;
    }
    // Function to process all tasks in parallel
    async processTasksInParallel(file, tree, tasks) {
        const taskPromises = tasks.map((task)=>this.uploadTask(file, tree, task));
        return await Promise.all(taskPromises);
    }
    nextSgmentIndex(config, startIndex) {
        if (config.numShard > 2) {
            return startIndex;
        }
        return Math.floor((startIndex + config.numShard - 1 - config.shardId) / config.numShard) * config.numShard + config.shardId;
    }
    async segmentUpload(info, file, tree, opts) {
        const shardConfigs = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getShardConfigs"])(this.nodes);
        if (shardConfigs === null) {
            console.log('Failed to get shard configs');
            return null;
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$common$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["checkReplica"])(shardConfigs, opts.expectedReplica)) {
            console.log('Not enough replicas');
            return null;
        }
        let txSeq = info.tx.seq;
        let [startSegmentIndex, endSegmentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SegmentRange"])(info.tx.startEntryIndex, info.tx.size);
        var uploadTasks = [];
        for(let clientIndex = 0; clientIndex < shardConfigs.length; clientIndex++){
            const shardConfig = shardConfigs[clientIndex];
            var tasks = [];
            let segIndex = this.nextSgmentIndex(shardConfig, startSegmentIndex);
            while(segIndex <= endSegmentIndex){
                tasks.push({
                    clientIndex,
                    taskSize: opts.taskSize,
                    segIndex: segIndex - startSegmentIndex,
                    numShard: shardConfig.numShard,
                    txSeq
                });
                segIndex += shardConfig.numShard * opts.taskSize;
            }
            if (tasks.length > 0) {
                uploadTasks.push(tasks);
            }
        }
        if (uploadTasks.length === 0) {
            return null;
        }
        console.log('Tasks created:', uploadTasks);
        var tasks = [];
        if (uploadTasks.length > 0) {
            uploadTasks.sort((a, b)=>a.length - b.length);
            for(let taskIndex = 0; taskIndex < uploadTasks[0].length; taskIndex += 1){
                for(let i = 0; i < uploadTasks.length && taskIndex < uploadTasks[i].length; i += 1){
                    tasks.push(uploadTasks[i][taskIndex]);
                }
            }
        }
        return tasks;
    }
    async getSegment(file, tree, segIndex) {
        let numChunks = file.numChunks();
        let startSegIndex = segIndex * __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_MAX_CHUNKS"];
        if (startSegIndex >= numChunks) {
            return [
                true,
                null,
                null
            ];
        }
        const iter = file.iterateWithOffsetAndBatch(segIndex * __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_SIZE"], __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_SIZE"], true);
        let [ok, err] = await iter.next();
        if (!ok) {
            return [
                false,
                null,
                err
            ];
        }
        let segment = iter.current();
        const proof = tree.proofAt(segIndex);
        const startIndex = segIndex * __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_MAX_CHUNKS"];
        let allDataUploaded = false;
        if (startIndex + segment.length / __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"] >= numChunks) {
            const expectedLen = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"] * (numChunks - startIndex);
            segment = segment.slice(0, expectedLen);
            allDataUploaded = true;
        }
        const segWithProof = {
            root: tree.rootHash(),
            data: (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$utils$2f$base64$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["encodeBase64"])(segment),
            index: segIndex,
            proof: proof,
            fileSize: file.size()
        };
        return [
            allDataUploaded,
            segWithProof,
            null
        ];
    }
    async uploadTask(file, tree, uploadTask) {
        let segIndex = uploadTask.segIndex;
        var segments = [];
        for(let i = 0; i < uploadTask.taskSize; i += 1){
            let [allDataUploaded, segWithProof, err] = await this.getSegment(file, tree, segIndex);
            if (err !== null) {
                return err;
            }
            if (segWithProof !== null) {
                segments.push(segWithProof);
            }
            if (allDataUploaded) {
                break;
            }
            segIndex += uploadTask.numShard;
        }
        let res = await this.nodes[uploadTask.clientIndex].uploadSegmentsByTxSeq(segments, uploadTask.txSeq);
        if (res === null) {
            return new Error('Failed to upload segments');
        }
        return res;
    }
} //# sourceMappingURL=Uploader.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/types.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultUploadOption",
    ()=>defaultUploadOption
]);
var defaultUploadOption = {
    tags: '0x',
    finalityRequired: true,
    taskSize: 1,
    expectedReplica: 1,
    skipTx: false,
    fee: BigInt(0)
}; //# sourceMappingURL=types.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$Downloader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/Downloader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$Uploader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/Uploader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/utils.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/indexer/Indexer.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Indexer",
    ()=>Indexer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$open$2d$jsonrpc$2d$provider$2f$lib$2e$esm$2f$HttpProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/open-jsonrpc-provider/lib.esm/HttpProvider.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$common$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/common/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$Uploader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/Uploader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$Downloader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/Downloader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$StorageNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/StorageNode.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/utils.js [app-route] (ecmascript)");
;
;
;
;
;
class Indexer extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$open$2d$jsonrpc$2d$provider$2f$lib$2e$esm$2f$HttpProvider$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["HttpProvider"] {
    constructor(url){
        super({
            url
        });
    }
    async getShardedNodes() {
        const res = await super.request({
            method: 'indexer_getShardedNodes'
        });
        return res;
    }
    async getNodeLocations() {
        const res = await super.request({
            method: 'indexer_getNodeLocations'
        });
        return res;
    }
    async getFileLocations(rootHash) {
        const res = await super.request({
            method: 'indexer_getFileLocations',
            params: [
                rootHash
            ]
        });
        return res;
    }
    async newUploaderFromIndexerNodes(blockchain_rpc, signer, expectedReplica, opts) {
        let [clients, err] = await this.selectNodes(expectedReplica);
        if (err != null) {
            return [
                null,
                err
            ];
        }
        let status = await clients[0].getStatus();
        if (status == null) {
            return [
                null,
                new Error('failed to get status from the selected node')
            ];
        }
        console.log('First selected node status :', status);
        let flow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFlowContract"])(status.networkIdentity.flowAddress, signer);
        console.log('Selected nodes:', clients);
        let uploader = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$Uploader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Uploader"](clients, blockchain_rpc, flow, opts?.gasPrice, opts?.gasLimit);
        return [
            uploader,
            null
        ];
    }
    async selectNodes(expectedReplica) {
        let nodes = await this.getShardedNodes();
        let [trusted, ok] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$common$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["selectNodes"])(nodes.trusted, expectedReplica);
        if (!ok) {
            return [
                [],
                new Error('cannot select a subset from the returned nodes that meets the replication requirement')
            ];
        }
        let clients = [];
        trusted.forEach((node)=>{
            let sn = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$StorageNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StorageNode"](node.url);
            clients.push(sn);
        });
        return [
            clients,
            null
        ];
    }
    async upload(file, blockchain_rpc, signer, uploadOpts, retryOpts, opts) {
        var expectedReplica = 1;
        if (uploadOpts != undefined && uploadOpts.expectedReplica != null) {
            expectedReplica = Math.max(1, uploadOpts.expectedReplica);
        }
        let [uploader, err] = await this.newUploaderFromIndexerNodes(blockchain_rpc, signer, expectedReplica, opts);
        if (err != null || uploader == null) {
            return [
                '',
                err
            ];
        }
        if (uploadOpts === undefined) {
            uploadOpts = {
                tags: '0x',
                finalityRequired: true,
                taskSize: 10,
                expectedReplica: 1,
                skipTx: false,
                fee: BigInt('0')
            };
        }
        return await uploader.uploadFile(file, uploadOpts, retryOpts);
    }
    async download(rootHash, filePath, proof) {
        let locations = await this.getFileLocations(rootHash);
        if (locations.length == 0) {
            return new Error('failed to get file locations');
        }
        let clients = [];
        locations.forEach((node)=>{
            let sn = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$StorageNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StorageNode"](node.url);
            clients.push(sn);
        });
        let downloader = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$Downloader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Downloader"](clients);
        return await downloader.downloadFile(rootHash, filePath, proof);
    }
} //# sourceMappingURL=Indexer.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/indexer/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$indexer$2f$Indexer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/indexer/Indexer.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/types.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StreamData",
    ()=>StreamData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/ethers.js [app-route] (ecmascript) <export * as ethers>");
;
var AccessControlType;
(function(AccessControlType) {
    AccessControlType[AccessControlType["GrantAdminRole"] = 0] = "GrantAdminRole";
    AccessControlType[AccessControlType["RenounceAdminRole"] = 1] = "RenounceAdminRole";
    AccessControlType[AccessControlType["SetKeyToSpecial"] = 16] = "SetKeyToSpecial";
    AccessControlType[AccessControlType["SetKeyToNormal"] = 17] = "SetKeyToNormal";
    AccessControlType[AccessControlType["GrantWriteRole"] = 32] = "GrantWriteRole";
    AccessControlType[AccessControlType["RevokeWriteRole"] = 33] = "RevokeWriteRole";
    AccessControlType[AccessControlType["RenounceWriteRole"] = 34] = "RenounceWriteRole";
    AccessControlType[AccessControlType["GrantSpecialWriteRole"] = 48] = "GrantSpecialWriteRole";
    AccessControlType[AccessControlType["RevokeSpecialWriteRole"] = 49] = "RevokeSpecialWriteRole";
    AccessControlType[AccessControlType["RenounceSpecialWriteRole"] = 50] = "RenounceSpecialWriteRole";
})(AccessControlType || (AccessControlType = {}));
class StreamData {
    Version;
    Reads = [];
    Writes = [];
    Controls = [];
    constructor(version){
        this.Version = version;
    }
    size() {
        let size = 8; // version size in bytes
        size += 4; // Reads size prefix
        for (const v of this.Reads){
            size += 32 + 3 + v.Key.length;
        }
        size += 4; // Writes size prefix
        for (const v of this.Writes){
            size += 32 + 3 + v.Key.length + 8 + v.Data.length;
        }
        size += 4; // Controls size prefix
        for (const v of this.Controls){
            size += 1 + 32; // Type + StreamId
            if (v.Account) {
                size += 20; // Address length
            }
            if (v.Key) {
                size += 3 + v.Key.length;
            }
        }
        return size;
    }
    encodeSize24(size) {
        if (size === 0) {
            throw new Error('errKeyIsEmpty');
        }
        const buf = new Uint8Array(4);
        const view = new DataView(buf.buffer);
        view.setUint32(0, size, false);
        if (buf[0] !== 0) {
            throw new Error('errKeyTooLarge');
        }
        return buf.slice(1);
    }
    encodeSize32(size) {
        const buf = new Uint8Array(4);
        const view = new DataView(buf.buffer);
        view.setUint32(0, size, false);
        return buf;
    }
    encodeSize64(size) {
        const buf = new Uint8Array(8);
        const view = new DataView(buf.buffer);
        view.setBigUint64(0, BigInt(size), false);
        return buf;
    }
    encode() {
        const encoded = new Uint8Array(this.size());
        let offset = 0;
        // version
        encoded.set(this.encodeSize64(this.Version), offset);
        offset += 8;
        // reads
        encoded.set(this.encodeSize32(this.Reads.length), offset);
        offset += 4;
        for (const v of this.Reads){
            encoded.set(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].getBytes(v.StreamId), offset);
            offset += 32;
            const keySize = this.encodeSize24(v.Key.length);
            encoded.set(keySize, offset);
            offset += keySize.length;
            encoded.set(v.Key, offset);
            offset += v.Key.length;
        }
        // writes
        encoded.set(this.encodeSize32(this.Writes.length), offset);
        offset += 4;
        for (const v of this.Writes){
            // add stream id
            encoded.set(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].getBytes(v.StreamId), offset);
            offset += 32;
            const keySize = this.encodeSize24(v.Key.length);
            // add key size
            encoded.set(keySize, offset);
            offset += keySize.length;
            // add key
            encoded.set(v.Key, offset);
            offset += v.Key.length;
            // add value size, add value later
            const dataSize = this.encodeSize64(v.Data.length);
            encoded.set(dataSize, offset);
            offset += dataSize.length;
        }
        // add all values
        for (const v of this.Writes){
            encoded.set(v.Data, offset);
            offset += v.Data.length;
        }
        // controls
        encoded.set(this.encodeSize32(this.Controls.length), offset);
        offset += 4;
        for (const v of this.Controls){
            encoded[offset] = v.Type;
            offset += 1;
            encoded.set(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].getBytes(v.StreamId), offset);
            offset += 32;
            if (v.Key !== undefined) {
                const keySize = this.encodeSize24(v.Key.length);
                encoded.set(keySize, offset);
                offset += keySize.length;
                encoded.set(v.Key, offset);
                offset += v.Key.length;
            }
            if (v.Account !== undefined) {
                encoded.set(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].getBytes(v.Account), offset);
                offset += 20;
            }
        }
        return encoded;
    }
} //# sourceMappingURL=types.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/constants.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MAX_KEY_SIZE",
    ()=>MAX_KEY_SIZE,
    "MAX_QUERY_SIZE",
    ()=>MAX_QUERY_SIZE,
    "MAX_SET_SIZE",
    ()=>MAX_SET_SIZE,
    "STREAM_DOMAIN",
    ()=>STREAM_DOMAIN
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
;
const MAX_SET_SIZE = 1 << 16; // 64K
const MAX_KEY_SIZE = 1 << 24; // 16.7M
const MAX_QUERY_SIZE = 1024 * 256;
const STREAM_DOMAIN = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHash"])('sha256').update('STREAM').digest(); //# sourceMappingURL=constants.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/builder.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StreamDataBuilder",
    ()=>StreamDataBuilder
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/ethers/lib.esm/ethers.js [app-route] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/constants.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/types.js [app-route] (ecmascript)");
;
;
;
class StreamDataBuilder {
    version;
    streamIds;
    controls;
    reads;
    writes;
    constructor(version){
        this.version = version;
        this.streamIds = new Map();
        this.controls = [];
        this.reads = new Map();
        this.writes = new Map();
    }
    hexToBytes(hex) {
        // Remove '0x' prefix if it exists
        if (hex.startsWith('0x')) {
            hex = hex.slice(2);
        }
        return Buffer.from(hex, 'hex');
    }
    build(sorted = false) {
        const data = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StreamData"](this.version);
        // controls
        data.Controls = this.buildAccessControl();
        // reads
        data.Reads = [];
        for (const [streamId, keys] of this.reads.entries()){
            for (const k of keys.keys()){
                const key = this.hexToBytes(k);
                if (key.length > __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_KEY_SIZE"]) {
                    throw new Error('errKeyTooLarge');
                }
                if (key.length === 0) {
                    throw new Error('errKeyIsEmpty');
                }
                data.Reads.push({
                    StreamId: streamId,
                    Key: key
                });
                if (data.Reads.length > __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_SET_SIZE"]) {
                    throw new Error('errSizeTooLarge');
                }
            }
        }
        // writes
        data.Writes = [];
        for (const [streamId, keys] of this.writes.entries()){
            for (const [k, d] of keys.entries()){
                const key = this.hexToBytes(k);
                if (key.length > __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_KEY_SIZE"]) {
                    throw new Error('errKeyTooLarge');
                }
                if (key.length === 0) {
                    throw new Error('errKeyIsEmpty');
                }
                data.Writes.push({
                    StreamId: streamId,
                    Key: key,
                    Data: Uint8Array.from(d)
                });
                if (data.Writes.length > __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_SET_SIZE"]) {
                    throw new Error('errSizeTooLarge');
                }
            }
        }
        if (sorted) {
            data.Reads.sort((a, b)=>{
                const streamIdI = a.StreamId;
                const streamIdJ = b.StreamId;
                if (streamIdI === streamIdJ) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].hexlify(a.Key) < __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].hexlify(b.Key) ? -1 : 1;
                } else {
                    return streamIdI < streamIdJ ? -1 : 1;
                }
            });
            data.Writes.sort((a, b)=>{
                const streamIdI = a.StreamId;
                const streamIdJ = b.StreamId;
                if (streamIdI === streamIdJ) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].hexlify(a.Key) < __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].hexlify(b.Key) ? -1 : 1;
                } else {
                    return streamIdI < streamIdJ ? -1 : 1;
                }
            });
        }
        return data;
    }
    set(streamId, key, data) {
        this.addStreamId(streamId);
        if (!this.writes.has(streamId)) {
            this.writes.set(streamId, new Map());
        }
        let maps = this.writes.get(streamId);
        maps.set(Buffer.from(key).toString('hex'), data);
        this.writes.set(streamId, maps);
    }
    addStreamId(streamId) {
        this.streamIds.set(streamId, true);
    }
    buildTags(sorted = false) {
        let ids = Array.from(this.streamIds.keys());
        if (sorted) {
            ids.sort((a, b)=>a < b ? -1 : 1);
        }
        return this.createTags(ids);
    }
    createTags(streamIds) {
        let result = new Uint8Array((1 + streamIds.length) * 32); // Assuming Hash is 32 bytes
        result.set(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["STREAM_DOMAIN"], 0);
        streamIds.forEach((id, index)=>{
            result.set(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].getBytes(id), 32 * (index + 1));
        });
        return result;
    }
    buildAccessControl() {
        if (this.controls.length > __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_SET_SIZE"]) {
            throw new Error('errSizeTooLarge');
        }
        return this.controls;
    }
} //# sourceMappingURL=builder.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/utils.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "computePaddedSize",
    ()=>computePaddedSize,
    "nextPow2",
    ()=>nextPow2,
    "numSplits",
    ()=>numSplits
]);
function numSplits(total, unit) {
    return Math.floor((total - 1) / unit) + 1;
}
function nextPow2(input) {
    let x = input;
    x -= 1;
    x |= x >> 32;
    x |= x >> 16;
    x |= x >> 8;
    x |= x >> 4;
    x |= x >> 2;
    x |= x >> 1;
    x += 1;
    return x;
}
function computePaddedSize(chunks) {
    let chunksNextPow2 = nextPow2(chunks);
    if (chunksNextPow2 === chunks) {
        return [
            chunksNextPow2,
            chunksNextPow2
        ];
    }
    let minChunk;
    if (chunksNextPow2 >= 16) {
        minChunk = Math.floor(chunksNextPow2 / 16);
    } else {
        minChunk = 1;
    }
    const paddedChunks = numSplits(chunks, minChunk) * minChunk;
    return [
        paddedChunks,
        chunksNextPow2
    ];
} //# sourceMappingURL=utils.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/BlobIterator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlobIterator",
    ()=>BlobIterator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/constant.js [app-route] (ecmascript)");
;
;
class BlobIterator {
    file = null;
    buf;
    bufSize = 0;
    fileSize;
    paddedSize;
    offset = 0;
    batchSize;
    constructor(file, fileSize, offset, batch, flowPadding){
        if (batch % __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"] > 0) {
            throw new Error("batch size should align with chunk size");
        }
        const buf = new Uint8Array(batch);
        const chunks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numSplits"])(fileSize, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"]);
        let paddedSize;
        if (flowPadding) {
            const [paddedChunks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computePaddedSize"])(chunks);
            paddedSize = paddedChunks * __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"];
        } else {
            paddedSize = chunks * __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"];
        }
        this.file = file;
        this.buf = buf;
        this.fileSize = fileSize;
        this.paddedSize = paddedSize;
        this.batchSize = batch;
        this.offset = offset;
    }
    static NewSegmentIterator(file, fileSize, offset, flowPadding) {
        return new BlobIterator(file, fileSize, offset, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_SIZE"], flowPadding);
    }
    async readFromFile(start, end) {
        if (start < 0 || start >= this.fileSize) {
            throw new Error("invalid start offset");
        }
        if (end > this.fileSize) {
            end = this.fileSize;
        }
        const buf = await this.file?.slice(start, end).arrayBuffer();
        const buffer = new Uint8Array(this.batchSize);
        buffer.set(new Uint8Array(buf));
        return {
            bytesRead: buf.byteLength,
            buffer
        };
    }
    clearBuffer() {
        this.bufSize = 0;
    }
    paddingZeros(length) {
        const startOffset = this.bufSize;
        this.buf = this.buf.fill(0, startOffset, startOffset + length);
        this.bufSize += length;
        this.offset += length;
    }
    async next() {
        if (this.offset < 0 || this.offset >= this.paddedSize) {
            return [
                false,
                null
            ];
        }
        let expectedBufSize;
        let maxAvailableLength = this.paddedSize - this.offset; // include padding zeros
        if (maxAvailableLength >= this.batchSize) {
            expectedBufSize = this.batchSize;
        } else {
            expectedBufSize = maxAvailableLength;
        }
        this.clearBuffer();
        if (this.offset >= this.fileSize) {
            this.paddingZeros(expectedBufSize);
            return [
                true,
                null
            ];
        }
        const { bytesRead: n, buffer } = await this.readFromFile(this.offset, this.offset + this.batchSize);
        this.buf = buffer;
        this.bufSize = n;
        this.offset += n;
        // not reach EOF
        if (n === expectedBufSize) {
            return [
                true,
                null
            ];
        }
        if (n > expectedBufSize) {
            // should never happen
            throw new Error("load more data from file than expected");
        }
        if (expectedBufSize > n) {
            this.paddingZeros(expectedBufSize - n);
        }
        return [
            true,
            null
        ];
    }
    current() {
        return this.buf.subarray(0, this.bufSize);
    }
} //# sourceMappingURL=BlobIterator.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/NodeIterator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NodeFdIterator",
    ()=>NodeFdIterator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$BlobIterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/BlobIterator.js [app-route] (ecmascript)");
;
class NodeFdIterator extends __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$BlobIterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlobIterator"] {
    fd = null;
    constructor(fd, fileSize, offset, batch, flowPadding){
        super(null, fileSize, offset, batch, flowPadding);
        this.fd = fd;
    }
    // override BlobIterator.readFromFile
    async readFromFile(start, end) {
        if (start < 0 || start >= this.fileSize) {
            throw new Error("invalid start offset");
        }
        if (end > this.fileSize) {
            end = this.fileSize;
        }
        const res = await this.fd?.read({
            buffer: this.buf,
            offset: this.bufSize,
            length: end - start,
            position: start
        });
        return res;
    }
} //# sourceMappingURL=NodeIterator.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/MemIterator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MemIterator",
    ()=>MemIterator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/constant.js [app-route] (ecmascript)");
;
;
class MemIterator {
    dataArray = null;
    buf;
    bufSize = 0;
    fileSize;
    paddedSize;
    offset = 0;
    batchSize;
    constructor(data, fileSize, offset, batch, flowPadding){
        if (batch % __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"] > 0) {
            throw new Error("batch size should align with chunk size");
        }
        const buf = new Uint8Array(batch);
        const chunks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numSplits"])(fileSize, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"]);
        let paddedSize;
        if (flowPadding) {
            const [paddedChunks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computePaddedSize"])(chunks);
            paddedSize = paddedChunks * __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"];
        } else {
            paddedSize = chunks * __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"];
        }
        this.dataArray = data;
        this.buf = buf;
        this.fileSize = fileSize;
        this.paddedSize = paddedSize;
        this.batchSize = batch;
        this.offset = offset;
    }
    async readFromFile(start, end) {
        if (start < 0 || start >= this.fileSize) {
            throw new Error("invalid start offset");
        }
        if (end > this.fileSize) {
            end = this.fileSize;
        }
        const buf = this.dataArray?.slice(start, end);
        const buffer = new Uint8Array(this.batchSize);
        buffer.set(new Uint8Array(buf));
        return {
            bytesRead: buf.byteLength,
            buffer
        };
    }
    clearBuffer() {
        this.bufSize = 0;
    }
    paddingZeros(length) {
        const startOffset = this.bufSize;
        this.buf = this.buf.fill(0, startOffset, startOffset + length);
        this.bufSize += length;
        this.offset += length;
    }
    async next() {
        if (this.offset < 0 || this.offset >= this.paddedSize) {
            return [
                false,
                null
            ];
        }
        let expectedBufSize;
        let maxAvailableLength = this.paddedSize - this.offset; // include padding zeros
        if (maxAvailableLength >= this.batchSize) {
            expectedBufSize = this.batchSize;
        } else {
            expectedBufSize = maxAvailableLength;
        }
        this.clearBuffer();
        if (this.offset >= this.fileSize) {
            this.paddingZeros(expectedBufSize);
            return [
                true,
                null
            ];
        }
        const { bytesRead: n, buffer } = await this.readFromFile(this.offset, this.offset + this.batchSize);
        this.buf = buffer;
        this.bufSize = n;
        this.offset += n;
        // not reach EOF
        if (n === expectedBufSize) {
            return [
                true,
                null
            ];
        }
        if (n > expectedBufSize) {
            // should never happen
            throw new Error("load more data from file than expected");
        }
        if (expectedBufSize > n) {
            this.paddingZeros(expectedBufSize - n);
        }
        return [
            true,
            null
        ];
    }
    current() {
        return this.buf.subarray(0, this.bufSize);
    }
} //# sourceMappingURL=MemIterator.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$BlobIterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/BlobIterator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$NodeIterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/NodeIterator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$MemIterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/MemIterator.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/MerkleTree.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeafNode",
    ()=>LeafNode,
    "MerkleTree",
    ()=>MerkleTree,
    "Proof",
    ()=>Proof,
    "ProofErrors",
    ()=>ProofErrors
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$keccak256$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ethersproject/keccak256/lib.esm/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$bytes$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ethersproject/bytes/lib.esm/index.js [app-route] (ecmascript)");
;
;
class LeafNode {
    hash;
    parent = null;
    left = null;
    right = null;
    constructor(hash){
        this.hash = hash;
    }
    // content should be a hex string
    static fromContent(content) {
        return new LeafNode((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$keccak256$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["keccak256"])(content));
    }
    static fromLeftAndRight(left, right) {
        const node = new LeafNode(keccak256Hash(left.hash, right.hash));
        node.left = left;
        node.right = right;
        left.parent = node;
        right.parent = node;
        return node;
    }
    isLeftSide() {
        return this.parent !== null && this.parent.left === this;
    }
}
var ProofErrors;
(function(ProofErrors) {
    ProofErrors["WRONG_FORMAT"] = "invalid merkle proof format";
    ProofErrors["ROOT_MISMATCH"] = "merkle proof root mismatch";
    ProofErrors["CONTENT_MISMATCH"] = "merkle proof content mismatch";
    ProofErrors["POSITION_MISMATCH"] = "merkle proof position mismatch";
    ProofErrors["VALIDATION_FAILURE"] = "failed to validate merkle proof";
})(ProofErrors || (ProofErrors = {}));
class Proof {
    // Lemma is made up of 3 parts to keep consistent with zerog-rust:
    // 1. Target content hash (leaf node).
    // 2. Hashes from bottom to top of sibling nodes.
    // 3. Root hash.
    lemma = [];
    // Path contains flags to indicate that whether the corresponding node is on the left side.
    // All true for the left most leaf node, and all false for the right most leaf node.
    path = [];
    constructor(lemma = [], path = []){
        this.lemma = lemma;
        this.path = path;
    }
    validateFormat() {
        const numSiblings = this.path.length;
        if (numSiblings === 0) {
            if (this.lemma.length !== 1) {
                return ProofErrors.WRONG_FORMAT;
            }
            return null;
        }
        if (numSiblings + 2 !== this.lemma.length) {
            return ProofErrors.WRONG_FORMAT;
        }
        return null;
    }
    validate(rootHash, content, position, numLeafNodes) {
        const contentHash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$keccak256$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["keccak256"])(content);
        return this.validateHash(rootHash, contentHash, position, numLeafNodes);
    }
    validateHash(rootHash, contentHash, position, numLeafNodes) {
        const formatError = this.validateFormat();
        if (formatError !== null) {
            return formatError;
        }
        if (contentHash !== this.lemma[0]) {
            return ProofErrors.CONTENT_MISMATCH;
        }
        if (this.lemma.length > 1 && rootHash !== this.lemma[this.lemma.length - 1]) {
            return ProofErrors.ROOT_MISMATCH;
        }
        const proofPosition = this.calculateProofPosition(numLeafNodes);
        if (proofPosition !== position) {
            return ProofErrors.POSITION_MISMATCH;
        }
        if (!this.validateRoot()) {
            return ProofErrors.VALIDATION_FAILURE;
        }
        return null;
    }
    validateRoot() {
        let hash = this.lemma[0];
        for(let i = 0; i < this.path.length; i++){
            const isLeft = this.path[i];
            if (isLeft) {
                hash = keccak256Hash(hash, this.lemma[i + 1]);
            } else {
                hash = keccak256Hash(this.lemma[i + 1], hash);
            }
        }
        return hash === this.lemma[this.lemma.length - 1];
    }
    // numLeafNodes should bigger than 0
    calculateProofPosition(numLeafNodes) {
        let position = 0;
        for(let i = this.path.length - 1; i >= 0; i--){
            const leftSideDepth = Math.ceil(Math.log2(numLeafNodes));
            const leftSideLeafNodes = Math.pow(2, leftSideDepth) / 2;
            const isLeft = this.path[i];
            if (isLeft) {
                numLeafNodes = leftSideLeafNodes;
            } else {
                position += leftSideLeafNodes;
                numLeafNodes -= leftSideLeafNodes;
            }
        }
        return position;
    }
}
class MerkleTree {
    root = null;
    leaves = [];
    constructor(root = null, leaves = []){
        this.root = root;
        this.leaves = leaves;
    }
    rootHash() {
        return this.root ? this.root.hash : null;
    }
    proofAt(i) {
        if (i < 0 || i >= this.leaves.length) {
            throw new Error('Index out of range');
        }
        if (this.leaves.length === 1) {
            return new Proof([
                this.rootHash()
            ], []);
        }
        const proof = new Proof();
        // append the target leaf node hash
        proof.lemma.push(this.leaves[i].hash);
        let current = this.leaves[i];
        while(current !== this.root){
            if (current.isLeftSide()) {
                proof.lemma.push(current.parent?.right?.hash);
                proof.path.push(true);
            } else {
                proof.lemma.push(current.parent?.left?.hash);
                proof.path.push(false);
            }
            current = current.parent;
        }
        // append the root node hash
        proof.lemma.push(this.rootHash());
        return proof;
    }
    addLeaf(leafContent) {
        this.leaves.push(LeafNode.fromContent(leafContent));
    }
    addLeafByHash(leafHash) {
        this.leaves.push(new LeafNode(leafHash));
    }
    // build root
    build() {
        const numLeafNodes = this.leaves.length;
        if (numLeafNodes === 0) {
            return null;
        }
        let queue = [];
        for(let i = 0; i < numLeafNodes; i += 2){
            // last single leaf node
            if (i === numLeafNodes - 1) {
                queue.push(this.leaves[i]);
                continue;
            }
            const node = LeafNode.fromLeftAndRight(this.leaves[i], this.leaves[i + 1]);
            queue.push(node);
        }
        while(true){
            const numNodes = queue.length;
            if (numNodes <= 1) {
                break;
            }
            for(let i = 0; i < Math.floor(numNodes / 2); i++){
                const left = queue[0];
                const right = queue[1];
                queue.splice(0, 2); // remove first two elements
                queue.push(LeafNode.fromLeftAndRight(left, right));
            }
            if (numNodes % 2 === 1) {
                const first = queue[0];
                queue.splice(0, 1); // remove first element
                queue.push(first);
            }
        }
        this.root = queue[0];
        return this;
    }
}
function keccak256Hash(...hashes) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$keccak256$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["keccak256"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ethersproject$2f$bytes$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hexConcat"])(hashes));
} //# sourceMappingURL=MerkleTree.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/AbstractFile.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AbstractFile",
    ()=>AbstractFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MerkleTree$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/MerkleTree.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/constant.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/utils.js [app-route] (ecmascript)");
;
;
;
class AbstractFile {
    fileSize = 0;
    // constructor() {}
    // split a segment into chunks and compute the root hash
    static segmentRoot(segment, emptyChunksPadded = 0) {
        const tree = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MerkleTree$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MerkleTree"]();
        const dataLength = segment.length;
        for(let offset = 0; offset < dataLength; offset += __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"]){
            const chunk = segment.subarray(offset, offset + __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"]);
            tree.addLeaf(chunk);
        }
        if (emptyChunksPadded > 0) {
            for(let i = 0; i < emptyChunksPadded; i++){
                tree.addLeafByHash(__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EMPTY_CHUNK_HASH"]);
            }
        }
        tree.build();
        if (tree.root !== null) {
            return tree.rootHash();
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZERO_HASH"]; // TODO check this
    }
    size() {
        return this.fileSize;
    }
    iterate(flowPadding) {
        return this.iterateWithOffsetAndBatch(0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_SIZE"], flowPadding);
    }
    async merkleTree() {
        const iter = this.iterate(true);
        const tree = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MerkleTree$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MerkleTree"]();
        while(true){
            let [ok, err] = await iter.next();
            if (err != null) {
                return [
                    null,
                    err
                ];
            }
            if (!ok) {
                break;
            }
            const current = iter.current();
            const segRoot = AbstractFile.segmentRoot(current);
            tree.addLeafByHash(segRoot);
        }
        return [
            tree.build(),
            null
        ];
    }
    numChunks() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numSplits"])(this.size(), __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"]);
    }
    numSegments() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numSplits"])(this.size(), __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_SIZE"]);
    }
    async createSubmission(tags) {
        const submission = {
            length: this.size(),
            tags: tags,
            nodes: []
        };
        const nodes = this.splitNodes();
        let offset = 0;
        for (let chunks of nodes){
            let [node, err] = await this.createNode(offset, chunks);
            if (err != null) {
                return [
                    null,
                    err
                ];
            }
            submission.nodes.push(node);
            offset += chunks * __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"];
        }
        return [
            submission,
            null
        ];
    }
    splitNodes() {
        let nodes = [];
        let chunks = this.numChunks();
        let [paddedChunks, chunksNextPow2] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computePaddedSize"])(chunks);
        let nextChunkSize = chunksNextPow2;
        while(paddedChunks > 0){
            if (paddedChunks >= nextChunkSize) {
                paddedChunks -= nextChunkSize;
                nodes.push(nextChunkSize);
            }
            nextChunkSize /= 2;
        }
        return nodes;
    }
    async createNode(offset, chunks) {
        let batch = chunks;
        if (chunks > __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_MAX_CHUNKS"]) {
            batch = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_MAX_CHUNKS"];
        }
        return this.createSegmentNode(offset, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"] * batch, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"] * chunks);
    }
    async createSegmentNode(offset, batch, size) {
        const iter = this.iterateWithOffsetAndBatch(offset, batch, true);
        const tree = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MerkleTree$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MerkleTree"]();
        for(let i = 0; i < size;){
            let [ok, err] = await iter.next();
            if (err != null) {
                return [
                    null,
                    err
                ];
            }
            if (!ok) {
                break;
            }
            const current = iter.current();
            const segRoot = AbstractFile.segmentRoot(current);
            tree.addLeafByHash(segRoot);
            i += current.length;
        }
        tree.build();
        const numChunks = size / __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"];
        const height = Math.log2(numChunks);
        const node = {
            height: height,
            root: tree.rootHash()
        };
        return [
            node,
            null
        ];
    }
} //# sourceMappingURL=AbstractFile.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Blob.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Blob",
    ()=>Blob
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$BlobIterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/BlobIterator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$AbstractFile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/AbstractFile.js [app-route] (ecmascript)");
;
;
class Blob extends __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$AbstractFile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbstractFile"] {
    blob = null;
    fileSize = 0;
    constructor(blob){
        super();
        this.blob = blob;
        this.fileSize = blob.size;
    }
    iterateWithOffsetAndBatch(offset, batch, flowPadding) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$BlobIterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["BlobIterator"](this.blob, this.size(), offset, batch, flowPadding);
    }
} //# sourceMappingURL=Blob.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/ZgFile.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ZgFile",
    ()=>ZgFile
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$NodeIterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/NodeIterator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$AbstractFile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/AbstractFile.js [app-route] (ecmascript)");
;
;
;
class ZgFile extends __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$AbstractFile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbstractFile"] {
    fd = null;
    fileSize = 0;
    constructor(fd, fileSize){
        super();
        this.fd = fd;
        this.fileSize = fileSize;
    }
    static async fromNodeFileHandle(fd) {
        const stat = await fd.stat();
        return new ZgFile(fd, stat.size);
    }
    // NOTE: need manually close fd after use
    static async fromFilePath(path) {
        const fd = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["open"])(path, 'r'); // if fail, throw error
        return await ZgFile.fromNodeFileHandle(fd);
    }
    async close() {
        await this.fd?.close();
    }
    iterateWithOffsetAndBatch(offset, batch, flowPadding) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$NodeIterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NodeFdIterator"](this.fd, this.size(), offset, batch, flowPadding);
    }
} //# sourceMappingURL=ZgFile.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/MemData.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MemData",
    ()=>MemData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$MemIterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Iterator/MemIterator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$AbstractFile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/AbstractFile.js [app-route] (ecmascript)");
;
;
class MemData extends __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$AbstractFile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AbstractFile"] {
    fileSize = 0;
    data;
    constructor(data){
        super();
        this.data = data;
        this.fileSize = data.length;
    }
    iterateWithOffsetAndBatch(offset, batch, flowPadding) {
        const data = new Uint8Array(this.data);
        return new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Iterator$2f$MemIterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MemIterator"](data, this.size(), offset, batch, flowPadding);
    }
} //# sourceMappingURL=MemData.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Blob$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Blob.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$ZgFile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/ZgFile.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MemData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/MemData.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MerkleTree$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/MerkleTree.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
;
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/batcher.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Batcher",
    ()=>Batcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MemData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/MemData.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$Uploader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/Uploader.js [app-route] (ecmascript)");
;
;
;
class Batcher {
    streamDataBuilder;
    clients;
    flow;
    blockchainRpc;
    constructor(version, clients, flow, provider){
        this.streamDataBuilder = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StreamDataBuilder"](version);
        this.clients = clients;
        this.flow = flow;
        this.blockchainRpc = provider;
    }
    async exec(opts) {
        // build stream data
        const streamData = this.streamDataBuilder.build();
        const encoded = streamData.encode();
        const data = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MemData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MemData"](encoded);
        const uploader = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$Uploader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Uploader"](this.clients, this.blockchainRpc, this.flow);
        if (opts === undefined) {
            opts = __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultUploadOption"];
        }
        opts.tags = this.streamDataBuilder.buildTags();
        return await uploader.uploadFile(data, opts);
    }
} //# sourceMappingURL=batcher.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/iterator.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KvIterator",
    ()=>KvIterator
]);
class KvIterator {
    // client is the client to use for requests.
    client;
    // streamId is the stream ID.
    streamId;
    // version is the version of the stream.
    version;
    // currentPair is the current key-value pair.
    currentPair;
    // NewIterator creates an iterator.
    constructor(client, streamId, version){
        this.client = client;
        this.streamId = streamId;
        this.version = version;
    }
    // Valid check if current position is exist
    valid() {
        return this.currentPair !== undefined;
    }
    getCurrentPair() {
        return this.currentPair;
    }
    async move(kv) {
        if (kv === null) {
            this.currentPair = undefined;
            return null;
        }
        let value = await this.client.getValue(this.streamId, kv.key, kv.version);
        if (value === null) {
            return new Error('errValueNotFound');
        }
        this.currentPair = {
            key: kv.key,
            data: value.data,
            size: value.size,
            version: kv.version
        };
        return null;
    }
    async seekBefore(key) {
        let kv = await this.client.getPrev(this.streamId, key, 0, 0, true, this.version);
        return this.move(kv);
    }
    async seekAfter(key) {
        let kv = await this.client.getNext(this.streamId, key, 0, 0, true, this.version);
        return this.move(kv);
    }
    async seekToFirst() {
        let kv = await this.client.getFirst(this.streamId, 0, 0, this.version);
        return this.move(kv);
    }
    async seekToLast() {
        let kv = await this.client.getLast(this.streamId, 0, 0, this.version);
        return this.move(kv);
    }
    async next() {
        if (!this.valid()) {
            return new Error('errIteratorInvalid');
        }
        let kv = await this.client.getNext(this.streamId, this.currentPair.key, 0, 0, false, this.version);
        return this.move(kv);
    }
    async prev() {
        if (!this.valid()) {
            return new Error('errIteratorInvalid');
        }
        let kv = await this.client.getPrev(this.streamId, this.currentPair.key, 0, 0, false, this.version);
        return this.move(kv);
    }
} //# sourceMappingURL=iterator.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/client.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "KvClient",
    ()=>KvClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$StorageKv$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/StorageKv.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$iterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/iterator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/constants.js [app-route] (ecmascript)");
;
;
;
class KvClient {
    inner;
    constructor(rpc){
        const client = new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$StorageKv$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StorageKv"](rpc);
        this.inner = client;
    }
    newIterator(streamId, version) {
        return new __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$iterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KvIterator"](this, streamId, version);
    }
    async getValue(streamId, key, version) {
        let val = {
            data: '',
            size: 0,
            version: version || 0
        };
        while(true){
            const seg = await this.inner.getValue(streamId, key, val.data.length, __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_QUERY_SIZE"], version);
            if (seg === undefined) {
                return null;
            }
            if (val.version === Number.MAX_SAFE_INTEGER) {
                val.version = seg.version;
            } else if (val.version !== seg.version) {
                val.version = seg.version;
                val.data = '';
            }
            val.size = seg.size;
            const segData = Buffer.from(seg.data, 'base64');
            const valData = Buffer.from(val.data, 'base64');
            val.data = Buffer.concat([
                valData,
                segData
            ]).toString('base64');
            if (seg.size == segData.length + valData.length) {
                return val;
            }
        }
    }
    async get(streamId, key, startIndex, length, version) {
        return this.inner.getValue(streamId, key, startIndex, length, version);
    }
    async getNext(streamId, key, startIndex, length, inclusive, version) {
        return this.inner.getNext(streamId, key, startIndex, length, inclusive, version);
    }
    async getPrev(streamId, key, startIndex, length, inclusive, version) {
        return this.inner.getPrev(streamId, key, startIndex, length, inclusive, version);
    }
    async getFirst(streamId, startIndex, length, version) {
        return this.inner.getFirst(streamId, startIndex, length, version);
    }
    async getLast(streamId, startIndex, length, version) {
        return this.inner.getLast(streamId, startIndex, length, version);
    }
    async getTransactionResult(txSeq) {
        return this.inner.getTransactionResult(txSeq);
    }
    async getHoldingStreamIds() {
        return this.inner.getHoldingStreamIds();
    }
    async hasWritePermission(account, streamId, key, version) {
        return this.inner.hasWritePermission(account, streamId, key, version);
    }
    async isAdmin(account, streamId, version) {
        return this.inner.isAdmin(account, streamId, version);
    }
    async isSpecialKey(streamId, key, version) {
        return this.inner.isSpecialKey(streamId, key, version);
    }
    async isWriterOfKey(account, streamId, key, version) {
        return this.inner.isWriterOfKey(account, streamId, key, version);
    }
    async isWriterOfStream(account, streamId, version) {
        return this.inner.isWriterOfStream(account, streamId, version);
    }
} //# sourceMappingURL=client.js.map
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$batcher$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/batcher.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$iterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/iterator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/constants.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
;
;
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/index.js [app-route] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$indexer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/indexer/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/constant.js [app-route] (ecmascript)"); //# sourceMappingURL=index.js.map
;
;
;
;
;
;
;
;
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Downloader",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$Downloader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Downloader"],
    "Uploader",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$Uploader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Uploader"],
    "calculatePrice",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculatePrice"],
    "defaultUploadOption",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultUploadOption"],
    "getShardConfigs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getShardConfigs"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$Downloader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/Downloader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$Uploader$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/Uploader.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/utils.js [app-route] (ecmascript)");
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/indexer/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Indexer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$indexer$2f$Indexer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Indexer"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$indexer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/indexer/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$indexer$2f$Indexer$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/indexer/Indexer.js [app-route] (ecmascript)");
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Batcher",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$batcher$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Batcher"],
    "KvClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KvClient"],
    "KvIterator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$iterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KvIterator"],
    "MAX_KEY_SIZE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_KEY_SIZE"],
    "MAX_QUERY_SIZE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_QUERY_SIZE"],
    "MAX_SET_SIZE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_SET_SIZE"],
    "STREAM_DOMAIN",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["STREAM_DOMAIN"],
    "StreamData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StreamData"],
    "StreamDataBuilder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StreamDataBuilder"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$batcher$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/batcher.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$builder$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/builder.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$client$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/client.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$iterator$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/iterator.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$constants$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/constants.js [app-route] (ecmascript)");
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StorageKv",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$StorageKv$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StorageKv"],
    "StorageNode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$StorageNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StorageNode"],
    "isValidConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValidConfig"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$StorageNode$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/StorageNode.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$StorageKv$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/StorageKv.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$types$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/types.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/utils.js [app-route] (ecmascript)");
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Blob",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Blob$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Blob"],
    "LeafNode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MerkleTree$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LeafNode"],
    "MemData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MemData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MemData"],
    "MerkleTree",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MerkleTree$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MerkleTree"],
    "Proof",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MerkleTree$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Proof"],
    "ProofErrors",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MerkleTree$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProofErrors"],
    "ZgFile",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$ZgFile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZgFile"],
    "computePaddedSize",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computePaddedSize"],
    "nextPow2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nextPow2"],
    "numSplits",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numSplits"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$Blob$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/Blob.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$ZgFile$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/ZgFile.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MemData$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/MemData.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$MerkleTree$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/MerkleTree.js [app-route] (ecmascript)");
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/factories/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FixedPriceFlow__factory",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$factories$2f$FixedPriceFlow_$5f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FixedPriceFlow__factory"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$factories$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/factories/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$factories$2f$FixedPriceFlow_$5f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/factories/FixedPriceFlow__factory.js [app-route] (ecmascript)");
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FixedPriceFlow__factory",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$factories$2f$FixedPriceFlow_$5f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FixedPriceFlow__factory"],
    "factories",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$factories$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$factories$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/factories/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$factories$2f$FixedPriceFlow_$5f$factory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/factories/FixedPriceFlow__factory.js [app-route] (ecmascript)");
}),
"[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/index.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Batcher",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Batcher"],
    "Blob",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Blob"],
    "DEFAULT_CHUNK_SIZE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_CHUNK_SIZE"],
    "DEFAULT_SEGMENT_MAX_CHUNKS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_MAX_CHUNKS"],
    "DEFAULT_SEGMENT_SIZE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_SEGMENT_SIZE"],
    "Downloader",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Downloader"],
    "EMPTY_CHUNK",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EMPTY_CHUNK"],
    "EMPTY_CHUNK_HASH",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["EMPTY_CHUNK_HASH"],
    "FixedPriceFlow__factory",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["FixedPriceFlow__factory"],
    "GetSplitNum",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["GetSplitNum"],
    "Indexer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$indexer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Indexer"],
    "KvClient",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KvClient"],
    "KvIterator",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["KvIterator"],
    "LeafNode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LeafNode"],
    "MAX_KEY_SIZE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_KEY_SIZE"],
    "MAX_QUERY_SIZE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_QUERY_SIZE"],
    "MAX_SET_SIZE",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MAX_SET_SIZE"],
    "MemData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MemData"],
    "MerkleTree",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MerkleTree"],
    "Proof",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Proof"],
    "ProofErrors",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ProofErrors"],
    "SMALL_FILE_SIZE_THRESHOLD",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SMALL_FILE_SIZE_THRESHOLD"],
    "STREAM_DOMAIN",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["STREAM_DOMAIN"],
    "SegmentRange",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SegmentRange"],
    "StorageKv",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StorageKv"],
    "StorageNode",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StorageNode"],
    "StreamData",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StreamData"],
    "StreamDataBuilder",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["StreamDataBuilder"],
    "TIMEOUT_MS",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["TIMEOUT_MS"],
    "Uploader",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Uploader"],
    "ZERO_HASH",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZERO_HASH"],
    "ZgFile",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZgFile"],
    "calculatePrice",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculatePrice"],
    "checkExist",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkExist"],
    "computePaddedSize",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["computePaddedSize"],
    "defaultUploadOption",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["defaultUploadOption"],
    "delay",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["delay"],
    "factories",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["factories"],
    "getFlowContract",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getFlowContract"],
    "getMarketContract",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMarketContract"],
    "getShardConfigs",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getShardConfigs"],
    "isValidConfig",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isValidConfig"],
    "nextPow2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["nextPow2"],
    "numSplits",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["numSplits"],
    "txWithGasAdjustment",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["txWithGasAdjustment"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$transfer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/transfer/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$indexer$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/indexer/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$kv$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/kv/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$node$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/node/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$file$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/file/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$contracts$2f$flow$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/contracts/flow/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$utils$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/utils.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$packages$2f$web$2f$node_modules$2f40$0glabs$2f$0g$2d$ts$2d$sdk$2f$lib$2e$esm$2f$constant$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/packages/web/node_modules/@0glabs/0g-ts-sdk/lib.esm/constant.js [app-route] (ecmascript)");
}),
];

//# sourceMappingURL=_192e5de7._.js.map