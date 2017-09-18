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
        return {
            token: this.token,
            token_type_hint: this.tokenTypeHint,
            client_id: this.clientId,
            client_secret: this.clientSecret,
        };
    };
    RevokeTokenRequest.prototype.toStringMap = function () {
        var map = { token: this.token };
        if (this.tokenTypeHint) {
            map['token_type_hint'] = this.tokenTypeHint;
        }
        if (this.clientId) {
            map['client_id'] = this.clientId;
        }
        if (this.clientSecret) {
            map['client_secret'] = this.clientSecret;
        }
        return map;
    };
    RevokeTokenRequest.fromJson = function (input) {
        return new RevokeTokenRequest(input.token, input.token_type_hint, input.client_id, input.client_secret);
    };
    return RevokeTokenRequest;
}());
exports.RevokeTokenRequest = RevokeTokenRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2b2tlX3Rva2VuX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmV2b2tlX3Rva2VuX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFtQkg7Ozs7R0FJRztBQUNIO0lBQ0UsNEJBQ1csS0FBYSxFQUNiLGFBQTZCLEVBQzdCLFFBQWlCLEVBQ2pCLFlBQXFCO1FBSHJCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFDN0IsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBUztJQUFHLENBQUM7SUFFcEM7O09BRUc7SUFDSCxtQ0FBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGVBQWUsRUFBRSxJQUFJLENBQUMsYUFBYTtZQUNuQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZO1NBQ2pDLENBQUM7SUFDSixDQUFDO0lBRUQsd0NBQVcsR0FBWDtRQUNFLElBQUksR0FBRyxHQUFjLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQztRQUV6QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN2QixHQUFHLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlDLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixHQUFHLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNuQyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdEIsR0FBRyxDQUFDLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDM0MsQ0FBQztRQUVELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRU0sMkJBQVEsR0FBZixVQUFnQixLQUE2QjtRQUMzQyxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FDekIsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUF6Q0QsSUF5Q0M7QUF6Q1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuLyoqXG4gKiBTdXBwb3J0ZWQgdG9rZW4gdHlwZXNcbiAqL1xuZXhwb3J0IHR5cGUgVG9rZW5UeXBlSGludCA9ICdyZWZyZXNoX3Rva2VuJ3wnYWNjZXNzX3Rva2VuJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbiBSZXF1ZXN0IGFzIEpTT04uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmV2b2tlVG9rZW5SZXF1ZXN0SnNvbiB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIHRva2VuX3R5cGVfaGludD86IFRva2VuVHlwZUhpbnQ7XG4gIGNsaWVudF9pZD86IHN0cmluZztcbiAgY2xpZW50X3NlY3JldD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcmV2b2tlIHRva2VuIHJlcXVlc3QuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcwMDkjc2VjdGlvbi0yLjFcbiAqL1xuZXhwb3J0IGNsYXNzIFJldm9rZVRva2VuUmVxdWVzdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHRva2VuOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgdG9rZW5UeXBlSGludD86IFRva2VuVHlwZUhpbnQsXG4gICAgICBwdWJsaWMgY2xpZW50SWQ/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgY2xpZW50U2VjcmV0Pzogc3RyaW5nKSB7fVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIGEgVG9rZW5SZXF1ZXN0IHRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAqL1xuICB0b0pzb24oKTogUmV2b2tlVG9rZW5SZXF1ZXN0SnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRva2VuOiB0aGlzLnRva2VuLFxuICAgICAgdG9rZW5fdHlwZV9oaW50OiB0aGlzLnRva2VuVHlwZUhpbnQsXG4gICAgICBjbGllbnRfaWQ6IHRoaXMuY2xpZW50SWQsXG4gICAgICBjbGllbnRfc2VjcmV0OiB0aGlzLmNsaWVudFNlY3JldCxcbiAgICB9O1xuICB9XG5cbiAgdG9TdHJpbmdNYXAoKTogU3RyaW5nTWFwIHtcbiAgICBsZXQgbWFwOiBTdHJpbmdNYXAgPSB7dG9rZW46IHRoaXMudG9rZW59O1xuXG4gICAgaWYgKHRoaXMudG9rZW5UeXBlSGludCkge1xuICAgICAgbWFwWyd0b2tlbl90eXBlX2hpbnQnXSA9IHRoaXMudG9rZW5UeXBlSGludDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jbGllbnRJZCkge1xuICAgICAgbWFwWydjbGllbnRfaWQnXSA9IHRoaXMuY2xpZW50SWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2xpZW50U2VjcmV0KSB7XG4gICAgICBtYXBbJ2NsaWVudF9zZWNyZXQnXSA9IHRoaXMuY2xpZW50U2VjcmV0O1xuICAgIH1cblxuICAgIHJldHVybiBtYXA7XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IFJldm9rZVRva2VuUmVxdWVzdEpzb24pOiBSZXZva2VUb2tlblJlcXVlc3Qge1xuICAgIHJldHVybiBuZXcgUmV2b2tlVG9rZW5SZXF1ZXN0KFxuICAgICAgICBpbnB1dC50b2tlbiwgaW5wdXQudG9rZW5fdHlwZV9oaW50LCBpbnB1dC5jbGllbnRfaWQsIGlucHV0LmNsaWVudF9zZWNyZXQpO1xuICB9XG59XG4iXX0=