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
exports.EndSessionResponse = void 0;
var authorization_management_response_1 = require("./authorization_management_response");
/**
 * Represents the EndSession Response type.
 * For more information look at
 * http://openid.net/specs/openid-connect-session-1_0.html
 */
var EndSessionResponse = /** @class */ (function (_super) {
    __extends(EndSessionResponse, _super);
    function EndSessionResponse(response) {
        var _this = _super.call(this) || this;
        _this.state = response.state;
        return _this;
    }
    EndSessionResponse.prototype.toJson = function () {
        return { state: this.state };
    };
    return EndSessionResponse;
}(authorization_management_response_1.AuthorizationManagementResponse));
exports.EndSessionResponse = EndSessionResponse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5kX3Nlc3Npb25fcmVzcG9uc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZW5kX3Nlc3Npb25fcmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUgseUZBQW1GO0FBU25GOzs7O0dBSUc7QUFDSDtJQUF3QyxzQ0FBK0I7SUFHckUsNEJBQVksUUFBZ0M7UUFBNUMsWUFDRSxpQkFBTyxTQUVSO1FBREMsS0FBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDOztJQUM5QixDQUFDO0lBRUQsbUNBQU0sR0FBTjtRQUNFLE9BQU8sRUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDO0lBQzdCLENBQUM7SUFDSCx5QkFBQztBQUFELENBQUMsQUFYRCxDQUF3QyxtRUFBK0IsR0FXdEU7QUFYWSxnREFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtBdXRob3JpemF0aW9uTWFuYWdlbWVudFJlc3BvbnNlfSBmcm9tICcuL2F1dGhvcml6YXRpb25fbWFuYWdlbWVudF9yZXNwb25zZSdcblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBFbmRTZXNzaW9uUmVzcG9uc2UgYXMgYSBKU09OIG9iamVjdC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBFbmRTZXNzaW9uUmVzcG9uc2VKc29uIHtcbiAgc3RhdGU6IHN0cmluZztcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIHRoZSBFbmRTZXNzaW9uIFJlc3BvbnNlIHR5cGUuXG4gKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBsb29rIGF0XG4gKiBodHRwOi8vb3BlbmlkLm5ldC9zcGVjcy9vcGVuaWQtY29ubmVjdC1zZXNzaW9uLTFfMC5odG1sXG4gKi9cbmV4cG9ydCBjbGFzcyBFbmRTZXNzaW9uUmVzcG9uc2UgZXh0ZW5kcyBBdXRob3JpemF0aW9uTWFuYWdlbWVudFJlc3BvbnNlIHtcbiAgc3RhdGU6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcihyZXNwb25zZTogRW5kU2Vzc2lvblJlc3BvbnNlSnNvbikge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHJlc3BvbnNlLnN0YXRlO1xuICB9XG5cbiAgdG9Kc29uKCk6IEVuZFNlc3Npb25SZXNwb25zZUpzb24ge1xuICAgIHJldHVybiB7c3RhdGU6IHRoaXMuc3RhdGV9O1xuICB9XG59Il19