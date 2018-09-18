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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vZGVfc3VwcG9ydC9jcnlwdG9fdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFFSCwrQkFBaUM7QUFDakMsZ0RBQWtFO0FBRWxFO0lBQUE7SUFVQSxDQUFDO0lBVEMsbUNBQWMsR0FBZCxVQUFlLElBQVk7UUFDekIsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxPQUFPLDZCQUFjLENBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELG9DQUFlLEdBQWYsVUFBZ0IsSUFBWTtRQUMxQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsc0JBQU8sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFDSCxpQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0ICogYXMgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgeyBidWZmZXJUb1N0cmluZywgQ3J5cHRvLCB1cmxTYWZlIH0gZnJvbSAnLi4vY3J5cHRvX3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIE5vZGVDcnlwdG8gaW1wbGVtZW50cyBDcnlwdG8ge1xuICBnZW5lcmF0ZVJhbmRvbShzaXplOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIGNvbnN0IGJ5dGVzID0gY3J5cHRvLnJhbmRvbUJ5dGVzKHNpemUpO1xuICAgIHJldHVybiBidWZmZXJUb1N0cmluZyhuZXcgVWludDhBcnJheShieXRlcy5idWZmZXIpKTtcbiAgfVxuXG4gIGRlcml2ZUNoYWxsZW5nZShjb2RlOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGhhc2ggPSBjcnlwdG8uY3JlYXRlSGFzaCgnc2hhMjU2JykudXBkYXRlKGNvZGUpLmRpZ2VzdCgpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodXJsU2FmZShuZXcgVWludDhBcnJheShoYXNoLmJ1ZmZlcikpKTtcbiAgfVxufVxuIl19