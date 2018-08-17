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
 * Returns the instant of time in seconds.
 */
var nowInSeconds = function () { return Math.round(new Date().getTime() / 1000); };
/**
 * Represents the Token Response type.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.1
 */
var TokenResponse = /** @class */ (function () {
    function TokenResponse(accessToken, idToken, refreshToken, scope, tokenType, issuedAt, expiresIn) {
        if (tokenType === void 0) { tokenType = 'bearer'; }
        if (issuedAt === void 0) { issuedAt = nowInSeconds(); }
        this.accessToken = accessToken;
        this.idToken = idToken;
        this.refreshToken = refreshToken;
        this.scope = scope;
        this.tokenType = tokenType;
        this.issuedAt = issuedAt;
        this.expiresIn = expiresIn;
    }
    TokenResponse.prototype.toJson = function () {
        return {
            access_token: this.accessToken,
            id_token: this.idToken,
            refresh_token: this.refreshToken,
            scope: this.scope,
            token_type: this.tokenType,
            issued_at: this.issuedAt,
            expires_in: this.expiresIn
        };
    };
    TokenResponse.prototype.isValid = function () {
        if (this.expiresIn) {
            var now = nowInSeconds();
            return now < this.issuedAt + this.expiresIn;
        }
        else {
            return true;
        }
    };
    TokenResponse.fromJson = function (input) {
        var issuedAt = !input.issued_at ? nowInSeconds() : input.issued_at;
        return new TokenResponse(input.access_token, input.id_token, input.refresh_token, input.scope, input.token_type, issuedAt, input.expires_in);
    };
    return TokenResponse;
}());
exports.TokenResponse = TokenResponse;
/**
 * Represents the Token Error type.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.2
 */
