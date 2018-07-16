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

import * as Buffer from 'buffer';
import {ServerResponse} from 'http';
import * as Url from 'url';

import {AppAuthError} from '../errors';
import {log} from '../logger';
import {Requestor} from '../xhr';

const https = require('follow-redirects').https;
const http = require('follow-redirects').http;

/**
 * A Node.js HTTP client.
 */
export class NodeRequestor extends Requestor {
  xhr<T>(settings: JQueryAjaxSettings): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // implementing a subset that is required.
      const url = Url.parse(settings.url!);
      const data = settings.data;

      const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.path,
        method: settings.method,
        headers: settings.headers || {}
      };

      if (data) {
        options.headers['Content-Length'] = String(data.toString().length);
      }

      let protocol = https;
      if (url.protocol && url.protocol.toLowerCase() === 'http:') {
        protocol = http;
      }

      const request = protocol.request(options, (response: ServerResponse) => {
        if (response.statusCode !== 200) {
          log('Request ended with an error ', response.statusCode);
          reject(new AppAuthError(response.statusMessage!));
        }

        const chunks: string[] = [];
        response.on('data', (chunk: Buffer) => {
          chunks.push(chunk.toString());
        });

        response.on('end', () => {
          const body = chunks.join('');
          if (settings.dataType === 'json') {
            try {
              resolve((JSON.parse(body) as any) as T);
            } catch (err) {
              log('Could not parse json response', body);
            }
          } else {
            resolve((body as any) as T);
          }
        });
      });

      request.on('error', (e: Error) => {
        reject(new AppAuthError(e.toString()));
      });

      if (data) {
        request.write(data);
      }
      request.end();
    });
  }
}
