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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.log = void 0;
var flags_1 = require("./flags");
function log(message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (flags_1.IS_LOG) {
        var length_1 = args ? args.length : 0;
        if (length_1 > 0) {
            console.log.apply(console, __spreadArrays([message], args));
        }
        else {
            console.log(message);
        }
    }
}
exports.log = log;
;
// check to see if native support for profiling is available.
var NATIVE_PROFILE_SUPPORT = typeof window !== 'undefined' && !!window.performance && !!console.profile;
/**
 * A decorator that can profile a function.
 */
function profile(target, propertyKey, descriptor) {
    if (flags_1.IS_PROFILE) {
        return performProfile(target, propertyKey, descriptor);
    }
    else {
        // return as-is
        return descriptor;
    }
}
exports.profile = profile;
function performProfile(target, propertyKey, descriptor) {
    var originalCallable = descriptor.value;
    // name must exist
    var name = originalCallable.name;
    if (!name) {
        name = 'anonymous function';
    }
    if (NATIVE_PROFILE_SUPPORT) {
        descriptor.value = function (args) {
            console.profile(name);
            var startTime = window.performance.now();
            var result = originalCallable.call.apply(originalCallable, __spreadArrays([this || window], args));
            var duration = window.performance.now() - startTime;
            console.log(name + " took " + duration + " ms");
            console.profileEnd();
            return result;
        };
    }
    else {
        descriptor.value = function (args) {
            log("Profile start " + name);
            var start = Date.now();
            var result = originalCallable.call.apply(originalCallable, __spreadArrays([this || window], args));
            var duration = Date.now() - start;
            log("Profile end " + name + " took " + duration + " ms.");
            return result;
        };
    }
    return descriptor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7Ozs7Ozs7O0FBRUgsaUNBQTJDO0FBRTNDLFNBQWdCLEdBQUcsQ0FBQyxPQUFlO0lBQUUsY0FBYztTQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7UUFBZCw2QkFBYzs7SUFDakQsSUFBSSxjQUFNLEVBQUU7UUFDVixJQUFJLFFBQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLFFBQU0sR0FBRyxDQUFDLEVBQUU7WUFDZCxPQUFPLENBQUMsR0FBRyxPQUFYLE9BQU8sa0JBQUssT0FBTyxHQUFLLElBQUksR0FBRTtTQUMvQjthQUFNO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN0QjtLQUNGO0FBQ0gsQ0FBQztBQVRELGtCQVNDO0FBQUEsQ0FBQztBQUVGLDZEQUE2RDtBQUM3RCxJQUFNLHNCQUFzQixHQUN4QixPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFFL0U7O0dBRUc7QUFDSCxTQUFnQixPQUFPLENBQUMsTUFBVyxFQUFFLFdBQW1CLEVBQUUsVUFBOEI7SUFDdEYsSUFBSSxrQkFBVSxFQUFFO1FBQ2QsT0FBTyxjQUFjLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUN4RDtTQUFNO1FBQ0wsZUFBZTtRQUNmLE9BQU8sVUFBVSxDQUFDO0tBQ25CO0FBQ0gsQ0FBQztBQVBELDBCQU9DO0FBRUQsU0FBUyxjQUFjLENBQ25CLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO0lBQ2xFLElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUN4QyxrQkFBa0I7SUFDbEIsSUFBSSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO0lBQ2pDLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxJQUFJLEdBQUcsb0JBQW9CLENBQUM7S0FDN0I7SUFDRCxJQUFJLHNCQUFzQixFQUFFO1FBQzFCLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBUyxJQUFXO1lBQ3JDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN6QyxJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLE9BQXJCLGdCQUFnQixrQkFBTSxJQUFJLElBQUksTUFBTSxHQUFLLElBQUksRUFBQyxDQUFDO1lBQzVELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUksSUFBSSxjQUFTLFFBQVEsUUFBSyxDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztLQUNIO1NBQU07UUFDTCxVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVMsSUFBVztZQUNyQyxHQUFHLENBQUMsbUJBQWlCLElBQU0sQ0FBQyxDQUFDO1lBQzdCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN2QixJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLE9BQXJCLGdCQUFnQixrQkFBTSxJQUFJLElBQUksTUFBTSxHQUFLLElBQUksRUFBQyxDQUFDO1lBQzVELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUM7WUFDbEMsR0FBRyxDQUFDLGlCQUFlLElBQUksY0FBUyxRQUFRLFNBQU0sQ0FBQyxDQUFDO1lBQ2hELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztLQUNIO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XHJcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxyXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHtJU19MT0csIElTX1BST0ZJTEV9IGZyb20gJy4vZmxhZ3MnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGxvZyhtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XHJcbiAgaWYgKElTX0xPRykge1xyXG4gICAgbGV0IGxlbmd0aCA9IGFyZ3MgPyBhcmdzLmxlbmd0aCA6IDA7XHJcbiAgICBpZiAobGVuZ3RoID4gMCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCAuLi5hcmdzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8vIGNoZWNrIHRvIHNlZSBpZiBuYXRpdmUgc3VwcG9ydCBmb3IgcHJvZmlsaW5nIGlzIGF2YWlsYWJsZS5cclxuY29uc3QgTkFUSVZFX1BST0ZJTEVfU1VQUE9SVCA9XHJcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAhIXdpbmRvdy5wZXJmb3JtYW5jZSAmJiAhIWNvbnNvbGUucHJvZmlsZTtcclxuXHJcbi8qKlxyXG4gKiBBIGRlY29yYXRvciB0aGF0IGNhbiBwcm9maWxlIGEgZnVuY3Rpb24uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcHJvZmlsZSh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XHJcbiAgaWYgKElTX1BST0ZJTEUpIHtcclxuICAgIHJldHVybiBwZXJmb3JtUHJvZmlsZSh0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gcmV0dXJuIGFzLWlzXHJcbiAgICByZXR1cm4gZGVzY3JpcHRvcjtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBlcmZvcm1Qcm9maWxlKFxyXG4gICAgdGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcik6IFByb3BlcnR5RGVzY3JpcHRvciB7XHJcbiAgbGV0IG9yaWdpbmFsQ2FsbGFibGUgPSBkZXNjcmlwdG9yLnZhbHVlO1xyXG4gIC8vIG5hbWUgbXVzdCBleGlzdFxyXG4gIGxldCBuYW1lID0gb3JpZ2luYWxDYWxsYWJsZS5uYW1lO1xyXG4gIGlmICghbmFtZSkge1xyXG4gICAgbmFtZSA9ICdhbm9ueW1vdXMgZnVuY3Rpb24nO1xyXG4gIH1cclxuICBpZiAoTkFUSVZFX1BST0ZJTEVfU1VQUE9SVCkge1xyXG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKGFyZ3M6IGFueVtdKSB7XHJcbiAgICAgIGNvbnNvbGUucHJvZmlsZShuYW1lKTtcclxuICAgICAgbGV0IHN0YXJ0VGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcclxuICAgICAgbGV0IHJlc3VsdCA9IG9yaWdpbmFsQ2FsbGFibGUuY2FsbCh0aGlzIHx8IHdpbmRvdywgLi4uYXJncyk7XHJcbiAgICAgIGxldCBkdXJhdGlvbiA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0VGltZTtcclxuICAgICAgY29uc29sZS5sb2coYCR7bmFtZX0gdG9vayAke2R1cmF0aW9ufSBtc2ApO1xyXG4gICAgICBjb25zb2xlLnByb2ZpbGVFbmQoKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbihhcmdzOiBhbnlbXSkge1xyXG4gICAgICBsb2coYFByb2ZpbGUgc3RhcnQgJHtuYW1lfWApO1xyXG4gICAgICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpO1xyXG4gICAgICBsZXQgcmVzdWx0ID0gb3JpZ2luYWxDYWxsYWJsZS5jYWxsKHRoaXMgfHwgd2luZG93LCAuLi5hcmdzKTtcclxuICAgICAgbGV0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHN0YXJ0O1xyXG4gICAgICBsb2coYFByb2ZpbGUgZW5kICR7bmFtZX0gdG9vayAke2R1cmF0aW9ufSBtcy5gKTtcclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH07XHJcbiAgfVxyXG4gIHJldHVybiBkZXNjcmlwdG9yO1xyXG59XHJcbiJdfQ==