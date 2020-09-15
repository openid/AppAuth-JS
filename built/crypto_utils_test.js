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
    var CODE = new Array(6).join('challenge');
    var EXPECTED_BASE64 = 'MYdqq2Vt_ZLMAWpXXsjGIrlxrCF2e4ZP4SxDf7cm_tg';
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
    it('generateRandom produces different values', function (done) {
        var code1 = crypto.generateRandom(10);
        var code2 = crypto.generateRandom(10);
        Promise.all([code1, code2])
            .then(function (result) {
            expect(result[0]).not.toEqual(result[1]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvX3V0aWxzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY3J5cHRvX3V0aWxzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFFSCwrQ0FBNkM7QUFFN0MsUUFBUSxDQUFDLHFCQUFxQixFQUFFO0lBQzlCLElBQU0sSUFBSSxHQUFHLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM1QyxJQUFNLGVBQWUsR0FBRyw2Q0FBNkMsQ0FBQztJQUN0RSxJQUFNLE1BQU0sR0FBRyxJQUFJLDRCQUFhLEVBQUUsQ0FBQztJQUVuQyxFQUFFLENBQUMsK0NBQStDLEVBQUUsVUFBQyxJQUFZO1FBQy9ELElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkMsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxTQUFTO2FBQ0osSUFBSSxDQUFDLFVBQUEsTUFBTTtZQUNWLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM1Qix3Q0FBd0M7WUFDeEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ1osSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLFVBQUMsSUFBWTtRQUMxRCxJQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN0QixJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO1lBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ1osSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDZDQUE2QyxFQUFFLFVBQUMsSUFBWTtRQUM3RCxJQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLFNBQVM7YUFDSixJQUFJLENBQUMsVUFBQSxNQUFNO1lBQ1YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN4QyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQzthQUNELEtBQUssQ0FBQyxVQUFBLEtBQUs7WUFDVixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDWixJQUFJLEVBQUUsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtEZWZhdWx0Q3J5cHRvfSBmcm9tICcuL2NyeXB0b191dGlscyc7XHJcblxyXG5kZXNjcmliZSgnQ3J5cHRvIFV0aWxzIFRlc3RzLicsICgpID0+IHtcclxuICBjb25zdCBDT0RFID0gbmV3IEFycmF5KDYpLmpvaW4oJ2NoYWxsZW5nZScpO1xyXG4gIGNvbnN0IEVYUEVDVEVEX0JBU0U2NCA9ICdNWWRxcTJWdF9aTE1BV3BYWHNqR0lybHhyQ0YyZTRaUDRTeERmN2NtX3RnJztcclxuICBjb25zdCBjcnlwdG8gPSBuZXcgRGVmYXVsdENyeXB0bygpO1xyXG5cclxuICBpdCgncHJvZHVjZXMgdGhlIHJpZ2h0IGNoYWxsZW5nZSBmb3IgYSB2YWxpZCBjb2RlJywgKGRvbmU6IERvbmVGbikgPT4ge1xyXG4gICAgY29uc3QgY29kZSA9IGNyeXB0by5nZW5lcmF0ZVJhbmRvbSg0Myk7XHJcbiAgICBjb25zdCBjaGFsbGVuZ2UgPSBjcnlwdG8uZGVyaXZlQ2hhbGxlbmdlKGNvZGUpO1xyXG4gICAgY2hhbGxlbmdlXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgIGV4cGVjdChyZXN1bHQpLnRvQmVUcnV0aHkoKTtcclxuICAgICAgICAgIC8vIE5vIGA9PWAgaW4gdGhlIGJhc2U2NCBlbmNvZGVkIHJlc3VsdC5cclxuICAgICAgICAgIGV4cGVjdChyZXN1bHQuaW5kZXhPZignPScpIDwgMCk7XHJcbiAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgZmFpbChlcnJvcik7XHJcbiAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGl0KCdnZW5lcmF0ZVJhbmRvbSBwcm9kdWNlcyBkaWZmZXJlbnQgdmFsdWVzJywgKGRvbmU6IERvbmVGbikgPT4ge1xyXG4gICAgY29uc3QgY29kZTEgPSBjcnlwdG8uZ2VuZXJhdGVSYW5kb20oMTApO1xyXG4gICAgY29uc3QgY29kZTIgPSBjcnlwdG8uZ2VuZXJhdGVSYW5kb20oMTApO1xyXG4gICAgUHJvbWlzZS5hbGwoW2NvZGUxLCBjb2RlMl0pXHJcbiAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHtcclxuICAgICAgICAgIGV4cGVjdChyZXN1bHRbMF0pLm5vdC50b0VxdWFsKHJlc3VsdFsxXSk7XHJcbiAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgZmFpbChlcnJvcik7XHJcbiAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGl0KCdwcm9kdWNlcyB0aGUgcmlnaHQgYmFzZTY0IGVuY29kZWQgY2hhbGxlbmdlJywgKGRvbmU6IERvbmVGbikgPT4ge1xyXG4gICAgY29uc3QgY2hhbGxlbmdlID0gY3J5cHRvLmRlcml2ZUNoYWxsZW5nZShDT0RFKTtcclxuICAgIGNoYWxsZW5nZVxyXG4gICAgICAgIC50aGVuKHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICBleHBlY3QocmVzdWx0KS50b0VxdWFsKEVYUEVDVEVEX0JBU0U2NCk7XHJcbiAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xyXG4gICAgICAgICAgZmFpbChlcnJvcik7XHJcbiAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgfSk7XHJcbn0pO1xyXG4iXX0=