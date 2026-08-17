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
import { EventEmitter } from 'events';
import * as Http from 'http';
import * as Url from 'url';
import { AuthorizationRequestHandler } from '../authorization_request_handler';
import { AuthorizationError, AuthorizationResponse } from '../authorization_response';
import { log } from '../logger';
import { BasicQueryStringUtils } from '../query_string_utils';
import { NodeCrypto } from './crypto_utils';
import opener from 'opener';
class ServerEventsEmitter extends EventEmitter {
}
ServerEventsEmitter.ON_UNABLE_TO_START = 'unable_to_start';
ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE = 'authorization_response';
export class NodeBasedHandler extends AuthorizationRequestHandler {
    constructor(
    // default to port 8000
    httpServerPort = 8000, utils = new BasicQueryStringUtils(), crypto = new NodeCrypto()) {
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
            log('Handling Authorization Request ', searchParams, state, code, error);
            let authorizationResponse = null;
            let authorizationError = null;
            if (error) {
                log('error');
                // get additional optional info.
                const errorUri = searchParams.get('error_uri') || undefined;
                const errorDescription = searchParams.get('error_description') || undefined;
                authorizationError = new AuthorizationError({ error: error, error_description: errorDescription, error_uri: errorUri, state: state });
            }
            else {
                authorizationResponse = new AuthorizationResponse({ code: code, state: state });
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
            log('Making a request to ', request, url);
            opener(url);
        })
            .catch((error) => {
            log('Something bad happened ', error);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZV9yZXF1ZXN0X2hhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbm9kZV9zdXBwb3J0L25vZGVfcmVxdWVzdF9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFDcEMsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUM7QUFFM0IsT0FBTyxFQUFDLDJCQUEyQixFQUErQixNQUFNLGtDQUFrQyxDQUFDO0FBQzNHLE9BQU8sRUFBQyxrQkFBa0IsRUFBRSxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBR3BGLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDOUIsT0FBTyxFQUFDLHFCQUFxQixFQUFtQixNQUFNLHVCQUF1QixDQUFDO0FBQzlFLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxQyxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUIsTUFBTSxtQkFBb0IsU0FBUSxZQUFZO0NBRzdDO0FBRlEsc0NBQWtCLEdBQUcsaUJBQWlCLENBQUM7QUFDdkMsNkNBQXlCLEdBQUcsd0JBQXdCLENBQUM7QUFHOUQsTUFBTSxPQUFPLGdCQUFpQixTQUFRLDJCQUEyQjtJQU8vRDtJQUNJLHVCQUF1QjtJQUNoQixjQUFjLEdBQUcsSUFBSSxFQUM1QixLQUFLLEdBQXFCLElBQUkscUJBQXFCLEVBQUUsRUFDckQsTUFBTSxHQUFXLElBQUksVUFBVSxFQUFFO1FBQ25DLEtBQUssQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFIWixtQkFBYyxHQUFkLGNBQWMsQ0FBTztRQVJoQyxrREFBa0Q7UUFDbEQseUJBQW9CLEdBQW9ELElBQUksQ0FBQztRQUU3RSxnRUFBZ0U7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QUFDO1FBQ2hGLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztJQUNuQyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgKiBhcyBIdHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0ICogYXMgVXJsIGZyb20gJ3VybCc7XG5pbXBvcnQge0F1dGhvcml6YXRpb25SZXF1ZXN0fSBmcm9tICcuLi9hdXRob3JpemF0aW9uX3JlcXVlc3QnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIsIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVxdWVzdF9oYW5kbGVyJztcbmltcG9ydCB7QXV0aG9yaXphdGlvbkVycm9yLCBBdXRob3JpemF0aW9uUmVzcG9uc2V9IGZyb20gJy4uL2F1dGhvcml6YXRpb25fcmVzcG9uc2UnO1xuaW1wb3J0IHtBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb259IGZyb20gJy4uL2F1dGhvcml6YXRpb25fc2VydmljZV9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7Q3J5cHRvfSBmcm9tICcuLi9jcnlwdG9fdXRpbHMnO1xuaW1wb3J0IHtsb2d9IGZyb20gJy4uL2xvZ2dlcic7XG5pbXBvcnQge0Jhc2ljUXVlcnlTdHJpbmdVdGlscywgUXVlcnlTdHJpbmdVdGlsc30gZnJvbSAnLi4vcXVlcnlfc3RyaW5nX3V0aWxzJztcbmltcG9ydCB7Tm9kZUNyeXB0b30gZnJvbSAnLi9jcnlwdG9fdXRpbHMnO1xuaW1wb3J0IG9wZW5lciBmcm9tICdvcGVuZXInO1xuXG5jbGFzcyBTZXJ2ZXJFdmVudHNFbWl0dGVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgc3RhdGljIE9OX1VOQUJMRV9UT19TVEFSVCA9ICd1bmFibGVfdG9fc3RhcnQnO1xuICBzdGF0aWMgT05fQVVUSE9SSVpBVElPTl9SRVNQT05TRSA9ICdhdXRob3JpemF0aW9uX3Jlc3BvbnNlJztcbn1cblxuZXhwb3J0IGNsYXNzIE5vZGVCYXNlZEhhbmRsZXIgZXh0ZW5kcyBBdXRob3JpemF0aW9uUmVxdWVzdEhhbmRsZXIge1xuICAvLyB0aGUgaGFuZGxlIHRvIHRoZSBjdXJyZW50IGF1dGhvcml6YXRpb24gcmVxdWVzdFxuICBhdXRob3JpemF0aW9uUHJvbWlzZTogUHJvbWlzZTxBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlfG51bGw+fG51bGwgPSBudWxsO1xuXG4gIC8qKiBUaGUgY29udGVudCBmb3IgdGhlIGF1dGhvcml6YXRpb24gcmVkaXJlY3QgcmVzcG9uc2UgcGFnZS4gKi9cbiAgcHJvdGVjdGVkIGF1dGhvcml6YXRpb25SZWRpcmVjdFBhZ2VDb250ZW50ID0gJ0Nsb3NlIHlvdXIgYnJvd3NlciB0byBjb250aW51ZSc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICAvLyBkZWZhdWx0IHRvIHBvcnQgODAwMFxuICAgICAgcHVibGljIGh0dHBTZXJ2ZXJQb3J0ID0gODAwMCxcbiAgICAgIHV0aWxzOiBRdWVyeVN0cmluZ1V0aWxzID0gbmV3IEJhc2ljUXVlcnlTdHJpbmdVdGlscygpLFxuICAgICAgY3J5cHRvOiBDcnlwdG8gPSBuZXcgTm9kZUNyeXB0bygpKSB7XG4gICAgc3VwZXIodXRpbHMsIGNyeXB0byk7XG4gIH1cblxuICBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoXG4gICAgICBjb25maWd1cmF0aW9uOiBBdXRob3JpemF0aW9uU2VydmljZUNvbmZpZ3VyYXRpb24sXG4gICAgICByZXF1ZXN0OiBBdXRob3JpemF0aW9uUmVxdWVzdCkge1xuICAgIC8vIHVzZSBvcGVuZXIgdG8gbGF1bmNoIGEgd2ViIGJyb3dzZXIgYW5kIHN0YXJ0IHRoZSBhdXRob3JpemF0aW9uIGZsb3cuXG4gICAgLy8gc3RhcnQgYSB3ZWIgc2VydmVyIHRvIGhhbmRsZSB0aGUgYXV0aG9yaXphdGlvbiByZXNwb25zZS5cbiAgICBjb25zdCBlbWl0dGVyID0gbmV3IFNlcnZlckV2ZW50c0VtaXR0ZXIoKTtcblxuICAgIGNvbnN0IHJlcXVlc3RIYW5kbGVyID0gKGh0dHBSZXF1ZXN0OiBIdHRwLkluY29taW5nTWVzc2FnZSwgcmVzcG9uc2U6IEh0dHAuU2VydmVyUmVzcG9uc2UpID0+IHtcbiAgICAgIGlmICghaHR0cFJlcXVlc3QudXJsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKGh0dHBSZXF1ZXN0LnVybCk7XG4gICAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVXJsLlVSTFNlYXJjaFBhcmFtcyh1cmwucXVlcnkgfHwgJycpO1xuXG4gICAgICBjb25zdCBzdGF0ZSA9IHNlYXJjaFBhcmFtcy5nZXQoJ3N0YXRlJykgfHwgdW5kZWZpbmVkO1xuICAgICAgY29uc3QgY29kZSA9IHNlYXJjaFBhcmFtcy5nZXQoJ2NvZGUnKTtcbiAgICAgIGNvbnN0IGVycm9yID0gc2VhcmNoUGFyYW1zLmdldCgnZXJyb3InKTtcblxuICAgICAgaWYgKCFzdGF0ZSAmJiAhY29kZSAmJiAhZXJyb3IpIHtcbiAgICAgICAgLy8gaWdub3JlIGlycmVsZXZhbnQgcmVxdWVzdHMgKGUuZy4gZmF2aWNvbi5pY28pXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbG9nKCdIYW5kbGluZyBBdXRob3JpemF0aW9uIFJlcXVlc3QgJywgc2VhcmNoUGFyYW1zLCBzdGF0ZSwgY29kZSwgZXJyb3IpO1xuICAgICAgbGV0IGF1dGhvcml6YXRpb25SZXNwb25zZTogQXV0aG9yaXphdGlvblJlc3BvbnNlfG51bGwgPSBudWxsO1xuICAgICAgbGV0IGF1dGhvcml6YXRpb25FcnJvcjogQXV0aG9yaXphdGlvbkVycm9yfG51bGwgPSBudWxsO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGxvZygnZXJyb3InKTtcbiAgICAgICAgLy8gZ2V0IGFkZGl0aW9uYWwgb3B0aW9uYWwgaW5mby5cbiAgICAgICAgY29uc3QgZXJyb3JVcmkgPSBzZWFyY2hQYXJhbXMuZ2V0KCdlcnJvcl91cmknKSB8fCB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGVycm9yRGVzY3JpcHRpb24gPSBzZWFyY2hQYXJhbXMuZ2V0KCdlcnJvcl9kZXNjcmlwdGlvbicpIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgYXV0aG9yaXphdGlvbkVycm9yID0gbmV3IEF1dGhvcml6YXRpb25FcnJvcihcbiAgICAgICAgICAgIHtlcnJvcjogZXJyb3IsIGVycm9yX2Rlc2NyaXB0aW9uOiBlcnJvckRlc2NyaXB0aW9uLCBlcnJvcl91cmk6IGVycm9yVXJpLCBzdGF0ZTogc3RhdGV9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF1dGhvcml6YXRpb25SZXNwb25zZSA9IG5ldyBBdXRob3JpemF0aW9uUmVzcG9uc2Uoe2NvZGU6IGNvZGUhLCBzdGF0ZTogc3RhdGUhfSk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb21wbGV0ZVJlc3BvbnNlID0ge1xuICAgICAgICByZXF1ZXN0LFxuICAgICAgICByZXNwb25zZTogYXV0aG9yaXphdGlvblJlc3BvbnNlLFxuICAgICAgICBlcnJvcjogYXV0aG9yaXphdGlvbkVycm9yXG4gICAgICB9IGFzIEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2U7XG4gICAgICBlbWl0dGVyLmVtaXQoU2VydmVyRXZlbnRzRW1pdHRlci5PTl9BVVRIT1JJWkFUSU9OX1JFU1BPTlNFLCBjb21wbGV0ZVJlc3BvbnNlKTtcbiAgICAgIHJlc3BvbnNlLnNldEhlYWRlcignQ29udGVudC1UeXBlJywgJ3RleHQvaHRtbCcpO1xuICAgICAgcmVzcG9uc2UuZW5kKHRoaXMuYXV0aG9yaXphdGlvblJlZGlyZWN0UGFnZUNvbnRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dGhvcml6YXRpb25Qcm9taXNlID0gbmV3IFByb21pc2U8QXV0aG9yaXphdGlvblJlcXVlc3RSZXNwb25zZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZW1pdHRlci5vbmNlKFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fVU5BQkxFX1RPX1NUQVJULCAoKSA9PiB7XG4gICAgICAgIHJlamVjdChgVW5hYmxlIHRvIGNyZWF0ZSBIVFRQIHNlcnZlciBhdCBwb3J0ICR7dGhpcy5odHRwU2VydmVyUG9ydH1gKTtcbiAgICAgIH0pO1xuICAgICAgZW1pdHRlci5vbmNlKFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fQVVUSE9SSVpBVElPTl9SRVNQT05TRSwgKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgIC8vIFNldCB0aW1lb3V0IGZvciB0aGUgc2VydmVyIGNvbm5lY3Rpb25zIHRvIDEgbXMgYXMgd2Ugd2lzaCB0byBjbG9zZSBhbmQgZW5kIHRoZSBzZXJ2ZXJcbiAgICAgICAgLy8gYXMgc29vbiBhcyBwb3NzaWJsZS4gVGhpcyBwcmV2ZW50cyBhIHVzZXIgZmFpbGluZyB0byBjbG9zZSB0aGUgcmVkaXJlY3Qgd2luZG93IGZyb21cbiAgICAgICAgLy8gY2F1c2luZyBhIGhhbmdpbmcgcHJvY2VzcyBkdWUgdG8gdGhlIHNlcnZlci5cbiAgICAgICAgc2VydmVyLnNldFRpbWVvdXQoMSk7XG4gICAgICAgIHNlcnZlci5jbG9zZSgpO1xuICAgICAgICAvLyByZXNvbHZlIHBlbmRpbmcgcHJvbWlzZVxuICAgICAgICByZXNvbHZlKHJlc3VsdCBhcyBBdXRob3JpemF0aW9uUmVxdWVzdFJlc3BvbnNlKTtcbiAgICAgICAgLy8gY29tcGxldGUgYXV0aG9yaXphdGlvbiBmbG93XG4gICAgICAgIHRoaXMuY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdElmUG9zc2libGUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgbGV0IHNlcnZlcjogSHR0cC5TZXJ2ZXI7XG4gICAgcmVxdWVzdC5zZXR1cENvZGVWZXJpZmllcigpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBzZXJ2ZXIgPSBIdHRwLmNyZWF0ZVNlcnZlcihyZXF1ZXN0SGFuZGxlcik7XG4gICAgICAgICAgc2VydmVyLmxpc3Rlbih0aGlzLmh0dHBTZXJ2ZXJQb3J0KTtcbiAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmJ1aWxkUmVxdWVzdFVybChjb25maWd1cmF0aW9uLCByZXF1ZXN0KTtcbiAgICAgICAgICBsb2coJ01ha2luZyBhIHJlcXVlc3QgdG8gJywgcmVxdWVzdCwgdXJsKTtcbiAgICAgICAgICBvcGVuZXIodXJsKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGxvZygnU29tZXRoaW5nIGJhZCBoYXBwZW5lZCAnLCBlcnJvcik7XG4gICAgICAgICAgZW1pdHRlci5lbWl0KFNlcnZlckV2ZW50c0VtaXR0ZXIuT05fVU5BQkxFX1RPX1NUQVJUKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY29tcGxldGVBdXRob3JpemF0aW9uUmVxdWVzdCgpOiBQcm9taXNlPEF1dGhvcml6YXRpb25SZXF1ZXN0UmVzcG9uc2V8bnVsbD4ge1xuICAgIGlmICghdGhpcy5hdXRob3JpemF0aW9uUHJvbWlzZSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFxuICAgICAgICAgICdObyBwZW5kaW5nIGF1dGhvcml6YXRpb24gcmVxdWVzdC4gQ2FsbCBwZXJmb3JtQXV0aG9yaXphdGlvblJlcXVlc3QoKSA/Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuYXV0aG9yaXphdGlvblByb21pc2U7XG4gIH1cbn1cbiJdfQ==