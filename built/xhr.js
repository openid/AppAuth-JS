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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3hoci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUgsbUNBQXNDO0FBRXRDOztHQUVHO0FBQ0g7SUFBQTtJQUVBLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRnFCLDhCQUFTO0FBSS9COztHQUVHO0FBQ0g7SUFBcUMsbUNBQVM7SUFBOUM7O0lBZUEsQ0FBQztJQWRDLDZCQUFHLEdBQUgsVUFBTyxRQUE0QjtRQUNqQyw0REFBNEQ7UUFDNUQscUJBQXFCO1FBQ3JCLElBQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0IsT0FBTyxJQUFJLE9BQU8sQ0FBSSxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQ0osVUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUs7Z0JBQ3RCLE9BQU8sQ0FBQyxJQUFTLENBQUMsQ0FBQztZQUNyQixDQUFDLEVBQ0QsVUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUs7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLHFCQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQWZELENBQXFDLFNBQVMsR0FlN0M7QUFmWSwwQ0FBZTtBQWtCNUI7O0dBRUc7QUFDSDtJQUFvQyxrQ0FBUztJQUE3Qzs7SUFxREEsQ0FBQztJQXBEQyw0QkFBRyxHQUFILFVBQU8sUUFBNEI7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUU7WUFDakIsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUkscUJBQVksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7U0FDcEU7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QU8sQ0FBQyxDQUFFLGNBQWM7SUFDdEMsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQVBELENBQW1DLFNBQVMsR0FPM0M7QUFQWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vKipcbiAqIEFuIGNsYXNzIHRoYXQgYWJzdHJhY3RzIGF3YXkgdGhlIGFiaWxpdHkgdG8gbWFrZSBhbiBYTUxIdHRwUmVxdWVzdC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlcXVlc3RvciB7XG4gIGFic3RyYWN0IHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPjtcbn1cblxuLyoqXG4gKiBVc2VzICQuYWpheCB0byBtYWtlcyB0aGUgQWpheCByZXF1ZXN0cy5cbiAqL1xuZXhwb3J0IGNsYXNzIEpRdWVyeVJlcXVlc3RvciBleHRlbmRzIFJlcXVlc3RvciB7XG4gIHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPiB7XG4gICAgLy8gTk9URTogdXNpbmcganF1ZXJ5IHRvIG1ha2UgWEhSJ3MgYXMgd2hhdHdnLWZldGNoIHJlcXVpcmVzXG4gICAgLy8gdGhhdCBJIHRhcmdldCBFUzYuXG4gICAgY29uc3QgeGhyID0gJC5hamF4KHNldHRpbmdzKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgeGhyLnRoZW4oXG4gICAgICAgICAgKGRhdGEsIHRleHRTdGF0dXMsIGpxWGhyKSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKGRhdGEgYXMgVCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoanFYaHIsIHRleHRTdGF0dXMsIGVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QobmV3IEFwcEF1dGhFcnJvcihlcnJvcikpO1xuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cblxuLyoqXG4gKiBVc2VzIGZldGNoIEFQSSB0byBtYWtlIEFqYXggcmVxdWVzdHNcbiAqL1xuZXhwb3J0IGNsYXNzIEZldGNoUmVxdWVzdG9yIGV4dGVuZHMgUmVxdWVzdG9yIHtcbiAgeGhyPFQ+KHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+IHtcbiAgICBpZiAoIXNldHRpbmdzLnVybCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IoJ0EgVVJMIG11c3QgYmUgcHJvdmlkZWQuJykpO1xuICAgIH1cbiAgICBsZXQgdXJsOiBVUkwgPSBuZXcgVVJMKDxzdHJpbmc+c2V0dGluZ3MudXJsKTtcbiAgICBsZXQgcmVxdWVzdEluaXQ6IFJlcXVlc3RJbml0ID0ge307XG4gICAgcmVxdWVzdEluaXQubWV0aG9kID0gc2V0dGluZ3MubWV0aG9kO1xuICAgIHJlcXVlc3RJbml0Lm1vZGUgPSAnY29ycyc7XG5cbiAgICBpZiAoc2V0dGluZ3MuZGF0YSkge1xuICAgICAgaWYgKHNldHRpbmdzLm1ldGhvZCAmJiBzZXR0aW5ncy5tZXRob2QudG9VcHBlckNhc2UoKSA9PT0gJ1BPU1QnKSB7XG4gICAgICAgIHJlcXVlc3RJbml0LmJvZHkgPSA8c3RyaW5nPnNldHRpbmdzLmRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgc2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyhzZXR0aW5ncy5kYXRhKTtcbiAgICAgICAgc2VhcmNoUGFyYW1zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+wqB7XG4gICAgICAgICAgdXJsLnNlYXJjaFBhcmFtcy5hcHBlbmQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCBoZWFkZXJzXG4gICAgcmVxdWVzdEluaXQuaGVhZGVycyA9IHt9O1xuICAgIGlmIChzZXR0aW5ncy5oZWFkZXJzKSB7XG4gICAgICBmb3IgKGxldCBpIGluIHNldHRpbmdzLmhlYWRlcnMpIHtcbiAgICAgICAgaWYgKHNldHRpbmdzLmhlYWRlcnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICByZXF1ZXN0SW5pdC5oZWFkZXJzW2ldID0gPHN0cmluZz5zZXR0aW5ncy5oZWFkZXJzW2ldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgaXNKc29uRGF0YVR5cGUgPSBzZXR0aW5ncy5kYXRhVHlwZSAmJiBzZXR0aW5ncy5kYXRhVHlwZS50b0xvd2VyQ2FzZSgpID09PSAnanNvbic7XG5cbiAgICAvLyBTZXQgJ0FjY2VwdCcgaGVhZGVyIHZhbHVlIGZvciBqc29uIHJlcXVlc3RzIChUYWtlbiBmcm9tXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvYmxvYi9lMGQ5NDExNTY5MDBhNmJmZjdjMDk4YzhlYTcyOTA1MjhlNDY4Y2Y4L3NyYy9hamF4LmpzI0w2NDRcbiAgICAvLyApXG4gICAgaWYgKGlzSnNvbkRhdGFUeXBlKSB7XG4gICAgICByZXF1ZXN0SW5pdC5oZWFkZXJzWydBY2NlcHQnXSA9ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L2phdmFzY3JpcHQsICovKjsgcT0wLjAxJztcbiAgICB9XG5cbiAgICByZXR1cm4gZmV0Y2godXJsLnRvU3RyaW5nKCksIHJlcXVlc3RJbml0KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gMjAwICYmIHJlc3BvbnNlLnN0YXR1cyA8IDMwMCkge1xuICAgICAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKTtcbiAgICAgICAgaWYgKGlzSnNvbkRhdGFUeXBlIHx8IChjb250ZW50VHlwZSAmJiBjb250ZW50VHlwZS5pbmRleE9mKCdhcHBsaWNhdGlvbi9qc29uJykgIT09IC0xKSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IocmVzcG9uc2Uuc3RhdHVzLnRvU3RyaW5nKCksIHJlc3BvbnNlLnN0YXR1c1RleHQpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIFNob3VsZCBiZSB1c2VkIG9ubHkgaW4gdGhlIGNvbnRleHQgb2YgdGVzdGluZy4gSnVzdCB1c2VzIHRoZSB1bmRlcmx5aW5nXG4gKiBQcm9taXNlIHRvIG1vY2sgdGhlIGJlaGF2aW9yIG9mIHRoZSBSZXF1ZXN0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBUZXN0UmVxdWVzdG9yIGV4dGVuZHMgUmVxdWVzdG9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIHByb21pc2U6IFByb21pc2U8YW55Pikge1xuICAgIHN1cGVyKCk7XG4gIH1cbiAgeGhyPFQ+KHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9taXNlOyAgLy8gdW5zYWZlIGNhc3RcbiAgfVxufVxuIl19