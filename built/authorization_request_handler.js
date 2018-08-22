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
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = require("./logger");
/**
 * Authorization Service notifier.
 * This manages the communication of the AuthorizationResponse to the 3p client.
 */
var AuthorizationNotifier = /** @class */ (function () {
    function AuthorizationNotifier() {
        this.listener = null;
    }
    AuthorizationNotifier.prototype.setAuthorizationListener = function (listener) {
        this.listener = listener;
    };
    /**
     * The authorization complete callback.
     */
    AuthorizationNotifier.prototype.onAuthorizationComplete = function (request, response, error) {
        if (this.listener) {
            // complete authorization request
            this.listener(request, response, error);
        }
    };
    return AuthorizationNotifier;
}());
exports.AuthorizationNotifier = AuthorizationNotifier;
// TODO(rahulrav@): add more built in parameters.
/* built in parameters. */
exports.BUILT_IN_PARAMETERS = ['redirect_uri', 'client_id', 'response_type', 'state', 'scope'];
/**
 * Defines the interface which is capable of handling an authorization request
 * using various methods (iframe / popup / different process etc.).
 */
var AuthorizationRequestHandler = /** @class */ (function () {
    function AuthorizationRequestHandler(utils, generateRandom) {
        this.utils = utils;
        this.generateRandom = generateRandom;
        // notifier send the response back to the client.
        this.notifier = null;
    }
    /**
     * A utility method to be able to build the authorization request URL.
     */
    AuthorizationRequestHandler.prototype.buildRequestUrl = function (configuration, request) {
        // build the query string
        // coerce to any type for convenience
        var requestMap = {
            'redirect_uri': request.redirectUri,
            'client_id': request.clientId,
            'response_type': request.responseType,
            'state': request.state,
            'scope': request.scope
        };
        // copy over extras
        if (request.extras) {
            for (var extra in request.extras) {
                if (request.extras.hasOwnProperty(extra)) {
                    // check before inserting to requestMap
                    if (exports.BUILT_IN_PARAMETERS.indexOf(extra) < 0) {
                        requestMap[extra] = request.extras[extra];
                    }
                }
            }
        }
        var query = this.utils.stringify(requestMap);
        var baseUrl = configuration.authorizationEndpoint;
        var url = baseUrl + "?" + query;
        return url;
    };
    /**
     * Completes the authorization request if necessary & when possible.
     */
    AuthorizationRequestHandler.prototype.completeAuthorizationRequestIfPossible = function () {
        var _this = this;
        // call complete authorization if possible to see there might
        // be a response that needs to be delivered.
        logger_1.log("Checking to see if there is an authorization response to be delivered.");
        if (!this.notifier) {
            logger_1.log("Notifier is not present on AuthorizationRequest handler.\n          No delivery of result will be possible");
        }
        return this.completeAuthorizationRequest().then(function (result) {
            if (!result) {
                logger_1.log("No result is available yet.");
            }
            if (result && _this.notifier) {
                _this.notifier.onAuthorizationComplete(result.request, result.response, result.error);
            }
        });
    };
    /**
     * Sets the default Authorization Service notifier.
     */
    AuthorizationRequestHandler.prototype.setAuthorizationNotifier = function (notifier) {
        this.notifier = notifier;
        return this;
    };
    ;
    return AuthorizationRequestHandler;
}());
exports.AuthorizationRequestHandler = AuthorizationRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFNSCxtQ0FBNkI7QUF1QjdCOzs7R0FHRztBQUNIO0lBQUE7UUFDVSxhQUFRLEdBQStCLElBQUksQ0FBQztJQWtCdEQsQ0FBQztJQWhCQyx3REFBd0IsR0FBeEIsVUFBeUIsUUFBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdURBQXVCLEdBQXZCLFVBQ0ksT0FBNkIsRUFDN0IsUUFBb0MsRUFDcEMsS0FBOEI7UUFDaEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLGlDQUFpQztZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbkJZLHNEQUFxQjtBQXFCbEMsaURBQWlEO0FBQ2pELDBCQUEwQjtBQUNiLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFcEc7OztHQUdHO0FBQ0g7SUFDRSxxQ0FBbUIsS0FBdUIsRUFBWSxjQUErQjtRQUFsRSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFZLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUVyRixpREFBaUQ7UUFDdkMsYUFBUSxHQUErQixJQUFJLENBQUM7SUFIa0MsQ0FBQztJQUt6Rjs7T0FFRztJQUNPLHFEQUFlLEdBQXpCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBNkI7UUFDL0IseUJBQXlCO1FBQ3pCLHFDQUFxQztRQUNyQyxJQUFJLFVBQVUsR0FBYztZQUMxQixjQUFjLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDbkMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzdCLGVBQWUsRUFBRSxPQUFPLENBQUMsWUFBWTtZQUNyQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1NBQ3ZCLENBQUM7UUFFRixtQkFBbUI7UUFDbkIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2xCLEtBQUssSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDeEMsdUNBQXVDO29CQUN2QyxJQUFJLDJCQUFtQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQzFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUMzQztpQkFDRjthQUNGO1NBQ0Y7UUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QyxJQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMscUJBQXFCLENBQUM7UUFDbEQsSUFBSSxHQUFHLEdBQU0sT0FBTyxTQUFJLEtBQU8sQ0FBQztRQUNoQyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7T0FFRztJQUNILDRFQUFzQyxHQUF0QztRQUFBLGlCQWdCQztRQWZDLDZEQUE2RDtRQUM3RCw0Q0FBNEM7UUFDNUMsWUFBRyxDQUFDLHdFQUF3RSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsWUFBRyxDQUFDLDRHQUN1QyxDQUFDLENBQUE7U0FDN0M7UUFDRCxPQUFPLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDcEQsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxZQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQzthQUNwQztZQUNELElBQUksTUFBTSxJQUFJLEtBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzNCLEtBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0RjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsOERBQXdCLEdBQXhCLFVBQXlCLFFBQStCO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUFBLENBQUM7SUFlSixrQ0FBQztBQUFELENBQUMsQUFsRkQsSUFrRkM7QUFsRnFCLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdCwgQXV0aG9yaXphdGlvblJlcXVlc3RKc29ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XHJcbmltcG9ydCB7QXV0aG9yaXphdGlvbkVycm9yLCBBdXRob3JpemF0aW9uRXJyb3JKc29uLCBBdXRob3JpemF0aW9uUmVzcG9uc2UsIEF1dGhvcml6YXRpb25SZXNwb25zZUpzb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXNwb25zZSc7XHJcbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHtjcnlwdG9HZW5lcmF0ZVJhbmRvbSwgUmFuZG9tR2VuZXJhdG9yfSBmcm9tICcuL2NyeXB0b191dGlscyc7XHJcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7UXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xyXG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoaXMgdHlwZSByZXByZXNlbnRzIGEgbGFtYmRhIHRoYXQgY2FuIHRha2UgYW4gQXV0aG9yaXphdGlvblJlcXVlc3QsXHJcbiAqIGFuZCBhbiBBdXRob3JpemF0aW9uUmVzcG9uc2UgYXMgYXJndW1lbnRzLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgQXV0aG9yaXphdGlvbkxpc3RlbmVyID1cclxuICAgIChyZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCxcclxuICAgICByZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwsXHJcbiAgICAgZXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsKSA9PiB2b2lkO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBzdHJ1Y3R1cmFsIHR5cGUgaG9sZGluZyBib3RoIGF1dGhvcml6YXRpb24gcmVxdWVzdCBhbmQgcmVzcG9uc2UuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2Uge1xyXG4gIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0O1xyXG4gIHJlc3BvbnNlOiBBdXRob3JpemF0aW9uUmVzcG9uc2V8bnVsbDtcclxuICBlcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGw7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBdXRob3JpemF0aW9uIFNlcnZpY2Ugbm90aWZpZXIuXHJcbiAqIFRoaXMgbWFuYWdlcyB0aGUgY29tbXVuaWNhdGlvbiBvZiB0aGUgQXV0aG9yaXphdGlvblJlc3BvbnNlIHRvIHRoZSAzcCBjbGllbnQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgQXV0aG9yaXphdGlvbk5vdGlmaWVyIHtcclxuICBwcml2YXRlIGxpc3RlbmVyOiBBdXRob3JpemF0aW9uTGlzdGVuZXJ8bnVsbCA9IG51bGw7XHJcblxyXG4gIHNldEF1dGhvcml6YXRpb25MaXN0ZW5lcihsaXN0ZW5lcjogQXV0aG9yaXphdGlvbkxpc3RlbmVyKSB7XHJcbiAgICB0aGlzLmxpc3RlbmVyID0gbGlzdGVuZXI7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGUgYXV0aG9yaXphdGlvbiBjb21wbGV0ZSBjYWxsYmFjay5cclxuICAgKi9cclxuICBvbkF1dGhvcml6YXRpb25Db21wbGV0ZShcclxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QsXHJcbiAgICAgIHJlc3BvbnNlOiBBdXRob3JpemF0aW9uUmVzcG9uc2V8bnVsbCxcclxuICAgICAgZXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5saXN0ZW5lcikge1xyXG4gICAgICAvLyBjb21wbGV0ZSBhdXRob3JpemF0aW9uIHJlcXVlc3RcclxuICAgICAgdGhpcy5saXN0ZW5lcihyZXF1ZXN0LCByZXNwb25zZSwgZXJyb3IpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gVE9ETyhyYWh1bHJhdkApOiBhZGQgbW9yZSBidWlsdCBpbiBwYXJhbWV0ZXJzLlxyXG4vKiBidWlsdCBpbiBwYXJhbWV0ZXJzLiAqL1xyXG5leHBvcnQgY29uc3QgQlVJTFRfSU5fUEFSQU1FVEVSUyA9IFsncmVkaXJlY3RfdXJpJywgJ2NsaWVudF9pZCcsICdyZXNwb25zZV90eXBlJywgJ3N0YXRlJywgJ3Njb3BlJ107XHJcblxyXG4vKipcclxuICogRGVmaW5lcyB0aGUgaW50ZXJmYWNlIHdoaWNoIGlzIGNhcGFibGUgb2YgaGFuZGxpbmcgYW4gYXV0aG9yaXphdGlvbiByZXF1ZXN0XHJcbiAqIHVzaW5nIHZhcmlvdXMgbWV0aG9kcyAoaWZyYW1lIC8gcG9wdXAgLyBkaWZmZXJlbnQgcHJvY2VzcyBldGMuKS5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIge1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB1dGlsczogUXVlcnlTdHJpbmdVdGlscywgcHJvdGVjdGVkIGdlbmVyYXRlUmFuZG9tOiBSYW5kb21HZW5lcmF0b3IpIHt9XHJcblxyXG4gIC8vIG5vdGlmaWVyIHNlbmQgdGhlIHJlc3BvbnNlIGJhY2sgdG8gdGhlIGNsaWVudC5cclxuICBwcm90ZWN0ZWQgbm90aWZpZXI6IEF1dGhvcml6YXRpb25Ob3RpZmllcnxudWxsID0gbnVsbDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSB1dGlsaXR5IG1ldGhvZCB0byBiZSBhYmxlIHRvIGJ1aWxkIHRoZSBhdXRob3JpemF0aW9uIHJlcXVlc3QgVVJMLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBidWlsZFJlcXVlc3RVcmwoXHJcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcclxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpIHtcclxuICAgIC8vIGJ1aWxkIHRoZSBxdWVyeSBzdHJpbmdcclxuICAgIC8vIGNvZXJjZSB0byBhbnkgdHlwZSBmb3IgY29udmVuaWVuY2VcclxuICAgIGxldCByZXF1ZXN0TWFwOiBTdHJpbmdNYXAgPSB7XHJcbiAgICAgICdyZWRpcmVjdF91cmknOiByZXF1ZXN0LnJlZGlyZWN0VXJpLFxyXG4gICAgICAnY2xpZW50X2lkJzogcmVxdWVzdC5jbGllbnRJZCxcclxuICAgICAgJ3Jlc3BvbnNlX3R5cGUnOiByZXF1ZXN0LnJlc3BvbnNlVHlwZSxcclxuICAgICAgJ3N0YXRlJzogcmVxdWVzdC5zdGF0ZSxcclxuICAgICAgJ3Njb3BlJzogcmVxdWVzdC5zY29wZVxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBjb3B5IG92ZXIgZXh0cmFzXHJcbiAgICBpZiAocmVxdWVzdC5leHRyYXMpIHtcclxuICAgICAgZm9yIChsZXQgZXh0cmEgaW4gcmVxdWVzdC5leHRyYXMpIHtcclxuICAgICAgICBpZiAocmVxdWVzdC5leHRyYXMuaGFzT3duUHJvcGVydHkoZXh0cmEpKSB7XHJcbiAgICAgICAgICAvLyBjaGVjayBiZWZvcmUgaW5zZXJ0aW5nIHRvIHJlcXVlc3RNYXBcclxuICAgICAgICAgIGlmIChCVUlMVF9JTl9QQVJBTUVURVJTLmluZGV4T2YoZXh0cmEpIDwgMCkge1xyXG4gICAgICAgICAgICByZXF1ZXN0TWFwW2V4dHJhXSA9IHJlcXVlc3QuZXh0cmFzW2V4dHJhXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcXVlcnkgPSB0aGlzLnV0aWxzLnN0cmluZ2lmeShyZXF1ZXN0TWFwKTtcclxuICAgIGxldCBiYXNlVXJsID0gY29uZmlndXJhdGlvbi5hdXRob3JpemF0aW9uRW5kcG9pbnQ7XHJcbiAgICBsZXQgdXJsID0gYCR7YmFzZVVybH0/JHtxdWVyeX1gO1xyXG4gICAgcmV0dXJuIHVybDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXBsZXRlcyB0aGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0IGlmIG5lY2Vzc2FyeSAmIHdoZW4gcG9zc2libGUuXHJcbiAgICovXHJcbiAgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdElmUG9zc2libGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAvLyBjYWxsIGNvbXBsZXRlIGF1dGhvcml6YXRpb24gaWYgcG9zc2libGUgdG8gc2VlIHRoZXJlIG1pZ2h0XHJcbiAgICAvLyBiZSBhIHJlc3BvbnNlIHRoYXQgbmVlZHMgdG8gYmUgZGVsaXZlcmVkLlxyXG4gICAgbG9nKGBDaGVja2luZyB0byBzZWUgaWYgdGhlcmUgaXMgYW4gYXV0aG9yaXphdGlvbiByZXNwb25zZSB0byBiZSBkZWxpdmVyZWQuYCk7XHJcbiAgICBpZiAoIXRoaXMubm90aWZpZXIpIHtcclxuICAgICAgbG9nKGBOb3RpZmllciBpcyBub3QgcHJlc2VudCBvbiBBdXRob3JpemF0aW9uUmVxdWVzdCBoYW5kbGVyLlxyXG4gICAgICAgICAgTm8gZGVsaXZlcnkgb2YgcmVzdWx0IHdpbGwgYmUgcG9zc2libGVgKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgaWYgKCFyZXN1bHQpIHtcclxuICAgICAgICBsb2coYE5vIHJlc3VsdCBpcyBhdmFpbGFibGUgeWV0LmApO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChyZXN1bHQgJiYgdGhpcy5ub3RpZmllcikge1xyXG4gICAgICAgIHRoaXMubm90aWZpZXIub25BdXRob3JpemF0aW9uQ29tcGxldGUocmVzdWx0LnJlcXVlc3QsIHJlc3VsdC5yZXNwb25zZSwgcmVzdWx0LmVycm9yKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBkZWZhdWx0IEF1dGhvcml6YXRpb24gU2VydmljZSBub3RpZmllci5cclxuICAgKi9cclxuICBzZXRBdXRob3JpemF0aW9uTm90aWZpZXIobm90aWZpZXI6IEF1dGhvcml6YXRpb25Ob3RpZmllcik6IEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XHJcbiAgICB0aGlzLm5vdGlmaWVyID0gbm90aWZpZXI7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBNYWtlcyBhbiBhdXRob3JpemF0aW9uIHJlcXVlc3QuXHJcbiAgICovXHJcbiAgYWJzdHJhY3QgcGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KFxyXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXHJcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0KTogdm9pZDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIGlmIGFuIGF1dGhvcml6YXRpb24gZmxvdyBjYW4gYmUgY29tcGxldGVkLCBhbmQgY29tcGxldGVzIGl0LlxyXG4gICAqIFRoZSBoYW5kbGVyIHJldHVybnMgYSBgUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlPmAgaWYgcmVhZHksIG9yIGEgYFByb21pc2U8bnVsbD5gXHJcbiAgICogaWYgbm90IHJlYWR5LlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0KCk6IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZXxudWxsPjtcclxufVxyXG4iXX0=