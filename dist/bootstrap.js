/******/
(function (modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ 		// Check if module is in cache
        /******/
        if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
        }
        /******/ 		// Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/            i: moduleId,
            /******/            l: false,
            /******/            exports: {}
            /******/
        };
        /******/
        /******/ 		// Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Flag the module as loaded
        /******/
        module.l = true;
        /******/
        /******/ 		// Return the exports of the module
        /******/
        return module.exports;
        /******/
    }

    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ 	// define getter function for harmony exports
    /******/
    __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, {enumerable: true, get: getter});
            /******/
        }
        /******/
    };
    /******/
    /******/ 	// define __esModule on exports
    /******/
    __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/
            Object.defineProperty(exports, Symbol.toStringTag, {value: 'Module'});
            /******/
        }
        /******/
        Object.defineProperty(exports, '__esModule', {value: true});
        /******/
    };
    /******/
    /******/ 	// create a fake namespace object
    /******/ 	// mode & 1: value is a module id, require it
    /******/ 	// mode & 2: merge all properties of value into the ns
    /******/ 	// mode & 4: return value when already ns object
    /******/ 	// mode & 8|1: behave like require
    /******/
    __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/
        if (mode & 8) return value;
        /******/
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        /******/
        var ns = Object.create(null);
        /******/
        __webpack_require__.r(ns);
        /******/
        Object.defineProperty(ns, 'default', {enumerable: true, value: value});
        /******/
        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {
            return value[key];
        }.bind(null, key));
        /******/
        return ns;
        /******/
    };
    /******/
    /******/ 	// getDefaultExport function for compatibility with non-harmony modules
    /******/
    __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
            /******/            function getDefault() {
                return module['default'];
            } :
            /******/            function getModuleExports() {
                return module;
            };
        /******/
        __webpack_require__.d(getter, 'a', getter);
        /******/
        return getter;
        /******/
    };
    /******/
    /******/ 	// Object.prototype.hasOwnProperty.call
    /******/
    __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    /******/
    /******/ 	// __webpack_public_path__
    /******/
    __webpack_require__.p = "";
    /******/
    /******/ 	// object with all WebAssembly.instance exports
    /******/
    __webpack_require__.w = {};
    /******/
    /******/
    /******/ 	// Load entry module and return exports
    /******/
    return __webpack_require__(__webpack_require__.s = 0);
    /******/
})
/************************************************************************/
/******/({

    /***/ "../pkg sync recursive":
    /*!*******************!*\
      !*** ../pkg sync ***!
      \*******************/
    /*! no static exports found */
    /***/ (function (module, exports) {

        eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"../pkg sync recursive\";\n\n//# sourceURL=webpack:///../pkg_sync?");

        /***/
    }),

    /***/ "../pkg/wasm_rust_tris.js":
    /*!********************************!*\
      !*** ../pkg/wasm_rust_tris.js ***!
      \********************************/
    /*! exports provided: __wbg_new_3a746f2619705add, __wbg_call_f54d3a6dadb199ca, __wbg_self_ac379e780a0d8b94, __wbg_crypto_1e4302b85d4f64a2, __wbg_getRandomValues_1b4ba144162a5c9e, __wbg_getRandomValues_1ef11e888e5228e9, __wbg_require_6461b1e9a0d7c34a, __wbg_randomFillSync_1b52c8482374c55b, __widl_f_log_1_, __widl_instanceof_CanvasRenderingContext2D, __widl_f_begin_path_CanvasRenderingContext2D, __widl_f_fill_CanvasRenderingContext2D, __widl_f_stroke_CanvasRenderingContext2D, __widl_f_set_fill_style_CanvasRenderingContext2D, __widl_f_line_to_CanvasRenderingContext2D, __widl_f_move_to_CanvasRenderingContext2D, __widl_f_fill_rect_CanvasRenderingContext2D, __widl_f_get_element_by_id_Document, __widl_instanceof_HTMLCanvasElement, __widl_f_get_context_HTMLCanvasElement, __widl_f_width_HTMLCanvasElement, __widl_f_set_width_HTMLCanvasElement, __widl_f_height_HTMLCanvasElement, __widl_f_set_height_HTMLCanvasElement, __widl_f_set_text_content_Node, __widl_instanceof_Window, __widl_f_document_Window, __widl_f_inner_width_Window, __widl_f_inner_height_Window, __wbg_newnoargs_a172f39151049128, __wbg_call_8a9c8b0a32a202ff, __wbindgen_string_new, __wbindgen_number_get, __wbindgen_is_undefined, __wbindgen_debug_string, __wbindgen_jsval_eq, __wbindgen_throw, Controller, __wbindgen_object_clone_ref, __wbindgen_object_drop_ref */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_new_3a746f2619705add\", function() { return __wbg_new_3a746f2619705add; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_call_f54d3a6dadb199ca\", function() { return __wbg_call_f54d3a6dadb199ca; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_self_ac379e780a0d8b94\", function() { return __wbg_self_ac379e780a0d8b94; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_crypto_1e4302b85d4f64a2\", function() { return __wbg_crypto_1e4302b85d4f64a2; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_getRandomValues_1b4ba144162a5c9e\", function() { return __wbg_getRandomValues_1b4ba144162a5c9e; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_getRandomValues_1ef11e888e5228e9\", function() { return __wbg_getRandomValues_1ef11e888e5228e9; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_require_6461b1e9a0d7c34a\", function() { return __wbg_require_6461b1e9a0d7c34a; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_randomFillSync_1b52c8482374c55b\", function() { return __wbg_randomFillSync_1b52c8482374c55b; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_log_1_\", function() { return __widl_f_log_1_; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_instanceof_CanvasRenderingContext2D\", function() { return __widl_instanceof_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_begin_path_CanvasRenderingContext2D\", function() { return __widl_f_begin_path_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_fill_CanvasRenderingContext2D\", function() { return __widl_f_fill_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_stroke_CanvasRenderingContext2D\", function() { return __widl_f_stroke_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_set_fill_style_CanvasRenderingContext2D\", function() { return __widl_f_set_fill_style_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_line_to_CanvasRenderingContext2D\", function() { return __widl_f_line_to_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_move_to_CanvasRenderingContext2D\", function() { return __widl_f_move_to_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_fill_rect_CanvasRenderingContext2D\", function() { return __widl_f_fill_rect_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_get_element_by_id_Document\", function() { return __widl_f_get_element_by_id_Document; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_instanceof_HTMLCanvasElement\", function() { return __widl_instanceof_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_get_context_HTMLCanvasElement\", function() { return __widl_f_get_context_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_width_HTMLCanvasElement\", function() { return __widl_f_width_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_set_width_HTMLCanvasElement\", function() { return __widl_f_set_width_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_height_HTMLCanvasElement\", function() { return __widl_f_height_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_set_height_HTMLCanvasElement\", function() { return __widl_f_set_height_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_set_text_content_Node\", function() { return __widl_f_set_text_content_Node; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_instanceof_Window\", function() { return __widl_instanceof_Window; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_document_Window\", function() { return __widl_f_document_Window; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_inner_width_Window\", function() { return __widl_f_inner_width_Window; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_inner_height_Window\", function() { return __widl_f_inner_height_Window; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_newnoargs_a172f39151049128\", function() { return __wbg_newnoargs_a172f39151049128; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_call_8a9c8b0a32a202ff\", function() { return __wbg_call_8a9c8b0a32a202ff; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_string_new\", function() { return __wbindgen_string_new; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_number_get\", function() { return __wbindgen_number_get; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_is_undefined\", function() { return __wbindgen_is_undefined; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_debug_string\", function() { return __wbindgen_debug_string; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_jsval_eq\", function() { return __wbindgen_jsval_eq; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Controller\", function() { return Controller; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_clone_ref\", function() { return __wbindgen_object_clone_ref; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return __wbindgen_object_drop_ref; });\n/* harmony import */ var _wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wasm_rust_tris_bg */ \"../pkg/wasm_rust_tris_bg.wasm\");\n\n\nlet WASM_VECTOR_LEN = 0;\n\nlet cachedTextEncoder = new TextEncoder('utf-8');\n\nlet cachegetUint8Memory = null;\nfunction getUint8Memory() {\n    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory = new Uint8Array(_wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory;\n}\n\nlet passStringToWasm;\nif (typeof cachedTextEncoder.encodeInto === 'function') {\n    passStringToWasm = function(arg) {\n\n\n        let size = arg.length;\n        let ptr = _wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"](size);\n        let offset = 0;\n        {\n            const mem = getUint8Memory();\n            for (; offset < arg.length; offset++) {\n                const code = arg.charCodeAt(offset);\n                if (code > 0x7F) break;\n                mem[ptr + offset] = code;\n            }\n        }\n\n        if (offset !== arg.length) {\n            arg = arg.slice(offset);\n            ptr = _wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"](ptr, size, size = offset + arg.length * 3);\n            const view = getUint8Memory().subarray(ptr + offset, ptr + size);\n            const ret = cachedTextEncoder.encodeInto(arg, view);\n\n            offset += ret.written;\n        }\n        WASM_VECTOR_LEN = offset;\n        return ptr;\n    };\n} else {\n    passStringToWasm = function(arg) {\n\n\n        let size = arg.length;\n        let ptr = _wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"](size);\n        let offset = 0;\n        {\n            const mem = getUint8Memory();\n            for (; offset < arg.length; offset++) {\n                const code = arg.charCodeAt(offset);\n                if (code > 0x7F) break;\n                mem[ptr + offset] = code;\n            }\n        }\n\n        if (offset !== arg.length) {\n            const buf = cachedTextEncoder.encode(arg.slice(offset));\n            ptr = _wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"](ptr, size, size = offset + buf.length);\n            getUint8Memory().set(buf, ptr + offset);\n            offset += buf.length;\n        }\n        WASM_VECTOR_LEN = offset;\n        return ptr;\n    };\n}\n\nlet cachedTextDecoder = new TextDecoder('utf-8');\n\nfunction getStringFromWasm(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nconst heap = new Array(32);\n\nheap.fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nlet heap_next = heap.length;\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nfunction __wbg_new_3a746f2619705add(arg0, arg1) {\n    let varg0 = getStringFromWasm(arg0, arg1);\n    return addHeapObject(new Function(varg0));\n}\n\nfunction getObject(idx) { return heap[idx]; }\n\nfunction __wbg_call_f54d3a6dadb199ca(arg0, arg1) {\n    return addHeapObject(getObject(arg0).call(getObject(arg1)));\n}\n\nfunction __wbg_self_ac379e780a0d8b94(arg0) {\n    return addHeapObject(getObject(arg0).self);\n}\n\nfunction __wbg_crypto_1e4302b85d4f64a2(arg0) {\n    return addHeapObject(getObject(arg0).crypto);\n}\n\nfunction __wbg_getRandomValues_1b4ba144162a5c9e(arg0) {\n    return addHeapObject(getObject(arg0).getRandomValues);\n}\n\nfunction getArrayU8FromWasm(ptr, len) {\n    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);\n}\n\nfunction __wbg_getRandomValues_1ef11e888e5228e9(arg0, arg1, arg2) {\n    let varg1 = getArrayU8FromWasm(arg1, arg2);\n    getObject(arg0).getRandomValues(varg1);\n}\n\nfunction __wbg_require_6461b1e9a0d7c34a(arg0, arg1) {\n    let varg0 = getStringFromWasm(arg0, arg1);\n    return addHeapObject(__webpack_require__(\"../pkg sync recursive\")(varg0));\n}\n\nfunction __wbg_randomFillSync_1b52c8482374c55b(arg0, arg1, arg2) {\n    let varg1 = getArrayU8FromWasm(arg1, arg2);\n    getObject(arg0).randomFillSync(varg1);\n}\n\nfunction __widl_f_log_1_(arg0) {\n    console.log(getObject(arg0));\n}\n\nfunction __widl_instanceof_CanvasRenderingContext2D(idx) { return getObject(idx) instanceof CanvasRenderingContext2D ? 1 : 0; }\n\nfunction __widl_f_begin_path_CanvasRenderingContext2D(arg0) {\n    getObject(arg0).beginPath();\n}\n\nfunction __widl_f_fill_CanvasRenderingContext2D(arg0) {\n    getObject(arg0).fill();\n}\n\nfunction __widl_f_stroke_CanvasRenderingContext2D(arg0) {\n    getObject(arg0).stroke();\n}\n\nfunction __widl_f_set_fill_style_CanvasRenderingContext2D(arg0, arg1) {\n    getObject(arg0).fillStyle = getObject(arg1);\n}\n\nfunction __widl_f_line_to_CanvasRenderingContext2D(arg0, arg1, arg2) {\n    getObject(arg0).lineTo(arg1, arg2);\n}\n\nfunction __widl_f_move_to_CanvasRenderingContext2D(arg0, arg1, arg2) {\n    getObject(arg0).moveTo(arg1, arg2);\n}\n\nfunction __widl_f_fill_rect_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4) {\n    getObject(arg0).fillRect(arg1, arg2, arg3, arg4);\n}\n\nfunction isLikeNone(x) {\n    return x === undefined || x === null;\n}\n\nfunction __widl_f_get_element_by_id_Document(arg0, arg1, arg2) {\n    let varg1 = getStringFromWasm(arg1, arg2);\n\n    const val = getObject(arg0).getElementById(varg1);\n    return isLikeNone(val) ? 0 : addHeapObject(val);\n\n}\n\nfunction __widl_instanceof_HTMLCanvasElement(idx) { return getObject(idx) instanceof HTMLCanvasElement ? 1 : 0; }\n\nlet cachegetUint32Memory = null;\nfunction getUint32Memory() {\n    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== _wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint32Memory = new Uint32Array(_wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint32Memory;\n}\n\nfunction handleError(exnptr, e) {\n    const view = getUint32Memory();\n    view[exnptr / 4] = 1;\n    view[exnptr / 4 + 1] = addHeapObject(e);\n}\n\nfunction __widl_f_get_context_HTMLCanvasElement(arg0, arg1, arg2, exnptr) {\n    let varg1 = getStringFromWasm(arg1, arg2);\n    try {\n\n        const val = getObject(arg0).getContext(varg1);\n        return isLikeNone(val) ? 0 : addHeapObject(val);\n\n    } catch (e) {\n        handleError(exnptr, e);\n    }\n}\n\nfunction __widl_f_width_HTMLCanvasElement(arg0) {\n    return getObject(arg0).width;\n}\n\nfunction __widl_f_set_width_HTMLCanvasElement(arg0, arg1) {\n    getObject(arg0).width = arg1 >>> 0;\n}\n\nfunction __widl_f_height_HTMLCanvasElement(arg0) {\n    return getObject(arg0).height;\n}\n\nfunction __widl_f_set_height_HTMLCanvasElement(arg0, arg1) {\n    getObject(arg0).height = arg1 >>> 0;\n}\n\nfunction __widl_f_set_text_content_Node(arg0, arg1, arg2) {\n    let varg1 = arg1 == 0 ? undefined : getStringFromWasm(arg1, arg2);\n    getObject(arg0).textContent = varg1;\n}\n\nfunction __widl_instanceof_Window(idx) { return getObject(idx) instanceof Window ? 1 : 0; }\n\nfunction __widl_f_document_Window(arg0) {\n\n    const val = getObject(arg0).document;\n    return isLikeNone(val) ? 0 : addHeapObject(val);\n\n}\n\nfunction __widl_f_inner_width_Window(arg0, exnptr) {\n    try {\n        return addHeapObject(getObject(arg0).innerWidth);\n    } catch (e) {\n        handleError(exnptr, e);\n    }\n}\n\nfunction __widl_f_inner_height_Window(arg0, exnptr) {\n    try {\n        return addHeapObject(getObject(arg0).innerHeight);\n    } catch (e) {\n        handleError(exnptr, e);\n    }\n}\n\nfunction __wbg_newnoargs_a172f39151049128(arg0, arg1) {\n    let varg0 = getStringFromWasm(arg0, arg1);\n    return addHeapObject(new Function(varg0));\n}\n\nfunction __wbg_call_8a9c8b0a32a202ff(arg0, arg1, exnptr) {\n    try {\n        return addHeapObject(getObject(arg0).call(getObject(arg1)));\n    } catch (e) {\n        handleError(exnptr, e);\n    }\n}\n\nfunction __wbindgen_string_new(p, l) { return addHeapObject(getStringFromWasm(p, l)); }\n\nfunction __wbindgen_number_get(n, invalid) {\n    let obj = getObject(n);\n    if (typeof(obj) === 'number') return obj;\n    getUint8Memory()[invalid] = 1;\n    return 0;\n}\n\nfunction __wbindgen_is_undefined(i) { return getObject(i) === undefined ? 1 : 0; }\n\nfunction __wbindgen_debug_string(i, len_ptr) {\n    const debug_str =\n    val => {\n        // primitive types\n        const type = typeof val;\n        if (type == 'number' || type == 'boolean' || val == null) {\n            return  `${val}`;\n        }\n        if (type == 'string') {\n            return `\"${val}\"`;\n        }\n        if (type == 'symbol') {\n            const description = val.description;\n            if (description == null) {\n                return 'Symbol';\n            } else {\n                return `Symbol(${description})`;\n            }\n        }\n        if (type == 'function') {\n            const name = val.name;\n            if (typeof name == 'string' && name.length > 0) {\n                return `Function(${name})`;\n            } else {\n                return 'Function';\n            }\n        }\n        // objects\n        if (Array.isArray(val)) {\n            const length = val.length;\n            let debug = '[';\n            if (length > 0) {\n                debug += debug_str(val[0]);\n            }\n            for(let i = 1; i < length; i++) {\n                debug += ', ' + debug_str(val[i]);\n            }\n            debug += ']';\n            return debug;\n        }\n        // Test for built-in\n        const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));\n        let className;\n        if (builtInMatches.length > 1) {\n            className = builtInMatches[1];\n        } else {\n            // Failed to match the standard '[object ClassName]'\n            return toString.call(val);\n        }\n        if (className == 'Object') {\n            // we're a user defined class or Object\n            // JSON.stringify avoids problems with cycles, and is generally much\n            // easier than looping through ownProperties of `val`.\n            try {\n                return 'Object(' + JSON.stringify(val) + ')';\n            } catch (_) {\n                return 'Object';\n            }\n        }\n        // errors\n        if (val instanceof Error) {\n        return `${val.name}: ${val.message}\n        ${val.stack}`;\n    }\n    // TODO we could test for more things here, like `Set`s and `Map`s.\n    return className;\n}\n;\nconst toString = Object.prototype.toString;\nconst val = getObject(i);\nconst debug = debug_str(val);\nconst ptr = passStringToWasm(debug);\ngetUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;\nreturn ptr;\n}\n\nfunction __wbindgen_jsval_eq(a, b) { return getObject(a) === getObject(b) ? 1 : 0; }\n\nfunction __wbindgen_throw(ptr, len) {\n    throw new Error(getStringFromWasm(ptr, len));\n}\n\nfunction freeController(ptr) {\n\n    _wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbg_controller_free\"](ptr);\n}\n/**\n*/\nclass Controller {\n\n    static __wrap(ptr) {\n        const obj = Object.create(Controller.prototype);\n        obj.ptr = ptr;\n\n        return obj;\n    }\n\n    free() {\n        const ptr = this.ptr;\n        this.ptr = 0;\n        freeController(ptr);\n    }\n\n    /**\n    * @returns {Controller}\n    */\n    static make() {\n        return Controller.__wrap(_wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"controller_make\"]());\n    }\n    /**\n    * @returns {void}\n    */\n    render() {\n        return _wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"controller_render\"](this.ptr);\n    }\n    /**\n    * @param {number} ms_delta_time\n    * @returns {boolean}\n    */\n    update(ms_delta_time) {\n        return (_wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"controller_update\"](this.ptr, ms_delta_time)) !== 0;\n    }\n    /**\n    * @returns {void}\n    */\n    reset() {\n        return _wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"controller_reset\"](this.ptr);\n    }\n    /**\n    * @returns {void}\n    */\n    resize() {\n        return _wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"controller_resize\"](this.ptr);\n    }\n    /**\n    * @param {string} code\n    * @returns {boolean}\n    */\n    press_key(code) {\n        const ptr0 = passStringToWasm(code);\n        const len0 = WASM_VECTOR_LEN;\n        try {\n            return (_wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"controller_press_key\"](this.ptr, ptr0, len0)) !== 0;\n\n        } finally {\n            _wasm_rust_tris_bg__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](ptr0, len0 * 1);\n\n        }\n\n    }\n}\n\nfunction __wbindgen_object_clone_ref(idx) {\n    return addHeapObject(getObject(idx));\n}\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction __wbindgen_object_drop_ref(i) { dropObject(i); }\n\n\n\n//# sourceURL=webpack:///../pkg/wasm_rust_tris.js?");

        /***/
    }),

    /***/ "../pkg/wasm_rust_tris_bg.wasm":
    /*!*************************************!*\
      !*** ../pkg/wasm_rust_tris_bg.wasm ***!
      \*************************************/
    /*! exports provided: memory, __wbg_controller_free, controller_make, controller_render, controller_update, controller_reset, controller_resize, controller_press_key, __wbindgen_malloc, __wbindgen_realloc, __wbindgen_free */
    /***/ (function (module, exports, __webpack_require__) {

        eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./wasm_rust_tris */ \"../pkg/wasm_rust_tris.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/wasm_rust_tris_bg.wasm?");

        /***/
    }),

    /***/ "./index.js":
    /*!******************!*\
      !*** ./index.js ***!
      \******************/
    /*! no exports provided */
    /***/ (function (module, __webpack_exports__, __webpack_require__) {

        "use strict";
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var wasm_rust_tris__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wasm-rust-tris */ \"../pkg/wasm_rust_tris.js\");\n// import('../pkg/wasm_rust_tris')\n//     .catch(console.error);\n\n\n\n\n// Global State\nconst tetrisGame = wasm_rust_tris__WEBPACK_IMPORTED_MODULE_0__[\"Controller\"].make();\nlet lastTime = Date.now();\nlet animationId = null;\nlet isGameOver = false;\nconst PAUSE_CODE = \"PAUSE\";\n\n\nconst isPaused = () => {\n    return animationId === null;\n};\n\nconst renderLoop = () => {\n    const newTime = Date.now();\n    const ms_time_delta = newTime - lastTime;\n    lastTime = newTime;\n\n    if (pollGamepads(ms_time_delta) === PAUSE_CODE) {\n        togglePause();\n        return;\n    }\n    isGameOver = tetrisGame.update(ms_time_delta);\n    tetrisGame.render();\n\n    if (!isGameOver) {\n        animationId = requestAnimationFrame(renderLoop);\n    } else {\n        console.log(\"Game Over!!!\");\n        pauseBtn.textContent = \"\\u25b6\";\n        if (animationId) {\n            cancelAnimationFrame(animationId);\n            animationId = null;\n        }\n    }\n};\n\nconst retTrue = () => { return true; };\n\nwindow.onresize = () => {\n    tetrisGame.resize();\n};\n\nconst pauseBtn = document.getElementById(\"pause_play\");\n\nconst newGame = () => {\n    tetrisGame.reset();\n    isGameOver = false;\n    lastTime = Date.now();\n    // force paused condition, if not already present\n    if (animationId) {\n        cancelAnimationFrame(animationId);\n        animationId = null;\n    }\n    // start the game running again\n    togglePause();\n};\n\nconst togglePause = () => {\n    console.log('togglePause');\n    if (isGameOver) {\n        newGame();\n        return;\n    }\n    if (isPaused()) {\n        console.log('play');\n        pauseBtn.textContent = '\\u23f8';\n        animationId = requestAnimationFrame(renderLoop);\n    } else {\n        console.log('pause');\n        pauseBtn.textContent = \"\\u25b6\";\n        cancelAnimationFrame(animationId);\n        animationId = null;\n    }\n};\n\npauseBtn.onclick = () => { togglePause(); };\n\ndocument.addEventListener('keypress', (event) => {\n    if (isPaused()) {\n        if (event.code === \"Escape\") {\n            togglePause();\n        }\n    } else if (!isGameOver && !isPaused()) {\n        const shouldPause = tetrisGame.press_key(event.code);\n        if (shouldPause) {\n            togglePause();\n        }\n    }\n});\n\nconst buttonToKeyCode = new Map([\n    [\"rotate_left\", \"KeyQ\"],\n    [\"rotate_right\", \"KeyE\"],\n    [\"move_left\", \"KeyA\"],\n    [\"move_right\", \"KeyD\"],\n    [\"move_down\", \"KeyS\"],\n]);\n\nconst gamepadButtonToKeyCode = new Map([\n    [2, \"KeyQ\"],\n    [0, \"KeyE\"],\n    [14, \"KeyA\"],\n    [15, \"KeyD\"],\n    [13, \"KeyS\"],\n    [8, PAUSE_CODE],\n    [9, PAUSE_CODE],\n]);\n\n\nbuttonToKeyCode.forEach((keyCode, buttonId) => {\n    // console.log(buttonId, keyCode);\n    document.getElementById(buttonId).addEventListener(\"click\", () => {\n        tetrisGame.press_key(keyCode);\n    });\n});\n\ndocument.getElementById(\"reset\").addEventListener(\"click\", () => {\n    newGame();\n});\n\n\n// Gamepad handling:\nconst buttonPressed = (b) => {\n    if (typeof (b) == \"object\") {\n        return b.pressed;\n    }\n    return b === 1.0;\n};\n\n// Global gamepad handling state\nlet buttonTimeouts = Array.apply(null, Array(17)).map(() => {\n    return 0;\n});\n\nconst TIMES_PER_SECOND_CAN_MOVE = 30.0;\nconst TIMES_PER_SECOND_CAN_ROTATE = 10.0;\nconst MOVEMENT_BUTTON_TIMEOUT_MS = 1000.0 / TIMES_PER_SECOND_CAN_MOVE;\nconst ROTATE_BUTTON_TIMEOUT_MS = 1000.0 / TIMES_PER_SECOND_CAN_ROTATE;\nconst PAUSE_BUTTON_TIMEOUT_MS = 1000.0;\n\nconst pollGamepads = (timeDeltaMs) => {\n    const gamepads = navigator.getGamepads ? navigator.getGamepads()\n        : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);\n    if (!gamepads) {\n        return null;\n    }\n\n    const gp = gamepads[0];\n    if (!gp) {\n        return null;\n    }\n\n    for (let [index, keyCode] of gamepadButtonToKeyCode.entries()) {\n        if (buttonTimeouts[index] > 0) {\n            buttonTimeouts[index] -= timeDeltaMs;\n        } else if (buttonPressed(gp.buttons[index])) {\n            if (keyCode === PAUSE_CODE) {\n                return PAUSE_CODE;\n            } else {\n                tetrisGame.press_key(keyCode);\n                if (keyCode === \"KeyQ\" || keyCode === \"KeyE\") {\n                    buttonTimeouts[index] = ROTATE_BUTTON_TIMEOUT_MS;\n                } else {\n                    buttonTimeouts[index] = MOVEMENT_BUTTON_TIMEOUT_MS;\n                }\n            }\n        }\n    }\n    return null;\n};\n\n// Start game running\ntogglePause();\n\n//# sourceURL=webpack:///./index.js?");

        /***/
    }),

    /***/ 0:
    /*!*****************************************!*\
      !*** multi ./index.js ./dist/bundle.js ***!
      \*****************************************/
    /*! no static exports found */
    /***/ (function (module, exports, __webpack_require__) {

        eval("__webpack_require__(/*! C:\\Users\\dave\\CLionProjects\\wasm-rust-tris\\www\\index.js */\"./index.js\");\n!(function webpackMissingModule() { var e = new Error(\"Cannot find module './dist/bundle.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\n\n//# sourceURL=webpack:///multi_./index.js_./dist/bundle.js?");

        /***/
    })

    /******/
});