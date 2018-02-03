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
var index_1 = require("./index");
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
        if (generateRandom === void 0) { generateRandom = index_1.cryptoGenerateRandom; }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQUVILGlFQUF1RjtBQUN2RixpRkFBK0g7QUFDL0gsbUVBQTZHO0FBRzdHLGlDQUE2RDtBQUM3RCxtQ0FBNkI7QUFDN0IsMkRBQTZFO0FBQzdFLHFDQUE4QztBQUk5QyxxQ0FBcUM7QUFDckMsSUFBTSx1QkFBdUIsR0FDekIsVUFBQyxNQUFjO0lBQ2IsTUFBTSxDQUFJLE1BQU0sbUNBQWdDLENBQUM7QUFDbkQsQ0FBQyxDQUFBO0FBRUwsa0RBQWtEO0FBQ2xELElBQU0sb0NBQW9DLEdBQ3RDLFVBQUMsTUFBYztJQUNiLE1BQU0sQ0FBSSxNQUFNLGlEQUE4QyxDQUFDO0FBQ2pFLENBQUMsQ0FBQTtBQUVMLCtFQUErRTtBQUMvRSxJQUFNLGdDQUFnQyxHQUFHLHVDQUF1QyxDQUFDO0FBRWpGOzs7R0FHRztBQUNIO0lBQTRDLDBDQUEyQjtJQUNyRTtJQUNJLG1DQUFtQztJQUNuQyxxRUFBcUU7SUFDckUsMkJBQTJCO0lBQ3BCLGNBQTBELEVBQ2pFLEtBQW1DLEVBQzVCLFlBQTRDLEVBQ25ELGNBQXFDO1FBSDlCLCtCQUFBLEVBQUEscUJBQXFDLDZCQUFtQixFQUFFO1FBQ2pFLHNCQUFBLEVBQUEsWUFBWSwwQ0FBcUIsRUFBRTtRQUM1Qiw2QkFBQSxFQUFBLGVBQTZCLE1BQU0sQ0FBQyxRQUFRO1FBQ25ELCtCQUFBLEVBQUEsaUJBQWlCLDRCQUFvQjtRQVB6QyxZQVFFLGtCQUFNLEtBQUssRUFBRSxjQUFjLENBQUMsU0FDN0I7UUFMVSxvQkFBYyxHQUFkLGNBQWMsQ0FBNEM7UUFFMUQsa0JBQVksR0FBWixZQUFZLENBQWdDOztJQUd2RCxDQUFDO0lBRUQsNERBQTJCLEdBQTNCLFVBQ0ksYUFBZ0QsRUFDaEQs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QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBL0ZELENBQTRDLDJEQUEyQixHQStGdEU7QUEvRlksd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3QsIEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIsIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2UsIEJVSUxUX0lOX1BBUkFNRVRFUlN9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uRXJyb3IsIEF1dGhvcml6YXRpb25SZXNwb25zZSwgQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3Jlc3BvbnNlJ1xuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sIEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbkpzb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtSYW5kb21HZW5lcmF0b3J9IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCB7Y3J5cHRvR2VuZXJhdGVSYW5kb20sIFN0b3JhZ2VCYWNrZW5kfSBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge0Jhc2ljUXVlcnlTdHJpbmdVdGlscywgUXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHtMb2NhbFN0b3JhZ2VCYWNrZW5kfSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHtMb2NhdGlvbkxpa2UsIFN0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cblxuLyoqIGtleSBmb3IgYXV0aG9yaXphdGlvbiByZXF1ZXN0LiAqL1xuY29uc3QgYXV0aG9yaXphdGlvblJlcXVlc3RLZXkgPVxuICAgIChoYW5kbGU6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIGAke2hhbmRsZX1fYXBwYXV0aF9hdXRob3JpemF0aW9uX3JlcXVlc3RgO1xuICAgIH1cblxuLyoqIGtleSBmb3IgYXV0aG9yaXphdGlvbiBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24gKi9cbmNvbnN0IGF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbktleSA9XG4gICAgKGhhbmRsZTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gYCR7aGFuZGxlfV9hcHBhdXRoX2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uYDtcbiAgICB9XG5cbi8qKiBrZXkgaW4gbG9jYWwgc3RvcmFnZSB3aGljaCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGF1dGhvcml6YXRpb24gcmVxdWVzdC4gKi9cbmNvbnN0IEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZID0gJ2FwcGF1dGhfY3VycmVudF9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHdoaWNoIHVzZXMgYSBzdGFuZGFyZFxuICogcmVkaXJlY3QgYmFzZWQgY29kZSBmbG93LlxuICovXG5leHBvcnQgY2xhc3MgUmVkaXJlY3RSZXF1ZXN0SGFuZGxlciBleHRlbmRzIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLy8gdXNlIHRoZSBwcm92aWRlZCBzdG9yYWdlIGJhY2tlbmRcbiAgICAgIC8vIG9yIGluaXRpYWxpemUgbG9jYWwgc3RvcmFnZSB3aXRoIHRoZSBkZWZhdWx0IHN0b3JhZ2UgYmFja2VuZCB3aGljaFxuICAgICAgLy8gdXNlcyB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgICBwdWJsaWMgc3RvcmFnZUJhY2tlbmQ6IFN0b3JhZ2VCYWNrZW5kID0gbmV3IExvY2FsU3RvcmFnZUJhY2tlbmQoKSxcbiAgICAgIHV0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpLFxuICAgICAgcHVibGljIGxvY2F0aW9uTGlrZTogTG9jYXRpb25MaWtlID0gd2luZG93LmxvY2F0aW9uLFxuICAgICAgZ2VuZXJhdGVSYW5kb20gPSBjcnlwdG9HZW5lcmF0ZVJhbmRvbSkge1xuICAgIHN1cGVyKHV0aWxzLCBnZW5lcmF0ZVJhbmRvbSk7XG4gIH1cblxuICBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCkge1xuICAgIGxldCBoYW5kbGUgPSB0aGlzLmdlbmVyYXRlUmFuZG9tKCk7XG4gICAgLy8gYmVmb3JlIHlvdSBtYWtlIHJlcXVlc3QsIHBlcnNpc3QgYWxsIHJlcXVlc3QgcmVsYXRlZCBkYXRhIGluIGxvY2FsIHN0b3JhZ2UuXG4gICAgbGV0IHBlcnNpc3RlZCA9IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQuc2V0SXRlbShBVVRIT1JJWkFUSU9OX1JFUVVFU1RfSEFORExFX0tFWSwgaGFuZGxlKSxcbiAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQuc2V0SXRlbShcbiAgICAgICAgICBhdXRob3JpemF0aW9uUmVxdWVzdEtleShoYW5kbGUpLCBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LnRvSnNvbigpKSksXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oXG4gICAgICAgICAgYXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uS2V5KGhhbmRsZSksIEpTT04uc3RyaW5naWZ5KGNvbmZpZ3VyYXRpb24udG9Kc29uKCkpKSxcbiAgICBdKTtcblxuICAgIHBlcnNpc3RlZC50aGVuKCgpID0+IHtcbiAgICAgIC8vIG1ha2UgdGhlIHJlZGlyZWN0IHJlcXVlc3RcbiAgICAgIGxldCB1cmwgPSB0aGlzLmJ1aWxkUmVxdWVzdFVybChjb25maWd1cmF0aW9uLCByZXF1ZXN0KTtcbiAgICAgIGxvZygnTWFraW5nIGEgcmVxdWVzdCB0byAnLCByZXF1ZXN0LCB1cmwpO1xuICAgICAgdGhpcy5sb2NhdGlvbkxpa2UuYXNzaWduKHVybCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdHMgdG8gaW50cm9zcGVjdCB0aGUgY29udGVudHMgb2Ygc3RvcmFnZSBiYWNrZW5kIGFuZCBjb21wbGV0ZXMgdGhlXG4gICAqIHJlcXVlc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD4ge1xuICAgIC8vIFRPRE8ocmFodWxyYXZAKTogaGFuZGxlIGF1dGhvcml6YXRpb24gZXJyb3JzLlxuICAgIHJldHVybiB0aGlzLnN0b3JhZ2VCYWNrZW5kLmdldEl0ZW0oQVVUSE9SSVpBVElPTl9SRVFVRVNUX0hBTkRMRV9LRVkpLnRoZW4oaGFuZGxlID0+IHtcbiAgICAgIGlmIChoYW5kbGUpIHtcbiAgICAgICAgLy8gd2UgaGF2ZSBhIHBlbmRpbmcgcmVxdWVzdC5cbiAgICAgICAgLy8gZmV0Y2ggYXV0aG9yaXphdGlvbiByZXF1ZXN0LCBhbmQgY2hlY2sgc3RhdGVcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZUJhY2tlbmRcbiAgICAgICAgICAgIC5nZXRJdGVtKGF1dGhvcml6YXRpb25SZXF1ZXN0S2V5KGhhbmRsZSkpXG4gICAgICAgICAgICAvLyByZXF1aXJlcyBhIGNvcnJlc3BvbmRpbmcgaW5zdGFuY2Ugb2YgcmVzdWx0XG4gICAgICAgICAgICAvLyBUT0RPKHJhaHVscmF2QCk6IGNoZWNrIGZvciBpbmNvbnNpdGVudCBzdGF0ZSBoZXJlXG4gICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gSlNPTi5wYXJzZShyZXN1bHQhKSlcbiAgICAgICAgICAgIC50aGVuKGpzb24gPT4gQXV0aG9yaXphdGlvblJlcXVlc3QuZnJvbUpzb24oanNvbikpXG4gICAgICAgICAgICAudGhlbihyZXF1ZXN0ID0+IHtcbiAgICAgICAgICAgICAgLy8gY2hlY2sgcmVkaXJlY3RfdXJpIGFuZCBzdGF0ZVxuICAgICAgICAgICAgICBsZXQgY3VycmVudFVyaSA9IGAke3RoaXMubG9jYXRpb25MaWtlLm9yaWdpbn0ke3RoaXMubG9jYXRpb25MaWtlLnBhdGhuYW1lfWA7XG4gICAgICAgICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IHRoaXMudXRpbHMucGFyc2UodGhpcy5sb2NhdGlvbkxpa2UsIHRydWUgLyogdXNlIGhhc2ggKi8pO1xuICAgICAgICAgICAgICBsZXQgc3RhdGU6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snc3RhdGUnXTtcbiAgICAgICAgICAgICAgbGV0IGNvZGU6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snY29kZSddO1xuICAgICAgICAgICAgICBsZXQgZXJyb3I6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snZXJyb3InXTtcbiAgICAgICAgICAgICAgbG9nKCdQb3RlbnRpYWwgYXV0aG9yaXphdGlvbiByZXF1ZXN0ICcsIGN1cnJlbnRVcmksIHF1ZXJ5UGFyYW1zLCBzdGF0ZSwgY29kZSwgZXJyb3IpO1xuICAgICAgICAgICAgICBsZXQgc2hvdWxkTm90aWZ5ID0gc3RhdGUgPT09IHJlcXVlc3Quc3RhdGU7XG4gICAgICAgICAgICAgIGxldCBhdXRob3JpemF0aW9uUmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgbGV0IGF1dGhvcml6YXRpb25FcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGwgPSBudWxsO1xuICAgICAgICAgICAgICBpZiAoc2hvdWxkTm90aWZ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAvLyBnZXQgYWRkaXRpb25hbCBvcHRpb25hbCBpbmZvLlxuICAgICAgICAgICAgICAgICAgbGV0IGVycm9yVXJpID0gcXVlcnlQYXJhbXNbJ2Vycm9yX3VyaSddO1xuICAgICAgICAgICAgICAgICAgbGV0IGVycm9yRGVzY3JpcHRpb24gPSBxdWVyeVBhcmFtc1snZXJyb3JfZGVzY3JpcHRpb24nXTtcbiAgICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25FcnJvciA9XG4gICAgICAgICAgICAgICAgICAgICAgbmV3IEF1dGhvcml6YXRpb25FcnJvcihlcnJvciwgZXJyb3JEZXNjcmlwdGlvbiwgZXJyb3JVcmksIHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvblJlc3BvbnNlID0gbmV3IEF1dGhvcml6YXRpb25SZXNwb25zZShjb2RlLCBzdGF0ZSEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHN0YXRlXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKEFVVEhPUklaQVRJT05fUkVRVUVTVF9IQU5ETEVfS0VZKSxcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oYXV0aG9yaXphdGlvblJlcXVlc3RLZXkoaGFuZGxlKSksXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKGF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbktleShoYW5kbGUpKVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgbG9nKCdEZWxpdmVyaW5nIGF1dGhvcml6YXRpb24gcmVzcG9uc2UnKTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlOiBhdXRob3JpemF0aW9uUmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogYXV0aG9yaXphdGlvbkVycm9yXG4gICAgICAgICAgICAgICAgICAgICAgfSBhcyBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2coJ01pc21hdGNoZWQgcmVxdWVzdCAoc3RhdGUgYW5kIHJlcXVlc3RfdXJpKSBkb250IG1hdGNoLicpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==