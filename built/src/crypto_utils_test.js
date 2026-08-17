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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DefaultCrypto } from './crypto_utils';
describe('Crypto Utils Tests.', () => {
    const CODE = new Array(6).join('challenge');
    const EXPECTED_BASE64 = 'MYdqq2Vt_ZLMAWpXXsjGIrlxrCF2e4ZP4SxDf7cm_tg';
    const crypto = new DefaultCrypto();
    it('produces the right challenge for a valid code', () => __awaiter(void 0, void 0, void 0, function* () {
        const code = crypto.generateRandom(43);
        const result = yield crypto.deriveChallenge(code);
        expect(result).toBeTruthy();
        // No `==` in the base64 encoded result.
        expect(result.indexOf('=') < 0);
    }));
    it('generateRandom produces different values', () => __awaiter(void 0, void 0, void 0, function* () {
        const code1 = crypto.generateRandom(10);
        const code2 = crypto.generateRandom(10);
        const result = yield Promise.all([code1, code2]);
        expect(result[0]).not.toEqual(result[1]);
    }));
    it('produces the right base64 encoded challenge', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield crypto.deriveChallenge(CODE);
        expect(result).toEqual(EXPECTED_BASE64);
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvX3V0aWxzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY3J5cHRvX3V0aWxzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7Ozs7Ozs7O0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sZUFBZSxHQUFHLDZDQUE2QyxDQUFDO0lBQ3RFLE1BQU0sTUFBTSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7SUFFbkMsRUFBRSxDQUFDLCtDQUErQyxFQUFFLEdBQVMsRUFBRTtRQUM3RCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUIsd0NBQXdDO1FBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMENBQTBDLEVBQUUsR0FBUyxFQUFFO1FBQ3hELE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN4QyxNQUFNLE1BQU0sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUNoRCxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLEdBQVMsRUFBRTtRQUMzRCxNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtEZWZhdWx0Q3J5cHRvfSBmcm9tICcuL2NyeXB0b191dGlscyc7XG5cbmRlc2NyaWJlKCdDcnlwdG8gVXRpbHMgVGVzdHMuJywgKCkgPT4ge1xuICBjb25zdCBDT0RFID0gbmV3IEFycmF5KDYpLmpvaW4oJ2NoYWxsZW5nZScpO1xuICBjb25zdCBFWFBFQ1RFRF9CQVNFNjQgPSAnTVlkcXEyVnRfWkxNQVdwWFhzakdJcmx4ckNGMmU0WlA0U3hEZjdjbV90Zyc7XG4gIGNvbnN0IGNyeXB0byA9IG5ldyBEZWZhdWx0Q3J5cHRvKCk7XG5cbiAgaXQoJ3Byb2R1Y2VzIHRoZSByaWdodCBjaGFsbGVuZ2UgZm9yIGEgdmFsaWQgY29kZScsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjb2RlID0gY3J5cHRvLmdlbmVyYXRlUmFuZG9tKDQzKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjcnlwdG8uZGVyaXZlQ2hhbGxlbmdlKGNvZGUpO1xuICAgIGV4cGVjdChyZXN1bHQpLnRvQmVUcnV0aHkoKTtcbiAgICAvLyBObyBgPT1gIGluIHRoZSBiYXNlNjQgZW5jb2RlZCByZXN1bHQuXG4gICAgZXhwZWN0KHJlc3VsdC5pbmRleE9mKCc9JykgPCAwKTtcbiAgfSk7XG5cbiAgaXQoJ2dlbmVyYXRlUmFuZG9tIHByb2R1Y2VzIGRpZmZlcmVudCB2YWx1ZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY29kZTEgPSBjcnlwdG8uZ2VuZXJhdGVSYW5kb20oMTApO1xuICAgIGNvbnN0IGNvZGUyID0gY3J5cHRvLmdlbmVyYXRlUmFuZG9tKDEwKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBQcm9taXNlLmFsbChbY29kZTEsIGNvZGUyXSlcbiAgICBleHBlY3QocmVzdWx0WzBdKS5ub3QudG9FcXVhbChyZXN1bHRbMV0pO1xuICB9KTtcblxuICBpdCgncHJvZHVjZXMgdGhlIHJpZ2h0IGJhc2U2NCBlbmNvZGVkIGNoYWxsZW5nZScsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjcnlwdG8uZGVyaXZlQ2hhbGxlbmdlKENPREUpO1xuICAgIGV4cGVjdChyZXN1bHQpLnRvRXF1YWwoRVhQRUNURURfQkFTRTY0KTtcbiAgfSk7XG59KTtcbiJdfQ==