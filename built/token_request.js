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
exports.TokenRequest = exports.GRANT_TYPE_REFRESH_TOKEN = exports.GRANT_TYPE_AUTHORIZATION_CODE = void 0;
exports.GRANT_TYPE_AUTHORIZATION_CODE = 'authorization_code';
exports.GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';
/**
 * Represents an Access Token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.3
 */
var TokenRequest = /** @class */ (function () {
    function TokenRequest(request) {
        this.clientId = request.client_id;
        this.redirectUri = request.redirect_uri;
        this.grantType = request.grant_type;
        this.code = request.code;
        this.refreshToken = request.refresh_token;
        this.extras = request.extras;
    }
    /**
     * Serializes a TokenRequest to a JavaScript object.
     */
    TokenRequest.prototype.toJson = function () {
        return {
            grant_type: this.grantType,
            code: this.code,
            refresh_token: this.refreshToken,
            redirect_uri: this.redirectUri,
            client_id: this.clientId,
            extras: this.extras
        };
    };
    TokenRequest.prototype.toStringMap = function () {
        var map = {
            grant_type: this.grantType,
            client_id: this.clientId,
            redirect_uri: this.redirectUri
        };
        if (this.code) {
            map['code'] = this.code;
        }
        if (this.refreshToken) {
            map['refresh_token'] = this.refreshToken;
        }
        // copy over extras
        if (this.extras) {
            for (var extra in this.extras) {
                if (this.extras.hasOwnProperty(extra) && !map.hasOwnProperty(extra)) {
                    // check before inserting to requestMap
                    map[extra] = this.extras[extra];
                }
            }
        }
        return map;
    };
    return TokenRequest;
}());
exports.TokenRequest = TokenRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90b2tlbl9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7OztBQUlVLFFBQUEsNkJBQTZCLEdBQUcsb0JBQW9CLENBQUM7QUFDckQsUUFBQSx3QkFBd0IsR0FBRyxlQUFlLENBQUM7QUFjeEQ7Ozs7R0FJRztBQUNIO0lBUUUsc0JBQVksT0FBeUI7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsNkJBQU0sR0FBTjtRQUNFLE9BQU87WUFDTCxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDMUIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQ2hDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVztZQUM5QixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUNFLElBQUksR0FBRyxHQUFjO1lBQ25CLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMxQixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQy9CLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzFCLENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUN0QixHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUMzQyxDQUFDO1FBRUQsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2hCLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUM5QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUNwRSx1Q0FBdUM7b0JBQ3ZDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNsQyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUF6REQsSUF5REM7QUF6RFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgR1JBTlRfVFlQRV9BVVRIT1JJWkFUSU9OX0NPREUgPSAnYXV0aG9yaXphdGlvbl9jb2RlJztcbmV4cG9ydCBjb25zdCBHUkFOVF9UWVBFX1JFRlJFU0hfVE9LRU4gPSAncmVmcmVzaF90b2tlbic7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW4gUmVxdWVzdCBhcyBKU09OLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuUmVxdWVzdEpzb24ge1xuICBncmFudF90eXBlOiBzdHJpbmc7XG4gIGNvZGU/OiBzdHJpbmc7XG4gIHJlZnJlc2hfdG9rZW4/OiBzdHJpbmcsIHJlZGlyZWN0X3VyaTogc3RyaW5nO1xuICBjbGllbnRfaWQ6IHN0cmluZztcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xufVxuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBBY2Nlc3MgVG9rZW4gcmVxdWVzdC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTQuMS4zXG4gKi9cbmV4cG9ydCBjbGFzcyBUb2tlblJlcXVlc3Qge1xuICBjbGllbnRJZDogc3RyaW5nO1xuICByZWRpcmVjdFVyaTogc3RyaW5nO1xuICBncmFudFR5cGU6IHN0cmluZztcbiAgY29kZTogc3RyaW5nfHVuZGVmaW5lZDtcbiAgcmVmcmVzaFRva2VuOiBzdHJpbmd8dW5kZWZpbmVkO1xuICBleHRyYXM6IFN0cmluZ01hcHx1bmRlZmluZWRcblxuICBjb25zdHJ1Y3RvcihyZXF1ZXN0OiBUb2tlblJlcXVlc3RKc29uKSB7XG4gICAgdGhpcy5jbGllbnRJZCA9IHJlcXVlc3QuY2xpZW50X2lkO1xuICAgIHRoaXMucmVkaXJlY3RVcmkgPSByZXF1ZXN0LnJlZGlyZWN0X3VyaTtcbiAgICB0aGlzLmdyYW50VHlwZSA9IHJlcXVlc3QuZ3JhbnRfdHlwZTtcbiAgICB0aGlzLmNvZGUgPSByZXF1ZXN0LmNvZGU7XG4gICAgdGhpcy5yZWZyZXNoVG9rZW4gPSByZXF1ZXN0LnJlZnJlc2hfdG9rZW47XG4gICAgdGhpcy5leHRyYXMgPSByZXF1ZXN0LmV4dHJhcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIGEgVG9rZW5SZXF1ZXN0IHRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAqL1xuICB0b0pzb24oKTogVG9rZW5SZXF1ZXN0SnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyYW50X3R5cGU6IHRoaXMuZ3JhbnRUeXBlLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5yZWZyZXNoVG9rZW4sXG4gICAgICByZWRpcmVjdF91cmk6IHRoaXMucmVkaXJlY3RVcmksXG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICBleHRyYXM6IHRoaXMuZXh0cmFzXG4gICAgfTtcbiAgfVxuXG4gIHRvU3RyaW5nTWFwKCk6IFN0cmluZ01hcCB7XG4gICAgbGV0IG1hcDogU3RyaW5nTWFwID0ge1xuICAgICAgZ3JhbnRfdHlwZTogdGhpcy5ncmFudFR5cGUsXG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICByZWRpcmVjdF91cmk6IHRoaXMucmVkaXJlY3RVcmlcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29kZSkge1xuICAgICAgbWFwWydjb2RlJ10gPSB0aGlzLmNvZGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVmcmVzaFRva2VuKSB7XG4gICAgICBtYXBbJ3JlZnJlc2hfdG9rZW4nXSA9IHRoaXMucmVmcmVzaFRva2VuO1xuICAgIH1cblxuICAgIC8vIGNvcHkgb3ZlciBleHRyYXNcbiAgICBpZiAodGhpcy5leHRyYXMpIHtcbiAgICAgIGZvciAobGV0IGV4dHJhIGluIHRoaXMuZXh0cmFzKSB7XG4gICAgICAgIGlmICh0aGlzLmV4dHJhcy5oYXNPd25Qcm9wZXJ0eShleHRyYSkgJiYgIW1hcC5oYXNPd25Qcm9wZXJ0eShleHRyYSkpIHtcbiAgICAgICAgICAvLyBjaGVjayBiZWZvcmUgaW5zZXJ0aW5nIHRvIHJlcXVlc3RNYXBcbiAgICAgICAgICBtYXBbZXh0cmFdID0gdGhpcy5leHRyYXNbZXh0cmFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXA7XG4gIH1cbn1cbiJdfQ==