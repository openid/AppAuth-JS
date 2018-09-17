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
 * Represents an AuthorizationRequest as JSON.
 */
export interface AuthorizationRequestJson {
  response_type: string;
  client_id: string;
  redirect_uri: string;
  scope: string;
  state?: string;
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
 * Represents the AuthorizationRequest.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.1
 */
export class AuthorizationRequest {
  static RESPONSE_TYPE_TOKEN = 'token';
  static RESPONSE_TYPE_CODE = 'code';

  // NOTE:
  // Both redirect_uri and state are actually optional.
  // However AppAuth is more opionionated, and requires you to use both.

  clientId: string;
  redirectUri: string;
  scope: string;
  responseType: string;
  state: string;
  extras?: StringMap;

  /**
   * Constructs a new AuthorizationRequest.
   * Use a `undefined` value for the `state` parameter, to generate a random
   * state for CSRF protection.
   */
  constructor(request: AuthorizationRequestJson, generateRandom = cryptoGenerateRandom) {
    this.clientId = request.client_id;
    this.redirectUri = request.redirect_uri;
    this.scope = request.scope;
    this.responseType = request.response_type || AuthorizationRequest.RESPONSE_TYPE_CODE;
    this.state = request.state || newState(generateRandom);
    this.extras = request.extras;
  }

  /**
   * Serializes the AuthorizationRequest to a JavaScript Object.
   */
  toJson(): AuthorizationRequestJson {
    return {
      response_type: this.responseType,
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scope,
      state: this.state,
      extras: this.extras
    };
  }
}
