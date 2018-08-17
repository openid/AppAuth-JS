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
                            authorizationError =
                                new authorization_response_1.AuthorizationError(error, errorDescription, errorUri, state);
                        }
                        else {
                            authorizationResponse = new authorization_response_1.AuthorizationResponse(code, state);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQUVILGlFQUF1RjtBQUN2RixpRkFBK0g7QUFDL0gsbUVBQTZHO0FBRTdHLCtDQUFxRTtBQUNyRSxtQ0FBNkI7QUFDN0IsMkRBQTZFO0FBQzdFLHFDQUE4RDtBQUk5RCxxQ0FBcUM7QUFDckMsSUFBTSx1QkFBdUIsR0FDekIsVUFBQyxNQUFjO0lBQ2IsT0FBVSxNQUFNLG1DQUFnQyxDQUFDO0FBQ25ELENBQUMsQ0FBQTtBQUVMLGtEQUFrRDtBQUNsRCxJQUFNLG9DQUFvQyxHQUN0QyxVQUFDLE1BQWM7SUFDYixPQUFVLE1BQU0saURBQThDLENBQUM7QUFDakUsQ0FBQyxDQUFBO0FBRUwsK0VBQStFO0FBQy9FLElBQU0sZ0NBQWdDLEdBQUcsdUNBQXVDLENBQUM7QUFFakY7OztHQUdHO0FBQ0g7SUFBNEMsMENBQTJCO0lBQ3JFO0lBQ0ksbUNBQW1DO0lBQ25DLHFFQUFxRTtJQUNyRSwyQkFBMkI7SUFDcEIsY0FBMEQsRUFDakUsS0FBbUMsRUFDNUIsWUFBNEMsRUFDbkQsY0FBcUM7UUFIOUIsK0JBQUEsRUFBQSxxQkFBcUMsNkJBQW1CLEVBQUU7UUFDakUsc0JBQUEsRUFBQSxZQUFZLDBDQUFxQixFQUFFO1FBQzVCLDZCQUFBLEVBQUEsZUFBNkIsTUFBTSxDQUFDLFFBQVE7UUFDbkQsK0JBQUEsRUFBQSxpQkFBaUIsbUNBQW9CO1FBUHpDLFlBUUUsa0JBQU0sS0FBSyxFQUFFLGNBQWMsQ0FBQyxTQUM3QjtRQUxVLG9CQUFjLEdBQWQsY0FBYyxDQUE0QztRQUUxRCxrQkFBWSxHQUFaLFlBQVksQ0FBZ0M7O0lBR3ZELENBQUM7SUFFRCw0REFBMkIsR0FBM0IsVUFDSSxhQUFnRCxFQUNoRCxPQUE2QjtRQUZq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biAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdCwgQXV0aG9yaXphdGlvblJlcXVlc3RKc29ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XHJcbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyLCBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlLCBCVUlMVF9JTl9QQVJBTUVURVJTfSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVxdWVzdF9oYW5kbGVyJztcclxuaW1wb3J0IHtBdXRob3JpemF0aW9uRXJyb3IsIEF1dGhvcml6YXRpb25SZXNwb25zZSwgQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3Jlc3BvbnNlJ1xyXG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbiwgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uSnNvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbic7XHJcbmltcG9ydCB7Y3J5cHRvR2VuZXJhdGVSYW5kb20sIFJhbmRvbUdlbmVyYXRvcn0gZnJvbSAnLi9jcnlwdG9fdXRpbHMnO1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xyXG5pbXBvcnQge0Jhc2ljUXVlcnlTdHJpbmdVdGlscywgUXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xyXG5pbXBvcnQge0xvY2FsU3RvcmFnZUJhY2tlbmQsIFN0b3JhZ2VCYWNrZW5kfSBmcm9tICcuL3N0b3JhZ2UnO1xyXG5pbXBvcnQge0xvY2F0aW9uTGlrZSwgU3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcclxuXHJcblxyXG4vKioga2V5IGZvciBhdXRob3JpemF0aW9uIHJlcXVlc3QuICovXHJcbmNvbnN0IGF1dGhvcml6YXRpb25SZXF1ZXN0S2V5ID1cclxuICAgIChoYW5kbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICByZXR1cm4gYCR7aGFuZGxlfV9hcHBhdXRoX2F1dGhvcml6YXRpb25fcmVxdWVzdGA7XHJcbiAgICB9XHJcblxyXG4vKioga2V5IGZvciBhdXRob3JpemF0aW9uIHNlcnZpY2UgY29uZmlndXJhdGlvbiAqL1xyXG5jb25zdCBhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkgPVxyXG4gICAgKGhhbmRsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHJldHVybiBgJHtoYW5kbGV9X2FwcGF1dGhfYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb25gO1xyXG4gICAgfVxyXG5cclxuLyoqIGtleSBpbiBsb2NhbCBzdG9yYWdlIHdoaWNoIHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgYXV0aG9yaXphdGlvbiByZXF1ZXN0LiAqL1xyXG5jb25zdCBBVVRIT1JJWkFUSU9OX1JFUVVFU1RfSEFORExFX0tFWSA9ICdhcHBhdXRoX2N1cnJlbnRfYXV0aG9yaXphdGlvbl9yZXF1ZXN0JztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB3aGljaCB1c2VzIGEgc3RhbmRhcmRcclxuICogcmVkaXJlY3QgYmFzZWQgY29kZSBmbG93LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFJlZGlyZWN0UmVxdWVzdEhhbmRsZXIgZXh0ZW5kcyBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICAvLyB1c2UgdGhlIHByb3ZpZGVkIHN0b3JhZ2UgYmFja2VuZFxyXG4gICAgICAvLyBvciBpbml0aWFsaXplIGxvY2FsIHN0b3JhZ2Ugd2l0aCB0aGUgZGVmYXVsdCBzdG9yYWdlIGJhY2tlbmQgd2hpY2hcclxuICAgICAgLy8gdXNlcyB3aW5kb3cubG9jYWxTdG9yYWdlXHJcbiAgICAgIHB1YmxpYyBzdG9yYWdlQmFja2VuZDogU3RvcmFnZUJhY2tlbmQgPSBuZXcgTG9jYWxTdG9yYWdlQmFja2VuZCgpLFxyXG4gICAgICB1dGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSxcclxuICAgICAgcHVibGljIGxvY2F0aW9uTGlrZTogTG9jYXRpb25MaWtlID0gd2luZG93LmxvY2F0aW9uLFxyXG4gICAgICBnZW5lcmF0ZVJhbmRvbSA9IGNyeXB0b0dlbmVyYXRlUmFuZG9tKSB7XHJcbiAgICBzdXBlcih1dGlscywgZ2VuZXJhdGVSYW5kb20pO1xyXG4gIH1cclxuXHJcbiAgcGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KFxyXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXHJcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0KSB7XHJcbiAgICBsZXQgaGFuZGxlID0gdGhpcy5nZW5lcmF0ZVJhbmRvbSgpO1xyXG4gICAgLy8gYmVmb3JlIHlvdSBtYWtlIHJlcXVlc3QsIHBlcnNpc3QgYWxsIHJlcXVlc3QgcmVsYXRlZCBkYXRhIGluIGxvY2FsIHN0b3JhZ2UuXHJcbiAgICBsZXQgcGVyc2lzdGVkID0gUHJvbWlzZS5hbGwoW1xyXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oQVVUSE9SSVpBVElPTl9SRVFVRVNUX0hBTkRMRV9LRVksIGhhbmRsZSksXHJcbiAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQuc2V0SXRlbShcclxuICAgICAgICAgIGF1dGhvcml6YXRpb25SZXF1ZXN0S2V5KGhhbmRsZSksIEpTT04uc3RyaW5naWZ5KHJlcXVlc3QudG9Kc29uKCkpKSxcclxuICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKFxyXG4gICAgICAgICAgYXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uS2V5KGhhbmRsZSksIEpTT04uc3RyaW5naWZ5KGNvbmZpZ3VyYXRpb24udG9Kc29uKCkpKSxcclxuICAgIF0pO1xyXG5cclxuICAgIHBlcnNpc3RlZC50aGVuKCgpID0+IHtcclxuICAgICAgLy8gbWFrZSB0aGUgcmVkaXJlY3QgcmVxdWVzdFxyXG4gICAgICBsZXQgdXJsID0gdGhpcy5idWlsZFJlcXVlc3RVcmwoY29uZmlndXJhdGlvbiwgcmVxdWVzdCk7XHJcbiAgICAgIGxvZygnTWFraW5nIGEgcmVxdWVzdCB0byAnLCByZXF1ZXN0LCB1cmwpO1xyXG4gICAgICB0aGlzLmxvY2F0aW9uTGlrZS5hc3NpZ24odXJsKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQXR0ZW1wdHMgdG8gaW50cm9zcGVjdCB0aGUgY29udGVudHMgb2Ygc3RvcmFnZSBiYWNrZW5kIGFuZCBjb21wbGV0ZXMgdGhlXHJcbiAgICogcmVxdWVzdC5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD4ge1xyXG4gICAgLy8gVE9ETyhyYWh1bHJhdkApOiBoYW5kbGUgYXV0aG9yaXphdGlvbiBlcnJvcnMuXHJcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlQmFja2VuZC5nZXRJdGVtKEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZKS50aGVuKGhhbmRsZSA9PiB7XHJcbiAgICAgIGlmIChoYW5kbGUpIHtcclxuICAgICAgICAvLyB3ZSBoYXZlIGEgcGVuZGluZyByZXF1ZXN0LlxyXG4gICAgICAgIC8vIGZldGNoIGF1dGhvcml6YXRpb24gcmVxdWVzdCwgYW5kIGNoZWNrIHN0YXRlXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZUJhY2tlbmRcclxuICAgICAgICAgICAgLmdldEl0ZW0oYXV0aG9yaXphdGlvblJlcXVlc3RLZXkoaGFuZGxlKSlcclxuICAgICAgICAgICAgLy8gcmVxdWlyZXMgYSBjb3JyZXNwb25kaW5nIGluc3RhbmNlIG9mIHJlc3VsdFxyXG4gICAgICAgICAgICAvLyBUT0RPKHJhaHVscmF2QCk6IGNoZWNrIGZvciBpbmNvbnNpdGVudCBzdGF0ZSBoZXJlXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiBKU09OLnBhcnNlKHJlc3VsdCEpKVxyXG4gICAgICAgICAgICAudGhlbihqc29uID0+IEF1dGhvcml6YXRpb25SZXF1ZXN0LmZyb21Kc29uKGpzb24pKVxyXG4gICAgICAgICAgICAudGhlbihyZXF1ZXN0ID0+IHtcclxuICAgICAgICAgICAgICAvLyBjaGVjayByZWRpcmVjdF91cmkgYW5kIHN0YXRlXHJcbiAgICAgICAgICAgICAgbGV0IGN1cnJlbnRVcmkgPSBgJHt0aGlzLmxvY2F0aW9uTGlrZS5vcmlnaW59JHt0aGlzLmxvY2F0aW9uTGlrZS5wYXRobmFtZX1gO1xyXG4gICAgICAgICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IHRoaXMudXRpbHMucGFyc2UodGhpcy5sb2NhdGlvbkxpa2UsIHRydWUgLyogdXNlIGhhc2ggKi8pO1xyXG4gICAgICAgICAgICAgIGxldCBzdGF0ZTogc3RyaW5nfHVuZGVmaW5lZCA9IHF1ZXJ5UGFyYW1zWydzdGF0ZSddO1xyXG4gICAgICAgICAgICAgIGxldCBjb2RlOiBzdHJpbmd8dW5kZWZpbmVkID0gcXVlcnlQYXJhbXNbJ2NvZGUnXTtcclxuICAgICAgICAgICAgICBsZXQgZXJyb3I6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snZXJyb3InXTtcclxuICAgICAgICAgICAgICBsb2coJ1BvdGVudGlhbCBhdXRob3JpemF0aW9uIHJlcXVlc3QgJywgY3VycmVudFVyaSwgcXVlcnlQYXJhbXMsIHN0YXRlLCBjb2RlLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgbGV0IHNob3VsZE5vdGlmeSA9IHN0YXRlID09PSByZXF1ZXN0LnN0YXRlO1xyXG4gICAgICAgICAgICAgIGxldCBhdXRob3JpemF0aW9uUmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsID0gbnVsbDtcclxuICAgICAgICAgICAgICBsZXQgYXV0aG9yaXphdGlvbkVycm9yOiBBdXRob3JpemF0aW9uRXJyb3J8bnVsbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgaWYgKHNob3VsZE5vdGlmeSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIGdldCBhZGRpdGlvbmFsIG9wdGlvbmFsIGluZm8uXHJcbiAgICAgICAgICAgICAgICAgIGxldCBlcnJvclVyaSA9IHF1ZXJ5UGFyYW1zWydlcnJvcl91cmknXTtcclxuICAgICAgICAgICAgICAgICAgbGV0IGVycm9yRGVzY3JpcHRpb24gPSBxdWVyeVBhcmFtc1snZXJyb3JfZGVzY3JpcHRpb24nXTtcclxuICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVycm9yID1cclxuICAgICAgICAgICAgICAgICAgICAgIG5ldyBBdXRob3JpemF0aW9uRXJyb3IoZXJyb3IsIGVycm9yRGVzY3JpcHRpb24sIGVycm9yVXJpLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uUmVzcG9uc2UgPSBuZXcgQXV0aG9yaXphdGlvblJlc3BvbnNlKGNvZGUsIHN0YXRlISk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHN0YXRlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbGwoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZKSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShhdXRob3JpemF0aW9uUmVxdWVzdEtleShoYW5kbGUpKSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlKSlcclxuICAgICAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGxvZygnRGVsaXZlcmluZyBhdXRob3JpemF0aW9uIHJlc3BvbnNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogYXV0aG9yaXphdGlvblJlc3BvbnNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogYXV0aG9yaXphdGlvbkVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGFzIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxvZygnTWlzbWF0Y2hlZCByZXF1ZXN0IChzdGF0ZSBhbmQgcmVxdWVzdF91cmkpIGRvbnQgbWF0Y2guJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=