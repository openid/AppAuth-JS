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
        var server = new hapi_1.Server();
        server.connection({ port: this.httpServerPort });
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
                hapiResponse('Close your browser to continue');
                server.stop();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUEyRTtBQUMzRTs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxpRkFBaUY7QUFDakYsK0JBQWtDO0FBQ2xDLDZCQUFtRztBQUNuRyxxQ0FBd0M7QUFDeEMsNERBQWdGO0FBRWhGLGtGQUkwQztBQUMxQyxvRUFBd0k7QUFFeEksb0NBQWdDO0FBRWhDO0lBQWtDLHVDQUFZO0lBQTlDOztJQUdBLENBQUM7SUFGUSxzQ0FBa0IsR0FBRyxpQkFBaUIsQ0FBQztJQUN2Qyw2Q0FBeUIsR0FBRyx3QkFBd0IsQ0FBQztJQUM5RCwwQkFBQztDQUFBLEFBSEQsQ0FBa0MsWUFBWSxHQUc3QztBQUVEO0lBQXNDLG9DQUEyQjtJQUkvRDtRQUNFLHVCQUF1QjtRQUNoQixjQUFxQixFQUM1QixLQUFxRCxFQUNyRCxjQUF5QztRQUZsQywrQkFBQSxFQUFBLHFCQUFxQjtRQUM1QixzQkFBQSxFQUFBLFlBQThCLDBDQUFxQixFQUFFO1FBQ3JELCtCQUFBLEVBQUEsaUJBQWlCLHVDQUF3QjtRQUozQyxZQUtFLGtCQUFNLEtBQUssRUFBRSxjQUFjLENBQUMsU0FDN0I7UUFKUSxvQkFBYyxHQUFkLGNBQWMsQ0FBTztRQUw5QixrREFBa0Q7UUFDbEQsMEJBQW9CLEdBQXdELElBQUksQ0FBQzs7SUFRakYsQ0FBQztJQUVELHNEQUEyQixHQUEzQixVQUNFLGFBQWdELEVBQUUsT0FBNkI7UUFEakYsaUJBMkRDO1FBekRDLHVFQUF1RTtRQUN2RSwyREFBMkQ7UUFDM0QsSUFBTSxNQUFNLEdBQUcsSUFBSSxhQUFNLEVBQUUsQ0FBQztRQUM1QixNQUFNLENBQUMsVUFBVSxDQUEwQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMs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QUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUNuQix3RUFBd0UsQ0FBQyxDQUFDO1FBQzlFLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFqRkQsQ0FBc0MsMkRBQTJCLEdBaUZoRTtBQWpGWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBub2RlQ3J5cHRvR2VuZXJhdGVSYW5kb20sIFJhbmRvbUdlbmVyYXRvciB9IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vLyBUeXBlU2NyaXB0IHR5cGluZ3MgZm9yIGBvcGVuZXJgIGFyZSBub3QgY29ycmVjdCBhbmQgZG8gbm90IGV4cG9ydCBpdCBhcyBtb2R1bGVcbmltcG9ydCBvcGVuZXIgPSByZXF1aXJlKCdvcGVuZXInKTtcbmltcG9ydCB7IFJlcXVlc3QsIFNlcnZlckNvbm5lY3Rpb25PcHRpb25zLCBTZXJ2ZXIsIFNlcnZlckNvbm5lY3Rpb24sIFJlcGx5Tm9Db250aW51ZSB9IGZyb20gJ2hhcGknO1xuaW1wb3J0ICogYXMgIEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xuaW1wb3J0IHsgQmFzaWNRdWVyeVN0cmluZ1V0aWxzLCBRdWVyeVN0cmluZ1V0aWxzIH0gZnJvbSAnLi4vcXVlcnlfc3RyaW5nX3V0aWxzJztcbmltcG9ydCB7IEF1dGhvcml6YXRpb25SZXF1ZXN0LCBBdXRob3JpemF0aW9uUmVxdWVzdEpzb24gfSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtcbiAgICBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIsXG4gICAgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZSxcbiAgICBCVUlMVF9JTl9QQVJBTUVURVJTXG59IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVxdWVzdF9oYW5kbGVyJztcbmltcG9ydCB7IEF1dGhvcml6YXRpb25FcnJvciwgQXV0aG9yaXphdGlvblJlc3BvbnNlLCBBdXRob3JpemF0aW9uUmVzcG9uc2VKc29uLCBBdXRob3JpemF0aW9uRXJyb3JKc29uIH0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXNwb25zZSdcbmltcG9ydCB7IEF1dGhvcml6YXRpb25TZXJ2aWNlQ29uZmlndXJhdGlvbiwgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uSnNvbiB9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IGxvZyB9IGZyb20gJy4uL2xvZ2dlcic7XG5cbmNsYXNzIFNlcnZlckV2ZW50c0VtaXR0ZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBzdGF0aWMgT05fVU5BQkxFX1RPX1NUQVJUID0gJ3VuYWJsZV90b19zdGFydCc7XG4gIHN0YXRpYyBPTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFID0gJ2F1dGhvcml6YXRpb25fcmVzcG9uc2UnO1xufVxuXG5leHBvcnQgY2xhc3MgTm9kZUJhc2VkSGFuZGxlciBleHRlbmRzIEF1dGhvcml6YXRpb25SZXF1ZXN0SGFuZGxlciB7XG4gIC8vIHRoZSBoYW5kbGUgdG8gdGhlIGN1cnJlbnQgYXV0aG9yaXphdGlvbiByZXF1ZXN0XG4gIGF1dGhvcml6YXRpb25Qcm9taXNlOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2UgfCBudWxsPiB8IG51bGwgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIC8vIGRlZmF1bHQgdG8gcG9ydCA4MDAwXG4gICAgcHVibGljIGh0dHBTZXJ2ZXJQb3J0ID0gODAwMCxcbiAgICB1dGlsczogUXVlcnlTdHJpbmdVdGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSxcbiAgICBnZW5lcmF0ZVJhbmRvbSA9IG5vZGVDcnlwdG9HZW5lcmF0ZVJhbmRvbSkge1xuICAgIHN1cGVyKHV0aWxzLCBnZW5lcmF0ZVJhbmRvbSk7XG4gIH1cblxuICBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoXG4gICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCkge1xuICAgIC8vIHVzZSBvcGVuZXIgdG8gbGF1bmNoIGEgd2ViIGJyb3dzZXIgYW5kIHN0YXJ0IHRoZSBhdXRob3JpemF0aW9uIGZsb3cuXG4gICAgLy8gc3RhcnQgYSB3ZWIgc2VydmVyIHRvIGhhbmRsZSB0aGUgYXV0aG9yaXphdGlvbiByZXNwb25zZS5cbiAgICBjb25zdCBzZXJ2ZXIgPSBuZXcgU2VydmVyKCk7XG4gICAgc2VydmVyLmNvbm5lY3Rpb24oPFNlcnZlckNvbm5lY3Rpb25PcHRpb25zPnsgcG9ydDogdGhpcy5odHRwU2VydmVyUG9ydCB9KTtcbiAgICBjb25zdCBlbWl0dGVyID0gbmV3IFNlcnZlckV2ZW50c0VtaXR0ZXIoKTtcblxuICAgIHRoaXMuYXV0aG9yaXphdGlvblByb21pc2UgPSBuZXcgUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBlbWl0dGVyLm9uY2UoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9VTkFCTEVfVE9fU1RBUlQsICgpID0+IHtcbiAgICAgICAgcmVqZWN0KGBVbmFibGUgdG8gY3JlYXRlIEhUVFAgc2VydmVyIGF0IHBvcnQgJHt0aGlzLmh0dHBTZXJ2ZXJQb3J0fWApO1xuICAgICAgfSk7XG4gICAgICBlbWl0dGVyLm9uY2UoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFLCAocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgLy8gcmVzb2x2ZSBwZW5kaW5nIHByb21pc2VcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQgYXMgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZSk7XG4gICAgICAgIC8vIGNvbXBsZXRlIGF1dGhvcml6YXRpb24gZmxvd1xuICAgICAgICB0aGlzLmNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3RJZlBvc3NpYmxlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcnZlci5yb3V0ZSh7XG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgcGF0aDogJy8nLFxuICAgICAgaGFuZGxlcjogKGhhcGlSZXF1ZXN0OiBSZXF1ZXN0LCBoYXBpUmVzcG9uc2U6IFJlcGx5Tm9Db250aW51ZSkgPT4ge1xuICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSBoYXBpUmVxdWVzdC5xdWVyeSBhcyAoQXV0aG9yaXphdGlvblJlc3BvbnNlSnNvbiAmIEF1dGhvcml6YXRpb25FcnJvckpzb24pO1xuICAgICAgICBsZXQgc3RhdGUgPSBxdWVyeVBhcmFtc1snc3RhdGUnXTtcbiAgICAgICAgbGV0IGNvZGUgPSBxdWVyeVBhcmFtc1snY29kZSddO1xuICAgICAgICBsZXQgZXJyb3IgPSBxdWVyeVBhcmFtc1snZXJyb3InXTtcbiAgICAgICAgbG9nKCdIYW5kbGluZyBBdXRob3JpemF0aW9uIFJlcXVlc3QgJywgcXVlcnlQYXJhbXMsIHN0YXRlLCBjb2RlLCBlcnJvcik7XG4gICAgICAgIGxldCBhdXRob3JpemF0aW9uUmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZSB8IG51bGwgPSBudWxsO1xuICAgICAgICBsZXQgYXV0aG9yaXphdGlvbkVycm9yOiBBdXRob3JpemF0aW9uRXJyb3IgfCBudWxsID0gbnVsbDtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgLy8gZ2V0IGFkZGl0aW9uYWwgb3B0aW9uYWwgaW5mby5cbiAgICAgICAgICBsZXQgZXJyb3JVcmkgPSBxdWVyeVBhcmFtc1snZXJyb3JfdXJpJ107XG4gICAgICAgICAgbGV0IGVycm9yRGVzY3JpcHRpb24gPSBxdWVyeVBhcmFtc1snZXJyb3JfZGVzY3JpcHRpb24nXTtcbiAgICAgICAgICBhdXRob3JpemF0aW9uRXJyb3IgPSBuZXcgQXV0aG9yaXphdGlvbkVycm9yKGVycm9yLCBlcnJvckRlc2NyaXB0aW9uLCBlcnJvclVyaSwgc3RhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF1dGhvcml6YXRpb25SZXNwb25zZSA9IG5ldyBBdXRob3JpemF0aW9uUmVzcG9uc2UoY29kZSEsIHN0YXRlISk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbXBsZXRlUmVzcG9uc2UgPSB7XG4gICAgICAgICAgcmVxdWVzdDogcmVxdWVzdCxcbiAgICAgICAgICByZXNwb25zZTogYXV0aG9yaXphdGlvblJlc3BvbnNlLFxuICAgICAgICAgIGVycm9yOiBhdXRob3JpemF0aW9uRXJyb3JcbiAgICAgICAgfSBhcyBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlO1xuICAgICAgICBlbWl0dGVyLmVtaXQoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFLCBjb21wbGV0ZVJlc3BvbnNlKTtcbiAgICAgICAgaGFwaVJlc3BvbnNlKCdDbG9zZSB5b3VyIGJyb3dzZXIgdG8gY29udGludWUnKTtcbiAgICAgICAgc2VydmVyLnN0b3AoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHNlcnZlci5zdGFydCgpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmJ1aWxkUmVxdWVzdFVybChjb25maWd1cmF0aW9uLCByZXF1ZXN0KTtcbiAgICAgICAgbG9nKCdNYWtpbmcgYSByZXF1ZXN0IHRvICcsIHJlcXVlc3QsIHVybCk7XG4gICAgICAgIG9wZW5lcih1cmwpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGxvZygnU29tZXRoaW5nIGJhZCBoYXBwZW5lZCAnLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBjb21wbGV0ZUF1dGhvcml6YXRpb25SZXF1ZXN0KCk6IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZSB8IG51bGw+IHtcbiAgICBpZiAoIXRoaXMuYXV0aG9yaXphdGlvblByb21pc2UpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcbiAgICAgICAgJ05vIHBlbmRpbmcgYXV0aG9yaXphdGlvbiByZXF1ZXN0LiBDYWxsIHBlcmZvcm1BdXRob3JpemF0aW9uUmVxdWVzdCgpID8nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hdXRob3JpemF0aW9uUHJvbWlzZTtcbiAgfVxufVxuIl19