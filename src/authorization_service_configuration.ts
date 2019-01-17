/*
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {boolean} from 'joi';

import {JQueryRequestor, Requestor} from './xhr';


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
 * The standard base path for well-known resources on domains.
 * See https://tools.ietf.org/html/rfc5785 for more information.
 */
const WELL_KNOWN_PATH = '.well-known';

/**
 * The standard resource under the well known path at which an OpenID Connect
 * discovery document can be found under an issuer's base URI.
 */
const OPENID_CONFIGURATION = 'openid-configuration';

/**
 * Configuration details required to interact with an authorization service.
 *
 * More information at https://openid.net/specs/openid-connect-discovery-1_0-17.html
 */
export class AuthorizationServiceConfiguration {
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

  constructor(request: AuthorizationServiceConfigurationJson) {
    this.issuer = request.issuer;
    this.authorizationEndpoint = request.authorization_endpoint;
    this.tokenEndpoint = request.token_endpoint;
    this.revocationEndpoint = request.revocation_endpoint;
    this.userInfoEndpoint = request.userinfo_endpoint;
    this.endSessionEndpoint = request.end_session_endpoint;
    this.jwksUri = request.jwks_uri;
    this.registrationEndpoint = request.registration_endpoint;
    this.scopesSupported = request.scopes_supported;
    this.responseTypesSupported = request.response_types_supported;
    this.responseModesSupported = request.response_modes_supported;
    this.grantTypesSupported = request.grant_types_supported;
    this.acrValuesSupported = request.acr_values_supported;
    this.subjectTypesSupported = request.subject_types_supported;
    this.idTokenSigningAlgValuesSupported = request.id_token_signing_alg_values_supported;
    this.idTokenEncryptionAlgValuesSupported = request.id_token_encryption_alg_values_supported;
    this.idTokenEncryptionEncValuesSupported = request.id_token_encryption_enc_values_supported;
    this.userinfoSigningAlgValuesSupported = request.userinfo_signing_alg_values_supported;
    this.userinfoEncryptionAlgValuesSupported = request.userinfo_encryption_alg_values_supported;
    this.userinfoEncryptionEncValuesSupported = request.userinfo_encryption_enc_values_supported;
    this.requestObjectSigningAlgValuesSupported =
        request.request_object_signing_alg_values_supported;
    this.requestObjectEncryptionAlgValuesSupported =
        request.request_object_encryption_alg_values_supported;
    this.requestObjectEncryptionEncValuesSupported =
        request.request_object_encryption_enc_values_supported;
    this.tokenEndpointAuthMethodsSupported = request.token_endpoint_auth_methods_supported;
    this.tokenEndpointAuthSigningAlgValuesSupported =
        request.token_endpoint_auth_signing_alg_values_supported;
    this.displayValuesSupported = request.display_values_supported;
    this.claimTypesSupported = request.claim_types_supported;
    this.claimsSupported = request.claims_supported;
    this.serviceDocumentation = request.service_documentation;
    this.claimsLocalesSupported = request.claims_locales_supported;
    this.uiLocalesSupported = request.ui_locales_supported;
    this.claimsParameterSupported = request.claims_parameter_supported;
    this.requestParameterSupported = request.request_parameter_supported;
    this.requestUriParameterSupported = request.request_uri_parameter_supported;
    this.requireRequestUriRegistration = request.require_request_uri_registration;
    this.opPolicyUri = request.op_policy_uri;
    this.opTosUri = request.op_tos_uri;
  }

  toJson() {
    return {
      issuer: this.issuer,
      authorization_endpoint: this.authorizationEndpoint,
      token_endpoint: this.tokenEndpoint,
      revocation_endpoint: this.revocationEndpoint,
      end_session_endpoint: this.endSessionEndpoint,
      userinfo_endpoint: this.userInfoEndpoint,
      jwks_uri: this.jwksUri,
      registration_endpoint: this.registrationEndpoint,
      scopes_supported: this.scopesSupported,
      response_types_supported: this.responseTypesSupported,
      response_modes_supported: this.responseModesSupported,
      grant_types_supported: this.grantTypesSupported,
      acr_values_supported: this.acrValuesSupported,
      subject_types_supported: this.subjectTypesSupported,
      id_token_signing_alg_values_supported: this.idTokenSigningAlgValuesSupported,
      id_token_encryption_alg_values_supported: this.idTokenEncryptionAlgValuesSupported,
      id_token_encryption_enc_values_supported: this.idTokenEncryptionEncValuesSupported,
      userinfo_signing_alg_values_supported: this.userinfoSigningAlgValuesSupported,
      userinfo_encryption_alg_values_supported: this.userinfoEncryptionAlgValuesSupported,
      userinfo_encryption_enc_values_supported: this.userinfoEncryptionEncValuesSupported,
      request_object_signing_alg_values_supported: this.requestObjectSigningAlgValuesSupported,
      request_object_encryption_alg_values_supported:
          this.requestObjectEncryptionAlgValuesSupported,
      request_object_encryption_enc_values_supported:
          this.requestObjectEncryptionEncValuesSupported,
      token_endpoint_auth_methods_supported: this.tokenEndpointAuthMethodsSupported,
      token_endpoint_auth_signing_alg_values_supported:
          this.tokenEndpointAuthSigningAlgValuesSupported,
      display_values_supported: this.displayValuesSupported,
      claim_types_supported: this.claimTypesSupported,
      claims_supported: this.claimsSupported,
      service_documentation: this.serviceDocumentation,
      claims_locales_supported: this.claimsLocalesSupported,
      ui_locales_supported: this.uiLocalesSupported,
      claims_parameter_supported: this.claimsParameterSupported,
      request_parameter_supported: this.requestParameterSupported,
      request_uri_parameter_supported: this.requestUriParameterSupported,
      require_request_uri_registration: this.requireRequestUriRegistration,
      op_policy_uri: this.opPolicyUri,
      op_tos_uri: this.opTosUri
    };
  }

  static fetchFromIssuer(openIdIssuerUrl: string, requestor?: Requestor):
      Promise<AuthorizationServiceConfiguration> {
    const fullUrl = `${openIdIssuerUrl}/${WELL_KNOWN_PATH}/${OPENID_CONFIGURATION}`;

    const requestorToUse = requestor || new JQueryRequestor();

    return requestorToUse
        .xhr<AuthorizationServiceConfigurationJson>({url: fullUrl, dataType: 'json'})
        .then(json => new AuthorizationServiceConfiguration(json));
  }
}
