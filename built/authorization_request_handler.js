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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFNSCxtQ0FBNkI7QUF1QjdCOzs7R0FHRztBQUNIO0lBQUE7UUFDVSxhQUFRLEdBQStCLElBQUksQ0FBQztJQWtCdEQsQ0FBQztJQWhCQyx3REFBd0IsR0FBeEIsVUFBeUIsUUFBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdURBQXVCLEdBQXZCLFVBQ0ksT0FBNkIsRUFDN0IsUUFBb0MsRUFDcEMsS0FBOEI7UUFDaEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLGlDQUFpQztZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbkJZLHNEQUFxQjtBQXFCbEMsaURBQWlEO0FBQ2pELDBCQUEwQjtBQUNiLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFcEc7OztHQUdHO0FBQ0g7SUFDRSxxQ0FBbUIsS0FBdUIsRUFBWSxjQUErQjtRQUFsRSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFZLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUVyRixpREFBaUQ7UUFDdkMsYUFBUSxHQUErQixJQUFJLENBQUM7SUFIa0MsQ0FBQztJQUt6Rjs7T0FFRztJQUNPLHFEQUFlLEdBQXpCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBNkI7UUFDL0IseUJBQXlCO1FBQ3pCLHFDQUFxQztRQUNyQyxJQUFJLFVBQVUsR0FBYztZQUMxQixjQUFjLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDbkMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzdCLGVBQWUsRUFBRSxPQUFPLENBQUMsWUFBWTtZQUNyQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1NBQ3ZCLENBQUM7UUFFRixtQkFBbUI7UUFDbkIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2xCLEtBQUssSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDeEMsdUNBQXVDO29CQUN2QyxJQUFJLDJCQUFtQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQzFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUMzQztpQkFDRjthQUNGO1NBQ0Y7UUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QyxJQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMscUJBQXFCLENBQUM7UUFDbEQsSUFBSSxHQUFHLEdBQU0sT0FBTyxTQUFJLEtBQU8sQ0FBQztRQUNoQyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7T0FFRztJQUNILDRFQUFzQyxHQUF0QztRQUFBLGlCQWdCQztRQWZDLDZEQUE2RDtRQUM3RCw0Q0FBNEM7UUFDNUMsWUFBRyxDQUFDLHdFQUF3RSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsWUFBRyxDQUFDLDRHQUN1QyxDQUFDLENBQUE7U0FDN0M7UUFDRCxPQUFPLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDcEQsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxZQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQzthQUNwQztZQUNELElBQUksTUFBTSxJQUFJLEtBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzNCLEtBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0RjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsOERBQXdCLEdBQXhCLFVBQXlCLFFBQStCO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUFBLENBQUM7SUFlSixrQ0FBQztBQUFELENBQUMsQUFsRkQsSUFrRkM7QUFsRnFCLGtFQUEyQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXF1ZXN0LCBBdXRob3JpemF0aW9uUmVxdWVzdEpzb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0JztcbmltcG9ydCB7QXV0aG9yaXphdGlvbkVycm9yLCBBdXRob3JpemF0aW9uRXJyb3JKc29uLCBBdXRob3JpemF0aW9uUmVzcG9uc2UsIEF1dGhvcml6YXRpb25SZXNwb25zZUpzb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXNwb25zZSc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbic7XG5pbXBvcnQge2NyeXB0b0dlbmVyYXRlUmFuZG9tLCBSYW5kb21HZW5lcmF0b3J9IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge1F1ZXJ5U3RyaW5nVXRpbHN9IGZyb20gJy4vcXVlcnlfc3RyaW5nX3V0aWxzJztcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuXG4vKipcbiAqIFRoaXMgdHlwZSByZXByZXNlbnRzIGEgbGFtYmRhIHRoYXQgY2FuIHRha2UgYW4gQXV0aG9yaXphdGlvblJlcXVlc3QsXG4gKiBhbmQgYW4gQXV0aG9yaXphdGlvblJlc3BvbnNlIGFzIGFyZ3VtZW50cy5cbiAqL1xuZXhwb3J0IHR5cGUgQXV0aG9yaXphdGlvbkxpc3RlbmVyID1cbiAgICAocmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QsXG4gICAgIHJlc3BvbnNlOiBBdXRob3JpemF0aW9uUmVzcG9uc2V8bnVsbCxcbiAgICAgZXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsKSA9PiB2b2lkO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzdHJ1Y3R1cmFsIHR5cGUgaG9sZGluZyBib3RoIGF1dGhvcml6YXRpb24gcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZSB7XG4gIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0O1xuICByZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGw7XG4gIGVycm9yOiBBdXRob3JpemF0aW9uRXJyb3J8bnVsbDtcbn1cblxuLyoqXG4gKiBBdXRob3JpemF0aW9uIFNlcnZpY2Ugbm90aWZpZXIuXG4gKiBUaGlzIG1hbmFnZXMgdGhlIGNvbW11bmljYXRpb24gb2YgdGhlIEF1dGhvcml6YXRpb25SZXNwb25zZSB0byB0aGUgM3AgY2xpZW50LlxuICovXG5leHBvcnQgY2xhc3MgQXV0aG9yaXphdGlvbk5vdGlmaWVyIHtcbiAgcHJpdmF0ZSBsaXN0ZW5lcjogQXV0aG9yaXphdGlvbkxpc3RlbmVyfG51bGwgPSBudWxsO1xuXG4gIHNldEF1dGhvcml6YXRpb25MaXN0ZW5lcihsaXN0ZW5lcjogQXV0aG9yaXphdGlvbkxpc3RlbmVyKSB7XG4gICAgdGhpcy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBhdXRob3JpemF0aW9uIGNvbXBsZXRlIGNhbGxiYWNrLlxuICAgKi9cbiAgb25BdXRob3JpemF0aW9uQ29tcGxldGUoXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlOiBBdXRob3JpemF0aW9uUmVzcG9uc2V8bnVsbCxcbiAgICAgIGVycm9yOiBBdXRob3JpemF0aW9uRXJyb3J8bnVsbCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RlbmVyKSB7XG4gICAgICAvLyBjb21wbGV0ZSBhdXRob3JpemF0aW9uIHJlcXVlc3RcbiAgICAgIHRoaXMubGlzdGVuZXIocmVxdWVzdCwgcmVzcG9uc2UsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gVE9ETyhyYWh1bHJhdkApOiBhZGQgbW9yZSBidWlsdCBpbiBwYXJhbWV0ZXJzLlxuLyogYnVpbHQgaW4gcGFyYW1ldGVycy4gKi9cbmV4cG9ydCBjb25zdCBCVUlMVF9JTl9QQVJBTUVURVJTID0gWydyZWRpcmVjdF91cmknLCAnY2xpZW50X2lkJywgJ3Jlc3BvbnNlX3R5cGUnLCAnc3RhdGUnLCAnc2NvcGUnXTtcblxuLyoqXG4gKiBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugd2hpY2ggaXMgY2FwYWJsZSBvZiBoYW5kbGluZyBhbiBhdXRob3JpemF0aW9uIHJlcXVlc3RcbiAqIHVzaW5nIHZhcmlvdXMgbWV0aG9kcyAoaWZyYW1lIC8gcG9wdXAgLyBkaWZmZXJlbnQgcHJvY2VzcyBldGMuKS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB1dGlsczogUXVlcnlTdHJpbmdVdGlscywgcHJvdGVjdGVkIGdlbmVyYXRlUmFuZG9tOiBSYW5kb21HZW5lcmF0b3IpIHt9XG5cbiAgLy8gbm90aWZpZXIgc2VuZCB0aGUgcmVzcG9uc2UgYmFjayB0byB0aGUgY2xpZW50LlxuICBwcm90ZWN0ZWQgbm90aWZpZXI6IEF1dGhvcml6YXRpb25Ob3RpZmllcnxudWxsID0gbnVsbDtcblxuICAvKipcbiAgICogQSB1dGlsaXR5IG1ldGhvZCB0byBiZSBhYmxlIHRvIGJ1aWxkIHRoZSBhdXRob3JpemF0aW9uIHJlcXVlc3QgVVJMLlxuICAgKi9cbiAgcHJvdGVjdGVkIGJ1aWxkUmVxdWVzdFVybChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0KSB7XG4gICAgLy8gYnVpbGQgdGhlIHF1ZXJ5IHN0cmluZ1xuICAgIC8vIGNvZXJjZSB0byBhbnkgdHlwZSBmb3IgY29udmVuaWVuY2VcbiAgICBsZXQgcmVxdWVzdE1hcDogU3RyaW5nTWFwID0ge1xuICAgICAgJ3JlZGlyZWN0X3VyaSc6IHJlcXVlc3QucmVkaXJlY3RVcmksXG4gICAgICAnY2xpZW50X2lkJzogcmVxdWVzdC5jbGllbnRJZCxcbiAgICAgICdyZXNwb25zZV90eXBlJzogcmVxdWVzdC5yZXNwb25zZVR5cGUsXG4gICAgICAnc3RhdGUnOiByZXF1ZXN0LnN0YXRlLFxuICAgICAgJ3Njb3BlJzogcmVxdWVzdC5zY29wZVxuICAgIH07XG5cbiAgICAvLyBjb3B5IG92ZXIgZXh0cmFzXG4gICAgaWYgKHJlcXVlc3QuZXh0cmFzKSB7XG4gICAgICBmb3IgKGxldCBleHRyYSBpbiByZXF1ZXN0LmV4dHJhcykge1xuICAgICAgICBpZiAocmVxdWVzdC5leHRyYXMuaGFzT3duUHJvcGVydHkoZXh0cmEpKSB7XG4gICAgICAgICAgLy8gY2hlY2sgYmVmb3JlIGluc2VydGluZyB0byByZXF1ZXN0TWFwXG4gICAgICAgICAgaWYgKEJVSUxUX0lOX1BBUkFNRVRFUlMuaW5kZXhPZihleHRyYSkgPCAwKSB7XG4gICAgICAgICAgICByZXF1ZXN0TWFwW2V4dHJhXSA9IHJlcXVlc3QuZXh0cmFzW2V4dHJhXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcXVlcnkgPSB0aGlzLnV0aWxzLnN0cmluZ2lmeShyZXF1ZXN0TWFwKTtcbiAgICBsZXQgYmFzZVVybCA9IGNvbmZpZ3VyYXRpb24uYXV0aG9yaXphdGlvbkVuZHBvaW50O1xuICAgIGxldCB1cmwgPSBgJHtiYXNlVXJsfT8ke3F1ZXJ5fWA7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wbGV0ZXMgdGhlIGF1dGhvcml6YXRpb24gcmVxdWVzdCBpZiBuZWNlc3NhcnkgJiB3aGVuIHBvc3NpYmxlLlxuICAgKi9cbiAgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdElmUG9zc2libGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gY2FsbCBjb21wbGV0ZSBhdXRob3JpemF0aW9uIGlmIHBvc3NpYmxlIHRvIHNlZSB0aGVyZSBtaWdodFxuICAgIC8vIGJlIGEgcmVzcG9uc2UgdGhhdCBuZWVkcyB0byBiZSBkZWxpdmVyZWQuXG4gICAgbG9nKGBDaGVja2luZyB0byBzZWUgaWYgdGhlcmUgaXMgYW4gYXV0aG9yaXphdGlvbiByZXNwb25zZSB0byBiZSBkZWxpdmVyZWQuYCk7XG4gICAgaWYgKCF0aGlzLm5vdGlmaWVyKSB7XG4gICAgICBsb2coYE5vdGlmaWVyIGlzIG5vdCBwcmVzZW50IG9uIEF1dGhvcml6YXRpb25SZXF1ZXN0IGhhbmRsZXIuXG4gICAgICAgICAgTm8gZGVsaXZlcnkgb2YgcmVzdWx0IHdpbGwgYmUgcG9zc2libGVgKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0KCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgbG9nKGBObyByZXN1bHQgaXMgYXZhaWxhYmxlIHlldC5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgJiYgdGhpcy5ub3RpZmllcikge1xuICAgICAgICB0aGlzLm5vdGlmaWVyLm9uQXV0aG9yaXphdGlvbkNvbXBsZXRlKHJlc3VsdC5yZXF1ZXN0LCByZXN1bHQucmVzcG9uc2UsIHJlc3VsdC5lcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGVmYXVsdCBBdXRob3JpemF0aW9uIFNlcnZpY2Ugbm90aWZpZXIuXG4gICAqL1xuICBzZXRBdXRob3JpemF0aW9uTm90aWZpZXIobm90aWZpZXI6IEF1dGhvcml6YXRpb25Ob3RpZmllcik6IEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XG4gICAgdGhpcy5ub3RpZmllciA9IG5vdGlmaWVyO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNYWtlcyBhbiBhdXRob3JpemF0aW9uIHJlcXVlc3QuXG4gICAqL1xuICBhYnN0cmFjdCBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBhdXRob3JpemF0aW9uIGZsb3cgY2FuIGJlIGNvbXBsZXRlZCwgYW5kIGNvbXBsZXRlcyBpdC5cbiAgICogVGhlIGhhbmRsZXIgcmV0dXJucyBhIGBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U+YCBpZiByZWFkeSwgb3IgYSBgUHJvbWlzZTxudWxsPmBcbiAgICogaWYgbm90IHJlYWR5LlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+O1xufVxuIl19