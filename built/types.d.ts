export interface StringMap {
    [key: string]: string;
}
/**
 * Represents a window.location like object.
 */
export interface LocationLike {
    hash: string;
    host: string;
    origin: string;
    hostname: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    assign(url: string): void;
}
