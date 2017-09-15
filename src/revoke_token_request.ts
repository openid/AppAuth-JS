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

import {StringMap} from './types';

/**
 * Represents the Token Request as JSON.
 */
export interface RevokeTokenRequestJson {
  token: string;
  token_type_hint?: string;
}


/**
 * Represents a revoke token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc7009#section-2.1
 */
export class RevokeTokenRequest {
  constructor(
      public token: string,
      public tokenTypeHint?: string,
      public clientId?: string,
      public clientSecret?: string) {}

  /**
   * Serializes a TokenRequest to a JavaScript object.
   */
  toJson(): RevokeTokenRequestJson {
    return {
      token: this.token,
      token_type_hint: this.tokenTypeHint,
    };
  }

  // TODO: http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication
  // support client_secret_basic and client_secret_post, this also applies to the token endpoint
  /*needsAuthentication(): boolean {
    return this.clientId !== undefined && this.clientSecret !== undefined;
  }

  getBasicAuthorizationHeader(): string {
    if (!this.needsAuthentication()) {
      return '';
    }

    var credentials = this.clientId + ':' + this.clientSecret;
    var basicScheme = btoa(credentials);
    return 'Basic ' + basicScheme;
  }*/

  toStringMap(): StringMap {
    let map: StringMap = {token: this.token};

    if (this.tokenTypeHint) {
      map['token_type_hint'] = this.tokenTypeHint;
    }

    if (this.clientId) {
      map['client_id'] = this.clientId;
    }

    if (this.clientSecret) {
      map['client_secret'] = this.clientSecret;
    }

    return map;
  }

  static fromJson(input: RevokeTokenRequestJson): RevokeTokenRequest {
    return new RevokeTokenRequest(input.token);
  }
}
