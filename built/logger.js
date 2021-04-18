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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
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
            console.log.apply(console, __spreadArray([message], args));
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
            var result = originalCallable.call.apply(originalCallable, __spreadArray([this || window], args));
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
            var result = originalCallable.call.apply(originalCallable, __spreadArray([this || window], args));
            var duration = Date.now() - start;
            log("Profile end " + name + " took " + duration + " ms.");
            return result;
        };
    }
    return descriptor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7Ozs7OztBQUVILGlDQUEyQztBQUUzQyxTQUFnQixHQUFHLENBQUMsT0FBZTtJQUFFLGNBQWM7U0FBZCxVQUFjLEVBQWQscUJBQWMsRUFBZCxJQUFjO1FBQWQsNkJBQWM7O0lBQ2pELElBQUksY0FBTSxFQUFFO1FBQ1YsSUFBSSxRQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsSUFBSSxRQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEdBQUcsT0FBWCxPQUFPLGlCQUFLLE9BQU8sR0FBSyxJQUFJLEdBQUU7U0FDL0I7YUFBTTtZQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEI7S0FDRjtBQUNILENBQUM7QUFURCxrQkFTQztBQUFBLENBQUM7QUFFRiw2REFBNkQ7QUFDN0QsSUFBTSxzQkFBc0IsR0FDeEIsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBRS9FOztHQUVHO0FBQ0gsU0FBZ0IsT0FBTyxDQUFDLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO0lBQ3RGLElBQUksa0JBQVUsRUFBRTtRQUNkLE9BQU8sY0FBYyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7S0FDeEQ7U0FBTTtRQUNMLGVBQWU7UUFDZixPQUFPLFVBQVUsQ0FBQztLQUNuQjtBQUNILENBQUM7QUFQRCwwQkFPQztBQUVELFNBQVMsY0FBYyxDQUNuQixNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtJQUNsRSxJQUFJLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDeEMsa0JBQWtCO0lBQ2xCLElBQUksSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQztJQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsSUFBSSxHQUFHLG9CQUFvQixDQUFDO0tBQzdCO0lBQ0QsSUFBSSxzQkFBc0IsRUFBRTtRQUMxQixVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVMsSUFBVztZQUNyQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDekMsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxPQUFyQixnQkFBZ0IsaUJBQU0sSUFBSSxJQUFJLE1BQU0sR0FBSyxJQUFJLEVBQUMsQ0FBQztZQUM1RCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztZQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFJLElBQUksY0FBUyxRQUFRLFFBQUssQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNyQixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7S0FDSDtTQUFNO1FBQ0wsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFTLElBQVc7WUFDckMsR0FBRyxDQUFDLG1CQUFpQixJQUFNLENBQUMsQ0FBQztZQUM3QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxPQUFyQixnQkFBZ0IsaUJBQU0sSUFBSSxJQUFJLE1BQU0sR0FBSyxJQUFJLEVBQUMsQ0FBQztZQUM1RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxpQkFBZSxJQUFJLGNBQVMsUUFBUSxTQUFNLENBQUMsQ0FBQztZQUNoRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7S0FDSDtJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtJU19MT0csIElTX1BST0ZJTEV9IGZyb20gJy4vZmxhZ3MnO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9nKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgaWYgKElTX0xPRykge1xuICAgIGxldCBsZW5ndGggPSBhcmdzID8gYXJncy5sZW5ndGggOiAwO1xuICAgIGlmIChsZW5ndGggPiAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBjaGVjayB0byBzZWUgaWYgbmF0aXZlIHN1cHBvcnQgZm9yIHByb2ZpbGluZyBpcyBhdmFpbGFibGUuXG5jb25zdCBOQVRJVkVfUFJPRklMRV9TVVBQT1JUID1cbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAhIXdpbmRvdy5wZXJmb3JtYW5jZSAmJiAhIWNvbnNvbGUucHJvZmlsZTtcblxuLyoqXG4gKiBBIGRlY29yYXRvciB0aGF0IGNhbiBwcm9maWxlIGEgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9maWxlKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgaWYgKElTX1BST0ZJTEUpIHtcbiAgICByZXR1cm4gcGVyZm9ybVByb2ZpbGUodGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gcmV0dXJuIGFzLWlzXG4gICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGVyZm9ybVByb2ZpbGUoXG4gICAgdGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcik6IFByb3BlcnR5RGVzY3JpcHRvciB7XG4gIGxldCBvcmlnaW5hbENhbGxhYmxlID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgLy8gbmFtZSBtdXN0IGV4aXN0XG4gIGxldCBuYW1lID0gb3JpZ2luYWxDYWxsYWJsZS5uYW1lO1xuICBpZiAoIW5hbWUpIHtcbiAgICBuYW1lID0gJ2Fub255bW91cyBmdW5jdGlvbic7XG4gIH1cbiAgaWYgKE5BVElWRV9QUk9GSUxFX1NVUFBPUlQpIHtcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oYXJnczogYW55W10pIHtcbiAgICAgIGNvbnNvbGUucHJvZmlsZShuYW1lKTtcbiAgICAgIGxldCBzdGFydFRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICBsZXQgcmVzdWx0ID0gb3JpZ2luYWxDYWxsYWJsZS5jYWxsKHRoaXMgfHwgd2luZG93LCAuLi5hcmdzKTtcbiAgICAgIGxldCBkdXJhdGlvbiA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAgIGNvbnNvbGUubG9nKGAke25hbWV9IHRvb2sgJHtkdXJhdGlvbn0gbXNgKTtcbiAgICAgIGNvbnNvbGUucHJvZmlsZUVuZCgpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbihhcmdzOiBhbnlbXSkge1xuICAgICAgbG9nKGBQcm9maWxlIHN0YXJ0ICR7bmFtZX1gKTtcbiAgICAgIGxldCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgICBsZXQgcmVzdWx0ID0gb3JpZ2luYWxDYWxsYWJsZS5jYWxsKHRoaXMgfHwgd2luZG93LCAuLi5hcmdzKTtcbiAgICAgIGxldCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSBzdGFydDtcbiAgICAgIGxvZyhgUHJvZmlsZSBlbmQgJHtuYW1lfSB0b29rICR7ZHVyYXRpb259IG1zLmApO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9XG4gIHJldHVybiBkZXNjcmlwdG9yO1xufVxuIl19