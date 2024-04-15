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
var nowInSeconds = function () { return Math.round(new Date().getTime() / 1000); };
exports.nowInSeconds = nowInSeconds;
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
        this.issuedAt = response.issued_at || (0, exports.nowInSeconds)();
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
            var now = (0, exports.nowInSeconds)();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdG9rZW5fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBdUNILFlBQVk7QUFDWixJQUFNLGtCQUFrQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBRSxxQkFBcUI7QUFFL0Q7O0dBRUc7QUFDSSxJQUFNLFlBQVksR0FBRyxjQUFNLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUF2QyxDQUF1QyxDQUFDO0FBQTdELFFBQUEsWUFBWSxnQkFBaUQ7QUFFMUU7Ozs7R0FJRztBQUNIO0lBU0UsdUJBQVksUUFBMkI7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUM7UUFDakQsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsU0FBUyxJQUFJLElBQUEsb0JBQVksR0FBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRCw4QkFBTSxHQUFOOztRQUNFLE9BQU87WUFDTCxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDOUIsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3RCLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQzFCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixVQUFVLEVBQUUsTUFBQSxJQUFJLENBQUMsU0FBUywwQ0FBRSxRQUFRLEVBQUU7U0FDdkMsQ0FBQztJQUNKLENBQUM7SUFFRCwrQkFBTyxHQUFQLFVBQVEsTUFBbUM7UUFBbkMsdUJBQUEsRUFBQSwyQkFBbUM7UUFDekMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbkIsSUFBSSxHQUFHLEdBQUcsSUFBQSxvQkFBWSxHQUFFLENBQUM7WUFDekIsT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUN2RCxDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUF6Q0QsSUF5Q0M7QUF6Q1ksc0NBQWE7QUEyQzFCOzs7O0dBSUc7QUFDSDtJQUtFLG9CQUFZLFVBQTBCO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLGlCQUFpQixDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQztJQUN2QyxDQUFDO0lBRUQsMkJBQU0sR0FBTjtRQUNFLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3RGLENBQUE7SUFDSCxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBaEJZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgYWNjZXNzIHRva2VuIHR5cGVzLlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlOlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi03LjFcbiAqL1xuZXhwb3J0IHR5cGUgVG9rZW5UeXBlID0gJ2JlYXJlcid8J21hYyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW5SZXNwb25zZSBhcyBhIEpTT04gT2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuUmVzcG9uc2VKc29uIHtcbiAgYWNjZXNzX3Rva2VuOiBzdHJpbmc7XG4gIHRva2VuX3R5cGU/OiBUb2tlblR5cGU7IC8qIHRyZWF0aW5nIHRva2VuIHR5cGUgYXMgb3B0aW9uYWwsIGFzIGl0cyBnb2luZyB0byBiZSBpbmZlcnJlZC4gKi9cbiAgZXhwaXJlc19pbj86IHN0cmluZzsgICAgLyogbGlmZXRpbWUgaW4gc2Vjb25kcy4gKi9cbiAgcmVmcmVzaF90b2tlbj86IHN0cmluZztcbiAgc2NvcGU/OiBzdHJpbmc7XG4gIGlkX3Rva2VuPzogc3RyaW5nOyAgLyogaHR0cHM6Ly9vcGVuaWQubmV0L3NwZWNzL29wZW5pZC1jb25uZWN0LWNvcmUtMV8wLmh0bWwjVG9rZW5SZXNwb25zZSAqL1xuICBpc3N1ZWRfYXQ/OiBudW1iZXI7IC8qIHdoZW4gd2FzIGl0IGlzc3VlZCA/ICovXG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgcG9zc2libGUgZXJyb3IgY29kZXMgZnJvbSB0aGUgdG9rZW4gZW5kcG9pbnQuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjJcbiAqL1xuZXhwb3J0IHR5cGUgRXJyb3JUeXBlID0gJ2ludmFsaWRfcmVxdWVzdCd8J2ludmFsaWRfY2xpZW50J3wnaW52YWxpZF9ncmFudCd8J3VuYXV0aG9yaXplZF9jbGllbnQnfFxuICAgICd1bnN1cHBvcnRlZF9ncmFudF90eXBlJ3wnaW52YWxpZF9zY29wZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW5FcnJvciBhcyBhIEpTT04gT2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuRXJyb3JKc29uIHtcbiAgZXJyb3I6IEVycm9yVHlwZTtcbiAgZXJyb3JfZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGVycm9yX3VyaT86IHN0cmluZztcbn1cblxuLy8gY29uc3RhbnRzXG5jb25zdCBBVVRIX0VYUElSWV9CVUZGRVIgPSAxMCAqIDYwICogLTE7ICAvLyAxMCBtaW5zIGluIHNlY29uZHNcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnN0YW50IG9mIHRpbWUgaW4gc2Vjb25kcy5cbiAqL1xuZXhwb3J0IGNvbnN0IG5vd0luU2Vjb25kcyA9ICgpID0+IE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbiBSZXNwb25zZSB0eXBlLlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNS4xXG4gKi9cbmV4cG9ydCBjbGFzcyBUb2tlblJlc3BvbnNlIHtcbiAgYWNjZXNzVG9rZW46IHN0cmluZztcbiAgdG9rZW5UeXBlOiBUb2tlblR5cGU7XG4gIGV4cGlyZXNJbjogbnVtYmVyfHVuZGVmaW5lZDtcbiAgcmVmcmVzaFRva2VuOiBzdHJpbmd8dW5kZWZpbmVkO1xuICBzY29wZTogc3RyaW5nfHVuZGVmaW5lZDtcbiAgaWRUb2tlbjogc3RyaW5nfHVuZGVmaW5lZDtcbiAgaXNzdWVkQXQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihyZXNwb25zZTogVG9rZW5SZXNwb25zZUpzb24pIHtcbiAgICB0aGlzLmFjY2Vzc1Rva2VuID0gcmVzcG9uc2UuYWNjZXNzX3Rva2VuO1xuICAgIHRoaXMudG9rZW5UeXBlID0gcmVzcG9uc2UudG9rZW5fdHlwZSB8fCAnYmVhcmVyJztcbiAgICBpZiAocmVzcG9uc2UuZXhwaXJlc19pbikge1xuICAgICAgdGhpcy5leHBpcmVzSW4gPSBwYXJzZUludChyZXNwb25zZS5leHBpcmVzX2luLCAxMCk7XG4gICAgfVxuICAgIHRoaXMucmVmcmVzaFRva2VuID0gcmVzcG9uc2UucmVmcmVzaF90b2tlbjtcbiAgICB0aGlzLnNjb3BlID0gcmVzcG9uc2Uuc2NvcGU7XG4gICAgdGhpcy5pZFRva2VuID0gcmVzcG9uc2UuaWRfdG9rZW47XG4gICAgdGhpcy5pc3N1ZWRBdCA9IHJlc3BvbnNlLmlzc3VlZF9hdCB8fCBub3dJblNlY29uZHMoKTtcbiAgfVxuXG4gIHRvSnNvbigpOiBUb2tlblJlc3BvbnNlSnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY2Vzc190b2tlbjogdGhpcy5hY2Nlc3NUb2tlbixcbiAgICAgIGlkX3Rva2VuOiB0aGlzLmlkVG9rZW4sXG4gICAgICByZWZyZXNoX3Rva2VuOiB0aGlzLnJlZnJlc2hUb2tlbixcbiAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxuICAgICAgdG9rZW5fdHlwZTogdGhpcy50b2tlblR5cGUsXG4gICAgICBpc3N1ZWRfYXQ6IHRoaXMuaXNzdWVkQXQsXG4gICAgICBleHBpcmVzX2luOiB0aGlzLmV4cGlyZXNJbj8udG9TdHJpbmcoKVxuICAgIH07XG4gIH1cblxuICBpc1ZhbGlkKGJ1ZmZlcjogbnVtYmVyID0gQVVUSF9FWFBJUllfQlVGRkVSKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZXhwaXJlc0luKSB7XG4gICAgICBsZXQgbm93ID0gbm93SW5TZWNvbmRzKCk7XG4gICAgICByZXR1cm4gbm93IDwgdGhpcy5pc3N1ZWRBdCArIHRoaXMuZXhwaXJlc0luICsgYnVmZmVyO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbiBFcnJvciB0eXBlLlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNS4yXG4gKi9cbmV4cG9ydCBjbGFzcyBUb2tlbkVycm9yIHtcbiAgZXJyb3I6IEVycm9yVHlwZTtcbiAgZXJyb3JEZXNjcmlwdGlvbjogc3RyaW5nfHVuZGVmaW5lZDtcbiAgZXJyb3JVcmk6IHN0cmluZ3x1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IodG9rZW5FcnJvcjogVG9rZW5FcnJvckpzb24pIHtcbiAgICB0aGlzLmVycm9yID0gdG9rZW5FcnJvci5lcnJvcjtcbiAgICB0aGlzLmVycm9yRGVzY3JpcHRpb24gPSB0b2tlbkVycm9yLmVycm9yX2Rlc2NyaXB0aW9uO1xuICAgIHRoaXMuZXJyb3JVcmkgPSB0b2tlbkVycm9yLmVycm9yX3VyaTtcbiAgfVxuXG4gIHRvSnNvbigpOiBUb2tlbkVycm9ySnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiB0aGlzLmVycm9yLCBlcnJvcl9kZXNjcmlwdGlvbjogdGhpcy5lcnJvckRlc2NyaXB0aW9uLCBlcnJvcl91cmk6IHRoaXMuZXJyb3JVcmlcbiAgICB9XG4gIH1cbn1cbiJdfQ==