/**
 * A subset of the `Storage` interface which we need for the backends to work.
 *
 * Essentially removes the indexable properties and readonly properties from
 * `Storage` in lib.dom.d.ts. This is so that a custom type can extend it for
 * testing.
 */
export interface UnderlyingStorage {
    readonly length: number;
    clear(): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
    setItem(key: string, data: string): void;
}
/**
 * Asynchronous storage APIs. All methods return a `Promise`.
 * All methods take the `DOMString`
 * IDL type (as it is the lowest common denominator).
 */
export declare abstract class StorageBackend {
    /**
     * When passed a key `name`, will return that key's value.
     */
    abstract getItem(name: string): Promise<string | null>;
    /**
     * When passed a key `name`, will remove that key from the storage.
     */
    abstract removeItem(name: string): Promise<void>;
    /**
     * When invoked, will empty all keys out of the storage.
     */
    abstract clear(): Promise<void>;
    /**
     * The setItem() method of the `StorageBackend` interface,
     * when passed a key name and value, will add that key to the storage,
     * or update that key's value if it already exists.
     */
    abstract setItem(name: string, value: string): Promise<void>;
}
/**
 * A `StorageBackend` backed by `localstorage`.
 */
export declare class LocalStorageBackend extends StorageBackend {
    private storage;
    constructor(storage?: UnderlyingStorage);
    getItem(name: string): Promise<string | null>;
    removeItem(name: string): Promise<void>;
    clear(): Promise<void>;
    setItem(name: string, value: string): Promise<void>;
}
