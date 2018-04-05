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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2b2tlX3Rva2VuX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcmV2b2tlX3Rva2VuX3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFpQkg7Ozs7R0FJRztBQUNIO0lBQ0UsNEJBQ1csS0FBYSxFQUNiLGFBQTZCLEVBQzdCLFFBQWlCLEVBQ2pCLFlBQXFCO1FBSHJCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFDN0IsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBUztJQUFHLENBQUM7SUFFcEM7O09BRUc7SUFDSCxtQ0FBTSxHQUFOO1FBQ0UsSUFBSSxJQUFJLEdBQTJCLEVBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQztRQUV2RCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUM5QztRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNuQztRQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMzQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLDJCQUFRLEdBQWYsVUFBZ0IsS0FBNkI7UUFDM0MsT0FBTyxJQUFJLGtCQUFrQixDQUN6QixLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQWhDRCxJQWdDQztBQWhDWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBTdXBwb3J0ZWQgdG9rZW4gdHlwZXNcbiAqL1xuZXhwb3J0IHR5cGUgVG9rZW5UeXBlSGludCA9ICdyZWZyZXNoX3Rva2VuJ3wnYWNjZXNzX3Rva2VuJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbiBSZXF1ZXN0IGFzIEpTT04uXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmV2b2tlVG9rZW5SZXF1ZXN0SnNvbiB7XG4gIHRva2VuOiBzdHJpbmc7XG4gIHRva2VuX3R5cGVfaGludD86IFRva2VuVHlwZUhpbnQ7XG4gIGNsaWVudF9pZD86IHN0cmluZztcbiAgY2xpZW50X3NlY3JldD86IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgcmV2b2tlIHRva2VuIHJlcXVlc3QuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzcwMDkjc2VjdGlvbi0yLjFcbiAqL1xuZXhwb3J0IGNsYXNzIFJldm9rZVRva2VuUmVxdWVzdCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHRva2VuOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgdG9rZW5UeXBlSGludD86IFRva2VuVHlwZUhpbnQsXG4gICAgICBwdWJsaWMgY2xpZW50SWQ/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgY2xpZW50U2VjcmV0Pzogc3RyaW5nKSB7fVxuXG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIGEgVG9rZW5SZXF1ZXN0IHRvIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAqL1xuICB0b0pzb24oKTogUmV2b2tlVG9rZW5SZXF1ZXN0SnNvbiB7XG4gICAgbGV0IGpzb246IFJldm9rZVRva2VuUmVxdWVzdEpzb24gPSB7dG9rZW46IHRoaXMudG9rZW59O1xuXG4gICAgaWYgKHRoaXMudG9rZW5UeXBlSGludCkge1xuICAgICAganNvblsndG9rZW5fdHlwZV9oaW50J10gPSB0aGlzLnRva2VuVHlwZUhpbnQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2xpZW50SWQpIHtcbiAgICAgIGpzb25bJ2NsaWVudF9pZCddID0gdGhpcy5jbGllbnRJZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jbGllbnRTZWNyZXQpIHtcbiAgICAgIGpzb25bJ2NsaWVudF9zZWNyZXQnXSA9IHRoaXMuY2xpZW50U2VjcmV0O1xuICAgIH1cblxuICAgIHJldHVybiBqc29uO1xuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGlucHV0OiBSZXZva2VUb2tlblJlcXVlc3RKc29uKTogUmV2b2tlVG9rZW5SZXF1ZXN0IHtcbiAgICByZXR1cm4gbmV3IFJldm9rZVRva2VuUmVxdWVzdChcbiAgICAgICAgaW5wdXQudG9rZW4sIGlucHV0LnRva2VuX3R5cGVfaGludCwgaW5wdXQuY2xpZW50X2lkLCBpbnB1dC5jbGllbnRfc2VjcmV0KTtcbiAgfVxufVxuIl19