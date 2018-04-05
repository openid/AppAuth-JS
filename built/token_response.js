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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdG9rZW5fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUF1Q0g7O0dBRUc7QUFDSCxJQUFNLFlBQVksR0FBRyxjQUFNLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUF2QyxDQUF1QyxDQUFDO0FBRW5FOzs7O0dBSUc7QUFDSDtJQUNFLHVCQUNXLFdBQW1CLEVBQ25CLE9BQWdCLEVBQ2hCLFlBQXFCLEVBQ3JCLEtBQWMsRUFDZCxTQUErQixFQUMvQixRQUFpQyxFQUNqQyxTQUFrQjtRQUZsQiwwQkFBQSxFQUFBLG9CQUErQjtRQUMvQix5QkFBQSxFQUFBLFdBQW1CLFlBQVksRUFBRTtRQUxqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFTO1FBQ3JCLFVBQUssR0FBTCxLQUFLLENBQVM7UUFDZCxjQUFTLEdBQVQsU0FBUyxDQUFzQjtRQUMvQixhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFTO0lBQUcsQ0FBQztJQUVqQyw4QkFBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVztZQUM5QixRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDdEIsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixVQUFVLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDMUIsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3hCLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztTQUMzQixDQUFDO0lBQ0osQ0FBQztJQUVELCtCQUFPLEdBQVA7UUFDRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxHQUFHLEdBQUcsWUFBWSxFQUFFLENBQUM7WUFDekIsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQzdDO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVNLHNCQUFRLEdBQWYsVUFBZ0IsS0FBd0I7UUFDdEMsSUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNyRSxPQUFPLElBQUksYUFBYSxDQUNwQixLQUFLLENBQUMsWUFBWSxFQUNsQixLQUFLLENBQUMsUUFBUSxFQUNkLEtBQUssQ0FBQyxhQUFhLEVBQ25CLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLFVBQVUsRUFDaEIsUUFBUSxFQUNSLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBMUNELElBMENDO0FBMUNZLHNDQUFhO0FBNEMxQjs7OztHQUlHO0FBQ0g7SUFDRSxvQkFDb0IsS0FBZ0IsRUFDaEIsZ0JBQXlCLEVBQ3pCLFFBQWlCO1FBRmpCLFVBQUssR0FBTCxLQUFLLENBQVc7UUFDaEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFTO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQVM7SUFBRyxDQUFDO0lBRXpDLDJCQUFNLEdBQU47UUFDRSxPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN0RixDQUFBO0lBQ0gsQ0FBQztJQUVNLG1CQUFRLEdBQWYsVUFBZ0IsS0FBcUI7UUFDbkMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGFjY2VzcyB0b2tlbiB0eXBlcy5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZTpcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNy4xXG4gKi9cbmV4cG9ydCB0eXBlIFRva2VuVHlwZSA9ICdiZWFyZXInfCdtYWMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuUmVzcG9uc2UgYXMgYSBKU09OIE9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUb2tlblJlc3BvbnNlSnNvbiB7XG4gIGFjY2Vzc190b2tlbjogc3RyaW5nO1xuICBpZF90b2tlbj86IHN0cmluZzsgICAgICAvKiBodHRwczovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtY29yZS0xXzAuaHRtbCNUb2tlblJlc3BvbnNlICovXG4gIHRva2VuX3R5cGU/OiBUb2tlblR5cGU7IC8qIHRyZWF0aW5nIHRva2VuIHR5cGUgYXMgb3B0aW9uYWwsIGFzIGl0cyBnb2luZyB0byBiZSBpbmZlcnJlZC4gKi9cbiAgaXNzdWVkX2F0PzogbnVtYmVyOyAgICAgLyogd2hlbiB3YXMgaXQgaXNzdWVkID8gKi9cbiAgZXhwaXJlc19pbj86IG51bWJlcjsgICAgLyogbGlmZXRpbWUgaW4gc2Vjb25kcy4gKi9cbiAgcmVmcmVzaF90b2tlbj86IHN0cmluZztcbiAgc2NvcGU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgcG9zc2libGUgZXJyb3IgY29kZXMgZnJvbSB0aGUgdG9rZW4gZW5kcG9pbnQuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjJcbiAqL1xuZXhwb3J0IHR5cGUgRXJyb3JUeXBlID0gJ2ludmFsaWRfcmVxdWVzdCd8J2ludmFsaWRfY2xpZW50J3wnaW52YWxpZF9ncmFudCd8J3VuYXV0aG9yaXplZF9jbGllbnQnfFxuICAgICd1bnN1cHBvcnRlZF9ncmFudF90eXBlJ3wnaW52YWxpZF9zY29wZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW5FcnJvciBhcyBhIEpTT04gT2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuRXJyb3JKc29uIHtcbiAgZXJyb3I6IEVycm9yVHlwZTtcbiAgZXJyb3JfZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGVycm9yX3VyaT86IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnN0YW50IG9mIHRpbWUgaW4gc2Vjb25kcy5cbiAqL1xuY29uc3Qgbm93SW5TZWNvbmRzID0gKCkgPT4gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIFJlc3BvbnNlIHR5cGUuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjFcbiAqL1xuZXhwb3J0IGNsYXNzIFRva2VuUmVzcG9uc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBhY2Nlc3NUb2tlbjogc3RyaW5nLFxuICAgICAgcHVibGljIGlkVG9rZW4/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcmVmcmVzaFRva2VuPzogc3RyaW5nLFxuICAgICAgcHVibGljIHNjb3BlPzogc3RyaW5nLFxuICAgICAgcHVibGljIHRva2VuVHlwZTogVG9rZW5UeXBlID0gJ2JlYXJlcicsXG4gICAgICBwdWJsaWMgaXNzdWVkQXQ6IG51bWJlciA9IG5vd0luU2Vjb25kcygpLFxuICAgICAgcHVibGljIGV4cGlyZXNJbj86IG51bWJlcikge31cblxuICB0b0pzb24oKTogVG9rZW5SZXNwb25zZUpzb24ge1xuICAgIHJldHVybiB7XG4gICAgICBhY2Nlc3NfdG9rZW46IHRoaXMuYWNjZXNzVG9rZW4sXG4gICAgICBpZF90b2tlbjogdGhpcy5pZFRva2VuLFxuICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5yZWZyZXNoVG9rZW4sXG4gICAgICBzY29wZTogdGhpcy5zY29wZSxcbiAgICAgIHRva2VuX3R5cGU6IHRoaXMudG9rZW5UeXBlLFxuICAgICAgaXNzdWVkX2F0OiB0aGlzLmlzc3VlZEF0LFxuICAgICAgZXhwaXJlc19pbjogdGhpcy5leHBpcmVzSW5cbiAgICB9O1xuICB9XG5cbiAgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5leHBpcmVzSW4pIHtcbiAgICAgIGxldCBub3cgPSBub3dJblNlY29uZHMoKTtcbiAgICAgIHJldHVybiBub3cgPCB0aGlzLmlzc3VlZEF0ICsgdGhpcy5leHBpcmVzSW47XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihpbnB1dDogVG9rZW5SZXNwb25zZUpzb24pOiBUb2tlblJlc3BvbnNlIHtcbiAgICBjb25zdCBpc3N1ZWRBdCA9ICFpbnB1dC5pc3N1ZWRfYXQgPyBub3dJblNlY29uZHMoKSA6IGlucHV0Lmlzc3VlZF9hdDtcbiAgICByZXR1cm4gbmV3IFRva2VuUmVzcG9uc2UoXG4gICAgICAgIGlucHV0LmFjY2Vzc190b2tlbixcbiAgICAgICAgaW5wdXQuaWRfdG9rZW4sXG4gICAgICAgIGlucHV0LnJlZnJlc2hfdG9rZW4sXG4gICAgICAgIGlucHV0LnNjb3BlLFxuICAgICAgICBpbnB1dC50b2tlbl90eXBlLFxuICAgICAgICBpc3N1ZWRBdCxcbiAgICAgICAgaW5wdXQuZXhwaXJlc19pbilcbiAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIEVycm9yIHR5cGUuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjJcbiAqL1xuZXhwb3J0IGNsYXNzIFRva2VuRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSBlcnJvcjogRXJyb3JUeXBlLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGVycm9yRGVzY3JpcHRpb24/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZXJyb3JVcmk/OiBzdHJpbmcpIHt9XG5cbiAgdG9Kc29uKCk6IFRva2VuRXJyb3JKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IHRoaXMuZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiB0aGlzLmVycm9yRGVzY3JpcHRpb24sIGVycm9yX3VyaTogdGhpcy5lcnJvclVyaVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihpbnB1dDogVG9rZW5FcnJvckpzb24pIHtcbiAgICByZXR1cm4gbmV3IFRva2VuRXJyb3IoaW5wdXQuZXJyb3IsIGlucHV0LmVycm9yX2Rlc2NyaXB0aW9uLCBpbnB1dC5lcnJvcl91cmkpO1xuICB9XG59XG4iXX0=