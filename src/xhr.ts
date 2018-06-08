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

import {AppAuthError} from './errors';

/**
 * An class that abstracts away the ability to make an XMLHttpRequest.
 */
export abstract class Requestor {
  abstract xhr<T>(settings: JQueryAjaxSettings): Promise<T>;
}

/**
 * Uses $.ajax to makes the Ajax requests.
 */
export class JQueryRequestor extends Requestor {
  xhr<T>(settings: JQueryAjaxSettings): Promise<T> {
    // NOTE: using jquery to make XHR's as whatwg-fetch requires
    // that I target ES6.
    const xhr = $.ajax(settings);
    return new Promise<T>((resolve, reject) => {
      xhr.then(
          (data, textStatus, jqXhr) => {
            resolve(data as T);
          },
          (jqXhr, textStatus, error) => {
            reject(new AppAuthError(error));
          });
    });
  }
}

/**
 * Should be used only in the context of testing. Just uses the underlying
 * Promise to mock the behavior of the Requestor.
 */
export class TestRequestor extends Requestor {
  constructor(public promise: Promise<any>) {
    super();
  }
  xhr<T>(settings: JQueryAjaxSettings): Promise<T> {
    return this.promise;  // unsafe cast
  }
}
