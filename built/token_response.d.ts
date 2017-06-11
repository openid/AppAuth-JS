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
    issued_at?: number;
    expires_in?: number;
    refresh_token?: string;
    scope?: string;
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
 * Represents the Token Response type.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.1
 */
export declare class TokenResponse {
    accessToken: string;
    refreshToken: string;
    scope: string;
    tokenType: TokenType;
    issuedAt: number;
    expiresIn: number;
    constructor(accessToken: string, refreshToken?: string, scope?: string, tokenType?: TokenType, issuedAt?: number, expiresIn?: number);
    toJson(): TokenResponseJson;
    isValid(): boolean;
    static fromJson(input: TokenResponseJson): TokenResponse;
}
/**
 * Represents the Token Error type.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.2
 */
export declare class TokenError {
    readonly error: ErrorType;
    readonly errorDescription: string;
    readonly errorUri: string;
    constructor(error: ErrorType, errorDescription?: string, errorUri?: string);
    toJson(): TokenErrorJson;
    static fromJson(input: TokenErrorJson): TokenError;
}
