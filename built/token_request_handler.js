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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVxdWVzdF9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Rva2VuX3JlcXVlc3RfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUdILG1DQUFzQztBQUN0QywyREFBNkU7QUFHN0UsbURBQThGO0FBQzlGLDZCQUFpRDtBQWtCakQ7O0dBRUc7QUFDSDtJQUNFLGlDQUNvQixTQUE0QyxFQUM1QyxLQUFxRDtRQURyRCwwQkFBQSxFQUFBLGdCQUEyQixxQkFBZSxFQUFFO1FBQzVDLHNCQUFBLEVBQUEsWUFBOEIsMENBQXFCLEVBQUU7UUFEckQsY0FBUyxHQUFULFNBQVMsQ0FBbUM7UUFDNUMsVUFBSyxHQUFMLEtBQUssQ0FBZ0Q7SUFBRyxDQUFDO0lBRXJFLGlEQUFlLEdBQXZCLFVBQXdCLFFBQ2M7UUFDcEMsT0FBUSxRQUEyQixDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7SUFDMUQsQ0FBQztJQUVELDJEQUF5QixHQUF6QixVQUNJLGFBQWdELEVBQ2hELE9BQTJCO1FBQzdCLElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQVU7WUFDcEQsR0FBRyxFQUFFLGFBQWEsQ0FBQyxrQkFBa0I7WUFDckMsTUFBTSxFQUFFLE1BQU07WUFDZCxPQUFPLEVBQUUsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUM7WUFDOUQsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsRCxDQUFDLENBQUM7UUFFSCxPQUFPLG1CQUFtQixDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDdEMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxxREFBbUIsR0FBbkIsVUFBb0IsYUFBZ0QsRUFBRSxPQUFxQjtRQUEzRixpQkFrQkM7UUFoQkMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQW1DO1lBQ3ZFLEdBQUcsRUFBRSxhQUFhLENBQUMsYUFBYTtZQUNoQyxNQUFNLEVBQUUsTUFBTTtZQUNkLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLE9BQU8sRUFBRSxFQUFDLGNBQWMsRUFBRSxtQ0FBbUMsRUFBQztZQUM5RCxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2xELENBQUMsQ0FBQztRQUVILE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFBLFFBQVE7WUFDaEMsSUFBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNsQyxPQUFPLElBQUksOEJBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNwQztpQkFBTTtnQkFDTCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQ2pCLElBQUkscUJBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksMkJBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDakU7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCw4QkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0M7QUE1Q1ksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7QXBwQXV0aEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5pbXBvcnQge0Jhc2ljUXVlcnlTdHJpbmdVdGlscywgUXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHtSZXZva2VUb2tlblJlcXVlc3R9IGZyb20gJy4vcmV2b2tlX3Rva2VuX3JlcXVlc3QnO1xuaW1wb3J0IHtUb2tlblJlcXVlc3R9IGZyb20gJy4vdG9rZW5fcmVxdWVzdCc7XG5pbXBvcnQge1Rva2VuRXJyb3IsIFRva2VuRXJyb3JKc29uLCBUb2tlblJlc3BvbnNlLCBUb2tlblJlc3BvbnNlSnNvbn0gZnJvbSAnLi90b2tlbl9yZXNwb25zZSc7XG5pbXBvcnQge0pRdWVyeVJlcXVlc3RvciwgUmVxdWVzdG9yfSBmcm9tICcuL3hocic7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVyZmFjZSB3aGljaCBjYW4gbWFrZSBhIHRva2VuIHJlcXVlc3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5SZXF1ZXN0SGFuZGxlciB7XG4gIC8qKlxuICAgKiBQZXJmb3JtcyB0aGUgdG9rZW4gcmVxdWVzdCwgZ2l2ZW4gdGhlIHNlcnZpY2UgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIHBlcmZvcm1Ub2tlblJlcXVlc3QoY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCByZXF1ZXN0OiBUb2tlblJlcXVlc3QpOlxuICAgICAgUHJvbWlzZTxUb2tlblJlc3BvbnNlPjtcblxuICBwZXJmb3JtUmV2b2tlVG9rZW5SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogUmV2b2tlVG9rZW5SZXF1ZXN0KTogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuLyoqXG4gKiBUaGUgZGVmYXVsdCB0b2tlbiByZXF1ZXN0IGhhbmRsZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXNlVG9rZW5SZXF1ZXN0SGFuZGxlciBpbXBsZW1lbnRzIFRva2VuUmVxdWVzdEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSByZXF1ZXN0b3I6IFJlcXVlc3RvciA9IG5ldyBKUXVlcnlSZXF1ZXN0b3IoKSxcbiAgICAgIHB1YmxpYyByZWFkb25seSB1dGlsczogUXVlcnlTdHJpbmdVdGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSkge31cblxuICBwcml2YXRlIGlzVG9rZW5SZXNwb25zZShyZXNwb25zZTogVG9rZW5SZXNwb25zZUpzb258XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFRva2VuRXJyb3JKc29uKTogcmVzcG9uc2UgaXMgVG9rZW5SZXNwb25zZUpzb24ge1xuICAgIHJldHVybiAocmVzcG9uc2UgYXMgVG9rZW5FcnJvckpzb24pLmVycm9yID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwZXJmb3JtUmV2b2tlVG9rZW5SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogUmV2b2tlVG9rZW5SZXF1ZXN0KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgbGV0IHJldm9rZVRva2VuUmVzcG9uc2UgPSB0aGlzLnJlcXVlc3Rvci54aHI8Ym9vbGVhbj4oe1xuICAgICAgdXJsOiBjb25maWd1cmF0aW9uLnJldm9jYXRpb25FbmRwb2ludCxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXG4gICAgICBkYXRhOiB0aGlzLnV0aWxzLnN0cmluZ2lmeShyZXF1ZXN0LnRvU3RyaW5nTWFwKCkpXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV2b2tlVG9rZW5SZXNwb25zZS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgcGVyZm9ybVRva2VuUmVxdWVzdChjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sIHJlcXVlc3Q6IFRva2VuUmVxdWVzdCk6XG4gICAgICBQcm9taXNlPFRva2VuUmVzcG9uc2U+IHtcbiAgICBsZXQgdG9rZW5SZXNwb25zZSA9IHRoaXMucmVxdWVzdG9yLnhocjxUb2tlblJlc3BvbnNlSnNvbnxUb2tlbkVycm9ySnNvbj4oe1xuICAgICAgdXJsOiBjb25maWd1cmF0aW9uLnRva2VuRW5kcG9pbnQsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsICAvLyBhZGRpbmcgaW1wbGljaXQgZGF0YVR5cGVcbiAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxuICAgICAgZGF0YTogdGhpcy51dGlscy5zdHJpbmdpZnkocmVxdWVzdC50b1N0cmluZ01hcCgpKVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRva2VuUmVzcG9uc2UudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1Rva2VuUmVzcG9uc2UocmVzcG9uc2UpKSB7XG4gICAgICAgIHJldHVybiBuZXcgVG9rZW5SZXNwb25zZShyZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Q8VG9rZW5SZXNwb25zZT4oXG4gICAgICAgICAgICBuZXcgQXBwQXV0aEVycm9yKHJlc3BvbnNlLmVycm9yLCBuZXcgVG9rZW5FcnJvcihyZXNwb25zZSkpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl19