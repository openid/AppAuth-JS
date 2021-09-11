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
import {AuthorizationManagementResponse} from './authorization_management_response';
import {AuthorizationError} from './authorization_management_response';
import {AuthorizationServiceConfiguration} from './authorization_service_configuration';
import {Crypto} from './crypto_utils';
import {log} from './logger';
import {QueryStringUtils} from './query_string_utils';
import {RedirectRequestTypes, StringMap} from './types';


/**
 * This type represents a lambda that can take an AuthorizationRequest,
 * and an AuthorizationResponse as arguments.
 */
export type AuthorizationListener =
    (request: AuthorizationManagementRequest,
     response: AuthorizationManagementResponse|null,
     error: AuthorizationError|null) => void;

/**
 * Represents a structural type holding both authorization request and response.
 */
export interface AuthorizationRequestResponse {
  request: AuthorizationManagementRequest;
  response: AuthorizationManagementResponse|null;
  error: AuthorizationError|null;
}

/**
 * Authorization Service notifier.
 * This manages the communication of the AuthorizationResponse to the 3p client.
 */
export class AuthorizationNotifier {
  private listener: AuthorizationListener|null = null;

  setAuthorizationListener(listener: AuthorizationListener) {
    this.listener = listener;
  }

  /**
   * The authorization complete callback.
   */
  onAuthorizationComplete(
      request: AuthorizationManagementRequest,
      response: AuthorizationManagementResponse|null,
      error: AuthorizationError|null): void {
    if (this.listener) {
      // complete authorization request
      this.listener(request, response, error);
    }
  }
}


/**
 * Defines the interface which is capable of handling an authorization request
 * using various methods (iframe / popup / different process etc.).
 */
export abstract class AuthorizationRequestHandler {
  constructor(public utils: QueryStringUtils, protected crypto: Crypto) {}

  // notifier send the response back to the client.
  protected notifier: AuthorizationNotifier|null = null;

  /**
   * A utility method to be able to build the authorization request URL.
   */
  protected buildRequestUrl(
      configuration: AuthorizationServiceConfiguration,
      request: AuthorizationManagementRequest,
      requestType: RedirectRequestTypes) {
    // build the query string
    // coerce to any type for convenience
    let requestMap: StringMap = request.toRequestMap()
    let query = this.utils.stringify(requestMap);
    let baseUrl = requestType === RedirectRequestTypes.authorization ?
        configuration.authorizationEndpoint :
        configuration.endSessionEndpoint;
    let url = `${baseUrl}?${query}`;
    return url;
  }

  /**
   * Completes the authorization request if necessary & when possible.
   */
  completeAuthorizationRequestIfPossible(): Promise<void> {
    // call complete authorization if possible to see there might
    // be a response that needs to be delivered.
    log(`Checking to see if there is an authorization response to be delivered.`);
    if (!this.notifier) {
      log(`Notifier is not present on AuthorizationRequest handler.
          No delivery of result will be possible`)
    }
    return this.completeAuthorizationRequest().then(result => {
      if (!result) {
        log(`No result is available yet.`);
      }
      if (result && this.notifier) {
        this.notifier.onAuthorizationComplete(result.request, result.response, result.error);
      }
    });
  }

  /**
   * Completes the endsession request if necessary & when possible.
   */
  completeEndSessionRequestIfPossible(): Promise<void> {
    // call complete endsession if possible to see there might
    // be a response that needs to be delivered.
    log(`Checking to see if there is an endsession response to be delivered.`);
    if (!this.notifier) {
      log(`Notifier is not present on EndSessionRequest handler.
          No delivery of result will be possible`)
    }
    return this.completeEndSessionRequest().then(result => {
      if (!result) {
        log(`No result is available yet.`);
      }
      if (result && this.notifier) {
        this.notifier.onAuthorizationComplete(result.request, result.response, result.error);
      }
    });
  }

  /**
   * Sets the default Authorization Service notifier.
   */
  setAuthorizationNotifier(notifier: AuthorizationNotifier): AuthorizationRequestHandler {
    this.notifier = notifier;
    return this;
  };

  /**
   * Makes an authorization request.
   */
  abstract performAuthorizationRequest(
      configuration: AuthorizationServiceConfiguration,
      request: AuthorizationManagementRequest): void;

  /**
   * Makes an end session request.
   */
  abstract performEndSessionRequest(
      configuration: AuthorizationServiceConfiguration,
      request: AuthorizationManagementRequest): void;
  /**
   * Checks if an authorization flow can be completed, and completes it.
   * The handler returns a `Promise<AuthorizationRequestResponse>` if ready, or a `Promise<null>`
   * if not ready.
   */
  protected abstract completeAuthorizationRequest(): Promise<AuthorizationRequestResponse|null>;

  /**
   * Checks if an end session flow can be completed, and completes it.
   * The handler returns a `Promise<AuthorizationRequestResponse>` if ready, or a `Promise<null>`
   * if not ready.
   */
  protected abstract completeEndSessionRequest(): Promise<AuthorizationRequestResponse|null>;
}
