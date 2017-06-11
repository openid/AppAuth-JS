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
var TokenResponse = (function () {
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
        return new TokenResponse(input.access_token, input.refresh_token, input.scope, input.token_type, nowInSeconds(), input.expires_in);
    };
    return TokenResponse;
}());
exports.TokenResponse = TokenResponse;
/**
 * Represents the Token Error type.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-5.2
 */
var TokenError = (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdG9rZW5fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFzQ0g7O0dBRUc7QUFDSCxJQUFNLFlBQVksR0FBRyxjQUFNLE9BQUEsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxFQUF2QyxDQUF1QyxDQUFDO0FBRW5FOzs7O0dBSUc7QUFDSDtJQUNFLHVCQUNXLFdBQW1CLEVBQ25CLFlBQXFCLEVBQ3JCLEtBQWMsRUFDZCxTQUErQixFQUMvQixRQUFpQyxFQUNqQyxTQUFrQjtRQUZsQiwwQkFBQSxFQUFBLG9CQUErQjtRQUMvQix5QkFBQSxFQUFBLFdBQW1CLFlBQVksRUFBRTtRQUpqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixpQkFBWSxHQUFaLFlBQVksQ0FBUztRQUNyQixVQUFLLEdBQUwsS0FBSyxDQUFTO1FBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBc0I7UUFDL0IsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFDakMsY0FBUyxHQUFULFNBQVMsQ0FBUztJQUFHLENBQUM7SUFFakMsOEJBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQztZQUNMLFlBQVksRUFBRSxJQUFJLENBQUMsV0FBVztZQUM5QixhQUFhLEVBQUUsSUFBSSxDQUFDLFlBQVk7WUFDaEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUztZQUMxQixTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsVUFBVSxFQUFFLElBQUksQ0FBQyxTQUFTO1NBQzNCLENBQUM7SUFDSixDQUFDO0lBRUQsK0JBQU8sR0FBUDtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksR0FBRyxHQUFHLFlBQVksRUFBRSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzlDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVNLHNCQUFRLEdBQWYsVUFBZ0IsS0FBd0I7UUFDdEMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUNwQixLQUFLLENBQUMsWUFBWSxFQUNsQixLQUFLLENBQUMsYUFBYSxFQUNuQixLQUFLLENBQUMsS0FBSyxFQUNYLEtBQUssQ0FBQyxVQUFVLEVBQ2hCLFlBQVksRUFBRSxFQUNkLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUN2QixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBdENELElBc0NDO0FBdENZLHNDQUFhO0FBd0MxQjs7OztHQUlHO0FBQ0g7SUFDRSxvQkFDb0IsS0FBZ0IsRUFDaEIsZ0JBQXlCLEVBQ3pCLFFBQWlCO1FBRmpCLFVBQUssR0FBTCxLQUFLLENBQVc7UUFDaEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFTO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQVM7SUFBRyxDQUFDO0lBRXpDLDJCQUFNLEdBQU47UUFDRSxNQUFNLENBQUM7WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO1NBQ3RGLENBQUE7SUFDSCxDQUFDO0lBRU0sbUJBQVEsR0FBZixVQUFnQixLQUFxQjtRQUNuQyxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUFmRCxJQWVDO0FBZlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBhY2Nlc3MgdG9rZW4gdHlwZXMuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBzZWU6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTcuMVxuICovXG5leHBvcnQgdHlwZSBUb2tlblR5cGUgPSAnYmVhcmVyJyB8ICdtYWMnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuUmVzcG9uc2UgYXMgYSBKU09OIE9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUb2tlblJlc3BvbnNlSnNvbiB7XG4gIGFjY2Vzc190b2tlbjogc3RyaW5nO1xuICB0b2tlbl90eXBlPzogVG9rZW5UeXBlOyAvKiB0cmVhdGluZyB0b2tlbiB0eXBlIGFzIG9wdGlvbmFsLCBhcyBpdHMgZ29pbmcgdG8gYmUgaW5mZXJyZWQuICovXG4gIGlzc3VlZF9hdD86IG51bWJlcjsgICAgIC8qIHdoZW4gd2FzIGl0IGlzc3VlZCA/ICovXG4gIGV4cGlyZXNfaW4/OiBudW1iZXI7ICAgIC8qIGxpZmV0aW1lIGluIHNlY29uZHMuICovXG4gIHJlZnJlc2hfdG9rZW4/OiBzdHJpbmc7XG4gIHNjb3BlPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIHBvc3NpYmxlIGVycm9yIGNvZGVzIGZyb20gdGhlIHRva2VuIGVuZHBvaW50LlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNS4yXG4gKi9cbmV4cG9ydCB0eXBlIEVycm9yVHlwZSA9ICdpbnZhbGlkX3JlcXVlc3QnIHwgJ2ludmFsaWRfY2xpZW50JyB8ICdpbnZhbGlkX2dyYW50JyB8XG4gICAgJ3VuYXV0aG9yaXplZF9jbGllbnQnIHwgJ3Vuc3VwcG9ydGVkX2dyYW50X3R5cGUnIHwgJ2ludmFsaWRfc2NvcGUnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuRXJyb3IgYXMgYSBKU09OIE9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUb2tlbkVycm9ySnNvbiB7XG4gIGVycm9yOiBFcnJvclR5cGU7XG4gIGVycm9yX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBlcnJvcl91cmk/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW5zdGFudCBvZiB0aW1lIGluIHNlY29uZHMuXG4gKi9cbmNvbnN0IG5vd0luU2Vjb25kcyA9ICgpID0+IE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKTtcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBUb2tlbiBSZXNwb25zZSB0eXBlLlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNS4xXG4gKi9cbmV4cG9ydCBjbGFzcyBUb2tlblJlc3BvbnNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgYWNjZXNzVG9rZW46IHN0cmluZyxcbiAgICAgIHB1YmxpYyByZWZyZXNoVG9rZW4/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgc2NvcGU/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgdG9rZW5UeXBlOiBUb2tlblR5cGUgPSAnYmVhcmVyJyxcbiAgICAgIHB1YmxpYyBpc3N1ZWRBdDogbnVtYmVyID0gbm93SW5TZWNvbmRzKCksXG4gICAgICBwdWJsaWMgZXhwaXJlc0luPzogbnVtYmVyKSB7fVxuXG4gIHRvSnNvbigpOiBUb2tlblJlc3BvbnNlSnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGFjY2Vzc190b2tlbjogdGhpcy5hY2Nlc3NUb2tlbixcbiAgICAgIHJlZnJlc2hfdG9rZW46IHRoaXMucmVmcmVzaFRva2VuLFxuICAgICAgc2NvcGU6IHRoaXMuc2NvcGUsXG4gICAgICB0b2tlbl90eXBlOiB0aGlzLnRva2VuVHlwZSxcbiAgICAgIGlzc3VlZF9hdDogdGhpcy5pc3N1ZWRBdCxcbiAgICAgIGV4cGlyZXNfaW46IHRoaXMuZXhwaXJlc0luXG4gICAgfTtcbiAgfVxuXG4gIGlzVmFsaWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuZXhwaXJlc0luKSB7XG4gICAgICBsZXQgbm93ID0gbm93SW5TZWNvbmRzKCk7XG4gICAgICByZXR1cm4gbm93IDwgdGhpcy5pc3N1ZWRBdCArIHRoaXMuZXhwaXJlc0luO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oaW5wdXQ6IFRva2VuUmVzcG9uc2VKc29uKTogVG9rZW5SZXNwb25zZSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlblJlc3BvbnNlKFxuICAgICAgICBpbnB1dC5hY2Nlc3NfdG9rZW4sXG4gICAgICAgIGlucHV0LnJlZnJlc2hfdG9rZW4sXG4gICAgICAgIGlucHV0LnNjb3BlLFxuICAgICAgICBpbnB1dC50b2tlbl90eXBlLFxuICAgICAgICBub3dJblNlY29uZHMoKSxcbiAgICAgICAgaW5wdXQuZXhwaXJlc19pbilcbiAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIFRva2VuIEVycm9yIHR5cGUuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi01LjJcbiAqL1xuZXhwb3J0IGNsYXNzIFRva2VuRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSBlcnJvcjogRXJyb3JUeXBlLFxuICAgICAgcHVibGljIHJlYWRvbmx5IGVycm9yRGVzY3JpcHRpb24/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgZXJyb3JVcmk/OiBzdHJpbmcpIHt9XG5cbiAgdG9Kc29uKCk6IFRva2VuRXJyb3JKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IHRoaXMuZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiB0aGlzLmVycm9yRGVzY3JpcHRpb24sIGVycm9yX3VyaTogdGhpcy5lcnJvclVyaVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihpbnB1dDogVG9rZW5FcnJvckpzb24pIHtcbiAgICByZXR1cm4gbmV3IFRva2VuRXJyb3IoaW5wdXQuZXJyb3IsIGlucHV0LmVycm9yX2Rlc2NyaXB0aW9uLCBpbnB1dC5lcnJvcl91cmkpO1xuICB9XG59XG4iXX0=