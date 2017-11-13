import { AuthorizationRequest } from './authorization_request';
import { AuthorizationRequestHandler, AuthorizationRequestResponse } from './authorization_request_handler';
import { AuthorizationServiceConfiguration } from './authorization_service_configuration';
import { RandomGenerator } from './crypto_utils';
import { QueryStringUtils } from './query_string_utils';
import { LocalStorageBackend } from './storage';
import { LocationLike } from './types';
/**
 * Represents an AuthorizationRequestHandler which uses a standard
 * redirect based code flow.
 */
export declare class RedirectRequestHandler extends AuthorizationRequestHandler {
    storageBackend: LocalStorageBackend;
    utils: QueryStringUtils;
    locationLike: LocationLike;
    constructor(storageBackend?: LocalStorageBackend, utils?: QueryStringUtils, locationLike?: LocationLike, generateRandom?: RandomGenerator);
    performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): void;
    /**
     * Attempts to introspect the contents of storage backend and completes the
     * request.
     */
    protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null>;
}
