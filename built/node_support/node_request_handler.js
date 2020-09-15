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
exports.NodeBasedHandler = void 0;
var events_1 = require("events");
var Http = require("http");
var Url = require("url");
var authorization_request_handler_1 = require("../authorization_request_handler");
var authorization_response_1 = require("../authorization_response");
var logger_1 = require("../logger");
var query_string_utils_1 = require("../query_string_utils");
var crypto_utils_1 = require("./crypto_utils");
// TypeScript typings for `opener` are not correct and do not export it as module
var opener = require("opener");
var ServerEventsEmitter = /** @class */ (function (_super) {
    __extends(ServerEventsEmitter, _super);
    function ServerEventsEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServerEventsEmitter.ON_UNABLE_TO_START = 'unable_to_start';
    ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE = 'authorization_response';
    return ServerEventsEmitter;
}(events_1.EventEmitter));
var NodeBasedHandler = /** @class */ (function (_super) {
    __extends(NodeBasedHandler, _super);
    function NodeBasedHandler(
    // default to port 8000
    httpServerPort, utils, crypto) {
        if (httpServerPort === void 0) { httpServerPort = 8000; }
        if (utils === void 0) { utils = new query_string_utils_1.BasicQueryStringUtils(); }
        if (crypto === void 0) { crypto = new crypto_utils_1.NodeCrypto(); }
        var _this = _super.call(this, utils, crypto) || this;
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
                authorizationError = new authorization_response_1.AuthorizationError({ error: error, error_description: errorDescription, error_uri: errorUri, state: state });
            }
            else {
                authorizationResponse = new authorization_response_1.AuthorizationResponse({ code: code, state: state });
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
        var server;
        request.setupCodeVerifier()
            .then(function () {
            server = Http.createServer(requestHandler);
            server.listen(_this.httpServerPort);
            var url = _this.buildRequestUrl(configuration, request);
            logger_1.log('Making a request to ', request, url);
            opener(url);
        })
            .catch(function (error) {
            logger_1.log('Something bad happened ', error);
            emitter.emit(ServerEventsEmitter.ON_UNABLE_TO_START);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxpQ0FBb0M7QUFDcEMsMkJBQTZCO0FBQzdCLHlCQUEyQjtBQUUzQixrRkFBMkc7QUFDM0csb0VBQW9GO0FBR3BGLG9DQUE4QjtBQUM5Qiw0REFBOEU7QUFDOUUsK0NBQTBDO0FBRzFDLGlGQUFpRjtBQUNqRiwrQkFBa0M7QUFFbEM7SUFBa0MsdUNBQVk7SUFBOUM7O0lBR0EsQ0FBQztJQUZRLHNDQUFrQixHQUFHLGlCQUFpQixDQUFDO0lBQ3ZDLDZDQUF5QixHQUFHLHdCQUF3QixDQUFDO0lBQzlELDBCQUFDO0NBQUEsQUFIRCxDQUFrQyxxQkFBWSxHQUc3QztBQUVEO0lBQXNDLG9DQUEyQjtJQUkvRDtJQUNJLHVCQUF1QjtJQUNoQixjQUFxQixFQUM1QixLQUFxRCxFQUNyRCxNQUFpQztRQUYxQiwrQkFBQSxFQUFBLHFCQUFxQjtRQUM1QixzQkFBQSxFQUFBLFlBQThCLDBDQUFxQixFQUFFO1FBQ3JELHVCQUFBLEVBQUEsYUFBcUIseUJBQVUsRUFBRTtRQUpyQyxZQUtFLGtCQUFNLEtBQUssRUFBRSxNQUFNLENBQUMsU0FDckI7UUFKVSxvQkFBYyxHQUFkLGNBQWMsQ0FBTztRQUxoQyxrREFBa0Q7UUFDbEQsMEJBQW9CLEdBQW9ELElBQUksQ0FBQzs7SUFRN0UsQ0FBQztJQUVELHNEQUEyQixHQUEzQixVQUNJLGFBQWdELEVBQ2hELE9BQTZCO1FBRmpDLGlCQXdFQztRQXJFQyx1RUFBdUU7UUFDdkUsMkRBQTJEO1FBQzNELElBQU0sT0FBTyxHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUUxQyxJQUFNLGNBQWMsR0FBRyxVQUFDLFdBQWlDLEVBQUUsUUFBNkI7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QzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ25DLElBQU0sR0FBRyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELFlBQUcsQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDMUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsS0FBSztZQUNYLFlBQUcsQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRVMsdURBQTRCLEdBQXRDO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM5QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQ2pCLHdFQUF3RSxDQUFDLENBQUM7U0FDL0U7UUFFRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNuQyxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBOUZELENBQXNDLDJEQUEyQixHQThGaEU7QUE5RlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcclxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXHJcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXHJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnZXZlbnRzJztcclxuaW1wb3J0ICogYXMgSHR0cCBmcm9tICdodHRwJztcclxuaW1wb3J0ICogYXMgVXJsIGZyb20gJ3VybCc7XHJcbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3R9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XHJcbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyLCBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3JlcXVlc3RfaGFuZGxlcic7XHJcbmltcG9ydCB7QXV0aG9yaXphdGlvbkVycm9yLCBBdXRob3JpemF0aW9uUmVzcG9uc2V9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVzcG9uc2UnO1xyXG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xyXG5pbXBvcnQge0NyeXB0b30gZnJvbSAnLi4vY3J5cHRvX3V0aWxzJztcclxuaW1wb3J0IHtsb2d9IGZyb20gJy4uL2xvZ2dlcic7XHJcbmltcG9ydCB7QmFzaWNRdWVyeVN0cmluZ1V0aWxzLCBRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xyXG5pbXBvcnQge05vZGVDcnlwdG99IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcclxuXHJcblxyXG4vLyBUeXBlU2NyaXB0IHR5cGluZ3MgZm9yIGBvcGVuZXJgIGFyZSBub3QgY29ycmVjdCBhbmQgZG8gbm90IGV4cG9ydCBpdCBhcyBtb2R1bGVcclxuaW1wb3J0IG9wZW5lciA9IHJlcXVpcmUoJ29wZW5lcicpO1xyXG5cclxuY2xhc3MgU2VydmVyRXZlbnRzRW1pdHRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XHJcbiAgc3RhdGljIE9OX1VOQUJMRV9UT19TVEFSVCA9ICd1bmFibGVfdG9fc3RhcnQnO1xyXG4gIHN0YXRpYyBPTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFID0gJ2F1dGhvcml6YXRpb25fcmVzcG9uc2UnO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTm9kZUJhc2VkSGFuZGxlciBleHRlbmRzIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XHJcbiAgLy8gdGhlIGhhbmRsZSB0byB0aGUgY3VycmVudCBhdXRob3JpemF0aW9uIHJlcXVlc3RcclxuICBhdXRob3JpemF0aW9uUHJvbWlzZTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+fG51bGwgPSBudWxsO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgICAgLy8gZGVmYXVsdCB0byBwb3J0IDgwMDBcclxuICAgICAgcHVibGljIGh0dHBTZXJ2ZXJQb3J0ID0gODAwMCxcclxuICAgICAgdXRpbHM6IFF1ZXJ5U3RyaW5nVXRpbHMgPSBuZXcgQmFzaWNRdWVyeVN0cmluZ1V0aWxzKCksXHJcbiAgICAgIGNyeXB0bzogQ3J5cHRvID0gbmV3IE5vZGVDcnlwdG8oKSkge1xyXG4gICAgc3VwZXIodXRpbHMsIGNyeXB0byk7XHJcbiAgfVxyXG5cclxuICBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoXHJcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcclxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpIHtcclxuICAgIC8vIHVzZSBvcGVuZXIgdG8gbGF1bmNoIGEgd2ViIGJyb3dzZXIgYW5kIHN0YXJ0IHRoZSBhdXRob3JpemF0aW9uIGZsb3cuXHJcbiAgICAvLyBzdGFydCBhIHdlYiBzZXJ2ZXIgdG8gaGFuZGxlIHRoZSBhdXRob3JpemF0aW9uIHJlc3BvbnNlLlxyXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBTZXJ2ZXJFdmVudHNFbWl0dGVyKCk7XHJcblxyXG4gICAgY29uc3QgcmVxdWVzdEhhbmRsZXIgPSAoaHR0cFJlcXVlc3Q6IEh0dHAuSW5jb21pbmdNZXNzYWdlLCByZXNwb25zZTogSHR0cC5TZXJ2ZXJSZXNwb25zZSkgPT4ge1xyXG4gICAgICBpZiAoIWh0dHBSZXF1ZXN0LnVybCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKGh0dHBSZXF1ZXN0LnVybCk7XHJcbiAgICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVcmwuVVJMU2VhcmNoUGFyYW1zKHVybC5xdWVyeSB8fCAnJyk7XHJcblxyXG4gICAgICBjb25zdCBzdGF0ZSA9IHNlYXJjaFBhcmFtcy5nZXQoJ3N0YXRlJykgfHwgdW5kZWZpbmVkO1xyXG4gICAgICBjb25zdCBjb2RlID0gc2VhcmNoUGFyYW1zLmdldCgnY29kZScpO1xyXG4gICAgICBjb25zdCBlcnJvciA9IHNlYXJjaFBhcmFtcy5nZXQoJ2Vycm9yJyk7XHJcblxyXG4gICAgICBpZiAoIXN0YXRlICYmICFjb2RlICYmICFlcnJvcikge1xyXG4gICAgICAgIC8vIGlnbm9yZSBpcnJlbGV2YW50IHJlcXVlc3RzIChlLmcuIGZhdmljb24uaWNvKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgbG9nKCdIYW5kbGluZyBBdXRob3JpemF0aW9uIFJlcXVlc3QgJywgc2VhcmNoUGFyYW1zLCBzdGF0ZSwgY29kZSwgZXJyb3IpO1xyXG4gICAgICBsZXQgYXV0aG9yaXphdGlvblJlc3BvbnNlOiBBdXRob3JpemF0aW9uUmVzcG9uc2V8bnVsbCA9IG51bGw7XHJcbiAgICAgIGxldCBhdXRob3JpemF0aW9uRXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsID0gbnVsbDtcclxuICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgbG9nKCdlcnJvcicpO1xyXG4gICAgICAgIC8vIGdldCBhZGRpdGlvbmFsIG9wdGlvbmFsIGluZm8uXHJcbiAgICAgICAgY29uc3QgZXJyb3JVcmkgPSBzZWFyY2hQYXJhbXMuZ2V0KCdlcnJvcl91cmknKSB8fCB1bmRlZmluZWQ7XHJcbiAgICAgICAgY29uc3QgZXJyb3JEZXNjcmlwdGlvbiA9IHNlYXJjaFBhcmFtcy5nZXQoJ2Vycm9yX2Rlc2NyaXB0aW9uJykgfHwgdW5kZWZpbmVkO1xyXG4gICAgICAgIGF1dGhvcml6YXRpb25FcnJvciA9IG5ldyBBdXRob3JpemF0aW9uRXJyb3IoXHJcbiAgICAgICAgICAgIHtlcnJvcjogZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiBlcnJvckRlc2NyaXB0aW9uLCBlcnJvcl91cmk6IGVycm9yVXJpLCBzdGF0ZTogc3RhdGV9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBhdXRob3JpemF0aW9uUmVzcG9uc2UgPSBuZXcgQXV0aG9yaXphdGlvblJlc3BvbnNlKHtjb2RlOiBjb2RlISwgc3RhdGU6IHN0YXRlIX0pO1xyXG4gICAgICB9XHJcbiAgICAgIGNvbnN0IGNvbXBsZXRlUmVzcG9uc2UgPSB7XHJcbiAgICAgICAgcmVxdWVzdCxcclxuICAgICAgICByZXNwb25zZTogYXV0aG9yaXphdGlvblJlc3BvbnNlLFxyXG4gICAgICAgIGVycm9yOiBhdXRob3JpemF0aW9uRXJyb3JcclxuICAgICAgfSBhcyBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlO1xyXG4gICAgICBlbWl0dGVyLmVtaXQoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFLCBjb21wbGV0ZVJlc3BvbnNlKTtcclxuICAgICAgcmVzcG9uc2UuZW5kKCdDbG9zZSB5b3VyIGJyb3dzZXIgdG8gY29udGludWUnKTtcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5hdXRob3JpemF0aW9uUHJvbWlzZSA9IG5ldyBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgZW1pdHRlci5vbmNlKFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fVU5BQkxFX1RPX1NUQVJULCAoKSA9PiB7XHJcbiAgICAgICAgcmVqZWN0KGBVbmFibGUgdG8gY3JlYXRlIEhUVFAgc2VydmVyIGF0IHBvcnQgJHt0aGlzLmh0dHBTZXJ2ZXJQb3J0fWApO1xyXG4gICAgICB9KTtcclxuICAgICAgZW1pdHRlci5vbmNlKFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fQVVUSE9SSVpBVElPTl9SRVNQT05TRSwgKHJlc3VsdDogYW55KSA9PiB7XHJcbiAgICAgICAgc2VydmVyLmNsb3NlKCk7XHJcbiAgICAgICAgLy8gcmVzb2x2ZSBwZW5kaW5nIHByb21pc2VcclxuICAgICAgICByZXNvbHZlKHJlc3VsdCBhcyBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlKTtcclxuICAgICAgICAvLyBjb21wbGV0ZSBhdXRob3JpemF0aW9uIGZsb3dcclxuICAgICAgICB0aGlzLmNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3RJZlBvc3NpYmxlKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHNlcnZlcjogSHR0cC5TZXJ2ZXI7XHJcbiAgICByZXF1ZXN0LnNldHVwQ29kZVZlcmlmaWVyKClcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICBzZXJ2ZXIgPSBIdHRwLmNyZWF0ZVNlcnZlcihyZXF1ZXN0SGFuZGxlcik7XHJcbiAgICAgICAgICBzZXJ2ZXIubGlzdGVuKHRoaXMuaHR0cFNlcnZlclBvcnQpO1xyXG4gICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5idWlsZFJlcXVlc3RVcmwoY29uZmlndXJhdGlvbiwgcmVxdWVzdCk7XHJcbiAgICAgICAgICBsb2coJ01ha2luZyBhIHJlcXVlc3QgdG8gJywgcmVxdWVzdCwgdXJsKTtcclxuICAgICAgICAgIG9wZW5lcih1cmwpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgbG9nKCdTb21ldGhpbmcgYmFkIGhhcHBlbmVkICcsIGVycm9yKTtcclxuICAgICAgICAgIGVtaXR0ZXIuZW1pdChTZXJ2ZXJFdmVudHNFbWl0dGVyLk9OX1VOQUJMRV9UT19TVEFSVCk7XHJcbiAgICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD4ge1xyXG4gICAgaWYgKCF0aGlzLmF1dGhvcml6YXRpb25Qcm9taXNlKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcclxuICAgICAgICAgICdObyBwZW5kaW5nIGF1dGhvcml6YXRpb24gcmVxdWVzdC4gQ2FsbCBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoKSA/Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuYXV0aG9yaXphdGlvblByb21pc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==