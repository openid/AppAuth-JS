import { AuthorizationRequest } from './authorization_request';
import { AuthorizationRequestHandler } from './authorization_request_handler';
import { AuthorizationServiceConfiguration } from './authorization_service_configuration';
import { CodeVerifier } from './pkce_code_verifier';
import { StorageBackend } from './storage';
import { TokenRequest } from './token_request';
import { TokenRequestHandler } from './token_request_handler';
/**
 * Handler class for PKCE related request handling.
 */
export declare class PKCETokenRequestHandler {
    verifier: CodeVerifier;
    authorizationHandler: AuthorizationRequestHandler;
    tokenHandler: TokenRequestHandler;
    configuration: AuthorizationServiceConfiguration;
    storageBackend: StorageBackend;
    constructor(authorizationHandler: AuthorizationRequestHandler, configuration: AuthorizationServiceConfiguration, storageBackend?: StorageBackend);
    /**
     * Perform PKCE authrization request
     *
     * @param configuration request configs
     * @param request auth request
     */
    performPKCEAuthorizationCodeRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): void;
    /**
     * Perform PKCE authrization token request
     *
     * @param configuration request configs
     * @param request token request
     */
    performPKCEAuthorizationTokenRequest(configuration: AuthorizationServiceConfiguration, request: TokenRequest): void;
}
