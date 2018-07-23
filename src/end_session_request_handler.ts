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

import {AuthorizationServiceConfiguration} from './authorization_service_configuration';
import {cryptoGenerateRandom, RandomGenerator} from './crypto_utils';
import {EndSessionRequest, EndSessionRequestJson} from './end_session_request';
import {EndSessionError, EndSessionErrorJson, EndSessionResponse, EndSessionResponseJson} from './end_session_response';
import {log} from './logger';
import {QueryStringUtils} from './query_string_utils';
import {StringMap} from './types';

/**
 * This type represents a lambda that can take an EndSessionRequest,
 * and an EndSessionResponse as arguments.
 */
export type EndSessionListener =
    (request: EndSessionRequest, response: EndSessionResponse|null, error: EndSessionError|null) =>
        void;

/**
 * Represents a structural type holding both end session request and response.
 */
export interface EndSessionRequestResponse {
  request: EndSessionRequest;
  response: EndSessionResponse|null;
  error: EndSessionError|null;
}

/**
 * EndSession Service notifier.
 * This manages the communication of the EndSessionResponse to the 3p client.
 */
export class EndSessionNotifier {
  private listener: EndSessionListener|null = null;

  setEndSessionListener(listener: EndSessionListener) {
    this.listener = listener;
  }

  /**
   * The endsession complete callback.
   */
  onEndSessionComplete(
      request: EndSessionRequest,
      response: EndSessionResponse|null,
      error: EndSessionError|null): void {
    if (this.listener) {
      // complete endsession request
      this.listener(request, response, error);
    }
  }
}

// TODO(rahulrav@): add more built in parameters.
/* built in parameters. */
export const ENDSESSION_BUILT_IN_PARAMETERS =
    ['id_token_hint', 'post_logout_redirect_uri', 'state'];

/**
 * Defines the interface which is capable of handling an endsession request
 * using various methods (iframe / popup / different process etc.).
 */
export abstract class EndSessionRequestHandler {
  constructor(public utils: QueryStringUtils, protected generateRandom: RandomGenerator) {}

  // notifier send the response back to the client.
  protected notifier: EndSessionNotifier|null = null;

  /**
   * A utility method to be able to build the endsession request URL.
   */
  protected buildRequestUrl(
      configuration: AuthorizationServiceConfiguration,
      request: EndSessionRequest) {
    // build the query string
    // coerce to any type for convenience
    let requestMap: StringMap = {
      'id_token_hint': request.idTokenHint,
      'post_logout_redirect_uri': request.postLogoutRedirectUri,
      'state': request.state
    };

    // copy over extras
    if (request.extras) {
      for (let extra in request.extras) {
        if (request.extras.hasOwnProperty(extra)) {
          // check before inserting to requestMap
          if (ENDSESSION_BUILT_IN_PARAMETERS.indexOf(extra) < 0) {
            requestMap[extra] = request.extras[extra];
          }
        }
      }
    }

    let query = this.utils.stringify(requestMap);
    let baseUrl =
        configuration.endSessionEndpoint;  // TBD - should throw if no url is available at OP
    let url = `${baseUrl}?${query}`;
    return url;
  }

  /**
   * Completes the endsession request if necessary & when possible.
   */
  completeEndSessionRequestIfPossible(): void {
    // call complete endsession if possible to see there might
    // be a response that needs to be delivered.
    log(`Checking to see if there is an endsession response to be delivered.`);
    if (!this.notifier) {
      log(`Notifier is not present on EndSessionRequest handler.
          No delivery of result will be possible`)
    }
    this.completeEndSessionRequest().then(result => {
      if (!result) {
        log(`No result is available yet.`);
      }
      if (result && this.notifier) {
        this.notifier.onEndSessionComplete(result.request, result.response, result.error);
      }
    });
  }

  /**
   * Sets the default EndSession Service notifier.
   */
  setEndSessionNotifier(notifier: EndSessionNotifier): EndSessionRequestHandler {
    this.notifier = notifier;
    return this;
  };

  /**
   * Makes an endsession request.
   */
  abstract performEndSessionRequest(
      configuration: AuthorizationServiceConfiguration,
      request: EndSessionRequest): void;

  /**
   * Checks if an end session request can be completed, and completes it.
   * The handler returns a `Promise<EndSessionRequestResponse>` if ready, or a `Promise<null>`
   * if not ready.
   */
  protected abstract completeEndSessionRequest(): Promise<EndSessionRequestResponse|null>;
}
