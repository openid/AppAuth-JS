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
export const GRANT_TYPE_AUTHORIZATION_CODE = 'authorization_code';
export const GRANT_TYPE_REFRESH_TOKEN = 'refresh_token';
/**
 * Represents an Access Token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.3
 */
export class TokenRequest {
    constructor(request) {
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
    toJson() {
        return {
            grant_type: this.grantType,
            code: this.code,
            refresh_token: this.refreshToken,
            redirect_uri: this.redirectUri,
            client_id: this.clientId,
            extras: this.extras
        };
    }
    toStringMap() {
        let map = {
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
            for (let extra in this.extras) {
                if (this.extras.hasOwnProperty(extra) && !map.hasOwnProperty(extra)) {
                    // check before inserting to requestMap
                    map[extra] = this.extras[extra];
                }
            }
        }
        return map;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90b2tlbl9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUlILE1BQU0sQ0FBQyxNQUFNLDZCQUE2QixHQUFHLG9CQUFvQixDQUFDO0FBQ2xFLE1BQU0sQ0FBQyxNQUFNLHdCQUF3QixHQUFHLGVBQWUsQ0FBQztBQWN4RDs7OztHQUlHO0FBQ0gsTUFBTSxPQUFPLFlBQVk7SUFRdkIsWUFBWSxPQUF5QjtRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNwQyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztJQUMvQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNO1FBQ0osT0FBTztZQUNMLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDaEMsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzlCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxHQUFHLEdBQWM7WUFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQzFCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVc7U0FDL0IsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDMUIsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3RCLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzNDLENBQUM7UUFFRCxtQkFBbUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEIsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzlCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ3BFLHVDQUF1QztvQkFDdkMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IEdSQU5UX1RZUEVfQVVUSE9SSVpBVElPTl9DT0RFID0gJ2F1dGhvcml6YXRpb25fY29kZSc7XG5leHBvcnQgY29uc3QgR1JBTlRfVFlQRV9SRUZSRVNIX1RPS0VOID0gJ3JlZnJlc2hfdG9rZW4nO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIFJlcXVlc3QgYXMgSlNPTi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUb2tlblJlcXVlc3RKc29uIHtcbiAgZ3JhbnRfdHlwZTogc3RyaW5nO1xuICBjb2RlPzogc3RyaW5nO1xuICByZWZyZXNoX3Rva2VuPzogc3RyaW5nLCByZWRpcmVjdF91cmk6IHN0cmluZztcbiAgY2xpZW50X2lkOiBzdHJpbmc7XG4gIGV4dHJhcz86IFN0cmluZ01hcDtcbn1cblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gQWNjZXNzIFRva2VuIHJlcXVlc3QuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuM1xuICovXG5leHBvcnQgY2xhc3MgVG9rZW5SZXF1ZXN0IHtcbiAgY2xpZW50SWQ6IHN0cmluZztcbiAgcmVkaXJlY3RVcmk6IHN0cmluZztcbiAgZ3JhbnRUeXBlOiBzdHJpbmc7XG4gIGNvZGU6IHN0cmluZ3x1bmRlZmluZWQ7XG4gIHJlZnJlc2hUb2tlbjogc3RyaW5nfHVuZGVmaW5lZDtcbiAgZXh0cmFzOiBTdHJpbmdNYXB8dW5kZWZpbmVkXG5cbiAgY29uc3RydWN0b3IocmVxdWVzdDogVG9rZW5SZXF1ZXN0SnNvbikge1xuICAgIHRoaXMuY2xpZW50SWQgPSByZXF1ZXN0LmNsaWVudF9pZDtcbiAgICB0aGlzLnJlZGlyZWN0VXJpID0gcmVxdWVzdC5yZWRpcmVjdF91cmk7XG4gICAgdGhpcy5ncmFudFR5cGUgPSByZXF1ZXN0LmdyYW50X3R5cGU7XG4gICAgdGhpcy5jb2RlID0gcmVxdWVzdC5jb2RlO1xuICAgIHRoaXMucmVmcmVzaFRva2VuID0gcmVxdWVzdC5yZWZyZXNoX3Rva2VuO1xuICAgIHRoaXMuZXh0cmFzID0gcmVxdWVzdC5leHRyYXM7XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplcyBhIFRva2VuUmVxdWVzdCB0byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgKi9cbiAgdG9Kc29uKCk6IFRva2VuUmVxdWVzdEpzb24ge1xuICAgIHJldHVybiB7XG4gICAgICBncmFudF90eXBlOiB0aGlzLmdyYW50VHlwZSxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHJlZnJlc2hfdG9rZW46IHRoaXMucmVmcmVzaFRva2VuLFxuICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0VXJpLFxuICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxuICAgICAgZXh0cmFzOiB0aGlzLmV4dHJhc1xuICAgIH07XG4gIH1cblxuICB0b1N0cmluZ01hcCgpOiBTdHJpbmdNYXAge1xuICAgIGxldCBtYXA6IFN0cmluZ01hcCA9IHtcbiAgICAgIGdyYW50X3R5cGU6IHRoaXMuZ3JhbnRUeXBlLFxuICAgICAgY2xpZW50X2lkOiB0aGlzLmNsaWVudElkLFxuICAgICAgcmVkaXJlY3RfdXJpOiB0aGlzLnJlZGlyZWN0VXJpXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmNvZGUpIHtcbiAgICAgIG1hcFsnY29kZSddID0gdGhpcy5jb2RlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnJlZnJlc2hUb2tlbikge1xuICAgICAgbWFwWydyZWZyZXNoX3Rva2VuJ10gPSB0aGlzLnJlZnJlc2hUb2tlbjtcbiAgICB9XG5cbiAgICAvLyBjb3B5IG92ZXIgZXh0cmFzXG4gICAgaWYgKHRoaXMuZXh0cmFzKSB7XG4gICAgICBmb3IgKGxldCBleHRyYSBpbiB0aGlzLmV4dHJhcykge1xuICAgICAgICBpZiAodGhpcy5leHRyYXMuaGFzT3duUHJvcGVydHkoZXh0cmEpICYmICFtYXAuaGFzT3duUHJvcGVydHkoZXh0cmEpKSB7XG4gICAgICAgICAgLy8gY2hlY2sgYmVmb3JlIGluc2VydGluZyB0byByZXF1ZXN0TWFwXG4gICAgICAgICAgbWFwW2V4dHJhXSA9IHRoaXMuZXh0cmFzW2V4dHJhXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWFwO1xuICB9XG59XG4iXX0=