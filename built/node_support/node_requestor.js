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
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeRequestor = void 0;
var Url = require("url");
var errors_1 = require("../errors");
var logger_1 = require("../logger");
var xhr_1 = require("../xhr");
var https = require('follow-redirects').https;
var http = require('follow-redirects').http;
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
            var url = Url.parse(settings.url);
            var data = settings.data;
            var options = {
                hostname: url.hostname,
                port: url.port,
                path: url.path,
                method: settings.method,
                headers: settings.headers || {}
            };
            if (data) {
                options.headers['Content-Length'] = String(data.toString().length);
            }
            var protocol = https;
            if (url.protocol && url.protocol.toLowerCase() === 'http:') {
                protocol = http;
            }
            var request = protocol.request(options, function (response) {
                if (response.statusCode !== 200) {
                    logger_1.log('Request ended with an error ', response.statusCode);
                    reject(new errors_1.AppAuthError(response.statusMessage));
                }
                var chunks = [];
                response.on('data', function (chunk) {
                    chunks.push(chunk.toString());
                });
                response.on('end', function () {
                    var body = chunks.join('');
                    if (settings.dataType === 'json') {
                        try {
                            resolve(JSON.parse(body));
                        }
                        catch (err) {
                            logger_1.log('Could not parse json response', body);
                        }
                    }
                    else {
                        resolve(body);
                    }
                });
            });
            request.on('error', function (e) {
                reject(new errors_1.AppAuthError(e.toString()));
            });
            if (data) {
                request.write(data);
            }
            request.end();
        });
    };
    return NodeRequestor;
}(xhr_1.Requestor));
exports.NodeRequestor = NodeRequestor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJSCx5QkFBMkI7QUFFM0Isb0NBQXVDO0FBQ3ZDLG9DQUE4QjtBQUM5Qiw4QkFBaUM7QUFFakMsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ2hELElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUU5Qzs7R0FFRztBQUNIO0lBQW1DLGlDQUFTO0lBQTVDOztJQTJEQSxDQUFDO0lBMURDLDJCQUFHLEdBQUgsVUFBTyxRQUE0QjtRQUNqQyxPQUFPLElBQUksT0FBTyxDQUFJLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDcEMsMENBQTBDO1lBQzFDLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUksQ0FBQyxDQUFDO1lBQ3JDLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFFM0IsSUFBTSxPQUFPLEdBQUc7Z0JBQ2QsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO2dCQUN0QixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7Z0JBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2dCQUNkLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFDdkIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRTthQUNoQyxDQUFDO1lBRUYsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDcEU7WUFFRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFO2dCQUMxRCxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ2pCO1lBRUQsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBQyxRQUF3QjtnQkFDakUsSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtvQkFDL0IsWUFBRyxDQUFDLDhCQUE4QixFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDekQsTUFBTSxDQUFDLElBQUkscUJBQVksQ0FBQyxRQUFRLENBQUMsYUFBYyxDQUFDLENBQUMsQ0FBQztpQkFDbkQ7Z0JBRUQsSUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO2dCQUM1QixRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQWE7b0JBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFO29CQUNqQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM3QixJQUFJLFFBQVEsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO3dCQUNoQyxJQUFJOzRCQUNGLE9BQU8sQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBYyxDQUFDLENBQUM7eUJBQ3pDO3dCQUFDLE9BQU8sR0FBRyxFQUFFOzRCQUNaLFlBQUcsQ0FBQywrQkFBK0IsRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDNUM7cUJBQ0Y7eUJBQU07d0JBQ0wsT0FBTyxDQUFFLElBQWlCLENBQUMsQ0FBQztxQkFDN0I7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBUTtnQkFDM0IsTUFBTSxDQUFDLElBQUkscUJBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyQjtZQUNELE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUEzREQsQ0FBbUMsZUFBUyxHQTJEM0M7QUEzRFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgQnVmZmVyIGZyb20gJ2J1ZmZlcic7XG5pbXBvcnQge1NlcnZlclJlc3BvbnNlfSBmcm9tICdodHRwJztcbmltcG9ydCAqIGFzIFVybCBmcm9tICd1cmwnO1xuXG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi4vZXJyb3JzJztcbmltcG9ydCB7bG9nfSBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IHtSZXF1ZXN0b3J9IGZyb20gJy4uL3hocic7XG5cbmNvbnN0IGh0dHBzID0gcmVxdWlyZSgnZm9sbG93LXJlZGlyZWN0cycpLmh0dHBzO1xuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2ZvbGxvdy1yZWRpcmVjdHMnKS5odHRwO1xuXG4vKipcbiAqIEEgTm9kZS5qcyBIVFRQIGNsaWVudC5cbiAqL1xuZXhwb3J0IGNsYXNzIE5vZGVSZXF1ZXN0b3IgZXh0ZW5kcyBSZXF1ZXN0b3Ige1xuICB4aHI8VD4oc2V0dGluZ3M6IEpRdWVyeUFqYXhTZXR0aW5ncyk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAvLyBpbXBsZW1lbnRpbmcgYSBzdWJzZXQgdGhhdCBpcyByZXF1aXJlZC5cbiAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZShzZXR0aW5ncy51cmwhKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBzZXR0aW5ncy5kYXRhO1xuXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBob3N0bmFtZTogdXJsLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmwucG9ydCxcbiAgICAgICAgcGF0aDogdXJsLnBhdGgsXG4gICAgICAgIG1ldGhvZDogc2V0dGluZ3MubWV0aG9kLFxuICAgICAgICBoZWFkZXJzOiBzZXR0aW5ncy5oZWFkZXJzIHx8IHt9XG4gICAgICB9O1xuXG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBvcHRpb25zLmhlYWRlcnNbJ0NvbnRlbnQtTGVuZ3RoJ10gPSBTdHJpbmcoZGF0YS50b1N0cmluZygpLmxlbmd0aCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBwcm90b2NvbCA9IGh0dHBzO1xuICAgICAgaWYgKHVybC5wcm90b2NvbCAmJiB1cmwucHJvdG9jb2wudG9Mb3dlckNhc2UoKSA9PT0gJ2h0dHA6Jykge1xuICAgICAgICBwcm90b2NvbCA9IGh0dHA7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBwcm90b2NvbC5yZXF1ZXN0KG9wdGlvbnMsIChyZXNwb25zZTogU2VydmVyUmVzcG9uc2UpID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgICAgIGxvZygnUmVxdWVzdCBlbmRlZCB3aXRoIGFuIGVycm9yICcsIHJlc3BvbnNlLnN0YXR1c0NvZGUpO1xuICAgICAgICAgIHJlamVjdChuZXcgQXBwQXV0aEVycm9yKHJlc3BvbnNlLnN0YXR1c01lc3NhZ2UhKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjaHVua3M6IHN0cmluZ1tdID0gW107XG4gICAgICAgIHJlc3BvbnNlLm9uKCdkYXRhJywgKGNodW5rOiBCdWZmZXIpID0+IHtcbiAgICAgICAgICBjaHVua3MucHVzaChjaHVuay50b1N0cmluZygpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBib2R5ID0gY2h1bmtzLmpvaW4oJycpO1xuICAgICAgICAgIGlmIChzZXR0aW5ncy5kYXRhVHlwZSA9PT0gJ2pzb24nKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICByZXNvbHZlKChKU09OLnBhcnNlKGJvZHkpIGFzIGFueSkgYXMgVCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgbG9nKCdDb3VsZCBub3QgcGFyc2UganNvbiByZXNwb25zZScsIGJvZHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKChib2R5IGFzIGFueSkgYXMgVCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIChlOiBFcnJvcikgPT4ge1xuICAgICAgICByZWplY3QobmV3IEFwcEF1dGhFcnJvcihlLnRvU3RyaW5nKCkpKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICByZXF1ZXN0LndyaXRlKGRhdGEpO1xuICAgICAgfVxuICAgICAgcmVxdWVzdC5lbmQoKTtcbiAgICB9KTtcbiAgfVxufVxuIl19