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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVxdWVzdF9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Rva2VuX3JlcXVlc3RfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7QUFHSCxtQ0FBc0M7QUFDdEMsMkRBQTZFO0FBRzdFLG1EQUE4RjtBQUM5Riw2QkFBaUQ7QUFrQmpEOztHQUVHO0FBQ0g7SUFDRSxpQ0FDb0IsU0FBNEMsRUFDNUMsS0FBcUQ7UUFEckQsMEJBQUEsRUFBQSxnQkFBMkIscUJBQWUsRUFBRTtRQUM1QyxzQkFBQSxFQUFBLFlBQThCLDBDQUFxQixFQUFFO1FBRHJELGNBQVMsR0FBVCxTQUFTLENBQW1DO1FBQzVDLFVBQUssR0FBTCxLQUFLLENBQWdEO0lBQUcsQ0FBQztJQUVyRSxpREFBZSxHQUF2QixVQUF3QixRQUNjO1FBQ3BDLE9BQVEsUUFBMkIsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO0lBQzFELENBQUM7SUFFRCwyREFBeUIsR0FBekIsVUFDSSxhQUFnRCxFQUNoRCxPQUEyQjtRQUM3QixJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFVO1lBQ3BELEdBQUcsRUFBRSxhQUFhLENBQUMsa0JBQWtCO1lBQ3JDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFLEVBQUMsY0FBYyxFQUFFLG1DQUFtQyxFQUFDO1lBQzlELElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbEQsQ0FBQyxDQUFDO1FBRUgsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ3RDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscURBQW1CLEdBQW5CLFVBQW9CLGFBQWdELEVBQUUsT0FBcUI7UUFBM0YsaUJBa0JDO1FBaEJDLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFtQztZQUN2RSxHQUFHLEVBQUUsYUFBYSxDQUFDLGFBQWE7WUFDaEMsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsTUFBTTtZQUNoQixPQUFPLEVBQUUsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUM7WUFDOUQsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsRCxDQUFDLENBQUM7UUFFSCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ2hDLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbEMsT0FBTyxJQUFJLDhCQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0wsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUNqQixJQUFJLHFCQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLDJCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDO0FBNUNZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbic7XG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHtCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMsIFF1ZXJ5U3RyaW5nVXRpbHN9IGZyb20gJy4vcXVlcnlfc3RyaW5nX3V0aWxzJztcbmltcG9ydCB7UmV2b2tlVG9rZW5SZXF1ZXN0fSBmcm9tICcuL3Jldm9rZV90b2tlbl9yZXF1ZXN0JztcbmltcG9ydCB7VG9rZW5SZXF1ZXN0fSBmcm9tICcuL3Rva2VuX3JlcXVlc3QnO1xuaW1wb3J0IHtUb2tlbkVycm9yLCBUb2tlbkVycm9ySnNvbiwgVG9rZW5SZXNwb25zZSwgVG9rZW5SZXNwb25zZUpzb259IGZyb20gJy4vdG9rZW5fcmVzcG9uc2UnO1xuaW1wb3J0IHtKUXVlcnlSZXF1ZXN0b3IsIFJlcXVlc3Rvcn0gZnJvbSAnLi94aHInO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlcmZhY2Ugd2hpY2ggY2FuIG1ha2UgYSB0b2tlbiByZXF1ZXN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuUmVxdWVzdEhhbmRsZXIge1xuICAvKipcbiAgICogUGVyZm9ybXMgdGhlIHRva2VuIHJlcXVlc3QsIGdpdmVuIHRoZSBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24uXG4gICAqL1xuICBwZXJmb3JtVG9rZW5SZXF1ZXN0KGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbiwgcmVxdWVzdDogVG9rZW5SZXF1ZXN0KTpcbiAgICAgIFByb21pc2U8VG9rZW5SZXNwb25zZT47XG5cbiAgcGVyZm9ybVJldm9rZVRva2VuUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IFJldm9rZVRva2VuUmVxdWVzdCk6IFByb21pc2U8Ym9vbGVhbj47XG59XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgdG9rZW4gcmVxdWVzdCBoYW5kbGVyLlxuICovXG5leHBvcnQgY2xhc3MgQmFzZVRva2VuUmVxdWVzdEhhbmRsZXIgaW1wbGVtZW50cyBUb2tlblJlcXVlc3RIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgcmVxdWVzdG9yOiBSZXF1ZXN0b3IgPSBuZXcgSlF1ZXJ5UmVxdWVzdG9yKCksXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgdXRpbHM6IFF1ZXJ5U3RyaW5nVXRpbHMgPSBuZXcgQmFzaWNRdWVyeVN0cmluZ1V0aWxzKCkpIHt9XG5cbiAgcHJpdmF0ZSBpc1Rva2VuUmVzcG9uc2UocmVzcG9uc2U6IFRva2VuUmVzcG9uc2VKc29ufFxuICAgICAgICAgICAgICAgICAgICAgICAgICBUb2tlbkVycm9ySnNvbik6IHJlc3BvbnNlIGlzIFRva2VuUmVzcG9uc2VKc29uIHtcbiAgICByZXR1cm4gKHJlc3BvbnNlIGFzIFRva2VuRXJyb3JKc29uKS5lcnJvciA9PT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcGVyZm9ybVJldm9rZVRva2VuUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IFJldm9rZVRva2VuUmVxdWVzdCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGxldCByZXZva2VUb2tlblJlc3BvbnNlID0gdGhpcy5yZXF1ZXN0b3IueGhyPGJvb2xlYW4+KHtcbiAgICAgIHVybDogY29uZmlndXJhdGlvbi5yZXZvY2F0aW9uRW5kcG9pbnQsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxuICAgICAgZGF0YTogdGhpcy51dGlscy5zdHJpbmdpZnkocmVxdWVzdC50b1N0cmluZ01hcCgpKVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJldm9rZVRva2VuUmVzcG9uc2UudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHBlcmZvcm1Ub2tlblJlcXVlc3QoY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCByZXF1ZXN0OiBUb2tlblJlcXVlc3QpOlxuICAgICAgUHJvbWlzZTxUb2tlblJlc3BvbnNlPiB7XG4gICAgbGV0IHRva2VuUmVzcG9uc2UgPSB0aGlzLnJlcXVlc3Rvci54aHI8VG9rZW5SZXNwb25zZUpzb258VG9rZW5FcnJvckpzb24+KHtcbiAgICAgIHVybDogY29uZmlndXJhdGlvbi50b2tlbkVuZHBvaW50LFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLCAgLy8gYWRkaW5nIGltcGxpY2l0IGRhdGFUeXBlXG4gICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcbiAgICAgIGRhdGE6IHRoaXMudXRpbHMuc3RyaW5naWZ5KHJlcXVlc3QudG9TdHJpbmdNYXAoKSlcbiAgICB9KTtcblxuICAgIHJldHVybiB0b2tlblJlc3BvbnNlLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHRoaXMuaXNUb2tlblJlc3BvbnNlKHJlc3BvbnNlKSkge1xuICAgICAgICByZXR1cm4gbmV3IFRva2VuUmVzcG9uc2UocmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0PFRva2VuUmVzcG9uc2U+KFxuICAgICAgICAgICAgbmV3IEFwcEF1dGhFcnJvcihyZXNwb25zZS5lcnJvciwgbmV3IFRva2VuRXJyb3IocmVzcG9uc2UpKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==