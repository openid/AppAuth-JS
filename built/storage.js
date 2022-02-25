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
exports.SessionStorageBackend = exports.LocalStorageBackend = exports.StorageBackend = void 0;
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
var SessionStorageBackend = /** @class */ (function (_super) {
    __extends(SessionStorageBackend, _super);
    function SessionStorageBackend(storage) {
        var _this = _super.call(this) || this;
        _this.storage = storage || window.sessionStorage;
        return _this;
    }
    SessionStorageBackend.prototype.getItem = function (name) {
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
    SessionStorageBackend.prototype.removeItem = function (name) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.removeItem(name);
            resolve();
        });
    };
    SessionStorageBackend.prototype.clear = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.clear();
            resolve();
        });
    };
    SessionStorageBackend.prototype.setItem = function (name, value) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.storage.setItem(name, value);
            resolve();
        });
    };
    return SessionStorageBackend;
}(StorageBackend));
exports.SessionStorageBackend = SessionStorageBackend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWlCSDs7OztHQUlHO0FBQ0g7SUFBQTtJQXNCQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDO0FBdEJxQix3Q0FBYztBQXdCcEM7O0dBRUc7QUFDSDtJQUF5Qyx1Q0FBYztJQUVyRCw2QkFBWSxPQUEyQjtRQUF2QyxZQUNFLGlCQUFPLFNBRVI7UUFEQyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDOztJQUNoRCxDQUFDO0lBRU0scUNBQU8sR0FBZCxVQUFlLElBQVk7UUFBM0IsaUJBU0M7UUFSQyxPQUFPLElBQUksT0FBTyxDQUFjLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDOUMsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNmO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sd0NBQVUsR0FBakIsVUFBa0IsSUFBWTtRQUE5QixpQkFLQztRQUpDLE9BQU8sSUFBSSxPQUFPLENBQU8sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLG1DQUFLLEdBQVo7UUFBQSxpQkFLQztRQUpDLE9BQU8sSUFBSSxPQUFPLENBQU8sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0scUNBQU8sR0FBZCxVQUFlLElBQVksRUFBRSxLQUFhO1FBQTFDLGlCQUtDO1FBSkMsT0FBTyxJQUFJLE9BQU8sQ0FBTyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3ZDLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsQyxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQXRDRCxDQUF5QyxjQUFjLEdBc0N0RDtBQXRDWSxrREFBbUI7QUF3Q2hDO0lBQTJDLHlDQUFjO0lBRXZELCtCQUFZLE9BQTJCO1FBQXZDLFlBQ0UsaUJBQU8sU0FFUjtRQURDLEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUM7O0lBQ2xELENBQUM7SUFFTSx1Q0FBTyxHQUFkLFVBQWUsSUFBWTtRQUEzQixpQkFTQztRQVJDLE9BQU8sSUFBSSxPQUFPLENBQWMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUM5QyxJQUFNLEtBQUssR0FBRyxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLEtBQUssRUFBRTtnQkFDVCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEI7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwwQ0FBVSxHQUFqQixVQUFrQixJQUFZO1FBQTlCLGlCQUtDO1FBSkMsT0FBTyxJQUFJLE9BQU8sQ0FBTyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3ZDLEtBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0scUNBQUssR0FBWjtRQUFBLGlCQUtDO1FBSkMsT0FBTyxJQUFJLE9BQU8sQ0FBTyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3ZDLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDckIsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSx1Q0FBTyxHQUFkLFVBQWUsSUFBWSxFQUFFLEtBQWE7UUFBMUMsaUJBS0M7UUFKQyxPQUFPLElBQUksT0FBTyxDQUFPLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDdkMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBdENELENBQTJDLGNBQWMsR0FzQ3hEO0FBdENZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vKipcbiAqIEEgc3Vic2V0IG9mIHRoZSBgU3RvcmFnZWAgaW50ZXJmYWNlIHdoaWNoIHdlIG5lZWQgZm9yIHRoZSBiYWNrZW5kcyB0byB3b3JrLlxuICpcbiAqIEVzc2VudGlhbGx5IHJlbW92ZXMgdGhlIGluZGV4YWJsZSBwcm9wZXJ0aWVzIGFuZCByZWFkb25seSBwcm9wZXJ0aWVzIGZyb21cbiAqIGBTdG9yYWdlYCBpbiBsaWIuZG9tLmQudHMuIFRoaXMgaXMgc28gdGhhdCBhIGN1c3RvbSB0eXBlIGNhbiBleHRlbmQgaXQgZm9yXG4gKiB0ZXN0aW5nLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVuZGVybHlpbmdTdG9yYWdlIHtcbiAgcmVhZG9ubHkgbGVuZ3RoOiBudW1iZXI7XG4gIGNsZWFyKCk6IHZvaWQ7XG4gIGdldEl0ZW0oa2V5OiBzdHJpbmcpOiBzdHJpbmd8bnVsbDtcbiAgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQ7XG4gIHNldEl0ZW0oa2V5OiBzdHJpbmcsIGRhdGE6IHN0cmluZyk6IHZvaWQ7XG59XG5cbi8qKlxuICogQXN5bmNocm9ub3VzIHN0b3JhZ2UgQVBJcy4gQWxsIG1ldGhvZHMgcmV0dXJuIGEgYFByb21pc2VgLlxuICogQWxsIG1ldGhvZHMgdGFrZSB0aGUgYERPTVN0cmluZ2BcbiAqIElETCB0eXBlIChhcyBpdCBpcyB0aGUgbG93ZXN0IGNvbW1vbiBkZW5vbWluYXRvcikuXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdG9yYWdlQmFja2VuZCB7XG4gIC8qKlxuICAgKiBXaGVuIHBhc3NlZCBhIGtleSBgbmFtZWAsIHdpbGwgcmV0dXJuIHRoYXQga2V5J3MgdmFsdWUuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgZ2V0SXRlbShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ3xudWxsPjtcblxuICAvKipcbiAgICogV2hlbiBwYXNzZWQgYSBrZXkgYG5hbWVgLCB3aWxsIHJlbW92ZSB0aGF0IGtleSBmcm9tIHRoZSBzdG9yYWdlLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IHJlbW92ZUl0ZW0obmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogV2hlbiBpbnZva2VkLCB3aWxsIGVtcHR5IGFsbCBrZXlzIG91dCBvZiB0aGUgc3RvcmFnZS5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCBjbGVhcigpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBUaGUgc2V0SXRlbSgpIG1ldGhvZCBvZiB0aGUgYFN0b3JhZ2VCYWNrZW5kYCBpbnRlcmZhY2UsXG4gICAqIHdoZW4gcGFzc2VkIGEga2V5IG5hbWUgYW5kIHZhbHVlLCB3aWxsIGFkZCB0aGF0IGtleSB0byB0aGUgc3RvcmFnZSxcbiAgICogb3IgdXBkYXRlIHRoYXQga2V5J3MgdmFsdWUgaWYgaXQgYWxyZWFkeSBleGlzdHMuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3Qgc2V0SXRlbShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xufVxuXG4vKipcbiAqIEEgYFN0b3JhZ2VCYWNrZW5kYCBiYWNrZWQgYnkgYGxvY2Fsc3RvcmFnZWAuXG4gKi9cbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VCYWNrZW5kIGV4dGVuZHMgU3RvcmFnZUJhY2tlbmQge1xuICBwcml2YXRlIHN0b3JhZ2U6IFVuZGVybHlpbmdTdG9yYWdlO1xuICBjb25zdHJ1Y3RvcihzdG9yYWdlPzogVW5kZXJseWluZ1N0b3JhZ2UpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UgfHwgd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJdGVtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nfG51bGw+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nfG51bGw+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdG9yYWdlLmdldEl0ZW0obmFtZSk7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUl0ZW0obmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKG5hbWUpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJdGVtKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShuYW1lLCB2YWx1ZSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNlc3Npb25TdG9yYWdlQmFja2VuZCBleHRlbmRzIFN0b3JhZ2VCYWNrZW5kIHtcbiAgcHJpdmF0ZSBzdG9yYWdlOiBVbmRlcmx5aW5nU3RvcmFnZTtcbiAgY29uc3RydWN0b3Ioc3RvcmFnZT86IFVuZGVybHlpbmdTdG9yYWdlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlIHx8IHdpbmRvdy5zZXNzaW9uU3RvcmFnZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRJdGVtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nfG51bGw+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8c3RyaW5nfG51bGw+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdG9yYWdlLmdldEl0ZW0obmFtZSk7XG4gICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKG51bGwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZUl0ZW0obmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKG5hbWUpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNsZWFyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRJdGVtKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnN0b3JhZ2Uuc2V0SXRlbShuYW1lLCB2YWx1ZSk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==