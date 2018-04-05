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
        this.completeAuthorizationRequest().then(function (result) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFNSCxtQ0FBNkI7QUF1QjdCOzs7R0FHRztBQUNIO0lBQUE7UUFDVSxhQUFRLEdBQStCLElBQUksQ0FBQztJQWtCdEQsQ0FBQztJQWhCQyx3REFBd0IsR0FBeEIsVUFBeUIsUUFBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdURBQXVCLEdBQXZCLFVBQ0ksT0FBNkIsRUFDN0IsUUFBb0MsRUFDcEMsS0FBOEI7UUFDaEMsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLGlDQUFpQztZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbkJZLHNEQUFxQjtBQXFCbEMsaURBQWlEO0FBQ2pELDBCQUEwQjtBQUNiLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFcEc7OztHQUdHO0FBQ0g7SUFDRSxxQ0FBbUIsS0FBdUIsRUFBWSxjQUErQjtRQUFsRSxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFZLG1CQUFjLEdBQWQsY0FBYyxDQUFpQjtRQUVyRixpREFBaUQ7UUFDdkMsYUFBUSxHQUErQixJQUFJLENBQUM7SUFIa0MsQ0FBQztJQUt6Rjs7T0FFRztJQUNPLHFEQUFlLEdBQXpCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBNkI7UUFDL0IseUJBQXlCO1FBQ3pCLHFDQUFxQztRQUNyQyxJQUFJLFVBQVUsR0FBYztZQUMxQixjQUFjLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDbkMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzdCLGVBQWUsRUFBRSxPQUFPLENBQUMsWUFBWTtZQUNyQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1NBQ3ZCLENBQUM7UUFFRixtQkFBbUI7UUFDbkIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ2xCLEtBQUssSUFBSSxLQUFLLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDaEMsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDeEMsdUNBQXVDO29CQUN2QyxJQUFJLDJCQUFtQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQzFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUMzQztpQkFDRjthQUNGO1NBQ0Y7UUFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QyxJQUFJLE9BQU8sR0FBRyxhQUFhLENBQUMscUJBQXFCLENBQUM7UUFDbEQsSUFBSSxHQUFHLEdBQU0sT0FBTyxTQUFJLEtBQU8sQ0FBQztRQUNoQyxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFRDs7T0FFRztJQUNILDRFQUFzQyxHQUF0QztRQUFBLGlCQWdCQztRQWZDLDZEQUE2RDtRQUM3RCw0Q0FBNEM7UUFDNUMsWUFBRyxDQUFDLHdFQUF3RSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsWUFBRyxDQUFDLDRHQUN1QyxDQUFDLENBQUE7U0FDN0M7UUFDRCxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQzdDLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsWUFBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDcEM7WUFDRCxJQUFJLE1BQU0sSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMzQixLQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEY7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILDhEQUF3QixHQUF4QixVQUF5QixRQUErQjtRQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFBQSxDQUFDO0lBZUosa0NBQUM7QUFBRCxDQUFDLEFBbEZELElBa0ZDO0FBbEZxQixrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdCwgQXV0aG9yaXphdGlvblJlcXVlc3RKc29ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25FcnJvciwgQXV0aG9yaXphdGlvbkVycm9ySnNvbiwgQXV0aG9yaXphdGlvblJlc3BvbnNlLCBBdXRob3JpemF0aW9uUmVzcG9uc2VKc29ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVzcG9uc2UnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtjcnlwdG9HZW5lcmF0ZVJhbmRvbSwgUmFuZG9tR2VuZXJhdG9yfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuL3F1ZXJ5X3N0cmluZ191dGlscyc7XG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cblxuLyoqXG4gKiBUaGlzIHR5cGUgcmVwcmVzZW50cyBhIGxhbWJkYSB0aGF0IGNhbiB0YWtlIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0LFxuICogYW5kIGFuIEF1dGhvcml6YXRpb25SZXNwb25zZSBhcyBhcmd1bWVudHMuXG4gKi9cbmV4cG9ydCB0eXBlIEF1dGhvcml6YXRpb25MaXN0ZW5lciA9XG4gICAgKHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0LFxuICAgICByZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwsXG4gICAgIGVycm9yOiBBdXRob3JpemF0aW9uRXJyb3J8bnVsbCkgPT4gdm9pZDtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc3RydWN0dXJhbCB0eXBlIGhvbGRpbmcgYm90aCBhdXRob3JpemF0aW9uIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2Uge1xuICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdDtcbiAgcmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsO1xuICBlcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGw7XG59XG5cbi8qKlxuICogQXV0aG9yaXphdGlvbiBTZXJ2aWNlIG5vdGlmaWVyLlxuICogVGhpcyBtYW5hZ2VzIHRoZSBjb21tdW5pY2F0aW9uIG9mIHRoZSBBdXRob3JpemF0aW9uUmVzcG9uc2UgdG8gdGhlIDNwIGNsaWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25Ob3RpZmllciB7XG4gIHByaXZhdGUgbGlzdGVuZXI6IEF1dGhvcml6YXRpb25MaXN0ZW5lcnxudWxsID0gbnVsbDtcblxuICBzZXRBdXRob3JpemF0aW9uTGlzdGVuZXIobGlzdGVuZXI6IEF1dGhvcml6YXRpb25MaXN0ZW5lcikge1xuICAgIHRoaXMubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYXV0aG9yaXphdGlvbiBjb21wbGV0ZSBjYWxsYmFjay5cbiAgICovXG4gIG9uQXV0aG9yaXphdGlvbkNvbXBsZXRlKFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QsXG4gICAgICByZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwsXG4gICAgICBlcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGwpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5lcikge1xuICAgICAgLy8gY29tcGxldGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0XG4gICAgICB0aGlzLmxpc3RlbmVyKHJlcXVlc3QsIHJlc3BvbnNlLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG5cbi8vIFRPRE8ocmFodWxyYXZAKTogYWRkIG1vcmUgYnVpbHQgaW4gcGFyYW1ldGVycy5cbi8qIGJ1aWx0IGluIHBhcmFtZXRlcnMuICovXG5leHBvcnQgY29uc3QgQlVJTFRfSU5fUEFSQU1FVEVSUyA9IFsncmVkaXJlY3RfdXJpJywgJ2NsaWVudF9pZCcsICdyZXNwb25zZV90eXBlJywgJ3N0YXRlJywgJ3Njb3BlJ107XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgaW50ZXJmYWNlIHdoaWNoIGlzIGNhcGFibGUgb2YgaGFuZGxpbmcgYW4gYXV0aG9yaXphdGlvbiByZXF1ZXN0XG4gKiB1c2luZyB2YXJpb3VzIG1ldGhvZHMgKGlmcmFtZSAvIHBvcHVwIC8gZGlmZmVyZW50IHByb2Nlc3MgZXRjLikuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdXRpbHM6IFF1ZXJ5U3RyaW5nVXRpbHMsIHByb3RlY3RlZCBnZW5lcmF0ZVJhbmRvbTogUmFuZG9tR2VuZXJhdG9yKSB7fVxuXG4gIC8vIG5vdGlmaWVyIHNlbmQgdGhlIHJlc3BvbnNlIGJhY2sgdG8gdGhlIGNsaWVudC5cbiAgcHJvdGVjdGVkIG5vdGlmaWVyOiBBdXRob3JpemF0aW9uTm90aWZpZXJ8bnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEEgdXRpbGl0eSBtZXRob2QgdG8gYmUgYWJsZSB0byBidWlsZCB0aGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0IFVSTC5cbiAgICovXG4gIHByb3RlY3RlZCBidWlsZFJlcXVlc3RVcmwoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCkge1xuICAgIC8vIGJ1aWxkIHRoZSBxdWVyeSBzdHJpbmdcbiAgICAvLyBjb2VyY2UgdG8gYW55IHR5cGUgZm9yIGNvbnZlbmllbmNlXG4gICAgbGV0IHJlcXVlc3RNYXA6IFN0cmluZ01hcCA9IHtcbiAgICAgICdyZWRpcmVjdF91cmknOiByZXF1ZXN0LnJlZGlyZWN0VXJpLFxuICAgICAgJ2NsaWVudF9pZCc6IHJlcXVlc3QuY2xpZW50SWQsXG4gICAgICAncmVzcG9uc2VfdHlwZSc6IHJlcXVlc3QucmVzcG9uc2VUeXBlLFxuICAgICAgJ3N0YXRlJzogcmVxdWVzdC5zdGF0ZSxcbiAgICAgICdzY29wZSc6IHJlcXVlc3Quc2NvcGVcbiAgICB9O1xuXG4gICAgLy8gY29weSBvdmVyIGV4dHJhc1xuICAgIGlmIChyZXF1ZXN0LmV4dHJhcykge1xuICAgICAgZm9yIChsZXQgZXh0cmEgaW4gcmVxdWVzdC5leHRyYXMpIHtcbiAgICAgICAgaWYgKHJlcXVlc3QuZXh0cmFzLmhhc093blByb3BlcnR5KGV4dHJhKSkge1xuICAgICAgICAgIC8vIGNoZWNrIGJlZm9yZSBpbnNlcnRpbmcgdG8gcmVxdWVzdE1hcFxuICAgICAgICAgIGlmIChCVUlMVF9JTl9QQVJBTUVURVJTLmluZGV4T2YoZXh0cmEpIDwgMCkge1xuICAgICAgICAgICAgcmVxdWVzdE1hcFtleHRyYV0gPSByZXF1ZXN0LmV4dHJhc1tleHRyYV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHF1ZXJ5ID0gdGhpcy51dGlscy5zdHJpbmdpZnkocmVxdWVzdE1hcCk7XG4gICAgbGV0IGJhc2VVcmwgPSBjb25maWd1cmF0aW9uLmF1dGhvcml6YXRpb25FbmRwb2ludDtcbiAgICBsZXQgdXJsID0gYCR7YmFzZVVybH0/JHtxdWVyeX1gO1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGxldGVzIHRoZSBhdXRob3JpemF0aW9uIHJlcXVlc3QgaWYgbmVjZXNzYXJ5ICYgd2hlbiBwb3NzaWJsZS5cbiAgICovXG4gIGNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3RJZlBvc3NpYmxlKCk6IHZvaWQge1xuICAgIC8vIGNhbGwgY29tcGxldGUgYXV0aG9yaXphdGlvbiBpZiBwb3NzaWJsZSB0byBzZWUgdGhlcmUgbWlnaHRcbiAgICAvLyBiZSBhIHJlc3BvbnNlIHRoYXQgbmVlZHMgdG8gYmUgZGVsaXZlcmVkLlxuICAgIGxvZyhgQ2hlY2tpbmcgdG8gc2VlIGlmIHRoZXJlIGlzIGFuIGF1dGhvcml6YXRpb24gcmVzcG9uc2UgdG8gYmUgZGVsaXZlcmVkLmApO1xuICAgIGlmICghdGhpcy5ub3RpZmllcikge1xuICAgICAgbG9nKGBOb3RpZmllciBpcyBub3QgcHJlc2VudCBvbiBBdXRob3JpemF0aW9uUmVxdWVzdCBoYW5kbGVyLlxuICAgICAgICAgIE5vIGRlbGl2ZXJ5IG9mIHJlc3VsdCB3aWxsIGJlIHBvc3NpYmxlYClcbiAgICB9XG4gICAgdGhpcy5jb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0KCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgbG9nKGBObyByZXN1bHQgaXMgYXZhaWxhYmxlIHlldC5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgJiYgdGhpcy5ub3RpZmllcikge1xuICAgICAgICB0aGlzLm5vdGlmaWVyLm9uQXV0aG9yaXphdGlvbkNvbXBsZXRlKHJlc3VsdC5yZXF1ZXN0LCByZXN1bHQucmVzcG9uc2UsIHJlc3VsdC5lcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGVmYXVsdCBBdXRob3JpemF0aW9uIFNlcnZpY2Ugbm90aWZpZXIuXG4gICAqL1xuICBzZXRBdXRob3JpemF0aW9uTm90aWZpZXIobm90aWZpZXI6IEF1dGhvcml6YXRpb25Ob3RpZmllcik6IEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XG4gICAgdGhpcy5ub3RpZmllciA9IG5vdGlmaWVyO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNYWtlcyBhbiBhdXRob3JpemF0aW9uIHJlcXVlc3QuXG4gICAqL1xuICBhYnN0cmFjdCBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCk6IHZvaWQ7XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBhdXRob3JpemF0aW9uIGZsb3cgY2FuIGJlIGNvbXBsZXRlZCwgYW5kIGNvbXBsZXRlcyBpdC5cbiAgICogVGhlIGhhbmRsZXIgcmV0dXJucyBhIGBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U+YCBpZiByZWFkeSwgb3IgYSBgUHJvbWlzZTxudWxsPmBcbiAgICogaWYgbm90IHJlYWR5LlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+O1xufVxuIl19