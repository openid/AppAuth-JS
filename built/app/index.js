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
// Represents the test web app that uses the AppAuthJS library.
var authorization_request_1 = require("../authorization_request");
var authorization_request_handler_1 = require("../authorization_request_handler");
var authorization_service_configuration_1 = require("../authorization_service_configuration");
var logger_1 = require("../logger");
var redirect_based_handler_1 = require("../redirect_based_handler");
var token_request_1 = require("../token_request");
var token_request_handler_1 = require("../token_request_handler");
/* an example open id connect provider */
var openIdConnectUrl = 'https://accounts.google.com';
/* example client configuration */
var clientId = '511828570984-7nmej36h9j2tebiqmpqh835naet4vci4.apps.googleusercontent.com';
var redirectUri = 'http://localhost:8000/app/redirect.html';
var scope = 'openid';
/**
 * The Test application.
 */
var App = (function () {
    function App(snackbar) {
        var _this = this;
        this.snackbar = snackbar;
        this.notifier = new authorization_request_handler_1.AuthorizationNotifier();
        this.authorizationHandler = new redirect_based_handler_1.RedirectRequestHandler();
        this.tokenHandler = new token_request_handler_1.BaseTokenRequestHandler();
        // set notifier to deliver responses
        this.authorizationHandler.setAuthorizationNotifier(this.notifier);
        // set a listener to listen for authorization responses
        this.notifier.setAuthorizationListener(function (request, response, error) {
            logger_1.log('Authorization request complete ', request, response, error);
            if (response) {
                _this.code = response.code;
                _this.showMessage("Authorization Code " + response.code);
            }
        });
    }
    App.prototype.showMessage = function (message) {
        var snackbar = this.snackbar['MaterialSnackbar'];
        snackbar.showSnackbar({ message: message });
    };
    App.prototype.fetchServiceConfiguration = function () {
        var _this = this;
        authorization_service_configuration_1.AuthorizationServiceConfiguration.fetchFromIssuer(openIdConnectUrl)
            .then(function (response) {
            logger_1.log('Fetched service configuration', response);
            _this.configuration = response;
            _this.showMessage('Completed fetching configuration');
        })
            .catch(function (error) {
            logger_1.log('Something bad happened', error);
            _this.showMessage("Something bad happened " + error);
        });
    };
    App.prototype.makeAuthorizationRequest = function () {
        // create a request
        var request = new authorization_request_1.AuthorizationRequest(clientId, redirectUri, scope, authorization_request_1.AuthorizationRequest.RESPONSE_TYPE_CODE, undefined, /* state */ { 'prompt': 'consent', 'access_type': 'offline' });
        if (this.configuration) {
            this.authorizationHandler.performAuthorizationRequest(this.configuration, request);
        }
        else {
            this.showMessage('Fetch Authorization Service configuration, before you make the authorization request.');
        }
    };
    App.prototype.makeTokenRequest = function () {
        var _this = this;
        if (!this.configuration) {
            this.showMessage('Please fetch service configuration.');
            return;
        }
        var request = null;
        if (this.code) {
            // use the code to make the token request.
            request = new token_request_1.TokenRequest(clientId, redirectUri, token_request_1.GRANT_TYPE_AUTHORIZATION_CODE, this.code, undefined);
        }
        else if (this.tokenResponse) {
            // use the token response to make a request for an access token
            request = new token_request_1.TokenRequest(clientId, redirectUri, token_request_1.GRANT_TYPE_REFRESH_TOKEN, undefined, this.tokenResponse.refreshToken);
        }
        if (request) {
            this.tokenHandler.performTokenRequest(this.configuration, request)
                .then(function (response) {
                var isFirstRequest = false;
                if (_this.tokenResponse) {
                    // copy over new fields
                    _this.tokenResponse.accessToken = response.accessToken;
                    _this.tokenResponse.issuedAt = response.issuedAt;
                    _this.tokenResponse.expiresIn = response.expiresIn;
                    _this.tokenResponse.tokenType = response.tokenType;
                    _this.tokenResponse.scope = response.scope;
                }
                else {
                    isFirstRequest = true;
                    _this.tokenResponse = response;
                }
                // unset code, so we can do refresh token exchanges subsequently
                _this.code = undefined;
                if (isFirstRequest) {
                    _this.showMessage("Obtained a refresh token " + response.refreshToken);
                }
                else {
                    _this.showMessage("Obtained an access token " + response.accessToken + ".");
                }
            })
                .catch(function (error) {
                logger_1.log('Something bad happened', error);
                _this.showMessage("Something bad happened " + error);
            });
        }
    };
    App.prototype.checkForAuthorizationResponse = function () {
        this.authorizationHandler.completeAuthorizationRequestIfPossible();
    };
    return App;
}());
exports.App = App;
// export App
window['App'] = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsK0RBQStEO0FBRS9ELGtFQUE4RDtBQUM5RCxrRkFBMkg7QUFFM0gsOEZBQXlGO0FBQ3pGLG9DQUE4QjtBQUM5QixvRUFBaUU7QUFDakUsa0RBQXVHO0FBQ3ZHLGtFQUFzRjtBQW1CdEYseUNBQXlDO0FBQ3pDLElBQU0sZ0JBQWdCLEdBQUcsNkJBQTZCLENBQUM7QUFFdkQsa0NBQWtDO0FBQ2xDLElBQU0sUUFBUSxHQUFHLDBFQUEwRSxDQUFDO0FBQzVGLElBQU0sV0FBVyxHQUFHLHlDQUF5QyxDQUFDO0FBQzlELElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQztBQUV2Qjs7R0FFRztBQUNIO0lBVUUsYUFBbUIsUUFBaUI7UUFBcEMsaUJBY0M7UUFka0IsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUkscURBQXFCLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSwrQ0FBc0IsRUFBRSxDQUFDO1FBQ3pELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSwrQ0FBdUIsRUFBRSxDQUFDO1FBQ2xELG9DQUFvQztRQUNwQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xFLHVEQUF1RDtRQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLFVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLO1lBQzlELFlBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsS0FBSSxDQUFDLElBQUksR0FBRyxR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QTdCO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixDQUFDLHNDQUFzQyxFQUFFLENBQUM7SUFDckUsQ0FBQztJQUNILFVBQUM7QUFBRCxDQUFDLEFBbkhELElBbUhDO0FBbkhZLGtCQUFHO0FBcUhoQixhQUFhO0FBQ1osTUFBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vLyBSZXByZXNlbnRzIHRoZSB0ZXN0IHdlYiBhcHAgdGhhdCB1c2VzIHRoZSBBcHBBdXRoSlMgbGlicmFyeS5cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdH0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0JztcbmltcG9ydCB7QXV0aG9yaXphdGlvbkxpc3RlbmVyLCBBdXRob3JpemF0aW9uTm90aWZpZXIsIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVzcG9uc2V9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVzcG9uc2UnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb259IGZyb20gJy4uL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7bG9nfSBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IHtSZWRpcmVjdFJlcXVlc3RIYW5kbGVyfSBmcm9tICcuLi9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyJztcbmltcG9ydCB7R1JBTlRfVFlQRV9BVVRIT1JJWkFUSU9OX0NPREUsIEdSQU5UX1RZUEVfUkVGUkVTSF9UT0tFTiwgVG9rZW5SZXF1ZXN0fSBmcm9tICcuLi90b2tlbl9yZXF1ZXN0JztcbmltcG9ydCB7QmFzZVRva2VuUmVxdWVzdEhhbmRsZXIsIFRva2VuUmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3Rva2VuX3JlcXVlc3RfaGFuZGxlcic7XG5pbXBvcnQge1Rva2VuRXJyb3IsIFRva2VuUmVzcG9uc2V9IGZyb20gJy4uL3Rva2VuX3Jlc3BvbnNlJztcblxuXG4vKiBTb21lIGludGVyZmFjZSBkZWNsYXJhdGlvbnMgZm9yIE1hdGVyaWFsIGRlc2lnbiBsaXRlLiAqL1xuXG4vKipcbiAqIFNuYWNrYmFyIG9wdGlvbnMuXG4gKi9cbmRlY2xhcmUgaW50ZXJmYWNlIFNuYWNrQmFyT3B0aW9ucyB7XG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgdGltZW91dD86IG51bWJlcjtcbn1cblxuLyoqXG4gKiBJbnRlcmZhY2UgdGhhdCBkZWZpbmVzIHRoZSBNREwgTWF0ZXJpYWwgU25hY2sgQmFyIEFQSS5cbiAqL1xuZGVjbGFyZSBpbnRlcmZhY2UgTWF0ZXJpYWxTbmFja0JhciB7IHNob3dTbmFja2JhcjogKG9wdGlvbnM6IFNuYWNrQmFyT3B0aW9ucykgPT4gdm9pZDsgfVxuXG4vKiBhbiBleGFtcGxlIG9wZW4gaWQgY29ubmVjdCBwcm92aWRlciAqL1xuY29uc3Qgb3BlbklkQ29ubmVjdFVybCA9ICdodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20nO1xuXG4vKiBleGFtcGxlIGNsaWVudCBjb25maWd1cmF0aW9uICovXG5jb25zdCBjbGllbnRJZCA9ICc1MTE4Mjg1NzA5ODQtN25tZWozNmg5ajJ0ZWJpcW1wcWg4MzVuYWV0NHZjaTQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20nO1xuY29uc3QgcmVkaXJlY3RVcmkgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDAwL2FwcC9yZWRpcmVjdC5odG1sJztcbmNvbnN0IHNjb3BlID0gJ29wZW5pZCc7XG5cbi8qKlxuICogVGhlIFRlc3QgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHAge1xuICBwcml2YXRlIG5vdGlmaWVyOiBBdXRob3JpemF0aW9uTm90aWZpZXI7XG4gIHByaXZhdGUgYXV0aG9yaXphdGlvbkhhbmRsZXI6IEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlcjtcbiAgcHJpdmF0ZSB0b2tlbkhhbmRsZXI6IFRva2VuUmVxdWVzdEhhbmRsZXI7XG5cbiAgLy8gc3RhdGVcbiAgcHJpdmF0ZSBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb258dW5kZWZpbmVkO1xuICBwcml2YXRlIGNvZGU6IHN0cmluZ3x1bmRlZmluZWQ7XG4gIHByaXZhdGUgdG9rZW5SZXNwb25zZTogVG9rZW5SZXNwb25zZXx1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHNuYWNrYmFyOiBFbGVtZW50KSB7XG4gICAgdGhpcy5ub3RpZmllciA9IG5ldyBBdXRob3JpemF0aW9uTm90aWZpZXIoKTtcbiAgICB0aGlzLmF1dGhvcml6YXRpb25IYW5kbGVyID0gbmV3IFJlZGlyZWN0UmVxdWVzdEhhbmRsZXIoKTtcbiAgICB0aGlzLnRva2VuSGFuZGxlciA9IG5ldyBCYXNlVG9rZW5SZXF1ZXN0SGFuZGxlcigpO1xuICAgIC8vIHNldCBub3RpZmllciB0byBkZWxpdmVyIHJlc3BvbnNlc1xuICAgIHRoaXMuYXV0aG9yaXphdGlvbkhhbmRsZXIuc2V0QXV0aG9yaXphdGlvbk5vdGlmaWVyKHRoaXMubm90aWZpZXIpO1xuICAgIC8vIHNldCBhIGxpc3RlbmVyIHRvIGxpc3RlbiBmb3IgYXV0aG9yaXphdGlvbiByZXNwb25zZXNcbiAgICB0aGlzLm5vdGlmaWVyLnNldEF1dGhvcml6YXRpb25MaXN0ZW5lcigocmVxdWVzdCwgcmVzcG9uc2UsIGVycm9yKSA9PiB7XG4gICAgICBsb2coJ0F1dGhvcml6YXRpb24gcmVxdWVzdCBjb21wbGV0ZSAnLCByZXF1ZXN0LCByZXNwb25zZSwgZXJyb3IpO1xuICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgIHRoaXMuY29kZSA9IHJlc3BvbnNlLmNvZGU7XG4gICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoYEF1dGhvcml6YXRpb24gQ29kZSAke3Jlc3BvbnNlLmNvZGV9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzaG93TWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzbmFja2JhciA9ICh0aGlzLnNuYWNrYmFyIGFzIGFueSlbJ01hdGVyaWFsU25hY2tiYXInXSBhcyBNYXRlcmlhbFNuYWNrQmFyO1xuICAgIHNuYWNrYmFyLnNob3dTbmFja2Jhcih7bWVzc2FnZTogbWVzc2FnZX0pO1xuICB9XG5cbiAgZmV0Y2hTZXJ2aWNlQ29uZmlndXJhdGlvbigpIHtcbiAgICBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24uZmV0Y2hGcm9tSXNzdWVyKG9wZW5JZENvbm5lY3RVcmwpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBsb2coJ0ZldGNoZWQgc2VydmljZSBjb25maWd1cmF0aW9uJywgcmVzcG9uc2UpO1xuICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IHJlc3BvbnNlO1xuICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoJ0NvbXBsZXRlZCBmZXRjaGluZyBjb25maWd1cmF0aW9uJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbG9nKCdTb21ldGhpbmcgYmFkIGhhcHBlbmVkJywgZXJyb3IpO1xuICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoYFNvbWV0aGluZyBiYWQgaGFwcGVuZWQgJHtlcnJvcn1gKVxuICAgICAgICB9KTtcbiAgfVxuXG4gIG1ha2VBdXRob3JpemF0aW9uUmVxdWVzdCgpIHtcbiAgICAvLyBjcmVhdGUgYSByZXF1ZXN0XG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QoXG4gICAgICAgIGNsaWVudElkLFxuICAgICAgICByZWRpcmVjdFVyaSxcbiAgICAgICAgc2NvcGUsXG4gICAgICAgIEF1dGhvcml6YXRpb25SZXF1ZXN0LlJFU1BPTlNFX1RZUEVfQ09ERSxcbiAgICAgICAgdW5kZWZpbmVkLCAvKiBzdGF0ZSAqL1xuICAgICAgICB7J3Byb21wdCc6ICdjb25zZW50JywgJ2FjY2Vzc190eXBlJzogJ29mZmxpbmUnfSk7XG5cbiAgICBpZiAodGhpcy5jb25maWd1cmF0aW9uKSB7XG4gICAgICB0aGlzLmF1dGhvcml6YXRpb25IYW5kbGVyLnBlcmZvcm1BdXRob3JpemF0aW9uUmVxdWVzdCh0aGlzLmNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3dNZXNzYWdlKFxuICAgICAgICAgICdGZXRjaCBBdXRob3JpemF0aW9uIFNlcnZpY2UgY29uZmlndXJhdGlvbiwgYmVmb3JlIHlvdSBtYWtlIHRoZSBhdXRob3JpemF0aW9uIHJlcXVlc3QuJyk7XG4gICAgfVxuICB9XG5cbiAgbWFrZVRva2VuUmVxdWVzdCgpIHtcbiAgICBpZiAoIXRoaXMuY29uZmlndXJhdGlvbikge1xuICAgICAgdGhpcy5zaG93TWVzc2FnZSgnUGxlYXNlIGZldGNoIHNlcnZpY2UgY29uZmlndXJhdGlvbi4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgcmVxdWVzdDogVG9rZW5SZXF1ZXN0fG51bGwgPSBudWxsO1xuICAgIGlmICh0aGlzLmNvZGUpIHtcbiAgICAgIC8vIHVzZSB0aGUgY29kZSB0byBtYWtlIHRoZSB0b2tlbiByZXF1ZXN0LlxuICAgICAgcmVxdWVzdCA9IG5ldyBUb2tlblJlcXVlc3QoXG4gICAgICAgICAgY2xpZW50SWQsIHJlZGlyZWN0VXJpLCBHUkFOVF9UWVBFX0FVVEhPUklaQVRJT05fQ09ERSwgdGhpcy5jb2RlLCB1bmRlZmluZWQpO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b2tlblJlc3BvbnNlKSB7XG4gICAgICAvLyB1c2UgdGhlIHRva2VuIHJlc3BvbnNlIHRvIG1ha2UgYSByZXF1ZXN0IGZvciBhbiBhY2Nlc3MgdG9rZW5cbiAgICAgIHJlcXVlc3QgPSBuZXcgVG9rZW5SZXF1ZXN0KFxuICAgICAgICAgIGNsaWVudElkLCByZWRpcmVjdFVyaSwgR1JBTlRfVFlQRV9SRUZSRVNIX1RPS0VOLCB1bmRlZmluZWQsXG4gICAgICAgICAgdGhpcy50b2tlblJlc3BvbnNlLnJlZnJlc2hUb2tlbik7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3QpIHtcbiAgICAgIHRoaXMudG9rZW5IYW5kbGVyLnBlcmZvcm1Ub2tlblJlcXVlc3QodGhpcy5jb25maWd1cmF0aW9uLCByZXF1ZXN0KVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGxldCBpc0ZpcnN0UmVxdWVzdCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMudG9rZW5SZXNwb25zZSkge1xuICAgICAgICAgICAgICAvLyBjb3B5IG92ZXIgbmV3IGZpZWxkc1xuICAgICAgICAgICAgICB0aGlzLnRva2VuUmVzcG9uc2UuYWNjZXNzVG9rZW4gPSByZXNwb25zZS5hY2Nlc3NUb2tlbjtcbiAgICAgICAgICAgICAgdGhpcy50b2tlblJlc3BvbnNlLmlzc3VlZEF0ID0gcmVzcG9uc2UuaXNzdWVkQXQ7XG4gICAgICAgICAgICAgIHRoaXMudG9rZW5SZXNwb25zZS5leHBpcmVzSW4gPSByZXNwb25zZS5leHBpcmVzSW47XG4gICAgICAgICAgICAgIHRoaXMudG9rZW5SZXNwb25zZS50b2tlblR5cGUgPSByZXNwb25zZS50b2tlblR5cGU7XG4gICAgICAgICAgICAgIHRoaXMudG9rZW5SZXNwb25zZS5zY29wZSA9IHJlc3BvbnNlLnNjb3BlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaXNGaXJzdFJlcXVlc3QgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLnRva2VuUmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdW5zZXQgY29kZSwgc28gd2UgY2FuIGRvIHJlZnJlc2ggdG9rZW4gZXhjaGFuZ2VzIHN1YnNlcXVlbnRseVxuICAgICAgICAgICAgdGhpcy5jb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGlzRmlyc3RSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoYE9idGFpbmVkIGEgcmVmcmVzaCB0b2tlbiAke3Jlc3BvbnNlLnJlZnJlc2hUb2tlbn1gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoYE9idGFpbmVkIGFuIGFjY2VzcyB0b2tlbiAke3Jlc3BvbnNlLmFjY2Vzc1Rva2VufS5gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGxvZygnU29tZXRoaW5nIGJhZCBoYXBwZW5lZCcsIGVycm9yKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoYFNvbWV0aGluZyBiYWQgaGFwcGVuZWQgJHtlcnJvcn1gKVxuICAgICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrRm9yQXV0aG9yaXphdGlvblJlc3BvbnNlKCkge1xuICAgIHRoaXMuYXV0aG9yaXphdGlvbkhhbmRsZXIuY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdElmUG9zc2libGUoKTtcbiAgfVxufVxuXG4vLyBleHBvcnQgQXBwXG4od2luZG93IGFzIGFueSlbJ0FwcCddID0gQXBwO1xuIl19