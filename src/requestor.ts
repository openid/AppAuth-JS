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
import {StringMap} from './types';

export interface RequestorBaseSettings {
  /** URL to request */
  url: string;
  /** HTTP method, as uppercase string */
  method: string;
  /** Expected response data type. Currently, requestors only need to handle JSON responses. */
  dataType: 'json';
  /** Any custom headers or header overrides on the request */
  headers?: StringMap;
}

export interface RequestorGetSettings extends RequestorBaseSettings { method: 'GET'; }

export interface RequestorPostSettings extends RequestorBaseSettings {
  method: 'POST';
  /**
   * data to send on request as URL-encoded form data. If an object, will be treated as
   * key=value form data.
   */
  data: StringMap;
}

export type RequestorSettings = RequestorGetSettings|RequestorPostSettings;

/**
 * An class that abstracts away the ability to make an XMLHttpRequest.
 */
export abstract class Requestor { abstract xhr<T>(settings: RequestorSettings): Promise<T>; }
