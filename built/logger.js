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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOztBQUVILGlDQUEyQztBQUUzQyxhQUFvQixPQUFlO0lBQUUsY0FBYztTQUFkLFVBQWMsRUFBZCxxQkFBYyxFQUFkLElBQWM7UUFBZCw2QkFBYzs7SUFDakQsRUFBRSxDQUFDLENBQUMsY0FBTSxDQUFDLENBQUMsQ0FBQztRQUNYLElBQUksUUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLFFBQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsT0FBWCxPQUFPLEdBQUssT0FBTyxTQUFLLElBQUksR0FBRTtRQUNoQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQVRELGtCQVNDO0FBQUEsQ0FBQztBQUVGLDZEQUE2RDtBQUM3RCxJQUFNLHNCQUFzQixHQUN4QixPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFFL0U7O0dBRUc7QUFDSCxpQkFBd0IsTUFBVyxFQUFFLFdBQW1CLEVBQUUsVUFBOEI7SUFDdEYsRUFBRSxDQUFDLENBQUMsa0JBQVUsQ0FBQyxDQUFDLENBQUM7UUFDZixNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sZUFBZTtRQUNmLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQztBQUNILENBQUM7QUFQRCwwQkFPQztBQUVELHdCQUNJLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO0lBQ2xFLElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUN4QyxrQkFBa0I7SUFDbEIsSUFBSSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO0lBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNWLElBQUksR0FBRyxvQkFBb0IsQ0FBQztJQUM5QixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1FBQzNCLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBUyxJQUFXO1lBQ3JDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN6QyxJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLE9BQXJCLGdCQUFnQixHQUFNLElBQUksSUFBSSxNQUFNLFNBQUssSUFBSSxFQUFDLENBQUM7WUFDNUQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBSSxJQUFJLGNBQVMsUUFBUSxRQUFLLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDckIsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVMsSUFBVztZQUNyQyxHQUFHLENBQUMsbUJBQWlCLElBQU0sQ0FBQyxDQUFDO1lBQzdCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN2QixJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLE9BQXJCLGdCQUFnQixHQUFNLElBQUksSUFBSSxNQUFNLFNBQUssSUFBSSxFQUFDLENBQUM7WUFDNUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztZQUNsQyxHQUFHLENBQUMsaUJBQWUsSUFBSSxjQUFTLFFBQVEsU0FBTSxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7SVNfTE9HLCBJU19QUk9GSUxFfSBmcm9tICcuL2ZsYWdzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGxvZyhtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gIGlmIChJU19MT0cpIHtcbiAgICBsZXQgbGVuZ3RoID0gYXJncyA/IGFyZ3MubGVuZ3RoIDogMDtcbiAgICBpZiAobGVuZ3RoID4gMCkge1xuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4uYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gY2hlY2sgdG8gc2VlIGlmIG5hdGl2ZSBzdXBwb3J0IGZvciBwcm9maWxpbmcgaXMgYXZhaWxhYmxlLlxuY29uc3QgTkFUSVZFX1BST0ZJTEVfU1VQUE9SVCA9XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgISF3aW5kb3cucGVyZm9ybWFuY2UgJiYgISFjb25zb2xlLnByb2ZpbGU7XG5cbi8qKlxuICogQSBkZWNvcmF0b3IgdGhhdCBjYW4gcHJvZmlsZSBhIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvZmlsZSh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gIGlmIChJU19QUk9GSUxFKSB7XG4gICAgcmV0dXJuIHBlcmZvcm1Qcm9maWxlKHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpO1xuICB9IGVsc2Uge1xuICAgIC8vIHJldHVybiBhcy1pc1xuICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBlcmZvcm1Qcm9maWxlKFxuICAgIHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpOiBQcm9wZXJ0eURlc2NyaXB0b3Ige1xuICBsZXQgb3JpZ2luYWxDYWxsYWJsZSA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIC8vIG5hbWUgbXVzdCBleGlzdFxuICBsZXQgbmFtZSA9IG9yaWdpbmFsQ2FsbGFibGUubmFtZTtcbiAgaWYgKCFuYW1lKSB7XG4gICAgbmFtZSA9ICdhbm9ueW1vdXMgZnVuY3Rpb24nO1xuICB9XG4gIGlmIChOQVRJVkVfUFJPRklMRV9TVVBQT1JUKSB7XG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKGFyZ3M6IGFueVtdKSB7XG4gICAgICBjb25zb2xlLnByb2ZpbGUobmFtZSk7XG4gICAgICBsZXQgc3RhcnRUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgbGV0IHJlc3VsdCA9IG9yaWdpbmFsQ2FsbGFibGUuY2FsbCh0aGlzIHx8IHdpbmRvdywgLi4uYXJncyk7XG4gICAgICBsZXQgZHVyYXRpb24gPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydFRpbWU7XG4gICAgICBjb25zb2xlLmxvZyhgJHtuYW1lfSB0b29rICR7ZHVyYXRpb259IG1zYCk7XG4gICAgICBjb25zb2xlLnByb2ZpbGVFbmQoKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oYXJnczogYW55W10pIHtcbiAgICAgIGxvZyhgUHJvZmlsZSBzdGFydCAke25hbWV9YCk7XG4gICAgICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgbGV0IHJlc3VsdCA9IG9yaWdpbmFsQ2FsbGFibGUuY2FsbCh0aGlzIHx8IHdpbmRvdywgLi4uYXJncyk7XG4gICAgICBsZXQgZHVyYXRpb24gPSBEYXRlLm5vdygpIC0gc3RhcnQ7XG4gICAgICBsb2coYFByb2ZpbGUgZW5kICR7bmFtZX0gdG9vayAke2R1cmF0aW9ufSBtcy5gKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cbiJdfQ==