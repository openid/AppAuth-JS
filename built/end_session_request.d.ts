import { AuthorizationManagementRequest } from './authorization_management_request';
import { Crypto } from './crypto_utils';
import { StringMap } from './types';
/**
 * Represents an EndSessionRequest as JSON.
 */
export interface EndSessionRequestJson {
    id_token_hint: string;
    post_logout_redirect_uri: string;
    state?: string;
    extras?: StringMap;
}
export declare const ENDSESSION_BUILT_IN_PARAMETERS: string[];
/**
 * Represents the EndSessionRequest.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
export declare class EndSessionRequest extends AuthorizationManagementRequest {
    private crypto;
    idTokenHint: string;
    postLogoutRedirectUri: string;
    state: string;
    extras?: StringMap;
    /**
     * Constructs a new EndSessionRequest.
     * Use a `undefined` value for the `state` parameter, to generate a random
     * state for CSRF protection.
     */
    constructor(request: EndSessionRequestJson, crypto?: Crypto);
    /**
     * Serializes the EndSessionRequest to a JavaScript Object.
     */
    toJson(): Promise<EndSessionRequestJson>;
    toRequestMap(): StringMap;
}
