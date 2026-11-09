import { AuthorizationRequest } from '../authorization_request.ts';
import { AuthorizationRequestHandler, AuthorizationRequestResponse } from '../authorization_request_handler.ts';
import { AuthorizationServiceConfiguration } from '../authorization_service_configuration.ts';
import { Crypto } from '../crypto_utils.ts';
import { QueryStringUtils } from '../query_string_utils.ts';
export declare class NodeBasedHandler extends AuthorizationRequestHandler {
    httpServerPort: number;
    authorizationPromise: Promise<AuthorizationRequestResponse | null> | null;
    /** The content for the authorization redirect response page. */
    protected authorizationRedirectPageContent: string;
    constructor(httpServerPort?: number, utils?: QueryStringUtils, crypto?: Crypto);
    performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): void;
    protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null>;
}
