import { AuthorizationRequest } from './authorization_request';
import { AuthorizationRequestHandler, AuthorizationRequestResponse } from './authorization_request_handler';
import { AuthorizationServiceConfiguration } from './authorization_service_configuration';
import { Crypto } from './crypto_utils';
import { EndSessionRequest } from './end_session_request';
import { BasicQueryStringUtils } from './query_string_utils';
import { StorageBackend } from './storage';
import { LocationLike } from './types';
/**
 * Represents an AuthorizationRequestHandler which uses a standard
 * redirect based code flow.
 */
export declare class RedirectRequestHandler extends AuthorizationRequestHandler {
    storageBackend: StorageBackend;
    locationLike: LocationLike;
    constructor(storageBackend?: StorageBackend, utils?: BasicQueryStringUtils, locationLike?: LocationLike, crypto?: Crypto);
    performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest): void;
    performEndSessionRequest(configuration: AuthorizationServiceConfiguration, request: EndSessionRequest): void;
    private performRequest;
    /**
     * Attempts to introspect the contents of storage backend and completes the
     *  authorization request.
     */
    protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse | null>;
    /**
     * Attempts to introspect the contents of storage backend and completes the
     * end session request.
     */
    protected completeEndSessionRequest(): Promise<AuthorizationRequestResponse | null>;
    /**
     * Attempts to introspect the contents of storage backend and completes the
     * request.
     */
    private completeRequest;
}
