/**
 * Represents AuthorizationServiceConfiguration as a JSON object.
 */
export interface AuthorizationServiceConfigurationJson {
    authorization_endpoint: string;
    token_endpoint: string;
    revocation_endpoint: string;
}
/**
 * Configuration details required to interact with an authorization service.
 */
export declare class AuthorizationServiceConfiguration {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    revocationEndpoint: string;
    constructor(authorizationEndpoint: string, tokenEndpoint: string, revocationEndpoint: string);
    toJson(): {
        authorization_endpoint: string;
        token_endpoint: string;
        revocation_endpoint: string;
    };
    static fromJson(json: AuthorizationServiceConfigurationJson): AuthorizationServiceConfiguration;
    static fetchFromIssuer(openIdIssuerUrl: string, fetcher?: GlobalFetch): Promise<AuthorizationServiceConfiguration>;
}
