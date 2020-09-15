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
exports.BaseTokenRequestHandler = void 0;
var errors_1 = require("./errors");
var query_string_utils_1 = require("./query_string_utils");
var token_response_1 = require("./token_response");
var xhr_1 = require("./xhr");
/**
 * The default token request handler.
 */
var BaseTokenRequestHandler = /** @class */ (function () {
    function BaseTokenRequestHandler(requestor, utils) {
        if (requestor === void 0) { requestor = new xhr_1.JQueryRequestor(); }
        if (utils === void 0) { utils = new query_string_utils_1.BasicQueryStringUtils(); }
        this.requestor = requestor;
        this.utils = utils;
    }
    BaseTokenRequestHandler.prototype.isTokenResponse = function (response) {
        return response.error === undefined;
    };
    BaseTokenRequestHandler.prototype.performRevokeTokenRequest = function (configuration, request) {
        var revokeTokenResponse = this.requestor.xhr({
            url: configuration.revocationEndpoint,
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: this.utils.stringify(request.toStringMap())
        });
        return revokeTokenResponse.then(function (response) {
            return true;
        });
    };
    BaseTokenRequestHandler.prototype.performTokenRequest = function (configuration, request) {
        var _this = this;
        var tokenResponse = this.requestor.xhr({
            url: configuration.tokenEndpoint,
            method: 'POST',
            dataType: 'json',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: this.utils.stringify(request.toStringMap())
        });
        return tokenResponse.then(function (response) {
            if (_this.isTokenResponse(response)) {
                return new token_response_1.TokenResponse(response);
            }
            else {
                return Promise.reject(new errors_1.AppAuthError(response.error, new token_response_1.TokenError(response)));
            }
        });
    };
    return BaseTokenRequestHandler;
}());
exports.BaseTokenRequestHandler = BaseTokenRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVxdWVzdF9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Rva2VuX3JlcXVlc3RfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7QUFHSCxtQ0FBc0M7QUFDdEMsMkRBQTZFO0FBRzdFLG1EQUE4RjtBQUM5Riw2QkFBaUQ7QUFrQmpEOztHQUVHO0FBQ0g7SUFDRSxpQ0FDb0IsU0FBNEMsRUFDNUMsS0FBcUQ7UUFEckQsMEJBQUEsRUFBQSxnQkFBMkIscUJBQWUsRUFBRTtRQUM1QyxzQkFBQSxFQUFBLFlBQThCLDBDQUFxQixFQUFFO1FBRHJELGNBQVMsR0FBVCxTQUFTLENBQW1DO1FBQzVDLFVBQUssR0FBTCxLQUFLLENBQWdEO0lBQUcsQ0FBQztJQUVyRSxpREFBZSxHQUF2QixVQUF3QixRQUNjO1FBQ3BDLE9BQVEsUUFBMkIsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO0lBQzFELENBQUM7SUFFRCwyREFBeUIsR0FBekIsVUFDSSxhQUFnRCxFQUNoRCxPQUEyQjtRQUM3QixJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFVO1lBQ3BELEdBQUcsRUFBRSxhQUFhLENBQUMsa0JBQWtCO1lBQ3JDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFLEVBQUMsY0FBYyxFQUFFLG1DQUFtQyxFQUFDO1lBQzlELElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbEQsQ0FBQyxDQUFDO1FBRUgsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ3RDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscURBQW1CLEdBQW5CLFVBQW9CLGFBQWdELEVBQUUsT0FBcUI7UUFBM0YsaUJBa0JDO1FBaEJDLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFtQztZQUN2RSxHQUFHLEVBQUUsYUFBYSxDQUFDLGFBQWE7WUFDaEMsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsTUFBTTtZQUNoQixPQUFPLEVBQUUsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUM7WUFDOUQsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsRCxDQUFDLENBQUM7UUFFSCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ2hDLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbEMsT0FBTyxJQUFJLDhCQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0wsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUNqQixJQUFJLHFCQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLDJCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDO0FBNUNZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xyXG5pbXBvcnQge0Jhc2ljUXVlcnlTdHJpbmdVdGlscywgUXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xyXG5pbXBvcnQge1Jldm9rZVRva2VuUmVxdWVzdH0gZnJvbSAnLi9yZXZva2VfdG9rZW5fcmVxdWVzdCc7XHJcbmltcG9ydCB7VG9rZW5SZXF1ZXN0fSBmcm9tICcuL3Rva2VuX3JlcXVlc3QnO1xyXG5pbXBvcnQge1Rva2VuRXJyb3IsIFRva2VuRXJyb3JKc29uLCBUb2tlblJlc3BvbnNlLCBUb2tlblJlc3BvbnNlSnNvbn0gZnJvbSAnLi90b2tlbl9yZXNwb25zZSc7XHJcbmltcG9ydCB7SlF1ZXJ5UmVxdWVzdG9yLCBSZXF1ZXN0b3J9IGZyb20gJy4veGhyJztcclxuXHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhbiBpbnRlcmZhY2Ugd2hpY2ggY2FuIG1ha2UgYSB0b2tlbiByZXF1ZXN0LlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUb2tlblJlcXVlc3RIYW5kbGVyIHtcclxuICAvKipcclxuICAgKiBQZXJmb3JtcyB0aGUgdG9rZW4gcmVxdWVzdCwgZ2l2ZW4gdGhlIHNlcnZpY2UgY29uZmlndXJhdGlvbi5cclxuICAgKi9cclxuICBwZXJmb3JtVG9rZW5SZXF1ZXN0KGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbiwgcmVxdWVzdDogVG9rZW5SZXF1ZXN0KTpcclxuICAgICAgUHJvbWlzZTxUb2tlblJlc3BvbnNlPjtcclxuXHJcbiAgcGVyZm9ybVJldm9rZVRva2VuUmVxdWVzdChcclxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxyXG4gICAgICByZXF1ZXN0OiBSZXZva2VUb2tlblJlcXVlc3QpOiBQcm9taXNlPGJvb2xlYW4+O1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgdG9rZW4gcmVxdWVzdCBoYW5kbGVyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJhc2VUb2tlblJlcXVlc3RIYW5kbGVyIGltcGxlbWVudHMgVG9rZW5SZXF1ZXN0SGFuZGxlciB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICAgIHB1YmxpYyByZWFkb25seSByZXF1ZXN0b3I6IFJlcXVlc3RvciA9IG5ldyBKUXVlcnlSZXF1ZXN0b3IoKSxcclxuICAgICAgcHVibGljIHJlYWRvbmx5IHV0aWxzOiBRdWVyeVN0cmluZ1V0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpKSB7fVxyXG5cclxuICBwcml2YXRlIGlzVG9rZW5SZXNwb25zZShyZXNwb25zZTogVG9rZW5SZXNwb25zZUpzb258XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW5FcnJvckpzb24pOiByZXNwb25zZSBpcyBUb2tlblJlc3BvbnNlSnNvbiB7XHJcbiAgICByZXR1cm4gKHJlc3BvbnNlIGFzIFRva2VuRXJyb3JKc29uKS5lcnJvciA9PT0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgcGVyZm9ybVJldm9rZVRva2VuUmVxdWVzdChcclxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxyXG4gICAgICByZXF1ZXN0OiBSZXZva2VUb2tlblJlcXVlc3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgIGxldCByZXZva2VUb2tlblJlc3BvbnNlID0gdGhpcy5yZXF1ZXN0b3IueGhyPGJvb2xlYW4+KHtcclxuICAgICAgdXJsOiBjb25maWd1cmF0aW9uLnJldm9jYXRpb25FbmRwb2ludCxcclxuICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxyXG4gICAgICBkYXRhOiB0aGlzLnV0aWxzLnN0cmluZ2lmeShyZXF1ZXN0LnRvU3RyaW5nTWFwKCkpXHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gcmV2b2tlVG9rZW5SZXNwb25zZS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHBlcmZvcm1Ub2tlblJlcXVlc3QoY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCByZXF1ZXN0OiBUb2tlblJlcXVlc3QpOlxyXG4gICAgICBQcm9taXNlPFRva2VuUmVzcG9uc2U+IHtcclxuICAgIGxldCB0b2tlblJlc3BvbnNlID0gdGhpcy5yZXF1ZXN0b3IueGhyPFRva2VuUmVzcG9uc2VKc29ufFRva2VuRXJyb3JKc29uPih7XHJcbiAgICAgIHVybDogY29uZmlndXJhdGlvbi50b2tlbkVuZHBvaW50LFxyXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgZGF0YVR5cGU6ICdqc29uJywgIC8vIGFkZGluZyBpbXBsaWNpdCBkYXRhVHlwZVxyXG4gICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcclxuICAgICAgZGF0YTogdGhpcy51dGlscy5zdHJpbmdpZnkocmVxdWVzdC50b1N0cmluZ01hcCgpKVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRva2VuUmVzcG9uc2UudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLmlzVG9rZW5SZXNwb25zZShyZXNwb25zZSkpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRva2VuUmVzcG9uc2UocmVzcG9uc2UpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdDxUb2tlblJlc3BvbnNlPihcclxuICAgICAgICAgICAgbmV3IEFwcEF1dGhFcnJvcihyZXNwb25zZS5lcnJvciwgbmV3IFRva2VuRXJyb3IocmVzcG9uc2UpKSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=