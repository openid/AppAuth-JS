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
var end_session_request_1 = require("./end_session_request");
var end_session_request_handler_1 = require("./end_session_request_handler");
var end_session_response_1 = require("./end_session_response");
var index_1 = require("./index");
var logger_1 = require("./logger");
var query_string_utils_1 = require("./query_string_utils");
var storage_1 = require("./storage");
var types_1 = require("./types");
/** key for endsession request. */
var endSessionRequestKey = function (handle) {
    return handle + "_appauth_endsession_request";
};
/** key for authorization service configuration */
var authorizationServiceConfigurationKey = function (handle) {
    return handle + "_appauth_authorization_service_configuration";
};
/** key in local storage which represents the current endsession request. */
var ENDSESSION_REQUEST_HANDLE_KEY = 'appauth_current_endsession_request';
/**
 * Represents an EndSessionRequestHandler which uses a standard
 * redirect based code flow.
 */
var EndSessionRedirectRequestHandler = /** @class */ (function (_super) {
    __extends(EndSessionRedirectRequestHandler, _super);
    function EndSessionRedirectRequestHandler(
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
    EndSessionRedirectRequestHandler.prototype.performEndSessionRequest = function (configuration, request) {
        var _this = this;
        var handle = this.generateRandom();
        // before you make request, persist all request related data in local storage.
        var persisted = Promise.all([
            this.storageBackend.setItem(ENDSESSION_REQUEST_HANDLE_KEY, handle),
            this.storageBackend.setItem(endSessionRequestKey(handle), JSON.stringify(request.toJson())),
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
     * Attempts to introspect the contents of storage backend and completes the request.
     */
    EndSessionRedirectRequestHandler.prototype.completeEndSessionRequest = function () {
        var _this = this;
        // TODO(rahulrav@): handle endsession errors.
        return this.storageBackend.getItem(ENDSESSION_REQUEST_HANDLE_KEY).then(function (handle) {
            if (handle) {
                // we have a pending request.
                // fetch endsession request, and check state
                return _this.storageBackend
                    .getItem(endSessionRequestKey(handle))
                    // requires a corresponding instance of result
                    // TODO(rahulrav@): check for inconsitent state here
                    .then(function (result) { return JSON.parse(result); })
                    .then(function (json) { return end_session_request_1.EndSessionRequest.fromJson(json); })
                    .then(function (request) {
                    // check redirect_uri and state
                    var currentUri = "" + _this.locationLike.origin + _this.locationLike.pathname;
                    var queryParams = _this.utils.parse(_this.locationLike, false /* use hash */);
                    var state = queryParams['state'];
                    var error = queryParams['error'];
                    logger_1.log('Potential endsession request ', currentUri, queryParams, state, error);
                    var shouldNotify = state === request.state;
                    var endSessionResponse = null;
                    var endSessionError = null;
                    if (shouldNotify) {
                        if (error) {
                            // get additional optional info.
                            var errorUri = queryParams['error_uri'];
                            var errorDescription = queryParams['error_description'];
                            endSessionError = new end_session_response_1.EndSessionError(error, errorDescription, errorUri, state);
                        }
                        else {
                            endSessionResponse = new end_session_response_1.EndSessionResponse(state);
                        }
                        // cleanup state
                        return Promise
                            .all([
                            _this.storageBackend.removeItem(ENDSESSION_REQUEST_HANDLE_KEY),
                            _this.storageBackend.removeItem(endSessionRequestKey(handle)),
                            _this.storageBackend.removeItem(authorizationServiceConfigurationKey(handle)),
                            _this.storageBackend.removeItem(types_1.AUTHORIZATION_RESPONSE_HANDLE_KEY)
                        ])
                            .then(function () {
                            logger_1.log('Delivering endsession response');
                            return {
                                request: request,
                                response: endSessionResponse,
                                error: endSessionError
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
    return EndSessionRedirectRequestHandler;
}(end_session_request_handler_1.EndSessionRequestHandler));
exports.EndSessionRedirectRequestHandler = EndSessionRedirectRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbmRfc2Vzc2lvbl9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQUlILDZEQUErRTtBQUMvRSw2RUFBa0k7QUFDbEksK0RBQWtHO0FBQ2xHLGlDQUE2RDtBQUM3RCxtQ0FBNkI7QUFDN0IsMkRBQTZFO0FBQzdFLHFDQUE4QztBQUM5QyxpQ0FBbUY7QUFHbkYsa0NBQWtDO0FBQ2xDLElBQU0sb0JBQW9CLEdBQ3RCLFVBQUMsTUFBYztJQUNiLE9BQVUsTUFBTSxnQ0FBNkIsQ0FBQztBQUNoRCxDQUFDLENBQUE7QUFFTCxrREFBa0Q7QUFDbEQsSUFBTSxvQ0FBb0MsR0FDdEMsVUFBQyxNQUFjO0lBQ2IsT0FBVSxNQUFNLGlEQUE4QyxDQUFDO0FBQ2pFLENBQUMsQ0FBQTtBQUVMLDRFQUE0RTtBQUM1RSxJQUFNLDZCQUE2QixHQUFHLG9DQUFvQyxDQUFDO0FBRTNFOzs7R0FHRztBQUNIO0lBQXNELG9EQUF3QjtJQUM1RTtJQUNJLG1DQUFtQztJQUNuQyxxRUFBcUU7SUFDckUsMkJBQTJCO0lBQ3BCLGNBQTBELEVBQ2pFLEtBQW1DLEVBQzVCLFlBQTRDLEVBQ25ELGNBQXFDO1FBSDlCLCtCQUFBLEVBQUEscUJBQXFDLDZCQUFtQixFQUFFO1FBQ2pFLHNCQUFBLEVBQUEsWUFBWSwwQ0FBcUIsRUFBRTtRQUM1Qiw2QkFBQSxFQUFBLGVBQTZCLE1BQU0sQ0FBQyxRQUFRO1FBQ25ELCtCQUFBLEVBQUEsaUJBQWlCLDRCQUFvQjtRQVB6QyxZQVFFLGtCQUFNLEtBQUssRUFBRSxjQUFjLENBQUMsU0FDN0I7UUFMVSxvQkFBYyxHQUFkLGNBQWMsQ0FBNEM7UUFFMUQsa0JBQVksR0FBWixZQUFZLENBQWdDOztJQUd2RCxDQUFDO0lBRUQsbUVB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XG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sIEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbkpzb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtSYW5kb21HZW5lcmF0b3J9IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCB7RW5kU2Vzc2lvblJlcXVlc3QsIEVuZFNlc3Npb25SZXF1ZXN0SnNvbn0gZnJvbSAnLi9lbmRfc2Vzc2lvbl9yZXF1ZXN0JztcbmltcG9ydCB7RU5EU0VTU0lPTl9CVUlMVF9JTl9QQVJBTUVURVJTLCBFbmRTZXNzaW9uUmVxdWVzdEhhbmRsZXIsIEVuZFNlc3Npb25SZXF1ZXN0UmVzcG9uc2V9IGZyb20gJy4vZW5kX3Nlc3Npb25fcmVxdWVzdF9oYW5kbGVyJztcbmltcG9ydCB7RW5kU2Vzc2lvbkVycm9yLCBFbmRTZXNzaW9uUmVzcG9uc2UsIEVuZFNlc3Npb25SZXNwb25zZUpzb259IGZyb20gJy4vZW5kX3Nlc3Npb25fcmVzcG9uc2UnXG5pbXBvcnQge2NyeXB0b0dlbmVyYXRlUmFuZG9tLCBTdG9yYWdlQmFja2VuZH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMsIFF1ZXJ5U3RyaW5nVXRpbHN9IGZyb20gJy4vcXVlcnlfc3RyaW5nX3V0aWxzJztcbmltcG9ydCB7TG9jYWxTdG9yYWdlQmFja2VuZH0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7QVVUSE9SSVpBVElPTl9SRVNQT05TRV9IQU5ETEVfS0VZLCBMb2NhdGlvbkxpa2UsIFN0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cblxuLyoqIGtleSBmb3IgZW5kc2Vzc2lvbiByZXF1ZXN0LiAqL1xuY29uc3QgZW5kU2Vzc2lvblJlcXVlc3RLZXkgPVxuICAgIChoYW5kbGU6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIGAke2hhbmRsZX1fYXBwYXV0aF9lbmRzZXNzaW9uX3JlcXVlc3RgO1xuICAgIH1cblxuLyoqIGtleSBmb3IgYXV0aG9yaXphdGlvbiBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24gKi9cbmNvbnN0IGF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbktleSA9XG4gICAgKGhhbmRsZTogc3RyaW5nKSA9PiB7XG4gICAgICByZXR1cm4gYCR7aGFuZGxlfV9hcHBhdXRoX2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uYDtcbiAgICB9XG5cbi8qKiBrZXkgaW4gbG9jYWwgc3RvcmFnZSB3aGljaCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGVuZHNlc3Npb24gcmVxdWVzdC4gKi9cbmNvbnN0IEVORFNFU1NJT05fUkVRVUVTVF9IQU5ETEVfS0VZID0gJ2FwcGF1dGhfY3VycmVudF9lbmRzZXNzaW9uX3JlcXVlc3QnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gRW5kU2Vzc2lvblJlcXVlc3RIYW5kbGVyIHdoaWNoIHVzZXMgYSBzdGFuZGFyZFxuICogcmVkaXJlY3QgYmFzZWQgY29kZSBmbG93LlxuICovXG5leHBvcnQgY2xhc3MgRW5kU2Vzc2lvblJlZGlyZWN0UmVxdWVzdEhhbmRsZXIgZXh0ZW5kcyBFbmRTZXNzaW9uUmVxdWVzdEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8vIHVzZSB0aGUgcHJvdmlkZWQgc3RvcmFnZSBiYWNrZW5kXG4gICAgICAvLyBvciBpbml0aWFsaXplIGxvY2FsIHN0b3JhZ2Ugd2l0aCB0aGUgZGVmYXVsdCBzdG9yYWdlIGJhY2tlbmQgd2hpY2hcbiAgICAgIC8vIHVzZXMgd2luZG93LmxvY2FsU3RvcmFnZVxuICAgICAgcHVibGljIHN0b3JhZ2VCYWNrZW5kOiBTdG9yYWdlQmFja2VuZCA9IG5ldyBMb2NhbFN0b3JhZ2VCYWNrZW5kKCksXG4gICAgICB1dGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSxcbiAgICAgIHB1YmxpYyBsb2NhdGlvbkxpa2U6IExvY2F0aW9uTGlrZSA9IHdpbmRvdy5sb2NhdGlvbixcbiAgICAgIGdlbmVyYXRlUmFuZG9tID0gY3J5cHRvR2VuZXJhdGVSYW5kb20pIHtcbiAgICBzdXBlcih1dGlscywgZ2VuZXJhdGVSYW5kb20pO1xuICB9XG5cbiAgcGVyZm9ybUVuZFNlc3Npb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogRW5kU2Vzc2lvblJlcXVlc3QpIHtcbiAgICBsZXQgaGFuZGxlID0gdGhpcy5nZW5lcmF0ZVJhbmRvbSgpO1xuICAgIC8vIGJlZm9yZSB5b3UgbWFrZSByZXF1ZXN0LCBwZXJzaXN0IGFsbCByZXF1ZXN0IHJlbGF0ZWQgZGF0YSBpbiBsb2NhbCBzdG9yYWdlLlxuICAgIGxldCBwZXJzaXN0ZWQgPSBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oRU5EU0VTU0lPTl9SRVFVRVNUX0hBTkRMRV9LRVksIGhhbmRsZSksXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oZW5kU2Vzc2lvblJlcXVlc3RLZXkoaGFuZGxlKSwgSlNPTi5zdHJpbmdpZnkocmVxdWVzdC50b0pzb24oKSkpLFxuICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKFxuICAgICAgICAgIGF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbktleShoYW5kbGUpLCBKU09OLnN0cmluZ2lmeShjb25maWd1cmF0aW9uLnRvSnNvbigpKSksXG4gICAgXSk7XG5cbiAgICBwZXJzaXN0ZWQudGhlbigoKSA9PiB7XG4gICAgICAvLyBtYWtlIHRoZSByZWRpcmVjdCByZXF1ZXN0XG4gICAgICBsZXQgdXJsID0gdGhpcy5idWlsZFJlcXVlc3RVcmwoY29uZmlndXJhdGlvbiwgcmVxdWVzdCk7XG4gICAgICBsb2coJ01ha2luZyBhIHJlcXVlc3QgdG8gJywgcmVxdWVzdCwgdXJsKTtcbiAgICAgIHRoaXMubG9jYXRpb25MaWtlLmFzc2lnbih1cmwpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEF0dGVtcHRzIHRvIGludHJvc3BlY3QgdGhlIGNvbnRlbnRzIG9mIHN0b3JhZ2UgYmFja2VuZCBhbmQgY29tcGxldGVzIHRoZSByZXF1ZXN0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbXBsZXRlRW5kU2Vzc2lvblJlcXVlc3QoKTogUHJvbWlzZTxFbmRTZXNzaW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+IHtcbiAgICAvLyBUT0RPKHJhaHVscmF2QCk6IGhhbmRsZSBlbmRzZXNzaW9uIGVycm9ycy5cbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlQmFja2VuZC5nZXRJdGVtKEVORFNFU1NJT05fUkVRVUVTVF9IQU5ETEVfS0VZKS50aGVuKGhhbmRsZSA9PiB7XG4gICAgICBpZiAoaGFuZGxlKSB7XG4gICAgICAgIC8vIHdlIGhhdmUgYSBwZW5kaW5nIHJlcXVlc3QuXG4gICAgICAgIC8vIGZldGNoIGVuZHNlc3Npb24gcmVxdWVzdCwgYW5kIGNoZWNrIHN0YXRlXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2VCYWNrZW5kXG4gICAgICAgICAgICAuZ2V0SXRlbShlbmRTZXNzaW9uUmVxdWVzdEtleShoYW5kbGUpKVxuICAgICAgICAgICAgLy8gcmVxdWlyZXMgYSBjb3JyZXNwb25kaW5nIGluc3RhbmNlIG9mIHJlc3VsdFxuICAgICAgICAgICAgLy8gVE9ETyhyYWh1bHJhdkApOiBjaGVjayBmb3IgaW5jb25zaXRlbnQgc3RhdGUgaGVyZVxuICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IEpTT04ucGFyc2UocmVzdWx0ISkpXG4gICAgICAgICAgICAudGhlbihqc29uID0+IEVuZFNlc3Npb25SZXF1ZXN0LmZyb21Kc29uKGpzb24pKVxuICAgICAgICAgICAgLnRoZW4ocmVxdWVzdCA9PiB7XG4gICAgICAgICAgICAgIC8vIGNoZWNrIHJlZGlyZWN0X3VyaSBhbmQgc3RhdGVcbiAgICAgICAgICAgICAgbGV0IGN1cnJlbnRVcmkgPSBgJHt0aGlzLmxvY2F0aW9uTGlrZS5vcmlnaW59JHt0aGlzLmxvY2F0aW9uTGlrZS5wYXRobmFtZX1gO1xuICAgICAgICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSB0aGlzLnV0aWxzLnBhcnNlKHRoaXMubG9jYXRpb25MaWtlLCBmYWxzZSAvKiB1c2UgaGFzaCAqLyk7XG4gICAgICAgICAgICAgIGxldCBzdGF0ZTogc3RyaW5nfHVuZGVmaW5lZCA9IHF1ZXJ5UGFyYW1zWydzdGF0ZSddO1xuICAgICAgICAgICAgICBsZXQgZXJyb3I6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snZXJyb3InXTtcbiAgICAgICAgICAgICAgbG9nKCdQb3RlbnRpYWwgZW5kc2Vzc2lvbiByZXF1ZXN0ICcsIGN1cnJlbnRVcmksIHF1ZXJ5UGFyYW1zLCBzdGF0ZSwgZXJyb3IpO1xuICAgICAgICAgICAgICBsZXQgc2hvdWxkTm90aWZ5ID0gc3RhdGUgPT09IHJlcXVlc3Quc3RhdGU7XG4gICAgICAgICAgICAgIGxldCBlbmRTZXNzaW9uUmVzcG9uc2U6IEVuZFNlc3Npb25SZXNwb25zZXxudWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgbGV0IGVuZFNlc3Npb25FcnJvcjogRW5kU2Vzc2lvbkVycm9yfG51bGwgPSBudWxsO1xuICAgICAgICAgICAgICBpZiAoc2hvdWxkTm90aWZ5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAvLyBnZXQgYWRkaXRpb25hbCBvcHRpb25hbCBpbmZvLlxuICAgICAgICAgICAgICAgICAgbGV0IGVycm9yVXJpID0gcXVlcnlQYXJhbXNbJ2Vycm9yX3VyaSddO1xuICAgICAgICAgICAgICAgICAgbGV0IGVycm9yRGVzY3JpcHRpb24gPSBxdWVyeVBhcmFtc1snZXJyb3JfZGVzY3JpcHRpb24nXTtcbiAgICAgICAgICAgICAgICAgIGVuZFNlc3Npb25FcnJvciA9IG5ldyBFbmRTZXNzaW9uRXJyb3IoZXJyb3IsIGVycm9yRGVzY3JpcHRpb24sIGVycm9yVXJpLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGVuZFNlc3Npb25SZXNwb25zZSA9IG5ldyBFbmRTZXNzaW9uUmVzcG9uc2Uoc3RhdGUhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gY2xlYW51cCBzdGF0ZVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlXG4gICAgICAgICAgICAgICAgICAgIC5hbGwoW1xuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShFTkRTRVNTSU9OX1JFUVVFU1RfSEFORExFX0tFWSksXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKGVuZFNlc3Npb25SZXF1ZXN0S2V5KGhhbmRsZSkpLFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlKSksXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKEFVVEhPUklaQVRJT05fUkVTUE9OU0VfSEFORExFX0tFWSlcbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGxvZygnRGVsaXZlcmluZyBlbmRzZXNzaW9uIHJlc3BvbnNlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6IHJlcXVlc3QsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZTogZW5kU2Vzc2lvblJlc3BvbnNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVuZFNlc3Npb25FcnJvclxuICAgICAgICAgICAgICAgICAgICAgIH0gYXMgRW5kU2Vzc2lvblJlcXVlc3RSZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbG9nKCdNaXNtYXRjaGVkIHJlcXVlc3QgKHN0YXRlIGFuZCByZXF1ZXN0X3VyaSkgZG9udCBtYXRjaC4nKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=