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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdG9rZW5fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBdUNILFlBQVk7QUFDWixJQUFNLGtCQUFrQixHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBRSxxQkFBcUI7QUFFL0Q7O0dBRUc7QUFDSSxJQUFNLFlBQVksR0FBRyxjQUFNLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUF2QyxDQUF1QyxDQUFDO0FBQTdELFFBQUEsWUFBWSxnQkFBaUQ7QUFFMUU7Ozs7R0FJRztBQUNIO0lBU0UsdUJBQVksUUFBMkI7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsWUFBWSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFVBQVUsSUFBSSxRQUFRLENBQUM7UUFDakQsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxTQUFTLElBQUksb0JBQVksRUFBRSxDQUFDO0lBQ3ZELENBQUM7SUFFRCw4QkFBTSxHQUFOOztRQUNFLE9BQU87WUFDTCxZQUFZLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDOUIsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3RCLGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWTtZQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQzFCLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixVQUFVLEVBQUUsTUFBQSxJQUFJLENBQUMsU0FBUywwQ0FBRSxRQUFRLEVBQUU7U0FDdkMsQ0FBQztJQUNKLENBQUM7SUFFRCwrQkFBTyxHQUFQLFVBQVEsTUFBbUM7UUFBbkMsdUJBQUEsRUFBQSwyQkFBbUM7UUFDekMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksR0FBRyxHQUFHLG9CQUFZLEVBQUUsQ0FBQztZQUN6QixPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1NBQ3REO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQztBQXpDWSxzQ0FBYTtBQTJDMUI7Ozs7R0FJRztBQUNIO0lBS0Usb0JBQVksVUFBMEI7UUFDcEMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsaUJBQWlCLENBQUM7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCwyQkFBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDdEYsQ0FBQTtJQUNILENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFoQlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBhY2Nlc3MgdG9rZW4gdHlwZXMuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWU6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTcuMVxuICovXG5leHBvcnQgdHlwZSBUb2tlblR5cGUgPSAnYmVhcmVyJ3wnbWFjJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlblJlc3BvbnNlIGFzIGEgSlNPTiBPYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5SZXNwb25zZUpzb24ge1xuICBhY2Nlc3NfdG9rZW46IHN0cmluZztcbiAgdG9rZW5fdHlwZT86IFRva2VuVHlwZTsgLyogdHJlYXRpbmcgdG9rZW4gdHlwZSBhcyBvcHRpb25hbCwgYXMgaXRzIGdvaW5nIHRvIGJlIGluZmVycmVkLiAqL1xuICBleHBpcmVzX2luPzogc3RyaW5nOyAgICAvKiBsaWZldGltZSBpbiBzZWNvbmRzLiAqL1xuICByZWZyZXNoX3Rva2VuPzogc3RyaW5nO1xuICBzY29wZT86IHN0cmluZztcbiAgaWRfdG9rZW4/OiBzdHJpbmc7ICAvKiBodHRwczovL29wZW5pZC5uZXQvc3BlY3Mvb3BlbmlkLWNvbm5lY3QtY29yZS0xXzAuaHRtbCNUb2tlblJlc3BvbnNlICovXG4gIGlzc3VlZF9hdD86IG51bWJlcjsgLyogd2hlbiB3YXMgaXQgaXNzdWVkID8gKi9cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBwb3NzaWJsZSBlcnJvciBjb2RlcyBmcm9tIHRoZSB0b2tlbiBlbmRwb2ludC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTUuMlxuICovXG5leHBvcnQgdHlwZSBFcnJvclR5cGUgPSAnaW52YWxpZF9yZXF1ZXN0J3wnaW52YWxpZF9jbGllbnQnfCdpbnZhbGlkX2dyYW50J3wndW5hdXRob3JpemVkX2NsaWVudCd8XG4gICAgJ3Vuc3VwcG9ydGVkX2dyYW50X3R5cGUnfCdpbnZhbGlkX3Njb3BlJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbkVycm9yIGFzIGEgSlNPTiBPYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5FcnJvckpzb24ge1xuICBlcnJvcjogRXJyb3JUeXBlO1xuICBlcnJvcl9kZXNjcmlwdGlvbj86IHN0cmluZztcbiAgZXJyb3JfdXJpPzogc3RyaW5nO1xufVxuXG4vLyBjb25zdGFudHNcbmNvbnN0IEFVVEhfRVhQSVJZX0JVRkZFUiA9IDEwICogNjAgKiAtMTsgIC8vIDEwIG1pbnMgaW4gc2Vjb25kc1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGluc3RhbnQgb2YgdGltZSBpbiBzZWNvbmRzLlxuICovXG5leHBvcnQgY29uc3Qgbm93SW5TZWNvbmRzID0gKCkgPT4gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIFJlc3BvbnNlIHR5cGUuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjFcbiAqL1xuZXhwb3J0IGNsYXNzIFRva2VuUmVzcG9uc2Uge1xuICBhY2Nlc3NUb2tlbjogc3RyaW5nO1xuICB0b2tlblR5cGU6IFRva2VuVHlwZTtcbiAgZXhwaXJlc0luOiBudW1iZXJ8dW5kZWZpbmVkO1xuICByZWZyZXNoVG9rZW46IHN0cmluZ3x1bmRlZmluZWQ7XG4gIHNjb3BlOiBzdHJpbmd8dW5kZWZpbmVkO1xuICBpZFRva2VuOiBzdHJpbmd8dW5kZWZpbmVkO1xuICBpc3N1ZWRBdDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHJlc3BvbnNlOiBUb2tlblJlc3BvbnNlSnNvbikge1xuICAgIHRoaXMuYWNjZXNzVG9rZW4gPSByZXNwb25zZS5hY2Nlc3NfdG9rZW47XG4gICAgdGhpcy50b2tlblR5cGUgPSByZXNwb25zZS50b2tlbl90eXBlIHx8ICdiZWFyZXInO1xuICAgIGlmIChyZXNwb25zZS5leHBpcmVzX2luKSB7XG4gICAgICB0aGlzLmV4cGlyZXNJbiA9IHBhcnNlSW50KHJlc3BvbnNlLmV4cGlyZXNfaW4sIDEwKTtcbiAgICB9XG4gICAgdGhpcy5yZWZyZXNoVG9rZW4gPSByZXNwb25zZS5yZWZyZXNoX3Rva2VuO1xuICAgIHRoaXMuc2NvcGUgPSByZXNwb25zZS5zY29wZTtcbiAgICB0aGlzLmlkVG9rZW4gPSByZXNwb25zZS5pZF90b2tlbjtcbiAgICB0aGlzLmlzc3VlZEF0ID0gcmVzcG9uc2UuaXNzdWVkX2F0IHx8IG5vd0luU2Vjb25kcygpO1xuICB9XG5cbiAgdG9Kc29uKCk6IFRva2VuUmVzcG9uc2VKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWNjZXNzX3Rva2VuOiB0aGlzLmFjY2Vzc1Rva2VuLFxuICAgICAgaWRfdG9rZW46IHRoaXMuaWRUb2tlbixcbiAgICAgIHJlZnJlc2hfdG9rZW46IHRoaXMucmVmcmVzaFRva2VuLFxuICAgICAgc2NvcGU6IHRoaXMuc2NvcGUsXG4gICAgICB0b2tlbl90eXBlOiB0aGlzLnRva2VuVHlwZSxcbiAgICAgIGlzc3VlZF9hdDogdGhpcy5pc3N1ZWRBdCxcbiAgICAgIGV4cGlyZXNfaW46IHRoaXMuZXhwaXJlc0luPy50b1N0cmluZygpXG4gICAgfTtcbiAgfVxuXG4gIGlzVmFsaWQoYnVmZmVyOiBudW1iZXIgPSBBVVRIX0VYUElSWV9CVUZGRVIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5leHBpcmVzSW4pIHtcbiAgICAgIGxldCBub3cgPSBub3dJblNlY29uZHMoKTtcbiAgICAgIHJldHVybiBub3cgPCB0aGlzLmlzc3VlZEF0ICsgdGhpcy5leHBpcmVzSW4gKyBidWZmZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIEVycm9yIHR5cGUuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjJcbiAqL1xuZXhwb3J0IGNsYXNzIFRva2VuRXJyb3Ige1xuICBlcnJvcjogRXJyb3JUeXBlO1xuICBlcnJvckRlc2NyaXB0aW9uOiBzdHJpbmd8dW5kZWZpbmVkO1xuICBlcnJvclVyaTogc3RyaW5nfHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3Rvcih0b2tlbkVycm9yOiBUb2tlbkVycm9ySnNvbikge1xuICAgIHRoaXMuZXJyb3IgPSB0b2tlbkVycm9yLmVycm9yO1xuICAgIHRoaXMuZXJyb3JEZXNjcmlwdGlvbiA9IHRva2VuRXJyb3IuZXJyb3JfZGVzY3JpcHRpb247XG4gICAgdGhpcy5lcnJvclVyaSA9IHRva2VuRXJyb3IuZXJyb3JfdXJpO1xuICB9XG5cbiAgdG9Kc29uKCk6IFRva2VuRXJyb3JKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IHRoaXMuZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiB0aGlzLmVycm9yRGVzY3JpcHRpb24sIGVycm9yX3VyaTogdGhpcy5lcnJvclVyaVxuICAgIH1cbiAgfVxufVxuIl19