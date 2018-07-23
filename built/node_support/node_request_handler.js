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
            var id_token = searchParams.get('id_token');
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
                authorizationResponse = new authorization_response_1.AuthorizationResponse(code, state, id_token);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLCtDQUF3RDtBQUN4RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxpRkFBaUY7QUFDakYsK0JBQWtDO0FBQ2xDLDJCQUE2QjtBQUM3Qix5QkFBMkI7QUFFM0IscUNBQXVDO0FBQ3ZDLDREQUE4RTtBQUU5RSxrRkFBZ0k7QUFDaEksb0VBQXNJO0FBRXRJLG9DQUE4QjtBQUU5QjtJQUFrQyx1Q0FBWTtJQUE5Qzs7SUFHQSxDQUFDO0lBRlEsc0NBQWtCLEdBQUcsaUJBQWlCLENBQUM7SUFDdkMsNkNBQXlCLEdBQUcsd0JBQXdCLENBQUM7SUFDOUQsMEJBQUM7Q0FBQSxBQUhELENBQWtDLFlBQVksR0FHN0M7QUFFRDtJQUFzQyxvQ0FBMkI7SUFJL0Q7SUFDSSx1QkFBdUI7SUFDaEIsY0FBcUIsRUFDNUIsS0FBcUQsRUFDckQsY0FBeUM7UUFGbEMsK0JBQUEsRUFBQSxxQkFBcUI7UUFDNUIsc0JBQUEsRUFBQSxZQUE4QiwwQ0FBcUIsRUFBRTtRQUNyRCwrQkFBQSxFQUFBLGlCQUFpQix1Q0FBd0I7UUFKN0MsWUFLRSxrQkFBTSxLQUFLLEVBQUUsY0FBYyxDQUFDLFNBQzdCO1FBSlUsb0JBQWMsR0FBZCxjQUFjLENBQU87UUFMaEMsa0RBQWtEO1FBQ2xELDBCQUFvQixHQUFvRCxJQUFJLENBQUM7O0lBUTdFLENBQUM7SUFFRCxzREFBMkIsR0FBM0IsVUFDSSxhQUFnRCxFQUNoRCxPQUE2QjtRQUZqQyxpQkF1RUM7UUFwRUMsdUVBQXVFO1FBQ3ZFLDJEQUEyRDtRQUMzRCxJQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFFMUMsSUFBTSxjQUFjLEdBQUcsVUFBQyxXQUFpQyxFQUFFLFFBQTZCO1lBQ3RGLElB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Q0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELFlBQUcsQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2I7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLFlBQUcsQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDO0lBRVMsdURBQTRCLEdBQXRDO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM5QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQ2pCLHdFQUF3RSxDQUFDLENBQUM7U0FDL0U7UUFFRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNuQyxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBN0ZELENBQXNDLDJEQUEyQixHQTZGaEU7QUE3RlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSYW5kb21HZW5lcmF0b3J9IGZyb20gJy4uL2NyeXB0b191dGlscyc7XG5pbXBvcnQge25vZGVDcnlwdG9HZW5lcmF0ZVJhbmRvbX0gZnJvbSAnLi9jcnlwdG9fdXRpbHMnO1xuLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8vIFR5cGVTY3JpcHQgdHlwaW5ncyBmb3IgYG9wZW5lcmAgYXJlIG5vdCBjb3JyZWN0IGFuZCBkbyBub3QgZXhwb3J0IGl0IGFzIG1vZHVsZVxuaW1wb3J0IG9wZW5lciA9IHJlcXVpcmUoJ29wZW5lcicpO1xuaW1wb3J0ICogYXMgSHR0cCBmcm9tICdodHRwJztcbmltcG9ydCAqIGFzIFVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHtSZXF1ZXN0LCBTZXJ2ZXJPcHRpb25zLCBTZXJ2ZXIsIFJlc3BvbnNlVG9vbGtpdH0gZnJvbSAnaGFwaSc7XG5pbXBvcnQgKiBhcyBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJztcbmltcG9ydCB7QmFzaWNRdWVyeVN0cmluZ1V0aWxzLCBRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdCwgQXV0aG9yaXphdGlvblJlcXVlc3RKc29ufSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIsIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2UsIEJVSUxUX0lOX1BBUkFNRVRFUlN9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVxdWVzdF9oYW5kbGVyJztcbmltcG9ydCB7QXV0aG9yaXphdGlvbkVycm9yLCBBdXRob3JpemF0aW9uUmVzcG9uc2UsIEF1dGhvcml6YXRpb25SZXNwb25zZUpzb24sIEF1dGhvcml6YXRpb25FcnJvckpzb259IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVzcG9uc2UnXG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbiwgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uSnNvbn0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4uL2xvZ2dlcic7XG5cbmNsYXNzIFNlcnZlckV2ZW50c0VtaXR0ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBzdGF0aWMgT05fVU5BQkxFX1RPX1NUQVJUID0gJ3VuYWJsZV90b19zdGFydCc7XG4gIHN0YXRpYyBPTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFID0gJ2F1dGhvcml6YXRpb25fcmVzcG9uc2UnO1xufVxuXG5leHBvcnQgY2xhc3MgTm9kZUJhc2VkSGFuZGxlciBleHRlbmRzIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XG4gIC8vIHRoZSBoYW5kbGUgdG8gdGhlIGN1cnJlbnQgYXV0aG9yaXphdGlvbiByZXF1ZXN0XG4gIGF1dGhvcml6YXRpb25Qcm9taXNlOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD58bnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICAvLyBkZWZhdWx0IHRvIHBvcnQgODAwMFxuICAgICAgcHVibGljIGh0dHBTZXJ2ZXJQb3J0ID0gODAwMCxcbiAgICAgIHV0aWxzOiBRdWVyeVN0cmluZ1V0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpLFxuICAgICAgZ2VuZXJhdGVSYW5kb20gPSBub2RlQ3J5cHRvR2VuZXJhdGVSYW5kb20pIHtcbiAgICBzdXBlcih1dGlscywgZ2VuZXJhdGVSYW5kb20pO1xuICB9XG5cbiAgcGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpIHtcbiAgICAvLyB1c2Ugb3BlbmVyIHRvIGxhdW5jaCBhIHdlYiBicm93c2VyIGFuZCBzdGFydCB0aGUgYXV0aG9yaXphdGlvbiBmbG93LlxuICAgIC8vIHN0YXJ0IGEgd2ViIHNlcnZlciB0byBoYW5kbGUgdGhlIGF1dGhvcml6YXRpb24gcmVzcG9uc2UuXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBTZXJ2ZXJFdmVudHNFbWl0dGVyKCk7XG5cbiAgICBjb25zdCByZXF1ZXN0SGFuZGxlciA9IChodHRwUmVxdWVzdDogSHR0cC5JbmNvbWluZ01lc3NhZ2UsIHJlc3BvbnNlOiBIdHRwLlNlcnZlclJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAoIWh0dHBSZXF1ZXN0LnVybCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZShodHRwUmVxdWVzdC51cmwpO1xuICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVybC5VUkxTZWFyY2hQYXJhbXModXJsLnF1ZXJ5IHx8ICcnKTtcblxuICAgICAgY29uc3Qgc3RhdGUgPSBzZWFyY2hQYXJhbXMuZ2V0KCdzdGF0ZScpIHx8IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IGNvZGUgPSBzZWFyY2hQYXJhbXMuZ2V0KCdjb2RlJyk7XG4gICAgICBjb25zdCBpZF90b2tlbiA9IHNlYXJjaFBhcmFtcy5nZXQoJ2lkX3Rva2VuJyk7XG4gICAgICBjb25zdCBlcnJvciA9IHNlYXJjaFBhcmFtcy5nZXQoJ2Vycm9yJyk7XG5cbiAgICAgIGlmICghc3RhdGUgJiYgIWNvZGUgJiYgIWVycm9yKSB7XG4gICAgICAgIC8vIGlnbm9yZSBpcnJlbGV2YW50IHJlcXVlc3RzIChlLmcuIGZhdmljb24uaWNvKVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxvZygnSGFuZGxpbmcgQXV0aG9yaXphdGlvbiBSZXF1ZXN0ICcsIHNlYXJjaFBhcmFtcywgc3RhdGUsIGNvZGUsIGVycm9yKTtcbiAgICAgIGxldCBhdXRob3JpemF0aW9uUmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsID0gbnVsbDtcbiAgICAgIGxldCBhdXRob3JpemF0aW9uRXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsID0gbnVsbDtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBsb2coJ2Vycm9yJyk7XG4gICAgICAgIC8vIGdldCBhZGRpdGlvbmFsIG9wdGlvbmFsIGluZm8uXG4gICAgICAgIGNvbnN0IGVycm9yVXJpID0gc2VhcmNoUGFyYW1zLmdldCgnZXJyb3JfdXJpJykgfHwgdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBlcnJvckRlc2NyaXB0aW9uID0gc2VhcmNoUGFyYW1zLmdldCgnZXJyb3JfZGVzY3JpcHRpb24nKSB8fCB1bmRlZmluZWQ7XG4gICAgICAgIGF1dGhvcml6YXRpb25FcnJvciA9IG5ldyBBdXRob3JpemF0aW9uRXJyb3IoZXJyb3IsIGVycm9yRGVzY3JpcHRpb24sIGVycm9yVXJpLCBzdGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdXRob3JpemF0aW9uUmVzcG9uc2UgPSBuZXcgQXV0aG9yaXphdGlvblJlc3BvbnNlKGNvZGUhLCBzdGF0ZSEsIGlkX3Rva2VuISk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb21wbGV0ZVJlc3BvbnNlID0ge1xuICAgICAgICByZXF1ZXN0LFxuICAgICAgICByZXNwb25zZTogYXV0aG9yaXphdGlvblJlc3BvbnNlLFxuICAgICAgICBlcnJvcjogYXV0aG9yaXphdGlvbkVycm9yXG4gICAgICB9IGFzIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U7XG4gICAgICBlbWl0dGVyLmVtaXQoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFLCBjb21wbGV0ZVJlc3BvbnNlKTtcbiAgICAgIHJlc3BvbnNlLmVuZCgnQ2xvc2UgeW91ciBicm93c2VyIHRvIGNvbnRpbnVlJyk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0aG9yaXphdGlvblByb21pc2UgPSBuZXcgUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbWl0dGVyLm9uY2UoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9VTkFCTEVfVE9fU1RBUlQsICgpID0+IHtcbiAgICAgICAgcmVqZWN0KGBVbmFibGUgdG8gY3JlYXRlIEhUVFAgc2VydmVyIGF0IHBvcnQgJHt0aGlzLmh0dHBTZXJ2ZXJQb3J0fWApO1xuICAgICAgfSk7XG4gICAgICBlbWl0dGVyLm9uY2UoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFLCAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgc2VydmVyLmNsb3NlKCk7XG4gICAgICAgIC8vIHJlc29sdmUgcGVuZGluZyBwcm9taXNlXG4gICAgICAgIHJlc29sdmUocmVzdWx0IGFzIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2UpO1xuICAgICAgICAvLyBjb21wbGV0ZSBhdXRob3JpemF0aW9uIGZsb3dcbiAgICAgICAgdGhpcy5jb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0SWZQb3NzaWJsZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBzZXJ2ZXIgPSBIdHRwLmNyZWF0ZVNlcnZlcihyZXF1ZXN0SGFuZGxlcik7XG5cbiAgICB0cnkge1xuICAgICAgc2VydmVyLmxpc3Rlbih0aGlzLmh0dHBTZXJ2ZXJQb3J0KTtcblxuICAgICAgY29uc3QgdXJsID0gdGhpcy5idWlsZFJlcXVlc3RVcmwoY29uZmlndXJhdGlvbiwgcmVxdWVzdCk7XG4gICAgICBsb2coJ01ha2luZyBhIHJlcXVlc3QgdG8gJywgcmVxdWVzdCwgdXJsKTtcbiAgICAgIG9wZW5lcih1cmwpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2coJ1NvbWV0aGluZyBiYWQgaGFwcGVuZWQgJywgZXJyb3IpO1xuICAgICAgZW1pdHRlci5lbWl0KFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fVU5BQkxFX1RPX1NUQVJUKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD4ge1xuICAgIGlmICghdGhpcy5hdXRob3JpemF0aW9uUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAgICdObyBwZW5kaW5nIGF1dGhvcml6YXRpb24gcmVxdWVzdC4gQ2FsbCBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoKSA/Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXV0aG9yaXphdGlvblByb21pc2U7XG4gIH1cbn1cbiJdfQ==