/// <reference types="jquery" />
import { Requestor } from '../xhr';
/**
 * A Node.js HTTP client.
 */
export declare class NodeRequestor extends Requestor {
    xhr<T>(settings: JQueryAjaxSettings): Promise<T>;
}
