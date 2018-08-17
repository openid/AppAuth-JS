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
Object.defineProperty(exports, "__esModule", { value: true });
var BasicQueryStringUtils = /** @class */ (function () {
    function BasicQueryStringUtils() {
    }
    BasicQueryStringUtils.prototype.parse = function (input, useHash) {
        if (useHash) {
            return this.parseQueryString(input.hash);
        }
        else {
            return this.parseQueryString(input.search);
        }
    };
    BasicQueryStringUtils.prototype.parseQueryString = function (query) {
        var result = {};
        // if anything starts with ?, # or & remove it
        query = query.trim().replace(/^(\?|#|&)/, '');
        var params = query.split('&');
        for (var i = 0; i < params.length; i += 1) {
            var param = params[i]; // looks something like a=b
            var parts = param.split('=');
            if (parts.length >= 2) {
                var key = decodeURIComponent(parts.shift());
                var value = parts.length > 0 ? parts.join('=') : null;
                if (value) {
                    result[key] = decodeURIComponent(value);
                }
            }
        }
        return result;
    };
    BasicQueryStringUtils.prototype.stringify = function (input) {
        var encoded = [];
        for (var key in input) {
            if (input.hasOwnProperty(key) && input[key]) {
                encoded.push(encodeURIComponent(key) + "=" + encodeURIComponent(input[key]));
            }
        }
        return encoded.join('&');
    };
    return BasicQueryStringUtils;
}());
exports.BasicQueryStringUtils = BasicQueryStringUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlfc3RyaW5nX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3F1ZXJ5X3N0cmluZ191dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQWNIO0lBQUE7SUFxQ0EsQ0FBQztJQXBDQyxxQ0FBSyxHQUFMLFVBQU0sS0FBbUIsRUFBRSxPQUFpQjtRQUMxQyxJQUFJLE9BQU8sRUFBRTtZQUNYLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVDO0lBQ0gsQ0FBQztJQUVELGdEQUFnQixHQUFoQixVQUFpQixLQUFhO1FBQzVCLElBQUksTUFBTSxHQUFjLEVBQUUsQ0FBQztRQUMzQiw4Q0FBOEM7UUFDOUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSwyQkFBMkI7WUFDbkQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QixJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUNyQixJQUFJLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFHLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDdEQsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN6QzthQUNGO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQseUNBQVMsR0FBVCxVQUFVLEtBQWdCO1FBQ3hCLElBQUksT0FBTyxHQUFhLEVBQUUsQ0FBQztRQUMzQixLQUFLLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRTtZQUNyQixJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQyxPQUFPLENBQUMsSUFBSSxDQUFJLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxTQUFJLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUE7YUFDN0U7U0FDRjtRQUNELE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBckNELElBcUNDO0FBckNZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtMb2NhdGlvbkxpa2UsIFN0cmluZ01hcH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG5cclxuLyoqXHJcbiAqIFF1ZXJ5IFN0cmluZyBVdGlsaXRpZXMuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5U3RyaW5nVXRpbHMge1xyXG4gIHN0cmluZ2lmeShpbnB1dDogU3RyaW5nTWFwKTogc3RyaW5nO1xyXG4gIHBhcnNlKHF1ZXJ5OiBMb2NhdGlvbkxpa2UsIHVzZUhhc2g/OiBib29sZWFuKTogU3RyaW5nTWFwO1xyXG4gIHBhcnNlUXVlcnlTdHJpbmcocXVlcnk6IHN0cmluZyk6IFN0cmluZ01hcDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2ljUXVlcnlTdHJpbmdVdGlscyBpbXBsZW1lbnRzIFF1ZXJ5U3RyaW5nVXRpbHMge1xyXG4gIHBhcnNlKGlucHV0OiBMb2NhdGlvbkxpa2UsIHVzZUhhc2g/OiBib29sZWFuKSB7XHJcbiAgICBpZiAodXNlSGFzaCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKGlucHV0Lmhhc2gpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGFyc2VRdWVyeVN0cmluZyhpbnB1dC5zZWFyY2gpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGFyc2VRdWVyeVN0cmluZyhxdWVyeTogc3RyaW5nKTogU3RyaW5nTWFwIHtcclxuICAgIGxldCByZXN1bHQ6IFN0cmluZ01hcCA9IHt9O1xyXG4gICAgLy8gaWYgYW55dGhpbmcgc3RhcnRzIHdpdGggPywgIyBvciAmIHJlbW92ZSBpdFxyXG4gICAgcXVlcnkgPSBxdWVyeS50cmltKCkucmVwbGFjZSgvXihcXD98I3wmKS8sICcnKTtcclxuICAgIGxldCBwYXJhbXMgPSBxdWVyeS5zcGxpdCgnJicpO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJhbXMubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgbGV0IHBhcmFtID0gcGFyYW1zW2ldOyAgLy8gbG9va3Mgc29tZXRoaW5nIGxpa2UgYT1iXHJcbiAgICAgIGxldCBwYXJ0cyA9IHBhcmFtLnNwbGl0KCc9Jyk7XHJcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPj0gMikge1xyXG4gICAgICAgIGxldCBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQocGFydHMuc2hpZnQoKSEpO1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHBhcnRzLmxlbmd0aCA+IDAgPyBwYXJ0cy5qb2luKCc9JykgOiBudWxsO1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgcmVzdWx0W2tleV0gPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcblxyXG4gIHN0cmluZ2lmeShpbnB1dDogU3RyaW5nTWFwKSB7XHJcbiAgICBsZXQgZW5jb2RlZDogc3RyaW5nW10gPSBbXTtcclxuICAgIGZvciAobGV0IGtleSBpbiBpbnB1dCkge1xyXG4gICAgICBpZiAoaW5wdXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpbnB1dFtrZXldKSB7XHJcbiAgICAgICAgZW5jb2RlZC5wdXNoKGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke2VuY29kZVVSSUNvbXBvbmVudChpbnB1dFtrZXldKX1gKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW5jb2RlZC5qb2luKCcmJyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==