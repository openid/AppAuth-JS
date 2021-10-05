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
exports.AuthorizationRequestHandler = exports.AuthorizationNotifier = void 0;
var logger_1 = require("./logger");
var types_1 = require("./types");
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
    AuthorizationRequestHandler.prototype.buildRequestUrl = function (configuration, request, requestType) {
        // build the query string
        // coerce to any type for convenience
        var requestMap = request.toRequestMap();
        var query = this.utils.stringify(requestMap);
        var baseUrl = requestType === types_1.RedirectRequestTypes.authorization ?
            configuration.authorizationEndpoint :
            configuration.endSessionEndpoint;
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
     * Completes the endsession request if necessary & when possible.
     */
    AuthorizationRequestHandler.prototype.completeEndSessionRequestIfPossible = function () {
        var _this = this;
        // call complete endsession if possible to see there might
        // be a response that needs to be delivered.
        logger_1.log("Checking to see if there is an endsession response to be delivered.");
        if (!this.notifier) {
            logger_1.log("Notifier is not present on EndSessionRequest handler.\n          No delivery of result will be possible");
        }
        return this.completeEndSessionRequest().then(function (result) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBT0gsbUNBQTZCO0FBRTdCLGlDQUF3RDtBQXFCeEQ7OztHQUdHO0FBQ0g7SUFBQTtRQUNVLGFBQVEsR0FBK0IsSUFBSSxDQUFDO0lBa0J0RCxDQUFDO0lBaEJDLHdEQUF3QixHQUF4QixVQUF5QixRQUErQjtRQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCx1REFBdUIsR0FBdkIsVUFDSSxPQUF1QyxFQUN2QyxRQUE4QyxFQUM5QyxLQUE4QjtRQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsaUNBQWlDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN6QztJQUNILENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUFuQkQsSUFtQkM7QUFuQlksc0RBQXFCO0FBc0JsQzs7O0dBR0c7QUFDSDtJQUNFLHFDQUFtQixLQUF1QixFQUFZLE1BQWM7UUFBakQsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFBWSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBRXBFLGlEQUFpRDtRQUN2QyxhQUFRLEdBQStCLElBQUksQ0FBQztJQUhpQixDQUFDO0lBS3hFOztPQUVHO0lBQ08scURBQWUsR0FBekIsVUFDSSxhQUFnRCxFQUNoRCxPQUF1QyxFQUN2QyxXQUFpQztRQUNuQyx5QkFBeUI7UUFDekIscUNBQXFDO1FBQ3JDLElBQUksVUFBVSxHQUFjLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUNsRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3QyxJQUFJLE9BQU8sR0FBRyxXQUFXLEtBQUssNEJBQW9CLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDOUQsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDckMsYUFBYSxDQUFDLGtCQUFrQixDQUFDO1FBQ3JDLElBQUksR0FBRyxHQUFNLE9BQU8sU0FBSSxLQUFPLENBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQ7O09BRUc7SUFDSCw0RUFBc0MsR0FBdEM7UUFBQSxpQkFnQkM7UUFmQyw2REFBNkQ7UUFDN0QsNENBQTRDO1FBQzVDLFlBQUcsQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLFlBQUcsQ0FBQyw0R0FDdUMsQ0FBQyxDQUFBO1NBQzdDO1FBQ0QsT0FBTyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ3BELElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsWUFBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDcEM7WUFDRCxJQUFJLE1BQU0sSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMzQixLQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEY7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILHlFQUFtQyxHQUFuQztRQUFBLGlCQWdCQztRQWZDLDBEQUEwRDtRQUMxRCw0Q0FBNEM7UUFDNUMsWUFBRyxDQUFDLHFFQUFxRSxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsWUFBRyxDQUFDLHlHQUN1QyxDQUFDLENBQUE7U0FDN0M7UUFDRCxPQUFPLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07WUFDakQsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCxZQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQzthQUNwQztZQUNELElBQUksTUFBTSxJQUFJLEtBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQzNCLEtBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0RjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOztPQUVHO0lBQ0gsOERBQXdCLEdBQXhCLFVBQXlCLFFBQStCO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUFBLENBQUM7SUE0Qkosa0NBQUM7QUFBRCxDQUFDLEFBcEdELElBb0dDO0FBcEdxQixrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uTWFuYWdlbWVudFJlcXVlc3R9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9tYW5hZ2VtZW50X3JlcXVlc3QnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uTWFuYWdlbWVudFJlc3BvbnNlfSBmcm9tICcuL2F1dGhvcml6YXRpb25fbWFuYWdlbWVudF9yZXNwb25zZSc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25FcnJvcn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX21hbmFnZW1lbnRfcmVzcG9uc2UnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtDcnlwdG99IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge1F1ZXJ5U3RyaW5nVXRpbHN9IGZyb20gJy4vcXVlcnlfc3RyaW5nX3V0aWxzJztcbmltcG9ydCB7UmVkaXJlY3RSZXF1ZXN0VHlwZXMsIFN0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cblxuLyoqXG4gKiBUaGlzIHR5cGUgcmVwcmVzZW50cyBhIGxhbWJkYSB0aGF0IGNhbiB0YWtlIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0LFxuICogYW5kIGFuIEF1dGhvcml6YXRpb25SZXNwb25zZSBhcyBhcmd1bWVudHMuXG4gKi9cbmV4cG9ydCB0eXBlIEF1dGhvcml6YXRpb25MaXN0ZW5lciA9XG4gICAgKHJlcXVlc3Q6IEF1dGhvcml6YXRpb25NYW5hZ2VtZW50UmVxdWVzdCxcbiAgICAgcmVzcG9uc2U6IEF1dGhvcml6YXRpb25NYW5hZ2VtZW50UmVzcG9uc2V8bnVsbCxcbiAgICAgZXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsKSA9PiB2b2lkO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBzdHJ1Y3R1cmFsIHR5cGUgaG9sZGluZyBib3RoIGF1dGhvcml6YXRpb24gcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZSB7XG4gIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25NYW5hZ2VtZW50UmVxdWVzdDtcbiAgcmVzcG9uc2U6IEF1dGhvcml6YXRpb25NYW5hZ2VtZW50UmVzcG9uc2V8bnVsbDtcbiAgZXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsO1xufVxuXG4vKipcbiAqIEF1dGhvcml6YXRpb24gU2VydmljZSBub3RpZmllci5cbiAqIFRoaXMgbWFuYWdlcyB0aGUgY29tbXVuaWNhdGlvbiBvZiB0aGUgQXV0aG9yaXphdGlvblJlc3BvbnNlIHRvIHRoZSAzcCBjbGllbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uTm90aWZpZXIge1xuICBwcml2YXRlIGxpc3RlbmVyOiBBdXRob3JpemF0aW9uTGlzdGVuZXJ8bnVsbCA9IG51bGw7XG5cbiAgc2V0QXV0aG9yaXphdGlvbkxpc3RlbmVyKGxpc3RlbmVyOiBBdXRob3JpemF0aW9uTGlzdGVuZXIpIHtcbiAgICB0aGlzLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIH1cblxuICAvKipcbiAgICogVGhlIGF1dGhvcml6YXRpb24gY29tcGxldGUgY2FsbGJhY2suXG4gICAqL1xuICBvbkF1dGhvcml6YXRpb25Db21wbGV0ZShcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25NYW5hZ2VtZW50UmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlOiBBdXRob3JpemF0aW9uTWFuYWdlbWVudFJlc3BvbnNlfG51bGwsXG4gICAgICBlcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGwpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5lcikge1xuICAgICAgLy8gY29tcGxldGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0XG4gICAgICB0aGlzLmxpc3RlbmVyKHJlcXVlc3QsIHJlc3BvbnNlLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG5cblxuLyoqXG4gKiBEZWZpbmVzIHRoZSBpbnRlcmZhY2Ugd2hpY2ggaXMgY2FwYWJsZSBvZiBoYW5kbGluZyBhbiBhdXRob3JpemF0aW9uIHJlcXVlc3RcbiAqIHVzaW5nIHZhcmlvdXMgbWV0aG9kcyAoaWZyYW1lIC8gcG9wdXAgLyBkaWZmZXJlbnQgcHJvY2VzcyBldGMuKS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyB1dGlsczogUXVlcnlTdHJpbmdVdGlscywgcHJvdGVjdGVkIGNyeXB0bzogQ3J5cHRvKSB7fVxuXG4gIC8vIG5vdGlmaWVyIHNlbmQgdGhlIHJlc3BvbnNlIGJhY2sgdG8gdGhlIGNsaWVudC5cbiAgcHJvdGVjdGVkIG5vdGlmaWVyOiBBdXRob3JpemF0aW9uTm90aWZpZXJ8bnVsbCA9IG51bGw7XG5cbiAgLyoqXG4gICAqIEEgdXRpbGl0eSBtZXRob2QgdG8gYmUgYWJsZSB0byBidWlsZCB0aGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0IFVSTC5cbiAgICovXG4gIHByb3RlY3RlZCBidWlsZFJlcXVlc3RVcmwoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uTWFuYWdlbWVudFJlcXVlc3QsXG4gICAgICByZXF1ZXN0VHlwZTogUmVkaXJlY3RSZXF1ZXN0VHlwZXMpIHtcbiAgICAvLyBidWlsZCB0aGUgcXVlcnkgc3RyaW5nXG4gICAgLy8gY29lcmNlIHRvIGFueSB0eXBlIGZvciBjb252ZW5pZW5jZVxuICAgIGxldCByZXF1ZXN0TWFwOiBTdHJpbmdNYXAgPSByZXF1ZXN0LnRvUmVxdWVzdE1hcCgpXG4gICAgbGV0IHF1ZXJ5ID0gdGhpcy51dGlscy5zdHJpbmdpZnkocmVxdWVzdE1hcCk7XG4gICAgbGV0IGJhc2VVcmwgPSByZXF1ZXN0VHlwZSA9PT0gUmVkaXJlY3RSZXF1ZXN0VHlwZXMuYXV0aG9yaXphdGlvbiA/XG4gICAgICAgIGNvbmZpZ3VyYXRpb24uYXV0aG9yaXphdGlvbkVuZHBvaW50IDpcbiAgICAgICAgY29uZmlndXJhdGlvbi5lbmRTZXNzaW9uRW5kcG9pbnQ7XG4gICAgbGV0IHVybCA9IGAke2Jhc2VVcmx9PyR7cXVlcnl9YDtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXBsZXRlcyB0aGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0IGlmIG5lY2Vzc2FyeSAmIHdoZW4gcG9zc2libGUuXG4gICAqL1xuICBjb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0SWZQb3NzaWJsZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBjYWxsIGNvbXBsZXRlIGF1dGhvcml6YXRpb24gaWYgcG9zc2libGUgdG8gc2VlIHRoZXJlIG1pZ2h0XG4gICAgLy8gYmUgYSByZXNwb25zZSB0aGF0IG5lZWRzIHRvIGJlIGRlbGl2ZXJlZC5cbiAgICBsb2coYENoZWNraW5nIHRvIHNlZSBpZiB0aGVyZSBpcyBhbiBhdXRob3JpemF0aW9uIHJlc3BvbnNlIHRvIGJlIGRlbGl2ZXJlZC5gKTtcbiAgICBpZiAoIXRoaXMubm90aWZpZXIpIHtcbiAgICAgIGxvZyhgTm90aWZpZXIgaXMgbm90IHByZXNlbnQgb24gQXV0aG9yaXphdGlvblJlcXVlc3QgaGFuZGxlci5cbiAgICAgICAgICBObyBkZWxpdmVyeSBvZiByZXN1bHQgd2lsbCBiZSBwb3NzaWJsZWApXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICBsb2coYE5vIHJlc3VsdCBpcyBhdmFpbGFibGUgeWV0LmApO1xuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCAmJiB0aGlzLm5vdGlmaWVyKSB7XG4gICAgICAgIHRoaXMubm90aWZpZXIub25BdXRob3JpemF0aW9uQ29tcGxldGUocmVzdWx0LnJlcXVlc3QsIHJlc3VsdC5yZXNwb25zZSwgcmVzdWx0LmVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21wbGV0ZXMgdGhlIGVuZHNlc3Npb24gcmVxdWVzdCBpZiBuZWNlc3NhcnkgJiB3aGVuIHBvc3NpYmxlLlxuICAgKi9cbiAgY29tcGxldGVFbmRTZXNzaW9uUmVxdWVzdElmUG9zc2libGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gY2FsbCBjb21wbGV0ZSBlbmRzZXNzaW9uIGlmIHBvc3NpYmxlIHRvIHNlZSB0aGVyZSBtaWdodFxuICAgIC8vIGJlIGEgcmVzcG9uc2UgdGhhdCBuZWVkcyB0byBiZSBkZWxpdmVyZWQuXG4gICAgbG9nKGBDaGVja2luZyB0byBzZWUgaWYgdGhlcmUgaXMgYW4gZW5kc2Vzc2lvbiByZXNwb25zZSB0byBiZSBkZWxpdmVyZWQuYCk7XG4gICAgaWYgKCF0aGlzLm5vdGlmaWVyKSB7XG4gICAgICBsb2coYE5vdGlmaWVyIGlzIG5vdCBwcmVzZW50IG9uIEVuZFNlc3Npb25SZXF1ZXN0IGhhbmRsZXIuXG4gICAgICAgICAgTm8gZGVsaXZlcnkgb2YgcmVzdWx0IHdpbGwgYmUgcG9zc2libGVgKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb21wbGV0ZUVuZFNlc3Npb25SZXF1ZXN0KCkudGhlbihyZXN1bHQgPT4ge1xuICAgICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgICAgbG9nKGBObyByZXN1bHQgaXMgYXZhaWxhYmxlIHlldC5gKTtcbiAgICAgIH1cbiAgICAgIGlmIChyZXN1bHQgJiYgdGhpcy5ub3RpZmllcikge1xuICAgICAgICB0aGlzLm5vdGlmaWVyLm9uQXV0aG9yaXphdGlvbkNvbXBsZXRlKHJlc3VsdC5yZXF1ZXN0LCByZXN1bHQucmVzcG9uc2UsIHJlc3VsdC5lcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgZGVmYXVsdCBBdXRob3JpemF0aW9uIFNlcnZpY2Ugbm90aWZpZXIuXG4gICAqL1xuICBzZXRBdXRob3JpemF0aW9uTm90aWZpZXIobm90aWZpZXI6IEF1dGhvcml6YXRpb25Ob3RpZmllcik6IEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XG4gICAgdGhpcy5ub3RpZmllciA9IG5vdGlmaWVyO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNYWtlcyBhbiBhdXRob3JpemF0aW9uIHJlcXVlc3QuXG4gICAqL1xuICBhYnN0cmFjdCBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uTWFuYWdlbWVudFJlcXVlc3QpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBNYWtlcyBhbiBlbmQgc2Vzc2lvbiByZXF1ZXN0LlxuICAgKi9cbiAgYWJzdHJhY3QgcGVyZm9ybUVuZFNlc3Npb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvbk1hbmFnZW1lbnRSZXF1ZXN0KTogdm9pZDtcbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbiBhdXRob3JpemF0aW9uIGZsb3cgY2FuIGJlIGNvbXBsZXRlZCwgYW5kIGNvbXBsZXRlcyBpdC5cbiAgICogVGhlIGhhbmRsZXIgcmV0dXJucyBhIGBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U+YCBpZiByZWFkeSwgb3IgYSBgUHJvbWlzZTxudWxsPmBcbiAgICogaWYgbm90IHJlYWR5LlxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gZW5kIHNlc3Npb24gZmxvdyBjYW4gYmUgY29tcGxldGVkLCBhbmQgY29tcGxldGVzIGl0LlxuICAgKiBUaGUgaGFuZGxlciByZXR1cm5zIGEgYFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZT5gIGlmIHJlYWR5LCBvciBhIGBQcm9taXNlPG51bGw+YFxuICAgKiBpZiBub3QgcmVhZHkuXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY29tcGxldGVFbmRTZXNzaW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD47XG59XG4iXX0=