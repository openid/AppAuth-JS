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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7QUFFSCwrQ0FBcUQ7QUFDckQsbUNBQTZCO0FBd0I3Qjs7R0FFRztBQUNILElBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFFLFdBQVc7QUFDN0IsSUFBTSxRQUFRLEdBQUcsVUFBUyxNQUFjO0lBQ3RDLE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxDQUFDLENBQUM7QUFFRjs7OztHQUlHO0FBQ0g7SUFlRTs7OztPQUlHO0lBQ0gsOEJBQ0ksT0FBaUMsRUFDekIsTUFBb0MsRUFDcEMsT0FBdUI7UUFEdkIsdUJBQUEsRUFBQSxhQUFxQiw0QkFBYSxFQUFFO1FBQ3BDLHdCQUFBLEVBQUEsY0FBdUI7UUFEdkIsV0FBTSxHQUFOLE1BQU0sQ0FBOEI7UUFDcEMsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxJQUFJLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDO1FBQ3JGLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzdCLHdDQUF3QztRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVELGdEQUFpQixHQUFqQjtRQUFBLGlCQXNCQztRQXJCQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUMxQjthQUFNO1lBQ0wsSUFBTSxjQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsSUFBTSxTQUFTLEdBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsY0FBWSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztnQkFDbkQsWUFBRyxDQUFDLG1EQUFtRCxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNoRSxPQUFPLFNBQVMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUNQLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU07Z0JBQzFCLElBQUksTUFBTSxFQUFFO29CQUNWLCtCQUErQjtvQkFDL0IsS0FBSSxDQUFDLFFBQVEsR0FBRyxLQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztvQkFDcEMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsR0FBRyxjQUFZLENBQUM7b0JBQzlDLEtBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLE1BQU0sSUFBSSxFQUFFLENBQUM7b0JBQ2hDLEtBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxNQUFNLENBQUM7b0JBQ3ZDLGdEQUFnRDtvQkFDaEQsS0FBSSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLE1BQU0sQ0FBQztpQkFDL0M7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gscUNBQU0sR0FBTjtRQUFBLGlCQWFDO1FBWkMsNEVBQTRFO1FBQzVFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBSSxDQUFDO1lBQ25DLE9BQU87Z0JBQ0wsYUFBYSxFQUFFLEtBQUksQ0FBQyxZQUFZO2dCQUNoQyxTQUFTLEVBQUUsS0FBSSxDQUFDLFFBQVE7Z0JBQ3hCLFlBQVksRUFBRSxLQUFJLENBQUMsV0FBVztnQkFDOUIsS0FBSyxFQUFFLEtBQUksQ0FBQyxLQUFLO2dCQUNqQixLQUFLLEVBQUUsS0FBSSxDQUFDLEtBQUs7Z0JBQ2pCLE1BQU0sRUFBRSxLQUFJLENBQUMsTUFBTTtnQkFDbkIsUUFBUSxFQUFFLEtBQUksQ0FBQyxRQUFRO2FBQ3hCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF6RU0sd0NBQW1CLEdBQUcsT0FBTyxDQUFDO0lBQzlCLHVDQUFrQixHQUFHLE1BQU0sQ0FBQztJQXlFckMsMkJBQUM7Q0FBQSxBQTNFRCxJQTJFQztBQTNFWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtDcnlwdG8sIERlZmF1bHRDcnlwdG99IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBBdXRob3JpemF0aW9uUmVxdWVzdCBhcyBKU09OLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbiB7XG4gIHJlc3BvbnNlX3R5cGU6IHN0cmluZztcbiAgY2xpZW50X2lkOiBzdHJpbmc7XG4gIHJlZGlyZWN0X3VyaTogc3RyaW5nO1xuICBzY29wZTogc3RyaW5nO1xuICBzdGF0ZT86IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xuICBpbnRlcm5hbD86IFN0cmluZ01hcDtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFkZGl0aW9uYWwgb3B0aW9ucyBmb3IgQXV0aG9yaXphdGlvblJlcXVlc3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXphdGlvblJlcXVlc3RPcHRpb25zIHtcbiAgcmVkaXJlY3RVcmk6IHN0cmluZztcbiAgcmVkaXJlY3RQYWdlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogR2VuZXJhdGVzIGEgY3J5cHRvZ3JhcGhpY2FsbHkgcmFuZG9tIG5ldyBzdGF0ZS4gVXNlZnVsIGZvciBDU1JGIHByb3RlY3Rpb24uXG4gKi9cbmNvbnN0IFNJWkUgPSAxMDsgIC8vIDEwIGJ5dGVzXG5jb25zdCBuZXdTdGF0ZSA9IGZ1bmN0aW9uKGNyeXB0bzogQ3J5cHRvKTogc3RyaW5nIHtcbiAgcmV0dXJuIGNyeXB0by5nZW5lcmF0ZVJhbmRvbShTSVpFKTtcbn07XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgQXV0aG9yaXphdGlvblJlcXVlc3QuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTQuMS4xXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uUmVxdWVzdCB7XG4gIHN0YXRpYyBSRVNQT05TRV9UWVBFX1RPS0VOID0gJ3Rva2VuJztcbiAgc3RhdGljIFJFU1BPTlNFX1RZUEVfQ09ERSA9ICdjb2RlJztcblxuICAvLyBOT1RFOlxuICAvLyBCb3RoIHJlZGlyZWN0X3VyaSBhbmQgc3RhdGUgYXJlIGFjdHVhbGx5IG9wdGlvbmFsLlxuICAvLyBIb3dldmVyIEFwcEF1dGggaXMgbW9yZSBvcGlvbmlvbmF0ZWQsIGFuZCByZXF1aXJlcyB5b3UgdG8gdXNlIGJvdGguXG5cbiAgY2xpZW50SWQ6IHN0cmluZztcbiAgcmVkaXJlY3RVcmk6IHN0cmluZztcbiAgc2NvcGU6IHN0cmluZztcbiAgcmVzcG9uc2VUeXBlOiBzdHJpbmc7XG4gIHN0YXRlOiBzdHJpbmc7XG4gIGV4dHJhcz86IFN0cmluZ01hcDtcbiAgaW50ZXJuYWw/OiBTdHJpbmdNYXA7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RzIGEgbmV3IEF1dGhvcml6YXRpb25SZXF1ZXN0LlxuICAgKiBVc2UgYSBgdW5kZWZpbmVkYCB2YWx1ZSBmb3IgdGhlIGBzdGF0ZWAgcGFyYW1ldGVyLCB0byBnZW5lcmF0ZSBhIHJhbmRvbVxuICAgKiBzdGF0ZSBmb3IgQ1NSRiBwcm90ZWN0aW9uLlxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdEpzb24sXG4gICAgICBwcml2YXRlIGNyeXB0bzogQ3J5cHRvID0gbmV3IERlZmF1bHRDcnlwdG8oKSxcbiAgICAgIHByaXZhdGUgdXNlUGtjZTogYm9vbGVhbiA9IHRydWUpIHtcbiAgICB0aGlzLmNsaWVudElkID0gcmVxdWVzdC5jbGllbnRfaWQ7XG4gICAgdGhpcy5yZWRpcmVjdFVyaSA9IHJlcXVlc3QucmVkaXJlY3RfdXJpO1xuICAgIHRoaXMuc2NvcGUgPSByZXF1ZXN0LnNjb3BlO1xuICAgIHRoaXMucmVzcG9uc2VUeXBlID0gcmVxdWVzdC5yZXNwb25zZV90eXBlIHx8IEF1dGhvcml6YXRpb25SZXF1ZXN0LlJFU1BPTlNFX1RZUEVfQ09ERTtcbiAgICB0aGlzLnN0YXRlID0gcmVxdWVzdC5zdGF0ZSB8fCBuZXdTdGF0ZShjcnlwdG8pO1xuICAgIHRoaXMuZXh0cmFzID0gcmVxdWVzdC5leHRyYXM7XG4gICAgLy8gcmVhZCBpbnRlcm5hbCBwcm9wZXJ0aWVzIGlmIGF2YWlsYWJsZVxuICAgIHRoaXMuaW50ZXJuYWwgPSByZXF1ZXN0LmludGVybmFsO1xuICB9XG5cbiAgc2V0dXBDb2RlVmVyaWZpZXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLnVzZVBrY2UpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29kZVZlcmlmaWVyID0gdGhpcy5jcnlwdG8uZ2VuZXJhdGVSYW5kb20oMTI4KTtcbiAgICAgIGNvbnN0IGNoYWxsZW5nZTogUHJvbWlzZTxzdHJpbmd8dW5kZWZpbmVkPiA9XG4gICAgICAgICAgdGhpcy5jcnlwdG8uZGVyaXZlQ2hhbGxlbmdlKGNvZGVWZXJpZmllcikuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgbG9nKCdVbmFibGUgdG8gZ2VuZXJhdGUgUEtDRSBjaGFsbGVuZ2UuIE5vdCB1c2luZyBQS0NFJywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9KTtcbiAgICAgIHJldHVybiBjaGFsbGVuZ2UudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgY29kZSB1c2VkLlxuICAgICAgICAgIHRoaXMuaW50ZXJuYWwgPSB0aGlzLmludGVybmFsIHx8IHt9O1xuICAgICAgICAgIHRoaXMuaW50ZXJuYWxbJ2NvZGVfdmVyaWZpZXInXSA9IGNvZGVWZXJpZmllcjtcbiAgICAgICAgICB0aGlzLmV4dHJhcyA9IHRoaXMuZXh0cmFzIHx8IHt9O1xuICAgICAgICAgIHRoaXMuZXh0cmFzWydjb2RlX2NoYWxsZW5nZSddID0gcmVzdWx0O1xuICAgICAgICAgIC8vIFdlIGFsd2F5cyB1c2UgUzI1Ni4gUGxhaW4gaXMgbm90IGdvb2QgZW5vdWdoLlxuICAgICAgICAgIHRoaXMuZXh0cmFzWydjb2RlX2NoYWxsZW5nZV9tZXRob2QnXSA9ICdTMjU2JztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZXMgdGhlIEF1dGhvcml6YXRpb25SZXF1ZXN0IHRvIGEgSmF2YVNjcmlwdCBPYmplY3QuXG4gICAqL1xuICB0b0pzb24oKTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdEpzb24+IHtcbiAgICAvLyBBbHdheXMgbWFrZSBzdXJlIHRoYXQgdGhlIGNvZGUgdmVyaWZpZXIgaXMgc2V0dXAgd2hlbiB0b0pzb24oKSBpcyBjYWxsZWQuXG4gICAgcmV0dXJuIHRoaXMuc2V0dXBDb2RlVmVyaWZpZXIoKS50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlc3BvbnNlX3R5cGU6IHRoaXMucmVzcG9uc2VUeXBlLFxuICAgICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICAgIHJlZGlyZWN0X3VyaTogdGhpcy5yZWRpcmVjdFVyaSxcbiAgICAgICAgc2NvcGU6IHRoaXMuc2NvcGUsXG4gICAgICAgIHN0YXRlOiB0aGlzLnN0YXRlLFxuICAgICAgICBleHRyYXM6IHRoaXMuZXh0cmFzLFxuICAgICAgICBpbnRlcm5hbDogdGhpcy5pbnRlcm5hbFxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxufVxuIl19