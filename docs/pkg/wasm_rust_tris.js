
const __exports = {};
let wasm;

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            arg = arg.slice(offset);
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + arg.length * 3);
            const view = getUint8Memory().subarray(ptr + offset, ptr + size);
            const ret = cachedTextEncoder.encodeInto(arg, view);

            offset += ret.written;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {


        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let offset = 0;
        {
            const mem = getUint8Memory();
            for (; offset < arg.length; offset++) {
                const code = arg.charCodeAt(offset);
                if (code > 0x7F) break;
                mem[ptr + offset] = code;
            }
        }

        if (offset !== arg.length) {
            const buf = cachedTextEncoder.encode(arg.slice(offset));
            ptr = wasm.__wbindgen_realloc(ptr, size, size = offset + buf.length);
            getUint8Memory().set(buf, ptr + offset);
            offset += buf.length;
        }
        WASM_VECTOR_LEN = offset;
        return ptr;
    };
}

let cachedTextDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function __wbg_new_3a746f2619705add(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}
__exports.__wbg_new_3a746f2619705add = __wbg_new_3a746f2619705add

function getObject(idx) { return heap[idx]; }

function __wbg_call_f54d3a6dadb199ca(arg0, arg1) {
    return addHeapObject(getObject(arg0).call(getObject(arg1)));
}
__exports.__wbg_call_f54d3a6dadb199ca = __wbg_call_f54d3a6dadb199ca

function __wbg_self_ac379e780a0d8b94(arg0) {
    return addHeapObject(getObject(arg0).self);
}
__exports.__wbg_self_ac379e780a0d8b94 = __wbg_self_ac379e780a0d8b94

function __wbg_crypto_1e4302b85d4f64a2(arg0) {
    return addHeapObject(getObject(arg0).crypto);
}
__exports.__wbg_crypto_1e4302b85d4f64a2 = __wbg_crypto_1e4302b85d4f64a2

function __wbg_getRandomValues_1b4ba144162a5c9e(arg0) {
    return addHeapObject(getObject(arg0).getRandomValues);
}
__exports.__wbg_getRandomValues_1b4ba144162a5c9e = __wbg_getRandomValues_1b4ba144162a5c9e

function getArrayU8FromWasm(ptr, len) {
    return getUint8Memory().subarray(ptr / 1, ptr / 1 + len);
}

function __wbg_getRandomValues_1ef11e888e5228e9(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).getRandomValues(varg1);
}
__exports.__wbg_getRandomValues_1ef11e888e5228e9 = __wbg_getRandomValues_1ef11e888e5228e9

function __wbg_require_6461b1e9a0d7c34a(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(require(varg0));
}
__exports.__wbg_require_6461b1e9a0d7c34a = __wbg_require_6461b1e9a0d7c34a

function __wbg_randomFillSync_1b52c8482374c55b(arg0, arg1, arg2) {
    let varg1 = getArrayU8FromWasm(arg1, arg2);
    getObject(arg0).randomFillSync(varg1);
}
__exports.__wbg_randomFillSync_1b52c8482374c55b = __wbg_randomFillSync_1b52c8482374c55b

function __widl_f_log_1_(arg0) {
    console.log(getObject(arg0));
}
__exports.__widl_f_log_1_ = __widl_f_log_1_

function __widl_instanceof_CanvasRenderingContext2D(idx) { return getObject(idx) instanceof CanvasRenderingContext2D ? 1 : 0; }
__exports.__widl_instanceof_CanvasRenderingContext2D = __widl_instanceof_CanvasRenderingContext2D

function __widl_f_begin_path_CanvasRenderingContext2D(arg0) {
    getObject(arg0).beginPath();
}
__exports.__widl_f_begin_path_CanvasRenderingContext2D = __widl_f_begin_path_CanvasRenderingContext2D

function __widl_f_fill_CanvasRenderingContext2D(arg0) {
    getObject(arg0).fill();
}
__exports.__widl_f_fill_CanvasRenderingContext2D = __widl_f_fill_CanvasRenderingContext2D

function __widl_f_stroke_CanvasRenderingContext2D(arg0) {
    getObject(arg0).stroke();
}
__exports.__widl_f_stroke_CanvasRenderingContext2D = __widl_f_stroke_CanvasRenderingContext2D

function __widl_f_set_fill_style_CanvasRenderingContext2D(arg0, arg1) {
    getObject(arg0).fillStyle = getObject(arg1);
}
__exports.__widl_f_set_fill_style_CanvasRenderingContext2D = __widl_f_set_fill_style_CanvasRenderingContext2D

function __widl_f_line_to_CanvasRenderingContext2D(arg0, arg1, arg2) {
    getObject(arg0).lineTo(arg1, arg2);
}
__exports.__widl_f_line_to_CanvasRenderingContext2D = __widl_f_line_to_CanvasRenderingContext2D

