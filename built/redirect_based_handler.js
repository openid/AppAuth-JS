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
var RequestTypes;
(function (RequestTypes) {
    RequestTypes["endSession"] = "end_session";
    RequestTypes["authorization"] = "authorization";
})(RequestTypes || (RequestTypes = {}));
/** key for authorization request. */
var requestKey = function (handle, requestType) {
    return handle + "_appauth_" + requestType + "_request";
};
/** key for authorization service configuration */
var serviceConfigurationKey = function (handle, requestType) {
    return handle + "_appauth_" + requestType + "_service_configuration";
};
/** key in local storage which represents the current authorization request. */
var REQUEST_HANDLE_KEY = function (requestType) { return "appauth_current_" + requestType + "_request"; };
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
        this.performRequest(configuration, request, RequestTypes.authorization);
    };
    RedirectRequestHandler.prototype.performEndSessionRequest = function (configuration, request) {
        this.performRequest(configuration, request, RequestTypes.endSession);
    };
    RedirectRequestHandler.prototype.performRequest = function (configuration, request, requestType) {
        var _this = this;
        if (requestType === void 0) { requestType = RequestTypes.authorization; }
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
            var url = _this.buildRequestUrl(configuration, request);
            logger_1.log('Making a request to ', request, url);
            _this.locationLike.assign(url);
        });
    };
    /**
     * Attempts to introspect the contents of storage backend and completes the
     *  authorization request.
     */
    RedirectRequestHandler.prototype.completeAuthorizationRequest = function () {
        return this.completeRequest(RequestTypes.authorization);
    };
    /**
     * Attempts to introspect the contents of storage backend and completes the
     * end session request.
     */
    RedirectRequestHandler.prototype.completeEndSessionRequest = function () {
        return this.completeRequest(RequestTypes.endSession);
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
                    .then(function (json) { return requestType === RequestTypes.authorization ?
                    new authorization_request_1.AuthorizationRequest(json) :
                    new end_session_request_1.EndSessionRequest(json); })
                    .then(function (request) {
                    // check redirect_uri and state
                    var currentUri = "" + _this.locationLike.origin + _this.locationLike.pathname;
                    var queryParams = _this.utils.parse(_this.locationLike, true /* use hash */);
                    var state = queryParams['state'];
                    var code = queryParams['code'];
                    var error = queryParams['error'];
                    if (requestType === RequestTypes.authorization) {
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
                            if (requestType === RequestTypes.authorization) {
                                authorizationResponse = new authorization_response_1.AuthorizationResponse({ code: code, state: state });
                            }
                            else if (requestType === RequestTypes.endSession) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3RfYmFzZWRfaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWRpcmVjdF9iYXNlZF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdILHlGQUF1RTtBQUN2RSxpRUFBNkQ7QUFDN0QsaUZBQTBHO0FBQzFHLG1FQUE4RDtBQUU5RCwrQ0FBcUQ7QUFDckQsNkRBQXdEO0FBQ3hELCtEQUEwRDtBQUMxRCxtQ0FBNkI7QUFDN0IsMkRBQTJEO0FBQzNELHFDQUE4RDtBQUk5RCxJQUFLLFlBR0o7QUFIRCxXQUFLLFlBQVk7SUFDZiwwQ0FBMEIsQ0FBQTtJQUMxQiwrQ0FBK0IsQ0FBQTtBQUNqQyxDQUFDLEVBSEksWUFBWSxLQUFaLFlBQVksUUFHaEI7QUFFRCxxQ0FBcUM7QUFDckMsSUFBTSxVQUFVLEdBQ1osVUFBQyxNQUFjLEVBQUUsV0FBeUI7SUFDeEMsT0FBVSxNQUFNLGlCQUFZLFdBQVcsYUFBVSxDQUFDO0FBQ3BELENBQUMsQ0FBQTtBQUVMLGtEQUFrRDtBQUNsRCxJQUFNLHVCQUF1QixHQUN6QixVQUFDLE1BQWMsRUFBRSxXQUF5QjtJQUN4QyxPQUFVLE1BQU0saUJBQVksV0FBVywyQkFBd0IsQ0FBQztBQUNsRSxDQUFDLENBQUE7QUFFTCwrRUFBK0U7QUFDL0UsSUFBTSxrQkFBa0IsR0FBRyxVQUFDLFdBQXlCLElBQUssT0FBQSxxQkFBbUIsV0FBVyxhQUFVLEVBQXhDLENBQXdDLENBQUM7QUFFbkc7OztHQUdHO0FBQ0g7SUFBNEMsMENBQTJCO0lBQ3JFO0lBQ0ksbUNBQW1DO0lBQ25DLHFFQUFxRTtJQUNyRSwyQkFBMkI7SUFDcEIsY0FBMEQsRUFDakUsS0FBbUMsRUFDNUIsWUFBNEMsRUFDbkQsTUFBb0M7UUFIN0IsK0JBQUEsRUFBQSxxQkFBcUMsNkJBQW1CLEVBQUU7UUFDakUsc0JBQUEsRUFBQSxZQUFZLDBDQUFxQixFQUFFO1FBQzVCLDZCQUFBLEVBQUEsZUFBNkIsTUFBTSxDQUFDLFFBQVE7UUFDbkQsdUJBQUEsRUFBQSxhQUFxQiw0QkFBYSxFQUFFO1FBUHhDLFlBUUUsa0JBQU0sS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUNyQjtRQUxVLG9CQUFjLEdBQWQsY0FBYyxDQUE0QztRQUUxRCxrQkFBWSxHQUFaLFlBQVksQ0FBZ0M7O0lBR3ZELENBQUM7SUFFRCw0REFBMkIsR0FBM0IsVUFDSSxhQUFnRCxFQUNoRCxPQUE2QjtRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFFRCx5REFBd0IsR0FBeEIsVUFDSSxhQUFnRCxFQUNoRCxPQUEwQjtRQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFTywrQ0FBYyxHQUF0QixVQUNJLGFBQWdELEVBQ2hELE9BQXVDLEVBQ3ZDLFdBQXNEO1FBSDFELGlCQXVCQztRQXBCRyw0QkFBQSxFQUFBLGNBQTRCLFlBQVksQ0FBQyxhQUFhO1FBQ3hELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTlDLDhFQUE4RTtRQUM5RSxJQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQzVCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxFQUFFLE1BQU0sQ0FBQztZQUNwRSw4REFBOEQ7WUFDOUQsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FDakIsVUFBQSxNQUFNO2dCQUNGLE9BQUEsS0FBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQXBGLENBQW9GLENBQUM7WUFDN0YsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQ3ZCLHVCQUF1QixDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1NBQzFGLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDYiw0QkFBNEI7WUFDNUIsSUFBSSxHQUFHLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkQsWUFBRyxDQUFDLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxQyxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDTyw2REFBNEIsR0FBdEM7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRDs7O09BR0c7SUFDTywwREFBeUIsR0FBbkM7UUFDRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7O09BR0c7SUFDSyxnREFBZSxHQUF2QixVQUF3QixXQUF5QjtRQUFqRCxpQkE2RUM7UUE1RUMsZ0RBQWdEO1FBQ2hELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQzdFLElBQUksTUFBTSxFQUFFO2dCQUNWLDZCQUE2QjtnQkFDN0IsK0NBQStDO2dCQUMvQyxPQUFPLEtBQUksQ0FBQyxjQUFjO3FCQUNyQixPQUFPLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztvQkFDekMsOENBQThDO29CQUM5QyxxREFBcUQ7cUJBQ3BELElBQUksQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTyxDQUFDLEVBQW5CLENBQW1CLENBQUM7cUJBQ25DLElBQUksQ0FDRCxVQUFBLElBQUksSUFBSSxPQUFBLFdBQVcsS0FBSyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2hELElBQUksNENBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQkFDaEMsSUFBSSx1Q0FBaUIsQ0FBQyxJQUFJLENBQUMsRUFGdkIsQ0FFdUIsQ0FBQztxQkFDbkMsSUFBSSxDQUFDLFVBQUEsT0FBTztvQkFDWCwrQkFBK0I7b0JBQy9CLElBQUksVUFBVSxHQUFHLEtBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFVLENBQUM7b0JBQzVFLElBQUksV0FBVyxHQUFHLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO29CQUMzRSxJQUFJLEtBQUssR0FBcUIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNuRCxJQUFJLElBQUksR0FBcUIsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNqRCxJQUFJLEtBQUssR0FBcUIsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNuRCxJQUFJLFdBQVcsS0FBSyxZQUFZLENBQUMsYUFBYSxFQUFFO3dCQUM5QyxZQUFHLENBQUMsa0NBQWtDLEVBQ2xDLFVBQVUsRUFDVixXQUFXLEVBQ1gsS0FBSyxFQUNMLElBQUksRUFDSixLQUFLLENBQUMsQ0FBQztxQkFDWjt5QkFBTTt3QkFDTCxZQUFHLENBQUMsZ0NBQWdDLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7cUJBQzdFO29CQUNELElBQUksWUFBWSxHQUFHLEtBQUssS0FBSyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUMzQyxJQUFJLHFCQUFxQixHQUFrRCxJQUFJLENBQUM7b0JBQ2hGLElBQUksa0JBQWtCLEdBQTRCLElBQUksQ0FBQztvQkFDdkQsSUFBSSxZQUFZLEVBQUU7d0JBQ2hCLElBQUksS0FBSyxFQUFFOzRCQUNULGdDQUFnQzs0QkFDaEMsSUFBSSxRQUFRLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUN4QyxJQUFJLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDOzRCQUN4RCxrQkFBa0IsR0FBRyxJQUFJLHNEQUFrQixDQUFDO2dDQUMxQyxLQUFLLEVBQUUsS0FBSztnQ0FDWixpQkFBaUIsRUFBRSxnQkFBZ0I7Z0NBQ25DLFNBQVMsRUFBRSxRQUFRO2dDQUNuQixLQUFLLEVBQUUsS0FBSzs2QkFDYixDQUFDLENBQUM7eUJBQ0o7NkJBQU07NEJBQ0wsSUFBSSxXQUFXLEtBQUssWUFBWSxDQUFDLGFBQWEsRUFBRTtnQ0FDOUMscUJBQXFCLEdBQUcsSUFBSSw4Q0FBcUIsQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7NkJBQy9FO2lDQUFNLElBQUksV0FBVyxLQUFLLFlBQVksQ0FBQyxVQUFVLEVBQUU7Z0NBQ2xELHFCQUFxQixHQUFHLElBQUkseUNBQWtCLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQTs2QkFDL0Q7eUJBQ0Y7d0JBQ0QsZ0JBQWdCO3dCQUNoQixPQUFPLE9BQU87NkJBQ1QsR0FBRyxDQUFDOzRCQUNILEtBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDOzRCQUMvRCxLQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDOzRCQUMvRCxLQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7eUJBQzdFLENBQUM7NkJBQ0QsSUFBSSxDQUFDOzRCQUNKLFlBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDOzRCQUN6QyxPQUFPO2dDQUNMLE9BQU8sRUFBRSxPQUFPO2dDQUNoQixRQUFRLEVBQUUscUJBQXFCO2dDQUMvQixLQUFLLEVBQUUsa0JBQWtCOzZCQUNNLENBQUM7d0JBQ3BDLENBQUMsQ0FBQyxDQUFDO3FCQUNSO3lCQUFNO3dCQUNMLFlBQUcsQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO3dCQUM5RCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzlCO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ1I7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUM7YUFDYjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQW5KRCxDQUE0QywyREFBMkIsR0FtSnRFO0FBbkpZLHdEQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0F1dGhvcml6YXRpb25NYW5hZ2VtZW50UmVxdWVzdH0gZnJvbSAnLi9hdXRob3JpemF0aW9uX21hbmFnZW1lbnRfcmVxdWVzdCc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25FcnJvcn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX21hbmFnZW1lbnRfcmVzcG9uc2UnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdH0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIsIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVzcG9uc2V9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXNwb25zZSdcbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7Q3J5cHRvLCBEZWZhdWx0Q3J5cHRvfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5pbXBvcnQge0VuZFNlc3Npb25SZXF1ZXN0fSBmcm9tICcuL2VuZF9zZXNzaW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtFbmRTZXNzaW9uUmVzcG9uc2V9IGZyb20gJy4vZW5kX3Nlc3Npb25fcmVzcG9uc2UnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7QmFzaWNRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuL3F1ZXJ5X3N0cmluZ191dGlscyc7XG5pbXBvcnQge0xvY2FsU3RvcmFnZUJhY2tlbmQsIFN0b3JhZ2VCYWNrZW5kfSBmcm9tICcuL3N0b3JhZ2UnO1xuaW1wb3J0IHtMb2NhdGlvbkxpa2V9IGZyb20gJy4vdHlwZXMnO1xuXG5cbmVudW0gUmVxdWVzdFR5cGVzIHtcbiAgZW5kU2Vzc2lvbiA9ICdlbmRfc2Vzc2lvbicsXG4gIGF1dGhvcml6YXRpb24gPSAnYXV0aG9yaXphdGlvbidcbn1cblxuLyoqIGtleSBmb3IgYXV0aG9yaXphdGlvbiByZXF1ZXN0LiAqL1xuY29uc3QgcmVxdWVzdEtleSA9XG4gICAgKGhhbmRsZTogc3RyaW5nLCByZXF1ZXN0VHlwZTogUmVxdWVzdFR5cGVzKSA9PiB7XG4gICAgICByZXR1cm4gYCR7aGFuZGxlfV9hcHBhdXRoXyR7cmVxdWVzdFR5cGV9X3JlcXVlc3RgO1xuICAgIH1cblxuLyoqIGtleSBmb3IgYXV0aG9yaXphdGlvbiBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24gKi9cbmNvbnN0IHNlcnZpY2VDb25maWd1cmF0aW9uS2V5ID1cbiAgICAoaGFuZGxlOiBzdHJpbmcsIHJlcXVlc3RUeXBlOiBSZXF1ZXN0VHlwZXMpID0+IHtcbiAgICAgIHJldHVybiBgJHtoYW5kbGV9X2FwcGF1dGhfJHtyZXF1ZXN0VHlwZX1fc2VydmljZV9jb25maWd1cmF0aW9uYDtcbiAgICB9XG5cbi8qKiBrZXkgaW4gbG9jYWwgc3RvcmFnZSB3aGljaCByZXByZXNlbnRzIHRoZSBjdXJyZW50IGF1dGhvcml6YXRpb24gcmVxdWVzdC4gKi9cbmNvbnN0IFJFUVVFU1RfSEFORExFX0tFWSA9IChyZXF1ZXN0VHlwZTogUmVxdWVzdFR5cGVzKSA9PiBgYXBwYXV0aF9jdXJyZW50XyR7cmVxdWVzdFR5cGV9X3JlcXVlc3RgO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHdoaWNoIHVzZXMgYSBzdGFuZGFyZFxuICogcmVkaXJlY3QgYmFzZWQgY29kZSBmbG93LlxuICovXG5leHBvcnQgY2xhc3MgUmVkaXJlY3RSZXF1ZXN0SGFuZGxlciBleHRlbmRzIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLy8gdXNlIHRoZSBwcm92aWRlZCBzdG9yYWdlIGJhY2tlbmRcbiAgICAgIC8vIG9yIGluaXRpYWxpemUgbG9jYWwgc3RvcmFnZSB3aXRoIHRoZSBkZWZhdWx0IHN0b3JhZ2UgYmFja2VuZCB3aGljaFxuICAgICAgLy8gdXNlcyB3aW5kb3cubG9jYWxTdG9yYWdlXG4gICAgICBwdWJsaWMgc3RvcmFnZUJhY2tlbmQ6IFN0b3JhZ2VCYWNrZW5kID0gbmV3IExvY2FsU3RvcmFnZUJhY2tlbmQoKSxcbiAgICAgIHV0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpLFxuICAgICAgcHVibGljIGxvY2F0aW9uTGlrZTogTG9jYXRpb25MaWtlID0gd2luZG93LmxvY2F0aW9uLFxuICAgICAgY3J5cHRvOiBDcnlwdG8gPSBuZXcgRGVmYXVsdENyeXB0bygpKSB7XG4gICAgc3VwZXIodXRpbHMsIGNyeXB0byk7XG4gIH1cblxuICBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCkge1xuICAgIHRoaXMucGVyZm9ybVJlcXVlc3QoY29uZmlndXJhdGlvbiwgcmVxdWVzdCwgUmVxdWVzdFR5cGVzLmF1dGhvcml6YXRpb24pO1xuICB9XG5cbiAgcGVyZm9ybUVuZFNlc3Npb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogRW5kU2Vzc2lvblJlcXVlc3QpIHtcbiAgICB0aGlzLnBlcmZvcm1SZXF1ZXN0KGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QsIFJlcXVlc3RUeXBlcy5lbmRTZXNzaW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgcGVyZm9ybVJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uTWFuYWdlbWVudFJlcXVlc3QsXG4gICAgICByZXF1ZXN0VHlwZTogUmVxdWVzdFR5cGVzID0gUmVxdWVzdFR5cGVzLmF1dGhvcml6YXRpb24pIHtcbiAgICBjb25zdCBoYW5kbGUgPSB0aGlzLmNyeXB0by5nZW5lcmF0ZVJhbmRvbSgxMCk7XG5cbiAgICAvLyBiZWZvcmUgeW91IG1ha2UgcmVxdWVzdCwgcGVyc2lzdCBhbGwgcmVxdWVzdCByZWxhdGVkIGRhdGEgaW4gbG9jYWwgc3RvcmFnZS5cbiAgICBjb25zdCBwZXJzaXN0ZWQgPSBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oUkVRVUVTVF9IQU5ETEVfS0VZKHJlcXVlc3RUeXBlKSwgaGFuZGxlKSxcbiAgICAgIC8vIENhbGxpbmcgdG9Kc29uKCkgYWRkcyBpbiB0aGUgY29kZSAmIGNoYWxsZW5nZSB3aGVuIHBvc3NpYmxlXG4gICAgICByZXF1ZXN0LnRvSnNvbigpLnRoZW4oXG4gICAgICAgICAgcmVzdWx0ID0+XG4gICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQuc2V0SXRlbShyZXF1ZXN0S2V5KGhhbmRsZSwgcmVxdWVzdFR5cGUpLCBKU09OLnN0cmluZ2lmeShyZXN1bHQpKSksXG4gICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnNldEl0ZW0oXG4gICAgICAgICAgc2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlLCByZXF1ZXN0VHlwZSksIEpTT04uc3RyaW5naWZ5KGNvbmZpZ3VyYXRpb24udG9Kc29uKCkpKSxcbiAgICBdKTtcblxuICAgIHBlcnNpc3RlZC50aGVuKCgpID0+IHtcbiAgICAgIC8vIG1ha2UgdGhlIHJlZGlyZWN0IHJlcXVlc3RcbiAgICAgIGxldCB1cmwgPSB0aGlzLmJ1aWxkUmVxdWVzdFVybChjb25maWd1cmF0aW9uLCByZXF1ZXN0KTtcbiAgICAgIGxvZygnTWFraW5nIGEgcmVxdWVzdCB0byAnLCByZXF1ZXN0LCB1cmwpO1xuICAgICAgdGhpcy5sb2NhdGlvbkxpa2UuYXNzaWduKHVybCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdHMgdG8gaW50cm9zcGVjdCB0aGUgY29udGVudHMgb2Ygc3RvcmFnZSBiYWNrZW5kIGFuZCBjb21wbGV0ZXMgdGhlXG4gICAqICBhdXRob3JpemF0aW9uIHJlcXVlc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLmNvbXBsZXRlUmVxdWVzdChSZXF1ZXN0VHlwZXMuYXV0aG9yaXphdGlvbik7XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdHMgdG8gaW50cm9zcGVjdCB0aGUgY29udGVudHMgb2Ygc3RvcmFnZSBiYWNrZW5kIGFuZCBjb21wbGV0ZXMgdGhlXG4gICAqIGVuZCBzZXNzaW9uIHJlcXVlc3QuXG4gICAqL1xuICBwcm90ZWN0ZWQgY29tcGxldGVFbmRTZXNzaW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD4ge1xuICAgIHJldHVybiB0aGlzLmNvbXBsZXRlUmVxdWVzdChSZXF1ZXN0VHlwZXMuZW5kU2Vzc2lvbik7XG4gIH1cblxuICAvKipcbiAgICogQXR0ZW1wdHMgdG8gaW50cm9zcGVjdCB0aGUgY29udGVudHMgb2Ygc3RvcmFnZSBiYWNrZW5kIGFuZCBjb21wbGV0ZXMgdGhlXG4gICAqIHJlcXVlc3QuXG4gICAqL1xuICBwcml2YXRlIGNvbXBsZXRlUmVxdWVzdChyZXF1ZXN0VHlwZTogUmVxdWVzdFR5cGVzKSB7XG4gICAgLy8gVE9ETyhyYWh1bHJhdkApOiBoYW5kbGUgYXV0aG9yaXphdGlvbiBlcnJvcnMuXG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZUJhY2tlbmQuZ2V0SXRlbShSRVFVRVNUX0hBTkRMRV9LRVkocmVxdWVzdFR5cGUpKS50aGVuKGhhbmRsZSA9PiB7XG4gICAgICBpZiAoaGFuZGxlKSB7XG4gICAgICAgIC8vIHdlIGhhdmUgYSBwZW5kaW5nIHJlcXVlc3QuXG4gICAgICAgIC8vIGZldGNoIGF1dGhvcml6YXRpb24gcmVxdWVzdCwgYW5kIGNoZWNrIHN0YXRlXG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2VCYWNrZW5kXG4gICAgICAgICAgICAuZ2V0SXRlbShyZXF1ZXN0S2V5KGhhbmRsZSwgcmVxdWVzdFR5cGUpKVxuICAgICAgICAgICAgLy8gcmVxdWlyZXMgYSBjb3JyZXNwb25kaW5nIGluc3RhbmNlIG9mIHJlc3VsdFxuICAgICAgICAgICAgLy8gVE9ETyhyYWh1bHJhdkApOiBjaGVjayBmb3IgaW5jb25zaXN0ZW50IHN0YXRlIGhlcmVcbiAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiBKU09OLnBhcnNlKHJlc3VsdCEpKVxuICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAgICAganNvbiA9PiByZXF1ZXN0VHlwZSA9PT0gUmVxdWVzdFR5cGVzLmF1dGhvcml6YXRpb24gP1xuICAgICAgICAgICAgICAgICAgICBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QoanNvbikgOlxuICAgICAgICAgICAgICAgICAgICBuZXcgRW5kU2Vzc2lvblJlcXVlc3QoanNvbikpXG4gICAgICAgICAgICAudGhlbihyZXF1ZXN0ID0+IHtcbiAgICAgICAgICAgICAgLy8gY2hlY2sgcmVkaXJlY3RfdXJpIGFuZCBzdGF0ZVxuICAgICAgICAgICAgICBsZXQgY3VycmVudFVyaSA9IGAke3RoaXMubG9jYXRpb25MaWtlLm9yaWdpbn0ke3RoaXMubG9jYXRpb25MaWtlLnBhdGhuYW1lfWA7XG4gICAgICAgICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IHRoaXMudXRpbHMucGFyc2UodGhpcy5sb2NhdGlvbkxpa2UsIHRydWUgLyogdXNlIGhhc2ggKi8pO1xuICAgICAgICAgICAgICBsZXQgc3RhdGU6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snc3RhdGUnXTtcbiAgICAgICAgICAgICAgbGV0IGNvZGU6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snY29kZSddO1xuICAgICAgICAgICAgICBsZXQgZXJyb3I6IHN0cmluZ3x1bmRlZmluZWQgPSBxdWVyeVBhcmFtc1snZXJyb3InXTtcbiAgICAgICAgICAgICAgaWYgKHJlcXVlc3RUeXBlID09PSBSZXF1ZXN0VHlwZXMuYXV0aG9yaXphdGlvbikge1xuICAgICAgICAgICAgICAgIGxvZygnUG90ZW50aWFsIGF1dGhvcml6YXRpb24gcmVxdWVzdCAnLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VXJpLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeVBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIGNvZGUsXG4gICAgICAgICAgICAgICAgICAgIGVycm9yKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2coJ1BvdGVudGlhbCBlbmQgc2Vzc2lvbiByZXF1ZXN0ICcsIGN1cnJlbnRVcmksIHF1ZXJ5UGFyYW1zLCBzdGF0ZSwgZXJyb3IpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGV0IHNob3VsZE5vdGlmeSA9IHN0YXRlID09PSByZXF1ZXN0LnN0YXRlO1xuICAgICAgICAgICAgICBsZXQgYXV0aG9yaXphdGlvblJlc3BvbnNlOiBFbmRTZXNzaW9uUmVzcG9uc2V8QXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwgPSBudWxsO1xuICAgICAgICAgICAgICBsZXQgYXV0aG9yaXphdGlvbkVycm9yOiBBdXRob3JpemF0aW9uRXJyb3J8bnVsbCA9IG51bGw7XG4gICAgICAgICAgICAgIGlmIChzaG91bGROb3RpZnkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGdldCBhZGRpdGlvbmFsIG9wdGlvbmFsIGluZm8uXG4gICAgICAgICAgICAgICAgICBsZXQgZXJyb3JVcmkgPSBxdWVyeVBhcmFtc1snZXJyb3JfdXJpJ107XG4gICAgICAgICAgICAgICAgICBsZXQgZXJyb3JEZXNjcmlwdGlvbiA9IHF1ZXJ5UGFyYW1zWydlcnJvcl9kZXNjcmlwdGlvbiddO1xuICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvbkVycm9yID0gbmV3IEF1dGhvcml6YXRpb25FcnJvcih7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJvcixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JfZGVzY3JpcHRpb246IGVycm9yRGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGVycm9yX3VyaTogZXJyb3JVcmksXG4gICAgICAgICAgICAgICAgICAgIHN0YXRlOiBzdGF0ZVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0VHlwZSA9PT0gUmVxdWVzdFR5cGVzLmF1dGhvcml6YXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvblJlc3BvbnNlID0gbmV3IEF1dGhvcml6YXRpb25SZXNwb25zZSh7Y29kZTogY29kZSwgc3RhdGU6IHN0YXRlfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHJlcXVlc3RUeXBlID09PSBSZXF1ZXN0VHlwZXMuZW5kU2Vzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICBhdXRob3JpemF0aW9uUmVzcG9uc2UgPSBuZXcgRW5kU2Vzc2lvblJlc3BvbnNlKHtzdGF0ZTogc3RhdGV9KVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjbGVhbnVwIHN0YXRlXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgLmFsbChbXG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlQmFja2VuZC5yZW1vdmVJdGVtKFJFUVVFU1RfSEFORExFX0tFWShyZXF1ZXN0VHlwZSkpLFxuICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcmFnZUJhY2tlbmQucmVtb3ZlSXRlbShyZXF1ZXN0S2V5KGhhbmRsZSwgcmVxdWVzdFR5cGUpKSxcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2VCYWNrZW5kLnJlbW92ZUl0ZW0oc2VydmljZUNvbmZpZ3VyYXRpb25LZXkoaGFuZGxlLCByZXF1ZXN0VHlwZSkpXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBsb2coJ0RlbGl2ZXJpbmcgYXV0aG9yaXphdGlvbiByZXNwb25zZScpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2U6IGF1dGhvcml6YXRpb25SZXNwb25zZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yOiBhdXRob3JpemF0aW9uRXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICB9IGFzIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxvZygnTWlzbWF0Y2hlZCByZXF1ZXN0IChzdGF0ZSBhbmQgcmVxdWVzdF91cmkpIGRvbnQgbWF0Y2guJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19