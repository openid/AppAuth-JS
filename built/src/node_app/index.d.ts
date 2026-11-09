import { AuthorizationRequest } from '../authorization_request.ts';
import { AuthorizationResponse } from '../authorization_response.ts';
import { AuthorizationServiceConfiguration } from '../authorization_service_configuration.ts';
export declare class App {
    private notifier;
    private authorizationHandler;
    private tokenHandler;
    configuration: AuthorizationServiceConfiguration | undefined;
    constructor();
    fetchServiceConfiguration(): Promise<AuthorizationServiceConfiguration>;
    makeAuthorizationRequest(configuration: AuthorizationServiceConfiguration): void;
    makeRefreshTokenRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest, response: AuthorizationResponse): Promise<import("../token_response.ts").TokenResponse>;
    makeAccessTokenRequest(configuration: AuthorizationServiceConfiguration, refreshToken: string): Promise<import("../token_response.ts").TokenResponse>;
    makeRevokeTokenRequest(configuration: AuthorizationServiceConfiguration, refreshToken: string): Promise<boolean>;
}
