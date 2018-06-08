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

import {AuthorizationRequest} from './authorization_request';
import {StringMap} from './types';

describe('AuthorizationRequest Tests', () => {
  const clientId = 'client_id';
  const redirectUri = 'http://my/redirect_uri';
  const scope = 'scope';
  const state = 'state';
  const extras: StringMap = {'key': 'value'};

  let request: AuthorizationRequest = new AuthorizationRequest(
      clientId, redirectUri, scope, AuthorizationRequest.RESPONSE_TYPE_CODE, state, extras);

  let request2: AuthorizationRequest = new AuthorizationRequest(
      clientId, redirectUri, scope, AuthorizationRequest.RESPONSE_TYPE_CODE, undefined, extras);

  it('Basic Authorization Request Tests', () => {
    expect(request).not.toBeNull();
    expect(request.responseType).toBe(AuthorizationRequest.RESPONSE_TYPE_CODE);
    expect(request.clientId).toBe(clientId);
    expect(request.redirectUri).toBe(redirectUri);
    expect(request.scope).toBe(scope);
    expect(request.state).toBe(state);
    expect(request.extras).toBeTruthy();
    expect(request.extras!['key']).toBe('value');
    expect(request.extras).toEqual(extras);
  });

  it('To Json() and from Json() should work', () => {
    let json = JSON.parse(JSON.stringify(request.toJson()));
    expect(json).not.toBeNull();
    let newRequest = AuthorizationRequest.fromJson(json);
    expect(newRequest).not.toBeNull();
    expect(newRequest.responseType).toBe(AuthorizationRequest.RESPONSE_TYPE_CODE);
    expect(newRequest.clientId).toBe(clientId);
    expect(newRequest.redirectUri).toBe(redirectUri);
    expect(newRequest.scope).toBe(scope);
    expect(newRequest.state).toBe(state);
    expect(newRequest.extras).toBeTruthy();
    expect(newRequest.extras!['key']).toBe('value');
    expect(newRequest.extras).toEqual(extras);
  });

  it('Expect cryptographic newState() to populate state', () => {
    expect(request2.state).not.toBeNull();
  });
});
