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

/**
 * Supported token types
 */
export type TokenTypeHint = 'refresh_token'|'access_token';

/**
 * Represents the Token Request as JSON.
 */
export interface RevokeTokenRequestJson {
  token: string;
  token_type_hint?: TokenTypeHint;
  client_id?: string;
  client_secret?: string;
}

/**
 * Represents a revoke token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc7009#section-2.1
 */
export class RevokeTokenRequest {
  constructor(
      public token: string,
      public tokenTypeHint?: TokenTypeHint,
      public clientId?: string,
      public clientSecret?: string) {}

  /**
   * Serializes a TokenRequest to a JavaScript object.
   */
  toJson(): RevokeTokenRequestJson {
    let json: RevokeTokenRequestJson = {token: this.token};

    if (this.tokenTypeHint) {
      json['token_type_hint'] = this.tokenTypeHint;
    }

    if (this.clientId) {
      json['client_id'] = this.clientId;
    }

    if (this.clientSecret) {
      json['client_secret'] = this.clientSecret;
    }

    return json;
  }

  static fromJson(input: RevokeTokenRequestJson): RevokeTokenRequest {
    return new RevokeTokenRequest(
        input.token, input.token_type_hint, input.client_id, input.client_secret);
  }
}
