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

import {EndSessionResponse} from './end_session_response';

describe('EndSession Response Tests', () => {
  const state = 'state';

  it('Constructing an EndSession Response should work', () => {
    let response = new EndSessionResponse(state);
    expect(response).not.toBeNull();
    expect(response.state).toBe(state);
  });

  it('toJson() and fromJson() should work', () => {
    let response = new EndSessionResponse(state);
    let json = response.toJson();
    expect(json).not.toBeNull();
    expect(json.state).toBe(state);
    let newResponse = EndSessionResponse.fromJson(json);
    expect(newResponse).not.toBeNull();
    expect(newResponse.state).toBe(state);
  });
});
