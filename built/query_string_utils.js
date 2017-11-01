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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlfc3RyaW5nX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3F1ZXJ5X3N0cmluZ191dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQWNIO0lBQUE7SUFxQ0EsQ0FBQztJQXBDQyxxQ0FBSyxHQUFMLFVBQU0sS0FBbUIsRUFBRSxPQUFpQjtRQUMxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDN0MsQ0FBQztJQUNILENBQUM7SUFFRCxnREFBZ0IsR0FBaEIsVUFBaUIsS0FBYTtRQUM1QixJQUFJLE1BQU0sR0FBYyxFQUFFLENBQUM7UUFDM0IsOENBQThDO1FBQzlDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDMUMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsMkJBQTJCO1lBQ25ELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFHLENBQUMsQ0FBQztnQkFDN0MsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDdEQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDVixNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFDLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELHlDQUFTLEdBQVQsVUFBVSxLQUFnQjtRQUN4QixJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7UUFDM0IsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUksa0JBQWtCLENBQUMsR0FBRyxDQUFDLFNBQUksa0JBQWtCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFHLENBQUMsQ0FBQTtZQUM5RSxDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDSCw0QkFBQztBQUFELENBQUMsQUFyQ0QsSUFxQ0M7QUFyQ1ksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7TG9jYXRpb25MaWtlLCBTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xuXG5cbi8qKlxuICogUXVlcnkgU3RyaW5nIFV0aWxpdGllcy5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBRdWVyeVN0cmluZ1V0aWxzIHtcbiAgc3RyaW5naWZ5KGlucHV0OiBTdHJpbmdNYXApOiBzdHJpbmc7XG4gIHBhcnNlKHF1ZXJ5OiBMb2NhdGlvbkxpa2UsIHVzZUhhc2g/OiBib29sZWFuKTogU3RyaW5nTWFwO1xuICBwYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5OiBzdHJpbmcpOiBTdHJpbmdNYXA7XG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMgaW1wbGVtZW50cyBRdWVyeVN0cmluZ1V0aWxzIHtcbiAgcGFyc2UoaW5wdXQ6IExvY2F0aW9uTGlrZSwgdXNlSGFzaD86IGJvb2xlYW4pIHtcbiAgICBpZiAodXNlSGFzaCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyc2VRdWVyeVN0cmluZyhpbnB1dC5oYXNoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucGFyc2VRdWVyeVN0cmluZyhpbnB1dC5zZWFyY2gpO1xuICAgIH1cbiAgfVxuXG4gIHBhcnNlUXVlcnlTdHJpbmcocXVlcnk6IHN0cmluZyk6IFN0cmluZ01hcCB7XG4gICAgbGV0IHJlc3VsdDogU3RyaW5nTWFwID0ge307XG4gICAgLy8gaWYgYW55dGhpbmcgc3RhcnRzIHdpdGggPywgIyBvciAmIHJlbW92ZSBpdFxuICAgIHF1ZXJ5ID0gcXVlcnkudHJpbSgpLnJlcGxhY2UoL14oXFw/fCN8JikvLCAnJyk7XG4gICAgbGV0IHBhcmFtcyA9IHF1ZXJ5LnNwbGl0KCcmJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXJhbXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGxldCBwYXJhbSA9IHBhcmFtc1tpXTsgIC8vIGxvb2tzIHNvbWV0aGluZyBsaWtlIGE9YlxuICAgICAgbGV0IHBhcnRzID0gcGFyYW0uc3BsaXQoJz0nKTtcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPj0gMikge1xuICAgICAgICBsZXQga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzLnNoaWZ0KCkhKTtcbiAgICAgICAgbGV0IHZhbHVlID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzLmpvaW4oJz0nKSA6IG51bGw7XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgc3RyaW5naWZ5KGlucHV0OiBTdHJpbmdNYXApIHtcbiAgICBsZXQgZW5jb2RlZDogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBrZXkgaW4gaW5wdXQpIHtcbiAgICAgIGlmIChpbnB1dC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGlucHV0W2tleV0pIHtcbiAgICAgICAgZW5jb2RlZC5wdXNoKGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke2VuY29kZVVSSUNvbXBvbmVudChpbnB1dFtrZXldKX1gKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZW5jb2RlZC5qb2luKCcmJyk7XG4gIH1cbn1cbiJdfQ==