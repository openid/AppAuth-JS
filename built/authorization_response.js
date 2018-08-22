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
 * Represents the Authorization Response type.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.2
 */
var AuthorizationResponse = /** @class */ (function () {
    function AuthorizationResponse(code, state) {
        this.code = code;
        this.state = state;
    }
    AuthorizationResponse.prototype.toJson = function () {
        return { code: this.code, state: this.state };
    };
    AuthorizationResponse.fromJson = function (json) {
        return new AuthorizationResponse(json.code, json.state);
    };
    return AuthorizationResponse;
}());
exports.AuthorizationResponse = AuthorizationResponse;
/**
 * Represents the Authorization error response.
 * For more information look at:
 * https://tools.ietf.org/html/rfc6749#section-4.1.2.1
 */
var AuthorizationError = /** @class */ (function () {
    function AuthorizationError(error, errorDescription, errorUri, state) {
        this.error = error;
        this.errorDescription = errorDescription;
        this.errorUri = errorUri;
        this.state = state;
    }
    AuthorizationError.prototype.toJson = function () {
        return {
            error: this.error,
            error_description: this.errorDescription,
            error_uri: this.errorUri,
            state: this.state
        };
    };
    AuthorizationError.fromJson = function (json) {
        return new AuthorizationError(json.error, json.error_description, json.error_uri, json.state);
    };
    return AuthorizationError;
}());
exports.AuthorizationError = AuthorizationError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRob3JpemF0aW9uX3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBb0JIOzs7O0dBSUc7QUFDSDtJQUNFLCtCQUFtQixJQUFZLEVBQVMsS0FBYTtRQUFsQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUFHLENBQUM7SUFFekQsc0NBQU0sR0FBTjtRQUNFLE9BQU8sRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSw4QkFBUSxHQUFmLFVBQWdCLElBQStCO1FBQzdDLE9BQU8sSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLHNEQUFxQjtBQVlsQzs7OztHQUlHO0FBQ0g7SUFDRSw0QkFDVyxLQUFhLEVBQ2IsZ0JBQXlCLEVBQ3pCLFFBQWlCLEVBQ2pCLEtBQWM7UUFIZCxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFTO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsVUFBSyxHQUFMLEtBQUssQ0FBUztJQUFHLENBQUM7SUFFN0IsbUNBQU0sR0FBTjtRQUNFLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN4QyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUM7SUFDSixDQUFDO0lBRU0sMkJBQVEsR0FBZixVQUFnQixJQUE0QjtRQUMxQyxPQUFPLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQztBQW5CWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uUmVzcG9uc2UgYXMgYSBKU09OIG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbiB7XHJcbiAgY29kZTogc3RyaW5nO1xyXG4gIHN0YXRlOiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uRXJyb3IgYXMgYSBKU09OIG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXphdGlvbkVycm9ySnNvbiB7XHJcbiAgZXJyb3I6IHN0cmluZztcclxuICBlcnJvcl9kZXNjcmlwdGlvbj86IHN0cmluZztcclxuICBlcnJvcl91cmk/OiBzdHJpbmc7XHJcbiAgc3RhdGU/OiBzdHJpbmc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uIFJlc3BvbnNlIHR5cGUuXHJcbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcclxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuMlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25SZXNwb25zZSB7XHJcbiAgY29uc3RydWN0b3IocHVibGljIGNvZGU6IHN0cmluZywgcHVibGljIHN0YXRlOiBzdHJpbmcpIHt9XHJcblxyXG4gIHRvSnNvbigpOiBBdXRob3JpemF0aW9uUmVzcG9uc2VKc29uIHtcclxuICAgIHJldHVybiB7Y29kZTogdGhpcy5jb2RlLCBzdGF0ZTogdGhpcy5zdGF0ZX07XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZnJvbUpzb24oanNvbjogQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbik6IEF1dGhvcml6YXRpb25SZXNwb25zZSB7XHJcbiAgICByZXR1cm4gbmV3IEF1dGhvcml6YXRpb25SZXNwb25zZShqc29uLmNvZGUsIGpzb24uc3RhdGUpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgdGhlIEF1dGhvcml6YXRpb24gZXJyb3IgcmVzcG9uc2UuXHJcbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XHJcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNC4xLjIuMVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25FcnJvciB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHB1YmxpYyBlcnJvcjogc3RyaW5nLFxyXG4gICAgICBwdWJsaWMgZXJyb3JEZXNjcmlwdGlvbj86IHN0cmluZyxcclxuICAgICAgcHVibGljIGVycm9yVXJpPzogc3RyaW5nLFxyXG4gICAgICBwdWJsaWMgc3RhdGU/OiBzdHJpbmcpIHt9XHJcblxyXG4gIHRvSnNvbigpOiBBdXRob3JpemF0aW9uRXJyb3JKc29uIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGVycm9yOiB0aGlzLmVycm9yLFxyXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjogdGhpcy5lcnJvckRlc2NyaXB0aW9uLFxyXG4gICAgICBlcnJvcl91cmk6IHRoaXMuZXJyb3JVcmksXHJcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGZyb21Kc29uKGpzb246IEF1dGhvcml6YXRpb25FcnJvckpzb24pOiBBdXRob3JpemF0aW9uRXJyb3Ige1xyXG4gICAgcmV0dXJuIG5ldyBBdXRob3JpemF0aW9uRXJyb3IoanNvbi5lcnJvciwganNvbi5lcnJvcl9kZXNjcmlwdGlvbiwganNvbi5lcnJvcl91cmksIGpzb24uc3RhdGUpO1xyXG4gIH1cclxufVxyXG4iXX0=