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
var _1 = require(".");
var errors_1 = require("./errors");
var query_string_utils_1 = require("./query_string_utils");
var token_response_1 = require("./token_response");
/**
 * The default token request handler.
 */
var BaseTokenRequestHandler = /** @class */ (function () {
    function BaseTokenRequestHandler(requestor, utils) {
        if (requestor === void 0) { requestor = new _1.FetchRequestor(); }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVxdWVzdF9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Rva2VuX3JlcXVlc3RfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7QUFFSCxzQkFBaUM7QUFFakMsbUNBQXNDO0FBQ3RDLDJEQUE2RTtBQUc3RSxtREFBOEY7QUFtQjlGOztHQUVHO0FBQ0g7SUFDRSxpQ0FDb0IsU0FBMkMsRUFDM0MsS0FBcUQ7UUFEckQsMEJBQUEsRUFBQSxnQkFBMkIsaUJBQWMsRUFBRTtRQUMzQyxzQkFBQSxFQUFBLFlBQThCLDBDQUFxQixFQUFFO1FBRHJELGNBQVMsR0FBVCxTQUFTLENBQWtDO1FBQzNDLFVBQUssR0FBTCxLQUFLLENBQWdEO0lBQUcsQ0FBQztJQUVyRSxpREFBZSxHQUF2QixVQUF3QixRQUNjO1FBQ3BDLE9BQVEsUUFBMkIsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDO0lBQzFELENBQUM7SUFFRCwyREFBeUIsR0FBekIsVUFDSSxhQUFnRCxFQUNoRCxPQUEyQjtRQUM3QixJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFVO1lBQ3BELEdBQUcsRUFBRSxhQUFhLENBQUMsa0JBQWtCO1lBQ3JDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFLEVBQUMsY0FBYyxFQUFFLG1DQUFtQyxFQUFDO1lBQzlELElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbEQsQ0FBQyxDQUFDO1FBRUgsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ3RDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscURBQW1CLEdBQW5CLFVBQW9CLGFBQWdELEVBQUUsT0FBcUI7UUFBM0YsaUJBa0JDO1FBaEJDLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFtQztZQUN2RSxHQUFHLEVBQUUsYUFBYSxDQUFDLGFBQWE7WUFDaEMsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsTUFBTTtZQUNoQixPQUFPLEVBQUUsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUM7WUFDOUQsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsRCxDQUFDLENBQUM7UUFFSCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ2hDLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbEMsT0FBTyxJQUFJLDhCQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDcEM7aUJBQU07Z0JBQ0wsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUNqQixJQUFJLHFCQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLDJCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDO0FBNUNZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0ZldGNoUmVxdWVzdG9yfSBmcm9tICcuJztcbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7QXBwQXV0aEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQge0Jhc2ljUXVlcnlTdHJpbmdVdGlscywgUXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHtSZXZva2VUb2tlblJlcXVlc3R9IGZyb20gJy4vcmV2b2tlX3Rva2VuX3JlcXVlc3QnO1xuaW1wb3J0IHtUb2tlblJlcXVlc3R9IGZyb20gJy4vdG9rZW5fcmVxdWVzdCc7XG5pbXBvcnQge1Rva2VuRXJyb3IsIFRva2VuRXJyb3JKc29uLCBUb2tlblJlc3BvbnNlLCBUb2tlblJlc3BvbnNlSnNvbn0gZnJvbSAnLi90b2tlbl9yZXNwb25zZSc7XG5pbXBvcnQge1JlcXVlc3Rvcn0gZnJvbSAnLi94aHInO1xuXG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBpbnRlcmZhY2Ugd2hpY2ggY2FuIG1ha2UgYSB0b2tlbiByZXF1ZXN0LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRva2VuUmVxdWVzdEhhbmRsZXIge1xuICAvKipcbiAgICogUGVyZm9ybXMgdGhlIHRva2VuIHJlcXVlc3QsIGdpdmVuIHRoZSBzZXJ2aWNlIGNvbmZpZ3VyYXRpb24uXG4gICAqL1xuICBwZXJmb3JtVG9rZW5SZXF1ZXN0KGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbiwgcmVxdWVzdDogVG9rZW5SZXF1ZXN0KTpcbiAgICAgIFByb21pc2U8VG9rZW5SZXNwb25zZT47XG5cbiAgcGVyZm9ybVJldm9rZVRva2VuUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IFJldm9rZVRva2VuUmVxdWVzdCk6IFByb21pc2U8Ym9vbGVhbj47XG59XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgdG9rZW4gcmVxdWVzdCBoYW5kbGVyLlxuICovXG5leHBvcnQgY2xhc3MgQmFzZVRva2VuUmVxdWVzdEhhbmRsZXIgaW1wbGVtZW50cyBUb2tlblJlcXVlc3RIYW5kbGVyIHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwdWJsaWMgcmVhZG9ubHkgcmVxdWVzdG9yOiBSZXF1ZXN0b3IgPSBuZXcgRmV0Y2hSZXF1ZXN0b3IoKSxcbiAgICAgIHB1YmxpYyByZWFkb25seSB1dGlsczogUXVlcnlTdHJpbmdVdGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSkge31cblxuICBwcml2YXRlIGlzVG9rZW5SZXNwb25zZShyZXNwb25zZTogVG9rZW5SZXNwb25zZUpzb258XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFRva2VuRXJyb3JKc29uKTogcmVzcG9uc2UgaXMgVG9rZW5SZXNwb25zZUpzb24ge1xuICAgIHJldHVybiAocmVzcG9uc2UgYXMgVG9rZW5FcnJvckpzb24pLmVycm9yID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwZXJmb3JtUmV2b2tlVG9rZW5SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogUmV2b2tlVG9rZW5SZXF1ZXN0KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgbGV0IHJldm9rZVRva2VuUmVzcG9uc2UgPSB0aGlzLnJlcXVlc3Rvci54aHI8Ym9vbGVhbj4oe1xuICAgICAgdXJsOiBjb25maWd1cmF0aW9uLnJldm9jYXRpb25FbmRwb2ludCxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXG4gICAgICBkYXRhOiB0aGlzLnV0aWxzLnN0cmluZ2lmeShyZXF1ZXN0LnRvU3RyaW5nTWFwKCkpXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV2b2tlVG9rZW5SZXNwb25zZS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgcGVyZm9ybVRva2VuUmVxdWVzdChjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sIHJlcXVlc3Q6IFRva2VuUmVxdWVzdCk6XG4gICAgICBQcm9taXNlPFRva2VuUmVzcG9uc2U+IHtcbiAgICBsZXQgdG9rZW5SZXNwb25zZSA9IHRoaXMucmVxdWVzdG9yLnhocjxUb2tlblJlc3BvbnNlSnNvbnxUb2tlbkVycm9ySnNvbj4oe1xuICAgICAgdXJsOiBjb25maWd1cmF0aW9uLnRva2VuRW5kcG9pbnQsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsICAvLyBhZGRpbmcgaW1wbGljaXQgZGF0YVR5cGVcbiAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxuICAgICAgZGF0YTogdGhpcy51dGlscy5zdHJpbmdpZnkocmVxdWVzdC50b1N0cmluZ01hcCgpKVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRva2VuUmVzcG9uc2UudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1Rva2VuUmVzcG9uc2UocmVzcG9uc2UpKSB7XG4gICAgICAgIHJldHVybiBuZXcgVG9rZW5SZXNwb25zZShyZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Q8VG9rZW5SZXNwb25zZT4oXG4gICAgICAgICAgICBuZXcgQXBwQXV0aEVycm9yKHJlc3BvbnNlLmVycm9yLCBuZXcgVG9rZW5FcnJvcihyZXNwb25zZSkpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19