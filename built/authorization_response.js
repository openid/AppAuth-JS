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
    function AuthorizationResponse(code, state, id_token) {
        this.code = code;
        this.state = state;
        this.id_token = id_token;
    }
    AuthorizationResponse.prototype.toJson = function () {
        return { code: this.code, state: this.state, id_token: this.id_token };
    };
    AuthorizationResponse.fromJson = function (json) {
        return new AuthorizationResponse(json.code, json.state, json.id_token);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRob3JpemF0aW9uX3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBcUJIOzs7O0dBSUc7QUFDSDtJQUNFLCtCQUFtQixJQUFZLEVBQVMsS0FBYSxFQUFTLFFBQWdCO1FBQTNELFNBQUksR0FBSixJQUFJLENBQVE7UUFBUyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtJQUFHLENBQUM7SUFFbEYsc0NBQU0sR0FBTjtRQUNFLE9BQU8sRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFTSw4QkFBUSxHQUFmLFVBQWdCLElBQStCO1FBQzdDLE9BQU8sSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksc0RBQXFCO0FBWWxDOzs7O0dBSUc7QUFDSDtJQUNFLDRCQUNXLEtBQWEsRUFDYixnQkFBeUIsRUFDekIsUUFBaUIsRUFDakIsS0FBYztRQUhkLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVM7UUFDekIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixVQUFLLEdBQUwsS0FBSyxDQUFTO0lBQUcsQ0FBQztJQUU3QixtQ0FBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixpQkFBaUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3hDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEIsQ0FBQztJQUNKLENBQUM7SUFFTSwyQkFBUSxHQUFmLFVBQWdCLElBQTRCO1FBQzFDLE9BQU8sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbkJZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEF1dGhvcml6YXRpb25SZXNwb25zZSBhcyBhIEpTT04gb2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25SZXNwb25zZUpzb24ge1xuICBjb2RlOiBzdHJpbmc7XG4gIHN0YXRlOiBzdHJpbmc7XG4gIGlkX3Rva2VuOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgQXV0aG9yaXphdGlvbkVycm9yIGFzIGEgSlNPTiBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXphdGlvbkVycm9ySnNvbiB7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGVycm9yX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBlcnJvcl91cmk/OiBzdHJpbmc7XG4gIHN0YXRlPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEF1dGhvcml6YXRpb24gUmVzcG9uc2UgdHlwZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNC4xLjJcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25SZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb2RlOiBzdHJpbmcsIHB1YmxpYyBzdGF0ZTogc3RyaW5nLCBwdWJsaWMgaWRfdG9rZW46IHN0cmluZykge31cblxuICB0b0pzb24oKTogQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbiB7XG4gICAgcmV0dXJuIHtjb2RlOiB0aGlzLmNvZGUsIHN0YXRlOiB0aGlzLnN0YXRlLCBpZF90b2tlbjogdGhpcy5pZF90b2tlbn07XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oanNvbjogQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbik6IEF1dGhvcml6YXRpb25SZXNwb25zZSB7XG4gICAgcmV0dXJuIG5ldyBBdXRob3JpemF0aW9uUmVzcG9uc2UoanNvbi5jb2RlLCBqc29uLnN0YXRlLCBqc29uLmlkX3Rva2VuKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEF1dGhvcml6YXRpb24gZXJyb3IgcmVzcG9uc2UuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuMi4xXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBlcnJvcjogc3RyaW5nLFxuICAgICAgcHVibGljIGVycm9yRGVzY3JpcHRpb24/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgZXJyb3JVcmk/OiBzdHJpbmcsXG4gICAgICBwdWJsaWMgc3RhdGU/OiBzdHJpbmcpIHt9XG5cbiAgdG9Kc29uKCk6IEF1dGhvcml6YXRpb25FcnJvckpzb24ge1xuICAgIHJldHVybiB7XG4gICAgICBlcnJvcjogdGhpcy5lcnJvcixcbiAgICAgIGVycm9yX2Rlc2NyaXB0aW9uOiB0aGlzLmVycm9yRGVzY3JpcHRpb24sXG4gICAgICBlcnJvcl91cmk6IHRoaXMuZXJyb3JVcmksXG4gICAgICBzdGF0ZTogdGhpcy5zdGF0ZVxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZnJvbUpzb24oanNvbjogQXV0aG9yaXphdGlvbkVycm9ySnNvbik6IEF1dGhvcml6YXRpb25FcnJvciB7XG4gICAgcmV0dXJuIG5ldyBBdXRob3JpemF0aW9uRXJyb3IoanNvbi5lcnJvciwganNvbi5lcnJvcl9kZXNjcmlwdGlvbiwganNvbi5lcnJvcl91cmksIGpzb24uc3RhdGUpO1xuICB9XG59XG4iXX0=