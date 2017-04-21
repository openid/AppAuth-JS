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

import opener = require('opener');
import Hapi = require('hapi');
import EventEmitter = require('events');
import {BasicQueryStringUtils, QueryStringUtils} from '../query_string_utils';
import {AuthorizationRequest, AuthorizationRequestJson} from '../authorization_request';
import {AuthorizationRequestHandler, AuthorizationRequestResponse, BUILT_IN_PARAMETERS, generateRandom} from '../authorization_request_handler';
import {AuthorizationError, AuthorizationResponse, AuthorizationResponseJson} from '../authorization_response'
import {AuthorizationServiceConfiguration, AuthorizationServiceConfigurationJson} from '../authorization_service_configuration';
import {log} from '../logger';

class ServerEventsEmitter extends EventEmitter {
  static ON_UNABLE_TO_START = 'unable_to_start';
  static ON_AUTHORIZATION_RESPONSE = 'authorization_response';
}

export class NodeBasedHandler extends AuthorizationRequestHandler {
  httpServerPort: number;
  // the handle to the current authorization request
  authorizationPromise: Promise<AuthorizationRequestResponse|null>|null;

  constructor(httpServerPort?: number, utils?: QueryStringUtils) {
    super(utils || new BasicQueryStringUtils());

    this.authorizationPromise = null;
    this.httpServerPort = httpServerPort || 8000;  // default to port 8000
  }

  performAuthorizationRequest(
      configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest) {
    // use opener to launch a web browser and start the authorization flow.
    // start a web server to handle the authorization response.
    const server = new Hapi.Server();
    server.connection(<Hapi.IServerConnectionOptions>{port: this.httpServerPort});
    const emitter = new ServerEventsEmitter();

    this.authorizationPromise = new Promise<AuthorizationRequestResponse>((resolve, reject) => {
      emitter.once(ServerEventsEmitter.ON_UNABLE_TO_START, () => {
        reject(`Unable to create HTTP server at port ${this.httpServerPort}`);
      });
      emitter.once(ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE, (result: any) => {
        // resolve pending promise
        resolve(result as AuthorizationRequestResponse);
        // complete authorization flow
        this.completeAuthorizationRequestIfPossible();
      });
    });

    server.route({
      method: 'GET',
      path: '/authorize',
      handler: (hapiRequest: Hapi.Request, hapiResponse: Hapi.IReply) => {
        let queryParams = hapiRequest.query;
        let redirectUri = queryParams['url'];
        if (redirectUri) {
          let decoded = Buffer.from(redirectUri, 'base64').toString();
          log('Redirecting to ', decoded);
          hapiResponse.redirect(decoded);
        } else {
          hapiResponse(new Error('Invalid request'));
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/',
      handler: (hapiRequest: Hapi.Request, hapiResponse: Hapi.IReply) => {
        let queryParams = hapiRequest.query;
        let state: string|undefined = queryParams['state'];
        let code: string|undefined = queryParams['code'];
        let error: string|undefined = queryParams['error'];
        log('Handling Authorization Request ', queryParams, state, code, error);
        let authorizationResponse: AuthorizationResponse|null = null;
        let authorizationError: AuthorizationError|null = null;
        if (error) {
          // get additional optional info.
          let errorUri = queryParams['error_uri'];
          let errorDescription = queryParams['error_description'];
          authorizationError = new AuthorizationError(error, errorDescription, errorUri, state);
        } else {
          authorizationResponse = new AuthorizationResponse(code!, state!);
        }
        let completeResponse = {
                        request: request,
                        response: authorizationResponse,
                        error: authorizationError
                      } as AuthorizationRequestResponse;
        emitter.emit(ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE, completeResponse);
        hapiResponse('Close your browser to continue');
        server.stop();
      }
    });

    server.start()
        .then(() => {
          let url = this.buildRequestUrl(configuration, request);
          log('Making a request to ', request, url);
          let encoded = new Buffer(url).toString('base64');
          let proxiedUrl = `http://localhost:${this.httpServerPort}/authorize?url=${encoded}`;
          log('Proxied URL ', proxiedUrl);
          opener(proxiedUrl);
        })
        .catch(error => {
          log('Something bad happened ', error);
        });
  }

  protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse|null> {
    if (!this.authorizationPromise) {
      return Promise.reject(
          'No pending authorization request. Call performAuthorizationRequest() ?');
    }

    return this.authorizationPromise;
  }
}
