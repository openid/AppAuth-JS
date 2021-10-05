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
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectRequestHandler = void 0;
var authorization_management_response_1 = require("./authorization_management_response");
var authorization_request_1 = require("./authorization_request");
var authorization_request_handler_1 = require("./authorization_request_handler");
var authorization_response_1 = require("./authorization_response");
var crypto_utils_1 = require("./crypto_utils");
var end_session_request_1 = require("./end_session_request");
var end_session_response_1 = require("./end_session_response");
var logger_1 = require("./logger");
var query_string_utils_1 = require("./query_string_utils");
var storage_1 = require("./storage");
var types_1 = require("./types");
/** key for authorization request. */
var requestKey = function (handle, requestType) {
    return handle + "_appauth_" + requestType + "_request";
};
/** key for authorization service configuration */
var serviceConfigurationKey = function (handle, requestType) {
    return handle + "_appauth_" + requestType + "_service_configuration";
};
/** key in local storage which represents the current authorization request. */
var REQUEST_HANDLE_KEY = function (requestType) {
    return "appauth_current_" + requestType + "_request";
};
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
        this.performRequest(configuration, request, types_1.RedirectRequestTypes.authorization);
    };
    RedirectRequestHandler.prototype.performEndSessionRequest = function (configuration, request) {
        this.performRequest(configuration, request, types_1.RedirectRequestTypes.endSession);
    };
    RedirectRequestHandler.prototype.performRequest = function (configuration, request, requestType) {
        var _this = this;
        if (requestType === void 0) { requestType = types_1.RedirectRequestTypes.authorization; }
        var handle = this.crypto.generateRandom(10);
        // before you make request, persist all request related data in local storage.
        var persisted = Promise.all([
            this.storageBackend.setItem(REQUEST_HANDLE_KEY(requestType), handle),
            // Calling toJson() adds in the code & challenge when possible
            request.toJson().then(function (result) {
                return _this.storageBackend.setItem(requestKey(handle, requestType), JSON.stringify(result));
            }),
            this.storageBackend.setItem(serviceConfigurationKey(handle, requestType), JSON.stringify(configuration.toJson())),
        ]);
        persisted.then(function () {
            // make the redirect request
            var url = _this.buildRequestUrl(configuration, request, requestType);
            logger_1.log('Making a request to ', request, url);
            _this.locationLike.assign(url);
        });
    };
    /**
     * Attempts to introspect the contents of storage backend and completes the
     *  authorization request.
     */
    RedirectRequestHandler.prototype.completeAuthorizationRequest = function () {
        return this.completeRequest(types_1.RedirectRequestTypes.authorization);
    };
    /**
     * Attempts to introspect the contents of storage backend and completes the
     * end session request.
     */
    RedirectRequestHandler.prototype.completeEndSessionRequest = function () {
        return this.completeRequest(types_1.RedirectRequestTypes.endSession);
    };
    /**
     * Attempts to introspect the contents of storage backend and completes the
     * request.
     */
    RedirectRequestHandler.prototype.completeRequest = function (requestType) {
        var _this = this;
        // TODO(rahulrav@): handle authorization errors.
        return this.storageBackend.getItem(REQUEST_HANDLE_KEY(requestType)).then(function (handle) {
            if (handle) {
                // we have a pending request.
                // fetch authorization request, and check state
                return _this.storageBackend
                    .getItem(requestKey(handle, requestType))
                    // requires a corresponding instance of result
                    // TODO(rahulrav@): check for inconsistent state here
                    .then(function (result) { return JSON.parse(result); })
                    .then(function (json) { return requestType === types_1.RedirectRequestTypes.authorization ?
                    new authorization_request_1.AuthorizationRequest(json) :
                    new end_session_request_1.EndSessionRequest(json); })
                    .then(function (request) {
                    // check redirect_uri and state
                    var currentUri = "" + _this.locationLike.origin + _this.locationLike.pathname;
                    var queryParams = _this.utils.parse(_this.locationLike, true /* use hash */);
                    var state = queryParams['state'];
                    var code = queryParams['code'];
                    var error = queryParams['error'];
                    if (requestType === types_1.RedirectRequestTypes.authorization) {
                        logger_1.log('Potential authorization request ', currentUri, queryParams, state, code, error);
                    }
                    else {
                        logger_1.log('Potential end session request ', currentUri, queryParams, state, error);
                    }
                    var shouldNotify = state === request.state;
                    var authorizationResponse = null;
                    var authorizationError = null;
                    if (shouldNotify) {
                        if (error) {
                            // get additional optional info.
                            var errorUri = queryParams['error_uri'];
                            var errorDescription = queryParams['error_description'];
                            authorizationError = new authorization_management_response_1.AuthorizationError({
                                error: error,
                                error_description: errorDescription,
                                error_uri: errorUri,
                                state: state
                            });
                        }
                        else {
                            if (requestType === types_1.RedirectRequestTypes.authorization) {
                                authorizationResponse = new authorization_response_1.AuthorizationResponse({ code: code, state: state });
                            }
                            else if (requestType === types_1.RedirectRequestTypes.endSession) {
                                authorizationResponse = new end_session_response_1.EndSessionResponse({ state: state });
                            }
                        }
                        // cleanup state
                        return Promise
                            .all([
                            _this.storageBackend.removeItem(REQUEST_HANDLE_KEY(requestType)),
                            _this.storageBackend.removeItem(requestKey(handle, requestType)),
                            _this.storageBackend.removeItem(serviceConfigurationKey(handle, requestType))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdILHlGQUF1RTtBQUN2RSxpRUFBNkQ7QUFDN0QsaUZBQTBHO0FBQzFHLG1FQUE4RDtBQUU5RCwrQ0FBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELCtEQUEwRDtBQUMxRCxtQ0FBNkI7QUFDN0IsMkRBQTJEO0FBQzNELHFDQUE4RDtBQUM5RCxpQ0FBMkQ7QUFHM0QscUNBQXFDO0FBQ3JDLElBQU0sVUFBVSxHQUNaLFVBQUMsTUFBYyxFQUFFLFdBQWlDO0lBQ2hELE9BQVUsTUFBTSxpQkFBWSxXQUFXLGFBQVUsQ0FBQztBQUNwRCxDQUFDLENBQUE7QUFFTCxrREFBa0Q7QUFDbEQsSUFBTSx1QkFBdUIsR0FDekIsVUFBQyxNQUFjLEVBQUUsV0FBaUM7SUFDaEQsT0FBVSxNQUFNLGlCQUFZLFdBQVcsMkJBQXdCLENBQUM7QUFDbEUsQ0FBQyxDQUFBO0FBRUwsK0VBQStFO0FBQy9FLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxXQUFpQztJQUN6RCxPQUFBLHFCQUFtQixXQUFXLGFBQVU7QUFBeEMsQ0FBd0MsQ0FBQztBQUU3Qzs7O0dBR0c7QUFDSDtJQUE0QywwQ0FBMkI7SUFDckU7SUFDSSxtQ0FBbUM7SUFDbkMscUVBQXFFO0lBQ3JFLDJCQUEyQjtJQUNwQixjQUEwRCxFQUNqRSxLQUFtQyxFQUM1QixZQUE0QyxFQUNuRCxNQUFvQztRQUg3QiwrQkFBQSxFQUFBLHFCQUFxQyw2QkFBbUIsRUFBRTtRQUNqRSxzQkFBQSxFQUFBLFlBQVksMENBQXFCLEVBQUU7UUFDNUIsNkJBQUEsRUFBQSxlQUE2QixNQUFNLENBQUMsUUFBUTtRQUNuRCx1QkFBQSxFQUFBLGFBQXFCLDRCQUFhLEVBQUU7UUFQeEMsWUFR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QUN6QyxPQUFPO2dDQUNMLE9BQU8sRUFBRSxPQUFPO2dDQUNoQixRQUFRLEVBQUUscUJBQXFCO2dDQUMvQixLQUFLLEVBQUUsa0JBQWtCOzZCQUNNLENBQUM7d0JBQ3BDLENBQUMsQ0FBQyxDQUFDO3FCQUNSO3lCQUFNO3dCQUNMLFlBQUcsQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO3dCQUM5RCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzlCO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ1I7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUM7YUFDYjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQW5KRCxDQUE0QywyREFBMkIsR0FtSnRFO0FBbkpZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0F1dGhvcml6YXRpb25NYW5hZ2VtZW50UmVxdWVzdH0gZnJvbSAnLi9hdXRob3JpemF0aW9uX21hbmFnZW1lbnRfcmVxdWVzdCc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25FcnJvcn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX21hbmFnZW1lbnRfcmVzcG9uc2UnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdH0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIsIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVzcG9uc2V9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXNwb25zZSdcbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7Q3J5cHRvLCBEZWZhdWx0Q3J5cHRvfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5pbXBvcnQge0VuZFNlc3Npb25SZXF1ZXN0fSBmcm9tICcuL2VuZF9zZXNzaW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtFbmRTZXNzaW9uUmVzcG9uc2V9IGZyb20gJy4vZW5kX3Nlc3Npb25fcmVzcG9uc2UnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7QmFzaWNRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuL3F1ZXJ5X3N0cmluZ191dGlscyc7XG5pbXBvcnQge0xvY2FsU3RvcmFnZUJhY2tlbmQsIFN0b3JhZ2VCYWNrZW5kfSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHtMb2NhdGlvbkxpa2UsIFJlZGlyZWN0UmVxdWVzdFR5cGVzfSBmcm9tICcuL3R5cGVzJztcblxuXG4vKioga2V5IGZvciBhdXRob3JpemF0aW9uIHJlcXVlc3QuICovXG5jb25zdCByZXF1ZXN0S2V5ID1cbiAgICAoaGFuZGxlOiBzdHJpbmcsIHJlcXVlc3RUeXBlOiBSZWRpcmVjdFJlcXVlc3RUeXBlcykgPT4ge1xuICAgICAgcmV0dXJuIGAke2hhbmRsZX1fYXBwYXV0aF8ke3JlcXVlc3RUeXBlfV9yZXF1ZXN0YDtcbiAgICB9XG5cbi8qKiBrZXkgZm9yIGF1dGhvcml6YXRpb24gc2VydmljZSBjb25maWd1cmF0aW9uICovXG5jb25zdCBzZXJ2aWNlQ29uZmlndXJhdGlvbktleSA9XG4gICAgKGhhbmRsZTogc3RyaW5nLCByZXF1ZXN0VHlwZTogUmVkaXJlY3RSZXF1ZXN0VHlwZXMpID0+IHtcbiAgICAgIHJldHVybiBgJHtoYW5kbGV9X2FwcGF1dGhfJHtyZXF1ZXN0VHlwZX1fc2VydmljZV9jb25maWd1cmF0aW9uYDtcbiAgICB9XG5cbi8qKiBrZXkgaW4gbG9jYWwgc3RvcmFnZSB3aGljaCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGF1dGhvcml6YXRpb24gcmVxdWVzdC4gKi9cbmNvbnN0IFJFUVVFU1RfSEFORExFX0tFWSA9IChyZXF1ZXN0VHlwZTogUmVkaXJlY3RSZXF1ZXN0VHlwZXMpID0+XG4gICAgYGFwcGF1dGhfY3VycmVudF8ke3JlcXVlc3RUeXBlfV9yZXF1ZXN0YDtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB3aGljaCB1c2VzIGEgc3RhbmRhcmRcbiAqIHJlZGlyZWN0IGJhc2VkIGNvZGUgZmxvdy5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlZGlyZWN0UmVxdWVzdEhhbmRsZXIgZXh0ZW5kcyBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8vIHVzZSB0aGUgcHJvdmlkZWQgc3RvcmFnZSBiYWNrZW5kXG4gICAgICAvLyBvciBpbml0aWFsaXplIGxvY2FsIHN0b3JhZ2Ugd2l0aCB0aGUgZGVmYXVsdCBzdG9yYWdlIGJhY2tlbmQgd2hpY2hcbiAgICAgIC8vIHVzZXMgd2luZG93LmxvY2FsU3RvcmFnZVxuICAgICAgcHVibGljIHN0b3JhZ2VCYWNrZW5kOiBTdG9yYWdlQmFja2VuZCA9IG5ldyBMb2NhbFN0b3JhZ2VCYWNrZW5kKCksXG4gICAgICB1dGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSxcbiAgICAgIHB1YmxpYyBsb2NhdGlvbkxpa2U6IExvY2F0aW9uTGlrZSA9IHdpbmRvdy5sb2NhdGlvbixcbiAgICAgIGNyeXB0bzogQ3J5cHRvID0gbmV3IERlZmF1bHRDcnlwdG8oKSkge1xuICAgIHN1cGVyKHV0aWxzLCBjcnlwdG8pO1xuICB9XG5cbiAgcGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpIHtcbiAgICB0aGlzLnBlcmZvcm1SZXF1ZXN0KGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QsIFJlZGlyZWN0UmVxdWVzdFR5cGVzLmF1dGhvcml6YXRpb24pO1xuICB9XG5cbiAgcGVyZm9ybUVuZFNlc3Npb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogRW5kU2Vzc2lvblJlcXVlc3QpIHtcbiAgICB0aGlzLnBlcmZvcm1SZXF1ZXN0KGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QsIFJlZGlyZWN0UmVxdWVzdFR5cGVzLmVuZFNlc3Npb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBwZXJmb3JtUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25NYW5hZ2VtZW50UmVxdWVzdCxcbiAgICAgIHJlcXVlc3RUeXBlOiBSZWRpcmVjdFJlcXVlc3RUeXBlcyA9IFJlZGlyZWN0UmVxdWVzdFR5cGVzLmF1dGhvcml6YXRpb24pIHtcbiAgICBjb25zdCBoYW5kbGUgPSB0aGlzLmNyeXB0by5nZW5lcmF0ZVJhbmRvbSgxMCk7XG5cbiAgICAvLyBiZWZvcmUgeW91IG1ha2UgcmVxdWVzdCwgcGVyc2lzdCBhbGwgcmVxdWVzdCByZWxhdGVkIGRhdGEgaW4gbG9jYWwgc3RvcmFnZS5cbiAgICBjb25zdCBwZXJzaXN0ZWQgPSBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oUkVRVUVTVF9IQU5ETEVfS0VZKHJlcXVlc3RUeXBlKSwgaGFuZGxlKSxcbiAgICAgIC8vIENhbGxpbmcgdG9Kc29uKCkgYWRkcyBpbiB0aGUgY29kZSAmIGNoYWxsZW5nZSB3aGVuIHBvc3NpYmxlXG4gICAgICByZXF1ZXN0LnRvSnNvbigpLnRoZW4oXG4gICAgICAgICAgcmVzdWx0ID0+XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQuc2V0SXRlbShyZXF1ZXN0S2V5KGhhbmRsZSwgcmVxdWVzdFR5cGUpLCBKU09OLnN0cmluZ2lmeShyZXN1bHQpKSksXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oXG4gICAgICAgICAgc2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlLCByZXF1ZXN0VHlwZSksIEpTT04uc3RyaW5naWZ5KGNvbmZpZ3VyYXRpb24udG9Kc29uKCkpKSxcbiAgICBdKTtcblxuICAgIHBlcnNpc3RlZC50aGVuKCgpID0+IHtcbiAgICAgIC8vIG1ha2UgdGhlIHJlZGlyZWN0IHJlcXVlc3RcbiAgICAgIGxldCB1cmwgPSB0aGlzLmJ1aWxkUmVxdWVzdFVybChjb25maWd1cmF0aW9uLCByZXF1ZXN0LCByZXF1ZXN0VHlwZSk7XG4gICAgICBsb2coJ01ha2luZyBhIHJlcXVlc3QgdG8gJywgcmVxdWVzdCwgdXJsKTtcbiAgICAgIHRoaXMubG9jYXRpb25MaWtlLmFzc2lnbih1cmwpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGVtcHRzIHRvIGludHJvc3BlY3QgdGhlIGNvbnRlbnRzIG9mIHN0b3JhZ2UgYmFja2VuZCBhbmQgY29tcGxldGVzIHRoZVxuICAgKiAgYXV0aG9yaXphdGlvbiByZXF1ZXN0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5jb21wbGV0ZVJlcXVlc3QoUmVkaXJlY3RSZXF1ZXN0VHlwZXMuYXV0aG9yaXphdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdHMgdG8gaW50cm9zcGVjdCB0aGUgY29udGVudHMgb2Ygc3RvcmFnZSBiYWNrZW5kIGFuZCBjb21wbGV0ZXMgdGhlXG4gICAqIGVuZCBzZXNzaW9uIHJlcXVlc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgY29tcGxldGVFbmRTZXNzaW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLmNvbXBsZXRlUmVxdWVzdChSZWRpcmVjdFJlcXVlc3RUeXBlcy5lbmRTZXNzaW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRlbXB0cyB0byBpbnRyb3NwZWN0IHRoZSBjb250ZW50cyBvZiBzdG9yYWdlIGJhY2tlbmQgYW5kIGNvbXBsZXRlcyB0aGVcbiAgICogcmVxdWVzdC5cbiAgICovXG4gIHByaXZhdGUgY29tcGxldGVSZXF1ZXN0KHJlcXVlc3RUeXBlOiBSZWRpcmVjdFJlcXVlc3RUeXBlcykge1xuICAgIC8vIFRPRE8ocmFodWxyYXZAKTogaGFuZGxlIGF1dGhvcml6YXRpb24gZXJyb3JzLlxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VCYWNrZW5kLmdldEl0ZW0oUkVRVUVTVF9IQU5ETEVfS0VZKHJlcXVlc3RUeXBlKSkudGhlbihoYW5kbGUgPT4ge1xuICAgICAgaWYgKGhhbmRsZSkge1xuICAgICAgICAvLyB3ZSBoYXZlIGEgcGVuZGluZyByZXF1ZXN0LlxuICAgICAgICAvLyBmZXRjaCBhdXRob3JpemF0aW9uIHJlcXVlc3QsIGFuZCBjaGVjayBzdGF0ZVxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlQmFja2VuZFxuICAgICAgICAgICAgLmdldEl0ZW0ocmVxdWVzdEtleShoYW5kbGUsIHJlcXVlc3RUeXBlKSlcbiAgICAgICAgICAgIC8vIHJlcXVpcmVzIGEgY29ycmVzcG9uZGluZyBpbnN0YW5jZSBvZiByZXN1bHRcbiAgICAgICAgICAgIC8vIFRPRE8ocmFodWxyYXZAKTogY2hlY2sgZm9yIGluY29uc2lzdGVudCBzdGF0ZSBoZXJlXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gSlNPTi5wYXJzZShyZXN1bHQhKSlcbiAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAgIGpzb24gPT4gcmVxdWVzdFR5cGUgPT09IFJlZGlyZWN0UmVxdWVzdFR5cGVzLmF1dGhvcml6YXRpb24gP1xuICAgICAgICAgICAgICAgICAgICBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QoanNvbikgOlxuICAgICAgICAgICAgICAgICAgICBuZXcgRW5kU2Vzc2lvblJlcXVlc3QoanNvbikpXG4gICAgICAgICAgICAudGhlbihyZXF1ZXN0ID0+IHtcbiAgICAgICAgICAgICAgLy8gY2hlY2sgcmVkaXJlY3RfdXJpIGFuZCBzdGF0ZVxuICAgICAgICAgICAgICBsZXQgY3VycmVudFVyaSA9IGAke3RoaXMubG9jYXRpb25MaWtlLm9yaWdpbn0ke3RoaXMubG9jYXRpb25MaWtlLnBhdGhuYW1lfWA7XG4gICAgICAgICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IHRoaXMudXRpbHMucGFyc2UodGhpcy5sb2NhdGlvbkxpa2UsIHRydWUgLyogdXNlIGhhc2ggKi8pO1xuICAgICAgICAgICAgICBsZXQgc3RhdGU6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snc3RhdGUnXTtcbiAgICAgICAgICAgICAgbGV0IGNvZGU6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snY29kZSddO1xuICAgICAgICAgICAgICBsZXQgZXJyb3I6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snZXJyb3InXTtcbiAgICAgICAgICAgICAgaWYgKHJlcXVlc3RUeXBlID09PSBSZWRpcmVjdFJlcXVlc3RUeXBlcy5hdXRob3JpemF0aW9uKSB7XG4gICAgICAgICAgICAgICAgbG9nKCdQb3RlbnRpYWwgYXV0aG9yaXphdGlvbiByZXF1ZXN0ICcsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRVcmksXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5UGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgY29kZSxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZygnUG90ZW50aWFsIGVuZCBzZXNzaW9uIHJlcXVlc3QgJywgY3VycmVudFVyaSwgcXVlcnlQYXJhbXMsIHN0YXRlLCBlcnJvcilcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsZXQgc2hvdWxkTm90aWZ5ID0gc3RhdGUgPT09IHJlcXVlc3Quc3RhdGU7XG4gICAgICAgICAgICAgIGxldCBhdXRob3JpemF0aW9uUmVzcG9uc2U6IEVuZFNlc3Npb25SZXNwb25zZXxBdXRob3JpemF0aW9uUmVzcG9uc2V8bnVsbCA9IG51bGw7XG4gICAgICAgICAgICAgIGxldCBhdXRob3JpemF0aW9uRXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgaWYgKHNob3VsZE5vdGlmeSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgLy8gZ2V0IGFkZGl0aW9uYWwgb3B0aW9uYWwgaW5mby5cbiAgICAgICAgICAgICAgICAgIGxldCBlcnJvclVyaSA9IHF1ZXJ5UGFyYW1zWydlcnJvcl91cmknXTtcbiAgICAgICAgICAgICAgICAgIGxldCBlcnJvckRlc2NyaXB0aW9uID0gcXVlcnlQYXJhbXNbJ2Vycm9yX2Rlc2NyaXB0aW9uJ107XG4gICAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uRXJyb3IgPSBuZXcgQXV0aG9yaXphdGlvbkVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVycm9yLFxuICAgICAgICAgICAgICAgICAgICBlcnJvcl9kZXNjcmlwdGlvbjogZXJyb3JEZXNjcmlwdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JfdXJpOiBlcnJvclVyaSxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGU6IHN0YXRlXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RUeXBlID09PSBSZWRpcmVjdFJlcXVlc3RUeXBlcy5hdXRob3JpemF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25SZXNwb25zZSA9IG5ldyBBdXRob3JpemF0aW9uUmVzcG9uc2Uoe2NvZGU6IGNvZGUsIHN0YXRlOiBzdGF0ZX0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChyZXF1ZXN0VHlwZSA9PT0gUmVkaXJlY3RSZXF1ZXN0VHlwZXMuZW5kU2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uUmVzcG9uc2UgPSBuZXcgRW5kU2Vzc2lvblJlc3BvbnNlKHtzdGF0ZTogc3RhdGV9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHN0YXRlXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKFJFUVVFU1RfSEFORExFX0tFWShyZXF1ZXN0VHlwZSkpLFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShyZXF1ZXN0S2V5KGhhbmRsZSwgcmVxdWVzdFR5cGUpKSxcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oc2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlLCByZXF1ZXN0VHlwZSkpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBsb2coJ0RlbGl2ZXJpbmcgYXV0aG9yaXphdGlvbiByZXNwb25zZScpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGF1dGhvcml6YXRpb25SZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBhdXRob3JpemF0aW9uRXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICB9IGFzIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZygnTWlzbWF0Y2hlZCByZXF1ZXN0IChzdGF0ZSBhbmQgcmVxdWVzdF91cmkpIGRvbnQgbWF0Y2guJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19