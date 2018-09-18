"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_utils_1 = require("./crypto_utils");
describe('Crypto Utils Tests.', function () {
    var CODE = new Array(5).join('challenge');
    var EXPECTED_BASE64 = '1u8ZrKrpPII7DIos9KyTQdCZPt8nfzRod5xTCu88Lmk';
    var crypto = new crypto_utils_1.DefaultCrypto();
    it('produces the right challenge for a valid code', function (done) {
        var code = crypto.generateRandom(43);
        var challenge = crypto.deriveChallenge(code);
        challenge
            .then(function (result) {
            expect(result).toBeTruthy();
            // No `==` in the base64 encoded result.
            expect(result.indexOf('=') < 0);
            done();
        })
            .catch(function (error) {
            fail(error);
            done();
        });
    });
    it('produces the right base64 encoded challenge', function (done) {
        var challenge = crypto.deriveChallenge(CODE);
        challenge
            .then(function (result) {
            expect(result).toEqual(EXPECTED_BASE64);
            done();
        })
            .catch(function (error) {
            fail(error);
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvX3V0aWxzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY3J5cHRvX3V0aWxzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFFSCwrQ0FBNkM7QUFFN0MsUUFBUSxDQUFDLHFCQUFxQixFQUFFO0lBQzlCLElBQU0sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1QyxJQUFNLGVBQWUsR0FBRyw2Q0FBNkMsQ0FBQztJQUN0RSxJQUFNLE1BQU0sR0FBRyxJQUFJLDRCQUFhLEVBQUUsQ0FBQztJQUVuQyxFQUFFLENBQUMsK0NBQStDLEVBQUUsVUFBQyxJQUFZO1FBQy9ELElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkMsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxTQUFTO2FBQ0osSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM1Qix3Q0FBd0M7WUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ1osSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLFVBQUMsSUFBWTtRQUM3RCxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLFNBQVM7YUFDSixJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN4QyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDWixJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0RlZmF1bHRDcnlwdG99IGZyb20gJy4vY3J5cHRvX3V0aWxzJztcblxuZGVzY3JpYmUoJ0NyeXB0byBVdGlscyBUZXN0cy4nLCAoKSA9PiB7XG4gIGNvbnN0IENPREUgPSBuZXcgQXJyYXkoNSkuam9pbignY2hhbGxlbmdlJyk7XG4gIGNvbnN0IEVYUEVDVEVEX0JBU0U2NCA9ICcxdThacktycFBJSTdESW9zOUt5VFFkQ1pQdDhuZnpSb2Q1eFRDdTg4TG1rJztcbiAgY29uc3QgY3J5cHRvID0gbmV3IERlZmF1bHRDcnlwdG8oKTtcblxuICBpdCgncHJvZHVjZXMgdGhlIHJpZ2h0IGNoYWxsZW5nZSBmb3IgYSB2YWxpZCBjb2RlJywgKGRvbmU6IERvbmVGbikgPT4ge1xuICAgIGNvbnN0IGNvZGUgPSBjcnlwdG8uZ2VuZXJhdGVSYW5kb20oNDMpO1xuICAgIGNvbnN0IGNoYWxsZW5nZSA9IGNyeXB0by5kZXJpdmVDaGFsbGVuZ2UoY29kZSk7XG4gICAgY2hhbGxlbmdlXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICAgICAgZXhwZWN0KHJlc3VsdCkudG9CZVRydXRoeSgpO1xuICAgICAgICAgIC8vIE5vIGA9PWAgaW4gdGhlIGJhc2U2NCBlbmNvZGVkIHJlc3VsdC5cbiAgICAgICAgICBleHBlY3QocmVzdWx0LmluZGV4T2YoJz0nKSA8IDApO1xuICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBmYWlsKGVycm9yKTtcbiAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pO1xuICB9KTtcblxuICBpdCgncHJvZHVjZXMgdGhlIHJpZ2h0IGJhc2U2NCBlbmNvZGVkIGNoYWxsZW5nZScsIChkb25lOiBEb25lRm4pID0+IHtcbiAgICBjb25zdCBjaGFsbGVuZ2UgPSBjcnlwdG8uZGVyaXZlQ2hhbGxlbmdlKENPREUpO1xuICAgIGNoYWxsZW5nZVxuICAgICAgICAudGhlbihyZXN1bHQgPT4ge1xuICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvRXF1YWwoRVhQRUNURURfQkFTRTY0KTtcbiAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgZmFpbChlcnJvcik7XG4gICAgICAgICAgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==