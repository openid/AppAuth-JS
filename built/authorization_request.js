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
var crypto_utils_1 = require("./crypto_utils");
/**
 * Generates a cryptographically random new state. Useful for CSRF protection.
 */
var BYTES_LENGTH = 10; // 10 bytes
var newState = function () {
    return crypto_utils_1.generateRandom(BYTES_LENGTH);
};
/**
 * Represents the AuthorizationRequest.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.1
 */
var AuthorizationRequest = /** @class */ (function () {
    /**
     * Constructs a new AuthorizationRequest.
     * Use a `undefined` value for the `state` parameter, to generate a random
     * state for CSRF protection.
     */
    function AuthorizationRequest(clientId, redirectUri, scope, responseType, state, extras) {
        if (responseType === void 0) { responseType = AuthorizationRequest.RESPONSE_TYPE_CODE; }
        this.clientId = clientId;
        this.redirectUri = redirectUri;
        this.scope = scope;
        this.responseType = responseType;
        this.extras = extras;
        this.state = state || newState();
    }
    /**
     * Serializes the AuthorizationRequest to a JavaScript Object.
     */
    AuthorizationRequest.prototype.toJson = function () {
        return {
            response_type: this.responseType,
            client_id: this.clientId,
            redirect_uri: this.redirectUri,
            scope: this.scope,
            state: this.state,
            extras: this.extras
        };
    };
    /**
     * Creates a new instance of AuthorizationRequest.
     */
    AuthorizationRequest.fromJson = function (input) {
        return new AuthorizationRequest(input.client_id, input.redirect_uri, input.scope, input.response_type, input.state, input.extras);
    };
    AuthorizationRequest.RESPONSE_TYPE_CODE = 'code';
    return AuthorizationRequest;
}());
exports.AuthorizationRequest = AuthorizationRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILCtDQUE4QztBQW9COUM7O0dBRUc7QUFDSCxJQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBRSxXQUFXO0FBQ3JDLElBQU0sUUFBUSxHQUFHO0lBQ2YsTUFBTSxDQUFDLDZCQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNIO0lBSUU7Ozs7T0FJRztJQUNILDhCQUNXLFFBQWdCLEVBQ2hCLFdBQW1CLEVBQ25CLEtBQWEsRUFDYixZQUE4RCxFQUNyRSxLQUFjLEVBQ1AsTUFBa0I7UUFGbEIsNkJBQUEsRUFBQSxlQUF1QixvQkFBb0IsQ0FBQyxrQkFBa0I7UUFIOUQsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQWtEO1FBRTlELFdBQU0sR0FBTixNQUFNLENBQVk7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksUUFBUSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0gscUNBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQztZQUNMLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUNoQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzlCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSw2QkFBUSxHQUFmLFVBQWdCLEtBQStCO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixDQUMzQixLQUFLLENBQUMsU0FBUyxFQUNmLEtBQUssQ0FBQyxZQUFZLEVBQ2xCLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLGFBQWEsRUFDbkIsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQTNDTSx1Q0FBa0IsR0FBRyxNQUFNLENBQUM7SUE0Q3JDLDJCQUFDO0NBQUEsQUE3Q0QsSUE2Q0M7QUE3Q1ksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7Z2VuZXJhdGVSYW5kb219IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0IGFzIEpTT04uXG4gKi9cblxuLy8gTk9URTpcbi8vIEJvdGggcmVkaXJlY3RfdXJpIGFuZCBzdGF0ZSBhcmUgYWN0dWFsbHkgb3B0aW9uYWwuXG4vLyBIb3dldmVyIEFwcEF1dGggaXMgbW9yZSBvcGlvbmlvbmF0ZWQsIGFuZCByZXF1aXJlcyB5b3UgdG8gdXNlIGJvdGguXG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXphdGlvblJlcXVlc3RKc29uIHtcbiAgcmVzcG9uc2VfdHlwZTogc3RyaW5nO1xuICBjbGllbnRfaWQ6IHN0cmluZztcbiAgcmVkaXJlY3RfdXJpOiBzdHJpbmc7XG4gIHN0YXRlOiBzdHJpbmc7XG4gIHNjb3BlOiBzdHJpbmc7XG4gIGV4dHJhcz86IFN0cmluZ01hcDtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBjcnlwdG9ncmFwaGljYWxseSByYW5kb20gbmV3IHN0YXRlLiBVc2VmdWwgZm9yIENTUkYgcHJvdGVjdGlvbi5cbiAqL1xuY29uc3QgQllURVNfTEVOR1RIID0gMTA7ICAvLyAxMCBieXRlc1xuY29uc3QgbmV3U3RhdGUgPSBmdW5jdGlvbigpOiBzdHJpbmcge1xuICByZXR1cm4gZ2VuZXJhdGVSYW5kb20oQllURVNfTEVOR1RIKTtcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgQXV0aG9yaXphdGlvblJlcXVlc3QuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTQuMS4xXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uUmVxdWVzdCB7XG4gIHN0YXRpYyBSRVNQT05TRV9UWVBFX0NPREUgPSAnY29kZSc7XG5cbiAgc3RhdGU6IHN0cmluZztcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QuXG4gICAqIFVzZSBhIGB1bmRlZmluZWRgIHZhbHVlIGZvciB0aGUgYHN0YXRlYCBwYXJhbWV0ZXIsIHRvIGdlbmVyYXRlIGEgcmFuZG9tXG4gICAqIHN0YXRlIGZvciBDU1JGIHByb3RlY3Rpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBjbGllbnRJZDogc3RyaW5nLFxuICAgICAgcHVibGljIHJlZGlyZWN0VXJpOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgc2NvcGU6IHN0cmluZyxcbiAgICAgIHB1YmxpYyByZXNwb25zZVR5cGU6IHN0cmluZyA9IEF1dGhvcml6YXRpb25SZXF1ZXN0LlJFU1BPTlNFX1RZUEVfQ09ERSxcbiAgICAgIHN0YXRlPzogc3RyaW5nLFxuICAgICAgcHVibGljIGV4dHJhcz86IFN0cmluZ01hcCkge1xuICAgIHRoaXMuc3RhdGUgPSBzdGF0ZSB8fCBuZXdTdGF0ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZXMgdGhlIEF1dGhvcml6YXRpb25SZXF1ZXN0IHRvIGEgSmF2YVNjcmlwdCBPYmplY3QuXG4gICAqL1xuICB0b0pzb24oKTogQXV0aG9yaXphdGlvblJlcXVlc3RKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzcG9uc2VfdHlwZTogdGhpcy5yZXNwb25zZVR5cGUsXG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICByZWRpcmVjdF91cmk6IHRoaXMucmVkaXJlY3RVcmksXG4gICAgICBzY29wZTogdGhpcy5zY29wZSxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgZXh0cmFzOiB0aGlzLmV4dHJhc1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBBdXRob3JpemF0aW9uUmVxdWVzdC5cbiAgICovXG4gIHN0YXRpYyBmcm9tSnNvbihpbnB1dDogQXV0aG9yaXphdGlvblJlcXVlc3RKc29uKTogQXV0aG9yaXphdGlvblJlcXVlc3Qge1xuICAgIHJldHVybiBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QoXG4gICAgICAgIGlucHV0LmNsaWVudF9pZCxcbiAgICAgICAgaW5wdXQucmVkaXJlY3RfdXJpLFxuICAgICAgICBpbnB1dC5zY29wZSxcbiAgICAgICAgaW5wdXQucmVzcG9uc2VfdHlwZSxcbiAgICAgICAgaW5wdXQuc3RhdGUsXG4gICAgICAgIGlucHV0LmV4dHJhcyk7XG4gIH1cbn1cbiJdfQ==