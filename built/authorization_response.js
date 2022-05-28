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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationResponse = void 0;
var authorization_management_response_1 = require("./authorization_management_response");
/**
 * Represents the Authorization Response type.
 * For more information look at
 * https://tools.ietf.org/html/rfc6749#section-4.1.2
 */
var AuthorizationResponse = /** @class */ (function (_super) {
    __extends(AuthorizationResponse, _super);
    function AuthorizationResponse(response) {
        var _this = _super.call(this) || this;
        _this.code = response.code;
        _this.state = response.state;
        return _this;
    }
    AuthorizationResponse.prototype.toJson = function () {
        return { code: this.code, state: this.state };
    };
    return AuthorizationResponse;
}(authorization_management_response_1.AuthorizationManagementResponse));
exports.AuthorizationResponse = AuthorizationResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yaXphdGlvbl9yZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hdXRob3JpemF0aW9uX3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILHlGQUFtRjtBQVVuRjs7OztHQUlHO0FBQ0g7SUFBMkMseUNBQStCO0lBSXhFLCtCQUFZLFFBQW1DO1FBQS9DLFlBQ0UsaUJBQU8sU0FHUjtRQUZDLEtBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUMxQixLQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7O0lBQzlCLENBQUM7SUFFRCxzQ0FBTSxHQUFOO1FBQ0UsT0FBTyxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQWJELENBQTJDLG1FQUErQixHQWF6RTtBQWJZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0F1dGhvcml6YXRpb25NYW5hZ2VtZW50UmVzcG9uc2V9IGZyb20gJy4vYXV0aG9yaXphdGlvbl9tYW5hZ2VtZW50X3Jlc3BvbnNlJ1xuXG4vKipcbiAqIFJlcHJlc2VudHMgdGhlIEF1dGhvcml6YXRpb25SZXNwb25zZSBhcyBhIEpTT04gb2JqZWN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEF1dGhvcml6YXRpb25SZXNwb25zZUpzb24ge1xuICBjb2RlOiBzdHJpbmc7XG4gIHN0YXRlOiBzdHJpbmc7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgQXV0aG9yaXphdGlvbiBSZXNwb25zZSB0eXBlLlxuICogRm9yIG1vcmUgaW5mb3JtYXRpb24gbG9vayBhdFxuICogaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzY3NDkjc2VjdGlvbi00LjEuMlxuICovXG5leHBvcnQgY2xhc3MgQXV0aG9yaXphdGlvblJlc3BvbnNlIGV4dGVuZHMgQXV0aG9yaXphdGlvbk1hbmFnZW1lbnRSZXNwb25zZSB7XG4gIGNvZGU6IHN0cmluZztcbiAgc3RhdGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihyZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jb2RlID0gcmVzcG9uc2UuY29kZTtcbiAgICB0aGlzLnN0YXRlID0gcmVzcG9uc2Uuc3RhdGU7XG4gIH1cblxuICB0b0pzb24oKTogQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbiB7XG4gICAgcmV0dXJuIHtjb2RlOiB0aGlzLmNvZGUsIHN0YXRlOiB0aGlzLnN0YXRlfTtcbiAgfVxufSJdfQ==