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
exports.LocalStorageBackend = exports.StorageBackend = void 0;
/**
 * Asynchronous storage APIs. All methods return a `Promise`.
 * All methods take the `DOMString`
 * IDL type (as it is the lowest common denominator).
 */
var StorageBackend = /** @class */ (function () {
    function StorageBackend() {
    }
    return StorageBackend;
}());
exports.StorageBackend = StorageBackend;
/**
 * A `StorageBackend` backed by `localstorage`.
 */
var LocalStorageBackend = /** @class */ (function (_super) {
    __extends(LocalStorageBackend, _super);
    function LocalStorageBackend(storage) {
        var _this = _super.call(this) || this;
        _this.storage = storage || window.localStorage;
        return _this;
    }
    LocalStorageBackend.prototype.getItem = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var value = _this.storage.getItem(name);
            if (value) {
                resolve(value);
            }
            else {
                resolve(null);
            }
        });
    };
    LocalStorageBackend.prototype.removeItem = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.removeItem(name);
            resolve();
        });
    };
    LocalStorageBackend.prototype.clear = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.clear();
            resolve();
        });
    };
    LocalStorageBackend.prototype.setItem = function (name, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.setItem(name, value);
            resolve();
        });
    };
    return LocalStorageBackend;
}(StorageBackend));
exports.LocalStorageBackend = LocalStorageBackend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkg7Ozs7R0FJRztBQUNIO0lBQUE7SUFzQkEsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQztBQXRCcUIsd0NBQWM7QUF3QnBDOztHQUVHO0FBQ0g7SUFBeUMsdUNBQWM7SUFFckQsNkJBQVksT0FBMkI7UUFBdkMsWUFDRSxpQkFBTyxTQUVSO1FBREMsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQzs7SUFDaEQsQ0FBQztJQUVNLHFDQUFPLEdBQWQsVUFBZSxJQUFZO1FBQTNCLGlCQVNDO1FBUkMsT0FBTyxJQUFJLE9BQU8sQ0FBYyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQzlDLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksS0FBSyxFQUFFO2dCQUNULE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDZjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHdDQUFVLEdBQWpCLFVBQWtCLElBQVk7UUFBOUIsaUJBS0M7UUFKQyxPQUFPLElBQUksT0FBTyxDQUFPLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDdkMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxtQ0FBSyxHQUFaO1FBQUEsaUJBS0M7UUFKQyxPQUFPLElBQUksT0FBTyxDQUFPLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDdkMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyQixPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHFDQUFPLEdBQWQsVUFBZSxJQUFZLEVBQUUsS0FBYTtRQUExQyxpQkFLQztRQUpDLE9BQU8sSUFBSSxPQUFPLENBQU8sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEMsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUF0Q0QsQ0FBeUMsY0FBYyxHQXNDdEQ7QUF0Q1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcclxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXHJcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXHJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG4vKipcclxuICogQSBzdWJzZXQgb2YgdGhlIGBTdG9yYWdlYCBpbnRlcmZhY2Ugd2hpY2ggd2UgbmVlZCBmb3IgdGhlIGJhY2tlbmRzIHRvIHdvcmsuXHJcbiAqXHJcbiAqIEVzc2VudGlhbGx5IHJlbW92ZXMgdGhlIGluZGV4YWJsZSBwcm9wZXJ0aWVzIGFuZCByZWFkb25seSBwcm9wZXJ0aWVzIGZyb21cclxuICogYFN0b3JhZ2VgIGluIGxpYi5kb20uZC50cy4gVGhpcyBpcyBzbyB0aGF0IGEgY3VzdG9tIHR5cGUgY2FuIGV4dGVuZCBpdCBmb3JcclxuICogdGVzdGluZy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVW5kZXJseWluZ1N0b3JhZ2Uge1xyXG4gIHJlYWRvbmx5IGxlbmd0aDogbnVtYmVyO1xyXG4gIGNsZWFyKCk6IHZvaWQ7XHJcbiAgZ2V0SXRlbShrZXk6IHN0cmluZyk6IHN0cmluZ3xudWxsO1xyXG4gIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiB2b2lkO1xyXG4gIHNldEl0ZW0oa2V5OiBzdHJpbmcsIGRhdGE6IHN0cmluZyk6IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBc3luY2hyb25vdXMgc3RvcmFnZSBBUElzLiBBbGwgbWV0aG9kcyByZXR1cm4gYSBgUHJvbWlzZWAuXHJcbiAqIEFsbCBtZXRob2RzIHRha2UgdGhlIGBET01TdHJpbmdgXHJcbiAqIElETCB0eXBlIChhcyBpdCBpcyB0aGUgbG93ZXN0IGNvbW1vbiBkZW5vbWluYXRvcikuXHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RvcmFnZUJhY2tlbmQge1xyXG4gIC8qKlxyXG4gICAqIFdoZW4gcGFzc2VkIGEga2V5IGBuYW1lYCwgd2lsbCByZXR1cm4gdGhhdCBrZXkncyB2YWx1ZS5cclxuICAgKi9cclxuICBwdWJsaWMgYWJzdHJhY3QgZ2V0SXRlbShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ3xudWxsPjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBwYXNzZWQgYSBrZXkgYG5hbWVgLCB3aWxsIHJlbW92ZSB0aGF0IGtleSBmcm9tIHRoZSBzdG9yYWdlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhYnN0cmFjdCByZW1vdmVJdGVtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gaW52b2tlZCwgd2lsbCBlbXB0eSBhbGwga2V5cyBvdXQgb2YgdGhlIHN0b3JhZ2UuXHJcbiAgICovXHJcbiAgcHVibGljIGFic3RyYWN0IGNsZWFyKCk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzZXRJdGVtKCkgbWV0aG9kIG9mIHRoZSBgU3RvcmFnZUJhY2tlbmRgIGludGVyZmFjZSxcclxuICAgKiB3aGVuIHBhc3NlZCBhIGtleSBuYW1lIGFuZCB2YWx1ZSwgd2lsbCBhZGQgdGhhdCBrZXkgdG8gdGhlIHN0b3JhZ2UsXHJcbiAgICogb3IgdXBkYXRlIHRoYXQga2V5J3MgdmFsdWUgaWYgaXQgYWxyZWFkeSBleGlzdHMuXHJcbiAgICovXHJcbiAgcHVibGljIGFic3RyYWN0IHNldEl0ZW0obmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEEgYFN0b3JhZ2VCYWNrZW5kYCBiYWNrZWQgYnkgYGxvY2Fsc3RvcmFnZWAuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlQmFja2VuZCBleHRlbmRzIFN0b3JhZ2VCYWNrZW5kIHtcclxuICBwcml2YXRlIHN0b3JhZ2U6IFVuZGVybHlpbmdTdG9yYWdlO1xyXG4gIGNvbnN0cnVjdG9yKHN0b3JhZ2U/OiBVbmRlcmx5aW5nU3RvcmFnZSkge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UgfHwgd2luZG93LmxvY2FsU3RvcmFnZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRJdGVtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nfG51bGw+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmd8bnVsbD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc3RvcmFnZS5nZXRJdGVtKG5hbWUpO1xyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICByZXNvbHZlKHZhbHVlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNvbHZlKG51bGwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyByZW1vdmVJdGVtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0obmFtZSk7XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldEl0ZW0obmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShuYW1lLCB2YWx1ZSk7XHJcbiAgICAgIHJlc29sdmUoKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=