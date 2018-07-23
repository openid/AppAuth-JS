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

import {EndSessionRequest} from './end_session_request';
import {StringMap} from './types';

describe('EndSessionRequest Tests', () => {
  const idTokenHint = 'id_token_hint';
  const postLogoutRedirectUri = 'http://my/post_logout_redirect_uri';
  const state = 'state';
  const extras: StringMap = {'key': 'value'};

  let request: EndSessionRequest =
      new EndSessionRequest(idTokenHint, postLogoutRedirectUri, state, extras);

  let request2: EndSessionRequest =
      new EndSessionRequest(idTokenHint, postLogoutRedirectUri, undefined, extras);

  it('Basic EndSession Request Tests', () => {
    expect(request).not.toBeNull();
    expect(request.idTokenHint).toBe(idTokenHint);
    expect(request.postLogoutRedirectUri).toBe(postLogoutRedirectUri);
    expect(request.state).toBe(state);
    expect(request.extras).toBeTruthy();
    expect(request.extras!['key']).toBe('value');
    expect(request.extras).toEqual(extras);
  });

  it('To Json() and from Json() should work', () => {
    let json = JSON.parse(JSON.stringify(request.toJson()));
    expect(json).not.toBeNull();
    let newRequest = EndSessionRequest.fromJson(json);
    expect(newRequest).not.toBeNull();
    expect(newRequest.idTokenHint).toBe(idTokenHint);
    expect(newRequest.postLogoutRedirectUri).toBe(postLogoutRedirectUri);
    expect(newRequest.state).toBe(state);
    expect(newRequest.extras).toBeTruthy();
    expect(newRequest.extras!['key']).toBe('value');
    expect(newRequest.extras).toEqual(extras);
  });

  it('Expect cryptographic newState() to populate state', () => {
    expect(request2.state).not.toBeNull();
  });
});
