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

import {TokenError, TokenResponse} from './token_response';

describe('Token Response tests', () => {
  const accessToken = 'accessToken';
  const idToken = 'idToken';

  it('Basic Token Response Tests', () => {
    let response = new TokenResponse(accessToken);
    expect(response).not.toBeNull();
    expect(response.accessToken).toBe(accessToken);
    expect(response.idToken).toBeFalsy();
    expect(response.tokenType).toBe('bearer');
    expect(response.issuedAt).toBeTruthy();
    expect(response.isValid()).toBe(true);
    expect(response.refreshToken).toBeFalsy();
    expect(response.scope).toBeFalsy();
  });

  it('Test response token validity', () => {
    let response = new TokenResponse(
        accessToken,
        idToken,
        undefined /* refresh token */,
        undefined /* scope */,
        'bearer',
        1 /* issued at */,
        1000 /* expires in*/
    );

    expect(response).not.toBeNull();
    expect(response.accessToken).toBe(accessToken);
    expect(response.idToken).toBe(idToken);
    expect(response.tokenType).toBe('bearer');
    expect(response.issuedAt).toBeTruthy();
    expect(response.isValid()).toBe(false);
    expect(response.refreshToken).toBeFalsy();
    expect(response.scope).toBeFalsy();
  });

  it('To Json() and from Json() should work', () => {
    let response = new TokenResponse(accessToken, idToken);
    let json = JSON.parse(JSON.stringify(response.toJson()));
    let newResponse = TokenResponse.fromJson(json);
    expect(newResponse).not.toBeNull();
    expect(newResponse.accessToken).toBe(accessToken);
    expect(newResponse.idToken).toBe(idToken);
    expect(newResponse.tokenType).toBe('bearer');
    expect(newResponse.issuedAt).toBeTruthy();
    expect(newResponse.isValid()).toBe(true);
    expect(newResponse.refreshToken).toBeFalsy();
    expect(newResponse.scope).toBeFalsy();
  });

  it('Basic Token Error Tests', () => {
    let error = new TokenError('invalid_client');
    expect(error).toBeTruthy();
    expect(error.error).toBe('invalid_client');
    expect(error.errorDescription).toBeFalsy();
    expect(error.errorUri).toBeFalsy();
  });

  it('To Json and from JSON should work for errors', () => {
    let error = new TokenError('invalid_client');
    let json = JSON.parse(JSON.stringify(error.toJson()));
    let newError = TokenError.fromJson(json);
    expect(newError).toBeTruthy();
    expect(newError.error).toBe('invalid_client');
    expect(newError.errorDescription).toBeFalsy();
    expect(newError.errorUri).toBeFalsy();
  });
});
