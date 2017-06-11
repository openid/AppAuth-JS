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
var clientId = '511828570984-dhnshqcpegee66hgnp754dupe8sbas18.apps.googleusercontent.com';
var redirectUri = 'http://localhost:8000/app/redirect.html';
var scope = 'openid';
// TODO(rahulrav@): Figure out a way to get rid of this
var clientSecret = 'TyBOnDZtguEfaKDHAaZjRP7i';
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
            request = new token_request_1.TokenRequest(clientId, redirectUri, token_request_1.GRANT_TYPE_AUTHORIZATION_CODE, this.code, undefined, { 'client_secret': clientSecret });
        }
        else if (this.tokenResponse) {
            // use the token response to make a request for an access token
            request = new token_request_1.TokenRequest(clientId, redirectUri, token_request_1.GRANT_TYPE_REFRESH_TOKEN, undefined, this.tokenResponse.refreshToken, { 'client_secret': clientSecret });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsK0RBQStEO0FBRS9ELGtFQUE4RDtBQUM5RCxrRkFBMkg7QUFFM0gsOEZBQXlGO0FBQ3pGLG9DQUE4QjtBQUM5QixvRUFBaUU7QUFDakUsa0RBQXVHO0FBQ3ZHLGtFQUFzRjtBQW1CdEYseUNBQXlDO0FBQ3pDLElBQU0sZ0JBQWdCLEdBQUcsNkJBQTZCLENBQUM7QUFFdkQsa0NBQWtDO0FBQ2xDLElBQU0sUUFBUSxHQUFHLDBFQUEwRSxDQUFDO0FBQzVGLElBQU0sV0FBVyxHQUFHLHlDQUF5QyxDQUFDO0FBQzlELElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQztBQUN2Qix1REFBdUQ7QUFDdkQsSUFBTSxZQUFZLEdBQUcsMEJBQTBCLENBQUM7QUFFaEQ7O0dBRUc7QUFDSDtJQVVFLGFBQW1CLFFBQWlCO1FBQXBDLGlCQWNDO1FBZGtCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHFEQUFxQixFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksK0NBQXNCLEVBQUUsQ0FBQztRQUN6RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksK0NBQXVCLEVBQUUsQ0FBQztRQUNsRCxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRSx1REFBdUQ7UUFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxVQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSztZQUM5RCxZQUFHLENBQUMsaUNBQWlDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRSxFQUFFLENBQUMsQ0FBQyxR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QUM7Z0JBQ3JDLEtBQUksQ0FBQyxXQUFXLENBQUMsNEJBQTBCLEtBQU8sQ0FBQyxDQUFBO1lBQ3JELENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQztJQUNILENBQUM7SUFFRCwyQ0FBNkIsR0FBN0I7UUFDRSxJQUFJLENBQUMsb0JBQW9CLENBQUMsc0NBQXNDLEVBQUUsQ0FBQztJQUNyRSxDQUFDO0lBQ0gsVUFBQztBQUFELENBQUMsQUFwSEQsSUFvSEM7QUFwSFksa0JBQUc7QUFzSGhCLGFBQWE7QUFDWixNQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8vIFJlcHJlc2VudHMgdGhlIHRlc3Qgd2ViIGFwcCB0aGF0IHVzZXMgdGhlIEFwcEF1dGhKUyBsaWJyYXJ5LlxuXG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXF1ZXN0fSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uTGlzdGVuZXIsIEF1dGhvcml6YXRpb25Ob3RpZmllciwgQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyfSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3JlcXVlc3RfaGFuZGxlcic7XG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXNwb25zZX0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXNwb25zZSc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQge1JlZGlyZWN0UmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3JlZGlyZWN0X2Jhc2VkX2hhbmRsZXInO1xuaW1wb3J0IHtHUkFOVF9UWVBFX0FVVEhPUklaQVRJT05fQ09ERSwgR1JBTlRfVFlQRV9SRUZSRVNIX1RPS0VOLCBUb2tlblJlcXVlc3R9IGZyb20gJy4uL3Rva2VuX3JlcXVlc3QnO1xuaW1wb3J0IHtCYXNlVG9rZW5SZXF1ZXN0SGFuZGxlciwgVG9rZW5SZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vdG9rZW5fcmVxdWVzdF9oYW5kbGVyJztcbmltcG9ydCB7VG9rZW5FcnJvciwgVG9rZW5SZXNwb25zZX0gZnJvbSAnLi4vdG9rZW5fcmVzcG9uc2UnO1xuXG5cbi8qIFNvbWUgaW50ZXJmYWNlIGRlY2xhcmF0aW9ucyBmb3IgTWF0ZXJpYWwgZGVzaWduIGxpdGUuICovXG5cbi8qKlxuICogU25hY2tiYXIgb3B0aW9ucy5cbiAqL1xuZGVjbGFyZSBpbnRlcmZhY2UgU25hY2tCYXJPcHRpb25zIHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICB0aW1lb3V0PzogbnVtYmVyO1xufVxuXG4vKipcbiAqIEludGVyZmFjZSB0aGF0IGRlZmluZXMgdGhlIE1ETCBNYXRlcmlhbCBTbmFjayBCYXIgQVBJLlxuICovXG5kZWNsYXJlIGludGVyZmFjZSBNYXRlcmlhbFNuYWNrQmFyIHsgc2hvd1NuYWNrYmFyOiAob3B0aW9uczogU25hY2tCYXJPcHRpb25zKSA9PiB2b2lkOyB9XG5cbi8qIGFuIGV4YW1wbGUgb3BlbiBpZCBjb25uZWN0IHByb3ZpZGVyICovXG5jb25zdCBvcGVuSWRDb25uZWN0VXJsID0gJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSc7XG5cbi8qIGV4YW1wbGUgY2xpZW50IGNvbmZpZ3VyYXRpb24gKi9cbmNvbnN0IGNsaWVudElkID0gJzUxMTgyODU3MDk4NC1kaG5zaHFjcGVnZWU2NmhnbnA3NTRkdXBlOHNiYXMxOC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSc7XG5jb25zdCByZWRpcmVjdFVyaSA9ICdodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBwL3JlZGlyZWN0Lmh0bWwnO1xuY29uc3Qgc2NvcGUgPSAnb3BlbmlkJztcbi8vIFRPRE8ocmFodWxyYXZAKTogRmlndXJlIG91dCBhIHdheSB0byBnZXQgcmlkIG9mIHRoaXNcbmNvbnN0IGNsaWVudFNlY3JldCA9ICdUeUJPbkRadGd1RWZhS0RIQWFaalJQN2knO1xuXG4vKipcbiAqIFRoZSBUZXN0IGFwcGxpY2F0aW9uLlxuICovXG5leHBvcnQgY2xhc3MgQXBwIHtcbiAgcHJpdmF0ZSBub3RpZmllcjogQXV0aG9yaXphdGlvbk5vdGlmaWVyO1xuICBwcml2YXRlIGF1dGhvcml6YXRpb25IYW5kbGVyOiBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXI7XG4gIHByaXZhdGUgdG9rZW5IYW5kbGVyOiBUb2tlblJlcXVlc3RIYW5kbGVyO1xuXG4gIC8vIHN0YXRlXG4gIHByaXZhdGUgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBjb2RlOiBzdHJpbmd8dW5kZWZpbmVkO1xuICBwcml2YXRlIHRva2VuUmVzcG9uc2U6IFRva2VuUmVzcG9uc2V8dW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzbmFja2JhcjogRWxlbWVudCkge1xuICAgIHRoaXMubm90aWZpZXIgPSBuZXcgQXV0aG9yaXphdGlvbk5vdGlmaWVyKCk7XG4gICAgdGhpcy5hdXRob3JpemF0aW9uSGFuZGxlciA9IG5ldyBSZWRpcmVjdFJlcXVlc3RIYW5kbGVyKCk7XG4gICAgdGhpcy50b2tlbkhhbmRsZXIgPSBuZXcgQmFzZVRva2VuUmVxdWVzdEhhbmRsZXIoKTtcbiAgICAvLyBzZXQgbm90aWZpZXIgdG8gZGVsaXZlciByZXNwb25zZXNcbiAgICB0aGlzLmF1dGhvcml6YXRpb25IYW5kbGVyLnNldEF1dGhvcml6YXRpb25Ob3RpZmllcih0aGlzLm5vdGlmaWVyKTtcbiAgICAvLyBzZXQgYSBsaXN0ZW5lciB0byBsaXN0ZW4gZm9yIGF1dGhvcml6YXRpb24gcmVzcG9uc2VzXG4gICAgdGhpcy5ub3RpZmllci5zZXRBdXRob3JpemF0aW9uTGlzdGVuZXIoKHJlcXVlc3QsIHJlc3BvbnNlLCBlcnJvcikgPT4ge1xuICAgICAgbG9nKCdBdXRob3JpemF0aW9uIHJlcXVlc3QgY29tcGxldGUgJywgcmVxdWVzdCwgcmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICB0aGlzLmNvZGUgPSByZXNwb25zZS5jb2RlO1xuICAgICAgICB0aGlzLnNob3dNZXNzYWdlKGBBdXRob3JpemF0aW9uIENvZGUgJHtyZXNwb25zZS5jb2RlfWApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2hvd01lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc25hY2tiYXIgPSAodGhpcy5zbmFja2JhciBhcyBhbnkpWydNYXRlcmlhbFNuYWNrYmFyJ10gYXMgTWF0ZXJpYWxTbmFja0JhcjtcbiAgICBzbmFja2Jhci5zaG93U25hY2tiYXIoe21lc3NhZ2U6IG1lc3NhZ2V9KTtcbiAgfVxuXG4gIGZldGNoU2VydmljZUNvbmZpZ3VyYXRpb24oKSB7XG4gICAgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLmZldGNoRnJvbUlzc3VlcihvcGVuSWRDb25uZWN0VXJsKVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgbG9nKCdGZXRjaGVkIHNlcnZpY2UgY29uZmlndXJhdGlvbicsIHJlc3BvbnNlKTtcbiAgICAgICAgICB0aGlzLmNvbmZpZ3VyYXRpb24gPSByZXNwb25zZTtcbiAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlKCdDb21wbGV0ZWQgZmV0Y2hpbmcgY29uZmlndXJhdGlvbicpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgIGxvZygnU29tZXRoaW5nIGJhZCBoYXBwZW5lZCcsIGVycm9yKTtcbiAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlKGBTb21ldGhpbmcgYmFkIGhhcHBlbmVkICR7ZXJyb3J9YClcbiAgICAgICAgfSk7XG4gIH1cblxuICBtYWtlQXV0aG9yaXphdGlvblJlcXVlc3QoKSB7XG4gICAgLy8gY3JlYXRlIGEgcmVxdWVzdFxuICAgIGxldCByZXF1ZXN0ID0gbmV3IEF1dGhvcml6YXRpb25SZXF1ZXN0KFxuICAgICAgICBjbGllbnRJZCxcbiAgICAgICAgcmVkaXJlY3RVcmksXG4gICAgICAgIHNjb3BlLFxuICAgICAgICBBdXRob3JpemF0aW9uUmVxdWVzdC5SRVNQT05TRV9UWVBFX0NPREUsXG4gICAgICAgIHVuZGVmaW5lZCwgLyogc3RhdGUgKi9cbiAgICAgICAgeydwcm9tcHQnOiAnY29uc2VudCcsICdhY2Nlc3NfdHlwZSc6ICdvZmZsaW5lJ30pO1xuXG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbikge1xuICAgICAgdGhpcy5hdXRob3JpemF0aW9uSGFuZGxlci5wZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QodGhpcy5jb25maWd1cmF0aW9uLCByZXF1ZXN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93TWVzc2FnZShcbiAgICAgICAgICAnRmV0Y2ggQXV0aG9yaXphdGlvbiBTZXJ2aWNlIGNvbmZpZ3VyYXRpb24sIGJlZm9yZSB5b3UgbWFrZSB0aGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0LicpO1xuICAgIH1cbiAgfVxuXG4gIG1ha2VUb2tlblJlcXVlc3QoKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZ3VyYXRpb24pIHtcbiAgICAgIHRoaXMuc2hvd01lc3NhZ2UoJ1BsZWFzZSBmZXRjaCBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24uJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHJlcXVlc3Q6IFRva2VuUmVxdWVzdHxudWxsID0gbnVsbDtcbiAgICBpZiAodGhpcy5jb2RlKSB7XG4gICAgICAvLyB1c2UgdGhlIGNvZGUgdG8gbWFrZSB0aGUgdG9rZW4gcmVxdWVzdC5cbiAgICAgIHJlcXVlc3QgPSBuZXcgVG9rZW5SZXF1ZXN0KFxuICAgICAgICAgIGNsaWVudElkLCByZWRpcmVjdFVyaSwgR1JBTlRfVFlQRV9BVVRIT1JJWkFUSU9OX0NPREUsIHRoaXMuY29kZSwgdW5kZWZpbmVkLFxuICAgICAgICAgIHsnY2xpZW50X3NlY3JldCc6IGNsaWVudFNlY3JldH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b2tlblJlc3BvbnNlKSB7XG4gICAgICAvLyB1c2UgdGhlIHRva2VuIHJlc3BvbnNlIHRvIG1ha2UgYSByZXF1ZXN0IGZvciBhbiBhY2Nlc3MgdG9rZW5cbiAgICAgIHJlcXVlc3QgPSBuZXcgVG9rZW5SZXF1ZXN0KFxuICAgICAgICAgIGNsaWVudElkLCByZWRpcmVjdFVyaSwgR1JBTlRfVFlQRV9SRUZSRVNIX1RPS0VOLCB1bmRlZmluZWQsXG4gICAgICAgICAgdGhpcy50b2tlblJlc3BvbnNlLnJlZnJlc2hUb2tlbiwgeydjbGllbnRfc2VjcmV0JzogY2xpZW50U2VjcmV0fSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3QpIHtcbiAgICAgIHRoaXMudG9rZW5IYW5kbGVyLnBlcmZvcm1Ub2tlblJlcXVlc3QodGhpcy5jb25maWd1cmF0aW9uLCByZXF1ZXN0KVxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIGxldCBpc0ZpcnN0UmVxdWVzdCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMudG9rZW5SZXNwb25zZSkge1xuICAgICAgICAgICAgICAvLyBjb3B5IG92ZXIgbmV3IGZpZWxkc1xuICAgICAgICAgICAgICB0aGlzLnRva2VuUmVzcG9uc2UuYWNjZXNzVG9rZW4gPSByZXNwb25zZS5hY2Nlc3NUb2tlbjtcbiAgICAgICAgICAgICAgdGhpcy50b2tlblJlc3BvbnNlLmlzc3VlZEF0ID0gcmVzcG9uc2UuaXNzdWVkQXQ7XG4gICAgICAgICAgICAgIHRoaXMudG9rZW5SZXNwb25zZS5leHBpcmVzSW4gPSByZXNwb25zZS5leHBpcmVzSW47XG4gICAgICAgICAgICAgIHRoaXMudG9rZW5SZXNwb25zZS50b2tlblR5cGUgPSByZXNwb25zZS50b2tlblR5cGU7XG4gICAgICAgICAgICAgIHRoaXMudG9rZW5SZXNwb25zZS5zY29wZSA9IHJlc3BvbnNlLnNjb3BlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaXNGaXJzdFJlcXVlc3QgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLnRva2VuUmVzcG9uc2UgPSByZXNwb25zZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdW5zZXQgY29kZSwgc28gd2UgY2FuIGRvIHJlZnJlc2ggdG9rZW4gZXhjaGFuZ2VzIHN1YnNlcXVlbnRseVxuICAgICAgICAgICAgdGhpcy5jb2RlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKGlzRmlyc3RSZXF1ZXN0KSB7XG4gICAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoYE9idGFpbmVkIGEgcmVmcmVzaCB0b2tlbiAke3Jlc3BvbnNlLnJlZnJlc2hUb2tlbn1gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoYE9idGFpbmVkIGFuIGFjY2VzcyB0b2tlbiAke3Jlc3BvbnNlLmFjY2Vzc1Rva2VufS5gKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGxvZygnU29tZXRoaW5nIGJhZCBoYXBwZW5lZCcsIGVycm9yKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoYFNvbWV0aGluZyBiYWQgaGFwcGVuZWQgJHtlcnJvcn1gKVxuICAgICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGNoZWNrRm9yQXV0aG9yaXphdGlvblJlc3BvbnNlKCkge1xuICAgIHRoaXMuYXV0aG9yaXphdGlvbkhhbmRsZXIuY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdElmUG9zc2libGUoKTtcbiAgfVxufVxuXG4vLyBleHBvcnQgQXBwXG4od2luZG93IGFzIGFueSlbJ0FwcCddID0gQXBwO1xuIl19