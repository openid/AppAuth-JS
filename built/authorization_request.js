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
    /**
     * Adds additional extra fields to the AuthorizationRequest.
     */
    AuthorizationRequest.prototype.setExtrasField = function (key, value) {
        if (this.extras) {
            this.extras[key] = value;
        }
    };
    AuthorizationRequest.RESPONSE_TYPE_CODE = 'code';
    AuthorizationRequest.RESPONSE_TYPE_ID_TOKEN = 'id_token';
    return AuthorizationRequest;
}());
exports.AuthorizationRequest = AuthorizationRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILCtDQUFxRTtBQW9CckU7O0dBRUc7QUFDSCxJQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBRSxXQUFXO0FBQ3JDLElBQU0sUUFBUSxHQUFHLFVBQVMsY0FBK0I7SUFDdkQsT0FBTyxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNIO0lBS0U7Ozs7T0FJRztJQUNILDhCQUNXLFFBQWdCLEVBQ2hCLFdBQW1CLEVBQ25CLEtBQWEsRUFDYixZQUE4RCxFQUNyRSxLQUFjLEVBQ1AsTUFBa0IsRUFDekIsY0FBcUM7UUFIOUIsNkJBQUEsRUFBQSxlQUF1QixvQkFBb0IsQ0FBQyxrQkFBa0I7UUFHckUsK0JBQUEsRUFBQSxpQkFBaUIsbUNBQW9CO1FBTjlCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLGlCQUFZLEdBQVosWUFBWSxDQUFrRDtRQUU5RCxXQUFNLEdBQU4sTUFBTSxDQUFZO1FBRTNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQ0FBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUNoQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzlCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRUQ7O09BRUc7SUFDSSw2QkFBUSxHQUFmLFVBQWdCLEtBQStCO1FBQzdDLE9BQU8sSUFBSSxvQkFBb0IsQ0FDM0IsS0FBSyxDQUFDLFNBQVMsRUFDZixLQUFLLENBQUMsWUFBWSxFQUNsQixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxhQUFhLEVBQ25CLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7T0FFRztJQUNILDZDQUFjLEdBQWQsVUFBZSxHQUFXLEVBQUUsS0FBYTtRQUN2QyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUMxQjtJQUNILENBQUM7SUF0RE0sdUNBQWtCLEdBQUcsTUFBTSxDQUFDO0lBQzVCLDJDQUFzQixHQUFHLFVBQVUsQ0FBQztJQXNEN0MsMkJBQUM7Q0FBQSxBQXhERCxJQXdEQztBQXhEWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtjcnlwdG9HZW5lcmF0ZVJhbmRvbSwgUmFuZG9tR2VuZXJhdG9yfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBBdXRob3JpemF0aW9uUmVxdWVzdCBhcyBKU09OLlxuICovXG5cbi8vIE5PVEU6XG4vLyBCb3RoIHJlZGlyZWN0X3VyaSBhbmQgc3RhdGUgYXJlIGFjdHVhbGx5IG9wdGlvbmFsLlxuLy8gSG93ZXZlciBBcHBBdXRoIGlzIG1vcmUgb3Bpb25pb25hdGVkLCBhbmQgcmVxdWlyZXMgeW91IHRvIHVzZSBib3RoLlxuXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbiB7XG4gIHJlc3BvbnNlX3R5cGU6IHN0cmluZztcbiAgY2xpZW50X2lkOiBzdHJpbmc7XG4gIHJlZGlyZWN0X3VyaTogc3RyaW5nO1xuICBzdGF0ZTogc3RyaW5nO1xuICBzY29wZTogc3RyaW5nO1xuICBleHRyYXM/OiBTdHJpbmdNYXA7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgY3J5cHRvZ3JhcGhpY2FsbHkgcmFuZG9tIG5ldyBzdGF0ZS4gVXNlZnVsIGZvciBDU1JGIHByb3RlY3Rpb24uXG4gKi9cbmNvbnN0IEJZVEVTX0xFTkdUSCA9IDEwOyAgLy8gMTAgYnl0ZXNcbmNvbnN0IG5ld1N0YXRlID0gZnVuY3Rpb24oZ2VuZXJhdGVSYW5kb206IFJhbmRvbUdlbmVyYXRvcik6IHN0cmluZyB7XG4gIHJldHVybiBnZW5lcmF0ZVJhbmRvbShCWVRFU19MRU5HVEgpO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uUmVxdWVzdC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNC4xLjFcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25SZXF1ZXN0IHtcbiAgc3RhdGljIFJFU1BPTlNFX1RZUEVfQ09ERSA9ICdjb2RlJztcbiAgc3RhdGljIFJFU1BPTlNFX1RZUEVfSURfVE9LRU4gPSAnaWRfdG9rZW4nO1xuXG4gIHN0YXRlOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEF1dGhvcml6YXRpb25SZXF1ZXN0LlxuICAgKiBVc2UgYSBgdW5kZWZpbmVkYCB2YWx1ZSBmb3IgdGhlIGBzdGF0ZWAgcGFyYW1ldGVyLCB0byBnZW5lcmF0ZSBhIHJhbmRvbVxuICAgKiBzdGF0ZSBmb3IgQ1NSRiBwcm90ZWN0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgY2xpZW50SWQ6IHN0cmluZyxcbiAgICAgIHB1YmxpYyByZWRpcmVjdFVyaTogc3RyaW5nLFxuICAgICAgcHVibGljIHNjb3BlOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcmVzcG9uc2VUeXBlOiBzdHJpbmcgPSBBdXRob3JpemF0aW9uUmVxdWVzdC5SRVNQT05TRV9UWVBFX0NPREUsXG4gICAgICBzdGF0ZT86IHN0cmluZyxcbiAgICAgIHB1YmxpYyBleHRyYXM/OiBTdHJpbmdNYXAsXG4gICAgICBnZW5lcmF0ZVJhbmRvbSA9IGNyeXB0b0dlbmVyYXRlUmFuZG9tKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHN0YXRlIHx8IG5ld1N0YXRlKGdlbmVyYXRlUmFuZG9tKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIHRoZSBBdXRob3JpemF0aW9uUmVxdWVzdCB0byBhIEphdmFTY3JpcHQgT2JqZWN0LlxuICAgKi9cbiAgdG9Kc29uKCk6IEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3BvbnNlX3R5cGU6IHRoaXMucmVzcG9uc2VUeXBlLFxuICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxuICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0VXJpLFxuICAgICAgc2NvcGU6IHRoaXMuc2NvcGUsXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgIGV4dHJhczogdGhpcy5leHRyYXNcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2Ugb2YgQXV0aG9yaXphdGlvblJlcXVlc3QuXG4gICAqL1xuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbik6IEF1dGhvcml6YXRpb25SZXF1ZXN0IHtcbiAgICByZXR1cm4gbmV3IEF1dGhvcml6YXRpb25SZXF1ZXN0KFxuICAgICAgICBpbnB1dC5jbGllbnRfaWQsXG4gICAgICAgIGlucHV0LnJlZGlyZWN0X3VyaSxcbiAgICAgICAgaW5wdXQuc2NvcGUsXG4gICAgICAgIGlucHV0LnJlc3BvbnNlX3R5cGUsXG4gICAgICAgIGlucHV0LnN0YXRlLFxuICAgICAgICBpbnB1dC5leHRyYXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYWRkaXRpb25hbCBleHRyYSBmaWVsZHMgdG8gdGhlIEF1dGhvcml6YXRpb25SZXF1ZXN0LlxuICAgKi9cbiAgc2V0RXh0cmFzRmllbGQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5leHRyYXMpIHtcbiAgICAgIHRoaXMuZXh0cmFzW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==