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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCSDs7OztHQUlHO0FBQ0g7SUFBQTtJQXNCQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDO0FBdEJxQix3Q0FBYztBQXdCcEM7O0dBRUc7QUFDSDtJQUF5Qyx1Q0FBYztJQUVyRCw2QkFBWSxPQUEyQjtRQUNyQyxZQUFBLE1BQUssV0FBRSxTQUFDO1FBQ1IsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQzs7SUFDaEQsQ0FBQztJQUVNLHFDQUFPLEdBQWQsVUFBZSxJQUFZO1FBQTNCLGlCQVNDO1FBUkMsT0FBTyxJQUFJLE9BQU8sQ0FBYyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQzlDLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pCLENBQUM7aUJBQU0sQ0FBQztnQkFDTixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDaEIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHdDQUFVLEdBQWpCLFVBQWtCLElBQVk7UUFBOUIsaUJBS0M7UUFKQyxPQUFPLElBQUksT0FBTyxDQUFPLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDdkMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUIsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSxtQ0FBSyxHQUFaO1FBQUEsaUJBS0M7UUFKQyxPQUFPLElBQUksT0FBTyxDQUFPLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDdkMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNyQixPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHFDQUFPLEdBQWQsVUFBZSxJQUFZLEVBQUUsS0FBYTtRQUExQyxpQkFLQztRQUpDLE9BQU8sSUFBSSxPQUFPLENBQU8sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEMsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUF0Q0QsQ0FBeUMsY0FBYyxHQXNDdEQ7QUF0Q1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogQSBzdWJzZXQgb2YgdGhlIGBTdG9yYWdlYCBpbnRlcmZhY2Ugd2hpY2ggd2UgbmVlZCBmb3IgdGhlIGJhY2tlbmRzIHRvIHdvcmsuXG4gKlxuICogRXNzZW50aWFsbHkgcmVtb3ZlcyB0aGUgaW5kZXhhYmxlIHByb3BlcnRpZXMgYW5kIHJlYWRvbmx5IHByb3BlcnRpZXMgZnJvbVxuICogYFN0b3JhZ2VgIGluIGxpYi5kb20uZC50cy4gVGhpcyBpcyBzbyB0aGF0IGEgY3VzdG9tIHR5cGUgY2FuIGV4dGVuZCBpdCBmb3JcbiAqIHRlc3RpbmcuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVW5kZXJseWluZ1N0b3JhZ2Uge1xuICByZWFkb25seSBsZW5ndGg6IG51bWJlcjtcbiAgY2xlYXIoKTogdm9pZDtcbiAgZ2V0SXRlbShrZXk6IHN0cmluZyk6IHN0cmluZ3xudWxsO1xuICByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogdm9pZDtcbiAgc2V0SXRlbShrZXk6IHN0cmluZywgZGF0YTogc3RyaW5nKTogdm9pZDtcbn1cblxuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RvcmFnZSBBUElzLiBBbGwgbWV0aG9kcyByZXR1cm4gYSBgUHJvbWlzZWAuXG4gKiBBbGwgbWV0aG9kcyB0YWtlIHRoZSBgRE9NU3RyaW5nYFxuICogSURMIHR5cGUgKGFzIGl0IGlzIHRoZSBsb3dlc3QgY29tbW9uIGRlbm9taW5hdG9yKS5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0b3JhZ2VCYWNrZW5kIHtcbiAgLyoqXG4gICAqIFdoZW4gcGFzc2VkIGEga2V5IGBuYW1lYCwgd2lsbCByZXR1cm4gdGhhdCBrZXkncyB2YWx1ZS5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXRJdGVtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nfG51bGw+O1xuXG4gIC8qKlxuICAgKiBXaGVuIHBhc3NlZCBhIGtleSBgbmFtZWAsIHdpbGwgcmVtb3ZlIHRoYXQga2V5IGZyb20gdGhlIHN0b3JhZ2UuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgcmVtb3ZlSXRlbShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBXaGVuIGludm9rZWQsIHdpbGwgZW1wdHkgYWxsIGtleXMgb3V0IG9mIHRoZSBzdG9yYWdlLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGNsZWFyKCk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFRoZSBzZXRJdGVtKCkgbWV0aG9kIG9mIHRoZSBgU3RvcmFnZUJhY2tlbmRgIGludGVyZmFjZSxcbiAgICogd2hlbiBwYXNzZWQgYSBrZXkgbmFtZSBhbmQgdmFsdWUsIHdpbGwgYWRkIHRoYXQga2V5IHRvIHRoZSBzdG9yYWdlLFxuICAgKiBvciB1cGRhdGUgdGhhdCBrZXkncyB2YWx1ZSBpZiBpdCBhbHJlYWR5IGV4aXN0cy5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBzZXRJdGVtKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG59XG5cbi8qKlxuICogQSBgU3RvcmFnZUJhY2tlbmRgIGJhY2tlZCBieSBgbG9jYWxzdG9yYWdlYC5cbiAqL1xuZXhwb3J0IGNsYXNzIExvY2FsU3RvcmFnZUJhY2tlbmQgZXh0ZW5kcyBTdG9yYWdlQmFja2VuZCB7XG4gIHByaXZhdGUgc3RvcmFnZTogVW5kZXJseWluZ1N0b3JhZ2U7XG4gIGNvbnN0cnVjdG9yKHN0b3JhZ2U/OiBVbmRlcmx5aW5nU3RvcmFnZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZSB8fCB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICB9XG5cbiAgcHVibGljIGdldEl0ZW0obmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmd8bnVsbD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxzdHJpbmd8bnVsbD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnN0b3JhZ2UuZ2V0SXRlbShuYW1lKTtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUobnVsbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlSXRlbShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0obmFtZSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuc3RvcmFnZS5jbGVhcigpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNldEl0ZW0obmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKG5hbWUsIHZhbHVlKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19