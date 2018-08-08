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

import {AuthorizationRequest, AuthorizationRequestJson} from './authorization_request';
import {AuthorizationRequestHandler, AuthorizationRequestResponse, BUILT_IN_PARAMETERS} from './authorization_request_handler';
import {AuthorizationError, AuthorizationResponse, AuthorizationResponseJson} from './authorization_response'
import {AuthorizationServiceConfiguration, AuthorizationServiceConfigurationJson} from './authorization_service_configuration';
import {cryptoGenerateRandom, RandomGenerator} from './crypto_utils';
import {log} from './logger';
import {BasicQueryStringUtils, QueryStringUtils} from './query_string_utils';
import {LocalStorageBackend, StorageBackend} from './storage';
import {AUTHORIZATION_RESPONSE_HANDLE_KEY, FLOW_TYPE_IMPLICIT, FLOW_TYPE_PKCE, LocationLike} from './types';


/** key for authorization request. */
const authorizationRequestKey =
    (handle: string) => {
      return `${handle}_appauth_authorization_request`;
    }

/** key for authorization service configuration */
const authorizationServiceConfigurationKey =
    (handle: string) => {
      return `${handle}_appauth_authorization_service_configuration`;
    }

/** key in local storage which represents the current authorization request. */
const AUTHORIZATION_REQUEST_HANDLE_KEY = 'appauth_current_authorization_request';

/**
 * Represents an AuthorizationRequestHandler which uses a standard
 * redirect based code flow.
 */
export class RedirectRequestHandler extends AuthorizationRequestHandler {
  constructor(
      // use the provided storage backend
      // or initialize local storage with the default storage backend which
      // uses window.localStorage
      public storageBackend: StorageBackend = new LocalStorageBackend(),
      utils = new BasicQueryStringUtils(),
      public locationLike: LocationLike = window.location,
      generateRandom = cryptoGenerateRandom) {
    super(utils, generateRandom);
  }

  performAuthorizationRequest(
      configuration: AuthorizationServiceConfiguration,
      request: AuthorizationRequest) {
    let handle = this.generateRandom();
    // before you make request, persist all request related data in local storage.
    let persisted = Promise.all([
      this.storageBackend.setItem(AUTHORIZATION_REQUEST_HANDLE_KEY, handle),
      this.storageBackend.setItem(
          authorizationRequestKey(handle), JSON.stringify(request.toJson())),
      this.storageBackend.setItem(
          authorizationServiceConfigurationKey(handle), JSON.stringify(configuration.toJson())),
    ]);

    persisted.then(() => {
      // make the redirect request
      let url = this.buildRequestUrl(configuration, request);
      log('Making a request to ', request, url);
      this.locationLike.assign(url);
    });
  }

  /**
   * Attempts to introspect the contents of storage backend and completes the
   * request.
   */
  protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse|null> {
    // TODO(rahulrav@): handle authorization errors.
    return this.storageBackend.getItem(AUTHORIZATION_REQUEST_HANDLE_KEY).then(handle => {
      if (handle) {
        // we have a pending request.
        // fetch authorization request, and check state
        return this.storageBackend
            .getItem(authorizationRequestKey(handle))
            // requires a corresponding instance of result
            // TODO(rahulrav@): check for inconsitent state here
            .then(result => JSON.parse(result!))
            .then(json => AuthorizationRequest.fromJson(json))
            .then(request => {
              return this.storageBackend.getItem(authorizationServiceConfigurationKey(handle))
                  .then(result => {
                    var configurationJson = JSON.parse(result!);
                    var configuration = new AuthorizationServiceConfiguration(
                        configurationJson.oauth_flow_type,
                        configurationJson.authorization_endpoint,
                        configurationJson.token_endpoint,
                        configurationJson.revocation_endpoint,
                        configurationJson.endSession_endpoint,
                        configurationJson.userinfo_endpoint);

                    // check redirect_uri and state
                    let currentUri = `${this.locationLike.origin}${this.locationLike.pathname}`;
                    var queryParams;
                    switch (configuration.oauthFlowType) {
                      case FLOW_TYPE_IMPLICIT:
                        queryParams = this.utils.parse(this.locationLike, true /* use hash */);
                        break;
                      case FLOW_TYPE_PKCE:
                        queryParams = this.utils.parse(this.locationLike, false /* use ? */);
                        break;
                      default:
                        queryParams = this.utils.parse(this.locationLike, true /* use hash */);
                    }
                    let state: string|undefined = queryParams['state'];
                    let code: string|undefined = queryParams['code'];
                    let idToken: string|undefined = queryParams['id_token'];
                    let error: string|undefined = queryParams['error'];
                    log('Potential authorization request ',
                        currentUri,
                        queryParams,
                        state,
                        code,
                        error);
                    let shouldNotify = state === request.state;
                    let authorizationResponse: AuthorizationResponse|null = null;
                    let authorizationError: AuthorizationError|null = null;
                    if (shouldNotify) {
                      if (error) {
                        // get additional optional info.
                        let errorUri = queryParams['error_uri'];
                        let errorDescription = queryParams['error_description'];
                        authorizationError =
                            new AuthorizationError(error, errorDescription, errorUri, state);
                      } else {
                        authorizationResponse = new AuthorizationResponse(code, state!, idToken);
                      }
                      // cleanup state
                      return Promise
                          .all([
                            this.storageBackend.removeItem(AUTHORIZATION_REQUEST_HANDLE_KEY),
                            this.storageBackend.removeItem(authorizationRequestKey(handle)),
                            this.storageBackend.removeItem(
                                authorizationServiceConfigurationKey(handle)),
                            this.storageBackend.setItem(
                                AUTHORIZATION_RESPONSE_HANDLE_KEY,
                                (authorizationResponse == null ?
                                     '' :
                                     JSON.stringify(authorizationResponse.toJson())))
                          ])
                          .then(() => {
                            log('Delivering authorization response');
                            return {
                              request: request,
                              response: authorizationResponse,
                              error: authorizationError
                            } as AuthorizationRequestResponse;
                          });
                    } else {
                      log('Mismatched request (state and request_uri) dont match.');
                      return Promise.resolve(null);
                    }
                  });
            });
      } else {
        return null;
      }
    });
  }
}
