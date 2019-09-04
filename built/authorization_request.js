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
var logger_1 = require("./logger");
/**
 * Generates a cryptographically random new state. Useful for CSRF protection.
 */
var SIZE = 10; // 10 bytes
var newState = function (crypto) {
    return crypto.generateRandom(SIZE);
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
    function AuthorizationRequest(request, crypto, usePkce) {
        if (crypto === void 0) { crypto = new crypto_utils_1.DefaultCrypto(); }
        if (usePkce === void 0) { usePkce = true; }
        this.crypto = crypto;
        this.usePkce = usePkce;
        this.clientId = request.client_id;
        this.redirectUri = request.redirect_uri;
        this.scope = request.scope;
        this.responseType = request.response_type || AuthorizationRequest.RESPONSE_TYPE_CODE;
        this.state = request.state || newState(crypto);
        this.extras = request.extras;
        // read internal properties if available
        this.internal = request.internal;
    }
    AuthorizationRequest.prototype.setupCodeVerifier = function () {
        var _this = this;
        if (!this.usePkce) {
            return Promise.resolve();
        }
        else {
            var codeVerifier_1 = this.crypto.generateRandom(128);
            var challenge = this.crypto.deriveChallenge(codeVerifier_1).catch(function (error) {
                logger_1.log('Unable to generate PKCE challenge. Not using PKCE', error);
                return undefined;
            });
            return challenge.then(function (result) {
                if (result) {
                    // keep track of the code used.
                    _this.internal = _this.internal || {};
                    _this.internal['code_verifier'] = codeVerifier_1;
                    _this.extras = _this.extras || {};
                    _this.extras['code_challenge'] = result;
                    // We always use S256. Plain is not good enough.
                    _this.extras['code_challenge_method'] = 'S256';
                }
            });
        }
    };
    /**
     * Serializes the AuthorizationRequest to a JavaScript Object.
     */
    AuthorizationRequest.prototype.toJson = function () {
        var _this = this;
        // Always make sure that the code verifier is setup when toJson() is called.
        return this.setupCodeVerifier().then(function () {
            return {
                response_type: _this.responseType,
                client_id: _this.clientId,
                redirect_uri: _this.redirectUri,
                scope: _this.scope,
                state: _this.state,
                extras: _this.extras,
                internal: _this.internal
            };
        });
    };
    AuthorizationRequest.RESPONSE_TYPE_TOKEN = 'token';
    AuthorizationRequest.RESPONSE_TYPE_CODE = 'code';
    return AuthorizationRequest;
}());
exports.AuthorizationRequest = AuthorizationRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILCtDQUFxRDtBQUNyRCxtQ0FBNkI7QUF1QjdCOztHQUVHO0FBQ0gsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUUsV0FBVztBQUM3QixJQUFNLFFBQVEsR0FBRyxVQUFTLE1BQWM7SUFDdEMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSDtJQWVFOzs7O09BSUc7SUFDSCw4QkFDSSxPQUFpQyxFQUN6QixNQUFvQyxFQUNwQyxPQUF1QjtRQUR2Qix1QkFBQSxFQUFBLGFBQXFCLDRCQUFhLEVBQUU7UUFDcEMsd0JBQUEsRUFBQSxjQUF1QjtRQUR2QixXQUFNLEdBQU4sTUFBTSxDQUE4QjtRQUNwQyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxhQUFhLElBQUksb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7UUFDckYsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0Isd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBRUQsZ0RBQWlCLEdBQWpCO1FBQUEsaUJBc0JDO1FBckJDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzFCO2FBQU07WUFDTCxJQUFNLGNBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxJQUFNLFNBQVMsR0FDWCxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxjQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO2dCQUNuRCxZQUFHLENBQUMsbURBQW1ELEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2hFLE9BQU8sU0FBUyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1lBQ1AsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDMUIsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsK0JBQStCO29CQUMvQixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO29CQUNwQyxLQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLGNBQVksQ0FBQztvQkFDOUMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztvQkFDaEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQztvQkFDdkMsZ0RBQWdEO29CQUNoRCxLQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsTUFBTSxDQUFDO2lCQUMvQztZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQ0FBTSxHQUFOO1FBQUEsaUJBYUM7UUFaQyw0RUFBNEU7UUFDNUUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDbkMsT0FBTztnQkFDTCxhQUFhLEVBQUUsS0FBSSxDQUFDLFlBQVk7Z0JBQ2hDLFNBQVMsRUFBRSxLQUFJLENBQUMsUUFBUTtnQkFDeEIsWUFBWSxFQUFFLEtBQUksQ0FBQyxXQUFXO2dCQUM5QixLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUs7Z0JBQ2pCLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSztnQkFDakIsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNO2dCQUNuQixRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVE7YUFDeEIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXpFTSx3Q0FBbUIsR0FBRyxPQUFPLENBQUM7SUFDOUIsdUNBQWtCLEdBQUcsTUFBTSxDQUFDO0lBeUVyQywyQkFBQztDQUFBLEFBM0VELElBMkVDO0FBM0VZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0NyeXB0bywgRGVmYXVsdENyeXB0b30gZnJvbSAnLi9jcnlwdG9fdXRpbHMnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0IGFzIEpTT04uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXphdGlvblJlcXVlc3RKc29uIHtcbiAgcmVzcG9uc2VfdHlwZTogc3RyaW5nO1xuICBjbGllbnRfaWQ6IHN0cmluZztcbiAgcmVkaXJlY3RfdXJpOiBzdHJpbmc7XG4gIHNjb3BlOiBzdHJpbmc7XG4gIHN0YXRlPzogc3RyaW5nO1xuICBleHRyYXM/OiBTdHJpbmdNYXA7XG4gIGludGVybmFsPzogU3RyaW5nTWFwO1xufVxuXG4vKip6XG4gKiBSZXByZXNlbnRzIGFuIGFkaXRpb25sYSBvcHRpb25zIHRvIHBlcmZvcm0gY3VzdG9tIEF1dGhvcml6YXRpb25SZXF1ZXN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25PcGVuZXJPcHRpb25zIHtcbiAgaGFzQ3VzdG9tT3BlbmVyPzogYm9vbGVhbjtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBjcnlwdG9ncmFwaGljYWxseSByYW5kb20gbmV3IHN0YXRlLiBVc2VmdWwgZm9yIENTUkYgcHJvdGVjdGlvbi5cbiAqL1xuY29uc3QgU0laRSA9IDEwOyAgLy8gMTAgYnl0ZXNcbmNvbnN0IG5ld1N0YXRlID0gZnVuY3Rpb24oY3J5cHRvOiBDcnlwdG8pOiBzdHJpbmcge1xuICByZXR1cm4gY3J5cHRvLmdlbmVyYXRlUmFuZG9tKFNJWkUpO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uUmVxdWVzdC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNC4xLjFcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25SZXF1ZXN0IHtcbiAgc3RhdGljIFJFU1BPTlNFX1RZUEVfVE9LRU4gPSAndG9rZW4nO1xuICBzdGF0aWMgUkVTUE9OU0VfVFlQRV9DT0RFID0gJ2NvZGUnO1xuXG4gIC8vIE5PVEU6XG4gIC8vIEJvdGggcmVkaXJlY3RfdXJpIGFuZCBzdGF0ZSBhcmUgYWN0dWFsbHkgb3B0aW9uYWwuXG4gIC8vIEhvd2V2ZXIgQXBwQXV0aCBpcyBtb3JlIG9waW9uaW9uYXRlZCwgYW5kIHJlcXVpcmVzIHlvdSB0byB1c2UgYm90aC5cblxuICBjbGllbnRJZDogc3RyaW5nO1xuICByZWRpcmVjdFVyaTogc3RyaW5nO1xuICBzY29wZTogc3RyaW5nO1xuICByZXNwb25zZVR5cGU6IHN0cmluZztcbiAgc3RhdGU6IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xuICBpbnRlcm5hbD86IFN0cmluZ01hcDtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QuXG4gICAqIFVzZSBhIGB1bmRlZmluZWRgIHZhbHVlIGZvciB0aGUgYHN0YXRlYCBwYXJhbWV0ZXIsIHRvIGdlbmVyYXRlIGEgcmFuZG9tXG4gICAqIHN0YXRlIGZvciBDU1JGIHByb3RlY3Rpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbixcbiAgICAgIHByaXZhdGUgY3J5cHRvOiBDcnlwdG8gPSBuZXcgRGVmYXVsdENyeXB0bygpLFxuICAgICAgcHJpdmF0ZSB1c2VQa2NlOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHRoaXMuY2xpZW50SWQgPSByZXF1ZXN0LmNsaWVudF9pZDtcbiAgICB0aGlzLnJlZGlyZWN0VXJpID0gcmVxdWVzdC5yZWRpcmVjdF91cmk7XG4gICAgdGhpcy5zY29wZSA9IHJlcXVlc3Quc2NvcGU7XG4gICAgdGhpcy5yZXNwb25zZVR5cGUgPSByZXF1ZXN0LnJlc3BvbnNlX3R5cGUgfHwgQXV0aG9yaXphdGlvblJlcXVlc3QuUkVTUE9OU0VfVFlQRV9DT0RFO1xuICAgIHRoaXMuc3RhdGUgPSByZXF1ZXN0LnN0YXRlIHx8IG5ld1N0YXRlKGNyeXB0byk7XG4gICAgdGhpcy5leHRyYXMgPSByZXF1ZXN0LmV4dHJhcztcbiAgICAvLyByZWFkIGludGVybmFsIHByb3BlcnRpZXMgaWYgYXZhaWxhYmxlXG4gICAgdGhpcy5pbnRlcm5hbCA9IHJlcXVlc3QuaW50ZXJuYWw7XG4gIH1cblxuICBzZXR1cENvZGVWZXJpZmllcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMudXNlUGtjZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2RlVmVyaWZpZXIgPSB0aGlzLmNyeXB0by5nZW5lcmF0ZVJhbmRvbSgxMjgpO1xuICAgICAgY29uc3QgY2hhbGxlbmdlOiBQcm9taXNlPHN0cmluZ3x1bmRlZmluZWQ+ID1cbiAgICAgICAgICB0aGlzLmNyeXB0by5kZXJpdmVDaGFsbGVuZ2UoY29kZVZlcmlmaWVyKS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBsb2coJ1VuYWJsZSB0byBnZW5lcmF0ZSBQS0NFIGNoYWxsZW5nZS4gTm90IHVzaW5nIFBLQ0UnLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNoYWxsZW5nZS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSBjb2RlIHVzZWQuXG4gICAgICAgICAgdGhpcy5pbnRlcm5hbCA9IHRoaXMuaW50ZXJuYWwgfHwge307XG4gICAgICAgICAgdGhpcy5pbnRlcm5hbFsnY29kZV92ZXJpZmllciddID0gY29kZVZlcmlmaWVyO1xuICAgICAgICAgIHRoaXMuZXh0cmFzID0gdGhpcy5leHRyYXMgfHwge307XG4gICAgICAgICAgdGhpcy5leHRyYXNbJ2NvZGVfY2hhbGxlbmdlJ10gPSByZXN1bHQ7XG4gICAgICAgICAgLy8gV2UgYWx3YXlzIHVzZSBTMjU2LiBQbGFpbiBpcyBub3QgZ29vZCBlbm91Z2guXG4gICAgICAgICAgdGhpcy5leHRyYXNbJ2NvZGVfY2hhbGxlbmdlX21ldGhvZCddID0gJ1MyNTYnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplcyB0aGUgQXV0aG9yaXphdGlvblJlcXVlc3QgdG8gYSBKYXZhU2NyaXB0IE9iamVjdC5cbiAgICovXG4gIHRvSnNvbigpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbj4ge1xuICAgIC8vIEFsd2F5cyBtYWtlIHN1cmUgdGhhdCB0aGUgY29kZSB2ZXJpZmllciBpcyBzZXR1cCB3aGVuIHRvSnNvbigpIGlzIGNhbGxlZC5cbiAgICByZXR1cm4gdGhpcy5zZXR1cENvZGVWZXJpZmllcigpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzcG9uc2VfdHlwZTogdGhpcy5yZXNwb25zZVR5cGUsXG4gICAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRJZCxcbiAgICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0VXJpLFxuICAgICAgICBzY29wZTogdGhpcy5zY29wZSxcbiAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgIGV4dHJhczogdGhpcy5leHRyYXMsXG4gICAgICAgIGludGVybmFsOiB0aGlzLmludGVybmFsXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG59XG4iXX0=