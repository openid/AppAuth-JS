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

import {AuthorizationManagementRequest} from './authorization_management_request';
import {AuthorizationError} from './authorization_management_response';
import {AuthorizationRequest} from './authorization_request';
import {AuthorizationRequestHandler, AuthorizationRequestResponse} from './authorization_request_handler';
import {AuthorizationResponse} from './authorization_response'
import {AuthorizationServiceConfiguration} from './authorization_service_configuration';
import {Crypto, DefaultCrypto} from './crypto_utils';
import {EndSessionRequest} from './end_session_request';
import {EndSessionResponse} from './end_session_response';
import {log} from './logger';
import {BasicQueryStringUtils} from './query_string_utils';
import {LocalStorageBackend, StorageBackend} from './storage';
import {LocationLike} from './types';


enum RequestTypes {
  endSession = 'end_session',
  authorization = 'authorization'
}

/** key for authorization request. */
const requestKey =
    (handle: string, requestType: RequestTypes) => {
      return `${handle}_appauth_${requestType}_request`;
    }

/** key for authorization service configuration */
const serviceConfigurationKey =
    (handle: string, requestType: RequestTypes) => {
      return `${handle}_appauth_${requestType}_service_configuration`;
    }

/** key in local storage which represents the current authorization request. */
const REQUEST_HANDLE_KEY = (requestType: RequestTypes) => `appauth_current_${requestType}_request`;

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
      crypto: Crypto = new DefaultCrypto()) {
    super(utils, crypto);
  }

  performAuthorizationRequest(
      configuration: AuthorizationServiceConfiguration,
      request: AuthorizationRequest) {
    this.performRequest(configuration, request, RequestTypes.authorization);
  }

  performEndSessionRequest(
      configuration: AuthorizationServiceConfiguration,
      request: EndSessionRequest) {
    this.performRequest(configuration, request, RequestTypes.endSession);
  }

  private performRequest(
      configuration: AuthorizationServiceConfiguration,
      request: AuthorizationManagementRequest,
      requestType: RequestTypes = RequestTypes.authorization) {
    const handle = this.crypto.generateRandom(10);

    // before you make request, persist all request related data in local storage.
    const persisted = Promise.all([
      this.storageBackend.setItem(REQUEST_HANDLE_KEY(requestType), handle),
      // Calling toJson() adds in the code & challenge when possible
      request.toJson().then(
          result =>
              this.storageBackend.setItem(requestKey(handle, requestType), JSON.stringify(result))),
      this.storageBackend.setItem(
          serviceConfigurationKey(handle, requestType), JSON.stringify(configuration.toJson())),
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
   *  authorization request.
   */
  protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse|null> {
    return this.completeRequest(RequestTypes.authorization);
  }

  /**
   * Attempts to introspect the contents of storage backend and completes the
   * end session request.
   */
  protected completeEndSessionRequest(): Promise<AuthorizationRequestResponse|null> {
    return this.completeRequest(RequestTypes.endSession);
  }

  /**
   * Attempts to introspect the contents of storage backend and completes the
   * request.
   */
  private completeRequest(requestType: RequestTypes) {
    // TODO(rahulrav@): handle authorization errors.
    return this.storageBackend.getItem(REQUEST_HANDLE_KEY(requestType)).then(handle => {
      if (handle) {
        // we have a pending request.
        // fetch authorization request, and check state
        return this.storageBackend
            .getItem(requestKey(handle, requestType))
            // requires a corresponding instance of result
            // TODO(rahulrav@): check for inconsistent state here
            .then(result => JSON.parse(result!))
            .then(
                json => requestType === RequestTypes.authorization ?
                    new AuthorizationRequest(json) :
                    new EndSessionRequest(json))
            .then(request => {
              // check redirect_uri and state
              let currentUri = `${this.locationLike.origin}${this.locationLike.pathname}`;
              let queryParams = this.utils.parse(this.locationLike, true /* use hash */);
              let state: string|undefined = queryParams['state'];
              let code: string|undefined = queryParams['code'];
              let error: string|undefined = queryParams['error'];
              if (requestType === RequestTypes.authorization) {
                log('Potential authorization request ',
                    currentUri,
                    queryParams,
                    state,
                    code,
                    error);
              } else {
                log('Potential end session request ', currentUri, queryParams, state, error)
              }
              let shouldNotify = state === request.state;
              let authorizationResponse: EndSessionResponse|AuthorizationResponse|null = null;
              let authorizationError: AuthorizationError|null = null;
              if (shouldNotify) {
                if (error) {
                  // get additional optional info.
                  let errorUri = queryParams['error_uri'];
                  let errorDescription = queryParams['error_description'];
                  authorizationError = new AuthorizationError({
                    error: error,
                    error_description: errorDescription,
                    error_uri: errorUri,
                    state: state
                  });
                } else {
                  if (requestType === RequestTypes.authorization) {
                    authorizationResponse = new AuthorizationResponse({code: code, state: state});
                  } else if (requestType === RequestTypes.endSession) {
                    authorizationResponse = new EndSessionResponse({state: state})
                  }
                }
                // cleanup state
                return Promise
                    .all([
                      this.storageBackend.removeItem(REQUEST_HANDLE_KEY(requestType)),
                      this.storageBackend.removeItem(requestKey(handle, requestType)),
                      this.storageBackend.removeItem(serviceConfigurationKey(handle, requestType))
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
      } else {
        return null;
      }
    });
  }
}
