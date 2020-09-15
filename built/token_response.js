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
exports.TokenError = exports.TokenResponse = exports.nowInSeconds = void 0;
// constants
var AUTH_EXPIRY_BUFFER = 10 * 60 * -1; // 10 mins in seconds
/**
 * Returns the instant of time in seconds.
 */
exports.nowInSeconds = function () { return Math.round(new Date().getTime() / 1000); };
/**
 * Represents the Token Response type.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.1
 */
var TokenResponse = /** @class */ (function () {
    function TokenResponse(response) {
        this.accessToken = response.access_token;
        this.tokenType = response.token_type || 'bearer';
        if (response.expires_in) {
            this.expiresIn = parseInt(response.expires_in, 10);
        }
        this.refreshToken = response.refresh_token;
        if (response.refresh_expires_in) {
            this.refreshExpiresIn = parseInt(response.refresh_expires_in, 10);
        }
        this.scope = response.scope;
        this.idToken = response.id_token;
        this.issuedAt = response.issued_at || exports.nowInSeconds();
    }
    TokenResponse.prototype.toJson = function () {
        var _a, _b;
        return {
            access_token: this.accessToken,
            id_token: this.idToken,
            refresh_token: this.refreshToken,
            scope: this.scope,
            token_type: this.tokenType,
            issued_at: this.issuedAt,
            expires_in: (_a = this.expiresIn) === null || _a === void 0 ? void 0 : _a.toString(),
            refresh_expires_in: (_b = this.refreshExpiresIn) === null || _b === void 0 ? void 0 : _b.toString()
        };
    };
    TokenResponse.prototype.isValid = function (buffer) {
        if (buffer === void 0) { buffer = AUTH_EXPIRY_BUFFER; }
        return this.isNotExpired(this.expiresIn, buffer);
    };
    TokenResponse.prototype.isRefreshTokenValid = function (buffer) {
        if (buffer === void 0) { buffer = AUTH_EXPIRY_BUFFER; }
        return this.isNotExpired(this.refreshExpiresIn, buffer);
    };
    TokenResponse.prototype.isNotExpired = function (expiresIn, buffer) {
        if (buffer === void 0) { buffer = AUTH_EXPIRY_BUFFER; }
        if (expiresIn) {
            var now = exports.nowInSeconds();
            return now < this.issuedAt + expiresIn + buffer;
        }
        else {
            return true;
        }
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
    function TokenError(tokenError) {
        this.error = tokenError.error;
        this.errorDescription = tokenError.error_description;
        this.errorUri = tokenError.error_uri;
    }
    TokenError.prototype.toJson = function () {
        return {
            error: this.error, error_description: this.errorDescription, error_uri: this.errorUri
        };
    };
    return TokenError;
}());
exports.TokenError = TokenError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdG9rZW5fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBd0NILFlBQVk7QUFDWixJQUFNLGtCQUFrQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBRSxxQkFBcUI7QUFFL0Q7O0dBRUc7QUFDVSxRQUFBLFlBQVksR0FBRyxjQUFNLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUF2QyxDQUF1QyxDQUFDO0FBRTFFOzs7O0dBSUc7QUFDSDtJQVVFLHVCQUFZLFFBQTJCO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDO1FBQ2pELElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQzNDLElBQUksUUFBUSxDQUFDLGtCQUFrQixFQUFFO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ25FO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxTQUFTLElBQUksb0JBQVksRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRCw4QkFBTSxHQUFOOztRQUNFLE9BQU87WUFDTCxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDOUIsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3RCLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQzFCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixVQUFVLFFBQUUsSUFBSSxDQUFDLFNBQVMsMENBQUUsUUFBUSxFQUFFO1lBQ3RDLGtCQUFrQixRQUFFLElBQUksQ0FBQyxnQkFBZ0IsMENBQUUsUUFBUSxFQUFFO1NBQ3RELENBQUM7SUFDSixDQUFDO0lBRUQsK0JBQU8sR0FBUCxVQUFRLE1BQW1DO1FBQW5DLHVCQUFBLEVBQUEsMkJBQW1DO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCwyQ0FBbUIsR0FBbkIsVUFBb0IsTUFBbUM7UUFBbkMsdUJBQUEsRUFBQSwyQkFBbUM7UUFDckQsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU8sb0NBQVksR0FBcEIsVUFBcUIsU0FBMkIsRUFBRSxNQUFtQztRQUFuQyx1QkFBQSxFQUFBLDJCQUFtQztRQUNuRixJQUFJLFNBQVMsRUFBRTtZQUNiLElBQUksR0FBRyxHQUFHLG9CQUFZLEVBQUUsQ0FBQztZQUN6QixPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsR0FBRyxNQUFNLENBQUM7U0FDakQ7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBdERELElBc0RDO0FBdERZLHNDQUFhO0FBd0QxQjs7OztHQUlHO0FBQ0g7SUFLRSxvQkFBWSxVQUEwQjtRQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVELDJCQUFNLEdBQU47UUFDRSxPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN0RixDQUFBO0lBQ0gsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQWhCWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGFjY2VzcyB0b2tlbiB0eXBlcy5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZTpcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNy4xXG4gKi9cbmV4cG9ydCB0eXBlIFRva2VuVHlwZSA9ICdiZWFyZXInfCdtYWMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuUmVzcG9uc2UgYXMgYSBKU09OIE9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUb2tlblJlc3BvbnNlSnNvbiB7XG4gIGFjY2Vzc190b2tlbjogc3RyaW5nO1xuICB0b2tlbl90eXBlPzogVG9rZW5UeXBlOyAvKiB0cmVhdGluZyB0b2tlbiB0eXBlIGFzIG9wdGlvbmFsLCBhcyBpdHMgZ29pbmcgdG8gYmUgaW5mZXJyZWQuICovXG4gIGV4cGlyZXNfaW4/OiBzdHJpbmc7ICAgIC8qIGxpZmV0aW1lIGluIHNlY29uZHMuICovXG4gIHJlZnJlc2hfdG9rZW4/OiBzdHJpbmc7XG4gIHJlZnJlc2hfZXhwaXJlc19pbj86IHN0cmluZzsgLyogbGlmZXRpbWUgaW4gc2Vjb25kcy4gKi9cbiAgc2NvcGU/OiBzdHJpbmc7XG4gIGlkX3Rva2VuPzogc3RyaW5nOyAgLyogaHR0cHM6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LWNvcmUtMV8wLmh0bWwjVG9rZW5SZXNwb25zZSAqL1xuICBpc3N1ZWRfYXQ/OiBudW1iZXI7IC8qIHdoZW4gd2FzIGl0IGlzc3VlZCA/ICovXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgcG9zc2libGUgZXJyb3IgY29kZXMgZnJvbSB0aGUgdG9rZW4gZW5kcG9pbnQuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjJcbiAqL1xuZXhwb3J0IHR5cGUgRXJyb3JUeXBlID0gJ2ludmFsaWRfcmVxdWVzdCd8J2ludmFsaWRfY2xpZW50J3wnaW52YWxpZF9ncmFudCd8J3VuYXV0aG9yaXplZF9jbGllbnQnfFxuICAgICd1bnN1cHBvcnRlZF9ncmFudF90eXBlJ3wnaW52YWxpZF9zY29wZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW5FcnJvciBhcyBhIEpTT04gT2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuRXJyb3JKc29uIHtcbiAgZXJyb3I6IEVycm9yVHlwZTtcbiAgZXJyb3JfZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGVycm9yX3VyaT86IHN0cmluZztcbn1cblxuLy8gY29uc3RhbnRzXG5jb25zdCBBVVRIX0VYUElSWV9CVUZGRVIgPSAxMCAqIDYwICogLTE7ICAvLyAxMCBtaW5zIGluIHNlY29uZHNcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnN0YW50IG9mIHRpbWUgaW4gc2Vjb25kcy5cbiAqL1xuZXhwb3J0IGNvbnN0IG5vd0luU2Vjb25kcyA9ICgpID0+IE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbiBSZXNwb25zZSB0eXBlLlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNS4xXG4gKi9cbmV4cG9ydCBjbGFzcyBUb2tlblJlc3BvbnNlIHtcbiAgYWNjZXNzVG9rZW46IHN0cmluZztcbiAgdG9rZW5UeXBlOiBUb2tlblR5cGU7XG4gIGV4cGlyZXNJbjogbnVtYmVyfHVuZGVmaW5lZDtcbiAgcmVmcmVzaFRva2VuOiBzdHJpbmd8dW5kZWZpbmVkO1xuICByZWZyZXNoRXhwaXJlc0luOiBudW1iZXJ8dW5kZWZpbmVkO1xuICBzY29wZTogc3RyaW5nfHVuZGVmaW5lZDtcbiAgaWRUb2tlbjogc3RyaW5nfHVuZGVmaW5lZDtcbiAgaXNzdWVkQXQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihyZXNwb25zZTogVG9rZW5SZXNwb25zZUpzb24pIHtcbiAgICB0aGlzLmFjY2Vzc1Rva2VuID0gcmVzcG9uc2UuYWNjZXNzX3Rva2VuO1xuICAgIHRoaXMudG9rZW5UeXBlID0gcmVzcG9uc2UudG9rZW5fdHlwZSB8fCAnYmVhcmVyJztcbiAgICBpZiAocmVzcG9uc2UuZXhwaXJlc19pbikge1xuICAgICAgdGhpcy5leHBpcmVzSW4gPSBwYXJzZUludChyZXNwb25zZS5leHBpcmVzX2luLCAxMCk7XG4gICAgfVxuICAgIHRoaXMucmVmcmVzaFRva2VuID0gcmVzcG9uc2UucmVmcmVzaF90b2tlbjtcbiAgICBpZiAocmVzcG9uc2UucmVmcmVzaF9leHBpcmVzX2luKSB7XG4gICAgICB0aGlzLnJlZnJlc2hFeHBpcmVzSW4gPSBwYXJzZUludChyZXNwb25zZS5yZWZyZXNoX2V4cGlyZXNfaW4sIDEwKTtcbiAgICB9XG4gICAgdGhpcy5zY29wZSA9IHJlc3BvbnNlLnNjb3BlO1xuICAgIHRoaXMuaWRUb2tlbiA9IHJlc3BvbnNlLmlkX3Rva2VuO1xuICAgIHRoaXMuaXNzdWVkQXQgPSByZXNwb25zZS5pc3N1ZWRfYXQgfHwgbm93SW5TZWNvbmRzKCk7XG4gIH1cblxuICB0b0pzb24oKTogVG9rZW5SZXNwb25zZUpzb24ge1xuICAgIHJldHVybiB7XG4gICAgICBhY2Nlc3NfdG9rZW46IHRoaXMuYWNjZXNzVG9rZW4sXG4gICAgICBpZF90b2tlbjogdGhpcy5pZFRva2VuLFxuICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5yZWZyZXNoVG9rZW4sXG4gICAgICBzY29wZTogdGhpcy5zY29wZSxcbiAgICAgIHRva2VuX3R5cGU6IHRoaXMudG9rZW5UeXBlLFxuICAgICAgaXNzdWVkX2F0OiB0aGlzLmlzc3VlZEF0LFxuICAgICAgZXhwaXJlc19pbjogdGhpcy5leHBpcmVzSW4/LnRvU3RyaW5nKCksXG4gICAgICByZWZyZXNoX2V4cGlyZXNfaW46IHRoaXMucmVmcmVzaEV4cGlyZXNJbj8udG9TdHJpbmcoKVxuICAgIH07XG4gIH1cblxuICBpc1ZhbGlkKGJ1ZmZlcjogbnVtYmVyID0gQVVUSF9FWFBJUllfQlVGRkVSKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNOb3RFeHBpcmVkKHRoaXMuZXhwaXJlc0luLCBidWZmZXIpO1xuICB9XG5cbiAgaXNSZWZyZXNoVG9rZW5WYWxpZChidWZmZXI6IG51bWJlciA9IEFVVEhfRVhQSVJZX0JVRkZFUik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzTm90RXhwaXJlZCh0aGlzLnJlZnJlc2hFeHBpcmVzSW4sIGJ1ZmZlcik7XG4gIH1cblxuICBwcml2YXRlIGlzTm90RXhwaXJlZChleHBpcmVzSW46IG51bWJlcnx1bmRlZmluZWQsIGJ1ZmZlcjogbnVtYmVyID0gQVVUSF9FWFBJUllfQlVGRkVSKTogYm9vbGVhbiB7XG4gICAgaWYgKGV4cGlyZXNJbikge1xuICAgICAgbGV0IG5vdyA9IG5vd0luU2Vjb25kcygpO1xuICAgICAgcmV0dXJuIG5vdyA8IHRoaXMuaXNzdWVkQXQgKyBleHBpcmVzSW4gKyBidWZmZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIEVycm9yIHR5cGUuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjJcbiAqL1xuZXhwb3J0IGNsYXNzIFRva2VuRXJyb3Ige1xuICBlcnJvcjogRXJyb3JUeXBlO1xuICBlcnJvckRlc2NyaXB0aW9uOiBzdHJpbmd8dW5kZWZpbmVkO1xuICBlcnJvclVyaTogc3RyaW5nfHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3Rvcih0b2tlbkVycm9yOiBUb2tlbkVycm9ySnNvbikge1xuICAgIHRoaXMuZXJyb3IgPSB0b2tlbkVycm9yLmVycm9yO1xuICAgIHRoaXMuZXJyb3JEZXNjcmlwdGlvbiA9IHRva2VuRXJyb3IuZXJyb3JfZGVzY3JpcHRpb247XG4gICAgdGhpcy5lcnJvclVyaSA9IHRva2VuRXJyb3IuZXJyb3JfdXJpO1xuICB9XG5cbiAgdG9Kc29uKCk6IFRva2VuRXJyb3JKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IHRoaXMuZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiB0aGlzLmVycm9yRGVzY3JpcHRpb24sIGVycm9yX3VyaTogdGhpcy5lcnJvclVyaVxuICAgIH1cbiAgfVxufVxuIl19