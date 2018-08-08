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
 * Represents the EndSessionResponse as a JSON object.
 */
export interface EndSessionResponseJson {
  state: string;
}

/**
 * Represents the EndSessionError as a JSON object.
 */
export interface EndSessionErrorJson {
  error: string;
  error_description?: string;
  error_uri?: string;
  state?: string;
}

/**
 * Represents the EndSession Response type.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
export class EndSessionResponse {
  constructor(public state: string) {}

  toJson(): EndSessionResponseJson {
    return {state: this.state};
  }

  static fromJson(json: EndSessionResponseJson): EndSessionResponse {
    return new EndSessionResponse(json.state);
  }
}

/**
 * Represents the EndSession error response.
 * For more information look at:
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
export class EndSessionError {
  constructor(
      public error: string,
      public errorDescription?: string,
      public errorUri?: string,
      public state?: string) {}

  toJson(): EndSessionErrorJson {
    return {
      error: this.error,
      error_description: this.errorDescription,
      error_uri: this.errorUri,
      state: this.state
    };
  }

  static fromJson(json: EndSessionErrorJson): EndSessionError {
    return new EndSessionError(json.error, json.error_description, json.error_uri, json.state);
  }
}
