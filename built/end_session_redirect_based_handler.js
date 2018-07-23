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
     * Attempts to introspect the contents of storage backend and completes the
     * request.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbmRfc2Vzc2lvbl9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQUlILDZEQUErRTtBQUMvRSw2RUFBa0k7QUFDbEksK0RBQWtHO0FBQ2xHLGlDQUE2RDtBQUM3RCxtQ0FBNkI7QUFDN0IsMkRBQTZFO0FBQzdFLHFDQUE4QztBQUM5QyxpQ0FBbUY7QUFHbkYsa0NBQWtDO0FBQ2xDLElBQU0sb0JBQW9CLEdBQ3RCLFVBQUMsTUFBYztJQUNiLE9BQVUsTUFBTSxnQ0FBNkIsQ0FBQztBQUNoRCxDQUFDLENBQUE7QUFFTCxrREFBa0Q7QUFDbEQsSUFBTSxvQ0FBb0MsR0FDdEMsVUFBQyxNQUFjO0lBQ2IsT0FBVSxNQUFNLGlEQUE4QyxDQUFDO0FBQ2pFLENBQUMsQ0FBQTtBQUVMLDRFQUE0RTtBQUM1RSxJQUFNLDZCQUE2QixHQUFHLG9DQUFvQyxDQUFDO0FBRTNFOzs7R0FHRztBQUNIO0lBQXNELG9EQUF3QjtJQUM1RTtJQUNJLG1DQUFtQztJQUNuQyxxRUFBcUU7SUFDckUsMkJBQTJCO0lBQ3BCLGNBQTBELEVBQ2pFLEtBQW1DLEVBQzVCLFlBQTRDLEVBQ25ELGNBQXFDO1FBSDlCLCtCQUFBLEVBQUEscUJBQXFDLDZCQUFtQixFQUFFO1FBQ2pFLHNCQUFBLEVBQUEsWUFBWSwwQ0FBcUIsRUFBRTtRQUM1Qiw2QkFBQSxFQUFBLGVBQTZCLE1BQU0sQ0FBQyxRQUFRO1FBQ25ELCtCQUFBLEVBQUEsaUJBQWlCLDRCQUFvQjtRQVB6QyxZQVFFLGtCQUFNLEtBQUssRUFBRSxjQUFjLENBQUMsU0FDN0I7UUFMVSxvQkFBYyxHQUFkLGNBQWMsQ0FBNEM7UUFFMUQsa0JBQVksR0FBWixZQUFZLENBQWdDOztJQUd2RCxDQUFDO0lBRUQsbUVBQXdCLEdBQXhCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBMEI7UUFGOUIsaUJBa0JDO1FBZkMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ25DLDhFQUE4RTtRQUM5RSxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQzFCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLDZCQUE2QixFQUFFLE1BQU0sQ0FBQztZQUNsRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1lBQzNGLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUN2QixvQ0FBb0MsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQzFGLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDYiw0QkFBNEI7WUFDNUIsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkQsWUFBRyxDQUFDLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxQyxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDTyxvRUFBeUIsR0FBbkM7UUFBQSxpQkF3REM7UUF2REMsNkNBQTZDO1FBQzdDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQzNFLElBQUksTUFBTSxFQUFFO2dCQUNWLDZCQUE2QjtnQkFDN0IsNENBQTRDO2dCQUM1QyxPQUFPLEtBQUksQ0FBQyxjQUFjO3FCQUNyQixPQUFPLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ3RDLDhDQUE4QztvQkFDOUMsb0RBQW9EO3FCQUNuRCxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU8sQ0FBQyxFQUFuQixDQUFtQixDQUFDO3FCQUNuQyxJQUFJLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSx1Q0FBaUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQWhDLENBQWdDLENBQUM7cUJBQzlDLElBQUksQ0FBQyxVQUFBLE9BQU87b0JBQ1gsK0JBQStCO29CQUMvQixJQUFJLFVBQVUsR0FBRyxLQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxZQUFZLENBQUMsUUFBVSxDQUFDO29CQUM1RSxJQUFJLFdBQVcsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDNUUsSUFBSSxLQUFLLEdBQXFCLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxLQUFLLEdBQXFCLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbkQsWUFBRyxDQUFDLCtCQUErQixFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUM1RSxJQUFJLFlBQVksR0FBRyxLQUFLLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFDM0MsSUFBSSxrQkFBa0IsR0FBNEIsSUFBSSxDQUFDO29CQUN2RCxJQUFJLGVBQWUsR0FBeUIsSUFBSSxDQUFDO29CQUNqRCxJQUFJLFlBQVksRUFBRTt3QkFDaEIsSUFBSSxLQUFLLEVBQUU7NEJBQ1QsZ0NBQWdDOzRCQUNoQyxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7NEJBQ3hDLElBQUksZ0JBQWdCLEdBQUcsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUM7NEJBQ3hELGVBQWUsR0FBRyxJQUFJLHNDQUFlLENBQUMsS0FBSyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQzt5QkFDakY7NkJBQU07NEJBQ0wsa0JBQWtCLEdBQUcsSUFBSSx5Q0FBa0IsQ0FBQyxLQUFNLENBQUMsQ0FBQzt5QkFDckQ7d0JBQ0QsZ0JBQWdCO3dCQUNoQixPQUFPLE9BQU87NkJBQ1QsR0FBRyxDQUFDOzRCQUNILEtBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLDZCQUE2QixDQUFDOzRCQUM3RCxLQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDNUQsS0FBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsb0NBQW9DLENBQUMsTUFBTSxDQUFDLENBQUM7NEJBQzVFLEtBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLHlDQUFpQyxDQUFDO3lCQUNsRSxDQUFDOzZCQUNELElBQUksQ0FBQzs0QkFDSixZQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQzs0QkFDdEMsT0FBTztnQ0FDTCxPQUFPLEVBQUUsT0FBTztnQ0FDaEIsUUFBUSxFQUFFLGtCQUFrQjtnQ0FDNUIsS0FBSyxFQUFFLGVBQWU7NkJBQ00sQ0FBQzt3QkFDakMsQ0FBQyxDQUFDLENBQUM7cUJBQ1I7eUJBQU07d0JBQ0wsWUFBRyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7d0JBQzlELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDOUI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDUjtpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQzthQUNiO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsdUNBQUM7QUFBRCxDQUFDLEFBN0ZELENBQXNELHNEQUF3QixHQTZGN0U7QUE3RlksNEVBQWdDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25Kc29ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7UmFuZG9tR2VuZXJhdG9yfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5pbXBvcnQge0VuZFNlc3Npb25SZXF1ZXN0LCBFbmRTZXNzaW9uUmVxdWVzdEpzb259IGZyb20gJy4vZW5kX3Nlc3Npb25fcmVxdWVzdCc7XG5pbXBvcnQge0VORFNFU1NJT05fQlVJTFRfSU5fUEFSQU1FVEVSUywgRW5kU2Vzc2lvblJlcXVlc3RIYW5kbGVyLCBFbmRTZXNzaW9uUmVxdWVzdFJlc3BvbnNlfSBmcm9tICcuL2VuZF9zZXNzaW9uX3JlcXVlc3RfaGFuZGxlcic7XG5pbXBvcnQge0VuZFNlc3Npb25FcnJvciwgRW5kU2Vzc2lvblJlc3BvbnNlLCBFbmRTZXNzaW9uUmVzcG9uc2VKc29ufSBmcm9tICcuL2VuZF9zZXNzaW9uX3Jlc3BvbnNlJ1xuaW1wb3J0IHtjcnlwdG9HZW5lcmF0ZVJhbmRvbSwgU3RvcmFnZUJhY2tlbmR9IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7QmFzaWNRdWVyeVN0cmluZ1V0aWxzLCBRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuL3F1ZXJ5X3N0cmluZ191dGlscyc7XG5pbXBvcnQge0xvY2FsU3RvcmFnZUJhY2tlbmR9IGZyb20gJy4vc3RvcmFnZSc7XG5pbXBvcnQge0FVVEhPUklaQVRJT05fUkVTUE9OU0VfSEFORExFX0tFWSwgTG9jYXRpb25MaWtlLCBTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xuXG5cbi8qKiBrZXkgZm9yIGVuZHNlc3Npb24gcmVxdWVzdC4gKi9cbmNvbnN0IGVuZFNlc3Npb25SZXF1ZXN0S2V5ID1cbiAgICAoaGFuZGxlOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiBgJHtoYW5kbGV9X2FwcGF1dGhfZW5kc2Vzc2lvbl9yZXF1ZXN0YDtcbiAgICB9XG5cbi8qKiBrZXkgZm9yIGF1dGhvcml6YXRpb24gc2VydmljZSBjb25maWd1cmF0aW9uICovXG5jb25zdCBhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkgPVxuICAgIChoYW5kbGU6IHN0cmluZykgPT4ge1xuICAgICAgcmV0dXJuIGAke2hhbmRsZX1fYXBwYXV0aF9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbmA7XG4gICAgfVxuXG4vKioga2V5IGluIGxvY2FsIHN0b3JhZ2Ugd2hpY2ggcmVwcmVzZW50cyB0aGUgY3VycmVudCBlbmRzZXNzaW9uIHJlcXVlc3QuICovXG5jb25zdCBFTkRTRVNTSU9OX1JFUVVFU1RfSEFORExFX0tFWSA9ICdhcHBhdXRoX2N1cnJlbnRfZW5kc2Vzc2lvbl9yZXF1ZXN0JztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEVuZFNlc3Npb25SZXF1ZXN0SGFuZGxlciB3aGljaCB1c2VzIGEgc3RhbmRhcmRcbiAqIHJlZGlyZWN0IGJhc2VkIGNvZGUgZmxvdy5cbiAqL1xuZXhwb3J0IGNsYXNzIEVuZFNlc3Npb25SZWRpcmVjdFJlcXVlc3RIYW5kbGVyIGV4dGVuZHMgRW5kU2Vzc2lvblJlcXVlc3RIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICAvLyB1c2UgdGhlIHByb3ZpZGVkIHN0b3JhZ2UgYmFja2VuZFxuICAgICAgLy8gb3IgaW5pdGlhbGl6ZSBsb2NhbCBzdG9yYWdlIHdpdGggdGhlIGRlZmF1bHQgc3RvcmFnZSBiYWNrZW5kIHdoaWNoXG4gICAgICAvLyB1c2VzIHdpbmRvdy5sb2NhbFN0b3JhZ2VcbiAgICAgIHB1YmxpYyBzdG9yYWdlQmFja2VuZDogU3RvcmFnZUJhY2tlbmQgPSBuZXcgTG9jYWxTdG9yYWdlQmFja2VuZCgpLFxuICAgICAgdXRpbHMgPSBuZXcgQmFzaWNRdWVyeVN0cmluZ1V0aWxzKCksXG4gICAgICBwdWJsaWMgbG9jYXRpb25MaWtlOiBMb2NhdGlvbkxpa2UgPSB3aW5kb3cubG9jYXRpb24sXG4gICAgICBnZW5lcmF0ZVJhbmRvbSA9IGNyeXB0b0dlbmVyYXRlUmFuZG9tKSB7XG4gICAgc3VwZXIodXRpbHMsIGdlbmVyYXRlUmFuZG9tKTtcbiAgfVxuXG4gIHBlcmZvcm1FbmRTZXNzaW9uUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IEVuZFNlc3Npb25SZXF1ZXN0KSB7XG4gICAgbGV0IGhhbmRsZSA9IHRoaXMuZ2VuZXJhdGVSYW5kb20oKTtcbiAgICAvLyBiZWZvcmUgeW91IG1ha2UgcmVxdWVzdCwgcGVyc2lzdCBhbGwgcmVxdWVzdCByZWxhdGVkIGRhdGEgaW4gbG9jYWwgc3RvcmFnZS5cbiAgICBsZXQgcGVyc2lzdGVkID0gUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKEVORFNFU1NJT05fUkVRVUVTVF9IQU5ETEVfS0VZLCBoYW5kbGUpLFxuICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5zZXRJdGVtKGVuZFNlc3Npb25SZXF1ZXN0S2V5KGhhbmRsZSksIEpTT04uc3RyaW5naWZ5KHJlcXVlc3QudG9Kc29uKCkpKSxcbiAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQuc2V0SXRlbShcbiAgICAgICAgICBhdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlKSwgSlNPTi5zdHJpbmdpZnkoY29uZmlndXJhdGlvbi50b0pzb24oKSkpLFxuICAgIF0pO1xuXG4gICAgcGVyc2lzdGVkLnRoZW4oKCkgPT4ge1xuICAgICAgLy8gbWFrZSB0aGUgcmVkaXJlY3QgcmVxdWVzdFxuICAgICAgbGV0IHVybCA9IHRoaXMuYnVpbGRSZXF1ZXN0VXJsKGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpO1xuICAgICAgbG9nKCdNYWtpbmcgYSByZXF1ZXN0IHRvICcsIHJlcXVlc3QsIHVybCk7XG4gICAgICB0aGlzLmxvY2F0aW9uTGlrZS5hc3NpZ24odXJsKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBdHRlbXB0cyB0byBpbnRyb3NwZWN0IHRoZSBjb250ZW50cyBvZiBzdG9yYWdlIGJhY2tlbmQgYW5kIGNvbXBsZXRlcyB0aGVcbiAgICogcmVxdWVzdC5cbiAgICovXG4gIHByb3RlY3RlZCBjb21wbGV0ZUVuZFNlc3Npb25SZXF1ZXN0KCk6IFByb21pc2U8RW5kU2Vzc2lvblJlcXVlc3RSZXNwb25zZXxudWxsPiB7XG4gICAgLy8gVE9ETyhyYWh1bHJhdkApOiBoYW5kbGUgZW5kc2Vzc2lvbiBlcnJvcnMuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZUJhY2tlbmQuZ2V0SXRlbShFTkRTRVNTSU9OX1JFUVVFU1RfSEFORExFX0tFWSkudGhlbihoYW5kbGUgPT4ge1xuICAgICAgaWYgKGhhbmRsZSkge1xuICAgICAgICAvLyB3ZSBoYXZlIGEgcGVuZGluZyByZXF1ZXN0LlxuICAgICAgICAvLyBmZXRjaCBlbmRzZXNzaW9uIHJlcXVlc3QsIGFuZCBjaGVjayBzdGF0ZVxuICAgICAgICByZXR1cm4gdGhpcy5zdG9yYWdlQmFja2VuZFxuICAgICAgICAgICAgLmdldEl0ZW0oZW5kU2Vzc2lvblJlcXVlc3RLZXkoaGFuZGxlKSlcbiAgICAgICAgICAgIC8vIHJlcXVpcmVzIGEgY29ycmVzcG9uZGluZyBpbnN0YW5jZSBvZiByZXN1bHRcbiAgICAgICAgICAgIC8vIFRPRE8ocmFodWxyYXZAKTogY2hlY2sgZm9yIGluY29uc2l0ZW50IHN0YXRlIGhlcmVcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiBKU09OLnBhcnNlKHJlc3VsdCEpKVxuICAgICAgICAgICAgLnRoZW4oanNvbiA9PiBFbmRTZXNzaW9uUmVxdWVzdC5mcm9tSnNvbihqc29uKSlcbiAgICAgICAgICAgIC50aGVuKHJlcXVlc3QgPT4ge1xuICAgICAgICAgICAgICAvLyBjaGVjayByZWRpcmVjdF91cmkgYW5kIHN0YXRlXG4gICAgICAgICAgICAgIGxldCBjdXJyZW50VXJpID0gYCR7dGhpcy5sb2NhdGlvbkxpa2Uub3JpZ2lufSR7dGhpcy5sb2NhdGlvbkxpa2UucGF0aG5hbWV9YDtcbiAgICAgICAgICAgICAgbGV0IHF1ZXJ5UGFyYW1zID0gdGhpcy51dGlscy5wYXJzZSh0aGlzLmxvY2F0aW9uTGlrZSwgZmFsc2UgLyogdXNlIGhhc2ggKi8pO1xuICAgICAgICAgICAgICBsZXQgc3RhdGU6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snc3RhdGUnXTtcbiAgICAgICAgICAgICAgbGV0IGVycm9yOiBzdHJpbmd8dW5kZWZpbmVkID0gcXVlcnlQYXJhbXNbJ2Vycm9yJ107XG4gICAgICAgICAgICAgIGxvZygnUG90ZW50aWFsIGVuZHNlc3Npb24gcmVxdWVzdCAnLCBjdXJyZW50VXJpLCBxdWVyeVBhcmFtcywgc3RhdGUsIGVycm9yKTtcbiAgICAgICAgICAgICAgbGV0IHNob3VsZE5vdGlmeSA9IHN0YXRlID09PSByZXF1ZXN0LnN0YXRlO1xuICAgICAgICAgICAgICBsZXQgZW5kU2Vzc2lvblJlc3BvbnNlOiBFbmRTZXNzaW9uUmVzcG9uc2V8bnVsbCA9IG51bGw7XG4gICAgICAgICAgICAgIGxldCBlbmRTZXNzaW9uRXJyb3I6IEVuZFNlc3Npb25FcnJvcnxudWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgaWYgKHNob3VsZE5vdGlmeSkge1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgLy8gZ2V0IGFkZGl0aW9uYWwgb3B0aW9uYWwgaW5mby5cbiAgICAgICAgICAgICAgICAgIGxldCBlcnJvclVyaSA9IHF1ZXJ5UGFyYW1zWydlcnJvcl91cmknXTtcbiAgICAgICAgICAgICAgICAgIGxldCBlcnJvckRlc2NyaXB0aW9uID0gcXVlcnlQYXJhbXNbJ2Vycm9yX2Rlc2NyaXB0aW9uJ107XG4gICAgICAgICAgICAgICAgICBlbmRTZXNzaW9uRXJyb3IgPSBuZXcgRW5kU2Vzc2lvbkVycm9yKGVycm9yLCBlcnJvckRlc2NyaXB0aW9uLCBlcnJvclVyaSwgc3RhdGUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBlbmRTZXNzaW9uUmVzcG9uc2UgPSBuZXcgRW5kU2Vzc2lvblJlc3BvbnNlKHN0YXRlISk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNsZWFudXAgc3RhdGVcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZVxuICAgICAgICAgICAgICAgICAgICAuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oRU5EU0VTU0lPTl9SRVFVRVNUX0hBTkRMRV9LRVkpLFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShlbmRTZXNzaW9uUmVxdWVzdEtleShoYW5kbGUpKSxcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oYXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uS2V5KGhhbmRsZSkpLFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShBVVRIT1JJWkFUSU9OX1JFU1BPTlNFX0hBTkRMRV9LRVkpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBsb2coJ0RlbGl2ZXJpbmcgZW5kc2Vzc2lvbiByZXNwb25zZScpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGVuZFNlc3Npb25SZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBlbmRTZXNzaW9uRXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICB9IGFzIEVuZFNlc3Npb25SZXF1ZXN0UmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZygnTWlzbWF0Y2hlZCByZXF1ZXN0IChzdGF0ZSBhbmQgcmVxdWVzdF91cmkpIGRvbnQgbWF0Y2guJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19