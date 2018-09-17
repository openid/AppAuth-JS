import { AuthorizationRequest } from '../authorization_request';
import { AuthorizationRequestHandler, AuthorizationRequestResponse } from '../authorization_request_handler';
import { AuthorizationServiceConfiguration } from '../authorization_service_configuration';
import { QueryStringUtils } from '../query_string_utils';
export declare class NodeBasedHandler extends AuthorizationRequestHandler {
    httpServerPort: number;
    authorizationPromise: Promise<AuthorizationRequestResponse | null> | null;
    constructor(httpServerPort?: number, utils?: QueryStringUtils, generateRandom?: import("../crypto_utils").RandomGenerator);
    performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): void;
    protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null>;
}
