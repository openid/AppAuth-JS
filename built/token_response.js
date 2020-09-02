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
        this.scope = response.scope;
        this.idToken = response.id_token;
        this.issuedAt = response.issued_at || exports.nowInSeconds();
    }
    TokenResponse.prototype.toJson = function () {
        var _a;
        return {
            access_token: this.accessToken,
            id_token: this.idToken,
            refresh_token: this.refreshToken,
            scope: this.scope,
            token_type: this.tokenType,
            issued_at: this.issuedAt,
            expires_in: (_a = this.expiresIn) === null || _a === void 0 ? void 0 : _a.toString()
        };
    };
    TokenResponse.prototype.isValid = function (buffer) {
        if (buffer === void 0) { buffer = AUTH_EXPIRY_BUFFER; }
        if (this.expiresIn) {
            var now = exports.nowInSeconds();
            return now < this.issuedAt + this.expiresIn + buffer;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdG9rZW5fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBdUNILFlBQVk7QUFDWixJQUFNLGtCQUFrQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBRSxxQkFBcUI7QUFFL0Q7O0dBRUc7QUFDVSxRQUFBLFlBQVksR0FBRyxjQUFNLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUF2QyxDQUF1QyxDQUFDO0FBRTFFOzs7O0dBSUc7QUFDSDtJQVNFLHVCQUFZLFFBQTJCO1FBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUN6QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDO1FBQ2pELElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsU0FBUyxJQUFJLG9CQUFZLEVBQUUsQ0FBQztJQUN2RCxDQUFDO0lBRUQsOEJBQU0sR0FBTjs7UUFDRSxPQUFPO1lBQ0wsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzlCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTztZQUN0QixhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDaEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMxQixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsVUFBVSxRQUFFLElBQUksQ0FBQyxTQUFTLDBDQUFFLFFBQVEsRUFBRTtTQUN2QyxDQUFDO0lBQ0osQ0FBQztJQUVELCtCQUFPLEdBQVAsVUFBUSxNQUFtQztRQUFuQyx1QkFBQSxFQUFBLDJCQUFtQztRQUN6QyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxHQUFHLEdBQUcsb0JBQVksRUFBRSxDQUFDO1lBQ3pCLE9BQU8sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7U0FDdEQ7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDO0FBekNZLHNDQUFhO0FBMkMxQjs7OztHQUlHO0FBQ0g7SUFLRSxvQkFBWSxVQUEwQjtRQUNwQyxJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7SUFDdkMsQ0FBQztJQUVELDJCQUFNLEdBQU47UUFDRSxPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN0RixDQUFBO0lBQ0gsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQWhCWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIGFjY2VzcyB0b2tlbiB0eXBlcy5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIHNlZTpcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNy4xXG4gKi9cbmV4cG9ydCB0eXBlIFRva2VuVHlwZSA9ICdiZWFyZXInfCdtYWMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuUmVzcG9uc2UgYXMgYSBKU09OIE9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUb2tlblJlc3BvbnNlSnNvbiB7XG4gIGFjY2Vzc190b2tlbjogc3RyaW5nO1xuICB0b2tlbl90eXBlPzogVG9rZW5UeXBlOyAvKiB0cmVhdGluZyB0b2tlbiB0eXBlIGFzIG9wdGlvbmFsLCBhcyBpdHMgZ29pbmcgdG8gYmUgaW5mZXJyZWQuICovXG4gIGV4cGlyZXNfaW4/OiBzdHJpbmc7ICAgIC8qIGxpZmV0aW1lIGluIHNlY29uZHMuICovXG4gIHJlZnJlc2hfdG9rZW4/OiBzdHJpbmc7XG4gIHNjb3BlPzogc3RyaW5nO1xuICBpZF90b2tlbj86IHN0cmluZzsgIC8qIGh0dHBzOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1jb3JlLTFfMC5odG1sI1Rva2VuUmVzcG9uc2UgKi9cbiAgaXNzdWVkX2F0PzogbnVtYmVyOyAvKiB3aGVuIHdhcyBpdCBpc3N1ZWQgPyAqL1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIHBvc3NpYmxlIGVycm9yIGNvZGVzIGZyb20gdGhlIHRva2VuIGVuZHBvaW50LlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNS4yXG4gKi9cbmV4cG9ydCB0eXBlIEVycm9yVHlwZSA9ICdpbnZhbGlkX3JlcXVlc3QnfCdpbnZhbGlkX2NsaWVudCd8J2ludmFsaWRfZ3JhbnQnfCd1bmF1dGhvcml6ZWRfY2xpZW50J3xcbiAgICAndW5zdXBwb3J0ZWRfZ3JhbnRfdHlwZSd8J2ludmFsaWRfc2NvcGUnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuRXJyb3IgYXMgYSBKU09OIE9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUb2tlbkVycm9ySnNvbiB7XG4gIGVycm9yOiBFcnJvclR5cGU7XG4gIGVycm9yX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBlcnJvcl91cmk/OiBzdHJpbmc7XG59XG5cbi8vIGNvbnN0YW50c1xuY29uc3QgQVVUSF9FWFBJUllfQlVGRkVSID0gMTAgKiA2MCAqIC0xOyAgLy8gMTAgbWlucyBpbiBzZWNvbmRzXG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW5zdGFudCBvZiB0aW1lIGluIHNlY29uZHMuXG4gKi9cbmV4cG9ydCBjb25zdCBub3dJblNlY29uZHMgPSAoKSA9PiBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW4gUmVzcG9uc2UgdHlwZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTUuMVxuICovXG5leHBvcnQgY2xhc3MgVG9rZW5SZXNwb25zZSB7XG4gIGFjY2Vzc1Rva2VuOiBzdHJpbmc7XG4gIHRva2VuVHlwZTogVG9rZW5UeXBlO1xuICBleHBpcmVzSW46IG51bWJlcnx1bmRlZmluZWQ7XG4gIHJlZnJlc2hUb2tlbjogc3RyaW5nfHVuZGVmaW5lZDtcbiAgc2NvcGU6IHN0cmluZ3x1bmRlZmluZWQ7XG4gIGlkVG9rZW46IHN0cmluZ3x1bmRlZmluZWQ7XG4gIGlzc3VlZEF0OiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocmVzcG9uc2U6IFRva2VuUmVzcG9uc2VKc29uKSB7XG4gICAgdGhpcy5hY2Nlc3NUb2tlbiA9IHJlc3BvbnNlLmFjY2Vzc190b2tlbjtcbiAgICB0aGlzLnRva2VuVHlwZSA9IHJlc3BvbnNlLnRva2VuX3R5cGUgfHwgJ2JlYXJlcic7XG4gICAgaWYgKHJlc3BvbnNlLmV4cGlyZXNfaW4pIHtcbiAgICAgIHRoaXMuZXhwaXJlc0luID0gcGFyc2VJbnQocmVzcG9uc2UuZXhwaXJlc19pbiwgMTApO1xuICAgIH1cbiAgICB0aGlzLnJlZnJlc2hUb2tlbiA9IHJlc3BvbnNlLnJlZnJlc2hfdG9rZW47XG4gICAgdGhpcy5zY29wZSA9IHJlc3BvbnNlLnNjb3BlO1xuICAgIHRoaXMuaWRUb2tlbiA9IHJlc3BvbnNlLmlkX3Rva2VuO1xuICAgIHRoaXMuaXNzdWVkQXQgPSByZXNwb25zZS5pc3N1ZWRfYXQgfHwgbm93SW5TZWNvbmRzKCk7XG4gIH1cblxuICB0b0pzb24oKTogVG9rZW5SZXNwb25zZUpzb24ge1xuICAgIHJldHVybiB7XG4gICAgICBhY2Nlc3NfdG9rZW46IHRoaXMuYWNjZXNzVG9rZW4sXG4gICAgICBpZF90b2tlbjogdGhpcy5pZFRva2VuLFxuICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5yZWZyZXNoVG9rZW4sXG4gICAgICBzY29wZTogdGhpcy5zY29wZSxcbiAgICAgIHRva2VuX3R5cGU6IHRoaXMudG9rZW5UeXBlLFxuICAgICAgaXNzdWVkX2F0OiB0aGlzLmlzc3VlZEF0LFxuICAgICAgZXhwaXJlc19pbjogdGhpcy5leHBpcmVzSW4/LnRvU3RyaW5nKClcbiAgICB9O1xuICB9XG5cbiAgaXNWYWxpZChidWZmZXI6IG51bWJlciA9IEFVVEhfRVhQSVJZX0JVRkZFUik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmV4cGlyZXNJbikge1xuICAgICAgbGV0IG5vdyA9IG5vd0luU2Vjb25kcygpO1xuICAgICAgcmV0dXJuIG5vdyA8IHRoaXMuaXNzdWVkQXQgKyB0aGlzLmV4cGlyZXNJbiArIGJ1ZmZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW4gRXJyb3IgdHlwZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTUuMlxuICovXG5leHBvcnQgY2xhc3MgVG9rZW5FcnJvciB7XG4gIGVycm9yOiBFcnJvclR5cGU7XG4gIGVycm9yRGVzY3JpcHRpb246IHN0cmluZ3x1bmRlZmluZWQ7XG4gIGVycm9yVXJpOiBzdHJpbmd8dW5kZWZpbmVkO1xuXG4gIGNvbnN0cnVjdG9yKHRva2VuRXJyb3I6IFRva2VuRXJyb3JKc29uKSB7XG4gICAgdGhpcy5lcnJvciA9IHRva2VuRXJyb3IuZXJyb3I7XG4gICAgdGhpcy5lcnJvckRlc2NyaXB0aW9uID0gdG9rZW5FcnJvci5lcnJvcl9kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmVycm9yVXJpID0gdG9rZW5FcnJvci5lcnJvcl91cmk7XG4gIH1cblxuICB0b0pzb24oKTogVG9rZW5FcnJvckpzb24ge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogdGhpcy5lcnJvciwgZXJyb3JfZGVzY3JpcHRpb246IHRoaXMuZXJyb3JEZXNjcmlwdGlvbiwgZXJyb3JfdXJpOiB0aGlzLmVycm9yVXJpXG4gICAgfVxuICB9XG59XG4iXX0=