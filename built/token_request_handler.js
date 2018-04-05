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
            dataType: 'json',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            data: request.toJson()
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
                return token_response_1.TokenResponse.fromJson(response);
            }
            else {
                return Promise.reject(new errors_1.AppAuthError(response.error, token_response_1.TokenError.fromJson(response)));
            }
        });
    };
    return BaseTokenRequestHandler;
}());
exports.BaseTokenRequestHandler = BaseTokenRequestHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fcmVxdWVzdF9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Rva2VuX3JlcXVlc3RfaGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUdILG1DQUFzQztBQUV0QywyREFBNkU7QUFHN0UsbURBQThGO0FBRTlGLDZCQUFpRDtBQWtCakQ7O0dBRUc7QUFDSDtJQUNFLGlDQUNvQixTQUE0QyxFQUM1QyxLQUFxRDtRQURyRCwwQkFBQSxFQUFBLGdCQUEyQixxQkFBZSxFQUFFO1FBQzVDLHNCQUFBLEVBQUEsWUFBOEIsMENBQXFCLEVBQUU7UUFEckQsY0FBUyxHQUFULFNBQVMsQ0FBbUM7UUFDNUMsVUFBSyxHQUFMLEtBQUssQ0FBZ0Q7SUFBRyxDQUFDO0lBRXJFLGlEQUFlLEdBQXZCLFVBQXdCLFFBQ2M7UUFDcEMsT0FBUSxRQUEyQixDQUFDLEtBQUssS0FBSyxTQUFTLENBQUM7SUFDMUQsQ0FBQztJQUVELDJEQUF5QixHQUF6QixVQUNJLGFBQWdELEVBQ2hELE9BQTJCO1FBQzdCLElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQVU7WUFDcEQsR0FBRyxFQUFFLGFBQWEsQ0FBQyxrQkFBa0I7WUFDckMsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsTUFBTTtZQUNoQixPQUFPLEVBQUUsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUM7WUFDOUQsSUFBSSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUU7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ3RDLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQscURBQW1CLEdBQW5CLFVBQW9CLGFBQWdELEVBQUUsT0FBcUI7UUFBM0YsaUJBa0JDO1FBaEJDLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFtQztZQUN2RSxHQUFHLEVBQUUsYUFBYSxDQUFDLGFBQWE7WUFDaEMsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsTUFBTTtZQUNoQixPQUFPLEVBQUUsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUM7WUFDOUQsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNsRCxDQUFDLENBQUM7UUFFSCxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBQSxRQUFRO1lBQ2hDLElBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDbEMsT0FBTyw4QkFBYSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUN6QztpQkFBTTtnQkFDTCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQ2pCLElBQUkscUJBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLDJCQUFVLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0RTtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILDhCQUFDO0FBQUQsQ0FBQyxBQTdDRCxJQTZDQztBQTdDWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb259IGZyb20gJy4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtBcHBBdXRoRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcbmltcG9ydCB7bG9nfSBmcm9tICcuL2xvZ2dlcic7XG5pbXBvcnQge0Jhc2ljUXVlcnlTdHJpbmdVdGlscywgUXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHtSZXZva2VUb2tlblJlcXVlc3R9IGZyb20gJy4vcmV2b2tlX3Rva2VuX3JlcXVlc3QnO1xuaW1wb3J0IHtUb2tlblJlcXVlc3R9IGZyb20gJy4vdG9rZW5fcmVxdWVzdCc7XG5pbXBvcnQge1Rva2VuRXJyb3IsIFRva2VuRXJyb3JKc29uLCBUb2tlblJlc3BvbnNlLCBUb2tlblJlc3BvbnNlSnNvbn0gZnJvbSAnLi90b2tlbl9yZXNwb25zZSc7XG5pbXBvcnQge1N0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQge0pRdWVyeVJlcXVlc3RvciwgUmVxdWVzdG9yfSBmcm9tICcuL3hocic7XG5cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGludGVyZmFjZSB3aGljaCBjYW4gbWFrZSBhIHRva2VuIHJlcXVlc3QuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVG9rZW5SZXF1ZXN0SGFuZGxlciB7XG4gIC8qKlxuICAgKiBQZXJmb3JtcyB0aGUgdG9rZW4gcmVxdWVzdCwgZ2l2ZW4gdGhlIHNlcnZpY2UgY29uZmlndXJhdGlvbi5cbiAgICovXG4gIHBlcmZvcm1Ub2tlblJlcXVlc3QoY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCByZXF1ZXN0OiBUb2tlblJlcXVlc3QpOlxuICAgICAgUHJvbWlzZTxUb2tlblJlc3BvbnNlPjtcblxuICBwZXJmb3JtUmV2b2tlVG9rZW5SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogUmV2b2tlVG9rZW5SZXF1ZXN0KTogUHJvbWlzZTxib29sZWFuPjtcbn1cblxuLyoqXG4gKiBUaGUgZGVmYXVsdCB0b2tlbiByZXF1ZXN0IGhhbmRsZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXNlVG9rZW5SZXF1ZXN0SGFuZGxlciBpbXBsZW1lbnRzIFRva2VuUmVxdWVzdEhhbmRsZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyByZWFkb25seSByZXF1ZXN0b3I6IFJlcXVlc3RvciA9IG5ldyBKUXVlcnlSZXF1ZXN0b3IoKSxcbiAgICAgIHB1YmxpYyByZWFkb25seSB1dGlsczogUXVlcnlTdHJpbmdVdGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSkge31cblxuICBwcml2YXRlIGlzVG9rZW5SZXNwb25zZShyZXNwb25zZTogVG9rZW5SZXNwb25zZUpzb258XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFRva2VuRXJyb3JKc29uKTogcmVzcG9uc2UgaXMgVG9rZW5SZXNwb25zZUpzb24ge1xuICAgIHJldHVybiAocmVzcG9uc2UgYXMgVG9rZW5FcnJvckpzb24pLmVycm9yID09PSB1bmRlZmluZWQ7XG4gIH1cblxuICBwZXJmb3JtUmV2b2tlVG9rZW5SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogUmV2b2tlVG9rZW5SZXF1ZXN0KTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgbGV0IHJldm9rZVRva2VuUmVzcG9uc2UgPSB0aGlzLnJlcXVlc3Rvci54aHI8Ym9vbGVhbj4oe1xuICAgICAgdXJsOiBjb25maWd1cmF0aW9uLnJldm9jYXRpb25FbmRwb2ludCxcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJywgIC8vIGFkZGluZyBpbXBsaWNpdCBkYXRhVHlwZVxuICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ30sXG4gICAgICBkYXRhOiByZXF1ZXN0LnRvSnNvbigpXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmV2b2tlVG9rZW5SZXNwb25zZS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgcGVyZm9ybVRva2VuUmVxdWVzdChjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sIHJlcXVlc3Q6IFRva2VuUmVxdWVzdCk6XG4gICAgICBQcm9taXNlPFRva2VuUmVzcG9uc2U+IHtcbiAgICBsZXQgdG9rZW5SZXNwb25zZSA9IHRoaXMucmVxdWVzdG9yLnhocjxUb2tlblJlc3BvbnNlSnNvbnxUb2tlbkVycm9ySnNvbj4oe1xuICAgICAgdXJsOiBjb25maWd1cmF0aW9uLnRva2VuRW5kcG9pbnQsXG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsICAvLyBhZGRpbmcgaW1wbGljaXQgZGF0YVR5cGVcbiAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCd9LFxuICAgICAgZGF0YTogdGhpcy51dGlscy5zdHJpbmdpZnkocmVxdWVzdC50b1N0cmluZ01hcCgpKVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRva2VuUmVzcG9uc2UudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICBpZiAodGhpcy5pc1Rva2VuUmVzcG9uc2UocmVzcG9uc2UpKSB7XG4gICAgICAgIHJldHVybiBUb2tlblJlc3BvbnNlLmZyb21Kc29uKHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdDxUb2tlblJlc3BvbnNlPihcbiAgICAgICAgICAgIG5ldyBBcHBBdXRoRXJyb3IocmVzcG9uc2UuZXJyb3IsIFRva2VuRXJyb3IuZnJvbUpzb24ocmVzcG9uc2UpKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==