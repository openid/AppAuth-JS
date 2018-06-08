import { Requestor } from './xhr';
/**
 * Represents AuthorizationServiceConfiguration as a JSON object.
 */
export interface AuthorizationServiceConfigurationJson {
    authorization_endpoint: string;
    token_endpoint: string;
    revocation_endpoint: string;
    end_session_endpoint?: string;
    userinfo_endpoint?: string;
}
/**
 * Configuration details required to interact with an authorization service.
 *
 * More information at https://openid.net/specs/openid-connect-discovery-1_0-17.html
 */
export declare class AuthorizationServiceConfiguration {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    revocationEndpoint: string;
    endSessionEndpoint?: string | undefined;
    userInfoEndpoint?: string | undefined;
    constructor(authorizationEndpoint: string, tokenEndpoint: string, revocationEndpoint: string, // for Revoking Access Tokens
    endSessionEndpoint?: string | undefined, // for OpenID session management
    userInfoEndpoint?: string | undefined);
    toJson(): {
        authorization_endpoint: string;
        token_endpoint: string;
        revocation_endpoint: string;
        end_session_endpoint: string | undefined;
        userinfo_endpoint: string | undefined;
    };
    static fromJson(json: AuthorizationServiceConfigurationJson): AuthorizationServiceConfiguration;
    static fetchFromIssuer(openIdIssuerUrl: string, requestor?: Requestor): Promise<AuthorizationServiceConfiguration>;
}
