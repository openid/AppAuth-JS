import { AuthorizationServiceConfiguration } from './authorization_service_configuration';
import { RandomGenerator } from './crypto_utils';
import { EndSessionRequest } from './end_session_request';
import { EndSessionRequestHandler, EndSessionRequestResponse } from './end_session_request_handler';
import { StorageBackend } from './index';
import { BasicQueryStringUtils } from './query_string_utils';
import { LocationLike } from './types';
/**
 * Represents an EndSessionRequestHandler which uses a standard
 * redirect based code flow.
 */
export declare class EndSessionRedirectRequestHandler extends EndSessionRequestHandler {
    storageBackend: StorageBackend;
    locationLike: LocationLike;
    constructor(storageBackend?: StorageBackend, utils?: BasicQueryStringUtils, locationLike?: LocationLike, generateRandom?: RandomGenerator);
    performEndSessionRequest(configuration: AuthorizationServiceConfiguration, request: EndSessionRequest): void;
    /**
     * Attempts to introspect the contents of storage backend and completes the request.
     */
    protected completeEndSessionRequest(): Promise<EndSessionRequestResponse | null>;
}
