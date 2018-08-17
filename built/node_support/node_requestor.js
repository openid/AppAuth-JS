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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQUlILHlCQUEyQjtBQUUzQixvQ0FBdUM7QUFDdkMsb0NBQThCO0FBQzlCLDhCQUFpQztBQUVqQyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDaEQsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDO0FBRTlDOztHQUVHO0FBQ0g7SUFBbUMsaUNBQVM7SUFBNUM7O0lBMkRBLENBQUM7SUExREMsMkJBQUcsR0FBSCxVQUFPLFFBQTRCO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUksVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNwQywwQ0FBMEM7WUFDMUMsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBSSxDQUFDLENBQUM7WUFDckMsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUUzQixJQUFNLE9BQU8sR0FBRztnQkFDZCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7Z0JBQ3RCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtnQkFDZCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7Z0JBQ2QsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sSUFBSSxFQUFFO2FBQ2hDLENBQUM7WUFFRixJQUFJLElBQUksRUFBRTtnQkFDUixPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNwRTtZQUVELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLEdBQUcsQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQUU7Z0JBQzFELFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDakI7WUFFRCxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFDLFFBQXdCO2dCQUNqRSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO29CQUMvQixZQUFHLENBQUMsOEJBQThCLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN6RCxNQUFNLENBQUMsSUFBSSxxQkFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFjLENBQUMsQ0FBQyxDQUFDO2lCQUNuRDtnQkFFRCxJQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7Z0JBQzVCLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBYTtvQkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUU7b0JBQ2pCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzdCLElBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7d0JBQ2hDLElBQUk7NEJBQ0YsT0FBTyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFjLENBQUMsQ0FBQzt5QkFDekM7d0JBQUMsT0FBTyxHQUFHLEVBQUU7NEJBQ1osWUFBRyxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUM1QztxQkFDRjt5QkFBTTt3QkFDTCxPQUFPLENBQUUsSUFBaUIsQ0FBQyxDQUFDO3FCQUM3QjtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFRO2dCQUMzQixNQUFNLENBQUMsSUFBSSxxQkFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLElBQUksRUFBRTtnQkFDUixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JCO1lBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQTNERCxDQUFtQyxlQUFTLEdBMkQzQztBQTNEWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0ICogYXMgQnVmZmVyIGZyb20gJ2J1ZmZlcic7XHJcbmltcG9ydCB7U2VydmVyUmVzcG9uc2V9IGZyb20gJ2h0dHAnO1xyXG5pbXBvcnQgKiBhcyBVcmwgZnJvbSAndXJsJztcclxuXHJcbmltcG9ydCB7QXBwQXV0aEVycm9yfSBmcm9tICcuLi9lcnJvcnMnO1xyXG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vbG9nZ2VyJztcclxuaW1wb3J0IHtSZXF1ZXN0b3J9IGZyb20gJy4uL3hocic7XHJcblxyXG5jb25zdCBodHRwcyA9IHJlcXVpcmUoJ2ZvbGxvdy1yZWRpcmVjdHMnKS5odHRwcztcclxuY29uc3QgaHR0cCA9IHJlcXVpcmUoJ2ZvbGxvdy1yZWRpcmVjdHMnKS5odHRwO1xyXG5cclxuLyoqXHJcbiAqIEEgTm9kZS5qcyBIVFRQIGNsaWVudC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBOb2RlUmVxdWVzdG9yIGV4dGVuZHMgUmVxdWVzdG9yIHtcclxuICB4aHI8VD4oc2V0dGluZ3M6IEpRdWVyeUFqYXhTZXR0aW5ncyk6IFByb21pc2U8VD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgLy8gaW1wbGVtZW50aW5nIGEgc3Vic2V0IHRoYXQgaXMgcmVxdWlyZWQuXHJcbiAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZShzZXR0aW5ncy51cmwhKTtcclxuICAgICAgY29uc3QgZGF0YSA9IHNldHRpbmdzLmRhdGE7XHJcblxyXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIGhvc3RuYW1lOiB1cmwuaG9zdG5hbWUsXHJcbiAgICAgICAgcG9ydDogdXJsLnBvcnQsXHJcbiAgICAgICAgcGF0aDogdXJsLnBhdGgsXHJcbiAgICAgICAgbWV0aG9kOiBzZXR0aW5ncy5tZXRob2QsXHJcbiAgICAgICAgaGVhZGVyczogc2V0dGluZ3MuaGVhZGVycyB8fCB7fVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICBvcHRpb25zLmhlYWRlcnNbJ0NvbnRlbnQtTGVuZ3RoJ10gPSBTdHJpbmcoZGF0YS50b1N0cmluZygpLmxlbmd0aCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGxldCBwcm90b2NvbCA9IGh0dHBzO1xyXG4gICAgICBpZiAodXJsLnByb3RvY29sICYmIHVybC5wcm90b2NvbC50b0xvd2VyQ2FzZSgpID09PSAnaHR0cDonKSB7XHJcbiAgICAgICAgcHJvdG9jb2wgPSBodHRwO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gcHJvdG9jb2wucmVxdWVzdChvcHRpb25zLCAocmVzcG9uc2U6IFNlcnZlclJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xyXG4gICAgICAgICAgbG9nKCdSZXF1ZXN0IGVuZGVkIHdpdGggYW4gZXJyb3IgJywgcmVzcG9uc2Uuc3RhdHVzQ29kZSk7XHJcbiAgICAgICAgICByZWplY3QobmV3IEFwcEF1dGhFcnJvcihyZXNwb25zZS5zdGF0dXNNZXNzYWdlISkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2h1bmtzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIHJlc3BvbnNlLm9uKCdkYXRhJywgKGNodW5rOiBCdWZmZXIpID0+IHtcclxuICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXNwb25zZS5vbignZW5kJywgKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgYm9keSA9IGNodW5rcy5qb2luKCcnKTtcclxuICAgICAgICAgIGlmIChzZXR0aW5ncy5kYXRhVHlwZSA9PT0gJ2pzb24nKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgcmVzb2x2ZSgoSlNPTi5wYXJzZShib2R5KSBhcyBhbnkpIGFzIFQpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICAgICAgICBsb2coJ0NvdWxkIG5vdCBwYXJzZSBqc29uIHJlc3BvbnNlJywgYm9keSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKGJvZHkgYXMgYW55KSBhcyBUKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIChlOiBFcnJvcikgPT4ge1xyXG4gICAgICAgIHJlamVjdChuZXcgQXBwQXV0aEVycm9yKGUudG9TdHJpbmcoKSkpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgcmVxdWVzdC53cml0ZShkYXRhKTtcclxuICAgICAgfVxyXG4gICAgICByZXF1ZXN0LmVuZCgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==