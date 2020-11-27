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
    NodeBasedHandler.prototype.performAuthorizationRequest = function (configuration, request, options) {
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
            if (options && (options.redirectPage || options.redirectUri)) {
                if (options.redirectPage) {
                    response.write(options.redirectPage);
                }
                else if (options.redirectUri) {
                    response.writeHead(302, {
                        'Location': options.redirectUri
                    });
                }
                response.end();
            }
            else {
                response.end('Close your browser to continue');
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxpQ0FBb0M7QUFDcEMsMkJBQTZCO0FBQzdCLHlCQUEyQjtBQUUzQixrRkFBMkc7QUFDM0csb0VBQW9GO0FBR3BGLG9DQUE4QjtBQUM5Qiw0REFBOEU7QUFDOUUsK0NBQTBDO0FBRzFDLGlGQUFpRjtBQUNqRiwrQkFBa0M7QUFFbEM7SUFBa0MsdUNBQVk7SUFBOUM7O0lBR0EsQ0FBQztJQUZRLHNDQUFrQixHQUFHLGlCQUFpQixDQUFDO0lBQ3ZDLDZDQUF5QixHQUFHLHdCQUF3QixDQUFDO0lBQzlELDBCQUFDO0NBQUEsQUFIRCxDQUFrQyxxQkFBWSxHQUc3QztBQUVEO0lBQXNDLG9DQUEyQjtJQUkvRDtJQUNJLHVCQUF1QjtJQUNoQixjQUFxQixFQUM1QixLQUFxRCxFQUNyRCxNQUFpQztRQUYxQiwrQkFBQSxFQUFBLHFCQUFxQjtRQUM1QixzQkFBQSxFQUFBLFlBQThCLDBDQUFxQixFQUFFO1FBQ3JELHVCQUFBLEVBQUEsYUFBcUIseUJBQVUsRUFBRTtRQUpyQyxZQUtFLGtCQUFNLEtBQUssRUFBRSxNQUFNLENBQUMsU0FDckI7UUFKVSxvQkFBYyxHQUFkLGNBQWMsQ0FBTztRQUxoQyxrREFBa0Q7UUFDbEQsMEJBQW9CLEdBQW9ELElBQUksQ0FBQzs7SUFRN0UsQ0FBQztJQUVELHNEQUEyQixHQUEzQixVQUNJLGFBQWdELEVBQ2hELE9BQTZCLEVBQzdCLE9BQXFDO1FBSHpDLGlCQW9GQztRQWhGQyx1RUFBdUU7UUFDdkUsMkRBQTJEO1FBQzNELElBQU0sT0FBTyxHQUFHLElBQUksbUJBQW1CLEVBQUUsQ0FBQztRQUUxQyxJQUFNLGNBQWMsR0FBRyxVQUFDLFdBQWlD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QUEyQixHQTBHaEU7QUExR1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuaW1wb3J0ICogYXMgSHR0cCBmcm9tICdodHRwJztcbmltcG9ydCAqIGFzIFVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdCwgQXV0aG9yaXphdGlvblJlcXVlc3RPcHRpb25zfSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIsIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVxdWVzdF9oYW5kbGVyJztcbmltcG9ydCB7QXV0aG9yaXphdGlvbkVycm9yLCBBdXRob3JpemF0aW9uUmVzcG9uc2V9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVzcG9uc2UnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb259IGZyb20gJy4uL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7Q3J5cHRvfSBmcm9tICcuLi9jcnlwdG9fdXRpbHMnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQge0Jhc2ljUXVlcnlTdHJpbmdVdGlscywgUXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi4vcXVlcnlfc3RyaW5nX3V0aWxzJztcbmltcG9ydCB7Tm9kZUNyeXB0b30gZnJvbSAnLi9jcnlwdG9fdXRpbHMnO1xuXG5cbi8vIFR5cGVTY3JpcHQgdHlwaW5ncyBmb3IgYG9wZW5lcmAgYXJlIG5vdCBjb3JyZWN0IGFuZCBkbyBub3QgZXhwb3J0IGl0IGFzIG1vZHVsZVxuaW1wb3J0IG9wZW5lciA9IHJlcXVpcmUoJ29wZW5lcicpO1xuXG5jbGFzcyBTZXJ2ZXJFdmVudHNFbWl0dGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgc3RhdGljIE9OX1VOQUJMRV9UT19TVEFSVCA9ICd1bmFibGVfdG9fc3RhcnQnO1xuICBzdGF0aWMgT05fQVVUSE9SSVpBVElPTl9SRVNQT05TRSA9ICdhdXRob3JpemF0aW9uX3Jlc3BvbnNlJztcbn1cblxuZXhwb3J0IGNsYXNzIE5vZGVCYXNlZEhhbmRsZXIgZXh0ZW5kcyBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIge1xuICAvLyB0aGUgaGFuZGxlIHRvIHRoZSBjdXJyZW50IGF1dGhvcml6YXRpb24gcmVxdWVzdFxuICBhdXRob3JpemF0aW9uUHJvbWlzZTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+fG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLy8gZGVmYXVsdCB0byBwb3J0IDgwMDBcbiAgICAgIHB1YmxpYyBodHRwU2VydmVyUG9ydCA9IDgwMDAsXG4gICAgICB1dGlsczogUXVlcnlTdHJpbmdVdGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSxcbiAgICAgIGNyeXB0bzogQ3J5cHRvID0gbmV3IE5vZGVDcnlwdG8oKSkge1xuICAgIHN1cGVyKHV0aWxzLCBjcnlwdG8pO1xuICB9XG5cbiAgcGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QsXG4gICAgICBvcHRpb25zPzogQXV0aG9yaXphdGlvblJlcXVlc3RPcHRpb25zKSB7XG4gICAgLy8gdXNlIG9wZW5lciB0byBsYXVuY2ggYSB3ZWIgYnJvd3NlciBhbmQgc3RhcnQgdGhlIGF1dGhvcml6YXRpb24gZmxvdy5cbiAgICAvLyBzdGFydCBhIHdlYiBzZXJ2ZXIgdG8gaGFuZGxlIHRoZSBhdXRob3JpemF0aW9uIHJlc3BvbnNlLlxuICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgU2VydmVyRXZlbnRzRW1pdHRlcigpO1xuXG4gICAgY29uc3QgcmVxdWVzdEhhbmRsZXIgPSAoaHR0cFJlcXVlc3Q6IEh0dHAuSW5jb21pbmdNZXNzYWdlLCByZXNwb25zZTogSHR0cC5TZXJ2ZXJSZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKCFodHRwUmVxdWVzdC51cmwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2UoaHR0cFJlcXVlc3QudXJsKTtcbiAgICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVcmwuVVJMU2VhcmNoUGFyYW1zKHVybC5xdWVyeSB8fCAnJyk7XG5cbiAgICAgIGNvbnN0IHN0YXRlID0gc2VhcmNoUGFyYW1zLmdldCgnc3RhdGUnKSB8fCB1bmRlZmluZWQ7XG4gICAgICBjb25zdCBjb2RlID0gc2VhcmNoUGFyYW1zLmdldCgnY29kZScpO1xuICAgICAgY29uc3QgZXJyb3IgPSBzZWFyY2hQYXJhbXMuZ2V0KCdlcnJvcicpO1xuXG4gICAgICBpZiAoIXN0YXRlICYmICFjb2RlICYmICFlcnJvcikge1xuICAgICAgICAvLyBpZ25vcmUgaXJyZWxldmFudCByZXF1ZXN0cyAoZS5nLiBmYXZpY29uLmljbylcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2coJ0hhbmRsaW5nIEF1dGhvcml6YXRpb24gUmVxdWVzdCAnLCBzZWFyY2hQYXJhbXMsIHN0YXRlLCBjb2RlLCBlcnJvcik7XG4gICAgICBsZXQgYXV0aG9yaXphdGlvblJlc3BvbnNlOiBBdXRob3JpemF0aW9uUmVzcG9uc2V8bnVsbCA9IG51bGw7XG4gICAgICBsZXQgYXV0aG9yaXphdGlvbkVycm9yOiBBdXRob3JpemF0aW9uRXJyb3J8bnVsbCA9IG51bGw7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgbG9nKCdlcnJvcicpO1xuICAgICAgICAvLyBnZXQgYWRkaXRpb25hbCBvcHRpb25hbCBpbmZvLlxuICAgICAgICBjb25zdCBlcnJvclVyaSA9IHNlYXJjaFBhcmFtcy5nZXQoJ2Vycm9yX3VyaScpIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgZXJyb3JEZXNjcmlwdGlvbiA9IHNlYXJjaFBhcmFtcy5nZXQoJ2Vycm9yX2Rlc2NyaXB0aW9uJykgfHwgdW5kZWZpbmVkO1xuICAgICAgICBhdXRob3JpemF0aW9uRXJyb3IgPSBuZXcgQXV0aG9yaXphdGlvbkVycm9yKFxuICAgICAgICAgICAge2Vycm9yOiBlcnJvciwgZXJyb3JfZGVzY3JpcHRpb246IGVycm9yRGVzY3JpcHRpb24sIGVycm9yX3VyaTogZXJyb3JVcmksIHN0YXRlOiBzdGF0ZX0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXV0aG9yaXphdGlvblJlc3BvbnNlID0gbmV3IEF1dGhvcml6YXRpb25SZXNwb25zZSh7Y29kZTogY29kZSEsIHN0YXRlOiBzdGF0ZSF9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbXBsZXRlUmVzcG9uc2UgPSB7XG4gICAgICAgIHJlcXVlc3QsXG4gICAgICAgIHJlc3BvbnNlOiBhdXRob3JpemF0aW9uUmVzcG9uc2UsXG4gICAgICAgIGVycm9yOiBhdXRob3JpemF0aW9uRXJyb3JcbiAgICAgIH0gYXMgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZTtcbiAgICAgIGVtaXR0ZXIuZW1pdChTZXJ2ZXJFdmVudHNFbWl0dGVyLk9OX0FVVEhPUklaQVRJT05fUkVTUE9OU0UsIGNvbXBsZXRlUmVzcG9uc2UpO1xuICAgICAgaWYgKG9wdGlvbnMgJiYgKG9wdGlvbnMucmVkaXJlY3RQYWdlIHx8IG9wdGlvbnMucmVkaXJlY3RVcmkpKSB7XG4gICAgICAgIGlmIChvcHRpb25zLnJlZGlyZWN0UGFnZSkge1xuICAgICAgICAgIHJlc3BvbnNlLndyaXRlKG9wdGlvbnMucmVkaXJlY3RQYWdlKTtcbiAgICAgICAgfSBlbHNlIGlmKG9wdGlvbnMucmVkaXJlY3RVcmkpIHtcbiAgICAgICAgICByZXNwb25zZS53cml0ZUhlYWQoMzAyLCB7XG4gICAgICAgICAgICAnTG9jYXRpb24nOiBvcHRpb25zLnJlZGlyZWN0VXJpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzcG9uc2UuZW5kKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNwb25zZS5lbmQoJ0Nsb3NlIHlvdXIgYnJvd3NlciB0byBjb250aW51ZScpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmF1dGhvcml6YXRpb25Qcm9taXNlID0gbmV3IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW1pdHRlci5vbmNlKFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fVU5BQkxFX1RPX1NUQVJULCAoKSA9PiB7XG4gICAgICAgIHJlamVjdChgVW5hYmxlIHRvIGNyZWF0ZSBIVFRQIHNlcnZlciBhdCBwb3J0ICR7dGhpcy5odHRwU2VydmVyUG9ydH1gKTtcbiAgICAgIH0pO1xuICAgICAgZW1pdHRlci5vbmNlKFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fQVVUSE9SSVpBVElPTl9SRVNQT05TRSwgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgIHNlcnZlci5jbG9zZSgpO1xuICAgICAgICAvLyByZXNvbHZlIHBlbmRpbmcgcHJvbWlzZVxuICAgICAgICByZXNvbHZlKHJlc3VsdCBhcyBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlKTtcbiAgICAgICAgLy8gY29tcGxldGUgYXV0aG9yaXphdGlvbiBmbG93XG4gICAgICAgIHRoaXMuY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdElmUG9zc2libGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbGV0IHNlcnZlcjogSHR0cC5TZXJ2ZXI7XG4gICAgcmVxdWVzdC5zZXR1cENvZGVWZXJpZmllcigpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBzZXJ2ZXIgPSBIdHRwLmNyZWF0ZVNlcnZlcihyZXF1ZXN0SGFuZGxlcik7XG4gICAgICAgICAgc2VydmVyLmxpc3Rlbih0aGlzLmh0dHBTZXJ2ZXJQb3J0KTtcbiAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmJ1aWxkUmVxdWVzdFVybChjb25maWd1cmF0aW9uLCByZXF1ZXN0KTtcbiAgICAgICAgICBsb2coJ01ha2luZyBhIHJlcXVlc3QgdG8gJywgcmVxdWVzdCwgdXJsKTtcbiAgICAgICAgICBvcGVuZXIodXJsKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZygnU29tZXRoaW5nIGJhZCBoYXBwZW5lZCAnLCBlcnJvcik7XG4gICAgICAgICAgZW1pdHRlci5lbWl0KFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fVU5BQkxFX1RPX1NUQVJUKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD4ge1xuICAgIGlmICghdGhpcy5hdXRob3JpemF0aW9uUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAgICdObyBwZW5kaW5nIGF1dGhvcml6YXRpb24gcmVxdWVzdC4gQ2FsbCBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoKSA/Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXV0aG9yaXphdGlvblByb21pc2U7XG4gIH1cbn1cbiJdfQ==