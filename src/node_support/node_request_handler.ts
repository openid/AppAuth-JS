import {RandomGenerator} from '../crypto_utils';
import {nodeCryptoGenerateRandom} from './crypto_utils';
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
import opener = require('opener');
import * as Http from 'http';
import * as Url from 'url';
import {Request, ServerOptions, Server, ResponseToolkit} from 'hapi';
import * as EventEmitter from 'events';
import {BasicQueryStringUtils, QueryStringUtils} from '../query_string_utils';
import {AuthorizationRequest, AuthorizationRequestJson} from '../authorization_request';
import {AuthorizationRequestHandler, AuthorizationRequestResponse, BUILT_IN_PARAMETERS} from '../authorization_request_handler';
import {AuthorizationError, AuthorizationResponse, AuthorizationResponseJson, AuthorizationErrorJson} from '../authorization_response'
import {AuthorizationServiceConfiguration, AuthorizationServiceConfigurationJson} from '../authorization_service_configuration';
import {log} from '../logger';

class ServerEventsEmitter extends EventEmitter {
  static ON_UNABLE_TO_START = 'unable_to_start';
  static ON_AUTHORIZATION_RESPONSE = 'authorization_response';
}

export class NodeBasedHandler extends AuthorizationRequestHandler {
  // the handle to the current authorization request
  authorizationPromise: Promise<AuthorizationRequestResponse|null>|null = null;

  constructor(
      // default to port 8000
      public httpServerPort = 8000,
      utils: QueryStringUtils = new BasicQueryStringUtils(),
      generateRandom = nodeCryptoGenerateRandom) {
    super(utils, generateRandom);
  }

  performAuthorizationRequest(
      configuration: AuthorizationServiceConfiguration,
      request: AuthorizationRequest) {
    // use opener to launch a web browser and start the authorization flow.
    // start a web server to handle the authorization response.
    const emitter = new ServerEventsEmitter();

    const requestHandler = (httpRequest: Http.IncomingMessage, response: Http.ServerResponse) => {
      if (!httpRequest.url) {
        return;
      }

      const url = Url.parse(httpRequest.url);
      const searchParams = new Url.URLSearchParams(url.query || '');

      const state = searchParams.get('state') || undefined;
      const code = searchParams.get('code');
      const id_token = searchParams.get('id_token');
      const error = searchParams.get('error');

      if (!state && !code && !error) {
        // ignore irrelevant requests (e.g. favicon.ico)
        return;
      }

      log('Handling Authorization Request ', searchParams, state, code, error);
      let authorizationResponse: AuthorizationResponse|null = null;
      let authorizationError: AuthorizationError|null = null;
      if (error) {
        log('error');
        // get additional optional info.
        const errorUri = searchParams.get('error_uri') || undefined;
        const errorDescription = searchParams.get('error_description') || undefined;
        authorizationError = new AuthorizationError(error, errorDescription, errorUri, state);
      } else {
        authorizationResponse = new AuthorizationResponse(code!, state!, id_token!);
      }
      const completeResponse = {
        request,
        response: authorizationResponse,
        error: authorizationError
      } as AuthorizationRequestResponse;
      emitter.emit(ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE, completeResponse);
      response.end('Close your browser to continue');
    };

    this.authorizationPromise = new Promise<AuthorizationRequestResponse>((resolve, reject) => {
      emitter.once(ServerEventsEmitter.ON_UNABLE_TO_START, () => {
        reject(`Unable to create HTTP server at port ${this.httpServerPort}`);
      });
      emitter.once(ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE, (result: any) => {
        server.close();
        // resolve pending promise
        resolve(result as AuthorizationRequestResponse);
        // complete authorization flow
        this.completeAuthorizationRequestIfPossible();
      });
    });

    const server = Http.createServer(requestHandler);

    try {
      server.listen(this.httpServerPort);

      const url = this.buildRequestUrl(configuration, request);
      log('Making a request to ', request, url);
      opener(url);
    } catch (error) {
      log('Something bad happened ', error);
      emitter.emit(ServerEventsEmitter.ON_UNABLE_TO_START);
    }
  }

  protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse|null> {
    if (!this.authorizationPromise) {
      return Promise.reject(
          'No pending authorization request. Call performAuthorizationRequest() ?');
    }

    return this.authorizationPromise;
  }
}
