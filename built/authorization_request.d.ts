import { RandomGenerator } from './crypto_utils';
import { StringMap } from './types';
/**
 * Represents an AuthorizationRequest as JSON.
 */
export interface AuthorizationRequestJson {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    state: string;
    scope: string;
    extras?: StringMap;
}
/**
 * Represents the AuthorizationRequest.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.1
 */
export declare class AuthorizationRequest {
    clientId: string;
    redirectUri: string;
    scope: string;
    responseType: string;
    extras?: StringMap | undefined;
    static RESPONSE_TYPE_CODE: string;
    state: string;
    /**
     * Constructs a new AuthorizationRequest.
     * Use a `undefined` value for the `state` parameter, to generate a random
     * state for CSRF protection.
     */
    constructor(clientId: string, redirectUri: string, scope: string, responseType?: string, state?: string, extras?: StringMap | undefined, generateRandom?: RandomGenerator);
    /**
     * Serializes the AuthorizationRequest to a JavaScript Object.
     */
    toJson(): AuthorizationRequestJson;
    /**
     * Creates a new instance of AuthorizationRequest.
     */
    static fromJson(input: AuthorizationRequestJson): AuthorizationRequest;
}
