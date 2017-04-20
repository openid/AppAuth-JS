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

import {AuthorizationRequest} from './authorization_request';
import {AuthorizationListener, AuthorizationNotifier, AuthorizationRequestHandler} from './authorization_request_handler';
import {AuthorizationResponse, AuthorizationResponseJson} from './authorization_response';


/**
 * Represents the AuthorizationService which can be used to make
 * authorization requests and token requests.
 */
export class AuthorizationService {
  // notifier send the response back to the client.
  private notifier: AuthorizationNotifier|null = null;

  // handler handles the actual authorization request.
  private handler: AuthorizationRequestHandler|null = null;

  /**
   * Sets the default Authorization Service notifier.
   */
  setAuthorizationNotifier(notifier: AuthorizationNotifier): AuthorizationService {
    this.notifier = notifier;
    this.registerListener();
    return this;
  };

  /**
   * Registers an authorization listener.
   */
  private registerListener(): void {
    if (this.notifier) {
      this.notifier.setAuthorizationListener(
          (request, response) => {
              // handle response

          });
    }
  }

  /**
   * Sets the default Authorization Request handler.
   * Typically this will be configured based on the platform.
   */
  setAuthorizationRequestHandler(handler: AuthorizationRequestHandler): AuthorizationService {
    this.handler = handler;
    return this;
  }

  /**
   * Performs the authorization request using the AuthorizationRequestHandler.
   */
  performAuthorizationRequest(request: AuthorizationRequest): void {
    // use the handler to make the authorization request, and to complete it.
  }
}
