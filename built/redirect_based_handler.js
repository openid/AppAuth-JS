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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var authorization_request_1 = require("./authorization_request");
var authorization_request_handler_1 = require("./authorization_request_handler");
var authorization_response_1 = require("./authorization_response");
var crypto_utils_1 = require("./crypto_utils");
var logger_1 = require("./logger");
var query_string_utils_1 = require("./query_string_utils");
var storage_1 = require("./storage");
/** key for authorization request. */
var authorizationRequestKey = function (handle) {
    return handle + "_appauth_authorization_request";
};
/** key for authorization service configuration */
var authorizationServiceConfigurationKey = function (handle) {
    return handle + "_appauth_authorization_service_configuration";
};
/** key in local storage which represents the current authorization request. */
var AUTHORIZATION_REQUEST_HANDLE_KEY = 'appauth_current_authorization_request';
/**
 * Represents an AuthorizationRequestHandler which uses a standard
 * redirect based code flow.
 */
var RedirectRequestHandler = /** @class */ (function (_super) {
    __extends(RedirectRequestHandler, _super);
    function RedirectRequestHandler(
    // use the provided storage backend
    // or initialize local storage with the default storage backend which
    // uses window.localStorage
    storageBackend, utils, locationLike, generateRandom) {
        if (storageBackend === void 0) { storageBackend = new storage_1.LocalStorageBackend(); }
        if (utils === void 0) { utils = new query_string_utils_1.BasicQueryStringUtils(); }
        if (locationLike === void 0) { locationLike = window.location; }
        if (generateRandom === void 0) { generateRandom = crypto_utils_1.cryptoGenerateRandom; }
        var _this = _super.call(this, utils, generateRandom) || this;
        _this.storageBackend = storageBackend;
        _this.locationLike = locationLike;
        return _this;
    }
    RedirectRequestHandler.prototype.performAuthorizationRequest = function (configuration, request) {
        var _this = this;
        var handle = this.generateRandom();
        // before you make request, persist all request related data in local storage.
        var persisted = Promise.all([
            this.storageBackend.setItem(AUTHORIZATION_REQUEST_HANDLE_KEY, handle),
            this.storageBackend.setItem(authorizationRequestKey(handle), JSON.stringify(request.toJson())),
            this.storageBackend.setItem(authorizationServiceConfigurationKey(handle), JSON.stringify(configuration.toJson())),
        ]);
        persisted.then(function () {
            // make the redirect request
            var url = _this.buildRequestUrl(configuration, request);
            logger_1.log('Making a request to ', request, url);
            _this.locationLike.assign(url);
        });
    };
    /**
     * Attempts to introspect the contents of storage backend and completes the
     * request.
     */
    RedirectRequestHandler.prototype.completeAuthorizationRequest = function (responseType) {
        var _this = this;
        // TODO(rahulrav@): handle authorization errors.
        return this.storageBackend.getItem(AUTHORIZATION_REQUEST_HANDLE_KEY).then(function (handle) {
            if (handle) {
                // we have a pending request.
                // fetch authorization request, and check state
                return _this.storageBackend
                    .getItem(authorizationRequestKey(handle))
                    // requires a corresponding instance of result
                    // TODO(rahulrav@): check for inconsitent state here
                    .then(function (result) { return JSON.parse(result); })
                    .then(function (json) { return authorization_request_1.AuthorizationRequest.fromJson(json); })
                    .then(function (request) {
                    // check redirect_uri and state
                    var currentUri = "" + _this.locationLike.origin + _this.locationLike.pathname;
                    var queryParams;
                    switch (responseType) {
                        case authorization_request_1.AuthorizationRequest.RESPONSE_TYPE_CODE:
                            queryParams = _this.utils.parse(_this.locationLike, true /* use hash */);
                            break;
                        case authorization_request_1.AuthorizationRequest.RESPONSE_TYPE_ID_TOKEN:
                            queryParams = _this.utils.parse(_this.locationLike, false /* use ? */);
                            break;
                        default:
                            queryParams = _this.utils.parse(_this.locationLike, true /* use hash */);
                            break;
                    }
                    var state = queryParams['state'];
                    var code = queryParams['code'];
                    var idToken = queryParams['id_token'];
                    var error = queryParams['error'];
                    logger_1.log('Potential authorization request ', currentUri, queryParams, state, code, error);
                    var shouldNotify = state === request.state;
                    var authorizationResponse = null;
                    var authorizationError = null;
                    if (shouldNotify) {
                        if (error) {
                            // get additional optional info.
                            var errorUri = queryParams['error_uri'];
                            var errorDescription = queryParams['error_description'];
                            authorizationError =
                                new authorization_response_1.AuthorizationError(error, errorDescription, errorUri, state);
                        }
                        else {
                            authorizationResponse = new authorization_response_1.AuthorizationResponse(code, idToken, state);
                        }
                        // cleanup state
                        return Promise
                            .all([
                            _this.storageBackend.removeItem(AUTHORIZATION_REQUEST_HANDLE_KEY),
                            _this.storageBackend.removeItem(authorizationRequestKey(handle)),
                            _this.storageBackend.removeItem(authorizationServiceConfigurationKey(handle))
                        ])
                            .then(function () {
                            logger_1.log('Delivering authorization response');
                            return {
                                request: request,
                                response: authorizationResponse,
                                error: authorizationError
                            };
                        });
                    }
                    else {
                        logger_1.log('Mismatched request (state and request_uri) dont match.');
                        return Promise.resolve(null);
                    }
                });
            }
            else {
                return null;
            }
        });
    };
    return RedirectRequestHandler;
}(authorization_request_handler_1.AuthorizationRequestHandler));
exports.RedirectRequestHandler = RedirectRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQUVILGlFQUF1RjtBQUN2RixpRkFBK0g7QUFDL0gsbUVBQTZHO0FBRTdHLCtDQUFxRTtBQUNyRSxtQ0FBNkI7QUFDN0IsMkRBQTZFO0FBQzdFLHFDQUE4RDtBQUk5RCxxQ0FBcUM7QUFDckMsSUFBTSx1QkFBdUIsR0FDekIsVUFBQyxNQUFjO0lBQ2IsT0FBVSxNQUFNLG1DQUFnQyxDQUFDO0FBQ25ELENBQUMsQ0FBQTtBQUVMLGtEQUFrRDtBQUNsRCxJQUFNLG9DQUFvQyxHQUN0QyxVQUFDLE1BQWM7SUFDYixPQUFVLE1BQU0saURBQThDLENBQUM7QUFDakUsQ0FBQyxDQUFBO0FBRUwsK0VBQStFO0FBQy9FLElBQU0sZ0NBQWdDLEdBQUcsdUNBQXVDLENBQUM7QUFFakY7OztHQUdHO0FBQ0g7SUFBNEMsMENBQTJCO0lBQ3JFO0lBQ0ksbUNBQW1DO0lBQ25DLHFFQUFxRTtJQUNyRSwyQkFBMkI7SUFDcEIsY0FBMEQsRUFDakUsS0FBbUMsRUFDNUIsWUFBNEMsRUFDbkQsY0FBcUM7UUFIOUIsK0JBQUEsRUFBQSxxQkFBcUMsNkJBQW1CLEVBQUU7UUFDakUsc0JBQUEsRUFBQSxZQUFZLDBDQUFxQixFQUFFO1FBQzVCLDZCQUFBLEVBQUEsZUFBNkIsTUFBTSxDQUFDLFFBQVE7UUFDbkQsK0JBQUEsRUFBQSxpQkFBaUIsbUNBQW9CO1FBUHpDLFlBUUUsa0JBQU0sS0FBSyxFQUFFLGNBQWMsQ0FBQyxTQUM3QjtRQUxVLG9CQUFjLEdBQWQsY0FBYyxDQUE0QztRQUUxRCxrQkFBWSxHQUFaLFlBQVksQ0FBZ0M7O0lBR3ZELENBQUM7SUFFRCw0REFBMkIsR0FBM0IsVUFDSSxhQUFnRCxFQUNoRCxPQUE2QjtRQUZq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QUFFLE9BQU87Z0NBQ2hCLFFBQVEsRUFBRSxxQkFBcUI7Z0NBQy9CLEtBQUssRUFBRSxrQkFBa0I7NkJBQ00sQ0FBQzt3QkFDcEMsQ0FBQyxDQUFDLENBQUM7cUJBQ1I7eUJBQU07d0JBQ0wsWUFBRyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7d0JBQzlELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDOUI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDUjtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBOUdELENBQTRDLDJEQUEyQixHQThHdEU7QUE5R1ksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3QsIEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIsIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2UsIEJVSUxUX0lOX1BBUkFNRVRFUlN9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uRXJyb3IsIEF1dGhvcml6YXRpb25SZXNwb25zZSwgQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3Jlc3BvbnNlJ1xuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sIEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbkpzb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtjcnlwdG9HZW5lcmF0ZVJhbmRvbSwgUmFuZG9tR2VuZXJhdG9yfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMsIFF1ZXJ5U3RyaW5nVXRpbHN9IGZyb20gJy4vcXVlcnlfc3RyaW5nX3V0aWxzJztcbmltcG9ydCB7TG9jYWxTdG9yYWdlQmFja2VuZCwgU3RvcmFnZUJhY2tlbmR9IGZyb20gJy4vc3RvcmFnZSc7XG5pbXBvcnQge0xvY2F0aW9uTGlrZSwgU3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuXG4vKioga2V5IGZvciBhdXRob3JpemF0aW9uIHJlcXVlc3QuICovXG5jb25zdCBhdXRob3JpemF0aW9uUmVxdWVzdEtleSA9XG4gICAgKGhhbmRsZTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gYCR7aGFuZGxlfV9hcHBhdXRoX2F1dGhvcml6YXRpb25fcmVxdWVzdGA7XG4gICAgfVxuXG4vKioga2V5IGZvciBhdXRob3JpemF0aW9uIHNlcnZpY2UgY29uZmlndXJhdGlvbiAqL1xuY29uc3QgYXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uS2V5ID1cbiAgICAoaGFuZGxlOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBgJHtoYW5kbGV9X2FwcGF1dGhfYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb25gO1xuICAgIH1cblxuLyoqIGtleSBpbiBsb2NhbCBzdG9yYWdlIHdoaWNoIHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgYXV0aG9yaXphdGlvbiByZXF1ZXN0LiAqL1xuY29uc3QgQVVUSE9SSVpBVElPTl9SRVFVRVNUX0hBTkRMRV9LRVkgPSAnYXBwYXV0aF9jdXJyZW50X2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIgd2hpY2ggdXNlcyBhIHN0YW5kYXJkXG4gKiByZWRpcmVjdCBiYXNlZCBjb2RlIGZsb3cuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWRpcmVjdFJlcXVlc3RIYW5kbGVyIGV4dGVuZHMgQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICAvLyB1c2UgdGhlIHByb3ZpZGVkIHN0b3JhZ2UgYmFja2VuZFxuICAgICAgLy8gb3IgaW5pdGlhbGl6ZSBsb2NhbCBzdG9yYWdlIHdpdGggdGhlIGRlZmF1bHQgc3RvcmFnZSBiYWNrZW5kIHdoaWNoXG4gICAgICAvLyB1c2VzIHdpbmRvdy5sb2NhbFN0b3JhZ2VcbiAgICAgIHB1YmxpYyBzdG9yYWdlQmFja2VuZDogU3RvcmFnZUJhY2tlbmQgPSBuZXcgTG9jYWxTdG9yYWdlQmFja2VuZCgpLFxuICAgICAgdXRpbHMgPSBuZXcgQmFzaWNRdWVyeVN0cmluZ1V0aWxzKCksXG4gICAgICBwdWJsaWMgbG9jYXRpb25MaWtlOiBMb2NhdGlvbkxpa2UgPSB3aW5kb3cubG9jYXRpb24sXG4gICAgICBnZW5lcmF0ZVJhbmRvbSA9IGNyeXB0b0dlbmVyYXRlUmFuZG9tKSB7XG4gICAgc3VwZXIodXRpbHMsIGdlbmVyYXRlUmFuZG9tKTtcbiAgfVxuXG4gIHBlcmZvcm1BdXRob3JpemF0aW9uUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0KSB7XG4gICAgbGV0IGhhbmRsZSA9IHRoaXMuZ2VuZXJhdGVSYW5kb20oKTtcbiAgICAvLyBiZWZvcmUgeW91IG1ha2UgcmVxdWVzdCwgcGVyc2lzdCBhbGwgcmVxdWVzdCByZWxhdGVkIGRhdGEgaW4gbG9jYWwgc3RvcmFnZS5cbiAgICBsZXQgcGVyc2lzdGVkID0gUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZLCBoYW5kbGUpLFxuICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKFxuICAgICAgICAgIGF1dGhvcml6YXRpb25SZXF1ZXN0S2V5KGhhbmRsZSksIEpTT04uc3RyaW5naWZ5KHJlcXVlc3QudG9Kc29uKCkpKSxcbiAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQuc2V0SXRlbShcbiAgICAgICAgICBhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlKSwgSlNPTi5zdHJpbmdpZnkoY29uZmlndXJhdGlvbi50b0pzb24oKSkpLFxuICAgIF0pO1xuXG4gICAgcGVyc2lzdGVkLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gbWFrZSB0aGUgcmVkaXJlY3QgcmVxdWVzdFxuICAgICAgbGV0IHVybCA9IHRoaXMuYnVpbGRSZXF1ZXN0VXJsKGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpO1xuICAgICAgbG9nKCdNYWtpbmcgYSByZXF1ZXN0IHRvICcsIHJlcXVlc3QsIHVybCk7XG4gICAgICB0aGlzLmxvY2F0aW9uTGlrZS5hc3NpZ24odXJsKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRlbXB0cyB0byBpbnRyb3NwZWN0IHRoZSBjb250ZW50cyBvZiBzdG9yYWdlIGJhY2tlbmQgYW5kIGNvbXBsZXRlcyB0aGVcbiAgICogcmVxdWVzdC5cbiAgICovXG4gIHByb3RlY3RlZCBjb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0KHJlc3BvbnNlVHlwZTogc3RyaW5nKTpcbiAgICAgIFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZXxudWxsPiB7XG4gICAgLy8gVE9ETyhyYWh1bHJhdkApOiBoYW5kbGUgYXV0aG9yaXphdGlvbiBlcnJvcnMuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZUJhY2tlbmQuZ2V0SXRlbShBVVRIT1JJWkFUSU9OX1JFUVVFU1RfSEFORExFX0tFWSkudGhlbihoYW5kbGUgPT4ge1xuICAgICAgaWYgKGhhbmRsZSkge1xuICAgICAgICAvLyB3ZSBoYXZlIGEgcGVuZGluZyByZXF1ZXN0LlxuICAgICAgICAvLyBmZXRjaCBhdXRob3JpemF0aW9uIHJlcXVlc3QsIGFuZCBjaGVjayBzdGF0ZVxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlQmFja2VuZFxuICAgICAgICAgICAgLmdldEl0ZW0oYXV0aG9yaXphdGlvblJlcXVlc3RLZXkoaGFuZGxlKSlcbiAgICAgICAgICAgIC8vIHJlcXVpcmVzIGEgY29ycmVzcG9uZGluZyBpbnN0YW5jZSBvZiByZXN1bHRcbiAgICAgICAgICAgIC8vIFRPRE8ocmFodWxyYXZAKTogY2hlY2sgZm9yIGluY29uc2l0ZW50IHN0YXRlIGhlcmVcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiBKU09OLnBhcnNlKHJlc3VsdCEpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiBBdXRob3JpemF0aW9uUmVxdWVzdC5mcm9tSnNvbihqc29uKSlcbiAgICAgICAgICAgIC50aGVuKHJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgICAvLyBjaGVjayByZWRpcmVjdF91cmkgYW5kIHN0YXRlXG4gICAgICAgICAgICAgIGxldCBjdXJyZW50VXJpID0gYCR7dGhpcy5sb2NhdGlvbkxpa2Uub3JpZ2lufSR7dGhpcy5sb2NhdGlvbkxpa2UucGF0aG5hbWV9YDtcbiAgICAgICAgICAgICAgdmFyIHF1ZXJ5UGFyYW1zO1xuICAgICAgICAgICAgICBzd2l0Y2ggKHJlc3BvbnNlVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgQXV0aG9yaXphdGlvblJlcXVlc3QuUkVTUE9OU0VfVFlQRV9DT0RFOlxuICAgICAgICAgICAgICAgICAgcXVlcnlQYXJhbXMgPSB0aGlzLnV0aWxzLnBhcnNlKHRoaXMubG9jYXRpb25MaWtlLCB0cnVlIC8qIHVzZSBoYXNoICovKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBBdXRob3JpemF0aW9uUmVxdWVzdC5SRVNQT05TRV9UWVBFX0lEX1RPS0VOOlxuICAgICAgICAgICAgICAgICAgcXVlcnlQYXJhbXMgPSB0aGlzLnV0aWxzLnBhcnNlKHRoaXMubG9jYXRpb25MaWtlLCBmYWxzZSAvKiB1c2UgPyAqLyk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBxdWVyeVBhcmFtcyA9IHRoaXMudXRpbHMucGFyc2UodGhpcy5sb2NhdGlvbkxpa2UsIHRydWUgLyogdXNlIGhhc2ggKi8pO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGV0IHN0YXRlOiBzdHJpbmd8dW5kZWZpbmVkID0gcXVlcnlQYXJhbXNbJ3N0YXRlJ107XG4gICAgICAgICAgICAgIGxldCBjb2RlOiBzdHJpbmd8dW5kZWZpbmVkID0gcXVlcnlQYXJhbXNbJ2NvZGUnXTtcbiAgICAgICAgICAgICAgbGV0IGlkVG9rZW46IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snaWRfdG9rZW4nXTtcbiAgICAgICAgICAgICAgbGV0IGVycm9yOiBzdHJpbmd8dW5kZWZpbmVkID0gcXVlcnlQYXJhbXNbJ2Vycm9yJ107XG4gICAgICAgICAgICAgIGxvZygnUG90ZW50aWFsIGF1dGhvcml6YXRpb24gcmVxdWVzdCAnLCBjdXJyZW50VXJpLCBxdWVyeVBhcmFtcywgc3RhdGUsIGNvZGUsIGVycm9yKTtcbiAgICAgICAgICAgICAgbGV0IHNob3VsZE5vdGlmeSA9IHN0YXRlID09PSByZXF1ZXN0LnN0YXRlO1xuICAgICAgICAgICAgICBsZXQgYXV0aG9yaXphdGlvblJlc3BvbnNlOiBBdXRob3JpemF0aW9uUmVzcG9uc2V8bnVsbCA9IG51bGw7XG4gICAgICAgICAgICAgIGxldCBhdXRob3JpemF0aW9uRXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgaWYgKHNob3VsZE5vdGlmeSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgLy8gZ2V0IGFkZGl0aW9uYWwgb3B0aW9uYWwgaW5mby5cbiAgICAgICAgICAgICAgICAgIGxldCBlcnJvclVyaSA9IHF1ZXJ5UGFyYW1zWydlcnJvcl91cmknXTtcbiAgICAgICAgICAgICAgICAgIGxldCBlcnJvckRlc2NyaXB0aW9uID0gcXVlcnlQYXJhbXNbJ2Vycm9yX2Rlc2NyaXB0aW9uJ107XG4gICAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uRXJyb3IgPVxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBBdXRob3JpemF0aW9uRXJyb3IoZXJyb3IsIGVycm9yRGVzY3JpcHRpb24sIGVycm9yVXJpLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25SZXNwb25zZSA9IG5ldyBBdXRob3JpemF0aW9uUmVzcG9uc2UoY29kZSwgaWRUb2tlbiEsIHN0YXRlISk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgc3RhdGVcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICAuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oQVVUSE9SSVpBVElPTl9SRVFVRVNUX0hBTkRMRV9LRVkpLFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShhdXRob3JpemF0aW9uUmVxdWVzdEtleShoYW5kbGUpKSxcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oYXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uS2V5KGhhbmRsZSkpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBsb2coJ0RlbGl2ZXJpbmcgYXV0aG9yaXphdGlvbiByZXNwb25zZScpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGF1dGhvcml6YXRpb25SZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBhdXRob3JpemF0aW9uRXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICB9IGFzIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZygnTWlzbWF0Y2hlZCByZXF1ZXN0IChzdGF0ZSBhbmQgcmVxdWVzdF91cmkpIGRvbnQgbWF0Y2guJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19