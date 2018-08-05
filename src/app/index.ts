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
import {GRANT_TYPE_AUTHORIZATION_CODE, TokenRequest} from '../token_request';
import { FLOW_TYPE_IMPLICIT, FLOW_TYPE_PKCE, AUTHORIZATION_RESPONSE_HANDLE_KEY } from '../types';
import { PKCETokenRequestHandler } from '../pkce_token_requestor';
import { LocalStorageBackend, StorageBackend } from '../storage';
import { EndSessionRedirectRequestHandler } from '../end_session_redirect_based_handler';
import { EndSessionRequestHandler, EndSessionNotifier } from '../end_session_request_handler';
import { EndSessionRequest } from '../end_session_request';
import { cryptoGenerateRandom } from '../crypto_utils';
import { UserInfoRequestHandler, BaseUserInfoRequestHandler } from '../user_info_request_handler';
import { UserInfoRequest } from '../user_info_request';

/**
 * The wrapper appication.
 */
export class App {

  /* client configuration */
  private authorizeUrl: string;
  private tokenUrl: string;
  private revokeUrl: string;
  private logoutUrl: string;
  private userInfoUrl: string;

  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private scope: string;
  private postLogoutRedirectUri: string;

  private discoveryUri: string;

  private userStore: StorageBackend;
  private flowTypeInternal: string;

  private notifier: AuthorizationNotifier;
  private authorizationHandler: AuthorizationRequestHandler;
  private pkceTokenRequestHandler: PKCETokenRequestHandler;
  private userInfoRequestHandler: UserInfoRequestHandler;

  private endSessionNotifier: EndSessionNotifier;
  private endSessionHandler: EndSessionRequestHandler;

  private configuration: AuthorizationServiceConfiguration;

  constructor({
    authorizeUrl = '',
    tokenUrl = '',
    revokeUrl = '',
    logoutUrl = '',
    userInfoUrl = '',
    flowType = "IMPLICIT",
    userStore = "LOCAL_STORAGE",
    clientId = '511828570984-7nmej36h9j2tebiqmpqh835naet4vci4.apps.googleusercontent.com',
    clientSecret = '',
    redirectUri = 'http://localhost:8080/app/',
    scope = 'openid',
    postLogoutRedirectUri = 'http://localhost:8080/app/',
    discoveryUri = 'https://accounts.google.com'
  } = {}) {

    this.authorizeUrl = authorizeUrl;
    this.tokenUrl = tokenUrl;
    this.revokeUrl = revokeUrl;
    this.logoutUrl = logoutUrl;
    this.userInfoUrl = userInfoUrl;

    this.flowTypeInternal = FLOW_TYPE_IMPLICIT;
    if(flowType == "PKCE") {
        this.flowTypeInternal = FLOW_TYPE_PKCE;
    }

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scope = scope;
    this.redirectUri = redirectUri;
    this.postLogoutRedirectUri = postLogoutRedirectUri;
    this.discoveryUri = discoveryUri;

    if(userStore == "LOCAL_STORAGE") {
      this.userStore = new LocalStorageBackend();
    } else {
      console.log('Session storage is not currently supported on underlying platform.');
      this.userStore = new LocalStorageBackend();
    }

    this.configuration = new AuthorizationServiceConfiguration(
      this.flowTypeInternal,
      authorizeUrl,
      tokenUrl,
      revokeUrl,
      logoutUrl,
      userInfoUrl);

    this.notifier = new AuthorizationNotifier();
    this.authorizationHandler = new RedirectRequestHandler();
    // set notifier to deliver responses
    this.authorizationHandler.setAuthorizationNotifier(this.notifier);
    // set a listener to listen for authorization responses
    this.notifier.setAuthorizationListener((request, response, error) => {
      log('Authorization request complete ', request, response, error);
      if (response) {
        this.showMessage(`Authorization Code ${response.code}`);

        if (this.configuration.toJson().oauth_flow_type == FLOW_TYPE_PKCE && response.code) {
          let tokenRequestExtras = {
            client_secret: (clientSecret == null ? '' : clientSecret),
            state: response.state
          };
          let request = new TokenRequest(
              this.clientId,
              this.redirectUri,
              GRANT_TYPE_AUTHORIZATION_CODE,
              response.code,
              undefined,
              tokenRequestExtras);
          this.pkceTokenRequestHandler.performPKCEAuthorizationTokenRequest(
              this.configuration, request);
        }
      }
    });
    this.pkceTokenRequestHandler = new PKCETokenRequestHandler(this.authorizationHandler, this.configuration, this.userStore);
    this.userInfoRequestHandler = new BaseUserInfoRequestHandler(this.userStore);

    this.endSessionNotifier = new EndSessionNotifier();
    // uses a redirect flow
    this.endSessionHandler = new EndSessionRedirectRequestHandler();
    // set notifier to deliver responses
    this.endSessionHandler.setEndSessionNotifier(this.endSessionNotifier);
    // set a listener to listen for authorization responses
    this.endSessionNotifier.setEndSessionListener((request, response, error) => {
      console.log('Authorization request complete ', request, response, error);
      if (response) {
        //endSessionListenerCallback(request, response, error);
      }
    });
  }

