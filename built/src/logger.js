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
import { Flags } from './flags';
export function log(message, ...args) {
    if (Flags.IS_LOG) {
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
export function profile(target, propertyKey, descriptor) {
    if (Flags.IS_PROFILE) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRTlCLE1BQU0sVUFBVSxHQUFHLENBQUMsT0FBZSxFQUFFLEdBQUcsSUFBVztJQUNqRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQzthQUFNLENBQUM7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQUFBLENBQUM7QUFFRiw2REFBNkQ7QUFDN0QsTUFBTSxzQkFBc0IsR0FDeEIsT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0FBRS9FOztHQUVHO0FBQ0gsTUFBTSxVQUFVLE9BQU8sQ0FBQyxNQUFXLEVBQUUsV0FBbUIsRUFBRSxVQUE4QjtJQUN0RixJQUFJLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNyQixPQUFPLGNBQWMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7U0FBTSxDQUFDO1FBQ04sZUFBZTtRQUNmLE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7QUFDSCxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQ25CLE1BQVcsRUFBRSxXQUFtQixFQUFFLFVBQThCO0lBQ2xFLElBQUksZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUN4QyxrQkFBa0I7SUFDbEIsSUFBSSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO0lBQ2pDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNWLElBQUksR0FBRyxvQkFBb0IsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO1FBQzNCLFVBQVUsQ0FBQyxLQUFLLEdBQUcsVUFBUyxJQUFXO1lBQ3JDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUN6QyxJQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQzVELElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFDO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLFNBQVMsUUFBUSxLQUFLLENBQUMsQ0FBQztZQUMzQyxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDckIsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztTQUFNLENBQUM7UUFDTixVQUFVLENBQUMsS0FBSyxHQUFHLFVBQVMsSUFBVztZQUNyQyxHQUFHLENBQUMsaUJBQWlCLElBQUksRUFBRSxDQUFDLENBQUM7WUFDN0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksTUFBTSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDNUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQztZQUNsQyxHQUFHLENBQUMsZUFBZSxJQUFJLFNBQVMsUUFBUSxNQUFNLENBQUMsQ0FBQztZQUNoRCxPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgMjAxNyBHb29nbGUgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0XG4gKiBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlXG4gKiBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG5pbXBvcnQge0ZsYWdzfSBmcm9tICcuL2ZsYWdzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGxvZyhtZXNzYWdlOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKSB7XG4gIGlmIChGbGFncy5JU19MT0cpIHtcbiAgICBsZXQgbGVuZ3RoID0gYXJncyA/IGFyZ3MubGVuZ3RoIDogMDtcbiAgICBpZiAobGVuZ3RoID4gMCkge1xuICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgLi4uYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gY2hlY2sgdG8gc2VlIGlmIG5hdGl2ZSBzdXBwb3J0IGZvciBwcm9maWxpbmcgaXMgYXZhaWxhYmxlLlxuY29uc3QgTkFUSVZFX1BST0ZJTEVfU1VQUE9SVCA9XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgISF3aW5kb3cucGVyZm9ybWFuY2UgJiYgISFjb25zb2xlLnByb2ZpbGU7XG5cbi8qKlxuICogQSBkZWNvcmF0b3IgdGhhdCBjYW4gcHJvZmlsZSBhIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcHJvZmlsZSh0YXJnZXQ6IGFueSwgcHJvcGVydHlLZXk6IHN0cmluZywgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yKSB7XG4gIGlmIChGbGFncy5JU19QUk9GSUxFKSB7XG4gICAgcmV0dXJuIHBlcmZvcm1Qcm9maWxlKHRhcmdldCwgcHJvcGVydHlLZXksIGRlc2NyaXB0b3IpO1xuICB9IGVsc2Uge1xuICAgIC8vIHJldHVybiBhcy1pc1xuICAgIHJldHVybiBkZXNjcmlwdG9yO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBlcmZvcm1Qcm9maWxlKFxuICAgIHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nLCBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IpOiBQcm9wZXJ0eURlc2NyaXB0b3Ige1xuICBsZXQgb3JpZ2luYWxDYWxsYWJsZSA9IGRlc2NyaXB0b3IudmFsdWU7XG4gIC8vIG5hbWUgbXVzdCBleGlzdFxuICBsZXQgbmFtZSA9IG9yaWdpbmFsQ2FsbGFibGUubmFtZTtcbiAgaWYgKCFuYW1lKSB7XG4gICAgbmFtZSA9ICdhbm9ueW1vdXMgZnVuY3Rpb24nO1xuICB9XG4gIGlmIChOQVRJVkVfUFJPRklMRV9TVVBQT1JUKSB7XG4gICAgZGVzY3JpcHRvci52YWx1ZSA9IGZ1bmN0aW9uKGFyZ3M6IGFueVtdKSB7XG4gICAgICBjb25zb2xlLnByb2ZpbGUobmFtZSk7XG4gICAgICBsZXQgc3RhcnRUaW1lID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgbGV0IHJlc3VsdCA9IG9yaWdpbmFsQ2FsbGFibGUuY2FsbCh0aGlzIHx8IHdpbmRvdywgLi4uYXJncyk7XG4gICAgICBsZXQgZHVyYXRpb24gPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCkgLSBzdGFydFRpbWU7XG4gICAgICBjb25zb2xlLmxvZyhgJHtuYW1lfSB0b29rICR7ZHVyYXRpb259IG1zYCk7XG4gICAgICBjb25zb2xlLnByb2ZpbGVFbmQoKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBkZXNjcmlwdG9yLnZhbHVlID0gZnVuY3Rpb24oYXJnczogYW55W10pIHtcbiAgICAgIGxvZyhgUHJvZmlsZSBzdGFydCAke25hbWV9YCk7XG4gICAgICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgbGV0IHJlc3VsdCA9IG9yaWdpbmFsQ2FsbGFibGUuY2FsbCh0aGlzIHx8IHdpbmRvdywgLi4uYXJncyk7XG4gICAgICBsZXQgZHVyYXRpb24gPSBEYXRlLm5vdygpIC0gc3RhcnQ7XG4gICAgICBsb2coYFByb2ZpbGUgZW5kICR7bmFtZX0gdG9vayAke2R1cmF0aW9ufSBtcy5gKTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZGVzY3JpcHRvcjtcbn1cbiJdfQ==