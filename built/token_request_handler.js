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
        var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        // TODO: client_secret_basic support
        /*if (request.needsAuthentication()) {
          headers['Authorization'] = request.getBasicAuthorizationHeader();
        }*/
        var revokeTokenResponse = this.requestor.xhr({
            url: configuration.revocationEndpoint,
            method: 'POST',
            dataType: 'json',
            headers: headers,
            data: this.utils.stringify(request.toStringMap())
        });
        return revokeTokenResponse
            .then(function (response) {
            return true;
        })
            .catch(function (response) {
            return Promise.reject(response);
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
        return tokenResponse
            .then(function (response) {
            if (_this.isTokenResponse(response)) {
                return token_response_1.TokenResponse.fromJson(response);
            }
            else {
                return Promise.reject(new errors_1.AppAuthError(response.error, token_response_1.TokenError.fromJson(response)));
            }
        })
            .catch(function (response) {
            return Promise.reject(new errors_1.AppAuthError(response.error, token_response_1.TokenError.fromJson(response)));
        });
    };
    return BaseTokenRequestHandler;
}());
exports.BaseTokenRequestHandler = BaseTokenRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVxdWVzdF9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Rva2VuX3JlcXVlc3RfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUdILG1DQUFzQztBQUV0QywyREFBNkU7QUFHN0UsbURBQThGO0FBRTlGLDZCQUFpRDtBQWtCakQ7O0dBRUc7QUFDSDtJQUNFLGlDQUNvQixTQUE0QyxFQUM1QyxLQUFxRDtRQURyRCwwQkFBQSxFQUFBLGdCQUEyQixxQkFBZSxFQUFFO1FBQzVDLHNCQUFBLEVBQUEsWUFBOEIsMENBQXFCLEVBQUU7UUFEckQsY0FBUyxHQUFULFNBQVMsQ0FBbUM7UUFDNUMsVUFBSyxHQUFMLEtBQUssQ0FBZ0Q7SUFBRyxDQUFDO0lBRXJFLGlEQUFlLEdBQXZCLFVBQXdCLFFBQ2M7UUFDcEMsTUFBTSxDQUFFLFFBQTJCLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsMkRBQXlCLEdBQXpCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBMkI7UUFDN0IsSUFBSSxPQUFPLEdBQWMsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUMsQ0FBQztRQUUvRSxvQ0FBb0M7UUFDcEM7O1dBRUc7UUFFSCxJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFNO1lBQ2hELEdBQUcsRUFBRSxhQUFhLENBQUMsa0JBQWtCO1lBQ3JDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLE1BQU07WUFDaEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsRCxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsbUJBQW1CO2FBQ3JCLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDWixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsUUFBUTtZQUNiLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVELHFEQUFtQixHQUFuQixVQUFvQixhQUFnRCxFQUFFLE9BQXFCO1FBQTNGLGlCQXVCQztRQXJCQyxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBbUM7WUFDdkUsR0FBRyxFQUFFLGFBQWEsQ0FBQyxhQUFhO1lBQ2hDLE1BQU0sRUFBRSxNQUFNO1lBQ2QsUUFBUSxFQUFFLE1BQU07WUFDaEIsT0FBTyxFQUFFLEVBQUMsY0FBYyxFQUFFLG1DQUFtQyxFQUFDO1lBQzlELElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDbEQsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLGFBQWE7YUFDZixJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ1osRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLE1BQU0sQ0FBQyw4QkFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQ2pCLElBQUkscUJBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLDJCQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RSxDQUFDO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUEsUUFBUTtZQUNiLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUNqQixJQUFJLHFCQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSwyQkFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBN0RELElBNkRDO0FBN0RZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbic7XG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4vbG9nZ2VyJztcbmltcG9ydCB7QmFzaWNRdWVyeVN0cmluZ1V0aWxzLCBRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuL3F1ZXJ5X3N0cmluZ191dGlscyc7XG5pbXBvcnQge1Jldm9rZVRva2VuUmVxdWVzdH0gZnJvbSAnLi9yZXZva2VfdG9rZW5fcmVxdWVzdCc7XG5pbXBvcnQge1Rva2VuUmVxdWVzdH0gZnJvbSAnLi90b2tlbl9yZXF1ZXN0JztcbmltcG9ydCB7VG9rZW5FcnJvciwgVG9rZW5FcnJvckpzb24sIFRva2VuUmVzcG9uc2UsIFRva2VuUmVzcG9uc2VKc29ufSBmcm9tICcuL3Rva2VuX3Jlc3BvbnNlJztcbmltcG9ydCB7U3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7SlF1ZXJ5UmVxdWVzdG9yLCBSZXF1ZXN0b3J9IGZyb20gJy4veGhyJztcblxuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW50ZXJmYWNlIHdoaWNoIGNhbiBtYWtlIGEgdG9rZW4gcmVxdWVzdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUb2tlblJlcXVlc3RIYW5kbGVyIHtcbiAgLyoqXG4gICAqIFBlcmZvcm1zIHRoZSB0b2tlbiByZXF1ZXN0LCBnaXZlbiB0aGUgc2VydmljZSBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgcGVyZm9ybVRva2VuUmVxdWVzdChjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sIHJlcXVlc3Q6IFRva2VuUmVxdWVzdCk6XG4gICAgICBQcm9taXNlPFRva2VuUmVzcG9uc2U+O1xuXG4gIHBlcmZvcm1SZXZva2VUb2tlblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBSZXZva2VUb2tlblJlcXVlc3QpOiBQcm9taXNlPGJvb2xlYW4+O1xufVxuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHRva2VuIHJlcXVlc3QgaGFuZGxlci5cbiAqL1xuZXhwb3J0IGNsYXNzIEJhc2VUb2tlblJlcXVlc3RIYW5kbGVyIGltcGxlbWVudHMgVG9rZW5SZXF1ZXN0SGFuZGxlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIHJlYWRvbmx5IHJlcXVlc3RvcjogUmVxdWVzdG9yID0gbmV3IEpRdWVyeVJlcXVlc3RvcigpLFxuICAgICAgcHVibGljIHJlYWRvbmx5IHV0aWxzOiBRdWVyeVN0cmluZ1V0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpKSB7fVxuXG4gIHByaXZhdGUgaXNUb2tlblJlc3BvbnNlKHJlc3BvbnNlOiBUb2tlblJlc3BvbnNlSnNvbnxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgVG9rZW5FcnJvckpzb24pOiByZXNwb25zZSBpcyBUb2tlblJlc3BvbnNlSnNvbiB7XG4gICAgcmV0dXJuIChyZXNwb25zZSBhcyBUb2tlbkVycm9ySnNvbikuZXJyb3IgPT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHBlcmZvcm1SZXZva2VUb2tlblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBSZXZva2VUb2tlblJlcXVlc3QpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBsZXQgaGVhZGVyczogU3RyaW5nTWFwID0geydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ307XG5cbiAgICAvLyBUT0RPOiBjbGllbnRfc2VjcmV0X2Jhc2ljIHN1cHBvcnRcbiAgICAvKmlmIChyZXF1ZXN0Lm5lZWRzQXV0aGVudGljYXRpb24oKSkge1xuICAgICAgaGVhZGVyc1snQXV0aG9yaXphdGlvbiddID0gcmVxdWVzdC5nZXRCYXNpY0F1dGhvcml6YXRpb25IZWFkZXIoKTtcbiAgICB9Ki9cblxuICAgIGxldCByZXZva2VUb2tlblJlc3BvbnNlID0gdGhpcy5yZXF1ZXN0b3IueGhyPGFueT4oe1xuICAgICAgdXJsOiBjb25maWd1cmF0aW9uLnJldm9jYXRpb25FbmRwb2ludCxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJywgIC8vIGFkZGluZyBpbXBsaWNpdCBkYXRhVHlwZVxuICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgIGRhdGE6IHRoaXMudXRpbHMuc3RyaW5naWZ5KHJlcXVlc3QudG9TdHJpbmdNYXAoKSlcbiAgICB9KTtcblxuICAgIHJldHVybiByZXZva2VUb2tlblJlc3BvbnNlXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIHBlcmZvcm1Ub2tlblJlcXVlc3QoY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCByZXF1ZXN0OiBUb2tlblJlcXVlc3QpOlxuICAgICAgUHJvbWlzZTxUb2tlblJlc3BvbnNlPiB7XG4gICAgbGV0IHRva2VuUmVzcG9uc2UgPSB0aGlzLnJlcXVlc3Rvci54aHI8VG9rZW5SZXNwb25zZUpzb258VG9rZW5FcnJvckpzb24+KHtcbiAgICAgIHVybDogY29uZmlndXJhdGlvbi50b2tlbkVuZHBvaW50LFxuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLCAgLy8gYWRkaW5nIGltcGxpY2l0IGRhdGFUeXBlXG4gICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnfSxcbiAgICAgIGRhdGE6IHRoaXMudXRpbHMuc3RyaW5naWZ5KHJlcXVlc3QudG9TdHJpbmdNYXAoKSlcbiAgICB9KTtcblxuICAgIHJldHVybiB0b2tlblJlc3BvbnNlXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICBpZiAodGhpcy5pc1Rva2VuUmVzcG9uc2UocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICByZXR1cm4gVG9rZW5SZXNwb25zZS5mcm9tSnNvbihyZXNwb25zZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdDxUb2tlblJlc3BvbnNlPihcbiAgICAgICAgICAgICAgICBuZXcgQXBwQXV0aEVycm9yKHJlc3BvbnNlLmVycm9yLCBUb2tlbkVycm9yLmZyb21Kc29uKHJlc3BvbnNlKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Q8VG9rZW5SZXNwb25zZT4oXG4gICAgICAgICAgICAgIG5ldyBBcHBBdXRoRXJyb3IocmVzcG9uc2UuZXJyb3IsIFRva2VuRXJyb3IuZnJvbUpzb24ocmVzcG9uc2UpKSk7XG4gICAgICAgIH0pO1xuICB9XG59XG4iXX0=