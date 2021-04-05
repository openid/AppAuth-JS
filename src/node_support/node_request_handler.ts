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
import {AuthorizationRequest} from '../authorization_request';
import {AuthorizationRequestHandler, AuthorizationRequestResponse} from '../authorization_request_handler';
import {AuthorizationError, AuthorizationResponse} from '../authorization_response';
import {AuthorizationServiceConfiguration} from '../authorization_service_configuration';
import {Crypto} from '../crypto_utils';
import {log} from '../logger';
import {BasicQueryStringUtils, QueryStringUtils} from '../query_string_utils';
import {NodeCrypto} from './crypto_utils';

let htmlResponse =
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SSO Successful</title>
      <link rel="preconnect" href="https://fonts.gstatic.com">
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;1,100;1,300;1,400&display=swap" rel="stylesheet">
      <style>
        *, html {
          font-family: 'Roboto', Arial, Helvetica, sans-serif;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        .main-content {
          background-color: #1A1F75;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .content {
          text-align: center;
          color: white;
        }
      </style>
    </head>
    <body>
      <section class="main-content">
        <div class="content">
          <div style="width: 150px; margin: 5px auto;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 57.69">
              <defs>
                <style>.bb-logo-cls-1{isolation:isolate;}.dark-header .bb-logo-cls-2{fill: #FFFFFF}.bb-logo-cls-2{fill:#ffffff;}.bb-logo-cls-3{fill:#1ad7e5;}.bb-logo-cls-4{fill:#fff;}.bb-logo-cls-5{fill:none;}</style>
              </defs>
              <g id="Layer_1-2" data-name="Layer 1">
                <g id="text4144">
                  <g class="bb-logo-cls-1">
                    <path class="bb-logo-cls-2" d="M70.26,25.18l.09.39a2.67,2.67,0,0,1,.91,2v3.83a2.73,2.73,0,0,1-2.74,2.74H54.84V17.74h13a2.73,2.73,0,0,1,2.74,2.74V24A2.68,2.68,0,0,1,70.26,25.18Zm-2.44-5.59H57.57a.9.9,0,0,0-.89.89V24a.9.9,0,0,0,.89.89H67.82a.82.82,0,0,0,.62-.26.88.88,0,0,0,.25-.63V20.48a.88.88,0,0,0-.25-.63A.82.82,0,0,0,67.82,19.59Zm1.6,11.84V27.59a.9.9,0,0,0-.89-.89H57.57a.9.9,0,0,0-.89.89v3.83a.9.9,0,0,0,.89.89H68.52a.9.9,0,0,0,.89-.89Z"/>
                    <path class="bb-logo-cls-2" d="M75.5,20.93h7.44V22.8H75.5a.9.9,0,0,0-.89.89V34.16H72.74V23.69a2.76,2.76,0,0,1,2.76-2.76Z"/>
                    <path class="bb-logo-cls-2" d="M86.14,20.93h7.94a2.76,2.76,0,0,1,2.78,2.76V31.4a2.76,2.76,0,0,1-2.78,2.76H86.14a2.76,2.76,0,0,1-2.76-2.76V23.69a2.76,2.76,0,0,1,2.76-2.76Zm7.94,1.87H86.14a.9.9,0,0,0-.89.89V31.4a.9.9,0,0,0,.89.89h7.94A.9.9,0,0,0,95,31.4V23.69a.9.9,0,0,0-.89-.89Z"/>
                    <path class="bb-logo-cls-2" d="M118.12,20.93h2l-5,13.23h-1.62l-4.93-10.93-4.68,10.93h-1.64l-5.2-13.23h2l4,9.85,4.27-9.85h2.46l4.54,9.83Z"/>
                    <path class="bb-logo-cls-2" d="M134,23.69v.18h-1.89v-.18a.9.9,0,0,0-.89-.89h-7.94a.9.9,0,0,0-.89.89v2a.9.9,0,0,0,.89.89h7.94A2.76,2.76,0,0,1,134,29.37v2a2.76,2.76,0,0,1-2.78,2.76h-7.94a2.76,2.76,0,0,1-2.76-2.76v-.18h1.87v.18a.9.9,0,0,0,.89.89h7.94a.9.9,0,0,0,.89-.89v-2a.9.9,0,0,0-.89-.89h-7.94a2.76,2.76,0,0,1-2.76-2.76v-2a2.76,2.76,0,0,1,2.76-2.76h7.94A2.76,2.76,0,0,1,134,23.69Z"/>
                    <path class="bb-logo-cls-2" d="M145.72,20.93a2.76,2.76,0,0,1,2.78,2.76v4.79H136.89V31.4a.9.9,0,0,0,.89.89H148.5v1.87H137.78A2.76,2.76,0,0,1,135,31.4V23.69a2.76,2.76,0,0,1,2.76-2.76Zm-8.83,5.68h9.72V23.69a.9.9,0,0,0-.89-.89h-7.94a.9.9,0,0,0-.89.89Z"/>
                    <path class="bb-logo-cls-2" d="M152.56,20.93H160V22.8h-7.44a.9.9,0,0,0-.89.89V34.16H149.8V23.69a2.76,2.76,0,0,1,2.76-2.76Z"/>
                  </g>
                </g>
                <circle class="bb-logo-cls-3" cx="21.84" cy="21.84" r="20.32"/>
                <path class="bb-logo-cls-4" d="M19.54,31.17H16.91a1.45,1.45,0,0,1-1.44-1.44v-6.2a1.45,1.45,0,0,1,1.44-1.44h1l1.73-3H16.91a1.45,1.45,0,0,1-1.44-1.44V14.51h-3V30.84a3.32,3.32,0,0,0,3.32,3.32h2Z"/>
                <path class="bb-logo-cls-4" d="M31,20.24l-.15-.63a4.33,4.33,0,0,0,.48-2V14a4.41,4.41,0,0,0-4.43-4.43H12.48v3H26.88a1.33,1.33,0,0,1,1,.42,1.42,1.42,0,0,1,.41,1v3.7a1.42,1.42,0,0,1-.41,1,1.33,1.33,0,0,1-1,.42H22l-1.73,3H28a1.45,1.45,0,0,1,1.44,1.44v6.2A1.45,1.45,0,0,1,28,31.17H21.84l-1.73,3H28a4.41,4.41,0,0,0,4.43-4.43v-6.2A4.32,4.32,0,0,0,31,20.24Z"/>
                <path class="bb-logo-cls-5" d="M37.1,41.49a.33.33,0,0,0-.49.45L50.34,56.73a.33.33,0,0,0,.49-.45Z"/>
                <path class="bb-logo-cls-5" d="M43.13,21.84A21.28,21.28,0,0,0,6.8,6.8a21.28,21.28,0,1,0,30.1,30.1A21.14,21.14,0,0,0,43.13,21.84Z"/>
                <path class="bb-logo-cls-5" d="M43.13,21.84A21.28,21.28,0,0,0,6.8,6.8a21.28,21.28,0,1,0,30.1,30.1A21.14,21.14,0,0,0,43.13,21.84Z"/>
                <path class="bb-logo-cls-5" d="M37.1,41.49a.33.33,0,0,0-.49.45L50.34,56.73a.33.33,0,0,0,.49-.45Z"/>
                <path class="bb-logo-cls-5" d="M43.13,21.84A21.28,21.28,0,0,0,6.8,6.8a21.28,21.28,0,1,0,30.1,30.1A21.14,21.14,0,0,0,43.13,21.84Z"/>
                <path class="bb-logo-cls-3" d="M55.14,52.92,40.77,37.45a.53.53,0,0,0-.75,0l-.3.28-1.4-1.51a21.82,21.82,0,1,0-3.59,3.3L36.14,41l-.3.28a.53.53,0,0,0,0,.75L50.18,57.52a.53.53,0,0,0,.75,0l4.17-3.87A.53.53,0,0,0,55.14,52.92Zm-33.29-9.8A21.28,21.28,0,0,1,6.8,6.8a21.28,21.28,0,1,1,30.1,30.1A21.14,21.14,0,0,1,21.84,43.13Zm29,13.62a.33.33,0,0,1-.47,0L36.62,41.94a.33.33,0,0,1,.49-.45L50.83,56.28A.33.33,0,0,1,50.81,56.75Z"/>
              </g>
            </svg>
          </div>
          <!-- <div class="img">

            </div> -->
            <h1 class="size-h4" style="text-transform: uppercase; letter-spacing: 2px; margin-bottom: 5px;">Login successfully</h1>
            <p>Close your browser to continue.</p>
        </div>
    </section>
    </body>
    </html>
    `;


// TypeScript typings for `opener` are not correct and do not export it as module
import opener = require('opener');

class ServerEventsEmitter extends EventEmitter {
  static ON_UNABLE_TO_START = 'unable_to_start';
  static ON_AUTHORIZATION_RESPONSE = 'authorization_response';
}

export class NodeBasedHandler extends AuthorizationRequestHandler {
  // the handle to the current authorization request
  authorizationPromise: Promise<AuthorizationRequestResponse|null>|null = null;

  constructor(
      // default to port 8000
      public httpServerPort = 30598,
      utils: QueryStringUtils = new BasicQueryStringUtils(),
      crypto: Crypto = new NodeCrypto()) {
    super(utils, crypto);
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
        const errorDescription = searchParams.get('error_description') || 'Unknown error';
        authorizationError = new AuthorizationError(
            {error: error, error_description: errorDescription, error_uri: errorUri, state: state});
        htmlResponse = htmlResponse.replace(/Login successfully/, `${error.toUpperCase()} - ${errorDescription}`);
      } else {
        authorizationResponse = new AuthorizationResponse({code: code!, state: state!});
      }
      const completeResponse = {
        request,
        response: authorizationResponse,
        error: authorizationError
      } as AuthorizationRequestResponse;
      emitter.emit(ServerEventsEmitter.ON_AUTHORIZATION_RESPONSE, completeResponse);
      response.write(htmlResponse);
      response.end();
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

    let server: Http.Server;
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

  protected completeAuthorizationRequest(): Promise<AuthorizationRequestResponse|null> {
    if (!this.authorizationPromise) {
      return Promise.reject(
          'No pending authorization request. Call performAuthorizationRequest() ?');
    }

    return this.authorizationPromise;
  }
}
