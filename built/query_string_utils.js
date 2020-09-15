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
exports.BasicQueryStringUtils = void 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlfc3RyaW5nX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3F1ZXJ5X3N0cmluZ191dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7QUFjSDtJQUFBO0lBcUNBLENBQUM7SUFwQ0MscUNBQUssR0FBTCxVQUFNLEtBQW1CLEVBQUUsT0FBaUI7UUFDMUMsSUFBSSxPQUFPLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDMUM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1QztJQUNILENBQUM7SUFFRCxnREFBZ0IsR0FBaEIsVUFBaUIsS0FBYTtRQUM1QixJQUFJLE1BQU0sR0FBYyxFQUFFLENBQUM7UUFDM0IsOENBQThDO1FBQzlDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUsMkJBQTJCO1lBQ25ELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtnQkFDckIsSUFBSSxHQUFHLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRyxDQUFDLENBQUM7Z0JBQzdDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3RELElBQUksS0FBSyxFQUFFO29CQUNULE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDekM7YUFDRjtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELHlDQUFTLEdBQVQsVUFBVSxLQUFnQjtRQUN4QixJQUFJLE9BQU8sR0FBYSxFQUFFLENBQUM7UUFDM0IsS0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDckIsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDM0MsT0FBTyxDQUFDLElBQUksQ0FBSSxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsU0FBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFBO2FBQzdFO1NBQ0Y7UUFDRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FBQyxBQXJDRCxJQXFDQztBQXJDWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCB7TG9jYXRpb25MaWtlLCBTdHJpbmdNYXB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBRdWVyeSBTdHJpbmcgVXRpbGl0aWVzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBRdWVyeVN0cmluZ1V0aWxzIHtcclxuICBzdHJpbmdpZnkoaW5wdXQ6IFN0cmluZ01hcCk6IHN0cmluZztcclxuICBwYXJzZShxdWVyeTogTG9jYXRpb25MaWtlLCB1c2VIYXNoPzogYm9vbGVhbik6IFN0cmluZ01hcDtcclxuICBwYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5OiBzdHJpbmcpOiBTdHJpbmdNYXA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMgaW1wbGVtZW50cyBRdWVyeVN0cmluZ1V0aWxzIHtcclxuICBwYXJzZShpbnB1dDogTG9jYXRpb25MaWtlLCB1c2VIYXNoPzogYm9vbGVhbikge1xyXG4gICAgaWYgKHVzZUhhc2gpIHtcclxuICAgICAgcmV0dXJuIHRoaXMucGFyc2VRdWVyeVN0cmluZyhpbnB1dC5oYXNoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaW5wdXQuc2VhcmNoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBhcnNlUXVlcnlTdHJpbmcocXVlcnk6IHN0cmluZyk6IFN0cmluZ01hcCB7XHJcbiAgICBsZXQgcmVzdWx0OiBTdHJpbmdNYXAgPSB7fTtcclxuICAgIC8vIGlmIGFueXRoaW5nIHN0YXJ0cyB3aXRoID8sICMgb3IgJiByZW1vdmUgaXRcclxuICAgIHF1ZXJ5ID0gcXVlcnkudHJpbSgpLnJlcGxhY2UoL14oXFw/fCN8JikvLCAnJyk7XHJcbiAgICBsZXQgcGFyYW1zID0gcXVlcnkuc3BsaXQoJyYnKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgIGxldCBwYXJhbSA9IHBhcmFtc1tpXTsgIC8vIGxvb2tzIHNvbWV0aGluZyBsaWtlIGE9YlxyXG4gICAgICBsZXQgcGFydHMgPSBwYXJhbS5zcGxpdCgnPScpO1xyXG4gICAgICBpZiAocGFydHMubGVuZ3RoID49IDIpIHtcclxuICAgICAgICBsZXQga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRzLnNoaWZ0KCkhKTtcclxuICAgICAgICBsZXQgdmFsdWUgPSBwYXJ0cy5sZW5ndGggPiAwID8gcGFydHMuam9pbignPScpIDogbnVsbDtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgIHJlc3VsdFtrZXldID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBzdHJpbmdpZnkoaW5wdXQ6IFN0cmluZ01hcCkge1xyXG4gICAgbGV0IGVuY29kZWQ6IHN0cmluZ1tdID0gW107XHJcbiAgICBmb3IgKGxldCBrZXkgaW4gaW5wdXQpIHtcclxuICAgICAgaWYgKGlucHV0Lmhhc093blByb3BlcnR5KGtleSkgJiYgaW5wdXRba2V5XSkge1xyXG4gICAgICAgIGVuY29kZWQucHVzaChgJHtlbmNvZGVVUklDb21wb25lbnQoa2V5KX09JHtlbmNvZGVVUklDb21wb25lbnQoaW5wdXRba2V5XSl9YClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVuY29kZWQuam9pbignJicpO1xyXG4gIH1cclxufVxyXG4iXX0=