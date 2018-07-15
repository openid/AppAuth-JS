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
            var request = https.request(options, function (response) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQUlILHlCQUEyQjtBQUUzQixvQ0FBdUM7QUFDdkMsb0NBQThCO0FBQzlCLDhCQUFpQztBQUVqQyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDaEQsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDO0FBRTlDOztHQUVHO0FBQ0g7SUFBbUMsaUNBQVM7SUFBNUM7O0lBc0RBLENBQUM7SUFyREMsMkJBQUcsR0FBSCxVQUFPLFFBQTRCO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUksVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNwQywwQ0FBMEM7WUFDMUMsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBSSxDQUFDLENBQUM7WUFDckMsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUUzQixJQUFNLE9BQU8sR0FBRztnQkFDZCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7Z0JBQ3RCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtnQkFDZCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7Z0JBQ2QsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sSUFBSSxFQUFFO2FBQ2hDLENBQUM7WUFFRixJQUFJLElBQUksRUFBRTtnQkFDUixPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNwRTtZQUVELElBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQUMsUUFBd0I7Z0JBQzlELElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7b0JBQy9CLFlBQUcsQ0FBQyw4QkFBOEIsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3pELE1BQU0sQ0FBQyxJQUFJLHFCQUFZLENBQUMsUUFBUSxDQUFDLGFBQWMsQ0FBQyxDQUFDLENBQUM7aUJBQ25EO2dCQUVELElBQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztnQkFDNUIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxLQUFhO29CQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsQ0FBQztnQkFFSCxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRTtvQkFDakIsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxRQUFRLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFBRTt3QkFDaEMsSUFBSTs0QkFDRixPQUFPLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQWMsQ0FBQyxDQUFDO3lCQUN6Qzt3QkFBQyxPQUFPLEdBQUcsRUFBRTs0QkFDWixZQUFHLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLENBQUM7eUJBQzVDO3FCQUNGO3lCQUFNO3dCQUNMLE9BQU8sQ0FBRSxJQUFpQixDQUFDLENBQUM7cUJBQzdCO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLENBQVE7Z0JBQzNCLE1BQU0sQ0FBQyxJQUFJLHFCQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckI7WUFDRCxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBdERELENBQW1DLGVBQVMsR0FzRDNDO0FBdERZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCAqIGFzIEJ1ZmZlciBmcm9tICdidWZmZXInO1xuaW1wb3J0IHtTZXJ2ZXJSZXNwb25zZX0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgKiBhcyBVcmwgZnJvbSAndXJsJztcblxuaW1wb3J0IHtBcHBBdXRoRXJyb3J9IGZyb20gJy4uL2Vycm9ycyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCB7UmVxdWVzdG9yfSBmcm9tICcuLi94aHInO1xuXG5jb25zdCBodHRwcyA9IHJlcXVpcmUoJ2ZvbGxvdy1yZWRpcmVjdHMnKS5odHRwcztcbmNvbnN0IGh0dHAgPSByZXF1aXJlKCdmb2xsb3ctcmVkaXJlY3RzJykuaHR0cDtcblxuLyoqXG4gKiBBIE5vZGUuanMgSFRUUCBjbGllbnQuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb2RlUmVxdWVzdG9yIGV4dGVuZHMgUmVxdWVzdG9yIHtcbiAgeGhyPFQ+KHNldHRpbmdzOiBKUXVlcnlBamF4U2V0dGluZ3MpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8VD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgLy8gaW1wbGVtZW50aW5nIGEgc3Vic2V0IHRoYXQgaXMgcmVxdWlyZWQuXG4gICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uoc2V0dGluZ3MudXJsISk7XG4gICAgICBjb25zdCBkYXRhID0gc2V0dGluZ3MuZGF0YTtcblxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgaG9zdG5hbWU6IHVybC5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsLnBvcnQsXG4gICAgICAgIHBhdGg6IHVybC5wYXRoLFxuICAgICAgICBtZXRob2Q6IHNldHRpbmdzLm1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogc2V0dGluZ3MuaGVhZGVycyB8fCB7fVxuICAgICAgfTtcblxuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzWydDb250ZW50LUxlbmd0aCddID0gU3RyaW5nKGRhdGEudG9TdHJpbmcoKS5sZW5ndGgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXF1ZXN0ID0gaHR0cHMucmVxdWVzdChvcHRpb25zLCAocmVzcG9uc2U6IFNlcnZlclJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICAgICAgICBsb2coJ1JlcXVlc3QgZW5kZWQgd2l0aCBhbiBlcnJvciAnLCByZXNwb25zZS5zdGF0dXNDb2RlKTtcbiAgICAgICAgICByZWplY3QobmV3IEFwcEF1dGhFcnJvcihyZXNwb25zZS5zdGF0dXNNZXNzYWdlISkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2h1bmtzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICByZXNwb25zZS5vbignZGF0YScsIChjaHVuazogQnVmZmVyKSA9PiB7XG4gICAgICAgICAgY2h1bmtzLnB1c2goY2h1bmsudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYm9keSA9IGNodW5rcy5qb2luKCcnKTtcbiAgICAgICAgICBpZiAoc2V0dGluZ3MuZGF0YVR5cGUgPT09ICdqc29uJykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgoSlNPTi5wYXJzZShib2R5KSBhcyBhbnkpIGFzIFQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIGxvZygnQ291bGQgbm90IHBhcnNlIGpzb24gcmVzcG9uc2UnLCBib2R5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZSgoYm9keSBhcyBhbnkpIGFzIFQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCAoZTogRXJyb3IpID0+IHtcbiAgICAgICAgcmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IoZS50b1N0cmluZygpKSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgcmVxdWVzdC53cml0ZShkYXRhKTtcbiAgICAgIH1cbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==