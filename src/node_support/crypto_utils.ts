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
import { bufferToString, Crypto, urlSafe } from '../crypto_utils';

export class NodeCrypto implements Crypto {
  generateRandom(size: number): string {
    const bytes = crypto.randomBytes(size);
    return bufferToString(new Uint8Array(bytes.buffer));
  }

  deriveChallenge(code: string): Promise<string> {
    const hash = crypto.createHash('sha256').update(code).digest();
    return Promise.resolve(urlSafe(new Uint8Array(hash.buffer)));
  }
}
