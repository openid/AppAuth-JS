import { RandomGenerator } from './crypto_utils';
import { StringMap } from './types';
/**
 * Represents an EndSessionRequest as JSON.
 */
export interface EndSessionRequestJson {
    id_token_hint: string;
    post_logout_redirect_uri: string;
    state: string;
    extras?: StringMap;
}
/**
 * Represents the EndSessionRequest.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
export declare class EndSessionRequest {
    idTokenHint: string;
    postLogoutRedirectUri: string;
    extras?: StringMap | undefined;
    state: string;
    /**
     * Constructs a new EndSessionRequest.
     * Use a `undefined` value for the `state` parameter, to generate a random
     * state for CSRF protection.
     */
    constructor(idTokenHint: string, postLogoutRedirectUri: string, state?: string, extras?: StringMap | undefined, generateRandom?: RandomGenerator);
    /**
     * Serializes the EndSessionRequest to a JavaScript Object.
     */
    toJson(): EndSessionRequestJson;
    /**
     * Creates a new instance of EndSessionRequest.
     */
    static fromJson(input: EndSessionRequestJson): EndSessionRequest;
}
