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
/**
 * Represents a revoke token request.
 * For more information look at:
 * https://tools.ietf.org/html/rfc7009#section-2.1
 */
var RevokeTokenRequest = /** @class */ (function () {
    function RevokeTokenRequest(token, tokenTypeHint, clientId, clientSecret) {
        this.token = token;
        this.tokenTypeHint = tokenTypeHint;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }
    /**
     * Serializes a TokenRequest to a JavaScript object.
     */
    RevokeTokenRequest.prototype.toJson = function () {
        var json = { token: this.token };
        if (this.tokenTypeHint) {
            json['token_type_hint'] = this.tokenTypeHint;
        }
        if (this.clientId) {
            json['client_id'] = this.clientId;
        }
        if (this.clientSecret) {
            json['client_secret'] = this.clientSecret;
        }
        return json;
    };
    /**
     * Serializes a TokenRequest to a StringMap.
     */
    RevokeTokenRequest.prototype.toStringMap = function () {
        var stringMap = {};
        if (this.tokenTypeHint) {
            stringMap['token_type_hint'] = this.tokenTypeHint;
        }
        if (this.clientId) {
            stringMap['client_id'] = this.clientId;
        }
        if (this.clientSecret) {
            stringMap['client_secret'] = this.clientSecret;
        }
        return stringMap;
    };
    RevokeTokenRequest.fromJson = function (input) {
        return new RevokeTokenRequest(input.token, input.token_type_hint, input.client_id, input.client_secret);
    };
    return RevokeTokenRequest;
}());
exports.RevokeTokenRequest = RevokeTokenRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2b2tlX3Rva2VuX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmV2b2tlX3Rva2VuX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFvQkg7Ozs7R0FJRztBQUNIO0lBQ0UsNEJBQ1csS0FBYSxFQUNiLGFBQTZCLEVBQzdCLFFBQWlCLEVBQ2pCLFlBQXFCO1FBSHJCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFDN0IsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBUztJQUFHLENBQUM7SUFFcEM7O09BRUc7SUFDSCxtQ0FBTSxHQUFOO1FBQ0UsSUFBSSxJQUFJLEdBQTJCLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQztRQUV2RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQy9DLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNwQyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDNUMsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQ7O09BRUc7SUFDSCx3Q0FBVyxHQUFYO1FBQ0UsSUFBSSxTQUFTLEdBQWMsRUFBRSxDQUFDO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDcEQsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3pDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN0QixTQUFTLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUNqRCxDQUFDO1FBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRU0sMkJBQVEsR0FBZixVQUFnQixLQUE2QjtRQUMzQyxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FDekIsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFwREQsSUFvREM7QUFwRFksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuJztcblxuXG4vKipcbiAqIFN1cHBvcnRlZCB0b2tlbiB0eXBlc1xuICovXG5leHBvcnQgdHlwZSBUb2tlblR5cGVIaW50ID0gJ3JlZnJlc2hfdG9rZW4nfCdhY2Nlc3NfdG9rZW4nO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIFJlcXVlc3QgYXMgSlNPTi5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBSZXZva2VUb2tlblJlcXVlc3RKc29uIHtcbiAgdG9rZW46IHN0cmluZztcbiAgdG9rZW5fdHlwZV9oaW50PzogVG9rZW5UeXBlSGludDtcbiAgY2xpZW50X2lkPzogc3RyaW5nO1xuICBjbGllbnRfc2VjcmV0Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgYSByZXZva2UgdG9rZW4gcmVxdWVzdC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNzAwOSNzZWN0aW9uLTIuMVxuICovXG5leHBvcnQgY2xhc3MgUmV2b2tlVG9rZW5SZXF1ZXN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgdG9rZW46IHN0cmluZyxcbiAgICAgIHB1YmxpYyB0b2tlblR5cGVIaW50PzogVG9rZW5UeXBlSGludCxcbiAgICAgIHB1YmxpYyBjbGllbnRJZD86IHN0cmluZyxcbiAgICAgIHB1YmxpYyBjbGllbnRTZWNyZXQ/OiBzdHJpbmcpIHt9XG5cbiAgLyoqXG4gICAqIFNlcmlhbGl6ZXMgYSBUb2tlblJlcXVlc3QgdG8gYSBKYXZhU2NyaXB0IG9iamVjdC5cbiAgICovXG4gIHRvSnNvbigpOiBSZXZva2VUb2tlblJlcXVlc3RKc29uIHtcbiAgICBsZXQganNvbjogUmV2b2tlVG9rZW5SZXF1ZXN0SnNvbiA9IHt0b2tlbjogdGhpcy50b2tlbn07XG5cbiAgICBpZiAodGhpcy50b2tlblR5cGVIaW50KSB7XG4gICAgICBqc29uWyd0b2tlbl90eXBlX2hpbnQnXSA9IHRoaXMudG9rZW5UeXBlSGludDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jbGllbnRJZCkge1xuICAgICAganNvblsnY2xpZW50X2lkJ10gPSB0aGlzLmNsaWVudElkO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNsaWVudFNlY3JldCkge1xuICAgICAganNvblsnY2xpZW50X3NlY3JldCddID0gdGhpcy5jbGllbnRTZWNyZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGpzb247XG4gIH1cblxuICAvKipcbiAgICogU2VyaWFsaXplcyBhIFRva2VuUmVxdWVzdCB0byBhIFN0cmluZ01hcC5cbiAgICovXG4gIHRvU3RyaW5nTWFwKCk6IFN0cmluZ01hcCB7XG4gICAgbGV0IHN0cmluZ01hcDogU3RyaW5nTWFwID0ge307XG4gICAgaWYgKHRoaXMudG9rZW5UeXBlSGludCkge1xuICAgICAgc3RyaW5nTWFwWyd0b2tlbl90eXBlX2hpbnQnXSA9IHRoaXMudG9rZW5UeXBlSGludDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jbGllbnRJZCkge1xuICAgICAgc3RyaW5nTWFwWydjbGllbnRfaWQnXSA9IHRoaXMuY2xpZW50SWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2xpZW50U2VjcmV0KSB7XG4gICAgICBzdHJpbmdNYXBbJ2NsaWVudF9zZWNyZXQnXSA9IHRoaXMuY2xpZW50U2VjcmV0O1xuICAgIH1cblxuICAgIHJldHVybiBzdHJpbmdNYXA7XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IFJldm9rZVRva2VuUmVxdWVzdEpzb24pOiBSZXZva2VUb2tlblJlcXVlc3Qge1xuICAgIHJldHVybiBuZXcgUmV2b2tlVG9rZW5SZXF1ZXN0KFxuICAgICAgICBpbnB1dC50b2tlbiwgaW5wdXQudG9rZW5fdHlwZV9oaW50LCBpbnB1dC5jbGllbnRfaWQsIGlucHV0LmNsaWVudF9zZWNyZXQpO1xuICB9XG59XG4iXX0=