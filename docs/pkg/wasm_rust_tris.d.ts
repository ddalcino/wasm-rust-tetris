/* tslint:disable */
/**
*/
export class Controller {
  free(): void;
/**
* @returns {Controller} 
*/
  static make(): Controller;
/**
* @returns {void} 
*/
  render(): void;
/**
* @param {number} ms_delta_time 
* @returns {boolean} 
*/
  update(ms_delta_time: number): boolean;
/**
* @returns {void} 
*/
  reset(): void;
/**
* @returns {void} 
*/
  resize(): void;
/**
* @param {string} code 
* @returns {boolean} 
*/
  press_key(code: string): boolean;
}

/**
* If `module_or_path` is {RequestInfo}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {RequestInfo | BufferSource | WebAssembly.Module} module_or_path
*
* @returns {Promise<any>}
*/
export default function init (module_or_path: RequestInfo | BufferSource | WebAssembly.Module): Promise<any>;
        