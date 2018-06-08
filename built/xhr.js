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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3hoci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7Ozs7Ozs7Ozs7QUFFSCxtQ0FBc0M7QUFFdEM7O0dBRUc7QUFDSDtJQUFBO0lBRUEsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGcUIsOEJBQVM7QUFJL0I7O0dBRUc7QUFDSDtJQUFxQyxtQ0FBUztJQUE5Qzs7SUFlQSxDQUFDO0lBZEMsNkJBQUcsR0FBSCxVQUFPLFFBQTRCO1FBQ2pDLDREQUE0RDtRQUM1RCxxQkFBcUI7UUFDckIsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksT0FBTyxDQUFJLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDcEMsR0FBRyxDQUFDLElBQUksQ0FDSixVQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsS0FBSztnQkFDdEIsT0FBTyxDQUFDLElBQVMsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsRUFDRCxVQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSztnQkFDdkIsTUFBTSxDQUFDLElBQUkscUJBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBZkQsQ0FBcUMsU0FBUyxHQWU3QztBQWZZLDBDQUFlO0FBaUI1Qjs7O0dBR0c7QUFDSDtJQUFtQyxpQ0FBUztJQUMxQyx1QkFBbUIsT0FBcUI7UUFBeEMsWUFDRSxpQkFBTyxTQUNSO1FBRmtCLGFBQU8sR0FBUCxPQUFPLENBQWM7O0lBRXhDLENBQUM7SUFDRCwyQkFBRyxHQUFILFVBQU8sUUFBNEI7UUFDakMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUUsY0FBYztJQUN0QyxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBbUMsU0FBUyxHQU8zQztBQVBZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXBwQXV0aEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogQW4gY2xhc3MgdGhhdCBhYnN0cmFjdHMgYXdheSB0aGUgYWJpbGl0eSB0byBtYWtlIGFuIFhNTEh0dHBSZXF1ZXN0LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVxdWVzdG9yIHtcbiAgYWJzdHJhY3QgeGhyPFQ+KHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+O1xufVxuXG4vKipcbiAqIFVzZXMgJC5hamF4IHRvIG1ha2VzIHRoZSBBamF4IHJlcXVlc3RzLlxuICovXG5leHBvcnQgY2xhc3MgSlF1ZXJ5UmVxdWVzdG9yIGV4dGVuZHMgUmVxdWVzdG9yIHtcbiAgeGhyPFQ+KHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+IHtcbiAgICAvLyBOT1RFOiB1c2luZyBqcXVlcnkgdG8gbWFrZSBYSFIncyBhcyB3aGF0d2ctZmV0Y2ggcmVxdWlyZXNcbiAgICAvLyB0aGF0IEkgdGFyZ2V0IEVTNi5cbiAgICBjb25zdCB4aHIgPSAkLmFqYXgoc2V0dGluZ3MpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB4aHIudGhlbihcbiAgICAgICAgICAoZGF0YSwgdGV4dFN0YXR1cywganFYaHIpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSBhcyBUKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChqcVhociwgdGV4dFN0YXR1cywgZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgQXBwQXV0aEVycm9yKGVycm9yKSk7XG4gICAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG91bGQgYmUgdXNlZCBvbmx5IGluIHRoZSBjb250ZXh0IG9mIHRlc3RpbmcuIEp1c3QgdXNlcyB0aGUgdW5kZXJseWluZ1xuICogUHJvbWlzZSB0byBtb2NrIHRoZSBiZWhhdmlvciBvZiB0aGUgUmVxdWVzdG9yLlxuICovXG5leHBvcnQgY2xhc3MgVGVzdFJlcXVlc3RvciBleHRlbmRzIFJlcXVlc3RvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9taXNlOiBQcm9taXNlPGFueT4pIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZTsgIC8vIHVuc2FmZSBjYXN0XG4gIH1cbn1cbiJdfQ==