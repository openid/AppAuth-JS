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
                buffer[i] = Math.random();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyeXB0b191dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILGtDQUFvQztBQUVwQyxtQ0FBc0M7QUFFdEMsSUFBTSxVQUFVLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBRSxNQUFNLENBQUMsTUFBYyxDQUFDO0FBQzdFLElBQU0saUJBQWlCLEdBQUcsVUFBVSxJQUFJLENBQUMsQ0FBRSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQWMsQ0FBQztBQUN4RSxJQUFNLE9BQU8sR0FBRyxnRUFBZ0UsQ0FBQztBQUVqRixTQUFnQixjQUFjLENBQUMsTUFBa0I7SUFDL0MsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUM3QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0tBQzVCO0lBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFQRCx3Q0FPQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxNQUFrQjtJQUN4QyxJQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDN0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDM0UsQ0FBQztBQUhELDBCQUdDO0FBRUQsMkRBQTJEO0FBQzNELDREQUE0RDtBQUM1RCwwREFBMEQ7QUFDMUQsU0FBZ0IsY0FBYyxDQUFDLEdBQVc7SUFDeEMsSUFBTSxHQUFHLEdBQUcsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLElBQU0sT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXBDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2hDO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQVJELHdDQVFDO0FBY0Q7OztHQUdHO0FBQ0g7SUFBQTtJQTRCQSxDQUFDO0lBM0JDLHNDQUFjLEdBQWQsVUFBZSxJQUFZO1FBQ3pCLElBQU0sTUFBTSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BDLElBQUksVUFBVSxFQUFFO1lBQ2QsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkM7YUFBTTtZQUNMLDBEQUEwRDtZQUMxRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2hDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDM0I7U0FDRjtRQUNELE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx1Q0FBZSxHQUFmLFVBQWdCLElBQVk7UUFDMUIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRTtZQUN6QyxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBWSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztTQUNqRTtRQUNELElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN0QixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBWSxDQUFDLHNDQUFzQyxDQUFDLENBQUMsQ0FBQztTQUNqRjtRQUVELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtZQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsTUFBTTtnQkFDL0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxDQUFDLEVBQUUsVUFBQSxLQUFLLElBQUksT0FBQSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQWIsQ0FBYSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBNUJELElBNEJDO0FBNUJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCAqIGFzIGJhc2U2NCBmcm9tICdiYXNlNjQtanMnO1xuXG5pbXBvcnQge0FwcEF1dGhFcnJvcn0gZnJvbSAnLi9lcnJvcnMnO1xuXG5jb25zdCBIQVNfQ1JZUFRPID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgISEod2luZG93LmNyeXB0byBhcyBhbnkpO1xuY29uc3QgSEFTX1NVQlRMRV9DUllQVE8gPSBIQVNfQ1JZUFRPICYmICEhKHdpbmRvdy5jcnlwdG8uc3VidGxlIGFzIGFueSk7XG5jb25zdCBDSEFSU0VUID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5JztcblxuZXhwb3J0IGZ1bmN0aW9uIGJ1ZmZlclRvU3RyaW5nKGJ1ZmZlcjogVWludDhBcnJheSkge1xuICBsZXQgc3RhdGUgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWZmZXIuYnl0ZUxlbmd0aDsgaSArPSAxKSB7XG4gICAgbGV0IGluZGV4ID0gYnVmZmVyW2ldICUgQ0hBUlNFVC5sZW5ndGg7XG4gICAgc3RhdGUucHVzaChDSEFSU0VUW2luZGV4XSk7XG4gIH1cbiAgcmV0dXJuIHN0YXRlLmpvaW4oJycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXJsU2FmZShidWZmZXI6IFVpbnQ4QXJyYXkpOiBzdHJpbmcge1xuICBjb25zdCBlbmNvZGVkID0gYmFzZTY0LmZyb21CeXRlQXJyYXkobmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSk7XG4gIHJldHVybiBlbmNvZGVkLnJlcGxhY2UoL1xcKy9nLCAnLScpLnJlcGxhY2UoL1xcLy9nLCAnXycpLnJlcGxhY2UoLz0vZywgJycpO1xufVxuXG4vLyBhZGFwdGVkIGZyb20gc291cmNlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMTA1ODg1OFxuLy8gdGhpcyBpcyB1c2VkIGluIHBsYWNlIG9mIFRleHRFbmNvZGUgYXMgdGhlIGFwaSBpcyBub3QgeWV0XG4vLyB3ZWxsIHN1cHBvcnRlZDogaHR0cHM6Ly9jYW5pdXNlLmNvbS8jc2VhcmNoPVRleHRFbmNvZGVyXG5leHBvcnQgZnVuY3Rpb24gdGV4dEVuY29kZUxpdGUoc3RyOiBzdHJpbmcpIHtcbiAgY29uc3QgYnVmID0gbmV3IEFycmF5QnVmZmVyKHN0ci5sZW5ndGgpO1xuICBjb25zdCBidWZWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIGJ1ZlZpZXdbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgfVxuICByZXR1cm4gYnVmVmlldztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDcnlwdG8ge1xuICAvKipcbiAgICogR2VuZXJhdGUgYSByYW5kb20gc3RyaW5nXG4gICAqL1xuICBnZW5lcmF0ZVJhbmRvbShzaXplOiBudW1iZXIpOiBzdHJpbmc7XG4gIC8qKlxuICAgKiBDb21wdXRlIHRoZSBTSEEyNTYgb2YgYSBnaXZlbiBjb2RlLlxuICAgKiBUaGlzIGlzIHVzZWZ1bCB3aGVuIHVzaW5nIFBLQ0UuXG4gICAqL1xuICBkZXJpdmVDaGFsbGVuZ2UoY29kZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+O1xufVxuXG4vKipcbiAqIFRoZSBkZWZhdWx0IGltcGxlbWVudGF0aW9uIG9mIHRoZSBgQ3J5cHRvYCBpbnRlcmZhY2UuXG4gKiBUaGlzIHVzZXMgdGhlIGNhcGFiaWxpdGllcyBvZiB0aGUgYnJvd3Nlci5cbiAqL1xuZXhwb3J0IGNsYXNzIERlZmF1bHRDcnlwdG8gaW1wbGVtZW50cyBDcnlwdG8ge1xuICBnZW5lcmF0ZVJhbmRvbShzaXplOiBudW1iZXIpIHtcbiAgICBjb25zdCBidWZmZXIgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICBpZiAoSEFTX0NSWVBUTykge1xuICAgICAgd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoYnVmZmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZmFsbCBiYWNrIHRvIE1hdGgucmFuZG9tKCkgaWYgbm90aGluZyBlbHNlIGlzIGF2YWlsYWJsZVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICAgICAgYnVmZmVyW2ldID0gTWF0aC5yYW5kb20oKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlclRvU3RyaW5nKGJ1ZmZlcik7XG4gIH1cblxuICBkZXJpdmVDaGFsbGVuZ2UoY29kZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBpZiAoY29kZS5sZW5ndGggPCA0MyB8fCBjb2RlLmxlbmd0aCA+IDEyOCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IoJ0ludmFsaWQgY29kZSBsZW5ndGguJykpO1xuICAgIH1cbiAgICBpZiAoIUhBU19TVUJUTEVfQ1JZUFRPKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEFwcEF1dGhFcnJvcignd2luZG93LmNyeXB0by5zdWJ0bGUgaXMgdW5hdmFpbGFibGUuJykpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjcnlwdG8uc3VidGxlLmRpZ2VzdCgnU0hBLTI1NicsIHRleHRFbmNvZGVMaXRlKGNvZGUpKS50aGVuKGJ1ZmZlciA9PiB7XG4gICAgICAgIHJldHVybiByZXNvbHZlKHVybFNhZmUobmV3IFVpbnQ4QXJyYXkoYnVmZmVyKSkpO1xuICAgICAgfSwgZXJyb3IgPT4gcmVqZWN0KGVycm9yKSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==