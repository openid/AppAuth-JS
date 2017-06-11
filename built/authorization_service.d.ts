import { AuthorizationRequest } from './authorization_request';
import { AuthorizationNotifier, AuthorizationRequestHandler } from './authorization_request_handler';
/**
 * Represents the AuthorizationService which can be used to make
 * authorization requests and token requests.
 */
export declare class AuthorizationService {
    private notifier;
    private handler;
    /**
     * Sets the default Authorization Service notifier.
     */
    setAuthorizationNotifier(notifier: AuthorizationNotifier): AuthorizationService;
    /**
     * Registers an authorization listener.
     */
    private registerListener();
    /**
     * Sets the default Authorization Request handler.
     * Typically this will be configured based on the platform.
     */
    setAuthorizationRequestHandler(handler: AuthorizationRequestHandler): AuthorizationService;
    /**
     * Performs the authorization request using the AuthorizationRequestHandler.
     */
    performAuthorizationRequest(request: AuthorizationRequest): void;
}
