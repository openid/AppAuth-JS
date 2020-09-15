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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBTUgsbUNBQTZCO0FBdUI3Qjs7O0dBR0c7QUFDSDtJQUFBO1FBQ1UsYUFBUSxHQUErQixJQUFJLENBQUM7SUFrQnRELENBQUM7SUFoQkMsd0RBQXdCLEdBQXhCLFVBQXlCLFFBQStCO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRDs7T0FFRztJQUNILHVEQUF1QixHQUF2QixVQUNJLE9BQTZCLEVBQzdCLFFBQW9DLEVBQ3BDLEtBQThCO1FBQ2hDLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3pDO0lBQ0gsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQztBQW5CWSxzREFBcUI7QUFxQmxDLGlEQUFpRDtBQUNqRCwwQkFBMEI7QUFDYixRQUFBLG1CQUFtQixHQUFHLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBRXBHOzs7R0FHRztBQUNIO0lBQ0UscUNBQW1CLEtBQXVCLEVBQVksTUFBYztRQUFqRCxVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUFZLFdBQU0sR0FBTixNQUFNLENBQVE7UUFFcEUsaURBQWlEO1FBQ3ZDLGFBQVEsR0FBK0IsSUFBSSxDQUFDO0lBSGlCLENBQUM7SUFLeEU7O09BRUc7SUFDTyxxREFBZSxHQUF6QixVQUNJLGFBQWdELEVBQ2hELE9BQTZCO1FBQy9CLHlCQUF5QjtRQUN6QixxQ0FBcUM7UUFDckMsSUFBSSxVQUFVLEdBQWM7WUFDMUIsY0FBYyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLFdBQVcsRUFBRSxPQUFPLENBQUMsUUFBUTtZQUM3QixlQUFlLEVBQUUsT0FBTyxDQUFDLFlBQVk7WUFDckMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxLQUFLO1lBQ3RCLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSztTQUN2QixDQUFDO1FBRUYsbUJBQW1CO1FBQ25CLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQixLQUFLLElBQUksS0FBSyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3hDLHVDQUF1QztvQkFDdkMsSUFBSSwyQkFBbUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO3dCQUMxQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDM0M7aUJBQ0Y7YUFDRjtTQUNGO1FBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsSUFBSSxPQUFPLEdBQUcsYUFBYSxDQUFDLHFCQUFxQixDQUFDO1FBQ2xELElBQUksR0FBRyxHQUFNLE9BQU8sU0FBSSxLQUFPLENBQUM7UUFDaEMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQ7O09BRUc7SUFDSCw0RUFBc0MsR0FBdEM7UUFBQSxpQkFnQkM7UUFmQyw2REFBNkQ7UUFDN0QsNENBQTRDO1FBQzVDLFlBQUcsQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO1FBQzlFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLFlBQUcsQ0FBQyw0R0FDdUMsQ0FBQyxDQUFBO1NBQzdDO1FBQ0QsT0FBTyxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ3BELElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ1gsWUFBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7YUFDcEM7WUFDRCxJQUFJLE1BQU0sSUFBSSxLQUFJLENBQUMsUUFBUSxFQUFFO2dCQUMzQixLQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEY7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILDhEQUF3QixHQUF4QixVQUF5QixRQUErQjtRQUN0RCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFBQSxDQUFDO0lBZUosa0NBQUM7QUFBRCxDQUFDLEFBbEZELElBa0ZDO0FBbEZxQixrRUFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3R9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0JztcclxuaW1wb3J0IHtBdXRob3JpemF0aW9uRXJyb3IsIEF1dGhvcml6YXRpb25SZXNwb25zZX0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3Jlc3BvbnNlJztcclxuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQge0NyeXB0b30gZnJvbSAnLi9jcnlwdG9fdXRpbHMnO1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi9sb2dnZXInO1xyXG5pbXBvcnQge1F1ZXJ5U3RyaW5nVXRpbHN9IGZyb20gJy4vcXVlcnlfc3RyaW5nX3V0aWxzJztcclxuaW1wb3J0IHtTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGlzIHR5cGUgcmVwcmVzZW50cyBhIGxhbWJkYSB0aGF0IGNhbiB0YWtlIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0LFxyXG4gKiBhbmQgYW4gQXV0aG9yaXphdGlvblJlc3BvbnNlIGFzIGFyZ3VtZW50cy5cclxuICovXHJcbmV4cG9ydCB0eXBlIEF1dGhvcml6YXRpb25MaXN0ZW5lciA9XHJcbiAgICAocmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QsXHJcbiAgICAgcmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsLFxyXG4gICAgIGVycm9yOiBBdXRob3JpemF0aW9uRXJyb3J8bnVsbCkgPT4gdm9pZDtcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgc3RydWN0dXJhbCB0eXBlIGhvbGRpbmcgYm90aCBhdXRob3JpemF0aW9uIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlIHtcclxuICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdDtcclxuICByZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGw7XHJcbiAgZXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsO1xyXG59XHJcblxyXG4vKipcclxuICogQXV0aG9yaXphdGlvbiBTZXJ2aWNlIG5vdGlmaWVyLlxyXG4gKiBUaGlzIG1hbmFnZXMgdGhlIGNvbW11bmljYXRpb24gb2YgdGhlIEF1dGhvcml6YXRpb25SZXNwb25zZSB0byB0aGUgM3AgY2xpZW50LlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25Ob3RpZmllciB7XHJcbiAgcHJpdmF0ZSBsaXN0ZW5lcjogQXV0aG9yaXphdGlvbkxpc3RlbmVyfG51bGwgPSBudWxsO1xyXG5cclxuICBzZXRBdXRob3JpemF0aW9uTGlzdGVuZXIobGlzdGVuZXI6IEF1dGhvcml6YXRpb25MaXN0ZW5lcikge1xyXG4gICAgdGhpcy5saXN0ZW5lciA9IGxpc3RlbmVyO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGF1dGhvcml6YXRpb24gY29tcGxldGUgY2FsbGJhY2suXHJcbiAgICovXHJcbiAgb25BdXRob3JpemF0aW9uQ29tcGxldGUoXHJcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0LFxyXG4gICAgICByZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwsXHJcbiAgICAgIGVycm9yOiBBdXRob3JpemF0aW9uRXJyb3J8bnVsbCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubGlzdGVuZXIpIHtcclxuICAgICAgLy8gY29tcGxldGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0XHJcbiAgICAgIHRoaXMubGlzdGVuZXIocmVxdWVzdCwgcmVzcG9uc2UsIGVycm9yKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFRPRE8ocmFodWxyYXZAKTogYWRkIG1vcmUgYnVpbHQgaW4gcGFyYW1ldGVycy5cclxuLyogYnVpbHQgaW4gcGFyYW1ldGVycy4gKi9cclxuZXhwb3J0IGNvbnN0IEJVSUxUX0lOX1BBUkFNRVRFUlMgPSBbJ3JlZGlyZWN0X3VyaScsICdjbGllbnRfaWQnLCAncmVzcG9uc2VfdHlwZScsICdzdGF0ZScsICdzY29wZSddO1xyXG5cclxuLyoqXHJcbiAqIERlZmluZXMgdGhlIGludGVyZmFjZSB3aGljaCBpcyBjYXBhYmxlIG9mIGhhbmRsaW5nIGFuIGF1dGhvcml6YXRpb24gcmVxdWVzdFxyXG4gKiB1c2luZyB2YXJpb3VzIG1ldGhvZHMgKGlmcmFtZSAvIHBvcHVwIC8gZGlmZmVyZW50IHByb2Nlc3MgZXRjLikuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHtcclxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdXRpbHM6IFF1ZXJ5U3RyaW5nVXRpbHMsIHByb3RlY3RlZCBjcnlwdG86IENyeXB0bykge31cclxuXHJcbiAgLy8gbm90aWZpZXIgc2VuZCB0aGUgcmVzcG9uc2UgYmFjayB0byB0aGUgY2xpZW50LlxyXG4gIHByb3RlY3RlZCBub3RpZmllcjogQXV0aG9yaXphdGlvbk5vdGlmaWVyfG51bGwgPSBudWxsO1xyXG5cclxuICAvKipcclxuICAgKiBBIHV0aWxpdHkgbWV0aG9kIHRvIGJlIGFibGUgdG8gYnVpbGQgdGhlIGF1dGhvcml6YXRpb24gcmVxdWVzdCBVUkwuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGJ1aWxkUmVxdWVzdFVybChcclxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxyXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCkge1xyXG4gICAgLy8gYnVpbGQgdGhlIHF1ZXJ5IHN0cmluZ1xyXG4gICAgLy8gY29lcmNlIHRvIGFueSB0eXBlIGZvciBjb252ZW5pZW5jZVxyXG4gICAgbGV0IHJlcXVlc3RNYXA6IFN0cmluZ01hcCA9IHtcclxuICAgICAgJ3JlZGlyZWN0X3VyaSc6IHJlcXVlc3QucmVkaXJlY3RVcmksXHJcbiAgICAgICdjbGllbnRfaWQnOiByZXF1ZXN0LmNsaWVudElkLFxyXG4gICAgICAncmVzcG9uc2VfdHlwZSc6IHJlcXVlc3QucmVzcG9uc2VUeXBlLFxyXG4gICAgICAnc3RhdGUnOiByZXF1ZXN0LnN0YXRlLFxyXG4gICAgICAnc2NvcGUnOiByZXF1ZXN0LnNjb3BlXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGNvcHkgb3ZlciBleHRyYXNcclxuICAgIGlmIChyZXF1ZXN0LmV4dHJhcykge1xyXG4gICAgICBmb3IgKGxldCBleHRyYSBpbiByZXF1ZXN0LmV4dHJhcykge1xyXG4gICAgICAgIGlmIChyZXF1ZXN0LmV4dHJhcy5oYXNPd25Qcm9wZXJ0eShleHRyYSkpIHtcclxuICAgICAgICAgIC8vIGNoZWNrIGJlZm9yZSBpbnNlcnRpbmcgdG8gcmVxdWVzdE1hcFxyXG4gICAgICAgICAgaWYgKEJVSUxUX0lOX1BBUkFNRVRFUlMuaW5kZXhPZihleHRyYSkgPCAwKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RNYXBbZXh0cmFdID0gcmVxdWVzdC5leHRyYXNbZXh0cmFdO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBxdWVyeSA9IHRoaXMudXRpbHMuc3RyaW5naWZ5KHJlcXVlc3RNYXApO1xyXG4gICAgbGV0IGJhc2VVcmwgPSBjb25maWd1cmF0aW9uLmF1dGhvcml6YXRpb25FbmRwb2ludDtcclxuICAgIGxldCB1cmwgPSBgJHtiYXNlVXJsfT8ke3F1ZXJ5fWA7XHJcbiAgICByZXR1cm4gdXJsO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcGxldGVzIHRoZSBhdXRob3JpemF0aW9uIHJlcXVlc3QgaWYgbmVjZXNzYXJ5ICYgd2hlbiBwb3NzaWJsZS5cclxuICAgKi9cclxuICBjb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0SWZQb3NzaWJsZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIC8vIGNhbGwgY29tcGxldGUgYXV0aG9yaXphdGlvbiBpZiBwb3NzaWJsZSB0byBzZWUgdGhlcmUgbWlnaHRcclxuICAgIC8vIGJlIGEgcmVzcG9uc2UgdGhhdCBuZWVkcyB0byBiZSBkZWxpdmVyZWQuXHJcbiAgICBsb2coYENoZWNraW5nIHRvIHNlZSBpZiB0aGVyZSBpcyBhbiBhdXRob3JpemF0aW9uIHJlc3BvbnNlIHRvIGJlIGRlbGl2ZXJlZC5gKTtcclxuICAgIGlmICghdGhpcy5ub3RpZmllcikge1xyXG4gICAgICBsb2coYE5vdGlmaWVyIGlzIG5vdCBwcmVzZW50IG9uIEF1dGhvcml6YXRpb25SZXF1ZXN0IGhhbmRsZXIuXHJcbiAgICAgICAgICBObyBkZWxpdmVyeSBvZiByZXN1bHQgd2lsbCBiZSBwb3NzaWJsZWApXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5jb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0KCkudGhlbihyZXN1bHQgPT4ge1xyXG4gICAgICBpZiAoIXJlc3VsdCkge1xyXG4gICAgICAgIGxvZyhgTm8gcmVzdWx0IGlzIGF2YWlsYWJsZSB5ZXQuYCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHJlc3VsdCAmJiB0aGlzLm5vdGlmaWVyKSB7XHJcbiAgICAgICAgdGhpcy5ub3RpZmllci5vbkF1dGhvcml6YXRpb25Db21wbGV0ZShyZXN1bHQucmVxdWVzdCwgcmVzdWx0LnJlc3BvbnNlLCByZXN1bHQuZXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGRlZmF1bHQgQXV0aG9yaXphdGlvbiBTZXJ2aWNlIG5vdGlmaWVyLlxyXG4gICAqL1xyXG4gIHNldEF1dGhvcml6YXRpb25Ob3RpZmllcihub3RpZmllcjogQXV0aG9yaXphdGlvbk5vdGlmaWVyKTogQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHtcclxuICAgIHRoaXMubm90aWZpZXIgPSBub3RpZmllcjtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH07XHJcblxyXG4gIC8qKlxyXG4gICAqIE1ha2VzIGFuIGF1dGhvcml6YXRpb24gcmVxdWVzdC5cclxuICAgKi9cclxuICBhYnN0cmFjdCBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoXHJcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcclxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpOiB2b2lkO1xyXG5cclxuICAvKipcclxuICAgKiBDaGVja3MgaWYgYW4gYXV0aG9yaXphdGlvbiBmbG93IGNhbiBiZSBjb21wbGV0ZWQsIGFuZCBjb21wbGV0ZXMgaXQuXHJcbiAgICogVGhlIGhhbmRsZXIgcmV0dXJucyBhIGBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U+YCBpZiByZWFkeSwgb3IgYSBgUHJvbWlzZTxudWxsPmBcclxuICAgKiBpZiBub3QgcmVhZHkuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+O1xyXG59XHJcbiJdfQ==