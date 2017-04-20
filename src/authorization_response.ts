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
 * Represents the AuthorizationResponse as a JSON object.
 */
export interface AuthorizationResponseJson {
  code: string;
  state: string;
}

/**
 * Represents the AuthorizationError as a JSON object.
 */
export interface AuthorizationErrorJson {
  error: string;
  error_description?: string;
  error_uri?: string;
  state?: string;
}

/**
 * Represents the Authorization Response type.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.2
 */
export class AuthorizationResponse {
  constructor(public code: string, public state: string) {}

  toJson(): AuthorizationResponseJson {
    return {code: this.code, state: this.state};
  }

  static fromJson(json: AuthorizationResponseJson): AuthorizationResponse {
    return new AuthorizationResponse(json.code, json.state);
  }
}

/**
 * Represents the Authorization error response.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.2.1
 */
export class AuthorizationError {
  constructor(
      public error: string,
      public errorDescription?: string,
      public errorUri?: string,
      public state?: string) {}

  toJson(): AuthorizationErrorJson {
    return {
      error: this.error,
      error_description: this.errorDescription,
      error_uri: this.errorUri,
      state: this.state
    };
  }

  static fromJson(json: AuthorizationErrorJson): AuthorizationError {
    return new AuthorizationError(json.error, json.error_description, json.error_uri, json.state);
  }
}