function __widl_f_move_to_CanvasRenderingContext2D(arg0, arg1, arg2) {
    getObject(arg0).moveTo(arg1, arg2);
}
__exports.__widl_f_move_to_CanvasRenderingContext2D = __widl_f_move_to_CanvasRenderingContext2D

function __widl_f_fill_rect_CanvasRenderingContext2D(arg0, arg1, arg2, arg3, arg4) {
    getObject(arg0).fillRect(arg1, arg2, arg3, arg4);
}
__exports.__widl_f_fill_rect_CanvasRenderingContext2D = __widl_f_fill_rect_CanvasRenderingContext2D

function isLikeNone(x) {
    return x === undefined || x === null;
}

function __widl_f_get_element_by_id_Document(arg0, arg1, arg2) {
    let varg1 = getStringFromWasm(arg1, arg2);

    const val = getObject(arg0).getElementById(varg1);
    return isLikeNone(val) ? 0 : addHeapObject(val);

}
__exports.__widl_f_get_element_by_id_Document = __widl_f_get_element_by_id_Document

function __widl_instanceof_HTMLCanvasElement(idx) { return getObject(idx) instanceof HTMLCanvasElement ? 1 : 0; }
__exports.__widl_instanceof_HTMLCanvasElement = __widl_instanceof_HTMLCanvasElement

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

function handleError(exnptr, e) {
    const view = getUint32Memory();
    view[exnptr / 4] = 1;
    view[exnptr / 4 + 1] = addHeapObject(e);
}

