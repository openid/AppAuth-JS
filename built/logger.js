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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.log = void 0;
var flags_1 = require("./flags");
function log(message) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (flags_1.Flags.IS_LOG) {
        var length_1 = args ? args.length : 0;
        if (length_1 > 0) {
            console.log.apply(console, __spreadArray([message], args, false));
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
    if (flags_1.Flags.IS_PROFILE) {
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
            var result = originalCallable.call.apply(originalCallable, __spreadArray([this || window], args, false));
            var duration = window.performance.now() - startTime;
            console.log("".concat(name, " took ").concat(duration, " ms"));
            console.profileEnd();
            return result;
        };
    }
    else {
        descriptor.value = function (args) {
            log("Profile start ".concat(name));
            var start = Date.now();
            var result = originalCallable.call.apply(originalCallable, __spreadArray([this || window], args, false));
            var duration = Date.now() - start;
            log("Profile end ".concat(name, " took ").concat(duration, " ms."));
            return result;
        };
    }
    return descriptor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7Ozs7Ozs7Ozs7QUFFSCxpQ0FBOEI7QUFFOUIsU0FBZ0IsR0FBRyxDQUFDLE9BQWU7SUFBRSxjQUFjO1NBQWQsVUFBYyxFQUFkLHFCQUFjLEVBQWQsSUFBYztRQUFkLDZCQUFjOztJQUNqRCxJQUFJLGFBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQixJQUFJLFFBQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLFFBQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLE9BQVgsT0FBTyxpQkFBSyxPQUFPLEdBQUssSUFBSSxVQUFFO1FBQ2hDLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUM7QUFURCxrQkFTQztBQUFBLENBQUM7QUFFRiw2REFBNkQ7QUFDN0QsSUFBTSxzQkFBc0IsR0FDeEIsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBRS9FOztHQUVHO0FBQ0gsU0FBZ0IsT0FBTyxDQUFDLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO0lBQ3RGLElBQUksYUFBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3JCLE9BQU8sY0FBYyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDekQsQ0FBQztTQUFNLENBQUM7UUFDTixlQUFlO1FBQ2YsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztBQUNILENBQUM7QUFQRCwwQkFPQztBQUVELFNBQVMsY0FBYyxDQUNuQixNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtJQUNsRSxJQUFJLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDeEMsa0JBQWtCO0lBQ2xCLElBQUksSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQztJQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDVixJQUFJLEdBQUcsb0JBQW9CLENBQUM7SUFDOUIsQ0FBQztJQUNELElBQUksc0JBQXNCLEVBQUUsQ0FBQztRQUMzQixVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVMsSUFBVztZQUNyQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDekMsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxPQUFyQixnQkFBZ0IsaUJBQU0sSUFBSSxJQUFJLE1BQU0sR0FBSyxJQUFJLFNBQUMsQ0FBQztZQUM1RCxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztZQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUcsSUFBSSxtQkFBUyxRQUFRLFFBQUssQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNyQixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSixDQUFDO1NBQU0sQ0FBQztRQUNOLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBUyxJQUFXO1lBQ3JDLEdBQUcsQ0FBQyx3QkFBaUIsSUFBSSxDQUFFLENBQUMsQ0FBQztZQUM3QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxPQUFyQixnQkFBZ0IsaUJBQU0sSUFBSSxJQUFJLE1BQU0sR0FBSyxJQUFJLFNBQUMsQ0FBQztZQUM1RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxzQkFBZSxJQUFJLG1CQUFTLFFBQVEsU0FBTSxDQUFDLENBQUM7WUFDaEQsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdFxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZVxuICogTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHtGbGFnc30gZnJvbSAnLi9mbGFncyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2cobWVzc2FnZTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuICBpZiAoRmxhZ3MuSVNfTE9HKSB7XG4gICAgbGV0IGxlbmd0aCA9IGFyZ3MgPyBhcmdzLmxlbmd0aCA6IDA7XG4gICAgaWYgKGxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UsIC4uLmFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIGNoZWNrIHRvIHNlZSBpZiBuYXRpdmUgc3VwcG9ydCBmb3IgcHJvZmlsaW5nIGlzIGF2YWlsYWJsZS5cbmNvbnN0IE5BVElWRV9QUk9GSUxFX1NVUFBPUlQgPVxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICEhd2luZG93LnBlcmZvcm1hbmNlICYmICEhY29uc29sZS5wcm9maWxlO1xuXG4vKipcbiAqIEEgZGVjb3JhdG9yIHRoYXQgY2FuIHByb2ZpbGUgYSBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByb2ZpbGUodGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcikge1xuICBpZiAoRmxhZ3MuSVNfUFJPRklMRSkge1xuICAgIHJldHVybiBwZXJmb3JtUHJvZmlsZSh0YXJnZXQsIHByb3BlcnR5S2V5LCBkZXNjcmlwdG9yKTtcbiAgfSBlbHNlIHtcbiAgICAvLyByZXR1cm4gYXMtaXNcbiAgICByZXR1cm4gZGVzY3JpcHRvcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBwZXJmb3JtUHJvZmlsZShcbiAgICB0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKTogUHJvcGVydHlEZXNjcmlwdG9yIHtcbiAgbGV0IG9yaWdpbmFsQ2FsbGFibGUgPSBkZXNjcmlwdG9yLnZhbHVlO1xuICAvLyBuYW1lIG11c3QgZXhpc3RcbiAgbGV0IG5hbWUgPSBvcmlnaW5hbENhbGxhYmxlLm5hbWU7XG4gIGlmICghbmFtZSkge1xuICAgIG5hbWUgPSAnYW5vbnltb3VzIGZ1bmN0aW9uJztcbiAgfVxuICBpZiAoTkFUSVZFX1BST0ZJTEVfU1VQUE9SVCkge1xuICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbihhcmdzOiBhbnlbXSkge1xuICAgICAgY29uc29sZS5wcm9maWxlKG5hbWUpO1xuICAgICAgbGV0IHN0YXJ0VGltZSA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgIGxldCByZXN1bHQgPSBvcmlnaW5hbENhbGxhYmxlLmNhbGwodGhpcyB8fCB3aW5kb3csIC4uLmFyZ3MpO1xuICAgICAgbGV0IGR1cmF0aW9uID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgICAgY29uc29sZS5sb2coYCR7bmFtZX0gdG9vayAke2R1cmF0aW9ufSBtc2ApO1xuICAgICAgY29uc29sZS5wcm9maWxlRW5kKCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKGFyZ3M6IGFueVtdKSB7XG4gICAgICBsb2coYFByb2ZpbGUgc3RhcnQgJHtuYW1lfWApO1xuICAgICAgbGV0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICAgIGxldCByZXN1bHQgPSBvcmlnaW5hbENhbGxhYmxlLmNhbGwodGhpcyB8fCB3aW5kb3csIC4uLmFyZ3MpO1xuICAgICAgbGV0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHN0YXJ0O1xuICAgICAgbG9nKGBQcm9maWxlIGVuZCAke25hbWV9IHRvb2sgJHtkdXJhdGlvbn0gbXMuYCk7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGRlc2NyaXB0b3I7XG59XG4iXX0=