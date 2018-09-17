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

import {AuthorizationResponse} from './authorization_response';

describe('Authorization Response Tests', () => {
  const code = 'code';
  const state = 'state';

  it('Constructing an Authorization Response should work', () => {
    let response = new AuthorizationResponse({code: code, state: state});
    expect(response).not.toBeNull();
    expect(response.code).toBe(code);
    expect(response.state).toBe(state);
  });

  it('toJson() and fromJson() should work', () => {
    let response = new AuthorizationResponse({code: code, state: state});
    let json = response.toJson();
    expect(json).not.toBeNull();
    expect(json.code).toBe(code);
    expect(json.state).toBe(state);
    let newResponse = new AuthorizationResponse(json);
    expect(newResponse).not.toBeNull();
    expect(newResponse.code).toBe(code);
    expect(newResponse.state).toBe(state);
  });
});
