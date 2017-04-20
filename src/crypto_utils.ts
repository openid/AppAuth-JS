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

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const DEFAULT_SIZE = 1; /** size in bytes */
const HAS_CRYPTO = typeof window !== 'undefined' && !!(window.crypto as any);
const IS_NODE = typeof process === 'object';

export function generateRandom(sizeInBytes: number = DEFAULT_SIZE) {
  let buffer: Uint8Array = new Uint8Array(sizeInBytes);
  if (HAS_CRYPTO) {
    window.crypto.getRandomValues(buffer);
  } else if (IS_NODE) {
    // warning: implicit any
    let crypto = require('crypto');
    let bytes = crypto.randomBytes(sizeInBytes);
    // copy
    for (let i = 0; i < bytes.length; i += 1) {
      buffer[i] = bytes[i];
    }
  } else {
    // fall back to Math.random() if nothing else is available
    for (let i = 0; i < sizeInBytes; i += 1) {
      buffer[i] = Math.random();
    }
  }
  let state = [];
  for (let i = 0; i < sizeInBytes; i += 1) {
    let index = (buffer[i] % CHARSET.length) | 0;
    state.push(CHARSET[index]);
  }
  return state.join('');
}
