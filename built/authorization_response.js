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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRob3JpemF0aW9uX3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBb0JIOzs7O0dBSUc7QUFDSDtJQUNFLCtCQUFtQixJQUFZLEVBQVMsS0FBYTtRQUFsQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBUTtJQUFHLENBQUM7SUFFekQsc0NBQU0sR0FBTjtRQUNFLE9BQU8sRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDO0lBQzlDLENBQUM7SUFFTSw4QkFBUSxHQUFmLFVBQWdCLElBQStCO1FBQzdDLE9BQU8sSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLHNEQUFxQjtBQVlsQzs7OztHQUlHO0FBQ0g7SUFDRSw0QkFDVyxLQUFhLEVBQ2IsZ0JBQXlCLEVBQ3pCLFFBQWlCLEVBQ2pCLEtBQWM7UUFIZCxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFTO1FBQ3pCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsVUFBSyxHQUFMLEtBQUssQ0FBUztJQUFHLENBQUM7SUFFN0IsbUNBQU0sR0FBTjtRQUNFLE9BQU87WUFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtZQUN4QyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1NBQ2xCLENBQUM7SUFDSixDQUFDO0lBRU0sMkJBQVEsR0FBZixVQUFnQixJQUE0QjtRQUMxQyxPQUFPLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQztBQW5CWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uUmVzcG9uc2UgYXMgYSBKU09OIG9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdXRob3JpemF0aW9uUmVzcG9uc2VKc29uIHtcbiAgY29kZTogc3RyaW5nO1xuICBzdGF0ZTogc3RyaW5nO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEF1dGhvcml6YXRpb25FcnJvciBhcyBhIEpTT04gb2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25FcnJvckpzb24ge1xuICBlcnJvcjogc3RyaW5nO1xuICBlcnJvcl9kZXNjcmlwdGlvbj86IHN0cmluZztcbiAgZXJyb3JfdXJpPzogc3RyaW5nO1xuICBzdGF0ZT86IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uIFJlc3BvbnNlIHR5cGUuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTQuMS4yXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uUmVzcG9uc2Uge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgY29kZTogc3RyaW5nLCBwdWJsaWMgc3RhdGU6IHN0cmluZykge31cblxuICB0b0pzb24oKTogQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbiB7XG4gICAgcmV0dXJuIHtjb2RlOiB0aGlzLmNvZGUsIHN0YXRlOiB0aGlzLnN0YXRlfTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihqc29uOiBBdXRob3JpemF0aW9uUmVzcG9uc2VKc29uKTogQXV0aG9yaXphdGlvblJlc3BvbnNlIHtcbiAgICByZXR1cm4gbmV3IEF1dGhvcml6YXRpb25SZXNwb25zZShqc29uLmNvZGUsIGpzb24uc3RhdGUpO1xuICB9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgQXV0aG9yaXphdGlvbiBlcnJvciByZXNwb25zZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTQuMS4yLjFcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25FcnJvciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGVycm9yOiBzdHJpbmcsXG4gICAgICBwdWJsaWMgZXJyb3JEZXNjcmlwdGlvbj86IHN0cmluZyxcbiAgICAgIHB1YmxpYyBlcnJvclVyaT86IHN0cmluZyxcbiAgICAgIHB1YmxpYyBzdGF0ZT86IHN0cmluZykge31cblxuICB0b0pzb24oKTogQXV0aG9yaXphdGlvbkVycm9ySnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiB0aGlzLmVycm9yLFxuICAgICAgZXJyb3JfZGVzY3JpcHRpb246IHRoaXMuZXJyb3JEZXNjcmlwdGlvbixcbiAgICAgIGVycm9yX3VyaTogdGhpcy5lcnJvclVyaSxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tSnNvbihqc29uOiBBdXRob3JpemF0aW9uRXJyb3JKc29uKTogQXV0aG9yaXphdGlvbkVycm9yIHtcbiAgICByZXR1cm4gbmV3IEF1dGhvcml6YXRpb25FcnJvcihqc29uLmVycm9yLCBqc29uLmVycm9yX2Rlc2NyaXB0aW9uLCBqc29uLmVycm9yX3VyaSwganNvbi5zdGF0ZSk7XG4gIH1cbn1cbiJdfQ==