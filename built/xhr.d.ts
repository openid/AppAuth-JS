/// <reference types="jquery" />
/**
 * An class that abstracts away the ability to make an XMLHttpRequest.
 */
export declare abstract class Requestor {
    abstract xhr<T>(settings: JQueryAjaxSettings): Promise<T>;
}
/**
 * Uses $.ajax to makes the Ajax requests.
 */
export declare class JQueryRequestor extends Requestor {
    xhr<T>(settings: JQueryAjaxSettings): Promise<T>;
}
/**
 * Should be used only in the context of testing. Just uses the underlying
 * Promise to mock the behavior of the Requestor.
 */
export declare class TestRequestor<T> extends Requestor {
    promise: Promise<T>;
    constructor(promise: Promise<T>);
    xhr(settings: JQueryAjaxSettings): Promise<T>;
}
