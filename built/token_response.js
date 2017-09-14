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
    function TokenResponse(accessToken, refreshToken, scope, tokenType, issuedAt, expiresIn) {
        if (tokenType === void 0) { tokenType = 'bearer'; }
        if (issuedAt === void 0) { issuedAt = nowInSeconds(); }
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.scope = scope;
        this.tokenType = tokenType;
        this.issuedAt = issuedAt;
        this.expiresIn = expiresIn;
    }
    TokenResponse.prototype.toJson = function () {
        return {
            access_token: this.accessToken,
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
        return new TokenResponse(input.access_token, input.refresh_token, input.scope, input.token_type, issuedAt, input.expires_in);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdG9rZW5fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFzQ0g7O0dBRUc7QUFDSCxJQUFNLFlBQVksR0FBRyxjQUFNLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUF2QyxDQUF1QyxDQUFDO0FBRW5FOzs7O0dBSUc7QUFDSDtJQUNFLHVCQUNXLFdBQW1CLEVBQ25CLFlBQXFCLEVBQ3JCLEtBQWMsRUFDZCxTQUErQixFQUMvQixRQUFpQyxFQUNqQyxTQUFrQjtRQUZsQiwwQkFBQSxFQUFBLG9CQUErQjtRQUMvQix5QkFBQSxFQUFBLFdBQW1CLFlBQVksRUFBRTtRQUpqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBUztRQUNyQixVQUFLLEdBQUwsS0FBSyxDQUFTO1FBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBc0I7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBUztJQUFHLENBQUM7SUFFakMsOEJBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQztZQUNMLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVztZQUM5QixhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDaEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMxQixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzNCLENBQUM7SUFDSixDQUFDO0lBRUQsK0JBQU8sR0FBUDtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksR0FBRyxHQUFHLFlBQVksRUFBRSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzlDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVNLHNCQUFRLEdBQWYsVUFBZ0IsS0FBd0I7UUFDdEMsSUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLFlBQVksRUFBRSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDckUsTUFBTSxDQUFDLElBQUksYUFBYSxDQUNwQixLQUFLLENBQUMsWUFBWSxFQUNsQixLQUFLLENBQUMsYUFBYSxFQUNuQixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxVQUFVLEVBQ2hCLFFBQVEsRUFDUixLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDdkIsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXZDRCxJQXVDQztBQXZDWSxzQ0FBYTtBQXlDMUI7Ozs7R0FJRztBQUNIO0lBQ0Usb0JBQ29CLEtBQWdCLEVBQ2hCLGdCQUF5QixFQUN6QixRQUFpQjtRQUZqQixVQUFLLEdBQUwsS0FBSyxDQUFXO1FBQ2hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUztRQUN6QixhQUFRLEdBQVIsUUFBUSxDQUFTO0lBQUcsQ0FBQztJQUV6QywyQkFBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtTQUN0RixDQUFBO0lBQ0gsQ0FBQztJQUVNLG1CQUFRLEdBQWYsVUFBZ0IsS0FBcUI7UUFDbkMsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQWZZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgYWNjZXNzIHRva2VuIHR5cGVzLlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gc2VlOlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi03LjFcbiAqL1xuZXhwb3J0IHR5cGUgVG9rZW5UeXBlID0gJ2JlYXJlcid8J21hYyc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW5SZXNwb25zZSBhcyBhIEpTT04gT2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuUmVzcG9uc2VKc29uIHtcbiAgYWNjZXNzX3Rva2VuOiBzdHJpbmc7XG4gIHRva2VuX3R5cGU/OiBUb2tlblR5cGU7IC8qIHRyZWF0aW5nIHRva2VuIHR5cGUgYXMgb3B0aW9uYWwsIGFzIGl0cyBnb2luZyB0byBiZSBpbmZlcnJlZC4gKi9cbiAgaXNzdWVkX2F0PzogbnVtYmVyOyAgICAgLyogd2hlbiB3YXMgaXQgaXNzdWVkID8gKi9cbiAgZXhwaXJlc19pbj86IG51bWJlcjsgICAgLyogbGlmZXRpbWUgaW4gc2Vjb25kcy4gKi9cbiAgcmVmcmVzaF90b2tlbj86IHN0cmluZztcbiAgc2NvcGU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgcG9zc2libGUgZXJyb3IgY29kZXMgZnJvbSB0aGUgdG9rZW4gZW5kcG9pbnQuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjJcbiAqL1xuZXhwb3J0IHR5cGUgRXJyb3JUeXBlID0gJ2ludmFsaWRfcmVxdWVzdCd8J2ludmFsaWRfY2xpZW50J3wnaW52YWxpZF9ncmFudCd8J3VuYXV0aG9yaXplZF9jbGllbnQnfFxuICAgICd1bnN1cHBvcnRlZF9ncmFudF90eXBlJ3wnaW52YWxpZF9zY29wZSc7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW5FcnJvciBhcyBhIEpTT04gT2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuRXJyb3JKc29uIHtcbiAgZXJyb3I6IEVycm9yVHlwZTtcbiAgZXJyb3JfZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGVycm9yX3VyaT86IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpbnN0YW50IG9mIHRpbWUgaW4gc2Vjb25kcy5cbiAqL1xuY29uc3Qgbm93SW5TZWNvbmRzID0gKCkgPT4gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIFJlc3BvbnNlIHR5cGUuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjFcbiAqL1xuZXhwb3J0IGNsYXNzIFRva2VuUmVzcG9uc2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBhY2Nlc3NUb2tlbjogc3RyaW5nLFxuICAgICAgcHVibGljIHJlZnJlc2hUb2tlbj86IHN0cmluZyxcbiAgICAgIHB1YmxpYyBzY29wZT86IHN0cmluZyxcbiAgICAgIHB1YmxpYyB0b2tlblR5cGU6IFRva2VuVHlwZSA9ICdiZWFyZXInLFxuICAgICAgcHVibGljIGlzc3VlZEF0OiBudW1iZXIgPSBub3dJblNlY29uZHMoKSxcbiAgICAgIHB1YmxpYyBleHBpcmVzSW4/OiBudW1iZXIpIHt9XG5cbiAgdG9Kc29uKCk6IFRva2VuUmVzcG9uc2VKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWNjZXNzX3Rva2VuOiB0aGlzLmFjY2Vzc1Rva2VuLFxuICAgICAgcmVmcmVzaF90b2tlbjogdGhpcy5yZWZyZXNoVG9rZW4sXG4gICAgICBzY29wZTogdGhpcy5zY29wZSxcbiAgICAgIHRva2VuX3R5cGU6IHRoaXMudG9rZW5UeXBlLFxuICAgICAgaXNzdWVkX2F0OiB0aGlzLmlzc3VlZEF0LFxuICAgICAgZXhwaXJlc19pbjogdGhpcy5leHBpcmVzSW5cbiAgICB9O1xuICB9XG5cbiAgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5leHBpcmVzSW4pIHtcbiAgICAgIGxldCBub3cgPSBub3dJblNlY29uZHMoKTtcbiAgICAgIHJldHVybiBub3cgPCB0aGlzLmlzc3VlZEF0ICsgdGhpcy5leHBpcmVzSW47XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihpbnB1dDogVG9rZW5SZXNwb25zZUpzb24pOiBUb2tlblJlc3BvbnNlIHtcbiAgICBjb25zdCBpc3N1ZWRBdCA9ICFpbnB1dC5pc3N1ZWRfYXQgPyBub3dJblNlY29uZHMoKSA6IGlucHV0Lmlzc3VlZF9hdDtcbiAgICByZXR1cm4gbmV3IFRva2VuUmVzcG9uc2UoXG4gICAgICAgIGlucHV0LmFjY2Vzc190b2tlbixcbiAgICAgICAgaW5wdXQucmVmcmVzaF90b2tlbixcbiAgICAgICAgaW5wdXQuc2NvcGUsXG4gICAgICAgIGlucHV0LnRva2VuX3R5cGUsXG4gICAgICAgIGlzc3VlZEF0LFxuICAgICAgICBpbnB1dC5leHBpcmVzX2luKVxuICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW4gRXJyb3IgdHlwZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTUuMlxuICovXG5leHBvcnQgY2xhc3MgVG9rZW5FcnJvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJlYWRvbmx5IGVycm9yOiBFcnJvclR5cGUsXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZXJyb3JEZXNjcmlwdGlvbj86IHN0cmluZyxcbiAgICAgIHB1YmxpYyByZWFkb25seSBlcnJvclVyaT86IHN0cmluZykge31cblxuICB0b0pzb24oKTogVG9rZW5FcnJvckpzb24ge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogdGhpcy5lcnJvciwgZXJyb3JfZGVzY3JpcHRpb246IHRoaXMuZXJyb3JEZXNjcmlwdGlvbiwgZXJyb3JfdXJpOiB0aGlzLmVycm9yVXJpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGlucHV0OiBUb2tlbkVycm9ySnNvbikge1xuICAgIHJldHVybiBuZXcgVG9rZW5FcnJvcihpbnB1dC5lcnJvciwgaW5wdXQuZXJyb3JfZGVzY3JpcHRpb24sIGlucHV0LmVycm9yX3VyaSk7XG4gIH1cbn1cbiJdfQ==