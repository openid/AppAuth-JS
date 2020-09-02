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
exports.AuthorizationRequestHandler = exports.BUILT_IN_PARAMETERS = exports.AuthorizationNotifier = void 0;
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
    function AuthorizationRequestHandler(utils, crypto) {
        this.utils = utils;
        this.crypto = crypto;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBTUgsbUNBQTZCO0FBdUI3Qjs7O0dBR0c7QUFDSDtJQUFBO1FBQ1UsYUFBUSxHQUErQixJQUFJLENBQUM7SUFrQnRELENBQUM7SUFoQkMsd0RBQXdCLEdBQXhCLFVBQXlCLFFBQStCO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILHVEQUF1QixHQUF2QixVQUNJLE9BQTZCLEVBQzdCLFFBQW9DLEVBQ3BDLEtBQThCO1FBQ2hDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQztBQW5CWSxzREFBcUI7QUFxQmxDLGlEQUFpRDtBQUNqRCwwQkFBMEI7QUFDYixRQUFBLG1CQUFtQixHQUFHLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRXBHOzs7R0FHRztBQUNIO0lBQ0UscUNBQW1CLEtBQXVCLEVBQVksTUFBYztRQUFqRCxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFZLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFcEUsaURBQWlEO1FBQ3ZDLGFBQVEsR0FBK0IsSUFBSSxDQUFDO0lBSGlCLENBQUM7SUFLeEU7O09BRUc7SUFDTyxxREFBZSxHQUF6QixVQUNJLGFBQWdELEVBQ2hELE9BQTZCO1FBQy9CLHlCQUF5QjtRQUN6QixxQ0FBcUM7UUFDckMsSUFBSSxVQUFVLEdBQWM7WUFDMUIsY0FBYyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLFdBQVcsRUFBRSxPQUFPLENBQUMsUUFBUTtZQUM3QixlQUFlLEVBQUUsT0FBTyxDQUFDLFlBQVk7WUFDckMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3RCLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSztTQUN2QixDQUFDO1FBRUYsbUJBQW1CO1FBQ25CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQixLQUFLLElBQUksS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3hDLHVDQUF1QztvQkFDdkMsSUFBSSwyQkFBbUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUMxQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDM0M7aUJBQ0Y7YUFDRjtTQUNGO1FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsSUFBSSxPQUFPLEdBQUcsYUFBYSxDQUFDLHFCQUFxQixDQUFDO1FBQ2xELElBQUksR0FBRyxHQUFNLE9BQU8sU0FBSSxLQUFPLENBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQ7O09BRUc7SUFDSCw0RUFBc0MsR0FBdEM7UUFBQSxpQkFnQkM7UUFmQyw2REFBNkQ7UUFDN0QsNENBQTRDO1FBQzVDLFlBQUcsQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLFlBQUcsQ0FBQyw0R0FDdUMsQ0FBQyxDQUFBO1NBQzdDO1FBQ0QsT0FBTyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ3BELElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsWUFBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDcEM7WUFDRCxJQUFJLE1BQU0sSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMzQixLQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEY7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILDhEQUF3QixHQUF4QixVQUF5QixRQUErQjtRQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFBQSxDQUFDO0lBZUosa0NBQUM7QUFBRCxDQUFDLEFBbEZELElBa0ZDO0FBbEZxQixrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdH0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uRXJyb3IsIEF1dGhvcml6YXRpb25SZXNwb25zZX0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3Jlc3BvbnNlJztcbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7Q3J5cHRvfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuL3F1ZXJ5X3N0cmluZ191dGlscyc7XG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cblxuLyoqXG4gKiBUaGlzIHR5cGUgcmVwcmVzZW50cyBhIGxhbWJkYSB0aGF0IGNhbiB0YWtlIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0LFxuICogYW5kIGFuIEF1dGhvcml6YXRpb25SZXNwb25zZSBhcyBhcmd1bWVudHMuXG4gKi9cbmV4cG9ydCB0eXBlIEF1dGhvcml6YXRpb25MaXN0ZW5lciA9XG4gICAgKHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0LFxuICAgICByZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwsXG4gICAgIGVycm9yOiBBdXRob3JpemF0aW9uRXJyb3J8bnVsbCkgPT4gdm9pZDtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc3RydWN0dXJhbCB0eXBlIGhvbGRpbmcgYm90aCBhdXRob3JpemF0aW9uIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2Uge1xuICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdDtcbiAgcmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsO1xuICBlcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGw7XG59XG5cbi8qKlxuICogQXV0aG9yaXphdGlvbiBTZXJ2aWNlIG5vdGlmaWVyLlxuICogVGhpcyBtYW5hZ2VzIHRoZSBjb21tdW5pY2F0aW9uIG9mIHRoZSBBdXRob3JpemF0aW9uUmVzcG9uc2UgdG8gdGhlIDNwIGNsaWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25Ob3RpZmllciB7XG4gIHByaXZhdGUgbGlzdGVuZXI6IEF1dGhvcml6YXRpb25MaXN0ZW5lcnxudWxsID0gbnVsbDtcblxuICBzZXRBdXRob3JpemF0aW9uTGlzdGVuZXIobGlzdGVuZXI6IEF1dGhvcml6YXRpb25MaXN0ZW5lcikge1xuICAgIHRoaXMubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYXV0aG9yaXphdGlvbiBjb21wbGV0ZSBjYWxsYmFjay5cbiAgICovXG4gIG9uQXV0aG9yaXphdGlvbkNvbXBsZXRlKFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QsXG4gICAgICByZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwsXG4gICAgICBlcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGwpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5lcikge1xuICAgICAgLy8gY29tcGxldGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0XG4gICAgICB0aGlzLmxpc3RlbmVyKHJlcXVlc3QsIHJlc3BvbnNlLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG5cbi8vIFRPRE8ocmFodWxyYXZAKTogYWRkIG1vcmUgYnVpbHQgaW4gcGFyYW1ldGVycy5cbi8qIGJ1aWx0IGluIHBhcmFtZXRlcnMuICovXG5leHBvcnQgY29uc3QgQlVJTFRfSU5fUEFSQU1FVEVSUyA9IFsncmVkaXJlY3RfdXJpJywgJ2NsaWVudF9pZCcsICdyZXNwb25zZV90eXBlJywgJ3N0YXRlJywgJ3Njb3BlJ107XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgaW50ZXJmYWNlIHdoaWNoIGlzIGNhcGFibGUgb2YgaGFuZGxpbmcgYW4gYXV0aG9yaXphdGlvbiByZXF1ZXN0XG4gKiB1c2luZyB2YXJpb3VzIG1ldGhvZHMgKGlmcmFtZSAvIHBvcHVwIC8gZGlmZmVyZW50IHByb2Nlc3MgZXRjLikuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdXRpbHM6IFF1ZXJ5U3RyaW5nVXRpbHMsIHByb3RlY3RlZCBjcnlwdG86IENyeXB0bykge31cblxuICAvLyBub3RpZmllciBzZW5kIHRoZSByZXNwb25zZSBiYWNrIHRvIHRoZSBjbGllbnQuXG4gIHByb3RlY3RlZCBub3RpZmllcjogQXV0aG9yaXphdGlvbk5vdGlmaWVyfG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBBIHV0aWxpdHkgbWV0aG9kIHRvIGJlIGFibGUgdG8gYnVpbGQgdGhlIGF1dGhvcml6YXRpb24gcmVxdWVzdCBVUkwuXG4gICAqL1xuICBwcm90ZWN0ZWQgYnVpbGRSZXF1ZXN0VXJsKFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpIHtcbiAgICAvLyBidWlsZCB0aGUgcXVlcnkgc3RyaW5nXG4gICAgLy8gY29lcmNlIHRvIGFueSB0eXBlIGZvciBjb252ZW5pZW5jZVxuICAgIGxldCByZXF1ZXN0TWFwOiBTdHJpbmdNYXAgPSB7XG4gICAgICAncmVkaXJlY3RfdXJpJzogcmVxdWVzdC5yZWRpcmVjdFVyaSxcbiAgICAgICdjbGllbnRfaWQnOiByZXF1ZXN0LmNsaWVudElkLFxuICAgICAgJ3Jlc3BvbnNlX3R5cGUnOiByZXF1ZXN0LnJlc3BvbnNlVHlwZSxcbiAgICAgICdzdGF0ZSc6IHJlcXVlc3Quc3RhdGUsXG4gICAgICAnc2NvcGUnOiByZXF1ZXN0LnNjb3BlXG4gICAgfTtcblxuICAgIC8vIGNvcHkgb3ZlciBleHRyYXNcbiAgICBpZiAocmVxdWVzdC5leHRyYXMpIHtcbiAgICAgIGZvciAobGV0IGV4dHJhIGluIHJlcXVlc3QuZXh0cmFzKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0LmV4dHJhcy5oYXNPd25Qcm9wZXJ0eShleHRyYSkpIHtcbiAgICAgICAgICAvLyBjaGVjayBiZWZvcmUgaW5zZXJ0aW5nIHRvIHJlcXVlc3RNYXBcbiAgICAgICAgICBpZiAoQlVJTFRfSU5fUEFSQU1FVEVSUy5pbmRleE9mKGV4dHJhKSA8IDApIHtcbiAgICAgICAgICAgIHJlcXVlc3RNYXBbZXh0cmFdID0gcmVxdWVzdC5leHRyYXNbZXh0cmFdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBxdWVyeSA9IHRoaXMudXRpbHMuc3RyaW5naWZ5KHJlcXVlc3RNYXApO1xuICAgIGxldCBiYXNlVXJsID0gY29uZmlndXJhdGlvbi5hdXRob3JpemF0aW9uRW5kcG9pbnQ7XG4gICAgbGV0IHVybCA9IGAke2Jhc2VVcmx9PyR7cXVlcnl9YDtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBsZXRlcyB0aGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0IGlmIG5lY2Vzc2FyeSAmIHdoZW4gcG9zc2libGUuXG4gICAqL1xuICBjb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0SWZQb3NzaWJsZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBjYWxsIGNvbXBsZXRlIGF1dGhvcml6YXRpb24gaWYgcG9zc2libGUgdG8gc2VlIHRoZXJlIG1pZ2h0XG4gICAgLy8gYmUgYSByZXNwb25zZSB0aGF0IG5lZWRzIHRvIGJlIGRlbGl2ZXJlZC5cbiAgICBsb2coYENoZWNraW5nIHRvIHNlZSBpZiB0aGVyZSBpcyBhbiBhdXRob3JpemF0aW9uIHJlc3BvbnNlIHRvIGJlIGRlbGl2ZXJlZC5gKTtcbiAgICBpZiAoIXRoaXMubm90aWZpZXIpIHtcbiAgICAgIGxvZyhgTm90aWZpZXIgaXMgbm90IHByZXNlbnQgb24gQXV0aG9yaXphdGlvblJlcXVlc3QgaGFuZGxlci5cbiAgICAgICAgICBObyBkZWxpdmVyeSBvZiByZXN1bHQgd2lsbCBiZSBwb3NzaWJsZWApXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICBsb2coYE5vIHJlc3VsdCBpcyBhdmFpbGFibGUgeWV0LmApO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCAmJiB0aGlzLm5vdGlmaWVyKSB7XG4gICAgICAgIHRoaXMubm90aWZpZXIub25BdXRob3JpemF0aW9uQ29tcGxldGUocmVzdWx0LnJlcXVlc3QsIHJlc3VsdC5yZXNwb25zZSwgcmVzdWx0LmVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBkZWZhdWx0IEF1dGhvcml6YXRpb24gU2VydmljZSBub3RpZmllci5cbiAgICovXG4gIHNldEF1dGhvcml6YXRpb25Ob3RpZmllcihub3RpZmllcjogQXV0aG9yaXphdGlvbk5vdGlmaWVyKTogQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHtcbiAgICB0aGlzLm5vdGlmaWVyID0gbm90aWZpZXI7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1ha2VzIGFuIGF1dGhvcml6YXRpb24gcmVxdWVzdC5cbiAgICovXG4gIGFic3RyYWN0IHBlcmZvcm1BdXRob3JpemF0aW9uUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0KTogdm9pZDtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFuIGF1dGhvcml6YXRpb24gZmxvdyBjYW4gYmUgY29tcGxldGVkLCBhbmQgY29tcGxldGVzIGl0LlxuICAgKiBUaGUgaGFuZGxlciByZXR1cm5zIGEgYFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZT5gIGlmIHJlYWR5LCBvciBhIGBQcm9taXNlPG51bGw+YFxuICAgKiBpZiBub3QgcmVhZHkuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD47XG59XG4iXX0=