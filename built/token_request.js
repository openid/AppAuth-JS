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
exports.GRANT_TYPE_AUTHORIZATION_CODE = 'authorization_code';
exports.GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';
/**
 * Represents an Access Token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.3
 */
var TokenRequest = /** @class */ (function () {
    function TokenRequest(clientId, redirectUri, 
    // TODO(rahulrav@): Add the ability to infer grant types.
    grantType, code, refreshToken, extras) {
        this.clientId = clientId;
        this.redirectUri = redirectUri;
        this.grantType = grantType;
        this.code = code;
        this.refreshToken = refreshToken;
        this.extras = extras;
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
    TokenRequest.fromJson = function (input) {
        return new TokenRequest(input.client_id, input.redirect_uri, input.grant_type, input.code, input.refresh_token, input.extras);
    };
    return TokenRequest;
}());
exports.TokenRequest = TokenRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90b2tlbl9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBSVUsUUFBQSw2QkFBNkIsR0FBRyxvQkFBb0IsQ0FBQztBQUNyRCxRQUFBLHdCQUF3QixHQUFHLGVBQWUsQ0FBQztBQWN4RDs7OztHQUlHO0FBQ0g7SUFDRSxzQkFDVyxRQUFnQixFQUNoQixXQUFtQjtJQUMxQix5REFBeUQ7SUFDbEQsU0FBaUIsRUFDakIsSUFBYSxFQUNiLFlBQXFCLEVBQ3JCLE1BQWtCO1FBTmxCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFFbkIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixTQUFJLEdBQUosSUFBSSxDQUFTO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQVM7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtJQUFHLENBQUM7SUFFakM7O09BRUc7SUFDSCw2QkFBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDaEMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzlCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFRCxrQ0FBVyxHQUFYO1FBQ0UsSUFBSSxHQUFHLEdBQWM7WUFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQzFCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDL0IsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzFDO1FBRUQsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ25FLHVDQUF1QztvQkFDdkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO2FBQ0Y7U0FDRjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVNLHFCQUFRLEdBQWYsVUFBZ0IsS0FBdUI7UUFDckMsT0FBTyxJQUFJLFlBQVksQ0FDbkIsS0FBSyxDQUFDLFNBQVMsRUFDZixLQUFLLENBQUMsWUFBWSxFQUNsQixLQUFLLENBQUMsVUFBVSxFQUNoQixLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxhQUFhLEVBQ25CLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBN0RELElBNkRDO0FBN0RZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IEdSQU5UX1RZUEVfQVVUSE9SSVpBVElPTl9DT0RFID0gJ2F1dGhvcml6YXRpb25fY29kZSc7XG5leHBvcnQgY29uc3QgR1JBTlRfVFlQRV9SRUZSRVNIX1RPS0VOID0gJ3JlZnJlc2hfdG9rZW4nO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIFJlcXVlc3QgYXMgSlNPTi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUb2tlblJlcXVlc3RKc29uIHtcbiAgZ3JhbnRfdHlwZTogc3RyaW5nO1xuICBjb2RlPzogc3RyaW5nO1xuICByZWZyZXNoX3Rva2VuPzogc3RyaW5nLCByZWRpcmVjdF91cmk6IHN0cmluZztcbiAgY2xpZW50X2lkOiBzdHJpbmc7XG4gIGV4dHJhcz86IFN0cmluZ01hcDtcbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gQWNjZXNzIFRva2VuIHJlcXVlc3QuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuM1xuICovXG5leHBvcnQgY2xhc3MgVG9rZW5SZXF1ZXN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgY2xpZW50SWQ6IHN0cmluZyxcbiAgICAgIHB1YmxpYyByZWRpcmVjdFVyaTogc3RyaW5nLFxuICAgICAgLy8gVE9ETyhyYWh1bHJhdkApOiBBZGQgdGhlIGFiaWxpdHkgdG8gaW5mZXIgZ3JhbnQgdHlwZXMuXG4gICAgICBwdWJsaWMgZ3JhbnRUeXBlOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgY29kZT86IHN0cmluZyxcbiAgICAgIHB1YmxpYyByZWZyZXNoVG9rZW4/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgZXh0cmFzPzogU3RyaW5nTWFwKSB7fVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIGEgVG9rZW5SZXF1ZXN0IHRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAqL1xuICB0b0pzb24oKTogVG9rZW5SZXF1ZXN0SnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdyYW50X3R5cGU6IHRoaXMuZ3JhbnRUeXBlLFxuICAgICAgY29kZTogdGhpcy5jb2RlLFxuICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5yZWZyZXNoVG9rZW4sXG4gICAgICByZWRpcmVjdF91cmk6IHRoaXMucmVkaXJlY3RVcmksXG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICBleHRyYXM6IHRoaXMuZXh0cmFzXG4gICAgfTtcbiAgfVxuXG4gIHRvU3RyaW5nTWFwKCk6IFN0cmluZ01hcCB7XG4gICAgbGV0IG1hcDogU3RyaW5nTWFwID0ge1xuICAgICAgZ3JhbnRfdHlwZTogdGhpcy5ncmFudFR5cGUsXG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICByZWRpcmVjdF91cmk6IHRoaXMucmVkaXJlY3RVcmlcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29kZSkge1xuICAgICAgbWFwWydjb2RlJ10gPSB0aGlzLmNvZGU7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucmVmcmVzaFRva2VuKSB7XG4gICAgICBtYXBbJ3JlZnJlc2hfdG9rZW4nXSA9IHRoaXMucmVmcmVzaFRva2VuO1xuICAgIH1cblxuICAgIC8vIGNvcHkgb3ZlciBleHRyYXNcbiAgICBpZiAodGhpcy5leHRyYXMpIHtcbiAgICAgIGZvciAobGV0IGV4dHJhIGluIHRoaXMuZXh0cmFzKSB7XG4gICAgICAgIGlmICh0aGlzLmV4dHJhcy5oYXNPd25Qcm9wZXJ0eShleHRyYSkgJiYgIW1hcC5oYXNPd25Qcm9wZXJ0eShleHRyYSkpIHtcbiAgICAgICAgICAvLyBjaGVjayBiZWZvcmUgaW5zZXJ0aW5nIHRvIHJlcXVlc3RNYXBcbiAgICAgICAgICBtYXBbZXh0cmFdID0gdGhpcy5leHRyYXNbZXh0cmFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1hcDtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihpbnB1dDogVG9rZW5SZXF1ZXN0SnNvbik6IFRva2VuUmVxdWVzdCB7XG4gICAgcmV0dXJuIG5ldyBUb2tlblJlcXVlc3QoXG4gICAgICAgIGlucHV0LmNsaWVudF9pZCxcbiAgICAgICAgaW5wdXQucmVkaXJlY3RfdXJpLFxuICAgICAgICBpbnB1dC5ncmFudF90eXBlLFxuICAgICAgICBpbnB1dC5jb2RlLFxuICAgICAgICBpbnB1dC5yZWZyZXNoX3Rva2VuLFxuICAgICAgICBpbnB1dC5leHRyYXMpO1xuICB9XG59XG4iXX0=