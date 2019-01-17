import { Requestor } from './xhr';
/**
 * Represents AuthorizationServiceConfiguration as a JSON object.
 */
export interface AuthorizationServiceConfigurationJson {
    issuer?: string;
    authorization_endpoint: string;
    token_endpoint: string;
    revocation_endpoint: string;
    end_session_endpoint?: string;
    userinfo_endpoint?: string;
    jwks_uri?: string;
    registration_endpoint?: string;
    scopes_supported?: string[];
    response_types_supported?: string[];
    response_modes_supported?: string[];
    grant_types_supported?: string[];
    acr_values_supported?: string[];
    subject_types_supported?: string[];
    id_token_signing_alg_values_supported?: string[];
    id_token_encryption_alg_values_supported?: string[];
    id_token_encryption_enc_values_supported?: string[];
    userinfo_signing_alg_values_supported?: string[];
    userinfo_encryption_alg_values_supported?: string[];
    userinfo_encryption_enc_values_supported?: string[];
    request_object_signing_alg_values_supported?: string[];
    request_object_encryption_alg_values_supported?: string[];
    request_object_encryption_enc_values_supported?: string[];
    token_endpoint_auth_methods_supported?: string[];
    token_endpoint_auth_signing_alg_values_supported?: string[];
    display_values_supported?: string[];
    claim_types_supported?: string[];
    claims_supported?: string[];
    service_documentation?: string;
    claims_locales_supported?: string[];
    ui_locales_supported?: string[];
    claims_parameter_supported?: boolean;
    request_parameter_supported?: boolean;
    request_uri_parameter_supported?: boolean;
    require_request_uri_registration?: boolean;
    op_policy_uri?: string;
    op_tos_uri?: string;
}
/**
 * Configuration details required to interact with an authorization service.
 *
 * More information at https://openid.net/specs/openid-connect-discovery-1_0-17.html
 */
export declare class AuthorizationServiceConfiguration {
    issuer?: string;
    authorizationEndpoint: string;
    tokenEndpoint: string;
    revocationEndpoint: string;
    userInfoEndpoint?: string;
    endSessionEndpoint?: string;
    jwksUri?: string;
    registrationEndpoint?: string;
    scopesSupported?: string[];
    responseTypesSupported?: string[];
    responseModesSupported?: string[];
    grantTypesSupported?: string[];
    acrValuesSupported?: string[];
    subjectTypesSupported?: string[];
    idTokenSigningAlgValuesSupported?: string[];
    idTokenEncryptionAlgValuesSupported?: string[];
    idTokenEncryptionEncValuesSupported?: string[];
    userinfoSigningAlgValuesSupported?: string[];
    userinfoEncryptionAlgValuesSupported?: string[];
    userinfoEncryptionEncValuesSupported?: string[];
    requestObjectSigningAlgValuesSupported?: string[];
    requestObjectEncryptionAlgValuesSupported?: string[];
    requestObjectEncryptionEncValuesSupported?: string[];
    tokenEndpointAuthMethodsSupported?: string[];
    tokenEndpointAuthSigningAlgValuesSupported?: string[];
    displayValuesSupported?: string[];
    claimTypesSupported?: string[];
    claimsSupported?: string[];
    serviceDocumentation?: string;
    claimsLocalesSupported?: string[];
    uiLocalesSupported?: string[];
    claimsParameterSupported?: boolean;
    requestParameterSupported?: boolean;
    requestUriParameterSupported?: boolean;
    requireRequestUriRegistration?: boolean;
    opPolicyUri?: string;
    opTosUri?: string;
    constructor(request: AuthorizationServiceConfigurationJson);
    toJson(): {
        issuer: string | undefined;
        authorization_endpoint: string;
        token_endpoint: string;
        revocation_endpoint: string;
        end_session_endpoint: string | undefined;
        userinfo_endpoint: string | undefined;
        jwks_uri: string | undefined;
        registration_endpoint: string | undefined;
        scopes_supported: string[] | undefined;
        response_types_supported: string[] | undefined;
        response_modes_supported: string[] | undefined;
        grant_types_supported: string[] | undefined;
        acr_values_supported: string[] | undefined;
        subject_types_supported: string[] | undefined;
        id_token_signing_alg_values_supported: string[] | undefined;
        id_token_encryption_alg_values_supported: string[] | undefined;
        id_token_encryption_enc_values_supported: string[] | undefined;
        userinfo_signing_alg_values_supported: string[] | undefined;
        userinfo_encryption_alg_values_supported: string[] | undefined;
        userinfo_encryption_enc_values_supported: string[] | undefined;
        request_object_signing_alg_values_supported: string[] | undefined;
        request_object_encryption_alg_values_supported: string[] | undefined;
        request_object_encryption_enc_values_supported: string[] | undefined;
        token_endpoint_auth_methods_supported: string[] | undefined;
        token_endpoint_auth_signing_alg_values_supported: string[] | undefined;
        display_values_supported: string[] | undefined;
        claim_types_supported: string[] | undefined;
        claims_supported: string[] | undefined;
        service_documentation: string | undefined;
        claims_locales_supported: string[] | undefined;
        ui_locales_supported: string[] | undefined;
        claims_parameter_supported: boolean | undefined;
        request_parameter_supported: boolean | undefined;
        request_uri_parameter_supported: boolean | undefined;
        require_request_uri_registration: boolean | undefined;
        op_policy_uri: string | undefined;
        op_tos_uri: string | undefined;
    };
    static fetchFromIssuer(openIdIssuerUrl: string, requestor?: Requestor): Promise<AuthorizationServiceConfiguration>;
}
