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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJSCx5QkFBMkI7QUFFM0Isb0NBQXVDO0FBQ3ZDLG9DQUE4QjtBQUM5Qiw4QkFBaUM7QUFFakMsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsS0FBSyxDQUFDO0FBQ2hELElBQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQztBQUU5Qzs7R0FFRztBQUNIO0lBQW1DLGlDQUFTO0lBQTVDOztJQTJEQSxDQUFDO0lBMURDLDJCQUFHLEdBQUgsVUFBTyxRQUE0QjtRQUNqQyxPQUFPLElBQUksT0FBTyxDQUFJLFVBQUMsT0FBTyxFQUFFLE1BQU07WUFDcEMsMENBQTBDO1lBQzFDLElBQU0sR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUksQ0FBQyxDQUFDO1lBQ3JDLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFFM0IsSUFBTSxPQUFPLEdBQUc7Z0JBQ2QsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO2dCQUN0QixJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7Z0JBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2dCQUNkLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTTtnQkFDdkIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRTthQUNoQyxDQUFDO1lBRUYsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDcEU7WUFFRCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxFQUFFO2dCQUMxRCxRQUFRLEdBQUcsSUFBSSxDQUFDO2FBQ2pCO1lBRUQsSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBQyxRQUF3QjtnQkFDakUsSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtvQkFDL0IsWUFBRyxDQUFDLDhCQUE4QixFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDekQsTUFBTSxDQUFDLElBQUkscUJBQVksQ0FBQyxRQUFRLENBQUMsYUFBYyxDQUFDLENBQUMsQ0FBQztpQkFDbkQ7Z0JBRUQsSUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO2dCQUM1QixRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEtBQWE7b0JBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ2hDLENBQUMsQ0FBQyxDQUFDO2dCQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFO29CQUNqQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM3QixJQUFJLFFBQVEsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO3dCQUNoQyxJQUFJOzRCQUNGLE9BQU8sQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBYyxDQUFDLENBQUM7eUJBQ3pDO3dCQUFDLE9BQU8sR0FBRyxFQUFFOzRCQUNaLFlBQUcsQ0FBQywrQkFBK0IsRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDNUM7cUJBQ0Y7eUJBQU07d0JBQ0wsT0FBTyxDQUFFLElBQWlCLENBQUMsQ0FBQztxQkFDN0I7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBUTtnQkFDM0IsTUFBTSxDQUFDLElBQUkscUJBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyQjtZQUNELE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUEzREQsQ0FBbUMsZUFBUyxHQTJEM0M7QUEzRFksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCAqIGFzIEJ1ZmZlciBmcm9tICdidWZmZXInO1xyXG5pbXBvcnQge1NlcnZlclJlc3BvbnNlfSBmcm9tICdodHRwJztcclxuaW1wb3J0ICogYXMgVXJsIGZyb20gJ3VybCc7XHJcblxyXG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi4vZXJyb3JzJztcclxuaW1wb3J0IHtsb2d9IGZyb20gJy4uL2xvZ2dlcic7XHJcbmltcG9ydCB7UmVxdWVzdG9yfSBmcm9tICcuLi94aHInO1xyXG5cclxuY29uc3QgaHR0cHMgPSByZXF1aXJlKCdmb2xsb3ctcmVkaXJlY3RzJykuaHR0cHM7XHJcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdmb2xsb3ctcmVkaXJlY3RzJykuaHR0cDtcclxuXHJcbi8qKlxyXG4gKiBBIE5vZGUuanMgSFRUUCBjbGllbnQuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgTm9kZVJlcXVlc3RvciBleHRlbmRzIFJlcXVlc3RvciB7XHJcbiAgeGhyPFQ+KHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxUPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIC8vIGltcGxlbWVudGluZyBhIHN1YnNldCB0aGF0IGlzIHJlcXVpcmVkLlxyXG4gICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uoc2V0dGluZ3MudXJsISk7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSBzZXR0aW5ncy5kYXRhO1xyXG5cclxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBob3N0bmFtZTogdXJsLmhvc3RuYW1lLFxyXG4gICAgICAgIHBvcnQ6IHVybC5wb3J0LFxyXG4gICAgICAgIHBhdGg6IHVybC5wYXRoLFxyXG4gICAgICAgIG1ldGhvZDogc2V0dGluZ3MubWV0aG9kLFxyXG4gICAgICAgIGhlYWRlcnM6IHNldHRpbmdzLmhlYWRlcnMgfHwge31cclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzWydDb250ZW50LUxlbmd0aCddID0gU3RyaW5nKGRhdGEudG9TdHJpbmcoKS5sZW5ndGgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBsZXQgcHJvdG9jb2wgPSBodHRwcztcclxuICAgICAgaWYgKHVybC5wcm90b2NvbCAmJiB1cmwucHJvdG9jb2wudG9Mb3dlckNhc2UoKSA9PT0gJ2h0dHA6Jykge1xyXG4gICAgICAgIHByb3RvY29sID0gaHR0cDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgcmVxdWVzdCA9IHByb3RvY29sLnJlcXVlc3Qob3B0aW9ucywgKHJlc3BvbnNlOiBTZXJ2ZXJSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcclxuICAgICAgICAgIGxvZygnUmVxdWVzdCBlbmRlZCB3aXRoIGFuIGVycm9yICcsIHJlc3BvbnNlLnN0YXR1c0NvZGUpO1xyXG4gICAgICAgICAgcmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IocmVzcG9uc2Uuc3RhdHVzTWVzc2FnZSEpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGNodW5rczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICByZXNwb25zZS5vbignZGF0YScsIChjaHVuazogQnVmZmVyKSA9PiB7XHJcbiAgICAgICAgICBjaHVua3MucHVzaChjaHVuay50b1N0cmluZygpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmVzcG9uc2Uub24oJ2VuZCcsICgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGJvZHkgPSBjaHVua3Muam9pbignJyk7XHJcbiAgICAgICAgICBpZiAoc2V0dGluZ3MuZGF0YVR5cGUgPT09ICdqc29uJykge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgIHJlc29sdmUoKEpTT04ucGFyc2UoYm9keSkgYXMgYW55KSBhcyBUKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgbG9nKCdDb3VsZCBub3QgcGFyc2UganNvbiByZXNwb25zZScsIGJvZHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNvbHZlKChib2R5IGFzIGFueSkgYXMgVCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCAoZTogRXJyb3IpID0+IHtcclxuICAgICAgICByZWplY3QobmV3IEFwcEF1dGhFcnJvcihlLnRvU3RyaW5nKCkpKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgIHJlcXVlc3Qud3JpdGUoZGF0YSk7XHJcbiAgICAgIH1cclxuICAgICAgcmVxdWVzdC5lbmQoKTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=