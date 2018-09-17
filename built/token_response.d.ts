/**
 * Represents the access token types.
 * For more information see:
 * https://tools.ietf.org/html/rfc6749#section-7.1
 */
export declare type TokenType = 'bearer' | 'mac';
/**
 * Represents the TokenResponse as a JSON Object.
 */
export interface TokenResponseJson {
    access_token: string;
    token_type?: TokenType;
    expires_in?: number;
    refresh_token?: string;
    scope?: string;
    id_token?: string;
    issued_at?: number;
}
/**
 * Represents the possible error codes from the token endpoint.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.2
 */
export declare type ErrorType = 'invalid_request' | 'invalid_client' | 'invalid_grant' | 'unauthorized_client' | 'unsupported_grant_type' | 'invalid_scope';
/**
 * Represents the TokenError as a JSON Object.
 */
export interface TokenErrorJson {
    error: ErrorType;
    error_description?: string;
    error_uri?: string;
}
/**
 * Returns the instant of time in seconds.
 */
export declare const nowInSeconds: () => number;
/**
 * Represents the Token Response type.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.1
 */
export declare class TokenResponse {
    accessToken: string;
    tokenType: TokenType;
    expiresIn: number | undefined;
    refreshToken: string | undefined;
    scope: string | undefined;
    idToken: string | undefined;
    issuedAt: number;
    constructor(response: TokenResponseJson);
    toJson(): TokenResponseJson;
    isValid(buffer?: number): boolean;
}
/**
 * Represents the Token Error type.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.2
 */
export declare class TokenError {
    error: ErrorType;
    errorDescription: string | undefined;
    errorUri: string | undefined;
    constructor(tokenError: TokenErrorJson);
    toJson(): TokenErrorJson;
}
