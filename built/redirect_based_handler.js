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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxpRUFBNkQ7QUFDN0QsaUZBQTBHO0FBQzFHLG1FQUFrRjtBQUVsRiwrQ0FBcUQ7QUFDckQsbUNBQTZCO0FBQzdCLDJEQUEyRDtBQUMzRCxxQ0FBOEQ7QUFJOUQscUNBQXFDO0FBQ3JDLElBQU0sdUJBQXVCLEdBQ3pCLFVBQUMsTUFBYztJQUNiLE9BQVUsTUFBTSxtQ0FBZ0MsQ0FBQztBQUNuRCxDQUFDLENBQUE7QUFFTCxrREFBa0Q7QUFDbEQsSUFBTSxvQ0FBb0MsR0FDdEMsVUFBQyxNQUFjO0lBQ2IsT0FBVSxNQUFNLGlEQUE4QyxDQUFDO0FBQ2pFLENBQUMsQ0FBQTtBQUVMLCtFQUErRTtBQUMvRSxJQUFNLGdDQUFnQyxHQUFHLHVDQUF1QyxDQUFDO0FBRWpGOzs7R0FHRztBQUNIO0lBQTRDLDBDQUEyQjtJQUNyRTtJQUNJLG1DQUFtQztJQUNuQyxxRUFBcUU7SUFDckUsMkJBQTJCO0lBQ3BCLGNBQTBELEVBQ2pFLEtBQW1DLEVBQzVCLFlBQTRDLEVBQ25ELE1BQW9DO1FBSDdCLCtCQUFBLEVBQUEscUJBQXFDLDZCQUFtQixFQUFFO1FBQ2pFLHNCQUFBLEVBQUEsWUFBWSwwQ0FBcUIsRUFBRTtRQUM1Qiw2QkFBQSxFQUFBLGVBQTZCLE1BQU0sQ0FBQyxRQUFRO1FBQ25ELHVCQUFBLEVBQUEsYUFBcUIsNEJBQWEsRUFBRTtRQVB4QyxZQVFFLGtCQUFNLEtBQUssRUFBRSxNQUFNLENBQUMsU0FDckI7UUFMVSxvQkFBYyxHQUFkLGNBQWMsQ0FBNEM7UUFFMUQsa0JBQVksR0FBWixZQUFZLENBQWdDOztJQUd2RCxDQUFDO0lBRUQsNERBQTJCLEdBQTNCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FB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O2dCQUNMLE9BQU8sSUFBSSxDQUFDO2FBQ2I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCw2QkFBQztBQUFELENBQUMsQUF0R0QsQ0FBNEMsMkRBQTJCLEdBc0d0RTtBQXRHWSx3REFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3R9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0JztcclxuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIsIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXInO1xyXG5pbXBvcnQge0F1dGhvcml6YXRpb25FcnJvciwgQXV0aG9yaXphdGlvblJlc3BvbnNlfSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVzcG9uc2UnXHJcbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHtDcnlwdG8sIERlZmF1bHRDcnlwdG99IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcclxuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcclxuaW1wb3J0IHtCYXNpY1F1ZXJ5U3RyaW5nVXRpbHN9IGZyb20gJy4vcXVlcnlfc3RyaW5nX3V0aWxzJztcclxuaW1wb3J0IHtMb2NhbFN0b3JhZ2VCYWNrZW5kLCBTdG9yYWdlQmFja2VuZH0gZnJvbSAnLi9zdG9yYWdlJztcclxuaW1wb3J0IHtMb2NhdGlvbkxpa2V9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuXHJcbi8qKiBrZXkgZm9yIGF1dGhvcml6YXRpb24gcmVxdWVzdC4gKi9cclxuY29uc3QgYXV0aG9yaXphdGlvblJlcXVlc3RLZXkgPVxyXG4gICAgKGhhbmRsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgIHJldHVybiBgJHtoYW5kbGV9X2FwcGF1dGhfYXV0aG9yaXphdGlvbl9yZXF1ZXN0YDtcclxuICAgIH1cclxuXHJcbi8qKiBrZXkgZm9yIGF1dGhvcml6YXRpb24gc2VydmljZSBjb25maWd1cmF0aW9uICovXHJcbmNvbnN0IGF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbktleSA9XHJcbiAgICAoaGFuZGxlOiBzdHJpbmcpID0+IHtcclxuICAgICAgcmV0dXJuIGAke2hhbmRsZX1fYXBwYXV0aF9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbmA7XHJcbiAgICB9XHJcblxyXG4vKioga2V5IGluIGxvY2FsIHN0b3JhZ2Ugd2hpY2ggcmVwcmVzZW50cyB0aGUgY3VycmVudCBhdXRob3JpemF0aW9uIHJlcXVlc3QuICovXHJcbmNvbnN0IEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZID0gJ2FwcGF1dGhfY3VycmVudF9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYW4gQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHdoaWNoIHVzZXMgYSBzdGFuZGFyZFxyXG4gKiByZWRpcmVjdCBiYXNlZCBjb2RlIGZsb3cuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgUmVkaXJlY3RSZXF1ZXN0SGFuZGxlciBleHRlbmRzIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIC8vIHVzZSB0aGUgcHJvdmlkZWQgc3RvcmFnZSBiYWNrZW5kXHJcbiAgICAgIC8vIG9yIGluaXRpYWxpemUgbG9jYWwgc3RvcmFnZSB3aXRoIHRoZSBkZWZhdWx0IHN0b3JhZ2UgYmFja2VuZCB3aGljaFxyXG4gICAgICAvLyB1c2VzIHdpbmRvdy5sb2NhbFN0b3JhZ2VcclxuICAgICAgcHVibGljIHN0b3JhZ2VCYWNrZW5kOiBTdG9yYWdlQmFja2VuZCA9IG5ldyBMb2NhbFN0b3JhZ2VCYWNrZW5kKCksXHJcbiAgICAgIHV0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpLFxyXG4gICAgICBwdWJsaWMgbG9jYXRpb25MaWtlOiBMb2NhdGlvbkxpa2UgPSB3aW5kb3cubG9jYXRpb24sXHJcbiAgICAgIGNyeXB0bzogQ3J5cHRvID0gbmV3IERlZmF1bHRDcnlwdG8oKSkge1xyXG4gICAgc3VwZXIodXRpbHMsIGNyeXB0byk7XHJcbiAgfVxyXG5cclxuICBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoXHJcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcclxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpIHtcclxuICAgIGNvbnN0IGhhbmRsZSA9IHRoaXMuY3J5cHRvLmdlbmVyYXRlUmFuZG9tKDEwKTtcclxuXHJcbiAgICAvLyBiZWZvcmUgeW91IG1ha2UgcmVxdWVzdCwgcGVyc2lzdCBhbGwgcmVxdWVzdCByZWxhdGVkIGRhdGEgaW4gbG9jYWwgc3RvcmFnZS5cclxuICAgIGNvbnN0IHBlcnNpc3RlZCA9IFByb21pc2UuYWxsKFtcclxuICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZLCBoYW5kbGUpLFxyXG4gICAgICAvLyBDYWxsaW5nIHRvSnNvbigpIGFkZHMgaW4gdGhlIGNvZGUgJiBjaGFsbGVuZ2Ugd2hlbiBwb3NzaWJsZVxyXG4gICAgICByZXF1ZXN0LnRvSnNvbigpLnRoZW4oXHJcbiAgICAgICAgICByZXN1bHQgPT5cclxuICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oYXV0aG9yaXphdGlvblJlcXVlc3RLZXkoaGFuZGxlKSwgSlNPTi5zdHJpbmdpZnkocmVzdWx0KSkpLFxyXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oXHJcbiAgICAgICAgICBhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlKSwgSlNPTi5zdHJpbmdpZnkoY29uZmlndXJhdGlvbi50b0pzb24oKSkpLFxyXG4gICAgXSk7XHJcblxyXG4gICAgcGVyc2lzdGVkLnRoZW4oKCkgPT4ge1xyXG4gICAgICAvLyBtYWtlIHRoZSByZWRpcmVjdCByZXF1ZXN0XHJcbiAgICAgIGxldCB1cmwgPSB0aGlzLmJ1aWxkUmVxdWVzdFVybChjb25maWd1cmF0aW9uLCByZXF1ZXN0KTtcclxuICAgICAgbG9nKCdNYWtpbmcgYSByZXF1ZXN0IHRvICcsIHJlcXVlc3QsIHVybCk7XHJcbiAgICAgIHRoaXMubG9jYXRpb25MaWtlLmFzc2lnbih1cmwpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBdHRlbXB0cyB0byBpbnRyb3NwZWN0IHRoZSBjb250ZW50cyBvZiBzdG9yYWdlIGJhY2tlbmQgYW5kIGNvbXBsZXRlcyB0aGVcclxuICAgKiByZXF1ZXN0LlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBjb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0KCk6IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZXxudWxsPiB7XHJcbiAgICAvLyBUT0RPKHJhaHVscmF2QCk6IGhhbmRsZSBhdXRob3JpemF0aW9uIGVycm9ycy5cclxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VCYWNrZW5kLmdldEl0ZW0oQVVUSE9SSVpBVElPTl9SRVFVRVNUX0hBTkRMRV9LRVkpLnRoZW4oaGFuZGxlID0+IHtcclxuICAgICAgaWYgKGhhbmRsZSkge1xyXG4gICAgICAgIC8vIHdlIGhhdmUgYSBwZW5kaW5nIHJlcXVlc3QuXHJcbiAgICAgICAgLy8gZmV0Y2ggYXV0aG9yaXphdGlvbiByZXF1ZXN0LCBhbmQgY2hlY2sgc3RhdGVcclxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlQmFja2VuZFxyXG4gICAgICAgICAgICAuZ2V0SXRlbShhdXRob3JpemF0aW9uUmVxdWVzdEtleShoYW5kbGUpKVxyXG4gICAgICAgICAgICAvLyByZXF1aXJlcyBhIGNvcnJlc3BvbmRpbmcgaW5zdGFuY2Ugb2YgcmVzdWx0XHJcbiAgICAgICAgICAgIC8vIFRPRE8ocmFodWxyYXZAKTogY2hlY2sgZm9yIGluY29uc2l0ZW50IHN0YXRlIGhlcmVcclxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IEpTT04ucGFyc2UocmVzdWx0ISkpXHJcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4gbmV3IEF1dGhvcml6YXRpb25SZXF1ZXN0KGpzb24pKVxyXG4gICAgICAgICAgICAudGhlbihyZXF1ZXN0ID0+IHtcclxuICAgICAgICAgICAgICAvLyBjaGVjayByZWRpcmVjdF91cmkgYW5kIHN0YXRlXHJcbiAgICAgICAgICAgICAgbGV0IGN1cnJlbnRVcmkgPSBgJHt0aGlzLmxvY2F0aW9uTGlrZS5vcmlnaW59JHt0aGlzLmxvY2F0aW9uTGlrZS5wYXRobmFtZX1gO1xyXG4gICAgICAgICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IHRoaXMudXRpbHMucGFyc2UodGhpcy5sb2NhdGlvbkxpa2UsIHRydWUgLyogdXNlIGhhc2ggKi8pO1xyXG4gICAgICAgICAgICAgIGxldCBzdGF0ZTogc3RyaW5nfHVuZGVmaW5lZCA9IHF1ZXJ5UGFyYW1zWydzdGF0ZSddO1xyXG4gICAgICAgICAgICAgIGxldCBjb2RlOiBzdHJpbmd8dW5kZWZpbmVkID0gcXVlcnlQYXJhbXNbJ2NvZGUnXTtcclxuICAgICAgICAgICAgICBsZXQgZXJyb3I6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snZXJyb3InXTtcclxuICAgICAgICAgICAgICBsb2coJ1BvdGVudGlhbCBhdXRob3JpemF0aW9uIHJlcXVlc3QgJywgY3VycmVudFVyaSwgcXVlcnlQYXJhbXMsIHN0YXRlLCBjb2RlLCBlcnJvcik7XHJcbiAgICAgICAgICAgICAgbGV0IHNob3VsZE5vdGlmeSA9IHN0YXRlID09PSByZXF1ZXN0LnN0YXRlO1xyXG4gICAgICAgICAgICAgIGxldCBhdXRob3JpemF0aW9uUmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsID0gbnVsbDtcclxuICAgICAgICAgICAgICBsZXQgYXV0aG9yaXphdGlvbkVycm9yOiBBdXRob3JpemF0aW9uRXJyb3J8bnVsbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgaWYgKHNob3VsZE5vdGlmeSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgIC8vIGdldCBhZGRpdGlvbmFsIG9wdGlvbmFsIGluZm8uXHJcbiAgICAgICAgICAgICAgICAgIGxldCBlcnJvclVyaSA9IHF1ZXJ5UGFyYW1zWydlcnJvcl91cmknXTtcclxuICAgICAgICAgICAgICAgICAgbGV0IGVycm9yRGVzY3JpcHRpb24gPSBxdWVyeVBhcmFtc1snZXJyb3JfZGVzY3JpcHRpb24nXTtcclxuICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVycm9yID0gbmV3IEF1dGhvcml6YXRpb25FcnJvcih7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yX2Rlc2NyaXB0aW9uOiBlcnJvckRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yX3VyaTogZXJyb3JVcmksXHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlXHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvblJlc3BvbnNlID0gbmV3IEF1dGhvcml6YXRpb25SZXNwb25zZSh7Y29kZTogY29kZSwgc3RhdGU6IHN0YXRlfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHN0YXRlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZVxyXG4gICAgICAgICAgICAgICAgICAgIC5hbGwoW1xyXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZKSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShhdXRob3JpemF0aW9uUmVxdWVzdEtleShoYW5kbGUpKSxcclxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlKSlcclxuICAgICAgICAgICAgICAgICAgICBdKVxyXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgIGxvZygnRGVsaXZlcmluZyBhdXRob3JpemF0aW9uIHJlc3BvbnNlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogYXV0aG9yaXphdGlvblJlc3BvbnNlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogYXV0aG9yaXphdGlvbkVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGFzIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxvZygnTWlzbWF0Y2hlZCByZXF1ZXN0IChzdGF0ZSBhbmQgcmVxdWVzdF91cmkpIGRvbnQgbWF0Y2guJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=