/// <reference types="node" />
export declare class CodeVerifier {
    challenge: string;
    method: string;
    verifier: string;
    private base64URLEncode;
    static sha256(value: string): Buffer;
    private getVerifier;
    constructor();
}
