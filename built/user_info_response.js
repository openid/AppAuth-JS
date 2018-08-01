"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9pbmZvX3Jlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VzZXJfaW5mb19yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWdDQTs7R0FFRztBQUNILElBQU0sWUFBWSxHQUFHLGNBQU0sT0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQXZDLENBQXVDLENBQUM7QUFFbkU7Ozs7R0FJRztBQUNIO0lBQ0UsdUJBQ1csV0FBbUIsRUFDbkIsT0FBZ0IsRUFDaEIsWUFBcUIsRUFDckIsS0FBYyxFQUNkLFNBQStCLEVBQy9CLFFBQWlDLEVBQ2pDLFNBQWtCO1FBRmxCLDBCQUFBLEVBQUEsb0JBQStCO1FBQy9CLHlCQUFBLEVBQUEsV0FBbUIsWUFBWSxFQUFFO1FBTGpDLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ25CLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQVM7UUFDckIsVUFBSyxHQUFMLEtBQUssQ0FBUztRQUNkLGNBQVMsR0FBVCxTQUFTLENBQXNCO1FBQy9CLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQVM7SUFBRyxDQUFDO0lBRWpDLDhCQUFNLEdBQU47UUFDRSxPQUFPO1lBQ0wsWUFBWSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzlCLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTztZQUN0QixhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDaEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMxQixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzNCLENBQUM7SUFDSixDQUFDO0lBRUQsK0JBQU8sR0FBUDtRQUNFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLEdBQUcsR0FBRyxZQUFZLEVBQUUsQ0FBQztZQUN6QixPQUFPLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDN0M7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRU0sc0JBQVEsR0FBZixVQUFnQixLQUF3QjtRQUN0QyxJQUFNLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ3JFLE9BQU8sSUFBSSxhQUFhLENBQ3BCLEtBQUssQ0FBQyxZQUFZLEVBQ2xCLEtBQUssQ0FBQyxRQUFRLEVBQ2QsS0FBSyxDQUFDLGFBQWEsRUFDbkIsS0FBSyxDQUFDLEtBQUssRUFDWCxLQUFLLENBQUMsVUFBVSxFQUNoQixRQUFRLEVBQ1IsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUExQ0QsSUEwQ0M7QUExQ1ksc0NBQWE7QUE0QzFCOzs7O0dBSUc7QUFDSDtJQUNFLG9CQUNvQixLQUFnQixFQUNoQixnQkFBeUIsRUFDekIsUUFBaUI7UUFGakIsVUFBSyxHQUFMLEtBQUssQ0FBVztRQUNoQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVM7UUFDekIsYUFBUSxHQUFSLFFBQVEsQ0FBUztJQUFHLENBQUM7SUFFekMsMkJBQU0sR0FBTjtRQUNFLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3RGLENBQUE7SUFDSCxDQUFDO0lBRU0sbUJBQVEsR0FBZixVQUFnQixLQUFxQjtRQUNuQyxPQUFPLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQWZZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHR5cGUgVG9rZW5UeXBlID0gJ2JlYXJlcic7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW5SZXNwb25zZSBhcyBhIEpTT04gT2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuUmVzcG9uc2VKc29uIHtcbiAgYWNjZXNzX3Rva2VuOiBzdHJpbmc7XG4gIGlkX3Rva2VuPzogc3RyaW5nOyAgICAgIC8qIGh0dHBzOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1jb3JlLTFfMC5odG1sI1Rva2VuUmVzcG9uc2UgKi9cbiAgdG9rZW5fdHlwZT86IFRva2VuVHlwZTsgLyogdHJlYXRpbmcgdG9rZW4gdHlwZSBhcyBvcHRpb25hbCwgYXMgaXRzIGdvaW5nIHRvIGJlIGluZmVycmVkLiAqL1xuICBpc3N1ZWRfYXQ/OiBudW1iZXI7ICAgICAvKiB3aGVuIHdhcyBpdCBpc3N1ZWQgPyAqL1xuICBleHBpcmVzX2luPzogbnVtYmVyOyAgICAvKiBsaWZldGltZSBpbiBzZWNvbmRzLiAqL1xuICByZWZyZXNoX3Rva2VuPzogc3RyaW5nO1xuICBzY29wZT86IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBwb3NzaWJsZSBlcnJvciBjb2RlcyBmcm9tIHRoZSB0b2tlbiBlbmRwb2ludC5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTUuMlxuICovXG5leHBvcnQgdHlwZSBFcnJvclR5cGUgPSAnaW52YWxpZF9yZXF1ZXN0J3wnaW52YWxpZF9jbGllbnQnfCdpbnZhbGlkX2dyYW50J3wndW5hdXRob3JpemVkX2NsaWVudCd8XG4gICAgJ3Vuc3VwcG9ydGVkX2dyYW50X3R5cGUnfCdpbnZhbGlkX3Njb3BlJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbkVycm9yIGFzIGEgSlNPTiBPYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5FcnJvckpzb24ge1xuICBlcnJvcjogRXJyb3JUeXBlO1xuICBlcnJvcl9kZXNjcmlwdGlvbj86IHN0cmluZztcbiAgZXJyb3JfdXJpPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGluc3RhbnQgb2YgdGltZSBpbiBzZWNvbmRzLlxuICovXG5jb25zdCBub3dJblNlY29uZHMgPSAoKSA9PiBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW4gUmVzcG9uc2UgdHlwZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTUuMVxuICovXG5leHBvcnQgY2xhc3MgVG9rZW5SZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGFjY2Vzc1Rva2VuOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgaWRUb2tlbj86IHN0cmluZyxcbiAgICAgIHB1YmxpYyByZWZyZXNoVG9rZW4/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgc2NvcGU/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgdG9rZW5UeXBlOiBUb2tlblR5cGUgPSAnYmVhcmVyJyxcbiAgICAgIHB1YmxpYyBpc3N1ZWRBdDogbnVtYmVyID0gbm93SW5TZWNvbmRzKCksXG4gICAgICBwdWJsaWMgZXhwaXJlc0luPzogbnVtYmVyKSB7fVxuXG4gIHRvSnNvbigpOiBUb2tlblJlc3BvbnNlSnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY2Vzc190b2tlbjogdGhpcy5hY2Nlc3NUb2tlbixcbiAgICAgIGlkX3Rva2VuOiB0aGlzLmlkVG9rZW4sXG4gICAgICByZWZyZXNoX3Rva2VuOiB0aGlzLnJlZnJlc2hUb2tlbixcbiAgICAgIHNjb3BlOiB0aGlzLnNjb3BlLFxuICAgICAgdG9rZW5fdHlwZTogdGhpcy50b2tlblR5cGUsXG4gICAgICBpc3N1ZWRfYXQ6IHRoaXMuaXNzdWVkQXQsXG4gICAgICBleHBpcmVzX2luOiB0aGlzLmV4cGlyZXNJblxuICAgIH07XG4gIH1cblxuICBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmV4cGlyZXNJbikge1xuICAgICAgbGV0IG5vdyA9IG5vd0luU2Vjb25kcygpO1xuICAgICAgcmV0dXJuIG5vdyA8IHRoaXMuaXNzdWVkQXQgKyB0aGlzLmV4cGlyZXNJbjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGlucHV0OiBUb2tlblJlc3BvbnNlSnNvbik6IFRva2VuUmVzcG9uc2Uge1xuICAgIGNvbnN0IGlzc3VlZEF0ID0gIWlucHV0Lmlzc3VlZF9hdCA/IG5vd0luU2Vjb25kcygpIDogaW5wdXQuaXNzdWVkX2F0O1xuICAgIHJldHVybiBuZXcgVG9rZW5SZXNwb25zZShcbiAgICAgICAgaW5wdXQuYWNjZXNzX3Rva2VuLFxuICAgICAgICBpbnB1dC5pZF90b2tlbixcbiAgICAgICAgaW5wdXQucmVmcmVzaF90b2tlbixcbiAgICAgICAgaW5wdXQuc2NvcGUsXG4gICAgICAgIGlucHV0LnRva2VuX3R5cGUsXG4gICAgICAgIGlzc3VlZEF0LFxuICAgICAgICBpbnB1dC5leHBpcmVzX2luKVxuICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgVG9rZW4gRXJyb3IgdHlwZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTUuMlxuICovXG5leHBvcnQgY2xhc3MgVG9rZW5FcnJvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJlYWRvbmx5IGVycm9yOiBFcnJvclR5cGUsXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZXJyb3JEZXNjcmlwdGlvbj86IHN0cmluZyxcbiAgICAgIHB1YmxpYyByZWFkb25seSBlcnJvclVyaT86IHN0cmluZykge31cblxuICB0b0pzb24oKTogVG9rZW5FcnJvckpzb24ge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogdGhpcy5lcnJvciwgZXJyb3JfZGVzY3JpcHRpb246IHRoaXMuZXJyb3JEZXNjcmlwdGlvbiwgZXJyb3JfdXJpOiB0aGlzLmVycm9yVXJpXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGlucHV0OiBUb2tlbkVycm9ySnNvbikge1xuICAgIHJldHVybiBuZXcgVG9rZW5FcnJvcihpbnB1dC5lcnJvciwgaW5wdXQuZXJyb3JfZGVzY3JpcHRpb24sIGlucHV0LmVycm9yX3VyaSk7XG4gIH1cbn1cbiJdfQ==