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
        return (0, crypto_utils_1.bufferToString)(new Uint8Array(bytes.buffer));
    };
    NodeCrypto.prototype.deriveChallenge = function (code) {
        var hash = crypto.createHash('sha256').update(code).digest();
        return Promise.resolve((0, crypto_utils_1.urlSafe)(new Uint8Array(hash.buffer)));
    };
    return NodeCrypto;
}());
exports.NodeCrypto = NodeCrypto;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vZGVfc3VwcG9ydC9jcnlwdG9fdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBRUgsK0JBQWlDO0FBQ2pDLGdEQUFrRTtBQUVsRTtJQUFBO0lBVUEsQ0FBQztJQVRDLG1DQUFjLEdBQWQsVUFBZSxJQUFZO1FBQ3pCLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsT0FBTyxJQUFBLDZCQUFjLEVBQUMsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELG9DQUFlLEdBQWYsVUFBZ0IsSUFBWTtRQUMxQixJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBQSxzQkFBTyxFQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNILGlCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBjcnlwdG8gZnJvbSAnY3J5cHRvJztcbmltcG9ydCB7IGJ1ZmZlclRvU3RyaW5nLCBDcnlwdG8sIHVybFNhZmUgfSBmcm9tICcuLi9jcnlwdG9fdXRpbHMnO1xuXG5leHBvcnQgY2xhc3MgTm9kZUNyeXB0byBpbXBsZW1lbnRzIENyeXB0byB7XG4gIGdlbmVyYXRlUmFuZG9tKHNpemU6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgYnl0ZXMgPSBjcnlwdG8ucmFuZG9tQnl0ZXMoc2l6ZSk7XG4gICAgcmV0dXJuIGJ1ZmZlclRvU3RyaW5nKG5ldyBVaW50OEFycmF5KGJ5dGVzLmJ1ZmZlcikpO1xuICB9XG5cbiAgZGVyaXZlQ2hhbGxlbmdlKGNvZGU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgaGFzaCA9IGNyeXB0by5jcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUoY29kZSkuZGlnZXN0KCk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh1cmxTYWZlKG5ldyBVaW50OEFycmF5KGhhc2guYnVmZmVyKSkpO1xuICB9XG59XG4iXX0=