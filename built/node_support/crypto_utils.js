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
var DEFAULT_SIZE = 1; /** size in bytes */
exports.nodeCryptoGenerateRandom = function (sizeInBytes) {
    if (sizeInBytes === void 0) { sizeInBytes = DEFAULT_SIZE; }
    var bytes = crypto.randomBytes(sizeInBytes);
    return crypto_utils_1.bufferToString(new Uint8Array(bytes.buffer));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J5cHRvX3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vZGVfc3VwcG9ydC9jcnlwdG9fdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7QUFFSCwrQkFBaUM7QUFFakMsZ0RBQWdFO0FBRWhFLElBQU0sWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDLG9CQUFvQjtBQUUvQixRQUFBLHdCQUF3QixHQUFvQixVQUFDLFdBQTBCO0lBQTFCLDRCQUFBLEVBQUEsMEJBQTBCO0lBQ2xGLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDOUMsT0FBTyw2QkFBYyxDQUFDLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ3RELENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0ICogYXMgY3J5cHRvIGZyb20gJ2NyeXB0byc7XHJcblxyXG5pbXBvcnQge2J1ZmZlclRvU3RyaW5nLCBSYW5kb21HZW5lcmF0b3J9IGZyb20gJy4uL2NyeXB0b191dGlscyc7XHJcblxyXG5jb25zdCBERUZBVUxUX1NJWkUgPSAxOyAvKiogc2l6ZSBpbiBieXRlcyAqL1xyXG5cclxuZXhwb3J0IGNvbnN0IG5vZGVDcnlwdG9HZW5lcmF0ZVJhbmRvbTogUmFuZG9tR2VuZXJhdG9yID0gKHNpemVJbkJ5dGVzID0gREVGQVVMVF9TSVpFKSA9PiB7XHJcbiAgY29uc3QgYnl0ZXMgPSBjcnlwdG8ucmFuZG9tQnl0ZXMoc2l6ZUluQnl0ZXMpO1xyXG4gIHJldHVybiBidWZmZXJUb1N0cmluZyhuZXcgVWludDhBcnJheShieXRlcy5idWZmZXIpKTtcclxufTtcclxuIl19