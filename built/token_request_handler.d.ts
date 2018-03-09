import { AuthorizationServiceConfiguration } from './authorization_service_configuration';
import { QueryStringUtils } from './query_string_utils';
import { RevokeTokenRequest } from './revoke_token_request';
import { TokenRequest } from './token_request';
import { TokenResponse } from './token_response';
/**
 * Represents an interface which can make a token request.
 */
export interface TokenRequestHandler {
    /**
     * Performs the token request, given the service configuration.
     */
    performTokenRequest(configuration: AuthorizationServiceConfiguration, request: TokenRequest): Promise<TokenResponse>;
    performRevokeTokenRequest(configuration: AuthorizationServiceConfiguration, request: RevokeTokenRequest): Promise<boolean>;
}
/**
 * The default token request handler.
 */
export declare class BaseTokenRequestHandler implements TokenRequestHandler {
    readonly fetcher: GlobalFetch;
    readonly utils: QueryStringUtils;
    constructor(fetcher?: GlobalFetch, utils?: QueryStringUtils);
    private isTokenResponse(response);
    performRevokeTokenRequest(configuration: AuthorizationServiceConfiguration, request: RevokeTokenRequest): Promise<boolean>;
    performTokenRequest(configuration: AuthorizationServiceConfiguration, request: TokenRequest): Promise<TokenResponse>;
}
