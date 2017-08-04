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
export interface RevokeTokenRequestJson { token: string; }


/**
 * Represents a revoke token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.3
 */
export class RevokeTokenRequest {
  constructor(public token: string) {}

  /**
   * Serializes a TokenRequest to a JavaScript object.
   */
  toJson(): RevokeTokenRequestJson {
    return {
      token: this.token,
    };
  }

  toStringMap(): StringMap {
    let map: StringMap = {token: this.token};

    return map;
  }

  static fromJson(input: RevokeTokenRequestJson): RevokeTokenRequest {
    return new RevokeTokenRequest(input.token);
  }
}
