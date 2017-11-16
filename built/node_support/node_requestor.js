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
var errors_1 = require("../errors");
var request = require("request");
var xhr_1 = require("../xhr");
var logger_1 = require("../logger");
/**
 * A Node.js HTTP client.
 */
var NodeRequestor = /** @class */ (function (_super) {
    __extends(NodeRequestor, _super);
    function NodeRequestor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeRequestor.prototype.xhr = function (settings) {
        return new Promise(function (resolve, reject) {
            // implementing a subset that is required.
            request(settings.url, {
                method: settings.method,
                json: settings.dataType === 'json' ? true : undefined,
                form: settings.data,
                headers: settings.headers
            }, function (error, response, body) {
                if (response.statusCode !== 200) {
                    logger_1.log('Request ended with an error ', response.statusCode, body);
                    reject(new errors_1.AppAuthError(response.statusMessage));
                }
                else {
                    resolve(body);
                }
            });
        });
    };
    return NodeRequestor;
}(xhr_1.Requestor));
exports.NodeRequestor = NodeRequestor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQUVILG9DQUF1QztBQUN2QyxpQ0FBbUM7QUFDbkMsOEJBQWlDO0FBQ2pDLG9DQUFnQztBQUVoQzs7R0FFRztBQUNIO0lBQW1DLGlDQUFTO0lBQTVDOztJQXFCQSxDQUFDO0lBcEJDLDJCQUFHLEdBQUgsVUFBTyxRQUE0QjtRQUNqQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUksVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNwQywwQ0FBMEM7WUFDMUMsT0FBTyxDQUNILFFBQVEsQ0FBQyxHQUFJLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUztnQkFDckQsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2dCQUNuQixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87YUFDMUIsRUFDRCxVQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSTtnQkFDcEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxZQUFHLENBQUMsOEJBQThCLEVBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDL0QsTUFBTSxDQUFDLElBQUkscUJBQVksQ0FBQyxRQUFRLENBQUMsYUFBYyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixPQUFPLENBQUMsSUFBUyxDQUFDLENBQUM7Z0JBQ3JCLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXJCRCxDQUFtQyxlQUFTLEdBcUIzQztBQXJCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi4vZXJyb3JzJztcbmltcG9ydCAqIGFzIHJlcXVlc3QgZnJvbSAncmVxdWVzdCc7XG5pbXBvcnQge1JlcXVlc3Rvcn0gZnJvbSAnLi4veGhyJztcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4uL2xvZ2dlcic7XG5cbi8qKlxuICogQSBOb2RlLmpzIEhUVFAgY2xpZW50LlxuICovXG5leHBvcnQgY2xhc3MgTm9kZVJlcXVlc3RvciBleHRlbmRzIFJlcXVlc3RvciB7XG4gIHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGltcGxlbWVudGluZyBhIHN1YnNldCB0aGF0IGlzIHJlcXVpcmVkLlxuICAgICAgcmVxdWVzdChcbiAgICAgICAgICBzZXR0aW5ncy51cmwhLCB7XG4gICAgICAgICAgICBtZXRob2Q6IHNldHRpbmdzLm1ldGhvZCxcbiAgICAgICAgICAgIGpzb246IHNldHRpbmdzLmRhdGFUeXBlID09PSAnanNvbicgPyB0cnVlIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgZm9ybTogc2V0dGluZ3MuZGF0YSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHNldHRpbmdzLmhlYWRlcnNcbiAgICAgICAgICB9LFxuICAgICAgICAgIChlcnJvciwgcmVzcG9uc2UsIGJvZHkpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgbG9nKCdSZXF1ZXN0IGVuZGVkIHdpdGggYW4gZXJyb3IgJywgcmVzcG9uc2Uuc3RhdHVzQ29kZSwgYm9keSk7XG4gICAgICAgICAgICAgIHJlamVjdChuZXcgQXBwQXV0aEVycm9yKHJlc3BvbnNlLnN0YXR1c01lc3NhZ2UhKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXNvbHZlKGJvZHkgYXMgVCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==