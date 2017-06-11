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
var BasicQueryStringUtils = (function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlfc3RyaW5nX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3F1ZXJ5X3N0cmluZ191dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQWNIO0lBQUE7SUFxQ0EsQ0FBQztJQXBDQyxxQ0FBSyxHQUFMLFVBQU0sS0FBbUIsRUFBRSxPQUFpQjtRQUMxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsQ0FBQztJQUNILENBQUM7SUFFRCxnREFBZ0IsR0FBaEIsVUFBaUIsS0FBYTtRQUM1QixJQUFJLE1BQU0sR0FBYyxFQUFFLENBQUM7UUFDM0IsOENBQThDO1FBQzlDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDMUMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsMkJBQTJCO1lBQ25ELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFHLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQ3RELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCx5Q0FBUyxHQUFULFVBQVUsS0FBZ0I7UUFDeEIsSUFBSSxPQUFPLEdBQWEsRUFBRSxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdEIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFJLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxTQUFJLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBRyxDQUFDLENBQUE7WUFDOUUsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUFDLEFBckNELElBcUNDO0FBckNZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0xvY2F0aW9uTGlrZSwgU3RyaW5nTWFwfSBmcm9tICcuL3R5cGVzJztcblxuXG4vKipcbiAqIFF1ZXJ5IFN0cmluZyBVdGlsaXRpZXMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnlTdHJpbmdVdGlscyB7XG4gIHN0cmluZ2lmeShpbnB1dDogU3RyaW5nTWFwKTogc3RyaW5nO1xuICBwYXJzZShxdWVyeTogTG9jYXRpb25MaWtlLCB1c2VIYXNoPzogYm9vbGVhbik6IFN0cmluZ01hcDtcbiAgcGFyc2VRdWVyeVN0cmluZyhxdWVyeTogc3RyaW5nKTogU3RyaW5nTWFwO1xufVxuXG5leHBvcnQgY2xhc3MgQmFzaWNRdWVyeVN0cmluZ1V0aWxzIGltcGxlbWVudHMgUXVlcnlTdHJpbmdVdGlscyB7XG4gIHBhcnNlKGlucHV0OiBMb2NhdGlvbkxpa2UsIHVzZUhhc2g/OiBib29sZWFuKSB7XG4gICAgaWYgKHVzZUhhc2gpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaW5wdXQuaGFzaCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaW5wdXQuc2VhcmNoKTtcbiAgICB9XG4gIH1cblxuICBwYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5OiBzdHJpbmcpOiBTdHJpbmdNYXAge1xuICAgIGxldCByZXN1bHQ6IFN0cmluZ01hcCA9IHt9O1xuICAgIC8vIGlmIGFueXRoaW5nIHN0YXJ0cyB3aXRoID8sICMgb3IgJiByZW1vdmUgaXRcbiAgICBxdWVyeSA9IHF1ZXJ5LnRyaW0oKS5yZXBsYWNlKC9eKFxcP3wjfCYpLywgJycpO1xuICAgIGxldCBwYXJhbXMgPSBxdWVyeS5zcGxpdCgnJicpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBsZXQgcGFyYW0gPSBwYXJhbXNbaV07ICAvLyBsb29rcyBzb21ldGhpbmcgbGlrZSBhPWJcbiAgICAgIGxldCBwYXJ0cyA9IHBhcmFtLnNwbGl0KCc9Jyk7XG4gICAgICBpZiAocGFydHMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgbGV0IGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJ0cy5zaGlmdCgpISk7XG4gICAgICAgIGxldCB2YWx1ZSA9IHBhcnRzLmxlbmd0aCA+IDAgPyBwYXJ0cy5qb2luKCc9JykgOiBudWxsO1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHN0cmluZ2lmeShpbnB1dDogU3RyaW5nTWFwKSB7XG4gICAgbGV0IGVuY29kZWQ6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQga2V5IGluIGlucHV0KSB7XG4gICAgICBpZiAoaW5wdXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpbnB1dFtrZXldKSB7XG4gICAgICAgIGVuY29kZWQucHVzaChgJHtlbmNvZGVVUklDb21wb25lbnQoa2V5KX09JHtlbmNvZGVVUklDb21wb25lbnQoaW5wdXRba2V5XSl9YClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVuY29kZWQuam9pbignJicpO1xuICB9XG59XG4iXX0=