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

import {AppAuthError} from '../errors';
import * as request from 'request';
import {Requestor} from '../xhr';
import { log } from '../logger';

/**
 * A Node.js HTTP client.
 */
export class NodeRequestor extends Requestor {
  xhr<T>(settings: JQueryAjaxSettings): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      // implementing a subset that is required.
      request(
          settings.url!, {
            method: settings.method,
            json: settings.dataType === 'json' ? true : undefined,
            form: settings.data,
            headers: settings.headers
          },
          (error, response, body) => {
            if (response.statusCode !== 200) {
              log('Request ended with an error ', response.statusCode, body);
              reject(new AppAuthError(response.statusMessage!));
            } else {
              resolve(body as T);
            }
          });
    });
  }
}
