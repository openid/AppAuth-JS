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

// Represents the test web app that uses the AppAuthJS library.

import {AuthorizationRequest} from '../authorization_request';
import {AuthorizationNotifier, AuthorizationRequestHandler} from '../authorization_request_handler';
import {AuthorizationServiceConfiguration} from '../authorization_service_configuration';
import {log} from '../logger';
import {RedirectRequestHandler} from '../redirect_based_handler';
import {GRANT_TYPE_AUTHORIZATION_CODE, GRANT_TYPE_REFRESH_TOKEN, TokenRequest} from '../token_request';
import {BaseTokenRequestHandler, TokenRequestHandler} from '../token_request_handler';
import {TokenResponse} from '../token_response';
import { AuthorizationResponse } from '../authorization_response';
import { StringMap } from '../types';

/* Some interface declarations for Material design lite. */

/**
 * Snackbar options.
 */
declare interface SnackBarOptions {
  message: string;
  timeout?: number;
}

/**
 * Interface that defines the MDL Material Snack Bar API.
 */
declare interface MaterialSnackBar {
  showSnackbar: (options: SnackBarOptions) => void;
}

/* an example open id connect provider */
const openIdConnectUrl = 'https://accounts.google.com';

/* example client configuration */
const clientId = '511828570984-7nmej36h9j2tebiqmpqh835naet4vci4.apps.googleusercontent.com';
const redirectUri = 'http://localhost:8000/app/redirect.html';
const scope = 'openid';

/**
 * The Test application.
 */
export class App {
  private notifier: AuthorizationNotifier;
  private authorizationHandler: AuthorizationRequestHandler;
  private tokenHandler: TokenRequestHandler;

  // state
  private configuration: AuthorizationServiceConfiguration|undefined;
  private request: AuthorizationRequest|undefined;
  private response: AuthorizationResponse|undefined;
  private code: string|undefined;
  private tokenResponse: TokenResponse|undefined;

  constructor(public snackbar: Element) {
    this.notifier = new AuthorizationNotifier();
    this.authorizationHandler = new RedirectRequestHandler();
    this.tokenHandler = new BaseTokenRequestHandler();
    // set notifier to deliver responses
    this.authorizationHandler.setAuthorizationNotifier(this.notifier);
    // set a listener to listen for authorization responses
    this.notifier.setAuthorizationListener((request, response, error) => {
      log('Authorization request complete ', request, response, error);
      if (response) {
        this.request = request;
        this.response = response;
        this.code = response.code;
        this.showMessage(`Authorization Code ${response.code}`);
      }
    });
  }

  showMessage(message: string) {
    const snackbar = (this.snackbar as any)['MaterialSnackbar'] as MaterialSnackBar;
    snackbar.showSnackbar({message: message});
  }

  fetchServiceConfiguration() {
    AuthorizationServiceConfiguration.fetchFromIssuer(openIdConnectUrl)
        .then(response => {
          log('Fetched service configuration', response);
          this.configuration = response;
          this.showMessage('Completed fetching configuration');
        })
        .catch(error => {
          log('Something bad happened', error);
          this.showMessage(`Something bad happened ${error}`)
        });
  }

  makeAuthorizationRequest() {
    // create a request
    let request = new AuthorizationRequest({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: scope,
      response_type: AuthorizationRequest.RESPONSE_TYPE_CODE,
      state: undefined,
      extras: {'prompt': 'consent', 'access_type': 'offline'}
    });

    if (this.configuration) {
      this.authorizationHandler.performAuthorizationRequest(this.configuration, request);
    } else {
      this.showMessage(
          'Fetch Authorization Service configuration, before you make the authorization request.');
    }
  }

  makeTokenRequest() {
    if (!this.configuration) {
      this.showMessage('Please fetch service configuration.');
      return;
    }

    let request: TokenRequest|null = null;
    if (this.code) {
      let extras: StringMap|undefined = undefined;
      if (this.request && this.request.internal) {
        extras = {};
        extras['code_verifier'] = this.request.internal['code_verifier'];
      }
      // use the code to make the token request.
      request = new TokenRequest({
        client_id: clientId,
        redirect_uri: redirectUri,
        grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
        code: this.code,
        refresh_token: undefined,
        extras: extras
      });
    } else if (this.tokenResponse) {
      // use the token response to make a request for an access token
      request = new TokenRequest({
        client_id: clientId,
        redirect_uri: redirectUri,
        grant_type: GRANT_TYPE_REFRESH_TOKEN,
        code: undefined,
        refresh_token: this.tokenResponse.refreshToken,
        extras: undefined
      });
    }

    if (request) {
      this.tokenHandler.performTokenRequest(this.configuration, request)
          .then(response => {
            let isFirstRequest = false;
            if (this.tokenResponse) {
              // copy over new fields
              this.tokenResponse.accessToken = response.accessToken;
              this.tokenResponse.issuedAt = response.issuedAt;
              this.tokenResponse.expiresIn = response.expiresIn;
              this.tokenResponse.tokenType = response.tokenType;
              this.tokenResponse.scope = response.scope;
            } else {
              isFirstRequest = true;
              this.tokenResponse = response;
            }

            // unset code, so we can do refresh token exchanges subsequently
            this.code = undefined;
            if (isFirstRequest) {
              this.showMessage(`Obtained a refresh token ${response.refreshToken}`);
            } else {
              this.showMessage(`Obtained an access token ${response.accessToken}.`);
            }
          })
          .catch(error => {
            log('Something bad happened', error);
            this.showMessage(`Something bad happened ${error}`)
          });
    }
  }

  checkForAuthorizationResponse() {
    this.authorizationHandler.completeAuthorizationRequestIfPossible();
  }
}

// export App
(window as any)['App'] = App;
