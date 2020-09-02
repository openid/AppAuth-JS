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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vZGVfc3VwcG9ydC9jcnlwdG9fdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBRUgsK0JBQWlDO0FBQ2pDLGdEQUFrRTtBQUVsRTtJQUFBO0lBVUEsQ0FBQztJQVRDLG1DQUFjLEdBQWQsVUFBZSxJQUFZO1FBQ3pCLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsT0FBTyw2QkFBYyxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxvQ0FBZSxHQUFmLFVBQWdCLElBQVk7UUFDMUIsSUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDL0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLHNCQUFPLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBQ0gsaUJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLGdDQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCAqIGFzIGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IHsgYnVmZmVyVG9TdHJpbmcsIENyeXB0bywgdXJsU2FmZSB9IGZyb20gJy4uL2NyeXB0b191dGlscyc7XG5cbmV4cG9ydCBjbGFzcyBOb2RlQ3J5cHRvIGltcGxlbWVudHMgQ3J5cHRvIHtcbiAgZ2VuZXJhdGVSYW5kb20oc2l6ZTogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBieXRlcyA9IGNyeXB0by5yYW5kb21CeXRlcyhzaXplKTtcbiAgICByZXR1cm4gYnVmZmVyVG9TdHJpbmcobmV3IFVpbnQ4QXJyYXkoYnl0ZXMuYnVmZmVyKSk7XG4gIH1cblxuICBkZXJpdmVDaGFsbGVuZ2UoY29kZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBoYXNoID0gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShjb2RlKS5kaWdlc3QoKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHVybFNhZmUobmV3IFVpbnQ4QXJyYXkoaGFzaC5idWZmZXIpKSk7XG4gIH1cbn1cbiJdfQ==