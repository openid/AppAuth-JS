export interface StringMap {
    [key: string]: string;
}
/**
 * Represents a window.location like object.
 */
export interface LocationLike {
    hash: string;
    host: string;
    origin: string;
    hostname: string;
    pathname: string;
    port: string;
    protocol: string;
    search: string;
    assign(url: string): void;
}
/**
 * Represents constants for Oauth/OIDC flow types supported.
 */
export declare const FLOW_TYPE_IMPLICIT = "IMPLICIT";
export declare const FLOW_TYPE_PKCE = "PKCE";
/**
 * Represents session/localstorage key for saving the authorization response for the current
 * request.
 */
export declare const AUTHORIZATION_RESPONSE_HANDLE_KEY = "appauth_current_authorization_response";
