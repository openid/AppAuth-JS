export declare function bufferToString(buffer: Uint8Array): string;
export declare function urlSafe(buffer: Uint8Array): string;
export declare function textEncodeLite(str: string): Uint8Array;
export interface Crypto {
    /**
     * Generate a random string
     */
    generateRandom(size: number): string;
    /**
     * Compute the SHA256 of a given code.
     * This is useful when using PKCE.
     */
    deriveChallenge(code: string): Promise<string>;
}
/**
 * The default implementation of the `Crypto` interface.
 * This uses the capabilities of the browser.
 */
export declare class DefaultCrypto implements Crypto {
    generateRandom(size: number): string;
    deriveChallenge(code: string): Promise<string>;
}
