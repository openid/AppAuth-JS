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
exports.DefaultCrypto = exports.textEncodeLite = exports.urlSafe = exports.bufferToString = void 0;
var base64 = require("base64-js");
var errors_1 = require("./errors");
var HAS_CRYPTO = typeof window !== 'undefined' && !!window.crypto;
var HAS_SUBTLE_CRYPTO = HAS_CRYPTO && !!window.crypto.subtle;
var CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function bufferToString(buffer) {
    var state = [];
    for (var i = 0; i < buffer.byteLength; i += 1) {
        var index = buffer[i] % CHARSET.length;
        state.push(CHARSET[index]);
    }
    return state.join('');
}
exports.bufferToString = bufferToString;
function urlSafe(buffer) {
    var encoded = base64.fromByteArray(new Uint8Array(buffer));
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
exports.urlSafe = urlSafe;
// adapted from source: http://stackoverflow.com/a/11058858
// this is used in place of TextEncode as the api is not yet
// well supported: https://caniuse.com/#search=TextEncoder
function textEncodeLite(str) {
    var buf = new ArrayBuffer(str.length);
    var bufView = new Uint8Array(buf);
    for (var i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return bufView;
}
exports.textEncodeLite = textEncodeLite;
/**
 * The default implementation of the `Crypto` interface.
 * This uses the capabilities of the browser.
 */
var DefaultCrypto = /** @class */ (function () {
    function DefaultCrypto() {
    }
    DefaultCrypto.prototype.generateRandom = function (size) {
        var buffer = new Uint8Array(size);
        if (HAS_CRYPTO) {
            window.crypto.getRandomValues(buffer);
        }
        else {
            // fall back to Math.random() if nothing else is available
            for (var i = 0; i < size; i += 1) {
                buffer[i] = (Math.random() * CHARSET.length) | 0;
            }
        }
        return bufferToString(buffer);
    };
    DefaultCrypto.prototype.deriveChallenge = function (code) {
        if (code.length < 43 || code.length > 128) {
            return Promise.reject(new errors_1.AppAuthError('Invalid code length.'));
        }
        if (!HAS_SUBTLE_CRYPTO) {
            return Promise.reject(new errors_1.AppAuthError('window.crypto.subtle is unavailable.'));
        }
        return new Promise(function (resolve, reject) {
            crypto.subtle.digest('SHA-256', textEncodeLite(code)).then(function (buffer) {
                return resolve(urlSafe(new Uint8Array(buffer)));
            }, function (error) { return reject(error); });
        });
    };
    return DefaultCrypto;
}());
exports.DefaultCrypto = DefaultCrypto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyeXB0b191dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7QUFFSCxrQ0FBb0M7QUFFcEMsbUNBQXNDO0FBRXRDLElBQU0sVUFBVSxHQUFHLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxDQUFDLENBQUUsTUFBTSxDQUFDLE1BQWMsQ0FBQztBQUM3RSxJQUFNLGlCQUFpQixHQUFHLFVBQVUsSUFBSSxDQUFDLENBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFjLENBQUM7QUFDeEUsSUFBTSxPQUFPLEdBQUcsZ0VBQWdFLENBQUM7QUFFakYsU0FBZ0IsY0FBYyxDQUFDLE1BQWtCO0lBQy9DLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDN0MsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztLQUM1QjtJQUNELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBUEQsd0NBT0M7QUFFRCxTQUFnQixPQUFPLENBQUMsTUFBa0I7SUFDeEMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzNFLENBQUM7QUFIRCwwQkFHQztBQUVELDJEQUEyRDtBQUMzRCw0REFBNEQ7QUFDNUQsMERBQTBEO0FBQzFELFNBQWdCLGNBQWMsQ0FBQyxHQUFXO0lBQ3hDLElBQU0sR0FBRyxHQUFHLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxJQUFNLE9BQU8sR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVwQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNuQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNoQztJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFSRCx3Q0FRQztBQWNEOzs7R0FHRztBQUNIO0lBQUE7SUE0QkEsQ0FBQztJQTNCQyxzQ0FBYyxHQUFkLFVBQWUsSUFBWTtRQUN6QixJQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxJQUFJLFVBQVUsRUFBRTtZQUNkLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3ZDO2FBQU07WUFDTCwwREFBMEQ7WUFDMUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNoQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsRDtTQUNGO1FBQ0QsT0FBTyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELHVDQUFlLEdBQWYsVUFBZ0IsSUFBWTtRQUMxQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBQ3pDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLHFCQUFZLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3RCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLHFCQUFZLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxDQUFDO1NBQ2pGO1FBRUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO1lBQ2pDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNO2dCQUMvRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELENBQUMsRUFBRSxVQUFBLEtBQUssSUFBSSxPQUFBLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBYixDQUFhLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUE1QkQsSUE0QkM7QUE1Qlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxyXG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcclxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCAqIGFzIGJhc2U2NCBmcm9tICdiYXNlNjQtanMnO1xyXG5cclxuaW1wb3J0IHtBcHBBdXRoRXJyb3J9IGZyb20gJy4vZXJyb3JzJztcclxuXHJcbmNvbnN0IEhBU19DUllQVE8gPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAhISh3aW5kb3cuY3J5cHRvIGFzIGFueSk7XHJcbmNvbnN0IEhBU19TVUJUTEVfQ1JZUFRPID0gSEFTX0NSWVBUTyAmJiAhISh3aW5kb3cuY3J5cHRvLnN1YnRsZSBhcyBhbnkpO1xyXG5jb25zdCBDSEFSU0VUID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBidWZmZXJUb1N0cmluZyhidWZmZXI6IFVpbnQ4QXJyYXkpIHtcclxuICBsZXQgc3RhdGUgPSBbXTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlci5ieXRlTGVuZ3RoOyBpICs9IDEpIHtcclxuICAgIGxldCBpbmRleCA9IGJ1ZmZlcltpXSAlIENIQVJTRVQubGVuZ3RoO1xyXG4gICAgc3RhdGUucHVzaChDSEFSU0VUW2luZGV4XSk7XHJcbiAgfVxyXG4gIHJldHVybiBzdGF0ZS5qb2luKCcnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHVybFNhZmUoYnVmZmVyOiBVaW50OEFycmF5KTogc3RyaW5nIHtcclxuICBjb25zdCBlbmNvZGVkID0gYmFzZTY0LmZyb21CeXRlQXJyYXkobmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSk7XHJcbiAgcmV0dXJuIGVuY29kZWQucmVwbGFjZSgvXFwrL2csICctJykucmVwbGFjZSgvXFwvL2csICdfJykucmVwbGFjZSgvPS9nLCAnJyk7XHJcbn1cclxuXHJcbi8vIGFkYXB0ZWQgZnJvbSBzb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzExMDU4ODU4XHJcbi8vIHRoaXMgaXMgdXNlZCBpbiBwbGFjZSBvZiBUZXh0RW5jb2RlIGFzIHRoZSBhcGkgaXMgbm90IHlldFxyXG4vLyB3ZWxsIHN1cHBvcnRlZDogaHR0cHM6Ly9jYW5pdXNlLmNvbS8jc2VhcmNoPVRleHRFbmNvZGVyXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZXh0RW5jb2RlTGl0ZShzdHI6IHN0cmluZykge1xyXG4gIGNvbnN0IGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihzdHIubGVuZ3RoKTtcclxuICBjb25zdCBidWZWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcclxuICAgIGJ1ZlZpZXdbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcclxuICB9XHJcbiAgcmV0dXJuIGJ1ZlZpZXc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ3J5cHRvIHtcclxuICAvKipcclxuICAgKiBHZW5lcmF0ZSBhIHJhbmRvbSBzdHJpbmdcclxuICAgKi9cclxuICBnZW5lcmF0ZVJhbmRvbShzaXplOiBudW1iZXIpOiBzdHJpbmc7XHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZSB0aGUgU0hBMjU2IG9mIGEgZ2l2ZW4gY29kZS5cclxuICAgKiBUaGlzIGlzIHVzZWZ1bCB3aGVuIHVzaW5nIFBLQ0UuXHJcbiAgICovXHJcbiAgZGVyaXZlQ2hhbGxlbmdlKGNvZGU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBgQ3J5cHRvYCBpbnRlcmZhY2UuXHJcbiAqIFRoaXMgdXNlcyB0aGUgY2FwYWJpbGl0aWVzIG9mIHRoZSBicm93c2VyLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIERlZmF1bHRDcnlwdG8gaW1wbGVtZW50cyBDcnlwdG8ge1xyXG4gIGdlbmVyYXRlUmFuZG9tKHNpemU6IG51bWJlcikge1xyXG4gICAgY29uc3QgYnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XHJcbiAgICBpZiAoSEFTX0NSWVBUTykge1xyXG4gICAgICB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhidWZmZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gZmFsbCBiYWNrIHRvIE1hdGgucmFuZG9tKCkgaWYgbm90aGluZyBlbHNlIGlzIGF2YWlsYWJsZVxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xyXG4gICAgICAgIGJ1ZmZlcltpXSA9IChNYXRoLnJhbmRvbSgpICogQ0hBUlNFVC5sZW5ndGgpIHwgMDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGJ1ZmZlclRvU3RyaW5nKGJ1ZmZlcik7XHJcbiAgfVxyXG5cclxuICBkZXJpdmVDaGFsbGVuZ2UoY29kZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgIGlmIChjb2RlLmxlbmd0aCA8IDQzIHx8IGNvZGUubGVuZ3RoID4gMTI4KSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgQXBwQXV0aEVycm9yKCdJbnZhbGlkIGNvZGUgbGVuZ3RoLicpKTtcclxuICAgIH1cclxuICAgIGlmICghSEFTX1NVQlRMRV9DUllQVE8pIHtcclxuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IoJ3dpbmRvdy5jcnlwdG8uc3VidGxlIGlzIHVuYXZhaWxhYmxlLicpKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBjcnlwdG8uc3VidGxlLmRpZ2VzdCgnU0hBLTI1NicsIHRleHRFbmNvZGVMaXRlKGNvZGUpKS50aGVuKGJ1ZmZlciA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHJlc29sdmUodXJsU2FmZShuZXcgVWludDhBcnJheShidWZmZXIpKSk7XHJcbiAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==