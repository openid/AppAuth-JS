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
import { DefaultCrypto } from './crypto_utils';
import { log } from './logger';
/**
 * Generates a cryptographically random new state. Useful for CSRF protection.
 */
const SIZE = 10; // 10 bytes
const newState = function (crypto) {
    return crypto.generateRandom(SIZE);
};
/**
 * Represents the AuthorizationRequest.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.1
 */
export class AuthorizationRequest {
    /**
     * Constructs a new AuthorizationRequest.
     * Use a `undefined` value for the `state` parameter, to generate a random
     * state for CSRF protection.
     */
    constructor(request, crypto = new DefaultCrypto(), usePkce = true) {
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
    setupCodeVerifier() {
        if (!this.usePkce) {
            return Promise.resolve();
        }
        else {
            const codeVerifier = this.crypto.generateRandom(128);
            const challenge = this.crypto.deriveChallenge(codeVerifier).catch(error => {
                log('Unable to generate PKCE challenge. Not using PKCE', error);
                return undefined;
            });
            return challenge.then(result => {
                if (result) {
                    // keep track of the code used.
                    this.internal = this.internal || {};
                    this.internal['code_verifier'] = codeVerifier;
                    this.extras = this.extras || {};
                    this.extras['code_challenge'] = result;
                    // We always use S256. Plain is not good enough.
                    this.extras['code_challenge_method'] = 'S256';
                }
            });
        }
    }
    /**
     * Serializes the AuthorizationRequest to a JavaScript Object.
     */
    toJson() {
        // Always make sure that the code verifier is setup when toJson() is called.
        return this.setupCodeVerifier().then(() => {
            return {
                response_type: this.responseType,
                client_id: this.clientId,
                redirect_uri: this.redirectUri,
                scope: this.scope,
                state: this.state,
                extras: this.extras,
                internal: this.internal
            };
        });
    }
}
AuthorizationRequest.RESPONSE_TYPE_TOKEN = 'token';
AuthorizationRequest.RESPONSE_TYPE_CODE = 'code';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2F1dGhvcml6YXRpb25fcmVxdWVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxPQUFPLEVBQVMsYUFBYSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDckQsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQWdCN0I7O0dBRUc7QUFDSCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBRSxXQUFXO0FBQzdCLE1BQU0sUUFBUSxHQUFHLFVBQVMsTUFBYztJQUN0QyxPQUFPLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDO0FBRUY7Ozs7R0FJRztBQUNILE1BQU0sT0FBTyxvQkFBb0I7SUFlL0I7Ozs7T0FJRztJQUNILFlBQ0ksT0FBaUMsRUFDekIsTUFBTSxHQUFXLElBQUksYUFBYSxFQUFFLEVBQ3BDLE9BQU8sR0FBWSxJQUFJO3NCQUR2QixNQUFNO3VCQUNOLE9BQU87UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxJQUFJLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDO1FBQ3JGLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQzdCLHdDQUF3QztRQUN4QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7SUFDbkMsQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEIsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDM0IsQ0FBQzthQUFNLENBQUM7WUFDTixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyRCxNQUFNLFNBQVMsR0FDWCxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3RELEdBQUcsQ0FBQyxtREFBbUQsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDaEUsT0FBTyxTQUFTLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7WUFDUCxPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzdCLElBQUksTUFBTSxFQUFFLENBQUM7b0JBQ1gsK0JBQStCO29CQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO29CQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxHQUFHLFlBQVksQ0FBQztvQkFDOUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQztvQkFDdkMsZ0RBQWdEO29CQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsTUFBTSxDQUFDO2dCQUNoRCxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0gsTUFBTTtRQUNKLDRFQUE0RTtRQUM1RSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDeEMsT0FBTztnQkFDTCxhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBQ2hDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtnQkFDeEIsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO2dCQUM5QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztnQkFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2dCQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDeEIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBMUVRLHdDQUFtQixHQUFHLE9BQU8sQ0FBQztBQUM5Qix1Q0FBa0IsR0FBRyxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtDcnlwdG8sIERlZmF1bHRDcnlwdG99IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBBdXRob3JpemF0aW9uUmVxdWVzdCBhcyBKU09OLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbiB7XG4gIHJlc3BvbnNlX3R5cGU6IHN0cmluZztcbiAgY2xpZW50X2lkOiBzdHJpbmc7XG4gIHJlZGlyZWN0X3VyaTogc3RyaW5nO1xuICBzY29wZTogc3RyaW5nO1xuICBzdGF0ZT86IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xuICBpbnRlcm5hbD86IFN0cmluZ01hcDtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBjcnlwdG9ncmFwaGljYWxseSByYW5kb20gbmV3IHN0YXRlLiBVc2VmdWwgZm9yIENTUkYgcHJvdGVjdGlvbi5cbiAqL1xuY29uc3QgU0laRSA9IDEwOyAgLy8gMTAgYnl0ZXNcbmNvbnN0IG5ld1N0YXRlID0gZnVuY3Rpb24oY3J5cHRvOiBDcnlwdG8pOiBzdHJpbmcge1xuICByZXR1cm4gY3J5cHRvLmdlbmVyYXRlUmFuZG9tKFNJWkUpO1xufTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uUmVxdWVzdC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNC4xLjFcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25SZXF1ZXN0IHtcbiAgc3RhdGljIFJFU1BPTlNFX1RZUEVfVE9LRU4gPSAndG9rZW4nO1xuICBzdGF0aWMgUkVTUE9OU0VfVFlQRV9DT0RFID0gJ2NvZGUnO1xuXG4gIC8vIE5PVEU6XG4gIC8vIEJvdGggcmVkaXJlY3RfdXJpIGFuZCBzdGF0ZSBhcmUgYWN0dWFsbHkgb3B0aW9uYWwuXG4gIC8vIEhvd2V2ZXIgQXBwQXV0aCBpcyBtb3JlIG9waW9uaW9uYXRlZCwgYW5kIHJlcXVpcmVzIHlvdSB0byB1c2UgYm90aC5cblxuICBjbGllbnRJZDogc3RyaW5nO1xuICByZWRpcmVjdFVyaTogc3RyaW5nO1xuICBzY29wZTogc3RyaW5nO1xuICByZXNwb25zZVR5cGU6IHN0cmluZztcbiAgc3RhdGU6IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xuICBpbnRlcm5hbD86IFN0cmluZ01hcDtcbiAgLyoqXG4gICAqIENvbnN0cnVjdHMgYSBuZXcgQXV0aG9yaXphdGlvblJlcXVlc3QuXG4gICAqIFVzZSBhIGB1bmRlZmluZWRgIHZhbHVlIGZvciB0aGUgYHN0YXRlYCBwYXJhbWV0ZXIsIHRvIGdlbmVyYXRlIGEgcmFuZG9tXG4gICAqIHN0YXRlIGZvciBDU1JGIHByb3RlY3Rpb24uXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbixcbiAgICAgIHByaXZhdGUgY3J5cHRvOiBDcnlwdG8gPSBuZXcgRGVmYXVsdENyeXB0bygpLFxuICAgICAgcHJpdmF0ZSB1c2VQa2NlOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIHRoaXMuY2xpZW50SWQgPSByZXF1ZXN0LmNsaWVudF9pZDtcbiAgICB0aGlzLnJlZGlyZWN0VXJpID0gcmVxdWVzdC5yZWRpcmVjdF91cmk7XG4gICAgdGhpcy5zY29wZSA9IHJlcXVlc3Quc2NvcGU7XG4gICAgdGhpcy5yZXNwb25zZVR5cGUgPSByZXF1ZXN0LnJlc3BvbnNlX3R5cGUgfHwgQXV0aG9yaXphdGlvblJlcXVlc3QuUkVTUE9OU0VfVFlQRV9DT0RFO1xuICAgIHRoaXMuc3RhdGUgPSByZXF1ZXN0LnN0YXRlIHx8IG5ld1N0YXRlKGNyeXB0byk7XG4gICAgdGhpcy5leHRyYXMgPSByZXF1ZXN0LmV4dHJhcztcbiAgICAvLyByZWFkIGludGVybmFsIHByb3BlcnRpZXMgaWYgYXZhaWxhYmxlXG4gICAgdGhpcy5pbnRlcm5hbCA9IHJlcXVlc3QuaW50ZXJuYWw7XG4gIH1cblxuICBzZXR1cENvZGVWZXJpZmllcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMudXNlUGtjZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb2RlVmVyaWZpZXIgPSB0aGlzLmNyeXB0by5nZW5lcmF0ZVJhbmRvbSgxMjgpO1xuICAgICAgY29uc3QgY2hhbGxlbmdlOiBQcm9taXNlPHN0cmluZ3x1bmRlZmluZWQ+ID1cbiAgICAgICAgICB0aGlzLmNyeXB0by5kZXJpdmVDaGFsbGVuZ2UoY29kZVZlcmlmaWVyKS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBsb2coJ1VuYWJsZSB0byBnZW5lcmF0ZSBQS0NFIGNoYWxsZW5nZS4gTm90IHVzaW5nIFBLQ0UnLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNoYWxsZW5nZS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIHRoZSBjb2RlIHVzZWQuXG4gICAgICAgICAgdGhpcy5pbnRlcm5hbCA9IHRoaXMuaW50ZXJuYWwgfHwge307XG4gICAgICAgICAgdGhpcy5pbnRlcm5hbFsnY29kZV92ZXJpZmllciddID0gY29kZVZlcmlmaWVyO1xuICAgICAgICAgIHRoaXMuZXh0cmFzID0gdGhpcy5leHRyYXMgfHwge307XG4gICAgICAgICAgdGhpcy5leHRyYXNbJ2NvZGVfY2hhbGxlbmdlJ10gPSByZXN1bHQ7XG4gICAgICAgICAgLy8gV2UgYWx3YXlzIHVzZSBTMjU2LiBQbGFpbiBpcyBub3QgZ29vZCBlbm91Z2guXG4gICAgICAgICAgdGhpcy5leHRyYXNbJ2NvZGVfY2hhbGxlbmdlX21ldGhvZCddID0gJ1MyNTYnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplcyB0aGUgQXV0aG9yaXphdGlvblJlcXVlc3QgdG8gYSBKYXZhU2NyaXB0IE9iamVjdC5cbiAgICovXG4gIHRvSnNvbigpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbj4ge1xuICAgIC8vIEFsd2F5cyBtYWtlIHN1cmUgdGhhdCB0aGUgY29kZSB2ZXJpZmllciBpcyBzZXR1cCB3aGVuIHRvSnNvbigpIGlzIGNhbGxlZC5cbiAgICByZXR1cm4gdGhpcy5zZXR1cENvZGVWZXJpZmllcigpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcmVzcG9uc2VfdHlwZTogdGhpcy5yZXNwb25zZVR5cGUsXG4gICAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRJZCxcbiAgICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0VXJpLFxuICAgICAgICBzY29wZTogdGhpcy5zY29wZSxcbiAgICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgICAgIGV4dHJhczogdGhpcy5leHRyYXMsXG4gICAgICAgIGludGVybmFsOiB0aGlzLmludGVybmFsXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG59XG4iXX0=