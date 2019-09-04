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
var EventEmitter = require("events");
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
}(EventEmitter));
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
        if (options === void 0) { options = { hasCustomOpener: false }; }
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
        return request.setupCodeVerifier()
            .then(function () {
            server = Http.createServer(requestHandler);
            server.listen(_this.httpServerPort);
            var url = _this.buildRequestUrl(configuration, request);
            logger_1.log('Making a request to ', request, url);
            if (!options.hasCustomOpener) {
                opener(url);
            }
            return url;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7OztBQUVILHFDQUF1QztBQUN2QywyQkFBNkI7QUFDN0IseUJBQTJCO0FBRTNCLGtGQUEyRztBQUMzRyxvRUFBb0Y7QUFHcEYsb0NBQThCO0FBQzlCLDREQUE4RTtBQUM5RSwrQ0FBMEM7QUFHMUMsaUZBQWlGO0FBQ2pGLCtCQUFrQztBQUdsQztJQUFrQyx1Q0FBWTtJQUE5Qzs7SUFHQSxDQUFDO0lBRlEsc0NBQWtCLEdBQUcsaUJBQWlCLENBQUM7SUFDdkMsNkNBQXlCLEdBQUcsd0JBQXdCLENBQUM7SUFDOUQsMEJBQUM7Q0FBQSxBQUhELENBQWtDLFlBQVksR0FHN0M7QUFFRDtJQUFzQyxvQ0FBMkI7SUFJL0Q7SUFDSSx1QkFBdUI7SUFDaEIsY0FBcUIsRUFDNUIsS0FBcUQsRUFDckQsTUFBaUM7UUFGMUIsK0JBQUEsRUFBQSxxQkFBcUI7UUFDNUIsc0JBQUEsRUFBQSxZQUE4QiwwQ0FBcUIsRUFBRTtRQUNyRCx1QkFBQSxFQUFBLGFBQXFCLHlCQUFVLEVBQUU7UUFKckMsWUFLRSxrQkFBTSxLQUFLLEVBQUUsTUFBTSxDQUFDLFNBQ3JCO1FBSlUsb0JBQWMsR0FBZCxjQUFjLENBQU87UUFMaEMsa0RBQWtEO1FBQ2xELDBCQUFvQixHQUFvRCxJQUFJLENBQUM7O0lBUTdFLENBQUM7SUFFRCxzREFBMkIsR0FBM0IsVUFDSSxhQUFnRCxFQUNoRCxPQUE2QixFQUM3QixPQUFnRTtRQUhwRSxpQkE0RUM7UUF6RUcsd0JBQUEsRUFBQSxZQUF3QyxlQUFlLEVBQUUsS0FBSyxFQUFFO1FBQ2xFLHVFQUF1RTtRQUN2RSwyREFBMkQ7UUFDM0QsSUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBbUIs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LENBQUM7WUFDSixNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMzQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNuQyxJQUFNLEdBQUcsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN6RCxZQUFHLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFO2dCQUM1QixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDYjtZQUNELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsS0FBSztZQUNYLFlBQUcsQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDO0lBRVMsdURBQTRCLEdBQXRDO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUM5QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQ2pCLHdFQUF3RSxDQUFDLENBQUM7U0FDL0U7UUFFRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNuQyxDQUFDO0lBQ0gsdUJBQUM7QUFBRCxDQUFDLEFBbEdELENBQXNDLDJEQUEyQixHQWtHaEU7QUFsR1ksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCAqIGFzIEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xuaW1wb3J0ICogYXMgSHR0cCBmcm9tICdodHRwJztcbmltcG9ydCAqIGFzIFVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdCwgQXV0aG9yaXphdGlvbk9wZW5lck9wdGlvbnN9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciwgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZX0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uRXJyb3IsIEF1dGhvcml6YXRpb25SZXNwb25zZX0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXNwb25zZSc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtDcnlwdG99IGZyb20gJy4uL2NyeXB0b191dGlscyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCB7QmFzaWNRdWVyeVN0cmluZ1V0aWxzLCBRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHtOb2RlQ3J5cHRvfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5cblxuLy8gVHlwZVNjcmlwdCB0eXBpbmdzIGZvciBgb3BlbmVyYCBhcmUgbm90IGNvcnJlY3QgYW5kIGRvIG5vdCBleHBvcnQgaXQgYXMgbW9kdWxlXG5pbXBvcnQgb3BlbmVyID0gcmVxdWlyZSgnb3BlbmVyJyk7XG5pbXBvcnQgeyBvcHRpb25zIH0gZnJvbSAnam9pJztcblxuY2xhc3MgU2VydmVyRXZlbnRzRW1pdHRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHN0YXRpYyBPTl9VTkFCTEVfVE9fU1RBUlQgPSAndW5hYmxlX3RvX3N0YXJ0JztcbiAgc3RhdGljIE9OX0FVVEhPUklaQVRJT05fUkVTUE9OU0UgPSAnYXV0aG9yaXphdGlvbl9yZXNwb25zZSc7XG59XG5cbmV4cG9ydCBjbGFzcyBOb2RlQmFzZWRIYW5kbGVyIGV4dGVuZHMgQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHtcbiAgLy8gdGhlIGhhbmRsZSB0byB0aGUgY3VycmVudCBhdXRob3JpemF0aW9uIHJlcXVlc3RcbiAgYXV0aG9yaXphdGlvblByb21pc2U6IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZXxudWxsPnxudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8vIGRlZmF1bHQgdG8gcG9ydCA4MDAwXG4gICAgICBwdWJsaWMgaHR0cFNlcnZlclBvcnQgPSA4MDAwLFxuICAgICAgdXRpbHM6IFF1ZXJ5U3RyaW5nVXRpbHMgPSBuZXcgQmFzaWNRdWVyeVN0cmluZ1V0aWxzKCksXG4gICAgICBjcnlwdG86IENyeXB0byA9IG5ldyBOb2RlQ3J5cHRvKCkpIHtcbiAgICBzdXBlcih1dGlscywgY3J5cHRvKTtcbiAgfVxuXG4gIHBlcmZvcm1BdXRob3JpemF0aW9uUmVxdWVzdChcbiAgICAgIGNvbmZpZ3VyYXRpb246IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbixcbiAgICAgIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0LFxuICAgICAgb3B0aW9uczogQXV0aG9yaXphdGlvbk9wZW5lck9wdGlvbnMgPSB7IGhhc0N1c3RvbU9wZW5lcjogZmFsc2UgfSkge1xuICAgIC8vIHVzZSBvcGVuZXIgdG8gbGF1bmNoIGEgd2ViIGJyb3dzZXIgYW5kIHN0YXJ0IHRoZSBhdXRob3JpemF0aW9uIGZsb3cuXG4gICAgLy8gc3RhcnQgYSB3ZWIgc2VydmVyIHRvIGhhbmRsZSB0aGUgYXV0aG9yaXphdGlvbiByZXNwb25zZS5cbiAgICBjb25zdCBlbWl0dGVyID0gbmV3IFNlcnZlckV2ZW50c0VtaXR0ZXIoKTtcblxuICAgIGNvbnN0IHJlcXVlc3RIYW5kbGVyID0gKGh0dHBSZXF1ZXN0OiBIdHRwLkluY29taW5nTWVzc2FnZSwgcmVzcG9uc2U6IEh0dHAuU2VydmVyUmVzcG9uc2UpID0+IHtcbiAgICAgIGlmICghaHR0cFJlcXVlc3QudXJsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKGh0dHBSZXF1ZXN0LnVybCk7XG4gICAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVXJsLlVSTFNlYXJjaFBhcmFtcyh1cmwucXVlcnkgfHwgJycpO1xuXG4gICAgICBjb25zdCBzdGF0ZSA9IHNlYXJjaFBhcmFtcy5nZXQoJ3N0YXRlJykgfHwgdW5kZWZpbmVkO1xuICAgICAgY29uc3QgY29kZSA9IHNlYXJjaFBhcmFtcy5nZXQoJ2NvZGUnKTtcbiAgICAgIGNvbnN0IGVycm9yID0gc2VhcmNoUGFyYW1zLmdldCgnZXJyb3InKTtcblxuICAgICAgaWYgKCFzdGF0ZSAmJiAhY29kZSAmJiAhZXJyb3IpIHtcbiAgICAgICAgLy8gaWdub3JlIGlycmVsZXZhbnQgcmVxdWVzdHMgKGUuZy4gZmF2aWNvbi5pY28pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbG9nKCdIYW5kbGluZyBBdXRob3JpemF0aW9uIFJlcXVlc3QgJywgc2VhcmNoUGFyYW1zLCBzdGF0ZSwgY29kZSwgZXJyb3IpO1xuICAgICAgbGV0IGF1dGhvcml6YXRpb25SZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwgPSBudWxsO1xuICAgICAgbGV0IGF1dGhvcml6YXRpb25FcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGwgPSBudWxsO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGxvZygnZXJyb3InKTtcbiAgICAgICAgLy8gZ2V0IGFkZGl0aW9uYWwgb3B0aW9uYWwgaW5mby5cbiAgICAgICAgY29uc3QgZXJyb3JVcmkgPSBzZWFyY2hQYXJhbXMuZ2V0KCdlcnJvcl91cmknKSB8fCB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGVycm9yRGVzY3JpcHRpb24gPSBzZWFyY2hQYXJhbXMuZ2V0KCdlcnJvcl9kZXNjcmlwdGlvbicpIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgYXV0aG9yaXphdGlvbkVycm9yID0gbmV3IEF1dGhvcml6YXRpb25FcnJvcihcbiAgICAgICAgICAgIHtlcnJvcjogZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiBlcnJvckRlc2NyaXB0aW9uLCBlcnJvcl91cmk6IGVycm9yVXJpLCBzdGF0ZTogc3RhdGV9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF1dGhvcml6YXRpb25SZXNwb25zZSA9IG5ldyBBdXRob3JpemF0aW9uUmVzcG9uc2Uoe2NvZGU6IGNvZGUhLCBzdGF0ZTogc3RhdGUhfSk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb21wbGV0ZVJlc3BvbnNlID0ge1xuICAgICAgICByZXF1ZXN0LFxuICAgICAgICByZXNwb25zZTogYXV0aG9yaXphdGlvblJlc3BvbnNlLFxuICAgICAgICBlcnJvcjogYXV0aG9yaXphdGlvbkVycm9yXG4gICAgICB9IGFzIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U7XG4gICAgICBlbWl0dGVyLmVtaXQoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFLCBjb21wbGV0ZVJlc3BvbnNlKTtcbiAgICAgIHJlc3BvbnNlLmVuZCgnQ2xvc2UgeW91ciBicm93c2VyIHRvIGNvbnRpbnVlJyk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0aG9yaXphdGlvblByb21pc2UgPSBuZXcgUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbWl0dGVyLm9uY2UoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9VTkFCTEVfVE9fU1RBUlQsICgpID0+IHtcbiAgICAgICAgcmVqZWN0KGBVbmFibGUgdG8gY3JlYXRlIEhUVFAgc2VydmVyIGF0IHBvcnQgJHt0aGlzLmh0dHBTZXJ2ZXJQb3J0fWApO1xuICAgICAgfSk7XG4gICAgICBlbWl0dGVyLm9uY2UoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFLCAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgc2VydmVyLmNsb3NlKCk7XG4gICAgICAgIC8vIHJlc29sdmUgcGVuZGluZyBwcm9taXNlXG4gICAgICAgIHJlc29sdmUocmVzdWx0IGFzIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2UpO1xuICAgICAgICAvLyBjb21wbGV0ZSBhdXRob3JpemF0aW9uIGZsb3dcbiAgICAgICAgdGhpcy5jb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0SWZQb3NzaWJsZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBsZXQgc2VydmVyOiBIdHRwLlNlcnZlcjtcbiAgICByZXR1cm4gcmVxdWVzdC5zZXR1cENvZGVWZXJpZmllcigpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBzZXJ2ZXIgPSBIdHRwLmNyZWF0ZVNlcnZlcihyZXF1ZXN0SGFuZGxlcik7XG4gICAgICAgICAgc2VydmVyLmxpc3Rlbih0aGlzLmh0dHBTZXJ2ZXJQb3J0KTtcbiAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmJ1aWxkUmVxdWVzdFVybChjb25maWd1cmF0aW9uLCByZXF1ZXN0KTtcbiAgICAgICAgICBsb2coJ01ha2luZyBhIHJlcXVlc3QgdG8gJywgcmVxdWVzdCwgdXJsKTtcbiAgICAgICAgICBpZiAoIW9wdGlvbnMuaGFzQ3VzdG9tT3BlbmVyKSB7XG4gICAgICAgICAgICBvcGVuZXIodXJsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVybDtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZygnU29tZXRoaW5nIGJhZCBoYXBwZW5lZCAnLCBlcnJvcik7XG4gICAgICAgICAgZW1pdHRlci5lbWl0KFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fVU5BQkxFX1RPX1NUQVJUKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD4ge1xuICAgIGlmICghdGhpcy5hdXRob3JpemF0aW9uUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAgICdObyBwZW5kaW5nIGF1dGhvcml6YXRpb24gcmVxdWVzdC4gQ2FsbCBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoKSA/Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXV0aG9yaXphdGlvblByb21pc2U7XG4gIH1cbn1cbiJdfQ==