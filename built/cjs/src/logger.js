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
exports.log = log;
exports.profile = profile;
const flags_ts_1 = require("./flags.js");
function log(message, ...args) {
    if (flags_ts_1.Flags.IS_LOG) {
        let length = args ? args.length : 0;
        if (length > 0) {
            console.log(message, ...args);
        }
        else {
            console.log(message);
        }
    }
}
;
// check to see if native support for profiling is available.
const NATIVE_PROFILE_SUPPORT = typeof window !== 'undefined' && !!window.performance && !!console.profile;
/**
 * A decorator that can profile a function.
 */
function profile(target, propertyKey, descriptor) {
    if (flags_ts_1.Flags.IS_PROFILE) {
        return performProfile(target, propertyKey, descriptor);
    }
    else {
        // return as-is
        return descriptor;
    }
}
function performProfile(target, propertyKey, descriptor) {
    let originalCallable = descriptor.value;
    // name must exist
    let name = originalCallable.name;
    if (!name) {
        name = 'anonymous function';
    }
    if (NATIVE_PROFILE_SUPPORT) {
        descriptor.value = function (args) {
            console.profile(name);
            let startTime = window.performance.now();
            let result = originalCallable.call(this || window, ...args);
            let duration = window.performance.now() - startTime;
            console.log(`${name} took ${duration} ms`);
            console.profileEnd();
            return result;
        };
    }
    else {
        descriptor.value = function (args) {
            log(`Profile start ${name}`);
            let start = Date.now();
            let result = originalCallable.call(this || window, ...args);
            let duration = Date.now() - start;
            log(`Profile end ${name} took ${duration} ms.`);
            return result;
        };
    }
    return descriptor;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7OztHQVlHOzs7O0FBRUgseUNBQWlDO0FBRWpDLGFBQW9CLE9BQWUsRUFBRSxHQUFHLElBQVc7SUFDakQsSUFBSSxnQkFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLElBQUksTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNoQyxDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBQUEsQ0FBQztBQUVGLDZEQUE2RDtBQUM3RCxNQUFNLHNCQUFzQixHQUN4QixPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7QUFFL0U7O0dBRUc7QUFDSCxpQkFBd0IsTUFBVyxFQUFFLFdBQW1CLEVBQUUsVUFBOEI7SUFDdEYsSUFBSSxnQkFBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3JCLE9BQU8sY0FBYyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDekQsQ0FBQztTQUFNLENBQUM7UUFDTixlQUFlO1FBQ2YsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztBQUNILENBQUM7QUFFRCxTQUFTLGNBQWMsQ0FDbkIsTUFBVyxFQUFFLFdBQW1CLEVBQUUsVUFBOEI7SUFDbEUsSUFBSSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO0lBQ3hDLGtCQUFrQjtJQUNsQixJQUFJLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7SUFDakMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1YsSUFBSSxHQUFHLG9CQUFvQixDQUFDO0lBQzlCLENBQUM7SUFDRCxJQUFJLHNCQUFzQixFQUFFLENBQUM7UUFDM0IsVUFBVSxDQUFDLEtBQUssR0FBRyxVQUFTLElBQVc7WUFDckMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixJQUFJLFNBQVMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3pDLElBQUksTUFBTSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDNUQsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUM7WUFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksU0FBUyxRQUFRLEtBQUssQ0FBQyxDQUFDO1lBQzNDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNyQixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSixDQUFDO1NBQU0sQ0FBQztRQUNOLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBUyxJQUFXO1lBQ3JDLEdBQUcsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM3QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDdkIsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUM1RCxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxlQUFlLElBQUksU0FBUyxRQUFRLE1BQU0sQ0FBQyxDQUFDO1lBQ2hELE9BQU8sTUFBTSxDQUFDO1FBQ2hCLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRCxPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBJbmMuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHRcbiAqIGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGVcbiAqIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7RmxhZ3N9IGZyb20gJy4vZmxhZ3MudHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gbG9nKG1lc3NhZ2U6IHN0cmluZywgLi4uYXJnczogYW55W10pIHtcbiAgaWYgKEZsYWdzLklTX0xPRykge1xuICAgIGxldCBsZW5ndGggPSBhcmdzID8gYXJncy5sZW5ndGggOiAwO1xuICAgIGlmIChsZW5ndGggPiAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCAuLi5hcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBjaGVjayB0byBzZWUgaWYgbmF0aXZlIHN1cHBvcnQgZm9yIHByb2ZpbGluZyBpcyBhdmFpbGFibGUuXG5jb25zdCBOQVRJVkVfUFJPRklMRV9TVVBQT1JUID1cbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAhIXdpbmRvdy5wZXJmb3JtYW5jZSAmJiAhIWNvbnNvbGUucHJvZmlsZTtcblxuLyoqXG4gKiBBIGRlY29yYXRvciB0aGF0IGNhbiBwcm9maWxlIGEgZnVuY3Rpb24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcm9maWxlKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpIHtcbiAgaWYgKEZsYWdzLklTX1BST0ZJTEUpIHtcbiAgICByZXR1cm4gcGVyZm9ybVByb2ZpbGUodGFyZ2V0LCBwcm9wZXJ0eUtleSwgZGVzY3JpcHRvcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gcmV0dXJuIGFzLWlzXG4gICAgcmV0dXJuIGRlc2NyaXB0b3I7XG4gIH1cbn1cblxuZnVuY3Rpb24gcGVyZm9ybVByb2ZpbGUoXG4gICAgdGFyZ2V0OiBhbnksIHByb3BlcnR5S2V5OiBzdHJpbmcsIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvcik6IFByb3BlcnR5RGVzY3JpcHRvciB7XG4gIGxldCBvcmlnaW5hbENhbGxhYmxlID0gZGVzY3JpcHRvci52YWx1ZTtcbiAgLy8gbmFtZSBtdXN0IGV4aXN0XG4gIGxldCBuYW1lID0gb3JpZ2luYWxDYWxsYWJsZS5uYW1lO1xuICBpZiAoIW5hbWUpIHtcbiAgICBuYW1lID0gJ2Fub255bW91cyBmdW5jdGlvbic7XG4gIH1cbiAgaWYgKE5BVElWRV9QUk9GSUxFX1NVUFBPUlQpIHtcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oYXJnczogYW55W10pIHtcbiAgICAgIGNvbnNvbGUucHJvZmlsZShuYW1lKTtcbiAgICAgIGxldCBzdGFydFRpbWUgPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICBsZXQgcmVzdWx0ID0gb3JpZ2luYWxDYWxsYWJsZS5jYWxsKHRoaXMgfHwgd2luZG93LCAuLi5hcmdzKTtcbiAgICAgIGxldCBkdXJhdGlvbiA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAgIGNvbnNvbGUubG9nKGAke25hbWV9IHRvb2sgJHtkdXJhdGlvbn0gbXNgKTtcbiAgICAgIGNvbnNvbGUucHJvZmlsZUVuZCgpO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIGRlc2NyaXB0b3IudmFsdWUgPSBmdW5jdGlvbihhcmdzOiBhbnlbXSkge1xuICAgICAgbG9nKGBQcm9maWxlIHN0YXJ0ICR7bmFtZX1gKTtcbiAgICAgIGxldCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgICBsZXQgcmVzdWx0ID0gb3JpZ2luYWxDYWxsYWJsZS5jYWxsKHRoaXMgfHwgd2luZG93LCAuLi5hcmdzKTtcbiAgICAgIGxldCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSBzdGFydDtcbiAgICAgIGxvZyhgUHJvZmlsZSBlbmQgJHtuYW1lfSB0b29rICR7ZHVyYXRpb259IG1zLmApO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICB9XG4gIHJldHVybiBkZXNjcmlwdG9yO1xufVxuIl19