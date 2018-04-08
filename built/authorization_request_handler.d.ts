import { AuthorizationRequest } from './authorization_request';
import { AuthorizationError, AuthorizationResponse } from './authorization_response';
import { AuthorizationServiceConfiguration } from './authorization_service_configuration';
import { RandomGenerator } from './crypto_utils';
import { QueryStringUtils } from './query_string_utils';
/**
 * This type represents a lambda that can take an AuthorizationRequest,
 * and an AuthorizationResponse as arguments.
 */
export declare type AuthorizationListener = (request: AuthorizationRequest, response: AuthorizationResponse | null, error: AuthorizationError | null) => void;
/**
 * Represents a structural type holding both authorization request and response.
 */
export interface AuthorizationRequestResponse {
    request: AuthorizationRequest;
    response: AuthorizationResponse | null;
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
    onAuthorizationComplete(request: AuthorizationRequest, response: AuthorizationResponse | null, error: AuthorizationError | null): void;
}
export declare const BUILT_IN_PARAMETERS: string[];
/**
 * Defines the interface which is capable of handling an authorization request
 * using various methods (iframe / popup / different process etc.).
 */
export declare abstract class AuthorizationRequestHandler {
    utils: QueryStringUtils;
    protected generateRandom: RandomGenerator;
    constructor(utils: QueryStringUtils, generateRandom: RandomGenerator);
    protected notifier: AuthorizationNotifier | null;
    /**
     * A utility method to be able to build the authorization request URL.
     */
    protected buildRequestUrl(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): string;
    /**
     * Completes the authorization request if necessary & when possible.
     */
    completeAuthorizationRequestIfPossible(): Promise<void>;
    /**
     * Sets the default Authorization Service notifier.
     */
    setAuthorizationNotifier(notifier: AuthorizationNotifier): AuthorizationRequestHandler;
    /**
     * Makes an authorization request.
     */
    abstract performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): void;
    /**
     * Checks if an authorization flow can be completed, and completes it.
     * The handler returns a `Promise<AuthorizationRequestResponse>` if ready, or a `Promise<null>`
     * if not ready.
     */
    protected abstract completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null>;
}
