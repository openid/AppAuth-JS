import { RandomGenerator } from './crypto_utils';
import { StringMap } from './types';
/**
 * Represents an AuthorizationRequest as JSON.
 */
export interface AuthorizationRequestJson {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    scope: string;
    state?: string;
    extras?: StringMap;
}
/**
 * Represents the AuthorizationRequest.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.1
 */
export declare class AuthorizationRequest {
    static RESPONSE_TYPE_TOKEN: string;
    static RESPONSE_TYPE_CODE: string;
    clientId: string;
    redirectUri: string;
    scope: string;
    responseType: string;
    state: string;
    extras?: StringMap;
    /**
     * Constructs a new AuthorizationRequest.
     * Use a `undefined` value for the `state` parameter, to generate a random
     * state for CSRF protection.
     */
    constructor(request: AuthorizationRequestJson, generateRandom?: RandomGenerator);
    /**
     * Serializes the AuthorizationRequest to a JavaScript Object.
     */
    toJson(): AuthorizationRequestJson;
}
