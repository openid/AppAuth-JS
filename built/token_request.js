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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90b2tlbl9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBSVUsUUFBQSw2QkFBNkIsR0FBRyxvQkFBb0IsQ0FBQztBQUNyRCxRQUFBLHdCQUF3QixHQUFHLGVBQWUsQ0FBQztBQWN4RDs7OztHQUlHO0FBQ0g7SUFDRSxzQkFDVyxRQUFnQixFQUNoQixXQUFtQjtJQUMxQix5REFBeUQ7SUFDbEQsU0FBaUIsRUFDakIsSUFBYSxFQUNiLFlBQXFCLEVBQ3JCLE1BQWtCO1FBTmxCLGFBQVEsR0FBUixRQUFRLENBQVE7UUFDaEIsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFFbkIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNqQixTQUFJLEdBQUosSUFBSSxDQUFTO1FBQ2IsaUJBQVksR0FBWixZQUFZLENBQVM7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBWTtJQUFHLENBQUM7SUFFakM7O09BRUc7SUFDSCw2QkFBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDaEMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzlCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFRCxrQ0FBVyxHQUFYO1FBQ0UsSUFBSSxHQUFHLEdBQWM7WUFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQzFCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDL0IsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUNiLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzFDO1FBRUQsbUJBQW1CO1FBQ25CLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDN0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ25FLHVDQUF1QztvQkFDdkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pDO2FBQ0Y7U0FDRjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVNLHFCQUFRLEdBQWYsVUFBZ0IsS0FBdUI7UUFDckMsT0FBTyxJQUFJLFlBQVksQ0FDbkIsS0FBSyxDQUFDLFNBQVMsRUFDZixLQUFLLENBQUMsWUFBWSxFQUNsQixLQUFLLENBQUMsVUFBVSxFQUNoQixLQUFLLENBQUMsSUFBSSxFQUNWLEtBQUssQ0FBQyxhQUFhLEVBQ25CLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwQixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDLEFBN0RELElBNkRDO0FBN0RZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcclxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXHJcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXHJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgR1JBTlRfVFlQRV9BVVRIT1JJWkFUSU9OX0NPREUgPSAnYXV0aG9yaXphdGlvbl9jb2RlJztcclxuZXhwb3J0IGNvbnN0IEdSQU5UX1RZUEVfUkVGUkVTSF9UT0tFTiA9ICdyZWZyZXNoX3Rva2VuJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbiBSZXF1ZXN0IGFzIEpTT04uXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuUmVxdWVzdEpzb24ge1xyXG4gIGdyYW50X3R5cGU6IHN0cmluZztcclxuICBjb2RlPzogc3RyaW5nO1xyXG4gIHJlZnJlc2hfdG9rZW4/OiBzdHJpbmcsIHJlZGlyZWN0X3VyaTogc3RyaW5nO1xyXG4gIGNsaWVudF9pZDogc3RyaW5nO1xyXG4gIGV4dHJhcz86IFN0cmluZ01hcDtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGFuIEFjY2VzcyBUb2tlbiByZXF1ZXN0LlxyXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxyXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTQuMS4zXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVG9rZW5SZXF1ZXN0IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHVibGljIGNsaWVudElkOiBzdHJpbmcsXHJcbiAgICAgIHB1YmxpYyByZWRpcmVjdFVyaTogc3RyaW5nLFxyXG4gICAgICAvLyBUT0RPKHJhaHVscmF2QCk6IEFkZCB0aGUgYWJpbGl0eSB0byBpbmZlciBncmFudCB0eXBlcy5cclxuICAgICAgcHVibGljIGdyYW50VHlwZTogc3RyaW5nLFxyXG4gICAgICBwdWJsaWMgY29kZT86IHN0cmluZyxcclxuICAgICAgcHVibGljIHJlZnJlc2hUb2tlbj86IHN0cmluZyxcclxuICAgICAgcHVibGljIGV4dHJhcz86IFN0cmluZ01hcCkge31cclxuXHJcbiAgLyoqXHJcbiAgICogU2VyaWFsaXplcyBhIFRva2VuUmVxdWVzdCB0byBhIEphdmFTY3JpcHQgb2JqZWN0LlxyXG4gICAqL1xyXG4gIHRvSnNvbigpOiBUb2tlblJlcXVlc3RKc29uIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGdyYW50X3R5cGU6IHRoaXMuZ3JhbnRUeXBlLFxyXG4gICAgICBjb2RlOiB0aGlzLmNvZGUsXHJcbiAgICAgIHJlZnJlc2hfdG9rZW46IHRoaXMucmVmcmVzaFRva2VuLFxyXG4gICAgICByZWRpcmVjdF91cmk6IHRoaXMucmVkaXJlY3RVcmksXHJcbiAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRJZCxcclxuICAgICAgZXh0cmFzOiB0aGlzLmV4dHJhc1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHRvU3RyaW5nTWFwKCk6IFN0cmluZ01hcCB7XHJcbiAgICBsZXQgbWFwOiBTdHJpbmdNYXAgPSB7XHJcbiAgICAgIGdyYW50X3R5cGU6IHRoaXMuZ3JhbnRUeXBlLFxyXG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXHJcbiAgICAgIHJlZGlyZWN0X3VyaTogdGhpcy5yZWRpcmVjdFVyaVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5jb2RlKSB7XHJcbiAgICAgIG1hcFsnY29kZSddID0gdGhpcy5jb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnJlZnJlc2hUb2tlbikge1xyXG4gICAgICBtYXBbJ3JlZnJlc2hfdG9rZW4nXSA9IHRoaXMucmVmcmVzaFRva2VuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGNvcHkgb3ZlciBleHRyYXNcclxuICAgIGlmICh0aGlzLmV4dHJhcykge1xyXG4gICAgICBmb3IgKGxldCBleHRyYSBpbiB0aGlzLmV4dHJhcykge1xyXG4gICAgICAgIGlmICh0aGlzLmV4dHJhcy5oYXNPd25Qcm9wZXJ0eShleHRyYSkgJiYgIW1hcC5oYXNPd25Qcm9wZXJ0eShleHRyYSkpIHtcclxuICAgICAgICAgIC8vIGNoZWNrIGJlZm9yZSBpbnNlcnRpbmcgdG8gcmVxdWVzdE1hcFxyXG4gICAgICAgICAgbWFwW2V4dHJhXSA9IHRoaXMuZXh0cmFzW2V4dHJhXTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWFwO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Kc29uKGlucHV0OiBUb2tlblJlcXVlc3RKc29uKTogVG9rZW5SZXF1ZXN0IHtcclxuICAgIHJldHVybiBuZXcgVG9rZW5SZXF1ZXN0KFxyXG4gICAgICAgIGlucHV0LmNsaWVudF9pZCxcclxuICAgICAgICBpbnB1dC5yZWRpcmVjdF91cmksXHJcbiAgICAgICAgaW5wdXQuZ3JhbnRfdHlwZSxcclxuICAgICAgICBpbnB1dC5jb2RlLFxyXG4gICAgICAgIGlucHV0LnJlZnJlc2hfdG9rZW4sXHJcbiAgICAgICAgaW5wdXQuZXh0cmFzKTtcclxuICB9XHJcbn1cclxuIl19