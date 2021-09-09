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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationRequest = exports.BUILT_IN_PARAMETERS = void 0;
var authorization_management_request_1 = require("./authorization_management_request");
var crypto_utils_1 = require("./crypto_utils");
var logger_1 = require("./logger");
// TODO(rahulrav@): add more built in parameters.
/* built in parameters. */
exports.BUILT_IN_PARAMETERS = ['redirect_uri', 'client_id', 'response_type', 'state', 'scope'];
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
var AuthorizationRequest = /** @class */ (function (_super) {
    __extends(AuthorizationRequest, _super);
    /**
     * Constructs a new AuthorizationRequest.
     * Use a `undefined` value for the `state` parameter, to generate a random
     * state for CSRF protection.
     */
    function AuthorizationRequest(request, crypto, usePkce) {
        if (crypto === void 0) { crypto = new crypto_utils_1.DefaultCrypto(); }
        if (usePkce === void 0) { usePkce = true; }
        var _this = _super.call(this) || this;
        _this.crypto = crypto;
        _this.usePkce = usePkce;
        _this.clientId = request.client_id;
        _this.redirectUri = request.redirect_uri;
        _this.scope = request.scope;
        _this.responseType = request.response_type || AuthorizationRequest.RESPONSE_TYPE_CODE;
        _this.state = request.state || newState(crypto);
        _this.extras = request.extras;
        // read internal properties if available
        _this.internal = request.internal;
        return _this;
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
    AuthorizationRequest.prototype.toRequestMap = function () {
        // build the query string
        // coerce to any type for convenience
        var requestMap = {
            redirect_uri: this.redirectUri,
            client_id: this.clientId,
            response_type: this.responseType,
            state: this.state,
            scope: this.scope,
        };
        // copy over extras
        if (this.extras) {
            for (var extra in this.extras) {
                if (this.extras.hasOwnProperty(extra)) {
                    // check before inserting to requestMap
                    if (exports.BUILT_IN_PARAMETERS.indexOf(extra) < 0) {
                        requestMap[extra] = this.extras[extra];
                    }
                }
            }
        }
        return requestMap;
    };
    AuthorizationRequest.RESPONSE_TYPE_TOKEN = 'token';
    AuthorizationRequest.RESPONSE_TYPE_CODE = 'code';
    return AuthorizationRequest;
}(authorization_management_request_1.AuthorizationManagementRequest));
exports.AuthorizationRequest = AuthorizationRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCx1RkFBa0Y7QUFDbEYsK0NBQXFEO0FBQ3JELG1DQUE2QjtBQUs3QixpREFBaUQ7QUFDakQsMEJBQTBCO0FBQ2IsUUFBQSxtQkFBbUIsR0FBRyxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQWVwRzs7R0FFRztBQUNILElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFFLFdBQVc7QUFDN0IsSUFBTSxRQUFRLEdBQUcsVUFBUyxNQUFjO0lBQ3RDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUM7QUFFRjs7OztHQUlHO0FBQ0g7SUFBMEMsd0NBQThCO0lBZXRFOzs7O09BSUc7SUFDSCw4QkFDSSxPQUFpQyxFQUN6QixNQUFvQyxFQUNwQyxPQUF1QjtRQUR2Qix1QkFBQSxFQUFBLGFBQXFCLDRCQUFhLEVBQUU7UUFDcEMsd0JBQUEsRUFBQSxjQUF1QjtRQUhuQyxZQUlFLGlCQUFPLFNBU1I7UUFYVyxZQUFNLEdBQU4sTUFBTSxDQUE4QjtRQUNwQyxhQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUVqQyxLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbEMsS0FBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3hDLEtBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMzQixLQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxhQUFhLElBQUksb0JBQW9CLENBQUMsa0JBQWtCLENBQUM7UUFDckYsS0FBSSxD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QUMsS0FBSyxDQUFDLENBQUM7cUJBQ3hDO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELE9BQU8sVUFBVSxDQUFBO0lBQ25CLENBQUM7SUFsR00sd0NBQW1CLEdBQUcsT0FBTyxDQUFDO0lBQzlCLHVDQUFrQixHQUFHLE1BQU0sQ0FBQztJQWtHckMsMkJBQUM7Q0FBQSxBQXBHRCxDQUEwQyxpRUFBOEIsR0FvR3ZFO0FBcEdZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0F1dGhvcml6YXRpb25NYW5hZ2VtZW50UmVxdWVzdH0gZnJvbSAnLi9hdXRob3JpemF0aW9uX21hbmFnZW1lbnRfcmVxdWVzdCc7XG5pbXBvcnQge0NyeXB0bywgRGVmYXVsdENyeXB0b30gZnJvbSAnLi9jcnlwdG9fdXRpbHMnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuXG5cbi8vIFRPRE8ocmFodWxyYXZAKTogYWRkIG1vcmUgYnVpbHQgaW4gcGFyYW1ldGVycy5cbi8qIGJ1aWx0IGluIHBhcmFtZXRlcnMuICovXG5leHBvcnQgY29uc3QgQlVJTFRfSU5fUEFSQU1FVEVSUyA9IFsncmVkaXJlY3RfdXJpJywgJ2NsaWVudF9pZCcsICdyZXNwb25zZV90eXBlJywgJ3N0YXRlJywgJ3Njb3BlJ107XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBBdXRob3JpemF0aW9uUmVxdWVzdCBhcyBKU09OLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbiB7XG4gIHJlc3BvbnNlX3R5cGU6IHN0cmluZztcbiAgY2xpZW50X2lkOiBzdHJpbmc7XG4gIHJlZGlyZWN0X3VyaTogc3RyaW5nO1xuICBzY29wZTogc3RyaW5nO1xuICBzdGF0ZT86IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xuICBpbnRlcm5hbD86IFN0cmluZ01hcDtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBjcnlwdG9ncmFwaGljYWxseSByYW5kb20gbmV3IHN0YXRlLiBVc2VmdWwgZm9yIENTUkYgcHJvdGVjdGlvbi5cbiAqL1xuY29uc3QgU0laRSA9IDEwOyAgLy8gMTAgYnl0ZXNcbmNvbnN0IG5ld1N0YXRlID0gZnVuY3Rpb24oY3J5cHRvOiBDcnlwdG8pOiBzdHJpbmcge1xuICByZXR1cm4gY3J5cHRvLmdlbmVyYXRlUmFuZG9tKFNJWkUpO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uUmVxdWVzdC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNC4xLjFcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25SZXF1ZXN0IGV4dGVuZHMgQXV0aG9yaXphdGlvbk1hbmFnZW1lbnRSZXF1ZXN0IHtcbiAgc3RhdGljIFJFU1BPTlNFX1RZUEVfVE9LRU4gPSAndG9rZW4nO1xuICBzdGF0aWMgUkVTUE9OU0VfVFlQRV9DT0RFID0gJ2NvZGUnO1xuXG4gIC8vIE5PVEU6XG4gIC8vIEJvdGggcmVkaXJlY3RfdXJpIGFuZCBzdGF0ZSBhcmUgYWN0dWFsbHkgb3B0aW9uYWwuXG4gIC8vIEhvd2V2ZXIgQXBwQXV0aCBpcyBtb3JlIG9waW9uaW9uYXRlZCwgYW5kIHJlcXVpcmVzIHlvdSB0byB1c2UgYm90aC5cblxuICBjbGllbnRJZDogc3RyaW5nO1xuICByZWRpcmVjdFVyaTogc3RyaW5nO1xuICBzY29wZTogc3RyaW5nO1xuICByZXNwb25zZVR5cGU6IHN0cmluZztcbiAgc3RhdGU6IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xuICBpbnRlcm5hbD86IFN0cmluZ01hcDtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QuXG4gICAqIFVzZSBhIGB1bmRlZmluZWRgIHZhbHVlIGZvciB0aGUgYHN0YXRlYCBwYXJhbWV0ZXIsIHRvIGdlbmVyYXRlIGEgcmFuZG9tXG4gICAqIHN0YXRlIGZvciBDU1JGIHByb3RlY3Rpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbixcbiAgICAgIHByaXZhdGUgY3J5cHRvOiBDcnlwdG8gPSBuZXcgRGVmYXVsdENyeXB0bygpLFxuICAgICAgcHJpdmF0ZSB1c2VQa2NlOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbGllbnRJZCA9IHJlcXVlc3QuY2xpZW50X2lkO1xuICAgIHRoaXMucmVkaXJlY3RVcmkgPSByZXF1ZXN0LnJlZGlyZWN0X3VyaTtcbiAgICB0aGlzLnNjb3BlID0gcmVxdWVzdC5zY29wZTtcbiAgICB0aGlzLnJlc3BvbnNlVHlwZSA9IHJlcXVlc3QucmVzcG9uc2VfdHlwZSB8fCBBdXRob3JpemF0aW9uUmVxdWVzdC5SRVNQT05TRV9UWVBFX0NPREU7XG4gICAgdGhpcy5zdGF0ZSA9IHJlcXVlc3Quc3RhdGUgfHwgbmV3U3RhdGUoY3J5cHRvKTtcbiAgICB0aGlzLmV4dHJhcyA9IHJlcXVlc3QuZXh0cmFzO1xuICAgIC8vIHJlYWQgaW50ZXJuYWwgcHJvcGVydGllcyBpZiBhdmFpbGFibGVcbiAgICB0aGlzLmludGVybmFsID0gcmVxdWVzdC5pbnRlcm5hbDtcbiAgfVxuXG4gIHNldHVwQ29kZVZlcmlmaWVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy51c2VQa2NlKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGNvZGVWZXJpZmllciA9IHRoaXMuY3J5cHRvLmdlbmVyYXRlUmFuZG9tKDEyOCk7XG4gICAgICBjb25zdCBjaGFsbGVuZ2U6IFByb21pc2U8c3RyaW5nfHVuZGVmaW5lZD4gPVxuICAgICAgICAgIHRoaXMuY3J5cHRvLmRlcml2ZUNoYWxsZW5nZShjb2RlVmVyaWZpZXIpLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGxvZygnVW5hYmxlIHRvIGdlbmVyYXRlIFBLQ0UgY2hhbGxlbmdlLiBOb3QgdXNpbmcgUEtDRScsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfSk7XG4gICAgICByZXR1cm4gY2hhbGxlbmdlLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgdGhlIGNvZGUgdXNlZC5cbiAgICAgICAgICB0aGlzLmludGVybmFsID0gdGhpcy5pbnRlcm5hbCB8fCB7fTtcbiAgICAgICAgICB0aGlzLmludGVybmFsWydjb2RlX3ZlcmlmaWVyJ10gPSBjb2RlVmVyaWZpZXI7XG4gICAgICAgICAgdGhpcy5leHRyYXMgPSB0aGlzLmV4dHJhcyB8fCB7fTtcbiAgICAgICAgICB0aGlzLmV4dHJhc1snY29kZV9jaGFsbGVuZ2UnXSA9IHJlc3VsdDtcbiAgICAgICAgICAvLyBXZSBhbHdheXMgdXNlIFMyNTYuIFBsYWluIGlzIG5vdCBnb29kIGVub3VnaC5cbiAgICAgICAgICB0aGlzLmV4dHJhc1snY29kZV9jaGFsbGVuZ2VfbWV0aG9kJ10gPSAnUzI1Nic7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIHRoZSBBdXRob3JpemF0aW9uUmVxdWVzdCB0byBhIEphdmFTY3JpcHQgT2JqZWN0LlxuICAgKi9cbiAgdG9Kc29uKCk6IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RKc29uPiB7XG4gICAgLy8gQWx3YXlzIG1ha2Ugc3VyZSB0aGF0IHRoZSBjb2RlIHZlcmlmaWVyIGlzIHNldHVwIHdoZW4gdG9Kc29uKCkgaXMgY2FsbGVkLlxuICAgIHJldHVybiB0aGlzLnNldHVwQ29kZVZlcmlmaWVyKCkudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXNwb25zZV90eXBlOiB0aGlzLnJlc3BvbnNlVHlwZSxcbiAgICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxuICAgICAgICByZWRpcmVjdF91cmk6IHRoaXMucmVkaXJlY3RVcmksXG4gICAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxuICAgICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgICAgZXh0cmFzOiB0aGlzLmV4dHJhcyxcbiAgICAgICAgaW50ZXJuYWw6IHRoaXMuaW50ZXJuYWxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbiAgdG9SZXF1ZXN0TWFwKCk6IFN0cmluZ01hcCB7XG4gICAgLy8gYnVpbGQgdGhlIHF1ZXJ5IHN0cmluZ1xuICAgIC8vIGNvZXJjZSB0byBhbnkgdHlwZSBmb3IgY29udmVuaWVuY2VcbiAgICBsZXQgcmVxdWVzdE1hcDogU3RyaW5nTWFwID0ge1xuICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0VXJpLFxuICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxuICAgICAgcmVzcG9uc2VfdHlwZTogdGhpcy5yZXNwb25zZVR5cGUsXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZSxcbiAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxuICAgIH07XG5cbiAgICAvLyBjb3B5IG92ZXIgZXh0cmFzXG4gICAgaWYgKHRoaXMuZXh0cmFzKSB7XG4gICAgICBmb3IgKGxldCBleHRyYSBpbiB0aGlzLmV4dHJhcykge1xuICAgICAgICBpZiAodGhpcy5leHRyYXMuaGFzT3duUHJvcGVydHkoZXh0cmEpKSB7XG4gICAgICAgICAgLy8gY2hlY2sgYmVmb3JlIGluc2VydGluZyB0byByZXF1ZXN0TWFwXG4gICAgICAgICAgaWYgKEJVSUxUX0lOX1BBUkFNRVRFUlMuaW5kZXhPZihleHRyYSkgPCAwKSB7XG4gICAgICAgICAgICByZXF1ZXN0TWFwW2V4dHJhXSA9IHRoaXMuZXh0cmFzW2V4dHJhXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcXVlc3RNYXBcbiAgfVxufVxuIl19