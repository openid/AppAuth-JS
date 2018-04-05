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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILCtDQUFxRTtBQW9CckU7O0dBRUc7QUFDSCxJQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBRSxXQUFXO0FBQ3JDLElBQU0sUUFBUSxHQUFHLFVBQVMsY0FBK0I7SUFDdkQsT0FBTyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNIO0lBSUU7Ozs7T0FJRztJQUNILDhCQUNXLFFBQWdCLEVBQ2hCLFdBQW1CLEVBQ25CLEtBQWEsRUFDYixZQUE4RCxFQUNyRSxLQUFjLEVBQ1AsTUFBa0IsRUFDekIsY0FBcUM7UUFIOUIsNkJBQUEsRUFBQSxlQUF1QixvQkFBb0IsQ0FBQyxrQkFBa0I7UUFHckUsK0JBQUEsRUFBQSxpQkFBaUIsbUNBQW9CO1FBTjlCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGlCQUFZLEdBQVosWUFBWSxDQUFrRDtRQUU5RCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRTNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQ0FBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUNoQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzlCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSw2QkFBUSxHQUFmLFVBQWdCLEtBQStCO1FBQzdDLE9BQU8sSUFBSSxvQkFBb0IsQ0FDM0IsS0FBSyxDQUFDLFNBQVMsRUFDZixLQUFLLENBQUMsWUFBWSxFQUNsQixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxhQUFhLEVBQ25CLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUE1Q00sdUNBQWtCLEdBQUcsTUFBTSxDQUFDO0lBNkNyQywyQkFBQztDQUFBLEFBOUNELElBOENDO0FBOUNZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge2NyeXB0b0dlbmVyYXRlUmFuZG9tLCBSYW5kb21HZW5lcmF0b3J9IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0IGFzIEpTT04uXG4gKi9cblxuLy8gTk9URTpcbi8vIEJvdGggcmVkaXJlY3RfdXJpIGFuZCBzdGF0ZSBhcmUgYWN0dWFsbHkgb3B0aW9uYWwuXG4vLyBIb3dldmVyIEFwcEF1dGggaXMgbW9yZSBvcGlvbmlvbmF0ZWQsIGFuZCByZXF1aXJlcyB5b3UgdG8gdXNlIGJvdGguXG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXphdGlvblJlcXVlc3RKc29uIHtcbiAgcmVzcG9uc2VfdHlwZTogc3RyaW5nO1xuICBjbGllbnRfaWQ6IHN0cmluZztcbiAgcmVkaXJlY3RfdXJpOiBzdHJpbmc7XG4gIHN0YXRlOiBzdHJpbmc7XG4gIHNjb3BlOiBzdHJpbmc7XG4gIGV4dHJhcz86IFN0cmluZ01hcDtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBjcnlwdG9ncmFwaGljYWxseSByYW5kb20gbmV3IHN0YXRlLiBVc2VmdWwgZm9yIENTUkYgcHJvdGVjdGlvbi5cbiAqL1xuY29uc3QgQllURVNfTEVOR1RIID0gMTA7ICAvLyAxMCBieXRlc1xuY29uc3QgbmV3U3RhdGUgPSBmdW5jdGlvbihnZW5lcmF0ZVJhbmRvbTogUmFuZG9tR2VuZXJhdG9yKTogc3RyaW5nIHtcbiAgcmV0dXJuIGdlbmVyYXRlUmFuZG9tKEJZVEVTX0xFTkdUSCk7XG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEF1dGhvcml6YXRpb25SZXF1ZXN0LlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdFxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuMVxuICovXG5leHBvcnQgY2xhc3MgQXV0aG9yaXphdGlvblJlcXVlc3Qge1xuICBzdGF0aWMgUkVTUE9OU0VfVFlQRV9DT0RFID0gJ2NvZGUnO1xuXG4gIHN0YXRlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEF1dGhvcml6YXRpb25SZXF1ZXN0LlxuICAgKiBVc2UgYSBgdW5kZWZpbmVkYCB2YWx1ZSBmb3IgdGhlIGBzdGF0ZWAgcGFyYW1ldGVyLCB0byBnZW5lcmF0ZSBhIHJhbmRvbVxuICAgKiBzdGF0ZSBmb3IgQ1NSRiBwcm90ZWN0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgY2xpZW50SWQ6IHN0cmluZyxcbiAgICAgIHB1YmxpYyByZWRpcmVjdFVyaTogc3RyaW5nLFxuICAgICAgcHVibGljIHNjb3BlOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcmVzcG9uc2VUeXBlOiBzdHJpbmcgPSBBdXRob3JpemF0aW9uUmVxdWVzdC5SRVNQT05TRV9UWVBFX0NPREUsXG4gICAgICBzdGF0ZT86IHN0cmluZyxcbiAgICAgIHB1YmxpYyBleHRyYXM/OiBTdHJpbmdNYXAsXG4gICAgICBnZW5lcmF0ZVJhbmRvbSA9IGNyeXB0b0dlbmVyYXRlUmFuZG9tKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlIHx8IG5ld1N0YXRlKGdlbmVyYXRlUmFuZG9tKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIHRoZSBBdXRob3JpemF0aW9uUmVxdWVzdCB0byBhIEphdmFTY3JpcHQgT2JqZWN0LlxuICAgKi9cbiAgdG9Kc29uKCk6IEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3BvbnNlX3R5cGU6IHRoaXMucmVzcG9uc2VUeXBlLFxuICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxuICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0VXJpLFxuICAgICAgc2NvcGU6IHRoaXMuc2NvcGUsXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgIGV4dHJhczogdGhpcy5leHRyYXNcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgQXV0aG9yaXphdGlvblJlcXVlc3QuXG4gICAqL1xuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbik6IEF1dGhvcml6YXRpb25SZXF1ZXN0IHtcbiAgICByZXR1cm4gbmV3IEF1dGhvcml6YXRpb25SZXF1ZXN0KFxuICAgICAgICBpbnB1dC5jbGllbnRfaWQsXG4gICAgICAgIGlucHV0LnJlZGlyZWN0X3VyaSxcbiAgICAgICAgaW5wdXQuc2NvcGUsXG4gICAgICAgIGlucHV0LnJlc3BvbnNlX3R5cGUsXG4gICAgICAgIGlucHV0LnN0YXRlLFxuICAgICAgICBpbnB1dC5leHRyYXMpO1xuICB9XG59XG4iXX0=