import { StringMap } from './types';
/**
 * Represents the Token Request as JSON.
 */
export interface RevokeTokenRequestJson {
    token: string;
    token_type_hint?: string;
}
/**
 * Represents a revoke token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc7009#section-2.1
 */
export declare class RevokeTokenRequest {
    token: string;
    tokenTypeHint: string | undefined;
    clientId: string | undefined;
    clientSecret: string | undefined;
    constructor(token: string, tokenTypeHint?: string | undefined, clientId?: string | undefined, clientSecret?: string | undefined);
    /**
     * Serializes a TokenRequest to a JavaScript object.
     */
    toJson(): RevokeTokenRequestJson;
    toStringMap(): StringMap;
    static fromJson(input: RevokeTokenRequestJson): RevokeTokenRequest;
}
