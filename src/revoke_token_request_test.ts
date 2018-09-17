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

import {RevokeTokenRequest} from './revoke_token_request';

describe('Revoke Token Request tests', () => {
  const token = 'token';

  let request: RevokeTokenRequest = new RevokeTokenRequest({token: token});
  it('Basic Revoke Token Request Tests', () => {
    expect(request).not.toBeNull();
    expect(request.token).toBe(token);
  });

  it('To Json() and from Json() should work', () => {
    let json = JSON.parse(JSON.stringify(request.toJson()));
    expect(json).not.toBeNull();
    let newRequest = new RevokeTokenRequest(json);
    expect(newRequest).not.toBeNull();
    expect(newRequest.token).toBe(token);
  });
});

describe('Authenticated Revoke Token Request tests', () => {
  const token = 'token';
  const tokenTypeHint = 'refresh_token';
  const clientId = 'client_id';
  const clientSecret = 'client_secret';

  let request: RevokeTokenRequest = new RevokeTokenRequest({
    token: token,
    token_type_hint: tokenTypeHint,
    client_id: clientId,
    client_secret: clientSecret
  });

  it('Basic Revoke Token Request Tests', () => {
    expect(request).not.toBeNull();
    expect(request.token).toBe(token);
    expect(request.tokenTypeHint).toBe(tokenTypeHint);
    expect(request.clientId).toBe(clientId);
    expect(request.clientSecret).toBe(clientSecret);
  });

  it('To Json() and from Json() should work', () => {
    let json = JSON.parse(JSON.stringify(request.toJson()));
    expect(json).not.toBeNull();
    let newRequest = new RevokeTokenRequest(json);
    expect(newRequest).not.toBeNull();
    expect(newRequest.token).toBe(token);
    expect(newRequest.tokenTypeHint).toBe(tokenTypeHint);
    expect(newRequest.clientId).toBe(clientId);
    expect(newRequest.clientSecret).toBe(clientSecret);
  });
});
