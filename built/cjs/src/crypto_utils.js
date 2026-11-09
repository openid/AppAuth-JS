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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultCrypto = void 0;
exports.bufferToString = bufferToString;
exports.urlSafe = urlSafe;
exports.textEncodeLite = textEncodeLite;
const base64 = __importStar(require("base64-js"));
const errors_ts_1 = require("./errors.js");
const HAS_CRYPTO = typeof window !== 'undefined' && !!window.crypto;
const HAS_SUBTLE_CRYPTO = HAS_CRYPTO && !!window.crypto.subtle;
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function bufferToString(buffer) {
    let state = [];
    for (let i = 0; i < buffer.byteLength; i += 1) {
        let index = buffer[i] % CHARSET.length;
        state.push(CHARSET[index]);
    }
    return state.join('');
}
function urlSafe(buffer) {
    const encoded = base64.fromByteArray(new Uint8Array(buffer));
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
// adapted from source: http://stackoverflow.com/a/11058858
// this is used in place of TextEncode as the api is not yet
// well supported: https://caniuse.com/#search=TextEncoder
function textEncodeLite(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0; i < str.length; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return bufView;
}
/**
 * The default implementation of the `Crypto` interface.
 * This uses the capabilities of the browser.
 */
class DefaultCrypto {
    generateRandom(size) {
        const buffer = new Uint8Array(size);
        if (HAS_CRYPTO) {
            window.crypto.getRandomValues(buffer);
        }
        else {
            // fall back to Math.random() if nothing else is available
            for (let i = 0; i < size; i += 1) {
                buffer[i] = (Math.random() * CHARSET.length) | 0;
            }
        }
        return bufferToString(buffer);
    }
    deriveChallenge(code) {
        if (code.length < 43 || code.length > 128) {
            return Promise.reject(new errors_ts_1.AppAuthError('Invalid code length.'));
        }
        if (!HAS_SUBTLE_CRYPTO) {
            return Promise.reject(new errors_ts_1.AppAuthError('window.crypto.subtle is unavailable.'));
        }
        return new Promise((resolve, reject) => {
            crypto.subtle.digest('SHA-256', textEncodeLite(code)).then(buffer => {
                return resolve(urlSafe(new Uint8Array(buffer)));
            }, error => reject(error));
        });
    }
}
exports.DefaultCrypto = DefaultCrypto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NyeXB0b191dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxNQUFZLE1BQU0sc0NBQWtCO0FBRXBDLDJDQUF5QztBQUV6QyxNQUFNLFVBQVUsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksQ0FBQyxDQUFFLE1BQU0sQ0FBQyxNQUFjLENBQUM7QUFDN0UsTUFBTSxpQkFBaUIsR0FBRyxVQUFVLElBQUksQ0FBQyxDQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBYyxDQUFDO0FBQ3hFLE1BQU0sT0FBTyxHQUFHLGdFQUFnRSxDQUFDO0FBRWpGLHdCQUErQixNQUFrQjtJQUMvQyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDZixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDOUMsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDdkMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFFRCxpQkFBd0IsTUFBa0I7SUFDeEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzdELE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzNFLENBQUM7QUFFRCwyREFBMkQ7QUFDM0QsNERBQTREO0FBQzVELDBEQUEwRDtBQUMxRCx3QkFBK0IsR0FBVztJQUN4QyxNQUFNLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFcEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNwQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQWNEOzs7R0FHRztBQUNIO0lBQ0UsY0FBYyxDQUFDLElBQVk7UUFDekIsTUFBTSxNQUFNLEdBQUcsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsSUFBSSxVQUFVLEVBQUUsQ0FBQztZQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLENBQUM7YUFBTSxDQUFDO1lBQ04sMERBQTBEO1lBQzFELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2dCQUNqQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuRCxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxlQUFlLENBQUMsSUFBWTtRQUMxQixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDMUMsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksd0JBQVksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUNELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLHdCQUFZLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7UUFFRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ2xFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsQ0FBQyxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgYmFzZTY0IGZyb20gJ2Jhc2U2NC1qcyc7XG5cbmltcG9ydCB7QXBwQXV0aEVycm9yfSBmcm9tICcuL2Vycm9ycy50cyc7XG5cbmNvbnN0IEhBU19DUllQVE8gPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAhISh3aW5kb3cuY3J5cHRvIGFzIGFueSk7XG5jb25zdCBIQVNfU1VCVExFX0NSWVBUTyA9IEhBU19DUllQVE8gJiYgISEod2luZG93LmNyeXB0by5zdWJ0bGUgYXMgYW55KTtcbmNvbnN0IENIQVJTRVQgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODknO1xuXG5leHBvcnQgZnVuY3Rpb24gYnVmZmVyVG9TdHJpbmcoYnVmZmVyOiBVaW50OEFycmF5KSB7XG4gIGxldCBzdGF0ZSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlci5ieXRlTGVuZ3RoOyBpICs9IDEpIHtcbiAgICBsZXQgaW5kZXggPSBidWZmZXJbaV0gJSBDSEFSU0VULmxlbmd0aDtcbiAgICBzdGF0ZS5wdXNoKENIQVJTRVRbaW5kZXhdKTtcbiAgfVxuICByZXR1cm4gc3RhdGUuam9pbignJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1cmxTYWZlKGJ1ZmZlcjogVWludDhBcnJheSk6IHN0cmluZyB7XG4gIGNvbnN0IGVuY29kZWQgPSBiYXNlNjQuZnJvbUJ5dGVBcnJheShuZXcgVWludDhBcnJheShidWZmZXIpKTtcbiAgcmV0dXJuIGVuY29kZWQucmVwbGFjZSgvXFwrL2csICctJykucmVwbGFjZSgvXFwvL2csICdfJykucmVwbGFjZSgvPS9nLCAnJyk7XG59XG5cbi8vIGFkYXB0ZWQgZnJvbSBzb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzExMDU4ODU4XG4vLyB0aGlzIGlzIHVzZWQgaW4gcGxhY2Ugb2YgVGV4dEVuY29kZSBhcyB0aGUgYXBpIGlzIG5vdCB5ZXRcbi8vIHdlbGwgc3VwcG9ydGVkOiBodHRwczovL2Nhbml1c2UuY29tLyNzZWFyY2g9VGV4dEVuY29kZXJcbmV4cG9ydCBmdW5jdGlvbiB0ZXh0RW5jb2RlTGl0ZShzdHI6IHN0cmluZykge1xuICBjb25zdCBidWYgPSBuZXcgQXJyYXlCdWZmZXIoc3RyLmxlbmd0aCk7XG4gIGNvbnN0IGJ1ZlZpZXcgPSBuZXcgVWludDhBcnJheShidWYpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgYnVmVmlld1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICB9XG4gIHJldHVybiBidWZWaWV3O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENyeXB0byB7XG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIHJhbmRvbSBzdHJpbmdcbiAgICovXG4gIGdlbmVyYXRlUmFuZG9tKHNpemU6IG51bWJlcik6IHN0cmluZztcbiAgLyoqXG4gICAqIENvbXB1dGUgdGhlIFNIQTI1NiBvZiBhIGdpdmVuIGNvZGUuXG4gICAqIFRoaXMgaXMgdXNlZnVsIHdoZW4gdXNpbmcgUEtDRS5cbiAgICovXG4gIGRlcml2ZUNoYWxsZW5nZShjb2RlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz47XG59XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gb2YgdGhlIGBDcnlwdG9gIGludGVyZmFjZS5cbiAqIFRoaXMgdXNlcyB0aGUgY2FwYWJpbGl0aWVzIG9mIHRoZSBicm93c2VyLlxuICovXG5leHBvcnQgY2xhc3MgRGVmYXVsdENyeXB0byBpbXBsZW1lbnRzIENyeXB0byB7XG4gIGdlbmVyYXRlUmFuZG9tKHNpemU6IG51bWJlcikge1xuICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuICAgIGlmIChIQVNfQ1JZUFRPKSB7XG4gICAgICB3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhidWZmZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmYWxsIGJhY2sgdG8gTWF0aC5yYW5kb20oKSBpZiBub3RoaW5nIGVsc2UgaXMgYXZhaWxhYmxlXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgICAgICBidWZmZXJbaV0gPSAoTWF0aC5yYW5kb20oKSAqIENIQVJTRVQubGVuZ3RoKSB8IDA7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBidWZmZXJUb1N0cmluZyhidWZmZXIpO1xuICB9XG5cbiAgZGVyaXZlQ2hhbGxlbmdlKGNvZGU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgaWYgKGNvZGUubGVuZ3RoIDwgNDMgfHwgY29kZS5sZW5ndGggPiAxMjgpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgQXBwQXV0aEVycm9yKCdJbnZhbGlkIGNvZGUgbGVuZ3RoLicpKTtcbiAgICB9XG4gICAgaWYgKCFIQVNfU1VCVExFX0NSWVBUTykge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBBcHBBdXRoRXJyb3IoJ3dpbmRvdy5jcnlwdG8uc3VidGxlIGlzIHVuYXZhaWxhYmxlLicpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY3J5cHRvLnN1YnRsZS5kaWdlc3QoJ1NIQS0yNTYnLCB0ZXh0RW5jb2RlTGl0ZShjb2RlKSkudGhlbihidWZmZXIgPT4ge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSh1cmxTYWZlKG5ldyBVaW50OEFycmF5KGJ1ZmZlcikpKTtcbiAgICAgIH0sIGVycm9yID0+IHJlamVjdChlcnJvcikpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=