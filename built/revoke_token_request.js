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
    RevokeTokenRequest.fromJson = function (input) {
        return new RevokeTokenRequest(input.token, input.token_type_hint, input.client_id, input.client_secret);
    };
    return RevokeTokenRequest;
}());
exports.RevokeTokenRequest = RevokeTokenRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2b2tlX3Rva2VuX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmV2b2tlX3Rva2VuX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFpQkg7Ozs7R0FJRztBQUNIO0lBQ0UsNEJBQ1csS0FBYSxFQUNiLGFBQTZCLEVBQzdCLFFBQWlCLEVBQ2pCLFlBQXFCO1FBSHJCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFDN0IsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBUztJQUFHLENBQUM7SUFFcEM7O09BRUc7SUFDSCxtQ0FBTSxHQUFOO1FBQ0UsSUFBSSxJQUFJLEdBQTJCLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQztRQUV2RCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQy9DLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNwQyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDNUMsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU0sMkJBQVEsR0FBZixVQUFnQixLQUE2QjtRQUMzQyxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FDekIsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFoQ0QsSUFnQ0M7QUFoQ1ksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogU3VwcG9ydGVkIHRva2VuIHR5cGVzXG4gKi9cbmV4cG9ydCB0eXBlIFRva2VuVHlwZUhpbnQgPSAncmVmcmVzaF90b2tlbid8J2FjY2Vzc190b2tlbic7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW4gUmVxdWVzdCBhcyBKU09OLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJldm9rZVRva2VuUmVxdWVzdEpzb24ge1xuICB0b2tlbjogc3RyaW5nO1xuICB0b2tlbl90eXBlX2hpbnQ/OiBUb2tlblR5cGVIaW50O1xuICBjbGllbnRfaWQ/OiBzdHJpbmc7XG4gIGNsaWVudF9zZWNyZXQ/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHJldm9rZSB0b2tlbiByZXF1ZXN0LlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MDA5I3NlY3Rpb24tMi4xXG4gKi9cbmV4cG9ydCBjbGFzcyBSZXZva2VUb2tlblJlcXVlc3Qge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyB0b2tlbjogc3RyaW5nLFxuICAgICAgcHVibGljIHRva2VuVHlwZUhpbnQ/OiBUb2tlblR5cGVIaW50LFxuICAgICAgcHVibGljIGNsaWVudElkPzogc3RyaW5nLFxuICAgICAgcHVibGljIGNsaWVudFNlY3JldD86IHN0cmluZykge31cblxuICAvKipcbiAgICogU2VyaWFsaXplcyBhIFRva2VuUmVxdWVzdCB0byBhIEphdmFTY3JpcHQgb2JqZWN0LlxuICAgKi9cbiAgdG9Kc29uKCk6IFJldm9rZVRva2VuUmVxdWVzdEpzb24ge1xuICAgIGxldCBqc29uOiBSZXZva2VUb2tlblJlcXVlc3RKc29uID0ge3Rva2VuOiB0aGlzLnRva2VufTtcblxuICAgIGlmICh0aGlzLnRva2VuVHlwZUhpbnQpIHtcbiAgICAgIGpzb25bJ3Rva2VuX3R5cGVfaGludCddID0gdGhpcy50b2tlblR5cGVIaW50O1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNsaWVudElkKSB7XG4gICAgICBqc29uWydjbGllbnRfaWQnXSA9IHRoaXMuY2xpZW50SWQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2xpZW50U2VjcmV0KSB7XG4gICAgICBqc29uWydjbGllbnRfc2VjcmV0J10gPSB0aGlzLmNsaWVudFNlY3JldDtcbiAgICB9XG5cbiAgICByZXR1cm4ganNvbjtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihpbnB1dDogUmV2b2tlVG9rZW5SZXF1ZXN0SnNvbik6IFJldm9rZVRva2VuUmVxdWVzdCB7XG4gICAgcmV0dXJuIG5ldyBSZXZva2VUb2tlblJlcXVlc3QoXG4gICAgICAgIGlucHV0LnRva2VuLCBpbnB1dC50b2tlbl90eXBlX2hpbnQsIGlucHV0LmNsaWVudF9pZCwgaW5wdXQuY2xpZW50X3NlY3JldCk7XG4gIH1cbn1cbiJdfQ==