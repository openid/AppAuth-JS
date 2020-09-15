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
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRequestor = exports.FetchRequestor = exports.JQueryRequestor = exports.Requestor = void 0;
var errors_1 = require("./errors");
/**
 * An class that abstracts away the ability to make an XMLHttpRequest.
 */
var Requestor = /** @class */ (function () {
    function Requestor() {
    }
    return Requestor;
}());
exports.Requestor = Requestor;
/**
 * Uses $.ajax to makes the Ajax requests.
 */
var JQueryRequestor = /** @class */ (function (_super) {
    __extends(JQueryRequestor, _super);
    function JQueryRequestor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JQueryRequestor.prototype.xhr = function (settings) {
        // NOTE: using jquery to make XHR's as whatwg-fetch requires
        // that I target ES6.
        var xhr = $.ajax(settings);
        return new Promise(function (resolve, reject) {
            xhr.then(function (data, textStatus, jqXhr) {
                resolve(data);
            }, function (jqXhr, textStatus, error) {
                reject(new errors_1.AppAuthError(error));
            });
        });
    };
    return JQueryRequestor;
}(Requestor));
exports.JQueryRequestor = JQueryRequestor;
/**
 * Uses fetch API to make Ajax requests
 */
var FetchRequestor = /** @class */ (function (_super) {
    __extends(FetchRequestor, _super);
    function FetchRequestor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FetchRequestor.prototype.xhr = function (settings) {
        if (!settings.url) {
            return Promise.reject(new errors_1.AppAuthError('A URL must be provided.'));
        }
        var url = new URL(settings.url);
        var requestInit = {};
        requestInit.method = settings.method;
        requestInit.mode = 'cors';
        if (settings.data) {
            if (settings.method && settings.method.toUpperCase() === 'POST') {
                requestInit.body = settings.data;
            }
            else {
                var searchParams = new URLSearchParams(settings.data);
                searchParams.forEach(function (value, key) {
                    url.searchParams.append(key, value);
                });
            }
        }
        // Set the request headers
        requestInit.headers = {};
        if (settings.headers) {
            for (var i in settings.headers) {
                if (settings.headers.hasOwnProperty(i)) {
                    requestInit.headers[i] = settings.headers[i];
                }
            }
        }
        var isJsonDataType = settings.dataType && settings.dataType.toLowerCase() === 'json';
        // Set 'Accept' header value for json requests (Taken from
        // https://github.com/jquery/jquery/blob/e0d941156900a6bff7c098c8ea7290528e468cf8/src/ajax.js#L644
        // )
        if (isJsonDataType) {
            requestInit.headers['Accept'] = 'application/json, text/javascript, */*; q=0.01';
        }
        return fetch(url.toString(), requestInit).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                var contentType = response.headers.get('content-type');
                if (isJsonDataType || (contentType && contentType.indexOf('application/json') !== -1)) {
                    return response.json();
                }
                else {
                    return response.text();
                }
            }
            else {
                return Promise.reject(new errors_1.AppAuthError(response.status.toString(), response.statusText));
            }
        });
    };
    return FetchRequestor;
}(Requestor));
exports.FetchRequestor = FetchRequestor;
/**
 * Should be used only in the context of testing. Just uses the underlying
 * Promise to mock the behavior of the Requestor.
 */
