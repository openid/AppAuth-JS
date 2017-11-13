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

import * as crypto from 'crypto';
import { RandomGenerator, bufferToString } from '../crypto_utils';

const DEFAULT_SIZE = 1; /** size in bytes */

export const nodeGenerateRandom: RandomGenerator = (sizeInBytes = DEFAULT_SIZE) => {
  const buffer = new Uint8Array(sizeInBytes);
  const bytes = crypto.randomBytes(sizeInBytes);
  // copy
  for (let i = 0; i < bytes.length; i += 1) {
    buffer[i] = bytes[i];
  }
  return bufferToString(buffer);
};
