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
var authorization_service_configuration_1 = require("./authorization_service_configuration");
var crypto_utils_1 = require("./crypto_utils");
var logger_1 = require("./logger");
var query_string_utils_1 = require("./query_string_utils");
var storage_1 = require("./storage");
var types_1 = require("./types");
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
                    .then(function (json) { return authorization_request_1.AuthorizationRequest.fromJson(json); })
                    .then(function (request) {
                    return _this.storageBackend.getItem(authorizationServiceConfigurationKey(handle))
                        .then(function (result) {
                        var configurationJson = JSON.parse(result);
                        var configuration = new authorization_service_configuration_1.AuthorizationServiceConfiguration(configurationJson.oauthFlowType, configurationJson.authorizationEndpoint, configurationJson.tokenEndpoint, configurationJson.revocationEndpoint, configurationJson.endSessionEndpoint, configurationJson.userInfoEndpoint);
                        // check redirect_uri and state
                        var currentUri = "" + _this.locationLike.origin + _this.locationLike.pathname;
                        var queryParams;
                        switch (configuration.oauthFlowType) {
                            case types_1.FLOW_TYPE_IMPLICIT:
                                queryParams = _this.utils.parse(_this.locationLike, true /* use hash */);
                                break;
                            case types_1.FLOW_TYPE_PKCE:
                                queryParams = _this.utils.parse(_this.locationLike, false /* use ? */);
                                break;
                            default:
                                queryParams = _this.utils.parse(_this.locationLike, true /* use hash */);
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
                                authorizationResponse = new authorization_response_1.AuthorizationResponse(code, state, idToken);
                            }
                            // cleanup state
                            return Promise
                                .all([
                                _this.storageBackend.removeItem(AUTHORIZATION_REQUEST_HANDLE_KEY),
                                _this.storageBackend.removeItem(authorizationRequestKey(handle)),
                                _this.storageBackend.removeItem(authorizationServiceConfigurationKey(handle)),
                                _this.storageBackend.setItem(types_1.AUTHORIZATION_RESPONSE_HANDLE_KEY, (authorizationResponse == null ?
                                    '' :
                                    JSON.stringify(authorizationResponse.toJson())))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQUVILGlFQUF1RjtBQUN2RixpRkFBK0g7QUFDL0gsbUVBQTZHO0FBQzdHLDZGQUErSDtBQUMvSCwrQ0FBcUU7QUFDckUsbUNBQTZCO0FBQzdCLDJEQUE2RTtBQUM3RSxxQ0FBOEQ7QUFDOUQsaUNBQTRHO0FBRzVHLHFDQUFxQztBQUNyQyxJQUFNLHVCQUF1QixHQUN6QixVQUFDLE1BQWM7SUFDYixPQUFVLE1BQU0sbUNBQWdDLENBQUM7QUFDbkQsQ0FBQyxDQUFBO0FBRUwsa0RBQWtEO0FBQ2xELElBQU0sb0NBQW9DLEdBQ3RDLFVBQUMsTUFBYztJQUNiLE9BQVUsTUFBTSxpREFBOEMsQ0FBQztBQUNqRSxDQUFDLENBQUE7QUFFTCwrRUFBK0U7QUFDL0UsSUFBTSxnQ0FBZ0MsR0FBRyx1Q0FBdUMsQ0FBQztBQUVqRjs7O0dBR0c7QUFDSDtJQUE0QywwQ0FBMkI7SUFDckU7SUFDSSxtQ0FBbUM7SUFDbkMscUVBQXFFO0lBQ3JFLDJCQUEyQjtJQUNwQixjQUEwRCxFQUNqRSxLQUFtQyxFQUM1QixZQUE0QyxFQUNuRCxjQUFxQztRQUg5QiwrQkFBQSxFQUFBLHFCQUFxQyw2QkFBbUIsRUFBRTtRQUNqRSxzQkFBQSxFQUFBLFlBQVksMENBQXFCLEVBQUU7UUFDNUIsNkJBQUEsRUFBQSxlQUE2QixNQUFNLENBQUMsUUFBUTtRQUNuRCwrQkFBQSxFQUFBLGlCQUFpQixtQ0FBb0I7UUFQekMsWUFRRSxrQkFBTSxLQUFLLEVBQUUsY0FBYyxDQUFDLFNBQzdCO1FBTFUsb0JBQWMsR0FBZCxjQUFjLENBQTRDO1FBRTFELGtCQUFZLEdBQVosWUFBWSxDQUFnQzs7SUFHdkQsQ0FBQztJQUVELDREQUEyQixHQUEzQixV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R29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdCwgQXV0aG9yaXphdGlvblJlcXVlc3RKc29ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciwgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZSwgQlVJTFRfSU5fUEFSQU1FVEVSU30gZnJvbSAnLi9hdXRob3JpemF0aW9uX3JlcXVlc3RfaGFuZGxlcic7XG5pbXBvcnQge0F1dGhvcml6YXRpb25FcnJvciwgQXV0aG9yaXphdGlvblJlc3BvbnNlLCBBdXRob3JpemF0aW9uUmVzcG9uc2VKc29ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVzcG9uc2UnXG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbiwgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uSnNvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbic7XG5pbXBvcnQge2NyeXB0b0dlbmVyYXRlUmFuZG9tLCBSYW5kb21HZW5lcmF0b3J9IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge0Jhc2ljUXVlcnlTdHJpbmdVdGlscywgUXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHtMb2NhbFN0b3JhZ2VCYWNrZW5kLCBTdG9yYWdlQmFja2VuZH0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7QVVUSE9SSVpBVElPTl9SRVNQT05TRV9IQU5ETEVfS0VZLCBGTE9XX1RZUEVfSU1QTElDSVQsIEZMT1dfVFlQRV9QS0NFLCBMb2NhdGlvbkxpa2V9IGZyb20gJy4vdHlwZXMnO1xuXG5cbi8qKiBrZXkgZm9yIGF1dGhvcml6YXRpb24gcmVxdWVzdC4gKi9cbmNvbnN0IGF1dGhvcml6YXRpb25SZXF1ZXN0S2V5ID1cbiAgICAoaGFuZGxlOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBgJHtoYW5kbGV9X2FwcGF1dGhfYXV0aG9yaXphdGlvbl9yZXF1ZXN0YDtcbiAgICB9XG5cbi8qKiBrZXkgZm9yIGF1dGhvcml6YXRpb24gc2VydmljZSBjb25maWd1cmF0aW9uICovXG5jb25zdCBhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkgPVxuICAgIChoYW5kbGU6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIGAke2hhbmRsZX1fYXBwYXV0aF9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbmA7XG4gICAgfVxuXG4vKioga2V5IGluIGxvY2FsIHN0b3JhZ2Ugd2hpY2ggcmVwcmVzZW50cyB0aGUgY3VycmVudCBhdXRob3JpemF0aW9uIHJlcXVlc3QuICovXG5jb25zdCBBVVRIT1JJWkFUSU9OX1JFUVVFU1RfSEFORExFX0tFWSA9ICdhcHBhdXRoX2N1cnJlbnRfYXV0aG9yaXphdGlvbl9yZXF1ZXN0JztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB3aGljaCB1c2VzIGEgc3RhbmRhcmRcbiAqIHJlZGlyZWN0IGJhc2VkIGNvZGUgZmxvdy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZGlyZWN0UmVxdWVzdEhhbmRsZXIgZXh0ZW5kcyBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8vIHVzZSB0aGUgcHJvdmlkZWQgc3RvcmFnZSBiYWNrZW5kXG4gICAgICAvLyBvciBpbml0aWFsaXplIGxvY2FsIHN0b3JhZ2Ugd2l0aCB0aGUgZGVmYXVsdCBzdG9yYWdlIGJhY2tlbmQgd2hpY2hcbiAgICAgIC8vIHVzZXMgd2luZG93LmxvY2FsU3RvcmFnZVxuICAgICAgcHVibGljIHN0b3JhZ2VCYWNrZW5kOiBTdG9yYWdlQmFja2VuZCA9IG5ldyBMb2NhbFN0b3JhZ2VCYWNrZW5kKCksXG4gICAgICB1dGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSxcbiAgICAgIHB1YmxpYyBsb2NhdGlvbkxpa2U6IExvY2F0aW9uTGlrZSA9IHdpbmRvdy5sb2NhdGlvbixcbiAgICAgIGdlbmVyYXRlUmFuZG9tID0gY3J5cHRvR2VuZXJhdGVSYW5kb20pIHtcbiAgICBzdXBlcih1dGlscywgZ2VuZXJhdGVSYW5kb20pO1xuICB9XG5cbiAgcGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpIHtcbiAgICBsZXQgaGFuZGxlID0gdGhpcy5nZW5lcmF0ZVJhbmRvbSgpO1xuICAgIC8vIGJlZm9yZSB5b3UgbWFrZSByZXF1ZXN0LCBwZXJzaXN0IGFsbCByZXF1ZXN0IHJlbGF0ZWQgZGF0YSBpbiBsb2NhbCBzdG9yYWdlLlxuICAgIGxldCBwZXJzaXN0ZWQgPSBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oQVVUSE9SSVpBVElPTl9SRVFVRVNUX0hBTkRMRV9LRVksIGhhbmRsZSksXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oXG4gICAgICAgICAgYXV0aG9yaXphdGlvblJlcXVlc3RLZXkoaGFuZGxlKSwgSlNPTi5zdHJpbmdpZnkocmVxdWVzdC50b0pzb24oKSkpLFxuICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKFxuICAgICAgICAgIGF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbktleShoYW5kbGUpLCBKU09OLnN0cmluZ2lmeShjb25maWd1cmF0aW9uLnRvSnNvbigpKSksXG4gICAgXSk7XG5cbiAgICBwZXJzaXN0ZWQudGhlbigoKSA9PiB7XG4gICAgICAvLyBtYWtlIHRoZSByZWRpcmVjdCByZXF1ZXN0XG4gICAgICBsZXQgdXJsID0gdGhpcy5idWlsZFJlcXVlc3RVcmwoY29uZmlndXJhdGlvbiwgcmVxdWVzdCk7XG4gICAgICBsb2coJ01ha2luZyBhIHJlcXVlc3QgdG8gJywgcmVxdWVzdCwgdXJsKTtcbiAgICAgIHRoaXMubG9jYXRpb25MaWtlLmFzc2lnbih1cmwpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGVtcHRzIHRvIGludHJvc3BlY3QgdGhlIGNvbnRlbnRzIG9mIHN0b3JhZ2UgYmFja2VuZCBhbmQgY29tcGxldGVzIHRoZVxuICAgKiByZXF1ZXN0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+IHtcbiAgICAvLyBUT0RPKHJhaHVscmF2QCk6IGhhbmRsZSBhdXRob3JpemF0aW9uIGVycm9ycy5cbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlQmFja2VuZC5nZXRJdGVtKEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZKS50aGVuKGhhbmRsZSA9PiB7XG4gICAgICBpZiAoaGFuZGxlKSB7XG4gICAgICAgIC8vIHdlIGhhdmUgYSBwZW5kaW5nIHJlcXVlc3QuXG4gICAgICAgIC8vIGZldGNoIGF1dGhvcml6YXRpb24gcmVxdWVzdCwgYW5kIGNoZWNrIHN0YXRlXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2VCYWNrZW5kXG4gICAgICAgICAgICAuZ2V0SXRlbShhdXRob3JpemF0aW9uUmVxdWVzdEtleShoYW5kbGUpKVxuICAgICAgICAgICAgLy8gcmVxdWlyZXMgYSBjb3JyZXNwb25kaW5nIGluc3RhbmNlIG9mIHJlc3VsdFxuICAgICAgICAgICAgLy8gVE9ETyhyYWh1bHJhdkApOiBjaGVjayBmb3IgaW5jb25zaXRlbnQgc3RhdGUgaGVyZVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IEpTT04ucGFyc2UocmVzdWx0ISkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IEF1dGhvcml6YXRpb25SZXF1ZXN0LmZyb21Kc29uKGpzb24pKVxuICAgICAgICAgICAgLnRoZW4ocmVxdWVzdCA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2VCYWNrZW5kLmdldEl0ZW0oYXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uS2V5KGhhbmRsZSkpXG4gICAgICAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlndXJhdGlvbkpzb24gPSBKU09OLnBhcnNlKHJlc3VsdCEpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29uZmlndXJhdGlvbiA9IG5ldyBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWd1cmF0aW9uSnNvbi5vYXV0aEZsb3dUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbkpzb24uYXV0aG9yaXphdGlvbkVuZHBvaW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhdGlvbkpzb24udG9rZW5FbmRwb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25Kc29uLnJldm9jYXRpb25FbmRwb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25Kc29uLmVuZFNlc3Npb25FbmRwb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb25Kc29uLnVzZXJJbmZvRW5kcG9pbnQpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHJlZGlyZWN0X3VyaSBhbmQgc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRVcmkgPSBgJHt0aGlzLmxvY2F0aW9uTGlrZS5vcmlnaW59JHt0aGlzLmxvY2F0aW9uTGlrZS5wYXRobmFtZX1gO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcXVlcnlQYXJhbXM7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY29uZmlndXJhdGlvbi5vYXV0aEZsb3dUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBGTE9XX1RZUEVfSU1QTElDSVQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeVBhcmFtcyA9IHRoaXMudXRpbHMucGFyc2UodGhpcy5sb2NhdGlvbkxpa2UsIHRydWUgLyogdXNlIGhhc2ggKi8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBGTE9XX1RZUEVfUEtDRTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zID0gdGhpcy51dGlscy5wYXJzZSh0aGlzLmxvY2F0aW9uTGlrZSwgZmFsc2UgLyogdXNlID8gKi8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zID0gdGhpcy51dGlscy5wYXJzZSh0aGlzLmxvY2F0aW9uTGlrZSwgdHJ1ZSAvKiB1c2UgaGFzaCAqLyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXRlOiBzdHJpbmd8dW5kZWZpbmVkID0gcXVlcnlQYXJhbXNbJ3N0YXRlJ107XG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2RlOiBzdHJpbmd8dW5kZWZpbmVkID0gcXVlcnlQYXJhbXNbJ2NvZGUnXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkVG9rZW46IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snaWRfdG9rZW4nXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yOiBzdHJpbmd8dW5kZWZpbmVkID0gcXVlcnlQYXJhbXNbJ2Vycm9yJ107XG4gICAgICAgICAgICAgICAgICAgIGxvZygnUG90ZW50aWFsIGF1dGhvcml6YXRpb24gcmVxdWVzdCAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFVyaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2hvdWxkTm90aWZ5ID0gc3RhdGUgPT09IHJlcXVlc3Quc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhdXRob3JpemF0aW9uUmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF1dGhvcml6YXRpb25FcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGwgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvdWxkTm90aWZ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWRkaXRpb25hbCBvcHRpb25hbCBpbmZvLlxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yVXJpID0gcXVlcnlQYXJhbXNbJ2Vycm9yX3VyaSddO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGVycm9yRGVzY3JpcHRpb24gPSBxdWVyeVBhcmFtc1snZXJyb3JfZGVzY3JpcHRpb24nXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25FcnJvciA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEF1dGhvcml6YXRpb25FcnJvcihlcnJvciwgZXJyb3JEZXNjcmlwdGlvbiwgZXJyb3JVcmksIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvblJlc3BvbnNlID0gbmV3IEF1dGhvcml6YXRpb25SZXNwb25zZShjb2RlLCBzdGF0ZSEsIGlkVG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHN0YXRlXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oYXV0aG9yaXphdGlvblJlcXVlc3RLZXkoaGFuZGxlKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBVVRIT1JJWkFUSU9OX1JFU1BPTlNFX0hBTkRMRV9LRVksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChhdXRob3JpemF0aW9uUmVzcG9uc2UgPT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJycgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGF1dGhvcml6YXRpb25SZXNwb25zZS50b0pzb24oKSkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nKCdEZWxpdmVyaW5nIGF1dGhvcml6YXRpb24gcmVzcG9uc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBhdXRob3JpemF0aW9uUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogYXV0aG9yaXphdGlvbkVycm9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBsb2coJ01pc21hdGNoZWQgcmVxdWVzdCAoc3RhdGUgYW5kIHJlcXVlc3RfdXJpKSBkb250IG1hdGNoLicpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19