var TokenError = /** @class */ (function () {
    function TokenError(error, errorDescription, errorUri) {
        this.error = error;
        this.errorDescription = errorDescription;
        this.errorUri = errorUri;
    }
    TokenError.prototype.toJson = function () {
        return {
            error: this.error, error_description: this.errorDescription, error_uri: this.errorUri
        };
    };
    TokenError.fromJson = function (input) {
        return new TokenError(input.error, input.error_description, input.error_uri);
    };
    return TokenError;
}());
exports.TokenError = TokenError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdG9rZW5fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUF1Q0g7O0dBRUc7QUFDSCxJQUFNLFlBQVksR0FBRyxjQUFNLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUF2QyxDQUF1QyxDQUFDO0FBRW5FOzs7O0dBSUc7QUFDSDtJQUNFLHVCQUNXLFdBQW1CLEVBQ25CLE9BQWdCLEVBQ2hCLFlBQXFCLEVBQ3JCLEtBQWMsRUFDZCxTQUErQixFQUMvQixRQUFpQyxFQUNqQyxTQUFrQjtRQUZsQiwwQkFBQSxFQUFBLG9CQUErQjtRQUMvQix5QkFBQSxFQUFBLFdBQW1CLFlBQVksRUFBRTtRQUxqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFTO1FBQ3JCLFVBQUssR0FBTCxLQUFLLENBQVM7UUFDZCxjQUFTLEdBQVQsU0FBUyxDQUFzQjtRQUMvQixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFTO0lBQUcsQ0FBQztJQUVqQyw4QkFBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVztZQUM5QixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDdEIsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDMUIsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3hCLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztTQUMzQixDQUFDO0lBQ0osQ0FBQztJQUVELCtCQUFPLEdBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxHQUFHLEdBQUcsWUFBWSxFQUFFLENBQUM7WUFDekIsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQzdDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVNLHNCQUFRLEdBQWYsVUFBZ0IsS0FBd0I7UUFDdEMsSUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNyRSxPQUFPLElBQUksYUFBYSxDQUNwQixLQUFLLENBQUMsWUFBWSxFQUNsQixLQUFLLENBQUMsUUFBUSxFQUNkLEtBQUssQ0FBQyxhQUFhLEVBQ25CLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLFVBQVUsRUFDaEIsUUFBUSxFQUNSLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBMUNELElBMENDO0FBMUNZLHNDQUFhO0FBNEMxQjs7OztHQUlHO0FBQ0g7SUFDRSxvQkFDb0IsS0FBZ0IsRUFDaEIsZ0JBQXlCLEVBQ3pCLFFBQWlCO1FBRmpCLFVBQUssR0FBTCxLQUFLLENBQVc7UUFDaEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFTO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQVM7SUFBRyxDQUFDO0lBRXpDLDJCQUFNLEdBQU47UUFDRSxPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN0RixDQUFBO0lBQ0gsQ0FBQztJQUVNLG1CQUFRLEdBQWYsVUFBZ0IsS0FBcUI7UUFDbkMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIGFjY2VzcyB0b2tlbiB0eXBlcy5cclxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlOlxyXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTcuMVxyXG4gKi9cclxuZXhwb3J0IHR5cGUgVG9rZW5UeXBlID0gJ2JlYXJlcid8J21hYyc7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgVG9rZW5SZXNwb25zZSBhcyBhIEpTT04gT2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUb2tlblJlc3BvbnNlSnNvbiB7XHJcbiAgYWNjZXNzX3Rva2VuOiBzdHJpbmc7XHJcbiAgaWRfdG9rZW4/OiBzdHJpbmc7ICAgICAgLyogaHR0cHM6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LWNvcmUtMV8wLmh0bWwjVG9rZW5SZXNwb25zZSAqL1xyXG4gIHRva2VuX3R5cGU/OiBUb2tlblR5cGU7IC8qIHRyZWF0aW5nIHRva2VuIHR5cGUgYXMgb3B0aW9uYWwsIGFzIGl0cyBnb2luZyB0byBiZSBpbmZlcnJlZC4gKi9cclxuICBpc3N1ZWRfYXQ/OiBudW1iZXI7ICAgICAvKiB3aGVuIHdhcyBpdCBpc3N1ZWQgPyAqL1xyXG4gIGV4cGlyZXNfaW4/OiBudW1iZXI7ICAgIC8qIGxpZmV0aW1lIGluIHNlY29uZHMuICovXHJcbiAgcmVmcmVzaF90b2tlbj86IHN0cmluZztcclxuICBzY29wZT86IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIHBvc3NpYmxlIGVycm9yIGNvZGVzIGZyb20gdGhlIHRva2VuIGVuZHBvaW50LlxyXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxyXG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTUuMlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgRXJyb3JUeXBlID0gJ2ludmFsaWRfcmVxdWVzdCd8J2ludmFsaWRfY2xpZW50J3wnaW52YWxpZF9ncmFudCd8J3VuYXV0aG9yaXplZF9jbGllbnQnfFxyXG4gICAgJ3Vuc3VwcG9ydGVkX2dyYW50X3R5cGUnfCdpbnZhbGlkX3Njb3BlJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbkVycm9yIGFzIGEgSlNPTiBPYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuRXJyb3JKc29uIHtcclxuICBlcnJvcjogRXJyb3JUeXBlO1xyXG4gIGVycm9yX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xyXG4gIGVycm9yX3VyaT86IHN0cmluZztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGluc3RhbnQgb2YgdGltZSBpbiBzZWNvbmRzLlxyXG4gKi9cclxuY29uc3Qgbm93SW5TZWNvbmRzID0gKCkgPT4gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIFJlc3BvbnNlIHR5cGUuXHJcbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XHJcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNS4xXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVG9rZW5SZXNwb25zZSB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHB1YmxpYyBhY2Nlc3NUb2tlbjogc3RyaW5nLFxyXG4gICAgICBwdWJsaWMgaWRUb2tlbj86IHN0cmluZyxcclxuICAgICAgcHVibGljIHJlZnJlc2hUb2tlbj86IHN0cmluZyxcclxuICAgICAgcHVibGljIHNjb3BlPzogc3RyaW5nLFxyXG4gICAgICBwdWJsaWMgdG9rZW5UeXBlOiBUb2tlblR5cGUgPSAnYmVhcmVyJyxcclxuICAgICAgcHVibGljIGlzc3VlZEF0OiBudW1iZXIgPSBub3dJblNlY29uZHMoKSxcclxuICAgICAgcHVibGljIGV4cGlyZXNJbj86IG51bWJlcikge31cclxuXHJcbiAgdG9Kc29uKCk6IFRva2VuUmVzcG9uc2VKc29uIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGFjY2Vzc190b2tlbjogdGhpcy5hY2Nlc3NUb2tlbixcclxuICAgICAgaWRfdG9rZW46IHRoaXMuaWRUb2tlbixcclxuICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5yZWZyZXNoVG9rZW4sXHJcbiAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxyXG4gICAgICB0b2tlbl90eXBlOiB0aGlzLnRva2VuVHlwZSxcclxuICAgICAgaXNzdWVkX2F0OiB0aGlzLmlzc3VlZEF0LFxyXG4gICAgICBleHBpcmVzX2luOiB0aGlzLmV4cGlyZXNJblxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5leHBpcmVzSW4pIHtcclxuICAgICAgbGV0IG5vdyA9IG5vd0luU2Vjb25kcygpO1xyXG4gICAgICByZXR1cm4gbm93IDwgdGhpcy5pc3N1ZWRBdCArIHRoaXMuZXhwaXJlc0luO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IFRva2VuUmVzcG9uc2VKc29uKTogVG9rZW5SZXNwb25zZSB7XHJcbiAgICBjb25zdCBpc3N1ZWRBdCA9ICFpbnB1dC5pc3N1ZWRfYXQgPyBub3dJblNlY29uZHMoKSA6IGlucHV0Lmlzc3VlZF9hdDtcclxuICAgIHJldHVybiBuZXcgVG9rZW5SZXNwb25zZShcclxuICAgICAgICBpbnB1dC5hY2Nlc3NfdG9rZW4sXHJcbiAgICAgICAgaW5wdXQuaWRfdG9rZW4sXHJcbiAgICAgICAgaW5wdXQucmVmcmVzaF90b2tlbixcclxuICAgICAgICBpbnB1dC5zY29wZSxcclxuICAgICAgICBpbnB1dC50b2tlbl90eXBlLFxyXG4gICAgICAgIGlzc3VlZEF0LFxyXG4gICAgICAgIGlucHV0LmV4cGlyZXNfaW4pXHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyB0aGUgVG9rZW4gRXJyb3IgdHlwZS5cclxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcclxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjJcclxuICovXHJcbmV4cG9ydCBjbGFzcyBUb2tlbkVycm9yIHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHVibGljIHJlYWRvbmx5IGVycm9yOiBFcnJvclR5cGUsXHJcbiAgICAgIHB1YmxpYyByZWFkb25seSBlcnJvckRlc2NyaXB0aW9uPzogc3RyaW5nLFxyXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZXJyb3JVcmk/OiBzdHJpbmcpIHt9XHJcblxyXG4gIHRvSnNvbigpOiBUb2tlbkVycm9ySnNvbiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBlcnJvcjogdGhpcy5lcnJvciwgZXJyb3JfZGVzY3JpcHRpb246IHRoaXMuZXJyb3JEZXNjcmlwdGlvbiwgZXJyb3JfdXJpOiB0aGlzLmVycm9yVXJpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IFRva2VuRXJyb3JKc29uKSB7XHJcbiAgICByZXR1cm4gbmV3IFRva2VuRXJyb3IoaW5wdXQuZXJyb3IsIGlucHV0LmVycm9yX2Rlc2NyaXB0aW9uLCBpbnB1dC5lcnJvcl91cmkpO1xyXG4gIH1cclxufVxyXG4iXX0=