function __widl_f_get_context_HTMLCanvasElement(arg0, arg1, arg2, exnptr) {
    let varg1 = getStringFromWasm(arg1, arg2);
    try {

        const val = getObject(arg0).getContext(varg1);
        return isLikeNone(val) ? 0 : addHeapObject(val);

    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__widl_f_get_context_HTMLCanvasElement = __widl_f_get_context_HTMLCanvasElement

function __widl_f_width_HTMLCanvasElement(arg0) {
    return getObject(arg0).width;
}
__exports.__widl_f_width_HTMLCanvasElement = __widl_f_width_HTMLCanvasElement

function __widl_f_set_width_HTMLCanvasElement(arg0, arg1) {
    getObject(arg0).width = arg1 >>> 0;
}
__exports.__widl_f_set_width_HTMLCanvasElement = __widl_f_set_width_HTMLCanvasElement

function __widl_f_height_HTMLCanvasElement(arg0) {
    return getObject(arg0).height;
}
__exports.__widl_f_height_HTMLCanvasElement = __widl_f_height_HTMLCanvasElement

function __widl_f_set_height_HTMLCanvasElement(arg0, arg1) {
    getObject(arg0).height = arg1 >>> 0;
}
__exports.__widl_f_set_height_HTMLCanvasElement = __widl_f_set_height_HTMLCanvasElement

function __widl_f_set_text_content_Node(arg0, arg1, arg2) {
    let varg1 = arg1 == 0 ? undefined : getStringFromWasm(arg1, arg2);
    getObject(arg0).textContent = varg1;
}
__exports.__widl_f_set_text_content_Node = __widl_f_set_text_content_Node

function __widl_instanceof_Window(idx) { return getObject(idx) instanceof Window ? 1 : 0; }
__exports.__widl_instanceof_Window = __widl_instanceof_Window

function __widl_f_document_Window(arg0) {

    const val = getObject(arg0).document;
    return isLikeNone(val) ? 0 : addHeapObject(val);

}
__exports.__widl_f_document_Window = __widl_f_document_Window

function __widl_f_inner_width_Window(arg0, exnptr) {
    try {
        return addHeapObject(getObject(arg0).innerWidth);
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__widl_f_inner_width_Window = __widl_f_inner_width_Window

function __widl_f_inner_height_Window(arg0, exnptr) {
    try {
        return addHeapObject(getObject(arg0).innerHeight);
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__widl_f_inner_height_Window = __widl_f_inner_height_Window

function __wbg_newnoargs_a172f39151049128(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    return addHeapObject(new Function(varg0));
}
__exports.__wbg_newnoargs_a172f39151049128 = __wbg_newnoargs_a172f39151049128

function __wbg_call_8a9c8b0a32a202ff(arg0, arg1, exnptr) {
    try {
        return addHeapObject(getObject(arg0).call(getObject(arg1)));
    } catch (e) {
        handleError(exnptr, e);
    }
}
__exports.__wbg_call_8a9c8b0a32a202ff = __wbg_call_8a9c8b0a32a202ff

function __wbindgen_string_new(p, l) { return addHeapObject(getStringFromWasm(p, l)); }
__exports.__wbindgen_string_new = __wbindgen_string_new

function __wbindgen_number_get(n, invalid) {
    let obj = getObject(n);
    if (typeof(obj) === 'number') return obj;
    getUint8Memory()[invalid] = 1;
    return 0;
}
__exports.__wbindgen_number_get = __wbindgen_number_get

function __wbindgen_is_undefined(i) { return getObject(i) === undefined ? 1 : 0; }
__exports.__wbindgen_is_undefined = __wbindgen_is_undefined

function __wbindgen_debug_string(i, len_ptr) {
    const debug_str =
    val => {
        // primitive types
        const type = typeof val;
        if (type == 'number' || type == 'boolean' || val == null) {
            return  `${val}`;
        }
        if (type == 'string') {
            return `"${val}"`;
        }
        if (type == 'symbol') {
            const description = val.description;
            if (description == null) {
                return 'Symbol';
            } else {
                return `Symbol(${description})`;
            }
        }
        if (type == 'function') {
            const name = val.name;
            if (typeof name == 'string' && name.length > 0) {
                return `Function(${name})`;
            } else {
                return 'Function';
            }
        }
        // objects
        if (Array.isArray(val)) {
            const length = val.length;
            let debug = '[';
            if (length > 0) {
                debug += debug_str(val[0]);
            }
            for(let i = 1; i < length; i++) {
                debug += ', ' + debug_str(val[i]);
            }
            debug += ']';
            return debug;
        }
        // Test for built-in
        const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
        let className;
        if (builtInMatches.length > 1) {
            className = builtInMatches[1];
        } else {
            // Failed to match the standard '[object ClassName]'
            return toString.call(val);
        }
        if (className == 'Object') {
            // we're a user defined class or Object
            // JSON.stringify avoids problems with cycles, and is generally much
            // easier than looping through ownProperties of `val`.
            try {
                return 'Object(' + JSON.stringify(val) + ')';
            } catch (_) {
                return 'Object';
            }
        }
        // errors
        if (val instanceof Error) {
        return `${val.name}: ${val.message}
        ${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}
;
const toString = Object.prototype.toString;
const val = getObject(i);
const debug = debug_str(val);
const ptr = passStringToWasm(debug);
getUint32Memory()[len_ptr / 4] = WASM_VECTOR_LEN;
return ptr;
}
__exports.__wbindgen_debug_string = __wbindgen_debug_string

function __wbindgen_jsval_eq(a, b) { return getObject(a) === getObject(b) ? 1 : 0; }
__exports.__wbindgen_jsval_eq = __wbindgen_jsval_eq

function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}
__exports.__wbindgen_throw = __wbindgen_throw

function freeController(ptr) {

    wasm.__wbg_controller_free(ptr);
}
/**
*/
export class Controller {

    static __wrap(ptr) {
        const obj = Object.create(Controller.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeController(ptr);
    }

    /**
    * @returns {Controller}
    */
    static make() {
        return Controller.__wrap(wasm.controller_make());
    }
    /**
    * @returns {void}
    */
    render() {
        return wasm.controller_render(this.ptr);
    }
    /**
    * @param {number} ms_delta_time
    * @returns {boolean}
    */
    update(ms_delta_time) {
        return (wasm.controller_update(this.ptr, ms_delta_time)) !== 0;
    }
    /**
    * @returns {void}
    */
    reset() {
        return wasm.controller_reset(this.ptr);
    }
    /**
    * @returns {void}
    */
    resize() {
        return wasm.controller_resize(this.ptr);
    }
    /**
    * @param {string} code
    * @returns {boolean}
    */
    press_key(code) {
        const ptr0 = passStringToWasm(code);
        const len0 = WASM_VECTOR_LEN;
        try {
            return (wasm.controller_press_key(this.ptr, ptr0, len0)) !== 0;

        } finally {
            wasm.__wbindgen_free(ptr0, len0 * 1);

        }

    }
}

function __wbindgen_object_clone_ref(idx) {
    return addHeapObject(getObject(idx));
}
__exports.__wbindgen_object_clone_ref = __wbindgen_object_clone_ref

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function __wbindgen_object_drop_ref(i) { dropObject(i); }
__exports.__wbindgen_object_drop_ref = __wbindgen_object_drop_ref

function init(module) {
    let result;
    const imports = { './wasm_rust_tris': __exports };

    if (module instanceof URL || typeof module === 'string' || module instanceof Request) {

        const response = fetch(module);
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            result = WebAssembly.instantiateStreaming(response, imports)
            .catch(e => {
                console.warn("`WebAssembly.instantiateStreaming` failed. Assuming this is because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
                return response
                .then(r => r.arrayBuffer())
                .then(bytes => WebAssembly.instantiate(bytes, imports));
            });
        } else {
            result = response
            .then(r => r.arrayBuffer())
            .then(bytes => WebAssembly.instantiate(bytes, imports));
        }
    } else {

        result = WebAssembly.instantiate(module, imports)
        .then(result => {
            if (result instanceof WebAssembly.Instance) {
                return { instance: result, module };
            } else {
                return result;
            }
        });
    }
    return result.then(({instance, module}) => {
        wasm = instance.exports;
        init.__wbindgen_wasm_module = module;

        return wasm;
    });
}

export default init;

