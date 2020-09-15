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
exports.NodeCrypto = void 0;
var crypto = require("crypto");
var crypto_utils_1 = require("../crypto_utils");
var NodeCrypto = /** @class */ (function () {
    function NodeCrypto() {
    }
    NodeCrypto.prototype.generateRandom = function (size) {
        var bytes = crypto.randomBytes(size);
        return crypto_utils_1.bufferToString(new Uint8Array(bytes.buffer));
    };
    NodeCrypto.prototype.deriveChallenge = function (code) {
        var hash = crypto.createHash('sha256').update(code).digest();
        return Promise.resolve(crypto_utils_1.urlSafe(new Uint8Array(hash.buffer)));
    };
    return NodeCrypto;
}());
exports.NodeCrypto = NodeCrypto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vZGVfc3VwcG9ydC9jcnlwdG9fdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBRUgsK0JBQWlDO0FBQ2pDLGdEQUFrRTtBQUVsRTtJQUFBO0lBVUEsQ0FBQztJQVRDLG1DQUFjLEdBQWQsVUFBZSxJQUFZO1FBQ3pCLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsT0FBTyw2QkFBYyxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxvQ0FBZSxHQUFmLFVBQWdCLElBQVk7UUFDMUIsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLHNCQUFPLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcclxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXHJcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXHJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgKiBhcyBjcnlwdG8gZnJvbSAnY3J5cHRvJztcclxuaW1wb3J0IHsgYnVmZmVyVG9TdHJpbmcsIENyeXB0bywgdXJsU2FmZSB9IGZyb20gJy4uL2NyeXB0b191dGlscyc7XHJcblxyXG5leHBvcnQgY2xhc3MgTm9kZUNyeXB0byBpbXBsZW1lbnRzIENyeXB0byB7XHJcbiAgZ2VuZXJhdGVSYW5kb20oc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IGJ5dGVzID0gY3J5cHRvLnJhbmRvbUJ5dGVzKHNpemUpO1xyXG4gICAgcmV0dXJuIGJ1ZmZlclRvU3RyaW5nKG5ldyBVaW50OEFycmF5KGJ5dGVzLmJ1ZmZlcikpO1xyXG4gIH1cclxuXHJcbiAgZGVyaXZlQ2hhbGxlbmdlKGNvZGU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICBjb25zdCBoYXNoID0gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShjb2RlKS5kaWdlc3QoKTtcclxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodXJsU2FmZShuZXcgVWludDhBcnJheShoYXNoLmJ1ZmZlcikpKTtcclxuICB9XHJcbn1cclxuIl19