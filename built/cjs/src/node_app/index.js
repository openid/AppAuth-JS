"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
// Represents a Node application, that uses the AppAuthJS library.
const authorization_request_1 = require("../authorization_request");
const authorization_request_handler_1 = require("../authorization_request_handler");
const authorization_service_configuration_1 = require("../authorization_service_configuration");
const logger_1 = require("../logger");
const node_support_1 = require("../node_support");
const node_requestor_1 = require("../node_support/node_requestor");
const node_request_handler_1 = require("../node_support/node_request_handler");
const revoke_token_request_1 = require("../revoke_token_request");
const token_request_1 = require("../token_request");
const token_request_handler_1 = require("../token_request_handler");
const PORT = 8080;
/* the Node.js based HTTP client. */
const requestor = new node_requestor_1.NodeRequestor();
/* an example open id connect provider */
const openIdConnectUrl = 'https://accounts.google.com';
/* example client configuration */
const clientId = '511828570984-dhnshqcpegee66hgnp754dupe8sbas18.apps.googleusercontent.com';
const clientSecret = 'your-client-secret';
const redirectUri = `http://localhost:${PORT}`;
const scope = 'openid';
class App {
    constructor() {
        this.notifier = new authorization_request_handler_1.AuthorizationNotifier();
        this.authorizationHandler = new node_request_handler_1.NodeBasedHandler(PORT);
        this.tokenHandler = new token_request_handler_1.BaseTokenRequestHandler(requestor);
        // set notifier to deliver responses
        this.authorizationHandler.setAuthorizationNotifier(this.notifier);
        // set a listener to listen for authorization responses
        // make refresh and access token requests.
        this.notifier.setAuthorizationListener((request, response, error) => {
            (0, logger_1.log)('Authorization request complete ', request, response, error);
            if (response) {
                this.makeRefreshTokenRequest(this.configuration, request, response)
                    .then(result => this.makeAccessTokenRequest(this.configuration, result.refreshToken))
                    .then(() => (0, logger_1.log)('All done.'));
            }
        });
    }
    fetchServiceConfiguration() {
        return authorization_service_configuration_1.AuthorizationServiceConfiguration.fetchFromIssuer(openIdConnectUrl, requestor)
            .then(response => {
            (0, logger_1.log)('Fetched service configuration', response);
            return response;
        });
    }
    makeAuthorizationRequest(configuration) {
        // create a request
        let request = new authorization_request_1.AuthorizationRequest({
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: scope,
            response_type: authorization_request_1.AuthorizationRequest.RESPONSE_TYPE_CODE,
            state: undefined,
            extras: { 'prompt': 'consent', 'access_type': 'offline' }
        }, new node_support_1.NodeCrypto());
        (0, logger_1.log)('Making authorization request ', configuration, request);
        this.authorizationHandler.performAuthorizationRequest(configuration, request);
    }
    makeRefreshTokenRequest(configuration, request, response) {
        let extras = undefined;
        if (request) {
            extras = {};
            extras['client_secret'] = clientSecret;
            if (request.internal) {
                extras['code_verifier'] = request.internal['code_verifier'];
            }
        }
        let tokenRequest = new token_request_1.TokenRequest({
            client_id: clientId,
            redirect_uri: redirectUri,
            grant_type: token_request_1.GRANT_TYPE_AUTHORIZATION_CODE,
            code: response.code,
            refresh_token: undefined,
            extras: extras
        });
        return this.tokenHandler.performTokenRequest(configuration, tokenRequest).then(response => {
            (0, logger_1.log)(`Refresh Token is ${response.refreshToken}`);
            return response;
        });
    }
    makeAccessTokenRequest(configuration, refreshToken) {
        let extras = {};
        extras['client_secret'] = clientSecret;
        let request = new token_request_1.TokenRequest({
            client_id: clientId,
            redirect_uri: redirectUri,
            grant_type: token_request_1.GRANT_TYPE_REFRESH_TOKEN,
            code: undefined,
            refresh_token: refreshToken,
            extras: extras
        });
        return this.tokenHandler.performTokenRequest(configuration, request).then(response => {
            (0, logger_1.log)(`Access Token is ${response.accessToken}, Id Token is ${response.idToken}`);
            return response;
        });
    }
    makeRevokeTokenRequest(configuration, refreshToken) {
        let request = new revoke_token_request_1.RevokeTokenRequest({ token: refreshToken });
        return this.tokenHandler.performRevokeTokenRequest(configuration, request).then(response => {
            (0, logger_1.log)('revoked refreshToken');
            return response;
        });
    }
}
exports.App = App;
(0, logger_1.log)('Application is ready.');
const app = new App();
app.fetchServiceConfiguration()
    .then(configuration => {
    app.configuration = configuration;
    app.makeAuthorizationRequest(configuration);
    // notifier makes token requests.
})
    .catch(error => {
    (0, logger_1.log)('Something bad happened ', error);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZV9hcHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBRUgsa0VBQWtFO0FBRWxFLG9FQUFnRTtBQUNoRSxvRkFBc0c7QUFFdEcsZ0dBQTJGO0FBQzNGLHNDQUFnQztBQUNoQyxrREFBNkM7QUFDN0MsbUVBQStEO0FBQy9ELCtFQUF3RTtBQUN4RSxrRUFBNkQ7QUFDN0Qsb0RBQXlHO0FBQ3pHLG9FQUF3RjtBQUd4RixNQUFNLElBQUksR0FBRyxJQUFJLENBQUM7QUFFbEIsb0NBQW9DO0FBQ3BDLE1BQU0sU0FBUyxHQUFHLElBQUksOEJBQWEsRUFBRSxDQUFDO0FBRXRDLHlDQUF5QztBQUN6QyxNQUFNLGdCQUFnQixHQUFHLDZCQUE2QixDQUFDO0FBRXZELGtDQUFrQztBQUNsQyxNQUFNLFFBQVEsR0FBRywwRUFBMEUsQ0FBQztBQUM1RixNQUFNLFlBQVksR0FBRyxvQkFBb0IsQ0FBQztBQUMxQyxNQUFNLFdBQVcsR0FBRyxvQkFBb0IsSUFBSSxFQUFFLENBQUM7QUFDL0MsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDO0FBRXZCO0lBUUU7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUkscURBQXFCLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSx1Q0FBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksK0NBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0Qsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEUsdURBQXVEO1FBQ3ZELDBDQUEwQztRQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLENBQUMsT0FBTyxF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QUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzVDLGlDQUFpQztBQUNuQyxDQUFDLENBQUM7S0FDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDYixJQUFBLFlBQUcsRUFBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUN4QyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vLyBSZXByZXNlbnRzIGEgTm9kZSBhcHBsaWNhdGlvbiwgdGhhdCB1c2VzIHRoZSBBcHBBdXRoSlMgbGlicmFyeS5cblxuaW1wb3J0IHsgQXV0aG9yaXphdGlvblJlcXVlc3QgfSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvbk5vdGlmaWVyLCBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIgfSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3JlcXVlc3RfaGFuZGxlcic7XG5pbXBvcnQgeyBBdXRob3JpemF0aW9uUmVzcG9uc2UgfSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3Jlc3BvbnNlJztcbmltcG9ydCB7IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQgeyBOb2RlQ3J5cHRvIH0gZnJvbSAnLi4vbm9kZV9zdXBwb3J0JztcbmltcG9ydCB7IE5vZGVSZXF1ZXN0b3IgfSBmcm9tICcuLi9ub2RlX3N1cHBvcnQvbm9kZV9yZXF1ZXN0b3InO1xuaW1wb3J0IHsgTm9kZUJhc2VkSGFuZGxlciB9IGZyb20gJy4uL25vZGVfc3VwcG9ydC9ub2RlX3JlcXVlc3RfaGFuZGxlcic7XG5pbXBvcnQgeyBSZXZva2VUb2tlblJlcXVlc3QgfSBmcm9tICcuLi9yZXZva2VfdG9rZW5fcmVxdWVzdCc7XG5pbXBvcnQgeyBHUkFOVF9UWVBFX0FVVEhPUklaQVRJT05fQ09ERSwgR1JBTlRfVFlQRV9SRUZSRVNIX1RPS0VOLCBUb2tlblJlcXVlc3QgfSBmcm9tICcuLi90b2tlbl9yZXF1ZXN0JztcbmltcG9ydCB7IEJhc2VUb2tlblJlcXVlc3RIYW5kbGVyLCBUb2tlblJlcXVlc3RIYW5kbGVyIH0gZnJvbSAnLi4vdG9rZW5fcmVxdWVzdF9oYW5kbGVyJztcbmltcG9ydCB7IFN0cmluZ01hcCB9IGZyb20gJy4uL3R5cGVzJztcblxuY29uc3QgUE9SVCA9IDgwODA7XG5cbi8qIHRoZSBOb2RlLmpzIGJhc2VkIEhUVFAgY2xpZW50LiAqL1xuY29uc3QgcmVxdWVzdG9yID0gbmV3IE5vZGVSZXF1ZXN0b3IoKTtcblxuLyogYW4gZXhhbXBsZSBvcGVuIGlkIGNvbm5lY3QgcHJvdmlkZXIgKi9cbmNvbnN0IG9wZW5JZENvbm5lY3RVcmwgPSAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tJztcblxuLyogZXhhbXBsZSBjbGllbnQgY29uZmlndXJhdGlvbiAqL1xuY29uc3QgY2xpZW50SWQgPSAnNTExODI4NTcwOTg0LWRobnNocWNwZWdlZTY2aGducDc1NGR1cGU4c2JhczE4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJztcbmNvbnN0IGNsaWVudFNlY3JldCA9ICd5b3VyLWNsaWVudC1zZWNyZXQnO1xuY29uc3QgcmVkaXJlY3RVcmkgPSBgaHR0cDovL2xvY2FsaG9zdDoke1BPUlR9YDtcbmNvbnN0IHNjb3BlID0gJ29wZW5pZCc7XG5cbmV4cG9ydCBjbGFzcyBBcHAge1xuICBwcml2YXRlIG5vdGlmaWVyOiBBdXRob3JpemF0aW9uTm90aWZpZXI7XG4gIHByaXZhdGUgYXV0aG9yaXphdGlvbkhhbmRsZXI6IEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlcjtcbiAgcHJpdmF0ZSB0b2tlbkhhbmRsZXI6IFRva2VuUmVxdWVzdEhhbmRsZXI7XG5cbiAgLy8gc3RhdGVcbiAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLm5vdGlmaWVyID0gbmV3IEF1dGhvcml6YXRpb25Ob3RpZmllcigpO1xuICAgIHRoaXMuYXV0aG9yaXphdGlvbkhhbmRsZXIgPSBuZXcgTm9kZUJhc2VkSGFuZGxlcihQT1JUKTtcbiAgICB0aGlzLnRva2VuSGFuZGxlciA9IG5ldyBCYXNlVG9rZW5SZXF1ZXN0SGFuZGxlcihyZXF1ZXN0b3IpO1xuICAgIC8vIHNldCBub3RpZmllciB0byBkZWxpdmVyIHJlc3BvbnNlc1xuICAgIHRoaXMuYXV0aG9yaXphdGlvbkhhbmRsZXIuc2V0QXV0aG9yaXphdGlvbk5vdGlmaWVyKHRoaXMubm90aWZpZXIpO1xuICAgIC8vIHNldCBhIGxpc3RlbmVyIHRvIGxpc3RlbiBmb3IgYXV0aG9yaXphdGlvbiByZXNwb25zZXNcbiAgICAvLyBtYWtlIHJlZnJlc2ggYW5kIGFjY2VzcyB0b2tlbiByZXF1ZXN0cy5cbiAgICB0aGlzLm5vdGlmaWVyLnNldEF1dGhvcml6YXRpb25MaXN0ZW5lcigocmVxdWVzdCwgcmVzcG9uc2UsIGVycm9yKSA9PiB7XG4gICAgICBsb2coJ0F1dGhvcml6YXRpb24gcmVxdWVzdCBjb21wbGV0ZSAnLCByZXF1ZXN0LCByZXNwb25zZSwgZXJyb3IpO1xuICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMubWFrZVJlZnJlc2hUb2tlblJlcXVlc3QodGhpcy5jb25maWd1cmF0aW9uISwgcmVxdWVzdCwgcmVzcG9uc2UpXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gdGhpcy5tYWtlQWNjZXNzVG9rZW5SZXF1ZXN0KHRoaXMuY29uZmlndXJhdGlvbiEsIHJlc3VsdC5yZWZyZXNoVG9rZW4hKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IGxvZygnQWxsIGRvbmUuJykpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZmV0Y2hTZXJ2aWNlQ29uZmlndXJhdGlvbigpOiBQcm9taXNlPEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbj4ge1xuICAgIHJldHVybiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24uZmV0Y2hGcm9tSXNzdWVyKG9wZW5JZENvbm5lY3RVcmwsIHJlcXVlc3RvcilcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgIGxvZygnRmV0Y2hlZCBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24nLCByZXNwb25zZSk7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIG1ha2VBdXRob3JpemF0aW9uUmVxdWVzdChjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24pIHtcbiAgICAvLyBjcmVhdGUgYSByZXF1ZXN0XG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3Qoe1xuICAgICAgY2xpZW50X2lkOiBjbGllbnRJZCxcbiAgICAgIHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmksXG4gICAgICBzY29wZTogc2NvcGUsXG4gICAgICByZXNwb25zZV90eXBlOiBBdXRob3JpemF0aW9uUmVxdWVzdC5SRVNQT05TRV9UWVBFX0NPREUsXG4gICAgICBzdGF0ZTogdW5kZWZpbmVkLFxuICAgICAgZXh0cmFzOiB7J3Byb21wdCc6ICdjb25zZW50JywgJ2FjY2Vzc190eXBlJzogJ29mZmxpbmUnfVxuICAgIH0sIG5ldyBOb2RlQ3J5cHRvKCkpO1xuXG4gICAgbG9nKCdNYWtpbmcgYXV0aG9yaXphdGlvbiByZXF1ZXN0ICcsIGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpO1xuICAgIHRoaXMuYXV0aG9yaXphdGlvbkhhbmRsZXIucGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpO1xuICB9XG5cbiAgbWFrZVJlZnJlc2hUb2tlblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlOiBBdXRob3JpemF0aW9uUmVzcG9uc2UpIHtcbiAgICBcbiAgICBsZXQgZXh0cmFzOiBTdHJpbmdNYXB8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICBleHRyYXMgPSB7fTtcbiAgICAgIGV4dHJhc1snY2xpZW50X3NlY3JldCddID0gY2xpZW50U2VjcmV0O1xuICAgICAgaWYgKHJlcXVlc3QuaW50ZXJuYWwpIHtcbiAgICAgICAgZXh0cmFzWydjb2RlX3ZlcmlmaWVyJ10gPSByZXF1ZXN0LmludGVybmFsWydjb2RlX3ZlcmlmaWVyJ107XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHRva2VuUmVxdWVzdCA9IG5ldyBUb2tlblJlcXVlc3Qoe1xuICAgICAgY2xpZW50X2lkOiBjbGllbnRJZCxcbiAgICAgIHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmksXG4gICAgICBncmFudF90eXBlOiBHUkFOVF9UWVBFX0FVVEhPUklaQVRJT05fQ09ERSxcbiAgICAgIGNvZGU6IHJlc3BvbnNlLmNvZGUsXG4gICAgICByZWZyZXNoX3Rva2VuOiB1bmRlZmluZWQsXG4gICAgICBleHRyYXM6IGV4dHJhc1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXMudG9rZW5IYW5kbGVyLnBlcmZvcm1Ub2tlblJlcXVlc3QoY29uZmlndXJhdGlvbiwgdG9rZW5SZXF1ZXN0KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGxvZyhgUmVmcmVzaCBUb2tlbiBpcyAke3Jlc3BvbnNlLnJlZnJlc2hUb2tlbn1gKTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9KTtcbiAgfVxuXG4gIG1ha2VBY2Nlc3NUb2tlblJlcXVlc3QoY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCByZWZyZXNoVG9rZW46IHN0cmluZykge1xuICAgIGxldCBleHRyYXM6IFN0cmluZ01hcCA9IHt9O1xuICAgIGV4dHJhc1snY2xpZW50X3NlY3JldCddID0gY2xpZW50U2VjcmV0O1xuXG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgVG9rZW5SZXF1ZXN0KHtcbiAgICAgIGNsaWVudF9pZDogY2xpZW50SWQsXG4gICAgICByZWRpcmVjdF91cmk6IHJlZGlyZWN0VXJpLFxuICAgICAgZ3JhbnRfdHlwZTogR1JBTlRfVFlQRV9SRUZSRVNIX1RPS0VOLFxuICAgICAgY29kZTogdW5kZWZpbmVkLFxuICAgICAgcmVmcmVzaF90b2tlbjogcmVmcmVzaFRva2VuLFxuICAgICAgZXh0cmFzOiBleHRyYXNcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLnRva2VuSGFuZGxlci5wZXJmb3JtVG9rZW5SZXF1ZXN0KGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgbG9nKGBBY2Nlc3MgVG9rZW4gaXMgJHtyZXNwb25zZS5hY2Nlc3NUb2tlbn0sIElkIFRva2VuIGlzICR7cmVzcG9uc2UuaWRUb2tlbn1gKTtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9KTtcbiAgfVxuXG4gIG1ha2VSZXZva2VUb2tlblJlcXVlc3QoY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCByZWZyZXNoVG9rZW46IHN0cmluZykge1xuICAgIGxldCByZXF1ZXN0ID0gbmV3IFJldm9rZVRva2VuUmVxdWVzdCh7dG9rZW46IHJlZnJlc2hUb2tlbn0pO1xuXG4gICAgcmV0dXJuIHRoaXMudG9rZW5IYW5kbGVyLnBlcmZvcm1SZXZva2VUb2tlblJlcXVlc3QoY29uZmlndXJhdGlvbiwgcmVxdWVzdCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBsb2coJ3Jldm9rZWQgcmVmcmVzaFRva2VuJyk7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfSk7XG4gIH1cbn1cblxubG9nKCdBcHBsaWNhdGlvbiBpcyByZWFkeS4nKTtcbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcblxuYXBwLmZldGNoU2VydmljZUNvbmZpZ3VyYXRpb24oKVxuICAgIC50aGVuKGNvbmZpZ3VyYXRpb24gPT4ge1xuICAgICAgYXBwLmNvbmZpZ3VyYXRpb24gPSBjb25maWd1cmF0aW9uO1xuICAgICAgYXBwLm1ha2VBdXRob3JpemF0aW9uUmVxdWVzdChjb25maWd1cmF0aW9uKTtcbiAgICAgIC8vIG5vdGlmaWVyIG1ha2VzIHRva2VuIHJlcXVlc3RzLlxuICAgIH0pXG4gICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGxvZygnU29tZXRoaW5nIGJhZCBoYXBwZW5lZCAnLCBlcnJvcik7XG4gICAgfSk7XG4iXX0=