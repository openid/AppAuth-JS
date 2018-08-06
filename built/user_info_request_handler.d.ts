import { AuthorizationServiceConfiguration } from './authorization_service_configuration';
import { QueryStringUtils } from './query_string_utils';
import { StorageBackend } from './storage';
import { UserInfoRequest } from './user_info_request';
import { UserInfoResponse } from './user_info_response';
import { Requestor } from './xhr';
/**
 * Defines the interface which is capable of handling an user info request
 * using various methods (iframe / popup / different process etc.).
 */
export interface UserInfoRequestHandler {
    /**
     * Makes an UserInfo request.
     */
    performUserInfoRequest(configuration: AuthorizationServiceConfiguration, request?: UserInfoRequest): Promise<UserInfoResponse>;
}
/**
 * The default user info request handler.
 */
export declare class BaseUserInfoRequestHandler implements UserInfoRequestHandler {
    readonly storageBackend: StorageBackend;
    readonly requestor: Requestor;
    readonly utils: QueryStringUtils;
    constructor(storageBackend?: StorageBackend);
    private isUserInfoResponse;
    performUserInfoRequest(configuration: AuthorizationServiceConfiguration, request?: UserInfoRequest): Promise<UserInfoResponse>;
}
