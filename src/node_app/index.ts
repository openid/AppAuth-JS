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

// Represents a Node application, that uses the AppAuthJS library.

import {AuthorizationRequest} from '../authorization_request';
import {AuthorizationNotifier, AuthorizationRequestHandler, AuthorizationRequestResponse, BUILT_IN_PARAMETERS} from '../authorization_request_handler';
import {AuthorizationResponse} from '../authorization_response';
import {AuthorizationServiceConfiguration} from '../authorization_service_configuration';
import {log} from '../logger';
import {NodeBasedHandler} from '../node_support/node_request_handler';
import {NodeRequestor} from '../node_support/node_requestor';
import {RevokeTokenRequest} from '../revoke_token_request';
import {GRANT_TYPE_AUTHORIZATION_CODE, GRANT_TYPE_REFRESH_TOKEN, TokenRequest} from '../token_request';
import {BaseTokenRequestHandler, TokenRequestHandler} from '../token_request_handler';
import {TokenError, TokenResponse} from '../token_response';

const PORT = 32111;

/* the Node.js based HTTP client. */
const requestor = new NodeRequestor();

/* an example open id connect provider */
const openIdConnectUrl = 'https://accounts.google.com';

/* example client configuration */
const clientId = '511828570984-7nmej36h9j2tebiqmpqh835naet4vci4.apps.googleusercontent.com';
const redirectUri = `http://127.0.0.1:${PORT}`;
const scope = 'openid';

export class App {
  private notifier: AuthorizationNotifier;
  private authorizationHandler: AuthorizationRequestHandler;
  private tokenHandler: TokenRequestHandler;

  // state
  configuration: AuthorizationServiceConfiguration|undefined;

  constructor() {
    this.notifier = new AuthorizationNotifier();
    this.authorizationHandler = new NodeBasedHandler(PORT);
    this.tokenHandler = new BaseTokenRequestHandler(requestor);
    // set notifier to deliver responses
    this.authorizationHandler.setAuthorizationNotifier(this.notifier);
    // set a listener to listen for authorization responses
    // make refresh and access token requests.
    this.notifier.setAuthorizationListener((request, response, error) => {
      log('Authorization request complete ', request, response, error);
      if (response) {
        this.makeRefreshTokenRequest(this.configuration!, response.code)
            .then(result => this.makeAccessTokenRequest(this.configuration!, result.refreshToken!))
            .then(() => log('All done.'));
      }
    });
  }

  fetchServiceConfiguration(): Promise<AuthorizationServiceConfiguration> {
    return AuthorizationServiceConfiguration.fetchFromIssuer(openIdConnectUrl, requestor)
        .then(response => {
          log('Fetched service configuration', response);
          return response;
        });
  }

  makeAuthorizationRequest(configuration: AuthorizationServiceConfiguration) {
    // create a request
    let request = new AuthorizationRequest(
        clientId,
        redirectUri,
        scope,
        AuthorizationRequest.RESPONSE_TYPE_CODE,
        undefined, /* state */
        {'prompt': 'consent', 'access_type': 'offline'});

    log('Making authorization request ', configuration, request);
    this.authorizationHandler.performAuthorizationRequest(configuration, request);
  }

  makeRefreshTokenRequest(configuration: AuthorizationServiceConfiguration, code: string) {
    // use the code to make the token request.
    let request =
        new TokenRequest(clientId, redirectUri, GRANT_TYPE_AUTHORIZATION_CODE, code, undefined);

    return this.tokenHandler.performTokenRequest(configuration, request).then(response => {
      log(`Refresh Token is ${response.refreshToken}`);
      return response;
    });
  }

  makeAccessTokenRequest(configuration: AuthorizationServiceConfiguration, refreshToken: string) {
    let request =
        new TokenRequest(clientId, redirectUri, GRANT_TYPE_REFRESH_TOKEN, undefined, refreshToken);

    return this.tokenHandler.performTokenRequest(configuration, request).then(response => {
      log(`Access Token is ${response.accessToken}, Id Token is ${response.idToken}`);
      return response;
    });
  }

  makeRevokeTokenRequest(configuration: AuthorizationServiceConfiguration, refreshToken: string) {
    let request = new RevokeTokenRequest(refreshToken);

    return this.tokenHandler.performRevokeTokenRequest(configuration, request).then(response => {
      log('revoked refreshToken');
      return response;
    });
  }
}

log('Application is ready.');
const app = new App();

app.fetchServiceConfiguration()
    .then(configuration => {
      app.configuration = configuration;
      app.makeAuthorizationRequest(configuration);
      // notifier makes token requests.
    })
    .catch(error => {
      log('Something bad happened ', error);
    });
