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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdG9rZW5fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFzQ0g7O0dBRUc7QUFDSCxJQUFNLFlBQVksR0FBRyxjQUFNLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUF2QyxDQUF1QyxDQUFDO0FBRW5FOzs7O0dBSUc7QUFDSDtJQUNFLHVCQUNXLFdBQW1CLEVBQ25CLFlBQXFCLEVBQ3JCLEtBQWMsRUFDZCxTQUErQixFQUMvQixRQUFpQyxFQUNqQyxTQUFrQjtRQUZsQiwwQkFBQSxFQUFBLG9CQUErQjtRQUMvQix5QkFBQSxFQUFBLFdBQW1CLFlBQVksRUFBRTtRQUpqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBUztRQUNyQixVQUFLLEdBQUwsS0FBSyxDQUFTO1FBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBc0I7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBUztJQUFHLENBQUM7SUFFakMsOEJBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQztZQUNMLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVztZQUM5QixhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDaEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMxQixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzNCLENBQUM7SUFDSixDQUFDO0lBRUQsK0JBQU8sR0FBUDtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksR0FBRyxHQUFHLFlBQVksRUFBRSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzlDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVNLHNCQUFRLEdBQWYsVUFBZ0IsS0FBd0I7UUFDdEMsSUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNyRSxNQUFNLENBQUMsSUFBSSxhQUFhLENBQ3BCLEtBQUssQ0FBQyxZQUFZLEVBQ2xCLEtBQUssQ0FBQyxhQUFhLEVBQ25CLEtBQUssQ0FBQyxLQUFLLEVBQ1gsS0FBSyxDQUFDLFVBQVUsRUFDaEIsUUFBUSxFQUNSLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBdkNELElBdUNDO0FBdkNZLHNDQUFhO0FBeUMxQjs7OztHQUlHO0FBQ0g7SUFDRSxvQkFDb0IsS0FBZ0IsRUFDaEIsZ0JBQXlCLEVBQ3pCLFFBQWlCO1FBRmpCLFVBQUssR0FBTCxLQUFLLENBQVc7UUFDaEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFTO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQVM7SUFBRyxDQUFDO0lBRXpDLDJCQUFNLEdBQU47UUFDRSxNQUFNLENBQUM7WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3RGLENBQUE7SUFDSCxDQUFDO0lBRU0sbUJBQVEsR0FBZixVQUFnQixLQUFxQjtRQUNuQyxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUFmRCxJQWVDO0FBZlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBhY2Nlc3MgdG9rZW4gdHlwZXMuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWU6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTcuMVxuICovXG5leHBvcnQgdHlwZSBUb2tlblR5cGUgPSAnYmVhcmVyJ3wnbWFjJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlblJlc3BvbnNlIGFzIGEgSlNPTiBPYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5SZXNwb25zZUpzb24ge1xuICBhY2Nlc3NfdG9rZW46IHN0cmluZztcbiAgdG9rZW5fdHlwZT86IFRva2VuVHlwZTsgLyogdHJlYXRpbmcgdG9rZW4gdHlwZSBhcyBvcHRpb25hbCwgYXMgaXRzIGdvaW5nIHRvIGJlIGluZmVycmVkLiAqL1xuICBpc3N1ZWRfYXQ/OiBudW1iZXI7ICAgICAvKiB3aGVuIHdhcyBpdCBpc3N1ZWQgPyAqL1xuICBleHBpcmVzX2luPzogbnVtYmVyOyAgICAvKiBsaWZldGltZSBpbiBzZWNvbmRzLiAqL1xuICByZWZyZXNoX3Rva2VuPzogc3RyaW5nO1xuICBzY29wZT86IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBwb3NzaWJsZSBlcnJvciBjb2RlcyBmcm9tIHRoZSB0b2tlbiBlbmRwb2ludC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTUuMlxuICovXG5leHBvcnQgdHlwZSBFcnJvclR5cGUgPSAnaW52YWxpZF9yZXF1ZXN0J3wnaW52YWxpZF9jbGllbnQnfCdpbnZhbGlkX2dyYW50J3wndW5hdXRob3JpemVkX2NsaWVudCd8XG4gICAgJ3Vuc3VwcG9ydGVkX2dyYW50X3R5cGUnfCdpbnZhbGlkX3Njb3BlJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbkVycm9yIGFzIGEgSlNPTiBPYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5FcnJvckpzb24ge1xuICBlcnJvcjogRXJyb3JUeXBlO1xuICBlcnJvcl9kZXNjcmlwdGlvbj86IHN0cmluZztcbiAgZXJyb3JfdXJpPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGluc3RhbnQgb2YgdGltZSBpbiBzZWNvbmRzLlxuICovXG5jb25zdCBub3dJblNlY29uZHMgPSAoKSA9PiBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW4gUmVzcG9uc2UgdHlwZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTUuMVxuICovXG5leHBvcnQgY2xhc3MgVG9rZW5SZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGFjY2Vzc1Rva2VuOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcmVmcmVzaFRva2VuPzogc3RyaW5nLFxuICAgICAgcHVibGljIHNjb3BlPzogc3RyaW5nLFxuICAgICAgcHVibGljIHRva2VuVHlwZTogVG9rZW5UeXBlID0gJ2JlYXJlcicsXG4gICAgICBwdWJsaWMgaXNzdWVkQXQ6IG51bWJlciA9IG5vd0luU2Vjb25kcygpLFxuICAgICAgcHVibGljIGV4cGlyZXNJbj86IG51bWJlcikge31cblxuICB0b0pzb24oKTogVG9rZW5SZXNwb25zZUpzb24ge1xuICAgIHJldHVybiB7XG4gICAgICBhY2Nlc3NfdG9rZW46IHRoaXMuYWNjZXNzVG9rZW4sXG4gICAgICByZWZyZXNoX3Rva2VuOiB0aGlzLnJlZnJlc2hUb2tlbixcbiAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxuICAgICAgdG9rZW5fdHlwZTogdGhpcy50b2tlblR5cGUsXG4gICAgICBpc3N1ZWRfYXQ6IHRoaXMuaXNzdWVkQXQsXG4gICAgICBleHBpcmVzX2luOiB0aGlzLmV4cGlyZXNJblxuICAgIH07XG4gIH1cblxuICBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmV4cGlyZXNJbikge1xuICAgICAgbGV0IG5vdyA9IG5vd0luU2Vjb25kcygpO1xuICAgICAgcmV0dXJuIG5vdyA8IHRoaXMuaXNzdWVkQXQgKyB0aGlzLmV4cGlyZXNJbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGlucHV0OiBUb2tlblJlc3BvbnNlSnNvbik6IFRva2VuUmVzcG9uc2Uge1xuICAgIGNvbnN0IGlzc3VlZEF0ID0gIWlucHV0Lmlzc3VlZF9hdCA/IG5vd0luU2Vjb25kcygpIDogaW5wdXQuaXNzdWVkX2F0O1xuICAgIHJldHVybiBuZXcgVG9rZW5SZXNwb25zZShcbiAgICAgICAgaW5wdXQuYWNjZXNzX3Rva2VuLFxuICAgICAgICBpbnB1dC5yZWZyZXNoX3Rva2VuLFxuICAgICAgICBpbnB1dC5zY29wZSxcbiAgICAgICAgaW5wdXQudG9rZW5fdHlwZSxcbiAgICAgICAgaXNzdWVkQXQsXG4gICAgICAgIGlucHV0LmV4cGlyZXNfaW4pXG4gIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbiBFcnJvciB0eXBlLlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNS4yXG4gKi9cbmV4cG9ydCBjbGFzcyBUb2tlbkVycm9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZXJyb3I6IEVycm9yVHlwZSxcbiAgICAgIHB1YmxpYyByZWFkb25seSBlcnJvckRlc2NyaXB0aW9uPzogc3RyaW5nLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGVycm9yVXJpPzogc3RyaW5nKSB7fVxuXG4gIHRvSnNvbigpOiBUb2tlbkVycm9ySnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiB0aGlzLmVycm9yLCBlcnJvcl9kZXNjcmlwdGlvbjogdGhpcy5lcnJvckRlc2NyaXB0aW9uLCBlcnJvcl91cmk6IHRoaXMuZXJyb3JVcmlcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IFRva2VuRXJyb3JKc29uKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbkVycm9yKGlucHV0LmVycm9yLCBpbnB1dC5lcnJvcl9kZXNjcmlwdGlvbiwgaW5wdXQuZXJyb3JfdXJpKTtcbiAgfVxufVxuIl19