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
var url_validator_1 = require("./url_validator");
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
        var baseUrl = (0, url_validator_1.requireValidUrl)(configuration.authorizationEndpoint);
        var url = "".concat(baseUrl, "?").concat(query);
        return url;
    };
    /**
     * Completes the authorization request if necessary & when possible.
     */
    AuthorizationRequestHandler.prototype.completeAuthorizationRequestIfPossible = function () {
        var _this = this;
        // call complete authorization if possible to see there might
        // be a response that needs to be delivered.
        (0, logger_1.log)("Checking to see if there is an authorization response to be delivered.");
        if (!this.notifier) {
            (0, logger_1.log)("Notifier is not present on AuthorizationRequest handler.\n          No delivery of result will be possible");
        }
        return this.completeAuthorizationRequest().then(function (result) {
            if (!result) {
                (0, logger_1.log)("No result is available yet.");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBTUgsbUNBQTZCO0FBRzdCLGlEQUFnRDtBQXFCaEQ7OztHQUdHO0FBQ0g7SUFBQTtRQUNVLGFBQVEsR0FBK0IsSUFBSSxDQUFDO0lBa0J0RCxDQUFDO0lBaEJDLHdEQUF3QixHQUF4QixVQUF5QixRQUErQjtRQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQ7O09BRUc7SUFDSCx1REFBdUIsR0FBdkIsVUFDSSxPQUE2QixFQUM3QixRQUFvQyxFQUNwQyxLQUE4QjtRQUNoQyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQixpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzFDLENBQUM7SUFDSCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbkJZLHNEQUFxQjtBQXFCbEMsaURBQWlEO0FBQ2pELDBCQUEwQjtBQUNiLFFBQUEsbUJBQW1CLEdBQUcsQ0FBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFcEc7OztHQUdHO0FBQ0g7SUFDRSxxQ0FBbUIsS0FBdUIsRUFBWSxNQUFjO1FBQWpELFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVksV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUVwRSxpREFBaUQ7UUFDdkMsYUFBUSxHQUErQixJQUFJLENBQUM7SUFIaUIsQ0FBQztJQUt4RTs7T0FFRztJQUNPLHFEQUFlLEdBQXpCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBNkI7UUFDL0IseUJBQXlCO1FBQ3pCLHFDQUFxQztRQUNyQyxJQUFJLFVBQVUsR0FBYztZQUMxQixjQUFjLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDbkMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzdCLGVBQWUsRUFBRSxPQUFPLENBQUMsWUFBWTtZQUNyQyxPQUFPLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDdEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1NBQ3ZCLENBQUM7UUFFRixtQkFBbUI7UUFDbkIsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbkIsS0FBSyxJQUFJLEtBQUssSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2pDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDekMsdUNBQXVDO29CQUN2QyxJQUFJLDJCQUFtQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQzt3QkFDM0MsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVDLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsSUFBSSxPQUFPLEdBQUcsSUFBQSwrQkFBZSxFQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ25FLElBQUksR0FBRyxHQUFHLFVBQUcsT0FBTyxjQUFJLEtBQUssQ0FBRSxDQUFDO1FBQ2hDLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsNEVBQXNDLEdBQXRDO1FBQUEsaUJBZ0JDO1FBZkMsNkRBQTZEO1FBQzdELDRDQUE0QztRQUM1QyxJQUFBLFlBQUcsRUFBQyx3RUFBd0UsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkIsSUFBQSxZQUFHLEVBQUMsNEdBQ3VDLENBQUMsQ0FBQTtRQUM5QyxDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ3BELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDWixJQUFBLFlBQUcsRUFBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFDRCxJQUFJLE1BQU0sSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzVCLEtBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2RixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCw4REFBd0IsR0FBeEIsVUFBeUIsUUFBK0I7UUFDdEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQUEsQ0FBQztJQWVKLGtDQUFDO0FBQUQsQ0FBQyxBQWxGRCxJQWtGQztBQWxGcUIsa0VBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3R9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0JztcbmltcG9ydCB7QXV0aG9yaXphdGlvbkVycm9yLCBBdXRob3JpemF0aW9uUmVzcG9uc2V9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXNwb25zZSc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbic7XG5pbXBvcnQge0NyeXB0b30gZnJvbSAnLi9jcnlwdG9fdXRpbHMnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7UXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHtTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHtyZXF1aXJlVmFsaWRVcmx9IGZyb20gJy4vdXJsX3ZhbGlkYXRvcic7XG5cblxuLyoqXG4gKiBUaGlzIHR5cGUgcmVwcmVzZW50cyBhIGxhbWJkYSB0aGF0IGNhbiB0YWtlIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0LFxuICogYW5kIGFuIEF1dGhvcml6YXRpb25SZXNwb25zZSBhcyBhcmd1bWVudHMuXG4gKi9cbmV4cG9ydCB0eXBlIEF1dGhvcml6YXRpb25MaXN0ZW5lciA9XG4gICAgKHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0LFxuICAgICByZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwsXG4gICAgIGVycm9yOiBBdXRob3JpemF0aW9uRXJyb3J8bnVsbCkgPT4gdm9pZDtcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgc3RydWN0dXJhbCB0eXBlIGhvbGRpbmcgYm90aCBhdXRob3JpemF0aW9uIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2Uge1xuICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdDtcbiAgcmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsO1xuICBlcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGw7XG59XG5cbi8qKlxuICogQXV0aG9yaXphdGlvbiBTZXJ2aWNlIG5vdGlmaWVyLlxuICogVGhpcyBtYW5hZ2VzIHRoZSBjb21tdW5pY2F0aW9uIG9mIHRoZSBBdXRob3JpemF0aW9uUmVzcG9uc2UgdG8gdGhlIDNwIGNsaWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25Ob3RpZmllciB7XG4gIHByaXZhdGUgbGlzdGVuZXI6IEF1dGhvcml6YXRpb25MaXN0ZW5lcnxudWxsID0gbnVsbDtcblxuICBzZXRBdXRob3JpemF0aW9uTGlzdGVuZXIobGlzdGVuZXI6IEF1dGhvcml6YXRpb25MaXN0ZW5lcikge1xuICAgIHRoaXMubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgYXV0aG9yaXphdGlvbiBjb21wbGV0ZSBjYWxsYmFjay5cbiAgICovXG4gIG9uQXV0aG9yaXphdGlvbkNvbXBsZXRlKFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QsXG4gICAgICByZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwsXG4gICAgICBlcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGwpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5saXN0ZW5lcikge1xuICAgICAgLy8gY29tcGxldGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0XG4gICAgICB0aGlzLmxpc3RlbmVyKHJlcXVlc3QsIHJlc3BvbnNlLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG5cbi8vIFRPRE8ocmFodWxyYXZAKTogYWRkIG1vcmUgYnVpbHQgaW4gcGFyYW1ldGVycy5cbi8qIGJ1aWx0IGluIHBhcmFtZXRlcnMuICovXG5leHBvcnQgY29uc3QgQlVJTFRfSU5fUEFSQU1FVEVSUyA9IFsncmVkaXJlY3RfdXJpJywgJ2NsaWVudF9pZCcsICdyZXNwb25zZV90eXBlJywgJ3N0YXRlJywgJ3Njb3BlJ107XG5cbi8qKlxuICogRGVmaW5lcyB0aGUgaW50ZXJmYWNlIHdoaWNoIGlzIGNhcGFibGUgb2YgaGFuZGxpbmcgYW4gYXV0aG9yaXphdGlvbiByZXF1ZXN0XG4gKiB1c2luZyB2YXJpb3VzIG1ldGhvZHMgKGlmcmFtZSAvIHBvcHVwIC8gZGlmZmVyZW50IHByb2Nlc3MgZXRjLikuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdXRpbHM6IFF1ZXJ5U3RyaW5nVXRpbHMsIHByb3RlY3RlZCBjcnlwdG86IENyeXB0bykge31cblxuICAvLyBub3RpZmllciBzZW5kIHRoZSByZXNwb25zZSBiYWNrIHRvIHRoZSBjbGllbnQuXG4gIHByb3RlY3RlZCBub3RpZmllcjogQXV0aG9yaXphdGlvbk5vdGlmaWVyfG51bGwgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBBIHV0aWxpdHkgbWV0aG9kIHRvIGJlIGFibGUgdG8gYnVpbGQgdGhlIGF1dGhvcml6YXRpb24gcmVxdWVzdCBVUkwuXG4gICAqL1xuICBwcm90ZWN0ZWQgYnVpbGRSZXF1ZXN0VXJsKFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpIHtcbiAgICAvLyBidWlsZCB0aGUgcXVlcnkgc3RyaW5nXG4gICAgLy8gY29lcmNlIHRvIGFueSB0eXBlIGZvciBjb252ZW5pZW5jZVxuICAgIGxldCByZXF1ZXN0TWFwOiBTdHJpbmdNYXAgPSB7XG4gICAgICAncmVkaXJlY3RfdXJpJzogcmVxdWVzdC5yZWRpcmVjdFVyaSxcbiAgICAgICdjbGllbnRfaWQnOiByZXF1ZXN0LmNsaWVudElkLFxuICAgICAgJ3Jlc3BvbnNlX3R5cGUnOiByZXF1ZXN0LnJlc3BvbnNlVHlwZSxcbiAgICAgICdzdGF0ZSc6IHJlcXVlc3Quc3RhdGUsXG4gICAgICAnc2NvcGUnOiByZXF1ZXN0LnNjb3BlXG4gICAgfTtcblxuICAgIC8vIGNvcHkgb3ZlciBleHRyYXNcbiAgICBpZiAocmVxdWVzdC5leHRyYXMpIHtcbiAgICAgIGZvciAobGV0IGV4dHJhIGluIHJlcXVlc3QuZXh0cmFzKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0LmV4dHJhcy5oYXNPd25Qcm9wZXJ0eShleHRyYSkpIHtcbiAgICAgICAgICAvLyBjaGVjayBiZWZvcmUgaW5zZXJ0aW5nIHRvIHJlcXVlc3RNYXBcbiAgICAgICAgICBpZiAoQlVJTFRfSU5fUEFSQU1FVEVSUy5pbmRleE9mKGV4dHJhKSA8IDApIHtcbiAgICAgICAgICAgIHJlcXVlc3RNYXBbZXh0cmFdID0gcmVxdWVzdC5leHRyYXNbZXh0cmFdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCBxdWVyeSA9IHRoaXMudXRpbHMuc3RyaW5naWZ5KHJlcXVlc3RNYXApO1xuICAgIGxldCBiYXNlVXJsID0gcmVxdWlyZVZhbGlkVXJsKGNvbmZpZ3VyYXRpb24uYXV0aG9yaXphdGlvbkVuZHBvaW50KTtcbiAgICBsZXQgdXJsID0gYCR7YmFzZVVybH0/JHtxdWVyeX1gO1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGxldGVzIHRoZSBhdXRob3JpemF0aW9uIHJlcXVlc3QgaWYgbmVjZXNzYXJ5ICYgd2hlbiBwb3NzaWJsZS5cbiAgICovXG4gIGNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3RJZlBvc3NpYmxlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIGNhbGwgY29tcGxldGUgYXV0aG9yaXphdGlvbiBpZiBwb3NzaWJsZSB0byBzZWUgdGhlcmUgbWlnaHRcbiAgICAvLyBiZSBhIHJlc3BvbnNlIHRoYXQgbmVlZHMgdG8gYmUgZGVsaXZlcmVkLlxuICAgIGxvZyhgQ2hlY2tpbmcgdG8gc2VlIGlmIHRoZXJlIGlzIGFuIGF1dGhvcml6YXRpb24gcmVzcG9uc2UgdG8gYmUgZGVsaXZlcmVkLmApO1xuICAgIGlmICghdGhpcy5ub3RpZmllcikge1xuICAgICAgbG9nKGBOb3RpZmllciBpcyBub3QgcHJlc2VudCBvbiBBdXRob3JpemF0aW9uUmVxdWVzdCBoYW5kbGVyLlxuICAgICAgICAgIE5vIGRlbGl2ZXJ5IG9mIHJlc3VsdCB3aWxsIGJlIHBvc3NpYmxlYClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgIGxvZyhgTm8gcmVzdWx0IGlzIGF2YWlsYWJsZSB5ZXQuYCk7XG4gICAgICB9XG4gICAgICBpZiAocmVzdWx0ICYmIHRoaXMubm90aWZpZXIpIHtcbiAgICAgICAgdGhpcy5ub3RpZmllci5vbkF1dGhvcml6YXRpb25Db21wbGV0ZShyZXN1bHQucmVxdWVzdCwgcmVzdWx0LnJlc3BvbnNlLCByZXN1bHQuZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGRlZmF1bHQgQXV0aG9yaXphdGlvbiBTZXJ2aWNlIG5vdGlmaWVyLlxuICAgKi9cbiAgc2V0QXV0aG9yaXphdGlvbk5vdGlmaWVyKG5vdGlmaWVyOiBBdXRob3JpemF0aW9uTm90aWZpZXIpOiBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIge1xuICAgIHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogTWFrZXMgYW4gYXV0aG9yaXphdGlvbiByZXF1ZXN0LlxuICAgKi9cbiAgYWJzdHJhY3QgcGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYW4gYXV0aG9yaXphdGlvbiBmbG93IGNhbiBiZSBjb21wbGV0ZWQsIGFuZCBjb21wbGV0ZXMgaXQuXG4gICAqIFRoZSBoYW5kbGVyIHJldHVybnMgYSBgUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlPmAgaWYgcmVhZHksIG9yIGEgYFByb21pc2U8bnVsbD5gXG4gICAqIGlmIG5vdCByZWFkeS5cbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0KCk6IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZXxudWxsPjtcbn1cbiJdfQ==