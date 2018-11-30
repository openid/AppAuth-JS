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
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7OztBQUlILHlCQUEyQjtBQUUzQixvQ0FBdUM7QUFDdkMsb0NBQThCO0FBQzlCLDhCQUFpQztBQUVqQyxJQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDaEQsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUMsSUFBSSxDQUFDO0FBRTlDOztHQUVHO0FBQ0g7SUFBbUMsaUNBQVM7SUFBNUM7O0lBMkRBLENBQUM7SUExREMsMkJBQUcsR0FBSCxVQUFPLFFBQTRCO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUksVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNwQywwQ0FBMEM7WUFDMUMsSUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBSSxDQUFDLENBQUM7WUFDckMsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztZQUUzQixJQUFNLE9BQU8sR0FBRztnQkFDZCxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7Z0JBQ3RCLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtnQkFDZCxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7Z0JBQ2QsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO2dCQUN2QixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sSUFBSSxFQUFFO2FBQ2hDLENBQUM7WUFFRixJQUFJLElBQUksRUFBRTtnQkFDUixPQUFPLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNwRTtZQUVELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLEdBQUcsQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQUU7Z0JBQzFELFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDakI7WUFFRCxJQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFDLFFBQXdCO2dCQUNqRSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO29CQUMvQixZQUFHLENBQUMsOEJBQThCLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN6RCxNQUFNLENBQUMsSUFBSSxxQkFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFjLENBQUMsQ0FBQyxDQUFDO2lCQUNuRDtnQkFFRCxJQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7Z0JBQzVCLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQUMsS0FBYTtvQkFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUU7b0JBQ2pCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQzdCLElBQUksUUFBUSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7d0JBQ2hDLElBQUk7NEJBQ0YsT0FBTyxDQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFjLENBQUMsQ0FBQzt5QkFDekM7d0JBQUMsT0FBTyxHQUFHLEVBQUU7NEJBQ1osWUFBRyxDQUFDLCtCQUErQixFQUFFLElBQUksQ0FBQyxDQUFDO3lCQUM1QztxQkFDRjt5QkFBTTt3QkFDTCxPQUFPLENBQUUsSUFBaUIsQ0FBQyxDQUFDO3FCQUM3QjtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFRO2dCQUMzQixNQUFNLENBQUMsSUFBSSxxQkFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLElBQUksRUFBRTtnQkFDUixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3JCO1lBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FBQyxBQTNERCxDQUFtQyxlQUFTLEdBMkQzQztBQTNEWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBCdWZmZXIgZnJvbSAnYnVmZmVyJztcbmltcG9ydCB7U2VydmVyUmVzcG9uc2V9IGZyb20gJ2h0dHAnO1xuaW1wb3J0ICogYXMgVXJsIGZyb20gJ3VybCc7XG5cbmltcG9ydCB7QXBwQXV0aEVycm9yfSBmcm9tICcuLi9lcnJvcnMnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQge1JlcXVlc3Rvcn0gZnJvbSAnLi4veGhyJztcblxuY29uc3QgaHR0cHMgPSByZXF1aXJlKCdmb2xsb3ctcmVkaXJlY3RzJykuaHR0cHM7XG5jb25zdCBodHRwID0gcmVxdWlyZSgnZm9sbG93LXJlZGlyZWN0cycpLmh0dHA7XG5cbi8qKlxuICogQSBOb2RlLmpzIEhUVFAgY2xpZW50LlxuICovXG5leHBvcnQgY2xhc3MgTm9kZVJlcXVlc3RvciBleHRlbmRzIFJlcXVlc3RvciB7XG4gIHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGltcGxlbWVudGluZyBhIHN1YnNldCB0aGF0IGlzIHJlcXVpcmVkLlxuICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHNldHRpbmdzLnVybCEpO1xuICAgICAgY29uc3QgZGF0YSA9IHNldHRpbmdzLmRhdGE7XG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGhvc3RuYW1lOiB1cmwuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybC5wb3J0LFxuICAgICAgICBwYXRoOiB1cmwucGF0aCxcbiAgICAgICAgbWV0aG9kOiBzZXR0aW5ncy5tZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IHNldHRpbmdzLmhlYWRlcnMgfHwge31cbiAgICAgIH07XG5cbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIG9wdGlvbnMuaGVhZGVyc1snQ29udGVudC1MZW5ndGgnXSA9IFN0cmluZyhkYXRhLnRvU3RyaW5nKCkubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHByb3RvY29sID0gaHR0cHM7XG4gICAgICBpZiAodXJsLnByb3RvY29sICYmIHVybC5wcm90b2NvbC50b0xvd2VyQ2FzZSgpID09PSAnaHR0cDonKSB7XG4gICAgICAgIHByb3RvY29sID0gaHR0cDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVxdWVzdCA9IHByb3RvY29sLnJlcXVlc3Qob3B0aW9ucywgKHJlc3BvbnNlOiBTZXJ2ZXJSZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICAgICAgbG9nKCdSZXF1ZXN0IGVuZGVkIHdpdGggYW4gZXJyb3IgJywgcmVzcG9uc2Uuc3RhdHVzQ29kZSk7XG4gICAgICAgICAgcmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IocmVzcG9uc2Uuc3RhdHVzTWVzc2FnZSEpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNodW5rczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgcmVzcG9uc2Uub24oJ2RhdGEnLCAoY2h1bms6IEJ1ZmZlcikgPT4ge1xuICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXNwb25zZS5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJvZHkgPSBjaHVua3Muam9pbignJyk7XG4gICAgICAgICAgaWYgKHNldHRpbmdzLmRhdGFUeXBlID09PSAnanNvbicpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHJlc29sdmUoKEpTT04ucGFyc2UoYm9keSkgYXMgYW55KSBhcyBUKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICBsb2coJ0NvdWxkIG5vdCBwYXJzZSBqc29uIHJlc3BvbnNlJywgYm9keSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoKGJvZHkgYXMgYW55KSBhcyBUKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHJlcXVlc3Qub24oJ2Vycm9yJywgKGU6IEVycm9yKSA9PiB7XG4gICAgICAgIHJlamVjdChuZXcgQXBwQXV0aEVycm9yKGUudG9TdHJpbmcoKSkpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIHJlcXVlc3Qud3JpdGUoZGF0YSk7XG4gICAgICB9XG4gICAgICByZXF1ZXN0LmVuZCgpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=