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
