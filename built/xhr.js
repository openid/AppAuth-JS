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
var Requestor = (function () {
    function Requestor() {
    }
    return Requestor;
}());
exports.Requestor = Requestor;
/**
 * Uses $.ajax to makes the Ajax requests.
 */
var JQueryRequestor = (function (_super) {
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
                reject(new errors_1.AppAuthError(textStatus));
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
var TestRequestor = (function (_super) {
    __extends(TestRequestor, _super);
    function TestRequestor(promise) {
        var _this = _super.call(this) || this;
        _this.promise = promise;
        return _this;
    }
    TestRequestor.prototype.xhr = function (settings) {
        return this.promise;
    };
    return TestRequestor;
}(Requestor));
exports.TestRequestor = TestRequestor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3hoci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7Ozs7Ozs7Ozs7QUFFSCxtQ0FBc0M7QUFFdEM7O0dBRUc7QUFDSDtJQUFBO0lBQTZGLENBQUM7SUFBRCxnQkFBQztBQUFELENBQUMsQUFBOUYsSUFBOEY7QUFBeEUsOEJBQVM7QUFFL0I7O0dBRUc7QUFDSDtJQUFxQyxtQ0FBUztJQUE5Qzs7SUFlQSxDQUFDO0lBZEMsNkJBQUcsR0FBSCxVQUFPLFFBQTRCO1FBQ2pDLDREQUE0RDtRQUM1RCxxQkFBcUI7UUFDckIsSUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUksVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNwQyxHQUFHLENBQUMsSUFBSSxDQUNKLFVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLO2dCQUN0QixPQUFPLENBQUMsSUFBUyxDQUFDLENBQUM7WUFDckIsQ0FBQyxFQUNELFVBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxLQUFLO2dCQUN2QixNQUFNLENBQUMsSUFBSSxxQkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFmRCxDQUFxQyxTQUFTLEdBZTdDO0FBZlksMENBQWU7QUFpQjVCOzs7R0FHRztBQUNIO0lBQXNDLGlDQUFTO0lBQzdDLHVCQUFtQixPQUFtQjtRQUF0QyxZQUNFLGlCQUFPLFNBQ1I7UUFGa0IsYUFBTyxHQUFQLE9BQU8sQ0FBWTs7SUFFdEMsQ0FBQztJQUNELDJCQUFHLEdBQUgsVUFBSSxRQUE0QjtRQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBc0MsU0FBUyxHQU85QztBQVBZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7QXBwQXV0aEVycm9yfSBmcm9tICcuL2Vycm9ycyc7XG5cbi8qKlxuICogQW4gY2xhc3MgdGhhdCBhYnN0cmFjdHMgYXdheSB0aGUgYWJpbGl0eSB0byBtYWtlIGFuIFhNTEh0dHBSZXF1ZXN0LlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUmVxdWVzdG9yIHsgYWJzdHJhY3QgeGhyPFQ+KHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+OyB9XG5cbi8qKlxuICogVXNlcyAkLmFqYXggdG8gbWFrZXMgdGhlIEFqYXggcmVxdWVzdHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBKUXVlcnlSZXF1ZXN0b3IgZXh0ZW5kcyBSZXF1ZXN0b3Ige1xuICB4aHI8VD4oc2V0dGluZ3M6IEpRdWVyeUFqYXhTZXR0aW5ncyk6IFByb21pc2U8VD4ge1xuICAgIC8vIE5PVEU6IHVzaW5nIGpxdWVyeSB0byBtYWtlIFhIUidzIGFzIHdoYXR3Zy1mZXRjaCByZXF1aXJlc1xuICAgIC8vIHRoYXQgSSB0YXJnZXQgRVM2LlxuICAgIGNvbnN0IHhociA9ICQuYWpheChzZXR0aW5ncyk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHhoci50aGVuKFxuICAgICAgICAgIChkYXRhLCB0ZXh0U3RhdHVzLCBqcVhocikgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShkYXRhIGFzIFQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGpxWGhyLCB0ZXh0U3RhdHVzLCBlcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IodGV4dFN0YXR1cykpO1xuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogU2hvdWxkIGJlIHVzZWQgb25seSBpbiB0aGUgY29udGV4dCBvZiB0ZXN0aW5nLiBKdXN0IHVzZXMgdGhlIHVuZGVybHlpbmdcbiAqIFByb21pc2UgdG8gbW9jayB0aGUgYmVoYXZpb3Igb2YgdGhlIFJlcXVlc3Rvci5cbiAqL1xuZXhwb3J0IGNsYXNzIFRlc3RSZXF1ZXN0b3I8VD4gZXh0ZW5kcyBSZXF1ZXN0b3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvbWlzZTogUHJvbWlzZTxUPikge1xuICAgIHN1cGVyKCk7XG4gIH1cbiAgeGhyKHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5wcm9taXNlO1xuICB9XG59XG4iXX0=