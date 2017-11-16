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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFNSCxtQ0FBNkI7QUFzQjdCOzs7R0FHRztBQUNIO0lBQUE7UUFDVSxhQUFRLEdBQStCLElBQUksQ0FBQztJQWtCdEQsQ0FBQztJQWhCQyx3REFBd0IsR0FBeEIsVUFBeUIsUUFBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdURBQXVCLEdBQXZCLFVBQ0ksT0FBNkIsRUFDN0IsUUFBb0MsRUFDcEMsS0FBOEI7UUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsaUNBQWlDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDO0lBQ0gsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQztBQW5CWSxzREFBcUI7QUFxQmxDLGlEQUFpRDtBQUNqRCwwQkFBMEI7QUFDYixRQUFBLG1CQUFtQixHQUFHLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRXBHOzs7R0FHRztBQUNIO0lBQ0UscUNBQW1CLEtBQXVCLEVBQVksY0FBK0I7UUFBbEUsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFBWSxtQkFBYyxHQUFkLGNBQWMsQ0FBaUI7UUFFckYsaURBQWlEO1FBQ3ZDLGFBQVEsR0FBK0IsSUFBSSxDQUFDO0lBSGtDLENBQUM7SUFLekY7O09BRUc7SUFDTyxxREFBZSxHQUF6QixVQUNJLGFBQWdELEVBQ2hELE9BQTZCO1FBQy9CLHlCQUF5QjtRQUN6QixxQ0FBcUM7UUFDckMsSUFBSSxVQUFVLEdBQWM7WUFDMUIsY0FBYyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLFdBQVcsRUFBRSxPQUFPLENBQUMsUUFBUTtZQUM3QixlQUFlLEVBQUUsT0FBTyxDQUFDLFlBQVk7WUFDckMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3RCLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSztTQUN2QixDQUFDO1FBRUYsbUJBQW1CO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ25CLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLHVDQUF1QztvQkFDdkMsRUFBRSxDQUFDLENBQUMsMkJBQW1CLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1QyxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLElBQUksT0FBTyxHQUFHLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztRQUNsRCxJQUFJLEdBQUcsR0FBTSxPQUFPLFNBQUksS0FBTyxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQ7O09BRUc7SUFDSCw0RUFBc0MsR0FBdEM7UUFBQSxpQkFnQkM7UUFmQyw2REFBNkQ7UUFDN0QsNENBQTRDO1FBQzVDLFlBQUcsQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO1FBQzlFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkIsWUFBRyxDQUFDLDRHQUN1QyxDQUFDLENBQUE7UUFDOUMsQ0FBQztRQUNELElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDN0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNaLFlBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLEtBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCw4REFBd0IsR0FBeEIsVUFBeUIsUUFBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFBQSxDQUFDO0lBZUosa0NBQUM7QUFBRCxDQUFDLEFBbEZELElBa0ZDO0FBbEZxQixrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdCwgQXV0aG9yaXphdGlvblJlcXVlc3RKc29ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25FcnJvciwgQXV0aG9yaXphdGlvbkVycm9ySnNvbiwgQXV0aG9yaXphdGlvblJlc3BvbnNlLCBBdXRob3JpemF0aW9uUmVzcG9uc2VKc29ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fcmVzcG9uc2UnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtjcnlwdG9HZW5lcmF0ZVJhbmRvbSwgUmFuZG9tR2VuZXJhdG9yfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xuaW1wb3J0IHtRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuL3F1ZXJ5X3N0cmluZ191dGlscyc7XG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogVGhpcyB0eXBlIHJlcHJlc2VudHMgYSBsYW1iZGEgdGhhdCBjYW4gdGFrZSBhbiBBdXRob3JpemF0aW9uUmVxdWVzdCxcbiAqIGFuZCBhbiBBdXRob3JpemF0aW9uUmVzcG9uc2UgYXMgYXJndW1lbnRzLlxuICovXG5leHBvcnQgdHlwZSBBdXRob3JpemF0aW9uTGlzdGVuZXIgPVxuICAgIChyZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCxcbiAgICAgcmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsLFxuICAgICBlcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGwpID0+IHZvaWQ7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHN0cnVjdHVyYWwgdHlwZSBob2xkaW5nIGJvdGggYXV0aG9yaXphdGlvbiByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlIHtcbiAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3Q7XG4gIHJlc3BvbnNlOiBBdXRob3JpemF0aW9uUmVzcG9uc2V8bnVsbDtcbiAgZXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsO1xufVxuXG4vKipcbiAqIEF1dGhvcml6YXRpb24gU2VydmljZSBub3RpZmllci5cbiAqIFRoaXMgbWFuYWdlcyB0aGUgY29tbXVuaWNhdGlvbiBvZiB0aGUgQXV0aG9yaXphdGlvblJlc3BvbnNlIHRvIHRoZSAzcCBjbGllbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uTm90aWZpZXIge1xuICBwcml2YXRlIGxpc3RlbmVyOiBBdXRob3JpemF0aW9uTGlzdGVuZXJ8bnVsbCA9IG51bGw7XG5cbiAgc2V0QXV0aG9yaXphdGlvbkxpc3RlbmVyKGxpc3RlbmVyOiBBdXRob3JpemF0aW9uTGlzdGVuZXIpIHtcbiAgICB0aGlzLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGF1dGhvcml6YXRpb24gY29tcGxldGUgY2FsbGJhY2suXG4gICAqL1xuICBvbkF1dGhvcml6YXRpb25Db21wbGV0ZShcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0LFxuICAgICAgcmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsLFxuICAgICAgZXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlzdGVuZXIpIHtcbiAgICAgIC8vIGNvbXBsZXRlIGF1dGhvcml6YXRpb24gcmVxdWVzdFxuICAgICAgdGhpcy5saXN0ZW5lcihyZXF1ZXN0LCByZXNwb25zZSwgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBUT0RPKHJhaHVscmF2QCk6IGFkZCBtb3JlIGJ1aWx0IGluIHBhcmFtZXRlcnMuXG4vKiBidWlsdCBpbiBwYXJhbWV0ZXJzLiAqL1xuZXhwb3J0IGNvbnN0IEJVSUxUX0lOX1BBUkFNRVRFUlMgPSBbJ3JlZGlyZWN0X3VyaScsICdjbGllbnRfaWQnLCAncmVzcG9uc2VfdHlwZScsICdzdGF0ZScsICdzY29wZSddO1xuXG4vKipcbiAqIERlZmluZXMgdGhlIGludGVyZmFjZSB3aGljaCBpcyBjYXBhYmxlIG9mIGhhbmRsaW5nIGFuIGF1dGhvcml6YXRpb24gcmVxdWVzdFxuICogdXNpbmcgdmFyaW91cyBtZXRob2RzIChpZnJhbWUgLyBwb3B1cCAvIGRpZmZlcmVudCBwcm9jZXNzIGV0Yy4pLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IocHVibGljIHV0aWxzOiBRdWVyeVN0cmluZ1V0aWxzLCBwcm90ZWN0ZWQgZ2VuZXJhdGVSYW5kb206IFJhbmRvbUdlbmVyYXRvcikge31cblxuICAvLyBub3RpZmllciBzZW5kIHRoZSByZXNwb25zZSBiYWNrIHRvIHRoZSBjbGllbnQuXG4gIHByb3RlY3RlZCBub3RpZmllcjogQXV0aG9yaXphdGlvbk5vdGlmaWVyfG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBBIHV0aWxpdHkgbWV0aG9kIHRvIGJlIGFibGUgdG8gYnVpbGQgdGhlIGF1dGhvcml6YXRpb24gcmVxdWVzdCBVUkwuXG4gICAqL1xuICBwcm90ZWN0ZWQgYnVpbGRSZXF1ZXN0VXJsKFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpIHtcbiAgICAvLyBidWlsZCB0aGUgcXVlcnkgc3RyaW5nXG4gICAgLy8gY29lcmNlIHRvIGFueSB0eXBlIGZvciBjb252ZW5pZW5jZVxuICAgIGxldCByZXF1ZXN0TWFwOiBTdHJpbmdNYXAgPSB7XG4gICAgICAncmVkaXJlY3RfdXJpJzogcmVxdWVzdC5yZWRpcmVjdFVyaSxcbiAgICAgICdjbGllbnRfaWQnOiByZXF1ZXN0LmNsaWVudElkLFxuICAgICAgJ3Jlc3BvbnNlX3R5cGUnOiByZXF1ZXN0LnJlc3BvbnNlVHlwZSxcbiAgICAgICdzdGF0ZSc6IHJlcXVlc3Quc3RhdGUsXG4gICAgICAnc2NvcGUnOiByZXF1ZXN0LnNjb3BlXG4gICAgfTtcblxuICAgIC8vIGNvcHkgb3ZlciBleHRyYXNcbiAgICBpZiAocmVxdWVzdC5leHRyYXMpIHtcbiAgICAgIGZvciAobGV0IGV4dHJhIGluIHJlcXVlc3QuZXh0cmFzKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0LmV4dHJhcy5oYXNPd25Qcm9wZXJ0eShleHRyYSkpIHtcbiAgICAgICAgICAvLyBjaGVjayBiZWZvcmUgaW5zZXJ0aW5nIHRvIHJlcXVlc3RNYXBcbiAgICAgICAgICBpZiAoQlVJTFRfSU5fUEFSQU1FVEVSUy5pbmRleE9mKGV4dHJhKSA8IDApIHtcbiAgICAgICAgICAgIHJlcXVlc3RNYXBbZXh0cmFdID0gcmVxdWVzdC5leHRyYXNbZXh0cmFdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBxdWVyeSA9IHRoaXMudXRpbHMuc3RyaW5naWZ5KHJlcXVlc3RNYXApO1xuICAgIGxldCBiYXNlVXJsID0gY29uZmlndXJhdGlvbi5hdXRob3JpemF0aW9uRW5kcG9pbnQ7XG4gICAgbGV0IHVybCA9IGAke2Jhc2VVcmx9PyR7cXVlcnl9YDtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBsZXRlcyB0aGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0IGlmIG5lY2Vzc2FyeSAmIHdoZW4gcG9zc2libGUuXG4gICAqL1xuICBjb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0SWZQb3NzaWJsZSgpOiB2b2lkIHtcbiAgICAvLyBjYWxsIGNvbXBsZXRlIGF1dGhvcml6YXRpb24gaWYgcG9zc2libGUgdG8gc2VlIHRoZXJlIG1pZ2h0XG4gICAgLy8gYmUgYSByZXNwb25zZSB0aGF0IG5lZWRzIHRvIGJlIGRlbGl2ZXJlZC5cbiAgICBsb2coYENoZWNraW5nIHRvIHNlZSBpZiB0aGVyZSBpcyBhbiBhdXRob3JpemF0aW9uIHJlc3BvbnNlIHRvIGJlIGRlbGl2ZXJlZC5gKTtcbiAgICBpZiAoIXRoaXMubm90aWZpZXIpIHtcbiAgICAgIGxvZyhgTm90aWZpZXIgaXMgbm90IHByZXNlbnQgb24gQXV0aG9yaXphdGlvblJlcXVlc3QgaGFuZGxlci5cbiAgICAgICAgICBObyBkZWxpdmVyeSBvZiByZXN1bHQgd2lsbCBiZSBwb3NzaWJsZWApXG4gICAgfVxuICAgIHRoaXMuY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgIGxvZyhgTm8gcmVzdWx0IGlzIGF2YWlsYWJsZSB5ZXQuYCk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ICYmIHRoaXMubm90aWZpZXIpIHtcbiAgICAgICAgdGhpcy5ub3RpZmllci5vbkF1dGhvcml6YXRpb25Db21wbGV0ZShyZXN1bHQucmVxdWVzdCwgcmVzdWx0LnJlc3BvbnNlLCByZXN1bHQuZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRlZmF1bHQgQXV0aG9yaXphdGlvbiBTZXJ2aWNlIG5vdGlmaWVyLlxuICAgKi9cbiAgc2V0QXV0aG9yaXphdGlvbk5vdGlmaWVyKG5vdGlmaWVyOiBBdXRob3JpemF0aW9uTm90aWZpZXIpOiBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIge1xuICAgIHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogTWFrZXMgYW4gYXV0aG9yaXphdGlvbiByZXF1ZXN0LlxuICAgKi9cbiAgYWJzdHJhY3QgcGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gYXV0aG9yaXphdGlvbiBmbG93IGNhbiBiZSBjb21wbGV0ZWQsIGFuZCBjb21wbGV0ZXMgaXQuXG4gICAqIFRoZSBoYW5kbGVyIHJldHVybnMgYSBgUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlPmAgaWYgcmVhZHksIG9yIGEgYFByb21pc2U8bnVsbD5gXG4gICAqIGlmIG5vdCByZWFkeS5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0KCk6IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZXxudWxsPjtcbn1cbiJdfQ==