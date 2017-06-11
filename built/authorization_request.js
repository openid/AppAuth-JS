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
var AuthorizationRequest = (function () {
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
    return AuthorizationRequest;
}());
AuthorizationRequest.RESPONSE_TYPE_CODE = 'code';
exports.AuthorizationRequest = AuthorizationRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILCtDQUE4QztBQW9COUM7O0dBRUc7QUFDSCxJQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBRSxXQUFXO0FBQ3JDLElBQU0sUUFBUSxHQUFHO0lBQ2YsTUFBTSxDQUFDLDZCQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNIO0lBSUU7Ozs7T0FJRztJQUNILDhCQUNXLFFBQWdCLEVBQ2hCLFdBQW1CLEVBQ25CLEtBQWEsRUFDYixZQUE4RCxFQUNyRSxLQUFjLEVBQ1AsTUFBa0I7UUFGbEIsNkJBQUEsRUFBQSxlQUF1QixvQkFBb0IsQ0FBQyxrQkFBa0I7UUFIOUQsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQWtEO1FBRTlELFdBQU0sR0FBTixNQUFNLENBQVk7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksUUFBUSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVEOztPQUVHO0lBQ0gscUNBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQztZQUNMLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUNoQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzlCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSw2QkFBUSxHQUFmLFVBQWdCLEtBQStCO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixDQUMzQixLQUFLLENBQUMsU0FBUyxFQUNmLEtBQUssQ0FBQyxZQUFZLEVBQ2xCLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLGFBQWEsRUFDbkIsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQTdDRDtBQUNTLHVDQUFrQixHQUFHLE1BQU0sQ0FBQztBQUR4QixvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtnZW5lcmF0ZVJhbmRvbX0gZnJvbSAnLi9jcnlwdG9fdXRpbHMnO1xuaW1wb3J0IHtTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gQXV0aG9yaXphdGlvblJlcXVlc3QgYXMgSlNPTi5cbiAqL1xuXG4vLyBOT1RFOlxuLy8gQm90aCByZWRpcmVjdF91cmkgYW5kIHN0YXRlIGFyZSBhY3R1YWxseSBvcHRpb25hbC5cbi8vIEhvd2V2ZXIgQXBwQXV0aCBpcyBtb3JlIG9waW9uaW9uYXRlZCwgYW5kIHJlcXVpcmVzIHlvdSB0byB1c2UgYm90aC5cblxuZXhwb3J0IGludGVyZmFjZSBBdXRob3JpemF0aW9uUmVxdWVzdEpzb24ge1xuICByZXNwb25zZV90eXBlOiBzdHJpbmc7XG4gIGNsaWVudF9pZDogc3RyaW5nO1xuICByZWRpcmVjdF91cmk6IHN0cmluZztcbiAgc3RhdGU6IHN0cmluZztcbiAgc2NvcGU6IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGNyeXB0b2dyYXBoaWNhbGx5IHJhbmRvbSBuZXcgc3RhdGUuIFVzZWZ1bCBmb3IgQ1NSRiBwcm90ZWN0aW9uLlxuICovXG5jb25zdCBCWVRFU19MRU5HVEggPSAxMDsgIC8vIDEwIGJ5dGVzXG5jb25zdCBuZXdTdGF0ZSA9IGZ1bmN0aW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiBnZW5lcmF0ZVJhbmRvbShCWVRFU19MRU5HVEgpO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uUmVxdWVzdC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNC4xLjFcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25SZXF1ZXN0IHtcbiAgc3RhdGljIFJFU1BPTlNFX1RZUEVfQ09ERSA9ICdjb2RlJztcblxuICBzdGF0ZTogc3RyaW5nO1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIG5ldyBBdXRob3JpemF0aW9uUmVxdWVzdC5cbiAgICogVXNlIGEgYHVuZGVmaW5lZGAgdmFsdWUgZm9yIHRoZSBgc3RhdGVgIHBhcmFtZXRlciwgdG8gZ2VuZXJhdGUgYSByYW5kb21cbiAgICogc3RhdGUgZm9yIENTUkYgcHJvdGVjdGlvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGNsaWVudElkOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcmVkaXJlY3RVcmk6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBzY29wZTogc3RyaW5nLFxuICAgICAgcHVibGljIHJlc3BvbnNlVHlwZTogc3RyaW5nID0gQXV0aG9yaXphdGlvblJlcXVlc3QuUkVTUE9OU0VfVFlQRV9DT0RFLFxuICAgICAgc3RhdGU/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgZXh0cmFzPzogU3RyaW5nTWFwKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlIHx8IG5ld1N0YXRlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplcyB0aGUgQXV0aG9yaXphdGlvblJlcXVlc3QgdG8gYSBKYXZhU2NyaXB0IE9iamVjdC5cbiAgICovXG4gIHRvSnNvbigpOiBBdXRob3JpemF0aW9uUmVxdWVzdEpzb24ge1xuICAgIHJldHVybiB7XG4gICAgICByZXNwb25zZV90eXBlOiB0aGlzLnJlc3BvbnNlVHlwZSxcbiAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRJZCxcbiAgICAgIHJlZGlyZWN0X3VyaTogdGhpcy5yZWRpcmVjdFVyaSxcbiAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICBleHRyYXM6IHRoaXMuZXh0cmFzXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIG9mIEF1dGhvcml6YXRpb25SZXF1ZXN0LlxuICAgKi9cbiAgc3RhdGljIGZyb21Kc29uKGlucHV0OiBBdXRob3JpemF0aW9uUmVxdWVzdEpzb24pOiBBdXRob3JpemF0aW9uUmVxdWVzdCB7XG4gICAgcmV0dXJuIG5ldyBBdXRob3JpemF0aW9uUmVxdWVzdChcbiAgICAgICAgaW5wdXQuY2xpZW50X2lkLFxuICAgICAgICBpbnB1dC5yZWRpcmVjdF91cmksXG4gICAgICAgIGlucHV0LnNjb3BlLFxuICAgICAgICBpbnB1dC5yZXNwb25zZV90eXBlLFxuICAgICAgICBpbnB1dC5zdGF0ZSxcbiAgICAgICAgaW5wdXQuZXh0cmFzKTtcbiAgfVxufVxuIl19