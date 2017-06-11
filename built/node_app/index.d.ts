import { AuthorizationServiceConfiguration } from '../authorization_service_configuration';
import { TokenResponse } from '../token_response';
export declare class App {
    private notifier;
    private authorizationHandler;
    private tokenHandler;
    configuration: AuthorizationServiceConfiguration | undefined;
    constructor();
    fetchServiceConfiguration(): Promise<AuthorizationServiceConfiguration>;
    makeAuthorizationRequest(configuration: AuthorizationServiceConfiguration): void;
    makeRefreshTokenRequest(configuration: AuthorizationServiceConfiguration, code: string): Promise<TokenResponse>;
    makeAccessTokenRequest(configuration: AuthorizationServiceConfiguration, refreshToken: string): Promise<TokenResponse>;
}
