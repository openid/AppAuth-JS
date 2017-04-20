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

export const GRANT_TYPE_AUTHORIZATION_CODE = 'authorization_code';
export const GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';

/**
 * Represents the Token Request as JSON.
 */
export interface TokenRequestJson {
  grant_type: string;
  code?: string;
  refresh_token?: string, redirect_uri: string;
  client_id: string;
  extras?: StringMap;
}


/**
 * Represents an Access Token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.3
 */
export class TokenRequest {
  constructor(
      public clientId: string,
      public redirectUri: string,
      // TODO(rahulrav@): Add the ability to infer grant types.
      public grantType: string,
      public code?: string,
      public refreshToken?: string,
      public extras?: StringMap) {}

  /**
   * Serializes a TokenRequest to a JavaScript object.
   */
  toJson(): TokenRequestJson {
    return {
      grant_type: this.grantType,
      code: this.code,
      refresh_token: this.refreshToken,
      redirect_uri: this.redirectUri,
      client_id: this.clientId,
      extras: this.extras
    };
  }

  toStringMap(): StringMap {
    let map: StringMap = {
      grant_type: this.grantType,
      client_id: this.clientId,
      redirect_uri: this.redirectUri
    };

    if (this.code) {
      map['code'] = this.code;
    }

    if (this.refreshToken) {
      map['refresh_token'] = this.refreshToken;
    }

    // copy over extras
    if (this.extras) {
      for (let extra in this.extras) {
        if (this.extras.hasOwnProperty(extra) && !map.hasOwnProperty(extra)) {
          // check before inserting to requestMap
          map[extra] = this.extras[extra];
        }
      }
    }

    return map;
  }

  static fromJson(input: TokenRequestJson): TokenRequest {
    return new TokenRequest(
        input.client_id,
        input.redirect_uri,
        input.grant_type,
        input.code,
        input.refresh_token,
        input.extras);
  }
}
