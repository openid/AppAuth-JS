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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90b2tlbl9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7OztBQUlVLFFBQUEsNkJBQTZCLEdBQUcsb0JBQW9CLENBQUM7QUFDckQsUUFBQSx3QkFBd0IsR0FBRyxlQUFlLENBQUM7QUFjeEQ7Ozs7R0FJRztBQUNIO0lBUUUsc0JBQVksT0FBeUI7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxXQUFXLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUMxQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsNkJBQU0sR0FBTjtRQUNFLE9BQU87WUFDTCxVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDMUIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2YsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQ2hDLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVztZQUM5QixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUNFLElBQUksR0FBRyxHQUFjO1lBQ25CLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMxQixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1NBQy9CLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUN6QjtRQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixHQUFHLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQztRQUVELG1CQUFtQjtRQUNuQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixLQUFLLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQzdCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUNuRSx1Q0FBdUM7b0JBQ3ZDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNqQzthQUNGO1NBQ0Y7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUF6REQsSUF5REM7QUF6RFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbmV4cG9ydCBjb25zdCBHUkFOVF9UWVBFX0FVVEhPUklaQVRJT05fQ09ERSA9ICdhdXRob3JpemF0aW9uX2NvZGUnO1xyXG5leHBvcnQgY29uc3QgR1JBTlRfVFlQRV9SRUZSRVNIX1RPS0VOID0gJ3JlZnJlc2hfdG9rZW4nO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIFJlcXVlc3QgYXMgSlNPTi5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5SZXF1ZXN0SnNvbiB7XHJcbiAgZ3JhbnRfdHlwZTogc3RyaW5nO1xyXG4gIGNvZGU/OiBzdHJpbmc7XHJcbiAgcmVmcmVzaF90b2tlbj86IHN0cmluZywgcmVkaXJlY3RfdXJpOiBzdHJpbmc7XHJcbiAgY2xpZW50X2lkOiBzdHJpbmc7XHJcbiAgZXh0cmFzPzogU3RyaW5nTWFwO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYW4gQWNjZXNzIFRva2VuIHJlcXVlc3QuXHJcbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XHJcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNC4xLjNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUb2tlblJlcXVlc3Qge1xyXG4gIGNsaWVudElkOiBzdHJpbmc7XHJcbiAgcmVkaXJlY3RVcmk6IHN0cmluZztcclxuICBncmFudFR5cGU6IHN0cmluZztcclxuICBjb2RlOiBzdHJpbmd8dW5kZWZpbmVkO1xyXG4gIHJlZnJlc2hUb2tlbjogc3RyaW5nfHVuZGVmaW5lZDtcclxuICBleHRyYXM6IFN0cmluZ01hcHx1bmRlZmluZWRcclxuXHJcbiAgY29uc3RydWN0b3IocmVxdWVzdDogVG9rZW5SZXF1ZXN0SnNvbikge1xyXG4gICAgdGhpcy5jbGllbnRJZCA9IHJlcXVlc3QuY2xpZW50X2lkO1xyXG4gICAgdGhpcy5yZWRpcmVjdFVyaSA9IHJlcXVlc3QucmVkaXJlY3RfdXJpO1xyXG4gICAgdGhpcy5ncmFudFR5cGUgPSByZXF1ZXN0LmdyYW50X3R5cGU7XHJcbiAgICB0aGlzLmNvZGUgPSByZXF1ZXN0LmNvZGU7XHJcbiAgICB0aGlzLnJlZnJlc2hUb2tlbiA9IHJlcXVlc3QucmVmcmVzaF90b2tlbjtcclxuICAgIHRoaXMuZXh0cmFzID0gcmVxdWVzdC5leHRyYXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXJpYWxpemVzIGEgVG9rZW5SZXF1ZXN0IHRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXHJcbiAgICovXHJcbiAgdG9Kc29uKCk6IFRva2VuUmVxdWVzdEpzb24ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZ3JhbnRfdHlwZTogdGhpcy5ncmFudFR5cGUsXHJcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcclxuICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5yZWZyZXNoVG9rZW4sXHJcbiAgICAgIHJlZGlyZWN0X3VyaTogdGhpcy5yZWRpcmVjdFVyaSxcclxuICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxyXG4gICAgICBleHRyYXM6IHRoaXMuZXh0cmFzXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdG9TdHJpbmdNYXAoKTogU3RyaW5nTWFwIHtcclxuICAgIGxldCBtYXA6IFN0cmluZ01hcCA9IHtcclxuICAgICAgZ3JhbnRfdHlwZTogdGhpcy5ncmFudFR5cGUsXHJcbiAgICAgIGNsaWVudF9pZDogdGhpcy5jbGllbnRJZCxcclxuICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0VXJpXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLmNvZGUpIHtcclxuICAgICAgbWFwWydjb2RlJ10gPSB0aGlzLmNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucmVmcmVzaFRva2VuKSB7XHJcbiAgICAgIG1hcFsncmVmcmVzaF90b2tlbiddID0gdGhpcy5yZWZyZXNoVG9rZW47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY29weSBvdmVyIGV4dHJhc1xyXG4gICAgaWYgKHRoaXMuZXh0cmFzKSB7XHJcbiAgICAgIGZvciAobGV0IGV4dHJhIGluIHRoaXMuZXh0cmFzKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXh0cmFzLmhhc093blByb3BlcnR5KGV4dHJhKSAmJiAhbWFwLmhhc093blByb3BlcnR5KGV4dHJhKSkge1xyXG4gICAgICAgICAgLy8gY2hlY2sgYmVmb3JlIGluc2VydGluZyB0byByZXF1ZXN0TWFwXHJcbiAgICAgICAgICBtYXBbZXh0cmFdID0gdGhpcy5leHRyYXNbZXh0cmFdO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG1hcDtcclxuICB9XHJcbn1cclxuIl19