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
var opener = require("opener");
var hapi_1 = require("hapi");
var EventEmitter = require("events");
var query_string_utils_1 = require("../query_string_utils");
var authorization_request_handler_1 = require("../authorization_request_handler");
var authorization_response_1 = require("../authorization_response");
var logger_1 = require("../logger");
var ServerEventsEmitter = (function (_super) {
    __extends(ServerEventsEmitter, _super);
    function ServerEventsEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServerEventsEmitter;
}(EventEmitter));
ServerEventsEmitter.ON_UNABLE_TO_START = 'unable_to_start';
ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE = 'authorization_response';
var NodeBasedHandler = (function (_super) {
    __extends(NodeBasedHandler, _super);
    function NodeBasedHandler(httpServerPort, utils) {
        var _this = _super.call(this, utils || new query_string_utils_1.BasicQueryStringUtils()) || this;
        _this.authorizationPromise = null;
        _this.httpServerPort = httpServerPort || 8000; // default to port 8000
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7OztBQUVILCtCQUFrQztBQUNsQyw2QkFBbUc7QUFDbkcscUNBQXdDO0FBQ3hDLDREQUFnRjtBQUVoRixrRkFBa0o7QUFDbEosb0VBQXdJO0FBRXhJLG9DQUFnQztBQUVoQztJQUFrQyx1Q0FBWTtJQUE5Qzs7SUFHQSxDQUFDO0lBQUQsMEJBQUM7QUFBRCxDQUFDLEFBSEQsQ0FBa0MsWUFBWTtBQUNyQyxzQ0FBa0IsR0FBRyxpQkFBaUIsQ0FBQztBQUN2Qyw2Q0FBeUIsR0FBRyx3QkFBd0IsQ0FBQztBQUc5RDtJQUFzQyxvQ0FBMkI7SUFLL0QsMEJBQVksY0FBdUIsRUFBRSxLQUF3QjtRQUE3RCxZQUNFLGtCQUFNLEtBQUssSUFBSSxJQUFJLDBDQUFxQixFQUFFLENBQUMsU0FJNUM7UUFGQyxLQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLEtBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxJQUFJLElBQUksQ0FBQyxDQUFFLHVCQUF1Qjs7SUFDeEUsQ0FBQztJQUVELHNEQUEyQixHQUEzQixVQUNFLGFBQWdELEVBQUUsT0FBNkI7UUFEakYsaUJBMkRDO1FBekRDLHVFQUF1RTtRQUN2RSwyREFBMkQ7UUFDM0QsSUFBTSxNQUFNLEdBQUcsSUFBSSxhQUFNLEVBQUUsQ0FBQztRQUM1QixNQUFNLENBQUMsVUFBVSxDQUEwQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUMxRSxJQUFNLE9BQU8sR0FBRyxJQUFJLG1CQUFtQixFQUFFLENBQUM7UUFFMUMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksT0FBTyxDQUErQixVQUFDLE9BQU8s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QUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO0lBQ25DLENBQUM7SUFDSCx1QkFBQztBQUFELENBQUMsQUFqRkQsQ0FBc0MsMkRBQTJCLEdBaUZoRTtBQWpGWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IG9wZW5lciA9IHJlcXVpcmUoJ29wZW5lcicpO1xuaW1wb3J0IHsgUmVxdWVzdCwgU2VydmVyQ29ubmVjdGlvbk9wdGlvbnMsIFNlcnZlciwgU2VydmVyQ29ubmVjdGlvbiwgUmVwbHlOb0NvbnRpbnVlIH0gZnJvbSAnaGFwaSc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJyk7XG5pbXBvcnQgeyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMsIFF1ZXJ5U3RyaW5nVXRpbHMgfSBmcm9tICcuLi9xdWVyeV9zdHJpbmdfdXRpbHMnO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvblJlcXVlc3QsIEF1dGhvcml6YXRpb25SZXF1ZXN0SnNvbiB9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVxdWVzdCc7XG5pbXBvcnQgeyBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIsIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2UsIEJVSUxUX0lOX1BBUkFNRVRFUlMsIGdlbmVyYXRlUmFuZG9tIH0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0X2hhbmRsZXInO1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvbkVycm9yLCBBdXRob3JpemF0aW9uUmVzcG9uc2UsIEF1dGhvcml6YXRpb25SZXNwb25zZUpzb24sIEF1dGhvcml6YXRpb25FcnJvckpzb24gfSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3Jlc3BvbnNlJ1xuaW1wb3J0IHsgQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLCBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb25Kc29uIH0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9zZXJ2aWNlX2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgbG9nIH0gZnJvbSAnLi4vbG9nZ2VyJztcblxuY2xhc3MgU2VydmVyRXZlbnRzRW1pdHRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHN0YXRpYyBPTl9VTkFCTEVfVE9fU1RBUlQgPSAndW5hYmxlX3RvX3N0YXJ0JztcbiAgc3RhdGljIE9OX0FVVEhPUklaQVRJT05fUkVTUE9OU0UgPSAnYXV0aG9yaXphdGlvbl9yZXNwb25zZSc7XG59XG5cbmV4cG9ydCBjbGFzcyBOb2RlQmFzZWRIYW5kbGVyIGV4dGVuZHMgQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHtcbiAgaHR0cFNlcnZlclBvcnQ6IG51bWJlcjtcbiAgLy8gdGhlIGhhbmRsZSB0byB0aGUgY3VycmVudCBhdXRob3JpemF0aW9uIHJlcXVlc3RcbiAgYXV0aG9yaXphdGlvblByb21pc2U6IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZSB8IG51bGw+IHwgbnVsbDtcblxuICBjb25zdHJ1Y3RvcihodHRwU2VydmVyUG9ydD86IG51bWJlciwgdXRpbHM/OiBRdWVyeVN0cmluZ1V0aWxzKSB7XG4gICAgc3VwZXIodXRpbHMgfHwgbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpKTtcblxuICAgIHRoaXMuYXV0aG9yaXphdGlvblByb21pc2UgPSBudWxsO1xuICAgIHRoaXMuaHR0cFNlcnZlclBvcnQgPSBodHRwU2VydmVyUG9ydCB8fCA4MDAwOyAgLy8gZGVmYXVsdCB0byBwb3J0IDgwMDBcbiAgfVxuXG4gIHBlcmZvcm1BdXRob3JpemF0aW9uUmVxdWVzdChcbiAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sIHJlcXVlc3Q6IEF1dGhvcml6YXRpb25SZXF1ZXN0KSB7XG4gICAgLy8gdXNlIG9wZW5lciB0byBsYXVuY2ggYSB3ZWIgYnJvd3NlciBhbmQgc3RhcnQgdGhlIGF1dGhvcml6YXRpb24gZmxvdy5cbiAgICAvLyBzdGFydCBhIHdlYiBzZXJ2ZXIgdG8gaGFuZGxlIHRoZSBhdXRob3JpemF0aW9uIHJlc3BvbnNlLlxuICAgIGNvbnN0IHNlcnZlciA9IG5ldyBTZXJ2ZXIoKTtcbiAgICBzZXJ2ZXIuY29ubmVjdGlvbig8U2VydmVyQ29ubmVjdGlvbk9wdGlvbnM+eyBwb3J0OiB0aGlzLmh0dHBTZXJ2ZXJQb3J0IH0pO1xuICAgIGNvbnN0IGVtaXR0ZXIgPSBuZXcgU2VydmVyRXZlbnRzRW1pdHRlcigpO1xuXG4gICAgdGhpcy5hdXRob3JpemF0aW9uUHJvbWlzZSA9IG5ldyBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVtaXR0ZXIub25jZShTZXJ2ZXJFdmVudHNFbWl0dGVyLk9OX1VOQUJMRV9UT19TVEFSVCwgKCkgPT4ge1xuICAgICAgICByZWplY3QoYFVuYWJsZSB0byBjcmVhdGUgSFRUUCBzZXJ2ZXIgYXQgcG9ydCAke3RoaXMuaHR0cFNlcnZlclBvcnR9YCk7XG4gICAgICB9KTtcbiAgICAgIGVtaXR0ZXIub25jZShTZXJ2ZXJFdmVudHNFbWl0dGVyLk9OX0FVVEhPUklaQVRJT05fUkVTUE9OU0UsIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAvLyByZXNvbHZlIHBlbmRpbmcgcHJvbWlzZVxuICAgICAgICByZXNvbHZlKHJlc3VsdCBhcyBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlKTtcbiAgICAgICAgLy8gY29tcGxldGUgYXV0aG9yaXphdGlvbiBmbG93XG4gICAgICAgIHRoaXMuY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdElmUG9zc2libGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VydmVyLnJvdXRlKHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBwYXRoOiAnLycsXG4gICAgICBoYW5kbGVyOiAoaGFwaVJlcXVlc3Q6IFJlcXVlc3QsIGhhcGlSZXNwb25zZTogUmVwbHlOb0NvbnRpbnVlKSA9PiB7XG4gICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IGhhcGlSZXF1ZXN0LnF1ZXJ5IGFzIChBdXRob3JpemF0aW9uUmVzcG9uc2VKc29uICYgQXV0aG9yaXphdGlvbkVycm9ySnNvbik7XG4gICAgICAgIGxldCBzdGF0ZSA9IHF1ZXJ5UGFyYW1zWydzdGF0ZSddO1xuICAgICAgICBsZXQgY29kZSA9IHF1ZXJ5UGFyYW1zWydjb2RlJ107XG4gICAgICAgIGxldCBlcnJvciA9IHF1ZXJ5UGFyYW1zWydlcnJvciddO1xuICAgICAgICBsb2coJ0hhbmRsaW5nIEF1dGhvcml6YXRpb24gUmVxdWVzdCAnLCBxdWVyeVBhcmFtcywgc3RhdGUsIGNvZGUsIGVycm9yKTtcbiAgICAgICAgbGV0IGF1dGhvcml6YXRpb25SZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIGxldCBhdXRob3JpemF0aW9uRXJyb3I6IEF1dGhvcml6YXRpb25FcnJvciB8IG51bGwgPSBudWxsO1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAvLyBnZXQgYWRkaXRpb25hbCBvcHRpb25hbCBpbmZvLlxuICAgICAgICAgIGxldCBlcnJvclVyaSA9IHF1ZXJ5UGFyYW1zWydlcnJvcl91cmknXTtcbiAgICAgICAgICBsZXQgZXJyb3JEZXNjcmlwdGlvbiA9IHF1ZXJ5UGFyYW1zWydlcnJvcl9kZXNjcmlwdGlvbiddO1xuICAgICAgICAgIGF1dGhvcml6YXRpb25FcnJvciA9IG5ldyBBdXRob3JpemF0aW9uRXJyb3IoZXJyb3IsIGVycm9yRGVzY3JpcHRpb24sIGVycm9yVXJpLCBzdGF0ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXV0aG9yaXphdGlvblJlc3BvbnNlID0gbmV3IEF1dGhvcml6YXRpb25SZXNwb25zZShjb2RlISwgc3RhdGUhKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29tcGxldGVSZXNwb25zZSA9IHtcbiAgICAgICAgICByZXF1ZXN0OiByZXF1ZXN0LFxuICAgICAgICAgIHJlc3BvbnNlOiBhdXRob3JpemF0aW9uUmVzcG9uc2UsXG4gICAgICAgICAgZXJyb3I6IGF1dGhvcml6YXRpb25FcnJvclxuICAgICAgICB9IGFzIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U7XG4gICAgICAgIGVtaXR0ZXIuZW1pdChTZXJ2ZXJFdmVudHNFbWl0dGVyLk9OX0FVVEhPUklaQVRJT05fUkVTUE9OU0UsIGNvbXBsZXRlUmVzcG9uc2UpO1xuICAgICAgICBoYXBpUmVzcG9uc2UoJ0Nsb3NlIHlvdXIgYnJvd3NlciB0byBjb250aW51ZScpO1xuICAgICAgICBzZXJ2ZXIuc3RvcCgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc2VydmVyLnN0YXJ0KClcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuYnVpbGRSZXF1ZXN0VXJsKGNvbmZpZ3VyYXRpb24sIHJlcXVlc3QpO1xuICAgICAgICBsb2coJ01ha2luZyBhIHJlcXVlc3QgdG8gJywgcmVxdWVzdCwgdXJsKTtcbiAgICAgICAgb3BlbmVyKHVybCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgbG9nKCdTb21ldGhpbmcgYmFkIGhhcHBlbmVkICcsIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlIHwgbnVsbD4ge1xuICAgIGlmICghdGhpcy5hdXRob3JpemF0aW9uUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAnTm8gcGVuZGluZyBhdXRob3JpemF0aW9uIHJlcXVlc3QuIENhbGwgcGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KCkgPycpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmF1dGhvcml6YXRpb25Qcm9taXNlO1xuICB9XG59XG4iXX0=