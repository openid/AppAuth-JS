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
import defaultFetcher from './default_fetcher';

/**
 * Represents AuthorizationServiceConfiguration as a JSON object.
 */
export interface AuthorizationServiceConfigurationJson {
  authorization_endpoint: string;
  token_endpoint: string;
  revocation_endpoint: string;
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
 */
export class AuthorizationServiceConfiguration {
  constructor(
      public authorizationEndpoint: string,
      public tokenEndpoint: string,
      public revocationEndpoint: string) {}

  toJson() {
    return {
      authorization_endpoint: this.authorizationEndpoint,
      token_endpoint: this.tokenEndpoint,
      revocation_endpoint: this.revocationEndpoint
    };
  }

  static fromJson(json: AuthorizationServiceConfigurationJson): AuthorizationServiceConfiguration {
    return new AuthorizationServiceConfiguration(
        json.authorization_endpoint, json.token_endpoint, json.revocation_endpoint);
  }

  static fetchFromIssuer(openIdIssuerUrl: string, fetcher?: GlobalFetch):
      Promise<AuthorizationServiceConfiguration> {
    const fullUrl = `${openIdIssuerUrl}/${WELL_KNOWN_PATH}/${OPENID_CONFIGURATION}`;

    const fetcherToUse = fetcher || defaultFetcher;
    return fetcherToUse.fetch(fullUrl, {mode: 'cors'})
        .then(response => response.json())
        .then(json => AuthorizationServiceConfiguration.fromJson(json));
  }
}
