import { AuthorizationManagementRequest } from './authorization_management_request';
import { AuthorizationManagementResponse } from './authorization_management_response';
import { AuthorizationError } from './authorization_management_response';
import { AuthorizationServiceConfiguration } from './authorization_service_configuration';
import { Crypto } from './crypto_utils';
import { QueryStringUtils } from './query_string_utils';
import { RedirectRequestTypes } from './types';
/**
 * This type represents a lambda that can take an AuthorizationRequest,
 * and an AuthorizationResponse as arguments.
 */
export declare type AuthorizationListener = (request: AuthorizationManagementRequest, response: AuthorizationManagementResponse | null, error: AuthorizationError | null) => void;
/**
 * Represents a structural type holding both authorization request and response.
 */
export interface AuthorizationRequestResponse {
    request: AuthorizationManagementRequest;
    response: AuthorizationManagementResponse | null;
    error: AuthorizationError | null;
}
/**
 * Authorization Service notifier.
 * This manages the communication of the AuthorizationResponse to the 3p client.
 */
export declare class AuthorizationNotifier {
    private listener;
    setAuthorizationListener(listener: AuthorizationListener): void;
    /**
     * The authorization complete callback.
     */
    onAuthorizationComplete(request: AuthorizationManagementRequest, response: AuthorizationManagementResponse | null, error: AuthorizationError | null): void;
}
/**
 * Defines the interface which is capable of handling an authorization request
 * using various methods (iframe / popup / different process etc.).
 */
export declare abstract class AuthorizationRequestHandler {
    utils: QueryStringUtils;
    protected crypto: Crypto;
    constructor(utils: QueryStringUtils, crypto: Crypto);
    protected notifier: AuthorizationNotifier | null;
    /**
     * A utility method to be able to build the authorization request URL.
     */
    protected buildRequestUrl(configuration: AuthorizationServiceConfiguration, request: AuthorizationManagementRequest, requestType: RedirectRequestTypes): string;
    /**
     * Completes the authorization request if necessary & when possible.
     */
    completeAuthorizationRequestIfPossible(): Promise<void>;
    /**
     * Completes the endsession request if necessary & when possible.
     */
    completeEndSessionRequestIfPossible(): Promise<void>;
    /**
     * Sets the default Authorization Service notifier.
     */
    setAuthorizationNotifier(notifier: AuthorizationNotifier): AuthorizationRequestHandler;
    /**
     * Makes an authorization request.
     */
    abstract performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationManagementRequest): void;
    /**
     * Makes an end session request.
     */
    abstract performEndSessionRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationManagementRequest): void;
    /**
     * Checks if an authorization flow can be completed, and completes it.
     * The handler returns a `Promise<AuthorizationRequestResponse>` if ready, or a `Promise<null>`
     * if not ready.
     */
    protected abstract completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null>;
    /**
     * Checks if an end session flow can be completed, and completes it.
     * The handler returns a `Promise<AuthorizationRequestResponse>` if ready, or a `Promise<null>`
     * if not ready.
     */
    protected abstract completeEndSessionRequest(): Promise<AuthorizationRequestResponse | null>;
}
