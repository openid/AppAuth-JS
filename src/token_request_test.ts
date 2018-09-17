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

import {GRANT_TYPE_AUTHORIZATION_CODE, TokenRequest} from './token_request';
import {StringMap} from './types';

describe('Token Request tests', () => {
  const clientId = 'client_id';
  const redirectUri = 'http://my/redirect_uri';
  const code = 'some_code';
  const extras: StringMap = {'key': 'value'};

  let request: TokenRequest = new TokenRequest({
    client_id: clientId,
    redirect_uri: redirectUri,
    grant_type: GRANT_TYPE_AUTHORIZATION_CODE,
    code: code,
    refresh_token: undefined,
    extras: extras
  });

  it('Basic Token Request Tests', () => {
    expect(request).not.toBeNull();
    expect(request.clientId).toBe(clientId);
    expect(request.redirectUri).toBe(redirectUri);
    expect(request.code).toBe(code);
    expect(request.grantType).toBe(GRANT_TYPE_AUTHORIZATION_CODE);
    expect(request.extras).toBeTruthy();
    expect(request.extras!['key']).toBe('value');
    expect(request.extras).toEqual(extras);
  });

  it('To Json() and from Json() should work', () => {
    let json = JSON.parse(JSON.stringify(request.toJson()));
    expect(json).not.toBeNull();
    let newRequest = new TokenRequest(json);
    expect(newRequest).not.toBeNull();
    expect(newRequest.clientId).toBe(clientId);
    expect(newRequest.redirectUri).toBe(redirectUri);
    expect(newRequest.code).toBe(code);
    expect(newRequest.grantType).toBe(GRANT_TYPE_AUTHORIZATION_CODE);
    expect(newRequest.extras).toBeTruthy();
    expect(newRequest.extras!['key']).toBe('value');
    expect(newRequest.extras).toEqual(extras);
  });
});
