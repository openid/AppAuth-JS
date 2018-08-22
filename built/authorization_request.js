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
var newState = function (generateRandom) {
    return generateRandom(BYTES_LENGTH);
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
    function AuthorizationRequest(clientId, redirectUri, scope, responseType, state, extras, generateRandom) {
        if (responseType === void 0) { responseType = AuthorizationRequest.RESPONSE_TYPE_CODE; }
        if (generateRandom === void 0) { generateRandom = crypto_utils_1.cryptoGenerateRandom; }
        this.clientId = clientId;
        this.redirectUri = redirectUri;
        this.scope = scope;
        this.responseType = responseType;
        this.extras = extras;
        this.state = state || newState(generateRandom);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILCtDQUFxRTtBQW9CckU7O0dBRUc7QUFDSCxJQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBRSxXQUFXO0FBQ3JDLElBQU0sUUFBUSxHQUFHLFVBQVMsY0FBK0I7SUFDdkQsT0FBTyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNIO0lBSUU7Ozs7T0FJRztJQUNILDhCQUNXLFFBQWdCLEVBQ2hCLFdBQW1CLEVBQ25CLEtBQWEsRUFDYixZQUE4RCxFQUNyRSxLQUFjLEVBQ1AsTUFBa0IsRUFDekIsY0FBcUM7UUFIOUIsNkJBQUEsRUFBQSxlQUF1QixvQkFBb0IsQ0FBQyxrQkFBa0I7UUFHckUsK0JBQUEsRUFBQSxpQkFBaUIsbUNBQW9CO1FBTjlCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGlCQUFZLEdBQVosWUFBWSxDQUFrRDtRQUU5RCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRTNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQ0FBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUNoQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzlCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSw2QkFBUSxHQUFmLFVBQWdCLEtBQStCO1FBQzdDLE9BQU8sSUFBSSxvQkFBb0IsQ0FDM0IsS0FBSyxDQUFDLFNBQVMsRUFDZixLQUFLLENBQUMsWUFBWSxFQUNsQixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxhQUFhLEVBQ25CLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUE1Q00sdUNBQWtCLEdBQUcsTUFBTSxDQUFDO0lBNkNyQywyQkFBQztDQUFBLEFBOUNELElBOENDO0FBOUNZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtjcnlwdG9HZW5lcmF0ZVJhbmRvbSwgUmFuZG9tR2VuZXJhdG9yfSBmcm9tICcuL2NyeXB0b191dGlscyc7XHJcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0IGFzIEpTT04uXHJcbiAqL1xyXG5cclxuLy8gTk9URTpcclxuLy8gQm90aCByZWRpcmVjdF91cmkgYW5kIHN0YXRlIGFyZSBhY3R1YWxseSBvcHRpb25hbC5cclxuLy8gSG93ZXZlciBBcHBBdXRoIGlzIG1vcmUgb3Bpb25pb25hdGVkLCBhbmQgcmVxdWlyZXMgeW91IHRvIHVzZSBib3RoLlxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBBdXRob3JpemF0aW9uUmVxdWVzdEpzb24ge1xyXG4gIHJlc3BvbnNlX3R5cGU6IHN0cmluZztcclxuICBjbGllbnRfaWQ6IHN0cmluZztcclxuICByZWRpcmVjdF91cmk6IHN0cmluZztcclxuICBzdGF0ZTogc3RyaW5nO1xyXG4gIHNjb3BlOiBzdHJpbmc7XHJcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGEgY3J5cHRvZ3JhcGhpY2FsbHkgcmFuZG9tIG5ldyBzdGF0ZS4gVXNlZnVsIGZvciBDU1JGIHByb3RlY3Rpb24uXHJcbiAqL1xyXG5jb25zdCBCWVRFU19MRU5HVEggPSAxMDsgIC8vIDEwIGJ5dGVzXHJcbmNvbnN0IG5ld1N0YXRlID0gZnVuY3Rpb24oZ2VuZXJhdGVSYW5kb206IFJhbmRvbUdlbmVyYXRvcik6IHN0cmluZyB7XHJcbiAgcmV0dXJuIGdlbmVyYXRlUmFuZG9tKEJZVEVTX0xFTkdUSCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgQXV0aG9yaXphdGlvblJlcXVlc3QuXHJcbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcclxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuMVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25SZXF1ZXN0IHtcclxuICBzdGF0aWMgUkVTUE9OU0VfVFlQRV9DT0RFID0gJ2NvZGUnO1xyXG5cclxuICBzdGF0ZTogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYSBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QuXHJcbiAgICogVXNlIGEgYHVuZGVmaW5lZGAgdmFsdWUgZm9yIHRoZSBgc3RhdGVgIHBhcmFtZXRlciwgdG8gZ2VuZXJhdGUgYSByYW5kb21cclxuICAgKiBzdGF0ZSBmb3IgQ1NSRiBwcm90ZWN0aW9uLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICBwdWJsaWMgY2xpZW50SWQ6IHN0cmluZyxcclxuICAgICAgcHVibGljIHJlZGlyZWN0VXJpOiBzdHJpbmcsXHJcbiAgICAgIHB1YmxpYyBzY29wZTogc3RyaW5nLFxyXG4gICAgICBwdWJsaWMgcmVzcG9uc2VUeXBlOiBzdHJpbmcgPSBBdXRob3JpemF0aW9uUmVxdWVzdC5SRVNQT05TRV9UWVBFX0NPREUsXHJcbiAgICAgIHN0YXRlPzogc3RyaW5nLFxyXG4gICAgICBwdWJsaWMgZXh0cmFzPzogU3RyaW5nTWFwLFxyXG4gICAgICBnZW5lcmF0ZVJhbmRvbSA9IGNyeXB0b0dlbmVyYXRlUmFuZG9tKSB7XHJcbiAgICB0aGlzLnN0YXRlID0gc3RhdGUgfHwgbmV3U3RhdGUoZ2VuZXJhdGVSYW5kb20pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2VyaWFsaXplcyB0aGUgQXV0aG9yaXphdGlvblJlcXVlc3QgdG8gYSBKYXZhU2NyaXB0IE9iamVjdC5cclxuICAgKi9cclxuICB0b0pzb24oKTogQXV0aG9yaXphdGlvblJlcXVlc3RKc29uIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHJlc3BvbnNlX3R5cGU6IHRoaXMucmVzcG9uc2VUeXBlLFxyXG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXHJcbiAgICAgIHJlZGlyZWN0X3VyaTogdGhpcy5yZWRpcmVjdFVyaSxcclxuICAgICAgc2NvcGU6IHRoaXMuc2NvcGUsXHJcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxyXG4gICAgICBleHRyYXM6IHRoaXMuZXh0cmFzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBvZiBBdXRob3JpemF0aW9uUmVxdWVzdC5cclxuICAgKi9cclxuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbik6IEF1dGhvcml6YXRpb25SZXF1ZXN0IHtcclxuICAgIHJldHVybiBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QoXHJcbiAgICAgICAgaW5wdXQuY2xpZW50X2lkLFxyXG4gICAgICAgIGlucHV0LnJlZGlyZWN0X3VyaSxcclxuICAgICAgICBpbnB1dC5zY29wZSxcclxuICAgICAgICBpbnB1dC5yZXNwb25zZV90eXBlLFxyXG4gICAgICAgIGlucHV0LnN0YXRlLFxyXG4gICAgICAgIGlucHV0LmV4dHJhcyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==