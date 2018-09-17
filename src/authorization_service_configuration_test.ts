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

import {AuthorizationServiceConfiguration, AuthorizationServiceConfigurationJson} from './authorization_service_configuration';
import {AppAuthError} from './errors';
import {TestRequestor} from './xhr';

describe('Authorization Service Configuration Tests', () => {
  const authorizationEndpoint = 'authorization://endpoint';
  const tokenEndpoint = 'token://endpoint';
  const revocationEndpoint = 'revocation://endpoint';
  const userInfoEndpoint = 'userInfo://endpoint';
  const endSessionEndpoint = 'endSession://endpoint';

  let configuration = new AuthorizationServiceConfiguration({
    authorization_endpoint: authorizationEndpoint,
    token_endpoint: tokenEndpoint,
    revocation_endpoint: revocationEndpoint,
    userinfo_endpoint: userInfoEndpoint,
    end_session_endpoint: endSessionEndpoint,
  });

  it('Initialization should work', () => {
    expect(configuration).toBeTruthy();
    expect(configuration.authorizationEndpoint).toBe(authorizationEndpoint);
    expect(configuration.tokenEndpoint).toBe(tokenEndpoint);
    expect(configuration.revocationEndpoint).toBe(revocationEndpoint);
    expect(configuration.endSessionEndpoint).toBe(endSessionEndpoint);
    expect(configuration.userInfoEndpoint).toBe(userInfoEndpoint);
  });

  it('Conversion to Json and back should work', () => {
    let json = configuration.toJson();
    let newConfiguration = new AuthorizationServiceConfiguration(json);
    expect(newConfiguration).toBeTruthy();
    expect(newConfiguration.authorizationEndpoint).toBe(configuration.authorizationEndpoint);
    expect(newConfiguration.tokenEndpoint).toBe(configuration.tokenEndpoint);
    expect(newConfiguration.revocationEndpoint).toBe(configuration.revocationEndpoint);
    expect(configuration.endSessionEndpoint).toBe(endSessionEndpoint);
    expect(configuration.userInfoEndpoint).toBe(userInfoEndpoint);
  });

  describe('Tests with dependencies', () => {
    it('Fetch from issuer tests should work', (done: DoneFn) => {
      let promise: Promise<AuthorizationServiceConfigurationJson> =
          Promise.resolve(configuration.toJson());
      let requestor = new TestRequestor(promise);
      AuthorizationServiceConfiguration.fetchFromIssuer('some://endpoint', requestor)
          .then(result => {
            expect(result).toBeTruthy();
            expect(result.authorizationEndpoint).toBe(configuration.authorizationEndpoint);
            expect(result.tokenEndpoint).toBe(configuration.tokenEndpoint);
            expect(result.revocationEndpoint).toBe(configuration.revocationEndpoint);
            expect(configuration.endSessionEndpoint).toBe(endSessionEndpoint);
            expect(configuration.userInfoEndpoint).toBe(userInfoEndpoint);
            done();
          });
    });

    it('Fetch from issuer tests should work', (done: DoneFn) => {
      let promise: Promise<AuthorizationServiceConfigurationJson> =
          Promise.reject(new Error('Something bad happened.'));
      let requestor = new TestRequestor(promise);

      AuthorizationServiceConfiguration.fetchFromIssuer('some://endpoint', requestor)
          .catch(result => {
            expect(result).toBeTruthy();
            let error = result as AppAuthError;
            expect(error.message).toBe('Something bad happened.');
            done();
          });
    });
  });
});