var TestRequestor = /** @class */ (function (_super) {
    __extends(TestRequestor, _super);
    function TestRequestor(promise) {
        var _this = _super.call(this) || this;
        _this.promise = promise;
        return _this;
    }
    TestRequestor.prototype.xhr = function (settings) {
        return this.promise; // unsafe cast
    };
    return TestRequestor;
}(Requestor));
exports.TestRequestor = TestRequestor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3hoci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUgsbUNBQXNDO0FBRXRDOztHQUVHO0FBQ0g7SUFBQTtJQUVBLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRnFCLDhCQUFTO0FBSS9COztHQUVHO0FBQ0g7SUFBcUMsbUNBQVM7SUFBOUM7O0lBZUEsQ0FBQztJQWRDLDZCQUFHLEdBQUgsVUFBTyxRQUE0QjtRQUNqQyw0REFBNEQ7UUFDNUQscUJBQXFCO1FBQ3JCLElBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLE9BQU8sQ0FBSSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQ0osVUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUs7Z0JBQ3RCLE9BQU8sQ0FBQyxJQUFTLENBQUMsQ0FBQztZQUNyQixDQUFDLEVBQ0QsVUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUs7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLHFCQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQWZELENBQXFDLFNBQVMsR0FlN0M7QUFmWSwwQ0FBZTtBQWtCNUI7O0dBRUc7QUFDSDtJQUFvQyxrQ0FBUztJQUE3Qzs7SUFxREEsQ0FBQztJQXBEQyw0QkFBRyxHQUFILFVBQU8sUUFBNEI7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDakIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUkscUJBQVksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7U0FDcEU7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QU8sQ0FBQyxDQUFFLGNBQWM7SUFDdEMsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQVBELENBQW1DLFNBQVMsR0FPM0M7QUFQWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtBcHBBdXRoRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcclxuXHJcbi8qKlxyXG4gKiBBbiBjbGFzcyB0aGF0IGFic3RyYWN0cyBhd2F5IHRoZSBhYmlsaXR5IHRvIG1ha2UgYW4gWE1MSHR0cFJlcXVlc3QuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVxdWVzdG9yIHtcclxuICBhYnN0cmFjdCB4aHI8VD4oc2V0dGluZ3M6IEpRdWVyeUFqYXhTZXR0aW5ncyk6IFByb21pc2U8VD47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVc2VzICQuYWpheCB0byBtYWtlcyB0aGUgQWpheCByZXF1ZXN0cy5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBKUXVlcnlSZXF1ZXN0b3IgZXh0ZW5kcyBSZXF1ZXN0b3Ige1xyXG4gIHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPiB7XHJcbiAgICAvLyBOT1RFOiB1c2luZyBqcXVlcnkgdG8gbWFrZSBYSFIncyBhcyB3aGF0d2ctZmV0Y2ggcmVxdWlyZXNcclxuICAgIC8vIHRoYXQgSSB0YXJnZXQgRVM2LlxyXG4gICAgY29uc3QgeGhyID0gJC5hamF4KHNldHRpbmdzKTtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHhoci50aGVuKFxyXG4gICAgICAgICAgKGRhdGEsIHRleHRTdGF0dXMsIGpxWGhyKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSBhcyBUKTtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoanFYaHIsIHRleHRTdGF0dXMsIGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChuZXcgQXBwQXV0aEVycm9yKGVycm9yKSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBVc2VzIGZldGNoIEFQSSB0byBtYWtlIEFqYXggcmVxdWVzdHNcclxuICovXHJcbmV4cG9ydCBjbGFzcyBGZXRjaFJlcXVlc3RvciBleHRlbmRzIFJlcXVlc3RvciB7XHJcbiAgeGhyPFQ+KHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+IHtcclxuICAgIGlmICghc2V0dGluZ3MudXJsKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgQXBwQXV0aEVycm9yKCdBIFVSTCBtdXN0IGJlIHByb3ZpZGVkLicpKTtcclxuICAgIH1cclxuICAgIGxldCB1cmw6IFVSTCA9IG5ldyBVUkwoPHN0cmluZz5zZXR0aW5ncy51cmwpO1xyXG4gICAgbGV0IHJlcXVlc3RJbml0OiBSZXF1ZXN0SW5pdCA9IHt9O1xyXG4gICAgcmVxdWVzdEluaXQubWV0aG9kID0gc2V0dGluZ3MubWV0aG9kO1xyXG4gICAgcmVxdWVzdEluaXQubW9kZSA9ICdjb3JzJztcclxuXHJcbiAgICBpZiAoc2V0dGluZ3MuZGF0YSkge1xyXG4gICAgICBpZiAoc2V0dGluZ3MubWV0aG9kICYmIHNldHRpbmdzLm1ldGhvZC50b1VwcGVyQ2FzZSgpID09PSAnUE9TVCcpIHtcclxuICAgICAgICByZXF1ZXN0SW5pdC5ib2R5ID0gPHN0cmluZz5zZXR0aW5ncy5kYXRhO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGxldCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHNldHRpbmdzLmRhdGEpO1xyXG4gICAgICAgIHNlYXJjaFBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PsKge1xyXG4gICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgaGVhZGVyc1xyXG4gICAgcmVxdWVzdEluaXQuaGVhZGVycyA9IHt9O1xyXG4gICAgaWYgKHNldHRpbmdzLmhlYWRlcnMpIHtcclxuICAgICAgZm9yIChsZXQgaSBpbiBzZXR0aW5ncy5oZWFkZXJzKSB7XHJcbiAgICAgICAgaWYgKHNldHRpbmdzLmhlYWRlcnMuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgIHJlcXVlc3RJbml0LmhlYWRlcnNbaV0gPSA8c3RyaW5nPnNldHRpbmdzLmhlYWRlcnNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaXNKc29uRGF0YVR5cGUgPSBzZXR0aW5ncy5kYXRhVHlwZSAmJiBzZXR0aW5ncy5kYXRhVHlwZS50b0xvd2VyQ2FzZSgpID09PSAnanNvbic7XHJcblxyXG4gICAgLy8gU2V0ICdBY2NlcHQnIGhlYWRlciB2YWx1ZSBmb3IganNvbiByZXF1ZXN0cyAoVGFrZW4gZnJvbVxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvYmxvYi9lMGQ5NDExNTY5MDBhNmJmZjdjMDk4YzhlYTcyOTA1MjhlNDY4Y2Y4L3NyYy9hamF4LmpzI0w2NDRcclxuICAgIC8vIClcclxuICAgIGlmIChpc0pzb25EYXRhVHlwZSkge1xyXG4gICAgICByZXF1ZXN0SW5pdC5oZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHQsICovKjsgcT0wLjAxJztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmV0Y2godXJsLnRvU3RyaW5nKCksIHJlcXVlc3RJbml0KS50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XHJcbiAgICAgICAgY29uc3QgY29udGVudFR5cGUgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJyk7XHJcbiAgICAgICAgaWYgKGlzSnNvbkRhdGFUeXBlIHx8IChjb250ZW50VHlwZSAmJiBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgIT09IC0xKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IocmVzcG9uc2Uuc3RhdHVzLnRvU3RyaW5nKCksIHJlc3BvbnNlLnN0YXR1c1RleHQpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogU2hvdWxkIGJlIHVzZWQgb25seSBpbiB0aGUgY29udGV4dCBvZiB0ZXN0aW5nLiBKdXN0IHVzZXMgdGhlIHVuZGVybHlpbmdcclxuICogUHJvbWlzZSB0byBtb2NrIHRoZSBiZWhhdmlvciBvZiB0aGUgUmVxdWVzdG9yLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRlc3RSZXF1ZXN0b3IgZXh0ZW5kcyBSZXF1ZXN0b3Ige1xyXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9taXNlOiBQcm9taXNlPGFueT4pIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG4gIHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPiB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9taXNlOyAgLy8gdW5zYWZlIGNhc3RcclxuICB9XHJcbn1cclxuIl19