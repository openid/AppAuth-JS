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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQUVILG9DQUF1QztBQUN2QyxpQ0FBb0M7QUFDcEMsOEJBQWlDO0FBQ2pDLG9DQUFnQztBQUVoQzs7R0FFRztBQUNIO0lBQW1DLGlDQUFTO0lBQTVDOztJQXFCQSxDQUFDO0lBcEJDLDJCQUFHLEdBQUgsVUFBTyxRQUE0QjtRQUNqQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUksVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNwQywwQ0FBMEM7WUFDMUMsT0FBTyxDQUNILFFBQVEsQ0FBQyxHQUFJLEVBQUU7Z0JBQ2IsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixJQUFJLEVBQUUsUUFBUSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUztnQkFDckQsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2dCQUNuQixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU87YUFDMUIsRUFDRCxVQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSTtnQkFDcEIsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNoQyxZQUFHLENBQUMsOEJBQThCLEVBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDL0QsTUFBTSxDQUFDLElBQUkscUJBQVksQ0FBQyxRQUFRLENBQUMsYUFBYyxDQUFDLENBQUMsQ0FBQztnQkFDcEQsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixPQUFPLENBQUMsSUFBUyxDQUFDLENBQUM7Z0JBQ3JCLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQXJCRCxDQUFtQyxlQUFTLEdBcUIzQztBQXJCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi4vZXJyb3JzJztcbmltcG9ydCByZXF1ZXN0ID0gcmVxdWlyZSgncmVxdWVzdCcpO1xuaW1wb3J0IHtSZXF1ZXN0b3J9IGZyb20gJy4uL3hocic7XG5pbXBvcnQgeyBsb2cgfSBmcm9tICcuLi9sb2dnZXInO1xuXG4vKipcbiAqIEEgTm9kZS5qcyBIVFRQIGNsaWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vZGVSZXF1ZXN0b3IgZXh0ZW5kcyBSZXF1ZXN0b3Ige1xuICB4aHI8VD4oc2V0dGluZ3M6IEpRdWVyeUFqYXhTZXR0aW5ncyk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBpbXBsZW1lbnRpbmcgYSBzdWJzZXQgdGhhdCBpcyByZXF1aXJlZC5cbiAgICAgIHJlcXVlc3QoXG4gICAgICAgICAgc2V0dGluZ3MudXJsISwge1xuICAgICAgICAgICAgbWV0aG9kOiBzZXR0aW5ncy5tZXRob2QsXG4gICAgICAgICAgICBqc29uOiBzZXR0aW5ncy5kYXRhVHlwZSA9PT0gJ2pzb24nID8gdHJ1ZSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGZvcm06IHNldHRpbmdzLmRhdGEsXG4gICAgICAgICAgICBoZWFkZXJzOiBzZXR0aW5ncy5oZWFkZXJzXG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3IsIHJlc3BvbnNlLCBib2R5KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgIGxvZygnUmVxdWVzdCBlbmRlZCB3aXRoIGFuIGVycm9yICcsIHJlc3BvbnNlLnN0YXR1c0NvZGUsIGJvZHkpO1xuICAgICAgICAgICAgICByZWplY3QobmV3IEFwcEF1dGhFcnJvcihyZXNwb25zZS5zdGF0dXNNZXNzYWdlISkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZShib2R5IGFzIFQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=