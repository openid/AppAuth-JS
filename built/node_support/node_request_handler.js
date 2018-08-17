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
var Http = require("http");
var Url = require("url");
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
        var emitter = new ServerEventsEmitter();
        var requestHandler = function (httpRequest, response) {
            if (!httpRequest.url) {
                return;
            }
            var url = Url.parse(httpRequest.url);
            var searchParams = new Url.URLSearchParams(url.query || '');
            var state = searchParams.get('state') || undefined;
            var code = searchParams.get('code');
            var error = searchParams.get('error');
            if (!state && !code && !error) {
                // ignore irrelevant requests (e.g. favicon.ico)
                return;
            }
            logger_1.log('Handling Authorization Request ', searchParams, state, code, error);
            var authorizationResponse = null;
            var authorizationError = null;
            if (error) {
                logger_1.log('error');
                // get additional optional info.
                var errorUri = searchParams.get('error_uri') || undefined;
                var errorDescription = searchParams.get('error_description') || undefined;
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
            response.end('Close your browser to continue');
        };
        this.authorizationPromise = new Promise(function (resolve, reject) {
            emitter.once(ServerEventsEmitter.ON_UNABLE_TO_START, function () {
                reject("Unable to create HTTP server at port " + _this.httpServerPort);
            });
            emitter.once(ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE, function (result) {
                server.close();
                // resolve pending promise
                resolve(result);
                // complete authorization flow
                _this.completeAuthorizationRequestIfPossible();
            });
        });
        var server = Http.createServer(requestHandler);
        try {
            server.listen(this.httpServerPort);
            var url = this.buildRequestUrl(configuration, request);
            logger_1.log('Making a request to ', request, url);
            opener(url);
        }
        catch (error) {
            logger_1.log('Something bad happened ', error);
            emitter.emit(ServerEventsEmitter.ON_UNABLE_TO_START);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLCtDQUF3RDtBQUN4RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxpRkFBaUY7QUFDakYsK0JBQWtDO0FBQ2xDLDJCQUE2QjtBQUM3Qix5QkFBMkI7QUFFM0IscUNBQXVDO0FBQ3ZDLDREQUE4RTtBQUU5RSxrRkFBZ0k7QUFDaEksb0VBQXNJO0FBRXRJLG9DQUE4QjtBQUU5QjtJQUFrQyx1Q0FBWTtJQUE5Qzs7SUFHQSxDQUFDO0lBRlEsc0NBQWtCLEdBQUcsaUJBQWlCLENBQUM7SUFDdkMsNkNBQXlCLEdBQUcsd0JBQXdCLENBQUM7SUFDOUQsMEJBQUM7Q0FBQSxBQUhELENBQWtDLFlBQVksR0FHN0M7QUFFRDtJQUFzQyxvQ0FBMkI7SUFJL0Q7SUFDSSx1QkFBdUI7SUFDaEIsY0FBcUIsRUFDNUIsS0FBcUQsRUFDckQsY0FBeUM7UUFGbEMsK0JBQUEsRUFBQSxxQkFBcUI7UUFDNUIsc0JBQUEsRUFBQSxZQUE4QiwwQ0FBcUIsRUFBRTtRQUNyRCwrQkFBQSxFQUFBLGlCQUFpQix1Q0FBd0I7UUFKN0MsWUFLRSxrQkFBTSxLQUFLLEVBQUUsY0FBYyxDQUFDLFNBQzdCO1FBSlUsb0JBQWMsR0FBZCxjQUFjLENBQU87UUFMaEMsa0RBQWtEO1FBQ2xELDBCQUFvQixHQUFvRCxJQUFJLENBQUM7O0lBUTdFLENBQUM7SUFFRCxzREFBMkIsR0FBM0IsVUFDSSxhQUFnRCxFQUNoRCxPQUE2QjtRQUZqQyxpQkFzRUM7UUFuRUMsdUVBQXVFO1FBQ3ZFLDJEQUEyRDtRQUMzRCxJQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFFMUMsSUFBTSxjQUFjLEdBQUcsVUFBQyxXQUFpQyxFQUFFLFFBQTZCO1lBQ3RGLElB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RSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2I7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLFlBQUcsQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDO0lBRVMsdURBQTRCLEdBQXRDO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM5QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQ2pCLHdFQUF3RSxDQUFDLENBQUM7U0FDL0U7UUFFRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNuQyxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBNUZELENBQXNDLDJEQUEyQixHQTRGaEU7QUE1RlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSYW5kb21HZW5lcmF0b3J9IGZyb20gJy4uL2NyeXB0b191dGlscyc7XHJcbmltcG9ydCB7bm9kZUNyeXB0b0dlbmVyYXRlUmFuZG9tfSBmcm9tICcuL2NyeXB0b191dGlscyc7XHJcbi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLy8gVHlwZVNjcmlwdCB0eXBpbmdzIGZvciBgb3BlbmVyYCBhcmUgbm90IGNvcnJlY3QgYW5kIGRvIG5vdCBleHBvcnQgaXQgYXMgbW9kdWxlXHJcbmltcG9ydCBvcGVuZXIgPSByZXF1aXJlKCdvcGVuZXInKTtcclxuaW1wb3J0ICogYXMgSHR0cCBmcm9tICdodHRwJztcclxuaW1wb3J0ICogYXMgVXJsIGZyb20gJ3VybCc7XHJcbmltcG9ydCB7UmVxdWVzdCwgU2VydmVyT3B0aW9ucywgU2VydmVyLCBSZXNwb25zZVRvb2xraXR9IGZyb20gJ2hhcGknO1xyXG5pbXBvcnQgKiBhcyBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJztcclxuaW1wb3J0IHtCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMsIFF1ZXJ5U3RyaW5nVXRpbHN9IGZyb20gJy4uL3F1ZXJ5X3N0cmluZ191dGlscyc7XHJcbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3QsIEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbn0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0JztcclxuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIsIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2UsIEJVSUxUX0lOX1BBUkFNRVRFUlN9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVxdWVzdF9oYW5kbGVyJztcclxuaW1wb3J0IHtBdXRob3JpemF0aW9uRXJyb3IsIEF1dGhvcml6YXRpb25SZXNwb25zZSwgQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbiwgQXV0aG9yaXphdGlvbkVycm9ySnNvbn0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXNwb25zZSdcclxuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sIEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbkpzb259IGZyb20gJy4uL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcclxuaW1wb3J0IHtsb2d9IGZyb20gJy4uL2xvZ2dlcic7XHJcblxyXG5jbGFzcyBTZXJ2ZXJFdmVudHNFbWl0dGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcclxuICBzdGF0aWMgT05fVU5BQkxFX1RPX1NUQVJUID0gJ3VuYWJsZV90b19zdGFydCc7XHJcbiAgc3RhdGljIE9OX0FVVEhPUklaQVRJT05fUkVTUE9OU0UgPSAnYXV0aG9yaXphdGlvbl9yZXNwb25zZSc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOb2RlQmFzZWRIYW5kbGVyIGV4dGVuZHMgQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHtcclxuICAvLyB0aGUgaGFuZGxlIHRvIHRoZSBjdXJyZW50IGF1dGhvcml6YXRpb24gcmVxdWVzdFxyXG4gIGF1dGhvcml6YXRpb25Qcm9taXNlOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD58bnVsbCA9IG51bGw7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgICAvLyBkZWZhdWx0IHRvIHBvcnQgODAwMFxyXG4gICAgICBwdWJsaWMgaHR0cFNlcnZlclBvcnQgPSA4MDAwLFxyXG4gICAgICB1dGlsczogUXVlcnlTdHJpbmdVdGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSxcclxuICAgICAgZ2VuZXJhdGVSYW5kb20gPSBub2RlQ3J5cHRvR2VuZXJhdGVSYW5kb20pIHtcclxuICAgIHN1cGVyKHV0aWxzLCBnZW5lcmF0ZVJhbmRvbSk7XHJcbiAgfVxyXG5cclxuICBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoXHJcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcclxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpIHtcclxuICAgIC8vIHVzZSBvcGVuZXIgdG8gbGF1bmNoIGEgd2ViIGJyb3dzZXIgYW5kIHN0YXJ0IHRoZSBhdXRob3JpemF0aW9uIGZsb3cuXHJcbiAgICAvLyBzdGFydCBhIHdlYiBzZXJ2ZXIgdG8gaGFuZGxlIHRoZSBhdXRob3JpemF0aW9uIHJlc3BvbnNlLlxyXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBTZXJ2ZXJFdmVudHNFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdEhhbmRsZXIgPSAoaHR0cFJlcXVlc3Q6IEh0dHAuSW5jb21pbmdNZXNzYWdlLCByZXNwb25zZTogSHR0cC5TZXJ2ZXJSZXNwb25zZSkgPT4ge1xyXG4gICAgICBpZiAoIWh0dHBSZXF1ZXN0LnVybCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKGh0dHBSZXF1ZXN0LnVybCk7XHJcbiAgICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVcmwuVVJMU2VhcmNoUGFyYW1zKHVybC5xdWVyeSB8fCAnJyk7XHJcblxyXG4gICAgICBjb25zdCBzdGF0ZSA9IHNlYXJjaFBhcmFtcy5nZXQoJ3N0YXRlJykgfHwgdW5kZWZpbmVkO1xyXG4gICAgICBjb25zdCBjb2RlID0gc2VhcmNoUGFyYW1zLmdldCgnY29kZScpO1xyXG4gICAgICBjb25zdCBlcnJvciA9IHNlYXJjaFBhcmFtcy5nZXQoJ2Vycm9yJyk7XHJcblxyXG4gICAgICBpZiAoIXN0YXRlICYmICFjb2RlICYmICFlcnJvcikge1xyXG4gICAgICAgIC8vIGlnbm9yZSBpcnJlbGV2YW50IHJlcXVlc3RzIChlLmcuIGZhdmljb24uaWNvKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbG9nKCdIYW5kbGluZyBBdXRob3JpemF0aW9uIFJlcXVlc3QgJywgc2VhcmNoUGFyYW1zLCBzdGF0ZSwgY29kZSwgZXJyb3IpO1xyXG4gICAgICBsZXQgYXV0aG9yaXphdGlvblJlc3BvbnNlOiBBdXRob3JpemF0aW9uUmVzcG9uc2V8bnVsbCA9IG51bGw7XHJcbiAgICAgIGxldCBhdXRob3JpemF0aW9uRXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsID0gbnVsbDtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgbG9nKCdlcnJvcicpO1xyXG4gICAgICAgIC8vIGdldCBhZGRpdGlvbmFsIG9wdGlvbmFsIGluZm8uXHJcbiAgICAgICAgY29uc3QgZXJyb3JVcmkgPSBzZWFyY2hQYXJhbXMuZ2V0KCdlcnJvcl91cmknKSB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgY29uc3QgZXJyb3JEZXNjcmlwdGlvbiA9IHNlYXJjaFBhcmFtcy5nZXQoJ2Vycm9yX2Rlc2NyaXB0aW9uJykgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIGF1dGhvcml6YXRpb25FcnJvciA9IG5ldyBBdXRob3JpemF0aW9uRXJyb3IoZXJyb3IsIGVycm9yRGVzY3JpcHRpb24sIGVycm9yVXJpLCBzdGF0ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYXV0aG9yaXphdGlvblJlc3BvbnNlID0gbmV3IEF1dGhvcml6YXRpb25SZXNwb25zZShjb2RlISwgc3RhdGUhKTtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBjb21wbGV0ZVJlc3BvbnNlID0ge1xyXG4gICAgICAgIHJlcXVlc3QsXHJcbiAgICAgICAgcmVzcG9uc2U6IGF1dGhvcml6YXRpb25SZXNwb25zZSxcclxuICAgICAgICBlcnJvcjogYXV0aG9yaXphdGlvbkVycm9yXHJcbiAgICAgIH0gYXMgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZTtcclxuICAgICAgZW1pdHRlci5lbWl0KFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fQVVUSE9SSVpBVElPTl9SRVNQT05TRSwgY29tcGxldGVSZXNwb25zZSk7XHJcbiAgICAgIHJlc3BvbnNlLmVuZCgnQ2xvc2UgeW91ciBicm93c2VyIHRvIGNvbnRpbnVlJyk7XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuYXV0aG9yaXphdGlvblByb21pc2UgPSBuZXcgUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGVtaXR0ZXIub25jZShTZXJ2ZXJFdmVudHNFbWl0dGVyLk9OX1VOQUJMRV9UT19TVEFSVCwgKCkgPT4ge1xyXG4gICAgICAgIHJlamVjdChgVW5hYmxlIHRvIGNyZWF0ZSBIVFRQIHNlcnZlciBhdCBwb3J0ICR7dGhpcy5odHRwU2VydmVyUG9ydH1gKTtcclxuICAgICAgfSk7XHJcbiAgICAgIGVtaXR0ZXIub25jZShTZXJ2ZXJFdmVudHNFbWl0dGVyLk9OX0FVVEhPUklaQVRJT05fUkVTUE9OU0UsIChyZXN1bHQ6IGFueSkgPT4ge1xyXG4gICAgICAgIHNlcnZlci5jbG9zZSgpO1xyXG4gICAgICAgIC8vIHJlc29sdmUgcGVuZGluZyBwcm9taXNlXHJcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQgYXMgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZSk7XHJcbiAgICAgICAgLy8gY29tcGxldGUgYXV0aG9yaXphdGlvbiBmbG93XHJcbiAgICAgICAgdGhpcy5jb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0SWZQb3NzaWJsZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHNlcnZlciA9IEh0dHAuY3JlYXRlU2VydmVyKHJlcXVlc3RIYW5kbGVyKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBzZXJ2ZXIubGlzdGVuKHRoaXMuaHR0cFNlcnZlclBvcnQpO1xyXG5cclxuICAgICAgY29uc3QgdXJsID0gdGhpcy5idWlsZFJlcXVlc3RVcmwoY29uZmlndXJhdGlvbiwgcmVxdWVzdCk7XHJcbiAgICAgIGxvZygnTWFraW5nIGEgcmVxdWVzdCB0byAnLCByZXF1ZXN0LCB1cmwpO1xyXG4gICAgICBvcGVuZXIodXJsKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGxvZygnU29tZXRoaW5nIGJhZCBoYXBwZW5lZCAnLCBlcnJvcik7XHJcbiAgICAgIGVtaXR0ZXIuZW1pdChTZXJ2ZXJFdmVudHNFbWl0dGVyLk9OX1VOQUJMRV9UT19TVEFSVCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD4ge1xyXG4gICAgaWYgKCF0aGlzLmF1dGhvcml6YXRpb25Qcm9taXNlKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcclxuICAgICAgICAgICdObyBwZW5kaW5nIGF1dGhvcml6YXRpb24gcmVxdWVzdC4gQ2FsbCBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoKSA/Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYXV0aG9yaXphdGlvblByb21pc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==