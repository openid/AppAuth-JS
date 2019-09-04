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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3hoci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7Ozs7Ozs7Ozs7Ozs7QUFFSCxtQ0FBc0M7QUFFdEM7O0dBRUc7QUFDSDtJQUFBO0lBRUEsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGcUIsOEJBQVM7QUFJL0I7O0dBRUc7QUFDSDtJQUFxQyxtQ0FBUztJQUE5Qzs7SUFlQSxDQUFDO0lBZEMsNkJBQUcsR0FBSCxVQUFPLFFBQTRCO1FBQ2pDLDREQUE0RDtRQUM1RCxxQkFBcUI7UUFDckIsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksT0FBTyxDQUFJLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDcEMsR0FBRyxDQUFDLElBQUksQ0FDSixVQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSztnQkFDdEIsT0FBTyxDQUFDLElBQVMsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsRUFDRCxVQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSztnQkFDdkIsTUFBTSxDQUFDLElBQUkscUJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBZkQsQ0FBcUMsU0FBUyxHQWU3QztBQWZZLDBDQUFlO0FBa0I1Qjs7R0FFRztBQUNIO0lBQW9DLGtDQUFTO0lBQTdDOztJQXFEQSxDQUFDO0lBcERDLDRCQUFHLEdBQUgsVUFBTyxRQUE0QjtRQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUNqQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBWSxDQUFDLHlCQUF5QixDQUFDLENBQUMsQ0FBQztTQUNwRTtR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TyxDQUFDLENBQUUsY0FBYztJQUN0QyxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBbUMsU0FBUyxHQU8zQztBQVBZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXBwQXV0aEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogQW4gY2xhc3MgdGhhdCBhYnN0cmFjdHMgYXdheSB0aGUgYWJpbGl0eSB0byBtYWtlIGFuIFhNTEh0dHBSZXF1ZXN0LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVxdWVzdG9yIHtcbiAgYWJzdHJhY3QgeGhyPFQ+KHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+O1xufVxuXG4vKipcbiAqIFVzZXMgJC5hamF4IHRvIG1ha2VzIHRoZSBBamF4IHJlcXVlc3RzLlxuICovXG5leHBvcnQgY2xhc3MgSlF1ZXJ5UmVxdWVzdG9yIGV4dGVuZHMgUmVxdWVzdG9yIHtcbiAgeGhyPFQ+KHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+IHtcbiAgICAvLyBOT1RFOiB1c2luZyBqcXVlcnkgdG8gbWFrZSBYSFIncyBhcyB3aGF0d2ctZmV0Y2ggcmVxdWlyZXNcbiAgICAvLyB0aGF0IEkgdGFyZ2V0IEVTNi5cbiAgICBjb25zdCB4aHIgPSAkLmFqYXgoc2V0dGluZ3MpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB4aHIudGhlbihcbiAgICAgICAgICAoZGF0YSwgdGV4dFN0YXR1cywganFYaHIpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSBhcyBUKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChqcVhociwgdGV4dFN0YXR1cywgZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgQXBwQXV0aEVycm9yKGVycm9yKSk7XG4gICAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuXG4vKipcbiAqIFVzZXMgZmV0Y2ggQVBJIHRvIG1ha2UgQWpheCByZXF1ZXN0c1xuICovXG5leHBvcnQgY2xhc3MgRmV0Y2hSZXF1ZXN0b3IgZXh0ZW5kcyBSZXF1ZXN0b3Ige1xuICB4aHI8VD4oc2V0dGluZ3M6IEpRdWVyeUFqYXhTZXR0aW5ncyk6IFByb21pc2U8VD4ge1xuICAgIGlmICghc2V0dGluZ3MudXJsKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEFwcEF1dGhFcnJvcignQSBVUkwgbXVzdCBiZSBwcm92aWRlZC4nKSk7XG4gICAgfVxuICAgIGxldCB1cmw6IFVSTCA9IG5ldyBVUkwoPHN0cmluZz5zZXR0aW5ncy51cmwpO1xuICAgIGxldCByZXF1ZXN0SW5pdDogUmVxdWVzdEluaXQgPSB7fTtcbiAgICByZXF1ZXN0SW5pdC5tZXRob2QgPSBzZXR0aW5ncy5tZXRob2Q7XG4gICAgcmVxdWVzdEluaXQubW9kZSA9ICdjb3JzJztcblxuICAgIGlmIChzZXR0aW5ncy5kYXRhKSB7XG4gICAgICBpZiAoc2V0dGluZ3MubWV0aG9kICYmIHNldHRpbmdzLm1ldGhvZC50b1VwcGVyQ2FzZSgpID09PSAnUE9TVCcpIHtcbiAgICAgICAgcmVxdWVzdEluaXQuYm9keSA9IDxzdHJpbmc+c2V0dGluZ3MuZGF0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHNldHRpbmdzLmRhdGEpO1xuICAgICAgICBzZWFyY2hQYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT7CoHtcbiAgICAgICAgICB1cmwuc2VhcmNoUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IGhlYWRlcnNcbiAgICByZXF1ZXN0SW5pdC5oZWFkZXJzID0ge307XG4gICAgaWYgKHNldHRpbmdzLmhlYWRlcnMpIHtcbiAgICAgIGZvciAobGV0IGkgaW4gc2V0dGluZ3MuaGVhZGVycykge1xuICAgICAgICBpZiAoc2V0dGluZ3MuaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgIHJlcXVlc3RJbml0LmhlYWRlcnNbaV0gPSA8c3RyaW5nPnNldHRpbmdzLmhlYWRlcnNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBpc0pzb25EYXRhVHlwZSA9IHNldHRpbmdzLmRhdGFUeXBlICYmIHNldHRpbmdzLmRhdGFUeXBlLnRvTG93ZXJDYXNlKCkgPT09ICdqc29uJztcblxuICAgIC8vIFNldCAnQWNjZXB0JyBoZWFkZXIgdmFsdWUgZm9yIGpzb24gcmVxdWVzdHMgKFRha2VuIGZyb21cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iL2UwZDk0MTE1NjkwMGE2YmZmN2MwOThjOGVhNzI5MDUyOGU0NjhjZjgvc3JjL2FqYXguanMjTDY0NFxuICAgIC8vIClcbiAgICBpZiAoaXNKc29uRGF0YVR5cGUpIHtcbiAgICAgIHJlcXVlc3RJbml0LmhlYWRlcnNbJ0FjY2VwdCddID0gJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvamF2YXNjcmlwdCwgKi8qOyBxPTAuMDEnO1xuICAgIH1cblxuICAgIHJldHVybiBmZXRjaCh1cmwudG9TdHJpbmcoKSwgcmVxdWVzdEluaXQpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA+PSAyMDAgJiYgcmVzcG9uc2Uuc3RhdHVzIDwgMzAwKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpO1xuICAgICAgICBpZiAoaXNKc29uRGF0YVR5cGUgfHwgKGNvbnRlbnRUeXBlICYmIGNvbnRlbnRUeXBlLmluZGV4T2YoJ2FwcGxpY2F0aW9uL2pzb24nKSAhPT0gLTEpKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEFwcEF1dGhFcnJvcihyZXNwb25zZS5zdGF0dXMudG9TdHJpbmcoKSwgcmVzcG9uc2Uuc3RhdHVzVGV4dCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogU2hvdWxkIGJlIHVzZWQgb25seSBpbiB0aGUgY29udGV4dCBvZiB0ZXN0aW5nLiBKdXN0IHVzZXMgdGhlIHVuZGVybHlpbmdcbiAqIFByb21pc2UgdG8gbW9jayB0aGUgYmVoYXZpb3Igb2YgdGhlIFJlcXVlc3Rvci5cbiAqL1xuZXhwb3J0IGNsYXNzIFRlc3RSZXF1ZXN0b3IgZXh0ZW5kcyBSZXF1ZXN0b3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvbWlzZTogUHJvbWlzZTxhbnk+KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICB4aHI8VD4oc2V0dGluZ3M6IEpRdWVyeUFqYXhTZXR0aW5ncyk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiB0aGlzLnByb21pc2U7ICAvLyB1bnNhZmUgY2FzdFxuICB9XG59XG4iXX0=