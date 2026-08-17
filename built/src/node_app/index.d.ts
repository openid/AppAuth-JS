import { AuthorizationRequest } from '../authorization_request';
import { AuthorizationResponse } from '../authorization_response';
import { AuthorizationServiceConfiguration } from '../authorization_service_configuration';
export declare class App {
    private notifier;
    private authorizationHandler;
    private tokenHandler;
    configuration: AuthorizationServiceConfiguration | undefined;
    constructor();
    fetchServiceConfiguration(): Promise<AuthorizationServiceConfiguration>;
    makeAuthorizationRequest(configuration: AuthorizationServiceConfiguration): void;
    makeRefreshTokenRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest, response: AuthorizationResponse): Promise<import("..").TokenResponse>;
    makeAccessTokenRequest(configuration: AuthorizationServiceConfiguration, refreshToken: string): Promise<import("..").TokenResponse>;
    makeRevokeTokenRequest(configuration: AuthorizationServiceConfiguration, refreshToken: string): Promise<boolean>;
}
