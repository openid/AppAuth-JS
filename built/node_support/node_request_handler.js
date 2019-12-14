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
var errors_1 = require("../errors");
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
    ServerEventsEmitter.ON_START = 'start';
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
            emitter.once(ServerEventsEmitter.ON_UNABLE_TO_START, function (error) { return reject(error); });
            emitter.once(ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE, function (result) {
                server.close();
                // resolve pending promise
                resolve(result);
                // complete authorization flow
                _this.completeAuthorizationRequestIfPossible()
                    .catch(function (error) {
                    logger_1.log('Could not complete authorization request', error);
                });
            });
        });
        this.authorizationPromise.catch(function (error) {
            logger_1.log('Something bad happened ', error);
        });
        var server;
        request.setupCodeVerifier()
            .then(function () {
            server = Http.createServer(requestHandler);
            server.listen(_this.httpServerPort, '127.0.0.1', function () {
                var url = _this.buildRequestUrl(configuration, request);
                logger_1.log('Making a request to ', request, url);
                opener(url);
                emitter.emit(ServerEventsEmitter.ON_START);
            });
            server.on('error', function (error) {
                emitter.emit(ServerEventsEmitter.ON_UNABLE_TO_START, error);
            });
        })
            .catch(function (error) {
            emitter.emit(ServerEventsEmitter.ON_UNABLE_TO_START, error);
        });
        return new Promise(function (resolve, reject) {
            emitter.once(ServerEventsEmitter.ON_UNABLE_TO_START, function (error) {
                reject(new errors_1.AppAuthError("Unable to create HTTP server at port " + _this.httpServerPort, { origError: error }));
            });
            emitter.once(ServerEventsEmitter.ON_START, function () { return resolve(); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7OztBQUVILHFDQUF1QztBQUN2QywyQkFBNkI7QUFDN0IseUJBQTJCO0FBQzNCLG9DQUF1QztBQUV2QyxrRkFBMkc7QUFDM0csb0VBQW9GO0FBR3BGLG9DQUE4QjtBQUM5Qiw0REFBOEU7QUFDOUUsK0NBQTBDO0FBRzFDLGlGQUFpRjtBQUNqRiwrQkFBa0M7QUFFbEM7SUFBa0MsdUNBQVk7SUFBOUM7O0lBSUEsQ0FBQztJQUhRLDRCQUFRLEdBQUcsT0FBTyxDQUFDO0lBQ25CLHNDQUFrQixHQUFHLGlCQUFpQixDQUFDO0lBQ3ZDLDZDQUF5QixHQUFHLHdCQUF3QixDQUFDO0lBQzlELDBCQUFDO0NBQUEsQUFKRCxDQUFrQyxZQUFZLEdBSTdDO0FBRUQ7SUFBc0Msb0NBQTJCO0lBSS9EO0lBQ0ksdUJBQXVCO0lBQ2hCLGNBQXFCLEVBQzVCLEtBQXFELEVBQ3JELE1BQWlDO1FBRjFCLCtCQUFBLEVBQUEscUJBQXFCO1FBQzVCLHNCQUFBLEVBQUEsWUFBOEIsMENBQXFCLEVBQUU7UUFDckQsdUJBQUEsRUFBQSxhQUFxQix5QkFBVSxFQUFFO1FBSnJDLFlBS0Usa0JBQU0sS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUNyQjtRQUpVLG9CQUFjLEdBQWQsY0FBYyxDQUFPO1FBTGhDLGtEQUFrRDtRQUNsRCwwQkFBb0IsR0FBb0QsSUFBSSxDQUFDOztJQVE3RSxDQUFDO0lBRUQsc0RBQTJCLEdBQTNCLFVBQ0ksYUFBZ0QsRUFDaEQsT0FBNkI7UUFGakMsaUJBNkZDO1FBMUZDLHVFQUF1RTtRQUN2RSwyREFBMkQ7UUFDM0QsSUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1FBRTFD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QiwwQ0FBd0MsS0FBSSxDQUFDLGNBQWdCLEVBQzdELEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxDQUNuQixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLGNBQU0sT0FBQSxPQUFPLEVBQUUsRUFBVCxDQUFTLENBQUMsQ0FBQztRQUM5RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFUyx1REFBNEIsR0FBdEM7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzlCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDakIsd0VBQXdFLENBQUMsQ0FBQztTQUMvRTtRQUVELE9BQU8sSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFuSEQsQ0FBc0MsMkRBQTJCLEdBbUhoRTtBQW5IWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgRXZlbnRFbWl0dGVyIGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgKiBhcyBIdHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0ICogYXMgVXJsIGZyb20gJ3VybCc7XG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi4vZXJyb3JzJztcbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3R9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciwgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZX0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uRXJyb3IsIEF1dGhvcml6YXRpb25SZXNwb25zZX0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXNwb25zZSc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbn0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtDcnlwdG99IGZyb20gJy4uL2NyeXB0b191dGlscyc7XG5pbXBvcnQge2xvZ30gZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCB7QmFzaWNRdWVyeVN0cmluZ1V0aWxzLCBRdWVyeVN0cmluZ1V0aWxzfSBmcm9tICcuLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHtOb2RlQ3J5cHRvfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5cblxuLy8gVHlwZVNjcmlwdCB0eXBpbmdzIGZvciBgb3BlbmVyYCBhcmUgbm90IGNvcnJlY3QgYW5kIGRvIG5vdCBleHBvcnQgaXQgYXMgbW9kdWxlXG5pbXBvcnQgb3BlbmVyID0gcmVxdWlyZSgnb3BlbmVyJyk7XG5cbmNsYXNzIFNlcnZlckV2ZW50c0VtaXR0ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBzdGF0aWMgT05fU1RBUlQgPSAnc3RhcnQnO1xuICBzdGF0aWMgT05fVU5BQkxFX1RPX1NUQVJUID0gJ3VuYWJsZV90b19zdGFydCc7XG4gIHN0YXRpYyBPTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFID0gJ2F1dGhvcml6YXRpb25fcmVzcG9uc2UnO1xufVxuXG5leHBvcnQgY2xhc3MgTm9kZUJhc2VkSGFuZGxlciBleHRlbmRzIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XG4gIC8vIHRoZSBoYW5kbGUgdG8gdGhlIGN1cnJlbnQgYXV0aG9yaXphdGlvbiByZXF1ZXN0XG4gIGF1dGhvcml6YXRpb25Qcm9taXNlOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD58bnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICAvLyBkZWZhdWx0IHRvIHBvcnQgODAwMFxuICAgICAgcHVibGljIGh0dHBTZXJ2ZXJQb3J0ID0gODAwMCxcbiAgICAgIHV0aWxzOiBRdWVyeVN0cmluZ1V0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpLFxuICAgICAgY3J5cHRvOiBDcnlwdG8gPSBuZXcgTm9kZUNyeXB0bygpKSB7XG4gICAgc3VwZXIodXRpbHMsIGNyeXB0byk7XG4gIH1cblxuICBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCkge1xuICAgIC8vIHVzZSBvcGVuZXIgdG8gbGF1bmNoIGEgd2ViIGJyb3dzZXIgYW5kIHN0YXJ0IHRoZSBhdXRob3JpemF0aW9uIGZsb3cuXG4gICAgLy8gc3RhcnQgYSB3ZWIgc2VydmVyIHRvIGhhbmRsZSB0aGUgYXV0aG9yaXphdGlvbiByZXNwb25zZS5cbiAgICBjb25zdCBlbWl0dGVyID0gbmV3IFNlcnZlckV2ZW50c0VtaXR0ZXIoKTtcblxuICAgIGNvbnN0IHJlcXVlc3RIYW5kbGVyID0gKGh0dHBSZXF1ZXN0OiBIdHRwLkluY29taW5nTWVzc2FnZSwgcmVzcG9uc2U6IEh0dHAuU2VydmVyUmVzcG9uc2UpID0+IHtcbiAgICAgIGlmICghaHR0cFJlcXVlc3QudXJsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKGh0dHBSZXF1ZXN0LnVybCk7XG4gICAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVXJsLlVSTFNlYXJjaFBhcmFtcyh1cmwucXVlcnkgfHwgJycpO1xuXG4gICAgICBjb25zdCBzdGF0ZSA9IHNlYXJjaFBhcmFtcy5nZXQoJ3N0YXRlJykgfHwgdW5kZWZpbmVkO1xuICAgICAgY29uc3QgY29kZSA9IHNlYXJjaFBhcmFtcy5nZXQoJ2NvZGUnKTtcbiAgICAgIGNvbnN0IGVycm9yID0gc2VhcmNoUGFyYW1zLmdldCgnZXJyb3InKTtcblxuICAgICAgaWYgKCFzdGF0ZSAmJiAhY29kZSAmJiAhZXJyb3IpIHtcbiAgICAgICAgLy8gaWdub3JlIGlycmVsZXZhbnQgcmVxdWVzdHMgKGUuZy4gZmF2aWNvbi5pY28pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbG9nKCdIYW5kbGluZyBBdXRob3JpemF0aW9uIFJlcXVlc3QgJywgc2VhcmNoUGFyYW1zLCBzdGF0ZSwgY29kZSwgZXJyb3IpO1xuICAgICAgbGV0IGF1dGhvcml6YXRpb25SZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwgPSBudWxsO1xuICAgICAgbGV0IGF1dGhvcml6YXRpb25FcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGwgPSBudWxsO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGxvZygnZXJyb3InKTtcbiAgICAgICAgLy8gZ2V0IGFkZGl0aW9uYWwgb3B0aW9uYWwgaW5mby5cbiAgICAgICAgY29uc3QgZXJyb3JVcmkgPSBzZWFyY2hQYXJhbXMuZ2V0KCdlcnJvcl91cmknKSB8fCB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGVycm9yRGVzY3JpcHRpb24gPSBzZWFyY2hQYXJhbXMuZ2V0KCdlcnJvcl9kZXNjcmlwdGlvbicpIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgYXV0aG9yaXphdGlvbkVycm9yID0gbmV3IEF1dGhvcml6YXRpb25FcnJvcihcbiAgICAgICAgICAgIHtlcnJvcjogZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiBlcnJvckRlc2NyaXB0aW9uLCBlcnJvcl91cmk6IGVycm9yVXJpLCBzdGF0ZTogc3RhdGV9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF1dGhvcml6YXRpb25SZXNwb25zZSA9IG5ldyBBdXRob3JpemF0aW9uUmVzcG9uc2Uoe2NvZGU6IGNvZGUhLCBzdGF0ZTogc3RhdGUhfSk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb21wbGV0ZVJlc3BvbnNlID0ge1xuICAgICAgICByZXF1ZXN0LFxuICAgICAgICByZXNwb25zZTogYXV0aG9yaXphdGlvblJlc3BvbnNlLFxuICAgICAgICBlcnJvcjogYXV0aG9yaXphdGlvbkVycm9yXG4gICAgICB9IGFzIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U7XG4gICAgICBlbWl0dGVyLmVtaXQoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFLCBjb21wbGV0ZVJlc3BvbnNlKTtcbiAgICAgIHJlc3BvbnNlLmVuZCgnQ2xvc2UgeW91ciBicm93c2VyIHRvIGNvbnRpbnVlJyk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0aG9yaXphdGlvblByb21pc2UgPSBuZXcgUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVtaXR0ZXIub25jZShTZXJ2ZXJFdmVudHNFbWl0dGVyLk9OX1VOQUJMRV9UT19TVEFSVCwgKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKTtcbiAgICAgIGVtaXR0ZXIub25jZShTZXJ2ZXJFdmVudHNFbWl0dGVyLk9OX0FVVEhPUklaQVRJT05fUkVTUE9OU0UsIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICBzZXJ2ZXIuY2xvc2UoKTtcbiAgICAgICAgLy8gcmVzb2x2ZSBwZW5kaW5nIHByb21pc2VcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQgYXMgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZSk7XG4gICAgICAgIC8vIGNvbXBsZXRlIGF1dGhvcml6YXRpb24gZmxvd1xuICAgICAgICB0aGlzLmNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3RJZlBvc3NpYmxlKClcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgbG9nKCdDb3VsZCBub3QgY29tcGxldGUgYXV0aG9yaXphdGlvbiByZXF1ZXN0JywgZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmF1dGhvcml6YXRpb25Qcm9taXNlLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGxvZygnU29tZXRoaW5nIGJhZCBoYXBwZW5lZCAnLCBlcnJvcik7XG4gICAgfSk7XG5cbiAgICBsZXQgc2VydmVyOiBIdHRwLlNlcnZlcjtcbiAgICByZXF1ZXN0LnNldHVwQ29kZVZlcmlmaWVyKClcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHNlcnZlciA9IEh0dHAuY3JlYXRlU2VydmVyKHJlcXVlc3RIYW5kbGVyKTtcbiAgICAgICAgICBzZXJ2ZXIubGlzdGVuKHRoaXMuaHR0cFNlcnZlclBvcnQsICcxMjcuMC4wLjEnLCAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmJ1aWxkUmVxdWVzdFVybChjb25maWd1cmF0aW9uLCByZXF1ZXN0KTtcbiAgICAgICAgICAgIGxvZygnTWFraW5nIGEgcmVxdWVzdCB0byAnLCByZXF1ZXN0LCB1cmwpO1xuICAgICAgICAgICAgb3BlbmVyKHVybCk7XG4gICAgICAgICAgICBlbWl0dGVyLmVtaXQoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9TVEFSVCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBzZXJ2ZXIub24oJ2Vycm9yJywgKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgZW1pdHRlci5lbWl0KFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fVU5BQkxFX1RPX1NUQVJULCBlcnJvcik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBlbWl0dGVyLmVtaXQoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9VTkFCTEVfVE9fU1RBUlQsIGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW1pdHRlci5vbmNlKFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fVU5BQkxFX1RPX1NUQVJULCAoZXJyb3IpID0+IHtcbiAgICAgICAgcmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IoXG4gICAgICAgICAgYFVuYWJsZSB0byBjcmVhdGUgSFRUUCBzZXJ2ZXIgYXQgcG9ydCAke3RoaXMuaHR0cFNlcnZlclBvcnR9YCxcbiAgICAgICAgICB7b3JpZ0Vycm9yOiBlcnJvcn1cbiAgICAgICAgKSk7XG4gICAgICB9KTtcblxuICAgICAgZW1pdHRlci5vbmNlKFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fU1RBUlQsICgpID0+IHJlc29sdmUoKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD4ge1xuICAgIGlmICghdGhpcy5hdXRob3JpemF0aW9uUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAgICdObyBwZW5kaW5nIGF1dGhvcml6YXRpb24gcmVxdWVzdC4gQ2FsbCBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoKSA/Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXV0aG9yaXphdGlvblByb21pc2U7XG4gIH1cbn1cbiJdfQ==