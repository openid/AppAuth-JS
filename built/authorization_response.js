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
var AuthorizationResponse = (function () {
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
var AuthorizationError = (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRob3JpemF0aW9uX3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBb0JIOzs7O0dBSUc7QUFDSDtJQUNFLCtCQUFtQixJQUFZLEVBQVMsS0FBYTtRQUFsQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUFHLENBQUM7SUFFekQsc0NBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLDhCQUFRLEdBQWYsVUFBZ0IsSUFBK0I7UUFDN0MsTUFBTSxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSxzREFBcUI7QUFZbEM7Ozs7R0FJRztBQUNIO0lBQ0UsNEJBQ1csS0FBYSxFQUNiLGdCQUF5QixFQUN6QixRQUFpQixFQUNqQixLQUFjO1FBSGQsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUNiLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUztRQUN6QixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFVBQUssR0FBTCxLQUFLLENBQVM7SUFBRyxDQUFDO0lBRTdCLG1DQUFNLEdBQU47UUFDRSxNQUFNLENBQUM7WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN4QyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUM7SUFDSixDQUFDO0lBRU0sMkJBQVEsR0FBZixVQUFnQixJQUE0QjtRQUMxQyxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBbkJZLGdEQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEF1dGhvcml6YXRpb25SZXNwb25zZSBhcyBhIEpTT04gb2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25SZXNwb25zZUpzb24ge1xuICBjb2RlOiBzdHJpbmc7XG4gIHN0YXRlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgQXV0aG9yaXphdGlvbkVycm9yIGFzIGEgSlNPTiBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXphdGlvbkVycm9ySnNvbiB7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGVycm9yX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBlcnJvcl91cmk/OiBzdHJpbmc7XG4gIHN0YXRlPzogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEF1dGhvcml6YXRpb24gUmVzcG9uc2UgdHlwZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXRcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNC4xLjJcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25SZXNwb25zZSB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb2RlOiBzdHJpbmcsIHB1YmxpYyBzdGF0ZTogc3RyaW5nKSB7fVxuXG4gIHRvSnNvbigpOiBBdXRob3JpemF0aW9uUmVzcG9uc2VKc29uIHtcbiAgICByZXR1cm4ge2NvZGU6IHRoaXMuY29kZSwgc3RhdGU6IHRoaXMuc3RhdGV9O1xuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGpzb246IEF1dGhvcml6YXRpb25SZXNwb25zZUpzb24pOiBBdXRob3JpemF0aW9uUmVzcG9uc2Uge1xuICAgIHJldHVybiBuZXcgQXV0aG9yaXphdGlvblJlc3BvbnNlKGpzb24uY29kZSwganNvbi5zdGF0ZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uIGVycm9yIHJlc3BvbnNlLlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdDpcbiAqIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM2NzQ5I3NlY3Rpb24tNC4xLjIuMVxuICovXG5leHBvcnQgY2xhc3MgQXV0aG9yaXphdGlvbkVycm9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgZXJyb3I6IHN0cmluZyxcbiAgICAgIHB1YmxpYyBlcnJvckRlc2NyaXB0aW9uPzogc3RyaW5nLFxuICAgICAgcHVibGljIGVycm9yVXJpPzogc3RyaW5nLFxuICAgICAgcHVibGljIHN0YXRlPzogc3RyaW5nKSB7fVxuXG4gIHRvSnNvbigpOiBBdXRob3JpemF0aW9uRXJyb3JKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IHRoaXMuZXJyb3IsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjogdGhpcy5lcnJvckRlc2NyaXB0aW9uLFxuICAgICAgZXJyb3JfdXJpOiB0aGlzLmVycm9yVXJpLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGVcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGZyb21Kc29uKGpzb246IEF1dGhvcml6YXRpb25FcnJvckpzb24pOiBBdXRob3JpemF0aW9uRXJyb3Ige1xuICAgIHJldHVybiBuZXcgQXV0aG9yaXphdGlvbkVycm9yKGpzb24uZXJyb3IsIGpzb24uZXJyb3JfZGVzY3JpcHRpb24sIGpzb24uZXJyb3JfdXJpLCBqc29uLnN0YXRlKTtcbiAgfVxufVxuIl19