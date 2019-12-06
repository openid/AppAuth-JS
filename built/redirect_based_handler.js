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
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
    storageBackend, utils, locationLike, crypto) {
        if (storageBackend === void 0) { storageBackend = new storage_1.LocalStorageBackend(); }
        if (utils === void 0) { utils = new query_string_utils_1.BasicQueryStringUtils(); }
        if (locationLike === void 0) { locationLike = window.location; }
        if (crypto === void 0) { crypto = new crypto_utils_1.DefaultCrypto(); }
        var _this = _super.call(this, utils, crypto) || this;
        _this.storageBackend = storageBackend;
        _this.locationLike = locationLike;
        return _this;
    }
    RedirectRequestHandler.prototype.performAuthorizationRequest = function (configuration, request) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var handle = _this.crypto.generateRandom(10);
            // before you make request, persist all request related data in local storage.
            var persisted = Promise.all([
                _this.storageBackend.setItem(AUTHORIZATION_REQUEST_HANDLE_KEY, handle),
                // Calling toJson() adds in the code & challenge when possible
                request.toJson().then(function (result) { return _this.storageBackend.setItem(authorizationRequestKey(handle), JSON.stringify(result)); }),
                _this.storageBackend.setItem(authorizationServiceConfigurationKey(handle), JSON.stringify(configuration.toJson())),
            ]);
            persisted
                .then(function () {
                // make the redirect request
                var url = _this.buildRequestUrl(configuration, request);
                logger_1.log('Making a request to ', request, url);
                _this.locationLike.assign(url);
                resolve(null);
            })
                .catch(function (error) { return reject(error); });
        });
    };
    /**
     * Attempts to introspect the contents of storage backend and completes the
     * request.
     */
    RedirectRequestHandler.prototype.completeAuthorizationRequest = function () {
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
                    .then(function (json) { return new authorization_request_1.AuthorizationRequest(json); })
                    .then(function (request) {
                    // check redirect_uri and state
                    var currentUri = "" + _this.locationLike.origin + _this.locationLike.pathname;
                    var queryParams = _this.utils.parse(_this.locationLike, true /* use hash */);
                    var state = queryParams['state'];
                    var code = queryParams['code'];
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
                            authorizationError = new authorization_response_1.AuthorizationError({
                                error: error,
                                error_description: errorDescription,
                                error_uri: errorUri,
                                state: state
                            });
                        }
                        else {
                            authorizationResponse = new authorization_response_1.AuthorizationResponse({ code: code, state: state });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7OztBQUVILGlFQUE2RDtBQUM3RCxpRkFBMEc7QUFDMUcsbUVBQWtGO0FBRWxGLCtDQUFxRDtBQUNyRCxtQ0FBNkI7QUFDN0IsMkRBQTJEO0FBQzNELHFDQUE4RDtBQUk5RCxxQ0FBcUM7QUFDckMsSUFBTSx1QkFBdUIsR0FDekIsVUFBQyxNQUFjO0lBQ2IsT0FBVSxNQUFNLG1DQUFnQyxDQUFDO0FBQ25ELENBQUMsQ0FBQTtBQUVMLGtEQUFrRDtBQUNsRCxJQUFNLG9DQUFvQyxHQUN0QyxVQUFDLE1BQWM7SUFDYixPQUFVLE1BQU0saURBQThDLENBQUM7QUFDakUsQ0FBQyxDQUFBO0FBRUwsK0VBQStFO0FBQy9FLElBQU0sZ0NBQWdDLEdBQUcsdUNBQXVDLENBQUM7QUFFakY7OztHQUdHO0FBQ0g7SUFBNEMsMENBQTJCO0lBQ3JFO0lBQ0ksbUNBQW1DO0lBQ25DLHFFQUFxRTtJQUNyRSwyQkFBMkI7SUFDcEIsY0FBMEQsRUFDakUsS0FBbUMsRUFDNUIsWUFBNEMsRUFDbkQsTUFBb0M7UUFIN0IsK0JBQUEsRUFBQSxxQkFBcUMsNkJBQW1CLEVBQUU7UUFDakUsc0JBQUEsRUFBQSxZQUFZLDBDQUFxQixFQUFFO1FBQzVCLDZCQUFBLEVBQUEsZUFBNkIsTUFBTSxDQUFDLFFBQVE7UUFDbkQsdUJBQUEsRUFBQSxhQUFxQiw0QkFBYSxFQUFFO1FBUHhDLFlBUUUsa0JBQU0sS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUNyQjtRQUxVLG9CQUFjLEdBQWQsY0FBYyxDQUE0QztRQUUxRCxrQkFBWSxHQUFaLFlBQVksQ0FBZ0M7O0lBR3ZELENBQUM7SUFFRCw0REFBMkIsR0FBM0IsVUFDSSxhQUFnRCxFQUNoRCxPQUE2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QUssRUFBRSxrQkFBa0I7NkJBQ00sQ0FBQzt3QkFDcEMsQ0FBQyxDQUFDLENBQUM7cUJBQ1I7eUJBQU07d0JBQ0wsWUFBRyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7d0JBQzlELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDOUI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDUjtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBM0dELENBQTRDLDJEQUEyQixHQTJHdEU7QUEzR1ksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3R9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0JztcbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyLCBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVxdWVzdF9oYW5kbGVyJztcbmltcG9ydCB7QXV0aG9yaXphdGlvbkVycm9yLCBBdXRob3JpemF0aW9uUmVzcG9uc2V9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXNwb25zZSdcbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7Q3J5cHRvLCBEZWZhdWx0Q3J5cHRvfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtCYXNpY1F1ZXJ5U3RyaW5nVXRpbHN9IGZyb20gJy4vcXVlcnlfc3RyaW5nX3V0aWxzJztcbmltcG9ydCB7TG9jYWxTdG9yYWdlQmFja2VuZCwgU3RvcmFnZUJhY2tlbmR9IGZyb20gJy4vc3RvcmFnZSc7XG5pbXBvcnQge0xvY2F0aW9uTGlrZX0gZnJvbSAnLi90eXBlcyc7XG5cblxuLyoqIGtleSBmb3IgYXV0aG9yaXphdGlvbiByZXF1ZXN0LiAqL1xuY29uc3QgYXV0aG9yaXphdGlvblJlcXVlc3RLZXkgPVxuICAgIChoYW5kbGU6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIGAke2hhbmRsZX1fYXBwYXV0aF9hdXRob3JpemF0aW9uX3JlcXVlc3RgO1xuICAgIH1cblxuLyoqIGtleSBmb3IgYXV0aG9yaXphdGlvbiBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24gKi9cbmNvbnN0IGF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbktleSA9XG4gICAgKGhhbmRsZTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gYCR7aGFuZGxlfV9hcHBhdXRoX2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uYDtcbiAgICB9XG5cbi8qKiBrZXkgaW4gbG9jYWwgc3RvcmFnZSB3aGljaCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGF1dGhvcml6YXRpb24gcmVxdWVzdC4gKi9cbmNvbnN0IEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZID0gJ2FwcGF1dGhfY3VycmVudF9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHdoaWNoIHVzZXMgYSBzdGFuZGFyZFxuICogcmVkaXJlY3QgYmFzZWQgY29kZSBmbG93LlxuICovXG5leHBvcnQgY2xhc3MgUmVkaXJlY3RSZXF1ZXN0SGFuZGxlciBleHRlbmRzIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLy8gdXNlIHRoZSBwcm92aWRlZCBzdG9yYWdlIGJhY2tlbmRcbiAgICAgIC8vIG9yIGluaXRpYWxpemUgbG9jYWwgc3RvcmFnZSB3aXRoIHRoZSBkZWZhdWx0IHN0b3JhZ2UgYmFja2VuZCB3aGljaFxuICAgICAgLy8gdXNlcyB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgICBwdWJsaWMgc3RvcmFnZUJhY2tlbmQ6IFN0b3JhZ2VCYWNrZW5kID0gbmV3IExvY2FsU3RvcmFnZUJhY2tlbmQoKSxcbiAgICAgIHV0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpLFxuICAgICAgcHVibGljIGxvY2F0aW9uTGlrZTogTG9jYXRpb25MaWtlID0gd2luZG93LmxvY2F0aW9uLFxuICAgICAgY3J5cHRvOiBDcnlwdG8gPSBuZXcgRGVmYXVsdENyeXB0bygpKSB7XG4gICAgc3VwZXIodXRpbHMsIGNyeXB0byk7XG4gIH1cblxuICBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxudWxsPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBoYW5kbGUgPSB0aGlzLmNyeXB0by5nZW5lcmF0ZVJhbmRvbSgxMCk7XG5cbiAgICAgIC8vIGJlZm9yZSB5b3UgbWFrZSByZXF1ZXN0LCBwZXJzaXN0IGFsbCByZXF1ZXN0IHJlbGF0ZWQgZGF0YSBpbiBsb2NhbCBzdG9yYWdlLlxuICAgICAgY29uc3QgcGVyc2lzdGVkID0gUHJvbWlzZS5hbGwoW1xuICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oQVVUSE9SSVpBVElPTl9SRVFVRVNUX0hBTkRMRV9LRVksIGhhbmRsZSksXG4gICAgICAgIC8vIENhbGxpbmcgdG9Kc29uKCkgYWRkcyBpbiB0aGUgY29kZSAmIGNoYWxsZW5nZSB3aGVuIHBvc3NpYmxlXG4gICAgICAgIHJlcXVlc3QudG9Kc29uKCkudGhlbihcbiAgICAgICAgICAgIHJlc3VsdCA9PiB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oXG4gICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvblJlcXVlc3RLZXkoaGFuZGxlKSwgSlNPTi5zdHJpbmdpZnkocmVzdWx0KSkpLFxuICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlKSwgSlNPTi5zdHJpbmdpZnkoY29uZmlndXJhdGlvbi50b0pzb24oKSkpLFxuICAgICAgXSk7XG5cbiAgICAgIHBlcnNpc3RlZFxuICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIG1ha2UgdGhlIHJlZGlyZWN0IHJlcXVlc3RcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmJ1aWxkUmVxdWVzdFVybChjb25maWd1cmF0aW9uLCByZXF1ZXN0KTtcbiAgICAgICAgICAgIGxvZygnTWFraW5nIGEgcmVxdWVzdCB0byAnLCByZXF1ZXN0LCB1cmwpO1xuICAgICAgICAgICAgdGhpcy5sb2NhdGlvbkxpa2UuYXNzaWduKHVybCk7XG4gICAgICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGVtcHRzIHRvIGludHJvc3BlY3QgdGhlIGNvbnRlbnRzIG9mIHN0b3JhZ2UgYmFja2VuZCBhbmQgY29tcGxldGVzIHRoZVxuICAgKiByZXF1ZXN0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+IHtcbiAgICAvLyBUT0RPKHJhaHVscmF2QCk6IGhhbmRsZSBhdXRob3JpemF0aW9uIGVycm9ycy5cbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlQmFja2VuZC5nZXRJdGVtKEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZKS50aGVuKGhhbmRsZSA9PiB7XG4gICAgICBpZiAoaGFuZGxlKSB7XG4gICAgICAgIC8vIHdlIGhhdmUgYSBwZW5kaW5nIHJlcXVlc3QuXG4gICAgICAgIC8vIGZldGNoIGF1dGhvcml6YXRpb24gcmVxdWVzdCwgYW5kIGNoZWNrIHN0YXRlXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2VCYWNrZW5kXG4gICAgICAgICAgICAuZ2V0SXRlbShhdXRob3JpemF0aW9uUmVxdWVzdEtleShoYW5kbGUpKVxuICAgICAgICAgICAgLy8gcmVxdWlyZXMgYSBjb3JyZXNwb25kaW5nIGluc3RhbmNlIG9mIHJlc3VsdFxuICAgICAgICAgICAgLy8gVE9ETyhyYWh1bHJhdkApOiBjaGVjayBmb3IgaW5jb25zaXRlbnQgc3RhdGUgaGVyZVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IEpTT04ucGFyc2UocmVzdWx0ISkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IG5ldyBBdXRob3JpemF0aW9uUmVxdWVzdChqc29uKSlcbiAgICAgICAgICAgIC50aGVuKHJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgICAvLyBjaGVjayByZWRpcmVjdF91cmkgYW5kIHN0YXRlXG4gICAgICAgICAgICAgIGxldCBjdXJyZW50VXJpID0gYCR7dGhpcy5sb2NhdGlvbkxpa2Uub3JpZ2lufSR7dGhpcy5sb2NhdGlvbkxpa2UucGF0aG5hbWV9YDtcbiAgICAgICAgICAgICAgbGV0IHF1ZXJ5UGFyYW1zID0gdGhpcy51dGlscy5wYXJzZSh0aGlzLmxvY2F0aW9uTGlrZSwgdHJ1ZSAvKiB1c2UgaGFzaCAqLyk7XG4gICAgICAgICAgICAgIGxldCBzdGF0ZTogc3RyaW5nfHVuZGVmaW5lZCA9IHF1ZXJ5UGFyYW1zWydzdGF0ZSddO1xuICAgICAgICAgICAgICBsZXQgY29kZTogc3RyaW5nfHVuZGVmaW5lZCA9IHF1ZXJ5UGFyYW1zWydjb2RlJ107XG4gICAgICAgICAgICAgIGxldCBlcnJvcjogc3RyaW5nfHVuZGVmaW5lZCA9IHF1ZXJ5UGFyYW1zWydlcnJvciddO1xuICAgICAgICAgICAgICBsb2coJ1BvdGVudGlhbCBhdXRob3JpemF0aW9uIHJlcXVlc3QgJywgY3VycmVudFVyaSwgcXVlcnlQYXJhbXMsIHN0YXRlLCBjb2RlLCBlcnJvcik7XG4gICAgICAgICAgICAgIGxldCBzaG91bGROb3RpZnkgPSBzdGF0ZSA9PT0gcmVxdWVzdC5zdGF0ZTtcbiAgICAgICAgICAgICAgbGV0IGF1dGhvcml6YXRpb25SZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwgPSBudWxsO1xuICAgICAgICAgICAgICBsZXQgYXV0aG9yaXphdGlvbkVycm9yOiBBdXRob3JpemF0aW9uRXJyb3J8bnVsbCA9IG51bGw7XG4gICAgICAgICAgICAgIGlmIChzaG91bGROb3RpZnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGdldCBhZGRpdGlvbmFsIG9wdGlvbmFsIGluZm8uXG4gICAgICAgICAgICAgICAgICBsZXQgZXJyb3JVcmkgPSBxdWVyeVBhcmFtc1snZXJyb3JfdXJpJ107XG4gICAgICAgICAgICAgICAgICBsZXQgZXJyb3JEZXNjcmlwdGlvbiA9IHF1ZXJ5UGFyYW1zWydlcnJvcl9kZXNjcmlwdGlvbiddO1xuICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVycm9yID0gbmV3IEF1dGhvcml6YXRpb25FcnJvcih7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JfZGVzY3JpcHRpb246IGVycm9yRGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yX3VyaTogZXJyb3JVcmksXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25SZXNwb25zZSA9IG5ldyBBdXRob3JpemF0aW9uUmVzcG9uc2Uoe2NvZGU6IGNvZGUsIHN0YXRlOiBzdGF0ZX0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHN0YXRlXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZKSxcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oYXV0aG9yaXphdGlvblJlcXVlc3RLZXkoaGFuZGxlKSksXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKGF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbktleShoYW5kbGUpKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgbG9nKCdEZWxpdmVyaW5nIGF1dGhvcml6YXRpb24gcmVzcG9uc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBhdXRob3JpemF0aW9uUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogYXV0aG9yaXphdGlvbkVycm9yXG4gICAgICAgICAgICAgICAgICAgICAgfSBhcyBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2coJ01pc21hdGNoZWQgcmVxdWVzdCAoc3RhdGUgYW5kIHJlcXVlc3RfdXJpKSBkb250IG1hdGNoLicpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==