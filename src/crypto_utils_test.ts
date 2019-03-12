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

import {DefaultCrypto} from './crypto_utils';

describe('Crypto Utils Tests.', () => {
  const CODE = new Array(6).join('challenge');
  const EXPECTED_BASE64 = 'MYdqq2Vt_ZLMAWpXXsjGIrlxrCF2e4ZP4SxDf7cm_tg';
  const crypto = new DefaultCrypto();

  it('produces the right challenge for a valid code', (done: DoneFn) => {
    const code = crypto.generateRandom(43);
    const challenge = crypto.deriveChallenge(code);
    challenge
        .then(result => {
          expect(result).toBeTruthy();
          // No `==` in the base64 encoded result.
          expect(result.indexOf('=') < 0);
          done();
        })
        .catch(error => {
          fail(error);
          done();
        });
  });

  it('generateRandom produces different values', (done: DoneFn) => {
    const code1 = crypto.generateRandom(10);
    const code2 = crypto.generateRandom(10);
    Promise.all([code1, code2])
        .then(result => {
          expect(result[0]).not.toEqual(result[1]);
          done();
        })
        .catch(error => {
          fail(error);
          done();
        });
  });

  it('produces the right base64 encoded challenge', (done: DoneFn) => {
    const challenge = crypto.deriveChallenge(CODE);
    challenge
        .then(result => {
          expect(result).toEqual(EXPECTED_BASE64);
          done();
        })
        .catch(error => {
          fail(error);
          done();
        });
  });
});
