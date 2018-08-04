/**
 * class for PKCE code challenge and code verifier generation.
 */
export declare class CodeVerifier {
    challenge: string;
    method: string;
    verifier: string;
    /**
     * base64 encoding
     *
     * @param value text to encode
     */
    private base64URLEncode;
    /**
     * Generate SHA256 code for given value
     *
     * @param value text to generate SHA256 code
     */
    static sha256(value: string): ArrayBuffer;
    /**
     * Get PKCE code verifier code.
     */
    private getVerifier;
    constructor();
}
