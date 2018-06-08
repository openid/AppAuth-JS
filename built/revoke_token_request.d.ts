/**
 * Supported token types
 */
export declare type TokenTypeHint = 'refresh_token' | 'access_token';
/**
 * Represents the Token Request as JSON.
 */
export interface RevokeTokenRequestJson {
    token: string;
    token_type_hint?: TokenTypeHint;
    client_id?: string;
    client_secret?: string;
}
/**
 * Represents a revoke token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc7009#section-2.1
 */
export declare class RevokeTokenRequest {
    token: string;
    tokenTypeHint?: "refresh_token" | "access_token" | undefined;
    clientId?: string | undefined;
    clientSecret?: string | undefined;
    constructor(token: string, tokenTypeHint?: "refresh_token" | "access_token" | undefined, clientId?: string | undefined, clientSecret?: string | undefined);
    /**
     * Serializes a TokenRequest to a JavaScript object.
     */
    toJson(): RevokeTokenRequestJson;
    static fromJson(input: RevokeTokenRequestJson): RevokeTokenRequest;
}
