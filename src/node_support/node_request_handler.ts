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

import {EventEmitter} from 'events';
import * as Http from 'http';
import * as Url from 'url';
import {AuthorizationManagementRequest} from '../authorization_management_request';
import {AuthorizationRequestHandler, AuthorizationRequestResponse} from '../authorization_request_handler';
import {AuthorizationResponse} from '../authorization_response';
import {AuthorizationError} from '../authorization_management_response';
import {AuthorizationServiceConfiguration} from '../authorization_service_configuration';
import {Crypto} from '../crypto_utils';
import {log} from '../logger';
import {BasicQueryStringUtils, QueryStringUtils} from '../query_string_utils';
import {NodeCrypto} from './crypto_utils';
import {RedirectRequestTypes} from '../types';
import {EndSessionResponse} from '../end_session_response';


// TypeScript typings for `opener` are not correct and do not export it as module
import opener = require('opener');
import { AuthorizationRequest } from '../authorization_request';

class ServerEventsEmitter extends EventEmitter {
  static ON_UNABLE_TO_START = 'unable_to_start';
  static ON_AUTHORIZATION_RESPONSE = 'authorization_response';
}

export class NodeBasedHandler extends AuthorizationRequestHandler {
  // the handle to the current authorization request
  authorizationPromise: Promise<AuthorizationRequestResponse|null>|null = null;

  /** The content for the authorization redirect response page. */
  protected authorizationRedirectPageContent = 'Close your browser to continue';

  constructor(
      // default to port 8000
      public httpServerPort = 8000,
      utils: QueryStringUtils = new BasicQueryStringUtils(),
      crypto: Crypto = new NodeCrypto()) {
    super(utils, crypto);
  }

  performAuthorizationRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest){
    this.performRequest(configuration, request, RedirectRequestTypes.authorization);
  }

  performEndSessionRequest(configuration: AuthorizationServiceConfiguration, request: AuthorizationRequest){
    this.performRequest(configuration, request, RedirectRequestTypes.endSession);
  }
  
  private performRequest(
      configuration: AuthorizationServiceConfiguration,
      request: AuthorizationManagementRequest, 
      requestType: RedirectRequestTypes) {
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
      const error = searchParams.get('error');

      if (!state && !code && !error) {
        // ignore irrelevant requests (e.g. favicon.ico)
        return;
      }

      if(requestType === RedirectRequestTypes.authorization){
        log('Handling Authorization Request ', searchParams, state, code, error);
      } else if(requestType === RedirectRequestTypes.endSession){
        log('Handling end session Request ', searchParams, state, error);
      }
      let authorizationResponse: EndSessionResponse|AuthorizationResponse|null = null;
      let authorizationError: AuthorizationError|null = null;
      if (error) {
        log('error');
        // get additional optional info.
        const errorUri = searchParams.get('error_uri') || undefined;
        const errorDescription = searchParams.get('error_description') || undefined;
        authorizationError = new AuthorizationError(
            {error: error, error_description: errorDescription, error_uri: errorUri, state: state});
      } else {
        if (requestType === RedirectRequestTypes.authorization) {
          authorizationResponse = new AuthorizationResponse({code: code!, state: state!});
        } else if (requestType === RedirectRequestTypes.endSession) {
          authorizationResponse = new EndSessionResponse({state: state!})
        }
      }
      const completeResponse = {
        request,
        response: authorizationResponse,
        error: authorizationError
      } as AuthorizationRequestResponse;
      emitter.emit(ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE, completeResponse);
      response.setHeader('Content-Type', 'text/html');
      response.end(this.authorizationRedirectPageContent);
    };

    this.authorizationPromise = new Promise<AuthorizationRequestResponse>((resolve, reject) => {
      emitter.once(ServerEventsEmitter.ON_UNABLE_TO_START, () => {
        reject(`Unable to create HTTP server at port ${this.httpServerPort}`);
      });
      emitter.once(ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE, (result: any) => {
        // Set timeout for the server connections to 1 ms as we wish to close and end the server
        // as soon as possible. This prevents a user failing to close the redirect window from
        // causing a hanging process due to the server.
        server.setTimeout(1);
        server.close();
        // resolve pending promise
        resolve(result as AuthorizationRequestResponse);
        // complete authorization flow
        this.completeAuthorizationRequestIfPossible();
      });
    });

    let server: Http.Server;
    let codeVerified: Promise<any> = Promise.resolve();
    if(request instanceof AuthorizationRequest){
      codeVerified = request.setupCodeVerifier()
    }

        codeVerified.then(() => {
          server = Http.createServer(requestHandler);
          server.listen(this.httpServerPort);
          const url = this.buildRequestUrl(configuration, request, requestType);
          log('Making a request to ', request, url);
          opener(url);
        })
        .catch((error) => {
          log('Something bad happened ', error);
          emitter.emit(ServerEventsEmitter.ON_UNABLE_TO_START);
        });
  }

  protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse|null> {
    return this.completeRequest();
  }

  protected completeEndSessionRequest(): Promise<AuthorizationRequestResponse|null> {
    return this.completeRequest();
  }

  private completeRequest(): Promise<AuthorizationRequestResponse|null> {
    if (!this.authorizationPromise) {
      return Promise.reject(
          'No pending authorization request. Call performAuthorizationRequest() ?');
    }

    return this.authorizationPromise;
  }
}
