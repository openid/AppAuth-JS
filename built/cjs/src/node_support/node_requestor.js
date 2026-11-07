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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeRequestor = void 0;
const Url = __importStar(require("url"));
const errors_1 = require("../errors");
const logger_1 = require("../logger");
const xhr_1 = require("../xhr");
const follow_redirects_1 = __importDefault(require("follow-redirects"));
const https = follow_redirects_1.default.https;
const http = follow_redirects_1.default.http;
/**
 * A Node.js HTTP client.
 */
class NodeRequestor extends xhr_1.Requestor {
    xhr(settings) {
        return new Promise((resolve, reject) => {
            // implementing a subset that is required.
            const url = Url.parse(settings.url);
            const data = settings.data;
            const options = {
                hostname: url.hostname,
                port: url.port,
                path: url.path,
                method: settings.method,
                headers: settings.headers || {}
            };
            if (data) {
                options.headers['Content-Length'] = String(data.toString().length);
            }
            let protocol = https;
            if (url.protocol && url.protocol.toLowerCase() === 'http:') {
                protocol = http;
            }
            const request = protocol.request(options, (response) => {
                if (response.statusCode !== 200) {
                    (0, logger_1.log)('Request ended with an error ', response.statusCode);
                    reject(new errors_1.AppAuthError(response.statusMessage));
                }
                const chunks = [];
                response.on('data', (chunk) => {
                    chunks.push(chunk.toString());
                });
                response.on('end', () => {
                    const body = chunks.join('');
                    if (settings.dataType === 'json') {
                        try {
                            resolve(JSON.parse(body));
                        }
                        catch (err) {
                            (0, logger_1.log)('Could not parse json response', body);
                        }
                    }
                    else {
                        resolve(body);
                    }
                });
            });
            request.on('error', (e) => {
                reject(new errors_1.AppAuthError(e.toString()));
            });
            if (data) {
                request.write(data);
            }
            request.end();
        });
    }
}
exports.NodeRequestor = NodeRequestor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUlILE1BQVksR0FBRyxnQ0FBWTtBQUUzQixzQ0FBdUM7QUFDdkMsc0NBQThCO0FBQzlCLGdDQUFpQztBQUVqQyx3RUFBK0M7QUFDL0MsTUFBTSxLQUFLLEdBQUcsMEJBQWUsQ0FBQyxLQUFLLENBQUM7QUFDcEMsTUFBTSxJQUFJLEdBQUcsMEJBQWUsQ0FBQyxJQUFJLENBQUM7QUFFbEM7O0dBRUc7QUFDSCxtQkFBMkIsU0FBUSxlQUFTO0lBQzFDLEdBQUcsQ0FBSSxRQUE0QjtRQUNqQyxPQUFPLElBQUksT0FBTyxDQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3hDLDBDQUEwQztZQUMxQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFJLENBQUMsQ0FBQztZQUNyQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBRTNCLE1BQU0sT0FBTyxHQUFHO2dCQUNkLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtnQkFDdEIsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJO2dCQUNkLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtnQkFDZCxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07Z0JBQ3ZCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxJQUFJLEVBQUU7YUFDaEMsQ0FBQztZQUVGLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ1QsT0FBTyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDckUsQ0FBQztZQUVELElBQUksUUFBUSxHQUFRLEtBQUssQ0FBQztZQUMxQixJQUFJLEdBQUcsQ0FBQyxRQUFRLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxPQUFPLEVBQUUsQ0FBQztnQkFDM0QsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNsQixDQUFDO1lBRUQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUF3QixFQUFFLEVBQUU7Z0JBQ3JFLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUUsQ0FBQztvQkFDaEMsSUFBQSxZQUFHLEVBQUMsOEJBQThCLEVBQUUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN6RCxNQUFNLENBQUMsSUFBSSxxQkFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDO2dCQUVELE1BQU0sTUFBTSxHQUFhLEVBQUUsQ0FBQztnQkFDNUIsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFhLEVBQUUsRUFBRTtvQkFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO29CQUN0QixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUM3QixJQUFJLFFBQVEsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFLENBQUM7d0JBQ2pDLElBQUksQ0FBQzs0QkFDSCxPQUFPLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQWMsQ0FBQyxDQUFDO3dCQUMxQyxDQUFDO3dCQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7NEJBQ2IsSUFBQSxZQUFHLEVBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQzdDLENBQUM7b0JBQ0gsQ0FBQzt5QkFBTSxDQUFDO3dCQUNOLE9BQU8sQ0FBRSxJQUFpQixDQUFDLENBQUM7b0JBQzlCLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBUSxFQUFFLEVBQUU7Z0JBQy9CLE1BQU0sQ0FBQyxJQUFJLHFCQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQ1QsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixDQUFDO1lBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCAqIGFzIEJ1ZmZlciBmcm9tICdidWZmZXInO1xuaW1wb3J0IHtTZXJ2ZXJSZXNwb25zZX0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgKiBhcyBVcmwgZnJvbSAndXJsJztcblxuaW1wb3J0IHtBcHBBdXRoRXJyb3J9IGZyb20gJy4uL2Vycm9ycyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCB7UmVxdWVzdG9yfSBmcm9tICcuLi94aHInO1xuXG5pbXBvcnQgZm9sbG93UmVkaXJlY3RzIGZyb20gJ2ZvbGxvdy1yZWRpcmVjdHMnO1xuY29uc3QgaHR0cHMgPSBmb2xsb3dSZWRpcmVjdHMuaHR0cHM7XG5jb25zdCBodHRwID0gZm9sbG93UmVkaXJlY3RzLmh0dHA7XG5cbi8qKlxuICogQSBOb2RlLmpzIEhUVFAgY2xpZW50LlxuICovXG5leHBvcnQgY2xhc3MgTm9kZVJlcXVlc3RvciBleHRlbmRzIFJlcXVlc3RvciB7XG4gIHhocjxUPihzZXR0aW5nczogSlF1ZXJ5QWpheFNldHRpbmdzKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIC8vIGltcGxlbWVudGluZyBhIHN1YnNldCB0aGF0IGlzIHJlcXVpcmVkLlxuICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHNldHRpbmdzLnVybCEpO1xuICAgICAgY29uc3QgZGF0YSA9IHNldHRpbmdzLmRhdGE7XG5cbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGhvc3RuYW1lOiB1cmwuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybC5wb3J0LFxuICAgICAgICBwYXRoOiB1cmwucGF0aCxcbiAgICAgICAgbWV0aG9kOiBzZXR0aW5ncy5tZXRob2QsXG4gICAgICAgIGhlYWRlcnM6IHNldHRpbmdzLmhlYWRlcnMgfHwge31cbiAgICAgIH07XG5cbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIG9wdGlvbnMuaGVhZGVyc1snQ29udGVudC1MZW5ndGgnXSA9IFN0cmluZyhkYXRhLnRvU3RyaW5nKCkubGVuZ3RoKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHByb3RvY29sOiBhbnkgPSBodHRwcztcbiAgICAgIGlmICh1cmwucHJvdG9jb2wgJiYgdXJsLnByb3RvY29sLnRvTG93ZXJDYXNlKCkgPT09ICdodHRwOicpIHtcbiAgICAgICAgcHJvdG9jb2wgPSBodHRwO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXF1ZXN0ID0gcHJvdG9jb2wucmVxdWVzdChvcHRpb25zLCAocmVzcG9uc2U6IFNlcnZlclJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlICE9PSAyMDApIHtcbiAgICAgICAgICBsb2coJ1JlcXVlc3QgZW5kZWQgd2l0aCBhbiBlcnJvciAnLCByZXNwb25zZS5zdGF0dXNDb2RlKTtcbiAgICAgICAgICByZWplY3QobmV3IEFwcEF1dGhFcnJvcihyZXNwb25zZS5zdGF0dXNNZXNzYWdlISkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2h1bmtzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICByZXNwb25zZS5vbignZGF0YScsIChjaHVuazogQnVmZmVyKSA9PiB7XG4gICAgICAgICAgY2h1bmtzLnB1c2goY2h1bmsudG9TdHJpbmcoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlc3BvbnNlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYm9keSA9IGNodW5rcy5qb2luKCcnKTtcbiAgICAgICAgICBpZiAoc2V0dGluZ3MuZGF0YVR5cGUgPT09ICdqc29uJykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSgoSlNPTi5wYXJzZShib2R5KSBhcyBhbnkpIGFzIFQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgIGxvZygnQ291bGQgbm90IHBhcnNlIGpzb24gcmVzcG9uc2UnLCBib2R5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzb2x2ZSgoYm9keSBhcyBhbnkpIGFzIFQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgcmVxdWVzdC5vbignZXJyb3InLCAoZTogRXJyb3IpID0+IHtcbiAgICAgICAgcmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IoZS50b1N0cmluZygpKSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgcmVxdWVzdC53cml0ZShkYXRhKTtcbiAgICAgIH1cbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==