  fetchServiceConfiguration() {

    AuthorizationServiceConfiguration.fetchFromIssuer(this.discoveryUri)
      .then(response => {
        log('Fetched service configuration', response);
        response.oauthFlowType = this.flowTypeInternal;
        this.showMessage('Completed fetching configuration');
        this.configuration = response;
      })
      .catch(error => {
        log('Something bad happened', error);
        this.showMessage(`Something bad happened ${error}`)
      });
  }

  makeAuthorizationRequest() {

    // generater state
    var state = App.generateState();

    // create a request
    var request;
    if (this.configuration.toJson().oauth_flow_type == FLOW_TYPE_IMPLICIT) {
      // generater nonce
      var nonce = App.generateNonce();

      request = new AuthorizationRequest(
          this.clientId,
          this.redirectUri,
          this.scope,
          AuthorizationRequest.RESPONSE_TYPE_ID_TOKEN,
          state,
          {'prompt': 'consent', 'access_type': 'online', 'nonce': nonce});
      // make the authorization request
      this.authorizationHandler.performAuthorizationRequest(this.configuration, request);

    } else if (this.configuration.toJson().oauth_flow_type == FLOW_TYPE_PKCE) {
      let authRequestExtras = {prompt: 'consent', access_type: 'online'};
      request = new AuthorizationRequest(
          this.clientId,
          this.redirectUri,
          this.scope,
          AuthorizationRequest.RESPONSE_TYPE_CODE,
          state, /* state */
          authRequestExtras);
      this.pkceTokenRequestHandler.performPKCEAuthorizationCodeRequest(this.configuration, request);
    }
  }

  checkForAuthorizationResponse() {
    var isAuthRequestComplete = false;
    switch (this.configuration.toJson().oauth_flow_type) {
      case FLOW_TYPE_IMPLICIT:
        var params = this.parseQueryString(location, true);
        isAuthRequestComplete = params.hasOwnProperty('id_token');
        break;
      case FLOW_TYPE_PKCE:
        var params = this.parseQueryString(location, false);
        isAuthRequestComplete = params.hasOwnProperty('code');
        break;
      default:
        var params = this.parseQueryString(location, true);
        isAuthRequestComplete = params.hasOwnProperty('id_token');
    }

    if (isAuthRequestComplete) {
      this.authorizationHandler.completeAuthorizationRequestIfPossible();
    } else {
      this.endSessionHandler.completeEndSessionRequestIfPossible();
    }
  }

  makeLogoutRequest() {
    // generater state
    var state = App.generateState();

    this.userStore.getItem(AUTHORIZATION_RESPONSE_HANDLE_KEY).then(result => {
      if (result != null) {
        this.idTokenHandler(result, state);
      } else {
        console.log('Authorization response is not found in local or session storage');
      }
    });
  }

  idTokenHandler(result: string, state: string): void {
    var authResponse = JSON.parse(result);
    var idTokenHint = authResponse.id_token;

    let request = new EndSessionRequest(
        idTokenHint, this.postLogoutRedirectUri, state /* state */, {client_id: this.clientId});

    // make the authorization request
    this.endSessionHandler.performEndSessionRequest(this.configuration, request);
  }

  makeUserInfoRequest() {
    var userInfoRequest = new UserInfoRequest("openid");
    this.userInfoRequestHandler.performUserInfoRequest(this.configuration, userInfoRequest)
    .then(userInfoResponse => {
      this.showMessage(JSON.stringify(userInfoResponse.toJson()));
    });
  }

  showMessage(message: string) {
    console.log(message);
  }

  static generateNonce() {
    var nonceLen = 8;
    return cryptoGenerateRandom(nonceLen);
  }

  static generateState() {
    var stateLen = 8;
    return cryptoGenerateRandom(stateLen);
  }

  parseQueryString(location: Location, splitByHash: boolean): Object {
    var urlParams;
    if (splitByHash) {
      urlParams = location.hash;
    } else {
      urlParams = location.search;
    }

    let result: {[key: string]: string} = {};
    // if anything starts with ?, # or & remove it
    urlParams = urlParams.trim().replace(/^(\?|#|&)/, '');
    let params = urlParams.split('&');
    for (let i = 0; i < params.length; i += 1) {
      let param = params[i];  // looks something like a=b
      let parts = param.split('=');
      if (parts.length >= 2) {
        let key = decodeURIComponent(parts.shift()!);
        let value = parts.length > 0 ? parts.join('=') : null;
        if (value) {
          result[key] = decodeURIComponent(value);
        }
      }
    }
    return result;
  }
}

// export App
(window as any)['App'] = App;
