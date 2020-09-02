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
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectRequestHandler = void 0;
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
        var handle = this.crypto.generateRandom(10);
        // before you make request, persist all request related data in local storage.
        var persisted = Promise.all([
            this.storageBackend.setItem(AUTHORIZATION_REQUEST_HANDLE_KEY, handle),
            // Calling toJson() adds in the code & challenge when possible
            request.toJson().then(function (result) {
                return _this.storageBackend.setItem(authorizationRequestKey(handle), JSON.stringify(result));
            }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxpRUFBNkQ7QUFDN0QsaUZBQTBHO0FBQzFHLG1FQUFrRjtBQUVsRiwrQ0FBcUQ7QUFDckQsbUNBQTZCO0FBQzdCLDJEQUEyRDtBQUMzRCxxQ0FBOEQ7QUFJOUQscUNBQXFDO0FBQ3JDLElBQU0sdUJBQXVCLEdBQ3pCLFVBQUMsTUFBYztJQUNiLE9BQVUsTUFBTSxtQ0FBZ0MsQ0FBQztBQUNuRCxDQUFDLENBQUE7QUFFTCxrREFBa0Q7QUFDbEQsSUFBTSxvQ0FBb0MsR0FDdEMsVUFBQyxNQUFjO0lBQ2IsT0FBVSxNQUFNLGlEQUE4QyxDQUFDO0FBQ2pFLENBQUMsQ0FBQTtBQUVMLCtFQUErRTtBQUMvRSxJQUFNLGdDQUFnQyxHQUFHLHVDQUF1QyxDQUFDO0FBRWpGOzs7R0FHRztBQUNIO0lBQTRDLDBDQUEyQjtJQUNyRTtJQUNJLG1DQUFtQztJQUNuQyxxRUFBcUU7SUFDckUsMkJBQTJCO0lBQ3BCLGNBQTBELEVBQ2pFLEtBQW1DLEVBQzVCLFlBQTRDLEVBQ25ELE1BQW9DO1FBSDdCLCtCQUFBLEVBQUEscUJBQXFDLDZCQUFtQixFQUFFO1FBQ2pFLHNCQUFBLEVBQUEsWUFBWSwwQ0FBcUIsRUFBRTtRQUM1Qiw2QkFBQSxFQUFBLGVBQTZCLE1BQU0sQ0FBQyxRQUFRO1FBQ25ELHVCQUFBLEVBQUEsYUFBcUIsNEJBQWEsRUFBRTtRQVB4QyxZQVFFLGtCQUFNLEtBQUssRUFBRSxNQUFNLENBQUMsU0FDckI7UUFMVSxvQkFBYyxHQUFkLGNBQWMsQ0FBNEM7UUFFMUQsa0JBQVksR0FBWixZQUFZLENBQWdDOztJQUd2RCxDQUFDO0lBRUQsNERBQTJCLEdBQTNCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FB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O2dCQUNMLE9BQU8sSUFBSSxDQUFDO2FBQ2I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCw2QkFBQztBQUFELENBQUMsQUF0R0QsQ0FBNEMsMkRBQTJCLEdBc0d0RTtBQXRHWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdH0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIsIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uRXJyb3IsIEF1dGhvcml6YXRpb25SZXNwb25zZX0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3Jlc3BvbnNlJ1xuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtDcnlwdG8sIERlZmF1bHRDcnlwdG99IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge0Jhc2ljUXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHtMb2NhbFN0b3JhZ2VCYWNrZW5kLCBTdG9yYWdlQmFja2VuZH0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7TG9jYXRpb25MaWtlfSBmcm9tICcuL3R5cGVzJztcblxuXG4vKioga2V5IGZvciBhdXRob3JpemF0aW9uIHJlcXVlc3QuICovXG5jb25zdCBhdXRob3JpemF0aW9uUmVxdWVzdEtleSA9XG4gICAgKGhhbmRsZTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gYCR7aGFuZGxlfV9hcHBhdXRoX2F1dGhvcml6YXRpb25fcmVxdWVzdGA7XG4gICAgfVxuXG4vKioga2V5IGZvciBhdXRob3JpemF0aW9uIHNlcnZpY2UgY29uZmlndXJhdGlvbiAqL1xuY29uc3QgYXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uS2V5ID1cbiAgICAoaGFuZGxlOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBgJHtoYW5kbGV9X2FwcGF1dGhfYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb25gO1xuICAgIH1cblxuLyoqIGtleSBpbiBsb2NhbCBzdG9yYWdlIHdoaWNoIHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgYXV0aG9yaXphdGlvbiByZXF1ZXN0LiAqL1xuY29uc3QgQVVUSE9SSVpBVElPTl9SRVFVRVNUX0hBTkRMRV9LRVkgPSAnYXBwYXV0aF9jdXJyZW50X2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIgd2hpY2ggdXNlcyBhIHN0YW5kYXJkXG4gKiByZWRpcmVjdCBiYXNlZCBjb2RlIGZsb3cuXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWRpcmVjdFJlcXVlc3RIYW5kbGVyIGV4dGVuZHMgQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICAvLyB1c2UgdGhlIHByb3ZpZGVkIHN0b3JhZ2UgYmFja2VuZFxuICAgICAgLy8gb3IgaW5pdGlhbGl6ZSBsb2NhbCBzdG9yYWdlIHdpdGggdGhlIGRlZmF1bHQgc3RvcmFnZSBiYWNrZW5kIHdoaWNoXG4gICAgICAvLyB1c2VzIHdpbmRvdy5sb2NhbFN0b3JhZ2VcbiAgICAgIHB1YmxpYyBzdG9yYWdlQmFja2VuZDogU3RvcmFnZUJhY2tlbmQgPSBuZXcgTG9jYWxTdG9yYWdlQmFja2VuZCgpLFxuICAgICAgdXRpbHMgPSBuZXcgQmFzaWNRdWVyeVN0cmluZ1V0aWxzKCksXG4gICAgICBwdWJsaWMgbG9jYXRpb25MaWtlOiBMb2NhdGlvbkxpa2UgPSB3aW5kb3cubG9jYXRpb24sXG4gICAgICBjcnlwdG86IENyeXB0byA9IG5ldyBEZWZhdWx0Q3J5cHRvKCkpIHtcbiAgICBzdXBlcih1dGlscywgY3J5cHRvKTtcbiAgfVxuXG4gIHBlcmZvcm1BdXRob3JpemF0aW9uUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0KSB7XG4gICAgY29uc3QgaGFuZGxlID0gdGhpcy5jcnlwdG8uZ2VuZXJhdGVSYW5kb20oMTApO1xuXG4gICAgLy8gYmVmb3JlIHlvdSBtYWtlIHJlcXVlc3QsIHBlcnNpc3QgYWxsIHJlcXVlc3QgcmVsYXRlZCBkYXRhIGluIGxvY2FsIHN0b3JhZ2UuXG4gICAgY29uc3QgcGVyc2lzdGVkID0gUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZLCBoYW5kbGUpLFxuICAgICAgLy8gQ2FsbGluZyB0b0pzb24oKSBhZGRzIGluIHRoZSBjb2RlICYgY2hhbGxlbmdlIHdoZW4gcG9zc2libGVcbiAgICAgIHJlcXVlc3QudG9Kc29uKCkudGhlbihcbiAgICAgICAgICByZXN1bHQgPT5cbiAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKGF1dGhvcml6YXRpb25SZXF1ZXN0S2V5KGhhbmRsZSksIEpTT04uc3RyaW5naWZ5KHJlc3VsdCkpKSxcbiAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQuc2V0SXRlbShcbiAgICAgICAgICBhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlKSwgSlNPTi5zdHJpbmdpZnkoY29uZmlndXJhdGlvbi50b0pzb24oKSkpLFxuICAgIF0pO1xuXG4gICAgcGVyc2lzdGVkLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gbWFrZSB0aGUgcmVkaXJlY3QgcmVxdWVzdFxuICAgICAgbGV0IHVybCA9IHRoaXMuYnVpbGRSZXF1ZXN0VXJsKGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpO1xuICAgICAgbG9nKCdNYWtpbmcgYSByZXF1ZXN0IHRvICcsIHJlcXVlc3QsIHVybCk7XG4gICAgICB0aGlzLmxvY2F0aW9uTGlrZS5hc3NpZ24odXJsKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRlbXB0cyB0byBpbnRyb3NwZWN0IHRoZSBjb250ZW50cyBvZiBzdG9yYWdlIGJhY2tlbmQgYW5kIGNvbXBsZXRlcyB0aGVcbiAgICogcmVxdWVzdC5cbiAgICovXG4gIHByb3RlY3RlZCBjb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0KCk6IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZXxudWxsPiB7XG4gICAgLy8gVE9ETyhyYWh1bHJhdkApOiBoYW5kbGUgYXV0aG9yaXphdGlvbiBlcnJvcnMuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZUJhY2tlbmQuZ2V0SXRlbShBVVRIT1JJWkFUSU9OX1JFUVVFU1RfSEFORExFX0tFWSkudGhlbihoYW5kbGUgPT4ge1xuICAgICAgaWYgKGhhbmRsZSkge1xuICAgICAgICAvLyB3ZSBoYXZlIGEgcGVuZGluZyByZXF1ZXN0LlxuICAgICAgICAvLyBmZXRjaCBhdXRob3JpemF0aW9uIHJlcXVlc3QsIGFuZCBjaGVjayBzdGF0ZVxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlQmFja2VuZFxuICAgICAgICAgICAgLmdldEl0ZW0oYXV0aG9yaXphdGlvblJlcXVlc3RLZXkoaGFuZGxlKSlcbiAgICAgICAgICAgIC8vIHJlcXVpcmVzIGEgY29ycmVzcG9uZGluZyBpbnN0YW5jZSBvZiByZXN1bHRcbiAgICAgICAgICAgIC8vIFRPRE8ocmFodWxyYXZAKTogY2hlY2sgZm9yIGluY29uc2l0ZW50IHN0YXRlIGhlcmVcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiBKU09OLnBhcnNlKHJlc3VsdCEpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QoanNvbikpXG4gICAgICAgICAgICAudGhlbihyZXF1ZXN0ID0+IHtcbiAgICAgICAgICAgICAgLy8gY2hlY2sgcmVkaXJlY3RfdXJpIGFuZCBzdGF0ZVxuICAgICAgICAgICAgICBsZXQgY3VycmVudFVyaSA9IGAke3RoaXMubG9jYXRpb25MaWtlLm9yaWdpbn0ke3RoaXMubG9jYXRpb25MaWtlLnBhdGhuYW1lfWA7XG4gICAgICAgICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IHRoaXMudXRpbHMucGFyc2UodGhpcy5sb2NhdGlvbkxpa2UsIHRydWUgLyogdXNlIGhhc2ggKi8pO1xuICAgICAgICAgICAgICBsZXQgc3RhdGU6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snc3RhdGUnXTtcbiAgICAgICAgICAgICAgbGV0IGNvZGU6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snY29kZSddO1xuICAgICAgICAgICAgICBsZXQgZXJyb3I6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snZXJyb3InXTtcbiAgICAgICAgICAgICAgbG9nKCdQb3RlbnRpYWwgYXV0aG9yaXphdGlvbiByZXF1ZXN0ICcsIGN1cnJlbnRVcmksIHF1ZXJ5UGFyYW1zLCBzdGF0ZSwgY29kZSwgZXJyb3IpO1xuICAgICAgICAgICAgICBsZXQgc2hvdWxkTm90aWZ5ID0gc3RhdGUgPT09IHJlcXVlc3Quc3RhdGU7XG4gICAgICAgICAgICAgIGxldCBhdXRob3JpemF0aW9uUmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgbGV0IGF1dGhvcml6YXRpb25FcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGwgPSBudWxsO1xuICAgICAgICAgICAgICBpZiAoc2hvdWxkTm90aWZ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAvLyBnZXQgYWRkaXRpb25hbCBvcHRpb25hbCBpbmZvLlxuICAgICAgICAgICAgICAgICAgbGV0IGVycm9yVXJpID0gcXVlcnlQYXJhbXNbJ2Vycm9yX3VyaSddO1xuICAgICAgICAgICAgICAgICAgbGV0IGVycm9yRGVzY3JpcHRpb24gPSBxdWVyeVBhcmFtc1snZXJyb3JfZGVzY3JpcHRpb24nXTtcbiAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25FcnJvciA9IG5ldyBBdXRob3JpemF0aW9uRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3IsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yX2Rlc2NyaXB0aW9uOiBlcnJvckRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcl91cmk6IGVycm9yVXJpLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZTogc3RhdGVcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uUmVzcG9uc2UgPSBuZXcgQXV0aG9yaXphdGlvblJlc3BvbnNlKHtjb2RlOiBjb2RlLCBzdGF0ZTogc3RhdGV9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY2xlYW51cCBzdGF0ZVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlXG4gICAgICAgICAgICAgICAgICAgIC5hbGwoW1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShBVVRIT1JJWkFUSU9OX1JFUVVFU1RfSEFORExFX0tFWSksXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKGF1dGhvcml6YXRpb25SZXF1ZXN0S2V5KGhhbmRsZSkpLFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlKSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGxvZygnRGVsaXZlcmluZyBhdXRob3JpemF0aW9uIHJlc3BvbnNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IHJlcXVlc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogYXV0aG9yaXphdGlvblJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGF1dGhvcml6YXRpb25FcnJvclxuICAgICAgICAgICAgICAgICAgICAgIH0gYXMgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nKCdNaXNtYXRjaGVkIHJlcXVlc3QgKHN0YXRlIGFuZCByZXF1ZXN0X3VyaSkgZG9udCBtYXRjaC4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=