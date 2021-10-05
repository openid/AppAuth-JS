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

import {AuthorizationManagementResponse} from './authorization_management_response'

/**
 * Represents the EndSessionResponse as a JSON object.
 */
export interface EndSessionResponseJson {
  state: string;
}

/**
 * Represents the EndSession Response type.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
export class EndSessionResponse extends AuthorizationManagementResponse {
  state: string;

  constructor(response: EndSessionResponseJson) {
    super();
    this.state = response.state;
  }

  toJson(): EndSessionResponseJson {
    return {state: this.state};
  }
}