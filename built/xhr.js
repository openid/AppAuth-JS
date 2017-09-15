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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3hoci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7Ozs7Ozs7Ozs7QUFFSCxtQ0FBc0M7QUFFdEM7O0dBRUc7QUFDSDtJQUFBO0lBQTZGLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBOUYsSUFBOEY7QUFBeEUsOEJBQVM7QUFFL0I7O0dBRUc7QUFDSDtJQUFxQyxtQ0FBUztJQUE5Qzs7SUFlQSxDQUFDO0lBZEMsNkJBQUcsR0FBSCxVQUFPLFFBQTRCO1FBQ2pDLDREQUE0RDtRQUM1RCxxQkFBcUI7UUFDckIsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUksVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNwQyxHQUFHLENBQUMsSUFBSSxDQUNKLFVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLO2dCQUN0QixPQUFPLENBQUMsSUFBUyxDQUFDLENBQUM7WUFDckIsQ0FBQyxFQUNELFVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLO2dCQUN2QixNQUFNLENBQUMsSUFBSSxxQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFmRCxDQUFxQyxTQUFTLEdBZTdDO0FBZlksMENBQWU7QUFpQjVCOzs7R0FHRztBQUNIO0lBQW1DLGlDQUFTO0lBQzFDLHVCQUFtQixPQUFxQjtRQUF4QyxZQUNFLGlCQUFPLFNBQ1I7UUFGa0IsYUFBTyxHQUFQLE9BQU8sQ0FBYzs7SUFFeEMsQ0FBQztJQUNELDJCQUFHLEdBQUgsVUFBTyxRQUE0QjtRQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFFLGNBQWM7SUFDdEMsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQVBELENBQW1DLFNBQVMsR0FPM0M7QUFQWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vKipcbiAqIEFuIGNsYXNzIHRoYXQgYWJzdHJhY3RzIGF3YXkgdGhlIGFiaWxpdHkgdG8gbWFrZSBhbiBYTUxIdHRwUmVxdWVzdC5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFJlcXVlc3RvciB7IGFic3RyYWN0IHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPjsgfVxuXG4vKipcbiAqIFVzZXMgJC5hamF4IHRvIG1ha2VzIHRoZSBBamF4IHJlcXVlc3RzLlxuICovXG5leHBvcnQgY2xhc3MgSlF1ZXJ5UmVxdWVzdG9yIGV4dGVuZHMgUmVxdWVzdG9yIHtcbiAgeGhyPFQ+KHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+IHtcbiAgICAvLyBOT1RFOiB1c2luZyBqcXVlcnkgdG8gbWFrZSBYSFIncyBhcyB3aGF0d2ctZmV0Y2ggcmVxdWlyZXNcbiAgICAvLyB0aGF0IEkgdGFyZ2V0IEVTNi5cbiAgICBjb25zdCB4aHIgPSAkLmFqYXgoc2V0dGluZ3MpO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB4aHIudGhlbihcbiAgICAgICAgICAoZGF0YSwgdGV4dFN0YXR1cywganFYaHIpID0+IHtcbiAgICAgICAgICAgIHJlc29sdmUoZGF0YSBhcyBUKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChqcVhociwgdGV4dFN0YXR1cywgZXJyb3IpID0+IHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgQXBwQXV0aEVycm9yKGVycm9yKSk7XG4gICAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG91bGQgYmUgdXNlZCBvbmx5IGluIHRoZSBjb250ZXh0IG9mIHRlc3RpbmcuIEp1c3QgdXNlcyB0aGUgdW5kZXJseWluZ1xuICogUHJvbWlzZSB0byBtb2NrIHRoZSBiZWhhdmlvciBvZiB0aGUgUmVxdWVzdG9yLlxuICovXG5leHBvcnQgY2xhc3MgVGVzdFJlcXVlc3RvciBleHRlbmRzIFJlcXVlc3RvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9taXNlOiBQcm9taXNlPGFueT4pIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMucHJvbWlzZTsgIC8vIHVuc2FmZSBjYXN0XG4gIH1cbn1cbiJdfQ==