import { AuthorizationRequest } from './authorization_request.ts';
import { AuthorizationRequestHandler, AuthorizationRequestResponse } from './authorization_request_handler.ts';
import { AuthorizationServiceConfiguration } from './authorization_service_configuration.ts';
import { Crypto } from './crypto_utils.ts';
import { BasicQueryStringUtils } from './query_string_utils.ts';
import { StorageBackend } from './storage.ts';
import { LocationLike } from './types.ts';
/**
 * Represents an AuthorizationRequestHandler which uses a standard
 * redirect based code flow.
 */
export declare class RedirectRequestHandler extends AuthorizationRequestHandler {
    storageBackend: StorageBackend;
    locationLike: LocationLike;
    constructor(storageBackend?: StorageBackend, utils?: BasicQueryStringUtils, locationLike?: LocationLike, crypto?: Crypto);
    performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): void;
    /**
     * Attempts to introspect the contents of storage backend and completes the
     * request.
     */
    protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null>;
}
