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

import {AuthorizationManagementRequest} from './authorization_management_request'
import {Crypto, DefaultCrypto} from './crypto_utils';
import {StringMap} from './types';

/**
 * Represents an EndSessionRequest as JSON.
 */
export interface EndSessionRequestJson {
  id_token_hint: string;
  post_logout_redirect_uri: string;
  state?: string;
  extras?: StringMap;
}

/**
 * Generates a cryptographically random new state. Useful for CSRF protection.
 */
const SIZE = 10;  // 10 bytes
const newState = function(crypto: Crypto): string {
  return crypto.generateRandom(SIZE);
};

/**
 * Represents the EndSessionRequest.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
export class EndSessionRequest extends AuthorizationManagementRequest {
  // NOTE:
  // Both post_logout_redirect_uri and state are actually optional.
  // However AppAuth is more opionionated, and requires you to use both.

  idTokenHint: string;
  postLogoutRedirectUri: string;
  state: string;
  extras?: StringMap;

  /**
   * Constructs a new EndSessionRequest.
   * Use a `undefined` value for the `state` parameter, to generate a random
   * state for CSRF protection.
   */
  constructor(request: EndSessionRequestJson, private crypto: Crypto = new DefaultCrypto()) {
    super();
    this.idTokenHint = request.id_token_hint;
    this.postLogoutRedirectUri = request.post_logout_redirect_uri;
    this.state = request.state || newState(crypto);
    this.extras = request.extras;
  }

  /**
   * Serializes the EndSessionRequest to a JavaScript Object.
   */
  toJson(): Promise<EndSessionRequestJson> {
    return Promise.resolve({
      id_token_hint: this.idTokenHint,
      post_logout_redirect_uri: this.postLogoutRedirectUri,
      state: this.state,
      extras: this.extras
    });
  }
}