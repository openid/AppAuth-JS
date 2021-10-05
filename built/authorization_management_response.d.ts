/**
 * Represents the AuthorizationError as a JSON object.
 */
export interface AuthorizationErrorJson {
    error: string;
    error_description?: string;
    error_uri?: string;
    state?: string;
}
export declare abstract class AuthorizationManagementResponse {
    abstract state: string;
    abstract toJson(): object;
}
/**
 * Represents the Authorization error response.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.2.1
 */
export declare class AuthorizationError {
    error: string;
    errorDescription?: string;
    errorUri?: string;
    state?: string;
    constructor(error: AuthorizationErrorJson);
    toJson(): AuthorizationErrorJson;
}
