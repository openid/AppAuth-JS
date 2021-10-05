import { AuthorizationRequestHandler, AuthorizationRequestResponse } from '../authorization_request_handler';
import { AuthorizationServiceConfiguration } from '../authorization_service_configuration';
import { Crypto } from '../crypto_utils';
import { QueryStringUtils } from '../query_string_utils';
import { AuthorizationRequest } from '../authorization_request';
export declare class NodeBasedHandler extends AuthorizationRequestHandler {
    httpServerPort: number;
    authorizationPromise: Promise<AuthorizationRequestResponse | null> | null;
    constructor(httpServerPort?: number, utils?: QueryStringUtils, crypto?: Crypto);
    performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): void;
    performEndSessionRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): void;
    private performRequest;
    protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null>;
    protected completeEndSessionRequest(): Promise<AuthorizationRequestResponse | null>;
    private completeRequest;
}
