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

import {cryptoGenerateRandom, RandomGenerator} from './crypto_utils';
import {StringMap} from './types';

/**
 * Represents an EndSessionRequest as JSON.
 */

// NOTE:
// Both post_logout_redirect_uri and state are actually optional.
// However AppAuth is more opionionated, and requires you to use both.

export interface EndSessionRequestJson {
  id_token_hint: string;
  post_logout_redirect_uri: string;
  state: string;
  extras?: StringMap;
}

/**
 * Generates a cryptographically random new state. Useful for CSRF protection.
 */
const BYTES_LENGTH = 10;  // 10 bytes
const newState = function(generateRandom: RandomGenerator): string {
  return generateRandom(BYTES_LENGTH);
};

/**
 * Represents the EndSessionRequest.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
export class EndSessionRequest {
  state: string;
  /**
   * Constructs a new EndSessionRequest.
   * Use a `undefined` value for the `state` parameter, to generate a random
   * state for CSRF protection.
   */
  constructor(
      public idTokenHint: string,
      public postLogoutRedirectUri: string,
      state?: string,
      public extras?: StringMap,
      generateRandom = cryptoGenerateRandom) {
    this.state = state || newState(generateRandom);
  }

  /**
   * Serializes the EndSessionRequest to a JavaScript Object.
   */
  toJson(): EndSessionRequestJson {
    return {
      id_token_hint: this.idTokenHint,
      post_logout_redirect_uri: this.postLogoutRedirectUri,
      state: this.state,
      extras: this.extras
    };
  }

  /**
   * Creates a new instance of EndSessionRequest.
   */
  static fromJson(input: EndSessionRequestJson): EndSessionRequest {
    return new EndSessionRequest(
        input.id_token_hint, input.post_logout_redirect_uri, input.state, input.extras);
  }
}
