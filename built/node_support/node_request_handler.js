"use strict";
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
var crypto_utils_1 = require("./crypto_utils");
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
// TypeScript typings for `opener` are not correct and do not export it as module
var opener = require("opener");
var hapi_1 = require("hapi");
var EventEmitter = require("events");
var query_string_utils_1 = require("../query_string_utils");
var authorization_request_handler_1 = require("../authorization_request_handler");
var authorization_response_1 = require("../authorization_response");
var logger_1 = require("../logger");
var ServerEventsEmitter = /** @class */ (function (_super) {
    __extends(ServerEventsEmitter, _super);
    function ServerEventsEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServerEventsEmitter.ON_UNABLE_TO_START = 'unable_to_start';
    ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE = 'authorization_response';
    return ServerEventsEmitter;
}(EventEmitter));
var NodeBasedHandler = /** @class */ (function (_super) {
    __extends(NodeBasedHandler, _super);
    function NodeBasedHandler(
    // default to port 8000
    httpServerPort, utils, generateRandom) {
        if (httpServerPort === void 0) { httpServerPort = 8000; }
        if (utils === void 0) { utils = new query_string_utils_1.BasicQueryStringUtils(); }
        if (generateRandom === void 0) { generateRandom = crypto_utils_1.nodeCryptoGenerateRandom; }
        var _this = _super.call(this, utils, generateRandom) || this;
        _this.httpServerPort = httpServerPort;
        // the handle to the current authorization request
        _this.authorizationPromise = null;
        return _this;
    }
    NodeBasedHandler.prototype.performAuthorizationRequest = function (configuration, request) {
        var _this = this;
        // use opener to launch a web browser and start the authorization flow.
        // start a web server to handle the authorization response.
        var server = new hapi_1.Server({
            port: this.httpServerPort
        });
        var emitter = new ServerEventsEmitter();
        this.authorizationPromise = new Promise(function (resolve, reject) {
            emitter.once(ServerEventsEmitter.ON_UNABLE_TO_START, function () {
                reject("Unable to create HTTP server at port " + _this.httpServerPort);
            });
            emitter.once(ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE, function (result) {
                // resolve pending promise
                resolve(result);
                // complete authorization flow
                _this.completeAuthorizationRequestIfPossible();
            });
        });
        server.route({
            method: 'GET',
            path: '/',
            handler: function (hapiRequest, hapiResponse) {
                // Unsafe cast. :(
                var queryParams = hapiRequest.query;
                var state = queryParams['state'];
                var code = queryParams['code'];
                var error = queryParams['error'];
                logger_1.log('Handling Authorization Request ', queryParams, state, code, error);
                var authorizationResponse = null;
                var authorizationError = null;
                if (error) {
                    // get additional optional info.
                    var errorUri = queryParams['error_uri'];
                    var errorDescription = queryParams['error_description'];
                    authorizationError = new authorization_response_1.AuthorizationError(error, errorDescription, errorUri, state);
                }
                else {
                    authorizationResponse = new authorization_response_1.AuthorizationResponse(code, state);
                }
                var completeResponse = {
                    request: request,
                    response: authorizationResponse,
                    error: authorizationError
                };
                emitter.emit(ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE, completeResponse);
                server.stop();
                return 'Close your browser to continue';
            }
        });
        server.start()
            .then(function () {
            var url = _this.buildRequestUrl(configuration, request);
            logger_1.log('Making a request to ', request, url);
            opener(url);
        })
            .catch(function (error) {
            logger_1.log('Something bad happened ', error);
        });
    };
    NodeBasedHandler.prototype.completeAuthorizationRequest = function () {
        if (!this.authorizationPromise) {
            return Promise.reject('No pending authorization request. Call performAuthorizationRequest() ?');
        }
        return this.authorizationPromise;
    };
    return NodeBasedHandler;
}(authorization_request_handler_1.AuthorizationRequestHandler));
exports.NodeBasedHandler = NodeBasedHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUEyRTtBQUMzRTs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxpRkFBaUY7QUFDakYsK0JBQWtDO0FBQ2xDLDZCQUF1RTtBQUN2RSxxQ0FBd0M7QUFDeEMsNERBQWdGO0FBRWhGLGtGQUkwQztBQUMxQyxvRUFBd0k7QUFFeEksb0NBQWdDO0FBRWhDO0lBQWtDLHVDQUFZO0lBQTlDOztJQUdBLENBQUM7SUFGUSxzQ0FBa0IsR0FBRyxpQkFBaUIsQ0FBQztJQUN2Qyw2Q0FBeUIsR0FBRyx3QkFBd0IsQ0FBQztJQUM5RCwwQkFBQztDQUFBLEFBSEQsQ0FBa0MsWUFBWSxHQUc3QztBQUVEO0lBQXNDLG9DQUEyQjtJQUkvRDtJQUNFLHVCQUF1QjtJQUNoQixjQUFxQixFQUM1QixLQUFxRCxFQUNyRCxjQUF5QztRQUZsQywrQkFBQSxFQUFBLHFCQUFxQjtRQUM1QixzQkFBQSxFQUFBLFlBQThCLDBDQUFxQixFQUFFO1FBQ3JELCtCQUFBLEVBQUEsaUJBQWlCLHVDQUF3QjtRQUozQyxZQUtFLGtCQUFNLEtBQUssRUFBRSxjQUFjLENBQUMsU0FDN0I7UUFKUSxvQkFBYyxHQUFkLGNBQWMsQ0FBTztRQUw5QixrREFBa0Q7UUFDbEQsMEJBQW9CLEdBQXdELElBQUksQ0FBQzs7SUFRakYsQ0FBQztJQUVELHNEQUEyQixHQUEzQixVQUNFLGFBQWdELEVBQUUsT0FBNkI7UUFEakYsaUJBOERDO1FBNURDLHVFQUF1RTtRQUN2RSwyREFBMkQ7UUFDM0QsSUFBTSxNQUFNLEdBQUcsSUFBSSxhQUFNLENBQUM7WUFDeEIsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjO1NBQzFCLENBQUMsQ0FBQztRQUVILElBQU0sT0FBTyxHQUFHLElBQUks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RTtRQUVELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFwRkQsQ0FBc0MsMkRBQTJCLEdBb0ZoRTtBQXBGWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBub2RlQ3J5cHRvR2VuZXJhdGVSYW5kb20sIFJhbmRvbUdlbmVyYXRvciB9IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vLyBUeXBlU2NyaXB0IHR5cGluZ3MgZm9yIGBvcGVuZXJgIGFyZSBub3QgY29ycmVjdCBhbmQgZG8gbm90IGV4cG9ydCBpdCBhcyBtb2R1bGVcbmltcG9ydCBvcGVuZXIgPSByZXF1aXJlKCdvcGVuZXInKTtcbmltcG9ydCB7IFJlcXVlc3QsIFNlcnZlck9wdGlvbnMsIFNlcnZlciwgUmVzcG9uc2VUb29sa2l0IH0gZnJvbSAnaGFwaSc7XG5pbXBvcnQgKiBhcyAgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgeyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMsIFF1ZXJ5U3RyaW5nVXRpbHMgfSBmcm9tICcuLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvblJlcXVlc3QsIEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbiB9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5pbXBvcnQge1xuICAgIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlcixcbiAgICBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlLFxuICAgIEJVSUxUX0lOX1BBUkFNRVRFUlNcbn0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvbkVycm9yLCBBdXRob3JpemF0aW9uUmVzcG9uc2UsIEF1dGhvcml6YXRpb25SZXNwb25zZUpzb24sIEF1dGhvcml6YXRpb25FcnJvckpzb24gfSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3Jlc3BvbnNlJ1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25Kc29uIH0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vbG9nZ2VyJztcblxuY2xhc3MgU2VydmVyRXZlbnRzRW1pdHRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHN0YXRpYyBPTl9VTkFCTEVfVE9fU1RBUlQgPSAndW5hYmxlX3RvX3N0YXJ0JztcbiAgc3RhdGljIE9OX0FVVEhPUklaQVRJT05fUkVTUE9OU0UgPSAnYXV0aG9yaXphdGlvbl9yZXNwb25zZSc7XG59XG5cbmV4cG9ydCBjbGFzcyBOb2RlQmFzZWRIYW5kbGVyIGV4dGVuZHMgQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHtcbiAgLy8gdGhlIGhhbmRsZSB0byB0aGUgY3VycmVudCBhdXRob3JpemF0aW9uIHJlcXVlc3RcbiAgYXV0aG9yaXphdGlvblByb21pc2U6IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZSB8IG51bGw+IHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgLy8gZGVmYXVsdCB0byBwb3J0IDgwMDBcbiAgICBwdWJsaWMgaHR0cFNlcnZlclBvcnQgPSA4MDAwLFxuICAgIHV0aWxzOiBRdWVyeVN0cmluZ1V0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpLFxuICAgIGdlbmVyYXRlUmFuZG9tID0gbm9kZUNyeXB0b0dlbmVyYXRlUmFuZG9tKSB7XG4gICAgc3VwZXIodXRpbHMsIGdlbmVyYXRlUmFuZG9tKTtcbiAgfVxuXG4gIHBlcmZvcm1BdXRob3JpemF0aW9uUmVxdWVzdChcbiAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0KSB7XG4gICAgLy8gdXNlIG9wZW5lciB0byBsYXVuY2ggYSB3ZWIgYnJvd3NlciBhbmQgc3RhcnQgdGhlIGF1dGhvcml6YXRpb24gZmxvdy5cbiAgICAvLyBzdGFydCBhIHdlYiBzZXJ2ZXIgdG8gaGFuZGxlIHRoZSBhdXRob3JpemF0aW9uIHJlc3BvbnNlLlxuICAgIGNvbnN0IHNlcnZlciA9IG5ldyBTZXJ2ZXIoe1xuICAgICAgcG9ydDogdGhpcy5odHRwU2VydmVyUG9ydFxuICAgIH0pO1xuXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBTZXJ2ZXJFdmVudHNFbWl0dGVyKCk7XG5cbiAgICB0aGlzLmF1dGhvcml6YXRpb25Qcm9taXNlID0gbmV3IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW1pdHRlci5vbmNlKFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fVU5BQkxFX1RPX1NUQVJULCAoKSA9PiB7XG4gICAgICAgIHJlamVjdChgVW5hYmxlIHRvIGNyZWF0ZSBIVFRQIHNlcnZlciBhdCBwb3J0ICR7dGhpcy5odHRwU2VydmVyUG9ydH1gKTtcbiAgICAgIH0pO1xuICAgICAgZW1pdHRlci5vbmNlKFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fQVVUSE9SSVpBVElPTl9SRVNQT05TRSwgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgIC8vIHJlc29sdmUgcGVuZGluZyBwcm9taXNlXG4gICAgICAgIHJlc29sdmUocmVzdWx0IGFzIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2UpO1xuICAgICAgICAvLyBjb21wbGV0ZSBhdXRob3JpemF0aW9uIGZsb3dcbiAgICAgICAgdGhpcy5jb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0SWZQb3NzaWJsZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJ2ZXIucm91dGUoe1xuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIHBhdGg6ICcvJyxcbiAgICAgIGhhbmRsZXI6IChoYXBpUmVxdWVzdDogUmVxdWVzdCwgaGFwaVJlc3BvbnNlOiBSZXNwb25zZVRvb2xraXQpID0+IHtcbiAgICAgICAgLy8gVW5zYWZlIGNhc3QuIDooXG4gICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IGhhcGlSZXF1ZXN0LnF1ZXJ5IGFzIGFueSBhcyAoQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbiAmIEF1dGhvcml6YXRpb25FcnJvckpzb24pO1xuICAgICAgICBsZXQgc3RhdGUgPSBxdWVyeVBhcmFtc1snc3RhdGUnXTtcbiAgICAgICAgbGV0IGNvZGUgPSBxdWVyeVBhcmFtc1snY29kZSddO1xuICAgICAgICBsZXQgZXJyb3IgPSBxdWVyeVBhcmFtc1snZXJyb3InXTtcbiAgICAgICAgbG9nKCdIYW5kbGluZyBBdXRob3JpemF0aW9uIFJlcXVlc3QgJywgcXVlcnlQYXJhbXMsIHN0YXRlLCBjb2RlLCBlcnJvcik7XG4gICAgICAgIGxldCBhdXRob3JpemF0aW9uUmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZSB8IG51bGwgPSBudWxsO1xuICAgICAgICBsZXQgYXV0aG9yaXphdGlvbkVycm9yOiBBdXRob3JpemF0aW9uRXJyb3IgfCBudWxsID0gbnVsbDtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgLy8gZ2V0IGFkZGl0aW9uYWwgb3B0aW9uYWwgaW5mby5cbiAgICAgICAgICBsZXQgZXJyb3JVcmkgPSBxdWVyeVBhcmFtc1snZXJyb3JfdXJpJ107XG4gICAgICAgICAgbGV0IGVycm9yRGVzY3JpcHRpb24gPSBxdWVyeVBhcmFtc1snZXJyb3JfZGVzY3JpcHRpb24nXTtcbiAgICAgICAgICBhdXRob3JpemF0aW9uRXJyb3IgPSBuZXcgQXV0aG9yaXphdGlvbkVycm9yKGVycm9yLCBlcnJvckRlc2NyaXB0aW9uLCBlcnJvclVyaSwgc3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF1dGhvcml6YXRpb25SZXNwb25zZSA9IG5ldyBBdXRob3JpemF0aW9uUmVzcG9uc2UoY29kZSEsIHN0YXRlISk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbXBsZXRlUmVzcG9uc2UgPSB7XG4gICAgICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgICAgICByZXNwb25zZTogYXV0aG9yaXphdGlvblJlc3BvbnNlLFxuICAgICAgICAgIGVycm9yOiBhdXRob3JpemF0aW9uRXJyb3JcbiAgICAgICAgfSBhcyBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlO1xuICAgICAgICBlbWl0dGVyLmVtaXQoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFLCBjb21wbGV0ZVJlc3BvbnNlKTtcbiAgICAgICAgc2VydmVyLnN0b3AoKTtcbiAgICAgICAgcmV0dXJuICdDbG9zZSB5b3VyIGJyb3dzZXIgdG8gY29udGludWUnO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc2VydmVyLnN0YXJ0KClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuYnVpbGRSZXF1ZXN0VXJsKGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpO1xuICAgICAgICBsb2coJ01ha2luZyBhIHJlcXVlc3QgdG8gJywgcmVxdWVzdCwgdXJsKTtcbiAgICAgICAgb3BlbmVyKHVybCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgbG9nKCdTb21ldGhpbmcgYmFkIGhhcHBlbmVkICcsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlIHwgbnVsbD4ge1xuICAgIGlmICghdGhpcy5hdXRob3JpemF0aW9uUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAnTm8gcGVuZGluZyBhdXRob3JpemF0aW9uIHJlcXVlc3QuIENhbGwgcGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KCkgPycpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmF1dGhvcml6YXRpb25Qcm9taXNlO1xuICB9XG59XG4iXX0=