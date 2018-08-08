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

import {AuthorizationServiceConfiguration, AuthorizationServiceConfigurationJson} from './authorization_service_configuration';
import {RandomGenerator} from './crypto_utils';
import {EndSessionRequest, EndSessionRequestJson} from './end_session_request';
import {ENDSESSION_BUILT_IN_PARAMETERS, EndSessionRequestHandler, EndSessionRequestResponse} from './end_session_request_handler';
import {EndSessionError, EndSessionResponse, EndSessionResponseJson} from './end_session_response'
import {cryptoGenerateRandom, StorageBackend} from './index';
import {log} from './logger';
import {BasicQueryStringUtils, QueryStringUtils} from './query_string_utils';
import {LocalStorageBackend} from './storage';
import {AUTHORIZATION_RESPONSE_HANDLE_KEY, LocationLike, StringMap} from './types';


/** key for endsession request. */
const endSessionRequestKey =
    (handle: string) => {
      return `${handle}_appauth_endsession_request`;
    }

/** key for authorization service configuration */
const authorizationServiceConfigurationKey =
    (handle: string) => {
      return `${handle}_appauth_authorization_service_configuration`;
    }

/** key in local storage which represents the current endsession request. */
const ENDSESSION_REQUEST_HANDLE_KEY = 'appauth_current_endsession_request';

/**
 * Represents an EndSessionRequestHandler which uses a standard
 * redirect based code flow.
 */
export class EndSessionRedirectRequestHandler extends EndSessionRequestHandler {
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

  performEndSessionRequest(
      configuration: AuthorizationServiceConfiguration,
      request: EndSessionRequest) {
    let handle = this.generateRandom();
    // before you make request, persist all request related data in local storage.
    let persisted = Promise.all([
      this.storageBackend.setItem(ENDSESSION_REQUEST_HANDLE_KEY, handle),
      this.storageBackend.setItem(endSessionRequestKey(handle), JSON.stringify(request.toJson())),
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
   * Attempts to introspect the contents of storage backend and completes the request.
   */
  protected completeEndSessionRequest(): Promise<EndSessionRequestResponse|null> {
    // TODO(rahulrav@): handle endsession errors.
    return this.storageBackend.getItem(ENDSESSION_REQUEST_HANDLE_KEY).then(handle => {
      if (handle) {
        // we have a pending request.
        // fetch endsession request, and check state
        return this.storageBackend
            .getItem(endSessionRequestKey(handle))
            // requires a corresponding instance of result
            // TODO(rahulrav@): check for inconsitent state here
            .then(result => JSON.parse(result!))
            .then(json => EndSessionRequest.fromJson(json))
            .then(request => {
              // check redirect_uri and state
              let currentUri = `${this.locationLike.origin}${this.locationLike.pathname}`;
              let queryParams = this.utils.parse(this.locationLike, false /* use hash */);
              let state: string|undefined = queryParams['state'];
              let error: string|undefined = queryParams['error'];
              log('Potential endsession request ', currentUri, queryParams, state, error);
              let shouldNotify = state === request.state;
              let endSessionResponse: EndSessionResponse|null = null;
              let endSessionError: EndSessionError|null = null;
              if (shouldNotify) {
                if (error) {
                  // get additional optional info.
                  let errorUri = queryParams['error_uri'];
                  let errorDescription = queryParams['error_description'];
                  endSessionError = new EndSessionError(error, errorDescription, errorUri, state);
                } else {
                  endSessionResponse = new EndSessionResponse(state!);
                }
                // cleanup state
                return Promise
                    .all([
                      this.storageBackend.removeItem(ENDSESSION_REQUEST_HANDLE_KEY),
                      this.storageBackend.removeItem(endSessionRequestKey(handle)),
                      this.storageBackend.removeItem(authorizationServiceConfigurationKey(handle)),
                      this.storageBackend.removeItem(AUTHORIZATION_RESPONSE_HANDLE_KEY)
                    ])
                    .then(() => {
                      log('Delivering endsession response');
                      return {
                        request: request,
                        response: endSessionResponse,
                        error: endSessionError
                      } as EndSessionRequestResponse;
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
