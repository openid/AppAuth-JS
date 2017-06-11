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
var flags_1 = require("./flags");
function log(message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (flags_1.IS_LOG) {
        var length_1 = args ? args.length : 0;
        if (length_1 > 0) {
            console.log.apply(console, [message].concat(args));
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
            var result = originalCallable.call.apply(originalCallable, [this || window].concat(args));
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
            var result = originalCallable.call.apply(originalCallable, [this || window].concat(args));
            var duration = Date.now() - start;
            log("Profile end " + name + " took " + duration + " ms.");
            return result;
        };
    }
    return descriptor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILGlDQUEyQztBQUUzQyxhQUFvQixPQUFlO0lBQUUsY0FBYztTQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7UUFBZCw2QkFBYzs7SUFDakQsRUFBRSxDQUFDLENBQUMsY0FBTSxDQUFDLENBQUMsQ0FBQztRQUNYLElBQUksUUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNwQyxFQUFFLENBQUMsQ0FBQyxRQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLE9BQVgsT0FBTyxHQUFLLE9BQU8sU0FBSyxJQUFJLEdBQUU7UUFDaEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFURCxrQkFTQztBQUFBLENBQUM7QUFFRiw2REFBNkQ7QUFDN0QsSUFBTSxzQkFBc0IsR0FDeEIsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBRS9FOztHQUVHO0FBQ0gsaUJBQXdCLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO0lBQ3RGLEVBQUUsQ0FBQyxDQUFDLGtCQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ2YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLGVBQWU7UUFDZixNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BCLENBQUM7QUFDSCxDQUFDO0FBUEQsMEJBT0M7QUFFRCx3QkFDSSxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtJQUNsRSxJQUFJLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDeEMsa0JBQWtCO0lBQ2xCLElBQUksSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQztJQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDVixJQUFJLEdBQUcsb0JBQW9CLENBQUM7SUFDOUIsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUMzQixVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVMsSUFBVztZQUNyQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDekMsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxPQUFyQixnQkFBZ0IsR0FBTSxJQUFJLElBQUksTUFBTSxTQUFLLElBQUksRUFBQyxDQUFDO1lBQzVELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUksSUFBSSxjQUFTLFFBQVEsUUFBSyxDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFTLElBQVc7WUFDckMsR0FBRyxDQUFDLG1CQUFpQixJQUFNLENBQUMsQ0FBQztZQUM3QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxPQUFyQixnQkFBZ0IsR0FBTSxJQUFJLElBQUksTUFBTSxTQUFLLElBQUksRUFBQyxDQUFDO1lBQzVELElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUM7WUFDbEMsR0FBRyxDQUFDLGlCQUFlLElBQUksY0FBUyxRQUFRLFNBQU0sQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0lTX0xPRywgSVNfUFJPRklMRX0gZnJvbSAnLi9mbGFncyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2cobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICBpZiAoSVNfTE9HKSB7XG4gICAgbGV0IGxlbmd0aCA9IGFyZ3MgPyBhcmdzLmxlbmd0aCA6IDA7XG4gICAgaWYgKGxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UsIC4uLmFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIGNoZWNrIHRvIHNlZSBpZiBuYXRpdmUgc3VwcG9ydCBmb3IgcHJvZmlsaW5nIGlzIGF2YWlsYWJsZS5cbmNvbnN0IE5BVElWRV9QUk9GSUxFX1NVUFBPUlQgPVxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICEhd2luZG93LnBlcmZvcm1hbmNlICYmICEhY29uc29sZS5wcm9maWxlO1xuXG4vKipcbiAqIEEgZGVjb3JhdG9yIHRoYXQgY2FuIHByb2ZpbGUgYSBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2ZpbGUodGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICBpZiAoSVNfUFJPRklMRSkge1xuICAgIHJldHVybiBwZXJmb3JtUHJvZmlsZSh0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKTtcbiAgfSBlbHNlIHtcbiAgICAvLyByZXR1cm4gYXMtaXNcbiAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwZXJmb3JtUHJvZmlsZShcbiAgICB0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKTogUHJvcGVydHlEZXNjcmlwdG9yIHtcbiAgbGV0IG9yaWdpbmFsQ2FsbGFibGUgPSBkZXNjcmlwdG9yLnZhbHVlO1xuICAvLyBuYW1lIG11c3QgZXhpc3RcbiAgbGV0IG5hbWUgPSBvcmlnaW5hbENhbGxhYmxlLm5hbWU7XG4gIGlmICghbmFtZSkge1xuICAgIG5hbWUgPSAnYW5vbnltb3VzIGZ1bmN0aW9uJztcbiAgfVxuICBpZiAoTkFUSVZFX1BST0ZJTEVfU1VQUE9SVCkge1xuICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbihhcmdzOiBhbnlbXSkge1xuICAgICAgY29uc29sZS5wcm9maWxlKG5hbWUpO1xuICAgICAgbGV0IHN0YXJ0VGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgIGxldCByZXN1bHQgPSBvcmlnaW5hbENhbGxhYmxlLmNhbGwodGhpcyB8fCB3aW5kb3csIC4uLmFyZ3MpO1xuICAgICAgbGV0IGR1cmF0aW9uID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgICAgY29uc29sZS5sb2coYCR7bmFtZX0gdG9vayAke2R1cmF0aW9ufSBtc2ApO1xuICAgICAgY29uc29sZS5wcm9maWxlRW5kKCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKGFyZ3M6IGFueVtdKSB7XG4gICAgICBsb2coYFByb2ZpbGUgc3RhcnQgJHtuYW1lfWApO1xuICAgICAgbGV0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgIGxldCByZXN1bHQgPSBvcmlnaW5hbENhbGxhYmxlLmNhbGwodGhpcyB8fCB3aW5kb3csIC4uLmFyZ3MpO1xuICAgICAgbGV0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHN0YXJ0O1xuICAgICAgbG9nKGBQcm9maWxlIGVuZCAke25hbWV9IHRvb2sgJHtkdXJhdGlvbn0gbXMuYCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGRlc2NyaXB0b3I7XG59XG4iXX0=