import { StringMap } from './types';
export declare const GRANT_TYPE_AUTHORIZATION_CODE = "authorization_code";
export declare const GRANT_TYPE_REFRESH_TOKEN = "refresh_token";
/**
 * Represents the Token Request as JSON.
 */
export interface TokenRequestJson {
    grant_type: string;
    code?: string;
    refresh_token?: string;
    redirect_uri: string;
    client_id: string;
    extras?: StringMap;
}
/**
 * Represents an Access Token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.3
 */
export declare class TokenRequest {
    clientId: string;
    redirectUri: string;
    grantType: string;
    code?: string | undefined;
    refreshToken?: string | undefined;
    extras?: StringMap | undefined;
    constructor(clientId: string, redirectUri: string, grantType: string, code?: string | undefined, refreshToken?: string | undefined, extras?: StringMap | undefined);
    /**
     * Serializes a TokenRequest to a JavaScript object.
     */
    toJson(): TokenRequestJson;
    toStringMap(): StringMap;
    static fromJson(input: TokenRequestJson): TokenRequest;
}
