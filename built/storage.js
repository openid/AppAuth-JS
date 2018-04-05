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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQWlCSDs7OztHQUlHO0FBQ0g7SUFBQTtJQXNCQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDO0FBdEJxQix3Q0FBYztBQXdCcEM7O0dBRUc7QUFDSDtJQUF5Qyx1Q0FBYztJQUVyRCw2QkFBWSxPQUEyQjtRQUF2QyxZQUNFLGlCQUFPLFNBRVI7UUFEQyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDOztJQUNoRCxDQUFDO0lBRU0scUNBQU8sR0FBZCxVQUFlLElBQVk7UUFBM0IsaUJBU0M7UUFSQyxPQUFPLElBQUksT0FBTyxDQUFjLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDOUMsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNmO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sd0NBQVUsR0FBakIsVUFBa0IsSUFBWTtRQUE5QixpQkFLQztRQUpDLE9BQU8sSUFBSSxPQUFPLENBQU8sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLG1DQUFLLEdBQVo7UUFBQSxpQkFLQztRQUpDLE9BQU8sSUFBSSxPQUFPLENBQU8sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0scUNBQU8sR0FBZCxVQUFlLElBQVksRUFBRSxLQUFhO1FBQTFDLGlCQUtDO1FBSkMsT0FBTyxJQUFJLE9BQU8sQ0FBTyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3ZDLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsQyxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQXRDRCxDQUF5QyxjQUFjLEdBc0N0RDtBQXRDWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBBIHN1YnNldCBvZiB0aGUgYFN0b3JhZ2VgIGludGVyZmFjZSB3aGljaCB3ZSBuZWVkIGZvciB0aGUgYmFja2VuZHMgdG8gd29yay5cbiAqXG4gKiBFc3NlbnRpYWxseSByZW1vdmVzIHRoZSBpbmRleGFibGUgcHJvcGVydGllcyBhbmQgcmVhZG9ubHkgcHJvcGVydGllcyBmcm9tXG4gKiBgU3RvcmFnZWAgaW4gbGliLmRvbS5kLnRzLiBUaGlzIGlzIHNvIHRoYXQgYSBjdXN0b20gdHlwZSBjYW4gZXh0ZW5kIGl0IGZvclxuICogdGVzdGluZy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVbmRlcmx5aW5nU3RvcmFnZSB7XG4gIHJlYWRvbmx5IGxlbmd0aDogbnVtYmVyO1xuICBjbGVhcigpOiB2b2lkO1xuICBnZXRJdGVtKGtleTogc3RyaW5nKTogc3RyaW5nfG51bGw7XG4gIHJlbW92ZUl0ZW0oa2V5OiBzdHJpbmcpOiB2b2lkO1xuICBzZXRJdGVtKGtleTogc3RyaW5nLCBkYXRhOiBzdHJpbmcpOiB2b2lkO1xufVxuXG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdG9yYWdlIEFQSXMuIEFsbCBtZXRob2RzIHJldHVybiBhIGBQcm9taXNlYC5cbiAqIEFsbCBtZXRob2RzIHRha2UgdGhlIGBET01TdHJpbmdgXG4gKiBJREwgdHlwZSAoYXMgaXQgaXMgdGhlIGxvd2VzdCBjb21tb24gZGVub21pbmF0b3IpLlxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgU3RvcmFnZUJhY2tlbmQge1xuICAvKipcbiAgICogV2hlbiBwYXNzZWQgYSBrZXkgYG5hbWVgLCB3aWxsIHJldHVybiB0aGF0IGtleSdzIHZhbHVlLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IGdldEl0ZW0obmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmd8bnVsbD47XG5cbiAgLyoqXG4gICAqIFdoZW4gcGFzc2VkIGEga2V5IGBuYW1lYCwgd2lsbCByZW1vdmUgdGhhdCBrZXkgZnJvbSB0aGUgc3RvcmFnZS5cbiAgICovXG4gIHB1YmxpYyBhYnN0cmFjdCByZW1vdmVJdGVtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIFdoZW4gaW52b2tlZCwgd2lsbCBlbXB0eSBhbGwga2V5cyBvdXQgb2YgdGhlIHN0b3JhZ2UuXG4gICAqL1xuICBwdWJsaWMgYWJzdHJhY3QgY2xlYXIoKTogUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogVGhlIHNldEl0ZW0oKSBtZXRob2Qgb2YgdGhlIGBTdG9yYWdlQmFja2VuZGAgaW50ZXJmYWNlLFxuICAgKiB3aGVuIHBhc3NlZCBhIGtleSBuYW1lIGFuZCB2YWx1ZSwgd2lsbCBhZGQgdGhhdCBrZXkgdG8gdGhlIHN0b3JhZ2UsXG4gICAqIG9yIHVwZGF0ZSB0aGF0IGtleSdzIHZhbHVlIGlmIGl0IGFscmVhZHkgZXhpc3RzLlxuICAgKi9cbiAgcHVibGljIGFic3RyYWN0IHNldEl0ZW0obmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcbn1cblxuLyoqXG4gKiBBIGBTdG9yYWdlQmFja2VuZGAgYmFja2VkIGJ5IGBsb2NhbHN0b3JhZ2VgLlxuICovXG5leHBvcnQgY2xhc3MgTG9jYWxTdG9yYWdlQmFja2VuZCBleHRlbmRzIFN0b3JhZ2VCYWNrZW5kIHtcbiAgcHJpdmF0ZSBzdG9yYWdlOiBVbmRlcmx5aW5nU3RvcmFnZTtcbiAgY29uc3RydWN0b3Ioc3RvcmFnZT86IFVuZGVybHlpbmdTdG9yYWdlKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlIHx8IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0SXRlbShuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZ3xudWxsPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZ3xudWxsPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHRoaXMuc3RvcmFnZS5nZXRJdGVtKG5hbWUpO1xuICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShudWxsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVJdGVtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShuYW1lKTtcbiAgICAgIHJlc29sdmUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBjbGVhcigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5zdG9yYWdlLmNsZWFyKCk7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0SXRlbShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5zdG9yYWdlLnNldEl0ZW0obmFtZSwgdmFsdWUpO1xuICAgICAgcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=