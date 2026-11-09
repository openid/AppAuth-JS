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
// Represents the test web app that uses the AppAuthJS library.
const authorization_request_ts_1 = require("../src/authorization_request.js");
const authorization_request_handler_ts_1 = require("../src/authorization_request_handler.js");
const authorization_service_configuration_ts_1 = require("../src/authorization_service_configuration.js");
const logger_ts_1 = require("../src/logger.js");
const redirect_based_handler_ts_1 = require("../src/redirect_based_handler.js");
const token_request_ts_1 = require("../src/token_request.js");
const token_request_handler_ts_1 = require("../src/token_request_handler.js");
/* an example open id connect provider */
const openIdConnectUrl = 'https://accounts.google.com';
/* example client configuration */
const clientId = '511828570984-dhnshqcpegee66hgnp754dupe8sbas18.apps.googleusercontent.com';
const clientSecret = 'your-client-secret';
const redirectUri = 'http://localhost:8000/redirect.html';
const scope = 'openid';
/**
 * The Test application.
 */
class App {
    constructor(snackbar) {
        this.snackbar = snackbar;
        this.notifier = new authorization_request_handler_ts_1.AuthorizationNotifier();
        this.authorizationHandler = new redirect_based_handler_ts_1.RedirectRequestHandler();
        this.tokenHandler = new token_request_handler_ts_1.BaseTokenRequestHandler();
        // set notifier to deliver responses
        this.authorizationHandler.setAuthorizationNotifier(this.notifier);
        // set a listener to listen for authorization responses
        this.notifier.setAuthorizationListener((request, response, error) => {
            (0, logger_ts_1.log)('Authorization request complete ', request, response, error);
            if (response) {
                this.request = request;
                this.response = response;
                this.code = response.code;
                this.showMessage(`Authorization Code ${response.code}`);
            }
        });
    }
    showMessage(message) {
        const snackbar = this.snackbar['MaterialSnackbar'];
        snackbar.showSnackbar({ message: message });
    }
    fetchServiceConfiguration() {
        authorization_service_configuration_ts_1.AuthorizationServiceConfiguration.fetchFromIssuer(openIdConnectUrl)
            .then(response => {
            (0, logger_ts_1.log)('Fetched service configuration', response);
            this.configuration = response;
            this.showMessage('Completed fetching configuration');
        })
            .catch(error => {
            (0, logger_ts_1.log)('Something bad happened', error);
            this.showMessage(`Something bad happened ${error}`);
        });
    }
    makeAuthorizationRequest() {
        // create a request
        let request = new authorization_request_ts_1.AuthorizationRequest({
            client_id: clientId,
            redirect_uri: redirectUri,
            scope: scope,
            response_type: authorization_request_ts_1.AuthorizationRequest.RESPONSE_TYPE_CODE,
            state: undefined,
            extras: { 'prompt': 'consent', 'access_type': 'offline' }
        });
        if (this.configuration) {
            this.authorizationHandler.performAuthorizationRequest(this.configuration, request);
        }
        else {
            this.showMessage('Fetch Authorization Service configuration, before you make the authorization request.');
        }
    }
    makeTokenRequest() {
        if (!this.configuration) {
            this.showMessage('Please fetch service configuration.');
            return;
        }
        let request = null;
        if (this.code) {
            let extras = undefined;
            if (this.request && this.request.internal) {
                extras = {};
                extras['client_secret'] = clientSecret;
                extras['code_verifier'] = this.request.internal['code_verifier'];
            }
            // use the code to make the token request.
            request = new token_request_ts_1.TokenRequest({
                client_id: clientId,
                redirect_uri: redirectUri,
                grant_type: token_request_ts_1.GRANT_TYPE_AUTHORIZATION_CODE,
                code: this.code,
                refresh_token: undefined,
                extras: extras
            });
        }
        else if (this.tokenResponse) {
            // use the token response to make a request for an access token
            request = new token_request_ts_1.TokenRequest({
                client_id: clientId,
                redirect_uri: redirectUri,
                grant_type: token_request_ts_1.GRANT_TYPE_REFRESH_TOKEN,
                code: undefined,
                refresh_token: this.tokenResponse.refreshToken,
                extras: {
                    'client_secret': clientSecret
                }
            });
        }
        if (request) {
            this.tokenHandler.performTokenRequest(this.configuration, request)
                .then(response => {
                let isFirstRequest = false;
                if (this.tokenResponse) {
                    // copy over new fields
                    this.tokenResponse.accessToken = response.accessToken;
                    this.tokenResponse.issuedAt = response.issuedAt;
                    this.tokenResponse.expiresIn = response.expiresIn;
                    this.tokenResponse.tokenType = response.tokenType;
                    this.tokenResponse.scope = response.scope;
                }
                else {
                    isFirstRequest = true;
                    this.tokenResponse = response;
                }
                // unset code, so we can do refresh token exchanges subsequently
                this.code = undefined;
                if (isFirstRequest) {
                    this.showMessage(`Obtained a refresh token ${response.refreshToken}`);
                }
                else {
                    this.showMessage(`Obtained an access token ${response.accessToken}.`);
                }
            })
                .catch(error => {
                (0, logger_ts_1.log)('Something bad happened', error);
                this.showMessage(`Something bad happened ${error}`);
            });
        }
    }
    checkForAuthorizationResponse() {
        this.authorizationHandler.completeAuthorizationRequestIfPossible();
    }
}
exports.App = App;
// export App
window['App'] = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hcHAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBRUgsK0RBQStEO0FBRS9ELDhFQUFxRTtBQUNyRSw4RkFBMkc7QUFDM0csMEdBQWdHO0FBQ2hHLGdEQUFxQztBQUNyQyxnRkFBd0U7QUFDeEUsOERBQThHO0FBQzlHLDhFQUE2RjtBQXNCN0YseUNBQXlDO0FBQ3pDLE1BQU0sZ0JBQWdCLEdBQUcsNkJBQTZCLENBQUM7QUFFdkQsa0NBQWtDO0FBQ2xDLE1BQU0sUUFBUSxHQUFHLDBFQUEwRSxDQUFDO0FBQzVGLE1BQU0sWUFBWSxHQUFHLG9CQUFvQixDQUFDO0FBQzFDLE1BQU0sV0FBVyxHQUFHLHFDQUFxQyxDQUFDO0FBQzFELE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQztBQUV2Qjs7R0FFRztBQUNIO0lBWUUsWUFBbUIsUUFBaUI7d0JBQWpCLFFBQVE7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHdEQUFxQixFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksa0RBQXNCLEVBQUUsQ0FBQztRQUN6RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksa0RBQXVCLEVBQUUsQ0FBQztRQUNsRCxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNsRSx1REFBdUQ7UUFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbEUsSUFBQSxlQUFHLEVBQUMsaUNBQWlDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRSxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUNiLElBQUksQ0FBQyxPQUFP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O2dCQUNoQyxDQUFDO2dCQUVELGdFQUFnRTtnQkFDaEUsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUM7Z0JBQ3RCLElBQUksY0FBYyxFQUFFLENBQUM7b0JBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsNEJBQTRCLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2dCQUN4RSxDQUFDO3FCQUFNLENBQUM7b0JBQ04sSUFBSSxDQUFDLFdBQVcsQ0FBQyw0QkFBNEIsUUFBUSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7Z0JBQ3hFLENBQUM7WUFDSCxDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNiLElBQUEsZUFBRyxFQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLDBCQUEwQixLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ3JELENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQztJQUNILENBQUM7SUFFRCw2QkFBNkI7UUFDM0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLHNDQUFzQyxFQUFFLENBQUM7SUFDckUsQ0FBQztDQUNGOztBQUVELGFBQWE7QUFDWixNQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8vIFJlcHJlc2VudHMgdGhlIHRlc3Qgd2ViIGFwcCB0aGF0IHVzZXMgdGhlIEFwcEF1dGhKUyBsaWJyYXJ5LlxuXG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXF1ZXN0fSBmcm9tICcuLi9zcmMvYXV0aG9yaXphdGlvbl9yZXF1ZXN0LnRzJztcbmltcG9ydCB7QXV0aG9yaXphdGlvbk5vdGlmaWVyLCBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3NyYy9hdXRob3JpemF0aW9uX3JlcXVlc3RfaGFuZGxlci50cyc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi4vc3JjL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uLnRzJztcbmltcG9ydCB7bG9nfSBmcm9tICcuLi9zcmMvbG9nZ2VyLnRzJztcbmltcG9ydCB7UmVkaXJlY3RSZXF1ZXN0SGFuZGxlcn0gZnJvbSAnLi4vc3JjL3JlZGlyZWN0X2Jhc2VkX2hhbmRsZXIudHMnO1xuaW1wb3J0IHtHUkFOVF9UWVBFX0FVVEhPUklaQVRJT05fQ09ERSwgR1JBTlRfVFlQRV9SRUZSRVNIX1RPS0VOLCBUb2tlblJlcXVlc3R9IGZyb20gJy4uL3NyYy90b2tlbl9yZXF1ZXN0LnRzJztcbmltcG9ydCB7QmFzZVRva2VuUmVxdWVzdEhhbmRsZXIsIFRva2VuUmVxdWVzdEhhbmRsZXJ9IGZyb20gJy4uL3NyYy90b2tlbl9yZXF1ZXN0X2hhbmRsZXIudHMnO1xuaW1wb3J0IHtUb2tlblJlc3BvbnNlfSBmcm9tICcuLi9zcmMvdG9rZW5fcmVzcG9uc2UudHMnO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvblJlc3BvbnNlIH0gZnJvbSAnLi4vc3JjL2F1dGhvcml6YXRpb25fcmVzcG9uc2UudHMnO1xuaW1wb3J0IHsgU3RyaW5nTWFwIH0gZnJvbSAnLi4vc3JjL3R5cGVzLnRzJztcblxuLyogU29tZSBpbnRlcmZhY2UgZGVjbGFyYXRpb25zIGZvciBNYXRlcmlhbCBkZXNpZ24gbGl0ZS4gKi9cblxuLyoqXG4gKiBTbmFja2JhciBvcHRpb25zLlxuICovXG5kZWNsYXJlIGludGVyZmFjZSBTbmFja0Jhck9wdGlvbnMge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHRpbWVvdXQ/OiBudW1iZXI7XG59XG5cbi8qKlxuICogSW50ZXJmYWNlIHRoYXQgZGVmaW5lcyB0aGUgTURMIE1hdGVyaWFsIFNuYWNrIEJhciBBUEkuXG4gKi9cbmRlY2xhcmUgaW50ZXJmYWNlIE1hdGVyaWFsU25hY2tCYXIge1xuICBzaG93U25hY2tiYXI6IChvcHRpb25zOiBTbmFja0Jhck9wdGlvbnMpID0+IHZvaWQ7XG59XG5cbi8qIGFuIGV4YW1wbGUgb3BlbiBpZCBjb25uZWN0IHByb3ZpZGVyICovXG5jb25zdCBvcGVuSWRDb25uZWN0VXJsID0gJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSc7XG5cbi8qIGV4YW1wbGUgY2xpZW50IGNvbmZpZ3VyYXRpb24gKi9cbmNvbnN0IGNsaWVudElkID0gJzUxMTgyODU3MDk4NC1kaG5zaHFjcGVnZWU2NmhnbnA3NTRkdXBlOHNiYXMxOC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSc7XG5jb25zdCBjbGllbnRTZWNyZXQgPSAneW91ci1jbGllbnQtc2VjcmV0JztcbmNvbnN0IHJlZGlyZWN0VXJpID0gJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9yZWRpcmVjdC5odG1sJztcbmNvbnN0IHNjb3BlID0gJ29wZW5pZCc7XG5cbi8qKlxuICogVGhlIFRlc3QgYXBwbGljYXRpb24uXG4gKi9cbmV4cG9ydCBjbGFzcyBBcHAge1xuICBwcml2YXRlIG5vdGlmaWVyOiBBdXRob3JpemF0aW9uTm90aWZpZXI7XG4gIHByaXZhdGUgYXV0aG9yaXphdGlvbkhhbmRsZXI6IEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlcjtcbiAgcHJpdmF0ZSB0b2tlbkhhbmRsZXI6IFRva2VuUmVxdWVzdEhhbmRsZXI7XG5cbiAgLy8gc3RhdGVcbiAgcHJpdmF0ZSBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb258dW5kZWZpbmVkO1xuICBwcml2YXRlIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0fHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSByZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBjb2RlOiBzdHJpbmd8dW5kZWZpbmVkO1xuICBwcml2YXRlIHRva2VuUmVzcG9uc2U6IFRva2VuUmVzcG9uc2V8dW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBzbmFja2JhcjogRWxlbWVudCkge1xuICAgIHRoaXMubm90aWZpZXIgPSBuZXcgQXV0aG9yaXphdGlvbk5vdGlmaWVyKCk7XG4gICAgdGhpcy5hdXRob3JpemF0aW9uSGFuZGxlciA9IG5ldyBSZWRpcmVjdFJlcXVlc3RIYW5kbGVyKCk7XG4gICAgdGhpcy50b2tlbkhhbmRsZXIgPSBuZXcgQmFzZVRva2VuUmVxdWVzdEhhbmRsZXIoKTtcbiAgICAvLyBzZXQgbm90aWZpZXIgdG8gZGVsaXZlciByZXNwb25zZXNcbiAgICB0aGlzLmF1dGhvcml6YXRpb25IYW5kbGVyLnNldEF1dGhvcml6YXRpb25Ob3RpZmllcih0aGlzLm5vdGlmaWVyKTtcbiAgICAvLyBzZXQgYSBsaXN0ZW5lciB0byBsaXN0ZW4gZm9yIGF1dGhvcml6YXRpb24gcmVzcG9uc2VzXG4gICAgdGhpcy5ub3RpZmllci5zZXRBdXRob3JpemF0aW9uTGlzdGVuZXIoKHJlcXVlc3QsIHJlc3BvbnNlLCBlcnJvcikgPT4ge1xuICAgICAgbG9nKCdBdXRob3JpemF0aW9uIHJlcXVlc3QgY29tcGxldGUgJywgcmVxdWVzdCwgcmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICB0aGlzLnJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgIHRoaXMuY29kZSA9IHJlc3BvbnNlLmNvZGU7XG4gICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoYEF1dGhvcml6YXRpb24gQ29kZSAke3Jlc3BvbnNlLmNvZGV9YCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzaG93TWVzc2FnZShtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzbmFja2JhciA9ICh0aGlzLnNuYWNrYmFyIGFzIGFueSlbJ01hdGVyaWFsU25hY2tiYXInXSBhcyBNYXRlcmlhbFNuYWNrQmFyO1xuICAgIHNuYWNrYmFyLnNob3dTbmFja2Jhcih7bWVzc2FnZTogbWVzc2FnZX0pO1xuICB9XG5cbiAgZmV0Y2hTZXJ2aWNlQ29uZmlndXJhdGlvbigpIHtcbiAgICBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24uZmV0Y2hGcm9tSXNzdWVyKG9wZW5JZENvbm5lY3RVcmwpXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBsb2coJ0ZldGNoZWQgc2VydmljZSBjb25maWd1cmF0aW9uJywgcmVzcG9uc2UpO1xuICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IHJlc3BvbnNlO1xuICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoJ0NvbXBsZXRlZCBmZXRjaGluZyBjb25maWd1cmF0aW9uJyk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgbG9nKCdTb21ldGhpbmcgYmFkIGhhcHBlbmVkJywgZXJyb3IpO1xuICAgICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoYFNvbWV0aGluZyBiYWQgaGFwcGVuZWQgJHtlcnJvcn1gKVxuICAgICAgICB9KTtcbiAgfVxuXG4gIG1ha2VBdXRob3JpemF0aW9uUmVxdWVzdCgpIHtcbiAgICAvLyBjcmVhdGUgYSByZXF1ZXN0XG4gICAgbGV0IHJlcXVlc3QgPSBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3Qoe1xuICAgICAgY2xpZW50X2lkOiBjbGllbnRJZCxcbiAgICAgIHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmksXG4gICAgICBzY29wZTogc2NvcGUsXG4gICAgICByZXNwb25zZV90eXBlOiBBdXRob3JpemF0aW9uUmVxdWVzdC5SRVNQT05TRV9UWVBFX0NPREUsXG4gICAgICBzdGF0ZTogdW5kZWZpbmVkLFxuICAgICAgZXh0cmFzOiB7J3Byb21wdCc6ICdjb25zZW50JywgJ2FjY2Vzc190eXBlJzogJ29mZmxpbmUnfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuY29uZmlndXJhdGlvbikge1xuICAgICAgdGhpcy5hdXRob3JpemF0aW9uSGFuZGxlci5wZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QodGhpcy5jb25maWd1cmF0aW9uLCByZXF1ZXN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93TWVzc2FnZShcbiAgICAgICAgICAnRmV0Y2ggQXV0aG9yaXphdGlvbiBTZXJ2aWNlIGNvbmZpZ3VyYXRpb24sIGJlZm9yZSB5b3UgbWFrZSB0aGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0LicpO1xuICAgIH1cbiAgfVxuXG4gIG1ha2VUb2tlblJlcXVlc3QoKSB7XG4gICAgaWYgKCF0aGlzLmNvbmZpZ3VyYXRpb24pIHtcbiAgICAgIHRoaXMuc2hvd01lc3NhZ2UoJ1BsZWFzZSBmZXRjaCBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24uJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHJlcXVlc3Q6IFRva2VuUmVxdWVzdHxudWxsID0gbnVsbDtcbiAgICBpZiAodGhpcy5jb2RlKSB7XG4gICAgICBsZXQgZXh0cmFzOiBTdHJpbmdNYXB8dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKHRoaXMucmVxdWVzdCAmJiB0aGlzLnJlcXVlc3QuaW50ZXJuYWwpIHtcbiAgICAgICAgZXh0cmFzID0ge307XG4gICAgICAgIGV4dHJhc1snY2xpZW50X3NlY3JldCddID0gY2xpZW50U2VjcmV0O1xuICAgICAgICBleHRyYXNbJ2NvZGVfdmVyaWZpZXInXSA9IHRoaXMucmVxdWVzdC5pbnRlcm5hbFsnY29kZV92ZXJpZmllciddO1xuICAgICAgfVxuICAgICAgLy8gdXNlIHRoZSBjb2RlIHRvIG1ha2UgdGhlIHRva2VuIHJlcXVlc3QuXG4gICAgICByZXF1ZXN0ID0gbmV3IFRva2VuUmVxdWVzdCh7XG4gICAgICAgIGNsaWVudF9pZDogY2xpZW50SWQsXG4gICAgICAgIHJlZGlyZWN0X3VyaTogcmVkaXJlY3RVcmksXG4gICAgICAgIGdyYW50X3R5cGU6IEdSQU5UX1RZUEVfQVVUSE9SSVpBVElPTl9DT0RFLFxuICAgICAgICBjb2RlOiB0aGlzLmNvZGUsXG4gICAgICAgIHJlZnJlc2hfdG9rZW46IHVuZGVmaW5lZCxcbiAgICAgICAgZXh0cmFzOiBleHRyYXNcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy50b2tlblJlc3BvbnNlKSB7XG4gICAgICAvLyB1c2UgdGhlIHRva2VuIHJlc3BvbnNlIHRvIG1ha2UgYSByZXF1ZXN0IGZvciBhbiBhY2Nlc3MgdG9rZW5cbiAgICAgIHJlcXVlc3QgPSBuZXcgVG9rZW5SZXF1ZXN0KHtcbiAgICAgICAgY2xpZW50X2lkOiBjbGllbnRJZCxcbiAgICAgICAgcmVkaXJlY3RfdXJpOiByZWRpcmVjdFVyaSxcbiAgICAgICAgZ3JhbnRfdHlwZTogR1JBTlRfVFlQRV9SRUZSRVNIX1RPS0VOLFxuICAgICAgICBjb2RlOiB1bmRlZmluZWQsXG4gICAgICAgIHJlZnJlc2hfdG9rZW46IHRoaXMudG9rZW5SZXNwb25zZS5yZWZyZXNoVG9rZW4sXG4gICAgICAgIGV4dHJhczoge1xuICAgICAgICAgICdjbGllbnRfc2VjcmV0JzogY2xpZW50U2VjcmV0XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0KSB7XG4gICAgICB0aGlzLnRva2VuSGFuZGxlci5wZXJmb3JtVG9rZW5SZXF1ZXN0KHRoaXMuY29uZmlndXJhdGlvbiwgcmVxdWVzdClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBsZXQgaXNGaXJzdFJlcXVlc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnRva2VuUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgLy8gY29weSBvdmVyIG5ldyBmaWVsZHNcbiAgICAgICAgICAgICAgdGhpcy50b2tlblJlc3BvbnNlLmFjY2Vzc1Rva2VuID0gcmVzcG9uc2UuYWNjZXNzVG9rZW47XG4gICAgICAgICAgICAgIHRoaXMudG9rZW5SZXNwb25zZS5pc3N1ZWRBdCA9IHJlc3BvbnNlLmlzc3VlZEF0O1xuICAgICAgICAgICAgICB0aGlzLnRva2VuUmVzcG9uc2UuZXhwaXJlc0luID0gcmVzcG9uc2UuZXhwaXJlc0luO1xuICAgICAgICAgICAgICB0aGlzLnRva2VuUmVzcG9uc2UudG9rZW5UeXBlID0gcmVzcG9uc2UudG9rZW5UeXBlO1xuICAgICAgICAgICAgICB0aGlzLnRva2VuUmVzcG9uc2Uuc2NvcGUgPSByZXNwb25zZS5zY29wZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlzRmlyc3RSZXF1ZXN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy50b2tlblJlc3BvbnNlID0gcmVzcG9uc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHVuc2V0IGNvZGUsIHNvIHdlIGNhbiBkbyByZWZyZXNoIHRva2VuIGV4Y2hhbmdlcyBzdWJzZXF1ZW50bHlcbiAgICAgICAgICAgIHRoaXMuY29kZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChpc0ZpcnN0UmVxdWVzdCkge1xuICAgICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlKGBPYnRhaW5lZCBhIHJlZnJlc2ggdG9rZW4gJHtyZXNwb25zZS5yZWZyZXNoVG9rZW59YCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlKGBPYnRhaW5lZCBhbiBhY2Nlc3MgdG9rZW4gJHtyZXNwb25zZS5hY2Nlc3NUb2tlbn0uYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgbG9nKCdTb21ldGhpbmcgYmFkIGhhcHBlbmVkJywgZXJyb3IpO1xuICAgICAgICAgICAgdGhpcy5zaG93TWVzc2FnZShgU29tZXRoaW5nIGJhZCBoYXBwZW5lZCAke2Vycm9yfWApXG4gICAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tGb3JBdXRob3JpemF0aW9uUmVzcG9uc2UoKSB7XG4gICAgdGhpcy5hdXRob3JpemF0aW9uSGFuZGxlci5jb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0SWZQb3NzaWJsZSgpO1xuICB9XG59XG5cbi8vIGV4cG9ydCBBcHBcbih3aW5kb3cgYXMgYW55KVsnQXBwJ10gPSBBcHA7XG4iXX0=