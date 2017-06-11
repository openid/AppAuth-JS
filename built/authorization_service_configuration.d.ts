import { Requestor } from './xhr';
/**
 * Represents AuthorizationServiceConfiguration as a JSON object.
 */
export interface AuthorizationServiceConfigurationJson {
    authorization_endpoint: string;
    token_endpoint: string;
}
/**
 * Configuration details required to interact with an authorization service.
 */
export declare class AuthorizationServiceConfiguration {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    constructor(authorizationEndpoint: string, tokenEndpoint: string);
    toJson(): {
        authorization_endpoint: string;
        token_endpoint: string;
    };
    static fromJson(json: AuthorizationServiceConfigurationJson): AuthorizationServiceConfiguration;
    static fetchFromIssuer(openIdIssuerUrl: string, requestor?: Requestor): Promise<AuthorizationServiceConfiguration>;
}
