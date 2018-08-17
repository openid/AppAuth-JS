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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILGlDQUEyQztBQUUzQyxhQUFvQixPQUFlO0lBQUUsY0FBYztTQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7UUFBZCw2QkFBYzs7SUFDakQsSUFBSSxjQUFNLEVBQUU7UUFDVixJQUFJLFFBQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLFFBQU0sR0FBRyxDQUFDLEVBQUU7WUFDZCxPQUFPLENBQUMsR0FBRyxPQUFYLE9BQU8sR0FBSyxPQUFPLFNBQUssSUFBSSxHQUFFO1NBQy9CO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3RCO0tBQ0Y7QUFDSCxDQUFDO0FBVEQsa0JBU0M7QUFBQSxDQUFDO0FBRUYsNkRBQTZEO0FBQzdELElBQU0sc0JBQXNCLEdBQ3hCLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztBQUUvRTs7R0FFRztBQUNILGlCQUF3QixNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtJQUN0RixJQUFJLGtCQUFVLEVBQUU7UUFDZCxPQUFPLGNBQWMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0tBQ3hEO1NBQU07UUFDTCxlQUFlO1FBQ2YsT0FBTyxVQUFVLENBQUM7S0FDbkI7QUFDSCxDQUFDO0FBUEQsMEJBT0M7QUFFRCx3QkFDSSxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtJQUNsRSxJQUFJLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7SUFDeEMsa0JBQWtCO0lBQ2xCLElBQUksSUFBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQztJQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsSUFBSSxHQUFHLG9CQUFvQixDQUFDO0tBQzdCO0lBQ0QsSUFBSSxzQkFBc0IsRUFBRTtRQUMxQixVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVMsSUFBVztZQUNyQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDekMsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxPQUFyQixnQkFBZ0IsR0FBTSxJQUFJLElBQUksTUFBTSxTQUFLLElBQUksRUFBQyxDQUFDO1lBQzVELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUksSUFBSSxjQUFTLFFBQVEsUUFBSyxDQUFDLENBQUM7WUFDM0MsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3JCLE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztLQUNIO1NBQU07UUFDTCxVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVMsSUFBVztZQUNyQyxHQUFHLENBQUMsbUJBQWlCLElBQU0sQ0FBQyxDQUFDO1lBQzdCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN2QixJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLE9BQXJCLGdCQUFnQixHQUFNLElBQUksSUFBSSxNQUFNLFNBQUssSUFBSSxFQUFDLENBQUM7WUFDNUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztZQUNsQyxHQUFHLENBQUMsaUJBQWUsSUFBSSxjQUFTLFFBQVEsU0FBTSxDQUFDLENBQUM7WUFDaEQsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0tBQ0g7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIEluYy5cclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcclxuICogaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXHJcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXHJcbiAqIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQge0lTX0xPRywgSVNfUFJPRklMRX0gZnJvbSAnLi9mbGFncyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbG9nKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcclxuICBpZiAoSVNfTE9HKSB7XHJcbiAgICBsZXQgbGVuZ3RoID0gYXJncyA/IGFyZ3MubGVuZ3RoIDogMDtcclxuICAgIGlmIChsZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UsIC4uLmFyZ3MpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gY2hlY2sgdG8gc2VlIGlmIG5hdGl2ZSBzdXBwb3J0IGZvciBwcm9maWxpbmcgaXMgYXZhaWxhYmxlLlxyXG5jb25zdCBOQVRJVkVfUFJPRklMRV9TVVBQT1JUID1cclxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICEhd2luZG93LnBlcmZvcm1hbmNlICYmICEhY29uc29sZS5wcm9maWxlO1xyXG5cclxuLyoqXHJcbiAqIEEgZGVjb3JhdG9yIHRoYXQgY2FuIHByb2ZpbGUgYSBmdW5jdGlvbi5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBwcm9maWxlKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcclxuICBpZiAoSVNfUFJPRklMRSkge1xyXG4gICAgcmV0dXJuIHBlcmZvcm1Qcm9maWxlKHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyByZXR1cm4gYXMtaXNcclxuICAgIHJldHVybiBkZXNjcmlwdG9yO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gcGVyZm9ybVByb2ZpbGUoXHJcbiAgICB0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKTogUHJvcGVydHlEZXNjcmlwdG9yIHtcclxuICBsZXQgb3JpZ2luYWxDYWxsYWJsZSA9IGRlc2NyaXB0b3IudmFsdWU7XHJcbiAgLy8gbmFtZSBtdXN0IGV4aXN0XHJcbiAgbGV0IG5hbWUgPSBvcmlnaW5hbENhbGxhYmxlLm5hbWU7XHJcbiAgaWYgKCFuYW1lKSB7XHJcbiAgICBuYW1lID0gJ2Fub255bW91cyBmdW5jdGlvbic7XHJcbiAgfVxyXG4gIGlmIChOQVRJVkVfUFJPRklMRV9TVVBQT1JUKSB7XHJcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oYXJnczogYW55W10pIHtcclxuICAgICAgY29uc29sZS5wcm9maWxlKG5hbWUpO1xyXG4gICAgICBsZXQgc3RhcnRUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgICBsZXQgcmVzdWx0ID0gb3JpZ2luYWxDYWxsYWJsZS5jYWxsKHRoaXMgfHwgd2luZG93LCAuLi5hcmdzKTtcclxuICAgICAgbGV0IGR1cmF0aW9uID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpIC0gc3RhcnRUaW1lO1xyXG4gICAgICBjb25zb2xlLmxvZyhgJHtuYW1lfSB0b29rICR7ZHVyYXRpb259IG1zYCk7XHJcbiAgICAgIGNvbnNvbGUucHJvZmlsZUVuZCgpO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICB9IGVsc2Uge1xyXG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKGFyZ3M6IGFueVtdKSB7XHJcbiAgICAgIGxvZyhgUHJvZmlsZSBzdGFydCAke25hbWV9YCk7XHJcbiAgICAgIGxldCBzdGFydCA9IERhdGUubm93KCk7XHJcbiAgICAgIGxldCByZXN1bHQgPSBvcmlnaW5hbENhbGxhYmxlLmNhbGwodGhpcyB8fCB3aW5kb3csIC4uLmFyZ3MpO1xyXG4gICAgICBsZXQgZHVyYXRpb24gPSBEYXRlLm5vdygpIC0gc3RhcnQ7XHJcbiAgICAgIGxvZyhgUHJvZmlsZSBlbmQgJHtuYW1lfSB0b29rICR7ZHVyYXRpb259IG1zLmApO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfTtcclxuICB9XHJcbiAgcmV0dXJuIGRlc2NyaXB0b3I7XHJcbn1cclxuIl19