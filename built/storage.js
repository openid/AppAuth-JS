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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQWlCSDs7OztHQUlHO0FBQ0g7SUFBQTtJQXNCQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDO0FBdEJxQix3Q0FBYztBQXdCcEM7O0dBRUc7QUFDSDtJQUF5Qyx1Q0FBYztJQUVyRCw2QkFBWSxPQUEyQjtRQUF2QyxZQUNFLGlCQUFPLFNBRVI7UUFEQyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDOztJQUNoRCxDQUFDO0lBRU0scUNBQU8sR0FBZCxVQUFlLElBQVk7UUFBM0IsaUJBU0M7UUFSQyxPQUFPLElBQUksT0FBTyxDQUFjLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDOUMsSUFBTSxLQUFLLEdBQUcsS0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekMsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNmO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sd0NBQVUsR0FBakIsVUFBa0IsSUFBWTtRQUE5QixpQkFLQztRQUpDLE9BQU8sSUFBSSxPQUFPLENBQU8sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxLQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLG1DQUFLLEdBQVo7UUFBQSxpQkFLQztRQUpDLE9BQU8sSUFBSSxPQUFPLENBQU8sVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUN2QyxLQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3JCLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0scUNBQU8sR0FBZCxVQUFlLElBQVksRUFBRSxLQUFhO1FBQTFDLGlCQUtDO1FBSkMsT0FBTyxJQUFJLE9BQU8sQ0FBTyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ3ZDLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsQyxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FBQyxBQXRDRCxDQUF5QyxjQUFjLEdBc0N0RDtBQXRDWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBIHN1YnNldCBvZiB0aGUgYFN0b3JhZ2VgIGludGVyZmFjZSB3aGljaCB3ZSBuZWVkIGZvciB0aGUgYmFja2VuZHMgdG8gd29yay5cclxuICpcclxuICogRXNzZW50aWFsbHkgcmVtb3ZlcyB0aGUgaW5kZXhhYmxlIHByb3BlcnRpZXMgYW5kIHJlYWRvbmx5IHByb3BlcnRpZXMgZnJvbVxyXG4gKiBgU3RvcmFnZWAgaW4gbGliLmRvbS5kLnRzLiBUaGlzIGlzIHNvIHRoYXQgYSBjdXN0b20gdHlwZSBjYW4gZXh0ZW5kIGl0IGZvclxyXG4gKiB0ZXN0aW5nLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBVbmRlcmx5aW5nU3RvcmFnZSB7XHJcbiAgcmVhZG9ubHkgbGVuZ3RoOiBudW1iZXI7XHJcbiAgY2xlYXIoKTogdm9pZDtcclxuICBnZXRJdGVtKGtleTogc3RyaW5nKTogc3RyaW5nfG51bGw7XHJcbiAgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQ7XHJcbiAgc2V0SXRlbShrZXk6IHN0cmluZywgZGF0YTogc3RyaW5nKTogdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFzeW5jaHJvbm91cyBzdG9yYWdlIEFQSXMuIEFsbCBtZXRob2RzIHJldHVybiBhIGBQcm9taXNlYC5cclxuICogQWxsIG1ldGhvZHMgdGFrZSB0aGUgYERPTVN0cmluZ2BcclxuICogSURMIHR5cGUgKGFzIGl0IGlzIHRoZSBsb3dlc3QgY29tbW9uIGRlbm9taW5hdG9yKS5cclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdG9yYWdlQmFja2VuZCB7XHJcbiAgLyoqXHJcbiAgICogV2hlbiBwYXNzZWQgYSBrZXkgYG5hbWVgLCB3aWxsIHJldHVybiB0aGF0IGtleSdzIHZhbHVlLlxyXG4gICAqL1xyXG4gIHB1YmxpYyBhYnN0cmFjdCBnZXRJdGVtKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nfG51bGw+O1xyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHBhc3NlZCBhIGtleSBgbmFtZWAsIHdpbGwgcmVtb3ZlIHRoYXQga2V5IGZyb20gdGhlIHN0b3JhZ2UuXHJcbiAgICovXHJcbiAgcHVibGljIGFic3RyYWN0IHJlbW92ZUl0ZW0obmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgLyoqXHJcbiAgICogV2hlbiBpbnZva2VkLCB3aWxsIGVtcHR5IGFsbCBrZXlzIG91dCBvZiB0aGUgc3RvcmFnZS5cclxuICAgKi9cclxuICBwdWJsaWMgYWJzdHJhY3QgY2xlYXIoKTogUHJvbWlzZTx2b2lkPjtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNldEl0ZW0oKSBtZXRob2Qgb2YgdGhlIGBTdG9yYWdlQmFja2VuZGAgaW50ZXJmYWNlLFxyXG4gICAqIHdoZW4gcGFzc2VkIGEga2V5IG5hbWUgYW5kIHZhbHVlLCB3aWxsIGFkZCB0aGF0IGtleSB0byB0aGUgc3RvcmFnZSxcclxuICAgKiBvciB1cGRhdGUgdGhhdCBrZXkncyB2YWx1ZSBpZiBpdCBhbHJlYWR5IGV4aXN0cy5cclxuICAgKi9cclxuICBwdWJsaWMgYWJzdHJhY3Qgc2V0SXRlbShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xyXG59XHJcblxyXG4vKipcclxuICogQSBgU3RvcmFnZUJhY2tlbmRgIGJhY2tlZCBieSBgbG9jYWxzdG9yYWdlYC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBMb2NhbFN0b3JhZ2VCYWNrZW5kIGV4dGVuZHMgU3RvcmFnZUJhY2tlbmQge1xyXG4gIHByaXZhdGUgc3RvcmFnZTogVW5kZXJseWluZ1N0b3JhZ2U7XHJcbiAgY29uc3RydWN0b3Ioc3RvcmFnZT86IFVuZGVybHlpbmdTdG9yYWdlKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZSB8fCB3aW5kb3cubG9jYWxTdG9yYWdlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldEl0ZW0obmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmd8bnVsbD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHN0cmluZ3xudWxsPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5zdG9yYWdlLmdldEl0ZW0obmFtZSk7XHJcbiAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgIHJlc29sdmUodmFsdWUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc29sdmUobnVsbCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlbW92ZUl0ZW0obmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShuYW1lKTtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY2xlYXIoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICB0aGlzLnN0b3JhZ2UuY2xlYXIoKTtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0SXRlbShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmFnZS5zZXRJdGVtKG5hbWUsIHZhbHVlKTtcclxuICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==