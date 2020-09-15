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
exports.AuthorizationRequest = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7QUFFSCwrQ0FBcUQ7QUFDckQsbUNBQTZCO0FBZ0I3Qjs7R0FFRztBQUNILElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFFLFdBQVc7QUFDN0IsSUFBTSxRQUFRLEdBQUcsVUFBUyxNQUFjO0lBQ3RDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUM7QUFFRjs7OztHQUlHO0FBQ0g7SUFlRTs7OztPQUlHO0lBQ0gsOEJBQ0ksT0FBaUMsRUFDekIsTUFBb0MsRUFDcEMsT0FBdUI7UUFEdkIsdUJBQUEsRUFBQSxhQUFxQiw0QkFBYSxFQUFFO1FBQ3BDLHdCQUFBLEVBQUEsY0FBdUI7UUFEdkIsV0FBTSxHQUFOLE1BQU0sQ0FBOEI7UUFDcEMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxJQUFJLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDO1FBQ3JGLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzdCLHdDQUF3QztRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVELGdEQUFpQixHQUFqQjtRQUFBLGlCQXNCQztRQXJCQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMxQjthQUFNO1lBQ0wsSUFBTSxjQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsSUFBTSxTQUFTLEdBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBWSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztnQkFDbkQsWUFBRyxDQUFDLG1EQUFtRCxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRSxPQUFPLFNBQVMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUNQLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQzFCLElBQUksTUFBTSxFQUFFO29CQUNWLCtCQUErQjtvQkFDL0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztvQkFDcEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsR0FBRyxjQUFZLENBQUM7b0JBQzlDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7b0JBQ2hDLEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxNQUFNLENBQUM7b0JBQ3ZDLGdEQUFnRDtvQkFDaEQsS0FBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLE1BQU0sQ0FBQztpQkFDL0M7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gscUNBQU0sR0FBTjtRQUFBLGlCQWFDO1FBWkMsNEVBQTRFO1FBQzVFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ25DLE9BQU87Z0JBQ0wsYUFBYSxFQUFFLEtBQUksQ0FBQyxZQUFZO2dCQUNoQyxTQUFTLEVBQUUsS0FBSSxDQUFDLFFBQVE7Z0JBQ3hCLFlBQVksRUFBRSxLQUFJLENBQUMsV0FBVztnQkFDOUIsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLO2dCQUNqQixLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxLQUFJLENBQUMsTUFBTTtnQkFDbkIsUUFBUSxFQUFFLEtBQUksQ0FBQyxRQUFRO2FBQ3hCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF6RU0sd0NBQW1CLEdBQUcsT0FBTyxDQUFDO0lBQzlCLHVDQUFrQixHQUFHLE1BQU0sQ0FBQztJQXlFckMsMkJBQUM7Q0FBQSxBQTNFRCxJQTJFQztBQTNFWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7Q3J5cHRvLCBEZWZhdWx0Q3J5cHRvfSBmcm9tICcuL2NyeXB0b191dGlscyc7XHJcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZ2dlcic7XHJcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIEF1dGhvcml6YXRpb25SZXF1ZXN0IGFzIEpTT04uXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbiB7XHJcbiAgcmVzcG9uc2VfdHlwZTogc3RyaW5nO1xyXG4gIGNsaWVudF9pZDogc3RyaW5nO1xyXG4gIHJlZGlyZWN0X3VyaTogc3RyaW5nO1xyXG4gIHNjb3BlOiBzdHJpbmc7XHJcbiAgc3RhdGU/OiBzdHJpbmc7XHJcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xyXG4gIGludGVybmFsPzogU3RyaW5nTWFwO1xyXG59XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGEgY3J5cHRvZ3JhcGhpY2FsbHkgcmFuZG9tIG5ldyBzdGF0ZS4gVXNlZnVsIGZvciBDU1JGIHByb3RlY3Rpb24uXHJcbiAqL1xyXG5jb25zdCBTSVpFID0gMTA7ICAvLyAxMCBieXRlc1xyXG5jb25zdCBuZXdTdGF0ZSA9IGZ1bmN0aW9uKGNyeXB0bzogQ3J5cHRvKTogc3RyaW5nIHtcclxuICByZXR1cm4gY3J5cHRvLmdlbmVyYXRlUmFuZG9tKFNJWkUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIEF1dGhvcml6YXRpb25SZXF1ZXN0LlxyXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0XHJcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNC4xLjFcclxuICovXHJcbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uUmVxdWVzdCB7XHJcbiAgc3RhdGljIFJFU1BPTlNFX1RZUEVfVE9LRU4gPSAndG9rZW4nO1xyXG4gIHN0YXRpYyBSRVNQT05TRV9UWVBFX0NPREUgPSAnY29kZSc7XHJcblxyXG4gIC8vIE5PVEU6XHJcbiAgLy8gQm90aCByZWRpcmVjdF91cmkgYW5kIHN0YXRlIGFyZSBhY3R1YWxseSBvcHRpb25hbC5cclxuICAvLyBIb3dldmVyIEFwcEF1dGggaXMgbW9yZSBvcGlvbmlvbmF0ZWQsIGFuZCByZXF1aXJlcyB5b3UgdG8gdXNlIGJvdGguXHJcblxyXG4gIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgcmVkaXJlY3RVcmk6IHN0cmluZztcclxuICBzY29wZTogc3RyaW5nO1xyXG4gIHJlc3BvbnNlVHlwZTogc3RyaW5nO1xyXG4gIHN0YXRlOiBzdHJpbmc7XHJcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xyXG4gIGludGVybmFsPzogU3RyaW5nTWFwO1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYSBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QuXHJcbiAgICogVXNlIGEgYHVuZGVmaW5lZGAgdmFsdWUgZm9yIHRoZSBgc3RhdGVgIHBhcmFtZXRlciwgdG8gZ2VuZXJhdGUgYSByYW5kb21cclxuICAgKiBzdGF0ZSBmb3IgQ1NSRiBwcm90ZWN0aW9uLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdEpzb24sXHJcbiAgICAgIHByaXZhdGUgY3J5cHRvOiBDcnlwdG8gPSBuZXcgRGVmYXVsdENyeXB0bygpLFxyXG4gICAgICBwcml2YXRlIHVzZVBrY2U6IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICB0aGlzLmNsaWVudElkID0gcmVxdWVzdC5jbGllbnRfaWQ7XHJcbiAgICB0aGlzLnJlZGlyZWN0VXJpID0gcmVxdWVzdC5yZWRpcmVjdF91cmk7XHJcbiAgICB0aGlzLnNjb3BlID0gcmVxdWVzdC5zY29wZTtcclxuICAgIHRoaXMucmVzcG9uc2VUeXBlID0gcmVxdWVzdC5yZXNwb25zZV90eXBlIHx8IEF1dGhvcml6YXRpb25SZXF1ZXN0LlJFU1BPTlNFX1RZUEVfQ09ERTtcclxuICAgIHRoaXMuc3RhdGUgPSByZXF1ZXN0LnN0YXRlIHx8IG5ld1N0YXRlKGNyeXB0byk7XHJcbiAgICB0aGlzLmV4dHJhcyA9IHJlcXVlc3QuZXh0cmFzO1xyXG4gICAgLy8gcmVhZCBpbnRlcm5hbCBwcm9wZXJ0aWVzIGlmIGF2YWlsYWJsZVxyXG4gICAgdGhpcy5pbnRlcm5hbCA9IHJlcXVlc3QuaW50ZXJuYWw7XHJcbiAgfVxyXG5cclxuICBzZXR1cENvZGVWZXJpZmllcigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIGlmICghdGhpcy51c2VQa2NlKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IGNvZGVWZXJpZmllciA9IHRoaXMuY3J5cHRvLmdlbmVyYXRlUmFuZG9tKDEyOCk7XHJcbiAgICAgIGNvbnN0IGNoYWxsZW5nZTogUHJvbWlzZTxzdHJpbmd8dW5kZWZpbmVkPiA9XHJcbiAgICAgICAgICB0aGlzLmNyeXB0by5kZXJpdmVDaGFsbGVuZ2UoY29kZVZlcmlmaWVyKS5jYXRjaChlcnJvciA9PiB7XHJcbiAgICAgICAgICAgIGxvZygnVW5hYmxlIHRvIGdlbmVyYXRlIFBLQ0UgY2hhbGxlbmdlLiBOb3QgdXNpbmcgUEtDRScsIGVycm9yKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gY2hhbGxlbmdlLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSBjb2RlIHVzZWQuXHJcbiAgICAgICAgICB0aGlzLmludGVybmFsID0gdGhpcy5pbnRlcm5hbCB8fCB7fTtcclxuICAgICAgICAgIHRoaXMuaW50ZXJuYWxbJ2NvZGVfdmVyaWZpZXInXSA9IGNvZGVWZXJpZmllcjtcclxuICAgICAgICAgIHRoaXMuZXh0cmFzID0gdGhpcy5leHRyYXMgfHwge307XHJcbiAgICAgICAgICB0aGlzLmV4dHJhc1snY29kZV9jaGFsbGVuZ2UnXSA9IHJlc3VsdDtcclxuICAgICAgICAgIC8vIFdlIGFsd2F5cyB1c2UgUzI1Ni4gUGxhaW4gaXMgbm90IGdvb2QgZW5vdWdoLlxyXG4gICAgICAgICAgdGhpcy5leHRyYXNbJ2NvZGVfY2hhbGxlbmdlX21ldGhvZCddID0gJ1MyNTYnO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXJpYWxpemVzIHRoZSBBdXRob3JpemF0aW9uUmVxdWVzdCB0byBhIEphdmFTY3JpcHQgT2JqZWN0LlxyXG4gICAqL1xyXG4gIHRvSnNvbigpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbj4ge1xyXG4gICAgLy8gQWx3YXlzIG1ha2Ugc3VyZSB0aGF0IHRoZSBjb2RlIHZlcmlmaWVyIGlzIHNldHVwIHdoZW4gdG9Kc29uKCkgaXMgY2FsbGVkLlxyXG4gICAgcmV0dXJuIHRoaXMuc2V0dXBDb2RlVmVyaWZpZXIoKS50aGVuKCgpID0+IHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICByZXNwb25zZV90eXBlOiB0aGlzLnJlc3BvbnNlVHlwZSxcclxuICAgICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXHJcbiAgICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0VXJpLFxyXG4gICAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxyXG4gICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxyXG4gICAgICAgIGV4dHJhczogdGhpcy5leHRyYXMsXHJcbiAgICAgICAgaW50ZXJuYWw6IHRoaXMuaW50ZXJuYWxcclxuICAgICAgfTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=