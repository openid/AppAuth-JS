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
exports.NodeBasedHandler = void 0;
const events_1 = require("events");
const Http = __importStar(require("http"));
const Url = __importStar(require("url"));
const authorization_request_handler_1 = require("../authorization_request_handler");
const authorization_response_1 = require("../authorization_response");
const logger_1 = require("../logger");
const query_string_utils_1 = require("../query_string_utils");
const crypto_utils_1 = require("./crypto_utils");
const opener_1 = __importDefault(require("opener"));
class ServerEventsEmitter extends events_1.EventEmitter {
}
ServerEventsEmitter.ON_UNABLE_TO_START = 'unable_to_start';
ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE = 'authorization_response';
class NodeBasedHandler extends authorization_request_handler_1.AuthorizationRequestHandler {
    constructor(
    // default to port 8000
    httpServerPort = 8000, utils = new query_string_utils_1.BasicQueryStringUtils(), crypto = new crypto_utils_1.NodeCrypto()) {
        super(utils, crypto);
        this.httpServerPort = httpServerPort;
        // the handle to the current authorization request
        this.authorizationPromise = null;
        /** The content for the authorization redirect response page. */
        this.authorizationRedirectPageContent = 'Close your browser to continue';
    }
    performAuthorizationRequest(configuration, request) {
        // use opener to launch a web browser and start the authorization flow.
        // start a web server to handle the authorization response.
        const emitter = new ServerEventsEmitter();
        const requestHandler = (httpRequest, response) => {
            if (!httpRequest.url) {
                return;
            }
            const url = Url.parse(httpRequest.url);
            const searchParams = new Url.URLSearchParams(url.query || '');
            const state = searchParams.get('state') || undefined;
            const code = searchParams.get('code');
            const error = searchParams.get('error');
            if (!state && !code && !error) {
                // ignore irrelevant requests (e.g. favicon.ico)
                return;
            }
            (0, logger_1.log)('Handling Authorization Request ', searchParams, state, code, error);
            let authorizationResponse = null;
            let authorizationError = null;
            if (error) {
                (0, logger_1.log)('error');
                // get additional optional info.
                const errorUri = searchParams.get('error_uri') || undefined;
                const errorDescription = searchParams.get('error_description') || undefined;
                authorizationError = new authorization_response_1.AuthorizationError({ error: error, error_description: errorDescription, error_uri: errorUri, state: state });
            }
            else {
                authorizationResponse = new authorization_response_1.AuthorizationResponse({ code: code, state: state });
            }
            const completeResponse = {
                request,
                response: authorizationResponse,
                error: authorizationError
            };
            emitter.emit(ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE, completeResponse);
            response.setHeader('Content-Type', 'text/html');
            response.end(this.authorizationRedirectPageContent);
        };
        this.authorizationPromise = new Promise((resolve, reject) => {
            emitter.once(ServerEventsEmitter.ON_UNABLE_TO_START, () => {
                reject(`Unable to create HTTP server at port ${this.httpServerPort}`);
            });
            emitter.once(ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE, (result) => {
                // Set timeout for the server connections to 1 ms as we wish to close and end the server
                // as soon as possible. This prevents a user failing to close the redirect window from
                // causing a hanging process due to the server.
                server.setTimeout(1);
                server.close();
                // resolve pending promise
                resolve(result);
                // complete authorization flow
                this.completeAuthorizationRequestIfPossible();
            });
        });
        let server;
        request.setupCodeVerifier()
            .then(() => {
            server = Http.createServer(requestHandler);
            server.listen(this.httpServerPort);
            const url = this.buildRequestUrl(configuration, request);
            (0, logger_1.log)('Making a request to ', request, url);
            (0, opener_1.default)(url);
        })
            .catch((error) => {
            (0, logger_1.log)('Something bad happened ', error);
            emitter.emit(ServerEventsEmitter.ON_UNABLE_TO_START);
        });
    }
    completeAuthorizationRequest() {
        if (!this.authorizationPromise) {
            return Promise.reject('No pending authorization request. Call performAuthorizationRequest() ?');
        }
        return this.authorizationPromise;
    }
}
exports.NodeBasedHandler = NodeBasedHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILG1DQUFvQztBQUNwQyxNQUFZLElBQUksaUNBQWE7QUFDN0IsTUFBWSxHQUFHLGdDQUFZO0FBRTNCLG9GQUEyRztBQUMzRyxzRUFBb0Y7QUFHcEYsc0NBQThCO0FBQzlCLDhEQUE4RTtBQUM5RSxpREFBMEM7QUFDMUMsb0RBQTRCO0FBRTVCLE1BQU0sbUJBQW9CLFNBQVEscUJBQVk7Q0FHN0M7QUFGUSxzQ0FBa0IsR0FBRyxpQkFBaUIsQ0FBQztBQUN2Qyw2Q0FBeUIsR0FBRyx3QkFBd0IsQ0FBQztBQUc5RCxzQkFBOEIsU0FBUSwyREFBMkI7SUFPL0Q7SUFDSSx1QkFBdUI7SUFDaEIsY0FBYyxHQUFHLElBQUksRUFDNUIsS0FBSyxHQUFxQixJQUFJLDBDQUFxQixFQUFFLEVBQ3JELE1BQU0sR0FBVyxJQUFJLHlCQUFVLEVBQUU7UUFDbkMsS0FBSyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUhaLG1CQUFjLEdBQWQsY0FBYyxDQUFPO1FBUmhDLGtEQUFrRDtRQUNsRCx5QkFBb0IsR0FBb0QsSUFBSSxDQUFDO1FBRTdFLGdFQUFnRTtRQUN0RCxxQ0FBZ0MsR0FBRyxnQ0FBZ0MsQ0FBQztJQVE5RSxDQUFDO0lBRUQsMkJBQTJCLENBQ3ZCLGFBQWdELEVBQ2hELE9BQTZCO1FBQy9CLHVFQUF1RTtRQUN2RSwyREFBMkQ7UUFDM0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBbUIsRUFBRSxDQUFDO1FBRTFDLE1BQU0sY0FBYyxHQUFHLENBQUMsV0FBaUMsRUFBRSxRQUE2QixFQUFFLEVBQUU7WUFDMUYsSUFB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QUFDLENBQUM7Z0JBQ2hELDhCQUE4QjtnQkFDOUIsSUFBSSxDQUFDLHNDQUFzQyxFQUFFLENBQUM7WUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksTUFBbUIsQ0FBQztRQUN4QixPQUFPLENBQUMsaUJBQWlCLEVBQUU7YUFDdEIsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNULE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELElBQUEsWUFBRyxFQUFDLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxQyxJQUFBLGdCQUFNLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDZCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNmLElBQUEsWUFBRyxFQUFDLHlCQUF5QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztJQUNULENBQUM7SUFFUyw0QkFBNEI7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQy9CLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDakIsd0VBQXdFLENBQUMsQ0FBQztRQUNoRixDQUFDO1FBRUQsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDbkMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdldmVudHMnO1xuaW1wb3J0ICogYXMgSHR0cCBmcm9tICdodHRwJztcbmltcG9ydCAqIGFzIFVybCBmcm9tICd1cmwnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdH0gZnJvbSAnLi4vYXV0aG9yaXphdGlvbl9yZXF1ZXN0JztcbmltcG9ydCB7QXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyLCBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3JlcXVlc3RfaGFuZGxlcic7XG5pbXBvcnQge0F1dGhvcml6YXRpb25FcnJvciwgQXV0aG9yaXphdGlvblJlc3BvbnNlfSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3Jlc3BvbnNlJztcbmltcG9ydCB7QXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9ufSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3NlcnZpY2VfY29uZmlndXJhdGlvbic7XG5pbXBvcnQge0NyeXB0b30gZnJvbSAnLi4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCB7bG9nfSBmcm9tICcuLi9sb2dnZXInO1xuaW1wb3J0IHtCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMsIFF1ZXJ5U3RyaW5nVXRpbHN9IGZyb20gJy4uL3F1ZXJ5X3N0cmluZ191dGlscyc7XG5pbXBvcnQge05vZGVDcnlwdG99IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcbmltcG9ydCBvcGVuZXIgZnJvbSAnb3BlbmVyJztcblxuY2xhc3MgU2VydmVyRXZlbnRzRW1pdHRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIHN0YXRpYyBPTl9VTkFCTEVfVE9fU1RBUlQgPSAndW5hYmxlX3RvX3N0YXJ0JztcbiAgc3RhdGljIE9OX0FVVEhPUklaQVRJT05fUkVTUE9OU0UgPSAnYXV0aG9yaXphdGlvbl9yZXNwb25zZSc7XG59XG5cbmV4cG9ydCBjbGFzcyBOb2RlQmFzZWRIYW5kbGVyIGV4dGVuZHMgQXV0aG9yaXphdGlvblJlcXVlc3RIYW5kbGVyIHtcbiAgLy8gdGhlIGhhbmRsZSB0byB0aGUgY3VycmVudCBhdXRob3JpemF0aW9uIHJlcXVlc3RcbiAgYXV0aG9yaXphdGlvblByb21pc2U6IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZXxudWxsPnxudWxsID0gbnVsbDtcblxuICAvKiogVGhlIGNvbnRlbnQgZm9yIHRoZSBhdXRob3JpemF0aW9uIHJlZGlyZWN0IHJlc3BvbnNlIHBhZ2UuICovXG4gIHByb3RlY3RlZCBhdXRob3JpemF0aW9uUmVkaXJlY3RQYWdlQ29udGVudCA9ICdDbG9zZSB5b3VyIGJyb3dzZXIgdG8gY29udGludWUnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgLy8gZGVmYXVsdCB0byBwb3J0IDgwMDBcbiAgICAgIHB1YmxpYyBodHRwU2VydmVyUG9ydCA9IDgwMDAsXG4gICAgICB1dGlsczogUXVlcnlTdHJpbmdVdGlscyA9IG5ldyBCYXNpY1F1ZXJ5U3RyaW5nVXRpbHMoKSxcbiAgICAgIGNyeXB0bzogQ3J5cHRvID0gbmV3IE5vZGVDcnlwdG8oKSkge1xuICAgIHN1cGVyKHV0aWxzLCBjcnlwdG8pO1xuICB9XG5cbiAgcGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KFxuICAgICAgY29uZmlndXJhdGlvbjogQXV0aG9yaXphdGlvblNlcnZpY2VDb25maWd1cmF0aW9uLFxuICAgICAgcmVxdWVzdDogQXV0aG9yaXphdGlvblJlcXVlc3QpIHtcbiAgICAvLyB1c2Ugb3BlbmVyIHRvIGxhdW5jaCBhIHdlYiBicm93c2VyIGFuZCBzdGFydCB0aGUgYXV0aG9yaXphdGlvbiBmbG93LlxuICAgIC8vIHN0YXJ0IGEgd2ViIHNlcnZlciB0byBoYW5kbGUgdGhlIGF1dGhvcml6YXRpb24gcmVzcG9uc2UuXG4gICAgY29uc3QgZW1pdHRlciA9IG5ldyBTZXJ2ZXJFdmVudHNFbWl0dGVyKCk7XG5cbiAgICBjb25zdCByZXF1ZXN0SGFuZGxlciA9IChodHRwUmVxdWVzdDogSHR0cC5JbmNvbWluZ01lc3NhZ2UsIHJlc3BvbnNlOiBIdHRwLlNlcnZlclJlc3BvbnNlKSA9PiB7XG4gICAgICBpZiAoIWh0dHBSZXF1ZXN0LnVybCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZShodHRwUmVxdWVzdC51cmwpO1xuICAgICAgY29uc3Qgc2VhcmNoUGFyYW1zID0gbmV3IFVybC5VUkxTZWFyY2hQYXJhbXModXJsLnF1ZXJ5IHx8ICcnKTtcblxuICAgICAgY29uc3Qgc3RhdGUgPSBzZWFyY2hQYXJhbXMuZ2V0KCdzdGF0ZScpIHx8IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IGNvZGUgPSBzZWFyY2hQYXJhbXMuZ2V0KCdjb2RlJyk7XG4gICAgICBjb25zdCBlcnJvciA9IHNlYXJjaFBhcmFtcy5nZXQoJ2Vycm9yJyk7XG5cbiAgICAgIGlmICghc3RhdGUgJiYgIWNvZGUgJiYgIWVycm9yKSB7XG4gICAgICAgIC8vIGlnbm9yZSBpcnJlbGV2YW50IHJlcXVlc3RzIChlLmcuIGZhdmljb24uaWNvKVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxvZygnSGFuZGxpbmcgQXV0aG9yaXphdGlvbiBSZXF1ZXN0ICcsIHNlYXJjaFBhcmFtcywgc3RhdGUsIGNvZGUsIGVycm9yKTtcbiAgICAgIGxldCBhdXRob3JpemF0aW9uUmVzcG9uc2U6IEF1dGhvcml6YXRpb25SZXNwb25zZXxudWxsID0gbnVsbDtcbiAgICAgIGxldCBhdXRob3JpemF0aW9uRXJyb3I6IEF1dGhvcml6YXRpb25FcnJvcnxudWxsID0gbnVsbDtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBsb2coJ2Vycm9yJyk7XG4gICAgICAgIC8vIGdldCBhZGRpdGlvbmFsIG9wdGlvbmFsIGluZm8uXG4gICAgICAgIGNvbnN0IGVycm9yVXJpID0gc2VhcmNoUGFyYW1zLmdldCgnZXJyb3JfdXJpJykgfHwgdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBlcnJvckRlc2NyaXB0aW9uID0gc2VhcmNoUGFyYW1zLmdldCgnZXJyb3JfZGVzY3JpcHRpb24nKSB8fCB1bmRlZmluZWQ7XG4gICAgICAgIGF1dGhvcml6YXRpb25FcnJvciA9IG5ldyBBdXRob3JpemF0aW9uRXJyb3IoXG4gICAgICAgICAgICB7ZXJyb3I6IGVycm9yLCBlcnJvcl9kZXNjcmlwdGlvbjogZXJyb3JEZXNjcmlwdGlvbiwgZXJyb3JfdXJpOiBlcnJvclVyaSwgc3RhdGU6IHN0YXRlfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdXRob3JpemF0aW9uUmVzcG9uc2UgPSBuZXcgQXV0aG9yaXphdGlvblJlc3BvbnNlKHtjb2RlOiBjb2RlISwgc3RhdGU6IHN0YXRlIX0pO1xuICAgICAgfVxuICAgICAgY29uc3QgY29tcGxldGVSZXNwb25zZSA9IHtcbiAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgcmVzcG9uc2U6IGF1dGhvcml6YXRpb25SZXNwb25zZSxcbiAgICAgICAgZXJyb3I6IGF1dGhvcml6YXRpb25FcnJvclxuICAgICAgfSBhcyBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlO1xuICAgICAgZW1pdHRlci5lbWl0KFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fQVVUSE9SSVpBVElPTl9SRVNQT05TRSwgY29tcGxldGVSZXNwb25zZSk7XG4gICAgICByZXNwb25zZS5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICd0ZXh0L2h0bWwnKTtcbiAgICAgIHJlc3BvbnNlLmVuZCh0aGlzLmF1dGhvcml6YXRpb25SZWRpcmVjdFBhZ2VDb250ZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRob3JpemF0aW9uUHJvbWlzZSA9IG5ldyBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGVtaXR0ZXIub25jZShTZXJ2ZXJFdmVudHNFbWl0dGVyLk9OX1VOQUJMRV9UT19TVEFSVCwgKCkgPT4ge1xuICAgICAgICByZWplY3QoYFVuYWJsZSB0byBjcmVhdGUgSFRUUCBzZXJ2ZXIgYXQgcG9ydCAke3RoaXMuaHR0cFNlcnZlclBvcnR9YCk7XG4gICAgICB9KTtcbiAgICAgIGVtaXR0ZXIub25jZShTZXJ2ZXJFdmVudHNFbWl0dGVyLk9OX0FVVEhPUklaQVRJT05fUkVTUE9OU0UsIChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAvLyBTZXQgdGltZW91dCBmb3IgdGhlIHNlcnZlciBjb25uZWN0aW9ucyB0byAxIG1zIGFzIHdlIHdpc2ggdG8gY2xvc2UgYW5kIGVuZCB0aGUgc2VydmVyXG4gICAgICAgIC8vIGFzIHNvb24gYXMgcG9zc2libGUuIFRoaXMgcHJldmVudHMgYSB1c2VyIGZhaWxpbmcgdG8gY2xvc2UgdGhlIHJlZGlyZWN0IHdpbmRvdyBmcm9tXG4gICAgICAgIC8vIGNhdXNpbmcgYSBoYW5naW5nIHByb2Nlc3MgZHVlIHRvIHRoZSBzZXJ2ZXIuXG4gICAgICAgIHNlcnZlci5zZXRUaW1lb3V0KDEpO1xuICAgICAgICBzZXJ2ZXIuY2xvc2UoKTtcbiAgICAgICAgLy8gcmVzb2x2ZSBwZW5kaW5nIHByb21pc2VcbiAgICAgICAgcmVzb2x2ZShyZXN1bHQgYXMgQXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZSk7XG4gICAgICAgIC8vIGNvbXBsZXRlIGF1dGhvcml6YXRpb24gZmxvd1xuICAgICAgICB0aGlzLmNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3RJZlBvc3NpYmxlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGxldCBzZXJ2ZXI6IEh0dHAuU2VydmVyO1xuICAgIHJlcXVlc3Quc2V0dXBDb2RlVmVyaWZpZXIoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgc2VydmVyID0gSHR0cC5jcmVhdGVTZXJ2ZXIocmVxdWVzdEhhbmRsZXIpO1xuICAgICAgICAgIHNlcnZlci5saXN0ZW4odGhpcy5odHRwU2VydmVyUG9ydCk7XG4gICAgICAgICAgY29uc3QgdXJsID0gdGhpcy5idWlsZFJlcXVlc3RVcmwoY29uZmlndXJhdGlvbiwgcmVxdWVzdCk7XG4gICAgICAgICAgbG9nKCdNYWtpbmcgYSByZXF1ZXN0IHRvICcsIHJlcXVlc3QsIHVybCk7XG4gICAgICAgICAgb3BlbmVyKHVybCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBsb2coJ1NvbWV0aGluZyBiYWQgaGFwcGVuZWQgJywgZXJyb3IpO1xuICAgICAgICAgIGVtaXR0ZXIuZW1pdChTZXJ2ZXJFdmVudHNFbWl0dGVyLk9OX1VOQUJMRV9UT19TVEFSVCk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNvbXBsZXRlQXV0aG9yaXphdGlvblJlcXVlc3QoKTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+IHtcbiAgICBpZiAoIXRoaXMuYXV0aG9yaXphdGlvblByb21pc2UpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcbiAgICAgICAgICAnTm8gcGVuZGluZyBhdXRob3JpemF0aW9uIHJlcXVlc3QuIENhbGwgcGVyZm9ybUF1dGhvcml6YXRpb25SZXF1ZXN0KCkgPycpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmF1dGhvcml6YXRpb25Qcm9taXNlO1xuICB9XG59XG4iXX0=