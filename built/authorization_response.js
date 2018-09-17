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
    function AuthorizationResponse(response) {
        this.code = response.code;
        this.state = response.state;
    }
    AuthorizationResponse.prototype.toJson = function () {
        return { code: this.code, state: this.state };
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
    function AuthorizationError(error) {
        this.error = error.error;
        this.errorDescription = error.error_description;
        this.errorUri = error.error_uri;
        this.state = error.state;
    }
    AuthorizationError.prototype.toJson = function () {
        return {
            error: this.error,
            error_description: this.errorDescription,
            error_uri: this.errorUri,
            state: this.state
        };
    };
    return AuthorizationError;
}());
exports.AuthorizationError = AuthorizationError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRob3JpemF0aW9uX3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBb0JIOzs7O0dBSUc7QUFDSDtJQUlFLCtCQUFZLFFBQW1DO1FBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7SUFDOUIsQ0FBQztJQUVELHNDQUFNLEdBQU47UUFDRSxPQUFPLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLHNEQUFxQjtBQWNsQzs7OztHQUlHO0FBQ0g7SUFNRSw0QkFBWSxLQUE2QjtRQUN2QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztRQUNoRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRCxtQ0FBTSxHQUFOO1FBQ0UsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixpQkFBaUIsRUFBRSxJQUFJLENBQUMsZ0JBQWdCO1lBQ3hDLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN4QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEIsQ0FBQztJQUNKLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7QUFyQlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgQXV0aG9yaXphdGlvblJlc3BvbnNlIGFzIGEgSlNPTiBvYmplY3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbiB7XG4gIGNvZGU6IHN0cmluZztcbiAgc3RhdGU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uRXJyb3IgYXMgYSBKU09OIG9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdXRob3JpemF0aW9uRXJyb3JKc29uIHtcbiAgZXJyb3I6IHN0cmluZztcbiAgZXJyb3JfZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGVycm9yX3VyaT86IHN0cmluZztcbiAgc3RhdGU/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgQXV0aG9yaXphdGlvbiBSZXNwb25zZSB0eXBlLlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdFxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuMlxuICovXG5leHBvcnQgY2xhc3MgQXV0aG9yaXphdGlvblJlc3BvbnNlIHtcbiAgY29kZTogc3RyaW5nO1xuICBzdGF0ZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHJlc3BvbnNlOiBBdXRob3JpemF0aW9uUmVzcG9uc2VKc29uKSB7XG4gICAgdGhpcy5jb2RlID0gcmVzcG9uc2UuY29kZTtcbiAgICB0aGlzLnN0YXRlID0gcmVzcG9uc2Uuc3RhdGU7XG4gIH1cblxuICB0b0pzb24oKTogQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbiB7XG4gICAgcmV0dXJuIHtjb2RlOiB0aGlzLmNvZGUsIHN0YXRlOiB0aGlzLnN0YXRlfTtcbiAgfVxufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEF1dGhvcml6YXRpb24gZXJyb3IgcmVzcG9uc2UuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0OlxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuMi4xXG4gKi9cbmV4cG9ydCBjbGFzcyBBdXRob3JpemF0aW9uRXJyb3Ige1xuICBlcnJvcjogc3RyaW5nO1xuICBlcnJvckRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBlcnJvclVyaT86IHN0cmluZztcbiAgc3RhdGU/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZXJyb3I6IEF1dGhvcml6YXRpb25FcnJvckpzb24pIHtcbiAgICB0aGlzLmVycm9yID0gZXJyb3IuZXJyb3I7XG4gICAgdGhpcy5lcnJvckRlc2NyaXB0aW9uID0gZXJyb3IuZXJyb3JfZGVzY3JpcHRpb247XG4gICAgdGhpcy5lcnJvclVyaSA9IGVycm9yLmVycm9yX3VyaTtcbiAgICB0aGlzLnN0YXRlID0gZXJyb3Iuc3RhdGU7XG4gIH1cblxuICB0b0pzb24oKTogQXV0aG9yaXphdGlvbkVycm9ySnNvbiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGVycm9yOiB0aGlzLmVycm9yLFxuICAgICAgZXJyb3JfZGVzY3JpcHRpb246IHRoaXMuZXJyb3JEZXNjcmlwdGlvbixcbiAgICAgIGVycm9yX3VyaTogdGhpcy5lcnJvclVyaSxcbiAgICAgIHN0YXRlOiB0aGlzLnN0YXRlXG4gICAgfTtcbiAgfVxufVxuIl19