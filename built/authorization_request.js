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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILCtDQUFxRDtBQUNyRCxtQ0FBNkI7QUFnQjdCOztHQUVHO0FBQ0gsSUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUUsV0FBVztBQUM3QixJQUFNLFFBQVEsR0FBRyxVQUFTLE1BQWM7SUFDdEMsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQztBQUVGOzs7O0dBSUc7QUFDSDtJQWVFOzs7O09BSUc7SUFDSCw4QkFDSSxPQUFpQyxFQUN6QixNQUFvQyxFQUNwQyxPQUF1QjtRQUR2Qix1QkFBQSxFQUFBLGFBQXFCLDRCQUFhLEVBQUU7UUFDcEMsd0JBQUEsRUFBQSxjQUF1QjtRQUR2QixXQUFNLEdBQU4sTUFBTSxDQUE4QjtRQUNwQyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxhQUFhLElBQUksb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7UUFDckYsSUFBSSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0Isd0NBQXdDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNuQyxDQUFDO0lBRUQsZ0RBQWlCLEdBQWpCO1FBQUEsaUJBc0JDO1FBckJDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2pCLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzFCO2FBQU07WUFDTCxJQUFNLGNBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxJQUFNLFNBQVMsR0FDWCxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxjQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLO2dCQUNuRCxZQUFHLENBQUMsbURBQW1ELEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2hFLE9BQU8sU0FBUyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1lBQ1AsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDMUIsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsK0JBQStCO29CQUMvQixLQUFJLENBQUMsUUFBUSxHQUFHLEtBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO29CQUNwQyxLQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLGNBQVksQ0FBQztvQkFDOUMsS0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztvQkFDaEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQztvQkFDdkMsZ0RBQWdEO29CQUNoRCxLQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsTUFBTSxDQUFDO2lCQUMvQztZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQ0FBTSxHQUFOO1FBQUEsaUJBYUM7UUFaQyw0RUFBNEU7UUFDNUUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDbkMsT0FBTztnQkFDTCxhQUFhLEVBQUUsS0FBSSxDQUFDLFlBQVk7Z0JBQ2hDLFNBQVMsRUFBRSxLQUFJLENBQUMsUUFBUTtnQkFDeEIsWUFBWSxFQUFFLEtBQUksQ0FBQyxXQUFXO2dCQUM5QixLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUs7Z0JBQ2pCLEtBQUssRUFBRSxLQUFJLENBQUMsS0FBSztnQkFDakIsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNO2dCQUNuQixRQUFRLEVBQUUsS0FBSSxDQUFDLFFBQVE7YUFDeEIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQXpFTSx3Q0FBbUIsR0FBRyxPQUFPLENBQUM7SUFDOUIsdUNBQWtCLEdBQUcsTUFBTSxDQUFDO0lBeUVyQywyQkFBQztDQUFBLEFBM0VELElBMkVDO0FBM0VZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0NyeXB0bywgRGVmYXVsdENyeXB0b30gZnJvbSAnLi9jcnlwdG9fdXRpbHMnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0IGFzIEpTT04uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXphdGlvblJlcXVlc3RKc29uIHtcbiAgcmVzcG9uc2VfdHlwZTogc3RyaW5nO1xuICBjbGllbnRfaWQ6IHN0cmluZztcbiAgcmVkaXJlY3RfdXJpOiBzdHJpbmc7XG4gIHNjb3BlOiBzdHJpbmc7XG4gIHN0YXRlPzogc3RyaW5nO1xuICBleHRyYXM/OiBTdHJpbmdNYXA7XG4gIGludGVybmFsPzogU3RyaW5nTWFwO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlcyBhIGNyeXB0b2dyYXBoaWNhbGx5IHJhbmRvbSBuZXcgc3RhdGUuIFVzZWZ1bCBmb3IgQ1NSRiBwcm90ZWN0aW9uLlxuICovXG5jb25zdCBTSVpFID0gMTA7ICAvLyAxMCBieXRlc1xuY29uc3QgbmV3U3RhdGUgPSBmdW5jdGlvbihjcnlwdG86IENyeXB0byk6IHN0cmluZyB7XG4gIHJldHVybiBjcnlwdG8uZ2VuZXJhdGVSYW5kb20oU0laRSk7XG59O1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEF1dGhvcml6YXRpb25SZXF1ZXN0LlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdFxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuMVxuICovXG5leHBvcnQgY2xhc3MgQXV0aG9yaXphdGlvblJlcXVlc3Qge1xuICBzdGF0aWMgUkVTUE9OU0VfVFlQRV9UT0tFTiA9ICd0b2tlbic7XG4gIHN0YXRpYyBSRVNQT05TRV9UWVBFX0NPREUgPSAnY29kZSc7XG5cbiAgLy8gTk9URTpcbiAgLy8gQm90aCByZWRpcmVjdF91cmkgYW5kIHN0YXRlIGFyZSBhY3R1YWxseSBvcHRpb25hbC5cbiAgLy8gSG93ZXZlciBBcHBBdXRoIGlzIG1vcmUgb3Bpb25pb25hdGVkLCBhbmQgcmVxdWlyZXMgeW91IHRvIHVzZSBib3RoLlxuXG4gIGNsaWVudElkOiBzdHJpbmc7XG4gIHJlZGlyZWN0VXJpOiBzdHJpbmc7XG4gIHNjb3BlOiBzdHJpbmc7XG4gIHJlc3BvbnNlVHlwZTogc3RyaW5nO1xuICBzdGF0ZTogc3RyaW5nO1xuICBleHRyYXM/OiBTdHJpbmdNYXA7XG4gIGludGVybmFsPzogU3RyaW5nTWFwO1xuICAvKipcbiAgICogQ29uc3RydWN0cyBhIG5ldyBBdXRob3JpemF0aW9uUmVxdWVzdC5cbiAgICogVXNlIGEgYHVuZGVmaW5lZGAgdmFsdWUgZm9yIHRoZSBgc3RhdGVgIHBhcmFtZXRlciwgdG8gZ2VuZXJhdGUgYSByYW5kb21cbiAgICogc3RhdGUgZm9yIENTUkYgcHJvdGVjdGlvbi5cbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3RKc29uLFxuICAgICAgcHJpdmF0ZSBjcnlwdG86IENyeXB0byA9IG5ldyBEZWZhdWx0Q3J5cHRvKCksXG4gICAgICBwcml2YXRlIHVzZVBrY2U6IGJvb2xlYW4gPSB0cnVlKSB7XG4gICAgdGhpcy5jbGllbnRJZCA9IHJlcXVlc3QuY2xpZW50X2lkO1xuICAgIHRoaXMucmVkaXJlY3RVcmkgPSByZXF1ZXN0LnJlZGlyZWN0X3VyaTtcbiAgICB0aGlzLnNjb3BlID0gcmVxdWVzdC5zY29wZTtcbiAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHJlcXVlc3QucmVzcG9uc2VfdHlwZSB8fCBBdXRob3JpemF0aW9uUmVxdWVzdC5SRVNQT05TRV9UWVBFX0NPREU7XG4gICAgdGhpcy5zdGF0ZSA9IHJlcXVlc3Quc3RhdGUgfHwgbmV3U3RhdGUoY3J5cHRvKTtcbiAgICB0aGlzLmV4dHJhcyA9IHJlcXVlc3QuZXh0cmFzO1xuICAgIC8vIHJlYWQgaW50ZXJuYWwgcHJvcGVydGllcyBpZiBhdmFpbGFibGVcbiAgICB0aGlzLmludGVybmFsID0gcmVxdWVzdC5pbnRlcm5hbDtcbiAgfVxuXG4gIHNldHVwQ29kZVZlcmlmaWVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy51c2VQa2NlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvZGVWZXJpZmllciA9IHRoaXMuY3J5cHRvLmdlbmVyYXRlUmFuZG9tKDEyOCk7XG4gICAgICBjb25zdCBjaGFsbGVuZ2U6IFByb21pc2U8c3RyaW5nfHVuZGVmaW5lZD4gPVxuICAgICAgICAgIHRoaXMuY3J5cHRvLmRlcml2ZUNoYWxsZW5nZShjb2RlVmVyaWZpZXIpLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGxvZygnVW5hYmxlIHRvIGdlbmVyYXRlIFBLQ0UgY2hhbGxlbmdlLiBOb3QgdXNpbmcgUEtDRScsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfSk7XG4gICAgICByZXR1cm4gY2hhbGxlbmdlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgdGhlIGNvZGUgdXNlZC5cbiAgICAgICAgICB0aGlzLmludGVybmFsID0gdGhpcy5pbnRlcm5hbCB8fCB7fTtcbiAgICAgICAgICB0aGlzLmludGVybmFsWydjb2RlX3ZlcmlmaWVyJ10gPSBjb2RlVmVyaWZpZXI7XG4gICAgICAgICAgdGhpcy5leHRyYXMgPSB0aGlzLmV4dHJhcyB8fCB7fTtcbiAgICAgICAgICB0aGlzLmV4dHJhc1snY29kZV9jaGFsbGVuZ2UnXSA9IHJlc3VsdDtcbiAgICAgICAgICAvLyBXZSBhbHdheXMgdXNlIFMyNTYuIFBsYWluIGlzIG5vdCBnb29kIGVub3VnaC5cbiAgICAgICAgICB0aGlzLmV4dHJhc1snY29kZV9jaGFsbGVuZ2VfbWV0aG9kJ10gPSAnUzI1Nic7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIHRoZSBBdXRob3JpemF0aW9uUmVxdWVzdCB0byBhIEphdmFTY3JpcHQgT2JqZWN0LlxuICAgKi9cbiAgdG9Kc29uKCk6IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RKc29uPiB7XG4gICAgLy8gQWx3YXlzIG1ha2Ugc3VyZSB0aGF0IHRoZSBjb2RlIHZlcmlmaWVyIGlzIHNldHVwIHdoZW4gdG9Kc29uKCkgaXMgY2FsbGVkLlxuICAgIHJldHVybiB0aGlzLnNldHVwQ29kZVZlcmlmaWVyKCkudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXNwb25zZV90eXBlOiB0aGlzLnJlc3BvbnNlVHlwZSxcbiAgICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxuICAgICAgICByZWRpcmVjdF91cmk6IHRoaXMucmVkaXJlY3RVcmksXG4gICAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxuICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgICAgZXh0cmFzOiB0aGlzLmV4dHJhcyxcbiAgICAgICAgaW50ZXJuYWw6IHRoaXMuaW50ZXJuYWxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==