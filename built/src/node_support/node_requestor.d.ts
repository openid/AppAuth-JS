import { Requestor } from '../xhr.ts';
/**
 * A Node.js HTTP client.
 */
export declare class NodeRequestor extends Requestor {
    xhr<T>(settings: JQueryAjaxSettings): Promise<T>;
}
