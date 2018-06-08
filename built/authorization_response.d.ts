/**
 * Represents the AuthorizationResponse as a JSON object.
 */
export interface AuthorizationResponseJson {
    code: string;
    state: string;
}
/**
 * Represents the AuthorizationError as a JSON object.
 */
export interface AuthorizationErrorJson {
    error: string;
    error_description?: string;
    error_uri?: string;
    state?: string;
}
/**
 * Represents the Authorization Response type.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.2
 */
export declare class AuthorizationResponse {
    code: string;
    state: string;
    constructor(code: string, state: string);
    toJson(): AuthorizationResponseJson;
    static fromJson(json: AuthorizationResponseJson): AuthorizationResponse;
}
/**
 * Represents the Authorization error response.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.2.1
 */
export declare class AuthorizationError {
    error: string;
    errorDescription?: string | undefined;
    errorUri?: string | undefined;
    state?: string | undefined;
    constructor(error: string, errorDescription?: string | undefined, errorUri?: string | undefined, state?: string | undefined);
    toJson(): AuthorizationErrorJson;
    static fromJson(json: AuthorizationErrorJson): AuthorizationError;
}
