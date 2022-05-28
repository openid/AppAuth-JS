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
exports.AuthorizationError = exports.AuthorizationManagementResponse = void 0;
var AuthorizationManagementResponse = /** @class */ (function () {
    function AuthorizationManagementResponse() {
    }
    return AuthorizationManagementResponse;
}());
exports.AuthorizationManagementResponse = AuthorizationManagementResponse;
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
            state: this.state,
        };
    };
    return AuthorizationError;
}());
exports.AuthorizationError = AuthorizationError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9tYW5hZ2VtZW50X3Jlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F1dGhvcml6YXRpb25fbWFuYWdlbWVudF9yZXNwb25zZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7QUFZSDtJQUFBO0lBR0EsQ0FBQztJQUFELHNDQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIcUIsMEVBQStCO0FBS3JEOzs7O0dBSUc7QUFDSDtJQU1FLDRCQUFZLEtBQTZCO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDM0IsQ0FBQztJQUVELG1DQUFNLEdBQU47UUFDRSxPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDeEMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3hCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztTQUNsQixDQUFDO0lBQ0osQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQXJCWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBBdXRob3JpemF0aW9uRXJyb3IgYXMgYSBKU09OIG9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBdXRob3JpemF0aW9uRXJyb3JKc29uIHtcbiAgZXJyb3I6IHN0cmluZztcbiAgZXJyb3JfZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGVycm9yX3VyaT86IHN0cmluZztcbiAgc3RhdGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBdXRob3JpemF0aW9uTWFuYWdlbWVudFJlc3BvbnNlIHtcbiAgYWJzdHJhY3Qgc3RhdGU6IHN0cmluZztcbiAgcHVibGljIGFic3RyYWN0IHRvSnNvbigpOiBvYmplY3Q7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgQXV0aG9yaXphdGlvbiBlcnJvciByZXNwb25zZS5cbiAqIEZvciBtb3JlIGluZm9ybWF0aW9uIGxvb2sgYXQ6XG4gKiBodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjNjc0OSNzZWN0aW9uLTQuMS4yLjFcbiAqL1xuZXhwb3J0IGNsYXNzIEF1dGhvcml6YXRpb25FcnJvciB7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGVycm9yRGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGVycm9yVXJpPzogc3RyaW5nO1xuICBzdGF0ZT86IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihlcnJvcjogQXV0aG9yaXphdGlvbkVycm9ySnNvbikge1xuICAgIHRoaXMuZXJyb3IgPSBlcnJvci5lcnJvcjtcbiAgICB0aGlzLmVycm9yRGVzY3JpcHRpb24gPSBlcnJvci5lcnJvcl9kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmVycm9yVXJpID0gZXJyb3IuZXJyb3JfdXJpO1xuICAgIHRoaXMuc3RhdGUgPSBlcnJvci5zdGF0ZTtcbiAgfVxuXG4gIHRvSnNvbigpOiBBdXRob3JpemF0aW9uRXJyb3JKc29uIHtcbiAgICByZXR1cm4ge1xuICAgICAgZXJyb3I6IHRoaXMuZXJyb3IsXG4gICAgICBlcnJvcl9kZXNjcmlwdGlvbjogdGhpcy5lcnJvckRlc2NyaXB0aW9uLFxuICAgICAgZXJyb3JfdXJpOiB0aGlzLmVycm9yVXJpLFxuICAgICAgc3RhdGU6IHRoaXMuc3RhdGUsXG4gICAgfTtcbiAgfVxufVxuIl19