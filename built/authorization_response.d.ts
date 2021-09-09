import { AuthorizationManagementResponse } from './authorization_management_response';
/**
 * Represents the AuthorizationResponse as a JSON object.
 */
export interface AuthorizationResponseJson {
    code: string;
    state: string;
}
/**
 * Represents the Authorization Response type.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.2
 */
export declare class AuthorizationResponse extends AuthorizationManagementResponse {
    code: string;
    state: string;
    constructor(response: AuthorizationResponseJson);
    toJson(): AuthorizationResponseJson;
}
